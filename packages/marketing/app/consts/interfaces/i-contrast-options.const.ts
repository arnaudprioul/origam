import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONTRAST_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-contrast-options',
    name: 'IContrastOptions',
    category: 'Accessibility',
    descriptionKey: 'interfaces.catalog.i_contrast_options.description',
    descriptionFallback: 'Runtime text-contrast guard configuration consumed by the v-contrast directive. enabled toggles the feature; threshold sets the minimum WCAG contrast ratio (default 4.5 — AA for normal text).',
    definition: `export interface IContrastOptions {
    enabled?: boolean
    threshold?: number
}`,
    extends: [],
    props: [
        { name: 'enabled', type: 'boolean', optional: true, descriptionFallback: 'Whether the contrast guard is active. Defaults to true.' },
        { name: 'threshold', type: 'number', optional: true, descriptionFallback: 'Minimum acceptable WCAG contrast ratio. Defaults to 4.5 (AA for normal text).' },
    ],
    usedBy: [
        { slug: 'use-contrast', name: 'useContrast', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_contrast_options.example',
            titleFallback: 'Configuring the contrast guard at plugin install',
            code: `import { createOrigam } from 'origam'
import type { IContrastOptions } from 'origam'

const contrastOptions: IContrastOptions = { enabled: true, threshold: 3 }

createOrigam({ contrast: contrastOptions })`,
            lang: 'typescript',
        },
    ],
}
