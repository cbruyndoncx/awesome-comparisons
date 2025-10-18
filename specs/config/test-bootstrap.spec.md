# Test Bootstrap Configuration

Sets up the Angular testing environment and test discovery for the application.

## Target

[@generate](../../src/test.ts)

## Capabilities

### Loads zone.js testing support

Imports zone.js/testing to provide Angular's testing zone implementation.

### Initializes Angular testing environment

Configures the Angular testing module with BrowserDynamicTestingModule and platformBrowserDynamicTesting to enable component and service testing.

### Provides test teardown hooks

Resets the testing module after each spec to ensure test isolation and prevent state leakage between tests.

### Discovers test files dynamically

Uses Vite-style dynamic imports (import.meta) to automatically discover and load .spec.ts files for test execution.

## API

```typescript { .api }
// Test bootstrap configuration file
// Sets up Angular testing environment and discovers test files
```

## Dependencies

### Zone.js Testing Support

Requires zone.js/testing for Angular's testing zone implementation.
[@use](../../package.json#zone.js)

### Angular Core Testing

Requires @angular/core/testing for Angular testing utilities and TestBed configuration.
[@use](../../package.json#angular-core)

### Angular Platform Browser Dynamic Testing

Requires @angular/platform-browser-dynamic/testing for browser-based testing platform.
[@use](../../package.json#angular-platform-browser-dynamic)