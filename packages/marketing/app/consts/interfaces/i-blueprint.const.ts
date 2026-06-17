import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BLUEPRINT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-blueprint',
    name: 'IBlueprint',
    category: 'Data & Items',
    descriptionKey: 'interfaces.catalog.i_blueprint.description',
    descriptionFallback: 'Global configuration preset — extends IOrigamOptions (minus the blueprint key itself) to allow passing a pre-built config object to createOrigam().',
    definition: `export interface IBlueprint extends Omit<IOrigamOptions, 'blueprint'> {
}`,
    extends: ['IOrigamOptions'],
    props: [],
    usedBy: [
        { slug: 'origam', name: 'Origam', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_blueprint.example',
            titleFallback: 'Providing a blueprint to createOrigam',
            code: `import { createOrigam } from 'origam'
import type { IBlueprint } from 'origam'

const myBlueprint: IBlueprint = {
    icons: { defaultSet: 'mdi' },
}

app.use(createOrigam({ blueprint: myBlueprint }))`,
            lang: 'typescript',
        },
    ],
}
