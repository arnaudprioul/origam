import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOCATION_STRATEGY_DATA_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-location-strategy-data',
    name: 'ILocationStrategyData',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_location_strategy_data.description',
    descriptionFallback: 'Runtime data bag passed to a location strategy function — gives access to the floating content element, the anchor target and the active state so the strategy can compute and apply the correct position.',
    definition: `export interface ILocationStrategyData {
    contentEl: Ref<HTMLElement | undefined>
    target: Ref<HTMLElement | [x: number, y: number] | undefined>
    isActive: Ref<boolean>
}`,
    extends: [],
    props: [
        { name: 'contentEl', type: 'Ref<HTMLElement | undefined>', optional: false, descriptionFallback: 'Reactive reference to the floating content element. The strategy reads its dimensions and writes its position here.' },
        { name: 'target', type: 'Ref<HTMLElement | [x: number, y: number] | undefined>', optional: false, descriptionFallback: 'Reactive reference to the anchor element or an [x, y] pixel coordinate. When set to coordinates, the floating panel anchors to a virtual point (used by context menus).' },
        { name: 'isActive', type: 'Ref<boolean>', optional: false, descriptionFallback: 'Reactive flag that reflects whether the floating content is currently visible. Strategies may skip recalculation when false.' },
    ],
    usedBy: [
        { slug: 'menu', name: 'Menu', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'select', name: 'Select', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/location.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_location_strategy_data.example',
            titleFallback: 'Implementing a custom location strategy',
            code: `import type { ILocationStrategyData, ILocationStrategyProps } from 'origam'

function myStrategy(
    data: ILocationStrategyData,
    props: ILocationStrategyProps,
    contentStyles: Ref<Record<string, string>>
) {
    // Position the floating content relative to data.target
}`,
            lang: 'typescript',
        },
    ],
}
