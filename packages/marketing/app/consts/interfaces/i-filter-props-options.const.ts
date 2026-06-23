import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_FILTER_PROPS_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-filter-props-options',
    name: 'IFilterPropsOptions',
    category: 'Utilities & Internals',
    descriptionKey: 'interfaces.catalog.i_filter_props_options.description',
    descriptionFallback: 'Generic utility interface — binds a props options descriptor to its extracted Props type and provides a filterProps() helper that strips props not belonging to a given sub-component. Used internally by useProps().',
    definition: `export interface IFilterPropsOptions<PropsOptions extends {
    [key: string]: any
}, Props = ExtractPropTypes<PropsOptions>> {
    props: PropsOptions

    filterProps<
        T extends Partial<Props>,
        U extends Extract<keyof T, string>
    >(properties: T, excludes?: string[]): Partial<Pick<T, U>>
}`,
    extends: [],
    props: [
        {
            name: 'props',
            type: 'PropsOptions',
            optional: false,
            descriptionFallback: 'The raw Vue props options descriptor (record of PropType / validator objects).',
        },
        {
            name: 'filterProps',
            type: '<T, U>(properties: T, excludes?: string[]) => Partial<Pick<T, U>>',
            optional: false,
            descriptionFallback: 'Returns a subset of `properties` containing only the keys declared in `PropsOptions`, optionally minus the keys listed in `excludes`.',
        },
    ],
    usedBy: [
        { slug: 'use-props', name: 'useProps', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/commons.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_filter_props_options.example',
            titleFallback: 'Using useProps() which returns IFilterPropsOptions',
            code: `import { useProps } from 'origam'

const { filterProps } = useProps(props)

// Only forward the props that BtnProps declares
const btnProps = filterProps(props)`,
            lang: 'typescript',
        },
    ],
}
