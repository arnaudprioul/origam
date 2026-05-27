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

const INITIAL_COLORS: ReadonlyArray<string> = [
    'var(--origam-color-primary-500)',
    'var(--origam-color-secondary-500)',
    'var(--origam-color-success-500)',
    'var(--origam-color-warning-500)',
    'var(--origam-color-danger-500)',
    'var(--origam-color-info-500)',
    'var(--origam-color-neutral-400)'
]

const accentColor = computed(() => {
    const index = props.component.name.charCodeAt(0) % INITIAL_COLORS.length
    return INITIAL_COLORS[index]
})

const detailHref = computed(() => `/components/${props.component.slug}`)
const cardLinkLabel = computed(() =>
    t('components.card.linkLabel', `View ${props.component.name} component`)
)
const cardInitial = computed(() => props.component.name.charAt(0))
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
                :style="{ '--card-accent': accentColor }"
            >
                <span class="component-card__initial" aria-hidden="true">
                    {{ cardInitial }}
                </span>
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
    border-radius: var(--origam-rounded-2xl, 1rem);
    background-color: var(--origam-color-surface-default);
    box-shadow: var(--origam-shadow-md);
    overflow: hidden;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    container-type: inline-size;
}

.component-card:hover {
    box-shadow: var(--origam-shadow-lg);
    transform: translateY(-4px);
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
    display: flex;
    align-items: center;
    justify-content: center;
    block-size: 7rem;
    background: linear-gradient(
        135deg,
        color-mix(in srgb, var(--card-accent) 20%, transparent),
        color-mix(in srgb, var(--card-accent) 8%, transparent)
    );
    border-block-end: 1px solid var(--origam-color-border-subtle);
    flex-shrink: 0;
}

.component-card__initial {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--card-accent);
    line-height: 1;
    opacity: 0.8;
    font-family: var(--origam-font-mono, monospace);
    user-select: none;
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
    color: var(--origam-color-text-primary);
    margin: 0;
    line-height: 1.25;
}

.component-card__description {
    font-size: 0.8125rem;
    color: var(--origam-color-text-secondary);
    margin: 0;
    padding: 0.375rem 1rem 1rem;
    line-height: 1.5;
    flex: 1;
}
</style>
