import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_MEDIA_SCRUBBER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-media-scrubber-props',
    name: 'IMediaScrubberProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_media_scrubber_props.description',
    descriptionFallback: 'Props for <OrigamMediaScrubber> — a headless, media-agnostic value-on-a-track widget. Stateless: the parent controls modelValue and listens to update:modelValue, change, drag*, and hover events. Used for the timeline and the volume slider.',
    definition: `export interface IMediaScrubberProps extends ICommonsComponentProps, IColorProps, IRoundedProps {
    modelValue: number
    min?: number
    max: number
    step?: number
    buffered?: number
    orientation?: TMediaScrubberOrientation
    disabled?: boolean
    showThumbOnHoverOnly?: boolean
    showHoverTooltip?: boolean
    formatHoverTooltip?: (value: number) => string
    ariaLabel: string
    ariaValueText?: string
}`,
    extends: ['ICommonsComponentProps', 'IColorProps', 'IRoundedProps'],
    props: [
        { name: 'modelValue', type: 'number', optional: false, descriptionFallback: 'Current value between min and max. Supports v-model. The component never mutates this directly.' },
        { name: 'min', type: 'number', optional: true, default: '0', descriptionFallback: 'Lower bound of the value range.' },
        { name: 'max', type: 'number', optional: false, descriptionFallback: 'Upper bound of the value range. Required to compute thumb position. Passing 0 or a value <= min freezes the scrubber at the start.' },
        { name: 'step', type: 'number', optional: true, default: '0', descriptionFallback: 'Discrete step. 0 means continuous (pointer events emit the raw float); positive values snap each emission to the nearest multiple.' },
        { name: 'buffered', type: 'number', optional: true, descriptionFallback: 'Optional buffered position (end of the browser media buffer). Renders the __buffer bar from min up to buffered. Pass undefined to hide the bar.' },
        { name: 'orientation', type: 'TMediaScrubberOrientation', optional: true, default: "'horizontal'", descriptionFallback: "Layout axis. 'horizontal' = YouTube timeline shape, 'vertical' = volume / level meter shape (top = max, bottom = min)." },
        { name: 'disabled', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Disables pointer + keyboard interaction. The element drops out of the tab order and pointer events become no-ops.' },
        { name: 'showThumbOnHoverOnly', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Hides the thumb at rest and reveals it on hover / focus / drag — the YouTube pattern.' },
        { name: 'showHoverTooltip', type: 'boolean', optional: true, default: 'false', descriptionFallback: 'Shows a tooltip above the cursor (horizontal only) reflecting the hovered value. Content can be overridden via the #tooltip slot.' },
        { name: 'formatHoverTooltip', type: '(value: number) => string', optional: true, descriptionFallback: 'Formatter for the default hover tooltip label. Receives the hovered value and returns the string to render.' },
        { name: 'ariaLabel', type: 'string', optional: false, descriptionFallback: 'Required accessibility label — read by screen readers when the scrubber gains focus. Always pass a translated string.' },
        { name: 'ariaValueText', type: 'string', optional: true, descriptionFallback: 'Optional human-readable representation of the current value (e.g. "1:23" for a timestamp, "45 %" for a volume). Mapped to aria-valuetext.' },
    ],
    usedBy: [
        { slug: 'media-scrubber', name: 'MediaScrubber', kind: 'component' },
        { slug: 'video', name: 'Video', kind: 'component' },
        { slug: 'audio', name: 'Audio', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Media/media-scrubber.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_media_scrubber_props.example',
            titleFallback: 'Video timeline scrubber with buffer display',
            code: `<OrigamMediaScrubber
    v-model="currentTime"
    :max="duration"
    :buffered="bufferedEnd"
    :show-thumb-on-hover-only="true"
    :show-hover-tooltip="true"
    :format-hover-tooltip="formatTime"
    aria-label="Video timeline"
    :aria-value-text="formatTime(currentTime)"
    @change="onSeek"
/>`,
            lang: 'vue',
        },
    ],
}
