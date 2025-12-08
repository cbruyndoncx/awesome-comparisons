import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUCAppState } from './redux/uc.app-state';
import { UCNewStateAction } from './redux/uc.action';

@Component({
    selector: 'myapp',
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class AppComponent {
    constructor(private store: Store<IUCAppState>) {}

    @HostListener('window:popstate', ['$event'])
    popState(ev: PopStateEvent) {
        if (ev.state) {
            this.store.dispatch(new UCNewStateAction(<IUCAppState>ev.state));
        }
    }
}
