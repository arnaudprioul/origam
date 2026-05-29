<script setup lang="ts">
import { computed } from 'vue'
import { NAV_LINKS } from '~/consts/nav-links.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'
import { COMPONENT_LIST } from '~/consts/component-list.const'
import type { TComponentCategory } from '~/types/component-category.type'

const { t } = useI18nFallback()
const config = useRuntimeConfig()
const { track } = useAnalytics()
const route = useRoute()

const isMobileMenuOpen = ref(false)

const DISPLAY_NAV_LINKS = NAV_LINKS

const openDropdownId = ref<string | null>(null)
function setDropdown (id: string | null) {
    openDropdownId.value = id
}

function toggleMobileMenu (): void {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu (): void {
    isMobileMenuOpen.value = false
}

function handleNavLinkClick (href: string): void {
    closeMobileMenu()
    track('nav:link:click', { href })
}

function isActive (href: string): boolean {
    return route.path === href || route.path.startsWith(href + '/')
}

const componentCategoryLinks = computed(() => {
    const seen = new Set<TComponentCategory>()
    for (const item of COMPONENT_LIST) {
        seen.add(item.category)
    }
    return Array.from(seen).map((key) => ({
        key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        href: `/components?category=${key}`
    }))
})
</script>

<template>
    <header class="site-nav" role="banner">
        <div class="site-nav__inner">
            <NuxtLink
                to="/"
                class="site-nav__logo"
                :aria-label="t('nav.logoLabel', 'origam — home')"
                @click="closeMobileMenu"
            >
                <MarketingIcon name="logo" :size="26" class="site-nav__logo-icon" aria-hidden="true" />
                <span class="site-nav__logo-text" aria-hidden="true">origam</span>
                <span class="site-nav__version" aria-hidden="true">v{{ MARKETING_DEFAULTS.npmVersion }}</span>
            </NuxtLink>

            <nav
                id="mobile-nav"
                class="site-nav__links"
                :class="{ 'site-nav__links--open': isMobileMenuOpen }"
                :aria-label="t('nav.mainLabel', 'Main')"
            >
                <ul class="site-nav__list" role="list">
                    <li
                        v-for="link in DISPLAY_NAV_LINKS"
                        :key="link.id"
                        class="site-nav__item"
                    >
                        <OrigamMenu
                            v-if="link.children && link.children.length"
                            :model-value="openDropdownId === link.id"
                            :open-on-hover="true"
                            location="bottom"
                            :offset="8"
                            min-width="320"
                            @update:model-value="(v) => setDropdown(v ? link.id : null)"
                        >
                            <template #activator="{ props: activatorProps }">
                                <button
                                    v-bind="activatorProps"
                                    type="button"
                                    class="site-nav__link site-nav__link--dropdown"
                                    :class="{ 'site-nav__link--active': isActive(link.href) }"
                                >
                                    {{ t(link.labelKey, link.labelFallback) }}
                                    <OrigamIcon
                                        icon="mdi:chevron-down"
                                        :size="14"
                                        class="site-nav__link-chevron"
                                    />
                                </button>
                            </template>
                            <div class="site-nav__dropdown">
                                <NuxtLink
                                    v-for="child in link.children"
                                    :key="child.id"
                                    :to="child.href"
                                    class="site-nav__dropdown-item"
                                    @click="handleNavLinkClick(child.href); setDropdown(null)"
                                >
                                    <span
                                        v-if="child.icon"
                                        class="site-nav__dropdown-icon"
                                        aria-hidden="true"
                                    >
                                        <OrigamIcon :icon="child.icon" :size="18" />
                                    </span>
                                    <span class="site-nav__dropdown-text">
                                        <span class="site-nav__dropdown-title">
                                            {{ t(child.labelKey, child.labelFallback) }}
                                        </span>
                                        <span
                                            v-if="child.descKey"
                                            class="site-nav__dropdown-desc"
                                        >
                                            {{ t(child.descKey, child.descFallback ?? '') }}
                                        </span>
                                    </span>
                                </NuxtLink>
                                <nav
                                    v-if="link.id === 'components'"
                                    :aria-label="t('nav.componentsItems.categoriesLabel', 'Browse by category')"
                                    class="site-nav__category-nav"
                                >
                                    <p class="site-nav__category-heading">
                                        {{ t('nav.componentsItems.categoriesTitle', 'Categories') }}
                                    </p>
                                    <ul class="site-nav__category-list" role="list">
                                        <li
                                            v-for="cat in componentCategoryLinks"
                                            :key="cat.key"
                                            class="site-nav__category-item"
                                        >
                                            <NuxtLink
                                                :to="cat.href"
                                                class="site-nav__category-link"
                                                @click="handleNavLinkClick(cat.href); setDropdown(null)"
                                            >
                                                {{ t(`nav.componentsItems.category.${cat.key}`, cat.label) }}
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </OrigamMenu>
                        <NuxtLink
                            v-else
                            :to="link.href"
                            class="site-nav__link"
                            :aria-current="isActive(link.href) ? 'page' : undefined"
                            :class="{ 'site-nav__link--active': isActive(link.href) }"
                            @click="handleNavLinkClick(link.href)"
                        >
                            {{ t(link.labelKey, link.labelFallback) }}
                        </NuxtLink>
                    </li>
                </ul>
            </nav>

            <div class="site-nav__actions">
                <SearchTrigger />

                <OrigamBtn
                    :href="`https://github.com/${config.public.githubRepo}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    rounded="full"
                    prepend-icon="mdi:github"
                    :aria-label="t('nav.githubLabel', 'View on GitHub (opens in new tab)')"
                    size="small"
                    class="site-nav__github-btn"
                >
                    4.2k
                </OrigamBtn>

                <ThemeSwitcher />

                <LanguageSwitcher />

                <OrigamBtn
                    class="site-nav__burger"
                    variant="text"
                    :icon="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
                    :aria-label="isMobileMenuOpen ? t('nav.closeMenu', 'Close menu') : t('nav.openMenu', 'Open menu')"
                    :aria-expanded="isMobileMenuOpen"
                    aria-controls="mobile-nav"
                    @click="toggleMobileMenu"
                />
            </div>
        </div>
    </header>
</template>

<style scoped>
.site-nav {
    position: sticky;
    inset-block-start: 0;
    z-index: var(--origam-zIndex---sticky, 1020);
    background-color: color-mix(in srgb, var(--m-bg, var(--origam-color__surface---default, #fff)) 70%, transparent);
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
    inline-size: 100%;
    overflow: visible;
}

.site-nav__inner {
    display: flex;
    align-items: center;
    gap: var(--origam-space---4, 1rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space---6, 1.5rem);
    padding-block: var(--origam-space---3, 0.75rem);
    min-block-size: 3.5rem;
    flex-wrap: nowrap;
    min-inline-size: 0;
}

.site-nav__logo {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    text-decoration: none;
    flex-shrink: 0;
}

.site-nav__logo-icon {
    color: var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed));
    flex-shrink: 0;
}

.site-nav__logo-text {
    font-size: var(--origam-font__size---2xl, 1.25rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--m-text, var(--origam-color__text---primary, #171717));
    letter-spacing: -0.03em;
}

.site-nav__version {
    font-family: var(--m-font-mono, var(--origam-font__family---mono, monospace));
    font-size: 11px;
    color: var(--m-text-dim, var(--origam-color__text---disabled, #525252));
    font-weight: 400;
}

.site-nav__links {
    flex: 1 1 auto;
    min-inline-size: 0;
    overflow: hidden;
}

.site-nav__list {
    display: flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
    list-style: none;
    margin: 0;
    padding: 0;
    flex-wrap: nowrap;
    min-inline-size: 0;
}

.site-nav__item {
    flex-shrink: 0;
}

.site-nav__link {
    display: inline-flex;
    align-items: center;
    padding-inline: 0.625rem;
    padding-block: 0.375rem;
    font-size: 0.8125rem;
    font-weight: 500;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    text-decoration: none;
    transition: color 0.15s ease;
    white-space: nowrap;
}

.site-nav__link:hover {
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
}

.site-nav__link:focus-visible {
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    outline: 2px solid var(--m-accent, var(--origam-color__border---focus, #7c3aed));
    outline-offset: 2px;
    border-radius: 4px;
}

.site-nav__link--active {
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    font-weight: 600;
    position: relative;
}

.site-nav__link--active::after {
    content: '';
    position: absolute;
    inset-block-end: -4px;
    inset-inline: 0.625rem;
    block-size: 2px;
    background: var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed));
    border-radius: 1px;
}

.site-nav__link--dropdown {
    background: transparent;
    border: none;
    font: inherit;
    cursor: pointer;
    gap: 0.25rem;
}

.site-nav__link-chevron {
    transition: transform 0.2s ease;
    color: var(--m-text-quiet, var(--origam-color__text---placeholder, #737373));
}

.site-nav__link--dropdown[aria-expanded="true"] .site-nav__link-chevron {
    transform: rotate(180deg);
}

.site-nav__dropdown {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    background: var(--m-surface, var(--origam-color__surface---raised, #0E0E0E));
    border: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    border-radius: var(--m-radius, var(--origam-radius---md, 10px));
    box-shadow: var(--m-shadow-elev, 0 24px 64px -16px rgba(0, 0, 0, 0.6));
    min-inline-size: 20rem;
}

.site-nav__dropdown-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.625rem 0.75rem;
    border-radius: var(--m-radius-sm, var(--origam-radius---sm, 6px));
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    text-decoration: none;
    transition: background-color 0.15s ease;
}

.site-nav__dropdown-item:hover {
    background-color: var(--m-accent-bg, color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 14%, transparent));
}

.site-nav__dropdown-icon {
    flex-shrink: 0;
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: var(--m-radius-sm, 6px);
    background: var(--m-accent-bg, color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 14%, transparent));
    color: var(--m-accent-soft, var(--origam-color__action--primary---fgSubtle, #A78BFA));
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.site-nav__dropdown-text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-inline-size: 0;
}

.site-nav__dropdown-title {
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
}

.site-nav__dropdown-desc {
    font-size: 0.75rem;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    line-height: 1.4;
}

.site-nav__category-nav {
    border-block-start: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    margin-block-start: 0.5rem;
    padding-block-start: 0.5rem;
}

.site-nav__category-heading {
    margin: 0 0 0.375rem 0.75rem;
    font-size: 0.6875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
}

.site-nav__category-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
    padding-inline: 0.375rem;
}

.site-nav__category-item {
    flex: 0 0 auto;
}

.site-nav__category-link {
    display: inline-block;
    padding: 0.25rem 0.625rem;
    border-radius: var(--m-radius-sm, var(--origam-radius---sm, 6px));
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    text-decoration: none;
    text-transform: capitalize;
    transition: background-color 0.15s ease, color 0.15s ease;
}

.site-nav__category-link:hover {
    background-color: var(--m-accent-bg, color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 14%, transparent));
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
}

.site-nav__category-link:focus-visible {
    outline: 2px solid var(--m-accent, var(--origam-color__border---focus, #7c3aed));
    outline-offset: 2px;
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
}

.site-nav__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    flex-shrink: 0;
    margin-inline-start: auto;
}

.site-nav__burger {
    display: none;
}

@media (max-width: 1180px) {
    .site-nav__version {
        display: none;
    }
}

@media (max-width: 1080px) {
    .site-nav__github-btn :deep(.origam-btn__content) {
        display: none;
    }
}

@media (max-width: 960px) {
    .site-nav__burger {
        display: flex;
    }

    .site-nav__github-btn {
        display: none;
    }

    .site-nav__links {
        display: none;
        position: absolute;
        inset-block-start: 100%;
        inset-inline: 0;
        background-color: var(--m-bg, var(--origam-color__surface---default, #fff));
        border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
        padding: var(--origam-space---4, 1rem);
        box-shadow: var(--origam-shadow---lg);
        overflow: visible;
    }

    .site-nav__links--open {
        display: block;
    }

    .site-nav__list {
        flex-direction: column;
        align-items: stretch;
        gap: var(--origam-space---1, 0.25rem);
    }

    .site-nav__link {
        padding-block: var(--origam-space---3, 0.75rem);
        border-radius: var(--origam-radius---lg, 0.75rem);
    }
}
</style>
