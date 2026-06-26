<script setup lang="ts">
import { computed } from 'vue'

import { useT } from '~/composables/useT'
import type {
    IThemeBuilderComponentEntry,
    TEditMode
} from '~/interfaces/theme-builder.interface'

const props = defineProps<{
    entry: IThemeBuilderComponentEntry
    activeMode: TEditMode
    split: boolean
    previewProps: Record<string, unknown>
    slotText: string
    lightStyle: Record<string, string>
    darkStyle: Record<string, string>
}>()

const emit = defineEmits<{
    (e: 'update:activeMode', mode: TEditMode): void
    (e: 'update:split', value: boolean): void
}>()

const { t } = useT()

const categoryLabel = computed(() => props.entry.category)

const setMode = (mode: TEditMode): void => {
    emit('update:activeMode', mode)
}

const toggleSplit = (): void => {
    emit('update:split', !props.split)
}

const panes = computed<Array<{ mode: TEditMode; style: Record<string, string> }>>(() => {
    if (props.split) {
        return [
            { mode: 'light', style: props.lightStyle },
            { mode: 'dark', style: props.darkStyle }
        ]
    }
    return [
        {
            mode: props.activeMode,
            style: props.activeMode === 'dark' ? props.darkStyle : props.lightStyle
        }
    ]
})

const modeLabel = (mode: TEditMode): string =>
    mode === 'dark' ? t('theming.mode.dark', 'Dark') : t('theming.mode.light', 'Light')

const lightBtnVariant = computed(() => (props.activeMode === 'light' ? 'elevated' : 'outlined'))
const darkBtnVariant = computed(() => (props.activeMode === 'dark' ? 'elevated' : 'outlined'))
const lightBtnColor = computed(() => (props.activeMode === 'light' ? 'primary' : undefined))
const darkBtnColor = computed(() => (props.activeMode === 'dark' ? 'primary' : undefined))
</script>

<template>
    <section
        class="tb-preview"
        :aria-label="t('theming.preview.label', 'Live preview')"
        data-cy="theming-preview"
    >
        <header class="tb-preview__bar">
            <div class="tb-preview__info">
                <span class="tb-preview__name">{{ entry.name }}</span>
                <span class="tb-preview__sep">·</span>
                <span class="tb-preview__cat">{{ categoryLabel }}</span>
            </div>

            <div class="tb-preview__spacer" />

            <div
                v-if="!split"
                class="tb-preview__mode-toggle"
                role="group"
                :aria-label="t('theming.mode.label', 'Preview mode')"
                data-cy="theming-mode-toggle"
            >
                <origam-btn
                    :variant="lightBtnVariant"
                    :color="lightBtnColor"
                    size="small"
                    prepend-icon="mdi-weather-sunny"
                    :aria-pressed="activeMode === 'light'"
                    data-cy="theming-mode-light"
                    @click="setMode('light')"
                >
                    {{ t('theming.mode.light', 'Light') }}
                </origam-btn>
                <origam-btn
                    :variant="darkBtnVariant"
                    :color="darkBtnColor"
                    size="small"
                    prepend-icon="mdi-weather-night"
                    :aria-pressed="activeMode === 'dark'"
                    data-cy="theming-mode-dark"
                    @click="setMode('dark')"
                >
                    {{ t('theming.mode.dark', 'Dark') }}
                </origam-btn>
            </div>

            <origam-btn
                :variant="split ? 'tonal' : 'outlined'"
                :color="split ? 'primary' : undefined"
                size="small"
                prepend-icon="mdi-view-split-vertical"
                class="tb-preview__split-btn"
                data-cy="theming-split-btn"
                :aria-pressed="split"
                @click="toggleSplit"
            >
                {{ t('theming.split.toggle', 'Split') }}
            </origam-btn>
        </header>

        <div
            class="tb-preview__stage"
            :class="{ 'tb-preview__stage--split': split }"
            aria-live="polite"
            data-cy="theming-preview-stage"
        >
            <ClientOnly>
                <div
                    v-for="pane in panes"
                    :key="pane.mode"
                    class="tb-preview__pane"
                    :class="`tb-preview__pane--${pane.mode}`"
                    :data-mode="pane.mode"
                    :data-cy="`theming-preview-pane-${pane.mode}`"
                >
                    <span class="tb-preview__pane-label">{{ modeLabel(pane.mode) }}</span>
                    <origam-theme-provider
                        :mode="pane.mode"
                        class="tb-preview__provider"
                    >
                        <div
                            class="tb-preview__canvas"
                            :style="pane.style"
                            :data-cy="`theming-canvas-${pane.mode}`"
                        >
                            <NuxtErrorBoundary>
                                <component
                                    :is="entry.componentTag"
                                    v-if="entry.previewable"
                                    v-bind="previewProps"
                                    :data-cy="`theming-live-${entry.slug}-${pane.mode}`"
                                >
                                    {{ slotText }}
                                </component>
                                <p
                                    v-else
                                    class="tb-preview__unavailable"
                                    :data-cy="`theming-unavailable-${pane.mode}`"
                                >
                                    {{ t('theming.preview.unavailable', 'Live preview unavailable for this component. Edit its props and CSS tokens — they still export to your theme.') }}
                                </p>
                                <template #error>
                                    <p class="tb-preview__unavailable">
                                        {{ t('theming.preview.error', 'Preview failed to render with the current props.') }}
                                    </p>
                                </template>
                            </NuxtErrorBoundary>
                        </div>
                    </origam-theme-provider>
                </div>
            </ClientOnly>
        </div>
    </section>
