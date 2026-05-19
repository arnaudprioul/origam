/**
 * Drill-down sections rendered inside the `<OrigamMediaConfigMenu>`
 * tooltip surface. Driven internally by the menu — exported here for
 * tests / parent introspection via `defineExpose`.
 *
 *   - `'main'`    — top level: Quality / Speed rows + Download link
 *   - `'speed'`   — playback-rate picker
 *   - `'quality'` — quality-variant picker
 */
export type TMediaConfigSection = 'main' | 'speed' | 'quality'
