import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges
} from '@angular/core';
import { isNullOrUndefined } from "../../../shared/util/null-check";
import { InputInterface } from "../input-interface";

interface SelectOption {
    id: string;
    text: string;
}

@Component({
    selector: 'select2',
    templateUrl: 'select2.template.html',
    styleUrls: [
        'select2.component.css'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Select2Component implements InputInterface, OnChanges {
    @Input() options: Array<SelectOption | string> = [];
    @Input() maximumSelectionLength = 0;
    @Input() placeholder: string;
    @Input() tag: string;
    @Input() name: string;
    @Input() active: Array<SelectOption>;
    @Input() change: number;

    @Output() result: EventEmitter<string> = new EventEmitter();

    public selectedIds: Set<string> = new Set();

    public constructor(private cd: ChangeDetectorRef) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['active'] || changes['change']) {
            this.syncActiveSelection();
        }
    }

    public toggleOption(option: SelectOption | string): void {
        const optionId = this.getOptionId(option);
        const optionText = this.getOptionText(option);
        const isSelected = this.selectedIds.has(optionId);

        if (!isSelected && this.maximumSelectionLength > 0 && this.selectedIds.size >= this.maximumSelectionLength) {
            return;
        }

        if (isSelected) {
            this.selectedIds.delete(optionId);
        } else {
            this.selectedIds.add(optionId);
        }

        this.result.emit(optionText);
        this.cd.markForCheck();
    }

    public isSelected(option: SelectOption | string): boolean {
        return this.selectedIds.has(this.getOptionId(option));
    }

    public addToGui(item: string): void {
        const matchedOption = this.options.find(option => this.getOptionText(option) === item);
        if (!matchedOption) {
            return;
        }
        const optionId = this.getOptionId(matchedOption);
        if (!this.selectedIds.has(optionId)) {
            if (this.maximumSelectionLength > 0 && this.selectedIds.size >= this.maximumSelectionLength) {
                return;
            }
            this.selectedIds.add(optionId);
            this.cd.markForCheck();
        }
    }

    public trackByOption(_: number, option: SelectOption | string): string {
        return this.getOptionId(option);
    }

    public getOptionText(option: SelectOption | string): string {
        if (typeof option === 'string') {
            return option;
        }
        return option.text || option.id;
    }

    private getOptionId(option: SelectOption | string): string {
        if (typeof option === 'string') {
            return option;
        }
        return option.id || option.text;
    }

    private syncActiveSelection(): void {
        const activeItems = this.active || [];
        this.selectedIds = new Set(activeItems.map(item => isNullOrUndefined(item.id) ? item.text : item.id));
        this.cd.markForCheck();
    }
}
