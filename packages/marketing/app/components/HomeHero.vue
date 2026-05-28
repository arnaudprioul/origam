<script setup lang="ts">
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
const config = useRuntimeConfig()
const { track } = useAnalytics()

const HERO_INTENTS = ['primary', 'success', 'warning', 'danger', 'info', 'secondary', 'ghost', 'neutral'] as const
const HERO_CELL_COUNT = 24

const gridCells = computed(() =>
    Array.from({ length: HERO_CELL_COUNT }, (_, i) => ({
        id: i,
        intent: HERO_INTENTS[i % HERO_INTENTS.length],
        delay: `${(i * 0.17) % 2.4}s`
    }))
)

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
        <div class="home-hero__decor home-hero__decor--1" aria-hidden="true" />
        <div class="home-hero__decor home-hero__decor--2" aria-hidden="true" />

        <div
            class="home-hero__grid"
            aria-hidden="true"
        >
            <div
                v-for="cell in gridCells"
                :key="cell.id"
                class="home-hero__cell"
                :style="{ '--float-delay': cell.delay }"
            >
                <OrigamChip
                    v-if="cell.id % 4 === 0"
                    :color="cell.intent"
                    variant="tonal"
                    size="sm"
                >
                    {{ cell.intent }}
                </OrigamChip>
                <OrigamBtn
                    v-else-if="cell.id % 4 === 1"
                    :color="cell.intent"
                    variant="flat"
                    size="sm"
                    rounded="lg"
                >
                    {{ cell.intent }}
                </OrigamBtn>
                <OrigamBadge
                    v-else-if="cell.id % 4 === 2"
                    :color="cell.intent"
                    content="New"
                >
                    <OrigamAvatar
                        :color="cell.intent"
                        size="sm"
                    >
                        {{ String.fromCharCode(65 + (cell.id % 26)) }}
                    </OrigamAvatar>
                </OrigamBadge>
                <OrigamCard
                    v-else
                    :color="cell.intent"
                    variant="tonal"
                    rounded="lg"
                    class="home-hero__mini-card"
                >
                    <OrigamCardText>
                        <OrigamChip
                            :color="cell.intent"
                            variant="flat"
                            size="xs"
                        >
                            {{ cell.intent }}
                        </OrigamChip>
                    </OrigamCardText>
                </OrigamCard>
            </div>
        </div>

        <div class="home-hero__content">
            <div class="home-hero__announce" aria-hidden="true">
                <span class="home-hero__announce-dot" />
                <span class="home-hero__announce-text">
                    {{ t('home.hero.announce', 'v2.5.0 — 29 charts shipped, WCAG 2.1 AA pass') }}
                </span>
                <MarketingIcon name="arrow-right" :size="12" aria-hidden="true" />
            </div>

            <h1
                id="hero-title"
                class="home-hero__title m-h1-display"
            >
                {{ t('home.hero.titleLine1', 'The Vue 3 design system') }}<br>
                {{ t('home.hero.titleLine2', 'that just works.') }}
            </h1>

            <p class="home-hero__subtitle m-body">
                {{ t('home.hero.subtitle', '95 components. 29 chart primitives. Full a11y. Design tokens out of the box. Built for Vue 3 with TypeScript-first DX.') }}
            </p>

            <div class="home-hero__ctas">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="flat"
                    rounded="pill"
                    append-icon="mdi:arrow-right"
                    size="lg"
                    @click="track('cta:browse-components:click')"
                >
                    {{ t('home.hero.ctaPrimary', 'Browse components') }}
                </OrigamBtn>

                <OrigamBtn
                    :href="`https://github.com/${config.public.githubRepo}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    rounded="pill"
                    prepend-icon="mdi:github"
                    size="lg"
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
                    <code class="home-hero__install-code">
                        npm install <span class="home-hero__install-pkg">origam</span>
                    </code>
                    <button
                        type="button"
                        class="home-hero__install-copy"
                        :aria-label="t('home.hero.copyInstall', 'Copy install command')"
                        @click="copyInstall"
                    >
                        <MarketingIcon :name="isCopied ? 'check' : 'copy'" :size="11" aria-hidden="true" />
                        {{ isCopied ? t('home.hero.copied', 'Copied!') : t('home.hero.copy', 'Copy') }}
                    </button>
                </div>
            </figure>
        </div>
    </header>
