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
    { modelValue: true,  inset: true,  flat: false },
    { modelValue: true,  inset: false, flat: false },
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
                            pill
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
/* ── Section ──────────────────────────────────────────────── */
.home-showcase {
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    max-width: var(--origam-container---max-width, 78rem);
    margin-inline: auto;
}

/* ── Header row ───────────────────────────────────────────── */
.home-showcase__header {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    margin-block-end: var(--origam-space---8, 2rem);
}

/* ── Eyebrow ──────────────────────────────────────────────── */
.home-showcase__eyebrow {
    width: 100%;
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: var(--origam-letter-spacing---wide, 0.08em);
    text-transform: uppercase;
    /* #6D28D9 = --m-accent-soft / --origam-color__action--primary---fgSubtle */
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

/* ── H2 ───────────────────────────────────────────────────── */
.home-showcase__title {
    flex: 1;
    margin: 0;
    /* 48px maquette — token --origam-font-size---3xl aliased to 3rem in Features */
    font-size: var(--origam-font-size---3xl, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    /* -1.44px ≈ -0.03em on 48px — matches --m-h2-tracking */
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: var(--origam-line-height---tight, 1.1);
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ── View all link ────────────────────────────────────────── */
.home-showcase__view-all {
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---regular, 400);
    color: var(--origam-color__text---primary, #0a0a0a);
    text-decoration: none;
    /* maquette : pas de border-bottom underline */
    transition: opacity 0.15s ease;
}

.home-showcase__view-all:hover {
    opacity: 0.6;
}

.home-showcase__view-all:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
    border-radius: var(--origam-radius---sm, 6px);
}

/* ── Asymmetric grid 624 | 312 | 312 ─────────────────────── */
/*
 * Maquette : 624px (table, grande colonne) + 312px + 312px
 * gap 16px = --origam-space---4
 * On utilise des fractions 2:1:1 dans un conteneur 1248px max
 * pour reproduire le rapport 624/312/312 de façon responsive.
 */
.home-showcase__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: var(--origam-space---4, 1rem);
}

/* DataTable = pleine hauteur colonne gauche, couvre 2 lignes */
.home-showcase__item--table {
    grid-column: 1;
    grid-row: 1 / 3;
}

/* Colonne droite : Chart (ligne 1) + Switch (ligne 2) */
.home-showcase__item--chart {
    grid-column: 2;
    grid-row: 1;
}

.home-showcase__item--switch {
    grid-column: 2;
    grid-row: 2;
}

/* Colonne droite extrême : Chips (ligne 1) + Avatars (ligne 2) */
.home-showcase__item--chips {
    grid-column: 3;
    grid-row: 1;
}

.home-showcase__item--avatars {
    grid-column: 3;
    grid-row: 2;
}

/* Mobile : empilement mono-colonne */
@media (max-width: 48rem) {
    .home-showcase__grid {
        grid-template-columns: 1fr;
    }

    .home-showcase__item--table,
    .home-showcase__item--chart,
    .home-showcase__item--switch,
    .home-showcase__item--chips,
    .home-showcase__item--avatars {
        grid-column: 1;
        grid-row: auto;
    }
}

/* ── Widget card ──────────────────────────────────────────── */
/*
 * bg     = #FAFAFA  → --origam-color__surface---sunken
 * border = rgba(0,0,0,0.08) → --m-border (pas de token DS exact,
 *          on utilise le fallback direct car --origam-color__border---subtle
 *          vaut rgba(0,0,0,0.04) en Sobre — trop doux)
 * radius = 10px     → --origam-radius---md (= 10px en Sobre)
 * shadow = --m-shadow-card (valeur exacte maquette, déclarée en custom var locale)
 * padding= 24px     → --origam-space---6
 */
.home-showcase__widget {
    --_widget-shadow:
        inset rgba(255, 255, 255, 0.03) 0px 1px 0px,
        rgba(0, 0, 0, 0.6) 0px 8px 24px -16px;

    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
    height: 100%;
    margin: 0;
    padding: var(--origam-space---6, 1.5rem);
    border-radius: var(--origam-radius---md, 10px);
    border: 1px solid rgba(0, 0, 0, 0.08);
    background-color: var(--origam-color__surface---sunken, #fafafa);
    box-shadow: var(--origam-shadow---card-maquette, var(--_widget-shadow));
    box-sizing: border-box;
}

/* ── Widget label (title + caption) ──────────────────────── */
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

/* ── Native table ─────────────────────────────────────────── */
.home-showcase__table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-showcase__table-head {
    background-color: transparent;
}

.home-showcase__th {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    text-align: start;
    font-weight: var(--origam-font__weight---semibold, 600);
    font-size: var(--origam-font-size---xs, 0.75rem);
    letter-spacing: var(--origam-letter-spacing---wide, 0.08em);
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #525252);
    border-block-end: 1px solid rgba(0, 0, 0, 0.08);
    white-space: nowrap;
}

.home-showcase__tr {
    border-block-end: 1px solid rgba(0, 0, 0, 0.06);
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

/* ── Sparkline — pleine largeur ───────────────────────────── */
/*
 * On retire la taille fixe width/height du composant et on laisse
 * le CSS étirer la figure à 100% de la cellule widget.
 * Le composant DS utilise preserveAspectRatio="none" + width/height
 * CSS → on surcharge via CSS scoped.
 */
.home-showcase__sparkline {
    width: 100% !important;
    height: 80px !important;
    display: block;
    flex: 1;
}

/* ── Switches ─────────────────────────────────────────────── */
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

/* ── Chips ────────────────────────────────────────────────── */
.home-showcase__chip-group {
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
}

/* ── Avatar group — chevauchement ────────────────────────── */
/*
 * On surcharge le token DS qui contrôle la marge inline des items
 * pour créer l'effet de stacking / overlap des avatars.
 * --origam-avatar-group__item---margin-inline-start pilote le gap
 * entre avatars via le composant DS OrigamAvatarGroup.
 */
.home-showcase__avatar-group {
    --origam-avatar-group__item---margin-inline-start: -8px;
    /* Anneau blanc entre avatars superposés */
    --origam-avatar---box-shadow: 0 0 0 2px var(--origam-color__surface---sunken, #fafafa);
    margin-block-start: var(--origam-space---2, 0.5rem);
}
</style>
