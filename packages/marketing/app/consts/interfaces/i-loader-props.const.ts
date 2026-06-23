import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LOADER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-loader-props',
    name: 'ILoaderProps',
    category: 'Feedback & Status',
    descriptionKey: 'interfaces.catalog.i_loader_props.description',
    descriptionFallback: 'Loading-state contract — extends common, tag and color props with a polymorphic loading flag and an accessible loading text.',
    definition: `export interface ILoaderProps
    extends ICommonsComponentProps,
            ITagProps,
            IColorProps {
    loading?: TLoadingValue
    loadingText?: string
}`,
    extends: ['ICommonsComponentProps', 'ITagProps', 'IColorProps'],
    props: [
        {
            name: 'loading',
            type: 'TLoadingValue',
            optional: true,
            descriptionFallback: 'Controls the loading indicator: false hides it, true or a string shows a determinate/indeterminate loader.',
        },
        {
            name: 'loadingText',
            type: 'string',
            optional: true,
            descriptionFallback: 'Accessible label announced to screen readers while the loading state is active.',
        },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', kind: 'component' },
        { slug: 'data-table', name: 'DataTable', kind: 'component' },
        { slug: 'use-loader', name: 'useLoader', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/loader.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_loader_props.example',
            titleFallback: 'Button with a loading spinner',
            code: `<OrigamBtn :loading="isSubmitting" loading-text="Saving…" color="primary">
    Save
</OrigamBtn>`,
            lang: 'html',
        },
    ],
}
