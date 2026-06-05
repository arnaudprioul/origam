<script setup lang="ts">
import { useT } from '~/composables/useT'
import { PLAYGROUND_SNIPPET } from '~/consts/playground.const'

const { t } = useT()
</script>

<template>
    <section
        class="home-playground"
        aria-labelledby="playground-heading"
    >
        <header class="home-playground__intro">
            <p class="home-playground__eyebrow">
                {{ t('home.playground.eyebrow', 'LIVE PLAYGROUND') }}
            </p>

            <h2
                id="playground-heading"
                class="home-playground__title"
            >
                {{ t('home.playground.title', 'Try before you ship.') }}
            </h2>
        </header>

        <figure class="home-playground__window">
            <div class="home-playground__toolbar" role="toolbar" aria-label="Editor toolbar">
                <div class="home-playground__traffic" aria-hidden="true">
                    <span class="home-playground__dot home-playground__dot--red" />
                    <span class="home-playground__dot home-playground__dot--yellow" />
                    <span class="home-playground__dot home-playground__dot--green" />
                </div>

                <span class="home-playground__tab">
                    {{ t('home.playground.file', 'App.vue') }}
                </span>

                <div class="home-playground__actions">
                    <OrigamBtn
                        variant="text"
                        size="small"
                        density="compact"
                        class="home-playground__btn-share"
                        aria-label="share"
                        data-cy="playground-btn-share"
                    >
                        {{ t('home.playground.share', 'SHARE') }}
                    </OrigamBtn>

                    <OrigamBtn
                        variant="text"
                        size="small"
                        density="compact"
                        class="home-playground__btn-open"
                        aria-label="open in new tab"
                        data-cy="playground-btn-open"
                    >
                        {{ t('home.playground.open', 'OPEN') }}
                    </OrigamBtn>
                </div>
            </div>

            <ClientOnly>
                <NuxtErrorBoundary>
                    <HomePlaygroundEditor />

                    <template #error>
                        <pre class="home-playground__static"><code>{{ PLAYGROUND_SNIPPET }}</code></pre>
                    </template>
                </NuxtErrorBoundary>

                <template #fallback>
                    <div
                        class="home-playground__skeleton"
                        aria-busy="true"
                        aria-label="Loading editor…"
                        role="status"
                    />
                </template>
            </ClientOnly>
        </figure>

        <figcaption class="home-playground__caption">
            {{ t('home.playground.caption', 'The Vue 3 design system that just works. Try a component live.') }}
        </figcaption>
    </section>
</template>

<style scoped>
/* ─── Section ──────────────────────────────────────────────────────────── */

.home-playground {
    padding: var(--origam-space---24, 6rem) var(--origam-space---6, 1.5rem);
    max-width: 72rem;
    margin-inline: auto;
    width: 100%;
    box-sizing: border-box;
}

/* ─── Intro (eyebrow + h2) centré ──────────────────────────────────────── */

.home-playground__intro {
    text-align: center;
    margin-block-end: var(--origam-space---12, 3rem);
}

.home-playground__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--origam-color__action--primary---fgSubtle, #6D28D9);
}

.home-playground__title {
    margin: 0;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font-weight---bold, 700);
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ─── Fenêtre éditeur (browser chrome maquette) ────────────────────────── */
/*
 * OrigamCard ne peut pas produire radius=14px + shadow card-maquette +
 * border rgba(0,0,0,0.08) simultanément via ses props. On stylise
 * directement la <figure> sémantique — CSS-first, valeurs maquette exactes.
 * Token mapping :
 *   radius 14px         → --origam-radius---card (fallback 14px = --m-radius-lg)
 *   border rgba(0,0,0,.08) → --origam-color__border---subtle-alpha (fallback inline)
 *   shadow              → --origam-shadow---card-elevated (fallback = --m-shadow-card)
 *   bg #FAFAFA          → --origam-color__surface---sunken
 */

