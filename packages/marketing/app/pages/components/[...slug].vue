<script setup lang="ts">
import { computed, ref } from 'vue'
import { COMPONENT_LIST } from '~/consts/component-list.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'
import { useComponentDoc } from '~/composables/useComponentDoc'
import { useBreadcrumbListLd } from '~/composables/useStructuredData'

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

const { doc, pending } = useComponentDoc(componentSlug.value)

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

const componentDescription = computed(() =>
    doc.value?.description ??
    componentMeta.value?.description ??
    t('components.detail.seoDescriptionFallback', `${componentName.value} component — origam Vue 3 design system.`)
)

useSeoMeta({
    title: computed(() =>
        t('components.detail.seoTitle', `${componentName.value} · origam`)
    ),
    description: componentDescription,
    ogTitle: computed(() =>
        t('components.detail.seoTitle', `${componentName.value} · origam`)
    ),
    ogDescription: componentDescription,
    ogImageAlt: computed(() => componentName.value),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: componentName.value,
    description: componentDescription.value,
    type: 'component'
})

useBreadcrumbListLd([
    { name: t('nav.home', 'Home'), url: '/' },
    { name: t('nav.components', 'Components'), url: '/components' },
    { name: componentName.value, url: route.fullPath }
])
</script>

<template>
    <div
        v-if="!pending && !doc && !componentMeta"
        class="component-detail component-detail--not-found"
    >
        <p class="component-detail__not-found-msg">
            {{ t('components.detail.notFound', 'Component not found.') }}
        </p>
        <NuxtLink
            to="/components"
            class="component-detail__back-link"
        >
            {{ t('components.detail.backToComponents', 'Back to components') }}
        </NuxtLink>
    </div>

    <article
        v-else
        class="component-detail"
        data-pagefind-filter="type:component"
    >
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

            <p
                v-if="doc?.description ?? componentMeta?.description"
                class="component-detail__description"
            >
                {{ doc?.description ?? componentMeta?.description }}
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
                                :id="`tab-${tab}`"
                                type="button"
                                role="tab"
                                :aria-selected="activeTab === tab"
                                :aria-controls="`tabpanel-${tab}`"
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
                    id="tabpanel-overview"
                    role="tabpanel"
                    aria-labelledby="tab-overview"
                    :hidden="activeTab !== 'overview'"
                    class="component-detail__tabpanel"
                >
                    <p
                        v-if="doc?.description ?? componentMeta?.description"
                        class="component-detail__overview-desc"
                    >
                        {{ doc?.description ?? componentMeta?.description }}
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

                <div
                    id="tabpanel-props"
                    role="tabpanel"
                    aria-labelledby="tab-props"
                    :hidden="activeTab !== 'props'"
                    class="component-detail__tabpanel component-detail__tabpanel--table"
                >
                    <ComponentPropsTable
                        v-if="doc"
                        :props="doc.props"
                    />
                    <p
                        v-else
                        class="component-detail__loading"
                    >
                        {{ pending ? t('common.loading', 'Loading…') : t('components.detail.noData', 'No data available.') }}
                    </p>
                </div>

                <div
                    id="tabpanel-slots"
                    role="tabpanel"
                    aria-labelledby="tab-slots"
                    :hidden="activeTab !== 'slots'"
                    class="component-detail__tabpanel component-detail__tabpanel--table"
                >
                    <ComponentSlotsTable
                        v-if="doc"
                        :slots="doc.slots"
                    />
                    <p
                        v-else
                        class="component-detail__loading"
                    >
                        {{ pending ? t('common.loading', 'Loading…') : t('components.detail.noData', 'No data available.') }}
                    </p>
                </div>

                <div
                    id="tabpanel-emits"
                    role="tabpanel"
                    aria-labelledby="tab-emits"
                    :hidden="activeTab !== 'emits'"
                    class="component-detail__tabpanel component-detail__tabpanel--table"
                >
                    <ComponentEmitsTable
                        v-if="doc"
                        :emits="doc.emits"
                    />
                    <p
                        v-else
                        class="component-detail__loading"
                    >
                        {{ pending ? t('common.loading', 'Loading…') : t('components.detail.noData', 'No data available.') }}
                    </p>
                </div>

                <div
                    id="tabpanel-examples"
                    role="tabpanel"
                    aria-labelledby="tab-examples"
                    :hidden="activeTab !== 'examples'"
                    class="component-detail__tabpanel"
                >
                    <ComponentExamples
                        v-if="doc"
                        :doc="doc"
                    />
                    <p
                        v-else
                        class="component-detail__loading"
                    >
                        {{ pending ? t('common.loading', 'Loading…') : t('components.detail.noData', 'No data available.') }}
                    </p>
                </div>
            </aside>
        </div>
    </article>
</template>

<style scoped>
.component-detail {
    container-type: inline-size;
    max-inline-size: 88rem;
    margin-inline: auto;
    padding: 1.5rem 1.5rem 4rem;
}

.component-detail--not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-block: 4rem;
    text-align: center;
}

.component-detail__not-found-msg {
    font-size: 1rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
}

.component-detail__back-link {
    font-size: 0.875rem;
    color: var(--origam-color-primary-600);
    text-decoration: underline;
    text-underline-offset: 2px;
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: stretch;
}

.component-detail__story {
    border-radius: var(--m-radius-lg, var(--origam-rounded-xl, 0.75rem));
    overflow: hidden;
    border: 1px solid var(--m-border, var(--origam-color-border-subtle, rgba(255, 255, 255, 0.08)));
    background-color: var(--m-surface, var(--origam-color-surface-default, #0e0e0e));
    min-block-size: 28rem;
}

.component-detail__iframe {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    min-block-size: 28rem;
    border: none;
}

.component-detail__doc {
    background-color: var(--m-surface, var(--origam-color-surface-default, #0e0e0e));
    border: 1px solid var(--m-border, var(--origam-color-border-subtle, rgba(255, 255, 255, 0.08)));
    border-radius: var(--m-radius-lg, var(--origam-rounded-xl, 0.75rem));
    padding: 1.5rem;
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

.component-detail__tabpanel--table {
    padding: 0;
    overflow-x: auto;
}

.component-detail__overview-desc {
    font-size: 0.9375rem;
    color: var(--origam-color-text-secondary);
    margin: 0 0 1rem;
    line-height: 1.6;
}

.component-detail__loading {
    font-size: 0.875rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
    padding: 1rem;
}

</style>
