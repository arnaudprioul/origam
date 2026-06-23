import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BUFFER_PX_CONST_DOC: IConstDoc = {
    slug: 'buffer-px',
    name: 'BUFFER_PX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.buffer_px.description',
    descriptionFallback: 'Pixel buffer added above and below the visible viewport by the virtual-scroll engine. Pre-renders rows outside the current view to mask render latency during fast scrolling.',
    definition: `export const BUFFER_PX = 100`,
    value: '100',
    usedBy: [
        { name: 'useVirtual' },
        { name: 'OrigamVirtualList', slug: 'virtual-list' },
        { name: 'OrigamDataTable', slug: 'data-table' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/virtual.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.buffer_px.example',
            titleFallback: 'Referencing BUFFER_PX in a custom virtual scroller',
            code: `import { BUFFER_PX } from 'origam'

// Extend the render range by the standard buffer
const visibleStart = Math.max(0, scrollTop - BUFFER_PX)
const visibleEnd = scrollTop + containerHeight + BUFFER_PX`,
            lang: 'typescript',
        },
    ],
}
