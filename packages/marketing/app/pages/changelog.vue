<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import {
    CHANGELOG_VERSIONS,
    CHANGELOG_TYPE_COLOR,
    CHANGELOG_HIGHLIGHT_COLOR,
    CHANGELOG_HIGHLIGHT_ICON
} from '~/consts/changelog.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useT()

useSeoMeta({
    title: () => t('changelog.meta.title', 'Changelog · origam design system'),
    description: () => t('changelog.meta.description', 'Every release of the origam design system, curated and accessible in one place.'),
    ogTitle: () => t('changelog.meta.title', 'Changelog · origam design system'),
    ogDescription: () => t('changelog.meta.description', 'Every release of the origam design system, curated and accessible in one place.')
})

const versions = computed(() => CHANGELOG_VERSIONS)
const fullChangelogHref = computed(() => `${MARKETING_DEFAULTS.githubRepo}/blob/main/CHANGELOG.md`)

function versionSlug (version: string): string {
    return version.replaceAll('.', '-')
}

function typeColor (type: string): string {
    return CHANGELOG_TYPE_COLOR[type as keyof typeof CHANGELOG_TYPE_COLOR] ?? 'neutral'
}

function highlightColor (type: string): string {
    return CHANGELOG_HIGHLIGHT_COLOR[type as keyof typeof CHANGELOG_HIGHLIGHT_COLOR] ?? 'neutral'
}

function highlightIcon (type: string): string {
    return CHANGELOG_HIGHLIGHT_ICON[type as keyof typeof CHANGELOG_HIGHLIGHT_ICON] ?? 'mdi-information-outline'
}

function typeLabel (type: string): string {
    const key = `changelog.type.${type}`
    const fallbacks: Record<string, string> = {
        unreleased: 'Next',
        major: 'Major',
        minor: 'Minor',
        patch: 'Patch'
    }
    return t(key, fallbacks[type] ?? type)
}

function highlightTypeLabel (type: string): string {
    const key = `changelog.highlight.${type}`
    const fallbacks: Record<string, string> = {
        added: 'Added',
        changed: 'Changed',
        fixed: 'Fixed',
        deprecated: 'Deprecated'
    }
    return t(key, fallbacks[type] ?? type)
}

const initialOpen = computed(() => {
    const firstIndex = versions.value.findIndex(v => v.type !== 'unreleased' && v.type !== 'patch')
    return firstIndex >= 0 ? firstIndex : 0
})
</script>

