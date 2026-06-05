<script setup lang="ts">
  import { computed } from 'vue'
  import { useT } from '~/composables/useT'
  import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

  const { t } = useT()

  const installCommand = computed(() => t('home.hero.install', 'npm install origam'))
  const copyText = computed(() => t('home.hero.copy', 'Copy'))
  const copiedText = computed(() => t('home.hero.copied', 'Copied'))
</script>

<template>
  <section class="home-hero" aria-labelledby="hero-title">
    <header class="home-hero__header">
      <p
        class="home-hero__badge"
        data-cy="hero-badge"
      >
        {{ t('home.hero.badge', 'v2.5.0') }}
        <span class="home-hero__badge-arrow" aria-hidden="true">→</span>
      </p>

      <origam-title
        id="hero-title"
        tag="h1"
        class="home-hero__title"
      >
        <origam-text-mask
          :background="{from: '#fff 0%',via: '#fff 50%',to: '#A3A3A3 100%',direction: 180}"
          align="center"
        >
          <span class="home-hero__title-line1">{{ t('home.hero.titleLine1', 'The Vue 3 design system') }}</span>
          <span class="home-hero__title-line2">{{ t('home.hero.titleLine2', 'that just works.') }}</span>
        </origam-text-mask>
      </origam-title>

      <p class="home-hero__subtitle">
        {{
          t('home.hero.subtitle', '95 components. 29 chart primitives. Full a11y. Design tokens out of the box. Built for Vue 3 with TypeScript-first DX.')
        }}
      </p>
    </header>

    <nav class="home-hero__ctas" aria-label="Hero calls to action">
      <origam-btn
        class="home-hero__btn home-hero__btn--primary"
        href="/components"
        variant="text"
        data-cy="hero-cta-components"
      >
        {{ t('home.hero.ctaComponents', 'Browse components') }}
      </origam-btn>

      <origam-btn
        class="home-hero__btn home-hero__btn--ghost"
        :href="MARKETING_DEFAULTS.githubRepo"
        target="_blank"
        rel="noopener noreferrer"
        variant="text"
        data-cy="hero-cta-github"
      >
        <origam-icon
          icon="mdi-star-outline"
          class="home-hero__btn-star"
        />
        {{ t('home.hero.ctaGithub', 'Star on GitHub') }}
      </origam-btn>
    </nav>

    <figure class="home-hero__install" aria-label="Install command">
      <pre class="home-hero__pre"><code class="home-hero__code" data-cy="hero-install-command"><span
        class="home-hero__code-dollar">$ </span><span class="home-hero__code-cmd">npm install </span><span
        class="home-hero__code-pkg">origam</span></code></pre>
      <origam-clipboard
        :value="installCommand"
        class="home-hero__clip"
      >
        <template #default="{ copy, copied }">
          <button
            class="home-hero__copy-btn"
            type="button"
            :aria-label="copied ? copiedText : copyText"
            data-cy="hero-copy-btn"
            @click="copy"
          >
            {{ copied ? copiedText : copyText }}
          </button>
        </template>
      </origam-clipboard>
      <figcaption class="sr-only">
        {{ installCommand }}
      </figcaption>
    </figure>
  </section>
</template>

