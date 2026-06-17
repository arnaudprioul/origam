import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const DEFAULT_SETS_CONST_DOC: IConstDoc = {
    slug: 'default-sets',
    name: 'DEFAULT_SETS',
    category: 'Icon',
    descriptionKey: 'consts.catalog.default_sets.description',
    descriptionFallback: 'Built-in icon set registry used by the icon system. Maps the "svg" and "class" set names to their respective renderer components (OrigamSvgIcon / OrigamClassIcon). Consumed by the icon provide/inject mechanism.',
    definition: `export const DEFAULT_SETS: Record<string, IIconSet> = {
    svg:   { component: OrigamSvgIcon },
    class: { component: OrigamClassIcon }
}`,
    values: [
        { value: "svg: { component: OrigamSvgIcon }", descriptionKey: 'consts.detail.default_sets.svg', descriptionFallback: 'Renders an icon from a raw SVG path or content.' },
        { value: "class: { component: OrigamClassIcon }", descriptionKey: 'consts.detail.default_sets.class', descriptionFallback: 'Renders an icon via a CSS class (e.g. MDI font class).' },
    ],
    usedBy: [
        { name: 'OrigamIcon', slug: 'icon' },
        { name: 'useIcon' },
        { name: 'ORIGAM_ICONS_KEY' },
    ],
    sourceFile: 'packages/ds/src/consts/Icon/icon.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.default_sets.example',
            titleFallback: 'Extending the default icon sets',
            code: `import { DEFAULT_SETS } from 'origam'

app.use(origam, {
  icons: {
    defaultSet: 'class',
    sets: {
      ...DEFAULT_SETS,
      custom: { component: MyCustomIconRenderer }
    }
  }
})`,
            lang: 'typescript',
        },
    ],
}
