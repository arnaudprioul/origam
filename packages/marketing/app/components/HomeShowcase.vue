<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import {
    SHOWCASE_AVATAR_ITEMS,
    SHOWCASE_CHIP_ITEMS,
    SHOWCASE_SPARKLINE_DATA,
    SHOWCASE_TABLE_ROWS,
} from '~/consts/showcase.const'

const { t } = useT()

const switchVariants = computed(() => [
    { modelValue: true,  inset: false, flat: false },
    { modelValue: true,  inset: true,  flat: false },
    { modelValue: false, inset: false, flat: true  },
])

const sparklineSeries = computed(() => [
    { name: 'growth', data: SHOWCASE_SPARKLINE_DATA },
])
</script>

<template>
    <section
        class="home-showcase"
        aria-labelledby="showcase-title"
    >
        <header class="home-showcase__header">
            <p class="home-showcase__eyebrow">
                {{ t('home.showcase.eyebrow', 'SHOWCASE') }}
            </p>
            <h2
                id="showcase-title"
                class="home-showcase__title"
            >
                {{ t('home.showcase.title', '95 components. One vibe.') }}
            </h2>
            <a
                href="/components"
                class="home-showcase__view-all"
                data-cy="showcase-view-all"
            >
                {{ t('home.showcase.viewAll', 'View all') }}
            </a>
        </header>

        <ul
            class="home-showcase__grid"
            aria-label="Component showcase"
        >
            <li class="home-showcase__item home-showcase__item--table">
                <figure class="home-showcase__widget">
                    <figcaption class="home-showcase__widget-label">
                        <strong class="home-showcase__widget-title">
                            {{ t('home.showcase.dataTable.title', 'Data Table') }}
                        </strong>
                        <span class="home-showcase__widget-caption">
                            {{ t('home.showcase.dataTable.caption', 'Sortable · filterable · virtualized') }}
                        </span>
                    </figcaption>

                    <table
                        class="home-showcase__table"
                        data-cy="showcase-data-table"
                    >
                        <thead class="home-showcase__table-head">
                            <tr>
                                <th scope="col" class="home-showcase__th">
                                    {{ t('home.showcase.dataTable.colName', 'Name') }}
                                </th>
                                <th scope="col" class="home-showcase__th">
                                    {{ t('home.showcase.dataTable.colOwner', 'Owner') }}
                                </th>
                                <th scope="col" class="home-showcase__th">
                                    {{ t('home.showcase.dataTable.colStatus', 'Status') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="row in SHOWCASE_TABLE_ROWS"
                                :key="row.nameKey"
                                class="home-showcase__tr"
                            >
                                <td class="home-showcase__td">
                                    {{ t(row.nameKey, row.nameFallback) }}
                                </td>
                                <td class="home-showcase__td">
                                    {{ t(row.ownerKey, row.ownerFallback) }}
                                </td>
                                <td class="home-showcase__td">
                                    {{ t(row.statusKey, row.statusFallback) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </figure>
            </li>

            <li class="home-showcase__item home-showcase__item--chart">
                <figure class="home-showcase__widget">
                    <figcaption class="home-showcase__widget-label">
                        <strong class="home-showcase__widget-title">
                            {{ t('home.showcase.chartLine.title', 'Chart Line') }}
                        </strong>
                        <span class="home-showcase__widget-caption">
                            {{ t('home.showcase.chartLine.caption', '+12.4% this month') }}
                        </span>
                    </figcaption>

                    <origam-chart-sparkline
                        type="area"
                        color="primary"
                        :series="sparklineSeries"
                        :width="240"
                        :height="80"
                        :show-last="true"
                        class="home-showcase__sparkline"
                        data-cy="showcase-sparkline"
                        :title="t('home.showcase.chartLine.caption', '+12.4% this month')"
                    />
                </figure>
            </li>

            <li class="home-showcase__item home-showcase__item--switch">
                <figure class="home-showcase__widget">
                    <figcaption class="home-showcase__widget-label">
                        <strong class="home-showcase__widget-title">
                            {{ t('home.showcase.switch.title', 'Switch') }}
                        </strong>
                        <span class="home-showcase__widget-caption">
                            {{ t('home.showcase.switch.caption', 'inset · flat · default') }}
                        </span>
                    </figcaption>

                    <ul
                        class="home-showcase__switch-list"
                        aria-label="Switch variants"
                    >
                        <li
                            v-for="(variant, index) in switchVariants"
                            :key="index"
                            class="home-showcase__switch-item"
                        >
                            <origam-switch
                                :model-value="variant.modelValue"
                                :inset="variant.inset"
                                :flat="variant.flat"
                                color="primary"
                                :data-cy="`showcase-switch-${index}`"
                                readonly
                            />
                        </li>
                    </ul>
                </figure>
            </li>

            <li class="home-showcase__item home-showcase__item--chips">
                <figure class="home-showcase__widget">
                    <figcaption class="home-showcase__widget-label">
                        <strong class="home-showcase__widget-title">
                            {{ t('home.showcase.chips.title', 'Chips') }}
                        </strong>
                        <span class="home-showcase__widget-caption">
                            {{ t('home.showcase.chips.caption', '6 intents') }}
                        </span>
                    </figcaption>

                    <origam-chip-group
                        class="home-showcase__chip-group"
                        data-cy="showcase-chip-group"
                    >
                        <origam-chip
                            v-for="chip in SHOWCASE_CHIP_ITEMS"
                            :key="chip.intent"
                            :bg-color="chip.intent"
                            :text="t(chip.labelKey, chip.labelFallback)"
                            :data-cy="`showcase-chip-${chip.intent}`"
                        />
                    </origam-chip-group>
                </figure>
            </li>

            <li class="home-showcase__item home-showcase__item--avatars">
                <figure class="home-showcase__widget">
                    <figcaption class="home-showcase__widget-label">
                        <strong class="home-showcase__widget-title">
                            {{ t('home.showcase.avatarGroup.title', 'Avatar Group') }}
                        </strong>
                        <span class="home-showcase__widget-caption">
                            {{ t('home.showcase.avatarGroup.caption', '+24 members') }}
                        </span>
                    </figcaption>

                    <origam-avatar-group
                        :items="SHOWCASE_AVATAR_ITEMS"
                        :max="4"
                        class="home-showcase__avatar-group"
                        data-cy="showcase-avatar-group"
                        :aria-label="t('home.showcase.avatarGroup.caption', '+24 members')"
                    />
                </figure>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.home-showcase {
    padding: var(--origam-space---10, 4rem) var(--origam-space---6, 1.5rem);
    max-width: var(--origam-container---max-width, 72rem);
    margin-inline: auto;
}

.home-showcase__header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    margin-block-end: var(--origam-space---8, 2rem);
}

.home-showcase__eyebrow {
    width: 100%;
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    letter-spacing: var(--origam-letter-spacing---widest, 0.1em);
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-showcase__title {
    flex: 1;
    margin: 0;
    font-size: var(--origam-font-size---2xl, 1.75rem);
    font-weight: var(--origam-font-weight---bold, 700);
    color: var(--origam-color__text---primary, #0a0a0a);
    line-height: var(--origam-line-height---tight, 1.25);
}

.home-showcase__view-all {
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: var(--origam-font-weight---medium, 500);
    color: var(--origam-color__action--primary---fg, var(--origam-color__text---primary, #0a0a0a));
    text-decoration: none;
    border-block-end: 1px solid currentColor;
    transition: opacity 0.15s ease;
}

.home-showcase__view-all:hover,
.home-showcase__view-all:focus-visible {
    opacity: 0.7;
}

.home-showcase__view-all:focus-visible {
    outline: 2px solid var(--origam-color__action--primary---fg, currentColor);
    outline-offset: 2px;
    border-radius: var(--origam-radius---sm, 2px);
}

.home-showcase__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    gap: var(--origam-space---6, 1.5rem);
}

.home-showcase__item {
    min-width: 0;
}

.home-showcase__item--table {
    grid-column: 1 / -1;
}

.home-showcase__widget {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
    margin: 0;
    padding: var(--origam-space---5, 1.25rem);
    border-radius: var(--origam-radius---lg, 0.5rem);
    border: 1px solid var(--origam-color__border---subtle, rgba(0 0 0 / 0.08));
    background-color: var(--origam-color__surface---elevated, var(--origam-color__surface---default, #fff));
}

.home-showcase__widget-label {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
}

.home-showcase__widget-title {
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-showcase__widget-caption {
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-showcase__table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-showcase__table-head {
    background-color: var(--origam-color__surface---subtle, rgba(0 0 0 / 0.04));
}

.home-showcase__th {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    text-align: start;
    font-weight: var(--origam-font-weight---semibold, 600);
    font-size: var(--origam-font-size---xs, 0.75rem);
    letter-spacing: var(--origam-letter-spacing---wide, 0.05em);
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #6b7280);
    border-block-end: 1px solid var(--origam-color__border---subtle, rgba(0 0 0 / 0.08));
}

.home-showcase__tr {
    border-block-end: 1px solid var(--origam-color__border---subtle, rgba(0 0 0 / 0.06));
}

.home-showcase__tr:last-child {
    border-block-end: none;
}

.home-showcase__td {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    vertical-align: middle;
}

.home-showcase__sparkline {
    align-self: center;
}

.home-showcase__switch-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
}

.home-showcase__switch-item {
    display: flex;
    align-items: center;
}

.home-showcase__chip-group {
    flex-wrap: wrap;
}

.home-showcase__avatar-group {
    margin-block-start: var(--origam-space---2, 0.5rem);
}
</style>
