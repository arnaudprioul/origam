<script setup lang="ts">
import { computed } from 'vue'
import { COMPONENT_LIST } from '~/consts/component-list.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
const route = useRoute()

const slugSegments = computed(() =>
    Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]
)

const componentSlug = computed(() => slugSegments.value[slugSegments.value.length - 1] ?? '')

const componentMeta = computed(() =>
    COMPONENT_LIST.find((c) => c.slug === componentSlug.value) ?? null
)

const componentName = computed(() => componentMeta.value?.name ?? componentSlug.value)

const storyName = computed(() => {
    const name = componentName.value.toLowerCase()
    return `stories-components-stories-${name}-origam${name}-story-vue`
})

const storyUrl = computed(
    () => `/stories/story/${storyName.value}?variantId=${storyName.value}-0`
)

const githubSourceUrl = computed(
    () =>
        `https://github.com/${MARKETING_DEFAULTS.githubRepo}/tree/main/src/components/${componentName.value}`
)

const docsUrl = computed(() => `/docs/components/${componentName.value}/`)
const storyIframeTitle = computed(() =>
    t('components.detail.storyTitle', `${componentName.value} story preview`)
)

const TAB_KEYS = ['overview', 'props', 'slots', 'emits', 'examples'] as const
type TDetailTab = (typeof TAB_KEYS)[number]

const TAB_LABELS: Record<TDetailTab, string> = {
    overview: t('components.detail.tabOverview', 'Overview'),
    props:    t('components.detail.tabProps', 'Props'),
    slots:    t('components.detail.tabSlots', 'Slots'),
    emits:    t('components.detail.tabEmits', 'Emits'),
    examples: t('components.detail.tabExamples', 'Examples')
}

const activeTab = ref<TDetailTab>('overview')

function selectTab(tab: TDetailTab) {
    activeTab.value = tab
}

useSeoMeta({
    title: computed(() =>
        t('components.detail.seoTitle', `${componentName.value} · origam`)
    ),
    description: computed(() =>
        componentMeta.value?.description ??
        t('components.detail.seoDescriptionFallback', `${componentName.value} component — origam Vue 3 design system.`)
    ),
    ogTitle: computed(() =>
        t('components.detail.seoTitle', `${componentName.value} · origam`)
    ),
    ogDescription: computed(() =>
        componentMeta.value?.description ??
        t('components.detail.seoDescriptionFallback', `${componentName.value} component — origam Vue 3 design system.`)
    )
})
</script>

<template>
    <div class="component-detail">
        <header class="component-detail__header">
            <nav
                :aria-label="t('components.detail.breadcrumbNav', 'Breadcrumb')"
                class="component-detail__breadcrumb"
            >
                <ol class="component-detail__breadcrumb-list">
                    <li class="component-detail__breadcrumb-item">
                        <NuxtLink to="/">{{ t('nav.home', 'Home') }}</NuxtLink>
                    </li>
                    <li class="component-detail__breadcrumb-sep" aria-hidden="true">/</li>
                    <li class="component-detail__breadcrumb-item">
                        <NuxtLink to="/components">{{ t('nav.components', 'Components') }}</NuxtLink>
                    </li>
                    <li class="component-detail__breadcrumb-sep" aria-hidden="true">/</li>
                    <li
                        class="component-detail__breadcrumb-item component-detail__breadcrumb-item--current"
                        aria-current="page"
                    >
                        {{ componentName }}
                    </li>
                </ol>
            </nav>

            <div class="component-detail__meta">
                <h1 class="component-detail__title">{{ componentName }}</h1>
                <span class="component-detail__version">
                    v{{ MARKETING_DEFAULTS.npmVersion }}
                </span>
            </div>

            <p v-if="componentMeta" class="component-detail__description">
                {{ componentMeta.description }}
            </p>

            <div class="component-detail__links">
                <a
                    :href="githubSourceUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="component-detail__ext-link"
                >
                    {{ t('components.detail.githubSource', 'Source on GitHub') }}
                </a>
                <a
                    :href="storyUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="component-detail__ext-link"
                >
                    {{ t('components.detail.fullStory', 'Open story fullscreen') }}
                </a>
            </div>
        </header>

        <div class="component-detail__layout">
            <section
                class="component-detail__story"
                :aria-label="t('components.detail.storyRegion', 'Live story preview')"
            >
                <iframe
                    :src="storyUrl"
                    :title="storyIframeTitle"
                    class="component-detail__iframe"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                />
            </section>

            <aside class="component-detail__doc">
                <nav
                    :aria-label="t('components.detail.tabNav', 'Component documentation tabs')"
                    class="component-detail__tabs"
                >
                    <ul role="tablist" class="component-detail__tab-list">
                        <li
                            v-for="tab in TAB_KEYS"
                            :key="tab"
                            role="presentation"
                        >
                            <button
                                type="button"
                                role="tab"
                                :aria-selected="activeTab === tab"
                                :aria-controls="`tabpanel-${tab}`"
                                :id="`tab-${tab}`"
                                class="component-detail__tab-btn"
                                :class="{ 'component-detail__tab-btn--active': activeTab === tab }"
                                @click="selectTab(tab)"
                            >
                                {{ TAB_LABELS[tab] }}
                            </button>
                        </li>
                    </ul>
                </nav>

                <div
                    v-for="tab in TAB_KEYS"
                    :key="tab"
                    :id="`tabpanel-${tab}`"
                    role="tabpanel"
                    :aria-labelledby="`tab-${tab}`"
                    :hidden="activeTab !== tab"
                    class="component-detail__tabpanel"
                >
                    <div class="component-detail__coming-soon">
                        <p class="component-detail__coming-soon-text">
                            {{ t('components.detail.comingSoon', 'Coming soon') }}
                        </p>
                        <a
                            :href="docsUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="component-detail__ext-link"
                        >
                            {{ t('components.detail.viewInDocs', 'View in docs') }}
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<style scoped>
.component-detail {
    container-type: inline-size;
    max-inline-size: 88rem;
    margin-inline: auto;
    padding: 1.5rem 1.5rem 4rem;
}

