# Angular Theme Service

Angular service that provides accessible light/dark theme switching with Material Design support and localStorage persistence.

## Target

[@generate](../../src/app/theme/theme.service.ts)
[@generate](../../src/styles/theme.scss)

## Capabilities

### Theme State Management

Manages current theme state (light, dark, system) with observable updates and localStorage persistence under `uc-theme` key.

- Exposes observable of current theme state
- Persists explicit theme choices in localStorage
- Falls back to light theme if system preference detection is unsupported

### System Theme Detection

Detects user's preferred color scheme using `matchMedia` API and responds to system theme changes.

- Detects `prefers-color-scheme: dark` via matchMedia
- Listens for system theme changes when in system mode
- Falls back gracefully when matchMedia is unavailable

### Theme Application

Applies theme classes to document body and Angular Material overlay container for consistent theming.

- Applies `uc-light-theme` or `uc-dark-theme` CSS classes to document body
- Updates Angular Material overlay container classes
- Ensures Material components and overlays use consistent theme

### Theme Control Methods

Provides methods for programmatic theme control and cycling.

- `setTheme('light' | 'dark' | 'system')` for explicit theme setting
- `cycleTheme()` for sequential theme switching
- Theme change broadcasting for component reactions

### Dataset Theme Integration

Integrates with dataset preferences to suggest appropriate themes.

- `syncWithDataset(dataset: DatasetManifestEntry)` method
- Respects optional `preferredTheme` field in dataset manifest
- User's explicit choice overrides dataset suggestions

### Accessibility Support

Provides accessible theme switching with proper ARIA support and announcements.

- Theme changes announced via `aria-live="polite"` status
- Respects user's previous explicit choices
- High contrast support integration

## API

```typescript { .api }
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

export interface DatasetManifestEntry {
  preferredTheme?: Theme;
  // other dataset properties...
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly currentTheme$: Observable<Theme>;
  readonly resolvedTheme$: Observable<'light' | 'dark'>;
  
  setTheme(theme: Theme): void;
  cycleTheme(): void;
  syncWithDataset(dataset: DatasetManifestEntry): void;
  getCurrentTheme(): Theme;
  getResolvedTheme(): 'light' | 'dark';
}
```

## Dependencies

### Angular Material

Material Design Components with theming support and overlay container management.
[@use](@angular/material)

### Angular CDK

Component Development Kit for overlay container access and platform detection.
[@use](@angular/cdk)

### RxJS

Reactive extensions for observable theme state management.
[@use](rxjs)