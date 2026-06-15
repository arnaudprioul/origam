<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import {
    WHY_HERO_BADGE_VARS,
    WHY_STRENGTHS,
    WHY_STRENGTH_ICON_TILE_VARS,
    WHY_STRENGTH_ICON_TILE_RADIUS,
    WHY_STRENGTH_ICON_VARS,
    WHY_WEAKNESSES,
    WHY_WEAKNESS_ICON_TILE_VARS,
    WHY_WEAKNESS_ICON_VARS,
    WHY_USE_CASES,
    WHY_COMPARISONS,
    WHY_COMPARISON_COLUMNS
} from '~/consts/why-origam.const'
import { CTA_START_HREF } from '~/consts/cta.const'

const { t } = useT()

useSeoMeta({
    title: () => t('whyOrigam.meta.title', 'Why origam? · Vue 3 design system'),
    description: () => t('whyOrigam.meta.description', 'An honest look at origam.'),
    ogTitle: () => t('whyOrigam.meta.title', 'Why origam? · Vue 3 design system'),
    ogDescription: () => t('whyOrigam.meta.description', 'An honest look at origam.')
})

const strengths = computed(() => WHY_STRENGTHS)
const weaknesses = computed(() => WHY_WEAKNESSES)
const useCases = computed(() => WHY_USE_CASES)
const comparisons = computed(() => WHY_COMPARISONS)
const comparisonColumns = computed(() => WHY_COMPARISON_COLUMNS)

const fits = computed(() => useCases.value.filter(u => u.fits))
const noFits = computed(() => useCases.value.filter(u => !u.fits))
</script>

