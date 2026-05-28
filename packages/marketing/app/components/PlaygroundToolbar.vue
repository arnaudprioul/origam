<script setup lang="ts">
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

const selectedTemplate = computed({
    get: () => props.activeTemplate ?? 'btn',
    set: (id: TPlaygroundTemplate) => {
        emit('select-template', id)
        track('playground:template:load', { template: id })
    }
})

const templateItems = computed(() =>
    PLAYGROUND_TEMPLATES.map(t => ({ title: t.label, value: t.id }))
)

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
                <OrigamSelect
                    id="playground-template-select"
                    v-model="selectedTemplate"
                    :items="templateItems"
                    item-title="title"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                />
            </div>

            <div class="playground-toolbar__actions">
                <OrigamBtn
                    variant="outlined"
                    :aria-label="t('playground.toolbar.resetLabel', 'Reset to default template')"
                    @click="onReset"
                >
                    {{ t('playground.toolbar.reset', 'Reset') }}
                </OrigamBtn>

                <OrigamBtn
                    variant="flat"
                    color="primary"
                    aria-live="polite"
                    :aria-label="t('playground.toolbar.shareLabel', 'Copy share link to clipboard')"
                    @click="onShare"
                >
                    <span v-if="showCopied">
                        {{ t('playground.toolbar.copied', 'Link copied!') }}
                    </span>
                    <span v-else>
                        {{ t('playground.toolbar.share', 'Share link') }}
                    </span>
                </OrigamBtn>

                <OrigamBtn
                    variant="text"
                    :aria-label="t('playground.toolbar.storiesLabel', 'Open matching story in Histoire')"
                    @click="openInStories"
                >
                    {{ t('playground.toolbar.stories', 'Open in stories') }}
                </OrigamBtn>
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

.playground-toolbar__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    flex-wrap: wrap;
}
</style>
