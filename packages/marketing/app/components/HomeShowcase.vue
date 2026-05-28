<script setup lang="ts">
const { t } = useI18nFallback()

const TABLE_ROWS = [
    { project: 'Aurora release', owner: 'Arnaud', status: 'Shipped', color: 'success' as const },
    { project: 'Tokens v2', owner: 'Léa', status: 'In review', color: 'warning' as const },
    { project: 'A11y audit', owner: 'Jade', status: 'Shipped', color: 'success' as const },
    { project: 'Chart engine', owner: 'Marc', status: 'Draft', color: 'neutral' as const },
    { project: 'New theme', owner: 'Romi', status: 'In review', color: 'warning' as const }
] as const

</script>

<template>
    <section
        class="home-showcase"
        aria-labelledby="showcase-title"
    >
        <div class="home-showcase__inner">
            <header class="home-showcase__header">
                <span class="m-section-pre">{{ t('home.showcase.eyebrow', 'SHOWCASE') }}</span>
                <div class="home-showcase__title-row">
                    <div>
                        <h2
                            id="showcase-title"
                            class="home-showcase__title m-h2"
                        >
                            {{ t('home.showcase.title', '95 components.') }}<br>
                            {{ t('home.showcase.titleSub', 'One vibe.') }}
                        </h2>
                    </div>
                    <OrigamBtn
                        to="/components"
                        variant="outlined"
                        rounded="pill"
                        append-icon="mdi:arrow-right"
                    >
                        {{ t('home.showcase.viewAll', 'View all') }}
                    </OrigamBtn>
                </div>
            </header>

            <div class="home-showcase__grid">
                <article class="home-showcase__tile home-showcase__tile--table" aria-labelledby="tile-table-title">
                    <header class="home-showcase__tile-header">
                        <h3 id="tile-table-title" class="m-h3 home-showcase__tile-title">
                            {{ t('home.showcase.table.label', 'Data Table') }}
                        </h3>
                        <span class="home-showcase__tile-sub">{{ t('home.showcase.table.sub', 'Sortable · filterable · virtualized') }}</span>
                        <OrigamChip color="primary" variant="tonal" size="sm" class="home-showcase__tile-tag">
                            {{ t('home.showcase.table.tag', 'Data') }}
                        </OrigamChip>
                    </header>
                    <div class="home-showcase__table">
                        <div class="home-showcase__table-head" role="row" aria-hidden="true">
                            <span>Project</span>
                            <span>Owner</span>
                            <span>Status</span>
                        </div>
                        <ul class="home-showcase__table-body" role="list">
                            <li
                                v-for="row in TABLE_ROWS"
                                :key="row.project"
                                class="home-showcase__table-row"
                            >
                                <span class="home-showcase__table-cell home-showcase__table-cell--name">{{ row.project }}</span>
                                <span class="home-showcase__table-cell home-showcase__table-cell--owner">{{ row.owner }}</span>
                                <span class="home-showcase__table-cell">
                                    <OrigamChip :color="row.color" variant="tonal" size="xs">
                                        {{ row.status }}
                                    </OrigamChip>
                                </span>
                            </li>
                        </ul>
                    </div>
                </article>

                <article class="home-showcase__tile" aria-labelledby="tile-chart-title">
                    <header class="home-showcase__tile-header">
                        <h3 id="tile-chart-title" class="m-h3 home-showcase__tile-title">
                            {{ t('home.showcase.chart.label', 'Chart Line') }}
                        </h3>
                        <span class="home-showcase__tile-sub home-showcase__tile-sub--success">
                            {{ t('home.showcase.chart.sub', '+12.4% this month') }}
                        </span>
                    </header>
                    <svg viewBox="0 0 200 80" class="home-showcase__chart" aria-hidden="true">
                        <defs>
                            <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stop-color="var(--m-accent, #8B5CF6)" stop-opacity=".5" />
                                <stop offset="1" stop-color="var(--m-accent, #8B5CF6)" stop-opacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,28 L140,18 L160,22 L180,12 L200,8 L200,80 L0,80 Z" fill="url(#chart-grad)" />
                        <path d="M0,60 L20,55 L40,58 L60,40 L80,42 L100,30 L120,28 L140,18 L160,22 L180,12 L200,8" stroke="var(--m-accent, #8B5CF6)" stroke-width="1.8" fill="none" stroke-linecap="round" />
                    </svg>
                </article>

                <article class="home-showcase__tile" aria-labelledby="tile-switch-title">
                    <header class="home-showcase__tile-header">
                        <h3 id="tile-switch-title" class="m-h3 home-showcase__tile-title">
                            {{ t('home.showcase.switch.label', 'Switch') }}
                        </h3>
                        <span class="home-showcase__tile-sub">{{ t('home.showcase.switch.sub', 'inset · flat · default') }}</span>
                    </header>
                    <div class="home-showcase__switch-row">
                        <OrigamSwitch :model-value="false" aria-label="Switch off state" />
                        <OrigamSwitch :model-value="true" color="primary" aria-label="Switch on state" />
                    </div>
                </article>

                <article class="home-showcase__tile" aria-labelledby="tile-chips-title">
                    <header class="home-showcase__tile-header">
                        <h3 id="tile-chips-title" class="m-h3 home-showcase__tile-title">
                            {{ t('home.showcase.chips.label', 'Chips') }}
                        </h3>
                        <span class="home-showcase__tile-sub">{{ t('home.showcase.chips.sub', '6 intents') }}</span>
                    </header>
                    <div class="home-showcase__chips">
                        <OrigamChip color="primary" variant="tonal" size="sm">
                            {{ t('showcase.chips.vue3', 'Vue 3') }}
                        </OrigamChip>
                        <OrigamChip color="neutral" variant="tonal" size="sm">
                            {{ t('showcase.chips.tokens', 'Tokens') }}
                        </OrigamChip>
                        <OrigamChip color="success" variant="tonal" size="sm">
                            {{ t('showcase.chips.a11y', 'A11y') }}
                        </OrigamChip>
                    </div>
                </article>

                <article class="home-showcase__tile" aria-labelledby="tile-avatars-title">
                    <header class="home-showcase__tile-header">
                        <h3 id="tile-avatars-title" class="m-h3 home-showcase__tile-title">
                            {{ t('home.showcase.avatars.label', 'Avatar Group') }}
                        </h3>
                        <span class="home-showcase__tile-sub">{{ t('home.showcase.avatars.sub', '+24 members') }}</span>
                    </header>
                    <OrigamAvatarGroup>
                        <OrigamAvatar color="primary" size="sm">A</OrigamAvatar>
                        <OrigamAvatar color="success" size="sm">L</OrigamAvatar>
                        <OrigamAvatar color="warning" size="sm">J</OrigamAvatar>
                        <OrigamAvatar color="danger" size="sm">M</OrigamAvatar>
                        <OrigamAvatar color="neutral" size="sm">+24</OrigamAvatar>
                    </OrigamAvatarGroup>
                </article>
            </div>

            <div class="home-showcase__cta">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="flat"
                    rounded="pill"
                    append-icon="mdi:arrow-right"
                    size="lg"
                >
                    {{ t('showcase.cta', 'View all components') }}
                </OrigamBtn>
                <OrigamBtn
                    to="/playground"
                    variant="outlined"
                    rounded="pill"
                    prepend-icon="mdi:play-circle-outline"
                    size="lg"
                >
                    {{ t('showcase.ctaPlayground', 'Try the playground') }}
                </OrigamBtn>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-showcase {
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    background-color: var(--origam-color__surface---sunken, #fafafa);
    container-type: inline-size;
}

.home-showcase__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---12, 3rem);
}

