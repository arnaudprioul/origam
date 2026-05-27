<script setup lang="ts">
import { useLocale, useSwitchLocalePath } from '#i18n'
import { I18N_LOCALES } from '~/consts/i18n.const'

const { locale } = useLocale()
const switchLocalePath = useSwitchLocalePath()

function onChange (event: Event): void {
    const target = event.target as HTMLSelectElement
    const path = switchLocalePath(target.value)
    if (path) {
        navigateTo(path)
    }
}
</script>

<template>
    <label class="language-switcher">
        <span class="language-switcher__label sr-only">Choose language</span>
        <select
            class="language-switcher__select"
            :value="locale"
            aria-label="Choose language"
            @change="onChange"
        >
            <option
                v-for="loc in I18N_LOCALES"
                :key="loc.code"
                :value="loc.code"
            >
                {{ loc.name }}
            </option>
        </select>
    </label>
</template>

<style scoped>
.language-switcher {
    display: inline-flex;
    align-items: center;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.language-switcher__select {
    appearance: none;
    background-color: transparent;
    border: 1px solid var(--origam-color-border-default, transparent);
    border-radius: var(--origam-rounded-md, 0.5rem);
    color: var(--origam-color-text-muted, currentColor);
    cursor: pointer;
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    padding-inline: var(--origam-space-3, 0.75rem);
    padding-block: var(--origam-space-2, 0.5rem);
    transition: color 0.15s ease, border-color 0.15s ease;
}

.language-switcher__select:hover,
.language-switcher__select:focus-visible {
    border-color: var(--origam-color-action-primary-bg, currentColor);
    color: var(--origam-color-text-default, currentColor);
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
}
</style>
