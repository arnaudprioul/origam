<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { MDI_ICONS } from 'origam/enums'

import { useT } from '~/composables/useT'
import type {
    IThemeBuilderComponentEntry,
    IThemeBuilderPropControl,
    IThemeBuilderToken,
    TEditMode
} from '~/interfaces/theme-builder.interface'

type TTab = 'props' | 'tokens'

const props = defineProps<{
    entry: IThemeBuilderComponentEntry
    activeMode: TEditMode
    propValue: (slug: string, prop: string) => unknown
    tokenValue: (mode: TEditMode, cssVar: string) => string
    isPropEdited: (slug: string, prop: string) => boolean
    isTokenEdited: (mode: TEditMode, cssVar: string) => boolean
    componentEditCount: (slug: string) => number
    groupEditCount: (slug: string, propNames: string[]) => number
    tokenGroupEditCount: (mode: TEditMode, cssVars: string[]) => number
}>()

const emit = defineEmits<{
    (e: 'set-prop', slug: string, prop: string, value: unknown): void
    (e: 'set-token', mode: TEditMode, cssVar: string, value: string): void
    (e: 'reset-component', slug: string): void
}>()

const { t } = useT()

const tab = ref<TTab>('props')

const propsCount = computed(() => props.entry.controls.length)
const tokensCount = computed(() => props.entry.tokens.length)

const buildCollapsedSet = (): Set<string> => {
    const ids = new Set<string>()
    for (const g of props.entry.propGroups) ids.add(`p-${g.meta.id}`)
    for (const g of props.entry.tokenGroups) ids.add(`t-${g.meta.id}`)
    return ids
}

const collapsed = ref<Set<string>>(buildCollapsedSet())

watchEffect(() => {
    collapsed.value = buildCollapsedSet()
})

const isCollapsed = (id: string): boolean => collapsed.value.has(id)

const toggleGroup = (id: string): void => {
    const next = new Set(collapsed.value)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    collapsed.value = next
}

const groupLabel = (labelKey: string, fallback: string): string =>
    labelKey ? t(labelKey, fallback) : fallback

const selectItems = (ctrl: IThemeBuilderPropControl) =>
    (ctrl.options ?? []).map(o => ({ title: o.label, value: o.value }))

const onSelect = (prop: string, value: unknown): void => {
    emit('set-prop', props.entry.slug, prop, value)
}

const onSwitch = (prop: string, value: unknown): void => {
    emit('set-prop', props.entry.slug, prop, Boolean(value))
}

const onText = (prop: string, value: unknown): void => {
    emit('set-prop', props.entry.slug, prop, value)
}

const onNumber = (prop: string, value: unknown): void => {
    emit('set-prop', props.entry.slug, prop, value)
}

const onColor = (prop: string, value: string): void => {
    emit('set-prop', props.entry.slug, prop, value)
}

/** Generic per-prop setter used by the rich multi-prop controls (round 2). */
const onProp = (prop: string, value: unknown): void => {
    emit('set-prop', props.entry.slug, prop, value)
}

/** A rich control is "edited" when ANY of the real DS props it drives differs from the default. */
const isControlEdited = (ctrl: IThemeBuilderPropControl): boolean =>
    ctrl.props.some(p => props.isPropEdited(props.entry.slug, p))

/** Reset every real DS prop a rich control drives back to its DS default. */
const onResetControl = (ctrl: IThemeBuilderPropControl): void => {
    for (const p of ctrl.props) {
        const defaultValue = ctrl.defaultValues?.[p] ?? (p === ctrl.prop ? ctrl.defaultValue : undefined)
        emit('set-prop', props.entry.slug, p, defaultValue)
    }
}

const RICH_CONTROL_KINDS = new Set(['color-intent', 'rounded', 'elevation', 'border', 'box-model'])
const isRichControl = (ctrl: IThemeBuilderPropControl): boolean => RICH_CONTROL_KINDS.has(ctrl.kind)