<template>
    <article
        class="changelog"
        data-cy="page-changelog"
    >
        <section
            class="changelog-hero"
            aria-labelledby="changelog-title"
        >
            <origam-container class="changelog-hero__inner">
                <origam-chip
                    class="changelog-hero__badge"
                    color="primary"
                    border
                    border-color="var(--origam-color__action--primary---bg)"
                    size="small"
                    pill
                    data-cy="changelog-hero-badge"
                >
                    {{ t('changelog.hero.badge', 'Changelog') }}
                </origam-chip>

                <origam-title
                    id="changelog-title"
                    tag="h1"
                    class="changelog-hero__title"
                >
                    <span class="changelog-hero__title-line">{{ t('changelog.hero.titleLine1', 'Changelog.') }}</span>
                    <span class="changelog-hero__title-line changelog-hero__title-line--accent">{{ t('changelog.hero.titleLine2', 'Every release.') }}</span>
                </origam-title>

                <p class="changelog-hero__subtitle">
                    {{ t('changelog.hero.subtitle', 'A curated overview of what shipped in each version of origam. Dates are release dates; the full diff lives on GitHub.') }}
                </p>

                <nav
                    class="changelog-hero__actions"
                    :aria-label="t('changelog.hero.actionsLabel', 'Changelog links')"
                >
                    <origam-btn
                        class="changelog-hero__cta"
                        variant="text"
                        prepend-icon="mdi-file-document-outline"
                        :href="fullChangelogHref"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cy="changelog-full-link"
                    >
                        {{ t('changelog.hero.fullChangelog', 'Full changelog on GitHub') }}
                    </origam-btn>
                </nav>
            </origam-container>
        </section>

        <section
            class="changelog-list"
            aria-labelledby="changelog-versions-title"
            data-cy="changelog-versions"
        >
            <origam-container>
                <header class="changelog-list__header">
                    <p class="changelog-section__eyebrow">
                        {{ t('changelog.list.eyebrow', 'RELEASE HISTORY') }}
                    </p>

                    <origam-title
                        id="changelog-versions-title"
                        tag="h2"
                        class="changelog-section__title"
                    >
                        <span class="changelog-section__title-line">{{ t('changelog.list.titleLine1', 'All versions.') }}</span>
                        <span class="changelog-section__title-line changelog-section__title-line--muted">{{ t('changelog.list.titleLine2', 'Curated.') }}</span>
                    </origam-title>

                    <p class="changelog-section__subtitle">
                        {{ t('changelog.list.subtitle', '3 to 6 highlights per release. The most recent versions are expanded by default.') }}
                    </p>
                </header>

                <origam-expansion-panels
                    class="changelog-panels"
                    accordion
                    rounded="lg"
                    data-cy="changelog-expansion-panels"
                    :model-value="initialOpen"
                >
                    <origam-expansion-panel
                        v-for="version in versions"
                        :key="version.version"
                        eager
                        class="changelog-panel"
                        :class="`changelog-panel--${version.type}`"
                        :data-cy="`changelog-panel-${versionSlug(version.version)}`"
                    >
                        <origam-expansion-panel-header class="changelog-panel__header">
                            <template #prepend>
                                <div class="changelog-panel__meta">
                                    <origam-chip
                                        :color="typeColor(version.type)"
                                        size="small"
                                        pill
                                        class="changelog-panel__version-chip"
                                        :aria-label="`${t('changelog.aria.version', 'Version')} ${version.version}`"
                                    >
                                        {{ version.type === 'unreleased' ? t('changelog.type.unreleased', 'Next') : version.version }}
                                    </origam-chip>

                                    <origam-chip
                                        :color="typeColor(version.type)"
                                        variant="text"
                                        size="x-small"
                                        pill
                                        class="changelog-panel__type-chip"
                                    >
                                        {{ typeLabel(version.type) }}
                                    </origam-chip>
                                </div>
                            </template>

                            <template #append>
                                <p
                                    v-if="version.date"
                                    class="changelog-panel__date"
                                >
                                    <time :datetime="version.date">{{ version.date }}</time>
                                </p>
                                <p
                                    v-else
                                    class="changelog-panel__date changelog-panel__date--unreleased"
                                >
                                    {{ t('changelog.unreleased.label', 'Not yet released') }}
                                </p>
                            </template>
                        </origam-expansion-panel-header>

                        <origam-expansion-panel-content>
                            <div class="changelog-panel__body">
                                <p class="changelog-panel__summary">
                                    {{ t(version.summaryKey, version.summaryKey) }}
                                </p>

                                <origam-grid
                                    tag="ul"
                                    columns="1"
                                    gap="0.5rem"
                                    class="changelog-panel__highlights"
                                    :aria-label="t('changelog.aria.highlights', 'Release highlights')"
                                >
                                    <origam-grid-item
                                        v-for="highlight in version.highlights"
                                        :key="highlight.textKey"
                                        tag="li"
                                        class="changelog-panel__highlight"
                                    >
                                        <origam-chip
                                            :color="highlightColor(highlight.type)"
                                            size="x-small"
                                            pill
                                            class="changelog-panel__highlight-badge"
                                            :prepend-icon="highlightIcon(highlight.type)"
                                        >
                                            {{ highlightTypeLabel(highlight.type) }}
                                        </origam-chip>

                                        <span class="changelog-panel__highlight-text">
                                            {{ t(highlight.textKey, highlight.textKey) }}
                                        </span>
                                    </origam-grid-item>
                                </origam-grid>

                                <nav
                                    class="changelog-panel__footer"
                                    :aria-label="t('changelog.aria.versionLinks', 'Version links')"
                                >
                                    <origam-btn
                                        variant="text"
                                        size="small"
                                        prepend-icon="mdi-open-in-new"
                                        :href="fullChangelogHref"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="changelog-panel__full-link"
                                    >
                                        {{ t('changelog.panel.fullLink', 'Full changelog on GitHub') }}
                                    </origam-btn>
                                </nav>
                            </div>
                        </origam-expansion-panel-content>
                    </origam-expansion-panel>
                </origam-expansion-panels>
            </origam-container>
        </section>

        <section
            class="changelog-cta"
            aria-labelledby="changelog-cta-title"
            data-cy="changelog-cta"
        >
            <div class="changelog-cta__inner">
                <origam-title
                    id="changelog-cta-title"
                    tag="h2"
                    class="changelog-cta__title"
                >
                    {{ t('changelog.cta.title', 'Stay in the loop.') }}
                </origam-title>

                <p class="changelog-cta__desc">
                    {{ t('changelog.cta.description', 'Watch the repository on GitHub to be notified of every new release.') }}
                </p>

                <nav
                    class="changelog-cta__actions"
                    :aria-label="t('changelog.cta.actionsLabel', 'Follow origam')"
                >
                    <origam-btn
                        class="changelog-cta__btn changelog-cta__btn--primary"
                        variant="text"
                        prepend-icon="mdi-github"
                        :href="MARKETING_DEFAULTS.githubRepo"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cy="changelog-cta-github"
                    >
                        {{ t('changelog.cta.ctaGithub', 'Star on GitHub') }}
                    </origam-btn>

                    <origam-btn
                        class="changelog-cta__btn changelog-cta__btn--secondary"
                        variant="text"
                        prepend-icon="mdi-file-document-outline"
                        :href="fullChangelogHref"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cy="changelog-cta-fulllog"
                    >
                        {{ t('changelog.cta.ctaFulllog', 'Read full CHANGELOG') }}
                    </origam-btn>
                </nav>
            </div>
        </section>
    </article>
