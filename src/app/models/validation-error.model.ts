// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../specs/app/models/validation-error-model.spec.md
// (spec:c8a452dc) (code:3059661a)

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
): ValidationError {
  const error: ValidationError = {
    field,
    message
  };

  if (value !== undefined) {
    error.value = value;
  }

  if (context?.groupId) {
    error.groupId = context.groupId;
  }

  if (context?.criteriaId) {
    error.criteriaId = context.criteriaId;
  }

  return error;
}

/**
 * Merges duplicate validation errors by field and context
 * @param errors Array of ValidationError objects to merge
 * @returns Deduplicated array with insertion order preserved
 */
export function mergeValidationErrors(errors: ValidationError[]): ValidationError[] {
  const seen = new Set<string>();
  const merged: ValidationError[] = [];

  for (const error of errors) {
    const key = `${error.field}|${error.groupId || ''}|${error.criteriaId || ''}`;
    
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(error);
    }
  }

  return merged;
}

/**
 * Checks if validation errors exist in the provided collection
 * @param errors Array of ValidationError objects or null/undefined
 * @returns True if errors exist, false otherwise
 */
export function hasValidationErrors(errors: ValidationError[] | null | undefined): boolean {
  return errors != null && errors.length > 0;
}
