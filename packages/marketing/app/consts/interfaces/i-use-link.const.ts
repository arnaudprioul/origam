import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_LINK_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-link',
    name: 'IUseLink',
    category: 'Navigation',
    descriptionKey: 'interfaces.catalog.i_use_link.description',
    descriptionFallback: 'Return type of the useLink composable — extends vue-router\'s useLink return (minus the raw href) with two additional computed flags: isLink and isClickable.',
    definition: `export interface IUseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
    isLink: ComputedRef<boolean>
    isClickable: ComputedRef<boolean>
    href: Ref<string | undefined>
}`,
    extends: ['ReturnType<typeof useLink>'],
    props: [
        { name: 'isLink', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'True when the component renders as an anchor (href or to prop is present).' },
        { name: 'isClickable', type: 'ComputedRef<boolean>', optional: false, descriptionFallback: 'True when the component is interactive (isLink or a click handler is bound).' },
        { name: 'href', type: 'Ref<string | undefined>', optional: false, descriptionFallback: 'Resolved href string — undefined when no navigation target is set.' },
    ],
    usedBy: [
        { slug: 'use-link', name: 'useLink', kind: 'composable' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'list-item', name: 'ListItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/link.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_link.example',
            titleFallback: 'Reading isLink to conditionally render an <a> or <button>',
            code: `import { useLink } from 'origam'

const link: IUseLink = useLink(props)

// Render as <a> only when a navigation target is provided
const tag = computed(() => link.isLink.value ? 'a' : 'button')`,
            lang: 'typescript',
        },
    ],
}
