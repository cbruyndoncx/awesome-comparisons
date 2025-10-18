// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../specs/config/test-bootstrap.spec.md
// (spec:c076f5bc) (code:ae1cf4cd)

import 'zone.js/testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Reset the testing module after each test to ensure isolation
afterEach(() => {
  getTestBed().resetTestingModule();
});

// Dynamically discover and load all .spec.ts files using Vite-style imports
const specModules = import.meta.glob('./**/*.spec.ts', { eager: true });

// Import each spec module to register its tests
Object.values(specModules).forEach((module) => {
  // Modules are loaded eagerly, side effects register tests
});
