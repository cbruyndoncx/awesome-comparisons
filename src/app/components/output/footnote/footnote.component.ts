import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, Output,
    SimpleChanges
} from '@angular/core';

@Component({
    selector: 'footnote',
    templateUrl: './footnote.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class FootnoteComponent implements OnChanges, OnDestroy {
    @Input() footnote: string = '';
    @Input() footnotes: Map<string, { ref: string, count: number }> = new Map();
    @Output() footnotesChange: EventEmitter<Map<string, { ref: string, count: number }>> = new EventEmitter();

    public ref = '';
    public refPrefix = '\\footref&#123';
    public refSuffix = '&#125';

    ngOnChanges(changes: SimpleChanges) {
        if (changes.footnote) {
            const current = this.footnotes.get(this.footnote);
            if (current) {
                this.footnotes.set(this.footnote, {
                    ref: current.ref,
                    count: current.count + 1
                });
                this.ref = current.ref;
            } else {
                const ref = ('uc' + this.footnotes.size + Math.random() * 100000).toString().slice(0, 7);
                this.footnotes.set(this.footnote, {
                    ref: ref,
                    count: 1
                });
                this.ref = ref;
            }
            this.footnotesChange.emit(this.footnotes);
        }
    }

    ngOnDestroy() {
        if (this.footnote) {
            if (this.footnotes.has(this.footnote)) {
                let footnote = this.footnotes.get(this.footnote);
                if (footnote) {
                    if (footnote.count == 1) {
                        this.footnotes.delete(this.footnote);
                    } else {
                        this.footnotes.set(this.footnote, {
                            ref: footnote.ref,
                            count: footnote.count - 1
                        });
                    }
                }
            }
        }
        this.footnotesChange.emit(this.footnotes);
    }
}