import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_VIRTUAL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-virtual-props',
    name: 'IVirtualProps',
    category: 'Performance',
    descriptionKey: 'interfaces.catalog.i_virtual_props.description',
    descriptionFallback: 'Props for virtualised list components — controls item height, the visible viewport height, and the animated scroll behaviour (duration and easing).',
    definition: `export interface IVirtualProps {
    itemHeight?: number | string
    height?: number | string
    scrollDuration?: number
    scrollEasing?: string
}`,
    extends: [],
    props: [
        { name: 'itemHeight', type: 'number | string', optional: true, descriptionFallback: 'Fixed height of each virtualised row — a number resolves to "Npx", or any valid CSS length.' },
        { name: 'height', type: 'number | string', optional: true, descriptionFallback: 'Visible viewport height of the virtual scroller — constrains how many items are rendered.' },
        { name: 'scrollDuration', type: 'number', optional: true, default: '300', descriptionFallback: 'Animation duration in milliseconds for imperative scroll calls (e.g. scrollToIndex). Set to 0 to jump instantly.' },
        { name: 'scrollEasing', type: 'string', optional: true, default: '\'easeInOutCubic\'', descriptionFallback: 'Easing function name forwarded to useGoTo (easeInOutCubic, easeOutQuart, …).' },
    ],
    usedBy: [
        { slug: 'virtual-scroll', name: 'VirtualScroll', kind: 'component' },
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'use-virtual', name: 'useVirtual', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/virtual.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_virtual_props.example',
            titleFallback: 'Using IVirtualProps on a large dataset',
            code: `<origam-virtual-scroll
    :items="largeList"
    item-height="56"
    height="400"
    :scroll-duration="200"
    scroll-easing="easeOutQuart"
>
    <template #default="{ item }">
        <origam-list-item :title="item.label" />
    </template>
</origam-virtual-scroll>`,
            lang: 'html',
        },
    ],
}
