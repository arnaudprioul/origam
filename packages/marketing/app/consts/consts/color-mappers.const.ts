import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_MAPPERS_CONST_DOC: IConstDoc = {
    slug: 'color-mappers',
    name: 'COLOR_MAPPERS',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_mappers.description',
    descriptionFallback: 'Record of parser functions keyed by CSS color-function name (rgb, rgba, hsl, hsla, hsv, hsva). Each function converts its channel arguments into an RGBA object, normalising via HSLtoRGB or HSVtoRGB where needed.',
    definition: `export const COLOR_MAPPERS = {
    rgb:  (r, g, b, a?) => ({r, g, b, a}),
    rgba: (r, g, b, a?) => ({r, g, b, a}),
    hsl:  (h, s, l, a?) => HSLtoRGB({h, s, l, a}),
    hsla: (h, s, l, a?) => HSLtoRGB({h, s, l, a}),
    hsv:  (h, s, v, a?) => HSVtoRGB({h, s, v, a}),
    hsva: (h, s, v, a?) => HSVtoRGB({h, s, v, a})
}`,
    values: [
        { value: 'rgb', descriptionKey: 'consts.detail.color_mappers.rgb', descriptionFallback: 'Parses rgb(R G B) — returns RGBA object directly.' },
        { value: 'rgba', descriptionKey: 'consts.detail.color_mappers.rgba', descriptionFallback: 'Parses rgba(R G B A) — returns RGBA object directly.' },
        { value: 'hsl', descriptionKey: 'consts.detail.color_mappers.hsl', descriptionFallback: 'Parses hsl(H S L) — converts via HSLtoRGB.' },
        { value: 'hsla', descriptionKey: 'consts.detail.color_mappers.hsla', descriptionFallback: 'Parses hsla(H S L A) — converts via HSLtoRGB.' },
        { value: 'hsv', descriptionKey: 'consts.detail.color_mappers.hsv', descriptionFallback: 'Parses hsv(H S V) — converts via HSVtoRGB.' },
        { value: 'hsva', descriptionKey: 'consts.detail.color_mappers.hsva', descriptionFallback: 'Parses hsva(H S V A) — converts via HSVtoRGB.' },
    ],
    usedBy: [
        { name: 'parseColor' },
        { name: 'useColor' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_mappers.example',
            titleFallback: 'Parsing a CSS color string',
            code: `import { COLOR_MAPPERS, CSS_COLOR_REGEX } from 'origam'

function parseColor(raw: string) {
  const m = CSS_COLOR_REGEX.exec(raw)
  if (!m) return null
  const fn = m.groups!.fn as keyof typeof COLOR_MAPPERS
  const vals = m.groups!.values.split(',').map(Number)
  return COLOR_MAPPERS[fn]?.(...(vals as [number, number, number, number?]))
}`,
            lang: 'typescript',
        },
    ],
}
