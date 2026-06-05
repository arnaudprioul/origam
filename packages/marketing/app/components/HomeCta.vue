<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import { useCopy } from '~/composables/useCopy'
import { CTA_INSTALL_COMMAND, CTA_DOCS_HREF } from '~/consts/cta.const'

const { t } = useT()
const { copied, copy } = useCopy()

const copyLabel = computed(() => copied.value
    ? t('home.cta.copied', 'Copied')
    : t('home.cta.copy', 'Copy')
)

const installCommand = computed(() => t('home.cta.install', CTA_INSTALL_COMMAND))

function handleCopy () {
    copy(installCommand.value)
}
</script>

<template>
    <section
        class="home-cta"
        aria-labelledby="cta-title"
    >
        <div class="home-cta__inner">
            <h2
                id="cta-title"
                class="home-cta__title"
            >
                {{ t('home.cta.title', 'Ready to ship faster?') }}
            </h2>

            <p class="home-cta__description">
                {{ t('home.cta.description', 'Spin up your Vue 3 project with origam in 30 seconds.') }}
            </p>

            <div class="home-cta__actions">
                <OrigamBtn
                    :href="CTA_DOCS_HREF"
                    class="home-cta__btn-docs"
                    data-cy="cta-btn-docs"
                >
                    {{ t('home.cta.ctaDocs', 'Read docs') }}
                </OrigamBtn>

                <figure class="home-cta__snippet">
                    <OrigamCode
                        tag="div"
                        :code="installCommand"
                        :copyable="false"
                        class="home-cta__code"
                        data-cy="cta-code-snippet"
                    />

                    <button
                        type="button"
                        class="home-cta__copy-btn"
                        :aria-label="t('home.cta.copy', 'Copy')"
                        aria-live="polite"
                        data-cy="cta-copy-btn"
                        @click="handleCopy"
                    >
                        {{ copyLabel }}
                    </button>
                </figure>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* ── Section racine ─────────────────────────────────────────────────────── */

.home-cta {
    padding-block: var(--origam-space---30, 7.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    background-image: var(
        --origam-gradient---cta-glow,
        radial-gradient(ellipse 80% 60% at 80% 30%, rgba(124, 58, 237, 0.08), transparent 70%)
    );
    background-color: var(--origam-color__surface---default, #ffffff);
}

/* ── Conteneur centré (max-width, pas de card wrapper) ──────────────────── */

.home-cta__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    max-width: var(--home-cta-inner-max-width, 48rem);
    margin-inline: auto;
    text-align: center;
}

/* ── H2 — 64px / weight 800 / tracking hero / line-height hero ─────────── */

.home-cta__title {
    margin: 0;
    font-size: var(--origam-font-size---cta, 4rem);
    font-weight: 800;
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    line-height: var(--origam-line-height---hero, 0.95);
    color: var(--origam-color__text---primary, #0a0a0a);
}

/* ── Description ────────────────────────────────────────────────────────── */

.home-cta__description {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    max-width: 36rem;
}

/* ── Actions row ────────────────────────────────────────────────────────── */

.home-cta__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
}

/* ── Bouton "Read docs" — style maquette : transparent + glow violet ─────
 *  La maquette montre le bouton primaire CTA comme :
 *  - fond transparent
 *  - radius 10px (--m-radius)
 *  - padding 19px 40px
 *  - height 57.5px
 *  - font-size 16px, weight 400
 *  - box-shadow : inset blanc + glow violet en dessous
 * ──────────────────────────────────────────────────────────────────────── */

.home-cta__btn-docs {
    --origam-btn---border-radius: var(--origam-radius---btn, 10px);
    --origam-btn---height: 57.5px;
    --origam-btn---font-size: 1rem;
    --origam-btn---font-weight: 400;
    --origam-btn---background-color: transparent;
    --origam-btn---color: var(--origam-color__text---primary, #0a0a0a);
    padding-inline: var(--origam-space---10, 2.5rem);
    box-shadow: var(
        --origam-shadow---glow-primary,
        inset rgba(255, 255, 255, 0.2) 0px 1px 0px 0px,
        rgba(124, 58, 237, 0.5) 0px 8px 24px -8px
    );
}

/* ── Snippet install ────────────────────────────────────────────────────── */

.home-cta__snippet {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---md, 8px);
    overflow: hidden;
    background-color: var(--origam-color__surface---overlay, #f5f5f5);
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', 'Fira Code', ui-monospace, monospace);
}

.home-cta__code {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    border: none;
    background: transparent;
    font-size: var(--origam-font-size---sm, 0.875rem);
}

/* ── Bouton Copy — fond surface overlay, radius sm, font-size xs ────────── */

.home-cta__copy-btn {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    flex-shrink: 0;
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---2, 0.5rem);
    border-left: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.08));
    border-radius: 0 var(--origam-radius---sm, 6px) var(--origam-radius---sm, 6px) 0;
    background-color: var(--origam-color__surface---overlay, #f5f5f5);
    color: var(--origam-color__text---secondary, #525252);
    font-size: var(--origam-font-size---xs, 0.6875rem);
    font-family: inherit;
    line-height: 1.5;
    transition: background-color 120ms ease, color 120ms ease;
}

.home-cta__copy-btn:hover {
    background-color: var(--origam-color__surface---sunken, #fafafa);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.home-cta__copy-btn:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
}
</style>
