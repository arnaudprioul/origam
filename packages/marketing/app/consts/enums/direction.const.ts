import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const DIRECTION_ENUM_DOC: IEnumDoc = {
    slug: 'direction',
    name: 'DIRECTION',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.direction.description',
    descriptionFallback: 'Two-axis direction enum used by scrollable or swipeable components to constrain movement to horizontal or vertical.',
    definition: `export enum DIRECTION {
    HORIZONTAL = 'horizontal',
    VERTICAL   = 'vertical',
}`,
    values: [
        {
            value: 'DIRECTION.HORIZONTAL',
            descriptionKey: 'enums.detail.direction.horizontal',
            descriptionFallback: 'Movement or layout flows along the X axis.',
        },
        {
            value: 'DIRECTION.VERTICAL',
            descriptionKey: 'enums.detail.direction.vertical',
            descriptionFallback: 'Movement or layout flows along the Y axis.',
        },
    ],
    usedBy: [
        { slug: 'tabs', name: 'Tabs', propName: 'direction' },
        { slug: 'slide-group', name: 'SlideGroup', propName: 'direction' },
        { slug: 'infinite-scroll', name: 'InfiniteScroll', propName: 'direction' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/direction.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.direction.example',
            titleFallback: 'Vertical tabs',
            code: `<origam-tabs :direction="DIRECTION.VERTICAL">
    <origam-tab value="a">Tab A</origam-tab>
    <origam-tab value="b">Tab B</origam-tab>
</origam-tabs>`,
            lang: 'vue',
        },
    ],
}
