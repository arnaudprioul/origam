import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TABS_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tabs-props',
    name: 'ITabsProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_tabs_props.description',
    descriptionFallback: 'Props for <OrigamTabs> — a stateful tablist container. Supports variant (default/pills/underline), direction, density, rounded, color, group registration, fixed-width distribution and centered layout.',
    definition: `export interface ITabsProps extends ICommonsComponentProps, ITagProps, IDirectionProps, IDensityProps, IRoundedProps, IColorProps, IBgColorProps, IGroupProps {
    tag?: string
    variant?: TTabVariant
    fixed?: boolean
    centered?: boolean
}`,
    extends: [
        'ICommonsComponentProps',
        'ITagProps',
        'IDirectionProps',
        'IDensityProps',
        'IRoundedProps',
        'IColorProps',
        'IBgColorProps',
        'IGroupProps',
    ],
    props: [
        { name: 'tag', type: 'string', optional: true, descriptionFallback: 'HTML tag rendered as the tablist root element.' },
        { name: 'variant', type: 'TTabVariant', optional: true, descriptionFallback: "Visual treatment of the tablist. One of 'default', 'pills', 'underline'." },
        { name: 'fixed', type: 'boolean', optional: true, descriptionFallback: 'Distributes all tabs with equal width (justify-evenly) within the tablist.' },
        { name: 'centered', type: 'boolean', optional: true, descriptionFallback: 'Centers the tablist within its container.' },
    ],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tabs/tabs.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tabs_props.example',
            titleFallback: 'Pill variant centered tabs',
            code: `<OrigamTabs v-model="tab" variant="pills" centered color="primary">
  <OrigamTab value="overview">Overview</OrigamTab>
  <OrigamTab value="api">API</OrigamTab>
  <OrigamTab value="examples">Examples</OrigamTab>
</OrigamTabs>`,
            lang: 'html',
        },
    ],
}
