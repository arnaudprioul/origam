<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { useT } from '~/composables/useT'
import { useThemeBuilder } from '~/composables/useThemeBuilder'
import type { IComponentPlaygroundControl } from '~/interfaces/components-catalog.interface'
import type { TEditMode } from '~/interfaces/theme-builder.interface'

const { t } = useT()

const {
    entries,
    state,
    editCount,
    editCountByMode,
    generatedCode,
    fileName,
    presets,
    propValue,
    setProp,
    tokenValue,
    setToken,
    previewProps,
    previewStyle,
    slotText,
    reset,
    download,
    downloadJson,
    importTheme,
    seedPreset,
    loadStorage,
    startAutoPersist
} = useThemeBuilder()

onMounted(() => {
    loadStorage()
    startAutoPersist()
})

const MODE_OPTIONS = [
    { title: t('theming.mode.light', 'Light'), value: 'light' },
    { title: t('theming.mode.dark', 'Dark'), value: 'dark' },
    { title: t('theming.mode.auto', 'Auto'), value: 'auto' }
]

const presetItems = computed(() =>
    presets.map(p => ({ title: t(p.labelKey, p.labelFallback), value: p.key }))
)

const selectedPreset = ref<string>('')
const importText = ref<string>('')
const importError = ref<boolean>(false)

const numberValue = (slug: string, prop: string): number | undefined => {
    const v = propValue(slug, prop)
    return typeof v === 'number' ? v : undefined
}

const onSeedPreset = (key: unknown) => {
    if (typeof key !== 'string' || !key) return
    seedPreset(key)
}

const onImport = () => {
    const ok = importTheme(importText.value)
    importError.value = !ok
    if (ok) importText.value = ''
}

const onExportJson = () => downloadJson()

useSeoMeta({
    title: () => t('theming.meta.title', 'Theme builder · origam design system'),
    description: () =>
        t(
            'theming.meta.description',
            'Configure a default origam theme visually — edit component props and CSS tokens with a live preview, then export a ready-to-use theme module.'
        )
})

const activeSlug = ref<string>(entries[0]?.slug ?? '')

const activeEntry = computed(() => entries.find(e => e.slug === activeSlug.value) ?? entries[0])

const selectItems = (ctrl: IComponentPlaygroundControl) =>
    (ctrl.options ?? []).map(o => ({ title: o.label, value: o.value }))

const onSelect = (slug: string, prop: string, value: unknown) => setProp(slug, prop, value)

const onToken = (mode: TEditMode, cssVar: string, value: string) => setToken(mode, cssVar, value)

const componentTabs = computed(() =>
    entries.map(e => ({ slug: e.slug, label: e.name, icon: e.icon }))
)

const onValidate = () => download()

const downloadHint = computed(() =>
    t('theming.export.filename', 'Downloads {file}', { file: fileName.value })
)

const PREVIEW_MODES: TEditMode[] = ['light', 'dark']

const tokenLegend = computed(() =>
    state.activeMode === 'dark'
        ? t('theming.tokens.legend_dark', 'CSS tokens — Dark')
        : t('theming.tokens.legend_light', 'CSS tokens — Light')
)
</script>

