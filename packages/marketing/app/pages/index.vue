<script setup lang="ts">
import { useT } from '~/composables/useT'

const { t } = useT()

useSeoMeta({
    title: () => t('home.meta.title', 'origam · Vue 3 design system'),
    description: () => t('home.meta.description', 'Build your entire Vue 3 design system in minutes.'),
    ogTitle: () => t('home.meta.title', 'origam · Vue 3 design system'),
    ogDescription: () => t('home.meta.description', 'Build your entire Vue 3 design system in minutes.')
})
</script>

<template>
    <article class="home">
        <HomeHero
            id="hero"
            data-cy="section-hero"
        />

        <HomeKpis
            id="kpis"
            data-cy="section-kpis"
        />

        <HomeFeatures
            id="features"
            data-cy="section-features"
        />

        <HomePlayground
            id="playground"
            data-cy="section-playground"
        />

        <HomeShowcase
            id="showcase"
            data-cy="section-showcase"
        />

        <HomeThemes
            id="themes"
            data-cy="section-themes"
        />

        <HomeCta
            id="cta"
            data-cy="section-cta"
        />
    </article>
</template>

<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
}
</style>