</template>

<style scoped>
.changelog {
    display: flex;
    flex-direction: column;
}

/* ── Section shared tokens ───────────────────────────────────────────────── */

.changelog-section__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.changelog-section__title {
    margin: 0 0 var(--origam-space---2, 0.5rem);
    display: flex;
    flex-direction: column;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.05;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.changelog-section__title-line--muted {
    color: var(--origam-color__text---secondary, #525252);
}

.changelog-section__subtitle {
    margin: var(--origam-space---4, 1rem) 0 0;
    max-inline-size: 42rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
}

/* ── Hero ────────────────────────────────────────────────────────────────── */

.changelog-hero {
    position: relative;
    padding-block: var(--origam-space---20, 5rem) var(--origam-space---16, 4rem);
    overflow: hidden;
}

.changelog-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--origam-gradient---hero-grid);
    background-size: 64px 64px;
    background-position: center top;
    -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 80%);
    mask-image: linear-gradient(to bottom, #000 0%, transparent 80%);
    pointer-events: none;
    z-index: 0;
}

.changelog-hero::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 260px;
    background-image: var(--origam-gradient---hero-glow);
    pointer-events: none;
    z-index: 0;
}

.changelog-hero__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    text-align: center;
}

.changelog-hero__badge {
    --origam-chip---background-color: transparent;
}

