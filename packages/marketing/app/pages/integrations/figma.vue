<script setup lang="ts">
import {
    FIGMA_PLUGIN_NAME,
    FIGMA_PLUGIN_VERSION,
    FIGMA_PLUGIN_REPO_PATH,
    FIGMA_FEATURES,
    FIGMA_REQUIREMENTS,
    FIGMA_DOWNLOAD_ASSETS
} from '~/consts/figma.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'
import { useBreadcrumbListLd } from '~/composables/useStructuredData'

const { t } = useI18nFallback()
const route = useRoute()

const sourceUrl = computed(
    () => `https://github.com/${MARKETING_DEFAULTS.githubRepo}/tree/develop${FIGMA_PLUGIN_REPO_PATH}`
)

const releaseUrl = computed(
    () => `https://github.com/${MARKETING_DEFAULTS.githubRepo}/releases`
)

const pageTitle = computed(() => t('figma.meta.title', 'Figma plugin · origam'))
const pageDescription = computed(() =>
    t(
        'figma.meta.description',
        'Origam DS Sync — the official Figma plugin that syncs origam tokens and components into your design files.'
    )
)

useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: pageTitle,
    ogDescription: pageDescription,
    ogImageAlt: computed(() => t('figma.meta.ogAlt', 'Origam DS Sync — Figma plugin')),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('figma.meta.ogTitle', 'Figma plugin'),
    description: pageDescription.value,
    type: 'page'
})

useBreadcrumbListLd([
    { name: t('nav.home', 'Home'), url: '/' },
    { name: t('figma.breadcrumb.integrations', 'Integrations'), url: '/integrations' },
    { name: FIGMA_PLUGIN_NAME, url: route.fullPath }
])
</script>

