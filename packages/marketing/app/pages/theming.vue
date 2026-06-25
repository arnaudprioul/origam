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

const presetItems = computed(() =>
    presets.map(p => ({ title: t(p.labelKey, p.labelFallback), value: p.key }))
)

const selectedPreset = ref<string>('')
const importText = ref<string>('')
const importError = ref<boolean>(false)

const splitEnabled = ref<boolean>(false)

const expandedPanels = ref<string[]>(['props', 'tokens-active'])

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

const inactiveMode = computed<TEditMode>(() =>
    state.activeMode === 'light' ? 'dark' : 'light'
)

const modeTabs = computed(() => [
    {
        value: 'light' as TEditMode,
        label: t('theming.mode.light', 'Light'),
        icon: 'mdi-weather-sunny',
        count: editCountByMode('light')
    },
    {
        value: 'dark' as TEditMode,
        label: t('theming.mode.dark', 'Dark'),
        icon: 'mdi-weather-night',
        count: editCountByMode('dark')
    }
])

const tokenLegend = computed(() =>
    state.activeMode === 'dark'
        ? t('theming.tokens.legend_dark', 'CSS tokens — Dark')
        : t('theming.tokens.legend_light', 'CSS tokens — Light')
)

const controlsHeading = computed(() => {
    const componentName = activeEntry.value?.name ?? ''
    const modeLabel = state.activeMode === 'dark'
        ? t('theming.mode.dark', 'Dark')
        : t('theming.mode.light', 'Light')
    return t('theming.controls.heading', 'Controls — {component} ({mode})', {
        component: componentName,
        mode: modeLabel
    })
})

