import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SPACER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-spacer-props',
    name: 'ISpacerProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_spacer_props.description',
    descriptionFallback: 'Props contract for <OrigamSpacer> — a flex/grid spacer that grows to fill available space. Extends ICommonsComponentProps and ITagProps only; no additional own props.',
    definition: `export interface ISpacerProps extends ICommonsComponentProps, ITagProps {
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [],
    usedBy: [
        { slug: 'spacer', name: 'Spacer', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Grids/spacer.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_spacer_props.example',
            titleFallback: 'Spacer pushing content to opposite ends',
            code: `<OrigamAppBar>
    <OrigamTitle>My App</OrigamTitle>
    <OrigamSpacer />
    <OrigamBtn icon>
        <OrigamIcon :icon="mdiAccount" />
    </OrigamBtn>
</OrigamAppBar>`,
            lang: 'vue',
        },
    ],
}
