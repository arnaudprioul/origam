<script setup lang="ts">
import { useT } from '~/composables/useT'
import { KPIS, KPIS_GRID_COLUMNS } from '~/consts/kpis.const'

const { t } = useT()
</script>

<template>
    <section
        id="kpis"
        class="home-kpis"
        aria-labelledby="kpis-title"
    >
        <h2
            id="kpis-title"
            class="home-kpis__title sr-only"
        >
            {{ t('home.kpis.title', 'origam by the numbers') }}
        </h2>

        <origam-divider
            class="home-kpis__rule"
            color="var(--origam-color__border---default)"
            data-cy="kpis-rule-top"
        />

        <origam-grid
            tag="dl"
            :columns="KPIS_GRID_COLUMNS"
            gap="lg"
            class="home-kpis__list"
        >
            <div
                v-for="kpi in KPIS"
                :key="kpi.valueKey"
                class="home-kpis__item"
            >
                <dt class="home-kpis__label">
                    {{ t(kpi.labelKey, kpi.labelFallback) }}
                </dt>
                <dd class="home-kpis__value">
                    {{ t(kpi.valueKey, kpi.valueFallback) }}
                </dd>
            </div>
        </origam-grid>

        <origam-divider
            class="home-kpis__rule"
            color="var(--origam-color__border---default)"
            data-cy="kpis-rule-bottom"
        />
    </section>
</template>

<style scoped>
.home-kpis {
    padding-block: var(--origam-space---10, 2.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
}

/* DS gap: OrigamDivider bakes opacity:0.12 for its hairline look. The KPI
   rule must read the sobre border token at full strength, so we reset the
   opacity here. No DS prop exposes the divider's opacity. */
.home-kpis__rule {
    opacity: 1;
}

.home-kpis__list {
    margin: 0;
    padding: 0;
    text-align: center;
}

/* <dt> (label) precedes <dd> (value) in source for correct <dl> semantics;
   column-reverse renders the big number on top per the maquette. */
.home-kpis__item {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.home-kpis__value {
    margin: 0;
    color: var(--origam-color__action--primary---bg, #7c3aed);
    line-height: 1;
    font-weight: var(--origam-font-weight---extrabold, 800);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);

    /* DS gap: maquette KPI number is 40px; the DS font-size scale stops at
       5xl (36px). No DS scalar token matches — literal dimension, no DS hook. */
    font-size: 2.5rem;
}

.home-kpis__label {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---secondary, #525252);

    /* DS gap: no DS prop sets text-transform / letter-spacing on bare text. */
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
</style>