.home-showcase__header {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
}

.home-showcase__title-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--origam-space---4, 1rem);
    flex-wrap: wrap;
}

.home-showcase__title {
    margin: 0;
}

.home-showcase__grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--origam-space---4, 1rem);
}

.home-showcase__tile {
    background-color: var(--origam-color__surface---raised, #ffffff);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    border-radius: var(--origam-radius---2xl, 1.5rem);
    box-shadow: var(--origam-shadow---sm);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.2s ease;
}

.home-showcase__tile:hover {
    box-shadow: var(--origam-shadow---md);
}

.home-showcase__tile--table {
    grid-row: span 2;
}

.home-showcase__tile-header {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
    padding: var(--origam-space---4, 1rem) var(--origam-space---5, 1.25rem) var(--origam-space---3, 0.75rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, #d4d4d4);
}

.home-showcase__tile-title {
    margin: 0;
}

.home-showcase__tile-sub {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--origam-color__text---secondary, #525252);
}

.home-showcase__tile-sub--success {
    color: var(--origam-color__feedback--success---fg, #16a34a);
}

.home-showcase__tile-tag {
    align-self: flex-start;
    margin-block-start: var(--origam-space---1, 0.25rem);
}

.home-showcase__table {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.home-showcase__table-head {
    display: grid;
    grid-template-columns: 1fr 5rem 6rem;
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---5, 1.25rem);
    font-size: var(--origam-font__size---xs, 0.6875rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--origam-color__text---tertiary, #737373);
    background-color: var(--origam-color__surface---sunken, #fafafa);
    border-block-end: 1px solid var(--origam-color__border---subtle, #d4d4d4);
}

.home-showcase__table-body {
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
}

.home-showcase__table-row {
    display: grid;
    grid-template-columns: 1fr 5rem 6rem;
    align-items: center;
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---5, 1.25rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    transition: background-color 0.1s ease;
}

.home-showcase__table-row:last-child {
    border-block-end: none;
}

.home-showcase__table-row:hover {
    background-color: var(--origam-color__surface---sunken, #fafafa);
}

.home-showcase__table-cell {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--origam-color__text---primary, #171717);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.home-showcase__table-cell--name {
    font-weight: var(--origam-font__weight---medium, 500);
}

.home-showcase__table-cell--owner {
    color: var(--origam-color__text---secondary, #525252);
}

.home-showcase__chart {
    display: block;
    width: 100%;
    height: auto;
    margin-block-start: auto;
    padding: var(--origam-space---4, 1rem);
}

.home-showcase__switch-row {
    display: flex;
    align-items: center;
    gap: var(--origam-space---4, 1rem);
    padding: var(--origam-space---4, 1rem) var(--origam-space---5, 1.25rem);
    flex: 1;
}

.home-showcase__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
    align-items: flex-start;
    padding: var(--origam-space---4, 1rem) var(--origam-space---5, 1.25rem);
    flex: 1;
}

.home-showcase__cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---3, 0.75rem);
    justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
    .home-showcase__tile,
    .home-showcase__table-row {
        transition: none;
    }
}

@container (max-width: 900px) {
    .home-showcase__grid {
        grid-template-columns: 1fr 1fr;
    }

    .home-showcase__tile--table {
        grid-column: span 2;
        grid-row: auto;
    }
}

@container (max-width: 600px) {
    .home-showcase__grid {
        grid-template-columns: 1fr;
    }

    .home-showcase__tile--table {
        grid-column: 1;
    }
}
</style>
