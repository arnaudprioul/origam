<script setup lang="ts">
import { ref } from 'vue'
import type { TPlaygroundTemplate } from '~/types/playground-template.type'
import { PLAYGROUND_TEMPLATES } from '~/consts/playground-templates.const'

const props = defineProps<{
    activeTemplate: TPlaygroundTemplate | null
}>()

const emit = defineEmits<{
    'select-template': [id: TPlaygroundTemplate]
    'reset': []
    'share': []
}>()

const { t } = useI18nFallback()
const { track } = useAnalytics()

const showCopied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | null = null

function onTemplateChange (event: Event) {
    const select = event.target as HTMLSelectElement
    const id = select.value as TPlaygroundTemplate
    emit('select-template', id)
    track('playground:template:load', { template: id })
}

function onReset () {
    emit('reset')
    track('playground:reset')
}

async function onShare () {
    emit('share')
    track('playground:share')
    showCopied.value = true
    if (copyTimer) {
        clearTimeout(copyTimer)
    }
    copyTimer = setTimeout(() => {
        showCopied.value = false
        copyTimer = null
    }, 2500)
}

function openInStories () {
    const template = props.activeTemplate
    if (!template || template === 'blank') {
        window.open('/stories/', '_blank', 'noopener noreferrer')
        return
    }
    const storyMap: Record<string, string> = {
        btn: 'Btn',
        card: 'Card',
        'chart-line': 'Chart',
        'data-table': 'DataTable',
        'form-basic': 'Form',
        alert: 'Alert'
    }
    const name = storyMap[template] ?? ''
    window.open(`/stories/?story=src-components-${name}-Origam${name}-story-vue`, '_blank', 'noopener noreferrer')
}
</script>

<template>
    <header class="playground-toolbar">
        <nav
            class="playground-toolbar__nav"
            :aria-label="t('playground.toolbar.navLabel', 'Playground actions')"
        >
            <div class="playground-toolbar__left">
                <label
                    class="playground-toolbar__label"
                    for="playground-template-select"
                >
                    {{ t('playground.toolbar.templateLabel', 'Template') }}
                </label>
                <select
                    id="playground-template-select"
                    class="playground-toolbar__select"
                    :value="activeTemplate ?? 'btn'"
                    @change="onTemplateChange"
                >
                    <option
                        v-for="tpl in PLAYGROUND_TEMPLATES"
                        :key="tpl.id"
                        :value="tpl.id"
                    >
                        {{ tpl.label }}
                    </option>
                </select>
            </div>

            <div class="playground-toolbar__actions">
                <button
                    type="button"
                    class="playground-toolbar__btn"
                    :aria-label="t('playground.toolbar.resetLabel', 'Reset to default template')"
                    @click="onReset"
                >
                    {{ t('playground.toolbar.reset', 'Reset') }}
                </button>

                <button
                    type="button"
                    class="playground-toolbar__btn playground-toolbar__btn--primary"
                    :aria-label="t('playground.toolbar.shareLabel', 'Copy share link to clipboard')"
                    :aria-live="'polite'"
                    @click="onShare"
                >
                    <span v-if="showCopied">
                        {{ t('playground.toolbar.copied', 'Link copied!') }}
                    </span>
                    <span v-else>
                        {{ t('playground.toolbar.share', 'Share link') }}
                    </span>
                </button>

                <button
                    type="button"
                    class="playground-toolbar__btn playground-toolbar__btn--ghost"
                    :aria-label="t('playground.toolbar.storiesLabel', 'Open matching story in Histoire')"
                    @click="openInStories"
                >
                    {{ t('playground.toolbar.stories', 'Open in stories') }}
                </button>
            </div>
        </nav>
    </header>
</template>

<style scoped>
.playground-toolbar {
    display: flex;
    align-items: center;
    padding-block: var(--origam-space-3, 0.75rem);
    padding-inline: var(--origam-space-4, 1rem);
    border-bottom: 1px solid var(--origam-color-border-default, transparent);
    background-color: var(--origam-color-surface-default, transparent);
    flex-shrink: 0;
}

.playground-toolbar__nav {
    display: flex;
    align-items: center;
    gap: var(--origam-space-3, 0.75rem);
    width: 100%;
    flex-wrap: wrap;
}

.playground-toolbar__left {
    display: flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    flex: 1;
}

.playground-toolbar__label {
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    color: var(--origam-color-text-muted, currentColor);
    white-space: nowrap;
}

.playground-toolbar__select {
    font-size: var(--origam-font-size-sm, 0.875rem);
    padding-block: var(--origam-space-1-5, 0.375rem);
    padding-inline: var(--origam-space-3, 0.75rem);
    border-radius: var(--origam-rounded-lg, 0.5rem);
    border: 1px solid var(--origam-color-border-default, transparent);
    background-color: var(--origam-color-surface-subtle, transparent);
    color: var(--origam-color-text-default, currentColor);
    cursor: pointer;
    outline-offset: 2px;
}

.playground-toolbar__select:focus-visible {
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
}

.playground-toolbar__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    flex-wrap: wrap;
}

.playground-toolbar__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space-1-5, 0.375rem);
    padding-block: var(--origam-space-1-5, 0.375rem);
    padding-inline: var(--origam-space-4, 1rem);
    border-radius: var(--origam-rounded-lg, 0.5rem);
    border: 1px solid var(--origam-color-border-default, transparent);
    background-color: var(--origam-color-surface-subtle, transparent);
    color: var(--origam-color-text-default, currentColor);
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
    white-space: nowrap;
}

.playground-toolbar__btn:hover {
    background-color: var(--origam-color-surface-muted, transparent);
}

.playground-toolbar__btn:focus-visible {
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
}

.playground-toolbar__btn--primary {
    background-color: var(--origam-color-action-primary-bg, currentColor);
    color: var(--origam-color-action-primary-fg, #fff);
    border-color: var(--origam-color-action-primary-bg, transparent);
}

.playground-toolbar__btn--primary:hover {
    background-color: var(--origam-color-action-primary-bg-hover, currentColor);
    border-color: var(--origam-color-action-primary-bg-hover, transparent);
}

.playground-toolbar__btn--ghost {
    border-color: transparent;
    background-color: transparent;
}

.playground-toolbar__btn--ghost:hover {
    background-color: var(--origam-color-surface-subtle, transparent);
}
</style>
