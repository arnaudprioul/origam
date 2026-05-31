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
                        :class="tile.isLight ? 'home-themes__preview-tile--light' : 'home-themes__preview-tile--dark'"
                        rounded="large"
                        border
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
    </section>
</template>

<style scoped>
.home-themes {
    padding: var(--origam-space---10, 4rem) var(--origam-space---6, 1.5rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
}

.home-themes__eyebrow {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    letter-spacing: var(--origam-letter-spacing---wide, 0.1em);
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-themes__title {
    margin: 0;
    font-size: var(--origam-font-size---3xl, 2rem);
    font-weight: var(--origam-font-weight---bold, 700);
    text-align: center;
    color: var(--origam-color__text---primary, #0a0a0a);
    line-height: var(--origam-line-height---tight, 1.25);
}

.home-themes__chips {
    justify-content: center;
}

.home-themes__previews {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--origam-space---4, 1rem);
    width: 100%;
    max-width: 48rem;
}

.home-themes__preview-item {
    display: contents;
}

.home-themes__preview-tile {
    width: 100%;
    min-height: 8rem;
    padding: var(--origam-space---4, 1rem);
}

.home-themes__preview-tile--light {
    background-color: var(--origam-color__surface---default, #ffffff);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-themes__preview-tile--dark {
    background-color: var(--origam-color__surface---raised, #1a1a2e);
    color: var(--origam-color__text---on-dark, #f9fafb);
}

.home-themes__preview-figure {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    margin: 0;
}

.home-themes__preview-label {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    letter-spacing: var(--origam-letter-spacing---wide, 0.05em);
    text-transform: lowercase;
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-themes__preview-content {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
}

.home-themes__preview-json {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-family: var(--origam-font-family---mono, monospace);
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-themes__tooling {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--origam-space---4, 1rem);
}

.home-themes__tooling-item {
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #6b7280);
    background-color: var(--origam-color__surface---subtle, #f3f4f6);
    border: 1px solid var(--origam-color__border---subtle, #e5e7eb);
    border-radius: var(--origam-radius---full, 9999px);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---3, 0.75rem);
}

@media (min-width: 48rem) {
    .home-themes__previews {
        grid-template-columns: repeat(4, 1fr);
    }

    .home-themes__title {
        font-size: var(--origam-font-size---4xl, 2.5rem);
    }
}
</style>
