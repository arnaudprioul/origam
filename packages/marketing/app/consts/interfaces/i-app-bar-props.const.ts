import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_APP_BAR_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-app-bar-props',
    name: 'IAppBarProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_app_bar_props.description',
    descriptionFallback: 'Props for <OrigamAppBar> — a docked layout item that extends IToolbarProps (minus width/minWidth/maxWidth/floating) and ILayoutItemProps (minus absolute), plus scroll-driven behaviour and block-axis placement.',
    definition: `export interface IAppBarProps extends Omit<IToolbarProps, 'width' | 'minWidth' | 'maxWidth' | 'floating'>, Omit<ILayoutItemProps, 'absolute'>, IScrollProps {
    location?: TBlock
    image?: IImgProps
}`,
    extends: ['IToolbarProps', 'ILayoutItemProps', 'IScrollProps'],
    props: [
        { name: 'location', type: 'TBlock', optional: true, descriptionFallback: 'Block-axis edge where the bar is docked. Accepts "top" or "bottom". Defaults to "top".' },
        { name: 'image', type: 'IImgProps', optional: true, descriptionFallback: 'Background image for the app bar surface. Accepts an IImgProps descriptor (src, srcset, lazy-src, etc.).' },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/App/app-bar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_app_bar_props.example',
            titleFallback: 'App bar docked at the bottom with elevation',
            code: `<OrigamAppBar location="bottom" :elevation="4">
    <OrigamToolbarTitle>My App</OrigamToolbarTitle>
</OrigamAppBar>`,
            lang: 'vue',
        },
    ],
}
