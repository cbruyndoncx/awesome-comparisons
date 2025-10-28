import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

import { Configuration, Criteria, CriteriaTypes, CriteriaValue, Data, DataElement, Label } from '../../../../../lib/gulp/model/model.module';
import packageInfo from '../../../../../package.json';

import { isNullOrUndefined } from '../../../shared/util/null-check';
import { renderMarkdown, renderMarkdownToText } from '../../../shared/util/markdown';
import { Store } from '@ngrx/store';
import { IUCAppState } from '../../../redux/uc.app-state';
import { UCDataUpdateAction } from '../../../redux/uc.action';
import { FeatureGroupingService } from '../../output/feature-grouping.service';
import { DatasetManifestService, DatasetManifestEntry } from '../../datasets/dataset-manifest.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable()
export class ConfigurationService {
    public static data: Data = new Data([]);
    public criteria: Array<Criteria> = [];
    public configuration: Configuration = Configuration.empty();

    public tableColumns: Array<string> = [];
    public criteriaValues: Array<Array<{ id: string, text: string, criteriaValue: CriteriaValue }>>;
    public dataElements: Array<DataElement> = [];

    private datasetSubscription: Subscription | null = null;
    private latestChangeDetector: ChangeDetectorRef | null = null;
    private currentDatasetId: string | null = null;
    private currentDataset: DatasetManifestEntry | null = null;

    private static readonly DEFAULT_EDIT_LINK_BASE = ConfigurationService.buildDefaultEditLinkBase();
    private static readonly EDIT_LINK_WINDOW_KEY = 'UC_EDIT_LINK_BASE_URL';

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

