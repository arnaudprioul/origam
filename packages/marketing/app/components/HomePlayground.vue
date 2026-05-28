<script setup lang="ts">
const { t } = useI18nFallback()

const CODE_LINES = [
    { n: 1, parts: [{ cls: 'm-tk-kw', text: '<' + 'script ' }, { cls: 'm-tk-attr', text: 'setup' }, { text: ' ' }, { cls: 'm-tk-attr', text: 'lang' }, { text: '=' }, { cls: 'm-tk-str', text: '"ts"' }, { cls: 'm-tk-kw', text: '>' }] },
    { n: 2, parts: [{ cls: 'm-tk-kw', text: '<' + '/script>' }] },
    { n: 3, parts: [] },
    { n: 4, parts: [{ cls: 'm-tk-kw', text: '<template>' }] },
    { n: 5, parts: [{ text: '  ' }, { cls: 'm-tk-tag', text: '<OrigamCard ' }, { cls: 'm-tk-attr', text: 'elevated' }, { cls: 'm-tk-tag', text: '>' }] },
    { n: 6, parts: [{ text: '    ' }, { cls: 'm-tk-tag', text: '<OrigamTitle>' }, { text: 'Hello Origam' }, { cls: 'm-tk-tag', text: '</OrigamTitle>' }] },
    { n: 7, parts: [{ text: '    ' }, { cls: 'm-tk-tag', text: '<OrigamBtn ' }, { cls: 'm-tk-attr', text: 'color' }, { text: '=' }, { cls: 'm-tk-str', text: '"primary"' }, { cls: 'm-tk-tag', text: '>' }] },
    { n: 8, parts: [{ text: '      Get started' }] },
    { n: 9, parts: [{ text: '    ' }, { cls: 'm-tk-tag', text: '</OrigamBtn>' }] },
    { n: 10, parts: [{ text: '  ' }, { cls: 'm-tk-tag', text: '</OrigamCard>' }] },
    { n: 11, parts: [{ cls: 'm-tk-kw', text: '</template>' }] }
] as const
</script>

<template>
    <section
        class="home-playground"
        aria-labelledby="playground-demo-title"
    >
        <div class="home-playground__inner">
            <header class="home-playground__header">
                <span class="m-section-pre">{{ t('home.playground.eyebrow', 'LIVE PLAYGROUND') }}</span>
                <h2
                    id="playground-demo-title"
                    class="home-playground__title"
                >
                    {{ t('home.playground.title', 'Try before you ship.') }}
                </h2>
            </header>

            <div class="home-playground__window">
                <div class="m-winbar">
                    <MarketingIcon name="window-dots" aria-hidden="true" />
                    <span class="home-playground__winbar-filename">App.vue</span>
                    <div class="home-playground__winbar-actions" aria-hidden="true">
                        <span class="home-playground__winbar-btn">
                            <MarketingIcon name="share" :size="11" aria-hidden="true" />
                            {{ t('home.playground.tabs.share', 'SHARE') }}
                        </span>
                        <span class="home-playground__winbar-btn home-playground__winbar-btn--accent">
                            <MarketingIcon name="external" :size="11" aria-hidden="true" />
                            {{ t('home.playground.tabs.open', 'OPEN') }}
                        </span>
                    </div>
                </div>

                <div class="home-playground__split">
                    <div
                        class="home-playground__code-panel"
                        role="region"
                        :aria-label="t('home.playground.codeRegionLabel', 'Code editor')"
                    >
                        <figure class="home-playground__code-figure">
                            <figcaption class="sr-only">{{ t('home.playground.codeCaption', 'Vue SFC example') }}</figcaption>
                            <pre class="home-playground__pre"><code><span
                                    v-for="line in CODE_LINES"
                                    :key="line.n"
                                    class="m-code-line"
                                ><span class="m-code-line__n" aria-hidden="true">{{ line.n }}</span><span><template
                                            v-for="(part, pi) in line.parts"
                                            :key="pi"
                                        ><span v-if="part.cls" :class="part.cls">{{ part.text }}</span><template v-else>{{ part.text }}</template></template></span>