<template>
    <article
        class="theming"
        data-cy="page-theming"
    >
        <header
            class="theming__header"
            aria-labelledby="theming-title"
        >
            <origam-container class="theming__header-inner">
                <p class="theming__eyebrow">
                    {{ t('theming.eyebrow', 'Theme builder') }}
                </p>
                <origam-title
                    id="theming-title"
                    tag="h1"
                    class="theming__title"
                >
                    {{ t('theming.title', 'Design your default theme') }}
                </origam-title>
                <p class="theming__lead">
                    {{ t('theming.lead', 'Pick a component, tune its props and CSS tokens, watch the preview update, then export a ready-to-register theme module.') }}
                </p>

                <form
                    class="theming__name-form"
                    :aria-label="t('theming.name.label', 'Theme name')"
                    @submit.prevent="onValidate"
                >
                    <origam-text-field
                        v-model="state.name"
                        :label="t('theming.name.label', 'Theme name')"
                        :placeholder="t('theming.name.placeholder', 'my-theme')"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="theming__name-field"
                        data-cy="theming-name"
                    />
                    <origam-text-field
                        v-model="state.label"
                        :label="t('theming.label.label', 'Display label')"
                        :placeholder="t('theming.label.placeholder', 'My theme')"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="theming__label-field"
                        data-cy="theming-label"
                    />
                    <origam-select
                        v-model="state.mode"
                        :label="t('theming.mode.label', 'Color mode')"
                        :items="MODE_OPTIONS"
                        variant="outlined"
                        density="compact"
                        hide-details
                        class="theming__mode-field"
                        data-cy="theming-mode"
                    />
                    <div class="theming__name-actions">
                        <origam-btn
                            variant="text"
                            type="button"
                            data-cy="theming-reset"
                            @click="reset"
                        >
                            {{ t('theming.reset', 'Reset') }}
                        </origam-btn>
                        <origam-btn
                            color="primary"
                            variant="elevated"
                            prepend-icon="mdi-download"
                            type="submit"
                            data-cy="theming-validate"
                        >
                            {{ t('theming.validate', 'Validate & export') }}
                            <origam-badge
                                v-if="editCount"
                                :content="editCount"
                                inline
                                color="primary"
                                class="theming__edit-badge"
                            />
                        </origam-btn>
                        <origam-btn
                            variant="outlined"
                            prepend-icon="mdi-code-json"
                            type="button"
                            data-cy="theming-export-json"
                            @click="onExportJson"
                        >
                            {{ t('theming.export_json', 'Export JSON') }}
                        </origam-btn>
                    </div>
                </form>

                <section
                    class="theming__seed"
                    aria-labelledby="theming-seed-title"
                    data-cy="theming-seed"
                >
                    <origam-title
                        id="theming-seed-title"
                        tag="h2"
                        class="theming__seed-title"
                    >
                        {{ t('theming.seed.title', 'Start from an existing theme') }}
                    </origam-title>

                    <div class="theming__seed-row">
                        <origam-select
                            v-model="selectedPreset"
                            :label="t('theming.seed.preset_label', 'Seed from a DS preset')"
                            :items="presetItems"
                            variant="outlined"
                            density="compact"
                            hide-details
                            class="theming__seed-preset"
                            data-cy="theming-seed-preset"
                            @update:model-value="onSeedPreset"
                        />
                    </div>

                    <div class="theming__seed-row theming__seed-row--import">
                        <origam-textarea-field
                            v-model="importText"
                            :label="t('theming.seed.import_label', 'Paste a theme module or JSON')"
                            :placeholder="t('theming.seed.import_placeholder', 'Paste a theme module or a JSON object…')"
                            variant="outlined"
                            density="compact"
                            hide-details
                            :rows="4"
                            class="theming__seed-import"
                            data-cy="theming-import-text"
                        />
                        <origam-btn
                            variant="tonal"
                            color="primary"
                            prepend-icon="mdi-import"
                            type="button"
                            class="theming__seed-import-btn"
                            data-cy="theming-import-btn"
                            @click="onImport"
                        >
                            {{ t('theming.seed.import_action', 'Import') }}
                        </origam-btn>
                    </div>

                    <origam-alert
                        v-if="importError"
                        type="danger"
                        density="compact"
                        class="theming__seed-error"
                        data-cy="theming-import-error"
                    >
                        {{ t('theming.seed.import_error', 'Could not parse that theme — paste a valid IOrigamTheme module or JSON object.') }}
                    </origam-alert>
                </section>
            </origam-container>
        </header>

        <origam-container class="theming__body">
            <div class="theming__layout">
                <nav
                    class="theming__nav"
                    :aria-label="t('theming.nav.label', 'Components')"
                    data-cy="theming-nav"
                >
                    <ul class="theming__nav-list">
                        <li
                            v-for="tab in componentTabs"
                            :key="tab.slug"
                            class="theming__nav-item"
                        >
                            <origam-btn
                                :variant="tab.slug === activeSlug ? 'tonal' : 'text'"
                                :color="tab.slug === activeSlug ? 'primary' : undefined"
                                :prepend-icon="tab.icon"
                                block
                                slim
                                class="theming__nav-btn"
                                :data-cy="`theming-nav-${tab.slug}`"
                                @click="activeSlug = tab.slug"
                            >
                                {{ tab.label }}
                            </origam-btn>
                        </li>
                    </ul>
                </nav>

                <section
                    v-if="activeEntry"
                    class="theming__editor"
                    :aria-label="activeEntry.name"
                    :data-cy="`theming-editor-${activeEntry.slug}`"
                >
                    <div
                        class="theming__preview-dual"
                        aria-live="polite"
                        data-cy="theming-preview-dual"
                    >
                        <ClientOnly>
                            <div
                                v-for="paneMode in PREVIEW_MODES"
                                :key="paneMode"
                                class="theming__preview-pane"
                                :class="{ 'theming__preview-pane--active': paneMode === state.activeMode }"
                                :data-mode="paneMode"
                                :data-cy="`theming-preview-pane-${paneMode}`"
                            >
                                <div class="theming__preview-pane-header">
                                    <span class="theming__preview-pane-label">
                                        {{ paneMode === 'light' ? t('theming.preview.light_label', 'Light') : t('theming.preview.dark_label', 'Dark') }}
                                    </span>
                                    <origam-badge
                                        v-if="editCountByMode(paneMode)"
                                        :content="editCountByMode(paneMode)"
                                        inline
                                        color="primary"
                                        class="theming__pane-badge"
                                    />
                                    <origam-chip
                                        density="compact"
                                        :color="paneMode === state.activeMode ? 'primary' : undefined"
                                        variant="tonal"
                                        class="theming__pane-chip"
                                        :data-cy="`theming-pane-chip-${paneMode}`"
                                        @click="state.activeMode = paneMode"
                                    >
                                        {{ paneMode === state.activeMode ? t('theming.mode.editing', 'Editing') : t('theming.mode.preview_only', 'Preview only') }}
                                    </origam-chip>
                                </div>
                                <origam-theme-provider :mode="paneMode">
                                    <div
                                        class="theming__preview-stage"
                                        :style="previewStyle(activeEntry.slug, paneMode)"
                                        :data-cy="`theming-preview-stage-${paneMode}`"
                                    >
                                        <NuxtErrorBoundary>
                                            <component
                                                :is="activeEntry.componentKey"
                                                v-bind="previewProps(activeEntry.slug)"
                                                :data-cy="`theming-live-${activeEntry.slug}`"
                                            >
                                                {{ slotText(activeEntry.slug) }}
                                            </component>
                                            <template #error>
                                                <p class="theming__preview-fallback">
                                                    {{ t('theming.preview.unavailable', 'Live preview unavailable for this component.') }}
                                                </p>
                                            </template>
                                        </NuxtErrorBoundary>
                                    </div>
                                </origam-theme-provider>
                            </div>
                        </ClientOnly>
                    </div>

                    <form class="theming__controls">
                        <fieldset
                            v-if="activeEntry.controls.length"
                            class="theming__group"
                            data-cy="theming-props"
                        >
                            <legend class="theming__group-legend">
                                {{ t('theming.props.legend', 'Default props') }}
                            </legend>

                            <div
                                v-for="ctrl in activeEntry.controls"
                                :key="ctrl.prop"
                                class="theming__control"
                                :data-cy="`theming-prop-${ctrl.prop}`"
                            >
                                <origam-select
                                    v-if="ctrl.kind === 'select'"
                                    :model-value="propValue(activeEntry.slug, ctrl.prop)"
                                    :label="t(ctrl.labelKey, ctrl.labelFallback)"
                                    :items="selectItems(ctrl)"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    @update:model-value="onSelect(activeEntry.slug, ctrl.prop, $event)"
                                />

                                <div
                                    v-else-if="ctrl.kind === 'switch'"
                                    class="theming__switch-row"
                                >
                                    <span class="theming__switch-label">
                                        {{ t(ctrl.labelKey, ctrl.labelFallback) }}
                                    </span>
                                    <origam-switch
                                        :model-value="propValue(activeEntry.slug, ctrl.prop)"
                                        :aria-label="t(ctrl.labelKey, ctrl.labelFallback)"
                                        density="compact"
                                        hide-details
                                        @update:model-value="onSelect(activeEntry.slug, ctrl.prop, $event)"
                                    />
                                </div>

                                <origam-number-field
                                    v-else-if="ctrl.kind === 'number'"
                                    :model-value="numberValue(activeEntry.slug, ctrl.prop)"
                                    :label="t(ctrl.labelKey, ctrl.labelFallback)"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    @update:model-value="onSelect(activeEntry.slug, ctrl.prop, $event)"
                                />

                                <origam-text-field
                                    v-else
                                    :model-value="propValue(activeEntry.slug, ctrl.prop)"
                                    :label="t(ctrl.labelKey, ctrl.labelFallback)"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    @update:model-value="onSelect(activeEntry.slug, ctrl.prop, $event)"
                                />
                            </div>
                        </fieldset>

                        <fieldset
                            v-if="activeEntry.tokens.length"
                            class="theming__group"
                            data-cy="theming-tokens"
                        >
                            <legend class="theming__group-legend">
                                {{ tokenLegend }}
                            </legend>

                            <div
                                v-for="tok in activeEntry.tokens"
                                :key="tok.cssVar"
                                class="theming__control theming__control--token"
                                :data-cy="`theming-token-${tok.cssVar}`"
                            >
                                <label
                                    class="theming__token-label"
                                    :for="`tok-${tok.cssVar}`"
                                >
                                    {{ tok.label }}
                                </label>
                                <div class="theming__token-input">
                                    <input
                                        v-if="tok.kind === 'color'"
                                        :id="`tok-${tok.cssVar}`"
                                        type="color"
                                        class="theming__token-color"
                                        :value="tokenValue(state.activeMode, tok.cssVar)"
                                        @input="onToken(state.activeMode, tok.cssVar, ($event.target as HTMLInputElement).value)"
                                    >
                                    <input
                                        :id="tok.kind === 'color' ? undefined : `tok-${tok.cssVar}`"
                                        type="text"
                                        class="theming__token-text"
                                        :value="tokenValue(state.activeMode, tok.cssVar)"
                                        @input="onToken(state.activeMode, tok.cssVar, ($event.target as HTMLInputElement).value)"
                                    >
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </section>
            </div>

            <section
                class="theming__output"
                aria-labelledby="theming-output-title"
                data-cy="theming-output"
            >
                <header class="theming__output-header">
                    <origam-title
                        id="theming-output-title"
                        tag="h2"
                        class="theming__output-title"
                    >
                        {{ t('theming.output.title', 'Generated theme') }}
                    </origam-title>
                    <p class="theming__output-hint">
                        {{ downloadHint }}
                    </p>
                </header>

                <output class="theming__output-code">
                    <origam-code
                        :code="generatedCode"
                        lang="ts"
                        :filename="fileName"
                        copyable
                        data-cy="theming-generated-code"
                    />
                </output>
            </section>
        </origam-container>
    </article>
