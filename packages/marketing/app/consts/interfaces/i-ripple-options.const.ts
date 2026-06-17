import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_RIPPLE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-ripple-options',
    name: 'IRippleOptions',
    category: 'Behaviour',
    descriptionKey: 'interfaces.catalog.i_ripple_options.description',
    descriptionFallback: 'Options passed to the v-ripple directive when an object value is used. Controls the visual behaviour of the ripple wave: extra class, centred start, and forced circular shape.',
    definition: `export interface IRippleOptions {
    class?: string
    center?: boolean
    circle?: boolean
}`,
    extends: [],
    props: [
        { name: 'class', type: 'string', optional: true, descriptionFallback: 'Extra CSS class appended to every ripple wave element for custom styling.' },
        { name: 'center', type: 'boolean', optional: true, descriptionFallback: 'When true, the ripple always starts from the centre of the host element.' },
        { name: 'circle', type: 'boolean', optional: true, descriptionFallback: 'When true, constrains the ripple to a perfect circle regardless of the element dimensions.' },
    ],
    usedBy: [
        { slug: 'use-ripple', name: 'useRipple', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/ripple.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_ripple_options.example',
            titleFallback: 'Using v-ripple with options',
            code: `<OrigamBtn v-ripple="{ center: true, circle: true, class: 'my-ripple' }">
    Click me
</OrigamBtn>`,
            lang: 'html',
        },
    ],
}
