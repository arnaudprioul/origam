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
            <div class="home-hero__eyebrow" aria-hidden="true">
                <span class="home-hero__eyebrow-dot"></span>
                <span class="home-hero__eyebrow-text">
                    {{ t('home.hero.eyebrow', 'Vue 3 · TypeScript · Open Source') }}
                </span>
            </div>

            <h1
                id="hero-title"
                class="home-hero__title"
            >
                <span class="home-hero__title-line">
                    {{ t('home.hero.titleLine1', 'The Vue 3 design system') }}
                </span>
                <span class="home-hero__title-gradient">
                    {{ t('home.hero.titleLine2', 'that just works') }}
                </span>
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
                    <span class="home-hero__install-live" aria-hidden="true">
                        <span class="home-hero__live-dot"></span>
                    </span>
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

            <div class="home-hero__stats" aria-hidden="true">
                <div class="home-hero__stat">
                    <span class="home-hero__stat-value">~95</span>
                    <span class="home-hero__stat-label">{{ t('home.hero.statsComponents', 'components') }}</span>
                </div>
                <div class="home-hero__stat-divider"></div>
                <div class="home-hero__stat">
                    <span class="home-hero__stat-value">29</span>
                    <span class="home-hero__stat-label">{{ t('home.hero.statsCharts', 'chart primitives') }}</span>
                </div>
                <div class="home-hero__stat-divider"></div>
                <div class="home-hero__stat">
                    <span class="home-hero__stat-value">WCAG AA</span>
                    <span class="home-hero__stat-label">{{ t('home.hero.statsA11y', 'accessibility') }}</span>
                </div>
            </div>
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
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    background: radial-gradient(
        ellipse 80% 60% at 50% -10%,
        color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 18%, transparent),
        transparent
    );
}

.home-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse 60% 40% at 80% 70%,
        color-mix(in srgb, var(--origam-color__feedback--info---bg, #2196f3) 10%, transparent),
        transparent
    );
    pointer-events: none;
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

.home-hero__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    background-color: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 30%, transparent);
    border-radius: var(--origam-radius---full, 9999px);
}

.home-hero__eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--origam-radius---full, 9999px);
    background-color: var(--origam-color__feedback--success---bg, #4caf50);
    animation: pulse-dot 2s ease-in-out infinite;
}

.home-hero__eyebrow-text {
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    letter-spacing: 0.04em;
}

.home-hero__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    font-size: clamp(2.25rem, 6vw + 0.5rem, 4.5rem);
    font-weight: var(--origam-font__weight---bold, 700);
    line-height: var(--origam-font__lineHeight---tight, 1.1);
    letter-spacing: -0.03em;
    margin: 0;
}

.home-hero__title-line {
    color: var(--origam-color__text---primary, #171717);
}

.home-hero__title-gradient {
    background: linear-gradient(
        135deg,
        var(--origam-color__action--primary---bg, #7c3aed) 0%,
        var(--origam-color__feedback--info---bg, #2196f3) 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.home-hero__subtitle {
    font-size: clamp(1rem, 1.5vw + 0.5rem, 1.25rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
    margin: 0;
    max-width: 40rem;
}

.home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---3, 0.75rem);
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
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---5, 1.25rem);
    background-color: var(--origam-color__neutral---900, #171717);
    border: 1px solid var(--origam-color__neutral---700, #404040);
    border-radius: var(--origam-radius---xl, 1rem);
    box-shadow: var(--origam-shadow---lg);
}

.home-hero__install-live {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.home-hero__live-dot {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: var(--origam-radius---full, 9999px);
    background-color: var(--origam-color__feedback--success---bg, #4caf50);
    animation: pulse-dot 2s ease-in-out infinite;
}

.home-hero__code {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--origam-color__neutral---100, #f5f5f5);
}

.home-hero__stats {
    display: flex;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    margin-block-start: var(--origam-space---2, 0.5rem);
}

.home-hero__stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.home-hero__stat-value {
    font-size: var(--origam-font__size---xl, 1.125rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__text---primary, #171717);
    line-height: 1;
}

.home-hero__stat-label {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--origam-color__text---secondary, #525252);
}

.home-hero__stat-divider {
    width: 1px;
    height: 2rem;
    background-color: var(--origam-color__border---subtle, #d4d4d4);
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

@keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
}

@media (prefers-reduced-motion: reduce) {
    .home-hero__cell,
    .home-hero__eyebrow-dot,
    .home-hero__live-dot {
        animation: none;
    }
}

@media (max-width: 768px) {
    .home-hero__grid {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(6, 1fr);
    }

    .home-hero__stats {
        gap: var(--origam-space---4, 1rem);
    }
}

@media (max-width: 480px) {
    .home-hero__stats {
        flex-direction: column;
        gap: var(--origam-space---3, 0.75rem);
    }

    .home-hero__stat-divider {
        width: 2rem;
        height: 1px;
    }
}
</style>
