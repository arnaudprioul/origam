<script setup lang="ts">
const { t } = useI18nFallback()
</script>

<template>
    <section
        class="home-showcase"
        aria-labelledby="showcase-title"
    >
        <div class="home-showcase__inner">
            <header class="home-showcase__header">
                <h2
                    id="showcase-title"
                    class="home-showcase__title"
                >
                    {{ t('showcase.heading', 'See it in action') }}
                </h2>
                <p class="home-showcase__subtitle">
                    {{ t('showcase.subtitle', 'Every component ships accessible, themed, and production-ready.') }}
                </p>
            </header>

            <div
                class="home-showcase__scroll"
                role="region"
                :aria-label="t('showcase.carouselLabel', 'Component showcase carousel')"
                tabindex="0"
            >
                <ol class="home-showcase__track" role="list">
                    <li class="home-showcase__slide">
                        <OrigamCard elevation="2" rounded="2xl" class="home-showcase__card">
                            <OrigamCardHeader>
                                <span class="home-showcase__card-label">
                                    {{ t('showcase.btn.label', 'Button variants') }}
                                </span>
                            </OrigamCardHeader>
                            <OrigamCardText>
                                <div class="home-showcase__demo-row">
                                    <OrigamBtn color="primary" variant="flat" rounded="lg" size="sm">
                                        {{ t('showcase.btn.flat', 'Flat') }}
                                    </OrigamBtn>
                                    <OrigamBtn color="primary" variant="outlined" rounded="lg" size="sm">
                                        {{ t('showcase.btn.outlined', 'Outlined') }}
                                    </OrigamBtn>
                                    <OrigamBtn color="primary" variant="tonal" rounded="lg" size="sm">
                                        {{ t('showcase.btn.tonal', 'Tonal') }}
                                    </OrigamBtn>
                                    <OrigamBtn color="primary" variant="text" rounded="lg" size="sm">
                                        {{ t('showcase.btn.text', 'Text') }}
                                    </OrigamBtn>
                                </div>
                            </OrigamCardText>
                        </OrigamCard>
                    </li>

                    <li class="home-showcase__slide">
                        <OrigamCard elevation="2" rounded="2xl" class="home-showcase__card">
                            <OrigamCardHeader>
                                <span class="home-showcase__card-label">
                                    {{ t('showcase.chips.label', 'Chip group') }}
                                </span>
                            </OrigamCardHeader>
                            <OrigamCardText>
                                <div class="home-showcase__demo-row home-showcase__demo-row--wrap">
                                    <OrigamChip color="primary" variant="tonal" size="sm">
                                        {{ t('showcase.chips.vue3', 'Vue 3') }}
                                    </OrigamChip>
                                    <OrigamChip color="success" variant="tonal" size="sm">
                                        {{ t('showcase.chips.a11y', 'A11y') }}
                                    </OrigamChip>
                                    <OrigamChip color="info" variant="tonal" size="sm">
                                        {{ t('showcase.chips.ts', 'TypeScript') }}
                                    </OrigamChip>
                                    <OrigamChip color="secondary" variant="tonal" size="sm">
                                        {{ t('showcase.chips.tokens', 'Tokens') }}
                                    </OrigamChip>
                                    <OrigamChip color="warning" variant="tonal" size="sm">
                                        {{ t('showcase.chips.css', 'CSS-first') }}
                                    </OrigamChip>
                                </div>
                            </OrigamCardText>
                        </OrigamCard>
                    </li>

                    <li class="home-showcase__slide">
                        <OrigamCard elevation="2" rounded="2xl" class="home-showcase__card">
                            <OrigamCardHeader>
                                <span class="home-showcase__card-label">
                                    {{ t('showcase.alert.label', 'Alert') }}
                                </span>
                            </OrigamCardHeader>
                            <OrigamCardText>
                                <div class="home-showcase__demo-col">
                                    <OrigamAlert
                                        color="info"
                                        variant="tonal"
                                        prepend-icon="mdi:information"
                                    >
                                        {{ t('showcase.alert.info', 'WCAG 2.1 AA on every component.') }}
                                    </OrigamAlert>
                                    <OrigamAlert
                                        color="success"
                                        variant="tonal"
                                        prepend-icon="mdi:check-circle"
                                    >
                                        {{ t('showcase.alert.success', 'Strict TypeScript throughout.') }}
                                    </OrigamAlert>
                                </div>
                            </OrigamCardText>
                        </OrigamCard>
                    </li>

                    <li class="home-showcase__slide">
                        <OrigamCard elevation="2" rounded="2xl" class="home-showcase__card">
                            <OrigamCardHeader>
                                <span class="home-showcase__card-label">
                                    {{ t('showcase.avatars.label', 'Avatar group') }}
                                </span>
                            </OrigamCardHeader>
                            <OrigamCardText>
                                <div class="home-showcase__demo-row">
                                    <OrigamAvatarGroup>
                                        <OrigamAvatar color="primary" size="md">A</OrigamAvatar>
                                        <OrigamAvatar color="success" size="md">B</OrigamAvatar>
                                        <OrigamAvatar color="warning" size="md">C</OrigamAvatar>
                                        <OrigamAvatar color="danger" size="md">+4</OrigamAvatar>
                                    </OrigamAvatarGroup>
                                </div>
                            </OrigamCardText>
                        </OrigamCard>
                    </li>

                    <li class="home-showcase__slide">
                        <OrigamCard elevation="2" rounded="2xl" class="home-showcase__card">
                            <OrigamCardHeader>
                                <span class="home-showcase__card-label">
                                    {{ t('showcase.badge.label', 'Badge') }}
                                </span>
                            </OrigamCardHeader>
                            <OrigamCardText>
                                <div class="home-showcase__demo-row">
                                    <OrigamBadge color="danger" content="3">
                                        <OrigamBtn color="primary" variant="flat" rounded="lg" size="sm">
                                            {{ t('showcase.badge.inbox', 'Inbox') }}
                                        </OrigamBtn>
                                    </OrigamBadge>
                                    <OrigamBadge color="success" dot>
                                        <OrigamBtn variant="outlined" rounded="lg" size="sm">
                                            {{ t('showcase.badge.status', 'Status') }}
                                        </OrigamBtn>
                                    </OrigamBadge>
                                </div>
                            </OrigamCardText>
                        </OrigamCard>
                    </li>

                    <li class="home-showcase__slide">
                        <OrigamCard elevation="2" rounded="2xl" class="home-showcase__card">
                            <OrigamCardHeader>
                                <span class="home-showcase__card-label">
                                    {{ t('showcase.progress.label', 'Progress') }}
                                </span>
                            </OrigamCardHeader>
                            <OrigamCardText>
                                <div class="home-showcase__demo-col">
                                    <OrigamProgress
                                        :model-value="72"
                                        color="primary"
                                        rounded="pill"
                                    />
                                    <OrigamProgress
                                        :model-value="45"
                                        color="success"
                                        rounded="pill"
                                    />
                                    <OrigamProgress
                                        :model-value="88"
                                        color="warning"
                                        rounded="pill"
                                    />
                                </div>
                            </OrigamCardText>
                        </OrigamCard>
                    </li>
                </ol>
            </div>

            <div class="home-showcase__cta">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="outlined"
                    rounded="pill"
                    append-icon="mdi:arrow-right"
                >
                    {{ t('showcase.cta', 'View all components') }}
                </OrigamBtn>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-showcase {
    padding-block: var(--origam-space-20, 5rem);
    padding-inline: var(--origam-space-6, 1.5rem);
    container-type: inline-size;
}

