import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConfigurationService } from '../configuration/configuration.service';
import { SafeHtml } from '@angular/platform-browser';
import { Criteria, CriteriaData, DataElement, Label, CriteriaTypes } from '../../../../../lib/gulp/model/model.module';

interface DetailSection {
    criteria: Criteria;
    data: CriteriaData;
    type: string;
}

interface DetailGroup {
    key: string;
    name: string;
    labelText: string;
    labelTooltip?: string;
    excluded: boolean;
    sections: DetailSection[];
}

@Component({
    selector: 'comparison-details',
    templateUrl: './comparison.details.template.html',
    styleUrls: ['./comparison.details.component.css']
})
export class ComparisonDetailsComponent implements OnChanges {
    @Input() data: DataElement | null = new DataElement('placeholder', '', '', new Map());
    @Input() headerLabels: Array<Label> = [];

    @Input() descriptionData: CriteriaData = new CriteriaData('', '', new Map());
    @Input() descriptionCriteria: Criteria = new Criteria('', CriteriaTypes.TEXT);

    @Input() bodyTitle: string = ''

    //@Input() ratings: Array<number> = [];
    @Input() tooltipAsText: boolean = true;
    @Input() labelColorsEnabled: boolean = true;
    @Input() showMissingIndicators: boolean = false;

    public groupedSections: DetailGroup[] = [];
    public ungroupedSections: DetailSection[] = [];

    private static readonly EXCLUDED_LABELS = new Set(['no', 'none', 'n/a']);

    constructor(public configurationService: ConfigurationService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && this.data && this.data.criteriaData) {
            const configuration = this.configurationService.configuration;
            const details = configuration.details;
            const header = details.header;
            const body = details.body;
            const criteriaDataMap = this.data.criteriaData;

            // Set header labels
            this.headerLabels = (criteriaDataMap.get(header.labelRef)
                || {labelArray: []}).labelArray;

            // Set body title
            this.bodyTitle = body.title || '';

            // Set body description
            this.descriptionData = this.data.getCriteriaData(body.bodyRef);
            this.descriptionCriteria = configuration.getCriteria(body.bodyRef);


            const groupedOrder: DetailGroup[] = [];
            const assignedIds: Set<string> = new Set<string>();

            configuration.criteria.forEach(criteria => {
                if (!Array.isArray(criteria.children) || criteria.children.length === 0) {
                    return;
                }
                const sections: DetailSection[] = [];
                criteria.children.forEach(childId => {
                    const childCriteria = configuration.getCriteria(childId);
                    if (!childCriteria || !childCriteria.detail) {
                        return;
                    }
                    const childData = criteriaDataMap.get(childCriteria.name) || criteriaDataMap.get(childCriteria.id);
                    if (!childData) {
                        return;
                    }
                    sections.push({
                        criteria: childCriteria,
                        data: childData,
                        type: (childCriteria.type || '').toUpperCase()
                    });
                    assignedIds.add(childCriteria.id);
                });
                if (sections.length === 0) {
                    return;
                }
                const parentData = criteriaDataMap.get(criteria.name) || criteriaDataMap.get(criteria.id);
                const meta = this.extractGroupLabel(parentData);
                groupedOrder.push({
                    key: criteria.id,
                    name: criteria.name || criteria.id,
                    labelText: meta.text,
                    labelTooltip: meta.tooltip,
                    excluded: meta.excluded,
                    sections
                });
                assignedIds.add(criteria.id);
            });

            const ungrouped: DetailSection[] = [];
            configuration.criteria.forEach(criteria => {
                if (!criteria.detail || criteria.id === body.bodyRef) {
                    return;
                }
                if (assignedIds.has(criteria.id)) {
                    return;
                }
                const criteriaData = criteriaDataMap.get(criteria.name) || criteriaDataMap.get(criteria.id);
                if (!criteriaData) {
                    return;
                }
                ungrouped.push({
                    criteria,
                    data: criteriaData,
                    type: (criteria.type || '').toUpperCase()
                });
            });

            this.groupedSections = groupedOrder;
            this.ungroupedSections = ungrouped;
        }
    }

    private extractGroupLabel(labelData?: CriteriaData) {
        let text = '';
        let tooltip: string | undefined;
        if (labelData) {
            if (labelData.labels && labelData.labels.size > 0) {
                const firstLabel = labelData.labels.values().next().value as Label;
                if (firstLabel) {
                    text = (firstLabel as unknown as {display?: string}).display || firstLabel.name || '';
                    tooltip = firstLabel.tooltip?.text || firstLabel.tooltip?.plain || undefined;
                }
            }
            if (!text) {
                text = labelData.tableText || labelData.summaryText || labelData.text || '';
            }
        }
        const normalized = (text || '').trim().toLowerCase();
        const excluded = ComparisonDetailsComponent.EXCLUDED_LABELS.has(normalized);
        return { text, tooltip, excluded };
    }

    public prefixInternalLink(safeHtml: SafeHtml): SafeHtml {
        const regex = RegExp('<a[^>]*href="#([^"]*)"[^>]*>\\[\\d+\\]</a>', 'g');
        let match;
        const sh = safeHtml as any;
        const html = sh['changingThisBreaksApplicationSecurity'];
        while ((match = regex.exec(html)) !== null) {
            sh['changingThisBreaksApplicationSecurity'] =
                sh['changingThisBreaksApplicationSecurity'].replace(match[1], 'details-' + match[1])
        }
        return safeHtml;
    }

    public getCriteriaDescription(criteria?: Criteria | null): string {
        if (!criteria) {
            return '';
        }
        const description: any = (criteria as any).description;
        if (typeof description === 'string') {
            return description.trim();
        }
        if (description && typeof description === 'object') {
            if (typeof description.text === 'string') {
                return description.text.trim();
            }
            if (typeof description.html === 'string') {
                return description.html.trim();
            }
            if (typeof description.plain === 'string') {
                return description.plain.trim();
            }
        }
        return '';
    }

    public resolveCriteriaDescription(criteria?: Criteria | null): string | null {
        const description = this.getCriteriaDescription(criteria);
        if (!description) {
            return null;
        }
        return description.length > 0 ? description : null;
    }
}
