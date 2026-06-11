<script setup lang="ts">
import { useT } from '~/composables/useT'
import {
    PLAYGROUND_FRAME_VARS,
    PLAYGROUND_OPEN_PILL_VARS,
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
                tag="h2"
                class="home-playground__title"
            >
                <span id="playground-heading">{{ t('home.playground.title', 'Try before you ship.') }}</span>
            </origam-title>
        </header>

        <figure class="home-playground__window">
            <origam-sheet
                tag="div"
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

                    <span class="home-playground__actions">
                        <origam-btn
                            variant="text"
                            size="small"
                            density="compact"
                            aria-label="share"
                            data-cy="playground-btn-share"
                        >
                            {{ t('home.playground.share', 'SHARE') }}
                        </origam-btn>

                        <origam-chip
                            :style="PLAYGROUND_OPEN_PILL_VARS"
                            color="primary"
                            border
                            border-color="var(--origam-color__action--primary---bg)"
                            pill
                            size="small"
                            tag="button"
                            aria-label="open in new tab"
                            data-cy="playground-btn-open"
                        >
                            {{ t('home.playground.open', 'OPEN') }}
                        </origam-chip>
                    </span>
                </div>

                <client-only>
                    <nuxt-error-boundary>
                        <home-playground-editor />

                        <template #error>
                            <origam-code
                                :code="PLAYGROUND_SNIPPET"
                                lang="vue"
                                class="home-playground__static"
                                data-cy="playground-static"
                            />
                        </template>
                    </nuxt-error-boundary>

                    <template #fallback>
                        <origam-code
                            :code="PLAYGROUND_SNIPPET"
                            lang="vue"
                            class="home-playground__static"
                            data-cy="playground-fallback"
                        />
                    </template>
                </client-only>
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
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---primary, #0a0a0a);
    font-family: var(--origam-font__family---mono, ui-monospace, monospace);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---2, 0.5rem);
    border-block-start: 2px solid var(--origam-color__action--primary---bg, #7C3AED);
    background-color: var(--origam-color__surface---raised, #fafafa);
    border-radius: 0 0 var(--origam-radius---sm, 6px) var(--origam-radius---sm, 6px);
    align-self: stretch;
    display: flex;
    align-items: center;
}

.home-playground__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    flex-shrink: 0;
}

/* DS gap: OrigamCode default font-size follows its own token; the static
   fallback aligns to the editor height. Surface/colours come from the theme. */
.home-playground__static {
    max-height: 480px;
    overflow: auto;
}

.home-playground__caption {
    display: block;
    margin-block-start: var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    text-align: center;
}
</style>
