import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MDI_CONST_DOC: IConstDoc = {
    slug: 'mdi',
    name: 'MDI',
    category: 'Icons',
    descriptionKey: 'consts.catalog.mdi.description',
    descriptionFallback: 'The Material Design Icons icon set adapter for Origam. Implements IIconSet by rendering OrigamClassIcon with the mdi CSS class. Normalises bare icon names (magnify) and already-prefixed names (mdi-magnify) to always emit mdi-{name}. Pass this constant to the icons option when installing Origam.',
    definition: `export const MDI: IIconSet = {
    component: (props: any) => h(OrigamClassIcon, {
        ...props,
        icon: typeof props.icon === 'string' && !props.icon.startsWith('mdi-')
            ? \`mdi-\${props.icon}\`
            : props.icon,
        class: 'mdi'
    })
}`,
    value: '{ component: (props) => h(OrigamClassIcon, { …, class: \'mdi\' }) }',
    usedBy: [
        { name: 'OrigamIcon', slug: 'icon' },
        { name: 'useIcon' },
        { name: 'MDI_ALIASES' },
    ],
    sourceFile: 'packages/ds/src/consts/Icon/mdi.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.mdi.example',
            titleFallback: 'Registering the MDI icon set',
            code: `import { createOrigam, MDI, MDI_ALIASES } from 'origam'

const origam = createOrigam({
  icons: {
    defaultSet: 'mdi',
    sets: { mdi: MDI },
    aliases: MDI_ALIASES
  }
})`,
            lang: 'typescript',
        },
    ],
}
