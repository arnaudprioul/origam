<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'origam/composables'
import { useT } from '~/composables/useT'
import {
    THEMES_GRID_COLUMNS,
    THEMES_TILE_RADIUS,
    THEMES_TOOLING_TEXT,
    THEME_CHIPS,
    THEME_PREVIEW_TILES
} from '~/consts/themes-showcase.const'

const { t } = useT()
const { theme, setTheme } = useTheme()

const tileStyle = computed(() => (tile: typeof THEME_PREVIEW_TILES[number]) => {
    const vars: Record<string, string> = {}
    if (tile.surfaceColor) vars['--themes-tile--surface'] = tile.surfaceColor
    if (tile.btnBgColor) vars['--themes-tile--btn-bg'] = tile.btnBgColor
    if (tile.barColors) {
        vars['--themes-tile--bar-dark'] = tile.barColors[0]
        vars['--themes-tile--bar-light'] = tile.barColors[1]
    }
    return vars
})
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
                    id="themes-title"
                    tag="h2"
                    class="home-themes__title"
                >
                    <span class="home-themes__title-line">{{ t('home.themes.title_line1', 'One design system.') }}</span>
                    <span class="home-themes__title-line">{{ t('home.themes.title_line2', 'Every brand.') }}</span>
                </origam-title>

                <p class="home-themes__subtitle">
                    {{ t('home.themes.subtitle', 'DTCG-compliant design tokens, multi-theme out of the box. Switch between light, dark or your custom brand at runtime — zero remount, zero flicker.') }}
                </p>

                <ul
                    class="home-themes__chips"
                    :aria-label="t('a11y.themes_chips_list', 'Available themes')"
                >
                    <li
                        v-for="chip in THEME_CHIPS"
                        :key="chip.key"
                        class="home-themes__chip-item"
                    >
                        <button
                            type="button"
                            class="home-themes__chip"
                            :aria-pressed="chip.key === theme"
                            :data-active="chip.key === theme"
                            :data-cy="`themes-chip-${chip.key}`"
                            @click="setTheme(chip.key)"
                        >
                            {{ t(chip.labelKey, chip.labelFallback) }}
                        </button>
                    </li>
                </ul>

                <p
                    class="home-themes__tooling"
                    aria-label="Tooling compatibility"
                >
                    <span
                        v-for="(pill, index) in THEMES_TOOLING_TEXT"
                        :key="pill.key"
                        class="home-themes__tooling-item"
                    >
                        <span v-if="index > 0" aria-hidden="true" class="home-themes__tooling-sep">·</span>
                        {{ t(pill.labelKey, pill.labelFallback) }}
                    </span>
                </p>
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
                                :rounded="THEMES_TILE_RADIUS"
                                tag="article"
                                border
                                border-color="var(--origam-color__border---ghost)"
                                class="home-themes__preview-tile"
                                :style="tileStyle(tile)"
                            >
                                <figure class="home-themes__preview-figure">
                                    <figcaption class="home-themes__preview-label">
                                        {{ t(tile.labelKey, tile.labelFallback) }}
                                    </figcaption>

                                    <div
                                        class="home-themes__skeleton"
                                        aria-hidden="true"
                                    >
                                        <span class="home-themes__skeleton-bar home-themes__skeleton-bar--long" />
                                        <span class="home-themes__skeleton-bar home-themes__skeleton-bar--short" />
                                    </div>

                                    <div class="home-themes__preview-footer">
                                        <origam-btn
                                            color="primary"
                                            size="small"
                                            class="home-themes__preview-btn"
                                            :style="tile.btnBgColor ? {
                                                '--origam-btn---background-color': tile.btnBgColor,
                                                '--origam-btn--hover---background-color': tile.btnBgColor,
                                                '--origam-btn--active---background-color': tile.btnBgColor
                                            } : {}"
                                            data-cy="themes-tile-button"
                                        >
                                            {{ t('home.themes.preview_button', 'Button') }}
                                        </origam-btn>
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
    width: 100%;
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---14, 3.5rem);
    box-sizing: border-box;
}

.home-themes__text-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--origam-space---6, 1.5rem);
}

.home-themes__eyebrow {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.home-themes__title {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.05;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-themes__subtitle {
    margin: 0;
    max-inline-size: 34rem;
    font-size: var(--origam-font-size---base, 1rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
}

.home-themes__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-themes__chip-item {
    list-style: none;
}

.home-themes__chip {
    display: inline-flex;
    align-items: center;
    padding-block: var(--origam-space---1, 0.25rem);
    padding-inline: var(--origam-space---3, 0.75rem);
    border-radius: 999px;
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.12));
    background-color: var(--origam-color__surface---default, #ffffff);
    color: var(--origam-color__text---secondary, #525252);
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-family: inherit;
    font-weight: 500;
    line-height: 1.4;
    cursor: pointer;
    transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.home-themes__chip:hover {
    background-color: var(--origam-color__surface---raised, rgba(0, 0, 0, 0.04));
    border-color: var(--origam-color__border---strong, rgba(0, 0, 0, 0.24));
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-themes__chip:focus-visible {
    outline: 2px solid var(--origam-color__action--primary---bg, #7c3aed);
    outline-offset: 2px;
}

.home-themes__chip[data-active="true"],
.home-themes__chip[aria-pressed="true"] {
    background-color: var(--origam-color__action--primary---bg, #7c3aed);
    border-color: var(--origam-color__action--primary---bg, #7c3aed);
    color: var(--origam-color__action--primary---fg, #ffffff);
}

.home-themes__tooling {
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', monospace);
    color: var(--origam-color__text---tertiary, #737373);
}

.home-themes__tooling-sep {
    color: var(--origam-color__text---tertiary, #737373);
    user-select: none;
}

.home-themes__previews {
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-themes__preview-item {
    list-style: none;
}

.home-themes__preview-tile {
    padding: var(--origam-space---4, 1rem);
    overflow: hidden;
    background-color: var(--themes-tile--surface, var(--origam-color__surface---default));
}

.home-themes__preview-figure {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    margin: 0;
}

.home-themes__preview-label {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.04em;
    color: var(--origam-color__text---secondary, #525252);
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', monospace);
}

.home-themes__skeleton {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
}

.home-themes__skeleton-bar {
    display: block;
    height: 10px;
    border-radius: var(--origam-radius---sm, 4px);
    background-color: var(--themes-tile--bar-dark, var(--origam-color__neutral---300, #d4d4d4));
}

.home-themes__skeleton-bar--long {
    width: 100%;
}

.home-themes__skeleton-bar--short {
    width: 72%;
    background-color: var(--themes-tile--bar-light, var(--origam-color__neutral---200, #e5e5e5));
}

.home-themes__preview-footer {
    display: flex;
    align-items: center;
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
