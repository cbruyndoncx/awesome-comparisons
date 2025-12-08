import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Criteria, CriteriaData, DataElement, Label } from '../../../../../lib/gulp/model/model.module';
import { FeatureGroupingService } from '../feature-grouping.service';
import { FeatureGroupView } from '../../../models/feature-grouping.model';

interface ColumnGroupSpan {
    groupKey: string | null;
    displayName: string;
    span: number;
    isExcluded: boolean;
    isPrimaryColumn: boolean;
}

interface VisibleColumnDefinition {
    key: string | null;
    name: string;
    type: string | null;
    index: number;
}

@Component({
    selector: 'generictable',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GenericTableComponent implements AfterViewChecked, OnChanges {
    @Output() xlsxDownload: EventEmitter<any> = new EventEmitter();
    @Input() changeNum = 0;

    @Output() settingsCallback: EventEmitter<any> = new EventEmitter();
    @Output() showDetails: EventEmitter<any> = new EventEmitter();
    @Output() searchFor: EventEmitter<any> = new EventEmitter();
    @Output() orderChange: EventEmitter<any> = new EventEmitter();

    @Input() columns: Array<string> = [];
    @Input() columnKeys: Array<string> = [];
    @Input() types: Array<string> = [];
    @Input() items: Array<Array<CriteriaData | null | undefined>> = [];
    @Input() index: Array<number> = [];
    @Input() order: Array<number> = [];
    @Input() labelColorsEnabled: boolean = true;
    @Input() showMissingIndicators: boolean = false;
    @Input() dataElements: Array<DataElement> = [];
    @Input() tableExpanded: boolean = false;
    @Input() viewMode: string = 'table';

    @Output() toggleExpand: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() viewModeChange: EventEmitter<string> = new EventEmitter<string>();

    public groups$: Observable<FeatureGroupView[]>;
    public columnGroupMap$: Observable<Record<string, string>>;
    public groupLookup$: Observable<Record<string, FeatureGroupView>>;
    public visibleCriteriaMap$: Observable<Record<string, Criteria>>;

    private table: any;
    private anchorsInitialised = false;
    private expandedMarkdownCells = new Set<string>();

    constructor(@Inject(DOCUMENT) private document: Document,
                private featureGroupingService: FeatureGroupingService) {
        this.groups$ = this.featureGroupingService.getGroups();
        this.columnGroupMap$ = this.featureGroupingService.getColumnGroupMap();
        this.groupLookup$ = this.groups$.pipe(
            map(groups => groups.reduce((acc, group) => {
                acc[group.key] = group;
                return acc;
            }, {} as Record<string, FeatureGroupView>)),
            startWith({} as Record<string, FeatureGroupView>)
        );
        this.visibleCriteriaMap$ = this.featureGroupingService.getVisibleCriteria().pipe(
            map(criteriaList => criteriaList.reduce((acc, criteria) => {
                if (criteria?.id) {
                    acc[criteria.id] = criteria;
                }
                return acc;
            }, {} as Record<string, Criteria>)),
            startWith({} as Record<string, Criteria>)
        );
        // Wire generic table XLSX event to a local handler that emits to parent
        this.xlsxDownload = new EventEmitter();
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

    public describeGroupCriteria(group: FeatureGroupView | null | undefined): string {
        if (!group) {
            return '';
        }
        const names: string[] = [];
        const appendName = (criteria?: Criteria | null) => {
            if (!criteria) {
                return;
            }
            const parts: Array<string | undefined> = [
                typeof criteria.name === 'string' ? criteria.name.trim() : undefined,
                typeof criteria.id === 'string' ? criteria.id.trim() : undefined,
                typeof (criteria as any).key === 'string' ? String((criteria as any).key).trim() : undefined
            ];
            const label = parts.find(part => !!part);
            if (label && !names.includes(label)) {
                names.push(label);
            }
        };
        appendName(group.primaryCriteria ?? null);
        (group.children || []).forEach(child => appendName(child));
        return names.join(', ');
    }

    public getColumnKey(index: number): string | null {
        if (!Array.isArray(this.columnKeys) || index < 0 || index >= this.columnKeys.length) {
            return null;
        }
        return this.columnKeys[index];
    }

    public getColumnDescription(criteriaMap: Record<string, Criteria>, columnKey: string | null): string {
        if (!columnKey) {
            return '';
        }
        const criteria = criteriaMap ? criteriaMap[columnKey] : undefined;
        if (!criteria) {
            return '';
        }
        const description = typeof criteria.description === 'string' ? criteria.description.trim() : '';
        return description;
    }

    public getGroupHeaderSpans(columnGroupMap: Record<string, string>, groupLookup: Record<string, FeatureGroupView>, columnDefs?: Array<{ key: string | null }>): ColumnGroupSpan[] {
        const spans: ColumnGroupSpan[] = [];
        const sourceKeys: Array<string | null> = Array.isArray(columnDefs) && columnDefs.length > 0
            ? columnDefs.map(def => def?.key ?? null)
            : (Array.isArray(this.columnKeys) ? this.columnKeys : []);
        if (sourceKeys.length === 0) {
            return spans;
        }
        const map = columnGroupMap || {};
        const lookup = groupLookup || {};
        sourceKeys.forEach((columnKey, index) => {
            const isPrimaryColumn = index === 0;
            const groupKey = (!isPrimaryColumn && columnKey) ? map[columnKey] || null : null;
            const last = spans[spans.length - 1];
            if (last && !isPrimaryColumn && !last.isPrimaryColumn && last.groupKey === groupKey) {
                last.span += 1;
                return;
            }
            const group = groupKey ? lookup[groupKey] : undefined;
            spans.push({
                groupKey,
                displayName: isPrimaryColumn ? '' : (group?.displayName || ''),
                span: 1,
                isExcluded: group?.isExcluded ?? false,
                isPrimaryColumn
            });
        });
        return spans;
    }

    public getVisibleColumns(columnGroupMap: Record<string, string>, groupLookup: Record<string, FeatureGroupView>): VisibleColumnDefinition[] {
        const visible: VisibleColumnDefinition[] = [];
        const keys = Array.isArray(this.columnKeys) ? this.columnKeys : [];
        const names = Array.isArray(this.columns) ? this.columns : [];
        const types = Array.isArray(this.types) ? this.types : [];
        keys.forEach((columnKey, index) => {
            const columnName = names[index] ?? '';
            if (this.shouldHideColumnLabel(columnKey, columnName, columnGroupMap, groupLookup)) {
                return;
            }
            visible.push({
                key: columnKey,
                name: columnName,
                type: types[index] ?? null,
                index
            });
        });
        return visible;
    }

    public shouldHideColumnLabel(columnKey: string | null, columnName: string | null | undefined, columnGroupMap: Record<string, string>, groupLookup: Record<string, FeatureGroupView>): boolean {
        if (!columnName) {
            return false;
        }
        const effectiveColumnName = String(columnName).trim();
        if (!effectiveColumnName) {
            return false;
        }
        if (columnKey && columnGroupMap && columnGroupMap[columnKey]) {
            return false;
        }
        const normalizedName = effectiveColumnName.toLowerCase();
        if (columnKey && groupLookup && groupLookup[columnKey] && groupLookup[columnKey].displayName && groupLookup[columnKey].displayName.trim().toLowerCase() === normalizedName) {
            return true;
        }
        if (groupLookup) {
            for (const key of Object.keys(groupLookup)) {
                const group = groupLookup[key];
                if (group?.displayName && group.displayName.trim().toLowerCase() === normalizedName) {
                    return true;
                }
            }
        }
        return false;
    }

    public resolveEditLink(rowIndex: number): string | null {
        if (rowIndex === null || rowIndex === undefined) {
            return null;
        }
        if (!Array.isArray(this.dataElements) || rowIndex < 0 || rowIndex >= this.dataElements.length) {
            return null;
        }
        const element = this.dataElements[rowIndex];
        if (!element) {
            return null;
        }
        // Prefer the canonical editLink if present
        if (element.editLink) {
            return element.editLink;
        }
        // If a debug source path was exposed by the configuration service, build a best-effort link
        const debugPath = (element as any)._debug_sourcePath || (element as any).sourcePath;
        if (typeof debugPath === 'string' && debugPath.trim().length > 0) {
            const base = (typeof window !== 'undefined' && (window as any)['UC_EDIT_LINK_BASE_URL'])
                ? String((window as any)['UC_EDIT_LINK_BASE_URL'])
                : 'https://github.com/ultimate-comparisons/ultimate-comparison-framework/blob/main/';
            const segments = String(debugPath).split('/').map(s => s.trim()).filter(s => s && s !== '.');
            if (segments.length === 0) {
                return null;
            }
            const encoded = segments.map(seg => encodeURIComponent(seg)).join('/');
            return base.replace(/\/+$|(?<!\/)$/, '') + (base.endsWith('/') ? '' : '/') + encoded;
        }
        return null;
    }

    public getEditLinkForRow(itemIndex: number): { link: string | null, debug: string | null, rowIndex: number } {
        const rowIndex = this.getRowIndex(itemIndex);
        const el = Array.isArray(this.dataElements) ? this.dataElements[rowIndex] : null;
        const link = this.resolveEditLink(rowIndex);
        let rawDebug: any = el ? (el.editLink || (el as any)._debug_sourcePath || (el as any).sourcePath || null) : null;
        let debug: string | null = null;
        if (rawDebug == null) {
            debug = null;
        } else if (typeof rawDebug === 'string') {
            debug = rawDebug;
        } else if (rawDebug instanceof Map) {
            try { debug = Array.from(rawDebug.values()).join('/'); } catch (e) { debug = JSON.stringify(Array.from(rawDebug.entries())); }
        } else if (Array.isArray(rawDebug)) {
            debug = rawDebug.join('/');
        } else if (typeof rawDebug === 'object') {
            try { debug = JSON.stringify(rawDebug); } catch (e) { debug = String(rawDebug); }
        } else {
            debug = String(rawDebug);
        }
        return {link, debug, rowIndex};
    }

    ngAfterViewChecked(): void {
        if (!this.anchorsInitialised) {
            this.addAnchors();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.update();
        if (changes?.items || changes?.index || changes?.columnKeys) {
            this.expandedMarkdownCells.clear();
        }
    }

    public getRowIndex(itemIndex: number): number {
        if (!Array.isArray(this.index)) {
            return itemIndex;
        }
        if (typeof itemIndex !== 'number') {
            return itemIndex as any as number;
        }
        return (itemIndex >= 0 && itemIndex < this.index.length) ? this.index[itemIndex] : itemIndex;
    }

    public hasLabelFill(entry: CriteriaData | null | undefined): boolean {
        if (!this.labelColorsEnabled) {
            return false;
        }
        const labels = this.extractLabels(entry);
        return labels.some(label => !!label?.backgroundColor);
    }

    public shouldTruncateMarkdown(entry: CriteriaData | null | undefined): boolean {
        const text = this.getMarkdownPlainText(entry);
        if (!text) {
            return false;
        }
        const lineBreakCount = text.split(/\r?\n/).filter(segment => segment.trim().length > 0).length;
        const normalized = text.replace(/\s+/g, ' ').trim();
        if (!normalized) {
            return false;
        }
        if (lineBreakCount > 3) {
            return true;
        }
        return normalized.length > 240;
    }

    public isMarkdownExpanded(itemIndex: number, columnIndex: number): boolean {
        const key = this.buildMarkdownCellId(itemIndex, columnIndex);
        if (!key) {
            return false;
        }
        return this.expandedMarkdownCells.has(key);
    }

    public toggleMarkdownExpansion(itemIndex: number, columnIndex: number): void {
        const key = this.buildMarkdownCellId(itemIndex, columnIndex);
        if (!key) {
            return;
        }
        if (this.expandedMarkdownCells.has(key)) {
            this.expandedMarkdownCells.delete(key);
        } else {
            this.expandedMarkdownCells.add(key);
        }
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

    public openEdit(itemIndex: number) {
        const rowIndex = this.getRowIndex(itemIndex);
        const el = Array.isArray(this.dataElements) ? this.dataElements[rowIndex] : null;
        const details = this.getEditLinkForRow(itemIndex);
        console.log('openEdit: rowIndex=', details.rowIndex, 'link=', details.link, 'debug=', details.debug, 'element.sourcePath=', el ? (el as any).sourcePath : null);
        // if we have a link open it
        if (details.link) {
            window.open(details.link, '_blank');
            return;
        }
        // otherwise try to expose debug path or raw sourcePath
        let raw = details.debug as any;
        if (!raw && el) {
            raw = (el as any)._debug_sourcePath || (el as any).sourcePath || null;
        }
        const serialized = this.serializeSourcePath(raw);
        if (serialized) {
            try {
                navigator.clipboard.writeText(serialized);
                alert('Edit source path copied to clipboard: ' + serialized);
            } catch (e) {
                // fallback: show prompt with the value
                // eslint-disable-next-line no-undef
                window.prompt('Edit source path (copy manually):', serialized);
            }
            return;
        }
        alert('No edit link or sourcePath available for this row.');
    }

    private serializeSourcePath(raw: any): string | null {
        if (raw == null) return null;
        if (typeof raw === 'string') return raw;
        if (raw instanceof Map) {
            try {
                // prefer values joined
                const vals = Array.from(raw.values()).map(v => String(v));
                if (vals.length > 0) return vals.join('/');
                // fallback to entries
                return JSON.stringify(Array.from(raw.entries()));
            } catch (e) {
                return String(raw);
            }
        }
        if (Array.isArray(raw)) {
            return raw.map(r => (typeof r === 'string' ? r : JSON.stringify(r))).join('/');
        }
        if (typeof raw === 'object') {
            // common shape: { segments: [...] }
            if (Array.isArray((raw as any).segments)) {
                return (raw as any).segments.map((s: any) => String(s)).join('/');
            }
            try { return JSON.stringify(raw); } catch (e) { return String(raw); }
        }
        return String(raw);
    }

    private extractLabels(entry: CriteriaData | null | undefined): Label[] {
        if (!entry) {
            return [];
        }
        const labelArray = (entry as unknown as {labelArray?: Array<Label | null | undefined>}).labelArray || (entry as unknown as {labels?: any}).labels;
        if (!labelArray) {
            return [];
        }
        if (Array.isArray(labelArray)) {
            return labelArray.filter((l): l is Label => !!l);
        }
        // Map-like
        if (typeof labelArray === 'object' && typeof (labelArray as any).values === 'function') {
            return Array.from((labelArray as any).values()).filter((l): l is Label => !!l);
        }
        // plain object
        if (typeof labelArray === 'object') {
            return Object.values(labelArray).filter((l): l is Label => !!l);
        }
        return [];
    }

    private buildMarkdownCellId(itemIndex: number, columnIndex: number): string | null {
        const rowIndex = this.getRowIndex(itemIndex);
        if (rowIndex === null || rowIndex === undefined) {
            return null;
        }
        const columnKey = this.getColumnKey(columnIndex);
        const safeColumnKey = columnKey && columnKey.trim().length > 0 ? columnKey : `__index_${columnIndex}`;
        return `${rowIndex}::${safeColumnKey}`;
    }

    private getMarkdownPlainText(entry: CriteriaData | null | undefined): string {
        if (!entry) {
            return '';
        }
        const plaintextCandidates = [
            (entry as unknown as { tableText?: string }).tableText,
            (entry as unknown as { summaryText?: string }).summaryText,
            (entry as unknown as { text?: string }).text
        ];
        for (const candidate of plaintextCandidates) {
            if (typeof candidate === 'string' && candidate.trim().length > 0) {
                return candidate.trim();
            }
        }
        const html = (entry as unknown as { html?: string }).html;
        if (typeof html === 'string' && html.trim().length > 0) {
            if (this.document) {
                const container = this.document.createElement('div');
                // Use textContent assignment instead of innerHTML for safer text extraction
                const tempDiv = this.document.createElement('div');
                tempDiv.textContent = html;
                // Parse as DOM to extract text without executing scripts
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                return doc.body.textContent ? doc.body.textContent.trim() : '';
            }
            return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        }
        return '';
    }
}
