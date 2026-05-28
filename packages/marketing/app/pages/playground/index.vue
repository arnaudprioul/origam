<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TPlaygroundTemplate } from '~/types/playground-template.type'
import { PLAYGROUND_TEMPLATES } from '~/consts/playground-templates.const'
import { PLAYGROUND_DEFAULT_TEMPLATE } from '~/consts/playground.const'
import { usePlaygroundShare } from '~/composables/usePlaygroundShare'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'

const { t } = useI18nFallback()
const { parseInitialCode, getShareUrl } = usePlaygroundShare()
const { track } = useAnalytics()

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

const themeCookie = useCookie<string>('origam_mkt_theme', { default: () => 'sobre' })
const activeThemeId = computed(() => themeCookie.value ?? 'sobre')

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
    if (!tpl) return
    activeTemplate.value = id
    code.value = tpl.code
    track('playground:template:load', { template: id })
}

function reset () {
    const tpl = PLAYGROUND_TEMPLATES.find((t) => t.id === (activeTemplate.value ?? PLAYGROUND_DEFAULT_TEMPLATE))
    code.value = tpl?.code ?? defaultTemplate.code
    track('playground:reset')
}

async function share () {
    const url = getShareUrl(code.value)
    try {
        await navigator.clipboard.writeText(url)
        shareMessage.value = t('playground.share.copied', 'Link copied!')
    } catch {
        shareMessage.value = t('playground.share.fallback', 'Copy this URL: ') + url
    }
    track('playground:share')
    if (shareTimer) clearTimeout(shareTimer)
    shareTimer = setTimeout(() => {
        shareMessage.value = null
        shareTimer = null
    }, 3000)
}

const lineCount = computed(() => Math.max(1, code.value.split('\n').length))
const linesLabel = computed(() =>
    t('playground.lines', '{n} lines', { n: lineCount.value })
)
</script>

