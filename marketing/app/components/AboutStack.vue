<script setup lang="ts">
import type { IAboutStackItem } from '~/interfaces/about.interface'

defineProps<{
    stack: ReadonlyArray<IAboutStackItem>
}>()

const { t } = useI18nFallback()
</script>

<template>
    <section
        class="about-stack"
        :aria-labelledby="t('about.stack.headingId', 'stack-heading')"
    >
        <h2
            id="stack-heading"
            class="about-stack__heading"
        >
            {{ t('about.stack.heading', 'Stack we use') }}
        </h2>

        <ul
            role="list"
            class="about-stack__list"
        >
            <li
                v-for="item in stack"
                :key="item.name"
                class="about-stack__item"
            >
                <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="about-stack__link"
                    :aria-label="`${item.name} — ${item.role} (${t('about.stack.opensNewTab', 'opens in new tab')})`"
                >
                    <OrigamChip
                        variant="tonal"
                        color="neutral"
                        :prepend-icon="item.icon"
                        class="about-stack__chip"
                        tag="span"
                    >
                        {{ item.name }}
                    </OrigamChip>
                </a>
            </li>
        </ul>
    </section>
</template>

<style scoped>
.about-stack {
    padding-block: var(--origam-space-12, 3rem);
}

.about-stack__heading {
    font-size: clamp(1.5rem, 2vw + 0.5rem, 2rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default);
    margin-block-end: var(--origam-space-8, 2rem);
    margin-block-start: 0;
    line-height: 1.2;
}

.about-stack__list {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-3, 0.75rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.about-stack__item {
    display: contents;
}

.about-stack__link {
    text-decoration: none;
    border-radius: var(--origam-rounded-full, 9999px);
}

.about-stack__link:focus-visible {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 3px;
}

.about-stack__chip {
    cursor: pointer;
    transition: opacity 0.15s ease;
}

.about-stack__link:hover .about-stack__chip {
    opacity: 0.8;
}
</style>
