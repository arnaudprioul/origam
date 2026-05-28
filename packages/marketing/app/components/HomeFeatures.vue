<script setup lang="ts">
const { t } = useI18nFallback()

const FEATURES = [
    {
        id: 'charts',
        icon: 'chart',
        titleKey: 'home.features.items.1.title',
        titleFallback: '29 chart primitives',
        descKey: 'home.features.items.1.desc',
        descFallback: 'Line, area, bar, donut, candlestick, heatmap — Highcharts-tier coverage without the license.'
    },
    {
        id: 'a11y',
        icon: 'shield',
        titleKey: 'home.features.items.2.title',
        titleFallback: 'WCAG 2.1 AA verified',
        descKey: 'home.features.items.2.desc',
        descFallback: 'Each component ships with axe-core + Playwright a11y tests. Keyboard, screen-readers, motion: covered.'
    },
    {
        id: 'tokens',
        icon: 'layers',
        titleKey: 'home.features.items.3.title',
        titleFallback: 'Design tokens',
        descKey: 'home.features.items.3.desc',
        descFallback: 'Multi-theme via Tokens Studio. Switch between light, dark, or your own brand at runtime with zero remount.'
    },
    {
        id: 'typescript',
        icon: 'type',
        titleKey: 'home.features.items.4.title',
        titleFallback: 'TypeScript first',
        descKey: 'home.features.items.4.desc',
        descFallback: 'Strict mode, full type inference, generics on Data Table/List. Your IDE will thank you.'
    },
    {
        id: 'css',
        icon: 'dna',
        titleKey: 'home.features.items.5.title',
        titleFallback: 'CSS-first',
        descKey: 'home.features.items.5.desc',
        descFallback: "Container queries, :has(), color-mix(), view-transition-name. We use modern CSS so you don't reinvent it."
    },
    {
        id: 'vue',
        icon: 'bolt',
        titleKey: 'home.features.items.6.title',
        titleFallback: 'Composition API',
        descKey: 'home.features.items.6.desc',
        descFallback: 'Built on script setup + Composition API. Headless composables exposed when you need to go low-level.'
    }
] as const
</script>

<template>
    <section
        class="home-features m-section"
        aria-labelledby="features-title"
    >
        <div class="home-features__inner m-container">
            <header class="home-features__header">
                <span class="m-section-pre">{{ t('home.features.eyebrow', "WHAT'S INSIDE") }}</span>
                <h2
                    id="features-title"
                    class="home-features__title m-h2"
                >
                    {{ t('home.features.title', "Everything you'd expect.") }}<br>
                    <span class="home-features__title-secondary">
                        {{ t('home.features.titleSecondary', "Nothing you wouldn't.") }}
                    </span>
                </h2>
                <p class="home-features__body m-body">
                    {{ t('home.features.body', 'A complete toolkit for shipping Vue 3 apps — from atomic primitives to complex data viz, every piece tested, themed and a11y-compliant.') }}
                </p>
            </header>

            <ul
                class="home-features__grid"
                role="list"
            >
                <li
                    v-for="feature in FEATURES"
                    :key="feature.id"
                    class="home-features__item"
                >
                    <article class="home-features__cell">
                        <div
                            class="home-features__icon"
                            aria-hidden="true"
                        >
                            <MarketingIcon
                                :name="feature.icon"
                                :size="22"
                                :stroke="1.6"
                            />
                        </div>
                        <h3 class="home-features__cell-title m-h3">
                            {{ t(feature.titleKey, feature.titleFallback) }}
                        </h3>
                        <p class="home-features__cell-desc">
                            {{ t(feature.descKey, feature.descFallback) }}
                        </p>
                    </article>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.home-features__inner {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---16, 4rem);
}

.home-features__header {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
    max-width: 37.5rem;
}

.home-features__title {
    margin: 0;
}

.home-features__title-secondary {
    color: var(--m-text-quiet, var(--origam-color__text---tertiary, #737373));
}

.home-features__body {
    margin: 0;
}

.home-features__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
    border-radius: var(--m-radius-lg, var(--origam-radius---xl, 1rem));
    overflow: hidden;
}

.home-features__item {
    display: flex;
}

.home-features__item:nth-child(-n+3) .home-features__cell {
    border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
}

.home-features__item:not(:nth-child(3n)) .home-features__cell {
    border-inline-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
}

.home-features__cell {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---8, 2rem);
    background: var(--m-surface, var(--origam-color__surface---raised, #ffffff));
    width: 100%;
}

.home-features__icon {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: var(--m-radius, var(--origam-radius---md, 0.5rem));
    background: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 10%, transparent));
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #6d28d9));
    border: 1px solid var(--m-accent-border, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 30%, transparent));
    flex-shrink: 0;
}

.home-features__cell-title {
    margin: 0;
}

.home-features__cell-desc {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #525252));
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
    margin: 0;
}

@media (max-width: 900px) {
    .home-features__grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .home-features__item:nth-child(-n+3) .home-features__cell {
        border-block-end: none;
    }

    .home-features__item:not(:nth-child(3n)) .home-features__cell {
        border-inline-end: none;
    }

    .home-features__item:nth-child(-n+4) .home-features__cell {
        border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
    }

    .home-features__item:not(:nth-child(2n)) .home-features__cell {
        border-inline-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
    }
}

@media (max-width: 580px) {
    .home-features__grid {
        grid-template-columns: 1fr;
    }

    .home-features__item:nth-child(-n+4) .home-features__cell {
        border-block-end: none;
    }

    .home-features__item:not(:nth-child(2n)) .home-features__cell {
        border-inline-end: none;
    }

    .home-features__item:not(:last-child) .home-features__cell {
        border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
    }
}
</style>
