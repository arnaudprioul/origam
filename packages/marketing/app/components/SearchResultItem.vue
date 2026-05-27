<script setup lang="ts">
import { SEARCH_RESULT_TYPE_ICONS } from '~/consts/search.const'
import type { ISearchResult } from '~/interfaces/search.interface'

const props = defineProps<{
    result: ISearchResult
    isActive: boolean
}>()

const icon = computed(() => SEARCH_RESULT_TYPE_ICONS[props.result.type])
</script>

<template>
    <li
        :id="`search-option-${result.id}`"
        role="option"
        :aria-selected="isActive"
        class="search-result-item"
        :class="{ 'search-result-item--active': isActive }"
    >
        <NuxtLink
            :to="result.url"
            class="search-result-item__link"
            tabindex="-1"
        >
            <OrigamIcon
                :icon="icon"
                class="search-result-item__icon"
                aria-hidden="true"
            />
            <span class="search-result-item__body">
                <span class="search-result-item__title">{{ result.title }}</span>
                <span
                    class="search-result-item__excerpt"
                    v-html="result.excerpt"
                />
            </span>
        </NuxtLink>
    </li>
</template>

<style scoped>
.search-result-item {
    list-style: none;
}

.search-result-item__link {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-3, 0.75rem) var(--origam-space-4, 1rem);
    text-decoration: none;
    color: var(--origam-color-text-default, currentColor);
    border-radius: var(--origam-rounded-md, 0.5rem);
    transition: background-color 0.1s ease;
}

.search-result-item--active .search-result-item__link,
.search-result-item__link:hover {
    background-color: var(--origam-color-surface-subtle, transparent);
}

.search-result-item__icon {
    flex-shrink: 0;
    margin-block-start: 0.125rem;
    color: var(--origam-color-text-muted, currentColor);
    font-size: var(--origam-font-size-lg, 1.125rem);
}

.search-result-item__body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-1, 0.25rem);
    min-inline-size: 0;
}

.search-result-item__title {
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    color: var(--origam-color-text-default, currentColor);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.search-result-item__excerpt {
    font-size: var(--origam-font-size-xs, 0.75rem);
    color: var(--origam-color-text-muted, currentColor);
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.search-result-item__excerpt :deep(mark) {
    background-color: color-mix(in srgb, var(--origam-color-action-primary-bg, currentColor) 20%, transparent);
    color: var(--origam-color-action-primary-bg, currentColor);
    border-radius: var(--origam-rounded-xs, 0.125rem);
    font-weight: var(--origam-font-weight-semibold, 600);
}
</style>
