import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { CriteriaData, DataElement, Label } from '../../../../../lib/gulp/model/model.module';
import { FeatureGroupingService } from '../feature-grouping.service';
import { FeatureGroupView } from '../../../models/feature-grouping.model';

@Component({
    selector: 'generictable',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericTableComponent implements AfterViewChecked, OnChanges {
    @Input() changeNum = 0;

    @Output() settingsCallback: EventEmitter<any> = new EventEmitter();
    @Output() showDetails: EventEmitter<any> = new EventEmitter();
    @Output() searchFor: EventEmitter<any> = new EventEmitter();
    @Output() orderChange: EventEmitter<any> = new EventEmitter();

    @Input() columns: Array<string> = [];
    @Input() columnKeys: Array<string> = [];
    @Input() types: Array<string> = [];
    @Input() items: Array<Array<CriteriaData>> = [];
    @Input() index: Array<number> = [];
    @Input() order: Array<number> = [];
    @Input() labelColorsEnabled: boolean = true;
    @Input() dataElements: Array<DataElement> = [];
    @Input() tableExpanded: boolean = false;

    @Output() toggleExpand: EventEmitter<boolean> = new EventEmitter<boolean>();

    public groups$: Observable<FeatureGroupView[]>;
    public columnGroupMap$: Observable<Record<string, string>>;

    private table;
    private anchorsInitialised = false;

    constructor(@Inject(DOCUMENT) private document: Document,
                private featureGroupingService: FeatureGroupingService) {
        this.groups$ = this.featureGroupingService.getGroups();
        this.columnGroupMap$ = this.featureGroupingService.getColumnGroupMap();
    }

    public labelClick(event: MouseEvent, key: Label, index: number) {
        this.searchFor.emit({event, key, index});
    }

    public orderClick(e: MouseEvent, value: number) {
        this.orderChange.emit({index: value, ctrl: e.ctrlKey});
    }

    public toggleGroup(group: FeatureGroupView) {
        if (group.isExcluded) {
            return;
        }
        this.featureGroupingService.toggleGroup(group.key, !group.isExpanded);
    }

    public trackGroup(index: number, group: FeatureGroupView) {
        return group.key;
    }

    public groupIndicator(group: FeatureGroupView): string {
        if (group.isExcluded) {
            return '×';
        }
        return group.isExpanded ? '−' : '+';
    }

    public resolveEditLink(rowIndex: number): string | null {
        if (rowIndex === null || rowIndex === undefined) {
            return null;
        }
        if (!Array.isArray(this.dataElements) || rowIndex < 0 || rowIndex >= this.dataElements.length) {
            return null;
        }
        const element = this.dataElements[rowIndex];
        if (!element || !element.editLink) {
            return null;
        }
        return element.editLink;
    }

    ngAfterViewChecked(): void {
        if (!this.anchorsInitialised) {
            this.addAnchors();
        }
    }

    ngOnChanges(changes): void {
        this.update();
    }

    public hasLabelFill(entry: CriteriaData | null | undefined): boolean {
        if (!this.labelColorsEnabled) {
            return false;
        }
        const labels = this.extractLabels(entry);
        return labels.some(label => !!label?.backgroundColor);
    }

    public resolveLabelCellFill(entry: CriteriaData | null | undefined): string | null {
        if (!this.hasLabelFill(entry)) {
            return null;
        }
        const labels = this.extractLabels(entry).filter(
            (label): label is Label & {backgroundColor: string} => !!label?.backgroundColor
        );
        if (!labels.length) {
            return null;
        }
        if (labels.length === 1) {
            return labels[0].backgroundColor;
        }
        const stopSize = 100 / labels.length;
        const segments = labels.map((label, index) => {
            const start = (stopSize * index).toFixed(2);
            const end = (stopSize * (index + 1)).toFixed(2);
            return `${label.backgroundColor} ${start}% ${end}%`;
        });
        return `linear-gradient(90deg, ${segments.join(', ')})`;
    }

    public labelDisplay(label: Label): string {
        if (!label) {
            return '';
        }
        return (label as unknown as { display?: string }).display || label.name || '';
    }

    public update(): void {
        if (this.table != null) {
            this.table.trigger('reflow');
        }
    }

    private addAnchors(): void {
        if (!this.document) {
            return;
        }
        const anchoredElements = Array.from(this.document.querySelectorAll<HTMLElement>('.anchored'));
        anchoredElements.forEach((element, index) => {
            if (!element.getAttribute('id')) {
                element.setAttribute('id', `anchored-${index}`);
            }
        });
        this.anchorsInitialised = true;
    }

    private extractLabels(entry: CriteriaData | null | undefined): Label[] {
        if (!entry) {
            return [];
        }
        const labelArray = (entry as unknown as {labelArray?: Array<Label | null | undefined>}).labelArray;
        if (!Array.isArray(labelArray)) {
            return [];
        }
        return labelArray.filter((label): label is Label => !!label);
    }
}
