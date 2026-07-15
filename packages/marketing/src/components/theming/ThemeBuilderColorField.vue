<script setup lang="ts">
import { computed, ref } from 'vue'

import { useT } from '~/composables/useT'
import { isThemeBuilderHexColor, isThemeBuilderIntentValue } from '~/utils/theme-builder-color.util'
import { THEME_BUILDER_INTENT_OPTIONS } from '~/consts/theme-builder-controls.const'

/**
 * ThemeBuilderColorField — standalone Color control (Contrôle 1,
 * `color-field.html`): trigger button + `ThemeBuilderColorPicker` popover.
 * Used for `color` / `accentColor` and for a standalone `borderColor` (when
 * a component has no `border` control to fold it into — see
 * `composePropGroups`).
 */
const props = defineProps<{
    modelValue: unknown
    label: string
    dataCy: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void
}>()

const { t } = useT()

const open = ref(false)

const intentLabel = (intent: string): string => {
    const opt = THEME_BUILDER_INTENT_OPTIONS.find(o => o.value === intent)
    return opt ? t(opt.labelKey, opt.labelFallback) : intent
}

const valueLabel = computed<string>(() => {
    const raw = props.modelValue
    if (raw === undefined || raw === null || raw === '') {
        return t('theming.control.color.inherited', 'Inherited from theme')
    }
    if (isThemeBuilderIntentValue(raw)) return intentLabel(raw)
    if (typeof raw === 'string') {
        return t('theming.control.color.custom_value', '{value} (custom)', { value: raw })
    }
    return t('theming.control.color.inherited', 'Inherited from theme')
})

const hint = computed(() => props.modelValue === undefined || props.modelValue === null || props.modelValue === '')

const GHOST_SWATCH_STYLE: Record<string, string> = {
    backgroundImage: 'repeating-linear-gradient(45deg, var(--origam-color-surface-subtle, #eee), var(--origam-color-surface-subtle, #eee) 2px, transparent 2px, transparent 4px)'
}

const swatchClass = computed<string | undefined>(() => {
    const raw = props.modelValue
    if (typeof raw === 'string' && isThemeBuilderIntentValue(raw) && raw !== 'ghost') {
        return `origam--bg-${raw}`
    }
    return undefined
})

const swatchStyle = computed<Record<string, string> | undefined>(() => {
    const raw = props.modelValue
    if (typeof raw === 'string' && raw === 'ghost') return GHOST_SWATCH_STYLE
    if (typeof raw === 'string' && isThemeBuilderHexColor(raw)) return { backgroundColor: raw }
    if (typeof raw === 'string' && !isThemeBuilderIntentValue(raw) && raw !== '') return { backgroundColor: raw }
    return undefined
})

const onUpdate = (value: string | undefined): void => {
    emit('update:modelValue', value)
}
</script>

<template>
    <theme-builder-control-trigger
        v-model:open="open"
        :label="label"
        :value-label="valueLabel"
        :hint="hint"
        swatch
        :swatch-class="swatchClass"
        :swatch-style="swatchStyle"
        :data-cy="dataCy"
    >
        <theme-builder-color-picker
            :model-value="modelValue"
            :label="label"
            :data-cy="dataCy"
            @update:model-value="onUpdate"
            @close="open = false"
        />
    </theme-builder-control-trigger>
</template>
