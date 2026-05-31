<script setup lang="ts">
import { useT } from '~/composables/useT'
import { KPIS } from '~/consts/kpis.const'

const { t } = useT()
</script>

<template>
    <section
        class="home-kpis"
        aria-labelledby="kpis-title"
    >
        <h2
            id="kpis-title"
            class="home-kpis__title"
        >
            {{ t('home.kpis.title', 'origam by the numbers') }}
        </h2>

        <dl class="home-kpis__list">
            <div
                v-for="kpi in KPIS"
                :key="kpi.valueKey"
                class="home-kpis__item"
            >
                <dd class="home-kpis__value">
                    {{ t(kpi.valueKey, kpi.valueFallback) }}
                </dd>
                <dt class="home-kpis__label">
                    {{ t(kpi.labelKey, kpi.labelFallback) }}
                </dt>
            </div>
        </dl>
    </section>
</template>

<style scoped>
.home-kpis {
    padding: var(--origam-space---20, 5rem) var(--origam-space---6, 1.5rem);
    text-align: center;
    border-top: var(--origam-border__width---thin, 1px) var(--origam-border__style---solid, solid) var(--origam-color__border---subtle, #d4d4d4);
    border-bottom: var(--origam-border__width---thin, 1px) var(--origam-border__style---solid, solid) var(--origam-color__border---subtle, #d4d4d4);
}

.home-kpis__title {
    margin: 0 0 var(--origam-space---12, 3rem);
    font-size: var(--origam-font__size---xl, 1.125rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---secondary, #525252);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.home-kpis__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--origam-space---8, 2rem) var(--origam-space---16, 4rem);
    margin: 0;
    padding: 0;
}

.home-kpis__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    min-width: 8rem;
}

.home-kpis__value {
    margin: 0;
    font-size: var(--origam-font__size---5xl, 2.25rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__text---primary, #171717);
    line-height: 1;
}

.home-kpis__label {
    margin: 0;
    font-size: var(--origam-font__size---md, 0.875rem);
    font-weight: var(--origam-font__weight---regular, 400);
    color: var(--origam-color__text---secondary, #525252);
}
</style>
