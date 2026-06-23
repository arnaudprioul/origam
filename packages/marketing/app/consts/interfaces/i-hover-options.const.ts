import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_HOVER_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-hover-options',
    name: 'IHoverOptions',
    category: 'Directives & Utilities',
    descriptionKey: 'interfaces.catalog.i_hover_options.description',
    descriptionFallback: 'Runtime options resolved by the v-hover directive after merging the binding value — holds the final CSS class to toggle on the element.',
    definition: `export interface IHoverOptions {
    class: string
}`,
    extends: [],
    props: [
        { name: 'class', type: 'string', optional: false, descriptionFallback: 'The CSS class that will be added to the element while it is hovered. Derived from the directive binding or defaulting to a component-specific hover class.' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Commons/hover.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_hover_options.example',
            titleFallback: 'Reading the resolved hover options inside a directive',
            code: `import type { IHoverOptions } from 'origam'

function resolveHoverOptions(cls?: string): IHoverOptions {
    return { class: cls ?? 'element--hover' }
}`,
            lang: 'typescript',
        },
    ],
}
