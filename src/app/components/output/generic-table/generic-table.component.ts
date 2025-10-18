import { AfterViewChecked, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CriteriaData, Label } from '../../../../../lib/gulp/model/model.module';

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
    @Input() types: Array<string> = [];
    @Input() items: Array<Array<CriteriaData>> = [];
    @Input() index: Array<number> = [];
    @Input() order: Array<number> = [];

    private table;
    private anchorsInitialised = false;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    public labelClick(event: MouseEvent, key: Label, index: number) {
        this.searchFor.emit({event, key, index});
    }

    public orderClick(e: MouseEvent, value: number) {
        this.orderChange.emit({index: value, ctrl: e.ctrlKey});
    }

    ngAfterViewChecked(): void {
        if (!this.anchorsInitialised) {
            this.addAnchors();
        }
    }

    ngOnChanges(changes): void {
        this.update();
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
}
