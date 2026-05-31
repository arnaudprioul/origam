<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import { FEATURES } from '~/consts/features.const'

const { t } = useT()

const features = computed(() => FEATURES)
</script>

<template>
    <section
        class="home-features"
        aria-labelledby="features-title"
    >
        <p class="home-features__eyebrow">
            {{ t('home.features.eyebrow', "WHAT'S INSIDE") }}
        </p>

        <h2
            id="features-title"
            class="home-features__title"
        >
            {{ t('home.features.title', "Everything you'd expect. Nothing you wouldn't.") }}
        </h2>

        <origam-grid
            class="home-features__grid"
            :columns="3"
            gap="lg"
            tag="ul"
        >
            <origam-grid-item
                v-for="feature in features"
                :key="feature.titleKey"
                tag="li"
                class="home-features__item"
            >
                <origam-card
                    class="home-features__card"
                    border
                    rounded
                    flat
                >
                    <div class="home-features__card-body">
                        <h3 class="home-features__card-title">
                            {{ t(feature.titleKey, feature.titleKey) }}
                        </h3>
                        <p class="home-features__card-desc">
                            {{ t(feature.descriptionKey, feature.descriptionKey) }}
                        </p>
                    </div>
                </origam-card>
            </origam-grid-item>
        </origam-grid>
    </section>
</template>

<style scoped>
.home-features {
    padding-block: var(--origam-space---16, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    max-width: var(--origam-layout---max-width, 80rem);
    margin-inline: auto;
}

.home-features__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    letter-spacing: var(--origam-letter-spacing---wide, 0.1em);
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-features__title {
    margin: 0 0 var(--origam-space---10, 3rem);
    font-size: var(--origam-font-size---3xl, 2rem);
    font-weight: var(--origam-font-weight---bold, 700);
    line-height: var(--origam-line-height---tight, 1.25);
    color: var(--origam-color__text---primary, #111827);
}

.home-features__grid {
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-features__item {
    list-style: none;
}

.home-features__card {
    height: 100%;
}

.home-features__card-body {
    padding: var(--origam-space---6, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
}

.home-features__card-title {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    color: var(--origam-color__text---primary, #111827);
}

.home-features__card-desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: var(--origam-line-height---relaxed, 1.625);
    color: var(--origam-color__text---secondary, #6b7280);
}

@media (max-width: 1024px) {
    .home-features__grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

@media (max-width: 640px) {
    .home-features__grid {
        grid-template-columns: 1fr !important;
    }

    .home-features__title {
        font-size: var(--origam-font-size---2xl, 1.5rem);
    }
}
</style>
