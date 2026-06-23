import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CONTAINER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-container-props',
    name: 'IContainerProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_container_props.description',
    descriptionFallback: 'Props for <OrigamContainer> — a structural page-level wrapper. Deliberately excludes color and rounded props (those belong on Sheet/Card/Alert). Exposes fluid and fullscreen toggles plus the standard dimension, padding, margin and border surfaces.',
    definition: `export interface IContainerProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IPaddingProps, IMarginProps, IBorderProps {
    fluid?: boolean
    fullscreen?: boolean
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IDimensionProps', 'IPaddingProps', 'IMarginProps', 'IBorderProps'],
    props: [
        { name: 'fluid', type: 'boolean', optional: true, descriptionFallback: 'When true the container stretches to 100% width instead of capping at the breakpoint max-width.' },
        { name: 'fullscreen', type: 'boolean', optional: true, descriptionFallback: 'When true the container spans the full viewport width and height (100vw × 100vh).' },
    ],
    usedBy: [
        { slug: 'container', name: 'Container', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grids/container.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_container_props.example',
            titleFallback: 'Fluid container centered with padding',
            code: `<OrigamContainer fluid px="6" py="4">
    <p>Content stretches full width.</p>
</OrigamContainer>`,
            lang: 'vue',
        },
    ],
}
