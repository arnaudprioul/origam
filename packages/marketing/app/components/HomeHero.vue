<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import { useCopy } from '~/composables/useCopy'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useT()
const { copied, copy } = useCopy()

const installCommand = computed(() => t('home.hero.install', 'npm install origam'))
const copyLabel = computed(() => copied.value ? t('home.hero.copied', 'Copied') : t('home.hero.copy', 'Copy'))
const copyAriaLabel = computed(() =>
    copied.value
        ? t('home.hero.copied', 'Copied')
        : t('home.hero.copy', 'Copy command to clipboard')
)

const handleCopy = () => copy(installCommand.value)
</script>

<template>
    <section class="home-hero" aria-labelledby="hero-title">
        <header class="home-hero__header">
            <origam-chip
                class="home-hero__badge"
                color="primary"
                size="small"
                data-cy="hero-badge"
            >
                {{ t('home.hero.badge', 'v2.5.0') }}
            </origam-chip>

            <h1
                id="hero-title"
                class="home-hero__title"
            >
                <span class="home-hero__title-line1">{{ t('home.hero.titleLine1', 'The Vue 3 design system') }}</span>
                <span class="home-hero__title-line2">{{ t('home.hero.titleLine2', 'that just works.') }}</span>
            </h1>

            <p class="home-hero__subtitle">
                {{ t('home.hero.subtitle', '95 components. 29 chart primitives. Full a11y. Design tokens out of the box. Built for Vue 3 with TypeScript-first DX.') }}
            </p>
        </header>

        <nav class="home-hero__ctas" aria-label="Hero calls to action">
            <origam-btn
                href="/components"
                variant="elevated"
                color="primary"
                data-cy="hero-cta-components"
            >
                {{ t('home.hero.ctaComponents', 'Browse components') }}
            </origam-btn>

            <origam-btn
                :href="MARKETING_DEFAULTS.githubRepo"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                data-cy="hero-cta-github"
            >
                {{ t('home.hero.ctaGithub', 'Star on GitHub') }}
            </origam-btn>
        </nav>

        <figure class="home-hero__install">
            <pre class="home-hero__pre"><code class="home-hero__code" data-cy="hero-install-command">{{ installCommand }}</code></pre>
            <origam-btn
                class="home-hero__copy-btn"
                variant="text"
                size="small"
                :aria-label="copyAriaLabel"
                aria-live="polite"
                data-cy="hero-copy-btn"
                @click="handleCopy"
            >
                {{ copyLabel }}
            </origam-btn>
            <figcaption class="home-hero__install-caption sr-only">
                {{ t('home.hero.install', 'npm install origam') }}
            </figcaption>
        </figure>
    </section>
</template>

<style scoped>
.home-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--origam-space---8, 2rem);
    padding-block: var(--origam-space---20, 6rem) var(--origam-space---16, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
}

.home-hero__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---4, 1rem);
    max-inline-size: 52rem;
}

.home-hero__badge {
    align-self: center;
}

.home-hero__title {
    margin: 0;
    font-size: var(--origam-font-size---5xl, clamp(2.5rem, 6vw, 4rem));
    font-weight: 800;
    line-height: var(--origam-line-height---tight, 1.15);
    color: var(--origam-color__text---primary, #0a0a0a);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
}

.home-hero__title-line1 {
    display: block;
}

.home-hero__title-line2 {
    display: block;
    color: var(--origam-color__action--primary---default, #6366f1);
}

.home-hero__subtitle {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: var(--origam-line-height---relaxed, 1.7);
    max-inline-size: 44rem;
}

.home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
}

.home-hero__install {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    margin: 0;
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---4, 1rem);
    border-radius: var(--origam-radius---lg, 0.75rem);
    background-color: var(--origam-color__surface---variant, rgba(0, 0, 0, 0.04));
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.home-hero__pre {
    margin: 0;
    font-family: var(--origam-font__family---mono, ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, Consolas, monospace);
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---primary, #0a0a0a);
    white-space: pre;
    background: transparent;
}

.home-hero__code {
    font-family: inherit;
}

.home-hero__copy-btn {
    flex-shrink: 0;
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
    border: 0;
}
</style>
