/**
 * /components/tabs — full documentation data for OrigamTabs.
 *
 * SOURCE OF TRUTH:
 *   packages/ds/src/interfaces/Tabs/tabs.interface.ts
 *   packages/ds/src/interfaces/Tabs/tab.interface.ts
 *   packages/ds/src/interfaces/Tabs/tab-panels.interface.ts
 *   packages/ds/src/interfaces/Tabs/tab-panel.interface.ts
 * cross-checked against packages/ds/src/components/Tabs/*.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const TABS_DOC: IComponentDoc = {
    slug: 'tabs',
    name: 'Tabs',
    tag: 'origam-tabs',
    icon: 'mdi-tab',
    category: 'Navigation',
    descriptionKey: 'components.catalog.tabs.description',
    descriptionFallback: 'WAI-ARIA-compliant tablist container that orchestrates a group of OrigamTab elements with optional matching OrigamTabPanels for content switching.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-tabs--design',
    docUrl: 'http://localhost:4000/components/Tabs/OrigamTabs',

    family: [
        {
            slug: 'tab',
            name: 'Tab',
            descriptionKey: 'components.catalog.tab.description',
            descriptionFallback: 'Single registered tab inside an OrigamTabs tablist — renders the label text and optional icons.'
        },
        {
            slug: 'tab-panels',
            name: 'TabPanels',
            descriptionKey: 'components.catalog.tab_panels.description',
            descriptionFallback: 'Content container that mirrors the tablist selection and transitions between panels.'
        },
        {
            slug: 'tab-panel',
            name: 'TabPanel',
            descriptionKey: 'components.catalog.tab_panel.description',
            descriptionFallback: 'A single tab content panel — lazy-mounted by default until first activated.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tabs.props.model_value.description',
            descriptionFallback: 'Value of the currently selected tab. Bind with v-model.'
        },
        {
            name: 'variant',
            type: { label: "'default' | 'pills' | 'underline'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.tabs.props.variant.description',
            descriptionFallback: 'Visual treatment of the tab strip. default uses the standard indicator; pills gives each tab a pill background; underline shows a bottom border.'
        },
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.tabs.props.direction.description',
            descriptionFallback: 'Layout direction of the tab strip. Vertical switches aria-orientation accordingly.'
        },
        {
            name: 'fixed',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tabs.props.fixed.description',
            descriptionFallback: 'Distributes tab items with equal width across the full container (justify-evenly).'
        },
        {
            name: 'centered',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.tabs.props.centered.description',
            descriptionFallback: 'Centers the tab strip within the container.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.tabs.props.mandatory.description',
            descriptionFallback: 'Ensures exactly one tab is always selected (WAI-ARIA tablist convention). Defaults to true.'
        },
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tabs.props.color.description',
            descriptionFallback: 'Active tab indicator and text color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tabs.props.bg_color.description',
            descriptionFallback: 'Background color of the tab strip container.'
        },
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.tabs.props.density.description',
            descriptionFallback: 'Controls the padding density of each Tab element.'
        },
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.tabs.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the tab strip container.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.tabs.props.tag.description',
            descriptionFallback: 'Root HTML element. The component always injects role="tablist" on top of this.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.tabs.emits.update_model_value.description',
            descriptionFallback: 'Fired when the active tab changes. Bind with v-model.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, select, next, prev, selected, items }',
            descriptionKey: 'components.tabs.slots.default.description',
            descriptionFallback: 'Tab items. Receives the group API (select, next, prev…) for programmatic navigation.'
        }
    ],

    examples: [
        {
            titleKey: 'components.tabs.examples.basic.title',
            titleFallback: 'Basic tabs',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="tab">
    <origam-tab value="one">Tab 1</origam-tab>
    <origam-tab value="two">Tab 2</origam-tab>
    <origam-tab value="three">Tab 3</origam-tab>
  </origam-tabs>
  <origam-tab-panels v-model="tab">
    <origam-tab-panel value="one">Content 1</origam-tab-panel>
    <origam-tab-panel value="two">Content 2</origam-tab-panel>
    <origam-tab-panel value="three">Content 3</origam-tab-panel>
  </origam-tab-panels>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('one')
</script>`
        },
        {
            titleKey: 'components.tabs.examples.variants.title',
            titleFallback: 'Visual variants',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="tab" variant="pills" color="primary">
    <origam-tab value="a">Home</origam-tab>
    <origam-tab value="b">Profile</origam-tab>
    <origam-tab value="c">Settings</origam-tab>
  </origam-tabs>
</template>`
        },
        {
            titleKey: 'components.tabs.examples.icons.title',
            titleFallback: 'Tabs with icons',
            lang: 'vue',
            code: `<template>
  <origam-tabs v-model="tab">
    <origam-tab value="home"     icon="mdi-home">Home</origam-tab>
    <origam-tab value="search"   icon="mdi-magnify">Search</origam-tab>
    <origam-tab value="settings" icon="mdi-cog">Settings</origam-tab>
  </origam-tabs>
</template>`
        }
    ]
}
