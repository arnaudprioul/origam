<script setup lang="ts">
import type { TOgImageType } from '~/types/og-image.type'
import { OG_TYPE_BADGE_LABEL, OG_TYPE_ACCENT_VAR } from '~/consts/og-image.const'

const props = withDefaults(defineProps<{
    title?: string
    description?: string
    type?: TOgImageType
}>(), {
    title: 'origam',
    description: 'The Vue 3 design system that just works.',
    type: 'home'
})

const badgeLabel = computed(() => OG_TYPE_BADGE_LABEL[props.type])
const accentVar = computed(() => OG_TYPE_ACCENT_VAR[props.type])
</script>

<template>
    <div class="og-root">
        <div
            class="og-backdrop"
            :style="{ '--og-accent': accentVar }"
        >
            <div class="og-gradient" />
            <div class="og-noise" />
        </div>

        <div class="og-content">
            <div class="og-badge">
                <span class="og-badge__dot" />
                <span class="og-badge__label">{{ badgeLabel }}</span>
            </div>

            <p class="og-wordmark">origam</p>

            <h1 class="og-title">{{ title }}</h1>

            <p class="og-description">{{ description }}</p>
        </div>

        <div class="og-footer">
            <span class="og-footer__url">origam.dev</span>
            <span class="og-footer__tagline">Vue 3 design system</span>
        </div>
    </div>
</template>

<style scoped>
.og-root {
    position: relative;
    width: 1200px;
    height: 630px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-family: 'Inter', system-ui, sans-serif;
    overflow: hidden;
    background-color: var(--origam-color-surface-page, #0f0f17);
    color: var(--origam-color-text-default, #f8f8fc);
}

.og-backdrop {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.og-gradient {
    position: absolute;
    inset: 0;
    background:
        radial-gradient(
            ellipse 60% 50% at 10% 20%,
            color-mix(in srgb, var(--og-accent, var(--origam-color-primary-500, #6d5fff)) 18%, transparent) 0%,
            transparent 70%
        ),
        radial-gradient(
            ellipse 40% 40% at 90% 80%,
            color-mix(in srgb, var(--og-accent, var(--origam-color-primary-500, #6d5fff)) 10%, transparent) 0%,
            transparent 60%
        );
}

.og-noise {
    position: absolute;
    inset: 0;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
}

.og-content {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 64px 72px 0;
    flex: 1;
    justify-content: center;
}

.og-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 9999px;
    border: 1px solid color-mix(in srgb, var(--og-accent, var(--origam-color-primary-500, #6d5fff)) 40%, transparent);
    background-color: color-mix(in srgb, var(--og-accent, var(--origam-color-primary-500, #6d5fff)) 12%, transparent);
    width: fit-content;
}

.og-badge__dot {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--og-accent, var(--origam-color-primary-500, #6d5fff));
}

.og-badge__label {
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--og-accent, var(--origam-color-primary-400, #957cff));
}

.og-wordmark {
    font-size: 28px;
    font-weight: 800;
    letter-spacing: -0.04em;
    color: var(--origam-color-text-muted, rgba(248, 248, 252, 0.5));
    margin: 0;
    line-height: 1;
}

.og-title {
    font-size: 72px;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: var(--origam-color-text-default, #f8f8fc);
    margin: 0;
    max-width: 900px;
}

.og-description {
    font-size: 24px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--origam-color-text-muted, rgba(248, 248, 252, 0.65));
    margin: 0;
    max-width: 760px;
}

.og-footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 72px 40px;
}

.og-footer__url {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--origam-color-text-default, #f8f8fc);
}

.og-footer__tagline {
    font-size: 16px;
    font-weight: 400;
    color: var(--origam-color-text-muted, rgba(248, 248, 252, 0.5));
}
</style>
