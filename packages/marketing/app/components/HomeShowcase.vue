<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import {
    SHOWCASE_AVATAR_ITEMS,
    SHOWCASE_CHIP_ITEMS,
    SHOWCASE_GRID_COLUMNS,
    SHOWCASE_SPARKLINE_DATA,
    SHOWCASE_TABLE_ROWS,
    SHOWCASE_WIDGET_VARS
} from '~/consts/showcase.const'

const { t } = useT()

const switchVariants = computed(() => [
    { modelValue: true,  inset: true,  flat: false },
    { modelValue: true,  inset: false, flat: false },
    { modelValue: false, inset: false, flat: true  }
])

const sparklineSeries = computed(() => [
    { name: 'growth', data: SHOWCASE_SPARKLINE_DATA }
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

            <origam-title
                tag="h2"
                class="home-showcase__title"
            >
                <span id="showcase-title">{{ t('home.showcase.title', '95 components. One vibe.') }}</span>
            </origam-title>

            <origam-btn
                variant="text"
                href="/components"
                class="home-showcase__view-all"
                append-icon="mdi-arrow-right"
                data-cy="showcase-view-all"
            >
                {{ t('home.showcase.viewAll', 'View all') }}
            </origam-btn>
        </header>

        <origam-grid
            tag="ul"
            :columns="SHOWCASE_GRID_COLUMNS"
            gap="16px"
            aria-label="Component showcase"
            class="home-showcase__grid"
        >
            <origam-grid-item
                tag="li"
                :row="'1 / 3'"
                class="home-showcase__item"
            >
                <origam-card
                    tag="figure"
                    flat
                    :style="SHOWCASE_WIDGET_VARS"
                    class="home-showcase__widget"
                >
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
                                v-for="(row, rowIndex) in SHOWCASE_TABLE_ROWS"
                                :key="row.nameKey"
                                class="home-showcase__tr"
                            >
                                <td class="home-showcase__td home-showcase__td--name">
                                    {{ t(row.nameKey, row.nameFallback) }}
                                </td>
                                <td class="home-showcase__td home-showcase__td--owner">
                                    {{ t(row.ownerKey, row.ownerFallback) }}
                                </td>
                                <td class="home-showcase__td home-showcase__td--status">
                                    <origam-chip
                                        :bg-color="row.statusIntent"
                                        :text="t(row.statusKey, row.statusFallback)"
                                        pill
                                        size="x-small"
                                        :data-cy="`showcase-status-${rowIndex}`"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </origam-card>
            </origam-grid-item>

            <origam-grid-item
                tag="li"
                class="home-showcase__item"
            >
                <origam-card
                    tag="figure"
                    flat
                    :style="SHOWCASE_WIDGET_VARS"
                    class="home-showcase__widget"
                >
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
                        :show-last="true"
                        width="100%"
                        :height="80"
                        class="home-showcase__sparkline"
                        data-cy="showcase-sparkline"
                        :title="t('home.showcase.chartLine.caption', '+12.4% this month')"
                    />
                </origam-card>
            </origam-grid-item>

            <origam-grid-item
                tag="li"
                class="home-showcase__item"
            >
                <origam-card
                    tag="figure"
                    flat
                    :style="SHOWCASE_WIDGET_VARS"
                    class="home-showcase__widget"
                >
                    <figcaption class="home-showcase__widget-label">
                        <strong class="home-showcase__widget-title">
                            {{ t('home.showcase.chips.title', 'Chips') }}
                        </strong>
                        <span class="home-showcase__widget-caption">
                            {{ t('home.showcase.chips.caption', '6 intents') }}
                        </span>
                    </figcaption>

                    <client-only>
                        <origam-chip-group
                            class="home-showcase__chip-group"
                            data-cy="showcase-chip-group"
                        >
                            <origam-chip
                                v-for="chip in SHOWCASE_CHIP_ITEMS"
                                :key="chip.intent"
                                :bg-color="chip.intent"
                                :text="t(chip.labelKey, chip.labelFallback)"
                                pill
                                :data-cy="`showcase-chip-${chip.intent}`"
                            />
                        </origam-chip-group>
                    </client-only>
                </origam-card>
            </origam-grid-item>

            <origam-grid-item
                tag="li"
                class="home-showcase__item"
            >
                <origam-card
                    tag="figure"
                    flat
                    :style="SHOWCASE_WIDGET_VARS"
                    class="home-showcase__widget"
                >
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
                            <client-only>
                                <origam-switch
                                    :model-value="variant.modelValue"
                                    :inset="variant.inset"
                                    :flat="variant.flat"
                                    color="primary"
                                    readonly
                                    :data-cy="`showcase-switch-${index}`"
                                />
                            </client-only>
                        </li>
                    </ul>
                </origam-card>
            </origam-grid-item>

            <origam-grid-item
                tag="li"
                class="home-showcase__item"
            >
                <origam-card
                    tag="figure"
                    flat
                    :style="SHOWCASE_WIDGET_VARS"
                    class="home-showcase__widget"
                >
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
                </origam-card>
            </origam-grid-item>
        </origam-grid>
    </section>
</template>

<style scoped>
.home-showcase {
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---14, 3.5rem);
    max-width: var(--origam-layout---max-width, 80rem);
    margin-inline: auto;
}

.home-showcase__header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    margin-block-end: var(--origam-space---8, 2rem);
}

