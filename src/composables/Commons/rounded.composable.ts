import { computed, isRef, Ref } from 'vue'

import { BORDER_RADIUS_REGEX, PREDIFINED_ROUNDED } from '../../consts'

import type { IRoundedProps } from '../../interfaces'

import type { TRounded } from '../../types'

import { convertToUnit, formatRoundedStylesVar, getCurrentInstanceName } from '../../utils'

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

        // Named variant: `'small' | 'large' | …` matches one of the
        // entries in PREDIFINED_ROUNDED. Emits a class so the component's
        // SCSS can pick the right `--origam-{cmp}---border-radius` token.
        if (typeof rounded === 'string' && PREDIFINED_ROUNDED.includes(rounded as TRounded)) {
            classes.push(`${name}--rounded-${rounded}`)
            return classes
        }

        // Legacy boolean / empty-string opt-in for the single-state
        // `--rounded` chrome (kept for backward compat with
        // `<OrigamBtn rounded>`).
        if (rounded === true || rounded === '') {
            classes.push(`${name}--rounded`)
        }

        return classes
    })

    const roundedStyles = computed(() => {
        const rounded = isRef(props) ? props.value : props.rounded
        const styles: Array<string> = []

        // Named variants and boolean true are handled by `roundedClasses`
        // — no inline style needed.
        if (rounded === true || rounded === '' || rounded == null || rounded === false) return styles
        if (typeof rounded === 'string' && PREDIFINED_ROUNDED.includes(rounded as TRounded)) return styles

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
