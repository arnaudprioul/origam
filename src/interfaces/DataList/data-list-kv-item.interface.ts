import type { VNode } from 'vue'

import type { IDataListKVItemValueComponent } from './data-list-kv-item-value-component.interface'

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
 *
 * The `IDataListKVItemValueComponent` interface lives in its own file
 * (`data-list-kv-item-value-component.interface.ts`) per the project
 * convention "one interface per file under `src/interfaces/`".
 *
 * The companion type-guard `isDataListKVItemValueComponent` lives in
 * `src/utils/DataList/` (functions belong in utils, not interfaces).
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
