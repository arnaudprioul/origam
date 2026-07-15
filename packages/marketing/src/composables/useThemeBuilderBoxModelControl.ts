import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'

import { THEME_BUILDER_CUSTOM_VALUE, THEME_BUILDER_SPACING_SCALE } from '~/consts/theme-builder-controls.const'
import {
    isThemeBuilderSpacingScale,
    resolveBoxModelState,
    serializeBoxModelState
} from '~/utils/theme-builder-box-model.util'
import type { IThemeBuilderBoxModelEdges } from '~/utils/theme-builder-box-model.util'
import type { TThemeBuilderBoxModelEdge, TThemeBuilderBoxModelMode } from '~/types/theme-builder-controls.type'

/**
 * useThemeBuilderBoxModelControl — business logic for the Padding / Margin
 * box-model editor (Contrôle 6). One instance drives EITHER `padding` OR
 * `margin` (never both) — the composite is deliberately kept as two separate
 * single-prop controls (see `theme-builder.interface.ts` doc on `box-model`).
 *
 * `axis === 'margin'` disables the "Vertical / Horizontal" link mode (DS
 * gap — `formatMarginStylesVar` has no `case 2`, see the util's module doc).
 */
export function useThemeBuilderBoxModelControl (
    modelValue: ComputedRef<unknown> | Ref<unknown>,
    axis: 'padding' | 'margin',
    onChange: (value: string | undefined) => void
) {
    const scaleValue = computed<string>(() => {
        const raw = modelValue.value
        if (isThemeBuilderSpacingScale(raw)) return raw
        if (raw === undefined || raw === null || raw === '') return 'none'
        return THEME_BUILDER_CUSTOM_VALUE
    })

    const isCustom = computed(() => scaleValue.value === THEME_BUILDER_CUSTOM_VALUE)

    const mode = ref<TThemeBuilderBoxModelMode>('linked')
    const edges = ref<IThemeBuilderBoxModelEdges>({ top: 0, left: 0, bottom: 0, right: 0 })

    /** Margin can't use axis mode (DS gap) — force it back to unlinked if selected before the switch. */
    const axisModeDisabled = computed(() => axis === 'margin')

    watch(modelValue, (raw) => {
        if (typeof raw !== 'string' || isThemeBuilderSpacingScale(raw)) return
        const resolved = resolveBoxModelState(raw)
        mode.value = resolved.mode
        edges.value = resolved.edges
    }, { immediate: true })

    const selectScale = (value: string): void => {
        if (value === 'none') { onChange(undefined); return }
        if (value === THEME_BUILDER_CUSTOM_VALUE) {
            onChange(serializeBoxModelState({ mode: mode.value, edges: edges.value }))
            return
        }
        onChange(value)
    }

    const setMode = (next: TThemeBuilderBoxModelMode): void => {
        if (next === 'axis' && axisModeDisabled.value) return
        mode.value = next
        onChange(serializeBoxModelState({ mode: next, edges: edges.value }))
    }

    const setEdge = (edge: TThemeBuilderBoxModelEdge, px: number): void => {
        if (mode.value === 'linked') {
            edges.value = { top: px, left: px, bottom: px, right: px }
        } else if (mode.value === 'axis') {
            if (edge === 'top' || edge === 'bottom') edges.value = { ...edges.value, top: px, bottom: px }
            else edges.value = { ...edges.value, left: px, right: px }
        } else {
            edges.value = { ...edges.value, [edge]: px }
        }
        onChange(serializeBoxModelState({ mode: mode.value, edges: edges.value }))
    }

    return {
        scaleOptions: THEME_BUILDER_SPACING_SCALE,
        scaleValue,
        isCustom,
        mode,
        edges,
        axisModeDisabled,
        selectScale,
        setMode,
        setEdge
    }
}