<template>
    <article
        class="why-origam"
        data-cy="page-why-origam"
    >
        <section
            class="why-hero"
            aria-labelledby="why-title-line1"
        >
            <origam-container class="why-hero__inner">
                <origam-chip
                    class="why-hero__badge"
                    :style="WHY_HERO_BADGE_VARS"
                    color="primary"
                    border
                    border-color="var(--origam-color__action--primary---bg)"
                    size="small"
                    pill
                    data-cy="why-hero-badge"
                >
                    {{ t('whyOrigam.hero.badge', 'Honest by design') }}
                </origam-chip>

                <h1
                    id="why-title-line1"
                    class="why-hero__title"
                    aria-labelledby="why-title-line1 why-title-line2"
                >
                    <span
                        id="why-title-line1"
                        class="why-hero__title-line"
                    >{{ t('whyOrigam.hero.titleLine1', 'Why origam?') }}</span>
                    <span
                        id="why-title-line2"
                        class="why-hero__title-line why-hero__title-line--accent"
                    >{{ t('whyOrigam.hero.titleLine2', 'An honest answer.') }}</span>
                </h1>

                <p class="why-hero__subtitle">
                    {{ t('whyOrigam.hero.subtitle', 'We built origam for Vue 3 teams who care about design quality, accessibility, and token-driven consistency.') }}
                </p>
            </origam-container>
        </section>

        <section
            class="why-strengths"
            aria-labelledby="why-strengths-title"
        >
            <origam-container>
                <header class="why-strengths__header">
                    <p class="why-section__eyebrow">
                        {{ t('whyOrigam.strengths.eyebrow', 'WHAT WE DO WELL') }}
                    </p>

                    <h2
                        id="why-strengths-title"
                        class="why-section__title"
                    >
                        <span class="why-section__title-line">{{ t('whyOrigam.strengths.titleLine1', 'Built for Vue 3.') }}</span>
                        <span class="why-section__title-line why-section__title-line--muted">{{ t('whyOrigam.strengths.titleLine2', 'From the ground up.') }}</span>
                    </h2>

                    <p class="why-section__subtitle">
                        {{ t('whyOrigam.strengths.subtitle', 'Every API, every composable, every prop — designed for Composition API and TypeScript from day one.') }}
                    </p>
                </header>

                <ul class="why-strengths__grid">
                    <li
                        v-for="strength in strengths"
                        :key="strength.titleKey"
                        class="why-strengths__item"
                    >
                        <article class="why-strengths__card">
                            <origam-sheet
                                aria-hidden="true"
                                :rounded="WHY_STRENGTH_ICON_TILE_RADIUS"
                                :style="WHY_STRENGTH_ICON_TILE_VARS"
                                border
                                border-color="var(--origam-color__action--primary---bg)"
                                width="40"
                                height="40"
                                class="why-strengths__icon-tile"
                            >
                                <origam-icon
                                    :icon="strength.icon"
                                    :style="WHY_STRENGTH_ICON_VARS"
                                    class="why-strengths__icon"
                                />
                            </origam-sheet>

                            <h3 class="why-strengths__card-title">
                                {{ t(strength.titleKey, strength.titleKey) }}
                            </h3>

                            <p class="why-strengths__card-desc">
                                {{ t(strength.descriptionKey, strength.descriptionKey) }}
                            </p>
                        </article>
                    </li>
                </ul>
            </origam-container>
        </section>

        <section
            class="why-comparison-wrap"
            aria-labelledby="why-comparison-title"
            data-cy="why-comparison"
        >
            <origam-container>
                <header class="why-comparison__header">
                    <p class="why-section__eyebrow">
                        {{ t('whyOrigam.comparison.eyebrow', 'HONEST COMPARISON') }}
                    </p>

                    <h2
                        id="why-comparison-title"
                        class="why-section__title why-section__title--single"
                    >
                        {{ t('whyOrigam.comparison.title', 'How does origam compare?') }}
                    </h2>

                    <p class="why-section__subtitle">
                        {{ t('whyOrigam.comparison.subtitle', 'A feature-by-feature look at the Vue ecosystem main design systems.') }}
                    </p>
                </header>

                <div class="why-comparison__table-wrap">
                    <table class="why-comparison__table">
                        <caption class="sr-only">
                            {{ t('whyOrigam.comparison.title', 'How does origam compare?') }}
                        </caption>
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    class="why-comparison__th why-comparison__th--lib"
                                >
                                    {{ t('whyOrigam.comparison.colLibrary', 'Library') }}
                                </th>
                                <th
                                    v-for="col in comparisonColumns"
                                    :key="col"
                                    scope="col"
                                    class="why-comparison__th"
                                >
                                    {{ t(col, col) }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="lib in comparisons"
                                :key="lib.nameKey"
                                :class="['why-comparison__tr', { 'why-comparison__tr--origam': lib.nameKey === 'whyOrigam.comparison.origam' }]"
                                :data-cy="`comparison-row-${lib.nameKey}`"
                            >
                                <td class="why-comparison__td why-comparison__td--lib">
                                    <span class="why-comparison__lib-name">{{ t(lib.nameKey, lib.nameKey) }}</span>
                                    <span
                                        v-if="lib.noteKey"
                                        class="why-comparison__lib-note"
                                    >{{ t(lib.noteKey, '') }}</span>
                                </td>
                                <td class="why-comparison__td">
                                    <origam-icon
                                        :icon="lib.vueNative ? 'mdi-check-circle' : 'mdi-minus-circle-outline'"
                                        :class="['why-comparison__icon', lib.vueNative ? 'why-comparison__icon--yes' : 'why-comparison__icon--no']"
                                        :aria-label="lib.vueNative ? t('whyOrigam.comparison.yes', 'Yes') : t('whyOrigam.comparison.no', 'No')"
                                    />
                                </td>
                                <td class="why-comparison__td">
                                    <origam-icon
                                        :icon="lib.designTokens ? 'mdi-check-circle' : 'mdi-minus-circle-outline'"
                                        :class="['why-comparison__icon', lib.designTokens ? 'why-comparison__icon--yes' : 'why-comparison__icon--no']"
                                        :aria-label="lib.designTokens ? t('whyOrigam.comparison.yes', 'Yes') : t('whyOrigam.comparison.no', 'No')"
                                    />
                                </td>
                                <td class="why-comparison__td">
                                    <origam-icon
                                        :icon="lib.a11yTested ? 'mdi-check-circle' : 'mdi-minus-circle-outline'"
                                        :class="['why-comparison__icon', lib.a11yTested ? 'why-comparison__icon--yes' : 'why-comparison__icon--no']"
                                        :aria-label="lib.a11yTested ? t('whyOrigam.comparison.yes', 'Yes') : t('whyOrigam.comparison.no', 'No')"
                                    />
                                </td>
                                <td class="why-comparison__td">
                                    <origam-icon
                                        :icon="lib.cssFist ? 'mdi-check-circle' : 'mdi-minus-circle-outline'"
                                        :class="['why-comparison__icon', lib.cssFist ? 'why-comparison__icon--yes' : 'why-comparison__icon--no']"
                                        :aria-label="lib.cssFist ? t('whyOrigam.comparison.yes', 'Yes') : t('whyOrigam.comparison.no', 'No')"
                                    />
                                </td>
                                <td class="why-comparison__td">
                                    <origam-icon
                                        :icon="lib.treeShakable ? 'mdi-check-circle' : 'mdi-minus-circle-outline'"
                                        :class="['why-comparison__icon', lib.treeShakable ? 'why-comparison__icon--yes' : 'why-comparison__icon--no']"
                                        :aria-label="lib.treeShakable ? t('whyOrigam.comparison.yes', 'Yes') : t('whyOrigam.comparison.no', 'No')"
                                    />
                                </td>
                                <td class="why-comparison__td">
                                    <origam-icon
                                        :icon="lib.chartsIncluded ? 'mdi-check-circle' : 'mdi-minus-circle-outline'"
                                        :class="['why-comparison__icon', lib.chartsIncluded ? 'why-comparison__icon--yes' : 'why-comparison__icon--no']"
                                        :aria-label="lib.chartsIncluded ? t('whyOrigam.comparison.yes', 'Yes') : t('whyOrigam.comparison.no', 'No')"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="why-comparison__disclaimer">
                    {{ t('whyOrigam.comparison.disclaimer', 'Some assessments reflect our interpretation of publicly available documentation.') }}
                </p>
            </origam-container>
        </section>

        <section
            class="why-weaknesses-wrap"
            aria-labelledby="why-weaknesses-title"
            data-cy="why-weaknesses"
        >
            <div class="why-weaknesses__inner">
                <header class="why-weaknesses__header">
                    <p class="why-section__eyebrow why-section__eyebrow--light">
                        {{ t('whyOrigam.weaknesses.eyebrow', "LET'S BE HONEST") }}
                    </p>

                    <h2
                        id="why-weaknesses-title"
                        class="why-section__title why-section__title--light"
                    >
                        <span class="why-section__title-line">{{ t('whyOrigam.weaknesses.titleLine1', "Where we're") }}</span>
                        <span class="why-section__title-line">{{ t('whyOrigam.weaknesses.titleLine2', 'still growing.') }}</span>
                    </h2>

                    <p class="why-section__subtitle why-section__subtitle--light">
                        {{ t('whyOrigam.weaknesses.subtitle', 'origam is young. An asset in terms of API freshness — a constraint in terms of maturity.') }}
                    </p>
                </header>

                <ul class="why-weaknesses__list">
                    <li
                        v-for="weakness in weaknesses"
                        :key="weakness.titleKey"
                        class="why-weaknesses__item"
                    >
                        <origam-sheet
                            aria-hidden="true"
                            rounded="var(--origam-radius---card, 10px)"
                            :style="WHY_WEAKNESS_ICON_TILE_VARS"
                            width="44"
                            height="44"
                            class="why-weaknesses__icon-tile"
                        >
                            <origam-icon
                                :icon="weakness.icon"
                                :style="WHY_WEAKNESS_ICON_VARS"
                                class="why-weaknesses__icon"
                            />
                        </origam-sheet>

                        <div class="why-weaknesses__text">
                            <h3 class="why-weaknesses__item-title">
                                {{ t(weakness.titleKey, weakness.titleKey) }}
                            </h3>
                            <p class="why-weaknesses__item-desc">
                                {{ t(weakness.descriptionKey, weakness.descriptionKey) }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section
            class="why-usecases"
            aria-labelledby="why-usecases-title"
            data-cy="why-usecases"
        >
            <origam-container>
                <header class="why-usecases__header">
                    <p class="why-section__eyebrow">
                        {{ t('whyOrigam.useCases.eyebrow', 'WHO IS ORIGAM FOR') }}
                    </p>

                    <h2
                        id="why-usecases-title"
                        class="why-section__title why-section__title--single"
                    >
                        {{ t('whyOrigam.useCases.title', 'Pick origam when…') }}
                    </h2>
                </header>

                <div class="why-usecases__columns">
                    <div class="why-usecases__col why-usecases__col--yes">
                        <h3 class="why-usecases__col-title why-usecases__col-title--yes">
                            {{ t('whyOrigam.useCases.fitsTitle', 'origam is a great fit') }}
                        </h3>

                        <ul class="why-usecases__list">
                            <li
                                v-for="uc in fits"
                                :key="uc.titleKey"
                                class="why-usecases__item"
                            >
                                <origam-icon
                                    icon="mdi-check-circle-outline"
                                    class="why-usecases__item-icon why-usecases__item-icon--yes"
                                    aria-hidden="true"
                                />
                                <div class="why-usecases__item-body">
                                    <strong class="why-usecases__item-title">{{ t(uc.titleKey, uc.titleKey) }}</strong>
                                    <p class="why-usecases__item-desc">{{ t(uc.descriptionKey, uc.descriptionKey) }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="why-usecases__col why-usecases__col--no">
                        <h3 class="why-usecases__col-title why-usecases__col-title--no">
                            {{ t('whyOrigam.useCases.noFitsTitle', 'origam might not be the right call') }}
                        </h3>

                        <ul class="why-usecases__list">
                            <li
                                v-for="uc in noFits"
                                :key="uc.titleKey"
                                class="why-usecases__item"
                            >
                                <origam-icon
                                    icon="mdi-close-circle-outline"
                                    class="why-usecases__item-icon why-usecases__item-icon--no"
                                    aria-hidden="true"
                                />
                                <div class="why-usecases__item-body">
                                    <strong class="why-usecases__item-title">{{ t(uc.titleKey, uc.titleKey) }}</strong>
                                    <p class="why-usecases__item-desc">{{ t(uc.descriptionKey, uc.descriptionKey) }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </origam-container>
        </section>

        <section
            class="why-cta"
            aria-labelledby="why-cta-title"
            data-cy="why-cta"
        >
            <div class="why-cta__inner">
                <h2
                    id="why-cta-title"
                    class="why-cta__title"
                >
                    {{ t('whyOrigam.cta.title', 'Ready to try it?') }}
                </h2>

                <p class="why-cta__desc">
                    {{ t('whyOrigam.cta.description', 'Install origam in 30 seconds and see how far the defaults take you.') }}
                </p>

                <nav
                    class="why-cta__actions"
                    :aria-label="t('whyOrigam.cta.actionsLabel', 'Try origam')"
                >
                    <origam-btn
                        class="why-cta__btn why-cta__btn--primary"
                        variant="text"
                        append-icon="mdi-arrow-right"
                        :href="CTA_START_HREF"
                        data-cy="why-cta-install"
                    >
                        {{ t('whyOrigam.cta.ctaInstall', 'Get started') }}
                    </origam-btn>

                    <origam-btn
                        class="why-cta__btn why-cta__btn--secondary"
                        variant="text"
                        prepend-icon="mdi-view-grid-outline"
                        href="/components"
                        data-cy="why-cta-components"
                    >
                        {{ t('whyOrigam.cta.ctaComponents', 'Browse components') }}
                    </origam-btn>
                </nav>
            </div>
        </section>
    </article>
</template>

<style scoped>
.why-origam {
    display: flex;
    flex-direction: column;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.why-section__eyebrow {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

.why-section__eyebrow--light {
    color: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.4));
}

.why-section__title {
    margin: 0 0 var(--origam-space---2, 0.5rem);
    display: flex;
    flex-direction: column;
    font-size: var(--origam-font-size---section, 3rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.05;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.why-section__title--single {
    display: block;
}

.why-section__title--light {
    color: var(--origam-color__text---inverse, #ffffff);
}

.why-section__title-line--muted {
    color: var(--origam-color__text---secondary, #525252);
}

.why-section__subtitle {
    margin: var(--origam-space---4, 1rem) 0 0;
    max-inline-size: 42rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
}

.why-section__subtitle--light {
    color: var(--origam-color__text---inverseMuted, rgba(255, 255, 255, 0.72));
}

.why-hero {
    position: relative;
    padding-block: var(--origam-space---20, 5rem) var(--origam-space---16, 4rem);
    overflow: hidden;
}

.why-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--origam-gradient---hero-grid);
    background-size: 64px 64px;
    background-position: center top;
    -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 80%);
    mask-image: linear-gradient(to bottom, #000 0%, transparent 80%);
    pointer-events: none;
    z-index: 0;
}

.why-hero::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 260px;
    background-image: var(--origam-gradient---hero-glow);
    pointer-events: none;
    z-index: 0;
}

.why-hero__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    text-align: center;
}

.why-hero__badge {
    --origam-chip---background-color: transparent;
}

.why-hero__title {
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: var(--origam-font-size---hero, 5.25rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    line-height: var(--origam-line-height---hero, 0.95);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    padding-block-end: 0.1em;
    color: var(--origam-color__text---ink, #0a0a0a);
}

.why-hero__title-line {
    display: block;
}

.why-hero__title-line--accent {
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

.why-hero__subtitle {
    margin: 0;
    max-inline-size: 40rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: var(--origam-line-height---relaxed, 1.7);
    color: var(--origam-color__text---secondary, #525252);
}

.why-strengths {
    padding-block: var(--origam-space---24, 6rem);
}

.why-strengths__header {
    margin-block-end: var(--origam-space---12, 3rem);
}

.why-strengths__grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: var(--origam-space---6, 1.5rem);
}

.why-strengths__item {
    list-style: none;
}

.why-strengths__card {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---6, 1.5rem);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---lg, 14px);
    background: var(--origam-color__surface---raised, #fafafa);
    block-size: 100%;
}

.why-strengths__icon-tile {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.why-strengths__icon {
    font-size: var(--origam-font-size---lg, 1.125rem);
}

.why-strengths__card-title {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.why-strengths__card-desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
}

.why-comparison-wrap {
    padding-block: var(--origam-space---24, 6rem);
    background: var(--origam-color__surface---subtle, #f5f5f5);
}

.why-comparison__header {
    margin-block-end: var(--origam-space---10, 2.5rem);
}

.why-comparison__table-wrap {
    overflow-x: auto;
    border-radius: var(--origam-radius---lg, 14px);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.why-comparison__table {
    inline-size: 100%;
    border-collapse: collapse;
    font-size: var(--origam-font-size---sm, 0.875rem);
}

.why-comparison__th {
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---4, 1rem);
    text-align: center;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---secondary, #525252);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: var(--origam-color__surface---raised, #fafafa);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.why-comparison__th--lib {
    text-align: start;
    min-inline-size: 160px;
}

.why-comparison__tr {
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.06));
}

.why-comparison__tr--origam {
    background: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.06));
}

.why-comparison__tr--origam .why-comparison__lib-name {
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__action--primary---fg, #5b21b6);
}

.why-comparison__td {
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---4, 1rem);
    text-align: center;
    color: var(--origam-color__text---primary, #0a0a0a);
    vertical-align: middle;
}

.why-comparison__td--lib {
    text-align: start;
}

.why-comparison__lib-name {
    display: block;
    font-weight: var(--origam-font__weight---medium, 500);
}

.why-comparison__lib-note {
    display: block;
    font-size: var(--origam-font-size---xs, 0.75rem);
    color: var(--origam-color__text---tertiary, #737373);
    margin-block-start: var(--origam-space---1, 0.25rem);
    max-inline-size: 200px;
}

.why-comparison__icon--yes {
    --origam-icon---color: var(--origam-color__feedback--success---fg, #16a34a);
    font-size: var(--origam-font-size---xl, 1.25rem);
}

.why-comparison__icon--no {
    --origam-icon---color: var(--origam-color__text---tertiary, #d4d4d4);
    font-size: var(--origam-font-size---xl, 1.25rem);
}

.why-comparison__disclaimer {
    margin-block-start: var(--origam-space---5, 1.25rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    color: var(--origam-color__text---tertiary, #737373);
    font-style: italic;
}

.why-weaknesses-wrap {
    background: var(--origam-color__surface---inverse, #0a0a0a);
    padding-block: var(--origam-space---24, 6rem);
    padding-inline: var(--origam-space---6, 1.5rem);
}

.why-weaknesses__inner {
    max-inline-size: 64rem;
    margin-inline: auto;
}

.why-weaknesses__header {
    margin-block-end: var(--origam-space---12, 3rem);
}

.why-weaknesses__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---8, 2rem);
}

.why-weaknesses__item {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space---5, 1.25rem);
}

.why-weaknesses__icon-tile {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.why-weaknesses__icon {
    font-size: var(--origam-font-size---xl, 1.25rem);
}

.why-weaknesses__text {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
}

.why-weaknesses__item-title {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---inverse, #ffffff);
}

.why-weaknesses__item-desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.65;
    color: var(--origam-color__text---inverseMuted, rgba(255, 255, 255, 0.65));
}

.why-usecases {
    padding-block: var(--origam-space---24, 6rem);
}

.why-usecases__header {
    margin-block-end: var(--origam-space---10, 2.5rem);
}

.why-usecases__columns {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--origam-space---8, 2rem);
}

.why-usecases__col {
    padding: var(--origam-space---6, 1.5rem);
    border-radius: var(--origam-radius---lg, 14px);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.why-usecases__col--yes {
    background: var(--origam-color__feedback--success---bgSubtle, rgba(22, 163, 74, 0.05));
}

.why-usecases__col--no {
    background: var(--origam-color__surface---raised, #fafafa);
}

.why-usecases__col-title {
    margin: 0 0 var(--origam-space---5, 1.25rem);
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---semibold, 600);
}

.why-usecases__col-title--yes {
    color: var(--origam-color__feedback--success---fg, #16a34a);
}

.why-usecases__col-title--no {
    color: var(--origam-color__text---secondary, #525252);
}

.why-usecases__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---5, 1.25rem);
}

.why-usecases__item {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space---3, 0.75rem);
}

.why-usecases__item-icon {
    flex-shrink: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    margin-block-start: 0.1em;
}

.why-usecases__item-icon--yes {
    --origam-icon---color: var(--origam-color__feedback--success---fg, #16a34a);
}

.why-usecases__item-icon--no {
    --origam-icon---color: var(--origam-color__text---tertiary, #a3a3a3);
}

.why-usecases__item-body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
}

.why-usecases__item-title {
    display: block;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
}

.why-usecases__item-desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
}

.why-cta {
    position: relative;
    padding-block: var(--origam-space---30, 7.5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    overflow: hidden;
}

.why-cta::before {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 280px;
    background-image: var(--origam-gradient---cta-glow-top);
    pointer-events: none;
    z-index: 0;
}

.why-cta__inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    max-inline-size: 48rem;
    margin-inline: auto;
    text-align: center;
}

.why-cta__title {
    margin: 0;
    font-size: var(--origam-font-size---cta, 4rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    letter-spacing: var(--origam-letter-spacing---hero, -0.045em);
    line-height: var(--origam-line-height---hero, 0.95);
    color: var(--origam-color__text---ink, #0a0a0a);
}

.why-cta__desc {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    max-inline-size: 36rem;
}

.why-cta__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---3, 0.75rem);
    margin-block-start: var(--origam-space---2, 0.5rem);
}

.why-cta__btn {
    --origam-btn---height: 52px;
    --origam-btn---density: 0px;
    --origam-btn---density-padding-x: var(--origam-space---6, 1.5rem);
    --origam-btn---font-size: 1rem;
    --origam-btn---font-weight: 400;
    --origam-btn---border-radius: var(--origam-radius---btn, 10px);
}

.why-cta__btn--primary {
    background-image: var(--origam-gradient---btn-primary);
    background-color: var(--origam-color---btn-primary-bg, transparent);
    box-shadow: var(--origam-shadow---btn-primary);
    --origam-btn---color: var(--origam-color---btn-primary-text);
}

.why-cta__btn--secondary {
    background-image: var(--origam-gradient---btn-secondary);
    background-color: var(--origam-color---btn-secondary-bg);
    box-shadow: var(--origam-shadow---btn-secondary);
    border: 1px solid var(--origam-color---btn-secondary-border);
    --origam-btn---color: var(--origam-color---btn-secondary-text);
    --origam-btn---density-padding-x: var(--origam-space---4, 1rem);
}

@media (max-width: 1080px) {
    .why-hero__title {
        font-size: clamp(2.5rem, 9vw, 5.25rem);
    }
}

@media (max-width: 768px) {
    .why-section__title {
        font-size: clamp(1.75rem, 7vw, 3rem);
    }

    .why-cta__title {
        font-size: clamp(2rem, 8vw, 4rem);
    }

    .why-usecases__columns {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .why-strengths__grid {
        grid-template-columns: 1fr;
    }
}
</style>
