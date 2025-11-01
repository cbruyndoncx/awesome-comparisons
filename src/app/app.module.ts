// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../specs/app/app-module.spec.md
// (spec:b6fe0086) (code:3437064e)

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
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
    BrowserAnimationsModule,
    ComparisonModule,
    MatTabsModule,
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
    StoreRouterConnectingModule.forRoot()
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
