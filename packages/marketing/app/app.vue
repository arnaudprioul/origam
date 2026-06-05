<script setup lang="ts">
  import { computed } from 'vue'
  import { useTheme } from 'origam/composables'
  import { MDI_ICONS, SIZES, DENSITY } from 'origam/enums'

  import { SKIP_LINK_HREF, SKIP_LINK_TARGET_ID } from '~/consts/a11y.const'
  import { FOOTER_COLUMNS, NAV_LINKS } from '~/consts/nav.const'
  import { CHROME_VERSION, SEARCH_SHORTCUT, STAR_COUNT } from '~/consts/chrome.const'
  import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
  import { useT } from '~/composables/useT'

  const { t } = useT()
  const { resolvedMode, toggleMode } = useTheme()

  const themeIcon = computed(() => (resolvedMode.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'))
  const brandName = computed(() => t('brand.name', 'origam'))
  const tagline = computed(() => t('brand.tagline', 'The Vue 3 design system that just works.'))
  const searchPlaceholder = computed(() => t('chrome.searchPlaceholder', 'Search…'))
  const searchAriaLabel = computed(() => t('a11y.search', 'Search the documentation'))
  const starCountAriaLabel = computed(() => t('a11y.starCount', 'GitHub stars'))
  const themeAriaLabel = computed(() => t('a11y.toggleTheme', 'Toggle light and dark mode'))
</script>

<template>
  <origam-app>
    <a
      :href="SKIP_LINK_HREF"
      class="skip-link"
    >
      {{ t('a11y.skipToContent', 'Skip to content') }}
    </a>

    <origam-app-bar class="site-appbar">
      <template #prepend>
        <NuxtLink
          to="/"
          class="brand"
          :aria-label="brandName"
          data-cy="brand-home"
        >
          <img
            :src="MARKETING_DEFAULTS.logoPath"
            :alt="brandName"
            width="26"
            height="26"
          >
          <span class="brand__name">{{ brandName }}</span>
          <span class="brand__version">{{ CHROME_VERSION }}</span>
        </NuxtLink>
      </template>

      <template #content>
        <nav
          class="primary-nav"
          :aria-label="tagline"
        >
          <origam-btn
            v-for="link in NAV_LINKS"
            :key="link.href"
            :href="link.href"
            variant="text"
            :data-cy="`nav-${link.i18nFallback.toLowerCase()}`"
          >
            {{ t(link.i18nKey, link.i18nFallback) }}
          </origam-btn>
        </nav>
      </template>

      <template #append>
        <origam-col cols="auto">
          <origam-text-field
            :prepend-inner-icon="MDI_ICONS.MAGNIFY"
            variant="outlined"
            type="search"
            :placeholder="searchPlaceholder"
            :aria-label="searchAriaLabel"
            rounded="10px"
            hide-details
          >
            <template #appendInner>
              <origam-kbd class="search-field__shortcut">{{ SEARCH_SHORTCUT }}</origam-kbd>
            </template>
          </origam-text-field>
        </origam-col>

        <origam-col cols="auto">
          <origam-btn
            :href="MARKETING_DEFAULTS.githubRepo"
            target="_blank"
            variant="outlined"
            :density="DENSITY.COMPACT"
            :size="SIZES.DEFAULT"
            :prepend-icon="MDI_ICONS.GITHUB"
            :text="STAR_COUNT"
            rel="noopener noreferrer"
            :aria-label="starCountAriaLabel"
          />
        </origam-col>

        <origam-col cols="auto">
          <origam-btn
            :icon="themeIcon"
            variant="outlined"
            :density="DENSITY.COMPACT"
            :size="SIZES.DEFAULT"
            :aria-label="themeAriaLabel"
            @click="toggleMode"
          />
        </origam-col>

        <origam-col cols="auto">
          <origam-menu>
            <template #activator="{ props }">
              <origam-btn
                variant="outlined"
                :density="DENSITY.COMPACT"
                :size="SIZES.DEFAULT"
                :aria-label="t('chrome.theme', 'Theme: Sobre')"
                :text="t('chrome.theme', 'Theme: Sobre')"
                :append-icon="MDI_ICONS.CHEVRON_DOWN"
                v-bind="props"
              >
                <template #prepend>
                  <span
                    class="theme-switcher__swatch"
                    aria-hidden="true"
                  />
                </template>
              </origam-btn>
            </template>

            <template #default>

            </template>
          </origam-menu>
        </origam-col>
      </template>
    </origam-app-bar>

    <origam-main :id="SKIP_LINK_TARGET_ID">
      <NuxtPage/>
    </origam-main>

    <footer class="site-footer">
      <div class="site-footer__top">
        <p class="site-footer__tagline">{{ t('footer.tagline', 'The Vue 3 design system that just works.') }}</p>

        <div class="site-footer__columns">
          <nav
            v-for="column in FOOTER_COLUMNS"
            :key="column.titleKey"
            class="site-footer__column"
            :aria-label="t(column.titleKey, column.titleFallback)"
          >
            <h2 class="site-footer__column-title">{{ t(column.titleKey, column.titleFallback) }}</h2>
            <ul class="site-footer__list">
              <li
                v-for="link in column.links"
                :key="link.href"
              >
                <a
                  v-if="link.external"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="site-footer__link"
                >
                  {{ t(link.i18nKey, link.i18nFallback) }}
                </a>
                <NuxtLink
                  v-else
                  :to="link.href"
                  class="site-footer__link"
                >
                  {{ t(link.i18nKey, link.i18nFallback) }}
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__line">{{ t('footer.copyright', '© 2026 origam · MIT') }}</p>
        <p class="site-footer__line">{{ t('footer.madeWith', 'Made with origam, by humans.') }}</p>
      </div>
    </footer>
  </origam-app>
</template>

<style scoped>
  .skip-link {
    position: absolute;
    inset-inline-start: var(--origam-space---2, 0.5rem);
    inset-block-start: var(--origam-space---2, 0.5rem);
    z-index: 100;
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    background-color: var(--origam-color__surface---default, #ffffff);
    color: var(--origam-color__text---primary, #0a0a0a);
    border-radius: var(--origam-radius---md, 0.5rem);
    transform: translateY(-200%);
    transition: transform 0.2s ease;
  }

  .skip-link:focus {
    transform: translateY(0);
  }

  .brand {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    font-weight: 700;
  }

  .brand__name {
    font-size: var(--origam-font-size---lg, 1.125rem);
  }

  .brand__version {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 500;
    color: var(--origam-color__text---secondary, #525252);
    padding-inline: var(--origam-space---1, 0.25rem);
    border-radius: var(--origam-radius---sm, 0.25rem);
    background-color: var(--origam-color__surface---variant, rgba(0, 0, 0, 0.04));
  }

  .site-appbar {
    --origam-toolbar---background: var(--origam-appbar---bg);
    backdrop-filter: saturate(1.4) blur(16px);
    -webkit-backdrop-filter: saturate(1.4) blur(16px);
    border-block-end: 1px solid var(--origam-color__border---ghost, rgba(0, 0, 0, 0.08));
  }

  .primary-nav {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: var(--origam-space---1, 0.25rem);
    --origam-btn---font-size: 13px;
    --origam-btn---font-weight: 500;
    --origam-btn---color: var(--origam-color__text---ink, #0a0a0a);
    --origam-btn---min-height: 0;
    --origam-btn---height: auto;
    --origam-btn---density-padding-x: 10px;
  }

  .search-field__shortcut {
    padding-inline: var(--origam-space---1, 0.25rem);
    border: 1px solid var(--origam-color__border---ghost, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---sm, 4px);
    font-size: var(--origam-font-size---xs, 0.75rem);
    line-height: 1.4;
    color: var(--origam-color__text---secondary, #525252);
  }

  .theme-switcher__swatch {
    display: inline-block;
    inline-size: 16px;
    block-size: 16px;
    border-radius: var(--origam-radius---sm, 4px);
    background: linear-gradient(135deg, var(--origam-color__action--primary---bg, #7c3aed), var(--origam-color__text---ink, #0a0a0a));
  }

  .site-footer {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---6, 1.5rem);
    padding: var(--origam-space---10, 4rem) var(--origam-space---6, 1.5rem) var(--origam-space---6, 1.5rem);
    border-block-start: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    color: var(--origam-color__text---secondary, #525252);
  }

  .site-footer__top {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--origam-space---8, 2.5rem);
  }

  .site-footer__tagline {
    margin: 0;
    max-inline-size: 22rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---primary, #0a0a0a);
  }

  .site-footer__columns {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---10, 4rem);
  }

  .site-footer__column {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
  }

  .site-footer__column-title {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 700;
    color: var(--origam-color__text---primary, #0a0a0a);
  }

  .site-footer__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
  }

  .site-footer__link {
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    text-decoration: none;
  }

  .site-footer__link:hover,
  .site-footer__link:focus-visible {
    color: var(--origam-color__text---primary, #0a0a0a);
    text-decoration: underline;
  }

  .site-footer__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--origam-space---2, 0.5rem);
    padding-block-start: var(--origam-space---4, 1rem);
    border-block-start: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
  }

  .site-footer__line {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
  }
</style>
