import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const JUSTIFY_ENUM_DOC: IEnumDoc = {
    slug: 'justify',
    name: 'JUSTIFY',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.justify.description',
    descriptionFallback: 'Horizontal alignment / justify-content values for flex/grid containers.',
    definition: `export enum JUSTIFY {
    START         = 'start',
    END           = 'end',
    CENTER        = 'center',
    SPACE_BETWEEN = 'space-between',
    SPACE_AROUND  = 'space-around',
    SPACE_EVENLY  = 'space-evenly',
}`,
    values: [
        { value: 'JUSTIFY.START', descriptionKey: 'enums.detail.justify.start', descriptionFallback: 'Pack items toward the start of the axis.' },
        { value: 'JUSTIFY.END', descriptionKey: 'enums.detail.justify.end', descriptionFallback: 'Pack items toward the end of the axis.' },
        { value: 'JUSTIFY.CENTER', descriptionKey: 'enums.detail.justify.center', descriptionFallback: 'Center items along the axis.' },
        { value: 'JUSTIFY.SPACE_BETWEEN', descriptionKey: 'enums.detail.justify.space_between', descriptionFallback: 'Distribute items with equal space between them.' },
        { value: 'JUSTIFY.SPACE_AROUND', descriptionKey: 'enums.detail.justify.space_around', descriptionFallback: 'Distribute items with equal space around each.' },
        { value: 'JUSTIFY.SPACE_EVENLY', descriptionKey: 'enums.detail.justify.space_evenly', descriptionFallback: 'Distribute items so all gaps are equal.' },
    ],
    usedBy: [
        { slug: 'dialog-confirmation', name: 'DialogConfirmation', propName: 'justify' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/justify.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.justify.example',
            titleFallback: 'Using JUSTIFY in script setup',
            code: `import { JUSTIFY } from 'origam'

const align: JUSTIFY = JUSTIFY.CENTER`,
            lang: 'typescript',
        },
    ],
}