const onToken = (cssVar: string, value: string): void => {
    emit('set-token', props.activeMode, cssVar, value)
}

const onResetComponent = (): void => {
    emit('reset-component', props.entry.slug)
}

const propValueStr = (prop: string): string => {
    const v = props.propValue(props.entry.slug, prop)
    return v === undefined || v === null ? '' : String(v)
}

const propValueNum = (prop: string): number | undefined => {
    const v = props.propValue(props.entry.slug, prop)
    return typeof v === 'number' ? v : undefined
}

const propValueBool = (prop: string): boolean => {
    return Boolean(props.propValue(props.entry.slug, prop))
}

const groupPropNames = (controls: IThemeBuilderPropControl[]): string[] =>
    controls.map(c => c.prop)

const tokenCssVars = (tokens: IThemeBuilderToken[]): string[] =>
    tokens.map(tk => tk.cssVar)

const resetLabel = computed(() => t('theming.controls.reset', 'reset'))
</script>

<template>
    <aside
        class="tb-panel"
        :aria-label="t('theming.controls.panel_label', 'Component controls')"
        data-cy="theming-controls-panel"
    >
        <header class="tb-panel__head">
            <origam-icon
                :icon="entry.icon"
                size="small"
                class="tb-panel__head-icon"
            />
            <span class="tb-panel__head-title">{{ entry.name }}</span>
            <origam-btn
                variant="text"
                size="x-small"
                density="compact"
                prepend-icon="mdi-restore"
                class="tb-panel__head-reset"
                data-cy="theming-reset-component"
                @click="onResetComponent"
            >
                {{ resetLabel }}
            </origam-btn>
        </header>

        <nav
            class="tb-panel__tabs"
            :aria-label="t('theming.controls.tabs_label', 'Controls view')"
        >
            <button
                type="button"
                class="tb-panel__tab"
                :class="{ 'tb-panel__tab--active': tab === 'props' }"
                :aria-pressed="tab === 'props'"
                data-cy="theming-tab-props"
                @click="tab = 'props'"
            >
                {{ t('theming.controls.tab_props', 'Props') }}
                <span class="tb-panel__tab-badge">{{ propsCount }}</span>
            </button>
            <button
                type="button"
                class="tb-panel__tab"
                :class="{ 'tb-panel__tab--active': tab === 'tokens' }"
                :aria-pressed="tab === 'tokens'"
                data-cy="theming-tab-tokens"
                @click="tab = 'tokens'"
            >
                {{ t('theming.controls.tab_tokens', 'CSS Tokens') }}
                <span class="tb-panel__tab-badge">{{ tokensCount }}</span>
            </button>
        </nav>

        <div
            class="tb-panel__scroll"
            data-cy="theming-controls-scroll"
        >
            <form
                v-show="tab === 'props'"
                class="tb-panel__form"
                data-cy="theming-props-form"
                @submit.prevent
            >
                <p
                    v-if="entry.propGroups.length === 0"
                    class="tb-panel__empty"
                >
                    {{ t('theming.controls.no_props', 'This component exposes no themable props.') }}
                </p>

                <details
                    v-for="group in entry.propGroups"
                    :key="group.meta.id"
                    class="tb-group"
                    :open="!isCollapsed(`p-${group.meta.id}`)"
                    :data-cy="`theming-prop-group-${group.meta.id}`"
                >
                    <summary
                        class="tb-group__summary"
                        @click.prevent="toggleGroup(`p-${group.meta.id}`)"
                    >
                        <span class="tb-group__label">{{ groupLabel(group.meta.labelKey, group.meta.labelFallback) }}</span>
                        <span
                            v-if="groupEditCount(entry.slug, groupPropNames(group.controls))"
                            class="tb-group__dot"
                            :aria-label="t('theming.controls.edited', 'Edited')"
                        />
                        <span class="tb-group__count">{{ group.controls.length }}</span>
                        <origam-icon
                            icon="mdi-chevron-down"
                            size="x-small"
                            class="tb-group__chevron"
                        />
                    </summary>

                    <div class="tb-group__body">
                        <div
                            v-for="ctrl in group.controls"
                            :key="ctrl.prop"
                            class="tb-row"
                            :class="{ 'tb-row--edited': isRichControl(ctrl) ? isControlEdited(ctrl) : isPropEdited(entry.slug, ctrl.prop) }"
                            :data-cy="`theming-prop-${ctrl.prop}`"
                        >
                            <code class="tb-row__code">{{ ctrl.prop }}</code>

                            <div class="tb-row__control">
                                <div
                                    v-if="ctrl.kind === 'color-intent'"
                                    class="tb-row__rich"
                                >
                                    <theme-builder-color-field
                                        :model-value="propValue(entry.slug, ctrl.prop)"
                                        :label="ctrl.label"
                                        :data-cy="`theming-prop-${ctrl.prop}`"
                                        @update:model-value="onProp(ctrl.prop, $event)"
                                    />
                                </div>

                                <div
                                    v-else-if="ctrl.kind === 'rounded'"
                                    class="tb-row__rich"
                                >
                                    <theme-builder-rounded-field
                                        :model-value="propValue(entry.slug, ctrl.prop)"
                                        :label="ctrl.label"
                                        :data-cy="`theming-prop-${ctrl.prop}`"
                                        @update:model-value="onProp(ctrl.prop, $event)"
                                    />
                                </div>

                                <div
                                    v-else-if="ctrl.kind === 'elevation'"
                                    class="tb-row__rich"
                                >
                                    <theme-builder-elevation-field
                                        :model-value="propValue(entry.slug, ctrl.prop)"
                                        :label="ctrl.label"
                                        :data-cy="`theming-prop-${ctrl.prop}`"
                                        @update:model-value="onProp(ctrl.prop, $event)"
                                    />
                                </div>

                                <div
                                    v-else-if="ctrl.kind === 'border'"
                                    class="tb-row__rich"
                                >
                                    <theme-builder-border-field
                                        :width-value="propValue(entry.slug, 'border')"
                                        :style-value="ctrl.props.includes('borderStyle') ? propValue(entry.slug, 'borderStyle') : undefined"
                                        :color-value="ctrl.props.includes('borderColor') ? propValue(entry.slug, 'borderColor') : undefined"
                                        :label="ctrl.label"
                                        :data-cy="`theming-prop-${ctrl.prop}`"
                                        @update:width="onProp('border', $event)"
                                        @update:style="onProp('borderStyle', $event)"
                                        @update:color="onProp('borderColor', $event)"
                                    />
                                </div>

                                <div
                                    v-else-if="ctrl.kind === 'box-model'"
                                    class="tb-row__rich"
                                >
                                    <theme-builder-box-model-field
                                        :model-value="propValue(entry.slug, ctrl.prop)"
                                        :axis="ctrl.boxModelAxis ?? 'padding'"
                                        :label="ctrl.label"
                                        :data-cy="`theming-prop-${ctrl.prop}`"
                                        @update:model-value="onProp(ctrl.prop, $event)"
                                    />
                                </div>

                                <origam-select
                                    v-else-if="ctrl.kind === 'select'"
                                    :model-value="propValue(entry.slug, ctrl.prop)"
                                    :items="selectItems(ctrl)"
                                    :label="ctrl.label"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    class="tb-row__select"
                                    @update:model-value="onSelect(ctrl.prop, $event)"
                                />

                                <origam-switch
                                    v-else-if="ctrl.kind === 'switch'"
                                    :model-value="propValueBool(ctrl.prop)"
                                    :label="ctrl.label"
                                    density="compact"
                                    hide-details
                                    @update:model-value="onSwitch(ctrl.prop, $event)"
                                />

                                <origam-number-field
                                    v-else-if="ctrl.kind === 'number'"
                                    :model-value="propValueNum(ctrl.prop)"
                                    :label="ctrl.label"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    class="tb-row__input"
                                    @update:model-value="onNumber(ctrl.prop, $event)"
                                />

                                <span
                                    v-else-if="ctrl.kind === 'color'"
                                    class="tb-row__color"
                                >
                                    <input
                                        type="color"
                                        class="tb-row__swatch"
                                        :value="propValueStr(ctrl.prop)"
                                        :aria-label="ctrl.label"
                                        @input="onColor(ctrl.prop, ($event.target as HTMLInputElement).value)"
                                    >
                                    <input
                                        type="text"
                                        class="tb-row__color-hex"
                                        :value="propValueStr(ctrl.prop)"
                                        :aria-label="ctrl.label"
                                        @input="onColor(ctrl.prop, ($event.target as HTMLInputElement).value)"
                                    >
                                </span>

                                <origam-text-field
                                    v-else
                                    :model-value="propValueStr(ctrl.prop)"
                                    :label="ctrl.label"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    class="tb-row__input"
                                    @update:model-value="onText(ctrl.prop, $event)"
                                />
                            </div>

                            <origam-btn
                                v-if="isRichControl(ctrl) && isControlEdited(ctrl)"
                                variant="text"
                                size="x-small"
                                density="compact"
                                :icon="MDI_ICONS.RESTORE"
                                class="tb-row__reset"
                                :aria-label="t('theming.controls.reset_prop', 'Reset {label}', { label: ctrl.label })"
                                :data-cy="`theming-prop-${ctrl.prop}-reset`"
                                @click="onResetControl(ctrl)"
                            />
                        </div>
                    </div>
                </details>
            </form>

            <div
                v-show="tab === 'tokens'"
                class="tb-panel__form"
                data-cy="theming-tokens-form"
            >
                <p
                    v-if="entry.tokenGroups.length === 0"
                    class="tb-panel__empty"
                    data-cy="theming-tokens-empty"
                >
                    {{ t('theming.controls.no_tokens', 'No editable CSS tokens registered for this component yet.') }}
                </p>

                <details
                    v-for="group in entry.tokenGroups"
                    :key="group.meta.id"
                    class="tb-group"
                    :open="!isCollapsed(`t-${group.meta.id}`)"
                    :data-cy="`theming-token-group-${group.meta.id}`"
                >
                    <summary
                        class="tb-group__summary"
                        @click.prevent="toggleGroup(`t-${group.meta.id}`)"
                    >
                        <span class="tb-group__label">{{ groupLabel(group.meta.labelKey, group.meta.labelFallback) }}</span>
                        <span
                            v-if="tokenGroupEditCount(activeMode, tokenCssVars(group.tokens))"
                            class="tb-group__dot"
                            :aria-label="t('theming.controls.edited', 'Edited')"
                        />
                        <span class="tb-group__count">{{ group.tokens.length }}</span>
                        <origam-icon
                            icon="mdi-chevron-down"
                            size="x-small"
                            class="tb-group__chevron"
                        />
                    </summary>

                    <div class="tb-group__body">
                        <div
                            v-for="tk in group.tokens"
                            :key="tk.cssVar"
                            class="tb-row tb-row--token"
                            :class="{ 'tb-row--edited': isTokenEdited(activeMode, tk.cssVar) }"
                            :data-cy="`theming-token-${tk.cssVar}`"
                        >
                            <code
                                class="tb-row__var"
                                :title="tk.cssVar"
                            >{{ tk.label }}</code>

                            <div class="tb-row__control">
                                <label
                                    v-if="tk.kind === 'color'"
                                    class="tb-row__color"
                                >
                                    <input
                                        type="color"
                                        class="tb-row__swatch"
                                        :value="tokenValue(activeMode, tk.cssVar)"
                                        :aria-label="tk.label"
                                        @input="onToken(tk.cssVar, ($event.target as HTMLInputElement).value)"
                                    >
                                    <input
                                        type="text"
                                        class="tb-row__color-hex"
                                        :value="tokenValue(activeMode, tk.cssVar)"
                                        :aria-label="tk.label"
                                        @input="onToken(tk.cssVar, ($event.target as HTMLInputElement).value)"
                                    >
                                </label>

                                <input
                                    v-else
                                    type="text"
                                    class="tb-row__token-text"
                                    :value="tokenValue(activeMode, tk.cssVar)"
                                    :aria-label="tk.label"
                                    @input="onToken(tk.cssVar, ($event.target as HTMLInputElement).value)"
                                >
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </aside>
</template>

