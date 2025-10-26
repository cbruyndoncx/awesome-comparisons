# Angular Root Module

Configures the Angular root application module with core dependencies, routing, and state management.

## Target

[@generate](../../src/app/app.module.ts)

## Capabilities

### Bootstraps Application

Configures AppComponent as the bootstrap component for the application.

### Imports Core Dependencies

Imports essential Angular and application modules:
- BrowserModule for browser platform support
- ComparisonModule for comparison functionality
- StoreModule configured with masterReducer for state management
- StoreRouterConnectingModule for router-store integration
- Runtime checks configured to disable strict immutability/serializability to support legacy reducers

### Configures Routing

Sets up application routing with default route configuration:
- Default empty path ('') renders DatasetShellComponent so the wrapper can manage dataset selection before showing the comparison UI
- Integrates router state with ngrx store

### Provides Application Configuration

Configures application-level providers:
- APP_BASE_HREF from window['_app_base'] with fallback to '/'
- CustomRouterStateSerializer implementing RouterStateSerializer

## API

```typescript { .api }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { ComparisonModule } from './components/comparison/comparison.module';
import { DatasetShellComponent } from './components/datasets/dataset-shell.component';
import { masterReducer } from './redux/uc.reducers';
import { CustomRouterStateSerializer } from './redux/custom-router-state-serializer';

@NgModule({
  imports: [
    BrowserModule,
    ComparisonModule,
    RouterModule.forRoot(
      [
        { path: '', component: DatasetShellComponent }
      ],
      { useHash: false }
    ),
    StoreModule.forRoot(
      { state: masterReducer },
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
          strictStateSerializability: false,
          strictActionSerializability: false
        }
      }
    ),
    StoreRouterConnectingModule
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: window['_app_base'] || '/'
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer
    }
  ],
  declarations: [
    AppComponent,
    DatasetShellComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Dependencies

### AppComponent  
Application root component that serves as the bootstrap component.  
[@use](./app.component)

### ComparisonModule  
Feature module containing comparison functionality and components.  
[@use](./components/comparison/comparison.module)

### DatasetShellComponent  
Wrapper component that manages dataset selection and renders the ComparisonComponent.  
[@use](./components/datasets/dataset-shell.component.ts)

### Master Reducer  
Root reducer for the application state management.  
[@use](./redux/uc.reducers)

### Custom Router State Serializer  
Custom serializer for router state integration with ngrx store.  
[@use](./redux/custom-router-state-serializer)

### Angular Core & Router  
Framework modules required for bootstrapping and routing.  
[@use](../../package.json#@angular/core)  
[@use](../../package.json#@angular/platform-browser)  
[@use](../../package.json#@angular/router)  
[@use](../../package.json#@angular/common)

### NgRx Store  
State management modules used by the application.  
[@use](../../package.json#@ngrx/store)  
[@use](../../package.json#@ngrx/router-store)
