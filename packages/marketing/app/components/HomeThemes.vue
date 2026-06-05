<script setup lang="ts">
import { useT } from '~/composables/useT'
import { THEME_CHIPS, THEME_PREVIEW_TILES } from '~/consts/themes-showcase.const'

const { t } = useT()
</script>

<template>
    <section
        class="home-themes"
        aria-labelledby="themes-title"
    >
        <div class="home-themes__text-col">
            <p class="home-themes__eyebrow">
                {{ t('home.themes.eyebrow', 'THEMING') }}
            </p>

            <h2
                id="themes-title"
                class="home-themes__title"
            >
                {{ t('home.themes.title', 'One design system. Every brand.') }}
            </h2>

            <OrigamChipGroup class="home-themes__chips">
                <OrigamChip
                    v-for="chip in THEME_CHIPS"
                    :key="chip.key"
                    :data-cy="`themes-chip-${chip.key}`"
                >
                    {{ t(chip.labelKey, chip.labelFallback) }}
                </OrigamChip>
            </OrigamChipGroup>

            <ul class="home-themes__tooling">
                <li
                    class="home-themes__tooling-item"
                    data-cy="themes-tooling-tokens-studio"
                >
                    {{ t('home.themes.tokensStudio', 'tokens.studio compatible') }}
                </li>
                <li
                    class="home-themes__tooling-item"
                    data-cy="themes-tooling-style-dictionary"
                >
                    {{ t('home.themes.styleDictionary', 'Style Dictionary v4') }}
                </li>
            </ul>
        </div>

        <ul class="home-themes__previews">
            <li
                v-for="tile in THEME_PREVIEW_TILES"
                :key="tile.key"
                class="home-themes__preview-item"
                :data-cy="`themes-preview-${tile.key}`"
            >
                <OrigamThemeProvider :mode="tile.mode">
                    <OrigamSheet
                        class="home-themes__preview-tile"
                        :class="`home-themes__preview-tile--${tile.key}`"
                        tag="article"
                    >
                        <figure class="home-themes__preview-figure">
                            <figcaption class="home-themes__preview-label">
                                {{ t(tile.labelKey, tile.labelFallback) }}
                            </figcaption>
                            <div class="home-themes__preview-content">
                                <OrigamBtn
                                    class="home-themes__preview-btn"
                                    color="primary"
                                    size="small"
                                >
                                    {{ t('home.themes.previewButton', 'Button') }}
                                </OrigamBtn>
                                <span
                                    class="home-themes__preview-json"
                                    aria-label=".json token file"
                                >
                                    {{ t('home.themes.previewJson', '.json') }}
                                </span>
                            </div>
                        </figure>
                    </OrigamSheet>
                </OrigamThemeProvider>
            </li>
        </ul>
    </section>
</template>

<style scoped>
/* ── Section racine — 2 colonnes desktop 608 / 608 gap 64px ── */
.home-themes {
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---14, 3.5rem);
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--origam-space---12, 3rem);
    align-items: start;
}

@media (min-width: 80rem) {
    .home-themes {
        grid-template-columns: 608px 608px;
        gap: var(--origam-space---16, 4rem);
        max-width: calc(608px + 608px + var(--origam-space---16, 4rem) + (var(--origam-space---14, 3.5rem) * 2));
        margin-inline: auto;
    }
}

/* ── Colonne texte gauche ── */
.home-themes__text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--origam-space---6, 1.5rem);
    justify-content: center;
}

/* ── Eyebrow : violet primaire, 12px, semibold, uppercase ── */
.home-themes__eyebrow {
    margin: 0;
    font-size: 0.75rem;
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

/* ── H2 : 44px maquette → --origam-font-size---section (3rem) est le token
         le plus proche déclaré. Letter-spacing tight -0.03em. ── */
.home-themes__title {
    margin: 0;
    font-size: var(--origam-font-size---section, 2.75rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.1;
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ── ChipGroup : alignement gauche dans la colonne texte ── */
.home-themes__chips {
    width: 100%;
}

/* ── Tooling pills : fond transparent, border ghost, mono ── */
.home-themes__tooling {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
}

.home-themes__tooling-item {
    font-size: 0.8125rem;
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', monospace);
    color: var(--origam-color__text---secondary, #525252);
    background-color: transparent;
    border: 1px solid var(--origam-color__border---ghost, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---full, 9999px);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---3, 0.75rem);
}

/* ── Grille preview droite : 2×2, tuiles 298×298, gap 12px ── */
.home-themes__previews {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--origam-space---3, 0.75rem);
}

.home-themes__preview-item {
    display: contents;
}

/* ── Tuile commune ── */
.home-themes__preview-tile {
    aspect-ratio: 1 / 1;
    padding: var(--origam-space---4, 1rem);
    border-radius: var(--origam-radius---card, 10px) !important;
    border: 1px solid var(--origam-color__border---ghost, rgba(0, 0, 0, 0.08));
    box-shadow: var(--origam-shadow---card-elevated);
    overflow: hidden;
}

/* ── Tuile light ── */
.home-themes__preview-tile--light {
    background-color: var(--origam-color__surface---default, #ffffff);
    color: var(--origam-color__text---primary, #0a0a0a);
}

/*
 * Tuile dark — fond #0A0A0A est la valeur exacte de la maquette Sobre.
 * Aucun token DS sémantique ne couvre un fond quasi-noir indépendant de
 * data-mode, donc on expose une CSS var locale surchargeable.
 * PIXEL-SPEC §7 : "Preview dark.json tile | fond rgb(10,10,10) = #0A0A0A".
 */
.home-themes__preview-tile--dark {
    background-color: var(--home-themes-tile-dark-bg, var(--origam-color__text---primary, #0a0a0a));
    color: var(--home-themes-tile-dark-fg, #f9fafb);
}

/*
 * Tuile brand-a — fond beige crème maquette.
 * PIXEL-SPEC §7 : "Preview brand-a.json tile | fond beige/crème ~#FFF8E7 | Aucun token → Custom inline".
 */
.home-themes__preview-tile--brand-a {
    background-color: var(--home-themes-tile-brand-a-bg, #fff8e7);
    color: var(--origam-color__text---primary, #0a0a0a);
}

/*
 * Tuile brand-b — fond vert clair maquette.
 * PIXEL-SPEC §7 : "Preview brand-b.json tile | fond vert clair ~#F0FAF5 | Aucun token → Custom inline".
 */
.home-themes__preview-tile--brand-b {
    background-color: var(--home-themes-tile-brand-b-bg, #f0faf5);
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ── Contenu intérieur tuile ── */
.home-themes__preview-figure {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    margin: 0;
    height: 100%;
}

.home-themes__preview-label {
    font-size: 0.6875rem;
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.04em;
    text-transform: lowercase;
    color: var(--origam-color__text---secondary, #525252);
}

.home-themes__preview-content {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    flex-wrap: wrap;
}

.home-themes__preview-json {
    font-size: 0.6875rem;
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', monospace);
    color: var(--origam-color__text---secondary, #525252);
}
</style>
