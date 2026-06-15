<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import {
    FEATURES,
    FEATURES_GRID_COLUMNS,
    FEATURE_CARD_VARS,
    FEATURE_ICON_TILE_RADIUS,
    FEATURE_ICON_TILE_VARS
} from '~/consts/features.const'

const { t } = useT()

const features = computed(() => FEATURES)
</script>

<template>
    <section
        class="home-features"
        aria-labelledby="features-title"
    >
        <header class="home-features__header">
            <p class="home-features__eyebrow">
                {{ t('home.features.eyebrow', "WHAT'S INSIDE") }}
            </p>

            <origam-title
                id="features-title"
                tag="h2"
                class="home-features__title"
            >
                <span class="home-features__title-line">{{ t('home.features.title_line1', `Everything you'd expect.`) }}</span>
                <span class="home-features__title-line home-features__title-line--muted">{{ t('home.features.title_line2', `Nothing you wouldn't.`) }}</span>
            </origam-title>

            <p class="home-features__subtitle">
                {{ t('home.features.subtitle', 'A complete toolkit for shipping Vue 3 apps — from atomic primitives to complex data viz, every piece tested, themed and a11y-compliant.') }}
            </p>
        </header>

        <origam-grid
            tag="ul"
            :columns="FEATURES_GRID_COLUMNS"
            gap="0"
            class="home-features__grid"
        >
            <origam-grid-item
                v-for="feature in features"
                :key="feature.titleKey"
                tag="li"
                class="home-features__item"
            >
                <origam-card
                    tag="article"
                    flat
                    :style="FEATURE_CARD_VARS"
                    class="home-features__card"
                >
                    <origam-avatar
                        :icon="feature.icon"
                        color="primary"
                        :rounded="FEATURE_ICON_TILE_RADIUS"
                        :style="FEATURE_ICON_TILE_VARS"
                        border
                        border-color="var(--origam-color__action--primary---bg)"
                        size="44"
                        class="home-features__icon-tile"
                        aria-hidden="true"
                    />

                    <origam-title
                        tag="h3"
                        class="home-features__card-title"
                    >
                        {{ t(feature.titleKey, feature.titleKey) }}
                    </origam-title>

                    <p class="home-features__card-desc">
                        {{ t(feature.descriptionKey, feature.descriptionKey) }}
                    </p>
                </origam-card>
            </origam-grid-item>
        </origam-grid>
    </section>
</template>

<style scoped>
.home-features {
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    max-width: 83rem;
    margin-inline: auto;
}

.home-features__header {
    margin-block-end: var(--origam-space---10, 2.5rem);
}

/* DS gap: no DS prop sets text-transform / wide tracking on a bare <p>.
   Colour is the sobre action-primary fgSubtle token (purple), zero CSS. */
.home-features__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);

    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* DS gap: section display size/tracking exceed OrigamTitle's token scale
   (max 3xl). Consumes the marketing display tokens, like the Hero H1. */
.home-features__title {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.05;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-features__title-line--muted {
    color: var(--origam-color__text---secondary, #525252);
}

.home-features__subtitle {
    margin: var(--origam-space---5, 1.25rem) 0 0;
    max-inline-size: 34rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
}

/* DS gap: no DS prop frames an OrigamGrid as a bordered/rounded card with
   internal dividers (the maquette "flat table" look). border + radius come
   from sobre tokens; overflow clips the edge cells' borders to the radius. */
.home-features__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---lg, 14px);
    overflow: hidden;
}

.home-features__item {
    list-style: none;
    display: flex;
    border-inline-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.home-features__card {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
}

.home-features__icon-tile {
    --origam-avatar---background-color: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.1));
    --origam-avatar---border-color: var(--origam-color__action--primary---bg, #7c3aed);
    --origam-avatar---icon-color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    margin-block-end: var(--origam-space---3, 0.75rem);
}

/* DS gap: maquette card-title is 17px, between DS base (16px) and lg (18px).
   No exact DS scalar token — literal dimension. */
.home-features__card-title {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-features__card-desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
}

@media (max-width: 640px) {
    .home-features {
        padding-inline: var(--origam-space---6, 1.5rem);
    }

    .home-features__title {
        font-size: clamp(1.75rem, 8vw, 3rem);
    }
}
</style>
