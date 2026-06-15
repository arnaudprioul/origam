<script setup lang="ts">
import { useT } from '~/composables/useT'
import {
    PLAYGROUND_FRAME_RADIUS,
    PLAYGROUND_FRAME_VARS,
    PLAYGROUND_PREVIEW_BTN_VARS,
    PLAYGROUND_PREVIEW_VARS,
    PLAYGROUND_SNIPPET
} from '~/consts/playground.const'

const { t } = useT()
</script>

<template>
    <section
        id="playground"
        class="home-playground"
        aria-labelledby="playground-heading"
    >
        <header class="home-playground__intro">
            <p class="home-playground__eyebrow">
                {{ t('home.playground.eyebrow', 'LIVE PLAYGROUND') }}
            </p>

            <origam-title
                id="playground-heading"
                tag="h2"
                class="home-playground__title"
            >
                {{ t('home.playground.title', 'Try before you ship.') }}
            </origam-title>
        </header>

        <figure class="home-playground__window">
            <origam-sheet
                tag="div"
                :rounded="PLAYGROUND_FRAME_RADIUS"
                :style="PLAYGROUND_FRAME_VARS"
                border
                border-color="var(--origam-color__border---default)"
                class="home-playground__frame"
            >
                <div
                    class="home-playground__toolbar"
                    role="toolbar"
                    aria-label="Editor toolbar"
                >
                    <span
                        class="home-playground__traffic"
                        aria-hidden="true"
                    >
                        <span class="home-playground__dot home-playground__dot--red" />
                        <span class="home-playground__dot home-playground__dot--yellow" />
                        <span class="home-playground__dot home-playground__dot--green" />
                    </span>

                    <span class="home-playground__tab">
                        {{ t('home.playground.file', 'App.vue') }}
                    </span>
                </div>

                <div class="home-playground__panes">
                    <origam-code
                        :code="PLAYGROUND_SNIPPET"
                        lang="vue"
                        line-numbers
                        :copyable="false"
                        class="home-playground__code"
                        data-cy="playground-code"
                    />

                    <div class="home-playground__preview">
                        <origam-card
                            tag="div"
                            rounded="lg"
                            border
                            border-color="var(--origam-color__border---default)"
                            :style="PLAYGROUND_PREVIEW_VARS"
                            class="home-playground__preview-card"
                            data-cy="playground-preview"
                        >
                            <origam-title
                                tag="h3"
                                class="home-playground__preview-title"
                                :text="t('home.playground.preview_title', 'Hello Origam')"
                            />
                            <p class="home-playground__preview-text">
                                {{ t('home.playground.preview_text', 'The Vue 3 design system that just works. Try a component live.') }}
                            </p>
                            <origam-btn
                                color="primary"
                                append-icon="mdi-arrow-right"
                                class="home-playground__preview-btn"
                                :style="PLAYGROUND_PREVIEW_BTN_VARS"
                            >
                                {{ t('home.playground.preview_cta', 'Get started') }}
                            </origam-btn>
                        </origam-card>
                    </div>
                </div>
            </origam-sheet>
        </figure>

        <figcaption class="home-playground__caption">
            {{ t('home.playground.caption', 'The Vue 3 design system that just works. Try a component live.') }}
        </figcaption>
    </section>
</template>

<style scoped>
.home-playground {
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    max-width: 72rem;
    margin-inline: auto;
    width: 100%;
    box-sizing: border-box;
}

.home-playground__intro {
    text-align: center;
    margin-block-end: var(--origam-space---12, 3rem);
}

/* DS gap: no DS prop sets text-transform / wide tracking on a bare <p>.
   Colour is the sobre action-primary fgSubtle token (purple), zero CSS. */
.home-playground__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);

    text-transform: uppercase;
    letter-spacing: 0.06em;
}

/* DS gap: section display size/tracking exceed OrigamTitle's token scale
   (max 3xl). Consumes the marketing display tokens, like the Hero H1. */
.home-playground__title {
    margin: 0;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    line-height: 1;
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-playground__window {
    margin: 0;
}

/* DS gap: OrigamSheet defaults to display:block with no overflow clip; the
   editor frame needs to clip the toolbar/REPL to the rounded corners. */
.home-playground__frame {
    overflow: hidden;
}

/* DS gap: no DS toolbar component — the chrome bar surface comes from the
   sobre overlay token; the bottom rule from the sobre border token. */
.home-playground__toolbar {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    background-color: var(--origam-color__surface---overlay, #f5f5f5);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.home-playground__traffic {
    display: flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
    flex-shrink: 0;
}

/* Traffic-light dots: macOS SYSTEM colours (red/amber/green), intentionally
   NOT tokenised — they are a brand-of-macOS decorative motif, not part of the
   origam palette. Documented exception (REBUILD-PLAN §2.4). */
.home-playground__dot {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.home-playground__dot--red    { background-color: #FF5F57; }
.home-playground__dot--yellow { background-color: #FFBC2E; }
.home-playground__dot--green  { background-color: #28C840; }

.home-playground__tab {
    flex: 1;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---secondary, #525252);
    font-family: var(--origam-font__family---mono, ui-monospace, monospace);
}

/* Two-pane split: code (left) | live preview (right), like the maquette.
   No DS prop lays out a split editor — CSS grid, divider is the sobre border. */
.home-playground__panes {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    min-block-size: 320px;
}

/* OrigamCode fills the left pane flush (the frame owns the rounding/clip);
   surface/colours come from the theme. */
.home-playground__code {
    --origam-code---border-radius: 0;
    --origam-code---border-width: 0;
    border-inline-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    overflow: hidden;
    font-size: var(--origam-font-size---sm, 0.875rem);
}

/* DS gap: no DS token paints a dotted-grid preview backdrop. 16px dot grid,
   theme-aware via the sobre subtle-border token. */
.home-playground__preview {
    display: grid;
    place-items: center;
    padding: var(--origam-space---8, 2.5rem);
    background-color: var(--origam-color__surface---raised, #fafafa);
    background-image: radial-gradient(var(--origam-color__border---default, rgba(0, 0, 0, 0.08)) 1.5px, transparent 1.5px);
    background-size: 18px 18px;
}

.home-playground__preview-card {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    align-items: flex-start;
    max-inline-size: 22rem;
    padding: var(--origam-space---6, 1.5rem);
}

.home-playground__preview-title {
    --origam-title---font-size: var(--origam-font-size---xl, 1.25rem);
    --origam-title---font-weight: 700;
    margin: 0;
}

.home-playground__preview-text {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.5;
    color: var(--origam-color__text---secondary, #525252);
}

.home-playground__preview-btn {
    margin-block-start: var(--origam-space---2, 0.5rem);
}

@media (max-width: 800px) {
    .home-playground__panes {
        grid-template-columns: 1fr;
    }

    .home-playground__code {
        border-inline-end: 0;
        border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    }
}

.home-playground__caption {
    display: block;
    margin-block-start: var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    text-align: center;
}
</style>
