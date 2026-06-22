import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_WATERMARK_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-watermark-options',
    name: 'IUseWatermarkOptions',
    category: 'Composable Options',
    descriptionKey: 'interfaces.catalog.i_use_watermark_options.description',
    descriptionFallback: 'Options accepted by useWatermark. Mirrors the public props of OrigamWatermark minus the wrapper concerns (tag, class, style).',
    definition: `export interface IUseWatermarkOptions {
    text?: string
    image?: string
    opacity?: number
    angle?: number
    gap?: number
    fontSize?: number
    fontFamily?: string
    color?: string
    fontWeight?: number | string
    antiTamper?: boolean
    pointerEvents?: 'none' | 'auto'
    zIndex?: number
}`,
    extends: [],
    props: [
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text glyph repeated across the tile. UTF-8 is supported.' },
        { name: 'image', type: 'string', optional: true, descriptionFallback: 'URL / data-URL of an image used as the repeated glyph. Wins over text when both are passed.' },
        { name: 'opacity', type: 'number', optional: true, default: '0.1', descriptionFallback: 'Opacity of the rendered glyph, between 0 and 1.' },
        { name: 'angle', type: 'number', optional: true, default: '-30', descriptionFallback: 'Rotation in degrees applied to each tile. Negative values rotate counter-clockwise.' },
        { name: 'gap', type: 'number', optional: true, default: '120', descriptionFallback: 'Distance (in CSS pixels) between two adjacent tiles along both axes.' },
        { name: 'fontSize', type: 'number', optional: true, default: '16', descriptionFallback: 'Font size (in CSS pixels) of the text glyph. Ignored when image is used.' },
        { name: 'fontFamily', type: 'string', optional: true, default: "'inherit'", descriptionFallback: 'CSS font-family of the text glyph.' },
        { name: 'color', type: 'string', optional: true, default: "'currentColor'", descriptionFallback: 'Colour of the text glyph. Any CSS colour string.' },
        { name: 'fontWeight', type: 'number | string', optional: true, default: '400', descriptionFallback: 'CSS font-weight of the text glyph.' },
        { name: 'antiTamper', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Installs a MutationObserver that re-injects the layer when it is removed. Dissuasive, not a security feature.' },
        { name: 'pointerEvents', type: "'none' | 'auto'", optional: true, default: "'none'", descriptionFallback: 'Whether the overlay intercepts pointer events.' },
        { name: 'zIndex', type: 'number', optional: true, default: '1', descriptionFallback: 'z-index of the overlay layer.' },
    ],
    usedBy: [
        { slug: 'use-watermark', name: 'useWatermark', kind: 'composable' },
        { slug: 'watermark', name: 'Watermark', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Watermark/watermark.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_use_watermark_options.example',
            titleFallback: 'Using useWatermark directly',
            code: `const { style } = useWatermark({
    text: 'CONFIDENTIAL',
    opacity: 0.08,
    angle: -30,
    color: '#333',
})`,
            lang: 'typescript',
        },
    ],
}
