import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const POSITION_TYPE_DOC: ITypeDoc = {
    slug: 'position',
    name: 'TPosition',
    kind: 'type',
    category: 'Layout & Sizing',
    descriptionKey: 'types.catalog.position.description',
    descriptionFallback: 'CSS position value accepted by the position prop on many Origam components — maps directly to the CSS position property.',
    definition: `export type TPosition = \`\${POSITION}\`

// Where POSITION is:
export enum POSITION {
    STATIC   = 'static',
    RELATIVE = 'relative',
    FIXED    = 'fixed',
    ABSOLUTE = 'absolute',
    STICKY   = 'sticky'
}`,
    values: [
        { value: 'static', descriptionKey: 'types.detail.position.static', descriptionFallback: 'Default CSS flow position — top/right/bottom/left have no effect.' },
        { value: 'relative', descriptionKey: 'types.detail.position.relative', descriptionFallback: 'Positioned relative to its normal flow position — creates a new stacking context.' },
        { value: 'fixed', descriptionKey: 'types.detail.position.fixed', descriptionFallback: 'Positioned relative to the viewport — stays put during scroll. Used by AppBars and FABs.' },
        { value: 'absolute', descriptionKey: 'types.detail.position.absolute', descriptionFallback: 'Positioned relative to the nearest positioned ancestor — used for overlays and decorative elements.' },
        { value: 'sticky', descriptionKey: 'types.detail.position.sticky', descriptionFallback: 'Behaves as relative until a scroll threshold, then fixed — ideal for sticky table headers and section navs.' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'position' },
        { slug: 'card', name: 'Card', propName: 'position' },
        { slug: 'alert', name: 'Alert', propName: 'position' },
        { slug: 'toolbar', name: 'Toolbar', propName: 'position' },
        { slug: 'sheet', name: 'Sheet', propName: 'position' },
        { slug: 'snackbar', name: 'Snackbar', propName: 'position' },
    ],
    sourceFile: 'packages/ds/src/types/Commons/position.type.ts',
    examples: [
        {
            titleKey: 'types.detail.position.example_fixed',
            titleFallback: 'Fixed toolbar that stays at the top during scroll',
            code: `<origam-toolbar position="fixed" style="top: 0; width: 100%">
  <origam-title>My App</origam-title>
</origam-toolbar>`,
            lang: 'html',
        },
        {
            titleKey: 'types.detail.position.example_sticky',
            titleFallback: 'Sticky section header inside a scroll container',
            code: `<origam-sheet position="sticky" style="top: 0">
  Section A
</origam-sheet>`,
            lang: 'html',
        },
    ],
}