.changelog-hero__title {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--origam-font-size---hero, 5.25rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    line-height: var(--origam-line-height---hero, 0.95);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    padding-block-end: 0.1em;
    color: var(--origam-color__text---ink, #0a0a0a);
}

.changelog-hero__title-line {
    display: block;
}

.changelog-hero__title-line--accent {
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

.changelog-hero__subtitle {
    margin: 0;
    max-inline-size: 40rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: var(--origam-line-height---relaxed, 1.7);
    color: var(--origam-color__text---secondary, #525252);
}

.changelog-hero__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
}

.changelog-hero__cta {
    --origam-btn---height: 44px;
    --origam-btn---border-radius: var(--origam-radius---btn, 10px);
}

/* ── Panels list ─────────────────────────────────────────────────────────── */

.changelog-list {
    padding-block: var(--origam-space---24, 6rem);
    background: var(--origam-color__surface---sunken, #f5f5f5);
    border-block: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.changelog-list__header {
    margin-block-end: var(--origam-space---10, 2.5rem);
}

.changelog-panels {
    max-inline-size: 56rem;
    --origam-expansion-panel---border-radius: var(--origam-radius---lg, 12px);
}

/* Panel header meta (chips + date) */

.changelog-panel__header {
    min-block-size: 64px;
}

.changelog-panel__meta {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    flex-wrap: wrap;
}

.changelog-panel__version-chip {
    font-family: var(--origam-font-family---mono, monospace);
    font-weight: var(--origam-font__weight---semibold, 600);
}

.changelog-panel__type-chip {
    font-size: var(--origam-font-size---xs, 0.75rem);
}

.changelog-panel__date {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    font-family: var(--origam-font-family---mono, monospace);
    margin-inline-start: auto;
}

.changelog-panel__date--unreleased {
    font-style: italic;
}

/* Panel body */

.changelog-panel__body {
    padding: var(--origam-space---5, 1.25rem) var(--origam-space---6, 1.5rem) var(--origam-space---6, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---5, 1.25rem);
}

.changelog-panel__summary {
    margin: 0;
    font-size: var(--origam-font-size---base, 1rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
    font-style: italic;
    padding-inline-start: var(--origam-space---4, 1rem);
    border-inline-start: 3px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.12));
}

.changelog-panel__highlights {
    list-style: none;
    padding: 0;
    margin: 0;
}

.changelog-panel__highlight {
    list-style: none;
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space---3, 0.75rem);
}

.changelog-panel__highlight-badge {
    flex-shrink: 0;
    margin-block-start: 2px;
}

.changelog-panel__highlight-text {
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.changelog-panel__footer {
    display: flex;
    align-items: center;
    padding-block-start: var(--origam-space---3, 0.75rem);
    border-block-start: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.changelog-panel__full-link {
    font-size: var(--origam-font-size---sm, 0.875rem);
}

/* ── CTA ─────────────────────────────────────────────────────────────────── */

.changelog-cta {
    position: relative;
    padding-block: var(--origam-space---30, 7.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    overflow: hidden;
}

.changelog-cta::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 280px;
    background-image: var(--origam-gradient---cta-glow-top);
    pointer-events: none;
    z-index: 0;
}

.changelog-cta__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    max-inline-size: 48rem;
    margin-inline: auto;
    text-align: center;
}

.changelog-cta__title {
    margin: 0;
    font-size: var(--origam-font-size---cta, 4rem) !important;
    font-weight: var(--origam-font-weight---extrabold, 800);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    line-height: var(--origam-line-height---hero, 0.95);
    color: var(--origam-color__text---ink, #0a0a0a);
}

.changelog-cta__desc {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    max-inline-size: 36rem;
}

.changelog-cta__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
    margin-block-start: var(--origam-space---2, 0.5rem);
}

.changelog-cta__btn {
    --origam-btn---height: 52px;
    --origam-btn---density: 0px;
    --origam-btn---density-padding-x: var(--origam-space---6, 1.5rem);
    --origam-btn---font-size: 1rem;
    --origam-btn---font-weight: 400;
    --origam-btn---border-radius: var(--origam-radius---btn, 10px);
}

.changelog-cta__btn--primary {
    background-image: var(--origam-gradient---btn-primary);
    background-color: var(--origam-color---btn-primary-bg, transparent);
    box-shadow: var(--origam-shadow---btn-primary);
    --origam-btn---color: var(--origam-color---btn-primary-text);
}

.changelog-cta__btn--secondary {
    background-image: var(--origam-gradient---btn-secondary);
    background-color: var(--origam-color---btn-secondary-bg);
    box-shadow: var(--origam-shadow---btn-secondary);
    border: 1px solid var(--origam-color---btn-secondary-border);
    --origam-btn---color: var(--origam-color---btn-secondary-text);
    --origam-btn---density-padding-x: var(--origam-space---4, 1rem);
}

/* ── Responsive ──────────────────────────────────────────────────────────── */

@media (max-width: 1080px) {
    .changelog-hero__title {
        font-size: clamp(2.5rem, 9vw, 5.25rem);
    }
}

@media (max-width: 768px) {
    .changelog-section__title {
        font-size: clamp(1.75rem, 7vw, 3rem);
    }

    .changelog-cta__title {
        font-size: clamp(2rem, 8vw, 4rem) !important;
    }

    .changelog-panel__date {
        margin-inline-start: 0;
    }
}
</style>
