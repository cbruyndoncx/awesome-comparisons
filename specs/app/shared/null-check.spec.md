# Null Check Utility

Utility module for checking null and undefined values. Provides a tree-shakable helper function without Angular dependencies.

## Target

[@generate](../../../src/app/shared/util/null-check.ts)

## Capabilities

### Check for null or undefined values

Returns true when the argument is null or undefined, false otherwise.

### Tree-shakable exports

Provides both default and named exports for flexible importing.

### Compatibility alias for existing code

Existing code can import the `isNullOrUndefined` alias for backward compatibility while transitioning to the primary `isNil` function.

### Angular-independent implementation

No Angular dependencies, making it suitable for use in any TypeScript/JavaScript context.

## API

```typescript { .api }
/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns true if the value is null or undefined, false otherwise
 */
export function isNil(value: any): boolean;

/**
 * Compatibility alias for isNil function
 * @param value - The value to check
 * @returns true if the value is null or undefined, false otherwise
 */
export function isNullOrUndefined(value: any): boolean;

export default isNil;
```

## Dependencies

None - this utility has no external dependencies to maintain tree-shaking compatibility and Angular independence.