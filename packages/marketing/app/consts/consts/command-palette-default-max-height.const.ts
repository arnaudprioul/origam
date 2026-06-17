import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COMMAND_PALETTE_DEFAULT_MAX_HEIGHT_CONST_DOC: IConstDoc = {
    slug: 'command-palette-default-max-height',
    name: 'COMMAND_PALETTE_DEFAULT_MAX_HEIGHT',
    category: 'Components',
    descriptionKey: 'consts.catalog.command_palette_default_max_height.description',
    descriptionFallback: 'Default maximum height in pixels of the OrigamCommandPalette result list. Constrains the scrollable area so the palette never takes over the full viewport height.',
    definition: `export const COMMAND_PALETTE_DEFAULT_MAX_HEIGHT = 480`,
    value: '480',
    usedBy: [
        { name: 'OrigamCommandPalette', slug: 'command-palette' },
    ],
    sourceFile: 'packages/ds/src/consts/CommandPalette/command-palette.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.command_palette_default_max_height.example',
            titleFallback: 'Using the constant as a CSS max-height reference',
            code: `import { COMMAND_PALETTE_DEFAULT_MAX_HEIGHT } from 'origam'

// Pass as a prop override
// <OrigamCommandPalette :max-height="COMMAND_PALETTE_DEFAULT_MAX_HEIGHT" />
console.log(COMMAND_PALETTE_DEFAULT_MAX_HEIGHT) // 480`,
            lang: 'typescript',
        },
    ],
}
