<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useSearchHotkey } from '~/composables/useSearchHotkey'
import { usePagefindSearch } from '~/composables/usePagefindSearch'
import { SEARCH_MIN_QUERY_LENGTH } from '~/consts/search.const'
import type { ISearchResult } from '~/interfaces/search.interface'

const { t } = useI18nFallback()
const { isOpen, close, shortcutLabel } = useSearchHotkey()
const { query, results, pending, hasError, isReady, init } = usePagefindSearch()
const { track } = useAnalytics()

const inputRef = ref<HTMLInputElement | null>(null)
const activeIndex = ref(0)

const flatResults = computed<ISearchResult[]>(() =>
    results.value.flatMap((group) => group.results)
)

const totalResults = computed(() => flatResults.value.length)
const hasMinQuery = computed(() => query.value.length >= SEARCH_MIN_QUERY_LENGTH)
const activeResult = computed(() => flatResults.value[activeIndex.value] ?? null)
const activeOptionId = computed(() =>
    activeResult.value ? `search-option-${activeResult.value.id}` : undefined
)

const showEmpty = computed(() => !hasMinQuery.value && !hasError.value)
const showNoResults = computed(
    () => hasMinQuery.value && !pending.value && !hasError.value && totalResults.value === 0
)

watch(isOpen, async (open) => {
    if (!open) return
    track('search:open')
    if (!isReady.value && !hasError.value) {
        await init()
    }
    await nextTick()
    inputRef.value?.focus()
    activeIndex.value = 0
})

watch(results, () => {
    activeIndex.value = 0
})

onMounted(async () => {
    if (isOpen.value) {
        await init()
    }
})

function moveDown (): void {
    if (totalResults.value === 0) return
    activeIndex.value = (activeIndex.value + 1) % totalResults.value
}

function moveUp (): void {
    if (totalResults.value === 0) return
    activeIndex.value = (activeIndex.value - 1 + totalResults.value) % totalResults.value
}

async function activateResult (): Promise<void> {
    const target = activeResult.value
    if (!target) return
    track('search:select', { url: target.url })
    close()
    await navigateTo(target.url)
}

function handleKeydown (event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveDown()
    } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveUp()
    } else if (event.key === 'Enter') {
        event.preventDefault()
        activateResult()
    }
}
</script>

