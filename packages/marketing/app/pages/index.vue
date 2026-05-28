<script setup lang="ts">
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'
import { useSoftwareApplicationLd, useWebsiteLd } from '~/composables/useStructuredData'

const { t } = useI18nFallback()

useSeoMeta({
    title: t('home.meta.title', 'origam · Vue 3 design system'),
    description: t('home.meta.description', MARKETING_DEFAULTS.siteDescription),
    ogTitle: t('home.meta.title', 'origam · Vue 3 design system'),
    ogDescription: t('home.meta.description', MARKETING_DEFAULTS.siteDescription),
    ogImageAlt: t('home.meta.ogImageAlt', 'origam — The Vue 3 design system that just works'),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('home.meta.ogTitle', 'The Vue 3 design system that just works'),
    description: t('home.meta.description', MARKETING_DEFAULTS.siteDescription),
    type: 'home'
})

useSoftwareApplicationLd()
useWebsiteLd()
</script>

<template>
    <article
        class="home-page"
        data-pagefind-filter="type:page"
    >
        <HomeHero />
        <HomeStats />
        <HomeFeatures />
        <HomePlayground />
        <HomeShowcase />
        <HomeThemes />
        <HomeCtaBanner />
    </article>
</template>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
}
</style>
