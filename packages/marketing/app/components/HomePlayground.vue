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

        <figure class="home-playground__editor-figure">
            <OrigamCard
                class="home-playground__card"
                flat
                border
                rounded
            >
                <template #header>
                    <div class="home-playground__toolbar">
                        <span class="home-playground__tab">
                            {{ t('home.playground.file', 'App.vue') }}
                        </span>

                        <div class="home-playground__actions">
                            <OrigamBtn
                                variant="text"
                                size="small"
                                density="compact"
                                aria-label="share"
                                data-cy="playground-btn-share"
                            >
                                {{ t('home.playground.share', 'SHARE') }}
                            </OrigamBtn>

                            <OrigamBtn
                                variant="text"
                                size="small"
                                density="compact"
                                aria-label="open in new tab"
                                data-cy="playground-btn-open"
                            >
                                {{ t('home.playground.open', 'OPEN') }}
                            </OrigamBtn>
                        </div>
                    </div>
                </template>

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
            </OrigamCard>

            <figcaption class="home-playground__caption">
                {{ t('home.playground.caption', 'The Vue 3 design system that just works. Try a component live.') }}
            </figcaption>
        </figure>
    </section>
</template>

<style scoped>
.home-playground {
    padding: var(--origam-space---16, 6rem) var(--origam-space---6, 1.5rem);
    max-width: 72rem;
    margin-inline: auto;
    width: 100%;
    box-sizing: border-box;
}

.home-playground__intro {
    margin-block-end: var(--origam-space---8, 2rem);
}

.home-playground__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font-weight---semibold, 600);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--origam-color__text---secondary, #6b7280);
}

.home-playground__title {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: var(--origam-font-weight---bold, 700);
    line-height: 1.2;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-playground__editor-figure {
    margin: 0;
}

.home-playground__card {
    overflow: hidden;
}

.home-playground__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    border-block-end: 1px solid var(--origam-color__border---default, #e5e7eb);
    background-color: var(--origam-color__surface---subtle, #f9fafb);
}

.home-playground__tab {
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: var(--origam-font-weight---medium, 500);
    color: var(--origam-color__text---primary, #0a0a0a);
    font-family: var(--origam-font__family---mono, ui-monospace, monospace);
}

.home-playground__actions {
    display: flex;
    gap: var(--origam-space---2, 0.5rem);
}

.home-playground__skeleton {
    height: 480px;
    width: 100%;
    background: linear-gradient(
        90deg,
        var(--origam-color__surface---subtle, #f3f4f6) 25%,
        var(--origam-color__surface---muted, #e5e7eb) 50%,
        var(--origam-color__surface---subtle, #f3f4f6) 75%
    );
    background-size: 200% 100%;
    animation: playground-shimmer 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
    .home-playground__skeleton {
        animation: none;
        background: var(--origam-color__surface---subtle, #f3f4f6);
    }
}

@keyframes playground-shimmer {
    0% { background-position: 200% 0; }
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
    background-color: var(--origam-color__surface---subtle, #f9fafb);
}

.home-playground__caption {
    margin-block-start: var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #6b7280);
    text-align: center;
}
</style>
