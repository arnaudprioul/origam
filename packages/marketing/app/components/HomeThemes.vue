<script setup lang="ts">
import { MARKETING_THEMES } from '~/consts/marketing-themes.const'

const { t } = useI18nFallback()

const MINI_THEMES = [
    { bg: '#fff', fg: '#171717', sub: '#737373', accent: '#7C3AED', name: 'light' },
    { bg: '#0A0A0A', fg: '#fff', sub: '#A3A3A3', accent: '#A78BFA', name: 'dark' },
    { bg: '#FFFBEB', fg: '#78350F', sub: '#92400E', accent: '#F59E0B', name: 'brand-a' },
    { bg: '#F0FDF4', fg: '#14532D', sub: '#166534', accent: '#16A34A', name: 'brand-b' }
] as const
</script>

<template>
    <section
        class="home-themes"
        aria-labelledby="themes-title"
    >
        <div class="home-themes__inner">
            <div class="home-themes__text">
                <span class="m-section-pre">{{ t('home.themes.eyebrow', 'THEMING') }}</span>
                <h2
                    id="themes-title"
                    class="home-themes__title"
                >
                    {{ t('home.themes.title', 'One design system.') }}<br>
                    {{ t('home.themes.titleSub', 'Every brand.') }}
                </h2>
                <p class="home-themes__body m-body">
                    {{ t('home.themes.body', 'DTCG-compliant design tokens, multi-theme out of the box. Switch between light, dark or your custom brand at runtime — zero remount, zero flicker.') }}
                </p>

                <ul class="home-themes__pills" role="list">
                    <li
                        v-for="theme in MARKETING_THEMES"
                        :key="theme.id"
                    >
                        <span class="m-pill m-pill--neutral">
                            {{ t(`themes.${theme.id}.label`, theme.label) }}
                        </span>
                    </li>
                </ul>

                <p class="home-themes__compat m-mono-tag">
                    {{ t('home.themes.compat', '→ tokens.studio compatible · → Style Dictionary v4') }}
                </p>
            </div>

            <div
                class="home-themes__grid"
                aria-label="Theme preview cards"
            >
                <article
                    v-for="theme in MINI_THEMES"
                    :key="theme.name"
                    class="home-themes__card"
                    :style="{ background: theme.bg }"
                    :aria-label="theme.name"
                >
                    <p class="home-themes__card-filename" :style="{ color: theme.sub }">
                        {{ theme.name }}.json
                    </p>
                    <div class="home-themes__card-bar home-themes__card-bar--title" :style="{ background: theme.fg }" />
                    <div class="home-themes__card-bar home-themes__card-bar--body" :style="{ background: theme.sub }" />
                    <div class="home-themes__card-bar home-themes__card-bar--body home-themes__card-bar--short" :style="{ background: theme.sub }" />
                    <span class="home-themes__card-btn" :style="{ background: theme.accent }">
                        Button
                    </span>
                </article>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-themes {
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    container-type: inline-size;
}

.home-themes__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--origam-space---16, 4rem);
    align-items: center;
}

.home-themes__text {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---5, 1.25rem);
}

.home-themes__title {
    font-size: clamp(2rem, 3.5vw + 0.5rem, 2.75rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: -0.025em;
    color: var(--origam-color__text---primary, #171717);
    margin: 0;
    line-height: var(--origam-font__lineHeight---tight, 1.1);
}

.home-themes__body {
    max-width: 36rem;
}

.home-themes__pills {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-themes__compat {
    color: var(--origam-color__text---secondary, #525252);
    font-size: var(--origam-font__size---sm, 0.75rem);
}

.home-themes__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--origam-space---3, 0.75rem);
}

.home-themes__card {
    border-radius: var(--origam-radius---md, 0.5rem);
    padding: var(--origam-space---5, 1.25rem);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
}

.home-themes__card-filename {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: 9px;
    margin: 0 0 var(--origam-space---2, 0.5rem);
    letter-spacing: 0.02em;
}

.home-themes__card-bar {
    border-radius: 2px;
}

.home-themes__card-bar--title {
    height: 8px;
    width: 70%;
    opacity: 0.8;
}

.home-themes__card-bar--body {
    height: 6px;
    width: 90%;
    opacity: 0.5;
}

.home-themes__card-bar--short {
    width: 60%;
    margin-block-end: var(--origam-space---2, 0.5rem);
}

.home-themes__card-btn {
    display: inline-block;
    padding: 5px 12px;
    border-radius: var(--origam-radius---sm, 0.25rem);
    color: #fff;
    font-size: 10px;
    font-weight: var(--origam-font__weight---semibold, 600);
    align-self: flex-start;
}

@container (max-width: 760px) {
    .home-themes__inner {
        grid-template-columns: 1fr;
    }
}
</style>
