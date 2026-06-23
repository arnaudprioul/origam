import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_ICONS_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-icons-key',
    name: 'ORIGAM_ICONS_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_icons_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the resolved TIconOptions (defaultSet, sets map, aliases) provided by the origam plugin and consumed by OrigamIcon to pick the correct icon-set renderer (svg or class).',
    definition: `export const ORIGAM_ICONS_KEY: InjectionKey<Required<TIconOptions>> = Symbol.for('origam:icons')`,
    value: "Symbol.for('origam:icons')",
    usedBy: [
        { name: 'OrigamIcon', slug: 'icon' },
        { name: 'useIcon' },
    ],
    sourceFile: 'packages/ds/src/consts/Icon/icon.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_icons_key.example',
            titleFallback: 'Registering a custom icon set at plugin level',
            code: `import { createOrigam } from 'origam'
import { MyCustomIconSet } from './my-icon-set'

const origam = createOrigam({
  icons: {
    defaultSet: 'custom',
    sets: { custom: MyCustomIconSet },
  },
})`,
            lang: 'typescript',
        },
    ],
}
