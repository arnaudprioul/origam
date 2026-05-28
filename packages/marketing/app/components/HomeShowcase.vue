<script setup lang="ts">
const { t } = useI18nFallback()

const activeTab = ref(0)

const SHOWCASE_TABS = ['buttons', 'chips', 'alerts', 'avatars'] as const

function selectTab (index: number): void {
    activeTab.value = index
}
</script>

<template>
    <section
        class="home-showcase"
        aria-labelledby="showcase-title"
    >
        <div class="home-showcase__inner">
            <header class="home-showcase__header">
                <div class="home-showcase__eyebrow">
                    {{ t('home.showcase.eyebrow', 'Live components') }}
                </div>
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

            <div class="home-showcase__stage">
                <div class="home-showcase__hero-tiles">
                    <div class="home-showcase__tile home-showcase__tile--large">
                        <div class="home-showcase__tile-header">
                            <span class="home-showcase__tile-label">
                                {{ t('showcase.btn.label', 'Button variants') }}
                            </span>
                        </div>
                        <div class="home-showcase__tile-body">
                            <div class="home-showcase__demo-row">
                                <OrigamBtn color="primary" variant="flat" rounded="lg">
                                    {{ t('showcase.btn.flat', 'Primary') }}
                                </OrigamBtn>
                                <OrigamBtn color="primary" variant="outlined" rounded="lg">
                                    {{ t('showcase.btn.outlined', 'Outlined') }}
                                </OrigamBtn>
                                <OrigamBtn color="primary" variant="tonal" rounded="lg">
                                    {{ t('showcase.btn.tonal', 'Tonal') }}
                                </OrigamBtn>
                            </div>
                            <div class="home-showcase__demo-row">
                                <OrigamBtn color="success" variant="flat" rounded="lg">
                                    {{ t('showcase.btn.success', 'Success') }}
                                </OrigamBtn>
                                <OrigamBtn color="danger" variant="flat" rounded="lg">
                                    {{ t('showcase.btn.danger', 'Danger') }}
                                </OrigamBtn>
                                <OrigamBtn color="warning" variant="flat" rounded="lg">
                                    {{ t('showcase.btn.warning', 'Warning') }}
                                </OrigamBtn>
                            </div>
                            <div class="home-showcase__demo-row">
                                <OrigamBtn color="primary" variant="flat" rounded="pill" prepend-icon="mdi:plus">
                                    {{ t('showcase.btn.icon', 'With icon') }}
                                </OrigamBtn>
                                <OrigamBtn color="primary" variant="text">
                                    {{ t('showcase.btn.text', 'Text') }}
                                </OrigamBtn>
                            </div>
                        </div>
                    </div>

                    <div class="home-showcase__tile home-showcase__tile--medium">
                        <div class="home-showcase__tile-header">
                            <span class="home-showcase__tile-label">
                                {{ t('showcase.chips.label', 'Chip group') }}
                            </span>
                        </div>
                        <div class="home-showcase__tile-body">
                            <div class="home-showcase__demo-wrap">
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
                                <OrigamChip color="danger" variant="tonal" size="sm">
                                    {{ t('showcase.chips.openSource', 'Open Source') }}
                                </OrigamChip>
                            </div>
                        </div>
                    </div>

                    <div class="home-showcase__tile home-showcase__tile--medium">
                        <div class="home-showcase__tile-header">
                            <span class="home-showcase__tile-label">
                                {{ t('showcase.avatars.label', 'Avatar group') }}
                            </span>
                        </div>
                        <div class="home-showcase__tile-body">
                            <OrigamAvatarGroup>
                                <OrigamAvatar color="primary" size="md">A</OrigamAvatar>
                                <OrigamAvatar color="success" size="md">B</OrigamAvatar>
                                <OrigamAvatar color="warning" size="md">C</OrigamAvatar>
                                <OrigamAvatar color="danger" size="md">D</OrigamAvatar>
                                <OrigamAvatar color="info" size="md">+4</OrigamAvatar>
                            </OrigamAvatarGroup>
                        </div>
                    </div>

                    <div class="home-showcase__tile home-showcase__tile--large">
                        <div class="home-showcase__tile-header">
                            <span class="home-showcase__tile-label">
                                {{ t('showcase.alert.label', 'Alerts') }}
                            </span>
                        </div>
                        <div class="home-showcase__tile-body home-showcase__tile-body--col">
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
                            <OrigamAlert
                                color="warning"
                                variant="tonal"
                                prepend-icon="mdi:alert"
                            >
                                {{ t('showcase.alert.warning', 'Zero dependencies outside Vue.') }}
                            </OrigamAlert>
                        </div>
                    </div>

                    <div class="home-showcase__tile home-showcase__tile--wide">
                        <div class="home-showcase__tile-header">
                            <span class="home-showcase__tile-label">
                                {{ t('showcase.progress.label', 'Progress') }}
                            </span>
                        </div>
                        <div class="home-showcase__tile-body home-showcase__tile-body--col">
                            <div class="home-showcase__progress-row">
                                <span class="home-showcase__progress-label">
                                    {{ t('showcase.progress.primary', 'Primary') }}
                                </span>
                                <OrigamProgress
                                    :model-value="72"
                                    color="primary"
                                    rounded="pill"
                                />
                            </div>
                            <div class="home-showcase__progress-row">
                                <span class="home-showcase__progress-label">
                                    {{ t('showcase.progress.success', 'Success') }}
                                </span>
                                <OrigamProgress
                                    :model-value="45"
                                    color="success"
                                    rounded="pill"
                                />
                            </div>
                            <div class="home-showcase__progress-row">
                                <span class="home-showcase__progress-label">
                                    {{ t('showcase.progress.warning', 'Warning') }}
                                </span>
                                <OrigamProgress
                                    :model-value="88"
                                    color="warning"
                                    rounded="pill"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="home-showcase__tile home-showcase__tile--medium">
                        <div class="home-showcase__tile-header">
                            <span class="home-showcase__tile-label">
                                {{ t('showcase.badge.label', 'Badges') }}
                            </span>
                        </div>
                        <div class="home-showcase__tile-body">
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
                                <OrigamBadge color="warning" content="!">
                                    <OrigamBtn color="secondary" variant="tonal" rounded="lg" size="sm">
                                        {{ t('showcase.badge.alerts', 'Alerts') }}
                                    </OrigamBtn>
                                </OrigamBadge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="home-showcase__cta">
                <OrigamBtn
                    to="/components"
                    color="primary"
                    variant="flat"
                    rounded="pill"
                    append-icon="mdi:arrow-right"
                    size="lg"
                >
                    {{ t('showcase.cta', 'View all components') }}
                </OrigamBtn>
                <OrigamBtn
                    to="/playground"
                    variant="outlined"
                    rounded="pill"
                    prepend-icon="mdi:play-circle-outline"
                    size="lg"
                >
                    {{ t('showcase.ctaPlayground', 'Try the playground') }}
                </OrigamBtn>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-showcase {
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    background-color: var(--origam-color__surface---sunken, #fafafa);
    container-type: inline-size;
}

.home-showcase__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---12, 3rem);
}