    private static buildSummary(text: string): string {
        if (isNullOrUndefined(text)) {
            return '';
        }
        const normalized = text.replace(/\r\n/g, '\n');
        const lines = normalized.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.startsWith('-'));
        if (lines.length > 0) {
            return lines[0];
        }
        const fallback = normalized.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        return fallback.length > 0 ? fallback[0] : '';
    }

    constructor(public title: Title,
                private http: HttpClient,
                private store: Store<IUCAppState>,
                private featureGroupingService: FeatureGroupingService,
                private datasetManifestService: DatasetManifestService) {
    }

    static getHtml(markdown: string): string {
        if (isNullOrUndefined(markdown)) {
            return '';
        }
        return renderMarkdown(markdown.toString());
    }

    static getLatex(text: string): string {
        if (isNullOrUndefined(text)) {
            return null;
        }
        return renderMarkdownToText(text.toString());
    }

    public loadComparison(cd: ChangeDetectorRef) {
        this.latestChangeDetector = cd;
        if (!this.datasetSubscription) {
            this.datasetSubscription = this.datasetManifestService.getActiveDataset()
                .pipe(distinctUntilChanged((prev, next) => (prev?.id === next?.id)))
                .subscribe(dataset => this.loadDatasetAssets(dataset));
        }
    }

    private loadDatasetAssets(dataset: DatasetManifestEntry): void {
        const requests = [
            this.http.get(this.buildDatasetAssetUrl(dataset, 'comparison.json')),
            this.http.get(this.buildDatasetAssetUrl(dataset, 'data.json'))
        ];
        this.currentDataset = dataset;
        Promise.all(requests.map(res => res.toPromise()))
            .then(([configurationSource, dataSource]) => {
                this.currentDatasetId = dataset.id;
                this.hydrateConfigurationPayload(configurationSource, dataSource);
            })
            .catch(error => {
                console.error(`Failed to load dataset ${dataset.id}:`, error);
            });
    }

    private buildDatasetAssetUrl(dataset: DatasetManifestEntry, fileName: string): string {
        const base = (dataset.assetDirectory || 'assets/generated').replace(/\/+$/, '');
        return `${base}/${fileName}`;
    }

    private hydrateConfigurationPayload(configurationSource: any, dataSource: any): void {
        // Set configuration model
        this.configuration = Configuration.load(configurationSource);
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

        const idCriteria = processedCriteria.find(criteria => criteria.id === 'id');
        if (idCriteria) {
            idCriteria.table = true;
        }

        const shortCriteria = processedCriteria.find(criteria => criteria.id === 'ShortDescription');
        if (shortCriteria) {
            shortCriteria.table = true;
            if (isNullOrUndefined(shortCriteria.order) || shortCriteria.order === '') {
                shortCriteria.order = '1';
            }
            if (!shortCriteria.name || shortCriteria.name.trim().length === 0 || shortCriteria.name === 'ShortDescription') {
                shortCriteria.name = 'Short Description';
            }
        }
        this.configuration.criteria = ConfigurationService.sortCriteriaByOrder(processedCriteria);
        const tableCriteria = this.configuration.criteria.filter(criteria => criteria.table);
        const primaryColumns: Array<string> = [];
        const remainingColumns: Array<string> = [];

        tableCriteria.forEach(criteria => {
            if (criteria.id === 'id') {
                primaryColumns[0] = criteria.id;
            } else if (criteria.id === 'ShortDescription') {
                primaryColumns[1] = criteria.id;
            } else {
                remainingColumns.push(criteria.id);
            }
        });

        this.tableColumns = primaryColumns.filter(Boolean).concat(remainingColumns);
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
        // Set data model
        ConfigurationService.data = Data.loadJson(dataSource, this.configuration);
        const activeDataset = this.currentDataset;
        const editLinkBase = this.resolveEditLinkBase(activeDataset);
        const datasetSegments = ConfigurationService.splitPath(activeDataset?.sources?.dataDir || '');
        ConfigurationService.data.dataElements = ConfigurationService.data.dataElements.map(dataElement => {
                // Build html strings and labelArrays
                dataElement.html = ConfigurationService.getHtml(
                    dataElement.shortDescription
                );
                dataElement.latex = ConfigurationService.getLatex(
                    dataElement.shortDescription
                );
                dataElement.criteriaData = Array.from(dataElement.criteriaData).map(([key, criteriaData]) => {
                    const criteria = this.configuration.getCriteria(criteriaData.name);
                    switch (criteriaData.type) {
                        case CriteriaTypes.MARKDOWN:
                        case CriteriaTypes.RATING:
                            criteriaData.html = ConfigurationService.getHtml(
                                criteriaData.text
                            );
                            criteriaData.latex = ConfigurationService.getLatex(
                                criteriaData.text
                            );
                            const markdownSummary = ConfigurationService.buildSummary(criteriaData.text);
                            const markdownFallback = renderMarkdownToText(criteriaData.text || '').split('\n').map(line => line.trim()).filter(line => line.length > 0);
                            criteriaData.summaryText = markdownSummary;
                            criteriaData.tableText = markdownSummary.length > 0
                                ? markdownSummary
                                : (markdownFallback.length > 0 ? markdownFallback[0] : (criteriaData.text || ''));
                            break;
                        case CriteriaTypes.LABEL:
                        case CriteriaTypes.REPOSITORY:
                            const recognizedLabels: Array<Label> = [];
                            const detailLabels: Array<Label> = [];
                            criteriaData.labels.forEach((label, key) => {
                                label.tooltip.html = ConfigurationService.getHtml(
                                    label.tooltip.plain
                                );
                                const recognized = !!criteria && !!criteria.values && criteria.values.has(key);
                                label.isDetail = !recognized;
                                (recognized ? recognizedLabels : detailLabels).push(label);
                            });
                            criteriaData.labelArray = recognizedLabels;
                            criteriaData.detailLabels = detailLabels;
                            if (criteriaData.type === CriteriaTypes.REPOSITORY) {
                                const urls = (criteriaData.url || '')
                                    .split('\n')
                                    .map(url => url.trim())
                                    .filter(url => url.length > 0);
                                criteriaData.urlList = Array.from(new Set(urls));
                            }
                            break;
                    }
                    if (criteriaData.type === CriteriaTypes.TEXT) {
                        const summary = ConfigurationService.buildSummary(criteriaData.text);
                        criteriaData.summaryText = summary;
                        criteriaData.tableText = summary.length > 0 ? summary : (criteriaData.text || '');
                    }
                    return criteriaData;
                }).reduce((map, obj) => {
                    map.set(obj.name, obj);
                    return map;
                }, new Map());
                dataElement.editLink = this.buildEditLink(dataElement, datasetSegments, editLinkBase);
                return dataElement;
            }
        );
        this.dataElements = ConfigurationService.data.dataElements;

        const grouping = this.featureGroupingService.parseGroupedMarkdown({
            configuration: this.configuration,
            data: ConfigurationService.data
        });

        // Dispatch redux store action
        this.store.dispatch(
            new UCDataUpdateAction(
                this.configuration.criteria.reduce((map, obj) => {
                        map.set(obj.id, obj);
                        return map;
                    },
                    new Map()),
                grouping
            )
        );
        this.store.dispatch(
            {
                type: 'UPDATE_SETTINGS',
                enable: this.configuration.details.tooltipAsText,
                operation: 'DetailsDisplayTooltips'
            }
        );

        if (this.latestChangeDetector) {
            this.latestChangeDetector.detectChanges();
        }
    }

    private static buildDefaultEditLinkBase(): string {
        const fallback = 'https://github.com/ultimate-comparisons/ultimate-comparison-framework/blob/main/';
        const repository: any = (packageInfo as any)?.repository;
        const repoUrl = typeof repository === 'string'
            ? repository
            : (repository && typeof repository.url === 'string' ? repository.url : '');
        const derived = ConfigurationService.deriveGithubBlobBase(repoUrl);
        return derived ?? fallback;
    }

    private static deriveGithubBlobBase(repoUrl: string): string | null {
        if (isNullOrUndefined(repoUrl)) {
            return null;
        }
        let url = repoUrl.trim();
        if (url.length === 0) {
            return null;
        }
        url = url.replace(/^git\+/, '');
        if (url.startsWith('git@')) {
            const sshMatch = url.match(/^git@([^:]+):(.+)$/);
            if (!sshMatch) {
                return null;
            }
            const host = sshMatch[1];
            const path = ConfigurationService.trimGitSuffix(sshMatch[2]);
            if (!/github\.com$/i.test(host) || path.length === 0) {
                return null;
            }
            const base = `https://${host}/${path}`;
            return ConfigurationService.ensureTrailingSlash(base) + 'blob/main/';
        }

        const normalized = url.startsWith('git://') ? `https://${url.substring(6)}` : url.replace(/^git:/, 'https:');
        try {
            const parsed = new URL(normalized);
            const host = parsed.host;
            const path = ConfigurationService.trimGitSuffix(parsed.pathname || '');
            if (!/github\.com$/i.test(host) || path.length === 0) {
                return null;
            }
            const base = `https://${host}/${path}`;
            return ConfigurationService.ensureTrailingSlash(base) + 'blob/main/';
        } catch (error) {
            return null;
        }
    }

    private static trimGitSuffix(path: string): string {
        if (isNullOrUndefined(path)) {
            return '';
        }
        let normalized = path.trim().replace(/^\/+/, '');
        if (normalized.toLowerCase().endsWith('.git')) {
            normalized = normalized.substring(0, normalized.length - 4);
        }
        normalized = normalized.replace(/\/+/g, '/');
        return normalized;
    }

    private buildEditLink(dataElement: DataElement, datasetSegments: string[], editLinkBase: string): string | null {
        if (isNullOrUndefined(dataElement) || isNullOrUndefined(dataElement.sourcePath) || dataElement.sourcePath === '') {
            return null;
        }
        const encodedSegments = [
            ...datasetSegments,
            ...ConfigurationService.splitPath(dataElement.sourcePath)
        ].map(segment => encodeURIComponent(segment));
        if (encodedSegments.length === 0) {
            return null;
        }
        return `${editLinkBase}${encodedSegments.join('/')}`;
    }

    private resolveEditLinkBase(dataset: DatasetManifestEntry | null): string {
        const datasetBaseRaw = dataset?.sources?.editBaseUrl;
        const datasetBase = typeof datasetBaseRaw === 'string' ? datasetBaseRaw : '';
        const windowBase = ConfigurationService.getWindowEditBaseOverride();
        const candidate = datasetBase.trim().length > 0
            ? datasetBase
            : (windowBase ?? ConfigurationService.DEFAULT_EDIT_LINK_BASE);
        return ConfigurationService.ensureTrailingSlash(candidate);
    }

    private static getWindowEditBaseOverride(): string | null {
        if (typeof window === 'undefined') {
            return null;
        }
        const globalWindow = window as unknown as Record<string, unknown>;
        const candidate = globalWindow[ConfigurationService.EDIT_LINK_WINDOW_KEY];
        if (typeof candidate === 'string' && candidate.trim().length > 0) {
            return candidate.trim();
        }
        return null;
    }

    private static ensureTrailingSlash(value: string): string {
        return value.replace(/\/+$/, '') + '/';
    }

    private static splitPath(path: string): string[] {
        if (isNullOrUndefined(path)) {
            return [];
        }
        return path
            .split('/')
            .map(segment => segment.trim())
            .filter(segment => segment.length > 0 && segment !== '.');
    }
}
