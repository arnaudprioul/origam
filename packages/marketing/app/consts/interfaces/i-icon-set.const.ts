import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_ICON_SET_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-icon-set',
    name: 'IIconSet',
    category: 'Icons',
    descriptionKey: 'interfaces.catalog.i_icon_set.description',
    descriptionFallback: 'Descriptor for a custom Origam icon set — holds the Vue component that the icon renderer will mount when this set is active.',
    definition: `export interface IIconSet {
    component: TIconComponent
}`,
    extends: [],
    props: [
        { name: 'component', type: 'TIconComponent', optional: false, descriptionFallback: 'The Vue component (or functional component) used to render each icon in this set.' },
    ],
    usedBy: [
        { slug: 'icon', name: 'Icon', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Icon/icon.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_icon_set.example',
            titleFallback: 'Registering a custom SVG icon set',
            code: `import type { IIconSet } from 'origam'
import MySvgIcon from './MySvgIcon.vue'

const myIconSet: IIconSet = { component: MySvgIcon }

app.use(origam, { icons: { defaultSet: 'custom', sets: { custom: myIconSet } } })`,
            lang: 'typescript',
        },
    ],
}
