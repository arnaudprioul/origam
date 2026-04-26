/**
 * Generic shape for an Histoire `<HstSelect>` option list. The `value` is
 * the raw prop value passed to the component; `label` is the human-readable
 * string displayed in the picker.
 *
 * Mirrors the optimus convention so the same shape can be consumed by any
 * generic `HstSelect`/`HstRadios`/`HstCheckboxList` control.
 */
export interface IOptions<T> {
    label: string
    value: T
}
