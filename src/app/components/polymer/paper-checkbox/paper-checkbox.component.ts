import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output
} from "@angular/core";

@Component({
    selector: 'pcheckbox',
    templateUrl: './paper-checkbox.component.html',
    styleUrls: ['./paper-checkbox.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaperCheckboxComponent {
    @Input() label: string = '';
    @Input() checked = false;
    @Input() disabled = false;
    @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('attr.role') role = 'checkbox';
    @HostBinding('attr.tabindex') tabIndex = 0;
    @HostBinding('attr.aria-checked') get ariaChecked(): string {
        return String(this.checked);
    }

    @HostListener('click')
    public toggle(): void {
        this.checked = !this.checked;
        this.checkedChange.emit(this.checked);
    }

    @HostListener('keydown.enter', ['$event'])
    @HostListener('keydown.space', ['$event'])
    public handleKey(event: KeyboardEvent): void {
        event.preventDefault();
        this.toggle();
    }
}
