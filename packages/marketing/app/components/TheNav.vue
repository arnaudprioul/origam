<script setup lang="ts">
import { NAV_LINKS } from '~/consts/nav-links.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
const config = useRuntimeConfig()
const { track } = useAnalytics()
const route = useRoute()

const isMobileMenuOpen = ref(false)

const DISPLAY_NAV_LINKS = NAV_LINKS.filter(l =>
    ['components', 'playground', 'docs', 'stories', 'blog', 'changelog'].includes(l.id)
)

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
                        <NuxtLink
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
                    rounded="pill"
                    prepend-icon="mdi:github"
                    :aria-label="t('nav.githubLabel', 'View on GitHub (opens in new tab)')"
                    size="sm"
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
    background-color: color-mix(in srgb, var(--m-bg, var(--origam-color__surface---default, #fff)) 85%, transparent);
    -webkit-backdrop-filter: blur(16px) saturate(1.8);
    backdrop-filter: blur(16px) saturate(1.8);
    border-block-end: 1px solid var(--m-border, var(--origam-color__border---subtle, #d4d4d4));
}

.site-nav__inner {
    display: flex;
    align-items: center;
    gap: var(--origam-space---4, 1rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space---6, 1.5rem);
    padding-block: var(--origam-space---3, 0.75rem);
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
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #525252));
    font-weight: var(--origam-font__weight---regular, 400);
}

.site-nav__links {
    flex: 1;
}

.site-nav__list {
    display: flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.site-nav__link {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--origam-space---3, 0.75rem);
    padding-block: var(--origam-space---2, 0.5rem);
    font-size: var(--origam-font__size---md, 0.875rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #525252));
    text-decoration: none;
    border-radius: var(--origam-radius---md, 0.5rem);
    transition: color 0.15s ease, background-color 0.15s ease;
}

.site-nav__link:hover {
    color: var(--m-text, var(--origam-color__text---primary, #171717));
    background-color: var(--m-surface-2, var(--origam-color__surface---overlay, #f5f5f5));
}

.site-nav__link:focus-visible {
    color: var(--m-text, var(--origam-color__text---primary, #171717));
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
}

.site-nav__link--active {
    color: var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed));
    font-weight: var(--origam-font__weight---semibold, 600);
    background-color: color-mix(in srgb, var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed)) 8%, transparent);
}

.site-nav__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    flex-shrink: 0;
}

.site-nav__burger {
    display: none;
}

@media (max-width: 768px) {
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
