# ValidationError Model

ValidationError helper types for Config Admin forms. Provides framework-agnostic validation error handling and utility functions.

## Target

[@generate](../../../src/app/models/validation-error.model.ts)

## Capabilities

### ValidationError Interface

Defines the structure for validation errors with required field and message, optional value, and scoping support for groups and entries.

- Has required `field` string property
- Has required `message` string property  
- Has optional `value` property of any type
- Has optional `groupId` string for scoping errors to groups
- Has optional `criteriaId` string for scoping errors to entries

### Create Validation Error

Utility function to construct ValidationError objects with optional context parameters.

- Creates error with field and message
- Accepts optional value parameter
- Accepts optional context object with groupId and criteriaId
- Returns properly typed ValidationError object

### Merge Validation Errors

Merges duplicate validation errors by field and context while preserving insertion order.

- Takes array of ValidationError objects
- Merges errors with same field and matching context (groupId, criteriaId)
- Preserves insertion order of first occurrence
- Returns deduplicated array of ValidationError objects

### Check for Validation Errors

Helper function to determine if validation errors exist in a collection.

- Takes array of ValidationError objects or null/undefined
- Returns boolean indicating presence of errors
- Handles null and undefined inputs gracefully

### Re-export ValidationError

Re-exports the ValidationError interface from the module for convenient importing.

## API

```typescript { .api }
/**
 * Represents a validation error with field information and optional context
 */
export interface ValidationError {
  /** The field name that has the validation error */
  field: string;
  /** The validation error message */
  message: string;
  /** Optional value that caused the validation error */
  value?: any;
  /** Optional group identifier for scoping errors */
  groupId?: string;
  /** Optional criteria identifier for scoping errors */
  criteriaId?: string;
}

/**
 * Creates a ValidationError object with the specified parameters
 * @param field The field name that has the validation error
 * @param message The validation error message
 * @param value Optional value that caused the validation error
 * @param context Optional context object with groupId and criteriaId
 * @returns A properly constructed ValidationError object
 */
export function createValidationError(
  field: string, 
  message: string, 
  value?: any, 
  context?: { groupId?: string; criteriaId?: string }
): ValidationError;

/**
 * Merges duplicate validation errors by field and context
 * @param errors Array of ValidationError objects to merge
 * @returns Deduplicated array with insertion order preserved
 */
export function mergeValidationErrors(errors: ValidationError[]): ValidationError[];

/**
 * Checks if validation errors exist in the provided collection
 * @param errors Array of ValidationError objects or null/undefined
 * @returns True if errors exist, false otherwise
 */
export function hasValidationErrors(errors: ValidationError[] | null | undefined): boolean;

// Re-export for convenience
export { ValidationError };
```

## Dependencies

None - module is framework-agnostic and has no external dependencies.