<template>
    <OrigamDialog
        v-model="isOpen"
        max-width="640"
        rounded="lg"
        :scrim="true"
        :aria-label="t('search.dialogLabel', 'Site search')"
        @keydown="handleKeydown"
    >
        <template #default>
            <article
                class="search-overlay__panel"
                role="combobox"
                aria-haspopup="listbox"
                :aria-expanded="hasMinQuery"
                :aria-controls="hasMinQuery ? 'search-results' : undefined"
            >
                <header class="search-overlay__header">
                    <OrigamTextField
                        ref="inputRef"
                        v-model="query"
                        type="search"
                        variant="outlined"
                        prepend-inner-icon="mdi:magnify"
                        :placeholder="t('search.placeholder', 'Search components, posts, docs…')"
                        :aria-label="t('search.inputLabel', 'Search')"
                        :aria-activedescendant="activeOptionId"
                        aria-autocomplete="list"
                        autocomplete="off"
                        spellcheck="false"
                        class="search-overlay__search-field"
                        @keydown="handleKeydown"
                    />
                    <OrigamChip
                        size="x-small"
                        variant="outlined"
                        class="search-overlay__shortcut"
                    >
                        {{ t('search.escape', 'Esc') }}
                    </OrigamChip>
                </header>

                <section
                    v-if="hasError"
                    class="search-overlay__state search-overlay__state--error"
                    role="status"
                >
                    <OrigamIcon
                        icon="mdi:cloud-off-outline"
                        class="search-overlay__state-icon"
                        aria-hidden="true"
                    />
                    <p>{{ t('search.errorDev', 'Search index not available. Run `npm run build` first.') }}</p>
                </section>

                <section
                    v-else-if="showEmpty"
                    class="search-overlay__state"
                    role="status"
                >
                    <p>{{ t('search.empty', 'Try searching for a component, blog post, or doc page.') }}</p>
                </section>

                <section
                    v-else-if="pending"
                    class="search-overlay__state"
                    role="status"
                    aria-busy="true"
                >
                    <p>{{ t('search.loading', 'Searching…') }}</p>
                </section>

                <section
                    v-else-if="showNoResults"
                    class="search-overlay__state"
                    role="status"
                >
                    <p>{{ t('search.noResults', 'No results for') }} "{{ query }}".</p>
                </section>

                <section
                    v-else
                    id="search-results"
                    class="search-overlay__results"
                >
                    <article
                        v-for="group in results"
                        :key="group.type"
                        class="search-overlay__group"
                    >
                        <h2 class="search-overlay__group-title">{{ group.label }}</h2>
                        <ul
                            role="listbox"
                            class="search-overlay__list"
                            :aria-label="group.label"
                        >
                            <SearchResultItem
                                v-for="result in group.results"
                                :key="result.id"
                                :result="result"
                                :is-active="flatResults.indexOf(result) === activeIndex"
                                @click="activateResult"
                                @mouseenter="activeIndex = flatResults.indexOf(result)"
                            />
                        </ul>
                    </article>
                </section>

                <footer class="search-overlay__footer">
                    <span class="search-overlay__hint">
                        <OrigamChip size="x-small" variant="outlined">↑↓</OrigamChip>
                        {{ t('search.navigate', 'navigate') }}
                    </span>
                    <span class="search-overlay__hint">
                        <OrigamChip size="x-small" variant="outlined">↵</OrigamChip>
                        {{ t('search.select', 'select') }}
                    </span>
                    <span class="search-overlay__hint">
                        <OrigamChip size="x-small" variant="outlined">{{ shortcutLabel }}</OrigamChip>
                        {{ t('search.toggle', 'toggle') }}
                    </span>
                </footer>
            </article>
        </template>
    </OrigamDialog>
</template>

<style scoped>
.search-overlay__panel {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: var(--m-surface-2, var(--origam-color__surface---overlay, #1A1A1A));
    border: 1px solid var(--m-border-strong, rgba(255, 255, 255, 0.16));
    border-radius: var(--m-radius-lg, var(--origam-radius---xl, 14px));
    box-shadow: 0 32px 80px -16px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05);
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    inline-size: 100%;
    max-block-size: 70vh;
}

.search-overlay__header {
    display: flex;
    align-items: center;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-4, 1rem) var(--origam-space-5, 1.25rem);
    border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
}

.search-overlay__search-field {
    flex: 1;
    min-inline-size: 0;
}

.search-overlay__shortcut {
    flex-shrink: 0;
}

.search-overlay__state {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-8, 2rem);
    color: var(--origam-color-text-muted, currentColor);
    text-align: center;
}

.search-overlay__state-icon {
    font-size: var(--origam-font-size-2xl, 1.5rem);
    color: var(--origam-color-text-muted, currentColor);
}

.search-overlay__state--error {
    color: var(--origam-color-feedback-danger-text, currentColor);
}

.search-overlay__results {
    flex: 1;
    overflow-y: auto;
    padding: var(--origam-space-2, 0.5rem);
}

.search-overlay__group {
    margin-block-end: var(--origam-space-4, 1rem);
}

.search-overlay__group:last-child {
    margin-block-end: 0;
}

.search-overlay__group-title {
    margin: 0;
    padding: var(--origam-space-2, 0.5rem) var(--origam-space-4, 1rem);
    font-size: var(--origam-font-size-xs, 0.75rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--origam-color-text-muted, currentColor);
}

.search-overlay__list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.search-overlay__footer {
    display: flex;
    gap: var(--origam-space-4, 1rem);
    padding: var(--origam-space-3, 0.75rem) var(--origam-space-5, 1.25rem);
    border-block-start: 1px solid var(--origam-color-border-subtle, transparent);
    font-size: var(--origam-font-size-xs, 0.75rem);
    color: var(--origam-color-text-muted, currentColor);
}

.search-overlay__hint {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
}

@media (prefers-reduced-motion: reduce) {
    .search-overlay__panel {
        animation: none;
    }
}
</style>
