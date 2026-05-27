<script setup lang="ts">
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
const config = useRuntimeConfig()

const installSnippet = `npm install ${MARKETING_DEFAULTS.npmPkg}`
</script>

<template>
    <section
        class="home-cta-banner"
        aria-labelledby="cta-banner-title"
    >
        <div class="home-cta-banner__inner">
            <h2
                id="cta-banner-title"
                class="home-cta-banner__title"
            >
                {{ t('ctaBanner.title', 'Ready to ship faster?') }}
            </h2>
            <p class="home-cta-banner__subtitle">
                {{ t('ctaBanner.subtitle', 'Install origam and start building production-grade Vue 3 UIs today.') }}
            </p>

            <div class="home-cta-banner__install">
                <div class="home-cta-banner__install-inner">
                    <OrigamCode
                        class="home-cta-banner__code"
                        language="bash"
                    >{{ installSnippet }}</OrigamCode>
                    <OrigamClipboard
                        :text="installSnippet"
                        :aria-label="t('ctaBanner.copyLabel', 'Copy install command')"
                    />
                </div>
            </div>

            <div class="home-cta-banner__ctas">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="flat"
                    rounded="pill"
                    append-icon="mdi:arrow-right"
                    size="lg"
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
                >
                    {{ t('ctaBanner.github', 'GitHub') }}
                </OrigamBtn>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-cta-banner {
    padding-block: var(--origam-space-20, 5rem);
    padding-inline: var(--origam-space-6, 1.5rem);
    background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--origam-color-action-primary-bg, #000) 8%, transparent),
        color-mix(in srgb, var(--origam-color-action-secondary-bg, #a855f7) 6%, transparent)
    );
    border-block-start: 1px solid var(--origam-color-border-default, transparent);
}

.home-cta-banner__inner {
    max-width: 48rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--origam-space-6, 1.5rem);
}

.home-cta-banner__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    letter-spacing: -0.02em;
    color: var(--origam-color-text-default, currentColor);
    margin: 0;
}

.home-cta-banner__subtitle {
    font-size: var(--origam-font-size-lg, 1.125rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.home-cta-banner__install {
    display: flex;
    justify-content: center;
}

.home-cta-banner__install-inner {
    display: flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    padding: var(--origam-space-3, 0.75rem) var(--origam-space-4, 1rem);
    background-color: var(--origam-color-surface-default, transparent);
    border: 1px solid var(--origam-color-border-default, transparent);
    border-radius: var(--origam-rounded-xl, 0.75rem);
}

.home-cta-banner__code {
    font-family: var(--origam-font-family-mono, monospace);
    font-size: var(--origam-font-size-sm, 0.875rem);
}

.home-cta-banner__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-3, 0.75rem);
    justify-content: center;
}
</style>