</template>

<style scoped lang="scss">
.theming {
    display: flex;
    flex-direction: column;
    gap: var(--origam-spacing-8, 2rem);
    padding-block-end: var(--origam-spacing-16, 4rem);

    &__header {
        padding-block: var(--origam-spacing-12, 3rem) var(--origam-spacing-6, 1.5rem);
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-default));
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__header-inner {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
    }

    &__eyebrow {
        margin: 0;
        font-size: var(--origam-font-size-sm, 0.875rem);
        font-weight: var(--origam-font-weight-semibold, 600);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--origam-color-action-primary-bg, var(--origam-color-text-subtle));
    }

    &__title {
        margin: 0;
    }

    &__lead {
        margin: 0;
        max-width: 52ch;
        color: var(--origam-color-text-subtle, var(--origam-color-text-default));
    }

    &__name-form {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: var(--origam-spacing-4, 1rem);
        margin-block-start: var(--origam-spacing-4, 1rem);
    }

    &__name-field {
        flex: 1 1 16rem;
        max-width: 24rem;
    }

    &__label-field {
        flex: 1 1 14rem;
        max-width: 20rem;
    }

    &__mode-field {
        flex: 0 1 10rem;
    }

    &__seed {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        margin-block-start: var(--origam-spacing-6, 1.5rem);
        padding: var(--origam-spacing-5, 1.25rem);
        background-color: var(--origam-color-surface-default);
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        border-radius: var(--origam-radius-lg, 0.75rem);
    }

    &__seed-title {
        margin: 0;
        font-size: var(--origam-font-size-md, 1rem);
    }

    &__seed-row {
        display: flex;
        gap: var(--origam-spacing-3, 0.75rem);

        &--import {
            align-items: flex-end;
        }
    }

    &__seed-preset {
        flex: 1 1 16rem;
        max-width: 24rem;
    }

    &__seed-import {
        flex: 1 1 auto;
    }

    &__seed-import-btn {
        flex: 0 0 auto;
    }

    &__seed-error {
        margin: 0;
    }

    &__name-actions {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
    }

    &__layout {
        display: grid;
        grid-template-columns: 16rem 1fr;
        gap: var(--origam-spacing-6, 1.5rem);
        align-items: start;

        @container (max-width: 56rem) {
            grid-template-columns: 1fr;
        }
    }

    &__nav {
        position: sticky;
        top: var(--origam-spacing-4, 1rem);
    }

    &__nav-list {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-1, 0.25rem);
        margin: 0;
        padding: 0;
        list-style: none;
    }

    &__nav-btn {
        justify-content: flex-start;
    }

    &__editor {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-6, 1.5rem);
    }

    &__preview-dual {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--origam-spacing-4, 1rem);

        @container (max-width: 56rem) {
            grid-template-columns: 1fr;
        }
    }

    &__preview-pane {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        padding: var(--origam-spacing-5, 1.25rem);
        background-color: var(--origam-color-surface-default);
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        border-radius: var(--origam-radius-lg, 0.75rem);
        transition: box-shadow 0.15s ease;

        &--active {
            box-shadow: 0 0 0 2px var(--origam-color-action-primary-bg, var(--origam-color-action-primary-bg));
        }
    }

    &__preview-pane-header {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
    }

    &__preview-pane-label {
        font-size: var(--origam-font-size-sm, 0.875rem);
        font-weight: var(--origam-font-weight-semibold, 600);
        color: var(--origam-color-text-default);
        flex: 1 1 auto;
    }

    &__pane-badge {
        flex: 0 0 auto;
    }

    &__pane-chip {
        flex: 0 0 auto;
        cursor: pointer;
    }

    &__preview-stage {
        display: grid;
        place-items: center;
        min-height: 10rem;
        padding: var(--origam-spacing-6, 1.5rem);
    }

    &__preview-fallback {
        margin: 0;
        color: var(--origam-color-text-subtle);
    }

    &__controls {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        gap: var(--origam-spacing-6, 1.5rem);
    }

    &__group {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-4, 1rem);
        margin: 0;
        padding: var(--origam-spacing-5, 1.25rem);
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        border-radius: var(--origam-radius-lg, 0.75rem);
    }

    &__group-legend {
        padding-inline: var(--origam-spacing-2, 0.5rem);
        font-size: var(--origam-font-size-sm, 0.875rem);
        font-weight: var(--origam-font-weight-semibold, 600);
        color: var(--origam-color-text-default);
    }

    &__control {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-1, 0.25rem);

        &--token {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: var(--origam-spacing-3, 0.75rem);
        }
    }

    &__switch-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--origam-spacing-3, 0.75rem);
    }

    &__switch-label {
        font-size: var(--origam-font-size-sm, 0.875rem);
        color: var(--origam-color-text-default);
    }

    &__token-label {
        flex: 0 0 auto;
        font-size: var(--origam-font-size-sm, 0.875rem);
        color: var(--origam-color-text-subtle);
    }

    &__token-input {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
    }

    &__token-color {
        inline-size: 2rem;
        block-size: 2rem;
        padding: 0;
        border: 1px solid var(--origam-color-border-default);
        border-radius: var(--origam-radius-sm, 0.25rem);
        background: none;
        cursor: pointer;
    }

    &__token-text {
        inline-size: 8rem;
        padding: var(--origam-spacing-1, 0.25rem) var(--origam-spacing-2, 0.5rem);
        font-family: var(--origam-font-family-mono, monospace);
        font-size: var(--origam-font-size-xs, 0.75rem);
        color: var(--origam-color-text-default);
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-default));
        border: 1px solid var(--origam-color-border-default);
        border-radius: var(--origam-radius-sm, 0.25rem);
    }

    &__output {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        margin-block-start: var(--origam-spacing-8, 2rem);
    }

    &__output-title {
        margin: 0;
    }

    &__output-hint {
        margin: 0;
        font-size: var(--origam-font-size-sm, 0.875rem);
        color: var(--origam-color-text-subtle);
    }

    &__output-code {
        display: block;
    }
}
</style>
