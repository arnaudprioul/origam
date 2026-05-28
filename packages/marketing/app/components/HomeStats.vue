<script setup lang="ts">
const { t } = useI18nFallback()

const STATS = [
    {
        valueKey: 'home.stats.components.value',
        valueFallback: '95',
        labelKey: 'home.stats.components.label',
        labelFallback: 'Components'
    },
    {
        valueKey: 'home.stats.charts.value',
        valueFallback: '29',
        labelKey: 'home.stats.charts.label',
        labelFallback: 'Chart primitives'
    },
    {
        valueKey: 'home.stats.a11y.value',
        valueFallback: '100%',
        labelKey: 'home.stats.a11y.label',
        labelFallback: 'WCAG 2.1 AA'
    },
    {
        valueKey: 'home.stats.size.value',
        valueFallback: '<50kb',
        labelKey: 'home.stats.size.label',
        labelFallback: 'Tree-shakable'
    },
    {
        valueKey: 'home.stats.license.value',
        valueFallback: 'MIT',
        labelKey: 'home.stats.license.label',
        labelFallback: 'Open source'
    }
] as const
</script>

<template>
    <section
        class="home-stats"
        aria-labelledby="stats-region"
    >
        <p id="stats-region" class="sr-only">
            {{ t('home.stats.regionLabel', 'Key figures') }}
        </p>
        <div class="home-stats__inner">
            <ul class="home-stats__grid" role="list">
                <li
                    v-for="stat in STATS"
                    :key="stat.labelKey"
                    class="home-stats__item"
                >
                    <article class="m-stat">
                        <span class="m-stat__num">{{ t(stat.valueKey, stat.valueFallback) }}</span>
                        <span class="m-stat__label">{{ t(stat.labelKey, stat.labelFallback) }}</span>
                    </article>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped>
.home-stats {
    padding-block: 2.5rem;
    padding-inline: 3.5rem;
    border-block-start: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    background: var(--m-bg, var(--origam-color__surface---default, #0a0a0a));
}

.home-stats__inner {
    max-width: 80rem;
    margin-inline: auto;
}

.home-stats__grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--origam-space---8, 2rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-stats__item {
    display: flex;
    justify-content: center;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

@media (max-width: 768px) {
    .home-stats__grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 480px) {
    .home-stats__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
