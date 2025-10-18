// GENERATED FROM SPEC - DO NOT EDIT
// @generated with Tessl v0.28.0 from ../../../../specs/app/shared/null-check.spec.md
// (spec:306177cc) (code:223aa581)

/**
 * Checks if a value is null or undefined
 * @param value - The value to check
 * @returns true if the value is null or undefined, false otherwise
 */
export function isNil(value: any): boolean {
  return value === null || value === undefined;
}

/**
 * Compatibility alias for isNil function
 * @param value - The value to check
 * @returns true if the value is null or undefined, false otherwise
 */
export function isNullOrUndefined(value: any): boolean {
  return isNil(value);
}

export default isNil;
