<script setup lang="ts">
import { LANDING_FEATURES } from '~/consts/landing-features.const'

const { t } = useI18nFallback()
</script>

<template>
    <section
        class="home-features"
        aria-labelledby="features-title"
    >
        <div class="home-features__inner">
            <header class="home-features__header">
                <div class="home-features__eyebrow">
                    {{ t('home.features.eyebrow', 'Why choose origam') }}
                </div>
                <h2
                    id="features-title"
                    class="home-features__title"
                >
                    {{ t('features.heading', 'Why origam') }}
                </h2>
                <p class="home-features__subtitle">
                    {{ t('features.subtitle', 'Production-ready, accessible, and developer-friendly.') }}
                </p>
            </header>

            <ul
                class="home-features__grid"
                role="list"
            >
                <li
                    v-for="feature in LANDING_FEATURES"
                    :key="feature.id"
                    class="home-features__item"
                >
                    <article
                        class="home-features__card"
                        :class="`home-features__card--${feature.intent}`"
                    >
                        <div
                            class="home-features__icon-wrapper"
                            :class="`home-features__icon-wrapper--${feature.intent}`"
                            aria-hidden="true"
                        >
                            <OrigamIcon :icon="feature.iconName" />
                        </div>
                        <h3 class="home-features__card-title">
                            {{ t(feature.i18nKey, feature.fallback) }}
                        </h3>
                        <p class="home-features__card-desc">
                            {{ t(feature.descKey, feature.descFallback) }}
                        </p>
                    </article>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.home-features {
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    container-type: inline-size;
}

.home-features__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---12, 3rem);
}

.home-features__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
}

.home-features__eyebrow {
    display: inline-block;
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---3, 0.75rem);
    background-color: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 8%, transparent);
    border-radius: var(--origam-radius---full, 9999px);
}

.home-features__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.75rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: -0.025em;
    color: var(--origam-color__text---primary, #171717);
    margin: 0;
}

.home-features__subtitle {
    font-size: var(--origam-font__size---xl, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    margin: 0;
    max-width: 40rem;
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
}

.home-features__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--origam-space---6, 1.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-features__item {
    display: flex;
}

.home-features__card {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---6, 1.5rem);
    border-radius: var(--origam-radius---2xl, 1.5rem);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    background-color: var(--origam-color__surface---raised, #ffffff);
    box-shadow: var(--origam-shadow---md);
    transition: transform 0.2s var(--origam-motion__easing---standard), box-shadow 0.2s var(--origam-motion__easing---standard);
    width: 100%;
}

.home-features__card:hover {
    transform: translateY(-4px);
    box-shadow: var(--origam-shadow---lg);
}

.home-features__icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--origam-radius---xl, 1rem);
    font-size: 1.5rem;
    flex-shrink: 0;
}

.home-features__icon-wrapper--primary {
    background-color: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 12%, transparent);
    color: var(--origam-color__action--primary---bg, #7c3aed);
}

.home-features__icon-wrapper--success {
    background-color: color-mix(in srgb, var(--origam-color__feedback--success---bg, #4caf50) 12%, transparent);
    color: var(--origam-color__feedback--success---bg, #4caf50);
}

.home-features__icon-wrapper--secondary {
    background-color: color-mix(in srgb, var(--origam-color__color__neutral---600, #525252) 12%, transparent);
    color: var(--origam-color__neutral---600, #525252);
}

.home-features__icon-wrapper--info {
    background-color: color-mix(in srgb, var(--origam-color__feedback--info---bg, #2196f3) 12%, transparent);
    color: var(--origam-color__feedback--info---bg, #2196f3);
}

.home-features__icon-wrapper--warning {
    background-color: color-mix(in srgb, var(--origam-color__feedback--warning---bg, #fb8c00) 12%, transparent);
    color: var(--origam-color__feedback--warning---bg, #fb8c00);
}

.home-features__icon-wrapper--danger {
    background-color: color-mix(in srgb, var(--origam-color__feedback--danger---bg, #ef4444) 12%, transparent);
    color: var(--origam-color__feedback--danger---bg, #ef4444);
}

.home-features__card-title {
    font-size: var(--origam-font__size---2xl, 1.25rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #171717);
    margin: 0;
    line-height: var(--origam-font__lineHeight---snug, 1.375);
}

.home-features__card-desc {
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
    margin: 0;
}

@media (prefers-reduced-motion: reduce) {
    .home-features__card {
        transition: none;
    }

    .home-features__card:hover {
        transform: none;
    }
}

@container (max-width: 900px) {
    .home-features__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@container (max-width: 580px) {
    .home-features__grid {
        grid-template-columns: 1fr;
    }
}
</style>