<style scoped lang="scss">
.tb-panel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    background-color: var(--origam-color-surface-default);
    border-inline-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    --origam-field---font-size: 0.6875rem;
    --origam-field---padding-top: 0px;
    --origam-field---padding-bottom: 0px;
    --origam-field---padding-start: 8px;
    --origam-field---padding-end: 8px;
    --origam-field---border-radius: 4px;
    --origam-input---font-size: 0.6875rem;
    --origam-input__control---height-sm: 26px;
    --origam-select---min-width: 0;

    :deep(.origam-field) {
        font-size: 0.6875rem;
    }

    :deep(.origam-field__input) {
        min-height: 26px;
        padding-top: 4px;
        padding-bottom: 4px;
    }

    :deep(.origam-select__selection-text),
    :deep(.origam-input__control) {
        font-size: 0.6875rem;
    }

    :deep(.origam-field__label) {
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

    &__head {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
        flex: 0 0 auto;
        padding: var(--origam-spacing-2, 0.5rem) var(--origam-spacing-4, 1rem);
        min-height: 2.75rem;
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__head-icon {
        flex: 0 0 auto;
        color: var(--origam-color__action--primary---bg, #7c3aed);
    }

    &__head-title {
        flex: 1 1 auto;
        font-size: var(--origam-font-size-sm, 0.8125rem);
        font-weight: var(--origam-font-weight-bold, 700);
        color: var(--origam-color-text-default);
    }

    &__head-reset {
        flex: 0 0 auto;
    }

    &__tabs {
        display: flex;
        flex: 0 0 auto;
        gap: 0;
        padding-inline: var(--origam-spacing-4, 1rem);
        border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__tab {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
        padding: var(--origam-spacing-2, 0.5rem) var(--origam-spacing-3, 0.75rem);
        min-height: 2.25rem;
        margin-block-end: -1px;
        background: transparent;
        border: none;
        border-block-end: 2px solid transparent;
        cursor: pointer;
        font-size: var(--origam-font-size-sm, 0.8125rem);
        font-weight: var(--origam-font-weight-medium, 500);
        color: var(--origam-color-text-subtle);
        transition: color 0.15s ease, border-color 0.15s ease;

        &:hover {
            color: var(--origam-color-text-default);
        }

        &--active {
            color: var(--origam-color-text-default);
            border-block-end-color: var(--origam-color__action--primary---bg, #7c3aed);
            font-weight: var(--origam-font-weight-bold, 700);
        }
    }

    &__tab-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-inline-size: 1.0625rem;
        block-size: 1.0625rem;
        padding-inline: 4px;
        font-size: 0.5625rem;
        font-weight: var(--origam-font-weight-bold, 700);
        border-radius: var(--origam-radius-pill, 9999px);
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-raised));
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        color: var(--origam-color-text-subtle);
        font-variant-numeric: tabular-nums;
    }

    &__tab--active &__tab-badge {
        background-color: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 12%, transparent);
        border-color: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 20%, transparent);
        color: var(--origam-color__action--primary---bg, #7c3aed);
    }

    &__scroll {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
    }

    &__form {
        display: block;
    }

    &__empty {
        margin: 0;
        padding: var(--origam-spacing-4, 1rem);
        font-size: var(--origam-font-size-xs, 0.75rem);
        color: var(--origam-color-text-subtle);
    }
}

