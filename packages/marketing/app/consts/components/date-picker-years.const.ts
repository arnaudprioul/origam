/**
 * /components/date-picker-years — full documentation data for OrigamDatePickerYears.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePicker/date-picker-years.interface.ts  (props + emits)
 *   - packages/ds/src/components/DatePicker/OrigamDatePickerYears.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/date-picker.json                         (CSS tokens — shared with DatePicker)
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

export const DATE_PICKER_YEARS_DOC: IComponentDoc = {
    slug: 'date-picker-years',
    name: 'DatePickerYears',
    tag: 'origam-date-picker-years',
    icon: 'mdi-calendar-range',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker_years.description',
    descriptionFallback: 'Scrollable year list for picking a year. Renders years in a 3-column grid from min to max (defaulting to ±100 years from today). Auto-scrolls to the selected year on mount.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datepicker--design',
    docUrl: 'http://localhost:4000/components/DatePicker/OrigamDatePickerYears',

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
            slug: 'date-picker-months',
            name: 'DatePickerMonths',
            descriptionKey: 'components.catalog.date_picker_months.description',
            descriptionFallback: 'Month-grid view for picking a month within the current year.'
        }
    ],

    props: [
        {
            name: 'year',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.date_picker_years.props.year.description',
            descriptionFallback: 'Currently selected year. The matching tile is highlighted and auto-scrolled into view on mount.'
        },
        {
            name: 'min',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'currentYear - 100',
            descriptionKey: 'components.date_picker_years.props.min.description',
            descriptionFallback: 'Minimum year to include in the list. Derived from the year portion of the min date. Defaults to 100 years before today.'
        },
        {
            name: 'max',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'currentYear + 52',
            descriptionKey: 'components.date_picker_years.props.max.description',
            descriptionFallback: 'Maximum year to include in the list. Derived from the year portion of the max date. Defaults to 52 years after today.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_years.props.color.description',
            descriptionFallback: 'Intent or custom colour applied to the selected year button.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: '288px',
            descriptionKey: 'components.date_picker_years.props.height.description',
            descriptionFallback: 'Height of the years container. Overflow-y: scroll enables the virtual scroll. Defaults to 288px.'
        }
    ],

    emits: [
        {
            event: 'update:year',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_years.emits.update_year.description',
            descriptionFallback: 'Fired when a year tile is clicked. Payload is the four-digit year.'
        }
    ],

    slots: [
        {
            slot: 'year',
            slotProps: '{ year, index, props }',
            descriptionKey: 'components.date_picker_years.slots.year.description',
            descriptionFallback: 'Custom year tile. Slot props expose the year descriptor ({ text, value }), its grid index, and the bound button props (active, color, rounded, text, onClick).'
        }
    ],

    examples: [
        {
            titleKey: 'components.date_picker_years.examples.basic.title',
            titleFallback: 'Standalone year picker',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-years
    v-model:year="selectedYear"
    color="primary"
  />
  <p>Selected year: {{ selectedYear }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const selectedYear = ref(new Date().getFullYear())
</script>`
        },
        {
            titleKey: 'components.date_picker_years.examples.bounded.title',
            titleFallback: 'Bounded year list',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-years
    v-model:year="year"
    min="2000-01-01"
    max="2030-12-31"
    color="secondary"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const year = ref(2026)
</script>`
        }
    ],

    anatomy: {
        rootClass: 'origam-date-picker-years',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamDatePickerYears',
        svgDesc: 'Schematic of the DatePickerYears component showing a scrollable 3-column grid of year buttons.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <!-- root with scroll indicator -->
  <rect x="100" y="20" width="500" height="180" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- scroll indicator bar on right -->
  <rect x="590" y="20" width="6" height="180" rx="3" fill="var(--origam-color__border---subtle, rgba(0,0,0,0.06))"/>
  <rect x="590" y="68" width="6" height="52" rx="3" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <!-- 3-col grid -->
  <text x="162" y="52" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2020</text>
  <text x="310" y="52" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2021</text>
  <text x="458" y="52" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2022</text>
  <text x="162" y="80" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2023</text>
  <text x="310" y="80" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2024</text>
  <text x="458" y="80" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2025</text>
  <!-- selected year -->
  <rect x="218" y="92" width="184" height="28" rx="14" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="310" y="110" font-size="10" fill="#fff" text-anchor="middle" font-family="system-ui" font-weight="700">2026</text>
  <text x="162" y="110" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2026</text>
  <text x="458" y="110" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2027</text>
  <text x="162" y="140" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2028</text>
  <text x="310" y="140" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2029</text>
  <text x="458" y="140" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">2030</text>
  <text x="350" y="178" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">… scrollable</text>
  <!-- markers -->
  <circle cx="108" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="120" cy="44" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="120" y="48.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="220" cy="100" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="220" y="104.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker-years&gt;</code> — 3 parts: ① root scroll container (288px height, overflow-y: scroll), ② 3-column grid content wrapper, ③ the active year button. On mount, the selected year scrolls into view via <code>scrollIntoView({block: 'center'})</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-date-picker-years',
                descriptionKey: 'components.date_picker_years.anatomy.root',
                descriptionFallback: 'Root container. Height 288px (default), overflow-y: scroll. Enables native browser scrolling to the selected year.'
            },
            {
                num: 2,
                cls: '.origam-date-picker-years__content',
                descriptionKey: 'components.date_picker_years.anatomy.content',
                descriptionFallback: '3-column CSS grid with justify-content: space-around. gap: 8px 24px. padding-inline: 32px. Inner OrigamBtn have padding-inline: 8px.'
            },
            {
                num: 3,
                cls: 'OrigamBtn (active)',
                descriptionKey: 'components.date_picker_years.anatomy.active_btn',
                descriptionFallback: 'The selected year button. Receives active=true and color=props.color. All buttons have rounded=true. The active button is also assigned a template ref so scrollIntoView can target it on mount.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-date-picker-years">
  <div class="origam-date-picker-years__content">
    <!-- slot: #year — repeated for each year in the [min..max] range -->
    <origam-btn
      v-for="year in years"
      :ref="model === year.value ? yearRef : undefined"
      :active="model === year.value"
      :color="model === year.value ? color : undefined"
      :rounded="true"
      :text="year.text"
      @click="handleClick(year.value)"
    />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-date-picker-years',
                descriptionKey: 'components.date_picker_years.anatomy.root',
                descriptionFallback: 'Root scroll container. Default height 288px.'
            },
            {
                cls: 'origam-date-picker-years__content',
                descriptionKey: 'components.date_picker_years.anatomy.content',
                descriptionFallback: '3-column grid of year buttons.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker-years---height',
            defaultValue: '288px',
            descriptionKey: 'components.date_picker_years.css_vars.height',
            descriptionFallback: 'Container height. Overflow-y: scroll. Overridden via the height prop (IDimensionProps).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.date_picker_years.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.date_picker_years.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.date_picker_years.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.date_picker_years.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.date_picker_years.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker_years.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.date_picker_years.a11y.key_select',
                actionFallback: 'Selects the focused year.'
            },
            {
                key: 'Tab',
                actionKey: 'components.date_picker_years.a11y.key_tab',
                actionFallback: 'Moves focus between year tiles.'
            }
        ],
        notes: [
            {
                noteKey: 'components.date_picker_years.a11y.scroll_note',
                noteFallback: 'On mount, the selected year is automatically scrolled into the centre of the visible area via scrollIntoView({block: "center"}), so users do not need to scroll manually to find the current year.'
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
                descriptionKey: 'components.date_picker_years.tokens.background_color',
                descriptionFallback: 'Container background colour.'
            },
            {
                tokenPath: 'date-picker.day.background-color-selected',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.date_picker_years.tokens.selected_bg',
                descriptionFallback: 'Active year button background (driven by the color prop).'
            }
        ]
    } satisfies IComponentTokens
}
