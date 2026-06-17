/**
 * /components/btn-group — full documentation data for OrigamBtnGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Btn/btn-group.interface.ts  (props)
 *   - packages/ds/src/components/Btn/OrigamBtnGroup.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/btn.json                  (CSS tokens — shared with Btn)
 *
 * Sub-component of: OrigamBtn (parentSlug: 'btn')
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const BTN_GROUP_DOC: IComponentDoc = {
    slug: 'btn-group',
    name: 'BtnGroup',
    tag: 'origam-btn-group',
    icon: 'mdi-format-horizontal-align-center',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.btn_group.description',
    descriptionFallback: 'Groups Btn elements into a connected segmented control. Propagates density, color and hover/active state to child buttons via OrigamDefaultsProvider.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-btn--design',
    docUrl: 'http://localhost:4000/components/Btn/OrigamBtn',
    parentSlug: 'btn',

    family: [
        {
            slug: 'btn',
            name: 'Btn',
            descriptionKey: 'components.catalog.btn.description',
            descriptionFallback: 'Polymorphic action element with intent, variant, size and icon support.'
        },
        {
            slug: 'btn-toggle',
            name: 'BtnToggle',
            descriptionKey: 'components.catalog.btn_toggle.description',
            descriptionFallback: 'Single or multi-select toggle group of Btn elements.'
        }
    ],

    related: [
        { slug: 'btn-toggle', name: 'BtnToggle', kind: 'component', descriptionFallback: 'Adds selection state to BtnGroup (single or multi-select).', descriptionKey: 'components.catalog.btn_toggle.description' }
    ],

    props: [
        {
            name: 'divided',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_group.props.divided.description',
            descriptionFallback: 'Shows a thin border between adjacent buttons (border-inline-end on each non-last child).'
        },
        {
            name: 'items',
            type: { label: 'Array<IBtnProps>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.btn_group.props.items.description',
            descriptionFallback: 'Array of props objects to render OrigamBtn instances programmatically. Ignored when the default slot is used.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.btn_group.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Carries role="group" for accessibility.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.btn_group.props.density.description',
            descriptionFallback: 'Density propagated to all child buttons via OrigamDefaultsProvider. Affects group min-height.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_group.props.color.description',
            descriptionFallback: 'Foreground color propagated to all child buttons as a default.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_group.props.bg_color.description',
            descriptionFallback: 'Background color propagated to all child buttons as a default.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_group.props.rounded.description',
            descriptionFallback: 'Border-radius token for the group container. Child buttons are forced border-radius: 0 via :deep so only the group corners are rounded (overflow: hidden clips the rest).'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_group.props.border.description',
            descriptionFallback: 'Applies a border around the entire group container.'
        },
        {
            name: 'borderColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_group.props.border_color.description',
            descriptionFallback: 'Override border color for the group container.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_group.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation for the group container. Child buttons have box-shadow: none forced via :deep.'
        },
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn_group.props.hover.description',
            descriptionFallback: 'Hover state override propagated to child buttons via OrigamDefaultsProvider.'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn_group.props.active.description',
            descriptionFallback: 'Active state override propagated to child buttons via OrigamDefaultsProvider.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.btn_group.slots.default.description',
            descriptionFallback: 'Content area for OrigamBtn (or BtnToggle) children. When provided, the items prop is ignored.'
        },
        {
            slot: 'item',
            slotProps: '{ item, index }',
            descriptionKey: 'components.btn_group.slots.item.description',
            descriptionFallback: 'Override rendering of each item from the items array. Receives the IBtnProps object and its index.'
        }
    ],

    examples: [
        {
            titleKey: 'components.btn_group.examples.basic.title',
            titleFallback: 'Basic group',
            lang: 'vue',
            code: `<template>
  <origam-btn-group border rounded="sm">
    <origam-btn text="Left" />
    <origam-btn text="Center" />
    <origam-btn text="Right" />
  </origam-btn-group>
</template>`
        },
        {
            titleKey: 'components.btn_group.examples.divided.title',
            titleFallback: 'Divided group',
            lang: 'vue',
            code: `<template>
  <origam-btn-group divided color="primary" border>
    <origam-btn prepend-icon="mdi-format-align-left" text="Left" />
    <origam-btn prepend-icon="mdi-format-align-center" text="Center" />
    <origam-btn prepend-icon="mdi-format-align-right" text="Right" />
  </origam-btn-group>
</template>`
        },
        {
            titleKey: 'components.btn_group.examples.items.title',
            titleFallback: 'From items array',
            lang: 'vue',
            code: `<template>
  <origam-btn-group
    :items="[
      { text: 'One', prependIcon: 'mdi-numeric-1' },
      { text: 'Two', prependIcon: 'mdi-numeric-2' },
      { text: 'Three', prependIcon: 'mdi-numeric-3' }
    ]"
    border
    rounded="pill"
  />
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-btn-group',
        svgViewBox: '0 0 700 120',
        svgTitle: 'Anatomy of OrigamBtnGroup',
        svgDesc: 'Schematic of the BtnGroup component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="25" width="620" height="70" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="50" y="35" width="180" height="50" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="140" y="64" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-btn</text>
  <rect x="230" y="35" width="180" height="50" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="320" y="64" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-btn</text>
  <rect x="410" y="35" width="180" height="50" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="500" y="64" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-btn</text>
  <circle cx="48" cy="33" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="37.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="58" cy="37" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="58" y="41.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="240" cy="37" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="240" y="41.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="58" y1="33" x2="110" y2="10" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="114" y="8" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-btn-group</text>
  <line x1="250" y1="35" x2="250" y2="12" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="252" y="10" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">border-inline-end (divided)</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-btn-group&gt;</code> — root container ① (role="group"), OrigamDefaultsProvider ② wrapping child buttons ③. With <code>divided</code>, a <code>border-inline-end</code> separates adjacent buttons.',
        legend: [
            {
                num: 1,
                cls: '.origam-btn-group',
                descriptionKey: 'components.btn_group.anatomy.root',
                descriptionFallback: 'Root element (default: <code>&lt;div&gt;</code>, role="group"). inline-flex, overflow: hidden, vertical-align: middle. Carries border, elevation and rounding classes. Child buttons are forced border-radius: 0 and box-shadow: none via :deep.'
            },
            {
                num: 2,
                cls: '.origam-btn-group--divided',
                descriptionKey: 'components.btn_group.anatomy.divided_modifier',
                descriptionFallback: 'Modifier applied when <code>divided=true</code>. Adds a <code>border-inline-end</code> between non-last child buttons.'
            },
            {
                num: 3,
                cls: '(origam-btn children)',
                descriptionKey: 'components.btn_group.anatomy.children',
                descriptionFallback: 'Child <code>&lt;origam-btn&gt;</code> elements. Receive density, color, bgColor, hover, active defaults from the group via OrigamDefaultsProvider. Individual children can override these defaults.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: <div role="group"> -->
<div class="origam-btn-group">
  <!-- OrigamDefaultsProvider propagates group defaults to children -->
  <origam-defaults-provider :defaults="slotDefaults">
    <slot name="default">
      <!-- items-driven path -->
      <origam-btn v-for="item in items" v-bind="item" />
    </slot>
  </origam-defaults-provider>
</div>`,
        classes: [
            {
                cls: 'origam-btn-group',
                descriptionKey: 'components.btn_group.anatomy.root',
                descriptionFallback: 'Root container. inline-flex, overflow: hidden, max-width: 100%, min-height: calc(height + density).'
            },
            {
                cls: 'origam-btn-group--divided',
                descriptionKey: 'components.btn_group.anatomy.divided_modifier',
                descriptionFallback: 'Shows border-inline-end on all non-last child buttons.'
            },
            {
                cls: 'origam-btn-group--density-default',
                descriptionKey: 'components.btn_group.anatomy.density_default',
                descriptionFallback: 'Density default (0px offset).'
            },
            {
                cls: 'origam-btn-group--density-compact',
                descriptionKey: 'components.btn_group.anatomy.density_compact',
                descriptionFallback: 'Density compact (−8px height offset).'
            },
            {
                cls: 'origam-btn-group--density-comfortable',
                descriptionKey: 'components.btn_group.anatomy.density_comfortable',
                descriptionFallback: 'Density comfortable (+8px height offset).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-btn-group---height',
            defaultValue: '36px',
            descriptionKey: 'components.btn_group.css_vars.height',
            descriptionFallback: 'Reference height used to compute min-height with density offset.'
        },
        {
            name: '--origam-btn-group---density',
            defaultValue: '0px',
            descriptionKey: 'components.btn_group.css_vars.density',
            descriptionFallback: 'Density offset. comfortable: +8px, default: 0px, compact: −8px.'
        },
        {
            name: '--origam-btn-group---border-radius',
            defaultValue: '4px',
            descriptionKey: 'components.btn_group.css_vars.border_radius',
            descriptionFallback: 'Group container border-radius. Overridden by rounded modifier classes.'
        },
        {
            name: '--origam-btn-group---border-width',
            defaultValue: '0',
            descriptionKey: 'components.btn_group.css_vars.border_width',
            descriptionFallback: 'Group border width. Set to "thin" when border=true.'
        },
        {
            name: '--origam-btn-group---border-style',
            defaultValue: 'solid',
            descriptionKey: 'components.btn_group.css_vars.border_style',
            descriptionFallback: 'Group border style.'
        },
        {
            name: '--origam-btn-group---border-color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.btn_group.css_vars.border_color',
            descriptionFallback: 'Group border color (currentColor by default).'
        },
        {
            name: '--origam-btn-group---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.btn_group.css_vars.background_color',
            descriptionFallback: 'Group background color.'
        },
        {
            name: '--origam-btn-group---color',
            defaultValue: 'inherit',
            descriptionKey: 'components.btn_group.css_vars.color',
            descriptionFallback: 'Group foreground color (inherited by default).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.btn_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components. Used by OrigamBtnToggle to proxy group props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.btn_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed btnGroupStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.btn_group.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.btn_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.btn_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.btn_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.btn_group.a11y.key_tab',
                actionFallback: 'Moves focus through each button in the group sequentially.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.btn_group.a11y.key_activate',
                actionFallback: 'Activates the focused button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.btn_group.a11y.role_group',
                noteFallback: 'The root element always carries role="group". Consider adding aria-label or aria-labelledby to describe the group purpose (e.g. "Text alignment").'
            },
            {
                noteKey: 'components.btn_group.a11y.border_management',
                noteFallback: 'Child buttons inside the group share adjacent borders (border-inline-end suppressed on non-last, border-inline-start on non-first). This ensures no double borders visually while keeping each button individually focusable.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/btn.json',
        pipelineNote: 'BtnGroup shares the btn token file. Group-level tokens use the btn-group namespace.',
        excerpt: [
            {
                tokenPath: 'btn-group.border-radius',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.btn_group.tokens.border_radius',
                descriptionFallback: 'Default border radius for the group container.'
            },
            {
                tokenPath: 'btn-group.border-width',
                value: '0',
                type: 'dimension',
                descriptionKey: 'components.btn_group.tokens.border_width',
                descriptionFallback: 'Default border width (none until border prop is set).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'divided',
                kind: 'switch',
                labelKey: 'components.btn_group.playground.divided',
                labelFallback: 'Divided',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.btn_group.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' }
                ]
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.btn_group.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'pill', value: 'pill' }
                ]
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.btn_group.playground.border',
                labelFallback: 'Border',
                defaultValue: false
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.btn_group.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' },
                    { label: 'compact', value: 'compact' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
