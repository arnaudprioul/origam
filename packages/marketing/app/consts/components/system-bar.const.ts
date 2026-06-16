/**
 * /components/system-bar — full documentation data for OrigamSystemBar.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/SystemBar/system-bar.interface.ts
 * cross-checked against packages/ds/src/components/SystemBar/OrigamSystemBar.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const SYSTEM_BAR_DOC: IComponentDoc = {
    slug: 'system-bar',
    name: 'SystemBar',
    tag: 'origam-system-bar',
    icon: 'mdi-dock-top',
    category: 'Layout',
    descriptionKey: 'components.catalog.system_bar.description',
    descriptionFallback: 'Thin bar anchored to the top of an app layout — typically used to display status icons, time or network info in a narrow stripe.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-system-bar--design',
    docUrl: 'http://localhost:4000/components/SystemBar/OrigamSystemBar',

    family: [],

    props: [
        {
            name: 'window',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.system_bar.props.window.description',
            descriptionFallback: 'Increases the height to match a window-style system bar (suitable for desktop-style UIs).'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.system_bar.props.color.description',
            descriptionFallback: 'Foreground color applied to the bar content.'
        },
        {
            name: 'bgColor',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.system_bar.props.bg_color.description',
            descriptionFallback: 'Background color of the system bar.'
        },
        {
            name: 'elevation',
            type: { label: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.system_bar.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.system_bar.props.rounded.description',
            descriptionFallback: 'Border-radius token.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.system_bar.props.border.description',
            descriptionFallback: 'Applies a border to the bar.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.system_bar.props.height.description',
            descriptionFallback: 'Overrides the default bar height.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.system_bar.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.system_bar.slots.default.description',
            descriptionFallback: 'Content of the bar — icons, text, spacers.'
        }
    ],

    examples: [
        {
            titleKey: 'components.system_bar.examples.basic.title',
            titleFallback: 'Basic system bar',
            lang: 'vue',
            code: `<template>
  <origam-system-bar color="primary">
    <origam-icon icon="mdi-wifi" />
    <origam-icon icon="mdi-signal" />
    <origam-icon icon="mdi-battery" />
    <span>12:30</span>
  </origam-system-bar>
</template>`
        },
        {
            titleKey: 'components.system_bar.examples.window.title',
            titleFallback: 'Window variant',
            lang: 'vue',
            code: `<template>
  <origam-system-bar window>
    <origam-icon icon="mdi-message" />
    <span>3 unread messages</span>
  </origam-system-bar>
</template>`
        }
    ]
}
