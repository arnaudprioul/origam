import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TEXT_MASK_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-text-mask-props',
    name: 'ITextMaskProps',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_text_mask_props.description',
    descriptionFallback: 'Props for <OrigamTextMask> — a typographic "window" component that paints text as a transparent fill over an animated background (background-clip: text). Accepts gradient objects, raw CSS gradient strings, preset names or image URLs.',
    definition: `export interface ITextMaskProps extends ICommonsComponentProps, ITagProps {
    text?: string
    background: string | IGradient
    animated?: boolean
    animationDuration?: string
    animationType?: TTextMaskAnimation
    fontSize?: string | number
    fontWeight?: string | number
    fontFamily?: string
    lineHeight?: string | number
    letterSpacing?: string
    align?: TBlockquoteAlign
}`,
    extends: ['ICommonsComponentProps', 'ITagProps'],
    props: [
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Text to mask. Ignored when the default slot is provided.' },
        { name: 'background', type: 'string | IGradient', optional: false, descriptionFallback: 'Background painted behind the text glyphs. Accepts a gradient object, raw CSS gradient string, preset name or image URL. Required.' },
        { name: 'animated', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Animates the background. Combined with animationType to pick a keyframe set.' },
        { name: 'animationDuration', type: 'string', optional: true, default: "'3s'", descriptionFallback: "Duration of one animation cycle. Accepts any CSS <time> value ('3s', '750ms', …)." },
        { name: 'animationType', type: 'TTextMaskAnimation', optional: true, default: "'pan'", descriptionFallback: "Animation strategy. Default is 'pan'." },
        { name: 'fontSize', type: 'string | number', optional: true, default: "'inherit'", descriptionFallback: 'font-size of the masked text. Numbers interpreted as px.' },
        { name: 'fontWeight', type: 'string | number', optional: true, default: "'inherit'", descriptionFallback: "font-weight of the masked text. Accepts numeric weights (100-900) or keywords ('bold', 'normal', …)." },
        { name: 'fontFamily', type: 'string', optional: true, default: "'inherit'", descriptionFallback: 'font-family stack applied to the masked text.' },
        { name: 'lineHeight', type: 'string | number', optional: true, default: '1.1', descriptionFallback: 'line-height applied to the masked text.' },
        { name: 'letterSpacing', type: 'string', optional: true, descriptionFallback: 'letter-spacing applied to the masked text.' },
        { name: 'align', type: 'TBlockquoteAlign', optional: true, default: "'left'", descriptionFallback: 'text-align of the masked content.' },
    ],
    usedBy: [
        { slug: 'text-mask', name: 'TextMask', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/TextMask/text-mask.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_text_mask_props.example',
            titleFallback: 'Animated gradient headline',
            code: `<OrigamTextMask
  text="Design system"
  background="gradient-ocean"
  animated
  animation-type="pan"
  :font-size="64"
  font-weight="900"
/>`,
            lang: 'html',
        },
    ],
}
