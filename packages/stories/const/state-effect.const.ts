import type { IActiveState, IHoverState, IOptions } from '@origam/interfaces'

/**
 * Pre-defined `hover` configurations for the `Prop — hover` variant in
 * stories. Mirrors the layered API of `borderList` / `roundedList`:
 *
 *   • `false` / `undefined`      — no hover effect.
 *   • `true`                     — force the state on with NO override.
 *   • An `IHoverState` object    — partial / full visual override.
 *
 * The list is intentionally exhaustive so a single sidebar control can
 * showcase the full polymorphic surface: every axis alone, every pair,
 * a few triples and a full-surface swap.
 */
export const hoverList: Array<IOptions<IHoverState>> = [
    // ── Single-axis ────────────────────────────────────────────────
    { label: 'color → primary',                              value: { color: 'primary' } },
    { label: 'color → success',                              value: { color: 'success' } },
    { label: 'color → danger',                               value: { color: 'danger' } },
    { label: 'bgColor → success',                            value: { bgColor: 'success' } },
    { label: 'bgColor → warning',                            value: { bgColor: 'warning' } },
    { label: 'bgColor → danger',                             value: { bgColor: 'danger' } },
    { label: 'border → thick',                               value: { border: 'thick' } },
    { label: 'border → 2px dashed',                          value: { border: '2px dashed' } },
    { label: 'border → 2px dotted',                          value: { border: '2px dotted' } },
    { label: 'rounded → sm',                                 value: { rounded: 'sm' } },
    { label: 'rounded → lg',                                 value: { rounded: 'lg' } },
    { label: 'rounded → full',                               value: { rounded: 'full' } },
    { label: 'elevation → sm',                               value: { elevation: 'sm' } },
    { label: 'elevation → md',                               value: { elevation: 'md' } },
    { label: 'elevation → xl',                               value: { elevation: 'xl' } },
    { label: 'padding → 8',                                  value: { padding: 8 } },
    { label: 'padding → 16',                                 value: { padding: 16 } },
    { label: 'margin → 4',                                   value: { margin: 4 } },
    { label: 'margin → 12',                                  value: { margin: 12 } },
    { label: 'gap → 8',                                      value: { gap: 8 } },

    // ── Dual-axis combos ──────────────────────────────────────────
    { label: 'rounded + border',                             value: { rounded: 'full', border: 'thick' } },
    { label: 'rounded + bgColor',                            value: { rounded: 'full', bgColor: 'success' } },
    { label: 'rounded + elevation',                          value: { rounded: 'lg', elevation: 'md' } },
    { label: 'bgColor + border',                             value: { bgColor: 'success', border: 'thick' } },
    { label: 'bgColor + elevation',                          value: { bgColor: 'warning', elevation: 'lg' } },
    { label: 'color + bgColor',                              value: { color: 'success', bgColor: 'success' } },
    { label: 'color + border',                               value: { color: 'danger', border: '2px dotted' } },
    { label: 'border + elevation',                           value: { border: 'thick', elevation: 'xl' } },
    { label: 'padding + margin',                             value: { padding: 8, margin: 4 } },

    // ── Triple-axis combos ────────────────────────────────────────
    { label: 'rounded + bgColor + border',                   value: { rounded: 'full', bgColor: 'success', border: 'thick' } },
    { label: 'rounded + bgColor + elevation',                value: { rounded: 'lg', bgColor: 'primary', elevation: 'md' } },
    { label: 'color + bgColor + border',                     value: { color: 'success', bgColor: 'success', border: 'thin' } },
    { label: 'rounded + border + elevation',                 value: { rounded: 'full', border: 'thick', elevation: 'md' } },

    // ── Full surface swap ─────────────────────────────────────────
    { label: 'full swap (color + bg + border + rounded)',    value: { color: 'success', bgColor: 'success', border: 'thin', rounded: 'lg' } },
    { label: 'full swap + elevation',                        value: { color: 'success', bgColor: 'success', border: 'thin', rounded: 'lg', elevation: 'md' } },

    // ── Forced ON + override ──────────────────────────────────────
    { label: 'enabled + bgColor warning',                    value: { enabled: true, bgColor: 'warning' } },
    { label: 'enabled + rounded + border',                   value: { enabled: true, rounded: 'full', border: 'thick' } },
]

/**
 * Pre-defined `active` configurations. Same shape as `hoverList` —
 * different label set so the two controls don't conflate.
 */
