<script setup lang="ts">
import { useT } from '~/composables/useT'
import {
    THEMES_GRID_COLUMNS,
    THEMES_TILE_VARS,
    THEMES_TOOLING_PILLS,
    THEMES_TOOLING_VARS,
    THEME_CHIPS,
    THEME_PREVIEW_TILES
} from '~/consts/themes-showcase.const'

const { t } = useT()
</script>

<template>
    <section
        class="home-themes"
        aria-labelledby="themes-title"
    >
        <origam-grid
            :columns="THEMES_GRID_COLUMNS"
            gap="xl"
            align-items="center"
            class="home-themes__grid"
        >
            <origam-grid-item
                tag="div"
                class="home-themes__text-col"
            >
                <p class="home-themes__eyebrow">
                    {{ t('home.themes.eyebrow', 'THEMING') }}
                </p>

                <origam-title
                    tag="h2"
                    class="home-themes__title"
                >
                    <span id="themes-title">{{ t('home.themes.title', 'One design system. Every brand.') }}</span>
                </origam-title>

                <client-only>
                    <origam-chip-group class="home-themes__chips">
                        <origam-chip
                            v-for="chip in THEME_CHIPS"
                            :key="chip.key"
                            color="primary"
                            pill
                            size="small"
                            :data-cy="`themes-chip-${chip.key}`"
                        >
                            {{ t(chip.labelKey, chip.labelFallback) }}
                        </origam-chip>
                    </origam-chip-group>
                </client-only>

                <client-only>
                    <origam-chip-group class="home-themes__tooling">
                        <origam-chip
                            v-for="pill in THEMES_TOOLING_PILLS"
                            :key="pill.key"
                            :style="THEMES_TOOLING_VARS"
                            color="neutral"
                            border
                            border-color="var(--origam-color__border---ghost)"
                            pill
                            size="small"
                            class="home-themes__tooling-pill"
                            :data-cy="`themes-tooling-${pill.key}`"
                        >
                            {{ t(pill.labelKey, pill.labelFallback) }}
                        </origam-chip>
                    </origam-chip-group>
                </client-only>
            </origam-grid-item>

            <origam-grid-item
                tag="div"
                class="home-themes__previews-col"
            >
                <origam-grid
                    tag="ul"
                    :columns="2"
                    gap="sm"
                    aria-label="Theme preview tiles"
                    class="home-themes__previews"
                >
                    <origam-grid-item
                        v-for="tile in THEME_PREVIEW_TILES"
                        :key="tile.key"
                        tag="li"
                        class="home-themes__preview-item"
                        :data-cy="`themes-preview-${tile.key}`"
                    >
                        <origam-theme-provider
                            :theme="tile.theme"
                            :mode="tile.mode"
                        >
                            <origam-sheet
                                :data-cy="`themes-tile-surface-${tile.key}`"
                                :style="THEMES_TILE_VARS"
                                tag="article"
                                border
                                border-color="var(--origam-color__border---ghost)"
                                class="home-themes__preview-tile"
                            >
                                <figure class="home-themes__preview-figure">
                                    <figcaption class="home-themes__preview-label">
                                        {{ t(tile.labelKey, tile.labelFallback) }}
                                    </figcaption>

                                    <div class="home-themes__preview-content">
                                        <origam-btn
                                            color="primary"
                                            size="small"
                                            data-cy="themes-tile-button"
                                        >
                                            {{ t('home.themes.previewButton', 'Button') }}
                                        </origam-btn>

                                        <origam-chip
                                            :style="THEMES_TOOLING_VARS"
                                            color="neutral"
                                            border
                                            border-color="var(--origam-color__border---ghost)"
                                            pill
                                            size="x-small"
                                        >
                                            {{ t('home.themes.previewJson', '.json') }}
                                        </origam-chip>
                                    </div>
                                </figure>
                            </origam-sheet>
                        </origam-theme-provider>
                    </origam-grid-item>
                </origam-grid>
            </origam-grid-item>
        </origam-grid>
    </section>
</template>

<style scoped>
.home-themes {
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---14, 3.5rem);
    max-width: var(--origam-layout---max-width, 80rem);
    margin-inline: auto;
}

.home-themes__text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--origam-space---6, 1.5rem);
}

/* DS gap: no DS prop sets text-transform / wide tracking on a bare <p>.
   Colour is the sobre action-primary fgSubtle token (purple), zero CSS. */
.home-themes__eyebrow {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);

    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* DS gap: section display size/tracking exceed OrigamTitle's token scale
   (max 3xl). Consumes the marketing display tokens, like the Hero H1. */
.home-themes__title {
    margin: 0;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.1;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-themes__chips,
.home-themes__tooling {
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
}

/* DS gap: OrigamChip exposes no font-family prop/var — the tooling pills are
   mono per the maquette. Targets the chip label via the marketing mono token. */
.home-themes__tooling-pill {
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', monospace);
}

.home-themes__previews {
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-themes__preview-item {
    list-style: none;
}

/* DS gap: aspect-ratio is a CSS-first sizing primitive with no DS prop. The
   tile SURFACE (bg) is NOT set here — it comes from each tile's theme via
   OrigamThemeProvider (--origam-color__surface---default of that theme). */
.home-themes__preview-tile {
    aspect-ratio: 1 / 1;
    padding: var(--origam-space---4, 1rem);
    overflow: hidden;
}

.home-themes__preview-figure {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    margin: 0;
    height: 100%;
}

.home-themes__preview-label {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.04em;
    color: var(--origam-color__text---secondary, #525252);

    font-family: var(--origam-font__family---mono, 'JetBrains Mono', monospace);
}

.home-themes__preview-content {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    flex-wrap: wrap;
}

@media (max-width: 40rem) {
    .home-themes {
        padding-inline: var(--origam-space---6, 1.5rem);
    }

    .home-themes__title {
        font-size: clamp(1.75rem, 8vw, 3rem);
    }
}
</style>
