<script setup lang="ts">
const { t } = useI18nFallback()
const { track } = useAnalytics()
</script>

<template>
    <section
        class="home-cta-banner"
        aria-labelledby="cta-banner-title"
    >
        <div class="home-cta-banner__glow" aria-hidden="true" />

        <div class="home-cta-banner__inner">
            <h2
                id="cta-banner-title"
                class="home-cta-banner__title m-h1-display"
            >
                {{ t('ctaBanner.title', 'Ready to ship faster?') }}
            </h2>

            <p class="home-cta-banner__subtitle">
                {{ t('ctaBanner.subtitle', 'Spin up your Vue 3 project with origam in 30 seconds.') }}
            </p>

            <div class="home-cta-banner__ctas">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="flat"
                    rounded="md"
                    append-icon="mdi:arrow-right"
                    size="lg"
                    @click="track('cta:browse-components:click')"
                >
                    {{ t('ctaBanner.browse', 'Browse components') }}
                </OrigamBtn>
                <OrigamBtn
                    to="/docs"
                    variant="outlined"
                    rounded="md"
                    prepend-icon="mdi:code-tags"
                    size="lg"
                    @click="track('cta:docs:click')"
                >
                    {{ t('ctaBanner.docs', 'Read docs') }}
                </OrigamBtn>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-cta-banner {
    position: relative;
    padding-block: 7.5rem;
    padding-inline: 3.5rem;
    overflow: hidden;
    background: var(--m-bg, var(--origam-color__surface---default, #0A0A0A));
    border-block-start: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
}

.home-cta-banner__glow {
    position: absolute;
    inset: -6rem 0 auto 0;
    block-size: 50rem;
    background:
        radial-gradient(
            ellipse 45% 40% at 50% 12%,
            color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 50%, transparent),
            transparent 60%
        ),
        radial-gradient(
            ellipse 80% 60% at 50% 0%,
            color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 28%, transparent),
            transparent 75%
        );
    pointer-events: none;
    filter: blur(8px);
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
    background-color: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 14%, transparent));
    border: 1px solid var(--m-accent-border, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 30%, transparent));
    border-radius: var(--origam-radius---full, 9999px);
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #A78BFA));
    letter-spacing: 0.02em;
}

.home-cta-banner__title {
    font-size: clamp(2.5rem, 5vw + 0.5rem, 4rem);
    font-weight: var(--m-h1-weight, 800);
    letter-spacing: var(--m-h1-tracking, -0.045em);
    line-height: 1;
    margin: 0 0 0.5rem;
    background: var(--m-glow-text, linear-gradient(180deg, #fff 0%, #fff 50%, #A3A3A3 100%));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.home-cta-banner__subtitle {
    font-size: 1.125rem;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    margin: 0 0 1.5rem;
    line-height: 1.55;
    max-inline-size: 38rem;
}

.home-cta-banner__ctas {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-block-start: 0.5rem;
}
</style>
