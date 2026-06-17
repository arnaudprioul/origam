import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LINK_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-link-props',
    name: 'ILinkProps',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_link_props.description',
    descriptionFallback: 'Navigation props shared by any component that can act as a link — resolves to an anchor when href or to is set, button otherwise.',
    definition: `export interface ILinkProps {
    href?: string
    replace?: boolean
    to?: RouteLocationRaw
    exact?: boolean
}`,
    extends: [],
    props: [
        {
            name: 'href',
            type: 'string',
            optional: true,
            descriptionFallback: 'Plain URL for external links. When set, renders an <a> element.',
        },
        {
            name: 'replace',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'When true, navigates via router.replace() instead of router.push().',
        },
        {
            name: 'to',
            type: 'RouteLocationRaw',
            optional: true,
            descriptionFallback: 'Vue Router destination — a string path, location object or named route.',
        },
        {
            name: 'exact',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Passes the `exact` flag to vue-router for active-link matching.',
        },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'chip', name: 'Chip', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
        { slug: 'breadcrumb-item', name: 'BreadcrumbItem', kind: 'component' },
        { slug: 'use-link', name: 'useLink', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/router.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_link_props.example',
            titleFallback: 'Button acting as a router link',
            code: `<OrigamBtn :to="{ name: 'dashboard' }" color="primary">
    Go to Dashboard
</OrigamBtn>`,
            lang: 'html',
        },
    ],
}
