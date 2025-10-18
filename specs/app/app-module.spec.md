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

### Configures Routing

Sets up application routing with default route configuration:
- Default empty path ('') renders ComparisonComponent
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
import { ComparisonComponent } from './components/comparison/comparison.component';
import { masterReducer } from './redux/uc.reducers';
import { CustomRouterStateSerializer } from './redux/custom-router-state-serializer';

@NgModule({
  imports: [
    BrowserModule,
    ComparisonModule,
    RouterModule.forRoot(
      [
        { path: '', component: ComparisonComponent }
      ],
      { useHash: false }
    ),
    StoreModule.forRoot({ state: masterReducer }),
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
  declarations: [AppComponent],
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

### ComparisonComponent  
Component rendered for the default route.  
[@use](./components/comparison/comparison.component)

### Master Reducer  
Root reducer for the application state management.  
[@use](./redux/uc.reducers)

### Custom Router State Serializer  
Custom serializer for router state integration with ngrx store.  
[@use](./redux/custom-router-state-serializer)