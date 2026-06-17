import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COMMAND_PALETTE_DEFAULT_WIDTH_CONST_DOC: IConstDoc = {
    slug: 'command-palette-default-width',
    name: 'COMMAND_PALETTE_DEFAULT_WIDTH',
    category: 'Components',
    descriptionKey: 'consts.catalog.command_palette_default_width.description',
    descriptionFallback: 'Default width in pixels of the OrigamCommandPalette dialog. Sized to be wide enough for long command labels while staying comfortable on medium screens.',
    definition: `export const COMMAND_PALETTE_DEFAULT_WIDTH = 640`,
    value: '640',
    usedBy: [
        { name: 'OrigamCommandPalette', slug: 'command-palette' },
    ],
    sourceFile: 'packages/ds/src/consts/CommandPalette/command-palette.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.command_palette_default_width.example',
            titleFallback: 'Referencing the default palette width',
            code: `import { COMMAND_PALETTE_DEFAULT_WIDTH } from 'origam'

console.log(COMMAND_PALETTE_DEFAULT_WIDTH) // 640`,
            lang: 'typescript',
        },
    ],
}
