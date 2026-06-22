import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_APP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-app-props',
    name: 'IAppProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_app_props.description',
    descriptionFallback: 'Props for <OrigamApp> — thin application-shell wrapper over OrigamLayout, exposing only color, bgColor, fullHeight and overlaps. Intentionally omits the full design surface (border, rounded, elevation, spacing) that belongs on OrigamLayout directly.',
    definition: `export interface IAppProps extends ICommonsComponentProps, IColorProps, IBgColorProps {
    fullHeight?: boolean
    overlaps?: Array<string>
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IBgColorProps'],
    props: [
        { name: 'fullHeight', type: 'boolean', optional: true, default: 'true', descriptionFallback: 'Stretches the layout to the full viewport (100vw / 100vh). Defaults to true.' },
        { name: 'overlaps', type: 'Array<string>', optional: true, descriptionFallback: 'IDs of layout items that are allowed to overlap each other. Forwarded to the underlying OrigamLayout.' },
    ],
    usedBy: [
        { slug: 'app', name: 'App', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/App/app.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_app_props.example',
            titleFallback: 'Full-height app shell with primary background',
            code: `<OrigamApp bg-color="primary" :full-height="true">
    <OrigamAppBar />
    <OrigamMain />
</OrigamApp>`,
            lang: 'vue',
        },
    ],
}
