/**
 * /components/slider-field-track — full documentation data for OrigamSliderFieldTrack.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/SliderField/slider-field-track.interface.ts  (props)
 *   - packages/ds/src/components/SliderField/OrigamSliderFieldTrack.vue        (template BEM, defineExpose)
 *   - packages/ds/tokens/component/slider-field.json                           (CSS tokens — track section)
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

export const SLIDER_FIELD_TRACK_DOC: IComponentDoc = {
    slug: 'slider-field-track',
    name: 'SliderFieldTrack',
    tag: 'origam-slider-field-track',
    icon: 'mdi-ray-start-end',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.slider_field_track.description',
    descriptionFallback: 'Internal track sub-component of SliderField. Renders the background rail, the fill bar and optional tick marks. Not intended for standalone use.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-slider-field--design',
    docUrl: 'http://localhost:4000/components/SliderField/OrigamSliderField',

    parentSlug: 'slider-field',

    family: [
        {
            slug: 'slider-field',
            name: 'SliderField',
            descriptionKey: 'components.catalog.slider_field.description',
            descriptionFallback: 'Range slider input with field chrome, ticks and label support.'
        }
    ],

    props: [
        {
            name: 'start',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.slider_field_track.props.start.description',
            descriptionFallback: 'Fill bar start position as a percentage (0–100). Provided by the parent SliderField.'
        },
        {
            name: 'stop',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.slider_field_track.props.stop.description',
            descriptionFallback: 'Fill bar end position as a percentage (0–100). Provided by the parent SliderField.'
        },
        {
            name: 'size',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '4',
            descriptionKey: 'components.slider_field_track.props.size.description',
            descriptionFallback: 'Track thickness in pixels. Sets --origam-slider-field-track---size.'
        },
        {
            name: 'min',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.slider_field_track.props.min.description',
            descriptionFallback: 'Minimum boundary — used to suppress the first/last tick marks.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '100',
            descriptionKey: 'components.slider_field_track.props.max.description',
            descriptionFallback: 'Maximum boundary — used to suppress the first/last tick marks.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field_track.props.color.description',
            descriptionFallback: 'Fill bar color. When error=true, overridden with "danger".'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field_track.props.bg_color.description',
            descriptionFallback: 'Rail (background) color. When error=true, overridden with "danger".'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field_track.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the track root and its background/fill children.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field_track.props.disabled.description',
            descriptionFallback: 'When true, color channels are set to undefined so the track renders in its disabled visual state (driven by the parent).'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field_track.props.error.description',
            descriptionFallback: 'Forces both color channels to "danger". Driven by the parent slider error flag.'
        },
        {
            name: 'isVertical',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field_track.props.is_vertical.description',
            descriptionFallback: 'When true, switches logical CSS axis from inline to block (vertical orientation).'
        },
        {
            name: 'indexFromEnd',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field_track.props.index_from_end.description',
            descriptionFallback: 'Inverts the start direction. Used when reverse=true or isVertical=true.'
        },
        {
            name: 'showTicks',
            type: { label: 'TAlways', slug: 'always', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.slider_field_track.props.show_ticks.description',
            descriptionFallback: 'Controls tick visibility. false = hidden, true = visible on hover/focus, "always" = always visible.'
        },
        {
            name: 'tickSize',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '2',
            descriptionKey: 'components.slider_field_track.props.tick_size.description',
            descriptionFallback: 'Tick dot size in pixels. Sets --origam-slider-field-track__tick---size.'
        },
        {
            name: 'ticks',
            type: { label: 'Array<TTick>', slug: 'tick', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slider_field_track.props.ticks.description',
            descriptionFallback: 'Pre-computed tick descriptor array. Parent SliderField owns the math and passes the result down.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'item',
            slotProps: '{ tick, index }',
            descriptionKey: 'components.slider_field_track.slots.item.description',
            descriptionFallback: 'Custom label for every tick mark. Receives the TTick descriptor and its index.'
        },
        {
            slot: 'item.{index}',
            slotProps: '{ tick, index }',
            descriptionKey: 'components.slider_field_track.slots.item_index.description',
            descriptionFallback: 'Per-index tick label slot. Takes precedence over the generic item slot for that specific index.'
        }
    ],

    examples: [
        {
            titleKey: 'components.slider_field_track.examples.note.title',
            titleFallback: 'Usage note',
            lang: 'vue',
            code: `<!-- SliderFieldTrack is an internal component.
     Use origam-slider-field for the public API. -->
<template>
  <origam-slider-field v-model="value" :min="0" :max="100" :step="10" show-ticks="always" />
</template>
<script setup>
const value = ref(50)
</script>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-slider-field-track',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamSliderFieldTrack',
        svgDesc: 'Schematic of the slider track with background, fill and tick layers.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="88" width="620" height="8" rx="4" fill="var(--origam-color__surface---disabled, #d4c7e8)"/>
  <rect x="40" y="88" width="310" height="8" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="80" cy="92" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="175" cy="92" r="4" fill="var(--origam-color__action--primary---fg, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="270" cy="92" r="4" fill="var(--origam-color__action--primary---fg, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="350" cy="92" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="450" cy="92" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="550" cy="92" r="4" fill="var(--origam-color__text---disabled, #b5a0d8)"/>
  <circle cx="40" cy="92" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="40" y="96" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="70" cy="75" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="70" y="79" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="200" cy="75" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="200" y="79" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="450" cy="75" r="10" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="450" y="79" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="40" y="120" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">track root</text>
  <text x="70" y="140" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">background</text>
  <text x="200" y="140" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">fill (start→stop)</text>
  <text x="450" y="140" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">tick marks</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-slider-field-track&gt;</code> — 4 layers: root rail ①, background bar ②, fill bar ③ and tick marks ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-slider-field-track',
                descriptionKey: 'components.slider_field_track.anatomy.root',
                descriptionFallback: 'Root element. Position: relative, border-radius: 9999px, pointer-events: none. Size set via --origam-slider-field-track---size.'
            },
            {
                num: 2,
                cls: '.origam-slider-field-track__background',
                descriptionKey: 'components.slider_field_track.anatomy.background',
                descriptionFallback: 'Rail background bar. Spans 100% in the track axis. Opacity 0.38 when a fill color is active (--opacity modifier). Animated via slider-field__track---transition.'
            },
            {
                num: 3,
                cls: '.origam-slider-field-track__fill',
                descriptionKey: 'components.slider_field_track.anatomy.fill',
                descriptionFallback: 'Fill bar. Positioned from start% to stop% along the track axis using logical CSS properties.'
            },
            {
                num: 4,
                cls: '.origam-slider-field-track__ticks',
                descriptionKey: 'components.slider_field_track.anatomy.ticks',
                descriptionFallback: 'Tick container. Rendered only when showTicks is truthy and parsedTicks is non-empty. Children are .origam-slider-field-track__tick elements.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-slider-field-track">
  <!-- background rail -->
  <div class="origam-slider-field-track__background origam-slider-field-track__background--opacity" />

  <!-- fill bar (start → stop %) -->
  <div class="origam-slider-field-track__fill" />

  <!-- tick marks (optional) -->
  <div class="origam-slider-field-track__ticks origam-slider-field-track__ticks--always-show">
    <div class="origam-slider-field-track__tick origam-slider-field-track__tick--first">
      <!-- tick label via #item or #item.{index} slot -->
      <div class="origam-slider-field-track__tick-label">{{ tick.label }}</div>
    </div>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-slider-field-track',
                descriptionKey: 'components.slider_field_track.anatomy.root',
                descriptionFallback: 'Root track container.'
            },
            {
                cls: 'origam-slider-field-track__background',
                descriptionKey: 'components.slider_field_track.anatomy.background',
                descriptionFallback: 'Rail background. Full width/height of the track.'
            },
            {
                cls: 'origam-slider-field-track__background--opacity',
                descriptionKey: 'components.slider_field_track.anatomy.background_opacity',
                descriptionFallback: 'Applied when a fill color is active. Sets opacity to 0.38 on the background.'
            },
            {
                cls: 'origam-slider-field-track__fill',
                descriptionKey: 'components.slider_field_track.anatomy.fill',
                descriptionFallback: 'Fill bar positioned from start% to stop% along the track.'
            },
            {
                cls: 'origam-slider-field-track__ticks',
                descriptionKey: 'components.slider_field_track.anatomy.ticks',
                descriptionFallback: 'Container for tick mark elements.'
            },
            {
                cls: 'origam-slider-field-track__ticks--always-show',
                descriptionKey: 'components.slider_field_track.anatomy.ticks_always_show',
                descriptionFallback: 'Applied when showTicks="always". Forces tick opacity to 1.'
            },
            {
                cls: 'origam-slider-field-track__tick',
                descriptionKey: 'components.slider_field_track.anatomy.tick',
                descriptionFallback: 'Individual tick dot. Size: tickSize × tickSize, centered on its position.'
            },
            {
                cls: 'origam-slider-field-track__tick--filled',
                descriptionKey: 'components.slider_field_track.anatomy.tick_filled',
                descriptionFallback: 'Applied when tick.position is within [start, stop]. Changes background color.'
            },
            {
                cls: 'origam-slider-field-track__tick--first',
                descriptionKey: 'components.slider_field_track.anatomy.tick_first',
                descriptionFallback: 'Applied to the first tick (value === min). Label transform is reset to none.'
            },
            {
                cls: 'origam-slider-field-track__tick--last',
                descriptionKey: 'components.slider_field_track.anatomy.tick_last',
                descriptionFallback: 'Applied to the last tick (value === max). Label translates −100% to align right.'
            },
            {
                cls: 'origam-slider-field-track__tick-label',
                descriptionKey: 'components.slider_field_track.anatomy.tick_label',
                descriptionFallback: 'Tick label text. position: absolute, white-space: nowrap, user-select: none.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-slider-field-track---size',
            defaultValue: '4px',
            descriptionKey: 'components.slider_field_track.css_vars.size',
            descriptionFallback: 'Track thickness. Set inline from the size prop. Default: 4 px.'
        },
        {
            name: '--origam-slider-field-track__tick---size',
            defaultValue: '2px',
            descriptionKey: 'components.slider_field_track.css_vars.tick_size',
            descriptionFallback: 'Tick dot size. Set inline from the tickSize prop. Default: 2 px.'
        },
        {
            name: '--origam-slider-field__track---transition',
            defaultValue: '0.3s cubic-bezier(0.25, 0.8, 0.5, 1)',
            descriptionKey: 'components.slider_field_track.css_vars.transition',
            descriptionFallback: 'Transition applied to the background and fill bars. Driven by slider-field token slider-field.transition-duration.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.slider_field_track.exposed.filter_props',
            descriptionFallback: 'Forwards a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.slider_field_track.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from computed track styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.slider_field_track.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.slider_field_track.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.slider_field_track.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.slider_field_track.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.slider_field_track.a11y.pointer_events',
                noteFallback: 'pointer-events: none is set on the root so the track never intercepts thumb interactions. All keyboard and pointer handling lives in the parent SliderField.'
            },
            {
                noteKey: 'components.slider_field_track.a11y.forced_colors',
                noteFallback: 'Under forced-colors (Windows High Contrast): the root receives a thin solid buttontext border, and background/fill use the highlight system color.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/slider-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Track tokens are nested under slider-field.track.*.',
        excerpt: [
            {
                tokenPath: 'slider-field.track.height',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.slider_field_track.tokens.height',
                descriptionFallback: 'Default track height / thickness.'
            },
            {
                tokenPath: 'slider-field.track.background-color',
                value: '{color.surface.disabled}',
                type: 'color',
                descriptionKey: 'components.slider_field_track.tokens.background_color',
                descriptionFallback: 'Rail background color.'
            },
            {
                tokenPath: 'slider-field.track.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.slider_field_track.tokens.border_radius',
                descriptionFallback: 'Border radius of the track (pill shape).'
            },
            {
                tokenPath: 'slider-field.track-fill.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.slider_field_track.tokens.fill_color',
                descriptionFallback: 'Fill bar color in the active state.'
            },
            {
                tokenPath: 'slider-field.track-fill.background-color-disabled',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.slider_field_track.tokens.fill_color_disabled',
                descriptionFallback: 'Fill bar color when disabled.'
            },
            {
                tokenPath: 'slider-field.tick.size',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.slider_field_track.tokens.tick_size',
                descriptionFallback: 'Tick dot size token.'
            },
            {
                tokenPath: 'slider-field.tick.background-color',
                value: '{color.text.disabled}',
                type: 'color',
                descriptionKey: 'components.slider_field_track.tokens.tick_color',
                descriptionFallback: 'Tick dot color in the unfilled zone.'
            },
            {
                tokenPath: 'slider-field.tick.background-color-active',
                value: '{color.action.primary.fg}',
                type: 'color',
                descriptionKey: 'components.slider_field_track.tokens.tick_color_active',
                descriptionFallback: 'Tick dot color in the filled zone.'
            }
        ]
    } satisfies IComponentTokens
}