.component-detail__header {
    margin-block-end: 2rem;
}

.component-detail__breadcrumb {
    margin-block-end: 1rem;
}

.component-detail__breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
    color: var(--origam-color-text-secondary);
}

.component-detail__breadcrumb-item a {
    color: var(--origam-color-primary-600);
    text-decoration: none;
}

.component-detail__breadcrumb-item a:hover {
    text-decoration: underline;
}

.component-detail__breadcrumb-item--current {
    color: var(--origam-color-text-primary);
    font-weight: 500;
}

.component-detail__breadcrumb-sep {
    color: var(--origam-color-text-tertiary);
    user-select: none;
}

.component-detail__meta {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-block-end: 0.5rem;
}

.component-detail__title {
    font-size: clamp(1.5rem, 3cqi, 2rem);
    font-weight: 700;
    color: var(--origam-color-text-primary);
    margin: 0;
    line-height: 1.2;
}

.component-detail__version {
    font-size: 0.8125rem;
    font-weight: 500;
    padding: 0.125rem 0.5rem;
    border-radius: var(--origam-rounded-full, 9999px);
    background-color: color-mix(in srgb, var(--origam-color-primary-500) 12%, transparent);
    color: var(--origam-color-primary-700);
}

.component-detail__description {
    font-size: 1rem;
    color: var(--origam-color-text-secondary);
    margin: 0 0 1rem;
    line-height: 1.6;
    max-inline-size: 60ch;
}

.component-detail__links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.component-detail__ext-link {
    font-size: 0.875rem;
    color: var(--origam-color-primary-600);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.component-detail__ext-link:hover {
    color: var(--origam-color-primary-800);
}

.component-detail__layout {
    display: grid;
    grid-template-areas: "story doc";
    grid-template-columns: 1fr 22rem;
    gap: 2rem;
    align-items: start;
}

.component-detail__story {
    grid-area: story;
    border-radius: var(--origam-rounded-xl, 0.75rem);
    overflow: hidden;
    border: 1px solid var(--origam-color-border-subtle);
    background-color: var(--origam-color-surface-default);
    min-block-size: 32rem;
}

.component-detail__iframe {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    min-block-size: 32rem;
    border: none;
}

.component-detail__doc {
    grid-area: doc;
    position: sticky;
    top: 1.5rem;
}

.component-detail__tabs {
    margin-block-end: 0;
}

.component-detail__tab-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    border-block-end: 2px solid var(--origam-color-border-subtle);
    overflow-x: auto;
    scrollbar-width: none;
    gap: 0;
}

.component-detail__tab-list::-webkit-scrollbar {
    display: none;
}

.component-detail__tab-btn {
    display: block;
    padding: 0.625rem 0.875rem;
    border: none;
    background: transparent;
    font-size: 0.875rem;
    color: var(--origam-color-text-secondary);
    cursor: pointer;
    white-space: nowrap;
    border-block-end: 2px solid transparent;
    margin-block-end: -2px;
    transition: color 0.15s, border-color 0.15s;
}

.component-detail__tab-btn:hover {
    color: var(--origam-color-text-primary);
}

.component-detail__tab-btn:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: -2px;
}

.component-detail__tab-btn--active {
    color: var(--origam-color-primary-600);
    font-weight: 600;
    border-block-end-color: var(--origam-color-primary-600);
}

.component-detail__tabpanel {
    padding: 1.5rem;
    background-color: var(--origam-color-surface-default);
    border: 1px solid var(--origam-color-border-subtle);
    border-block-start: none;
    border-radius: 0 0 var(--origam-rounded-lg, 0.5rem) var(--origam-rounded-lg, 0.5rem);
}

.component-detail__coming-soon {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 2rem 1rem;
    text-align: center;
}

.component-detail__coming-soon-text {
    font-size: 0.9375rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
}

@container (max-width: 820px) {
    .component-detail__layout {
        grid-template-areas:
            "story"
            "doc";
        grid-template-columns: 1fr;
    }

    .component-detail__doc {
        position: static;
    }
}
</style>
