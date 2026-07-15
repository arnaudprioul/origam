<script setup lang="ts">
import { computed, ref } from 'vue'

import { useT } from '~/composables/useT'
import { useThemeBuilderBorderControl } from '~/composables/useThemeBuilderBorderControl'
import { THEME_BUILDER_BORDER_STYLE_OPTIONS, THEME_BUILDER_BORDER_WIDTH_OPTIONS } from '~/consts/theme-builder-controls.const'
import { isThemeBuilderIntentValue } from '~/utils/theme-builder-color.util'

/**
 * ThemeBuilderBorderField — Contrôle 5 (`border-field.html`, round 2):
 * ONE trigger summarising width · style · colour, popover with 3 fieldsets.
 * Drives up to 3 real DS props (`border` / `borderStyle` / `borderColor`,
 * whichever the component actually exposes — `styleValue`/`colorValue` are
 * `undefined` when the DS prop doesn't exist for this component).
 *
 * Per-side width is shown DISABLED (tooltip) — DS #215 not merged yet, see
 * `useThemeBuilderBorderControl`. Per-side colour (Partie 4 of the
 * wireframe) is omitted entirely, per the wireframe's own Q3 recommendation
 * ("la masquer... plutôt que de l'afficher désactivée en prod").
 */
const props = defineProps<{
    widthValue: unknown
    styleValue?: unknown
    colorValue?: unknown
    label: string
    dataCy: string
}>()

const emit = defineEmits<{
    (e: 'update:width', value: string | number | undefined): void
    (e: 'update:style', value: string | undefined): void
    (e: 'update:color', value: string | undefined): void
}>()

const { t } = useT()
const open = ref(false)

const widthValueRef = computed(() => props.widthValue)
const { selectValue, isCustom, customWidth, selectWidth, setCustomWidth } = useThemeBuilderBorderControl(
    widthValueRef,
    (value) => emit('update:width', value)
)

const widthLabel = (value: string): string => {
    const opt = THEME_BUILDER_BORDER_WIDTH_OPTIONS.find(o => o.value === value)
    return opt ? t(opt.labelKey, opt.labelFallback) : value
}

const styleLabel = computed<string | null>(() => {
    if (props.styleValue === undefined) return null
    const opt = THEME_BUILDER_BORDER_STYLE_OPTIONS.find(o => o.value === props.styleValue)
    return opt ? t(opt.labelKey, opt.labelFallback) : String(props.styleValue)
})

const colorLabel = computed<string | null>(() => {
    if (props.colorValue === undefined) return null
    if (props.colorValue === null || props.colorValue === '') {
        return t('theming.control.color.inherited', 'Inherited from theme')
    }
    if (isThemeBuilderIntentValue(props.colorValue)) return String(props.colorValue)
    return t('theming.control.color.custom_value', '{value} (custom)', { value: String(props.colorValue) })
})

const valueLabel = computed<string>(() => {
    const parts = [isCustom.value
        ? t('theming.control.border.custom_width_value', '{width}px', { width: customWidth.value })
        : widthLabel(selectValue.value)]
    if (styleLabel.value) parts.push(styleLabel.value)
    if (colorLabel.value) parts.push(colorLabel.value)
    return parts.join(' · ')
})

const widthSelectItems = computed(() =>
    THEME_BUILDER_BORDER_WIDTH_OPTIONS.map(o => ({ title: t(o.labelKey, o.labelFallback), value: o.value }))
)
const styleSelectItems = computed(() =>
    THEME_BUILDER_BORDER_STYLE_OPTIONS.map(o => ({ title: t(o.labelKey, o.labelFallback), value: o.value }))
)

const onSelectWidth = (value: unknown): void => {
    if (typeof value === 'string') selectWidth(value)
}
const onCustomWidth = (value: unknown): void => {
    if (typeof value === 'number') setCustomWidth(value)
}
const onSelectStyle = (value: unknown): void => {
    if (typeof value === 'string') emit('update:style', value)
}
const onColorUpdate = (value: string | undefined): void => {
    emit('update:color', value)
}

