import type { VNode } from "vue"

/**
 * Dynamic-component descriptor for a KV row value.
 *
 * Used when a consumer wants the value cell to render a registered Origam
 * component (chip, avatar, link, …) without writing a slot. The
 * `component` field accepts either:
 *   - the Vue component itself (imported), or
 *   - a registered global tag name (e.g. `'origam-chip'`).
 *
 * `props` is forwarded as-is to the resolved component. `children`, when
 * provided, is rendered inside the component's default slot — handy for
 * components that take their text as a slot rather than a prop (e.g.
 * `<origam-chip>{{ label }}</origam-chip>`).
 */
export interface IDataListKVItemValueComponent {
    component: string | object
    props?: Record<string, unknown>
    children?: string | number
}

/**
 * Shape of a single key/value row when the parent `<OrigamDataList>` runs
 * in `mode="kv"`.
 *
 * - `key` is the visible label rendered in the `<dt>` cell. The component
 *   also kebab-cases it to build the row's `data-cy` selector
 *   (`data-list-kv-row-{kebab(key)}`).
 * - `value` is what fills the `<dd>` cell:
 *   • `string | number` → rendered as plain text;
 *   • `VNode` → rendered as-is (use `h(...)` from a render function);
 *   • `IDataListKVItemValueComponent` → resolved via `<component :is>`.
 *
 * For per-row overrides beyond what this contract exposes, use the
 * `#value` / `#key` slots — they receive the full item.
 */
export interface IDataListKVItem {
    key: string
    value: string | number | VNode | IDataListKVItemValueComponent
    /**
     * Optional stable id for the row. When omitted the component falls
     * back to `key` for slot keying — fine for unique-key datasets, but
     * supply your own when keys may repeat across instances.
     */
    id?: string | number
}

/**
 * Type-guard helper — narrows `value` to the dynamic-component shape so
 * the template can call `<component :is>` without optional chaining
 * gymnastics.
 */
export function isDataListKVItemValueComponent (
    v: IDataListKVItem["value"]
): v is IDataListKVItemValueComponent {
    return typeof v === "object" && v !== null && "component" in (v as object)
}
