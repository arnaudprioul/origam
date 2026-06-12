<script setup lang="ts">
import { useT } from '~/composables/useT'
import { CTA_START_HREF, CTA_DOCS_HREF } from '~/consts/cta.const'
import { CTA_BTN_START_VARS, CTA_BTN_DOCS_VARS } from '~/consts/cta.const'

const { t } = useT()
</script>

<template>
    <section
        class="home-cta"
        aria-labelledby="cta-title"
    >
        <div class="home-cta__inner">
            <origam-title
                id="cta-title"
                tag="h2"
                class="home-cta__title"
            >
                {{ t('home.cta.title', 'Ready to ship faster?') }}
            </origam-title>

            <p class="home-cta__description">
                {{ t('home.cta.description', 'Spin up your Vue 3 project with origam in 30 seconds.') }}
            </p>

            <nav
                class="home-cta__actions"
                :aria-label="t('home.cta.actionsLabel', 'Get started')"
            >
                <origam-btn
                    class="home-cta__btn home-cta__btn--start"
                    :style="CTA_BTN_START_VARS"
                    variant="elevated"
                    append-icon="mdi-arrow-right"
                    :href="CTA_START_HREF"
                    data-cy="cta-btn-start"
                >
                    {{ t('home.cta.ctaStart', 'Get started') }}
                </origam-btn>

                <origam-btn
                    class="home-cta__btn home-cta__btn--docs"
                    :style="CTA_BTN_DOCS_VARS"
                    variant="text"
                    prepend-icon="mdi-code-tags"
                    :href="CTA_DOCS_HREF"
                    data-cy="cta-btn-docs"
                >
                    {{ t('home.cta.ctaDocs', 'Read docs') }}
                </origam-btn>
            </nav>
        </div>
    </section>
</template>

<style scoped>
.home-cta {
    position: relative;
    padding-block: var(--origam-space---30, 7.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    overflow: hidden;
}

/* DS gap: no DS token/prop paints a section-scoped decorative glow.
   Consumes the marketing display token --origam-gradient---cta-glow-top
   (violet radial top-center, subtil). */
.home-cta::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 280px;
    background-image: var(--origam-gradient---cta-glow-top);
    pointer-events: none;
    z-index: 0;
}

.home-cta__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    max-width: 48rem;
    margin-inline: auto;
    text-align: center;
}

/* DS gap: CTA display size/tracking/leading exceed OrigamTitle's token
   scale (max 3xl). Consumes the marketing display tokens. */
.home-cta__title {
    margin: 0;
    font-size: var(--origam-font-size---cta, 4rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    line-height: var(--origam-line-height---hero, 0.95);
    color: var(--origam-color__text---ink, #0a0a0a);
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
    margin-block-start: var(--origam-space---2, 0.5rem);
}

/* DS gap: OrigamBtn variant="elevated" produces a surface+shadow button
   but the DS shadow rung doesn't match the maquette's light 0-4-8 shadow.
   We override --origam-btn---box-shadow with the marketing card-elevated
   token which visually matches.
   In dark mode the surface token resolves to a dark tone — we add the
   ghost border token (subtle rgba) to keep the button visible on the
   dark background, matching the dark maquette. */
.home-cta__btn--start {
    --origam-btn---box-shadow: var(--origam-shadow---card-elevated);
    --origam-btn---color: var(--origam-color__text---ink, #0a0a0a);
    outline: 1px solid var(--origam-color__border---ghost);
    outline-offset: -1px;
    border-radius: var(--origam-radius---btn, 10px);
}
</style>