<template>
    <article
        class="figma-page"
        data-pagefind-filter="type:page"
    >
        <header class="figma-page__header">
            <nav
                class="figma-page__breadcrumb"
                :aria-label="t('figma.breadcrumb.label', 'Breadcrumb')"
            >
                <ol class="figma-page__breadcrumb-list" role="list">
                    <li class="figma-page__breadcrumb-item">
                        <NuxtLink to="/">{{ t('nav.home', 'Home') }}</NuxtLink>
                    </li>
                    <li class="figma-page__breadcrumb-sep" aria-hidden="true">/</li>
                    <li
                        class="figma-page__breadcrumb-item figma-page__breadcrumb-item--current"
                        aria-current="page"
                    >
                        {{ t('figma.breadcrumb.figma', 'Figma plugin') }}
                    </li>
                </ol>
            </nav>

            <p class="figma-page__eyebrow">
                <OrigamChip
                    size="small"
                    variant="outlined"
                    color="info"
                >
                    {{ t('figma.eyebrow', 'Integration') }}
                </OrigamChip>
                <span class="figma-page__version">v{{ FIGMA_PLUGIN_VERSION }}</span>
            </p>

            <h1 class="figma-page__title">
                {{ FIGMA_PLUGIN_NAME }}
            </h1>

            <p class="figma-page__tagline">
                {{ t(
                    'figma.tagline',
                    'Bridge your origam design system and Figma. Sync tokens, generate component sets, export back to the repo — no manual copy-paste.'
                ) }}
            </p>

            <div class="figma-page__ctas">
                <OrigamBtn
                    :href="sourceUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    rounded="full"
                    size="large"
                    prepend-icon="mdi:download"
                >
                    {{ t('figma.cta.download', 'Get the plugin') }}
                </OrigamBtn>
                <OrigamBtn
                    :href="releaseUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    rounded="full"
                    size="large"
                    prepend-icon="mdi:tag-outline"
                >
                    {{ t('figma.cta.releases', 'View releases') }}
                </OrigamBtn>
            </div>
        </header>

        <section
            class="figma-page__features"
            :aria-labelledby="'figma-features-title'"
        >
            <h2
                id="figma-features-title"
                class="figma-page__section-title"
            >
                {{ t('figma.features.title', 'What it does') }}
            </h2>
            <ul
                role="list"
                class="figma-page__feature-list"
            >
                <li
                    v-for="feature in FIGMA_FEATURES"
                    :key="feature.id"
                    class="figma-page__feature-item"
                >
                    <OrigamCard
                        rounded="xl"
                        elevation="2"
                        class="figma-page__feature-card"
                    >
                        <OrigamIcon
                            :icon="feature.icon"
                            class="figma-page__feature-icon"
                            aria-hidden="true"
                        />
                        <h3 class="figma-page__feature-title">
                            {{ t(feature.titleKey, feature.titleFallback) }}
                        </h3>
                        <p class="figma-page__feature-body">
                            {{ t(feature.bodyKey, feature.bodyFallback) }}
                        </p>
                    </OrigamCard>
                </li>
            </ul>
        </section>

        <section
            class="figma-page__requirements"
            :aria-labelledby="'figma-requirements-title'"
        >
            <h2
                id="figma-requirements-title"
                class="figma-page__section-title"
            >
                {{ t('figma.requirements.title', 'Requirements') }}
            </h2>
            <ul
                role="list"
                class="figma-page__requirement-list"
            >
                <li
                    v-for="req in FIGMA_REQUIREMENTS"
                    :key="req.id"
                    class="figma-page__requirement-item"
                >
                    <OrigamIcon
                        icon="mdi:check-circle-outline"
                        class="figma-page__requirement-icon"
                        aria-hidden="true"
                    />
                    <span v-if="req.url">
                        <a
                            :href="req.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="figma-page__requirement-link"
                        >
                            {{ t(req.labelKey, req.labelFallback) }}
                        </a>
                    </span>
                    <span v-else>
                        {{ t(req.labelKey, req.labelFallback) }}
                    </span>
                </li>
            </ul>
        </section>

        <section
            class="figma-page__downloads"
            :aria-labelledby="'figma-downloads-title'"
        >
            <h2
                id="figma-downloads-title"
                class="figma-page__section-title"
            >
                {{ t('figma.downloads.title', 'Get the source') }}
            </h2>
            <p class="figma-page__downloads-note">
                {{ t(
                    'figma.downloads.note',
                    'The plugin lives in the same monorepo as the origam library. Clone, build, and load it as a Figma development plugin.'
                ) }}
            </p>
            <ul
                role="list"
                class="figma-page__download-list"
            >
                <li
                    v-for="asset in FIGMA_DOWNLOAD_ASSETS"
                    :key="asset.id"
                    class="figma-page__download-item"
                >
                    <OrigamBtn
                        :href="asset.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        rounded="lg"
                        :prepend-icon="asset.icon"
                        block
                    >
                        {{ t(asset.labelKey, asset.labelFallback) }}
                    </OrigamBtn>
                </li>
            </ul>
        </section>

        <section
            class="figma-page__install"
            :aria-labelledby="'figma-install-title'"
        >
            <h2
                id="figma-install-title"
                class="figma-page__section-title"
            >
                {{ t('figma.install.title', 'Install in 4 steps') }}
            </h2>
            <ol class="figma-page__install-steps" role="list">
                <li class="figma-page__install-step">
                    <span class="figma-page__install-step-num">1</span>
                    <span class="figma-page__install-step-body">
                        {{ t('figma.install.step1', 'Clone the repo and cd into figma-plugin/') }}
                    </span>
                </li>
                <li class="figma-page__install-step">
                    <span class="figma-page__install-step-num">2</span>
                    <span class="figma-page__install-step-body">
                        {{ t('figma.install.step2', 'Run npm install && npm run build to produce dist/code.js + dist/ui.html') }}
                    </span>
                </li>
                <li class="figma-page__install-step">
                    <span class="figma-page__install-step-num">3</span>
                    <span class="figma-page__install-step-body">
                        {{ t('figma.install.step3', 'Open Figma desktop → Plugins → Development → Import plugin from manifest → pick figma-plugin/manifest.json') }}
                    </span>
                </li>
                <li class="figma-page__install-step">
                    <span class="figma-page__install-step-num">4</span>
                    <span class="figma-page__install-step-body">
                        {{ t('figma.install.step4', 'Run the plugin from any Figma file with Tokens Studio variables loaded') }}
                    </span>
                </li>
            </ol>
        </section>
    </article>
