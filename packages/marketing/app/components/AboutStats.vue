<script setup lang="ts">
import type { IAboutStat } from '~/interfaces/about.interface'

defineProps<{
    stats: ReadonlyArray<IAboutStat>
}>()

const { t } = useI18nFallback()
</script>

<template>
    <section
        class="about-stats"
        :aria-label="t('about.stats.regionLabel', 'Key figures')"
    >
        <dl class="about-stats__grid">
            <div
                v-for="stat in stats"
                :key="stat.label"
                class="about-stats__item"
            >
                <OrigamIcon
                    v-if="stat.icon"
                    :icon="stat.icon"
                    class="about-stats__icon"
                    aria-hidden="true"
                    size="large"
                />
                <dd class="about-stats__value">{{ stat.value }}</dd>
                <dt class="about-stats__label">{{ t(`about.stats.${stat.label}`, stat.label) }}</dt>
            </div>
        </dl>
    </section>
</template>

<style scoped>
.about-stats {
    container-type: inline-size;
    padding-block: var(--origam-space-8, 2rem);
}

.about-stats__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--origam-space-4, 1rem);
    margin: 0;
    padding: 0;
}

@container (min-width: 640px) {
    .about-stats__grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.about-stats__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    padding: var(--origam-space-6, 1.5rem) var(--origam-space-4, 1rem);
    background-color: var(--origam-color-surface-default);
    border-radius: var(--origam-rounded-2xl, 1rem);
    box-shadow: var(--origam-shadow-md);
    text-align: center;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.about-stats__item:hover {
    box-shadow: var(--origam-shadow-lg);
    transform: translateY(-2px);
}

.about-stats__icon {
    color: var(--origam-color-primary-500);
}

.about-stats__value {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default);
    line-height: 1;
    margin: 0;
}

.about-stats__label {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted);
    font-weight: var(--origam-font-weight-medium, 500);
    margin: 0;
}
</style>
