<script setup lang="ts">
import { useSearchHotkey } from '~/composables/useSearchHotkey'

const { t } = useI18nFallback()
const { open, shortcutLabel } = useSearchHotkey()
</script>

<template>
    <OrigamBtn
        variant="outlined"
        rounded="md"
        size="small"
        prepend-icon="mdi:magnify"
        :aria-label="t('search.openLabel', 'Open search')"
        @click="open"
    >
        <span class="search-trigger__label">{{ t('search.trigger', 'Search…') }}</span>
        <template #append>
            <OrigamChip
                size="x-small"
                variant="outlined"
                class="search-trigger__shortcut"
            >
                {{ shortcutLabel }}
            </OrigamChip>
        </template>
    </OrigamBtn>
</template>

<style scoped>
.search-trigger__label {
    min-inline-size: 0;
    max-inline-size: 8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: start;
}

@container (max-width: 600px) {
    .search-trigger__label,
    .search-trigger__shortcut {
        display: none;
    }
}
</style>
