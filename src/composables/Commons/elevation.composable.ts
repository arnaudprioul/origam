import { computed, isRef, ref, Ref } from 'vue'
import type { IElevationProps } from '../../interfaces'
import { TColor } from "../../types"
import { getCurrentInstanceName } from "../../utils"

/**
 * Map a numeric Material-style elevation (0..24) to a token rung in the
 * generated shadow ladder (`--origam-shadow-{none|xs|sm|md|lg|xl}`).
 *
 * Buckets are intentionally chunky — the Material 25-step ladder collapses
 * into a 6-token visual ladder. The mapping was tuned against the existing
 * usage in OrigamCard / OrigamBadge / OrigamChip.
 */
function elevationToToken (level: number): string {
    if (level <= 0) return 'none'
    if (level <= 1) return 'xs'
    if (level <= 3) return 'sm'
    if (level <= 8) return 'md'
    if (level <= 16) return 'lg'
    return 'xl'
}

/**
 * Origam-native shadow rungs the consumer can pass directly via the
 * `elevation` prop instead of a Material 0..24 number — e.g.
 * `<OrigamCard elevation="md">` is equivalent to `elevation="6"` but
 * makes the intent explicit. Lookup is identity (rung name == token
 * suffix). Numeric inputs still flow through `elevationToToken`.
 */
const ORIGAM_SHADOW_RUNGS = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'
])
function isOrigamRung (value: unknown): value is string {
    return typeof value === 'string' && ORIGAM_SHADOW_RUNGS.has(value)
}

/**
 * Subset of shadow rungs for which a global utility class exists in
 * `src/assets/css/tokens/origam-utilities.css` (Phase 1 manifest).
 * `2xl` and `3xl` are not yet emitted as utilities — they fall back
 * to the inline style path.
 */
const UTILITY_SHADOW_RUNGS: ReadonlySet<string> = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl'
])
function isUtilityRung (value: unknown): value is string {
    return typeof value === 'string' && UTILITY_SHADOW_RUNGS.has(value)
}

const _bgWarned = new WeakSet<object>()
function warnBgColorUsage (bgColor: TColor) {
    if (typeof console === 'undefined' || !bgColor) return
    // Use a sentinel object to avoid spamming the warning per render.
    const sentinel = { _: 'origam-elevation-bg-warn' } as const
    if (_bgWarned.has(sentinel)) return
    _bgWarned.add(sentinel)
    // eslint-disable-next-line no-console
    console.warn(
        '[origam] useElevation: the `bgColor` parameter is deprecated and ignored. ' +
        'Shadows now resolve from the design tokens (`--origam-shadow-*`) and switch with the active theme. ' +
        'The parameter will be removed in v3.0.0.'
    )
}

/**
 * `useElevation` — refactored to consume design tokens (Lot 1).
 *
 * Backward-compat:
 *   - The signature is preserved (`bgColor` accepted but ignored).
 *   - Returns the same shape: `{ elevationClasses, elevationStyles }`.
 *   - `elevationStyles` is still a string array — emits a single `box-shadow:`
 *     declaration that references the appropriate `--origam-shadow-*` token.
 */

/*********************************************************
 * useElevation
 ********************************************************/
export function useElevation (
    props: IElevationProps | Ref<number | string | undefined>,
    flat: Ref<boolean> = ref(false),
    bgColor: Ref<TColor> = ref('rgb(0,0,0)'),
    name = getCurrentInstanceName()
) {
    // Soft-warn the first time a non-default bgColor is provided.
    if (bgColor && bgColor.value && bgColor.value !== 'rgb(0,0,0)') {
        warnBgColorUsage(bgColor.value)
    }

    const elevationClasses = computed(() => {
        const elevation = isRef(props) ? props.value : props.elevation
        const classes: Array<string> = []

        if (elevation == null || flat.value) return classes

        classes.push(`${name}--elevated`)

        // Classes-first companion: when `elevation` resolves to a
        // utility-backed rung (Phase 1 manifest), emit the matching
        // global utility class so consumers can opt into the global
        // shadow layer. `2xl` / `3xl` and Material 0..24 numbers fall
        // through to the inline-style path below.
        if (isUtilityRung(elevation)) {
            classes.push(`origam--shadow-${elevation}`)
        } else if (!isOrigamRung(elevation)) {
            // Material 0..24 number (string or number) — bridge to the
            // utility ladder via the same token mapping as the inline
            // style path. We deliberately skip this branch for origam
            // rungs not in the utility set (`2xl`, `3xl`) so authors who
            // pass `elevation="2xl"` get the inline-style path instead
            // of a wrong utility class via `parseInt('2xl') === 2`.
            const numeric = typeof elevation === 'string' ? parseInt(elevation, 10) : elevation
            if (typeof numeric === 'number' && !Number.isNaN(numeric)) {
                const tokenName = elevationToToken(numeric)
                if (UTILITY_SHADOW_RUNGS.has(tokenName)) {
                    classes.push(`origam--shadow-${tokenName}`)
                }
            }
        }

        return classes
    })

    const elevationStyles = computed(() => {
        const elevation = isRef(props) ? props.value : props.elevation
        const styles: Array<string> = []

        if (elevation == null || flat.value) return styles

        // Origam-native rung shortcut — e.g. `elevation="md"` lands
        // straight on `var(--origam-shadow-md)` without going through
        // the Material 0..24 → token mapping. Authors get an explicit
        // intent ("medium shadow") rather than an opaque number.
        if (isOrigamRung(elevation)) {
            styles.push(`box-shadow: var(--origam-shadow-${elevation})`)
            return styles
        }

        const numeric = typeof elevation === 'string' ? parseInt(elevation, 10) : elevation
        if (Number.isNaN(numeric as number)) return styles

        const tokenName = elevationToToken(numeric as number)
        styles.push(`box-shadow: var(--origam-shadow-${tokenName})`)

        return styles
    })

    return {elevationClasses, elevationStyles}
}
