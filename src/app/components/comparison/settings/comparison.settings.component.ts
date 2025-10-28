import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeatureGroupView } from '../../../models/feature-grouping.model';
import { FeatureGroupingService } from '../../output/feature-grouping.service';

@Component({
    selector: 'comparison-settings',
    templateUrl: './comparison.settings.template.html',
    styleUrls: ['./comparison.settings.component.css']
})
export class ComparisonSettingsComponent {
    @Input() columnDisplayAll: boolean = false;
    @Input() columnNames: Array<string> = [];
    @Input() columnKeys: Array<string> = [];
    @Input() columnsEnabled: Array<boolean> = [];
    @Input() featureGroups: Array<FeatureGroupView> = [];
    @Input() groupColumnLookup: { [columnId: string]: string } = {};

    @Input() elementDisplayAll: boolean = true;
    @Input() elementNames: Array<string> = [];
    @Input() elementsEnabled: Array<boolean> = [];

    @Input() latexDisplayTable: boolean = false;
    @Input() latexEnableTooltips: boolean = false;
    @Input() latexTooltipsAsFootnotes: boolean = false;

    @Input() detailsDisplayTooltips: boolean = false;
    @Input() labelColorsEnabled: boolean = true;

    @Output() columnsDisplayAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() columnChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() elementsDisplayAllChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() elementChange: EventEmitter<number> = new EventEmitter<number>();

    @Output() latexDisplayTableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() latexEnableTooltipsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() latexTooltipsAsFootnotesChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() latexDownload: EventEmitter<any> = new EventEmitter();

    @Output() detailsDisplayTooltipsChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() labelColorsEnabledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private featureGroupingService: FeatureGroupingService) {
    }

    public get groupedColumns() {
        if (!this.featureGroups || this.featureGroups.length === 0) {
            return [];
        }
        const rows = this.featureGroups.map(group => {
            const columns = this.columnKeys
                .map((key, index) => ({ key, name: this.columnNames[index], index }))
                .filter(column => this.groupColumnLookup[column.key] === group.key);
            return { group, columns };
        }).filter(row => row.columns.length > 0);
        return rows;
    }

    public get ungroupedColumns() {
        const groupedKeys = new Set<string>();
        this.featureGroups.forEach(group => {
            (group.children || []).forEach(child => groupedKeys.add(child.id));
        });
        const groupKeys = new Set(this.featureGroups.map(group => group.key));
        const groupedLookup = this.groupColumnLookup || {};
        return this.columnKeys
            .map((key, index) => ({ key, name: this.columnNames[index], index }))
            .filter(column => !groupedKeys.has(column.key) && !groupKeys.has(column.key) && !groupedLookup[column.key]);
    }

    public toggleGroup(groupRow: FeatureGroupView) {
        if (groupRow.isExcluded) {
            return;
        }
        this.featureGroupingService.toggleGroup(groupRow.key, !groupRow.isExpanded);
    }

    public groupIndicator(group: FeatureGroupView): string {
        if (group.isExcluded) {
            return '×';
        }
        return group.isExpanded ? '−' : '+';
    }

}
