/**
 * /components/picker-title — full documentation data for OrigamPickerTitle.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Picker/picker-title.interface.ts  (props)
 *   - packages/ds/src/components/Picker/OrigamPickerTitle.vue      (template BEM, defineExpose, SCSS)
 *
 * Sub-component of Picker. Renders the uppercase title strip at the top of any
 * picker panel (DatePicker, ColorPicker, custom pickers).
 * No token file dedicated to picker-title — styles live in the SCSS block
 * of OrigamPickerTitle.vue and reference --origam-picker-title---* vars.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const PICKER_TITLE_DOC: IComponentDoc = {
    slug: 'picker-title',
    name: 'PickerTitle',
    tag: 'origam-picker-title',
    icon: 'mdi-text-box-outline',
    category: 'Overlay',
    descriptionKey: 'components.catalog.picker_title.description',
    descriptionFallback: 'Title strip rendered at the top of a Picker panel. Displays uppercase text with configurable color and background color theming.',
    packageNote: 'origam',
    parentSlug: 'picker',
    storyUrl: 'http://localhost:6006/?story=components-datepicker--design',
    docUrl: 'http://localhost:4000/components/Picker/OrigamPicker',

    family: [],

    related: [
        {
            slug: 'picker',
            name: 'Picker',
            kind: 'component',
            descriptionKey: 'components.catalog.picker.description',
            descriptionFallback: 'Base picker chrome that hosts the PickerTitle in its title slot.'
        },
        {
            slug: 'date-picker',
            name: 'DatePicker',
            kind: 'component',
            descriptionKey: 'components.catalog.date_picker.description',
            descriptionFallback: 'Concrete date picker built on top of OrigamPicker with a PickerTitle.'
        },
        {
            slug: 'color-picker',
            name: 'ColorPicker',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker.description',
            descriptionFallback: 'Concrete color picker built on top of OrigamPicker with a PickerTitle.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────────
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker_title.props.title.description',
            descriptionFallback: 'Title text displayed in the strip. Also configurable via the default slot.'
        },
        // ── ITagProps ──────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.picker_title.props.tag.description',
            descriptionFallback: 'Root HTML element tag.'
        },
        // ── IColorProps ────────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker_title.props.color.description',
            descriptionFallback: 'Text color applied to the title strip. Accepts semantic intents (primary, success…) or any CSS color.'
        },
        // ── IBgColorProps ──────────────────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker_title.props.bg_color.description',
            descriptionFallback: 'Background color of the title strip. Independent of the text color.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.picker_title.slots.default.description',
            descriptionFallback: 'Custom title content. Replaces the title prop text when provided.'
        }
    ],

    examples: [
        {
            titleKey: 'components.picker_title.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-picker-title title="Select a date" />
</template>`
        },
        {
            titleKey: 'components.picker_title.examples.colored.title',
            titleFallback: 'Colored title strip',
            lang: 'vue',
            code: `<template>
  <origam-picker-title
    title="Pick a color"
    color="white"
    bg-color="primary"
  />
</template>`
        },
        {
            titleKey: 'components.picker_title.examples.slot.title',
            titleFallback: 'Custom slot content',
            lang: 'vue',
            code: `<template>
  <origam-picker-title bg-color="surface">
    <origam-icon icon="mdi-calendar" />
    Select date
  </origam-picker-title>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { title: 'Select a date' } },
        { label: 'primary bg', props: { title: 'Pick color', bgColor: 'primary', color: 'white' } },
        { label: 'success bg', props: { title: 'Confirmed', bgColor: 'success', color: 'white' } }
    ],

    anatomy: {
        rootClass: 'origam-picker-title',
        svgViewBox: '0 0 500 140',
        svgTitle: 'Anatomy of OrigamPickerTitle',
        svgDesc: 'Schematic of the PickerTitle component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="500" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="40" width="440" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="30" y="40" width="440" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="none"/>
  <text x="250" y="76" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace" letter-spacing="0.1em" font-weight="600">SELECT A DATE</text>
  <circle cx="38" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="60" cy="62" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="60" y="66" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="68" y1="60" x2="100" y2="45" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="104" y="44" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">slot / title prop</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-picker-title&gt;</code> — 2 parts: ① the root strip element, ② the title text (default slot or title prop).`,
        legend: [
            {
                num: 1,
                cls: '.origam-picker-title',
                descriptionKey: 'components.picker_title.anatomy.root',
                descriptionFallback: 'Root element. Renders as the tag prop value (default: div). Applies uppercase, font-size, padding-inline, padding-block, letter-spacing and font-weight from CSS custom properties.'
            },
            {
                num: 2,
                cls: '#default slot / title prop',
                descriptionKey: 'components.picker_title.anatomy.content',
                descriptionFallback: 'Title text. Renders the title prop when the default slot is empty. Styled via text-transform: uppercase and letter-spacing: 0.1666em.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" class="origam-picker-title" :style="pickerTitleStyles">
  <slot name="default">
    {{ title }}
  </slot>
</component>`,
        classes: [
            {
                cls: 'origam-picker-title',
                descriptionKey: 'components.picker_title.anatomy.root',
                descriptionFallback: 'Root block. text-transform: uppercase; font-size: 0.75rem; padding-inline: 24px 12px; padding-block: 16px; letter-spacing: 0.1666em; font-weight: 400.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-picker-title---text-transform',
            defaultValue: 'uppercase',
            descriptionKey: 'components.picker_title.css_vars.text_transform',
            descriptionFallback: 'CSS text-transform applied to the title strip content.'
        },
        {
            name: '--origam-picker-title---font-size',
            defaultValue: '0.75rem',
            descriptionKey: 'components.picker_title.css_vars.font_size',
            descriptionFallback: 'Font size of the title text.'
        },
        {
            name: '--origam-picker-title---padding-inline',
            defaultValue: '24px 12px',
            descriptionKey: 'components.picker_title.css_vars.padding_inline',
            descriptionFallback: 'Inline (left/right) padding of the title strip.'
        },
        {
            name: '--origam-picker-title---padding-block',
            defaultValue: '16px',
            descriptionKey: 'components.picker_title.css_vars.padding_block',
            descriptionFallback: 'Block (top/bottom) padding of the title strip.'
        },
        {
            name: '--origam-picker-title---font-weight',
            defaultValue: '400',
            descriptionKey: 'components.picker_title.css_vars.font_weight',
            descriptionFallback: 'Font weight of the title text.'
        },
        {
            name: '--origam-picker-title---letter-spacing',
            defaultValue: '0.1666666667em',
            descriptionKey: 'components.picker_title.css_vars.letter_spacing',
            descriptionFallback: 'Letter spacing applied to the uppercase title text.'
        },
        {
            name: '--origam-picker-title---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.picker_title.css_vars.color',
            descriptionFallback: 'Text color. Falls back to --origam-picker--title---color then inherit. Overridden by the color prop via useBothColor.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.picker_title.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.picker_title.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed pickerTitleStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.picker_title.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.picker_title.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.picker_title.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.picker_title.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.picker_title.a11y.semantic',
                noteFallback: 'PickerTitle renders as a generic div by default. For improved semantics, pass tag="h2" (or the appropriate heading level) so screen readers announce it as a section heading inside the picker dialog.'
            },
            {
                noteKey: 'components.picker_title.a11y.no_interactive',
                noteFallback: 'This component is purely presentational — it has no interactive elements and no ARIA role by default.'
            }
        ]
    } satisfies IComponentA11y
}
