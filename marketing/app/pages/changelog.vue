<script setup lang="ts">
import { ref, computed } from 'vue'
import { CHANGELOG_TYPES, CHANGELOG_TYPE_LABELS, CHANGELOG_TYPE_COLORS, CHANGELOG_TYPE_ICONS } from '~/consts/changelog.const'
import type { TChangelogType } from '~/types/changelog-type.type'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
import { useI18nFallback } from '~/composables/useI18nFallback'
import { useChangelog } from '~/composables/useChangelog'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'

const { t } = useI18nFallback()

useSeoMeta({
    title: t('changelog.meta.title', 'Changelog · origam'),
    description: t('changelog.meta.description', 'Every release, every change.'),
    ogTitle: t('changelog.meta.title', 'Changelog · origam'),
    ogDescription: t('changelog.meta.description', 'Every release, every change.'),
    ogImageAlt: t('changelog.meta.ogImageAlt', 'origam Changelog'),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('changelog.heading', 'Changelog'),
    description: t('changelog.meta.description', 'Every release, every change.'),
    type: 'page'
})

const { releases, filterByTypes } = useChangelog()

const activeTypes = ref<TChangelogType[]>([])

const filteredReleases = computed(() => filterByTypes(activeTypes.value))

const hasResults = computed(() => filteredReleases.value.length > 0)

const githubHref = computed(() => `https://github.com/${MARKETING_DEFAULTS.githubRepo}/blob/main/CHANGELOG.md`)

function toggleType (type: TChangelogType): void {
    const index = activeTypes.value.indexOf(type)
    if (index === -1) {
        activeTypes.value = [...activeTypes.value, type]
    } else {
        activeTypes.value = activeTypes.value.filter(t => t !== type)
    }
}

function isTypeActive (type: TChangelogType): boolean {
    return activeTypes.value.includes(type)
}
</script>

<template>
    <article
        class="changelog-page"
        data-pagefind-filter="type:page"
    >
        <header class="changelog-page__header">
            <div class="changelog-page__header-inner">
                <h1 class="changelog-page__title">{{ t('changelog.heading', 'Changelog') }}</h1>
                <p class="changelog-page__subtitle">{{ t('changelog.subtitle', 'Every release, every change.') }}</p>
                <a
                    :href="githubHref"
                    class="changelog-page__github-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    :aria-label="t('changelog.viewOnGithubAriaLabel', 'View CHANGELOG.md on GitHub')"
                >
                    <OrigamIcon icon="mdi:github" aria-hidden="true" />
                    {{ t('changelog.viewOnGithub', 'View on GitHub') }}
                </a>
            </div>
        </header>

        <aside class="changelog-page__filters" :aria-label="t('changelog.filtersLabel', 'Filter by change type')">
            <ul role="list" class="changelog-page__filter-list">
                <li
                    v-for="type in CHANGELOG_TYPES"
                    :key="type"
                    class="changelog-page__filter-item"
                >
                    <button
                        type="button"
                        class="changelog-page__chip"
                        :class="{ 'changelog-page__chip--active': isTypeActive(type) }"
                        :data-intent="CHANGELOG_TYPE_COLORS[type]"
                        :aria-pressed="isTypeActive(type)"
                        :aria-label="t(`changelog.filter.${type}`, CHANGELOG_TYPE_LABELS[type])"
                        @click="toggleType(type)"
                    >
                        <OrigamIcon
                            :icon="CHANGELOG_TYPE_ICONS[type]"
                            class="changelog-page__chip-icon"
                            aria-hidden="true"
                        />
                        {{ CHANGELOG_TYPE_LABELS[type] }}
                    </button>
                </li>
            </ul>
        </aside>

        <section class="changelog-page__releases" :aria-label="t('changelog.releasesLabel', 'Releases')">
            <template v-if="hasResults">
                <ChangelogRelease
                    v-for="release in filteredReleases"
                    :key="release.version"
                    :release="release"
                    :active-types="activeTypes"
                />
            </template>

            <p v-else class="changelog-page__empty" role="status">
                {{ t('changelog.empty', 'No changes match the selected filters') }}
            </p>
        </section>
    </article>