<template>
    <article class="playground-page" data-pagefind-filter="type:page">
        <header class="m-section m-section--tight playground-page__header">
            <div class="m-container playground-page__header-inner">
                <div>
                    <span class="m-section-pre">{{ t('playground.eyebrow', 'LIVE PLAYGROUND') }}</span>
                    <h1 class="m-h1-display playground-page__title">
                        {{ t('playground.title', 'Try origam in your browser') }}
                    </h1>
                </div>

                <div class="playground-page__actions">
                    <span class="playground-page__theme-chip" aria-hidden="true">
                        <MarketingIcon name="layers" :size="13" aria-hidden="true" />
                        {{ t('playground.theme', 'Theme:') }}
                        <strong>{{ activeThemeId }}</strong>
                    </span>
                    <OrigamBtn
                        variant="outlined"
                        rounded="md"
                        size="sm"
                        prepend-icon="mdi:refresh"
                        :aria-label="t('playground.toolbar.resetLabel', 'Reset to default template')"
                        @click="reset"
                    >
                        {{ t('playground.toolbar.reset', 'Reset') }}
                    </OrigamBtn>
                    <OrigamBtn
                        color="primary"
                        variant="flat"
                        rounded="md"
                        size="sm"
                        prepend-icon="mdi:share-variant"
                        :aria-label="t('playground.toolbar.shareLabel', 'Copy share link to clipboard')"
                        @click="share"
                    >
                        {{ t('playground.toolbar.share', 'Share link') }}
                    </OrigamBtn>
                </div>
            </div>
        </header>

        <section
            class="playground-page__templates"
            :aria-label="t('playground.templatesNav', 'Load template')"
        >
            <div class="m-container playground-page__templates-inner">
                <span class="m-mono-tag playground-page__templates-label" aria-hidden="true">
                    {{ t('playground.loadPrefix', 'LOAD →') }}
                </span>
                <ul role="list" class="playground-page__templates-list">
                    <li
                        v-for="tpl in PLAYGROUND_TEMPLATES"
                        :key="tpl.id"
                        class="playground-page__templates-item"
                    >
                        <OrigamBtn
                            :variant="activeTemplate === tpl.id ? 'tonal' : 'outlined'"
                            :color="activeTemplate === tpl.id ? 'primary' : undefined"
                            rounded="sm"
                            size="sm"
                            density="compact"
                            :aria-pressed="activeTemplate === tpl.id"
                            @click="selectTemplate(tpl.id)"
                        >
                            {{ tpl.label }}
                        </OrigamBtn>
                    </li>
                </ul>
            </div>
        </section>

        <section class="m-section playground-page__main">
            <div class="m-container">
                <div
                    v-if="isMobile"
                    class="playground-page__tabs"
                    role="tablist"
                    :aria-label="t('playground.tabs.label', 'Editor and preview tabs')"
                >
                    <OrigamBtn
                        :variant="activeTab === 'code' ? 'tonal' : 'text'"
                        :color="activeTab === 'code' ? 'primary' : undefined"
                        rounded="sm"
                        size="sm"
                        density="compact"
                        role="tab"
                        :aria-selected="activeTab === 'code'"
                        @click="activeTab = 'code'"
                    >
                        {{ t('playground.tabs.code', 'Code') }}
                    </OrigamBtn>
                    <OrigamBtn
                        :variant="activeTab === 'preview' ? 'tonal' : 'text'"
                        :color="activeTab === 'preview' ? 'primary' : undefined"
                        rounded="sm"
                        size="sm"
                        density="compact"
                        role="tab"
                        :aria-selected="activeTab === 'preview'"
                        @click="activeTab = 'preview'"
                    >
                        {{ t('playground.tabs.preview', 'Preview') }}
                    </OrigamBtn>
                </div>

                <div class="playground-page__split">
                    <figure
                        class="playground-page__pane playground-page__pane--code"
                        :class="{ 'playground-page__pane--hidden': isMobile && activeTab !== 'code' }"
                        role="region"
                        :aria-label="t('playground.split.codeRegion', 'Code editor')"
                    >
                        <figcaption class="m-winbar">
                            <MarketingIcon name="code" :size="12" aria-hidden="true" />
                            <span class="playground-page__winbar-filename">App.vue</span>
                            <span class="playground-page__winbar-meta" aria-hidden="true">
                                <span>TS</span>
                                <span aria-hidden="true">·</span>
                                <span>{{ linesLabel }}</span>
                            </span>
                        </figcaption>
                        <div class="playground-page__editor">
                            <PlaygroundEditor v-model="code" />
                        </div>
                    </figure>

                    <figure
                        class="playground-page__pane playground-page__pane--preview"
                        :class="{ 'playground-page__pane--hidden': isMobile && activeTab !== 'preview' }"
                        role="region"
                        :aria-label="t('playground.split.previewRegion', 'Live preview')"
                    >
                        <figcaption class="m-winbar">
                            <MarketingIcon name="window-dots" aria-hidden="true" />
                            <span class="playground-page__winbar-url">localhost:5173/preview</span>
                            <span class="playground-page__live-badge" aria-hidden="true">
                                <span class="playground-page__live-dot" />
                                {{ t('playground.live', 'LIVE') }}
                            </span>
                        </figcaption>
                        <div class="playground-page__preview">
                            <div class="m-dotgrid playground-page__preview-dotgrid" aria-hidden="true" />
                            <PlaygroundPreview :code="code" />
                        </div>
                        <footer class="playground-page__preview-status" aria-hidden="true">
                            <span class="playground-page__preview-status-left">
                                <span class="playground-page__live-dot playground-page__live-dot--success" />
                                {{ t('playground.compiled', 'Compiled in 84ms') }}
                            </span>
                            <span>{{ t('playground.bundle', 'Bundle: 12.4kb gzip') }}</span>
                        </footer>
                    </figure>
                </div>

                <div class="playground-page__panels">
                    <section class="playground-page__console" aria-label="Console output">
                        <h3 class="playground-page__panel-title">{{ t('playground.console.title', 'Console') }}</h3>
                        <ul role="list" class="playground-page__console-list">
                            <li class="playground-page__console-line playground-page__console-line--success">
                                <MarketingIcon name="check" :size="11" aria-hidden="true" />
                                {{ t('playground.console.compiled', 'Compiled successfully') }}
                            </li>
                            <li class="playground-page__console-line">• {{ t('playground.console.loaded', 'Loaded 4 components from origam') }}</li>
                            <li class="playground-page__console-line">• {{ t('playground.console.theme', 'Theme:') }} {{ activeThemeId }} · {{ t('playground.console.a11y', '0 a11y warnings') }}</li>
                        </ul>
                    </section>

                    <aside class="playground-page__tip">
                        <h3 class="playground-page__tip-title">
                            <MarketingIcon name="sparkles" :size="14" aria-hidden="true" />
                            {{ t('playground.tip.title', 'Pro tip') }}
                        </h3>
                        <p class="playground-page__tip-body">
                            {{ t('playground.tip.bodyPrefix', 'Try changing ') }}
                            <code class="playground-page__tip-code">color="primary"</code>
                            {{ t('playground.tip.bodyMid', ' to ') }}
                            <code class="playground-page__tip-code">color="success"</code>.
                        </p>
                    </aside>
                </div>
            </div>
        </section>

        <div
            v-if="shareMessage"
            role="status"
            class="playground-page__toast"
            aria-live="polite"
        >
            {{ shareMessage }}
        </div>
    </article>
