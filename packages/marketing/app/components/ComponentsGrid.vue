<script setup lang="ts">
import type { TComponentCategory } from '~/types/component-category.type'
import { useComponentList } from '~/composables/useComponentList'

const props = defineProps<{
    category?: TComponentCategory
    searchQuery?: string
}>()

const { t } = useI18nFallback()
const { filter } = useComponentList()

const filteredComponents = computed(() =>
    filter(props.category, props.searchQuery)
)
</script>

<template>
    <section
        class="components-grid"
        :aria-label="t('components.grid.region', 'Components list')"
    >
        <ul
            v-if="filteredComponents.length > 0"
            class="components-grid__list"
            role="list"
        >
            <li
                v-for="component in filteredComponents"
                :key="component.slug"
                class="components-grid__item"
            >
                <ComponentCard :component="component" />
            </li>
        </ul>

        <div
            v-else
            class="components-grid__empty"
            role="status"
            :aria-live="'polite'"
        >
            <p>{{ t('components.grid.empty', 'No components match this filter.') }}</p>
        </div>
    </section>
</template>

<style scoped>
.components-grid {
    container-type: inline-size;
}

.components-grid__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.components-grid__item {
    display: flex;
    flex-direction: column;
}

.components-grid__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    text-align: center;
    color: var(--origam-color-text-secondary);
    font-size: 1rem;
}
</style>
