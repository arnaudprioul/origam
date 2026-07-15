import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

import { THEME_BUILDER_BORDER_WIDTH_OPTIONS, THEME_BUILDER_CUSTOM_VALUE } from '~/consts/theme-builder-controls.const'

const NAMED_WIDTHS = new Set(THEME_BUILDER_BORDER_WIDTH_OPTIONS.map(o => o.value).filter(v => v !== THEME_BUILDER_CUSTOM_VALUE))

/**
 * useThemeBuilderBorderControl — business logic for the Border composite
 * control (Contrôle 5). Drives THREE real DS props (`border`, `borderStyle`,
 * `borderColor`) behind one popover.
 *
 * ⚠️ Per-side width (`borderTop`/…) and per-side color (`borderTopColor`/…)
 * are shown DISABLED, never wired to a live prop:
 *  - per-side width: `IBorderProps` declares `borderTop`/`borderRight`/
 *    `borderBottom`/`borderLeft`, but `useBorder` never reads them (literal
 *    `// TODO Create composable for border position` in
 *    `packages/ds/src/composables/Commons/border.composable.ts`) — verified dead.
 *  - per-side color: no `borderTopColor`/… props exist AT ALL on `IBorderProps`
 *    — verified absent, would need a DS interface + composable extension
 *    (tracked as DS #215 in the wireframe).
 * Wiring either to a real prop would silently do nothing — this repo's
 * CLAUDE.md explicitly forbids shipping that ("Half-implemented surfaces").
 */
export function useThemeBuilderBorderControl (
    borderValue: ComputedRef<unknown> | Ref<unknown>,
    onChangeWidth: (value: string | number | undefined) => void
) {
    const selectValue = computed<string>(() => {
        const raw = borderValue.value
        if (raw === undefined || raw === null || raw === '' || raw === false) return 'none'
        if (typeof raw === 'string' && NAMED_WIDTHS.has(raw)) return raw
        return THEME_BUILDER_CUSTOM_VALUE
    })

    const isCustom = computed(() => selectValue.value === THEME_BUILDER_CUSTOM_VALUE)

    const customWidth = ref(2)

    watch(borderValue, (raw) => {
        if (typeof raw === 'number') { customWidth.value = raw; return }
        if (typeof raw === 'string' && !NAMED_WIDTHS.has(raw)) {
            const m = /^(\d+(?:\.\d+)?)px$/.exec(raw.trim())
            if (m && m[1] !== undefined) customWidth.value = Number(m[1])
        }
    }, { immediate: true })

    const selectWidth = (value: string): void => {
        if (value === 'none') { onChangeWidth(undefined); return }
        if (value === THEME_BUILDER_CUSTOM_VALUE) { onChangeWidth(customWidth.value); return }
        onChangeWidth(value)
    }

    const setCustomWidth = (px: number): void => {
        customWidth.value = px
        onChangeWidth(px)
    }

    return { selectValue, isCustom, customWidth, selectWidth, setCustomWidth }
}
