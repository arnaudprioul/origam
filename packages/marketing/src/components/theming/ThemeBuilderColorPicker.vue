<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { useT } from '~/composables/useT'
import { useThemeBuilderColorControl } from '~/composables/useThemeBuilderColorControl'
import { THEME_BUILDER_INTENT_OPTIONS } from '~/consts/theme-builder-controls.const'
import { MDI_ICONS } from 'origam/enums'

/**
 * ThemeBuilderColorPicker — popover CONTENT for the Color control
 * (`color-field.html`): theme-intent swatch grid + "Autre…" branch backed by
 * `origam-color-picker-field`. No trigger/menu of its own — reused both
 * standalone (`ThemeBuilderColorField`, behind its own trigger) and inline
 * inside the Border composite popover (`ThemeBuilderBorderField`, Partie 3).
 */
const props = defineProps<{
    modelValue: unknown
    label: string
    dataCy: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | undefined): void
    (e: 'close'): void
}>()

const { t } = useT()

const modelValueRef = computed(() => props.modelValue)
const { state, selectIntent, selectCustom, selectInherit } = useThemeBuilderColorControl(
    modelValueRef,
    (value) => emit('update:modelValue', value)
)

const showCustom = ref(state.value.mode === 'custom')
watch(() => props.modelValue, () => {
    if (state.value.mode === 'custom') showCustom.value = true
})

const customHex = computed(() => state.value.custom ?? '#000000')

const onSelectIntent = (intent: string): void => {
    selectIntent(intent)
    emit('close')
}

const onSelectInherit = (): void => {
    selectInherit()
    emit('close')
}

const onSelectCustom = (hex: unknown): void => {
    if (typeof hex === 'string') selectCustom(hex)
}

const radioGroupName = computed(() => `${props.dataCy}-intent`)
</script>

<template>
    <div class="tbc-color">
        <template v-if="!showCustom">
            <button
                type="button"
                class="tbc-color__inherit"
                :data-cy="`${dataCy}-inherit`"
                @click="onSelectInherit"
            >
                {{ t('theming.control.color.inherit', 'Inherit from theme') }}
            </button>

            <fieldset class="tbc-color__fieldset">
                <legend class="tbc-color__legend">{{ label }}</legend>
                <div
                    class="tbc-color__grid"
                    role="radiogroup"
                    :aria-label="t('theming.control.color.intent_group', 'Colour intent')"
                >
                    <label
                        v-for="opt in THEME_BUILDER_INTENT_OPTIONS"
                        :key="opt.value"
                        class="tbc-color__option"
                    >
                        <input
                            type="radio"
                            class="tbc-color__radio"
                            :name="radioGroupName"
                            :value="opt.value"
                            :checked="state.mode === 'intent' && state.intent === opt.value"
                            :data-cy="`${dataCy}-intent-${opt.value}`"
                            @change="onSelectIntent(opt.value)"
                        >
                        <span
                            class="tbc-color__swatch"
                            :class="opt.value === 'ghost' ? 'tbc-color__swatch--ghost' : `origam--bg-${opt.value}`"
                            aria-hidden="true"
                        />
                        <span class="tbc-color__option-label">{{ t(opt.labelKey, opt.labelFallback) }}</span>
                    </label>
                </div>
            </fieldset>

            <button
                type="button"
                class="tbc-color__custom-trigger"
                :data-cy="`${dataCy}-custom-trigger`"
                @click="showCustom = true"
            >
                {{ t('theming.control.custom', 'Other…') }}
            </button>
        </template>

        <template v-else>
            <origam-btn
                variant="text"
                size="x-small"
                density="compact"
                :prepend-icon="MDI_ICONS.ARROW_LEFT"
                :data-cy="`${dataCy}-back`"
                @click="showCustom = false"
            >
                {{ t('theming.control.color.back', 'Back to theme colours') }}
            </origam-btn>

            <origam-color-picker-field
                :model-value="customHex"
                :label="t('theming.control.color.custom_label', 'Custom colour')"
                variant="outlined"
                density="compact"
                hide-details
                :data-cy="`${dataCy}-custom-input`"
                @update:model-value="onSelectCustom"
            />
        </template>
    </div>
</template>

<style scoped lang="scss">
.tbc-color {
    display: flex;
    flex-direction: column;
    gap: var(--origam-spacing-2, 0.5rem);

    &__inherit,
    &__custom-trigger {
        align-self: flex-start;
        padding: 0;
        background: none;
        border: none;
        font-size: 0.6875rem;
        color: var(--origam-color__action--primary---bg, #7c3aed);
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    &__fieldset {
        padding: 0;
        margin: 0;
        border: none;
    }

    &__legend {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--origam-spacing-2, 0.5rem);
    }

    &__option {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        cursor: pointer;
        border-radius: var(--origam-radius-sm, 0.25rem);
        padding: var(--origam-spacing-1, 0.25rem);

        &:hover {
            background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-raised));
        }

        &:has(.tbc-color__radio:focus-visible) {
            outline: 2px solid var(--origam-color__action--primary---bg, #7c3aed);
            outline-offset: 1px;
        }
    }

    &__radio {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    &__swatch {
        inline-size: 1.5rem;
        block-size: 1.5rem;
        border-radius: var(--origam-radius-sm, 0.25rem);
        border: 1px solid var(--origam-color-border-default);

        &--ghost {
            background: repeating-linear-gradient(
                45deg,
                var(--origam-color-surface-subtle, #eee),
                var(--origam-color-surface-subtle, #eee) 3px,
                transparent 3px,
                transparent 6px
            );
        }
    }

    &__radio:checked + &__swatch {
        outline: 2px solid var(--origam-color__action--primary---bg, #7c3aed);
        outline-offset: 1px;
    }

    &__option-label {
        font-size: 0.625rem;
        color: var(--origam-color-text-subtle);
        text-align: center;
    }
}
</style>
