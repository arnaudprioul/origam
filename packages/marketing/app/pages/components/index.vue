<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TComponentCategory } from '~/types/component-category.type'
import { COMPONENT_CATEGORIES } from '~/consts/component-categories.const'
import { useComponentList } from '~/composables/useComponentList'
import { useDebounce } from '~/composables/useDebounce'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'

const { t } = useI18nFallback()
const { total, byCategory, filter } = useComponentList()

useSeoMeta({
    title: t('components.index.seoTitle', 'Components · origam'),
    description: t(
        'components.index.seoDescription',
        '~95 components, 29 charts, filter by category.'
    ),
    ogTitle: t('components.index.seoTitle', 'Components · origam'),
    ogDescription: t(
        'components.index.seoDescription',
        '~95 components, 29 charts, filter by category.'
    ),
    ogImageAlt: t('components.index.meta.ogImageAlt', 'origam Components'),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('components.index.heading', 'Components'),
    description: t('components.index.seoDescription', '~95 components, 29 charts, filter by category.'),
    type: 'component'
})

const activeCategory = ref<TComponentCategory | undefined>(undefined)
const rawSearch = ref('')
const debouncedSearch = useDebounce(rawSearch)

const filteredCount = computed(() =>
    filter(activeCategory.value, debouncedSearch.value).length
)

const categoryCounts = computed(() => {
    const map: Record<string, number> = {}
    for (const cat of COMPONENT_CATEGORIES) {
        map[cat.key] = byCategory.value[cat.key]?.length ?? 0
    }
    return map
})

const CATEGORY_ICON_MAP: Record<string, string> = {
    layout: 'mdi:view-grid-outline',
    navigation: 'mdi:compass-outline',
    forms: 'mdi:form-textbox',
    data: 'mdi:chart-line',
    feedback: 'mdi:bell-outline',
    overlay: 'mdi:layers-outline',
    media: 'mdi:image-outline',
    utilities: 'mdi:tools'
}

const STATUS_FILTERS = [
    { id: 'stable', label: 'Stable', count: 82, color: 'success' },
    { id: 'beta', label: 'Beta', count: 8, color: 'warning' },
    { id: 'experimental', label: 'Experimental', count: 5, color: 'primary' }
] as const

function selectCategory (key: TComponentCategory | undefined): void {
    activeCategory.value = key
}

const ALL_LABEL = computed(() => t('components.index.allCategories', 'All'))

const countLabel = computed(() =>
    t(
        'components.index.count',
        'Showing {filteredCount} of {total} components',
        { filteredCount: filteredCount.value, total: total.value }
    )
)
</script>

