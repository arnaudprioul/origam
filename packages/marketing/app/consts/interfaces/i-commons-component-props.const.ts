import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COMMONS_COMPONENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-commons-component-props',
    name: 'ICommonsComponentProps',
    category: 'Utilities',
    descriptionKey: 'interfaces.catalog.i_commons_component_props.description',
    descriptionFallback: 'Base prop contract shared by most Origam components. Provides id, class, and style pass-through so consumers can always decorate the root element.',
    definition: `export interface ICommonsComponentProps {
    id?: string
    class?: string | Array<string> | object
    style?: string | Array<string> | object | StyleValue
}`,
    extends: [],
    props: [
        { name: 'id', type: 'string', optional: true, descriptionFallback: 'HTML id attribute forwarded to the component root element.' },
        { name: 'class', type: 'string | Array<string> | object', optional: true, descriptionFallback: 'Extra CSS classes merged onto the component root — same shapes as Vue\'s :class binding.' },
        { name: 'style', type: 'string | Array<string> | object | StyleValue', optional: true, descriptionFallback: 'Inline style forwarded to the component root — same shapes as Vue\'s :style binding.' },
    ],
    usedBy: [
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'drawer', name: 'Drawer', kind: 'component' },
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
        { slug: 'title', name: 'Title', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_commons_component_props.example',
            titleFallback: 'Extending ICommonsComponentProps for a component',
            code: `import type { ICommonsComponentProps } from 'origam'

interface IMyCardProps extends ICommonsComponentProps {
    title?: string
}`,
            lang: 'typescript',
        },
    ],
}