.tb-group {
    border-block-end: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));

    &__summary {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-2, 0.5rem);
        padding: var(--origam-spacing-2, 0.5rem) var(--origam-spacing-4, 1rem);
        min-height: 2.25rem;
        cursor: pointer;
        list-style: none;
        transition: background-color 0.15s ease;

        &::-webkit-details-marker {
            display: none;
        }

        &:hover {
            background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-raised));
        }
    }

    &__label {
        flex: 1 1 auto;
        font-size: 0.625rem;
        font-weight: var(--origam-font-weight-bold, 700);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--origam-color-text-subtle);
    }

    &__dot {
        flex: 0 0 auto;
        inline-size: 5px;
        block-size: 5px;
        border-radius: 50%;
        background-color: var(--origam-color__action--primary---bg, #7c3aed);
    }

    &__count {
        flex: 0 0 auto;
        min-inline-size: 1.125rem;
        padding: 1px 5px;
        font-size: 0.5625rem;
        font-weight: var(--origam-font-weight-bold, 700);
        text-align: center;
        border-radius: var(--origam-radius-pill, 9999px);
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-raised));
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        color: var(--origam-color-text-subtle);
        font-variant-numeric: tabular-nums;
    }

    &__chevron {
        flex: 0 0 auto;
        color: var(--origam-color-text-subtle);
        transition: transform 0.15s ease;
    }

    &[open] &__chevron {
        transform: rotate(180deg);
    }

    &__body {
        padding: var(--origam-spacing-1, 0.25rem) var(--origam-spacing-4, 1rem) var(--origam-spacing-3, 0.75rem);
    }
}

