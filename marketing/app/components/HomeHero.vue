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
</script>

<template>
    <header class="home-hero" aria-labelledby="hero-title">
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
            <h1
                id="hero-title"
                class="home-hero__title"
            >
                {{ t('home.hero.title', 'The Vue 3 design system that just works') }}
            </h1>

            <p class="home-hero__subtitle">
                {{ t('home.hero.subtitle', '29 chart primitives, ~95 components, full a11y, design tokens out of the box.') }}
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
                    {{ t('home.hero.ctaBrowse', 'Browse components') }}
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
                    {{ t('home.hero.ctaGithub', 'GitHub') }}
                </OrigamBtn>
            </div>

            <figure class="home-hero__install">
                <figcaption class="sr-only">
                    {{ t('home.hero.installCaption', 'Install origam via npm') }}
                </figcaption>
                <div class="home-hero__install-inner">
                    <OrigamCode
                        class="home-hero__code"
                        language="bash"
                    >{{ installSnippet }}</OrigamCode>
                    <OrigamClipboard
                        :text="installSnippet"
                        :aria-label="t('home.hero.copyInstall', 'Copy install command')"
                        @copy="track('cta:install:copy')"
                    />
                </div>
            </figure>
        </div>
    </header>
</template>

<style scoped>
.home-hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding-block: var(--origam-space-20, 5rem);
    padding-inline: var(--origam-space-6, 1.5rem);
}

.home-hero__grid {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: var(--origam-space-4, 1rem);
    padding: var(--origam-space-8, 2rem);
    opacity: 0.35;
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
    gap: var(--origam-space-6, 1.5rem);
    max-width: 52rem;
}

.home-hero__title {
    font-size: clamp(2rem, 5vw + 1rem, 4rem);
    font-weight: var(--origam-font-weight-bold, 700);
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--origam-color-text-default, currentColor);
    margin: 0;
}

.home-hero__subtitle {
    font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
    color: var(--origam-color-text-muted, currentColor);
    line-height: 1.6;
    margin: 0;
    max-width: 40rem;
}

.home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-3, 0.75rem);
    justify-content: center;
}

.home-hero__install {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
}

.home-hero__install-inner {
    display: flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    padding: var(--origam-space-3, 0.75rem) var(--origam-space-4, 1rem);
    background-color: var(--origam-color-surface-subtle, transparent);
    border: 1px solid var(--origam-color-border-default, transparent);
    border-radius: var(--origam-rounded-xl, 0.75rem);
}

.home-hero__code {
    font-family: var(--origam-font-family-mono, monospace);
    font-size: var(--origam-font-size-sm, 0.875rem);
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
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-8px);
    }
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
}
</style>
