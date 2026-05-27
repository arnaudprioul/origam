<script setup lang="ts">
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()

useSeoMeta({
    title: t('home.meta.title', 'origam · Vue 3 design system'),
    description: t('home.meta.description', MARKETING_DEFAULTS.siteDescription),
    ogTitle: t('home.meta.title', 'origam · Vue 3 design system'),
    ogDescription: t('home.meta.description', MARKETING_DEFAULTS.siteDescription)
})
</script>

<template>
    <article class="home-page">
        <HomeHero />
        <HomeFeatures />
        <HomeShowcase />
        <HomeCodeDemo />
        <HomeCtaBanner />
    </article>
</template>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
}
</style>
