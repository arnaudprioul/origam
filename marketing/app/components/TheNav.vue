<script setup lang="ts">
import { NAV_LINKS } from '~/consts/nav-links.const'

const { t } = useI18nFallback()
const config = useRuntimeConfig()
const { track } = useAnalytics()

const isMobileMenuOpen = ref(false)

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
                <span class="site-nav__logo-text" aria-hidden="true">origam</span>
            </NuxtLink>

            <nav
                class="site-nav__links"
                :class="{ 'site-nav__links--open': isMobileMenuOpen }"
                :aria-label="t('nav.mainLabel', 'Main')"
                :aria-expanded="isMobileMenuOpen"
            >
                <ul class="site-nav__list" role="list">
                    <li
                        v-for="link in NAV_LINKS"
                        :key="link.id"
                        class="site-nav__item"
                    >
                        <NuxtLink
                            :to="link.href"
                            class="site-nav__link"
                            active-class="site-nav__link--active"
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
                    prepend-icon="mdi:github"
                    :aria-label="t('nav.githubLabel', 'View on GitHub (opens in new tab)')"
                    size="sm"
                >
                    {{ t('nav.github', 'GitHub') }}
                </OrigamBtn>

                <ThemeToggle />

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
    z-index: var(--origam-z-index-app-bar, 100);
    background-color: color-mix(in srgb, var(--origam-color-surface-default, #fff) 80%, transparent);
    -webkit-backdrop-filter: blur(12px);
    backdrop-filter: blur(12px);
    border-block-end: 1px solid var(--origam-color-border-default, transparent);
}

.site-nav__inner {
    display: flex;
    align-items: center;
    gap: var(--origam-space-4, 1rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block: var(--origam-space-3, 0.75rem);
}

.site-nav__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    flex-shrink: 0;
}

.site-nav__logo-text {
    font-size: var(--origam-font-size-xl, 1.25rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default, currentColor);
    letter-spacing: -0.02em;
}

.site-nav__links {
    flex: 1;
}

.site-nav__list {
    display: flex;
    align-items: center;
    gap: var(--origam-space-1, 0.25rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.site-nav__link {
    display: inline-flex;
    align-items: center;
    padding-inline: var(--origam-space-3, 0.75rem);
    padding-block: var(--origam-space-2, 0.5rem);
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    color: var(--origam-color-text-muted, currentColor);
    text-decoration: none;
    border-radius: var(--origam-rounded-md, 0.5rem);
    transition: color 0.15s ease, background-color 0.15s ease;
}

.site-nav__link:hover,
.site-nav__link:focus-visible {
    color: var(--origam-color-text-default, currentColor);
    background-color: var(--origam-color-surface-subtle, transparent);
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
}

.site-nav__link--active {
    color: var(--origam-color-action-primary-bg, currentColor);
    font-weight: var(--origam-font-weight-semibold, 600);
}

.site-nav__actions {
    display: flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    flex-shrink: 0;
}

.site-nav__burger {
    display: none;
}

@container style(--mobile: 1) {
    .site-nav__burger {
        display: flex;
    }

    .site-nav__links {
        display: none;
        position: absolute;
        inset-block-start: 100%;
        inset-inline: 0;
        background-color: var(--origam-color-surface-default, #fff);
        border-block-end: 1px solid var(--origam-color-border-default, transparent);
        padding: var(--origam-space-4, 1rem);
    }

    .site-nav__links--open {
        display: block;
    }

    .site-nav__list {
        flex-direction: column;
        align-items: stretch;
    }
}

@media (max-width: 768px) {
    .site-nav__burger {
        display: flex;
    }

    .site-nav__links {
        display: none;
        position: absolute;
        inset-block-start: 100%;
        inset-inline: 0;
        background-color: var(--origam-color-surface-default, #fff);
        border-block-end: 1px solid var(--origam-color-border-default, transparent);
        padding: var(--origam-space-4, 1rem);
    }

    .site-nav__links--open {
        display: block;
    }

    .site-nav__list {
        flex-direction: column;
        align-items: stretch;
    }
}
</style>
