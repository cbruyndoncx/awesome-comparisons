// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../app/theme/theme-service.spec.md
// (spec:5d15bf74) (code:53d4507b)

import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DatasetManifestEntry } from '../components/datasets/dataset-manifest.service';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'uc-theme';
  private readonly themeSubject = new BehaviorSubject<Theme>('system');
  private mediaQuery?: MediaQueryList;
  private hasStoredPreference = false;
  
  readonly currentTheme$: Observable<Theme> = this.themeSubject.asObservable();
  readonly resolvedTheme$: Observable<'light' | 'dark'> = this.currentTheme$.pipe(
    map(theme => this.resolveTheme(theme))
  );

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private overlayContainer: OverlayContainer
  ) {
    const initialTheme = this.loadInitialTheme();
    this.themeSubject.next(initialTheme);
    this.applyTheme(initialTheme);
    this.setupSystemThemeListener();
  }

  setTheme(theme: Theme): void {
    this.hasStoredPreference = true;
    this.updateTheme(theme, { persist: true, announce: true });
  }

  cycleTheme(): void {
    const current = this.getCurrentTheme();
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(current);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    this.setTheme(nextTheme);
  }

  syncWithDataset(dataset: DatasetManifestEntry): void {
    if (!dataset?.preferredTheme || this.hasStoredPreference) {
      return;
    }
    this.updateTheme(dataset.preferredTheme, { persist: false, announce: true });
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  getResolvedTheme(): 'light' | 'dark' {
    return this.resolveTheme(this.getCurrentTheme());
  }

  private loadInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored === 'light' || stored === 'dark' || stored === 'system') {
        this.hasStoredPreference = true;
        return stored;
      }
    } catch (e) {
      // localStorage might not be available
    }
    return 'system';
  }

  private storeTheme(theme: Theme): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, theme);
      this.hasStoredPreference = true;
    } catch (e) {
      // localStorage might not be available
    }
  }

  private resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'system') {
      return this.getSystemTheme();
    }
    return theme;
  }

  private getSystemTheme(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light'; // fallback
  }

  private setupSystemThemeListener(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const listener = () => {
        if (this.getCurrentTheme() === 'system') {
          this.applyTheme('system');
        }
      };

      // Modern browsers
      if (this.mediaQuery.addEventListener) {
        this.mediaQuery.addEventListener('change', listener);
      } else {
        // Fallback for older browsers
        this.mediaQuery.addListener(listener);
      }
    }
  }

  private updateTheme(theme: Theme, options: { persist?: boolean; announce?: boolean } = {}): void {
    const { persist = false, announce = true } = options;
    this.themeSubject.next(theme);
    if (persist) {
      this.storeTheme(theme);
    }
    this.applyTheme(theme);
    if (announce) {
      this.announceThemeChange(theme);
    }
  }

  private applyTheme(theme: Theme): void {
    const resolvedTheme = this.resolveTheme(theme);
    const body = this.document.body;
    
    // Remove existing theme classes
    body.classList.remove('uc-light-theme', 'uc-dark-theme');
    
    // Apply new theme class
    body.classList.add(`uc-${resolvedTheme}-theme`);
    
    // Update Material overlay container
    const overlayContainerElement = this.overlayContainer.getContainerElement();
    overlayContainerElement.classList.remove('uc-light-theme', 'uc-dark-theme');
    overlayContainerElement.classList.add(`uc-${resolvedTheme}-theme`);
  }

  private announceThemeChange(theme: Theme): void {
    const resolvedTheme = this.resolveTheme(theme);
    const message = `Theme changed to ${theme === 'system' ? `${resolvedTheme} (system)` : resolvedTheme}`;
    
    // Create or update aria-live announcement
    let announcer = this.document.getElementById('theme-announcer');
    if (!announcer) {
      announcer = this.document.createElement('div');
      announcer.id = 'theme-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.position = 'absolute';
      announcer.style.left = '-10000px';
      announcer.style.width = '1px';
      announcer.style.height = '1px';
      announcer.style.overflow = 'hidden';
      this.document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
  }
}