/* DS gap: no DS prop sets text-transform / wide tracking on a bare <p>.
   Colour is the sobre action-primary fgSubtle token (purple), zero CSS. */
.home-showcase__eyebrow {
    width: 100%;
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);

    text-transform: uppercase;
    letter-spacing: var(--origam-letter-spacing---wide, 0.08em);
}

/* DS gap: section display size/tracking exceed OrigamTitle's token scale
   (max 3xl). Consumes the marketing display tokens, like the Hero H1. */
.home-showcase__title {
    flex: 1;
    margin: 0;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: var(--origam-line-height---tight, 1.1);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-showcase__grid {
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-showcase__item {
    list-style: none;
    display: flex;
}

.home-showcase__widget {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
    margin: 0;
}

.home-showcase__widget-label {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
    flex-shrink: 0;
}

.home-showcase__widget-title {
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-showcase__widget-caption {
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
}

/* DS gap: no DS table component is used here — native <table> by W3C choice.
   Head/row rules are the irreducible chrome a bare table needs; colours come
   from sobre border/text tokens. */
.home-showcase__table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-showcase__th {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    text-align: start;
    font-weight: var(--origam-font__weight---semibold, 600);
    font-size: var(--origam-font-size---xs, 0.75rem);
    letter-spacing: var(--origam-letter-spacing---wide, 0.08em);
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #525252);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    white-space: nowrap;
}

.home-showcase__tr {
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.home-showcase__tr:last-child {
    border-block-end: none;
}

.home-showcase__td {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    vertical-align: middle;
}

.home-showcase__td--name {
    font-weight: var(--origam-font__weight---medium, 500);
}

.home-showcase__td--owner {
    color: var(--origam-color__text---secondary, #525252);
}

.home-showcase__td--status {
    white-space: nowrap;
}

.home-showcase__sparkline {
    display: block;
    flex: 1;
}

.home-showcase__switch-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
    flex: 1;
    justify-content: center;
}

.home-showcase__switch-item {
    display: flex;
    align-items: center;
}

.home-showcase__chip-group {
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
}

/* DS gap: OrigamAvatarGroup overlaps via this public token (intended DS-first
   usage); the white ring between stacked avatars has no dedicated prop. */
.home-showcase__avatar-group {
    --origam-avatar-group__item---margin-inline-start: -8px;
    --origam-avatar---box-shadow: 0 0 0 2px var(--origam-color__surface---raised, #fafafa);
    margin-block-start: var(--origam-space---2, 0.5rem);
}

@media (max-width: 48rem) {
    .home-showcase {
        padding-inline: var(--origam-space---6, 1.5rem);
    }
}
</style>
