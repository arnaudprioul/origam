import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WATERMARK_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-watermark-props',
    name: 'IWatermarkProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_watermark_props.description',
    descriptionFallback: 'Props for OrigamWatermark — a repeating diagonal overlay used to mark a sub-tree as CONFIDENTIAL / DRAFT / personalised by recipient. The component renders an absolutely-positioned layer over its #default slot using a SVG data-URL as background-image.',
    definition: `export interface IWatermarkProps extends ICommonsComponentProps, ITagProps {
    text?: string
    image?: string
    opacity?: number
    angle?: number
    gap?: number
    fontSize?: number
    fontFamily?: string
    color?: string
    fontWeight?: number | string
    zIndex?: number
    antiTamper?: boolean
    pointerEvents?: 'none' | 'auto'
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text glyph repeated across the tile. Required unless image is passed. UTF-8 is supported.' },
        { name: 'image', type: 'string', optional: true, descriptionFallback: 'URL / data-URL of an image used as the repeated glyph. Wins over text when both are passed.' },
        { name: 'opacity', type: 'number', optional: true, default: '0.1', descriptionFallback: 'Opacity of the rendered glyph, between 0 and 1. Applied at the SVG level so the wrapped content stays at full opacity.' },
        { name: 'angle', type: 'number', optional: true, default: '-30', descriptionFallback: 'Rotation in degrees applied to each tile. Negative values rotate counter-clockwise.' },
        { name: 'gap', type: 'number', optional: true, default: '120', descriptionFallback: 'Distance (in CSS pixels) between two adjacent tiles along both axes.' },
        { name: 'fontSize', type: 'number', optional: true, default: '16', descriptionFallback: 'Font size (in CSS pixels) of the text glyph. Ignored when image is used.' },
        { name: 'fontFamily', type: 'string', optional: true, default: "'inherit'", descriptionFallback: "CSS font-family of the text glyph. Note: 'inherit' resolves to the SVG element's own default since the SVG is loaded as a data-URL." },
        { name: 'color', type: 'string', optional: true, default: "'currentColor'", descriptionFallback: "Colour of the text glyph. Note: 'currentColor' does NOT work here because the SVG is loaded as a data-URL and detached from the document cascade." },
        { name: 'fontWeight', type: 'number | string', optional: true, default: '400', descriptionFallback: 'CSS font-weight of the text glyph. Accepts standard CSS values (100-900, normal, bold).' },
        { name: 'zIndex', type: 'number', optional: true, default: '1', descriptionFallback: 'z-index of the overlay layer.' },
        { name: 'antiTamper', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Installs a MutationObserver that re-injects the layer when it is removed. Dissuasive, not a security feature.' },
        { name: 'pointerEvents', type: "'none' | 'auto'", optional: true, default: "'none'", descriptionFallback: 'Whether the overlay intercepts pointer events.' },
    ],
    usedBy: [
        { slug: 'watermark', name: 'Watermark', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Watermark/watermark.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_watermark_props.example',
            titleFallback: 'Wrapping confidential content with OrigamWatermark',
            code: `<OrigamWatermark
    text="CONFIDENTIAL"
    :opacity="0.08"
    :angle="-30"
    color="#333333"
    :anti-tamper="true"
>
    <MyDocument />
</OrigamWatermark>`,
            lang: 'html',
        },
    ],
}