const SIDES: Array<{ key: string; labelKey: string; labelFallback: string }> = [
    { key: 'top', labelKey: 'theming.control.border.side_top', labelFallback: 'Top (px)' },
    { key: 'right', labelKey: 'theming.control.border.side_right', labelFallback: 'Right (px)' },
    { key: 'bottom', labelKey: 'theming.control.border.side_bottom', labelFallback: 'Bottom (px)' },
    { key: 'left', labelKey: 'theming.control.border.side_left', labelFallback: 'Left (px)' }
]
</script>

<template>
    <theme-builder-control-trigger
        v-model:open="open"
        :label="label"
        :value-label="valueLabel"
        :data-cy="dataCy"
    >
        <fieldset class="tbc-border__fieldset">
            <legend class="tbc-border__legend">{{ t('theming.control.border.width_legend', 'Border — Width') }}</legend>

            <origam-select
                :model-value="selectValue"
                :items="widthSelectItems"
                :label="t('theming.control.border.width_legend', 'Border — Width')"
                variant="outlined"
                density="compact"
                hide-details
                :data-cy="`${dataCy}-width-select`"
                @update:model-value="onSelectWidth"
            />

            <template v-if="isCustom">
                <origam-tooltip :text="t('theming.control.border.sides_soon', 'Per-side width is coming soon — tracked as DS issue #215.')">
                    <template #activator="{ props: tooltipProps }">
                        <div
                            class="tbc-border__sides"
                            v-bind="tooltipProps"
                        >
                            <origam-number-field
                                v-for="side in SIDES"
                                :key="side.key"
                                :model-value="customWidth"
                                :label="t(side.labelKey, side.labelFallback)"
                                :min="0"
                                variant="outlined"
                                density="compact"
                                hide-details
                                disabled
                                :data-cy="`${dataCy}-side-${side.key}`"
                            />
                        </div>
                    </template>
                </origam-tooltip>

                <origam-number-field
                    :model-value="customWidth"
                    :label="t('theming.control.border.uniform_width', 'All sides (px)')"
                    :min="0"
                    variant="outlined"
                    density="compact"
                    hide-details
                    :data-cy="`${dataCy}-uniform-width`"
                    @update:model-value="onCustomWidth"
                />
            </template>
        </fieldset>

        <fieldset
            v-if="styleValue !== undefined"
            class="tbc-border__fieldset"
        >
            <legend class="tbc-border__legend">{{ t('theming.control.border.style_legend', 'Border — Style') }}</legend>
            <origam-select
                :model-value="styleValue"
                :items="styleSelectItems"
                :label="t('theming.control.border.style_legend', 'Border — Style')"
                variant="outlined"
                density="compact"
                hide-details
                :data-cy="`${dataCy}-style-select`"
                @update:model-value="onSelectStyle"
            />
        </fieldset>

        <fieldset
            v-if="colorValue !== undefined"
            class="tbc-border__fieldset"
        >
            <legend class="tbc-border__legend">{{ t('theming.control.border.color_legend', 'Border — Colour') }}</legend>
            <theme-builder-color-picker
                :model-value="colorValue"
                :label="t('theming.control.border.color_legend', 'Border — Colour')"
                :data-cy="`${dataCy}-color`"
                @update:model-value="onColorUpdate"
            />
        </fieldset>
    </theme-builder-control-trigger>
</template>

<style scoped lang="scss">
.tbc-border {
    &__fieldset {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-2, 0.5rem);
        padding: 0;
        margin: 0;
        border: none;

        & + & {
            padding-block-start: var(--origam-spacing-2, 0.5rem);
            border-block-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        }
    }

    &__legend {
        padding: 0;
        font-size: 0.625rem;
        font-weight: var(--origam-font-weight-bold, 700);
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--origam-color-text-subtle);
    }

    &__sides {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--origam-spacing-2, 0.5rem);
        opacity: 0.5;
    }
}
</style>
