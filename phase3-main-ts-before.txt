import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function ensureMaterialIcons(): void {
  if (typeof document === 'undefined') {
    return;
  }
  const existingLink = document.head.querySelector<HTMLLinkElement>('link[data-mat-icons]');
  if (existingLink) {
    return;
  }
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Round|Material+Icons&display=swap';
  link.setAttribute('data-mat-icons', 'true');
  document.head.appendChild(link);
}

if (environment.production) {
    enableProdMode();
}

ensureMaterialIcons();

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