</template>

<style scoped>
.playground-page {
    display: flex;
    flex-direction: column;
}

.playground-page__header {
    border-block-end: 1px solid var(--m-border, var(--origam-color-border-subtle));
}

.playground-page__header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--origam-space-4, 1rem);
    flex-wrap: wrap;
}

.playground-page__title {
    margin-block: 0.25rem 0;
    line-height: 1.1;
    font-size: clamp(1.5rem, 3vw + 0.5rem, 2.25rem);
}

.playground-page__actions {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
}

.playground-page__theme-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--m-radius, var(--origam-rounded-md, 0.5rem));
    background: var(--m-surface, var(--origam-color-surface-default));
    border: 1px solid var(--m-border, var(--origam-color-border-subtle));
    font-size: 0.75rem;
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
    color: var(--m-text-soft, var(--origam-color-text-secondary));
}

.playground-page__theme-chip strong {
    color: var(--m-text, var(--origam-color-text-primary));
    font-weight: 600;
}

.playground-page__templates {
    padding-block: 0.875rem;
    padding-inline: 0;
    border-block-end: 1px solid var(--m-border, var(--origam-color-border-subtle));
    background: var(--m-surface, var(--origam-color-surface-default));
}

.playground-page__templates-inner {
    display: flex;
    gap: 0.375rem;
    align-items: center;
    overflow-x: auto;
    scrollbar-width: none;
}

.playground-page__templates-inner::-webkit-scrollbar {
    display: none;
}

.playground-page__templates-label {
    font-weight: 600;
    margin-inline-end: 0.5rem;
    text-transform: uppercase;
    letter-spacing: var(--m-uppercase-tracking, 0.08em);
    flex-shrink: 0;
}

.playground-page__templates-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.375rem;
}

.playground-page__templates-item {
    flex-shrink: 0;
}

.playground-page__main {
    padding-block: 1.5rem 5rem;
}

.playground-page__tabs {
    display: flex;
    gap: 0.25rem;
    border-block-end: 1px solid var(--m-border, var(--origam-color-border-subtle));
    margin-block-end: 1rem;
    padding-block-end: 0.5rem;
}

.playground-page__tab:focus-visible {
    outline: 2px solid var(--m-accent, var(--origam-color-action-primary-bg, currentColor));
    outline-offset: -2px;
}

.playground-page__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.125rem;
    min-block-size: 36rem;
}

.playground-page__pane {
    border-radius: var(--m-radius-lg, var(--origam-rounded-lg, 0.75rem));
    overflow: hidden;
    border: 1px solid var(--m-border, var(--origam-color-border-subtle));
    background: var(--m-surface, var(--origam-color-surface-default));
    display: flex;
    flex-direction: column;
    margin: 0;
    min-block-size: 0;
}

.playground-page__pane--hidden {
    display: none;
}

.playground-page__winbar-filename {
    margin-inline-start: 0.5rem;
    color: var(--m-text, var(--origam-color-text-primary));
    font-size: 0.75rem;
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
}

.playground-page__winbar-meta {
    margin-inline-start: auto;
    display: flex;
    gap: 0.625rem;
    color: var(--m-text-dim, var(--origam-color-text-secondary));
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
    font-size: 0.6875rem;
}

.playground-page__winbar-url {
    flex: 1;
    margin-inline-start: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: var(--m-radius-sm, var(--origam-rounded-sm, 0.25rem));
    background: var(--m-bg, var(--origam-color-surface-default));
    border: 1px solid var(--m-border, var(--origam-color-border-subtle));
    font-size: 0.6875rem;
    color: var(--m-text-soft, var(--origam-color-text-secondary));
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
}

