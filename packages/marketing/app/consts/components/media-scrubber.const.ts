/**
 * /components/media-scrubber — full documentation data for OrigamMediaScrubber.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Media/media-scrubber.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/Media/OrigamMediaScrubber.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/media-scrubber.json              (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const MEDIA_SCRUBBER_DOC: IComponentDoc = {
    slug: 'media-scrubber',
    name: 'MediaScrubber',
    tag: 'origam-media-scrubber',
    icon: 'mdi-tune',
    category: 'Media',
    descriptionKey: 'components.catalog.media_scrubber.description',
    descriptionFallback: 'Headless media-agnostic track-and-thumb slider widget. Owns the full pointer-events drag pipeline, keyboard matrix (ARIA slider pattern), optional buffer bar, hover tooltip and both horizontal and vertical orientations. Used internally by OrigamMediaController for the timeline and the volume slider.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-audio--design',
    docUrl: 'http://localhost:4000/components/Media/OrigamMediaController',
    parentSlug: 'media',

    family: [],

    related: [
        {
            slug: 'media',
            name: 'Media',
            kind: 'component',
            descriptionKey: 'components.catalog.media.description',
            descriptionFallback: 'Media family root (controller + scrubber + volume).'
        },
        {
            slug: 'media-controller',
            name: 'MediaController',
            kind: 'component',
            descriptionKey: 'components.catalog.media_controller.description',
            descriptionFallback: 'Universal media controls shell that embeds OrigamMediaScrubber for the timeline.'
        },
        {
            slug: 'slider-field',
            name: 'SliderField',
            kind: 'component',
            descriptionKey: 'components.catalog.slider_field.description',
            descriptionFallback: 'General-purpose accessible slider form field — sibling pattern to MediaScrubber but form-integrated.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_scrubber.props.model_value.description',
            descriptionFallback: 'Current value between min and max. Supports v-model. The component never mutates this directly — every change surfaces via update:modelValue.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_scrubber.props.max.description',
            descriptionFallback: 'Upper bound of the value range. Required to compute the thumb position. Passing 0 or any value <= min freezes the scrubber at the start.'
        },
        {
            name: 'min',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.media_scrubber.props.min.description',
            descriptionFallback: 'Lower bound of the value range.'
        },
        {
            name: 'step',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.media_scrubber.props.step.description',
            descriptionFallback: 'Discrete step. 0 (default) means continuous — pointer events emit the raw float; positive values snap each emission to the nearest multiple.'
        },
        {
            name: 'buffered',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.media_scrubber.props.buffered.description',
            descriptionFallback: 'Optional buffered position (end of the browser\'s media buffer). Renders the __buffer bar from min up to buffered. Pass undefined to hide the bar entirely.'
        },
        {
            name: 'orientation',
            type: { label: 'TMediaScrubberOrientation', slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.media_scrubber.props.orientation.description',
            descriptionFallback: 'Layout axis. horizontal = YouTube timeline shape; vertical = volume / level meter shape (top of track = max, bottom = min).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_scrubber.props.disabled.description',
            descriptionFallback: 'Disables pointer + keyboard interaction. The element drops out of the tab order (tabindex="-1") and pointer events become no-ops.'
        },
        {
            name: 'showThumbOnHoverOnly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_scrubber.props.show_thumb_on_hover_only.description',
            descriptionFallback: 'Hides the thumb at rest and reveals it on hover / focus / drag — the YouTube pattern. When false, the thumb is always visible.'
        },
        {
            name: 'showHoverTooltip',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.media_scrubber.props.show_hover_tooltip.description',
            descriptionFallback: 'Shows a tooltip above the cursor (horizontal only) reflecting the hovered value. Content can be overridden via the #tooltip slot.'
        },
        {
            name: 'formatHoverTooltip',
            type: { label: '(value: number) => string', slug: '', kind: 'primitive' },
            defaultValue: 'value => String(value)',
            descriptionKey: 'components.media_scrubber.props.format_hover_tooltip.description',
            descriptionFallback: 'Formatter for the default hover tooltip label. Receives the hovered value, returns the string to render.'
        },
        {
            name: 'ariaLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.media_scrubber.props.aria_label.description',
            descriptionFallback: 'Required accessibility label read by screen readers when the scrubber gains focus. Always pass a translated string here.'
        },
        {
            name: 'ariaValueText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.media_scrubber.props.aria_value_text.description',
            descriptionFallback: 'Optional human-readable representation of the current value (e.g. "1:23" for a timestamp, "45 %" for a volume level). Mapped to aria-valuetext.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.media_scrubber.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the track background via useBackgroundColor. Utility class emitted for tokenised values; inline style for custom colors.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.media_scrubber.props.rounded.description',
            descriptionFallback: 'Border-radius token for the track element. Applied via useRounded.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_scrubber.emits.update_model_value.description',
            descriptionFallback: 'Live value update — fires during drag, keyboard and click. The parent should update modelValue immediately for smooth thumb tracking.'
        },
        {
            event: 'change',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_scrubber.emits.change.description',
            descriptionFallback: 'Commit event — fires on pointerup or pointercancel after a drag, and on keyboard arrow/home/end. Signals that the user has finished adjusting the value.'
        },
        {
            event: 'dragstart',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_scrubber.emits.dragstart.description',
            descriptionFallback: 'Fired when pointer capture starts (pointerdown). Useful to pause video thumbnail generation or lock the parent UI during scrubbing.'
        },
        {
            event: 'dragend',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_scrubber.emits.dragend.description',
            descriptionFallback: 'Fired when the drag ends (pointerup or pointercancel).'
        },
        {
            event: 'hover',
            payload: { label: 'number | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.media_scrubber.emits.hover.description',
            descriptionFallback: 'Fires with the hovered value on pointermove, and with null on pointerleave. Useful for updating a preview thumbnail or a secondary tooltip outside the scrubber.'
        }
    ],

    slots: [
        {
            slot: 'tooltip',
            slotProps: '{ value: number }',
            descriptionKey: 'components.media_scrubber.slots.tooltip.description',
            descriptionFallback: 'Hover-tooltip body. Receives the hovered value. Only rendered when showHoverTooltip=true and orientation="horizontal" and the cursor sits over the track.'
        }
    ],

    examples: [
        {
            titleKey: 'components.media_scrubber.examples.timeline.title',
            titleFallback: 'Video timeline scrubber',
            lang: 'vue',
            code: `<template>
  <origam-media-scrubber
    v-model="currentTime"
    :max="duration"
    :buffered="buffered"
    :step="0.1"
    orientation="horizontal"
    show-thumb-on-hover-only
    show-hover-tooltip
    :format-hover-tooltip="formatTime"
    aria-label="Seek"
    :aria-value-text="formattedTime"
    @change="onSeek"
  />
</template>`
        },
        {
            titleKey: 'components.media_scrubber.examples.volume.title',
            titleFallback: 'Vertical volume slider',
            lang: 'vue',
            code: `<template>
  <origam-media-scrubber
    v-model="volume"
    :max="1"
    :step="0.01"
    orientation="vertical"
    aria-label="Volume"
    :aria-value-text="Math.round(volume * 100) + '%'"
    color="primary"
    style="height: 80px"
    @update:model-value="onVolume"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-media-scrubber',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamMediaScrubber',
        svgDesc: 'Schematic of the horizontal scrubber with 5 numbered parts: root, track, buffer bar, progress bar, thumb and hover tooltip.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="55" width="640" height="14" rx="7" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.15))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <rect x="30" y="55" width="220" height="14" rx="7" fill="rgba(124,58,237,0.25)"/>
  <rect x="30" y="55" width="148" height="14" rx="7" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="178" cy="62" r="7" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__surface---raised, #fff)" stroke-width="2"/>
  <rect x="130" y="30" width="60" height="20" rx="3" fill="rgba(0,0,0,0.8)"/>
  <text x="160" y="43" font-size="9" fill="#fff" text-anchor="middle" font-family="ui-monospace,monospace">0:48</text>
  <line x1="160" y1="50" x2="160" y2="55" stroke="rgba(0,0,0,0.5)" stroke-width="1"/>
  <circle cx="38" cy="55" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="59" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="350" cy="55" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="350" y="59" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="240" cy="55" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="240" y="59" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="90" cy="55" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="90" y="59" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="178" cy="55" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="178" y="59" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="160" cy="25" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="160" y="29" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <text x="350" y="115" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">① root — ② track — ③ buffer bar — ④ progress bar — ⑤ thumb — ⑥ hover tooltip</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-media-scrubber&gt;</code> — 6 internal parts. Root ①, track ② (full-width bg), optional buffer bar ③, progress bar ④ (fills to modelValue %), draggable thumb ⑤, and the hover tooltip ⑥ (horizontal only, conditional on showHoverTooltip).`,
        legend: [
            {
                num: 1,
                cls: '.origam-media-scrubber',
                descriptionKey: 'components.media_scrubber.anatomy.root',
                descriptionFallback: 'Root div. role="slider" (or undefined when disabled), tabindex="0" (or -1 when disabled), aria-orientation, aria-valuemin/max/now/text, aria-label. Handles all pointer and keyboard events. position: relative; cursor: pointer; touch-action: none; user-select: none.'
            },
            {
                num: 2,
                cls: '.origam-media-scrubber__track',
                descriptionKey: 'components.media_scrubber.anatomy.track',
                descriptionFallback: 'Track bar. Background color from token --origam-media-scrubber---track-bg. Height grows from --track-thickness to --track-thickness-active on hover / focus / scrubbing. aria-hidden="true".'
            },
            {
                num: 3,
                cls: '.origam-media-scrubber__buffer',
                descriptionKey: 'components.media_scrubber.anatomy.buffer',
                descriptionFallback: 'Buffered portion bar. Renders from min to buffered%. Background --origam-media-scrubber---buffer-bg. Visible only when buffered prop is a finite number. aria-hidden="true".'
            },
            {
                num: 4,
                cls: '.origam-media-scrubber__progress',
                descriptionKey: 'components.media_scrubber.anatomy.progress',
                descriptionFallback: 'Playback progress bar. Width/height = valuePct%. Background --origam-media-scrubber---primary. aria-hidden="true".'
            },
            {
                num: 5,
                cls: '.origam-media-scrubber__thumb',
                descriptionKey: 'components.media_scrubber.anatomy.thumb',
                descriptionFallback: 'Circular drag handle. Position driven by valuePct% (left in horizontal, bottom in vertical). Hidden at rest when showThumbOnHoverOnly=true; revealed on :hover, :focus-visible and .origam-media-scrubber--scrubbing. aria-hidden="true".'
            },
            {
                num: 6,
                cls: '.origam-media-scrubber__hover-tooltip',
                descriptionKey: 'components.media_scrubber.anatomy.tooltip',
                descriptionFallback: 'Hover tooltip. position: absolute; bottom: calc(100% + 8px); left = hoverPct%. Contains the #tooltip slot or the formatted value string. Horizontal orientation only. aria-hidden="true".'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div
  class="origam-media-scrubber origam-media-scrubber--horizontal"
  role="slider"
  tabindex="0"
  aria-orientation="horizontal"
  aria-valuemin="0"
  aria-valuemax="120"
  aria-valuenow="48"
  aria-valuetext="0:48"
  aria-label="Seek"
>
  <div class="origam-media-scrubber__track" aria-hidden="true">
    <div class="origam-media-scrubber__buffer" aria-hidden="true" />
    <div class="origam-media-scrubber__progress" aria-hidden="true" />
    <div class="origam-media-scrubber__thumb" aria-hidden="true" />
  </div>

  <div class="origam-media-scrubber__hover-tooltip" aria-hidden="true">
    <slot name="tooltip" :value="48">0:48</slot>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-media-scrubber',
                descriptionKey: 'components.media_scrubber.anatomy.root',
                descriptionFallback: 'Root slider element with ARIA role and pointer/keyboard event handlers.'
            },
            {
                cls: 'origam-media-scrubber--horizontal',
                descriptionKey: 'components.media_scrubber.anatomy.horizontal',
                descriptionFallback: 'Applied when orientation="horizontal". width: 100%; height: 14px.'
            },
            {
                cls: 'origam-media-scrubber--vertical',
                descriptionKey: 'components.media_scrubber.anatomy.vertical',
                descriptionFallback: 'Applied when orientation="vertical". height: 100%; width: 14px; flex-direction: column.'
            },
            {
                cls: 'origam-media-scrubber--disabled',
                descriptionKey: 'components.media_scrubber.anatomy.disabled',
                descriptionFallback: 'Applied when disabled=true. cursor: not-allowed; opacity: 0.5.'
            },
            {
                cls: 'origam-media-scrubber--scrubbing',
                descriptionKey: 'components.media_scrubber.anatomy.scrubbing',
                descriptionFallback: 'Applied while a pointer drag is in progress. Prevents pointerleave from clearing the tooltip.'
            },
            {
                cls: 'origam-media-scrubber--thumb-on-hover',
                descriptionKey: 'components.media_scrubber.anatomy.thumb_on_hover',
                descriptionFallback: 'Applied when showThumbOnHoverOnly=true. Scales the thumb to 0 at rest.'
            },
            {
                cls: 'origam-media-scrubber__track',
                descriptionKey: 'components.media_scrubber.anatomy.track',
                descriptionFallback: 'Track bar — background + growing height on hover.'
            },
            {
                cls: 'origam-media-scrubber__buffer',
                descriptionKey: 'components.media_scrubber.anatomy.buffer',
                descriptionFallback: 'Buffered portion indicator bar.'
            },
            {
                cls: 'origam-media-scrubber__progress',
                descriptionKey: 'components.media_scrubber.anatomy.progress',
                descriptionFallback: 'Playback progress fill.'
            },
            {
                cls: 'origam-media-scrubber__thumb',
                descriptionKey: 'components.media_scrubber.anatomy.thumb',
                descriptionFallback: 'Circular drag handle (position: absolute).'
            },
            {
                cls: 'origam-media-scrubber__hover-tooltip',
                descriptionKey: 'components.media_scrubber.anatomy.tooltip',
                descriptionFallback: 'Floating hover value tooltip (horizontal only).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-media-scrubber---color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.media_scrubber.css_vars.color',
            descriptionFallback: 'Primary accent color. Drives --origam-media-scrubber---primary (progress bar + thumb fill).'
        },
        {
            name: '--origam-media-scrubber---track-background-color',
            defaultValue: 'rgba(255,255,255,0.3)',
            descriptionKey: 'components.media_scrubber.css_vars.track_background_color',
            descriptionFallback: 'Idle track fill. Semi-transparent by design (overlaid on the media surface).'
        },
        {
            name: '--origam-media-scrubber---buffer-background-color',
            defaultValue: 'rgba(255,255,255,0.4)',
            descriptionKey: 'components.media_scrubber.css_vars.buffer_background_color',
            descriptionFallback: 'Buffer bar fill. Slightly more opaque than the track.'
        },
        {
            name: '--origam-media-scrubber---thumb-diameter',
            defaultValue: '13px',
            descriptionKey: 'components.media_scrubber.css_vars.thumb_diameter',
            descriptionFallback: 'Diameter of the circular thumb handle.'
        },
        {
            name: '--origam-media-scrubber---track-size',
            defaultValue: '3px',
            descriptionKey: 'components.media_scrubber.css_vars.track_size',
            descriptionFallback: 'Track thickness at rest.'
        },
        {
            name: '--origam-media-scrubber---track-size-active',
            defaultValue: '5px',
            descriptionKey: 'components.media_scrubber.css_vars.track_size_active',
            descriptionFallback: 'Track thickness on hover / focus / scrubbing. Animates over 140ms.'
        },
        {
            name: '--origam-media-scrubber__tooltip---background-color',
            defaultValue: 'rgba(0,0,0,0.85)',
            descriptionKey: 'components.media_scrubber.css_vars.tooltip_background_color',
            descriptionFallback: 'Hover tooltip background. Near-black for contrast.'
        },
        {
            name: '--origam-media-scrubber__tooltip---color',
            defaultValue: '#ffffff',
            descriptionKey: 'components.media_scrubber.css_vars.tooltip_color',
            descriptionFallback: 'Hover tooltip text color.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'rootEl',
            type: 'Ref<HTMLElement | null>',
            descriptionKey: 'components.media_scrubber.exposed.root_el',
            descriptionFallback: 'Template ref to the root DOM element. Useful for measuring the track dimensions or programming pointer capture externally.'
        },
        {
            name: 'isScrubbing',
            type: 'Ref<boolean>',
            descriptionKey: 'components.media_scrubber.exposed.is_scrubbing',
            descriptionFallback: 'True while a pointer drag is captured. The parent can use this to suppress autohide logic on the controller overlay during a drag.'
        },
        {
            name: 'hoverValue',
            type: 'Ref<number | null>',
            descriptionKey: 'components.media_scrubber.exposed.hover_value',
            descriptionFallback: 'The hovered track value while the cursor is over the scrubber. null when the cursor has left. Mirrors the hover emit.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['slider'],
        keyboard: [
            {
                key: 'ArrowRight / ArrowUp',
                actionKey: 'components.media_scrubber.a11y.key_increment',
                actionFallback: 'Increases the value by step (or 5% of range when step=0). ArrowRight for horizontal; ArrowUp for vertical.'
            },
            {
                key: 'ArrowLeft / ArrowDown',
                actionKey: 'components.media_scrubber.a11y.key_decrement',
                actionFallback: 'Decreases the value by step (or 5% of range when step=0). ArrowLeft for horizontal; ArrowDown for vertical.'
            },
            {
                key: 'PageUp',
                actionKey: 'components.media_scrubber.a11y.key_page_up',
                actionFallback: 'Increases the value by 10% of the range (same regardless of step).'
            },
            {
                key: 'PageDown',
                actionKey: 'components.media_scrubber.a11y.key_page_down',
                actionFallback: 'Decreases the value by 10% of the range.'
            },
            {
                key: 'Home',
                actionKey: 'components.media_scrubber.a11y.key_home',
                actionFallback: 'Sets the value to min.'
            },
            {
                key: 'End',
                actionKey: 'components.media_scrubber.a11y.key_end',
                actionFallback: 'Sets the value to max.'
            }
        ],
        notes: [
            {
                noteKey: 'components.media_scrubber.a11y.role_slider',
                noteFallback: 'role="slider" is set only when not disabled. When disabled, the role attribute is omitted (undefined) and tabindex becomes -1 so AT users are not invited to interact with a frozen widget.'
            },
            {
                noteKey: 'components.media_scrubber.a11y.aria_label_required',
                noteFallback: 'ariaLabel is a required prop. Always pass a translated string (e.g. "Seek" for the timeline, "Volume" for the volume slider). The label must describe the purpose of the slider, not its current value.'
            },
            {
                noteKey: 'components.media_scrubber.a11y.aria_value_text',
                noteFallback: 'Use ariaValueText for a human-readable representation of the value — e.g. "1:23" for a timestamp so screen readers announce "1 minute 23 seconds" rather than the raw float "83.4".'
            },
            {
                noteKey: 'components.media_scrubber.a11y.reduced_motion',
                noteFallback: 'Under prefers-reduced-motion: reduce, both track and thumb CSS transitions are disabled (transition: none).'
            },
            {
                noteKey: 'components.media_scrubber.a11y.pointer_capture',
                noteFallback: 'The component uses setPointerCapture() on pointerdown so drag events continue even when the pointer leaves the element boundary. This is the standard drag pattern for range inputs on touch devices.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/media-scrubber.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'media-scrubber.color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.media_scrubber.tokens.color',
                descriptionFallback: 'Primary color (progress bar + thumb fill).'
            },
            {
                tokenPath: 'media-scrubber.track.thickness',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.media_scrubber.tokens.track_thickness',
                descriptionFallback: 'Track height at rest (horizontal) / width (vertical).'
            },
            {
                tokenPath: 'media-scrubber.track.thickness-active',
                value: '6px',
                type: 'dimension',
                descriptionKey: 'components.media_scrubber.tokens.track_thickness_active',
                descriptionFallback: 'Track height on hover / focus / scrubbing.'
            },
            {
                tokenPath: 'media-scrubber.thumb.diameter',
                value: '12px',
                type: 'dimension',
                descriptionKey: 'components.media_scrubber.tokens.thumb_diameter',
                descriptionFallback: 'Circular thumb diameter.'
            },
            {
                tokenPath: 'media-scrubber.tooltip.background-color',
                value: '{color.neutral.900}',
                type: 'color',
                descriptionKey: 'components.media_scrubber.tokens.tooltip_background_color',
                descriptionFallback: 'Hover tooltip background (near-black for contrast).'
            },
            {
                tokenPath: 'media-scrubber.tooltip.color',
                value: '{color.neutral.0}',
                type: 'color',
                descriptionKey: 'components.media_scrubber.tokens.tooltip_color',
                descriptionFallback: 'Hover tooltip text color (white).'
            }
        ]
    } satisfies IComponentTokens
}
