import type { IActiveState, IHoverState, IOptions } from '@origam/interfaces'

/**
 * Pre-defined `hover` configurations for the `Prop — hover` variant in
 * stories. Mirrors the layered API of `borderList` / `roundedList`:
 *
 *   • `false` / `undefined`      — no hover effect.
 *   • `true`                     — force the state on with NO override.
 *   • An `IHoverState` object    — partial / full visual override.
 *
 * Each entry covers a single axis or a combo of axes so a single
 * sidebar control demonstrates the full surface of the new API.
 */
export const hoverList: Array<IOptions<boolean | IHoverState | undefined>> = [
    // ── Off / boolean ───────────────────────────────────────────
    { label: 'No hover effect', value: undefined },
    { label: 'Force-on (boolean true, no override)', value: true },

    // ── Single-axis overrides ───────────────────────────────────
    { label: 'bgColor → success',  value: { bgColor: 'success' } },
    { label: 'bgColor → warning',  value: { bgColor: 'warning' } },
    { label: 'bgColor → danger',   value: { bgColor: 'danger' } },
    { label: 'color → primary',    value: { color: 'primary' } },
    { label: 'border → thick',     value: { border: 'thick' } },
    { label: 'border → 2px dashed',value: { border: '2px dashed' } },
    { label: 'rounded → full',     value: { rounded: 'full' } },
    { label: 'rounded → lg',       value: { rounded: 'lg' } },
    { label: 'elevation → md',     value: { elevation: 'md' } },
    { label: 'elevation → xl',     value: { elevation: 'xl' } },
    { label: 'padding → 8',        value: { padding: 8 } },
    { label: 'margin → 4',         value: { margin: 4 } },

    // ── Combos ──────────────────────────────────────────────────
    {
        label: 'Combo · bg success + thick border',
        value: { bgColor: 'success', border: 'thick' },
    },
    {
        label: 'Combo · bg primary + rounded full + elevation md',
        value: { bgColor: 'primary', rounded: 'full', elevation: 'md' },
    },
    {
        label: 'Combo · color danger + 2px dotted border',
        value: { color: 'danger', border: '2px dotted' },
    },
    {
        label: 'Combo · full surface swap (color + bg + border + rounded)',
        value: { color: 'success', bgColor: 'success', border: 'thin', rounded: 'lg' },
    },

    // ── Forced ON + override ────────────────────────────────────
    {
        label: 'enabled + bg warning',
        value: { enabled: true, bgColor: 'warning' },
    },
]

/**
 * Pre-defined `active` configurations. Same shape as `hoverList` —
 * just a different label set so the two controls don't conflate.
 */
export const activeList: Array<IOptions<boolean | IActiveState | undefined>> = [
    { label: 'No active effect', value: undefined },
    { label: 'Force-on (boolean true, no override)', value: true },

    { label: 'bgColor → success',  value: { bgColor: 'success' } },
    { label: 'bgColor → danger',   value: { bgColor: 'danger' } },
    { label: 'color → primary',    value: { color: 'primary' } },
    { label: 'border → thick',     value: { border: 'thick' } },
    { label: 'border → 2px dotted',value: { border: '2px dotted' } },
    { label: 'rounded → full',     value: { rounded: 'full' } },
    { label: 'elevation → lg',     value: { elevation: 'lg' } },
    { label: 'padding → 8',        value: { padding: 8 } },
    { label: 'margin → 4',         value: { margin: 4 } },

    {
        label: 'Combo · bg primary + thick border',
        value: { bgColor: 'primary', border: 'thick' },
    },
    {
        label: 'Combo · color success + rounded full',
        value: { color: 'success', rounded: 'full' },
    },
    {
        label: 'Combo · full surface swap (color + bg + border + rounded)',
        value: { color: 'danger', bgColor: 'danger', border: 'thin', rounded: 'lg' },
    },
    {
        label: 'enabled + bg success',
        value: { enabled: true, bgColor: 'success' },
    },
]