.tb-row {
    display: flex;
    align-items: center;
    gap: var(--origam-spacing-2, 0.5rem);
    padding-block: var(--origam-spacing-1, 0.25rem);
    min-height: 1.875rem;

    & + & {
        border-block-start: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
    }

    &__code,
    &__var {
        flex: 1 1 auto;
        min-inline-size: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--origam-font-family-mono, monospace);
        font-size: 0.625rem;
        color: var(--origam-color-text-subtle);
    }

    &--edited &__code,
    &--edited &__var {
        color: var(--origam-color__action--primary---bg, #7c3aed);
    }

    &__control {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-1, 0.25rem);
    }

    &__select {
        inline-size: 8.5rem;
    }

    &__input {
        inline-size: 6rem;
    }

    &__rich {
        inline-size: 9rem;
    }

    &__reset {
        flex: 0 0 auto;
    }

    &__color {
        display: flex;
        align-items: center;
        gap: var(--origam-spacing-1, 0.25rem);
    }

    &__swatch {
        inline-size: 1.25rem;
        block-size: 1.25rem;
        padding: 0;
        border: 1px solid var(--origam-color-border-default);
        border-radius: var(--origam-radius-sm, 0.25rem);
        background: none;
        cursor: pointer;
    }

    &__color-hex,
    &__token-text {
        inline-size: 4.5rem;
        padding: var(--origam-spacing-1, 0.25rem) var(--origam-spacing-2, 0.5rem);
        font-family: var(--origam-font-family-mono, monospace);
        font-size: 0.625rem;
        color: var(--origam-color-text-default);
        background-color: var(--origam-color-surface-subtle, var(--origam-color-surface-raised));
        border: 1px solid var(--origam-color-border-subtle, var(--origam-color-border-default));
        border-radius: var(--origam-radius-sm, 0.25rem);

        &:focus {
            outline: none;
            border-color: var(--origam-color__action--primary---bg, #7c3aed);
        }
    }

    &__token-text {
        inline-size: 6rem;
    }
}
</style>
