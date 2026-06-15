<script setup lang="ts">
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import type { LocaleObject } from '@nuxtjs/i18n'
  import { useTheme } from 'origam/composables'
  import { MDI_ICONS } from 'origam/enums'

  import { SKIP_LINK_HREF, SKIP_LINK_TARGET_ID } from '~/consts/a11y.const'
  import { FOOTER_COLUMNS, FOOTER_GRID_COLUMNS, NAV_LINKS } from '~/consts/nav.const'
  import { SEARCH_SHORTCUT } from '~/consts/chrome.const'
  import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
  import { THEME_CHIPS } from '~/consts/themes-showcase.const'
  import { useT } from '~/composables/useT'
  import { useVersion } from '~/composables/useVersion'
  import { useGithubStars } from '~/composables/useGithubStars'

  const { t } = useT()
  const { versionTag } = useVersion()
  const { theme, setTheme, resolvedMode, toggleMode } = useTheme()
  const { stars } = useGithubStars()

  const { locale, locales, setLocale } = useI18n()
  const availableLocales = computed(() => locales.value as LocaleObject[])
  const currentLocale = computed(() => availableLocales.value.find(l => l.code === locale.value))
  const currentLocaleLabel = computed(() => currentLocale.value?.code.toUpperCase() ?? locale.value.toUpperCase())
  const languageAriaLabel = computed(() => t('a11y.language', 'Change language'))
  const changeLocale = (code: string) => setLocale(code as typeof locale.value)

  const themeIcon = computed(() => (resolvedMode.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'))
  const brandName = computed(() => t('brand.name', 'origam'))
  const tagline = computed(() => t('brand.tagline', 'The Vue 3 design system that just works.'))
  const searchPlaceholder = computed(() => t('chrome.searchPlaceholder', 'Search…'))
  const searchAriaLabel = computed(() => t('a11y.search', 'Search the documentation'))
  const starCountAriaLabel = computed(() => t('a11y.starCount', 'GitHub stars'))
  const themeAriaLabel = computed(() => t('a11y.toggleTheme', 'Toggle light and dark mode'))
  const themeMenuAriaLabel = computed(() => t('a11y.toggleBrandTheme', 'Switch brand theme'))
  const themeSelectLabel = computed(() => t('chrome.themeSelectLabel', 'Select brand theme'))

  const activeThipLabel = computed(() => {
    const active = THEME_CHIPS.find(c => c.key === theme.value)
    return active ? t(active.labelKey, active.labelFallback) : t('chrome.theme', 'Theme')
  })
  const themeMenuLabel = computed(() => t('chrome.themeActive', 'Theme: {label}', { label: activeThipLabel.value }))
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
            class="brand__logo"
            :src="MARKETING_DEFAULTS.logoPath"
            :alt="brandName"
            width="26"
            height="26"
          >
          <span class="brand__name">{{ brandName }}</span>
          <origam-chip
            class="brand__version"
            size="x-small"
            color="primary"
            border
          >{{ versionTag }}</origam-chip>
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
            class="primary-nav__link"
            :data-cy="`nav-${link.i18nFallback.toLowerCase()}`"
          >
            {{ t(link.i18nKey, link.i18nFallback) }}
          </origam-btn>
        </nav>
      </template>

      <template #append>
        <div class="appbar-actions">
          <origam-text-field
            class="search-field"
            :prepend-inner-icon="MDI_ICONS.MAGNIFY"
            variant="outlined"
            type="search"
            :placeholder="searchPlaceholder"
            :aria-label="searchAriaLabel"
            hide-details
          >
            <template #appendInner>
              <origam-kbd>{{ SEARCH_SHORTCUT }}</origam-kbd>
            </template>
          </origam-text-field>

          <origam-btn
            class="appbar-actions__btn"
            :href="MARKETING_DEFAULTS.githubRepo"
            target="_blank"
            variant="outlined"
            :prepend-icon="MDI_ICONS.GITHUB"
            rel="noopener noreferrer"
            :aria-label="starCountAriaLabel"
          >
            <origam-number-format
              :value="stars"
              format="compact"
              compact-display="short"
            />
          </origam-btn>

          <origam-btn
            class="appbar-actions__btn appbar-actions__btn--icon"
            :icon="themeIcon"
            variant="outlined"
            :aria-label="themeAriaLabel"
            @click="toggleMode"
          />

          <origam-menu
            class="appbar-menu appbar-menu--lang"
            location="bottom"
          >
            <template #activator="{ props }">
              <origam-btn
                class="appbar-actions__btn appbar-actions__btn--lang"
                variant="outlined"
                :aria-label="languageAriaLabel"
                :prepend-icon="MDI_ICONS.TRANSLATE"
                :text="currentLocaleLabel"
                :append-icon="MDI_ICONS.CHEVRON_DOWN"
                v-bind="props"
              />
            </template>

            <template #default>
              <origam-list nav>
                <origam-list-item
                  v-for="loc in availableLocales"
                  :key="loc.code"
                  :title="loc.name"
                  :active="loc.code === locale"
                  data-cy="locale-option"
                  @click="changeLocale(loc.code)"
                />
              </origam-list>
            </template>
          </origam-menu>

          <origam-menu
            class="appbar-menu appbar-menu--theme"
            location="bottom"
          >
            <template #activator="{ props }">
              <origam-btn
                class="appbar-actions__btn"
                variant="outlined"
                :aria-label="themeMenuAriaLabel"
                :text="themeMenuLabel"
                :append-icon="MDI_ICONS.CHEVRON_DOWN"
                v-bind="props"
              >
                <template #prepend>
                  <span
                    class="theme-switcher__swatch"
                    :data-theme-swatch="theme"
                    aria-hidden="true"
                  />
                </template>
              </origam-btn>
            </template>

            <template #default>
              <origam-list
                nav
                :aria-label="themeSelectLabel"
              >
                <origam-list-item
                  v-for="chip in THEME_CHIPS"
                  :key="chip.key"
                  :title="t(chip.labelKey, chip.labelFallback)"
                  :active="chip.key === theme"
                  :data-cy="`theme-menu-${chip.key}`"
                  @click="setTheme(chip.key)"
                />
              </origam-list>
            </template>
          </origam-menu>
        </div>
      </template>
    </origam-app-bar>

    <origam-main :id="SKIP_LINK_TARGET_ID">
      <slot/>
    </origam-main>

    <footer class="site-footer">
      <origam-grid
        class="site-footer__top"
        :columns="FOOTER_GRID_COLUMNS"
        gap="xl"
        tag="div"
      >
        <div class="site-footer__brand">
          <NuxtLink
            to="/"
            class="brand"
            :aria-label="brandName"
          >
            <img
              class="brand__logo"
              :src="MARKETING_DEFAULTS.logoPath"
              :alt="brandName"
              width="26"
              height="26"
            >
            <span class="brand__name">{{ brandName }}</span>
          </NuxtLink>
          <p class="site-footer__tagline">{{ t('footer.tagline', 'The Vue 3 design system that just works.') }}</p>
        </div>

        <nav
          v-for="column in FOOTER_COLUMNS"
          :key="column.titleKey"
          class="site-footer__column"
          :aria-label="t(column.titleKey, column.titleFallback)"
        >
          <origam-title
            tag="h2"
            class="site-footer__column-title"
            :text="t(column.titleKey, column.titleFallback)"
          />
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
      </origam-grid>

      <origam-divider class="site-footer__rule"/>

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

  .brand__logo {
    flex: none;
    inline-size: 26px;
    block-size: 26px;
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
  }

  .primary-nav__link {
    --origam-btn---font-size: 13px;
    --origam-btn---font-weight: 500;
    --origam-btn---color: var(--origam-color__text---secondary, #525252);
    --origam-btn---padding-inline: var(--origam-space---3, 0.75rem);
    --origam-btn---height: 34px;
    --origam-btn---min-height: 34px;
    --origam-btn---background-color: transparent;
    --origam-btn---overlay-opacity-hover: 0.06;
  }

  .primary-nav__link:hover {
    --origam-btn---color: var(--origam-color__text---primary, #0a0a0a);
  }

  .appbar-actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
  }

  .appbar-actions__btn {
    --origam-btn---height: 38px;
    --origam-btn---min-height: 38px;
    --origam-btn---font-size: 13px;
    --origam-btn---font-weight: 600;
    --origam-btn---padding-inline: var(--origam-space---3, 0.75rem);
    --origam-btn---border-radius: 10px;
    --origam-btn---border-color: var(--origam-color__border---default, rgba(0, 0, 0, 0.12));
    --origam-btn---color: var(--origam-color__text---primary, #0a0a0a);
  }

  .appbar-actions__btn--icon {
    --origam-btn---padding-inline: 0;
    inline-size: 38px;
    --origam-btn---font-size: 18px;
  }

  .search-field {
    inline-size: 220px;
    --origam-input__control---height: 38px;
    --origam-field---border-radius: var(--origam-radius---btn, 10px);
    --origam-field__input---font-size: 13px;
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
    align-items: start;
  }

  .site-footer__brand {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    max-inline-size: 22rem;
  }

  .site-footer__tagline {
    margin: 0;
    font-size: var(--origam-font-size---md, 1rem);
    line-height: 1.5;
    color: var(--origam-color__text---secondary, #525252);
  }

  .site-footer__column {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
  }

  .site-footer__column-title {
    --origam-title---font-size: var(--origam-font-size---xs, 0.75rem);
    --origam-title---color: var(--origam-color__text---secondary, #525252);
    --origam-title---font-weight: 600;
    --origam-title---letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .site-footer__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
  }

  .site-footer__link {
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    text-decoration: none;
    transition: color 0.15s ease;
  }

  .site-footer__link:hover,
  .site-footer__link:focus-visible {
    color: var(--origam-color__action--primary---bg, #7c3aed);
  }

  .site-footer__rule {
    --origam-divider---opacity: 1;
    --origam-divider---border-top-width: 1px;
    --origam-divider---color: var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
  }

  .site-footer__bottom {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: var(--origam-space---2, 0.5rem);
  }

  .site-footer__line {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
  }
</style>

<style>
  .appbar-menu .origam-menu__content {
    min-width: 200px;
    width: 200px;
    padding: 4px;
  }

  .appbar-menu .origam-menu__list {
    min-width: 200px;
  }

  .appbar-menu .origam-list-item {
    cursor: pointer;
    border-radius: var(--origam-radius---sm, 6px);
    transition: background-color 0.12s ease;
  }

  .appbar-menu .origam-list-item:hover {
    background-color: var(--origam-color__action--primary---bgSubtle);
  }

  .appbar-menu .origam-list-item--active {
    --origam-list-item__overlay---background-color: var(--origam-color__action--primary---bg);
    background-color: var(--origam-color__action--primary---bgSubtle);
  }

  .appbar-menu .origam-list-item--active .origam-list-item__title {
    color: var(--origam-color__action--primary---fgSubtle);
    font-weight: 600;
  }

  [data-theme="geek"] .appbar-menu .origam-list-item__title {
    font-family: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;
    font-size: 0.8125rem;
    letter-spacing: -0.01em;
  }
</style>
