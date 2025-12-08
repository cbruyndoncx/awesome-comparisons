import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Component({
    selector: 'pdialog',
    templateUrl: './paper-dialog.component.html',
    styleUrls: ['./paper-dialog.component.css'],
    standalone: false
})
export class PaperDialogComponent {
    @Input() opened = false;
    @Input() heading: string = '';

    @Output() openedChange: EventEmitter<boolean> = new EventEmitter();

    @HostBinding('style.display') get displayStyle(): string {
        return this.opened ? 'grid' : 'none';
    }

    @HostListener('click', ['$event.target']) onClick(target: any) {
        if (target.localName === 'pdialog') {
            this.close();
        }
    }

    public close() {
        this.opened = false;
        this.openedChange.emit(false);
    }

    @HostListener('window:keydown', ['$event']) onKeydown(event: KeyboardEvent) {
        if (this.opened && event.key.toLowerCase() === 'escape') {
            this.close();
        }
    }
}