</template>

<style scoped>
.figma-page {
    container-type: inline-size;
    max-inline-size: 64rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block: var(--origam-space-12, 3rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-12, 3rem);
}

.figma-page__header {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-4, 1rem);
}

.figma-page__breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
}

.figma-page__breadcrumb-item a {
    color: inherit;
    text-decoration: none;
}

.figma-page__breadcrumb-item a:hover,
.figma-page__breadcrumb-item a:focus-visible {
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: underline;
}

.figma-page__breadcrumb-item--current {
    color: var(--origam-color-text-default, currentColor);
    font-weight: var(--origam-font-weight-semibold, 600);
}

.figma-page__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space-3, 0.75rem);
    margin: 0;
}

.figma-page__version {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
    font-family: var(--origam-font-family-mono, monospace);
}

.figma-page__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: var(--origam-font-weight-bold, 800);
    margin: 0;
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--origam-color-text-default, currentColor);
}

.figma-page__tagline {
    font-size: var(--origam-font-size-lg, 1.125rem);
    line-height: 1.6;
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
    max-inline-size: 48rem;
}

.figma-page__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-3, 0.75rem);
    margin-block-start: var(--origam-space-2, 0.5rem);
}

.figma-page__section-title {
    font-size: var(--origam-font-size-2xl, 1.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    margin: 0 0 var(--origam-space-6, 1.5rem);
    letter-spacing: -0.01em;
}

.figma-page__feature-list,
.figma-page__requirement-list,
.figma-page__download-list,
.figma-page__install-steps {
    list-style: none;
    margin: 0;
    padding: 0;
}

.figma-page__feature-list {
    display: grid;
    gap: var(--origam-space-4, 1rem);
    grid-template-columns: 1fr;
}

@container (min-width: 600px) {
    .figma-page__feature-list {
        grid-template-columns: 1fr 1fr;
    }
}

.figma-page__feature-card {
    padding: var(--origam-space-6, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-2, 0.5rem);
    block-size: 100%;
}

.figma-page__feature-icon {
    font-size: var(--origam-font-size-2xl, 1.5rem);
    color: var(--origam-color-action-primary-bg, currentColor);
}

.figma-page__feature-title {
    font-size: var(--origam-font-size-lg, 1.125rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    margin: 0;
}

.figma-page__feature-body {
    font-size: var(--origam-font-size-sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.figma-page__requirement-list {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
}

.figma-page__requirement-item {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space-2, 0.5rem);
    font-size: var(--origam-font-size-base, 1rem);
}

.figma-page__requirement-icon {
    flex-shrink: 0;
    margin-block-start: 0.125rem;
    color: var(--origam-color-feedback-success-bg, currentColor);
}

.figma-page__requirement-link {
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: underline;
    text-underline-offset: 0.2em;
}

.figma-page__downloads-note {
    color: var(--origam-color-text-muted, currentColor);
    font-size: var(--origam-font-size-sm, 0.875rem);
    margin: 0 0 var(--origam-space-4, 1rem);
}

.figma-page__download-list {
    display: grid;
    gap: var(--origam-space-3, 0.75rem);
    grid-template-columns: 1fr;
}

@container (min-width: 600px) {
    .figma-page__download-list {
        grid-template-columns: 1fr 1fr 1fr;
    }
}

.figma-page__install-steps {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-4, 1rem);
    counter-reset: install-step;
}

.figma-page__install-step {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space-4, 1rem);
}

.figma-page__install-step-num {
    flex-shrink: 0;
    inline-size: 2rem;
    block-size: 2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--origam-color-action-primary-bg, currentColor);
    color: var(--origam-color-action-primary-fg, currentColor);
    border-radius: 50%;
    font-weight: var(--origam-font-weight-bold, 700);
    font-size: var(--origam-font-size-sm, 0.875rem);
}

.figma-page__install-step-body {
    line-height: 1.6;
    padding-block-start: 0.25rem;
}
</style>
