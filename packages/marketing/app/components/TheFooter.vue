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
                <div class="site-footer__social">
                    <a
                        :href="`https://github.com/${MARKETING_DEFAULTS.githubRepo}`"
                        class="site-footer__social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        :aria-label="t('nav.githubLabel', 'View on GitHub (opens in new tab)')"
                    >
                        <OrigamIcon icon="mdi:github" />
                    </a>
                    <a
                        href="https://www.npmjs.com/package/origam"
                        class="site-footer__social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="npm"
                    >
                        <OrigamIcon icon="mdi:npm" />
                    </a>
                </div>
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
    background-color: var(--m-surface, var(--origam-color__surface---raised, #0E0E0E));
    border-block-start: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
    padding-block-start: var(--origam-space---16, 4rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
}

.site-footer__inner {
    display: grid;
    grid-template-columns: 2fr repeat(4, 1fr);
    gap: var(--origam-space---8, 2rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space---6, 1.5rem);
    padding-block-end: var(--origam-space---12, 3rem);
}

.site-footer__logo {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    text-decoration: none;
    margin-block-end: var(--origam-space---3, 0.75rem);
}

.site-footer__logo-img {
    inline-size: 2rem;
    block-size: 2rem;
    display: block;
}

.site-footer__logo-text {
    font-size: var(--origam-font__size---2xl, 1.25rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: -0.03em;
    background: linear-gradient(
        135deg,
        var(--origam-color__action--primary---bg, #7c3aed),
        var(--origam-color__feedback--info---bg, #2196f3)
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.site-footer__tagline {
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    margin: 0 0 var(--origam-space---4, 1rem);
    max-width: 20rem;
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
}

.site-footer__social {
    display: flex;
    gap: var(--origam-space---2, 0.5rem);
}

.site-footer__social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--origam-radius---md, 0.5rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    text-decoration: none;
    transition: color 0.15s ease, background-color 0.15s ease;
    font-size: 1.125rem;
}

.site-footer__social-link:hover {
    color: var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed));
    background-color: var(--m-accent-bg, color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 12%, transparent));
}

.site-footer__social-link:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
}

.site-footer__section-title {
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--m-text, var(--origam-color__text---primary, #FAFAFA));
    margin: 0 0 var(--origam-space---4, 1rem);
    text-transform: uppercase;
    letter-spacing: var(--m-uppercase-tracking, 0.08em);
}

.site-footer__links {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.site-footer__link {
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    text-decoration: none;
    transition: color 0.15s ease;
}

.site-footer__link:hover {
    color: var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed));
}

.site-footer__link:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
    border-radius: 2px;
}

.site-footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--origam-space---4, 1rem);
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space---6, 1.5rem);
    padding-block: var(--origam-space---4, 1rem);
    border-block-start: 1px solid var(--m-border, var(--origam-color__border---subtle, rgba(255, 255, 255, 0.08)));
}

.site-footer__legal,
.site-footer__madewith {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--m-text-soft, var(--origam-color__text---secondary, #A3A3A3));
    margin: 0;
}

.site-footer__link--inline {
    font-size: inherit;
    color: var(--m-accent, var(--origam-color__action--primary---bg, #7c3aed));
}

@media (max-width: 1024px) {
    .site-footer__inner {
        grid-template-columns: 1fr 1fr;
    }

    .site-footer__brand {
        grid-column: 1 / -1;
    }
}

@media (max-width: 1280px) {
    .site-footer__inner {
        grid-template-columns: 2fr repeat(2, 1fr);
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
