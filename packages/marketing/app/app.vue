<script setup lang="ts">
import { SKIP_LINK_TARGET_ID, SKIP_LINK_HREF } from '~/consts/a11y.const'
import { useWebsiteLd } from '~/composables/useStructuredData'

const { t } = useI18nFallback()

useWebsiteLd()

useHead({
    link: [
        { rel: 'preconnect', href: 'https://plausible.origam.dev' }
    ]
})
</script>

<template>
    <div class="app-shell">
        <a
            :href="SKIP_LINK_HREF"
            class="skip-link"
        >
            {{ t('a11y.skipToContent', 'Skip to content') }}
        </a>

        <TheNav />

        <main :id="SKIP_LINK_TARGET_ID">
            <NuxtPage />
        </main>

        <TheFooter />

        <SearchOverlay />
    </div>
</template>

<style scoped>
.skip-link {
    position: absolute;
    inset-inline-start: var(--origam-space-2, 0.5rem);
    inset-block-start: var(--origam-space-2, 0.5rem);
    padding: var(--origam-space-2, 0.5rem) var(--origam-space-3, 0.75rem);
    background-color: var(--origam-color-surface-default, #fff);
    color: var(--origam-color-action-primary-bg, #000);
    border-radius: var(--origam-rounded-md, 0.5rem);
    transform: translateY(-200%);
    transition: transform 0.2s ease;
    z-index: 100;
}

.skip-link:focus {
    transform: translateY(0);
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
}
</style>
