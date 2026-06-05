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
            gap="0"
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
                    flat
                >
                    <div class="home-features__card-body">
                        <span
                            class="home-features__icon-wrap"
                            aria-hidden="true"
                        >
                            <origam-icon
                                :icon="feature.icon"
                                class="home-features__icon"
                            />
                        </span>

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
/* ── Section wrapper ──────────────────────────────────────────────────────── */
.home-features {
    /* 96px padding-block : token ---24 absent, fallback 6rem */
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---14, 3.5rem);
    max-width: var(--origam-layout---max-width, 80rem);
    margin-inline: auto;
}

/* ── Eyebrow ──────────────────────────────────────────────────────────────── */
/* Maquette : #6D28D9 = --origam-color__action--primary---fgSubtle
   font-size 12px, font-weight 600, letter-spacing 0.96px (0.08em), uppercase */
.home-features__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

/* ── H2 section title ─────────────────────────────────────────────────────── */
/* Maquette : 48px = --origam-font-size---section (3rem), weight 700,
   tracking -1.44px (-0.03em), line-height 1.0, margin-bottom 16px */
.home-features__title {
    margin: 0 0 var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1;
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ── Grid — cartes jointives (gap 0) ──────────────────────────────────────── */
/* OrigamGrid injecte --origam-grid---gap via style inline → on surcharge avec
   gap: 0 directement (spécificité inline style != propriété directe CSS) */
.home-features__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 0 !important;
}

.home-features__item {
    list-style: none;
}

/* ── Carte ────────────────────────────────────────────────────────────────── */
/* Maquette : fond #FAFAFA = --origam-color__surface---raised,
   border 0, radius 0, padding 32px = --origam-space---8, shadow none */
.home-features__card {
    height: 100%;
    /* Fond surface raised (#FAFAFA) — OrigamCard utilise --origam-card---background
       qui est une var cascade interne, on la surcharge ici au niveau marketing */
    --origam-card---background: var(--origam-color__surface---raised, #fafafa);
    /* radius 0 : cartes jointives, angles droits */
    --origam-card---border-start-start-radius: 0;
    --origam-card---border-start-end-radius: 0;
    --origam-card---border-end-end-radius: 0;
    --origam-card---border-end-start-radius: 0;
    /* Pas de border visible */
    --origam-card---border-top-width: 0;
    --origam-card---border-right-width: 0;
    --origam-card---border-bottom-width: 0;
    --origam-card---border-left-width: 0;
    /* Pas d'ombre */
    --origam-card---box-shadow: none;
}

.home-features__card-body {
    padding: var(--origam-space---8, 2rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
}

/* ── Icône feature ────────────────────────────────────────────────────────── */
/* Maquette : 44×44px, fond rgba(124,58,237,0.1) = --origam-color__action--primary---bgSubtle,
   border 1px solid #7C3AED = --origam-color__border---focus,
   radius 10px = --origam-radius---card */
.home-features__icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    background-color: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.1));
    border: 1px solid var(--origam-color__border---focus, #7c3aed);
    border-radius: var(--origam-radius---card, 10px);
}

.home-features__icon {
    font-size: var(--origam-space---5, 1.25rem);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

/* ── Card title ───────────────────────────────────────────────────────────── */
/* Maquette : 17px ≈ entre sm et lg, font-weight 600, color --text---primary */
.home-features__card-title {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ── Card description ─────────────────────────────────────────────────────── */
/* Maquette : 14px = --font-size---sm, color #525252 = --text---secondary */
.home-features__card-desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
}

/* ── Responsive ───────────────────────────────────────────────────────────── */
@media (max-width: 1024px) {
    .home-features__grid {
        grid-template-columns: repeat(2, 1fr) !important;
    }
}

@media (max-width: 640px) {
    .home-features {
        padding-inline: var(--origam-space---6, 1.5rem);
    }

    .home-features__grid {
        grid-template-columns: 1fr !important;
    }

    .home-features__title {
        font-size: clamp(1.75rem, 8vw, 3rem);
    }
}
</style>
