<script setup lang="ts">
import { FOOTER_SECTIONS } from '~/consts/footer-sections.const'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const { t } = useI18nFallback()
</script>

<template>
    <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__brand">
                <NuxtLink
                    to="/"
                    class="site-footer__logo"
                    :aria-label="t('nav.logoLabel', 'origam — home')"
                >
                    <img
                        src="/logo.svg"
                        alt=""
                        class="site-footer__logo-img"
                        width="40"
                        height="40"
                        aria-hidden="true"
                    >
                    <span class="site-footer__logo-text">origam</span>
                </NuxtLink>
                <p class="site-footer__tagline">
                    {{ t('footer.tagline', 'The Vue 3 design system that just works.') }}
                </p>
            </div>

            <nav
                v-for="section in FOOTER_SECTIONS"
                :key="section.id"
                class="site-footer__section"
                :aria-label="t(section.titleKey, section.titleFallback)"
            >
                <h2 class="site-footer__section-title">
                    {{ t(section.titleKey, section.titleFallback) }}
                </h2>
                <ul class="site-footer__links" role="list">
                    <li
                        v-for="link in section.links"
                        :key="link.id"
                        class="site-footer__item"
                    >
                        <NuxtLink
                            v-if="!link.external"
                            :to="link.href"
                            class="site-footer__link"
                        >
                            {{ t(link.labelKey, link.labelFallback) }}
                        </NuxtLink>
                        <a
                            v-else
                            :href="link.href"
                            class="site-footer__link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ t(link.labelKey, link.labelFallback) }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>

        <div class="site-footer__bottom">
            <p class="site-footer__legal">
                {{ t('footer.copyright', `© 2026 origam · MIT · v${MARKETING_DEFAULTS.npmVersion}`) }}
            </p>
            <p class="site-footer__madewith">
                {{ t('footer.madeWith', 'Made with') }}
                <a
                    href="https://github.com/arnaudprioul/origam"
                    class="site-footer__link site-footer__link--inline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    origam
                </a>
            </p>
        </div>
    </footer>
</template>

<style scoped>
.site-footer {
    background-color: var(--origam-color-surface-subtle, transparent);
    border-block-start: 1px solid var(--origam-color-border-default, transparent);
    padding-block-start: var(--origam-space-12, 3rem);
}

.site-footer__inner {
    display: grid;
    grid-template-columns: 2fr repeat(3, 1fr);
    gap: var(--origam-space-8, 2rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block-end: var(--origam-space-8, 2rem);
}

.site-footer__logo {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    text-decoration: none;
    margin-block-end: var(--origam-space-3, 0.75rem);
}

.site-footer__logo-img {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    display: block;
}

.site-footer__logo-text {
    font-size: var(--origam-font-size-xl, 1.25rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default, currentColor);
    letter-spacing: -0.02em;
}

.site-footer__tagline {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
    max-width: 22rem;
}

.site-footer__section-title {
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default, currentColor);
    margin-block-end: var(--origam-space-4, 1rem);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.site-footer__links {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.site-footer__link {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
    text-decoration: none;
    transition: color 0.15s ease;
}

.site-footer__link:hover,
.site-footer__link:focus-visible {
    color: var(--origam-color-action-primary-bg, currentColor);
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
    border-radius: 2px;
}

.site-footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--origam-space-4, 1rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block: var(--origam-space-4, 1rem);
    border-block-start: 1px solid var(--origam-color-border-default, transparent);
}

.site-footer__legal,
.site-footer__madewith {
    font-size: var(--origam-font-size-xs, 0.75rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.site-footer__link--inline {
    font-size: inherit;
}

@media (max-width: 1024px) {
    .site-footer__inner {
        grid-template-columns: 1fr 1fr;
    }

    .site-footer__brand {
        grid-column: 1 / -1;
    }
}

@media (max-width: 640px) {
    .site-footer__inner {
        grid-template-columns: 1fr;
    }

    .site-footer__bottom {
        flex-direction: column;
        align-items: flex-start;
    }
}
</style>
