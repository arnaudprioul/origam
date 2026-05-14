/**
 * Generic select-option shape used across origam stories AND components
 * (Select, RadioGroup, ChipGroup, BtnToggle…). Reusable everywhere a
 * label/value pair is needed.
 *
 * `value` is `T | undefined` so consumers can model an explicit "no value"
 * row without leaving the typed union.
 */
export interface IOptions<T> {
    label: string
    value: T | undefined
}
