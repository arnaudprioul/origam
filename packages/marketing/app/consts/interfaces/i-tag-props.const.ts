import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TAG_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tag-props',
    name: 'ITagProps',
    category: 'Rendering',
    descriptionKey: 'interfaces.catalog.i_tag_props.description',
    descriptionFallback: 'Polymorphic-tag contract — lets consumers override the root HTML element rendered by a component (e.g. change a <div> to an <article> or <section>).',
    definition: `export interface ITagProps {
    tag?: string
}`,
    extends: [],
    props: [
        { name: 'tag', type: 'string', optional: true, descriptionFallback: 'HTML element tag name to use as the component root. Defaults vary per component (div, span, button, …).' },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'title', name: 'Title', kind: 'component' },
        { slug: 'list', name: 'List', kind: 'component' },
        { slug: 'tabs', name: 'Tabs', kind: 'component' },
        { slug: 'drawer', name: 'Drawer', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tag_props.example',
            titleFallback: 'Rendering a Card as an <article> element',
            code: `<origam-card tag="article">
    <origam-card-text>Content</origam-card-text>
</origam-card>`,
            lang: 'html',
        },
    ],
}
