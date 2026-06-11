<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import { HERO_BTN_VARS } from '~/consts/hero.const'
import { CTA_INSTALL_COMMAND, CTA_DOCS_HREF } from '~/consts/cta.const'

const { t } = useT()

const installCommand = computed(() => t('home.cta.install', CTA_INSTALL_COMMAND))
</script>

<template>
    <section
        class="home-cta"
        aria-labelledby="cta-title"
    >
        <div class="home-cta__inner">
            <origam-title
                tag="h2"
                class="home-cta__title"
            >
                <span id="cta-title">{{ t('home.cta.title', 'Ready to ship faster?') }}</span>
            </origam-title>

            <p class="home-cta__description">
                {{ t('home.cta.description', 'Spin up your Vue 3 project with origam in 30 seconds.') }}
            </p>

            <nav
                class="home-cta__actions"
                :aria-label="t('home.cta.actionsLabel', 'Get started')"
            >
                <origam-btn
                    class="home-cta__btn home-cta__btn--primary"
                    :style="HERO_BTN_VARS"
                    variant="text"
                    :href="CTA_DOCS_HREF"
                    data-cy="cta-btn-docs"
                >
                    {{ t('home.cta.ctaDocs', 'Read docs') }}
                </origam-btn>

                <figure class="home-cta__install">
                    <origam-code
                        class="home-cta__code"
                        :code="installCommand"
                        lang="bash"
                        copyable
                        data-cy="cta-install-command"
                    />
                    <figcaption class="home-cta__sr-only">
                        {{ installCommand }}
                    </figcaption>
                </figure>
            </nav>
        </div>
    </section>
</template>

<style scoped>
.home-cta {
    padding-block: var(--origam-space---30, 7.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);

    /* DS gap: no DS token/prop paints a section-scoped decorative glow.
       Consumes the marketing display token --origam-gradient---cta-glow. */
    background-image: var(--origam-gradient---cta-glow);
}

.home-cta__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    max-width: 48rem;
    margin-inline: auto;
    text-align: center;
}

/* DS gap: CTA display size/tracking/leading exceed OrigamTitle's token
   scale (max 3xl). Consumes the marketing display tokens, like the Hero H1. */
.home-cta__title {
    margin: 0;
    font-size: var(--origam-font-size---cta, 4rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    line-height: var(--origam-line-height---hero, 0.95);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-cta__description {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    max-width: 36rem;
}

.home-cta__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
}

/* DS gap: no DS btn variant produces "transparent background + glow shadow".
   variant="text" hard-sets box-shadow:none at 0,1,0; this 0,2,0 selector wins
   without !important and consumes the shared marketing glow token (same as
   the Hero primary CTA). */
.home-cta__btn.home-cta__btn--primary {
    box-shadow: var(--origam-shadow---glow-primary);
}

.home-cta__install {
    margin: 0;
    inline-size: 100%;
    max-inline-size: 26rem;
}

.home-cta__code {
    text-align: start;
}

.home-cta__sr-only {
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