.home-showcase__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
}

.home-showcase__eyebrow {
    display: inline-block;
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--origam-color__feedback--info---fgSubtle, #1e40af);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---3, 0.75rem);
    background-color: color-mix(in srgb, var(--origam-color__feedback--info---bg, #2196f3) 8%, transparent);
    border-radius: var(--origam-radius---full, 9999px);
}

.home-showcase__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.75rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: -0.025em;
    color: var(--origam-color__text---primary, #171717);
    margin: 0;
}

.home-showcase__subtitle {
    font-size: var(--origam-font__size---xl, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    margin: 0;
    max-width: 40rem;
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
}

.home-showcase__stage {
    width: 100%;
}

.home-showcase__hero-tiles {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: auto;
    gap: var(--origam-space---4, 1rem);
}

.home-showcase__tile {
    background-color: var(--origam-color__surface---raised, #ffffff);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    border-radius: var(--origam-radius---2xl, 1.5rem);
    box-shadow: var(--origam-shadow---sm);
    overflow: hidden;
    transition: box-shadow 0.2s var(--origam-motion__easing---standard);
}

.home-showcase__tile:hover {
    box-shadow: var(--origam-shadow---md);
}

.home-showcase__tile--large {
    grid-column: span 2;
}

.home-showcase__tile--wide {
    grid-column: span 3;
}

.home-showcase__tile-header {
    padding: var(--origam-space---4, 1rem) var(--origam-space---5, 1.25rem) var(--origam-space---3, 0.75rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, #d4d4d4);
}

.home-showcase__tile-label {
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---secondary, #525252);
    text-transform: uppercase;
    letter-spacing: 0.07em;
}

.home-showcase__tile-body {
    padding: var(--origam-space---5, 1.25rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---3, 0.75rem);
}

.home-showcase__tile-body--col {
    flex-direction: column;
}

.home-showcase__demo-row {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--origam-space---2, 0.5rem);
    align-items: center;
}

.home-showcase__demo-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
    align-items: center;
}

.home-showcase__progress-row {
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: var(--origam-space---3, 0.75rem);
    align-items: center;
}

.home-showcase__progress-label {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--origam-color__text---secondary, #525252);
    font-weight: var(--origam-font__weight---medium, 500);
}

.home-showcase__cta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---3, 0.75rem);
    justify-content: center;
}

@media (prefers-reduced-motion: reduce) {
    .home-showcase__tile {
        transition: none;
    }
}

@container (max-width: 900px) {
    .home-showcase__hero-tiles {
        grid-template-columns: repeat(2, 1fr);
    }

    .home-showcase__tile--wide {
        grid-column: span 2;
    }
}

@container (max-width: 600px) {
    .home-showcase__hero-tiles {
        grid-template-columns: 1fr;
    }

    .home-showcase__tile--large,
    .home-showcase__tile--wide {
        grid-column: span 1;
    }
}
</style>
