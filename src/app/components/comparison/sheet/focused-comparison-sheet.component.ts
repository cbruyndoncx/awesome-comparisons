import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CriteriaData, DataElement, Label } from '../../../../../lib/gulp/model/model.module';

interface SheetRow {
    key: string;
    label: string;
    type: string;
    values: Array<CriteriaData | null | undefined>;
}

interface SheetElementHeader {
    index: number;
    name: string;
    url?: string;
    description?: string;
}

@Component({
    selector: 'focused-comparison-sheet',
    templateUrl: './focused-comparison-sheet.component.html',
    styleUrls: ['./focused-comparison-sheet.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FocusedComparisonSheetComponent implements OnChanges {
    @Input() criteriaNames: string[] = [];
    @Input() criteriaKeys: string[] = [];
    @Input() criteriaTypes: string[] = [];
    @Input() items: Array<Array<CriteriaData>> = [];
    @Input() rowIndexes: Array<number> = [];
    @Input() elementData: Array<DataElement> = [];
    @Input() labelColorsEnabled: boolean = true;
    @Input() showMissingIndicators: boolean = false;
    @Input() tableExpanded: boolean = false;
    @Input() viewMode: string = 'sheet';

    @Output() toggleExpand: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() viewModeChange: EventEmitter<string> = new EventEmitter<string>();

    public elementHeaders: SheetElementHeader[] = [];
    public sheetRows: SheetRow[] = [];

    ngOnChanges(): void {
        this.elementHeaders = this.buildHeaders();
        this.sheetRows = this.buildRows();
    }

    public extractLabels(entry: CriteriaData | null | undefined): Label[] {
        if (!entry) {
            return [];
        }
        const rawLabels = (entry as any).labelArray || (entry as any).labels || [];
        if (Array.isArray(rawLabels)) {
            return rawLabels.filter((label: Label | null | undefined): label is Label => !!label);
        }
        if (rawLabels instanceof Map) {
            return Array.from(rawLabels.values()).filter((label: Label | null | undefined): label is Label => !!label);
        }
        if (typeof rawLabels === 'object') {
            return Object.values(rawLabels).filter((label: Label | null | undefined): label is Label => !!label);
        }
        return [];
    }

    public labelDisplay(label: Label): string {
        if (!label) {
            return '';
        }
        return (label as any).display || label.name || '';
    }

    public shouldShowMissing(entry: CriteriaData | null | undefined): boolean {
        if (!this.showMissingIndicators) {
            return false;
        }
        if (!entry) {
            return true;
        }
        if (entry.type === 'LABEL' && this.extractLabels(entry).length > 0) {
            return false;
        }
        if (entry.type === 'MARKDOWN' && (entry.tableText || entry.summaryText || entry.text || entry.html)) {
            return false;
        }
        if ((entry as any).text || (entry as any).tableText || (entry as any).summaryText || (entry as any).content) {
            return false;
        }
        if ((entry as any).link || (entry as any).url) {
            return false;
        }
        return true;
    }

    public triggerPrint(): void {
        if (typeof window !== 'undefined') {
            window.print();
        }
    }

    private buildHeaders(): SheetElementHeader[] {
        const headers: SheetElementHeader[] = [];
        if (!Array.isArray(this.items) || this.items.length === 0) {
            return headers;
        }
        for (let row = 0; row < this.items.length; row++) {
            const resolvedIndex = Array.isArray(this.rowIndexes) && this.rowIndexes.length > row
                ? this.rowIndexes[row]
                : row;
            const element = Array.isArray(this.elementData) && resolvedIndex >= 0 && resolvedIndex < this.elementData.length
                ? this.elementData[resolvedIndex]
                : null;
            headers.push({
                index: resolvedIndex,
                name: element?.name || `Element ${resolvedIndex + 1}`,
                url: element?.url || null,
                description: element?.shortDescription || null
            });
        }
        return headers;
    }

    private buildRows(): SheetRow[] {
        const rows: SheetRow[] = [];
        if (!Array.isArray(this.criteriaNames) || this.criteriaNames.length === 0) {
            return rows;
        }
        for (let columnIndex = 0; columnIndex < this.criteriaNames.length; columnIndex++) {
            const values = this.items.map(row => (Array.isArray(row) ? row[columnIndex] : null));
            rows.push({
                key: this.criteriaKeys?.[columnIndex] || `criteria-${columnIndex}`,
                label: this.criteriaNames[columnIndex],
                type: (this.criteriaTypes?.[columnIndex] || '').toUpperCase(),
                values
            });
        }
        return rows;
    }
}
