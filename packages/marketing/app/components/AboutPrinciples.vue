<script setup lang="ts">
import type { IAboutPrinciple } from '~/interfaces/about.interface'

defineProps<{
    principles: ReadonlyArray<IAboutPrinciple>
}>()

const { t } = useI18nFallback()
</script>

<template>
    <section
        class="about-principles"
        :aria-labelledby="t('about.principles.headingId', 'principles-heading')"
    >
        <h2
            id="principles-heading"
            class="about-principles__heading"
        >
            {{ t('about.principles.heading', 'Philosophy') }}
        </h2>

        <ul
            role="list"
            class="about-principles__grid"
        >
            <li
                v-for="principle in principles"
                :key="principle.title"
                class="about-principles__item"
            >
                <OrigamIcon
                    :icon="principle.icon"
                    class="about-principles__icon"
                    aria-hidden="true"
                    size="x-large"
                    color="primary"
                />
                <h3 class="about-principles__title">{{ principle.title }}</h3>
                <p class="about-principles__body">{{ principle.body }}</p>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.about-principles {
    padding-block: var(--origam-space-12, 3rem);
}

.about-principles__heading {
    font-size: clamp(1.5rem, 2vw + 0.5rem, 2rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default);
    margin-block-end: var(--origam-space-8, 2rem);
    margin-block-start: 0;
    line-height: 1.2;
}

.about-principles__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--origam-space-4, 1rem);
    list-style: none;
    margin: 0;
    padding: 0;
    container-type: inline-size;
}

@container (min-width: 600px) {
    .about-principles__grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

.about-principles__item {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
    padding: var(--origam-space-6, 1.5rem);
    background-color: var(--origam-color-surface-default);
    border-radius: var(--origam-rounded-2xl, 1rem);
    box-shadow: var(--origam-shadow-sm);
    border: 1px solid var(--origam-color-border-subtle);
    transition: box-shadow 0.2s ease;
}

.about-principles__item:hover {
    box-shadow: var(--origam-shadow-md);
}

.about-principles__icon {
    flex-shrink: 0;
}

.about-principles__title {
    font-size: var(--origam-font-size-lg, 1.125rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default);
    margin: 0;
    line-height: 1.3;
}

.about-principles__body {
    font-size: var(--origam-font-size-base, 1rem);
    color: var(--origam-color-text-secondary);
    line-height: 1.6;
    margin: 0;
}
</style>
