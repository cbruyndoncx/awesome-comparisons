import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Citation, Configuration, Criteria, CriteriaTypes, CriteriaValue, Data } from '../../../../../lib/gulp/model/model.module';

import { isNullOrUndefined } from '../../../shared/util/null-check';
import { renderMarkdown, renderMarkdownToText } from '../../../shared/util/markdown';
import { Store } from '@ngrx/store';
import { IUCAppState } from '../../../redux/uc.app-state';
import { UCDataUpdateAction } from '../../../redux/uc.action';

@Injectable()
export class ConfigurationService {
    public static data: Data = new Data([]);
    public description = '';
    public criteria: Array<Criteria> = [];
    public configuration: Configuration = Configuration.empty();
    public citation: Map<string, Citation> = new Map();

    public tableColumns: Array<string> = [];
    public criteriaValues: Array<Array<{ id: string, text: string, criteriaValue: CriteriaValue }>>;

    private static resolveTemplateValue(value: any, context: Record<string, any>): string {
        if (isNullOrUndefined(value)) {
            return '';
        }
        if (typeof value === 'string') {
            return value;
        }
        if (typeof value === 'object' && !Array.isArray(value)) {
            const template = typeof value.template === 'string' ? value.template : '';
            const variables = Array.isArray(value.variables) ? value.variables : [];
            if (template.length > 0) {
                let result = template;
                variables.forEach(variable => {
                    const replacement = !isNullOrUndefined(context[variable]) ? String(context[variable]) : '';
                    if (result.indexOf('{}') !== -1) {
                        result = result.replace("{}", replacement);
                    }
                    const namedToken = `{${variable}}`;
                    if (result.indexOf(namedToken) !== -1) {
                        result = result.replace(new RegExp(`\\{${variable}\\}`, 'g'), replacement);
                    }
                });
                return result;
            }
        }
        return '';
    }

    private static parseOrder(criteria: Criteria): number {
        if (criteria.id === 'id') {
            return Number.NEGATIVE_INFINITY;
        }
        const order = criteria.order;
        if (isNullOrUndefined(order) || order === '') {
            return Number.POSITIVE_INFINITY;
        }
        const numericOrder = Number(order);
        return Number.isFinite(numericOrder) ? numericOrder : Number.POSITIVE_INFINITY;
    }

    private static sortCriteriaByOrder(criteria: Array<Criteria>): Array<Criteria> {
        return criteria
            .map((crit, index) => ({
                crit,
                index,
                order: ConfigurationService.parseOrder(crit)
            }))
            .sort((a, b) => {
                if (a.order === b.order) {
                    return a.index - b.index;
                }
                return a.order - b.order;
            })
            .map(item => item.crit);
    }

    constructor(public title: Title,
                private http: HttpClient,
                private store: Store<IUCAppState>) {
    }