export const activeList: Array<IOptions<IActiveState>> = [
    // ── Single-axis ────────────────────────────────────────────────
    { label: 'color → primary',                              value: { color: 'primary' } },
    { label: 'color → success',                              value: { color: 'success' } },
    { label: 'color → danger',                               value: { color: 'danger' } },
    { label: 'bgColor → success',                            value: { bgColor: 'success' } },
    { label: 'bgColor → warning',                            value: { bgColor: 'warning' } },
    { label: 'bgColor → danger',                             value: { bgColor: 'danger' } },
    { label: 'border → thick',                               value: { border: 'thick' } },
    { label: 'border → 2px dashed',                          value: { border: '2px dashed' } },
    { label: 'border → 2px dotted',                          value: { border: '2px dotted' } },
    { label: 'rounded → sm',                                 value: { rounded: 'sm' } },
    { label: 'rounded → lg',                                 value: { rounded: 'lg' } },
    { label: 'rounded → full',                               value: { rounded: 'full' } },
    { label: 'elevation → sm',                               value: { elevation: 'sm' } },
    { label: 'elevation → md',                               value: { elevation: 'md' } },
    { label: 'elevation → lg',                               value: { elevation: 'lg' } },
    { label: 'padding → 8',                                  value: { padding: 8 } },
    { label: 'padding → 16',                                 value: { padding: 16 } },
    { label: 'margin → 4',                                   value: { margin: 4 } },
    { label: 'margin → 12',                                  value: { margin: 12 } },
    { label: 'gap → 8',                                      value: { gap: 8 } },

    // ── Dual-axis combos ──────────────────────────────────────────
    { label: 'rounded + border',                             value: { rounded: 'full', border: 'thick' } },
    { label: 'rounded + bgColor',                            value: { rounded: 'full', bgColor: 'primary' } },
    { label: 'rounded + elevation',                          value: { rounded: 'lg', elevation: 'md' } },
    { label: 'bgColor + border',                             value: { bgColor: 'primary', border: 'thick' } },
    { label: 'bgColor + elevation',                          value: { bgColor: 'danger', elevation: 'lg' } },
    { label: 'color + bgColor',                              value: { color: 'success', bgColor: 'success' } },
    { label: 'color + border',                               value: { color: 'success', border: '2px dotted' } },
    { label: 'border + elevation',                           value: { border: 'thick', elevation: 'lg' } },
    { label: 'padding + margin',                             value: { padding: 8, margin: 4 } },

    // ── Triple-axis combos ────────────────────────────────────────
    { label: 'rounded + bgColor + border',                   value: { rounded: 'full', bgColor: 'primary', border: 'thick' } },
    { label: 'rounded + bgColor + elevation',                value: { rounded: 'lg', bgColor: 'success', elevation: 'md' } },
    { label: 'color + bgColor + border',                     value: { color: 'danger', bgColor: 'danger', border: 'thin' } },
    { label: 'rounded + border + elevation',                 value: { rounded: 'full', border: 'thick', elevation: 'md' } },

    // ── Full surface swap ─────────────────────────────────────────
    { label: 'full swap (color + bg + border + rounded)',    value: { color: 'danger', bgColor: 'danger', border: 'thin', rounded: 'lg' } },
    { label: 'full swap + elevation',                        value: { color: 'danger', bgColor: 'danger', border: 'thin', rounded: 'lg', elevation: 'lg' } },

    // ── Forced ON + override ──────────────────────────────────────
    { label: 'enabled + bgColor success',                    value: { enabled: true, bgColor: 'success' } },
    { label: 'enabled + rounded + border',                   value: { enabled: true, rounded: 'full', border: 'thick' } },
]

/**
 * String-keyed option sets for the `hover` / `active` Histoire controls,
 * plus the resolvers that turn a key back into the real `IHoverState` /
 * `IActiveState` object inside a story's `#default`.
 *
 * WHY STRINGS INSTEAD OF BINDING THE OBJECTS DIRECTLY:
 * Histoire syncs control state from the panel into the sandbox iframe via
 * `applyState` (`@histoire/shared`):
 *
 *   if (typeof target[key] === 'object' && !Array.isArray(target[key]))
 *       Object.assign(target[key], state[key])   // MERGE
 *   else
 *       target[key] = state[key]                 // REPLACE
 *
 * So when `state.hover` already holds an object, a new selection is
 * `Object.assign`-MERGED into it ({ bgColor } then { border } →
 * { bgColor, border }) instead of replacing it — the exact bug seen in the
 * State variants. A primitive string can never be merged, so the control
 * stores the option's label as a key; the story resolves it to the object
 * at render time. Every other select works already because its values are
 * primitives (color, size, variant…).
 */
export const HOVER_OPTIONS: Array<IOptions<string>> = hoverList.map((option) => ({
    label: option.label,
    value: option.label
}))

export const ACTIVE_OPTIONS: Array<IOptions<string>> = activeList.map((option) => ({
    label: option.label,
    value: option.label
}))

const HOVER_STATE_BY_KEY: Record<string, IHoverState | undefined> =
    Object.fromEntries(hoverList.map((option) => [option.label, option.value]))

const ACTIVE_STATE_BY_KEY: Record<string, IActiveState | undefined> =
    Object.fromEntries(activeList.map((option) => [option.label, option.value]))

export function resolveHoverState (key: string | boolean | undefined): IHoverState | boolean | undefined {
    if (key == null || typeof key === 'boolean') return key

    return HOVER_STATE_BY_KEY[key]
}

export function resolveActiveState (key: string | boolean | undefined): IActiveState | boolean | undefined {
    if (key == null || typeof key === 'boolean') return key

    return ACTIVE_STATE_BY_KEY[key]
}
