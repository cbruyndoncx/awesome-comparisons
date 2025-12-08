import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'ptooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TooltipComponent {
    @Input() tooltip = '';
    @Input() tooltipHtml = '';
    @HostBinding('class') positionClass = 'n';

    constructor(public _sanitizer: DomSanitizer) {
    }

    @Input() set position(p: string) {
        this.positionClass = p;
    }
}