.home-showcase__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-10, 2.5rem);
}

.home-showcase__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
}

.home-showcase__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    letter-spacing: -0.02em;
    color: var(--origam-color-text-default, currentColor);
    margin: 0;
}

.home-showcase__subtitle {
    font-size: var(--origam-font-size-lg, 1.125rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.home-showcase__scroll {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    scrollbar-color: var(--origam-color-border-default, transparent) transparent;
    padding-block-end: var(--origam-space-2, 0.5rem);
    outline-offset: 4px;
}

.home-showcase__scroll:focus-visible {
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    border-radius: var(--origam-rounded-lg, 0.75rem);
}

.home-showcase__track {
    display: flex;
    gap: var(--origam-space-4, 1rem);
    width: max-content;
    list-style: none;
    margin: 0;
    padding: var(--origam-space-2, 0.5rem) 0;
}

.home-showcase__slide {
    scroll-snap-align: start;
    width: 22rem;
    flex-shrink: 0;
}

.home-showcase__card {
    height: 100%;
}

.home-showcase__card-label {
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-muted, currentColor);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.home-showcase__demo-row {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--origam-space-2, 0.5rem);
    align-items: center;
}

.home-showcase__demo-row--wrap {
    flex-wrap: wrap;
}

.home-showcase__demo-col {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
}

.home-showcase__cta {
    display: flex;
    justify-content: center;
}

@container (max-width: 640px) {
    .home-showcase__slide {
        width: 80vw;
    }
}
</style>
