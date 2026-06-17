import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ICON_DOC: IComposableDoc = {
    slug: 'use-icon',
    name: 'useIcon',
    domain: 'Icon',
    icon: 'mdi-image-outline',
    descriptionKey: '',
    descriptionFallback: 'Resolves a TIcon value (string, SVG path array, or component) into a TIconInstance containing the component to render and the resolved icon data. Consumes the Origam icon registry injected via createIcons.',
    signature: `function useIcon(
  props: Ref<TIcon | undefined>
): {
  iconData: ComputedRef<TIconInstance>
}

function createIcons(options?: TIconOptions): TIconOptions`,
    params: [
        {
            name: 'props',
            type: 'Ref<TIcon | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive ref holding the icon value. Accepts an MDI class name string (e.g. "mdi-home"), an alias prefixed with "$" (e.g. "$checkboxOn"), an SVG path data string, an array of SVG path data strings, or a Vue component.',
        },
    ],
    returns: [
        {
            name: 'iconData',
            type: 'ComputedRef<TIconInstance>',
            descriptionKey: '',
            descriptionFallback: 'Computed instance describing which component to render (OrigamComponentIcon for class-based icons, OrigamSvgIcon for SVG paths) and the resolved icon value to pass as a prop.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Register icons when creating the Origam plugin',
            code: `import { createOrigam, createIcons } from 'origam'
import { mdi } from 'origam/iconsets/mdi'

const origam = createOrigam({
  icons: createIcons({
    defaultSet: 'mdi',
    sets: { mdi },
    aliases: {
      myCustom: 'mdi-star',
    },
  }),
})`,
            lang: 'ts',
        },
        {
            titleKey: '',
            titleFallback: 'Resolve an icon inside a component',
            code: `<script setup lang="ts">
import { toRef } from 'vue'
import { useIcon } from 'origam'
import type { TIcon } from 'origam'

const props = defineProps<{ icon?: TIcon }>()
const { iconData } = useIcon(toRef(props, 'icon'))
</script>

<template>
  <component
    :is="iconData.component"
    :icon="iconData.icon"
    aria-hidden="true"
  />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-color', 'use-size'],
    noteFallback: 'useIcon throws if the Origam icon registry has not been provided (i.e. createOrigam was not called with an icon set). Raw SVG path data is auto-detected via a leading path-command character (M, L, C, …) and routed to OrigamSvgIcon.',
}
