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
                    <OrigamCard
                        elevation="3"
                        rounded="2xl"
                        class="home-features__card"
                    >
                        <OrigamCardText class="home-features__card-body">
                            <span
                                class="home-features__icon-wrapper"
                                :class="`home-features__icon-wrapper--${feature.intent}`"
                                aria-hidden="true"
                            >
                                <OrigamIcon :icon="feature.iconName" />
                            </span>
                            <h3 class="home-features__card-title">
                                {{ t(feature.i18nKey, feature.fallback) }}
                            </h3>
                            <p class="home-features__card-desc">
                                {{ t(feature.descKey, feature.descFallback) }}
                            </p>
                        </OrigamCardText>
                    </OrigamCard>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.home-features {
    padding-block: var(--origam-space-20, 5rem);
    padding-inline: var(--origam-space-6, 1.5rem);
    background-color: var(--origam-color-surface-subtle, transparent);
    container-type: inline-size;
}

.home-features__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-12, 3rem);
}

.home-features__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
}

.home-features__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    letter-spacing: -0.02em;
    color: var(--origam-color-text-default, currentColor);
    margin: 0;
}

.home-features__subtitle {
    font-size: var(--origam-font-size-lg, 1.125rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.home-features__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--origam-space-6, 1.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-features__card {
    height: 100%;
}

.home-features__card-body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-6, 1.5rem);
}

.home-features__icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: var(--origam-rounded-lg, 0.75rem);
    font-size: 1.25rem;
}

.home-features__icon-wrapper--primary {
    background-color: color-mix(in srgb, var(--origam-color-action-primary-bg, #000) 15%, transparent);
    color: var(--origam-color-action-primary-bg, currentColor);
}

.home-features__icon-wrapper--success {
    background-color: color-mix(in srgb, var(--origam-color-action-success-bg, #22c55e) 15%, transparent);
    color: var(--origam-color-action-success-bg, currentColor);
}

.home-features__icon-wrapper--secondary {
    background-color: color-mix(in srgb, var(--origam-color-action-secondary-bg, #a855f7) 15%, transparent);
    color: var(--origam-color-action-secondary-bg, currentColor);
}

.home-features__icon-wrapper--info {
    background-color: color-mix(in srgb, var(--origam-color-action-info-bg, #3b82f6) 15%, transparent);
    color: var(--origam-color-action-info-bg, currentColor);
}

.home-features__icon-wrapper--warning {
    background-color: color-mix(in srgb, var(--origam-color-action-warning-bg, #f59e0b) 15%, transparent);
    color: var(--origam-color-action-warning-bg, currentColor);
}

.home-features__icon-wrapper--danger {
    background-color: color-mix(in srgb, var(--origam-color-action-danger-bg, #ef4444) 15%, transparent);
    color: var(--origam-color-action-danger-bg, currentColor);
}

.home-features__card-title {
    font-size: var(--origam-font-size-base, 1rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default, currentColor);
    margin: 0;
}

.home-features__card-desc {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
    line-height: 1.6;
    margin: 0;
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
