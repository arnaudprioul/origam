/**
 * /components/picker — full documentation data for OrigamPicker.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Picker/picker.interface.ts        (props)
 *   - packages/ds/src/interfaces/Picker/picker-title.interface.ts  (title props)
 *   - packages/ds/src/components/Picker/OrigamPicker.vue           (template BEM)
 *   - packages/ds/src/components/Picker/OrigamPickerTitle.vue      (title BEM)
 *   - packages/ds/tokens/component/picker.json                     (CSS tokens)
 *
 * OrigamPicker is the base abstraction shared by DatePicker and ColorPicker.
 * It provides the card chrome: title, header, body and actions zones.
 * Concrete pickers compose it with their own content slots.
 *
 * previewVariants: empty — Picker renders no content alone;
 * DatePicker and ColorPicker provide their own previews.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const PICKER_DOC: IComponentDoc = {
    slug: 'picker',
    name: 'Picker',
    tag: 'origam-picker',
    icon: 'mdi-calendar-blank-outline',
    category: 'Overlay',
    descriptionKey: 'components.catalog.picker.description',
    descriptionFallback: 'Base picker chrome shared by DatePicker and ColorPicker. Provides a card panel with title, optional header, body slot, and actions footer. Supports landscape orientation and full token customisation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datepicker--design',
    docUrl: 'http://localhost:4000/components/Picker/OrigamPicker',

    family: [
        {
            slug: 'picker-title',
            name: 'PickerTitle',
            descriptionKey: 'components.catalog.picker_title.description',
            descriptionFallback: 'Title strip rendered at the top of the picker panel. Supports color and bgColor theming.'
        }
    ],

    related: [
        {
            slug: 'date-picker',
            name: 'DatePicker',
            kind: 'component',
            descriptionKey: 'components.catalog.date_picker.description',
            descriptionFallback: 'Date picker built on top of OrigamPicker.'
        },
        {
            slug: 'color-picker',
            name: 'ColorPicker',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker.description',
            descriptionFallback: 'Color picker built on top of OrigamPicker.'
        }
    ],

    props: [
        // ── Own OrigamPicker props ─────────────────────────────────────────
        {
            name: 'landscape',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.picker.props.landscape.description',
            descriptionFallback: 'Switches the picker to a horizontal 2-column layout: title on the left, body on the right.'
        },
        {
            name: 'hideHeader',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.picker.props.hide_header.description',
            descriptionFallback: 'Hides the header slot even when it has content.'
        },
        // ── IPickerTitleProps ─────────────────────────────────────────────
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker.props.title.description',
            descriptionFallback: 'Title text rendered inside the PickerTitle strip.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker.props.color.description',
            descriptionFallback: 'Text color applied to the title strip.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker.props.bg_color.description',
            descriptionFallback: 'Background color of the title strip.'
        },
        // ── ISheetProps (selected subset: border, rounded, elevation) ─────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.picker.props.border.description',
            descriptionFallback: 'Applies a border to the picker panel.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker.props.rounded.description',
            descriptionFallback: 'Border-radius of the picker panel. Default from token: {radius.md}.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation. Default from token: {shadow.lg}.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.picker.props.width.description',
            descriptionFallback: 'Width of the picker panel. Min-width defaults to 320px from token.'
        },
        // ── ITagProps ────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.picker.props.tag.description',
            descriptionFallback: 'HTML tag rendered at the root of the PickerTitle.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.picker.slots.title.description',
            descriptionFallback: 'Content rendered inside the PickerTitle strip. Overrides the title prop.'
        },
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.picker.slots.header.description',
            descriptionFallback: 'Optional zone between the title and the body. DatePicker uses it for navigation arrows.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.picker.slots.default.description',
            descriptionFallback: 'Main body content of the picker. DatePicker injects the calendar grid here; ColorPicker injects the color wheel.'
        },
        {
            slot: 'actions',
            slotProps: '—',
            descriptionKey: 'components.picker.slots.actions.description',
            descriptionFallback: 'Footer actions zone (Cancel / OK buttons). Only rendered when the slot has content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.picker.examples.basic.title',
            titleFallback: 'Custom picker shell',
            lang: 'vue',
            code: `<template>
  <origam-picker title="Choose a value" color="white" bg-color="primary">
    <template #default>
      <div style="padding: 1rem;">
        My custom picker body
      </div>
    </template>

    <template #actions>
      <origam-btn variant="text" @click="cancel">Cancel</origam-btn>
      <origam-btn color="primary" @click="confirm">OK</origam-btn>
    </template>
  </origam-picker>
</template>`
        },
        {
            titleKey: 'components.picker.examples.landscape.title',
            titleFallback: 'Landscape orientation',
            lang: 'vue',
            code: `<template>
  <origam-picker landscape title="Select date" color="white" bg-color="primary">
    <template #default>
      <!-- DatePicker or custom body -->
    </template>
  </origam-picker>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-picker',
        svgViewBox: '0 0 700 320',
        svgTitle: 'Anatomy of OrigamPicker',
        svgDesc: 'Schematic of the Picker component with 5 numbered zones.',
        svg: `
  <rect x="0" y="0" width="700" height="320" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="100" y="20" width="500" height="280" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1.5" filter="drop-shadow(0 4px 16px rgba(124,58,237,0.10))"/>
  <rect x="100" y="20" width="500" height="60" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="56" font-size="14" fill="#fff" text-anchor="middle" font-weight="600" font-family="'JetBrains Mono',monospace">origam-picker__title — "Choose date"</text>
  <rect x="100" y="80" width="500" height="40" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="350" y="105" font-size="10" fill="var(--origam-color__text---secondary, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-picker__header slot</text>
  <rect x="100" y="120" width="500" height="140" rx="0" fill="var(--origam-color__surface---raised, #fff)"/>
  <text x="350" y="195" font-size="10" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-picker__body (#default slot)</text>
  <rect x="100" y="260" width="500" height="40" rx="0" fill="var(--origam-color__surface---subtle, #faf5ff)"/>
  <text x="350" y="285" font-size="10" fill="var(--origam-color__text---tertiary, #9ca3af)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-picker__actions slot</text>
  <circle cx="96" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="96" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="96" cy="84" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="96" y="88" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="96" cy="124" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="96" y="128" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="96" cy="264" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="96" y="268" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="604" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="604" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-picker&gt;</code> — 5 zones: title strip (PickerTitle), optional header slot, body (#default slot), actions footer, and the root sheet container.',
        legend: [
            {
                num: 1,
                cls: '.origam-picker__title',
                descriptionKey: 'components.picker.anatomy.title',
                descriptionFallback: 'OrigamPickerTitle strip at the top. Hosts the #title slot or the title prop text. Themed via color and bgColor.'
            },
            {
                num: 2,
                cls: '.origam-picker__header',
                descriptionKey: 'components.picker.anatomy.header',
                descriptionFallback: 'Optional header zone between the title and the body. Only rendered when the #header slot has content.'
            },
            {
                num: 3,
                cls: '.origam-picker__body',
                descriptionKey: 'components.picker.anatomy.body',
                descriptionFallback: 'Main body area. Hosts the #default slot content (calendar grid, color wheel, etc.).'
            },
            {
                num: 4,
                cls: '.origam-picker__actions',
                descriptionKey: 'components.picker.anatomy.actions',
                descriptionFallback: 'Footer zone for action buttons (Cancel / OK). Only rendered when the #actions slot has content.'
            },
            {
                num: 5,
                cls: '.origam-picker',
                descriptionKey: 'components.picker.anatomy.root',
                descriptionFallback: 'Root OrigamSheet panel. Applies border, rounded, elevation, min-width and width from props and tokens.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-sheet class="origam-picker">
  <!-- title strip (always shown unless hideHeader=true) -->
  <div class="origam-picker__title">
    <slot name="title">
      <origam-picker-title :title="title" :color="color" :bg-color="bgColor" />
    </slot>
  </div>

  <!-- optional header (navigation arrows, tabs…) -->
  <div v-if="slots.header" class="origam-picker__header">
    <slot name="header"/>
  </div>

  <!-- body: date grid / color wheel / custom content -->
  <div class="origam-picker__body">
    <slot name="default"/>
  </div>

  <!-- optional actions footer -->
  <div v-if="slots.actions" class="origam-picker__actions">
    <slot name="actions"/>
  </div>
</origam-sheet>`,
        classes: [
            {
                cls: 'origam-picker',
                descriptionKey: 'components.picker.anatomy.root',
                descriptionFallback: 'Root sheet container. Applies min-width, border-radius, box-shadow from tokens.'
            },
            {
                cls: 'origam-picker__title',
                descriptionKey: 'components.picker.anatomy.title',
                descriptionFallback: 'Title zone wrapper rendered at the top of the panel.'
            },
            {
                cls: 'origam-picker__header',
                descriptionKey: 'components.picker.anatomy.header',
                descriptionFallback: 'Optional header slot between title and body.'
            },
            {
                cls: 'origam-picker__body',
                descriptionKey: 'components.picker.anatomy.body',
                descriptionFallback: 'Main body slot container.'
            },
            {
                cls: 'origam-picker__actions',
                descriptionKey: 'components.picker.anatomy.actions',
                descriptionFallback: 'Optional footer actions zone.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-picker---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.picker.css_vars.background_color',
            descriptionFallback: 'Picker panel background color.'
        },
        {
            name: '--origam-picker---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.picker.css_vars.color',
            descriptionFallback: 'Picker panel text color.'
        },
        {
            name: '--origam-picker---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.picker.css_vars.border_radius',
            descriptionFallback: 'Border-radius of the panel.'
        },
        {
            name: '--origam-picker---box-shadow',
            defaultValue: '{shadow.lg}',
            descriptionKey: 'components.picker.css_vars.box_shadow',
            descriptionFallback: 'Drop shadow of the panel.'
        },
        {
            name: '--origam-picker---min-width',
            defaultValue: '320px',
            descriptionKey: 'components.picker.css_vars.min_width',
            descriptionFallback: 'Minimum width to prevent the panel from collapsing.'
        },
        {
            name: '--origam-picker---padding-block',
            defaultValue: '{space.4}',
            descriptionKey: 'components.picker.css_vars.padding_block',
            descriptionFallback: 'Top and bottom padding inside the panel.'
        },
        {
            name: '--origam-picker---padding-inline',
            defaultValue: '{space.4}',
            descriptionKey: 'components.picker.css_vars.padding_inline',
            descriptionFallback: 'Left and right padding inside the panel.'
        },
        {
            name: '--origam-picker__title---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.picker.css_vars.title_color',
            descriptionFallback: 'Title strip text color.'
        },
        {
            name: '--origam-picker__title---font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.picker.css_vars.title_font_size',
            descriptionFallback: 'Title strip font size.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['dialog'],
        keyboard: [
            {
                key: 'Escape',
                actionKey: 'components.picker.a11y.key_close',
                actionFallback: 'Closes the picker when used inside an overlay (DatePickerField, ColorPickerField).'
            },
            {
                key: 'Tab',
                actionKey: 'components.picker.a11y.key_tab',
                actionFallback: 'Moves focus through the picker controls in order.'
            }
        ],
        notes: [
            {
                noteKey: 'components.picker.a11y.role_note',
                noteFallback: 'When used standalone, OrigamPicker has no implicit ARIA role. When opened inside a Dialog or Overlay, it inherits role="dialog" from the container.'
            },
            {
                noteKey: 'components.picker.a11y.title_note',
                noteFallback: 'The title prop / #title slot provides a visible label. The parent overlay should reference it via aria-labelledby for screen reader context.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/picker.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Base abstraction — concrete pickers (DatePicker, ColorPicker) extend with their own component tokens.',
        excerpt: [
            {
                tokenPath: 'picker.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.picker.tokens.background_color',
                descriptionFallback: 'Panel background.'
            },
            {
                tokenPath: 'picker.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.picker.tokens.border_radius',
                descriptionFallback: 'Panel border-radius.'
            },
            {
                tokenPath: 'picker.box-shadow',
                value: '{shadow.lg}',
                type: 'shadow',
                descriptionKey: 'components.picker.tokens.box_shadow',
                descriptionFallback: 'Panel drop shadow.'
            },
            {
                tokenPath: 'picker.min-width',
                value: '320px',
                type: 'dimension',
                descriptionKey: 'components.picker.tokens.min_width',
                descriptionFallback: 'Minimum panel width.'
            },
            {
                tokenPath: 'picker.title.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.picker.tokens.title_color',
                descriptionFallback: 'Title strip text color.'
            },
            {
                tokenPath: 'picker.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.picker.tokens.transition_duration',
                descriptionFallback: 'Transition duration for the picker panel enter/leave.'
            }
        ]
    } satisfies IComponentTokens
}
