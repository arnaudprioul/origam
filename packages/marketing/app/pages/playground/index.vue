<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TPlaygroundTemplate } from '~/types/playground-template.type'
import { PLAYGROUND_TEMPLATES } from '~/consts/playground-templates.const'
import {
    PLAYGROUND_DEFAULT_TEMPLATE
} from '~/consts/playground.const'
import { usePlaygroundShare } from '~/composables/usePlaygroundShare'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'

const { t } = useI18nFallback()
const { parseInitialCode, getShareUrl } = usePlaygroundShare()

useSeoMeta({
    title: t('playground.meta.title', 'Playground · origam'),
    description: t('playground.meta.description', 'Try origam components in your browser. No install required.'),
    ogImageAlt: t('playground.meta.ogImageAlt', 'origam Playground'),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('playground.meta.ogTitle', 'Playground'),
    description: t('playground.meta.description', 'Try origam components in your browser. No install required.'),
    type: 'page'
})

const { code: urlCode, template: urlTemplate } = parseInitialCode()

const defaultTemplate = PLAYGROUND_TEMPLATES.find(
    (tpl) => tpl.id === PLAYGROUND_DEFAULT_TEMPLATE
)!

const activeTemplate = ref<TPlaygroundTemplate | null>(
    urlTemplate ?? PLAYGROUND_DEFAULT_TEMPLATE
)

const initialCode = urlCode ?? (
    PLAYGROUND_TEMPLATES.find((tpl) => tpl.id === activeTemplate.value)?.code
    ?? defaultTemplate.code
)

const code = ref<string>(initialCode)

const activeTab = ref<'code' | 'preview'>('code')

const isMobile = ref(false)

if (import.meta.client) {
    isMobile.value = window.matchMedia('(max-width: 767px)').matches
    const mq = window.matchMedia('(max-width: 767px)')
    mq.addEventListener('change', (e) => {
        isMobile.value = e.matches
    })
}

const shareMessage = ref<string | null>(null)
let shareTimer: ReturnType<typeof setTimeout> | null = null

function selectTemplate (id: TPlaygroundTemplate) {
    const tpl = PLAYGROUND_TEMPLATES.find((t) => t.id === id)
    if (!tpl) {
        return
    }
    activeTemplate.value = id
    code.value = tpl.code
}

function reset () {
    const tpl = PLAYGROUND_TEMPLATES.find((t) => t.id === (activeTemplate.value ?? PLAYGROUND_DEFAULT_TEMPLATE))
    code.value = tpl?.code ?? defaultTemplate.code
}

async function share () {
    const url = getShareUrl(code.value)
    try {
        await navigator.clipboard.writeText(url)
        shareMessage.value = t('playground.share.copied', 'Link copied!')
    } catch {
        shareMessage.value = t('playground.share.fallback', 'Copy this URL: ') + url
    }
    if (shareTimer) {
        clearTimeout(shareTimer)
    }
    shareTimer = setTimeout(() => {
        shareMessage.value = null
        shareTimer = null
    }, 3000)
}

const splitClass = computed(() => ({
    'playground-layout__split': true,
    'playground-layout__split--mobile': isMobile.value
}))
</script>

<template>
    <article class="playground-layout">
        <PlaygroundToolbar
            :active-template="activeTemplate"
            @select-template="selectTemplate"
            @reset="reset"
            @share="share"
        />

        <div
            v-if="shareMessage"
            role="status"
            class="playground-layout__toast"
            aria-live="polite"
        >
            {{ shareMessage }}
        </div>

        <div
            v-if="isMobile"
            class="playground-layout__tabs"
            role="tablist"
            :aria-label="t('playground.tabs.label', 'Editor and preview tabs')"
        >
            <button
                role="tab"
                type="button"
                class="playground-layout__tab"
                :class="{ 'playground-layout__tab--active': activeTab === 'code' }"
                :aria-selected="activeTab === 'code'"
                aria-controls="playground-panel-code"
                @click="activeTab = 'code'"
            >
                {{ t('playground.tabs.code', 'Code') }}
            </button>
            <button
                role="tab"
                type="button"
                class="playground-layout__tab"
                :class="{ 'playground-layout__tab--active': activeTab === 'preview' }"
                :aria-selected="activeTab === 'preview'"
                aria-controls="playground-panel-preview"
                @click="activeTab = 'preview'"
            >
                {{ t('playground.tabs.preview', 'Preview') }}
            </button>
        </div>

        <section
            :class="splitClass"
            :aria-label="t('playground.split.label', 'Code editor and preview')"
        >
            <div
                id="playground-panel-code"
                class="playground-layout__pane"
                :class="{ 'playground-layout__pane--hidden': isMobile && activeTab !== 'code' }"
                role="tabpanel"
                :aria-labelledby="isMobile ? 'playground-tab-code' : undefined"
                :hidden="isMobile && activeTab !== 'code' ? true : undefined"
            >
                <PlaygroundEditor
                    v-model="code"
                />
            </div>

            <div
                id="playground-panel-preview"
                class="playground-layout__pane"
                :class="{ 'playground-layout__pane--hidden': isMobile && activeTab !== 'preview' }"
                role="tabpanel"
                :aria-labelledby="isMobile ? 'playground-tab-preview' : undefined"
                :hidden="isMobile && activeTab !== 'preview' ? true : undefined"
            >
                <PlaygroundPreview :code="code" />
            </div>
        </section>
    </article>
</template>

<style scoped>
.playground-layout {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.playground-layout__toast {
    position: fixed;
    bottom: var(--origam-space-6, 1.5rem);
    left: 50%;
    transform: translateX(-50%);
    padding-block: var(--origam-space-2, 0.5rem);
    padding-inline: var(--origam-space-5, 1.25rem);
    border-radius: var(--origam-rounded-pill, 999px);
    background-color: var(--origam-color-surface-inverse, #1e1e2e);
    color: var(--origam-color-text-inverse, #fff);
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    z-index: 1000;
    pointer-events: none;
    box-shadow: var(--origam-shadow-md, 0 4px 16px rgb(0 0 0 / 0.2));
    animation: toast-in 0.2s ease-out;
}

.playground-layout__tabs {
    display: flex;
    border-bottom: 1px solid var(--origam-color-border-default, transparent);
    flex-shrink: 0;
}

.playground-layout__tab {
    flex: 1;
    padding-block: var(--origam-space-3, 0.75rem);
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--origam-color-text-muted, currentColor);
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    cursor: pointer;
    transition: color 0.15s ease, border-color 0.15s ease;
}

.playground-layout__tab--active {
    color: var(--origam-color-action-primary-bg, currentColor);
    border-bottom-color: var(--origam-color-action-primary-bg, currentColor);
}

.playground-layout__tab:focus-visible {
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: -2px;
}

.playground-layout__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--origam-space-4, 1rem);
    padding: var(--origam-space-4, 1rem);
    flex: 1;
    min-height: 0;
    overflow: hidden;
}

.playground-layout__split--mobile {
    grid-template-columns: 1fr;
}

.playground-layout__pane {
    min-height: 0;
    overflow: hidden;
}

.playground-layout__pane--hidden {
    display: none;
}

@keyframes toast-in {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(0.5rem);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
</style>
