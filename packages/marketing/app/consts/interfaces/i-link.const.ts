import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LINK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-link',
    name: 'ILink',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_link.description',
    descriptionFallback: 'Internal return type of useLink — wraps vue-router\'s useLink return value with Origam-specific computed flags and a resolved href ref.',
    definition: `export interface ILink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
    tag: string
    isLink: ComputedRef<boolean>
    isClickable: ComputedRef<boolean>
    href: Ref<string | undefined>
}`,
    extends: [],
    props: [
        {
            name: 'tag',
            type: 'string',
            optional: false,
            descriptionFallback: 'The HTML tag or component to render — "a" when a href/to is provided, "button" otherwise.',
        },
        {
            name: 'isLink',
            type: 'ComputedRef<boolean>',
            optional: false,
            descriptionFallback: 'True when the component resolves to an anchor (href or to is set).',
        },
        {
            name: 'isClickable',
            type: 'ComputedRef<boolean>',
            optional: false,
            descriptionFallback: 'True when the element is interactive (isLink or an onClick handler is present).',
        },
        {
            name: 'href',
            type: 'Ref<string | undefined>',
            optional: false,
            descriptionFallback: 'Resolved href string — replaces the vue-router version to provide a consistent Ref shape.',
        },
    ],
    usedBy: [
        { slug: 'use-link', name: 'useLink', kind: 'composable' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/router.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_link.example',
            titleFallback: 'Consuming ILink from useLink',
            code: `import { useLink } from 'origam'
import type { ILink } from 'origam'

const link: ILink = useLink(props)
// link.tag → 'a' | 'button' | 'router-link'
// link.href.value → '/about'`,
            lang: 'typescript',
        },
    ],
}