.playground-page__live-badge {
    padding: 0.1875rem 0.5rem;
    border-radius: var(--m-radius-sm, var(--origam-rounded-sm, 0.25rem));
    background: color-mix(in srgb, var(--origam-color-feedback-success-bg, #22c55e) 18%, transparent);
    color: var(--origam-color-feedback-success-bg, #22c55e);
    font-size: 0.625rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
}

.playground-page__live-dot {
    inline-size: 0.375rem;
    block-size: 0.375rem;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
}

.playground-page__live-dot--success {
    background: var(--origam-color-feedback-success-bg, #22c55e);
}

.playground-page__editor {
    flex: 1;
    min-block-size: 0;
    overflow: hidden;
}

.playground-page__preview {
    flex: 1;
    min-block-size: 0;
    position: relative;
    display: grid;
    place-items: stretch;
    background: var(--m-bg, var(--origam-color-surface-default));
    overflow: hidden;
}

.playground-page__preview-dotgrid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    color: var(--m-text, var(--origam-color-text-primary));
}

.playground-page__preview > :deep(:not(.playground-page__preview-dotgrid)) {
    position: relative;
    z-index: 1;
}

.playground-page__preview-status {
    padding: 0.5rem 0.875rem;
    border-block-start: 1px solid var(--m-border, var(--origam-color-border-subtle));
    background: var(--m-surface-2, var(--origam-color-surface-overlay, var(--origam-color-surface-default)));
    font-size: 0.6875rem;
    color: var(--m-text-dim, var(--origam-color-text-secondary));
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
    display: flex;
    justify-content: space-between;
}

.playground-page__preview-status-left {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}

.playground-page__panels {
    margin-block-start: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.125rem;
}

.playground-page__console,
.playground-page__tip {
    padding: 0.875rem 1.125rem;
    border-radius: var(--m-radius, var(--origam-rounded-md, 0.5rem));
    border: 1px solid var(--m-border, var(--origam-color-border-subtle));
    background: var(--m-surface, var(--origam-color-surface-default));
}

.playground-page__panel-title {
    margin: 0 0 0.375rem;
    font-size: 0.75rem;
    color: var(--m-text-quiet, var(--origam-color-text-secondary));
    font-weight: 600;
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
}

.playground-page__console-list {
    list-style: none;
    margin: 0;
    padding: 0;
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
    font-size: 0.75rem;
    line-height: 1.6;
}

.playground-page__console-line {
    color: var(--m-text-soft, var(--origam-color-text-secondary));
}

.playground-page__console-line--success {
    color: var(--origam-color-feedback-success-bg, #22c55e);
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}

.playground-page__tip {
    background: var(--m-accent-bg, color-mix(in srgb, var(--origam-color-action-primary-bg, #7c3aed) 10%, transparent));
    border-color: var(--m-accent-border, color-mix(in srgb, var(--origam-color-action-primary-bg, #7c3aed) 30%, transparent));
}

.playground-page__tip-title {
    margin: 0 0 0.375rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--m-accent-soft, var(--origam-color-action-primary-bg, #7c3aed));
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
}

.playground-page__tip-body {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--m-text-soft, var(--origam-color-text-secondary));
    line-height: 1.6;
}

.playground-page__tip-code {
    padding: 0.0625rem 0.3125rem;
    border-radius: 3px;
    background: var(--m-surface-2, var(--origam-color-surface-overlay, var(--origam-color-surface-default)));
    font-family: var(--m-font-mono, var(--origam-font-family-mono, monospace));
    font-size: 0.6875rem;
}

.playground-page__toast {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1.25rem;
    border-radius: var(--origam-rounded-pill, 999px);
    background: var(--origam-color-surface-inverse, #1e1e2e);
    color: var(--origam-color-text-inverse, #fff);
    font-size: 0.875rem;
    font-weight: 500;
    z-index: 1000;
    pointer-events: none;
    box-shadow: var(--origam-shadow-md, 0 4px 16px rgb(0 0 0 / 0.2));
}

@media (max-width: 768px) {
    .playground-page__split {
        grid-template-columns: 1fr;
    }

    .playground-page__pane:not(.playground-page__pane--hidden) {
        display: flex;
    }

    .playground-page__panels {
        grid-template-columns: 1fr;
    }
}
</style>
