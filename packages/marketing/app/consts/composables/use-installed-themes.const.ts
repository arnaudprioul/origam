import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_INSTALLED_THEMES_DOC: IComposableDoc = {
    slug: 'use-installed-themes',
    name: 'useInstalledThemes',
    domain: 'Theme',
    icon: 'mdi-palette-swatch-outline',
    descriptionKey: '',
    descriptionFallback: 'Returns the static list of brand themes installed via createOrigam({ themes }). Each entry contains the brand name and the concrete modes it was installed for. Use this to build a theme switcher that stays in sync with whatever the app registered, without hard-coding available brand names.',
    signature: `function useInstalledThemes(): TInstalledThemes`,
    params: [],
    returns: [
        {
            name: 'TInstalledThemes',
            type: 'TInstalledThemes',
            descriptionKey: '',
            descriptionFallback: 'Array of installed brand theme descriptors (name + modes). Returns an empty array when called outside a createOrigam context or when no themes were registered.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Dynamic brand theme switcher',
            code: `<script setup lang="ts">
import { useInstalledThemes, useTheme } from 'origam'

const themes = useInstalledThemes()
const { currentTheme, setTheme } = useTheme()
</script>

<template>
  <nav>
    <button
      v-for="theme in themes"
      :key="theme.name"
      :aria-pressed="currentTheme === theme.name"
      @click="setTheme(theme.name)"
    >
      {{ theme.name }}
    </button>
  </nav>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'List available themes and their modes',
            code: `<script setup lang="ts">
import { useInstalledThemes } from 'origam'

const themes = useInstalledThemes()
// e.g. [{ name: 'default', modes: ['light', 'dark'] }, { name: 'brand-x', modes: ['light'] }]
</script>`,
            lang: 'vue',
        },
    ],
    related: ['use-theme'],
    consumedInterfaces: [],
    noteFallback: 'The returned list is a static snapshot taken at createOrigam() call time — it does not change at runtime. Pair with useTheme() to read and switch the currently active brand and mode.',
}
