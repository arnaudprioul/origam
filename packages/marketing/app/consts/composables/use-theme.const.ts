import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_THEME_DOC: IComposableDoc = {
    slug: 'use-theme',
    name: 'useTheme',
    domain: 'Theme',
    icon: 'mdi-theme-light-dark',
    descriptionKey: '',
    descriptionFallback: 'Module-level singleton managing the brand theme axis (data-theme attribute) and the color-mode axis (data-mode attribute). Persists both axes to localStorage and reacts to prefers-color-scheme. Every call to useTheme() shares the same refs.',
    signature: `function useTheme(): {
  theme: Readonly<Ref<TTheme>>
  resolved: Readonly<ComputedRef<TThemeResolved>>
  setTheme: (next: TTheme) => void
  toggle: () => void
  mode: Readonly<Ref<TMode>>
  resolvedMode: Readonly<ComputedRef<TModeResolved>>
  setMode: (next: TMode) => void
  toggleMode: () => void
}`,
    params: [],
    returns: [
        {
            name: 'theme',
            type: "Readonly<Ref<TTheme>>",
            descriptionKey: '',
            descriptionFallback: "The current brand theme value: 'auto' | 'light' | 'dark' | string (custom brand). Read-only reactive ref.",
        },
        {
            name: 'resolved',
            type: "Readonly<ComputedRef<TThemeResolved>>",
            descriptionKey: '',
            descriptionFallback: "Effective theme after resolving 'auto' against prefers-color-scheme. Always 'light' or 'dark'.",
        },
        {
            name: 'setTheme',
            type: '(next: TTheme) => void',
            descriptionKey: '',
            descriptionFallback: 'Sets the brand theme, applies data-theme to <html> and persists to localStorage.',
        },
        {
            name: 'toggle',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: "Convenience: flips the brand light ↔ dark. Treats 'auto' as light.",
        },
        {
            name: 'mode',
            type: "Readonly<Ref<TMode>>",
            descriptionKey: '',
            descriptionFallback: "The current color mode: 'auto' | 'light' | 'dark'. Read-only reactive ref.",
        },
        {
            name: 'resolvedMode',
            type: "Readonly<ComputedRef<TModeResolved>>",
            descriptionKey: '',
            descriptionFallback: "Effective mode after resolving 'auto' against prefers-color-scheme. Always 'light' or 'dark'.",
        },
        {
            name: 'setMode',
            type: '(next: TMode) => void',
            descriptionKey: '',
            descriptionFallback: 'Sets the color mode, applies data-mode to <html> and persists to localStorage.',
        },
        {
            name: 'toggleMode',
            type: '() => void',
            descriptionKey: '',
            descriptionFallback: "Flips the color mode light ↔ dark. Treats 'auto' as the current system preference.",
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Dark mode toggle button',
            code: `<script setup lang="ts">
import { useTheme } from 'origam'

const { resolvedMode, toggleMode } = useTheme()
</script>

<template>
  <origam-btn
    :icon="resolvedMode === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    :aria-label="resolvedMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    variant="text"
    @click="toggleMode"
  />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Switch to a custom brand theme',
            code: `<script setup lang="ts">
import { useTheme } from 'origam'

const { setTheme } = useTheme()
</script>

<template>
  <origam-btn @click="setTheme('brand-x')">Apply Brand X</origam-btn>
  <origam-btn @click="setTheme('auto')">Reset to auto</origam-btn>
</template>`,
            lang: 'vue',
        },
    ],
    related: [],
    consumedInterfaces: [],
    noteFallback: 'useTheme() is a module-level singleton — all components share the same refs. The prefers-color-scheme listener is initialised once (not in onMounted), so resolvedMode is correct even when called from a Nuxt plugin before the first component renders.',
}
