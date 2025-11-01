import { RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    sectionLink: string
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let { url } = routerState;
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        // Use Angular's built-in query parameter parsing instead of manual regex parsing
        const queryParams = route.queryParams || {};

        // Extract section link from fragment
        const sectionLink = route.fragment || null;

        return { url, queryParams, sectionLink };
    }

}
