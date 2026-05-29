<script setup lang="ts">
import { ABOUT_STATS, ABOUT_PRINCIPLES, ABOUT_STACK, ABOUT_LINKS, ABOUT_GITHUB_BASE, ABOUT_CONTACT_EMAIL } from '~/consts/about.const'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'

const { t } = useI18nFallback()

useSeoMeta({
    title: t('about.meta.title', 'About · origam'),
    description: t('about.meta.description', 'Why we built origam, what\'s inside, who\'s behind it.'),
    ogTitle: t('about.meta.title', 'About · origam'),
    ogDescription: t('about.meta.description', 'Why we built origam, what\'s inside, who\'s behind it.'),
    ogImageAlt: t('about.meta.ogImageAlt', 'About origam'),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('about.meta.ogTitle', 'About origam'),
    description: t('about.meta.description', 'Why we built origam, what\'s inside, who\'s behind it.'),
    type: 'page'
})

const { data: page } = await useAsyncData('about-page', () =>
    queryCollection('pages').path('/pages/about').first()
)

const lastUpdatedDisplay = computed(() => {
    if (!page.value?.lastUpdated) return ''
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(
        new Date(page.value.lastUpdated)
    )
})

const githubHref = ABOUT_GITHUB_BASE
const contactHref = `mailto:${ABOUT_CONTACT_EMAIL}`
</script>

<template>
    <article
        class="about-page"
        data-pagefind-filter="type:page"
    >
        <header class="about-page__header">
            <h1 class="about-page__title">
                {{ t('about.hero.title', 'About origam') }}
            </h1>
            <p class="about-page__subtitle">
                {{ t('about.hero.subtitle', 'Why we built it, what\'s inside, and who\'s behind it.') }}
            </p>
        </header>

        <AboutStats :stats="ABOUT_STATS" />

        <AboutPrinciples :principles="ABOUT_PRINCIPLES" />

        <AboutStack :stack="ABOUT_STACK" />

        <section
            v-if="page"
            class="about-page__content"
            aria-label="t('about.content.regionLabel', 'Full story')"
        >
            <ContentRenderer :value="page" class="about-page__prose" />
        </section>

        <footer class="about-page__footer">
            <section
                class="about-page__get-involved"
                aria-labelledby="get-involved-heading"
            >
                <h2
                    id="get-involved-heading"
                    class="about-page__section-title"
                >
                    {{ t('about.getInvolved.title', 'Get involved') }}
                </h2>
                <ul
                    role="list"
                    class="about-page__links"
                >
                    <li
                        v-for="link in ABOUT_LINKS"
                        :key="link.url"
                        class="about-page__link-item"
                    >
                        <OrigamBtn
                            :href="link.url"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            rounded="full"
                            :prepend-icon="link.icon"
                            :aria-label="`${link.label} (${t('about.externalLink', 'opens in new tab')})`"
                        >
                            {{ link.label }}
                        </OrigamBtn>
                    </li>
                </ul>
            </section>

            <section
                class="about-page__contact"
                aria-labelledby="contact-heading"
            >
                <h2
                    id="contact-heading"
                    class="about-page__section-title"
                >
                    {{ t('about.contact.title', 'Contact') }}
                </h2>
                <p class="about-page__contact-body">
                    {{ t('about.contact.body', 'For anything that doesn\'t fit a GitHub issue:') }}
                    <a
                        :href="contactHref"
                        class="about-page__contact-link"
                    >
                        {{ ABOUT_CONTACT_EMAIL }}
                    </a>.
                    {{ t('about.contact.public', 'For public questions, prefer') }}
                    <a
                        :href="`${githubHref}/discussions`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="about-page__contact-link"
                    >
                        GitHub Discussions
                    </a>
                    {{ t('about.contact.searchable', 'so the answer is searchable.') }}
                </p>

                <OrigamBtn
                    :href="githubHref"
                    target="_blank"
                    rel="noopener noreferrer"
                    color="primary"
                    variant="flat"
                    rounded="full"
                    prepend-icon="mdi:github"
                    size="large"
                    :aria-label="t('about.contact.githubLabel', 'View origam on GitHub (opens in new tab)')"
                >
                    {{ t('about.contact.github', 'View on GitHub') }}
                </OrigamBtn>
            </section>

            <p
                v-if="page?.lastUpdated"
                class="about-page__updated"
            >
                {{ t('about.lastUpdated', 'Last updated') }}
                <time :datetime="page.lastUpdated">{{ lastUpdatedDisplay }}</time>
                &nbsp;·&nbsp;
                <NuxtLink
                    to="/changelog"
                    class="about-page__changelog-link"
                >
                    {{ t('about.changelogLink', 'Changelog') }}
                </NuxtLink>
            </p>
        </footer>
    </article>
</template>

<style scoped>
.about-page {
    max-width: 56rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block-end: var(--origam-space-20, 5rem);
}

.about-page__header {
    padding-block: var(--origam-space-16, 4rem) var(--origam-space-8, 2rem);
    text-align: center;
}

.about-page__title {
    font-size: clamp(2rem, 5vw + 0.5rem, 3.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default);
    line-height: 1.1;
    letter-spacing: -0.03em;
    margin: 0 0 var(--origam-space-4, 1rem);
}

.about-page__subtitle {
    font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
    color: var(--origam-color-text-muted);
    line-height: 1.6;
    margin: 0 auto;
    max-width: 36rem;
}

.about-page__content {
    padding-block: var(--origam-space-12, 3rem);
}

.about-page__prose {
    font-size: var(--origam-font-size-base, 1rem);
    line-height: 1.7;
    color: var(--origam-color-text-secondary);
}

.about-page__footer {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-12, 3rem);
    padding-block-start: var(--origam-space-12, 3rem);
    border-block-start: 1px solid var(--origam-color-border-subtle);
}

.about-page__section-title {
    font-size: clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default);
    margin: 0 0 var(--origam-space-6, 1.5rem);
    line-height: 1.2;
}

.about-page__links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-3, 0.75rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.about-page__link-item {
    display: contents;
}

.about-page__contact-body {
    font-size: var(--origam-font-size-base, 1rem);
    color: var(--origam-color-text-secondary);
    line-height: 1.6;
    margin: 0 0 var(--origam-space-6, 1.5rem);
}

.about-page__contact-link {
    color: var(--origam-color-primary-600);
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.15s ease;
}

.about-page__contact-link:hover {
    text-decoration-color: currentColor;
}

.about-page__contact-link:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 2px;
    border-radius: var(--origam-rounded-sm, 0.125rem);
}

.about-page__updated {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted);
    margin: 0;
}

.about-page__changelog-link {
    color: var(--origam-color-primary-600);
    text-decoration: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.15s ease;
}

.about-page__changelog-link:hover {
    text-decoration-color: currentColor;
}

.about-page__changelog-link:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 2px;
    border-radius: var(--origam-rounded-sm, 0.125rem);
}
</style>
