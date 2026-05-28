<script setup lang="ts">
import type { IComponentMeta } from '~/interfaces/component.interface'

const props = defineProps<{
    component: IComponentMeta
}>()

const { t } = useI18nFallback()
const { track } = useAnalytics()

function handleCardClick (): void {
    track('component:click', {
        name: props.component.name,
        category: props.component.category
    })
}

const CATEGORY_INTENT_MAP: Record<string, string> = {
    layout:     'primary',
    navigation: 'secondary',
    forms:      'success',
    data:       'info',
    feedback:   'warning',
    overlay:    'danger',
    media:      'ghost',
    utilities:  'neutral'
}

const categoryIntent = computed(() => CATEGORY_INTENT_MAP[props.component.category] ?? 'neutral')

const detailHref = computed(() => `/components/${props.component.slug}`)
const cardLinkLabel = computed(() =>
    t('components.card.linkLabel', `View ${props.component.name} component`)
)
</script>

<template>
    <article class="component-card">
        <NuxtLink
            :to="detailHref"
            class="component-card__link"
            :aria-label="cardLinkLabel"
            @click="handleCardClick"
        >
            <div
                class="component-card__preview"
                role="presentation"
            >
                <div class="m-dotgrid component-card__preview-dotgrid" aria-hidden="true" />
                <div class="component-card__preview-content">
                    <ComponentMiniPreview :name="component.name" />
                </div>
            </div>

            <header class="component-card__header">
                <span
                    class="component-card__badge"
                    :data-intent="categoryIntent"
                >
                    {{ component.category }}
                </span>
                <h3 class="component-card__name">{{ component.name }}</h3>
            </header>

            <p class="component-card__description">{{ component.description }}</p>
        </NuxtLink>
    </article>
</template>

<style scoped>
.component-card {
    border-radius: var(--m-radius-lg, var(--origam-rounded-xl, 0.75rem));
    background-color: var(--m-surface, var(--origam-color-surface-default, #0e0e0e));
    border: 1px solid var(--m-border, var(--origam-color-border-subtle, rgba(255, 255, 255, 0.08)));
    overflow: hidden;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
    container-type: inline-size;
}

.component-card:hover {
    border-color: var(--m-accent-border, color-mix(in srgb, var(--m-accent, var(--origam-color-action-primary-bg, #7c3aed)) 30%, transparent));
    transform: translateY(-2px);
    box-shadow: var(--m-shadow-card, 0 8px 24px -8px rgba(0, 0, 0, 0.4));
}

.component-card:focus-within {
    outline: 2px solid var(--origam-color-primary-500);
    outline-offset: 2px;
}

.component-card__link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%;
}

.component-card__preview {
    position: relative;
    display: grid;
    place-items: center;
    block-size: 8.75rem;
    background: var(--m-bg, var(--origam-color-surface-default, #0a0a0a));
    border-block-end: 1px solid var(--m-border, var(--origam-color-border-subtle, rgba(255, 255, 255, 0.08)));
    flex-shrink: 0;
    overflow: hidden;
}

.component-card__preview-dotgrid {
    position: absolute;
    inset: 0;
    color: var(--m-text, var(--origam-color-text-primary, #fafafa));
    pointer-events: none;
}

.component-card__preview-content {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    inline-size: 100%;
    block-size: 100%;
    padding: 0.75rem;
}

.component-card__header {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.75rem 1rem 0;
}

.component-card__badge {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    border-radius: var(--origam-rounded-full, 9999px);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: capitalize;
    background-color: color-mix(in srgb, var(--origam-color-primary-500) 15%, transparent);
    color: var(--origam-color-primary-700);
    align-self: flex-start;
}

.component-card__badge[data-intent="secondary"] {
    background-color: color-mix(in srgb, var(--origam-color-secondary-500) 15%, transparent);
    color: var(--origam-color-secondary-700);
}

.component-card__badge[data-intent="success"] {
    background-color: color-mix(in srgb, var(--origam-color-success-500) 15%, transparent);
    color: var(--origam-color-success-700);
}

.component-card__badge[data-intent="info"] {
    background-color: color-mix(in srgb, var(--origam-color-info-500) 15%, transparent);
    color: var(--origam-color-info-700);
}

.component-card__badge[data-intent="warning"] {
    background-color: color-mix(in srgb, var(--origam-color-warning-500) 15%, transparent);
    color: var(--origam-color-warning-700);
}

.component-card__badge[data-intent="danger"] {
    background-color: color-mix(in srgb, var(--origam-color-danger-500) 15%, transparent);
    color: var(--origam-color-danger-700);
}

.component-card__badge[data-intent="ghost"] {
    background-color: color-mix(in srgb, var(--origam-color-neutral-400) 20%, transparent);
    color: var(--origam-color-neutral-700);
}

.component-card__badge[data-intent="neutral"] {
    background-color: color-mix(in srgb, var(--origam-color-neutral-400) 20%, transparent);
    color: var(--origam-color-neutral-700);
}

.component-card__name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--m-text, var(--origam-color-text-primary, #fafafa));
    margin: 0;
    line-height: 1.25;
}

.component-card__description {
    font-size: 0.8125rem;
    color: var(--m-text-soft, var(--origam-color-text-secondary, #a3a3a3));
    margin: 0;
    padding: 0.375rem 1rem 1rem;
    line-height: 1.5;
    flex: 1;
}
</style>