</template>

<style scoped>
.home-hero {
    position: relative;
    min-height: 92svh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-block: var(--origam-space---24, 6rem) var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
}

.home-hero__decor {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.home-hero__decor--1 {
    background: var(--m-bg-decor-1, radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 18%, transparent), transparent 60%));
}

.home-hero__decor--2 {
    background: var(--m-bg-decor-2, radial-gradient(ellipse 80% 60% at 80% 30%, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 8%, transparent), transparent 70%));
}

.home-hero__grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: var(--origam-space---4, 1rem);
    padding: var(--origam-space---8, 2rem);
    opacity: 0.25;
    pointer-events: none;
}

.home-hero__cell {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: hero-float 3s ease-in-out infinite alternate;
    animation-delay: var(--float-delay, 0s);
}

.home-hero__mini-card {
    width: 100%;
    max-width: 8rem;
}

.home-hero__content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--origam-space---6, 1.5rem);
    max-width: 56rem;
}

.home-hero__announce {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    background: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 10%, transparent));
    border: 1px solid var(--m-accent-border, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 30%, transparent));
    border-radius: var(--origam-radius---full, 9999px);
    margin-block-end: var(--origam-space---6, 1.5rem);
}

.home-hero__announce-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--origam-radius---full, 9999px);
    background: var(--m-accent-soft, var(--origam-color__feedback--success---bg, #4caf50));
    box-shadow: 0 0 8px currentColor;
    flex-shrink: 0;
}

.home-hero__announce-text {
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #6d28d9));
}

.home-hero__title {
    margin: 0 0 var(--origam-space---6, 1.5rem);
    text-align: center;
}

.home-hero__subtitle {
    font-size: clamp(1rem, 1.5vw + 0.5rem, 1.1875rem);
    max-width: 42rem;
    text-align: center;
    margin-block-end: var(--origam-space---9, 2.25rem);
}

.home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---3, 0.75rem);
    justify-content: center;
    margin-block-end: var(--origam-space---10, 2.5rem);
}

.home-hero__install {
    margin: 0;
}

.home-hero__install-inner {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    padding: 12px 18px;
    background: var(--m-surface, var(--origam-color__surface---raised, #0E0E0E));
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, #404040));
    border-radius: var(--m-radius, var(--origam-radius---xl, 1rem));
    box-shadow: var(--origam-shadow---lg);
}

.home-hero__install-prompt {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--m-text-dim, var(--origam-color__text---secondary, #525252));
    flex-shrink: 0;
}

.home-hero__install-code {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--m-text, var(--origam-color__text---primary, #171717));
    background: transparent;
    padding: 0;
    border: none;
}

.home-hero__install-pkg {
    color: var(--m-accent-soft, var(--origam-color__action--primary---bg, #7c3aed));
}

.home-hero__install-copy {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 8px;
    border-radius: var(--m-radius-sm, var(--origam-radius---sm, 0.25rem));
    background: var(--m-surface-2, var(--origam-color__surface---overlay, #171717));
    border: none;
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--m-text-quiet, var(--origam-color__text---secondary, #525252));
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.15s ease;
    flex-shrink: 0;
}

.home-hero__install-copy:hover {
    background: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 12%, transparent));
    color: var(--m-accent-soft, var(--origam-color__action--primary---bg, #7c3aed));
}

.home-hero__install-copy:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
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

@keyframes hero-float {
    from { transform: translateY(0); }
    to { transform: translateY(-8px); }
}

@media (prefers-reduced-motion: reduce) {
    .home-hero__cell {
        animation: none;
    }
}

@media (max-width: 768px) {
    .home-hero__grid {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }

    .home-hero__title {
        font-size: clamp(2rem, 10vw, 3.5rem);
    }
}

@media (max-width: 480px) {
    .home-hero__ctas {
        flex-direction: column;
        align-items: center;
    }
}
</style>
