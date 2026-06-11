<script setup lang="ts">
  import { computed } from 'vue'
  import { useT } from '~/composables/useT'
  import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
  import { HERO_BTN_VARS, HERO_BADGE_VARS } from '~/consts/hero.const'

  const { t } = useT()

  const installCommand = computed(() => t('home.hero.install', 'npm install origam'))
  const githubRepo = MARKETING_DEFAULTS.githubRepo
</script>

<template>
  <section
    id="hero"
    class="home-hero"
    aria-labelledby="hero-title-line1 hero-title-line2"
  >
    <origam-container class="home-hero__inner">
      <header class="home-hero__header">
        <origam-chip
          class="home-hero__badge"
          :style="HERO_BADGE_VARS"
          color="primary"
          border
          border-color="var(--origam-color__action--primary---bg)"
          size="small"
          append-icon="mdi-arrow-right"
          pill
          data-cy="hero-badge"
        >
          {{ t('home.hero.badge', 'v2.5.0') }}
        </origam-chip>

        <origam-title
          tag="h1"
          class="home-hero__title"
        >
          <span
            id="hero-title-line1"
            class="home-hero__title-line"
          >{{ t('home.hero.titleLine1', 'The Vue 3 design system') }}</span>
          <span
            id="hero-title-line2"
            class="home-hero__title-line"
          >{{ t('home.hero.titleLine2', 'that just works.') }}</span>
        </origam-title>

        <p class="home-hero__subtitle">
          {{ t('home.hero.subtitle', '95 components. 29 chart primitives. Full a11y. Design tokens out of the box. Built for Vue 3 with TypeScript-first DX.') }}
        </p>
      </header>

      <nav
        class="home-hero__ctas"
        :aria-label="t('home.hero.ctasLabel', 'Hero calls to action')"
      >
        <origam-btn
          class="home-hero__btn home-hero__btn--primary"
          :style="HERO_BTN_VARS"
          variant="text"
          href="/components"
          data-cy="hero-cta-components"
        >
          {{ t('home.hero.ctaComponents', 'Browse components') }}
        </origam-btn>

        <origam-btn
          class="home-hero__btn"
          :style="HERO_BTN_VARS"
          variant="text"
          prepend-icon="mdi-star-outline"
          :href="githubRepo"
          target="_blank"
          rel="noopener noreferrer"
          data-cy="hero-cta-github"
        >
          {{ t('home.hero.ctaGithub', 'Star on GitHub') }}
        </origam-btn>
      </nav>

      <origam-code
        :code="installCommand"
        prompt="$"
        lang="bash"
        compact
        copyable
        data-cy="hero-install-command"
      />
    </origam-container>
  </section>
</template>

<style scoped>
  .home-hero {
    position: relative;
    padding-block: var(--origam-space---16, 4rem) var(--origam-space---12, 3rem);
  }

  /* DS gap: no DS token/prop paints a section-scoped decorative glow.
     Consumes the marketing display token --origam-gradient---hero-glow. */
  .home-hero::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 320px;
    background-image: var(--origam-gradient---hero-glow);
    pointer-events: none;
    z-index: 0;
  }

  .home-hero__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    text-align: center;
  }

  .home-hero__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---4, 1rem);
  }

  /* DS gap: hero display size/tracking/leading exceed OrigamTitle's token
     scale (max 3xl). Consumes the marketing display tokens. */
  .home-hero__title {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: var(--origam-font-size---hero, 5.25rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    line-height: var(--origam-line-height---hero, 0.95);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    color: var(--origam-color__text---ink, #0a0a0a);
  }

  .home-hero__title-line {
    display: block;
    white-space: nowrap;
  }

  .home-hero__subtitle {
    margin: 0;
    max-inline-size: 42.5rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: var(--origam-line-height---relaxed, 1.7);
    color: var(--origam-color__text---secondary, #525252);
  }

  .home-hero__ctas {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
  }

  /* DS gap: no DS btn variant produces "transparent background + glow
     shadow". variant="text" hard-sets box-shadow:none at 0,1,0; this 0,2,0
     selector wins without !important and consumes the marketing glow token. */
  .home-hero__btn.home-hero__btn--primary {
    box-shadow: var(--origam-shadow---glow-primary);
  }

  @media (max-width: 1080px) {
    .home-hero__title {
      font-size: clamp(2.5rem, 9vw, 5.25rem);
    }

    .home-hero__title-line {
      white-space: normal;
    }
  }
</style>
