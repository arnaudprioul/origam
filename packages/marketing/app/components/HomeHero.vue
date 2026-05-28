<script setup lang="ts">
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
const config = useRuntimeConfig()
const { track } = useAnalytics()

const installSnippet = `npm install ${MARKETING_DEFAULTS.npmPkg}`

const isCopied = ref(false)

function copyInstall (): void {
    navigator.clipboard.writeText(installSnippet).then(() => {
        isCopied.value = true
        track('cta:install:copy')
        setTimeout(() => { isCopied.value = false }, 2000)
    })
}
</script>

<template>
    <header class="home-hero" aria-labelledby="hero-title">
        <div class="home-hero__glow home-hero__glow--top" aria-hidden="true" />

        <div class="home-hero__content">
            <div class="home-hero__announce" aria-hidden="true">
                <span class="home-hero__announce-dot" />
                <span class="home-hero__announce-text">
                    {{ t('home.hero.announce', 'v2.5.0 — 29 charts shipped, WCAG 2.1 AA pass') }}
                </span>
            </div>

            <h1
                id="hero-title"
                class="home-hero__title"
            >
                {{ t('home.hero.title', 'The Vue 3 design system that just works.') }}
            </h1>

            <p class="home-hero__subtitle">
                {{ t('home.hero.subtitle', '95 components. 29 chart primitives. Full a11y. Design tokens out of the box. Built for Vue 3 with TypeScript-first DX.') }}
            </p>

            <div class="home-hero__ctas">
                <OrigamBtn
                    to="/components"
                    variant="outlined"
                    rounded="md"
                    size="default"
                    append-icon="mdi:arrow-right"
                    @click="track('cta:browse-components:click')"
                >
                    {{ t('home.hero.ctaPrimary', 'Browse components') }}
                </OrigamBtn>

                <OrigamBtn
                    :href="`https://github.com/${config.public.githubRepo}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    rounded="md"
                    size="default"
                    prepend-icon="mdi:github"
                    :aria-label="t('home.hero.ctaGithubLabel', 'View origam on GitHub (opens in new tab)')"
                    @click="track('cta:github:click')"
                >
                    {{ t('home.hero.ctaSecondary', 'Star on GitHub') }}
                </OrigamBtn>
            </div>

            <figure class="home-hero__install">
                <figcaption class="sr-only">
                    {{ t('home.hero.installCaption', 'Install origam via npm') }}
                </figcaption>
                <div class="home-hero__install-inner">
                    <span class="home-hero__install-prompt" aria-hidden="true">$</span>
                    <code class="home-hero__install-code">npm install <span class="home-hero__install-pkg">origam</span></code>
                    <OrigamBtn
                        variant="text"
                        size="sm"
                        density="compact"
                        :prepend-icon="isCopied ? 'mdi:check' : 'mdi:content-copy'"
                        :aria-label="t('home.hero.copyInstall', 'Copy install command')"
                        @click="copyInstall"
                    >
                        {{ isCopied ? t('home.hero.copied', 'Copied!') : t('home.hero.copy', 'Copy') }}
                    </OrigamBtn>
                </div>
            </figure>
        </div>
    </header>
</template>

<style scoped>
.home-hero {
    position: relative;
    overflow: hidden;
    padding-block: clamp(4rem, 8vw, 6.5rem) clamp(2rem, 4vw, 3.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    background: var(--m-bg, var(--origam-color__surface---default, #0a0a0a));
}

.home-hero__glow {
    position: absolute;
    inset-inline: 0;
    inset-block-start: -10rem;
    block-size: 40rem;
    background: radial-gradient(
        ellipse 60% 50% at 50% 0%,
        color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 18%, transparent),
        transparent 70%
    );
    pointer-events: none;
    z-index: 0;
}

.home-hero__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.25rem;
    max-inline-size: 52rem;
    margin-inline: auto;
}

.home-hero__announce {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.875rem;
    background: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 14%, transparent));
    border: 1px solid var(--m-accent-border, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 30%, transparent));
    border-radius: var(--origam-radius---full, 9999px);
}

.home-hero__announce-dot {
    inline-size: 6px;
    block-size: 6px;
    border-radius: 50%;
    background: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #A78BFA));
    box-shadow: 0 0 8px currentColor;
    flex-shrink: 0;
}

.home-hero__announce-text {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #A78BFA));
    letter-spacing: 0.01em;
}

.home-hero__title {
    margin: 0;
    font-size: clamp(2.25rem, 5vw + 0.5rem, 4rem);
    font-weight: var(--m-h1-weight, 800);
    letter-spacing: var(--m-h1-tracking, -0.045em);
    line-height: var(--m-h1-lineh, 1);
    color: var(--m-text, var(--origam-color__text---primary, #fafafa));
    max-inline-size: 22ch;
}

.home-hero__subtitle {
    margin: 0;
    font-size: clamp(0.9375rem, 1vw + 0.5rem, 1.0625rem);
    line-height: 1.55;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    max-inline-size: 36rem;
}

.home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;
    justify-content: center;
    margin-block-start: 0.5rem;
}

.home-hero__install {
    margin: 1rem 0 0;
}

.home-hero__install-inner {
    display: inline-flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.375rem 0.375rem 0.375rem 0.875rem;
    background: var(--m-surface, var(--origam-color__surface---raised, #0E0E0E));
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    border-radius: var(--m-radius, var(--origam-radius---md, 0.5rem));
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
    font-size: 0.8125rem;
}

.home-hero__install-prompt {
    color: var(--m-text-dim, var(--origam-color__text---disabled, #525252));
    flex-shrink: 0;
}

.home-hero__install-code {
    color: var(--m-text, var(--origam-color__text---primary, #fafafa));
    background: transparent;
    padding: 0;
    border: none;
    font-family: inherit;
}

.home-hero__install-pkg {
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #A78BFA));
}

.sr-only {
    position: absolute;
    inline-size: 1px;
    block-size: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

@media (max-width: 480px) {
    .home-hero__ctas {
        flex-direction: column;
        inline-size: 100%;
        max-inline-size: 16rem;
    }
}
</style>
