<script setup lang="ts">
import type { IChangelogRelease } from '~/interfaces/changelog.interface'
import type { TChangelogType } from '~/types/changelog-type.type'
import { CHANGELOG_TYPE_LABELS, CHANGELOG_TYPE_COLORS, CHANGELOG_TYPE_ICONS } from '~/consts/changelog.const'
import { useI18nFallback } from '~/composables/useI18nFallback'

const props = defineProps<{
    release: IChangelogRelease
    activeTypes: TChangelogType[]
}>()

const { t } = useI18nFallback()

const visibleSections = computed(() => {
    if (props.activeTypes.length === 0) {
        return props.release.sections
    }
    return props.release.sections.filter(section => props.activeTypes.includes(section.type))
})

const isVisible = computed(() => visibleSections.value.length > 0)

const isUnreleased = computed(() => props.release.version === 'Unreleased')

const versionLabel = computed(() =>
    isUnreleased.value
        ? t('changelog.unreleased', 'Unreleased')
        : `v${props.release.version}`
)

const formattedDate = computed(() => {
    if (!props.release.date) {
        return ''
    }
    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(props.release.date))
})
</script>

<template>
    <section v-if="isVisible" class="changelog-release">
        <header class="changelog-release__header">
            <h2 class="changelog-release__version">{{ versionLabel }}</h2>
            <time
                v-if="release.date"
                :datetime="release.date"
                class="changelog-release__date"
            >{{ formattedDate }}</time>
            <span
                v-if="isUnreleased"
                class="changelog-release__badge"
                data-intent="warning"
            >{{ t('changelog.comingSoon', 'Coming soon') }}</span>
        </header>

        <div class="changelog-release__body">
            <article
                v-for="section in visibleSections"
                :key="section.type"
                class="changelog-release__section"
                :data-type="section.type"
            >
                <h3 class="changelog-release__section-title">
                    <span
                        class="changelog-release__section-icon"
                        :data-intent="CHANGELOG_TYPE_COLORS[section.type]"
                        aria-hidden="true"
                    >
                        <OrigamIcon :icon="CHANGELOG_TYPE_ICONS[section.type]" />
                    </span>
                    {{ CHANGELOG_TYPE_LABELS[section.type] }}
                </h3>

                <ul role="list" class="changelog-release__entries">
                    <ChangelogEntry
                        v-for="(entry, index) in section.entries"
                        :key="index"
                        :entry="entry"
                        :type="section.type"
                    />
                </ul>
            </article>
        </div>
    </section>
</template>

<style scoped>
.changelog-release {
    container-type: inline-size;
    background-color: var(--origam-color-surface-default);
    border-radius: var(--origam-rounded-2xl, 1rem);
    box-shadow: var(--origam-shadow-sm);
    overflow: hidden;
    border: 1px solid var(--origam-color-border-subtle);
}

.changelog-release__header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    padding: 1.25rem 1.5rem;
    border-block-end: 1px solid var(--origam-color-border-subtle);
    background-color: var(--origam-color-surface-raised);
}

.changelog-release__version {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--origam-color-text-primary);
    margin: 0;
    font-family: var(--origam-font-mono, monospace);
    line-height: 1.25;
}

.changelog-release__date {
    font-size: 0.875rem;
    color: var(--origam-color-text-secondary);
}

.changelog-release__badge {
    display: inline-block;
    padding: 0.125rem 0.625rem;
    border-radius: var(--origam-rounded-full, 9999px);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background-color: color-mix(in srgb, var(--origam-color-warning-500) 15%, transparent);
    color: var(--origam-color-warning-700);
}

.changelog-release__body {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.changelog-release__section {
    padding: 1rem 1.5rem;
    border-block-end: 1px solid var(--origam-color-border-subtle);
}

.changelog-release__section:last-child {
    border-block-end: none;
}

.changelog-release__section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--origam-color-text-secondary);
    margin: 0 0 0.75rem;
}

.changelog-release__section-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    flex-shrink: 0;
}

.changelog-release__section-icon[data-intent="success"] { color: var(--origam-color-success-600); }
.changelog-release__section-icon[data-intent="info"]    { color: var(--origam-color-info-600); }
.changelog-release__section-icon[data-intent="ghost"]   { color: var(--origam-color-neutral-500); }
.changelog-release__section-icon[data-intent="secondary"] { color: var(--origam-color-secondary-600); }
.changelog-release__section-icon[data-intent="warning"] { color: var(--origam-color-warning-600); }
.changelog-release__section-icon[data-intent="danger"]  { color: var(--origam-color-danger-600); }

.changelog-release__entries {
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
