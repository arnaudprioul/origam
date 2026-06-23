import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_APP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-app-emits',
    name: 'IAppEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_app_emits.description',
    descriptionFallback: 'Emits contract for <OrigamApp> — delegates entirely to the shared component emits; no additional events are fired by the application shell.',
    definition: `export interface IAppEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'app', name: 'App', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/App/app.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_app_emits.example',
            titleFallback: 'Extending IAppEmits in a host component',
            code: `import type { IAppEmits } from 'origam'

interface IMyAppEmits extends IAppEmits {}`,
            lang: 'typescript',
        },
    ],
}
