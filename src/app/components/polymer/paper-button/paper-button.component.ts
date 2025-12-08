import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'pbutton',
    templateUrl: './paper-button.component.html',
    styleUrls: ['./paper-button.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PaperButtonComponent {
    @Input() text: string = '';
}