.home-playground__window {
    margin: 0;
    background-color: var(--origam-color__surface---sunken, #fafafa);
    border-radius: var(--origam-radius---card, 14px);
    border: 1px solid var(--origam-color__border---subtle-alpha, rgba(0, 0, 0, 0.08));
    box-shadow:
        var(--origam-shadow---card-elevated,
            inset rgba(255, 255, 255, 0.03) 0 1px 0,
            rgba(0, 0, 0, 0.6) 0 8px 24px -16px
        );
    overflow: hidden;
}

/* ─── Toolbar ───────────────────────────────────────────────────────────── */
/*
 * Fond #F5F5F5 = --origam-color__surface---overlay
 * Border-bottom rgba(0,0,0,.08) = même token que le contour fenêtre
 */

.home-playground__toolbar {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    background-color: var(--origam-color__surface---overlay, #f5f5f5);
    border-block-end: 1px solid var(--origam-color__border---subtle-alpha, rgba(0, 0, 0, 0.08));
}

/* Traffic lights macOS — couleurs système spécifiques, sans token origam */

.home-playground__traffic {
    display: flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
    flex-shrink: 0;
}

.home-playground__dot {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.home-playground__dot--red    { background-color: #FF5F57; }
.home-playground__dot--yellow { background-color: #FFBC2E; }
.home-playground__dot--green  { background-color: #28C840; }

/* Tab App.vue — actif avec border-top violet */

.home-playground__tab {
    flex: 1;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---medium, 500);
    color: var(--origam-color__text---primary, #0a0a0a);
    font-family: var(--origam-font__family---mono, ui-monospace, monospace);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---2, 0.5rem);
    border-top: 2px solid var(--origam-color__action--primary---bg, #7C3AED);
    background-color: var(--origam-color__surface---sunken, #fafafa);
    border-radius: 0 0 var(--origam-radius---sm, 4px) var(--origam-radius---sm, 4px);
    align-self: stretch;
    display: flex;
    align-items: center;
}

/* Actions (SHARE / OPEN) */

.home-playground__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    flex-shrink: 0;
}

/*
 * Bouton OPEN — pill violet maquette
 * bg: rgba(124,58,237,0.1) = --origam-color__action--primary---bgSubtle
 * color: #6D28D9            = --origam-color__action--primary---fgSubtle
 * border: #7C3AED           = --origam-color__action--primary---bg
 * radius: 999px             = --origam-radius---pill
 */

.home-playground__btn-open {
    background-color: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.1)) !important;
    color: var(--origam-color__action--primary---fgSubtle, #6D28D9) !important;
    border: 1px solid var(--origam-color__action--primary---bg, #7C3AED) !important;
    border-radius: var(--origam-radius---pill, 999px) !important;
    font-size: var(--origam-font-size---xs, 0.75rem) !important;
}

/* ─── REPL + états ──────────────────────────────────────────────────────── */

.home-playground__skeleton {
    height: 480px;
    width: 100%;
    background: linear-gradient(
        90deg,
        var(--origam-color__surface---sunken, #fafafa) 25%,
        var(--origam-color__surface---overlay, #f5f5f5) 50%,
        var(--origam-color__surface---sunken, #fafafa) 75%
    );
    background-size: 200% 100%;
    animation: playground-shimmer 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
    .home-playground__skeleton {
        animation: none;
        background: var(--origam-color__surface---sunken, #fafafa);
    }
}

@keyframes playground-shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.home-playground__static {
    margin: 0;
    padding: var(--origam-space---4, 1rem);
    overflow: auto;
    max-height: 480px;
    font-family: var(--origam-font__family---mono, ui-monospace, monospace);
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---primary, #0a0a0a);
    background-color: var(--origam-color__surface---sunken, #fafafa);
}

/* ─── Caption ───────────────────────────────────────────────────────────── */

.home-playground__caption {
    display: block;
    margin-block-start: var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    text-align: center;
}
</style>
