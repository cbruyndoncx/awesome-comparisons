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

declare const require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// Dynamically discover and load all .spec.ts files using Webpack's require.context
const context = (require as any).context('./', true, /\.spec\.ts$/);
context.keys().forEach(context);