</span></code></pre>
                        </figure>
                    </div>

                    <div
                        class="home-playground__preview-panel"
                        role="region"
                        :aria-label="t('home.playground.previewRegionLabel', 'Live preview')"
                    >
                        <div class="m-dotgrid home-playground__dotgrid" aria-hidden="true" />
                        <article class="home-playground__preview-card">
                            <h3 class="home-playground__preview-title">
                                {{ t('home.playground.preview.title', 'Hello Origam') }}
                            </h3>
                            <p class="home-playground__preview-body">
                                {{ t('home.playground.preview.body', 'The Vue 3 design system that just works. Try a component live.') }}
                            </p>
                            <OrigamBtn
                                color="primary"
                                variant="flat"
                                rounded="md"
                                append-icon="mdi:arrow-right"
                            >
                                {{ t('home.playground.preview.cta', 'Get started') }}
                            </OrigamBtn>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-playground {
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    position: relative;
}

.home-playground__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---12, 3rem);
}

.home-playground__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
}

.home-playground__title {
    font-size: clamp(2rem, 3.5vw + 0.5rem, 3rem);
    font-weight: var(--m-h2-weight, 700);
    letter-spacing: var(--m-h2-tracking, -0.03em);
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    margin: 0;
}

.home-playground__window {
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    border-radius: var(--m-radius-lg, var(--origam-radius---xl, 14px));
    overflow: hidden;
    box-shadow: var(--m-shadow-elev, 0 24px 64px -16px rgba(0, 0, 0, 0.5));
    background: var(--m-surface, var(--origam-color__surface---raised, #0E0E0E));
}

.home-playground__winbar-filename {
    margin-inline-start: var(--origam-space---3, 0.75rem);
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    font-size: 11px;
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
}

.home-playground__winbar-actions {
    display: flex;
    gap: var(--origam-space---2, 0.5rem);
    margin-inline-start: auto;
}

.home-playground__winbar-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    border-radius: var(--m-radius-sm, var(--origam-radius---sm, 6px));
    background: var(--m-surface, var(--origam-color__surface---raised, #0E0E0E));
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    font-size: 10px;
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    letter-spacing: 0.04em;
}

.home-playground__winbar-btn--accent {
    background: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 14%, transparent));
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #A78BFA));
    border-color: var(--m-accent-border, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 30%, transparent));
}

.home-playground__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 380px;
}

.home-playground__code-panel {
    border-inline-end: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    background: var(--m-bg, var(--origam-color__surface---default, #0A0A0A));
}

.home-playground__code-figure {
    margin: 0;
    height: 100%;
}

.home-playground__pre {
    margin: 0;
    padding: var(--origam-space---5, 1.25rem) 0;
    background: transparent;
    height: 100%;
    overflow: auto;
}

.home-playground__pre code {
    display: block;
    font-size: var(--origam-font__size---sm, 0.75rem);
    line-height: 1.8;
    padding: 0;
    background: transparent;
    white-space: pre;
}

.home-playground__preview-panel {
    display: grid;
    place-items: center;
    padding: var(--origam-space---12, 3rem);
    background: var(--m-bg, var(--origam-color__surface---default, #0A0A0A));
    position: relative;
}

.home-playground__dotgrid {
    position: absolute;
    inset: 0;
    pointer-events: none;
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
}

.home-playground__preview-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 320px;
    padding: 1.5rem;
    margin: 0;
    background: var(--m-surface-2, var(--origam-color__surface---overlay, #171717));
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    border-radius: var(--m-radius-lg, var(--origam-radius---xl, 14px));
    box-shadow: var(--m-shadow-card, 0 8px 24px -16px rgba(0, 0, 0, 0.6));
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
}

.home-playground__preview-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    margin: 0;
}

.home-playground__preview-body {
    font-size: 0.8125rem;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    line-height: 1.6;
    margin: 0;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

@media (max-width: 768px) {
    .home-playground__split {
        grid-template-columns: 1fr;
    }

    .home-playground__code-panel {
        border-inline-end: none;
        border-block-end: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    }
}
</style>
