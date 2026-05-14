/**
 * Dynamic-component descriptor for a KV row value.
 *
 * Used when a consumer wants the value cell of `<OrigamDataList mode="kv">`
 * to render a registered Origam component (chip, avatar, link, …)
 * without writing a slot. The `component` field accepts either:
 *   - the Vue component itself (imported), or
 *   - a registered global tag name (e.g. `'origam-chip'`).
 *
 * `props` is forwarded as-is to the resolved component. `children`,
 * when provided, is rendered inside the component's default slot —
 * handy for components that take their text as a slot rather than a
 * prop (e.g. `<origam-chip>{{ label }}</origam-chip>`).
 */
export interface IDataListKVItemValueComponent {
    component: string | object
    props?: Record<string, unknown>
    children?: string | number
}
