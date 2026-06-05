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
            class="home-kpis__title sr-only"
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
/*
 * Tokens locaux — valeurs maquette sans équivalent DS exact.
 * Source : PIXEL-SPEC.md § Section 3 KPIs.
 *   --home-kpis--border-color  : rgba(0,0,0,0.08) — maquette `--m-border`
 *   --home-kpis--value-size    : 2.5rem / 40px — aucun token DS à 40px
 *   --home-kpis--value-weight  : 800 — `--origam-font__weight---bold` = 700 insuffisant
 *   --home-kpis--value-tracking: -0.045em / -1.8px — aucun token letter-spacing
 */
.home-kpis {
    --home-kpis--border-color: rgba(0, 0, 0, 0.08);
    --home-kpis--value-size: 2.5rem;
    --home-kpis--value-weight: 800;
    --home-kpis--value-tracking: -0.045em;

    padding-block: var(--origam-space---10, 2.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    border-top: var(--origam-border__width---thin, 1px) var(--origam-border__style---solid, solid) var(--home-kpis--border-color);
    border-bottom: var(--origam-border__width---thin, 1px) var(--origam-border__style---solid, solid) var(--home-kpis--border-color);
}

.home-kpis__list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: var(--origam-space---8, 2rem);
    margin: 0;
    padding: 0;
    text-align: center;
}

.home-kpis__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.home-kpis__value {
    margin: 0;
    font-size: var(--home-kpis--value-size, 2.5rem);
    font-weight: var(--home-kpis--value-weight, 800);
    color: var(--origam-color__action--primary---bg, #7c3aed);
    line-height: 1;
    letter-spacing: var(--home-kpis--value-tracking, -0.045em);
}

.home-kpis__label {
    margin: 0;
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---secondary, #525252);
    text-transform: uppercase;
    letter-spacing: 0.08em;
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
    border: 0;
}

@media (max-width: 640px) {
    .home-kpis__list {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--origam-space---6, 1.5rem);
    }

    .home-kpis__item:last-child {
        grid-column: 1 / -1;
    }
}
</style>
