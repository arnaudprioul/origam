/**
 * Controls rendering strategy for `<OrigamSound>`.
 *
 * - `'custom'` (default): the component paints its own toolbar with
 *   play/pause, scrubber, volume, and an optional waveform. The
 *   `<audio>` element is rendered WITHOUT the native `controls`
 *   attribute so the two UIs do not stack.
 * - `'native'`: the `<audio>` element receives the native `controls`
 *   attribute and the browser paints its own toolbar. No custom UI is
 *   rendered. Useful when the platform's accessibility shortcuts
 *   matter more than a unified visual identity.
 * - `'none'`: neither the custom nor the native toolbar is rendered.
 *   The consumer drives playback programmatically through the
 *   `#controls` slot or the exposed composable methods.
 */
export type TSoundControls = 'custom' | 'native' | 'none'
