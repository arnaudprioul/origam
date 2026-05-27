<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TComponentCategory } from '~/types/component-category.type'
import { COMPONENT_CATEGORIES } from '~/consts/component-categories.const'
import { useComponentList } from '~/composables/useComponentList'
import { useDebounce } from '~/composables/useDebounce'

const { t } = useI18nFallback()
const { total, filter } = useComponentList()

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
    )
})

const activeCategory = ref<TComponentCategory | undefined>(undefined)
const rawSearch = ref('')
const debouncedSearch = useDebounce(rawSearch)

const filteredCount = computed(() =>
    filter(activeCategory.value, debouncedSearch.value).length
)

function selectCategory(key: TComponentCategory | undefined) {
    activeCategory.value = key
}

const ALL_LABEL = t('components.index.allCategories', 'All')
</script>

<template>
    <div class="components-page">
        <header class="components-page__header">
            <h1 class="components-page__title">
                {{ t('components.index.heading', 'Components') }}
            </h1>
            <p class="components-page__subtitle">
                {{
                    t(
                        'components.index.subtitle',
                        '~95 components and 29 chart primitives — accessible, typed, token-driven.'
                    )
                }}
            </p>
        </header>

        <div class="components-page__layout">
            <aside class="components-page__sidebar">
                <nav
                    :aria-label="t('components.index.filterNav', 'Filter by category')"
                    class="components-page__nav"
                >
                    <ul role="list" class="components-page__category-list">
                        <li class="components-page__category-item">
                            <button
                                type="button"
                                class="components-page__category-btn"
                                :class="{ 'components-page__category-btn--active': activeCategory === undefined }"
                                :aria-current="activeCategory === undefined ? 'true' : undefined"
                                @click="selectCategory(undefined)"
                            >
                                {{ ALL_LABEL }}
                            </button>
                        </li>
                        <li
                            v-for="cat in COMPONENT_CATEGORIES"
                            :key="cat.key"
                            class="components-page__category-item"
                        >
                            <button
                                type="button"
                                class="components-page__category-btn"
                                :class="{ 'components-page__category-btn--active': activeCategory === cat.key }"
                                :aria-current="activeCategory === cat.key ? 'true' : undefined"
                                @click="selectCategory(cat.key)"
                            >
                                {{ cat.label }}
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            <section
                class="components-page__main"
                :aria-label="t('components.index.mainRegion', 'Components gallery')"
            >
                <div class="components-page__toolbar">
                    <label
                        for="components-search"
                        class="components-page__search-label"
                    >
                        {{ t('components.index.searchLabel', 'Search components') }}
                    </label>
                    <input
                        id="components-search"
                        v-model="rawSearch"
                        type="search"
                        class="components-page__search"
                        :placeholder="t('components.index.searchPlaceholder', 'Search…')"
                        :aria-label="t('components.index.searchLabel', 'Search components')"
                    />
                    <p class="components-page__count" aria-live="polite" role="status">
                        {{
                            t(
                                'components.index.count',
                                `Showing ${filteredCount} of ${total} components`
                            )
                        }}
                    </p>
                </div>

                <ComponentsGrid
                    :category="activeCategory"
                    :search-query="debouncedSearch"
                />
            </section>
        </div>
    </div>
</template>

<style scoped>
.components-page {
    container-type: inline-size;
    max-inline-size: 80rem;
    margin-inline: auto;
    padding: 2rem 1.5rem 4rem;
}

.components-page__header {
    margin-block-end: 2rem;
}

.components-page__title {
    font-size: clamp(1.75rem, 4cqi, 2.5rem);
    font-weight: 700;
    color: var(--origam-color-text-primary);
    margin: 0 0 0.5rem;
    line-height: 1.15;
}

.components-page__subtitle {
    font-size: 1.0625rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
    line-height: 1.6;
}

.components-page__layout {
    display: grid;
    grid-template-areas: "sidebar main";
    grid-template-columns: 14rem 1fr;
    gap: 2rem;
    align-items: start;
}

.components-page__sidebar {
    grid-area: sidebar;
    position: sticky;
    top: 1.5rem;
}

.components-page__main {
    grid-area: main;
    min-inline-size: 0;
}

.components-page__nav {
    background-color: var(--origam-color-surface-default);
    border-radius: var(--origam-rounded-xl, 0.75rem);
    box-shadow: var(--origam-shadow-sm);
    padding: 0.5rem;
}

.components-page__category-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}

.components-page__category-btn {
    display: block;
    inline-size: 100%;
    text-align: start;
    padding: 0.5rem 0.875rem;
    border: none;
    background: transparent;
    border-radius: var(--origam-rounded-lg, 0.5rem);
    font-size: 0.9375rem;
    color: var(--origam-color-text-secondary);
    cursor: pointer;
    transition: background-color 0.15s, color 0.15s;
}

.components-page__category-btn:hover {
    background-color: var(--origam-color-surface-hover);
    color: var(--origam-color-text-primary);
}

.components-page__category-btn:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 1px;
}

.components-page__category-btn--active {
    background-color: color-mix(in srgb, var(--origam-color-primary-500) 12%, transparent);
    color: var(--origam-color-primary-700);
    font-weight: 600;
}

.components-page__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem;
    margin-block-end: 1.5rem;
}

.components-page__search-label {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
}

.components-page__search {
    flex: 1 1 16rem;
    padding: 0.5rem 0.875rem;
    border: 1px solid var(--origam-color-border-default);
    border-radius: var(--origam-rounded-lg, 0.5rem);
    background-color: var(--origam-color-surface-default);
    color: var(--origam-color-text-primary);
    font-size: 0.9375rem;
    transition: border-color 0.15s, box-shadow 0.15s;
}

.components-page__search:focus {
    outline: none;
    border-color: var(--origam-color-primary-500);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--origam-color-primary-500) 20%, transparent);
}

.components-page__count {
    font-size: 0.875rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
    flex-shrink: 0;
}

@container (max-width: 640px) {
    .components-page__layout {
        grid-template-areas:
            "sidebar"
            "main";
        grid-template-columns: 1fr;
    }

    .components-page__sidebar {
        position: static;
    }

    .components-page__nav {
        padding: 0.375rem;
    }

    .components-page__category-list {
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        gap: 0.25rem;
        padding-block: 0.125rem;
        scrollbar-width: none;
    }

    .components-page__category-list::-webkit-scrollbar {
        display: none;
    }

    .components-page__category-item {
        scroll-snap-align: start;
        flex-shrink: 0;
    }

    .components-page__category-btn {
        white-space: nowrap;
        inline-size: auto;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
    }
}
</style>
