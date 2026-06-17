import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BORDER_STYLE_ENUM_DOC: IEnumDoc = {
    slug: 'border-style',
    name: 'BORDER_STYLE',
    category: 'Shape & Appearance',
    descriptionKey: 'enums.catalog.border_style.description',
    descriptionFallback: 'TypeScript enum mirroring CSS border-style values (none, hidden, dotted, dashed, solid, double, groove, ridge, inset, outset).',
    definition: `export enum BORDER_STYLE {
    NONE   = 'none',
    HIDDEN = 'hidden',
    DOTTED = 'dotted',
    DASHED = 'dashed',
    SOLID  = 'solid',
    DOUBLE = 'double',
    GROOVE = 'groove',
    RIDGE  = 'ridge',
    INSET  = 'inset',
    OUTSET = 'outset',
}`,
    values: [
        { value: 'BORDER_STYLE.NONE', descriptionKey: 'enums.detail.border_style.none', descriptionFallback: 'No border is drawn.' },
        { value: 'BORDER_STYLE.HIDDEN', descriptionKey: 'enums.detail.border_style.hidden', descriptionFallback: 'Border hidden — same as none but takes precedence in table border-collapse.' },
        { value: 'BORDER_STYLE.DOTTED', descriptionKey: 'enums.detail.border_style.dotted', descriptionFallback: 'A series of rounded dots.' },
        { value: 'BORDER_STYLE.DASHED', descriptionKey: 'enums.detail.border_style.dashed', descriptionFallback: 'A series of short dashes.' },
        { value: 'BORDER_STYLE.SOLID', descriptionKey: 'enums.detail.border_style.solid', descriptionFallback: 'A single solid line.' },
        { value: 'BORDER_STYLE.DOUBLE', descriptionKey: 'enums.detail.border_style.double', descriptionFallback: 'Two parallel solid lines.' },
        { value: 'BORDER_STYLE.GROOVE', descriptionKey: 'enums.detail.border_style.groove', descriptionFallback: 'A carved-in grooved effect.' },
        { value: 'BORDER_STYLE.RIDGE', descriptionKey: 'enums.detail.border_style.ridge', descriptionFallback: 'A raised ridge effect — opposite of groove.' },
        { value: 'BORDER_STYLE.INSET', descriptionKey: 'enums.detail.border_style.inset', descriptionFallback: 'Makes the element appear embedded in the page.' },
        { value: 'BORDER_STYLE.OUTSET', descriptionKey: 'enums.detail.border_style.outset', descriptionFallback: 'Makes the element appear to protrude from the page.' },
    ],
    usedBy: [
        { slug: 'responsive', name: 'Responsive', propName: 'borderStyle' },
        { slug: 'kbd', name: 'Kbd', propName: 'borderStyle' },
        { slug: 'expansion-panel', name: 'ExpansionPanel', propName: 'borderStyle' },
        { slug: 'expansion-panel-header', name: 'ExpansionPanelHeader', propName: 'borderStyle' },
        { slug: 'expansion-panels', name: 'ExpansionPanels', propName: 'borderStyle' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/border.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.border_style.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BORDER_STYLE } from 'origam'

const style: BORDER_STYLE = BORDER_STYLE.DASHED`,
            lang: 'typescript',
        },
    ],
}
