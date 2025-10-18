# Polyfills Entry Point

Minimal Angular 17 polyfill entry that only imports zone.js. Removes older core-js polyfills since modern browsers are targeted and Angular CLI now ships evergreen support by default.

## Target

[@generate](../../src/polyfills.ts)

## Capabilities

### Zone.js Import

Imports zone.js for Angular's change detection and async operation handling.

### Modern Browser Support

Targets modern browsers without legacy polyfills, leveraging Angular CLI's evergreen support.

## API

```typescript { .api }
// Zone JS is required by default for Angular itself.
import 'zone.js';
```

## Dependencies

- Zone.js package for Angular's change detection and async operation handling. [@use](../../package.json#zone.js)