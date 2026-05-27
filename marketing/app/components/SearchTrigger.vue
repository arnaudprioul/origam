<script setup lang="ts">
import { useSearchHotkey } from '~/composables/useSearchHotkey'

const { t } = useI18nFallback()
const { open, shortcutLabel } = useSearchHotkey()
</script>

<template>
    <button
        type="button"
        class="search-trigger"
        :aria-label="t('search.openLabel', 'Open search')"
        @click="open"
    >
        <OrigamIcon
            icon="mdi:magnify"
            class="search-trigger__icon"
            aria-hidden="true"
        />
        <span class="search-trigger__label">{{ t('search.placeholder', 'Search…') }}</span>
        <OrigamChip
            size="xs"
            variant="outlined"
            class="search-trigger__shortcut"
        >
            {{ shortcutLabel }}
        </OrigamChip>
    </button>
</template>

<style scoped>
.search-trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    padding: var(--origam-space-2, 0.5rem) var(--origam-space-3, 0.75rem);
    background-color: var(--origam-color-surface-subtle, transparent);
    color: var(--origam-color-text-muted, currentColor);
    border: 1px solid var(--origam-color-border-subtle, transparent);
    border-radius: var(--origam-rounded-lg, 0.75rem);
    font-size: var(--origam-font-size-sm, 0.875rem);
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease;
}

.search-trigger:hover,
.search-trigger:focus-visible {
    background-color: var(--origam-color-surface-default, currentColor);
    border-color: var(--origam-color-border-default, currentColor);
    outline: none;
}

.search-trigger:focus-visible {
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
}

.search-trigger__icon {
    flex-shrink: 0;
    font-size: var(--origam-font-size-base, 1rem);
}

.search-trigger__label {
    min-inline-size: 6rem;
    text-align: start;
}

@container (max-width: 600px) {
    .search-trigger__label,
    .search-trigger__shortcut {
        display: none;
    }
}
</style>
