# Tutorial Track D: Developer Guide
## Extending and Customizing the System

**Duration:** 90 minutes
**Target Audience:** Developers who will customize or extend the codebase
**Prerequisites:** TypeScript, Angular, Git, npm/Node.js experience
**What You'll Learn:** System architecture, customization points, and how to extend functionality

---

## Table of Contents

1. [Introduction](#introduction)
2. [Part 1: Setup Development Environment (15 mins)](#part-1-setup-development-environment)
3. [Part 2: Component Architecture (20 mins)](#part-2-component-architecture)
4. [Part 3: Customization Points (20 mins)](#part-3-customization-points)
5. [Part 4: Build & Deploy (15 mins)](#part-4-build--deploy)
6. [Part 5: Practical Exercise (20 mins)](#part-5-practical-exercise)
7. [Advanced Topics](#advanced-topics)
8. [Quick Reference](#quick-reference)

---

## Introduction

As a developer, you'll extend the Awesome Comparisons framework to add new features, customize behavior, or integrate with other systems.

### What You'll Learn
- Complete system architecture
- Angular component structure
- NgRx state management
- Service layer (Configuration, Dataset services)
- Data processing pipeline
- Custom renderers and components
- Build and deployment process
- Testing strategies

### Technology Stack
- **Framework:** Angular 17
- **Language:** TypeScript 5
- **State:** NgRx 17
- **UI:** Angular Material
- **Build:** Angular CLI, Webpack
- **Data:** Gulp 4, custom md2json converter
- **Testing:** Jasmine, Karma

---

## Part 1: Setup Development Environment (15 mins)

### Step 1.1: Clone and Install

**Steps:**

```bash
# Clone repository
git clone https://github.com/your-org/awesome-comparisons.git
cd awesome-comparisons

# Install dependencies
npm install

# This installs:
# - Angular 17 and dependencies
# - NgRx 17 for state management
# - Angular Material for UI
# - Gulp for build tasks
# - TypeScript compiler
# - Testing frameworks
```

**Verify installation:**
```bash
npm list --depth=0
```

---

### Step 1.2: Project Structure Overview

**Key Directories:**

```
awesome-comparisons/
├── configuration/          # Shared configs and manifest
├── datasets/               # All dataset data and configs
├── docs/                   # Documentation
├── lib/                    # Build utilities (md2json)
├── scripts/                # Build and deploy scripts
├── specs/                  # Specification documents
├── src/                    # Angular application source
│   ├── app/
│   │   ├── components/    # UI components
│   │   ├── services/      # Business logic
│   │   ├── store/         # NgRx state management
│   │   ├── models/        # TypeScript interfaces
│   │   └── utils/         # Helper functions
│   ├── assets/            # Static assets
│   ├── environments/      # Environment configs
│   └── styles/            # Global styles
├── tests/                  # Test files
├── angular.json            # Angular configuration
├── package.json            # npm dependencies
└── tsconfig.json           # TypeScript configuration
```

---

### Step 1.3: Development Server

**Start the dev server:**

```bash
npm start

# Or explicitly:
ng serve --open

# This:
# - Compiles TypeScript
# - Starts webpack dev server
# - Opens http://localhost:4200
# - Enables hot module reload
# - Watches for file changes
```

**Development URL:** http://localhost:4200

---

### Step 1.4: Build Process Overview

**Key npm scripts:**

```bash
# Data preparation (convert MD to JSON)
npm run prepare-data

# Start dev server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

### Step 1.5: Gulp Tasks

**The data pipeline:**

```bash
# Process markdown to JSON
gulp prepare-data

# Watch for data changes
gulp watch-data
```

**What happens:**
1. Reads markdown files from `datasets/*/data/*.md`
2. Parses markdown structure
3. Converts to JSON objects
4. Merges with configuration
5. Outputs to `dist/data/*.json`

**Location:** Gulpfile defined in project root

---

## Part 2: Component Architecture (20 mins)

### Step 2.1: Application Structure

**Main App Flow:**

```
AppComponent (root)
    ↓
RouterOutlet
    ├→ ComparisonComponent (/comparison)
    ├→ ConfigAdminShellComponent (/admin)
    └→ DatasetSelectorComponent (everywhere)
```

**File Locations:**
- `src/app/app.component.ts` - Root component
- `src/app/app.routes.ts` - Routing configuration

---

### Step 2.2: Comparison Component

**Main view for comparing items**

**Location:** `src/app/components/comparison/`

**Structure:**
```typescript
@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
  items$: Observable<ComparisonItem[]>;
  criteria$: Observable<Criterion[]>;
  groups$: Observable<Group[]>;

  constructor(
    private store: Store,
    private datasetService: DatasetService
  ) {}
}
```

**Key Features:**
- Loads comparison data from store
- Displays items in table format
- Handles search and filtering
- Manages group expansion/collapse
- Exports to Excel

**Sub-components:**
- `FocusedComparisonSheetComponent` - Table view
- `ComparisonDetailsComponent` - Detail panel
- `GenericTableComponent` - Reusable table

---

### Step 2.3: Admin Components

**Configuration editor interface**

**Location:** `src/app/components/config-admin/`

**Main Components:**

**1. ConfigAdminShellComponent**
```typescript
// Shell container with three-panel layout
@Component({
  selector: 'app-config-admin-shell',
  template: `
    <div class="admin-container">
      <app-config-catalog-tree></app-config-catalog-tree>
      <app-config-criteria-form></app-config-criteria-form>
      <app-config-diff-viewer></app-config-diff-viewer>
    </div>
  `
})
```

**2. ConfigCatalogTreeComponent**
- File/folder navigation
- Configuration browsing
- Dataset selection

**3. ConfigCriteriaFormComponent**
- Visual YAML editor
- Criteria management
- Group configuration

**4. ConfigDiffViewerComponent**
- Preview changes
- Before/after comparison
- Syntax highlighting

---

### Step 2.4: Services Layer

**Core Services:**

**1. ConfigurationService**

**Location:** `src/app/services/configuration.service.ts`

```typescript
@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  // Load and merge configurations
  loadConfiguration(datasetId: string): Observable<Configuration> {}

  // Resolve inheritance
  resolveInheritance(config: Configuration): Configuration {}

  // Save configuration
  saveConfiguration(config: Configuration): Observable<void> {}

  // Validate configuration
  validateConfiguration(config: Configuration): ValidationResult {}
}
```

**Responsibilities:**
- Load YAML configurations
- Merge shared and dataset-specific configs
- Resolve inheritance hierarchy
- Cache compiled configurations

---

**2. DatasetService**

**Location:** `src/app/services/dataset.service.ts`

```typescript
@Injectable({
  providedIn: 'root'
})
export class DatasetService {
  // Load dataset data
  loadDataset(datasetId: string): Observable<Dataset> {}

  // Get all datasets
  getDatasets(): Observable<Dataset[]> {}

  // Get dataset metadata
  getDatasetMetadata(datasetId: string): Observable<DatasetMetadata> {}

  // Load items for dataset
  loadItems(datasetId: string): Observable<ComparisonItem[]> {}
}
```

**Responsibilities:**
- Load dataset manifests
- Read JSON data files
- Provide dataset metadata
- Cache loaded datasets

---

**3. ExportService**

**Location:** `src/app/services/export.service.ts`

```typescript
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  // Export to Excel
  exportToExcel(items: ComparisonItem[], criteria: Criterion[]): void {}

  // Export to CSV
  exportToCsv(items: ComparisonItem[], criteria: Criterion[]): void {}

  // Export to JSON
  exportToJson(items: ComparisonItem[]): void {}
}
```

---

### Step 2.5: NgRx State Management

**Store Structure:**

```
State
├── dataset
│   ├── currentDatasetId
│   ├── datasets
│   └── selectedDataset
├── comparison
│   ├── items
│   ├── filteredItems
│   ├── criteria
│   ├── groups
│   └── searchTerm
└── config
    ├── configurations
    ├── currentConfig
    └── isDirty
```

**Location:** `src/app/store/`

**Files:**
- `actions/` - Action definitions
- `reducers/` - State reducers
- `effects/` - Side effects
- `selectors/` - State selectors

---

**Example: Dataset Actions**

```typescript
// src/app/store/actions/dataset.actions.ts

export const loadDataset = createAction(
  '[Dataset] Load Dataset',
  props<{ datasetId: string }>()
);

export const loadDatasetSuccess = createAction(
  '[Dataset] Load Dataset Success',
  props<{ dataset: Dataset }>()
);

export const loadDatasetFailure = createAction(
  '[Dataset] Load Dataset Failure',
  props<{ error: any }>()
);
```

---

**Example: Selectors**

```typescript
// src/app/store/selectors/comparison.selectors.ts

export const selectItems = createSelector(
  selectComparisonState,
  (state) => state.items
);

export const selectFilteredItems = createSelector(
  selectItems,
  selectSearchTerm,
  (items, searchTerm) => {
    if (!searchTerm) return items;
    return items.filter(item =>
      JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);
```

---

### Step 2.6: Models and Interfaces

**Core TypeScript Interfaces:**

**Location:** `src/app/models/`

```typescript
// comparison-item.model.ts
export interface ComparisonItem {
  id: string;
  name: string;
  description: string;
  repository?: string;
  criteria: Record<string, any>;
  metadata: ItemMetadata;
}

// criterion.model.ts
export interface Criterion {
  name: string;
  type: CriterionType;
  searchable: boolean;
  showInTable: boolean;
  showInDetails: boolean;
  options?: CriterionOptions;
}

// group.model.ts
export interface Group {
  name: string;
  description?: string;
  criteria: string[];
  expanded?: boolean;
}

// dataset.model.ts
export interface Dataset {
  id: string;
  name: string;
  title: string;
  description: string;
  items: ComparisonItem[];
  configuration: Configuration;
}
```

---

## Part 3: Customization Points (20 mins)

### Step 3.1: Add a New Criterion Type

**Scenario:** Add support for "price-range" type with visual rendering

**Step 1: Define the Type**

```typescript
// src/app/models/criterion-type.model.ts

export enum CriterionType {
  TEXT = 'text',
  LABEL = 'label',
  RATING = 'rating',
  MARKDOWN = 'markdown',
  URL = 'url',
  REPOSITORY = 'repository',
  PRICE_RANGE = 'price-range'  // NEW
}
```

**Step 2: Create Renderer Component**

```typescript
// src/app/components/renderers/price-range-renderer.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-range-renderer',
  template: `
    <div class="price-range">
      <span class="price-min">{{ priceRange.min | currency }}</span>
      <span class="separator">-</span>
      <span class="price-max">{{ priceRange.max | currency }}</span>
      <div class="price-bar">
        <div class="price-indicator" [style.left.%]="percentage"></div>
      </div>
    </div>
  `,
  styles: [`
    .price-range {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .price-bar {
      flex: 1;
      height: 4px;
      background: #e0e0e0;
      position: relative;
    }
    .price-indicator {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #4285f4;
      border-radius: 50%;
      top: -3px;
    }
  `]
})
export class PriceRangeRendererComponent {
  @Input() value: string;

  get priceRange() {
    // Parse "100-500" format
    const [min, max] = this.value.split('-').map(Number);
    return { min, max };
  }

  get percentage() {
    // Calculate position on scale (0-1000 range)
    const { min } = this.priceRange;
    return (min / 1000) * 100;
  }
}
```

**Step 3: Register in Renderer Factory**

```typescript
// src/app/components/renderers/renderer-factory.service.ts

@Injectable()
export class RendererFactoryService {
  getRenderer(type: CriterionType): Type<any> {
    switch (type) {
      case CriterionType.TEXT:
        return TextRendererComponent;
      case CriterionType.RATING:
        return RatingRendererComponent;
      case CriterionType.PRICE_RANGE:
        return PriceRangeRendererComponent;  // NEW
      default:
        return DefaultRendererComponent;
    }
  }
}
```

---

### Step 3.2: Customize Theme

**Create Dataset-Specific Theme:**

**Step 1: Add Theme Variables**

```scss
// src/styles/themes/_cloud-storage.scss

$cloud-storage-theme: (
  primary: #4285f4,
  accent: #34a853,
  warn: #ea4335,
  background: #ffffff,
  text: #202124
);

.theme-cloud-storage {
  --primary-color: #{map-get($cloud-storage-theme, primary)};
  --accent-color: #{map-get($cloud-storage-theme, accent)};
  --warn-color: #{map-get($cloud-storage-theme, warn)};

  .header {
    background: var(--primary-color);
    color: white;
  }

  .criterion-value {
    color: var(--accent-color);
  }
}
```

**Step 2: Apply Theme Conditionally**

```typescript
// src/app/components/comparison/comparison.component.ts

export class ComparisonComponent {
  get themeClass(): string {
    return `theme-${this.currentDataset.id}`;
  }
}
```

```html
<!-- comparison.component.html -->
<div [ngClass]="themeClass" class="comparison-container">
  <!-- content -->
</div>
```

---

### Step 3.3: Add Custom Export Format

**Scenario:** Export to PDF in addition to Excel

**Step 1: Install PDF Library**

```bash
npm install jspdf jspdf-autotable
npm install --save-dev @types/jspdf
```

**Step 2: Add PDF Export Method**

```typescript
// src/app/services/export.service.ts

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export class ExportService {
  exportToPdf(
    items: ComparisonItem[],
    criteria: Criterion[],
    datasetName: string
  ): void {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(`${datasetName} Comparison`, 14, 20);

    // Table
    autoTable(doc, {
      head: [criteria.map(c => c.name)],
      body: items.map(item =>
        criteria.map(c => item.criteria[c.name] || '')
      ),
      startY: 30
    });

    // Save
    doc.save(`${datasetName}-comparison.pdf`);
  }
}
```

**Step 3: Add UI Button**

```html
<!-- comparison.component.html -->
<button mat-button (click)="exportToPdf()">
  <mat-icon>picture_as_pdf</mat-icon>
  Export PDF
</button>
```

---

### Step 3.4: Implement Advanced Filtering

**Add AND/OR Logic to Filters:**

```typescript
// src/app/store/reducers/comparison.reducer.ts

interface FilterState {
  filters: Filter[];
  logic: 'AND' | 'OR';
}

export const filterItems = (
  items: ComparisonItem[],
  filters: Filter[],
  logic: 'AND' | 'OR'
): ComparisonItem[] => {
  return items.filter(item => {
    const matches = filters.map(filter =>
      matchesCriterion(item, filter)
    );

    return logic === 'AND'
      ? matches.every(m => m)
      : matches.some(m => m);
  });
};
```

---

### Step 3.5: Add Real-Time Collaboration

**Using WebSockets for Multi-User Editing:**

```typescript
// src/app/services/collaboration.service.ts

import { webSocket } from 'rxjs/webSocket';

@Injectable()
export class CollaborationService {
  private ws$ = webSocket('ws://your-server/collab');

  constructor(private store: Store) {
    // Listen for remote changes
    this.ws$.subscribe(message => {
      if (message.type === 'CONFIG_UPDATE') {
        this.store.dispatch(updateConfigFromRemote({
          config: message.config
        }));
      }
    });
  }

  broadcastChange(change: ConfigChange): void {
    this.ws$.next({
      type: 'CONFIG_CHANGE',
      change
    });
  }
}
```

---

## Part 4: Build & Deploy (15 mins)

### Step 4.1: Production Build

**Build for production:**

```bash
npm run build

# Or explicitly:
ng build --configuration production

# This:
# - Enables ahead-of-time (AOT) compilation
# - Minifies code
# - Optimizes bundle size
# - Removes development code
# - Generates source maps
```

**Output:** `dist/` folder contains production files

---

### Step 4.2: Environment Configuration

**Multiple environments:**

```typescript
// src/environments/environment.ts (development)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  enableDebug: true
};

// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.yoursite.com',
  enableDebug: false
};
```

**Usage in code:**
```typescript
import { environment } from '../environments/environment';

if (environment.enableDebug) {
  console.log('Debug info');
}
```

---

### Step 4.3: GitHub Pages Deployment

**Automated deployment:**

```bash
npm run deploy

# This runs:
# 1. ng build --configuration production --base-href=/awesome-comparisons/
# 2. ngh --dir=dist/awesome-comparisons
```

**Manual deployment:**

```bash
# Build
ng build --configuration production --base-href=/repo-name/

# Deploy using angular-cli-ghpages
npx ngh --dir=dist/awesome-comparisons
```

**GitHub Actions (CI/CD):**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist/awesome-comparisons
```

---

### Step 4.4: Docker Deployment

**Create Dockerfile:**

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist/awesome-comparisons /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**

```bash
# Build image
docker build -t awesome-comparisons .

# Run container
docker run -p 8080:80 awesome-comparisons
```

---

### Step 4.5: Performance Optimization

**Lazy Loading Routes:**

```typescript
// src/app/app.routes.ts

export const routes: Routes = [
  {
    path: 'comparison',
    loadComponent: () => import('./components/comparison/comparison.component')
      .then(m => m.ComparisonComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/config-admin/config-admin-shell.component')
      .then(m => m.ConfigAdminShellComponent)
  }
];
```

**Bundle Analysis:**

```bash
# Install analyzer
npm install --save-dev webpack-bundle-analyzer

# Build with stats
ng build --stats-json

# Analyze
npx webpack-bundle-analyzer dist/awesome-comparisons/stats.json
```

---

## Part 5: Practical Exercise (20 mins)

### Exercise: Add "Comparison View" Toggle

**Goal:** Allow users to switch between table view and card view

**Requirements:**

1. **Add view toggle button** to comparison component
2. **Create card view component** for displaying items as cards
3. **Store view preference** in NgRx state
4. **Persist preference** to localStorage
5. **Animate transition** between views

**Time Limit:** 20 minutes

---

**Step 1: Create Card View Component**

```bash
ng generate component components/comparison/card-view
```

```typescript
// card-view.component.ts
@Component({
  selector: 'app-card-view',
  template: `
    <div class="card-grid">
      <mat-card *ngFor="let item of items" class="item-card">
        <mat-card-header>
          <mat-card-title>{{ item.name }}</mat-card-title>
          <mat-card-subtitle>{{ item.criteria['Classification'] }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>{{ item.description }}</p>
          <div class="criteria-list">
            <div *ngFor="let criterion of displayedCriteria" class="criterion">
              <strong>{{ criterion.name }}:</strong>
              {{ item.criteria[criterion.name] }}
            </div>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button (click)="viewDetails(item)">Details</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px;
    }
    .item-card {
      height: 100%;
    }
  `]
})
export class CardViewComponent {
  @Input() items: ComparisonItem[];
  @Input() displayedCriteria: Criterion[];
  @Output() viewDetailsClick = new EventEmitter<ComparisonItem>();
}
```

---

**Step 2: Add State Management**

```typescript
// src/app/store/actions/view.actions.ts
export const toggleView = createAction('[View] Toggle View');
export const setView = createAction(
  '[View] Set View',
  props<{ view: 'table' | 'card' }>()
);

// src/app/store/reducers/view.reducer.ts
export interface ViewState {
  currentView: 'table' | 'card';
}

const initialState: ViewState = {
  currentView: 'table'
};

export const viewReducer = createReducer(
  initialState,
  on(toggleView, state => ({
    ...state,
    currentView: state.currentView === 'table' ? 'card' : 'table'
  })),
  on(setView, (state, { view }) => ({
    ...state,
    currentView: view
  }))
);
```

---

**Step 3: Update Comparison Component**

```typescript
// comparison.component.ts
export class ComparisonComponent {
  currentView$ = this.store.select(selectCurrentView);

  toggleView(): void {
    this.store.dispatch(toggleView());
  }
}
```

```html
<!-- comparison.component.html -->
<div class="view-controls">
  <button mat-icon-button (click)="toggleView()">
    <mat-icon>{{ (currentView$ | async) === 'table' ? 'view_module' : 'view_list' }}</mat-icon>
  </button>
</div>

<ng-container [ngSwitch]="currentView$ | async">
  <app-focused-comparison-sheet
    *ngSwitchCase="'table'"
    [items]="items$ | async"
    [criteria]="criteria$ | async">
  </app-focused-comparison-sheet>

  <app-card-view
    *ngSwitchCase="'card'"
    [items]="items$ | async"
    [displayedCriteria]="displayedCriteria$ | async">
  </app-card-view>
</ng-container>
```

---

**Step 4: Add localStorage Persistence**

```typescript
// src/app/store/effects/view.effects.ts

@Injectable()
export class ViewEffects {
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  // Save to localStorage on view change
  saveView$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setView, toggleView),
      withLatestFrom(this.store.select(selectCurrentView)),
      tap(([_, view]) => {
        localStorage.setItem('preferredView', view);
      })
    ),
    { dispatch: false }
  );

  // Load from localStorage on init
  loadView$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App] Init'),
      map(() => {
        const view = localStorage.getItem('preferredView') as 'table' | 'card';
        return setView({ view: view || 'table' });
      })
    )
  );
}
```

---

## Advanced Topics

### Topic 1: Server-Side Rendering (SSR)

**Add Angular Universal:**

```bash
ng add @nguniversal/express-engine
```

**Benefits:**
- Faster initial page load
- Better SEO
- Social media previews

**Build and serve:**

```bash
npm run build:ssr
npm run serve:ssr
```

---

### Topic 2: Progressive Web App (PWA)

**Add PWA support:**

```bash
ng add @angular/pwa
```

**Features:**
- Offline support
- Install to home screen
- Service worker caching
- Push notifications

**Configure caching:**

```json
// ngsw-config.json
{
  "dataGroups": [{
    "name": "api",
    "urls": ["/assets/data/**"],
    "cacheConfig": {
      "maxSize": 100,
      "maxAge": "1d"
    }
  }]
}
```

---

### Topic 3: Internationalization (i18n)

**Add translations:**

```typescript
// src/app/i18n/en.ts
export const translations = {
  'comparison.title': 'Comparison',
  'comparison.search': 'Search...',
  'comparison.export': 'Export'
};

// Usage
{{ 'comparison.title' | translate }}
```

**Multiple languages:**
- Create translation files for each language
- Detect user language
- Load appropriate translation
- Switch dynamically

---

### Topic 4: Testing Strategies

**Unit Tests:**

```typescript
// comparison.component.spec.ts
describe('ComparisonComponent', () => {
  let component: ComparisonComponent;
  let fixture: ComponentFixture<ComparisonComponent>;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComparisonComponent],
      providers: [provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ComparisonComponent);
    component = fixture.componentInstance;
  });

  it('should load items on init', () => {
    const items = [{ id: '1', name: 'Test' }];
    store.setState({ comparison: { items } });

    fixture.detectChanges();

    expect(component.items$.pipe(take(1))).toEqual(items);
  });
});
```

**E2E Tests:**

```typescript
// e2e/comparison.e2e-spec.ts
import { browser, by, element } from 'protractor';

describe('Comparison Page', () => {
  beforeEach(() => {
    browser.get('/comparison');
  });

  it('should display comparison table', () => {
    const table = element(by.css('.comparison-table'));
    expect(table.isPresent()).toBe(true);
  });

  it('should filter items on search', () => {
    const search = element(by.css('input[type="search"]'));
    search.sendKeys('offline');

    const rows = element.all(by.css('.comparison-table tr'));
    expect(rows.count()).toBeLessThan(10);
  });
});
```

---

### Topic 5: Analytics Integration

**Add Google Analytics:**

```typescript
// src/app/services/analytics.service.ts

import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  trackPageView(path: string): void {
    gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: path
    });
  }

  trackEvent(action: string, category: string, label?: string): void {
    gtag('event', action, {
      event_category: category,
      event_label: label
    });
  }
}

// Usage in component
constructor(private analytics: AnalyticsService) {}

exportToExcel(): void {
  this.analytics.trackEvent('export', 'comparison', 'excel');
  // ... export logic
}
```

---

## Quick Reference

### Angular CLI Commands

```bash
# Generate component
ng generate component components/my-component

# Generate service
ng generate service services/my-service

# Generate module
ng generate module modules/my-module

# Run tests
ng test

# Run e2e tests
ng e2e

# Build
ng build

# Serve
ng serve
```

---

### Project Structure Conventions

```
src/app/
├── components/          # UI components
│   ├── shared/         # Shared/reusable components
│   └── [feature]/      # Feature-specific components
├── services/           # Business logic services
├── store/              # NgRx state management
│   ├── actions/
│   ├── reducers/
│   ├── effects/
│   └── selectors/
├── models/             # TypeScript interfaces
├── utils/              # Helper functions
├── directives/         # Custom directives
├── pipes/              # Custom pipes
└── guards/             # Route guards
```

---

### NgRx Flow Diagram

```
Component
    ↓ (dispatch action)
Store
    ↓
Reducer (updates state)
    ↓
Selector (reads state)
    ↓
Component (receives data)

Side effects:
Action → Effect → Service → Action → Reducer
```

---

### TypeScript Tips

**Use interfaces for data:**
```typescript
interface ComparisonItem {
  id: string;
  name: string;
}
```

**Use type aliases for unions:**
```typescript
type ViewMode = 'table' | 'card';
```

**Use enums for constants:**
```typescript
enum CriterionType {
  TEXT = 'text',
  RATING = 'rating'
}
```

**Use generics for reusable code:**
```typescript
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}
```

---

## Troubleshooting

### Common Development Issues

**Issue:** Module not found errors
- **Solution:** Check import paths, run `npm install`

**Issue:** Template errors
- **Solution:** Check syntax, ensure variables are defined in component

**Issue:** State not updating
- **Solution:** Ensure reducers are pure functions, dispatch actions correctly

**Issue:** Build failures
- **Solution:** Check TypeScript errors, ensure all dependencies installed

**Issue:** Performance issues
- **Solution:** Use OnPush change detection, lazy load modules, optimize bundle

---

## Best Practices

### Code Quality

- Write unit tests for all components and services
- Use TypeScript strict mode
- Follow Angular style guide
- Use ESLint for code linting
- Document complex logic with comments
- Use meaningful variable/function names

### Performance

- Implement OnPush change detection
- Use trackBy in *ngFor loops
- Lazy load routes and modules
- Optimize images and assets
- Minimize bundle size
- Use virtual scrolling for large lists

### Architecture

- Keep components small and focused
- Use services for business logic
- Implement proper state management
- Follow SOLID principles
- Separate concerns (presentation vs logic)
- Make components reusable

---

## Completion Checklist

- [ ] Set up development environment
- [ ] Understand project structure
- [ ] Explored component architecture
- [ ] Learned NgRx state management
- [ ] Created custom criterion type
- [ ] Customized theme
- [ ] Added new export format
- [ ] Built production bundle
- [ ] Deployed to hosting platform
- [ ] Completed practical exercise

**Congratulations! You're now ready to extend Awesome Comparisons!**
