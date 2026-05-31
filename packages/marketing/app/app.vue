<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'origam/composables'

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

        <origam-app-bar>
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
                        width="28"
                        height="28"
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
                <div class="chrome-search">
                    <origam-icon
                        icon="mdi-magnify"
                        class="chrome-search__icon"
                    />
                    <input
                        type="search"
                        class="chrome-search__input"
                        :placeholder="searchPlaceholder"
                        :aria-label="searchAriaLabel"
                        readonly
                        data-cy="chrome-search"
                    >
                    <kbd class="chrome-search__shortcut">{{ SEARCH_SHORTCUT }}</kbd>
                </div>

                <a
                    :href="MARKETING_DEFAULTS.githubRepo"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="chrome-stars"
                    :aria-label="starCountAriaLabel"
                    data-cy="chrome-stars"
                >
                    <origam-icon icon="mdi-star-outline" />
                    <span class="chrome-stars__count">{{ STAR_COUNT }}</span>
                </a>

                <origam-btn
                    icon
                    variant="text"
                    :aria-label="themeAriaLabel"
                    data-cy="theme-toggle"
                    @click="toggleMode"
                >
                    <origam-icon :icon="themeIcon" />
                </origam-btn>
            </template>
        </origam-app-bar>

        <origam-main :id="SKIP_LINK_TARGET_ID">
            <NuxtPage />
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

.primary-nav {
    display: flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
}

.chrome-search {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    padding-inline: var(--origam-space---3, 0.75rem);
    block-size: 2.25rem;
    border-radius: var(--origam-radius---md, 0.5rem);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    background-color: var(--origam-color__surface---variant, rgba(0, 0, 0, 0.04));
    color: var(--origam-color__text---secondary, #525252);
}

.chrome-search__input {
    border: none;
    background: transparent;
    color: inherit;
    font-size: var(--origam-font-size---sm, 0.875rem);
    inline-size: 8rem;
    outline: none;
    cursor: pointer;
}

.chrome-search__shortcut {
    font-size: var(--origam-font-size---xs, 0.75rem);
    padding-inline: var(--origam-space---1, 0.25rem);
    border-radius: var(--origam-radius---sm, 0.25rem);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.chrome-stars {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
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