    static getHtml(citation: Map<string, Citation>, markdown: string): string {
        if (isNullOrUndefined(markdown)) {
            return '';
        }
        const html = renderMarkdown(markdown.toString());
        return html.replace(/(?:\[@)([^\]]*)(?:\])/g, (match, dec) => {
            if (citation.has(dec)) {
                return '<a class="cite-link" href="#' + dec + '">[' + citation.get(dec).index + ']</a>';
            } else {
                return '<a class="cite-link">[Missing Reference for "' + match + '"]</a>';
            }
        });
    }

    static getLatex(text: string): string {
        if (isNullOrUndefined(text)) {
            return null;
        }
        const plainText = renderMarkdownToText(text.toString());
        return plainText.replace(/(?:\[@)([^\]]*)(?:\])/g, (match, dec) => {
            return '\\cite{' + dec + '}';
        });
    }

    public loadComparison(cd: ChangeDetectorRef) {
        Promise.all(
            [
                this.http.get('assets/generated/comparison.json'),
                this.http.get('assets/generated/data.json'),
                this.http.get('assets/generated/description.md', {responseType: 'text'})
            ].map(res => res.toPromise())
        ).then((result) => {
            // Set configuration model
            this.configuration = Configuration.load(result[0]);
            const processedCriteria = this.configuration.criteria.map(criteria => {
                const context: Record<string, any> = {
                    id: criteria.id,
                    name: typeof criteria.name === 'string' ? criteria.name : criteria.id,
                    type: criteria.type
                };
                const resolvedName = ConfigurationService.resolveTemplateValue(criteria.name, context);
                if (resolvedName.length > 0) {
                    context.name = resolvedName;
                    criteria.name = resolvedName;
                }
                const placeholder = ConfigurationService.resolveTemplateValue(criteria.placeholder, context);
                if (placeholder.length > 0) {
                    criteria.placeholder = placeholder;
                }
                const description = ConfigurationService.resolveTemplateValue(criteria.description, context);
                if (description.length > 0) {
                    criteria.description = description;
                }
                return criteria;
            });
            this.configuration.criteria = ConfigurationService.sortCriteriaByOrder(processedCriteria);
            this.tableColumns = this.configuration.criteria.filter(criteria => criteria.table).map(criteria => criteria.id);
            this.criteria = this.configuration.criteria.filter(criteria => criteria.search);
            this.criteriaValues = this.criteria.map(criteria =>
                Array.from(criteria.values).map(([key, value]) => {
                    return {
                        id: value.name,
                        text: value.name,
                        criteriaValue: value
                    };
                })
            );
            this.citation = this.configuration.citation.reduce((map, obj) => {
                map.set(obj.key, obj);
                return map;
            }, new Map());

            // Set data model
            ConfigurationService.data = Data.loadJson(result[1], this.configuration);
            ConfigurationService.data.dataElements = ConfigurationService.data.dataElements.map(dataElement => {
                    // Build html strings and labelArrays
                    dataElement.html = ConfigurationService.getHtml(
                        this.citation, dataElement.description
                    );
                    dataElement.latex = ConfigurationService.getLatex(
                        dataElement.description
                    );
                    dataElement.criteriaData = Array.from(dataElement.criteriaData).map(([key, criteriaData]) => {
                        switch (criteriaData.type) {
                            case CriteriaTypes.MARKDOWN:
                            case CriteriaTypes.RATING:
                                criteriaData.html = ConfigurationService.getHtml(
                                    this.citation,
                                    criteriaData.text
                                );
                                criteriaData.latex = ConfigurationService.getLatex(
                                    criteriaData.text
                                );
                                break;
                            case CriteriaTypes.LABEL:
                            case CriteriaTypes.REPOSITORY:
                                criteriaData.labels.forEach(label => label.tooltip.html = ConfigurationService.getHtml(
                                    this.citation,
                                    label.tooltip.plain
                                ));
                                criteriaData.labelArray = Array.from(criteriaData.labels).map(([key, value]) => value);
                                if (criteriaData.type === CriteriaTypes.REPOSITORY) {
                                    const urls = (criteriaData.url || '')
                                        .split('\n')
                                        .map(url => url.trim())
                                        .filter(url => url.length > 0);
                                    criteriaData.urlList = Array.from(new Set(urls));
                                }
                                break;
                        }
                        return criteriaData;
                    }).reduce((map, obj) => {
                        map.set(obj.name, obj);
                        return map;
                    }, new Map());
                    return dataElement;
                }
            );

            // Set description
            this.description = ConfigurationService.getHtml(
                this.citation,
                String(result[2]));

            // Dispatch redux store action
            this.store.dispatch(
                new UCDataUpdateAction(
                    this.configuration.criteria.reduce((map, obj) => {
                            map.set(obj.id, obj);
                            return map;
                        },
                        new Map())
                )
            );
            this.store.dispatch(
                {
                    type: 'UPDATE_SETTINGS',
                    enable: this.configuration.details.tooltipAsText,
                    operation: 'DetailsDisplayTooltips'
                }
            );

            cd.detectChanges();
        });
    }
}
