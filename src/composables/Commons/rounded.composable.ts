import { computed, isRef, Ref } from 'vue'

import { BORDER_RADIUS_REGEX, PREDIFINED_ROUNDED } from '../../consts'

import type { IRoundedProps } from '../../interfaces'

import type { TRounded } from '../../types'

import { convertToUnit, formatRoundedStylesVar, getCurrentInstanceName } from '../../utils'

/**
 * Set of rounded values for which a global utility class exists in
 * `src/assets/css/tokens/origam-utilities.css` (Phase 1 manifest).
 *
 * NOTE: this set does NOT overlap the legacy `PREDIFINED_ROUNDED`
 * (`x-small | small | default | medium | large | x-large | shaped |
 * shaped-invert`) — the utility manifest follows the modern
 * `xs|sm|md|lg|xl` taxonomy plus `none|full`. Components that pass
 * `rounded="default"` or `rounded="x-small"` keep emitting their
 * component-local class (no utility companion). This mismatch is
 * documented in the Phase 2 report; a Phase 1.5 may bridge the
 * legacy ROUNDED enum onto utility names.
 */
const UTILITY_ROUNDED: ReadonlySet<string> = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'
])

function isUtilityRounded (value: unknown): value is string {
    return typeof value === 'string' && UTILITY_ROUNDED.has(value)
}

/**
 * Resolve the consumer's `rounded` prop into either a class (named variant
 * or legacy boolean) or an inline `border-radius` declaration (free-form
 * CSS value). Mirrors the origam-design-system implementation but uses a
 * static `PREDIFINED_ROUNDED` whitelist instead of the origam
 * theme-driven `useTheme().current.value.variables.rounded`, since origam
 * ships its radius rungs as fixed primitive tokens.
 *
 * Behaviour matrix:
 *
 * | `rounded` value           | output                                      |
 * |---------------------------|---------------------------------------------|
 * | unset / `false` / `null`  | nothing — component default radius wins      |
 * | `'small'`, `'large'`, …   | class `${name}--rounded-${value}`            |
 * | `true` or `''`            | class `${name}--rounded` (legacy)            |
 * | `4` (number)              | inline `border-radius: 4px`                  |
 * | `'4px'`                   | inline `border-radius: 4px`                  |
 * | `'4px 0 4px 0'`           | inline 4-corner radii                        |
 *
 * Free-form strings are parsed by `BORDER_RADIUS_REGEX`. Anything that
 * doesn't match is silently dropped (no inline style emitted).
 */
export function useRounded (
    props: IRoundedProps | Ref<boolean | number | string | TRounded | null | undefined>,
    name = getCurrentInstanceName()
) {
    const roundedClasses = computed(() => {
        const rounded = isRef(props) ? props.value : props.rounded
        const classes: Array<string> = []

        if (!rounded && rounded !== '') return classes

        // Modern utility variant: `'xs' | 'sm' | 'md' | 'lg' | 'xl' |
        // 'none' | 'full'` lands on the matching `.origam--rounded-*`
        // utility class. These are the names emitted by the Phase 1
        // manifest. They do NOT overlap with `PREDIFINED_ROUNDED`
        // (legacy enum); the legacy values continue to emit their
        // component-local class below.
        if (isUtilityRounded(rounded)) {
            classes.push(`origam--rounded-${rounded}`)
            return classes
        }

        // Named variant: `'small' | 'large' | …` matches one of the
        // entries in PREDIFINED_ROUNDED. Emits a class so the component's
        // SCSS can pick the right `--origam-{cmp}---border-radius` token.
        if (typeof rounded === 'string' && PREDIFINED_ROUNDED.includes(rounded as TRounded)) {
            classes.push(`${name}--rounded-${rounded}`)
            return classes
        }

        // Legacy boolean / empty-string opt-in for the single-state
        // `--rounded` chrome (kept for backward compat with
        // `<OrigamBtn rounded>`). The legacy boolean form historically
        // means "default radius" — companion utility class is `md`.
        if (rounded === true || (typeof rounded === 'string' && rounded === '')) {
            classes.push(`${name}--rounded`)
            classes.push('origam--rounded-md')
        }

        return classes
    })

    const roundedStyles = computed(() => {
        const rounded = isRef(props) ? props.value : props.rounded
        const styles: Array<string> = []

        // Named variants, modern utility values and boolean true are
        // handled by `roundedClasses` — no inline style needed.
        if (rounded === true || rounded === '' || rounded == null || rounded === false) return styles
        if (typeof rounded === 'string' && PREDIFINED_ROUNDED.includes(rounded as TRounded)) return styles
        if (isUtilityRounded(rounded)) return styles

        if (typeof rounded === 'string') {
            const match = BORDER_RADIUS_REGEX.exec(rounded)?.groups
            if (match) {
                Object.keys(match).forEach((key) => {
                    const values = String(match[key]).split(' ')

                    styles.push(...formatRoundedStylesVar(values))
                })
            }
        } else if (typeof rounded === 'number') {
            styles.push(`border-radius: ${convertToUnit(rounded)}`)
        }

        return styles
    })

    return {
        roundedClasses,
        roundedStyles
    }
}
