<script setup lang="ts">
import type { IChangelogEntry } from '~/interfaces/changelog.interface'
import type { TChangelogType } from '~/types/changelog-type.type'
import { useRuntimeConfig } from '#imports'

const props = defineProps<{
    entry: IChangelogEntry
    type: TChangelogType
}>()

const config = useRuntimeConfig()

const prHref = computed<string | null>(() => {
    if (!props.entry.pr) {
        return null
    }
    return `https://github.com/${config.public.githubRepo}/pull/${props.entry.pr}`
})
</script>

<template>
    <li class="changelog-entry">
        <span v-if="entry.scope" class="changelog-entry__scope">{{ entry.scope }}</span>
        <span class="changelog-entry__description">{{ entry.description }}</span>
        <a
            v-if="prHref"
            :href="prHref"
            class="changelog-entry__pr"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Pull request #${entry.pr}`"
        >#{{ entry.pr }}</a>
    </li>
</template>

<style scoped>
.changelog-entry {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.375rem;
    padding-block: 0.375rem;
    font-size: 0.875rem;
    line-height: 1.6;
    color: var(--origam-color-text-primary);
    border-block-end: 1px solid var(--origam-color-border-subtle);
}

.changelog-entry:last-child {
    border-block-end: none;
}

.changelog-entry__scope {
    flex-shrink: 0;
    font-family: var(--origam-font-mono, monospace);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.125rem 0.5rem;
    border-radius: var(--origam-rounded-sm, 4px);
    background-color: var(--origam-color-surface-raised);
    color: var(--origam-color-text-secondary);
    white-space: nowrap;
}

.changelog-entry__description {
    flex: 1;
    min-inline-size: 0;
    color: var(--origam-color-text-primary);
}

.changelog-entry__pr {
    flex-shrink: 0;
    font-size: 0.75rem;
    color: var(--origam-color-primary-600);
    text-decoration: none;
    border-radius: var(--origam-rounded-xs, 2px);
    padding: 0 0.25rem;
    transition: color 0.15s ease;
}

.changelog-entry__pr:hover {
    color: var(--origam-color-primary-800);
    text-decoration: underline;
}

.changelog-entry__pr:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 2px;
}
</style>