<template>
    <article class="components-page" data-pagefind-filter="type:page">
        <header class="m-section m-section--tight components-page__header">
            <div class="m-container components-page__header-inner">
                <div>
                    <span class="m-section-pre">{{ t('components.index.eyebrow', 'BROWSE') }}</span>
                    <h1
                        id="components-heading"
                        class="m-h1-display components-page__title"
                    >
                        {{ t('components.index.heading', 'Components') }}
                    </h1>
                    <p class="m-body components-page__subtitle">
                        {{
                            t(
                                'components.index.subtitle',
                                '~95 components and 29 chart primitives — accessible, typed, token-driven.'
                            )
                        }}
                    </p>
                </div>

                <div class="components-page__toolbar">
                    <OrigamTextField
                        v-model="rawSearch"
                        type="search"
                        variant="outlined"
                        density="compact"
                        rounded="md"
                        hide-details
                        prepend-inner-icon="mdi:magnify"
                        :placeholder="t('components.index.searchPlaceholder', 'Search components…')"
                        :aria-label="t('components.index.searchLabel', 'Search components')"
                        class="components-page__search"
                    />
                </div>
            </div>
        </header>

        <section class="m-section components-page__main" aria-labelledby="components-heading">
            <div class="m-container components-page__layout">
                <aside class="components-page__sidebar">
                    <nav :aria-label="t('components.index.filterNav', 'Filter by category')">
                        <h2 class="m-mono-tag components-page__sidebar-title">
                            {{ t('components.index.categoriesTitle', 'Categories') }}
                        </h2>
                        <ul role="list" class="components-page__category-list">
                            <li class="components-page__category-item">
                                <OrigamBtn
                                    :variant="activeCategory === undefined ? 'tonal' : 'text'"
                                    :color="activeCategory === undefined ? 'primary' : undefined"
                                    rounded="md"
                                    size="sm"
                                    block
                                    prepend-icon="mdi:apps"
                                    :aria-current="activeCategory === undefined ? 'true' : undefined"
                                    @click="selectCategory(undefined)"
                                >
                                    <span class="components-page__category-text">
                                        {{ ALL_LABEL }}
                                    </span>
                                    <template #append>
                                        <span class="components-page__category-count">{{ total }}</span>
                                    </template>
                                </OrigamBtn>
                            </li>
                            <li
                                v-for="cat in COMPONENT_CATEGORIES"
                                :key="cat.key"
                                class="components-page__category-item"
                            >
                                <OrigamBtn
                                    :variant="activeCategory === cat.key ? 'tonal' : 'text'"
                                    :color="activeCategory === cat.key ? 'primary' : undefined"
                                    rounded="md"
                                    size="sm"
                                    block
                                    :prepend-icon="CATEGORY_ICON_MAP[cat.key] || 'mdi:apps'"
                                    :aria-current="activeCategory === cat.key ? 'true' : undefined"
                                    @click="selectCategory(cat.key)"
                                >
                                    <span class="components-page__category-text">
                                        {{ t(`components.index.categories.${cat.key}`, cat.label) }}
                                    </span>
                                    <template #append>
                                        <span class="components-page__category-count">{{ categoryCounts[cat.key] }}</span>
                                    </template>
                                </OrigamBtn>
                            </li>
                        </ul>

                        <h2 class="m-mono-tag components-page__sidebar-title components-page__sidebar-title--spaced">
                            {{ t('components.index.statusTitle', 'Status') }}
                        </h2>
                        <ul role="list" class="components-page__status-list">
                            <li
                                v-for="status in STATUS_FILTERS"
                                :key="status.id"
                                class="components-page__status-item"
                            >
                                <OrigamChip
                                    :color="status.color"
                                    variant="tonal"
                                    size="sm"
                                    rounded="md"
                                    prepend-icon="mdi:circle-medium"
                                >
                                    {{ t(`components.index.status.${status.id}`, status.label) }}
                                    <template #append>
                                        <span class="components-page__status-count">{{ status.count }}</span>
                                    </template>
                                </OrigamChip>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <section
                    class="components-page__results"
                    :aria-label="t('components.index.mainRegion', 'Components gallery')"
                >
                    <div class="components-page__results-toolbar">
                        <p class="components-page__count" aria-live="polite" role="status">
                            {{ countLabel }}
                        </p>
                        <OrigamChip
                            color="neutral"
                            variant="outlined"
                            size="sm"
                            rounded="md"
                            append-icon="mdi:chevron-down"
                        >
                            {{ t('components.index.sort', 'Sort: A → Z') }}
                        </OrigamChip>
                    </div>

                    <ComponentsGrid
                        :category="activeCategory"
                        :search-query="debouncedSearch"
                        data-pagefind-ignore
                    />
                </section>
            </div>
        </section>
    </article>
</template>

<style scoped>
.components-page {
    --side-w: 240px;
    background: var(--m-bg, var(--origam-color__surface---default, #0a0a0a));
    color: var(--m-text, var(--origam-color__text---primary, #fafafa));
}

.components-page__header {
    border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
}

.components-page__header-inner {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--origam-space---6, 1.5rem);
    flex-wrap: wrap;
}

.components-page__title {
    margin-block: 0.375rem 0.875rem;
    line-height: 1;
}

.components-page__subtitle {
    margin: 0;
    max-inline-size: 36rem;
}

.components-page__toolbar {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;
}

.components-page__search {
    min-inline-size: 18rem;
}

.components-page__main {
    padding-block: 2.5rem 5rem;
}

.components-page__layout {
    display: grid;
    grid-template-columns: var(--side-w) 1fr;
    gap: 3rem;
    align-items: flex-start;
}

.components-page__sidebar {
    position: sticky;
    top: 1.5rem;
}

.components-page__sidebar-title {
    margin: 0 0 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: var(--m-uppercase-tracking, 0.08em);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #a3a3a3));
}

.components-page__sidebar-title--spaced {
    margin-block-start: 1.5rem;
}

.components-page__category-list,
.components-page__status-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.components-page__category-text {
    flex: 1;
    text-align: start;
}

.components-page__category-count,
.components-page__status-count {
    font-size: 0.6875rem;
    color: var(--m-text-quiet, var(--origam-color__text---placeholder, #737373));
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
    margin-inline-start: 0.5rem;
}

.components-page__status-item {
    display: flex;
}

.components-page__results {
    min-inline-size: 0;
}

.components-page__results-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block-end: 1.125rem;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.components-page__count {
    margin: 0;
    font-size: 0.8125rem;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #a3a3a3));
}

.components-page__count :deep(strong) {
    color: var(--m-text, var(--origam-color__text---primary, #fafafa));
}

@media (max-width: 768px) {
    .components-page__layout {
        grid-template-columns: 1fr;
    }

    .components-page__sidebar {
        position: static;
    }

    .components-page__category-list {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 0.25rem;
        scrollbar-width: none;
    }

    .components-page__category-list::-webkit-scrollbar {
        display: none;
    }

    .components-page__category-item {
        scroll-snap-align: start;
        flex-shrink: 0;
        inline-size: auto;
    }

    .components-page__sidebar-title,
    .components-page__status-list {
        display: none;
    }
}
</style>
