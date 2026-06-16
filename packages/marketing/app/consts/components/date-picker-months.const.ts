/**
 * /components/date-picker-months — full documentation data for OrigamDatePickerMonths.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePicker/date-picker-months.interface.ts  (props + emits)
 *   - packages/ds/src/components/DatePicker/OrigamDatePickerMonths.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/date-picker.json                          (CSS tokens — shared with DatePicker)
 *
 * FAMILY: DatePicker folder — sub-component of date-picker.
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

export const DATE_PICKER_MONTHS_DOC: IComponentDoc = {
    slug: 'date-picker-months',
    name: 'DatePickerMonths',
    tag: 'origam-date-picker-months',
    icon: 'mdi-calendar-month-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker_months.description',
    descriptionFallback: 'Month-grid view for picking a month within a given year. Renders 12 month buttons in a 2-column grid with min/max constraint support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datepicker--design',
    docUrl: 'http://localhost:4000/components/DatePicker/OrigamDatePickerMonths',

    parentSlug: 'date-picker',

    family: [
        {
            slug: 'date-picker',
            name: 'DatePicker',
            descriptionKey: 'components.catalog.date_picker.description',
            descriptionFallback: 'Calendar popup to select a single date, multiple dates or a range.'
        },
        {
            slug: 'date-picker-controls',
            name: 'DatePickerControls',
            descriptionKey: 'components.catalog.date_picker_controls.description',
            descriptionFallback: 'Navigation bar with prev/next and view-mode toggle buttons.'
        },
        {
            slug: 'date-picker-header',
            name: 'DatePickerHeader',
            descriptionKey: 'components.catalog.date_picker_header.description',
            descriptionFallback: 'Coloured header strip showing the selected date or month.'
        },
        {
            slug: 'date-picker-month',
            name: 'DatePickerMonth',
            descriptionKey: 'components.catalog.date_picker_month.description',
            descriptionFallback: 'Day-grid view for picking a date within the current month.'
        },
        {
            slug: 'date-picker-years',
            name: 'DatePickerYears',
            descriptionKey: 'components.catalog.date_picker_years.description',
            descriptionFallback: 'Scrollable year list for picking a year.'
        }
    ],

    props: [
        {
            name: 'month',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.date_picker_months.props.month.description',
            descriptionFallback: 'Currently selected month (0-based: 0 = January). Used to highlight the active tile.'
        },
        {
            name: 'year',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.date_picker_months.props.year.description',
            descriptionFallback: 'Year for which the 12 months are displayed. Changes which months are enabled/disabled against min/max.'
        },
        {
            name: 'min',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_months.props.min.description',
            descriptionFallback: 'Minimum selectable date. Months whose end falls before this value are disabled.'
        },
        {
            name: 'max',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_months.props.max.description',
            descriptionFallback: 'Maximum selectable date. Months whose start falls after this value are disabled.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_months.props.color.description',
            descriptionFallback: 'Intent or custom colour applied to the active month button.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '288px',
            descriptionKey: 'components.date_picker_months.props.height.description',
            descriptionFallback: 'Height of the months grid container. Defaults to 288px (matches the default DatePicker calendar area height).'
        }
    ],

    emits: [
        {
            event: 'update:month',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_months.emits.update_month.description',
            descriptionFallback: 'Fired when a month tile is clicked. Payload is the 0-based month index.'
        }
    ],

    slots: [
        {
            slot: 'month',
            slotProps: '{ month, index, props }',
            descriptionKey: 'components.date_picker_months.slots.month.description',
            descriptionFallback: 'Custom month tile. Slot props expose the month descriptor, its index (0–11) and the bound button props (active, color, disabled, rounded, text, onClick).'
        }
    ],

    examples: [
        {
            titleKey: 'components.date_picker_months.examples.basic.title',
            titleFallback: 'Standalone month picker',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-months
    v-model:month="selectedMonth"
    :year="currentYear"
    color="primary"
  />
  <p>Month index: {{ selectedMonth }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const selectedMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
</script>`
        },
        {
            titleKey: 'components.date_picker_months.examples.bounded.title',
            titleFallback: 'With min/max constraints',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-months
    v-model:month="month"
    :year="2026"
    min="2026-03-01"
    max="2026-09-30"
    color="success"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const month = ref(4)
</script>`
        }
    ],

    anatomy: {
        rootClass: 'origam-date-picker-months',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamDatePickerMonths',
        svgDesc: 'Schematic of the DatePickerMonths component showing a 2-column grid of 12 month buttons.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <!-- root -->
  <rect x="140" y="20" width="420" height="180" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- 2-col grid: 6 rows of 2 -->
  <rect x="160" y="36" width="174" height="28" rx="14" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="247" y="54" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="system-ui">Jan</text>
  <rect x="362" y="36" width="174" height="28" rx="14" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="449" y="54" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="system-ui">Feb</text>
  <rect x="160" y="74" width="174" height="28" rx="14" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="247" y="92" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="system-ui">Mar</text>
  <rect x="362" y="74" width="174" height="28" rx="14" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="449" y="92" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="system-ui">Apr</text>
  <!-- active month -->
  <rect x="160" y="112" width="174" height="28" rx="14" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="247" y="130" font-size="10" fill="#fff" text-anchor="middle" font-family="system-ui" font-weight="600">May</text>
  <rect x="362" y="112" width="174" height="28" rx="14" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="449" y="130" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="system-ui">Jun</text>
  <text x="350" y="168" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">… (Jul – Dec)</text>
  <!-- markers -->
  <circle cx="148" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="148" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="168" cy="44" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="168" y="48.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="168" cy="120" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="168" y="124.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker-months&gt;</code> — 3 parts: ① root container (288px default height), ② the 2-column grid content wrapper, ③ the active month button highlighted with the <code>color</code> prop.`,
        legend: [
            {
                num: 1,
                cls: '.origam-date-picker-months',
                descriptionKey: 'components.date_picker_months.anatomy.root',
                descriptionFallback: 'Root container. Fixed height (288px by default). Overflow hidden.'
            },
            {
                num: 2,
                cls: '.origam-date-picker-months__content',
                descriptionKey: 'components.date_picker_months.anatomy.content',
                descriptionFallback: '2-column CSS grid with justify-content: space-around. padding-inline: 36px. grid-gap: 0 24px. Inner OrigamBtn elements have text-transform: none.'
            },
            {
                num: 3,
                cls: 'OrigamBtn (active)',
                descriptionKey: 'components.date_picker_months.anatomy.active_btn',
                descriptionFallback: 'The currently selected month button. Receives active=true and color=props.color. All buttons have rounded=true.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-date-picker-months">
  <div class="origam-date-picker-months__content">
    <!-- slot: #month — repeated for each of the 12 months -->
    <origam-btn
      v-for="(month, i) in months"
      :key="i"
      :active="model === i"
      :color="model === i ? color : undefined"
      :disabled="month.isDisabled"
      :rounded="true"
      :text="month.text"
      @click="handleClick(i)"
    />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-date-picker-months',
                descriptionKey: 'components.date_picker_months.anatomy.root',
                descriptionFallback: 'Root container. Default height 288px.'
            },
            {
                cls: 'origam-date-picker-months__content',
                descriptionKey: 'components.date_picker_months.anatomy.content',
                descriptionFallback: '2-column grid of month buttons.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker-months---height',
            defaultValue: '288px',
            descriptionKey: 'components.date_picker_months.css_vars.height',
            descriptionFallback: 'Container height. Overridden via the height prop (IDimensionProps).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.date_picker_months.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.date_picker_months.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.date_picker_months.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.date_picker_months.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.date_picker_months.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker_months.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.date_picker_months.a11y.key_select',
                actionFallback: 'Selects the focused month.'
            },
            {
                key: 'Tab',
                actionKey: 'components.date_picker_months.a11y.key_tab',
                actionFallback: 'Moves focus between month tiles.'
            }
        ],
        notes: [
            {
                noteKey: 'components.date_picker_months.a11y.disabled_note',
                noteFallback: 'Months outside the min/max range receive disabled=true on the inner OrigamBtn and are skipped in keyboard navigation.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/date-picker.json',
        pipelineNote: 'Tokens are shared with the parent DatePicker component. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'date-picker.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.date_picker_months.tokens.background_color',
                descriptionFallback: 'Container background colour.'
            },
            {
                tokenPath: 'date-picker.day.background-color-selected',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.date_picker_months.tokens.selected_bg',
                descriptionFallback: 'Active month button background (driven by the color prop).'
            }
        ]
    } satisfies IComponentTokens
}
