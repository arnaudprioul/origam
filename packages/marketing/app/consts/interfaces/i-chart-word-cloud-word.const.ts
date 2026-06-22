import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CHART_WORD_CLOUD_WORD_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-chart-word-cloud-word',
    name: 'IChartWordCloudWord',
    category: 'Chart',
    descriptionKey: 'interfaces.catalog.i_chart_word_cloud_word.description',
    descriptionFallback: 'Internal word descriptor after geometry placement. Extends IChartWordCloudDatum with layout coordinates (SVG center position, rotation, bounding box) used for rendering and collision detection.',
    definition: `export interface IChartWordCloudWord extends IChartWordCloudDatum {
    fontSize: number
    x: number
    y: number
    angle: number
    index: number
    width: number
    height: number
}`,
    extends: ['IChartWordCloudDatum'],
    props: [
        { name: 'fontSize', type: 'number', optional: false, descriptionFallback: 'Computed font size in px.' },
        { name: 'x', type: 'number', optional: false, descriptionFallback: 'Horizontal centre of the word in SVG coordinates.' },
        { name: 'y', type: 'number', optional: false, descriptionFallback: 'Vertical centre of the word in SVG coordinates.' },
        { name: 'angle', type: 'number', optional: false, descriptionFallback: 'Rotation angle in degrees.' },
        { name: 'index', type: 'number', optional: false, descriptionFallback: 'Original index in the sorted data array.' },
        { name: 'width', type: 'number', optional: false, descriptionFallback: 'Estimated bounding box width (used for collision detection).' },
        { name: 'height', type: 'number', optional: false, descriptionFallback: 'Estimated bounding box height (used for collision detection).' },
    ],
    usedBy: [
        { slug: 'chart-word-cloud', name: 'OrigamChartWordCloud', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Chart/chart-word-cloud.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_chart_word_cloud_word.example',
            titleFallback: 'Extending IChartWordCloudDatum for layout',
            code: `import type { IChartWordCloudWord } from 'origam'

// After geometry placement each word exposes full SVG positioning:
function renderWord(w: IChartWordCloudWord) {
    return \`<text
        x="\${w.x}" y="\${w.y}"
        font-size="\${w.fontSize}"
        fill="\${w.color}"
        transform="rotate(\${w.angle})">\${w.text}</text>\`
}`,
            lang: 'typescript',
        },
    ],
}