</template>

<style scoped lang="scss">
.tb-preview {
    display: flex;
    flex-direction: column;
    min-height: 0;
    height: 100%;
    overflow: hidden;
    border-width: 1px;
    border-style: solid;
    border-color: var(--origam-color-border-default);
    border-radius: var(--origam-radius-lg, 0.5rem);
    background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-raised));

    &__bar {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-3, 0.75rem);
        flex: 0 0 auto;
        padding: var(--origam-spacing-2, 0.5rem) var(--origam-spacing-4, 1rem);
        min-height: 2.75rem;
        background-color: var(--origam-color-surface-default);
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__info {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
        min-inline-size: 0;
    }

    &__name {
        font-weight: var(--origam-font-weight-bold, 700);
        font-size: var(--origam-font-size-sm, 0.8125rem);
        color: var(--origam-color-text-default);
    }

    &__sep {
        color: var(--origam-color-border-default);
    }

    &__cat {
        font-size: var(--origam-font-size-xs, 0.75rem);
        color: var(--origam-color-text-subtle);
    }

    &__spacer {
        flex: 1 1 auto;
    }

    &__mode-toggle {
        display: inline-flex;
        align-items: center;
        gap: var(--origam-spacing-1, 0.25rem);
        flex: 0 0 auto;
    }

    &__split-btn {
        flex: 0 0 auto;
    }

    &__stage {
        flex: 1 1 auto;
        min-height: 0;
        display: grid;
        grid-template-columns: 1fr;
        overflow: auto;

        &--split {
            grid-template-columns: 1fr 1fr;

            @media (max-width: 48rem) {
                grid-template-columns: 1fr;
            }
        }
    }

    &__pane {
        position: relative;
        display: grid;
        place-items: center;
        min-height: 14rem;
        padding: var(--origam-spacing-8, 2rem);
        background-color: var(--origam-color-neutral-0, #ffffff);
        background-image: radial-gradient(circle at 1px 1px, var(--origam-color-neutral-300, #d4d4d4) 1px, transparent 0);
        background-size: 20px 20px;

        &--dark {
            background-color: var(--origam-color-neutral-950, #0a0a0a);
            background-image: radial-gradient(circle at 1px 1px, var(--origam-color-neutral-800, #262626) 1px, transparent 0);
            background-size: 20px 20px;
        }

        & + & {
            border-inline-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        }
    }

    &__pane-label {
        position: absolute;
        inset-block-start: var(--origam-spacing-3, 0.75rem);
        inset-inline-start: var(--origam-spacing-4, 1rem);
        font-size: 0.625rem;
        font-weight: var(--origam-font-weight-bold, 700);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--origam-color-text-subtle);
    }

    &__pane--dark &__pane-label {
        color: var(--origam-color-neutral-400, #a3a3a3);
    }

    &__provider {
        display: grid;
        place-items: center;
    }

    &__canvas {
        display: grid;
        place-items: center;
        gap: var(--origam-spacing-3, 0.75rem);
        min-inline-size: 16rem;
        min-block-size: 9rem;
        padding: var(--origam-spacing-8, 2rem) var(--origam-spacing-10, 3rem);
        background-color: transparent;
    }

    &__unavailable {
        margin: 0;
        max-inline-size: 22ch;
        text-align: center;
        font-size: var(--origam-font-size-sm, 0.8125rem);
        color: var(--origam-color-text-subtle);
    }
}
</style>
