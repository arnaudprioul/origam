import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_DEFAULTS_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-defaults-key',
    name: 'ORIGAM_DEFAULTS_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_defaults_key.description',
    descriptionFallback: 'Vue provide/inject symbol that shares the reactive defaults map (Ref<IDefault>) from OrigamDefaultsProvider to every component that calls useDefaults(). Used as a global symbol so multiple bundles of origam installed in the same page interoperate over one shared provider.',
    definition: `export const ORIGAM_DEFAULTS_KEY: InjectionKey<Ref<IDefault>> = Symbol.for('origam:defaults')`,
    value: "Symbol.for('origam:defaults')",
    usedBy: [
        { name: 'useDefaults' },
        { name: 'OrigamDefaultsProvider' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/defaults.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_defaults_key.example',
            titleFallback: 'Providing component-level defaults at the app level',
            code: `import { createOrigam } from 'origam'

const origam = createOrigam({
  defaults: {
    OrigamBtn: { variant: 'outlined', rounded: 'lg' },
    OrigamCard: { elevation: 2 },
  },
})

app.use(origam)`,
            lang: 'typescript',
        },
    ],
}
