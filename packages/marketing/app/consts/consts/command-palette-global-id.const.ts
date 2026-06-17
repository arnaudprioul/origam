import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COMMAND_PALETTE_GLOBAL_ID_CONST_DOC: IConstDoc = {
    slug: 'command-palette-global-id',
    name: 'COMMAND_PALETTE_GLOBAL_ID',
    category: 'Components',
    descriptionKey: 'consts.catalog.command_palette_global_id.description',
    descriptionFallback: 'Default v-model name of the global command palette singleton registered by useCommand. Apps that render multiple palettes can override this key to isolate their instances.',
    definition: `export const COMMAND_PALETTE_GLOBAL_ID = 'origam-command-palette-global'`,
    value: "'origam-command-palette-global'",
    usedBy: [
        { name: 'useCommand' },
        { name: 'OrigamCommandPalette', slug: 'command-palette' },
    ],
    sourceFile: 'packages/ds/src/consts/CommandPalette/command-palette.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.command_palette_global_id.example',
            titleFallback: 'Opening the global palette by id',
            code: `import { COMMAND_PALETTE_GLOBAL_ID, useCommand } from 'origam'

const { open } = useCommand(COMMAND_PALETTE_GLOBAL_ID)
open()`,
            lang: 'typescript',
        },
    ],
}