</template>

<style scoped>
.changelog-page {
    max-inline-size: 56rem;
    margin-inline: auto;
    padding: 2rem 1.5rem 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.changelog-page__header {
    border-block-end: 1px solid var(--origam-color-border-subtle);
    padding-block-end: 2rem;
}

.changelog-page__header-inner {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.changelog-page__title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    color: var(--origam-color-text-primary);
    margin: 0;
    line-height: 1.15;
    letter-spacing: -0.02em;
}

.changelog-page__subtitle {
    font-size: 1.125rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
    line-height: 1.5;
}

.changelog-page__github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--origam-color-primary-600);
    text-decoration: none;
    align-self: flex-start;
    transition: color 0.15s ease;
}

.changelog-page__github-link:hover {
    color: var(--origam-color-primary-800);
    text-decoration: underline;
}

.changelog-page__github-link:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 2px;
    border-radius: var(--origam-rounded-xs, 2px);
}

.changelog-page__filters {
    position: sticky;
    inset-block-start: 0;
    background-color: var(--origam-color-surface-page);
    padding-block: 0.75rem;
    z-index: 10;
    margin-inline: -1.5rem;
    padding-inline: 1.5rem;
    border-block-end: 1px solid var(--origam-color-border-subtle);
}

.changelog-page__filter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
}

.changelog-page__filter-item {
    display: contents;
}

.changelog-page__chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.875rem;
    border-radius: var(--origam-rounded-full, 9999px);
    font-size: 0.8125rem;
    font-weight: 500;
    border: 1px solid var(--origam-color-border-subtle);
    background-color: var(--origam-color-surface-default);
    color: var(--origam-color-text-secondary);
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    white-space: nowrap;
    -webkit-user-select: none;
    user-select: none;
}

.changelog-page__chip:hover {
    background-color: var(--origam-color-surface-raised);
    color: var(--origam-color-text-primary);
}

.changelog-page__chip:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 2px;
}

.changelog-page__chip--active[data-intent="success"] {
    background-color: color-mix(in srgb, var(--origam-color-success-500) 15%, transparent);
    color: var(--origam-color-success-700);
    border-color: var(--origam-color-success-400);
}

.changelog-page__chip--active[data-intent="info"] {
    background-color: color-mix(in srgb, var(--origam-color-info-500) 15%, transparent);
    color: var(--origam-color-info-700);
    border-color: var(--origam-color-info-400);
}

.changelog-page__chip--active[data-intent="ghost"] {
    background-color: color-mix(in srgb, var(--origam-color-neutral-400) 20%, transparent);
    color: var(--origam-color-neutral-700);
    border-color: var(--origam-color-neutral-400);
}

.changelog-page__chip--active[data-intent="secondary"] {
    background-color: color-mix(in srgb, var(--origam-color-secondary-500) 15%, transparent);
    color: var(--origam-color-secondary-700);
    border-color: var(--origam-color-secondary-400);
}

.changelog-page__chip--active[data-intent="warning"] {
    background-color: color-mix(in srgb, var(--origam-color-warning-500) 15%, transparent);
    color: var(--origam-color-warning-700);
    border-color: var(--origam-color-warning-400);
}

.changelog-page__chip--active[data-intent="danger"] {
    background-color: color-mix(in srgb, var(--origam-color-danger-500) 15%, transparent);
    color: var(--origam-color-danger-700);
    border-color: var(--origam-color-danger-400);
}

.changelog-page__chip-icon {
    flex-shrink: 0;
    inline-size: 1rem;
    block-size: 1rem;
}

.changelog-page__releases {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.changelog-page__empty {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--origam-color-text-secondary);
    font-size: 1rem;
}
</style>
