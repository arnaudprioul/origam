<script setup lang="ts">
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
const config = useRuntimeConfig()
const { track } = useAnalytics()

const installSnippet = `npm install ${MARKETING_DEFAULTS.npmPkg}`
</script>

<template>
    <section
        class="home-cta-banner"
        aria-labelledby="cta-banner-title"
    >
        <div class="home-cta-banner__glow home-cta-banner__glow--left" aria-hidden="true"></div>
        <div class="home-cta-banner__glow home-cta-banner__glow--right" aria-hidden="true"></div>

        <div class="home-cta-banner__inner">
            <div class="home-cta-banner__badge" aria-hidden="true">
                <OrigamIcon icon="mdi:rocket-launch-outline" />
                <span>{{ t('ctaBanner.badge', 'Start now — it\'s free') }}</span>
            </div>

            <h2
                id="cta-banner-title"
                class="home-cta-banner__title"
            >
                {{ t('ctaBanner.title', 'Ready to ship faster?') }}
            </h2>

            <p class="home-cta-banner__subtitle">
                {{ t('ctaBanner.subtitle', 'Install origam and start building production-grade Vue 3 UIs today.') }}
            </p>

            <figure class="home-cta-banner__install">
                <figcaption class="sr-only">
                    {{ t('ctaBanner.installCaption', 'Install origam via npm') }}
                </figcaption>
                <div class="home-cta-banner__install-inner">
                    <span class="home-cta-banner__install-prefix" aria-hidden="true">$</span>
                    <OrigamCode
                        class="home-cta-banner__code"
                        language="bash"
                    >{{ installSnippet }}</OrigamCode>
                    <OrigamClipboard
                        :text="installSnippet"
                        :aria-label="t('ctaBanner.copyLabel', 'Copy install command')"
                        @copy="track('cta:install:copy')"
                    />
                </div>
            </figure>

            <div class="home-cta-banner__ctas">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="flat"
                    rounded="pill"
                    append-icon="mdi:arrow-right"
                    size="lg"
                    @click="track('cta:browse-components:click')"
                >
                    {{ t('ctaBanner.browse', 'Browse components') }}
                </OrigamBtn>
                <OrigamBtn
                    :href="`https://github.com/${config.public.githubRepo}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    rounded="pill"
                    prepend-icon="mdi:github"
                    size="lg"
                    :aria-label="t('ctaBanner.githubLabel', 'View on GitHub (opens in new tab)')"
                    @click="track('cta:github:click')"
                >
                    {{ t('ctaBanner.github', 'GitHub') }}
                </OrigamBtn>
            </div>

            <div class="home-cta-banner__social-proof" aria-hidden="true">
                <div class="home-cta-banner__avatars">
                    <OrigamAvatar color="primary" size="sm">A</OrigamAvatar>
                    <OrigamAvatar color="success" size="sm">B</OrigamAvatar>
                    <OrigamAvatar color="info" size="sm">C</OrigamAvatar>
                    <OrigamAvatar color="warning" size="sm">D</OrigamAvatar>
                    <OrigamAvatar color="danger" size="sm">+</OrigamAvatar>
                </div>
                <span class="home-cta-banner__social-text">
                    {{ t('ctaBanner.socialProof', 'Joined by teams shipping faster') }}
                </span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-cta-banner {
    position: relative;
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    overflow: hidden;
    background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 92%, transparent),
        color-mix(in srgb, var(--origam-color__feedback--info---bg, #2196f3) 88%, transparent)
    );
}

.home-cta-banner__glow {
    position: absolute;
    width: 40rem;
    height: 40rem;
    border-radius: var(--origam-radius---full, 9999px);
    pointer-events: none;
    opacity: 0.15;
    filter: blur(80px);
}

.home-cta-banner__glow--left {
    top: -20rem;
    left: -10rem;
    background: var(--origam-color__primary---300, #c4b5fd);
}

.home-cta-banner__glow--right {
    bottom: -20rem;
    right: -10rem;
    background: var(--origam-color__blue---300, #93c5fd);
}

.home-cta-banner__inner {
    position: relative;
    z-index: 1;
    max-width: 52rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--origam-space---6, 1.5rem);
}

.home-cta-banner__badge {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    background-color: color-mix(in srgb, var(--origam-color__neutral---0, #ffffff) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--origam-color__neutral---0, #ffffff) 25%, transparent);
    border-radius: var(--origam-radius---full, 9999px);
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__neutral---0, #ffffff);
    letter-spacing: 0.02em;
}

.home-cta-banner__title {
    font-size: clamp(2rem, 4vw + 0.5rem, 3.5rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: -0.03em;
    color: var(--origam-color__neutral---0, #ffffff);
    margin: 0;
    line-height: var(--origam-font__lineHeight---tight, 1.1);
}

.home-cta-banner__subtitle {
    font-size: var(--origam-font__size---xl, 1.125rem);
    color: color-mix(in srgb, var(--origam-color__neutral---0, #ffffff) 80%, transparent);
    margin: 0;
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
    max-width: 38rem;
}

.home-cta-banner__install {
    margin: 0;
}

.home-cta-banner__install-inner {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---5, 1.25rem);
    background-color: color-mix(in srgb, var(--origam-color__neutral---900, #171717) 80%, transparent);
    border: 1px solid color-mix(in srgb, var(--origam-color__neutral---0, #ffffff) 15%, transparent);
    border-radius: var(--origam-radius---xl, 1rem);
    backdrop-filter: blur(8px);
}

.home-cta-banner__install-prefix {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--origam-color__feedback--success---bg, #4caf50);
    font-weight: var(--origam-font__weight---bold, 700);
    flex-shrink: 0;
}

.home-cta-banner__code {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--origam-color__neutral---100, #f5f5f5);
}

.home-cta-banner__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---3, 0.75rem);
    justify-content: center;
}

.home-cta-banner__social-proof {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    margin-block-start: var(--origam-space---2, 0.5rem);
}

.home-cta-banner__avatars {
    display: flex;
}

.home-cta-banner__avatars > * {
    margin-inline-start: -8px;
    border: 2px solid color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 80%, transparent);
}

.home-cta-banner__avatars > *:first-child {
    margin-inline-start: 0;
}

.home-cta-banner__social-text {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: color-mix(in srgb, var(--origam-color__neutral---0, #ffffff) 70%, transparent);
    font-weight: var(--origam-font__weight---medium, 500);
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

@media (max-width: 640px) {
    .home-cta-banner__social-proof {
        flex-direction: column;
    }
}
</style>