<style scoped>
  /* ─── Section root ─────────────────────────────────────────────────────────── */
  .home-hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--origam-space---8, 2rem);
    padding-block: 96px 80px;
    padding-inline: var(--origam-space---6, 1.5rem);
    background-color: transparent;
  }

  /* Lueur violette contenue dans une bande haute (ne déborde pas sur le titre) */
  .home-hero::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 150px;
    background: radial-gradient(ellipse 52% 100% at 50% 0%, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 12%, transparent), transparent 66%);
    pointer-events: none;
    z-index: 0;
  }

  .home-hero > * {
    position: relative;
    z-index: 1;
  }

  /* ─── Header cluster ───────────────────────────────────────────────────────── */
  .home-hero__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---5, 1.25rem);
    max-inline-size: none;
  }

  /* Badge — pilule violette (bg subtle + bordure + flèche), cf maquette */
  .home-hero__badge {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    margin: 0;
    padding: 6px 14px;
    border-radius: var(--origam-radius---pill, 9999px);
    background-color: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 45%, transparent);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    font-size: var(--origam-font-size---sm, 0.8125rem);
    font-weight: var(--origam-font-weight---medium, 500);
  }

  .home-hero__badge-arrow {
    font-weight: 600;
  }

  /* ─── H1 ───────────────────────────────────────────────────────────────────── */
  .home-hero__title {
    margin: 0;
    font-size: var(--origam-font-size---hero, 5.25rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    line-height: var(--origam-line-height---hero, 0.95);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    color: var(--origam-color__text---ink, #0a0a0a);
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .home-hero__title-line1,
  .home-hero__title-line2 {
    display: block;
    white-space: nowrap;
  }

  /* Star icon prefix on the GitHub CTA */
  .home-hero__btn-star {
    margin-inline-end: var(--origam-space---2, 0.5rem);
    font-size: 1.1em;
    vertical-align: -0.1em;
  }

  @media (max-width: 1080px) {
    .home-hero__title {
      font-size: clamp(2.5rem, 9vw, 5.25rem);
    }

    .home-hero__title-line1,
    .home-hero__title-line2 {
      white-space: normal;
    }
  }

  /* PIXEL-SPEC §2 — H1 line2 color = #0A0A0A (noir, identique à line1) */
  .home-hero__title-line2 {
    color: var(--origam-color__text---ink, #0a0a0a);
  }

  /* ─── Subtitle ─────────────────────────────────────────────────────────────── */
  .home-hero__subtitle {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: var(--origam-line-height---relaxed, 1.7);
    /* PIXEL-SPEC §2 — max-width 680px = 42.5rem */
    max-inline-size: 42.5rem;
  }

  /* ─── CTA row ──────────────────────────────────────────────────────────────── */
  .home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
  }

  /*
   * PIXEL-SPEC §2 — Boutons maquette :
   *   height 57.5px, padding 19px 40px, font-size 16px, font-weight 400,
   *   radius 10px, bg transparent, color #0A0A0A.
   *   Primaire : box-shadow glow violet (--origam-shadow---glow-primary).
   *   Secondaire : border ghost rgba(0,0,0,0.08), no shadow.
   * L'OrigamBtn avec variant="text" fournit le reset chrome ; on surcharge via
   * la classe marketing locale pour ne pas modifier le DS.
   */
  .home-hero__btn {
    border-radius: var(--origam-radius---btn, 10px) !important;
    padding-block: 19px !important;
    padding-inline: 40px !important;
    font-size: 1rem !important;
    font-weight: 400 !important;
    min-height: 57.5px !important;
    background-color: transparent !important;
    color: var(--origam-color__text---primary, #0a0a0a) !important;
    text-decoration: none;
  }

  .home-hero__btn--primary {
    box-shadow: var(--origam-shadow---glow-primary) !important;
  }

  .home-hero__btn--ghost {
    border: none !important;
    box-shadow: none !important;
  }

  /* ─── Install snippet ──────────────────────────────────────────────────────── */
  .home-hero__install {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    margin: 0;
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---4, 1rem);
    border-radius: var(--origam-radius---card, 10px);
    background-color: var(--origam-color__surface---overlay, #f5f5f5);
    border: 1px solid var(--origam-color__border---ghost, rgba(0, 0, 0, 0.08));
  }

  .home-hero__pre {
    margin: 0;
    font-family: var(--origam-font__family---mono, 'JetBrains Mono', 'Fira Code', ui-monospace, monospace);
    font-size: var(--origam-font-size---sm, 0.875rem);
    white-space: pre;
    background: transparent;
    line-height: 1;
  }

  .home-hero__code {
    font-family: inherit;
    font-size: inherit;
  }

  /* PIXEL-SPEC §2 — snippet colorisation :
     $ = --m-text-dim (#A3A3A3)
     npm install = #0A0A0A (text primary)
     origam = #6D28D9 (--origam-color__action--primary---fgSubtle) */
  .home-hero__code-dollar {
    color: var(--origam-color__text---disabled, #a3a3a3);
  }

  .home-hero__code-cmd {
    color: var(--origam-color__text---ink, #0a0a0a);
  }

  .home-hero__code-pkg {
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
  }

  /* PIXEL-SPEC §2 — bouton Copy :
     fond #F5F5F5 (surface-overlay), radius 6px, padding 4px 8px, font-size 11px */
  .home-hero__copy-btn {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
    flex-shrink: 0;
    padding: 4px 8px;
    border-radius: var(--origam-radius---sm, 6px);
    background-color: var(--origam-color__surface---variant, #e5e5e5);
    color: var(--origam-color__text---ink, #0a0a0a);
    font-size: 0.6875rem;
    font-family: inherit;
    line-height: 1.5;
    transition: background-color 120ms ease, color 120ms ease;
    /* a11y — min 44px touch target (horizontal padding compensates vertical shortfall) */
    min-block-size: 1.5rem;
  }

  .home-hero__copy-btn:hover {
    background-color: var(--origam-color__surface---overlay, #f5f5f5);
    color: var(--origam-color__text---primary, #0a0a0a);
  }

  .home-hero__copy-btn:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
  }

  /* ─── Utilities ────────────────────────────────────────────────────────────── */
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
