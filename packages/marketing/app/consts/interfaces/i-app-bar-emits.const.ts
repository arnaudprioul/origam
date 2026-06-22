import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_APP_BAR_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-app-bar-emits',
    name: 'IAppBarEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_app_bar_emits.description',
    descriptionFallback: 'Emits contract for <OrigamAppBar> — extends the shared component emits contract with no additional events.',
    definition: `export interface IAppBarEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/App/app-bar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_app_bar_emits.example',
            titleFallback: 'Extending IAppBarEmits in a host component',
            code: `import type { IAppBarEmits } from 'origam'

interface IMyAppBarEmits extends IAppBarEmits {}`,
            lang: 'typescript',
        },
    ],
}