const onSplitPaneClick = () => {
    state.activeMode = inactiveMode.value
}
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
                                :model-value="true"
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

                <nav
                    class="theming__mode-tabs"
                    :aria-label="t('theming.mode.tab_label', 'Edit color mode')"
                    data-cy="theming-mode-tabs"
                >
                    <origam-tabs
                        v-model="state.activeMode"
                        variant="underline"
                        class="theming__mode-tabs-inner"
                        data-cy="theming-mode-tabs-inner"
                    >
                        <origam-tab
                            v-for="tab in modeTabs"
                            :key="tab.value"
                            :value="tab.value"
                            :prepend-icon="tab.icon"
                            class="theming__mode-tab"
                            :data-cy="`theming-mode-tab-${tab.value}`"
                        >
                            {{ tab.label }}
                            <origam-badge
                                v-if="tab.count"
                                :content="tab.count"
                                :model-value="true"
                                inline
                                color="primary"
                                class="theming__mode-tab-badge"
                                :data-cy="`theming-mode-tab-badge-${tab.value}`"
                            />
                        </origam-tab>
                    </origam-tabs>
                </nav>
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
                    <div class="theming__preview-bar">
                        <span class="theming__preview-bar-title">
                            {{ activeEntry.name }}
                        </span>
                        <span class="theming__preview-bar-mode">
                            <origam-icon
                                :icon="state.activeMode === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
                                size="small"
                            />
                            {{ state.activeMode === 'dark' ? t('theming.mode.dark', 'Dark') : t('theming.mode.light', 'Light') }}
                        </span>
                        <origam-btn
                            :variant="splitEnabled ? 'tonal' : 'text'"
                            :color="splitEnabled ? 'primary' : undefined"
                            prepend-icon="mdi-view-split-vertical"
                            density="compact"
                            size="small"
                            class="theming__split-btn"
                            data-cy="theming-split-btn"
                            @click="splitEnabled = !splitEnabled"
                        >
                            {{ t('theming.split.toggle', 'Split') }}
                        </origam-btn>
                    </div>

                    <div
                        class="theming__preview-area"
                        :class="{ 'theming__preview-area--split': splitEnabled }"
                        aria-live="polite"
                        data-cy="theming-preview-area"
                    >
                        <ClientOnly>
                            <div
                                class="theming__preview-pane theming__preview-pane--active"
                                :data-mode="state.activeMode"
                                :data-cy="`theming-preview-pane-${state.activeMode}`"
                            >
                                <div
                                    v-if="splitEnabled"
                                    class="theming__preview-pane-header"
                                >
                                    <origam-chip
                                        color="primary"
                                        variant="tonal"
                                        density="compact"
                                        class="theming__pane-chip theming__pane-chip--edit"
                                        data-cy="theming-pane-chip-edit"
                                    >
                                        {{ t('theming.mode.edit', 'EDIT') }}
                                    </origam-chip>
                                </div>
                                <origam-theme-provider :mode="state.activeMode">
                                    <div
                                        class="theming__preview-stage"
                                        :style="previewStyle(activeEntry.slug, state.activeMode)"
                                        :data-cy="`theming-preview-stage-${state.activeMode}`"
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

                            <div
                                v-if="splitEnabled"
                                class="theming__preview-pane theming__preview-pane--view"
                                :data-mode="inactiveMode"
                                :data-cy="`theming-preview-pane-${inactiveMode}`"
                                role="button"
                                tabindex="0"
                                :aria-label="t('theming.split.switch_mode', 'Switch to {mode} mode', { mode: inactiveMode === 'dark' ? t('theming.mode.dark', 'Dark') : t('theming.mode.light', 'Light') })"
                                @click="onSplitPaneClick"
                                @keydown.enter="onSplitPaneClick"
                                @keydown.space.prevent="onSplitPaneClick"
                            >
                                <div class="theming__preview-pane-header">
                                    <origam-chip
                                        variant="tonal"
                                        density="compact"
                                        class="theming__pane-chip theming__pane-chip--view"
                                        data-cy="theming-pane-chip-view"
                                    >
                                        {{ t('theming.mode.view', 'VIEW') }}
                                    </origam-chip>
                                </div>
                                <origam-theme-provider :mode="inactiveMode">
                                    <div
                                        class="theming__preview-stage"
                                        :style="previewStyle(activeEntry.slug, inactiveMode)"
                                        :data-cy="`theming-preview-stage-${inactiveMode}`"
                                    >
                                        <NuxtErrorBoundary>
                                            <component
                                                :is="activeEntry.componentKey"
                                                v-bind="previewProps(activeEntry.slug)"
                                                :data-cy="`theming-live-${activeEntry.slug}-view`"
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
                </section>

                <aside
                    v-if="activeEntry"
                    class="theming__controls-panel"
                    :aria-label="t('theming.controls.panel_label', 'Component controls')"
                    data-cy="theming-controls-panel"
                >
                    <div class="theming__controls-panel-head">
                        <origam-title
                            tag="h3"
                            class="theming__controls-panel-heading"
                        >
                            {{ controlsHeading }}
                        </origam-title>
                    </div>

                    <div class="theming__controls-panel-body">
                        <origam-expansion-panels
                            v-model="expandedPanels"
                            multiple
                            class="theming__controls-accordion"
                        >
                            <origam-expansion-panel
                                v-if="activeEntry.controls.length"
                                value="props"
                                data-cy="theming-props-panel"
                            >
                                <template #title>
                                    {{ t('theming.props.legend', 'Default props') }}
                                    <origam-chip
                                        density="compact"
                                        variant="tonal"
                                        class="theming__global-chip"
                                    >
                                        {{ t('theming.props.global', 'global') }}
                                    </origam-chip>
                                </template>
                                <template #content />
                                <template #default>
                                    <form class="theming__controls">
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
                                    </form>
                                </template>
                            </origam-expansion-panel>

                            <origam-expansion-panel
                                v-if="activeEntry.tokens.length"
                                value="tokens-active"
                                data-cy="theming-tokens-panel"
                            >
                                <template #title>
                                    {{ tokenLegend }}
                                    <origam-badge
                                        v-if="editCountByMode(state.activeMode)"
                                        :content="editCountByMode(state.activeMode)"
                                        :model-value="true"
                                        inline
                                        color="primary"
                                        class="theming__tokens-badge"
                                    />
                                </template>
                                <template #content />
                                <template #default>
                                    <div
                                        class="theming__token-list"
                                        data-cy="theming-tokens"
                                    >
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
                                    </div>
                                </template>
                            </origam-expansion-panel>
                        </origam-expansion-panels>
                    </div>

                    <div class="theming__controls-panel-export">
                        <origam-btn
                            color="primary"
                            variant="elevated"
                            prepend-icon="mdi-download"
                            block
                            data-cy="theming-validate-side"
                            @click="onValidate"
                        >
                            {{ t('theming.validate', 'Validate & export') }}
                            <origam-badge
                                v-if="editCount"
                                :content="editCount"
                                :model-value="true"
                                inline
                                color="primary"
                                class="theming__edit-badge"
                            />
                        </origam-btn>
                        <origam-btn
                            variant="outlined"
                            prepend-icon="mdi-code-json"
                            block
                            data-cy="theming-export-json-side"
                            @click="onExportJson"
                        >
                            {{ t('theming.export_json', 'Export JSON') }}
                        </origam-btn>
                    </div>
                </aside>
            </div>
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
        padding-block: var(--origam-spacing-12, 3rem) 0;
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

    &__seed {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        margin-block-start: var(--origam-spacing-4, 1rem);
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

    &__mode-tabs {
        margin-block-start: var(--origam-spacing-2, 0.5rem);
    }

    &__mode-tabs-inner {
        min-height: unset;
    }

    &__mode-tab-badge {
        margin-inline-start: var(--origam-spacing-2, 0.5rem);
    }

    &__body {
        padding-block-start: var(--origam-spacing-6, 1.5rem);
    }

    &__layout {
        display: grid;
        grid-template-columns: 14rem 1fr 20rem;
        grid-template-rows: auto;
        gap: 0;
        align-items: start;
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        border-radius: var(--origam-radius-lg, 0.75rem);
        overflow: hidden;

        @media (max-width: 56rem) {
            grid-template-columns: 1fr;
        }
    }

    &__nav {
        border-inline-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        padding: var(--origam-spacing-4, 1rem) var(--origam-spacing-2, 0.5rem);
        background-color: var(--origam-color-surface-default);
        min-height: 100%;

        @media (max-width: 56rem) {
            border-inline-end: none;
            border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        }
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
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-default));
        border-inline-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));

        @media (max-width: 56rem) {
            border-inline-end: none;
        }
    }

    &__preview-bar {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-3, 0.75rem);
        padding: var(--origam-spacing-3, 0.75rem) var(--origam-spacing-4, 1rem);
        background-color: var(--origam-color-surface-default);
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__preview-bar-title {
        font-size: var(--origam-font-size-sm, 0.875rem);
        font-weight: var(--origam-font-weight-semibold, 600);
        color: var(--origam-color-text-default);
    }

    &__preview-bar-mode {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-1, 0.25rem);
        font-size: var(--origam-font-size-sm, 0.875rem);
        color: var(--origam-color-text-subtle);
        flex: 1 1 auto;
    }

    &__split-btn {
        flex: 0 0 auto;
    }

    &__preview-area {
        display: grid;
        grid-template-columns: 1fr;
        flex: 1;

        &--split {
            grid-template-columns: 1fr 1fr;

            @media (max-width: 40rem) {
                grid-template-columns: 1fr;
            }
        }
    }

    &__preview-pane {
        display: flex;
        flex-direction: column;

        &--view {
            cursor: pointer;
            opacity: 0.8;
            border-inline-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
            transition: opacity 0.15s ease;

            &:hover,
            &:focus-visible {
                opacity: 1;
            }

            &:focus-visible {
                outline: 2px solid var(--origam-color-action-primary-bg);
                outline-offset: -2px;
            }
        }
    }

    &__preview-pane-header {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
        padding: var(--origam-spacing-2, 0.5rem) var(--origam-spacing-4, 1rem);
        background-color: var(--origam-color-surface-default);
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__pane-chip {
        font-size: var(--origam-font-size-xs, 0.75rem);
        font-weight: var(--origam-font-weight-bold, 700);
        letter-spacing: 0.04em;
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

    &__output {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        padding: var(--origam-spacing-6, 1.5rem);
        border-block-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        background-color: var(--origam-color-surface-default);
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

    &__controls-panel {
        display: flex;
        flex-direction: column;
        background-color: var(--origam-color-surface-default);
        min-height: 100%;
    }

    &__controls-panel-head {
        padding: var(--origam-spacing-3, 0.75rem) var(--origam-spacing-4, 1rem) var(--origam-spacing-2, 0.5rem);
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__controls-panel-heading {
        margin: 0;
        font-size: var(--origam-font-size-sm, 0.875rem);
    }

    &__controls-panel-body {
        flex: 1 1 auto;
        overflow-y: auto;
    }

    &__controls-accordion {
        border-radius: 0;
    }

    &__global-chip {
        margin-inline-start: var(--origam-spacing-2, 0.5rem);
        font-size: var(--origam-font-size-xs, 0.75rem);
    }

    &__tokens-badge {
        margin-inline-start: var(--origam-spacing-2, 0.5rem);
    }

    &__controls {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        padding: var(--origam-spacing-2, 0.5rem) 0;
    }

    &__token-list {
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-3, 0.75rem);
        padding: var(--origam-spacing-2, 0.5rem) 0;
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

    &__controls-panel-export {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: var(--origam-spacing-2, 0.5rem);
        padding: var(--origam-spacing-4, 1rem);
        border-block-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-default));
    }

    &__edit-badge {
        margin-inline-start: var(--origam-spacing-2, 0.5rem);
    }
}
</style>
