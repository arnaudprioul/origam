/**
 * /components/chip — full documentation data for OrigamChip.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Chip/chip.interface.ts        (IChipProps / IChipEmits)
 *   - packages/ds/src/interfaces/Chip/chip-group.interface.ts  (IChipGroupProps)
 *   - packages/ds/src/components/Chip/OrigamChip.vue           (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/chip.json                   (CSS tokens)
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

export const CHIP_DOC: IComponentDoc = {
    slug: 'chip',
    name: 'Chip',
    tag: 'origam-chip',
    icon: 'mdi-label-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.chip.description',
    descriptionFallback: 'Compact interactive element for tags, filters and selections with icon, close and group support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-chip--design',
    docUrl: 'http://localhost:4000/components/Chip/OrigamChip',

    family: [
        {
            slug: 'chip-group',
            name: 'ChipGroup',
            descriptionKey: 'components.catalog.chip_group.description',
            descriptionFallback: 'Scrollable group of Chip elements with single/multi-select and filter support.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.text.description',
            descriptionFallback: 'Chip label text. Can also be set via the default slot.'
        },
        {
            name: 'closable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.closable.description',
            descriptionFallback: 'Adds a close button that emits click:close and hides the chip via v-model.'
        },
        {
            name: 'closeIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-close-circle-outline'",
            descriptionKey: 'components.chip.props.close_icon.description',
            descriptionFallback: 'Icon for the close button.'
        },
        {
            name: 'closeLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.close'",
            descriptionKey: 'components.chip.props.close_label.description',
            descriptionFallback: 'Accessible aria-label for the close button.'
        },
        {
            name: 'draggable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.draggable.description',
            descriptionFallback: 'Makes the chip draggable via the HTML drag API.'
        },
        {
            name: 'filter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.filter.description',
            descriptionFallback: 'Shows a filter icon (check) when the chip is selected inside a ChipGroup.'
        },
        {
            name: 'filterIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-check'",
            descriptionKey: 'components.chip.props.filter_icon.description',
            descriptionFallback: 'Icon shown in filter mode when the chip is selected.'
        },
        {
            name: 'label',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.label.description',
            descriptionFallback: 'Switches border-radius to a square shape (label style).'
        },
        {
            name: 'link',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.link.description',
            descriptionFallback: 'Enables link behaviour when href or to is set.'
        },
        {
            name: 'pill',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.pill.description',
            descriptionFallback: 'Removes horizontal padding on prepend/append areas for a pill layout with flush avatars.'
        },
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chip.props.model_value.description',
            descriptionFallback: 'Controls the chip visibility. Use v-model to bind two-way.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the chip surface.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.bg_color.description',
            descriptionFallback: 'Background color override.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.chip.props.size.description',
            descriptionFallback: 'Controls the chip height and font-size via design tokens.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.chip.props.density.description',
            descriptionFallback: 'Adjusts padding density.'
        },
        // ── IAdjacentProps ─────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.prepend_icon.description',
            descriptionFallback: 'Icon displayed before the chip label.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.append_icon.description',
            descriptionFallback: 'Icon displayed after the chip label.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the prepend area.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the append area.'
        },
        // ── IStatusProps via IGroupItemProps ───────────────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.disabled.description',
            descriptionFallback: 'Disables the chip. Applies 30% opacity and removes pointer events.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.chip.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        },
        // ── ILinkProps ─────────────────────────────────────────────────
        {
            name: 'href',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.href.description',
            descriptionFallback: 'Renders the chip as an anchor tag pointing to this URL.'
        },
        {
            name: 'to',
            type: { label: 'string | RouteLocationRaw', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.to.description',
            descriptionFallback: 'Vue Router destination.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean. Default is pill (full round).'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.chip.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for outlined style.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.chip.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        // ── IRippleProps ───────────────────────────────────────────────
        {
            name: 'ripple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.chip.props.ripple.description',
            descriptionFallback: 'Enables the ripple effect on click.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip.emits.click.description',
            descriptionFallback: 'Fired on chip click.'
        },
        {
            event: 'click:close',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip.emits.click_close.description',
            descriptionFallback: 'Fired when the close button is clicked.'
        },
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip.emits.update_model_value.description',
            descriptionFallback: 'Fired when the chip is dismissed. Sets modelValue to false.'
        },
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip.emits.click_prepend.description',
            descriptionFallback: 'Fired when the prepend area is clicked.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip.emits.click_append.description',
            descriptionFallback: 'Fired when the append area is clicked.'
        },
        {
            event: 'update:group',
            payload: { label: 'unknown', slug: '', kind: 'primitive' },
            descriptionKey: 'components.chip.emits.update_group.description',
            descriptionFallback: 'Fired when the group selection changes (when inside a ChipGroup).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, selectedClass, select, toggle, value, disabled }',
            descriptionKey: 'components.chip.slots.default.description',
            descriptionFallback: 'Main chip label content. Receives group selection context props.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.chip.slots.prepend.description',
            descriptionFallback: 'Replaces the prepend icon/avatar area.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.chip.slots.append.description',
            descriptionFallback: 'Replaces the append icon/avatar area.'
        },
        {
            slot: 'close',
            slotProps: '{ closeIcon }',
            descriptionKey: 'components.chip.slots.close.description',
            descriptionFallback: 'Custom close button content. Receives closeIcon prop.'
        },
        {
            slot: 'filter',
            slotProps: '{ filterIcon }',
            descriptionKey: 'components.chip.slots.filter.description',
            descriptionFallback: 'Custom filter icon rendered when the chip is selected in filter mode.'
        }
    ],

    examples: [
        {
            titleKey: 'components.chip.examples.basic.title',
            titleFallback: 'Basic chips',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <origam-chip text="Design" />
    <origam-chip text="Frontend" color="primary" />
    <origam-chip text="Vue 3" color="success" prepend-icon="mdi-vuejs" />
    <origam-chip text="Closable" closable color="danger" />
  </div>
</template>`
        },
        {
            titleKey: 'components.chip.examples.filter.title',
            titleFallback: 'Filter chips (ChipGroup)',
            lang: 'vue',
            code: `<template>
  <origam-chip-group v-model="selected" multiple filter>
    <origam-chip value="vue"     text="Vue 3"     filter />
    <origam-chip value="ts"      text="TypeScript" filter />
    <origam-chip value="vite"    text="Vite"       filter />
    <origam-chip value="origam"  text="Origam"     filter />
  </origam-chip-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(['vue'])
</script>`
        },
        {
            titleKey: 'components.chip.examples.sizes.title',
            titleFallback: 'Sizes',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
    <origam-chip size="x-small" text="XS" />
    <origam-chip size="small"   text="Small" />
    <origam-chip size="default" text="Default" />
    <origam-chip size="large"   text="Large" />
    <origam-chip size="x-large" text="XL" />
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: {}, slotContent: 'Design' },
        { label: 'primary', props: { color: 'primary' }, slotContent: 'Frontend' },
        { label: 'success', props: { color: 'success', prependIcon: 'mdi-check' }, slotContent: 'Done' },
        { label: 'closable', props: { color: 'danger', closable: true }, slotContent: 'Remove' },
        { label: 'outlined', props: { border: true }, slotContent: 'Outlined' },
        { label: 'label', props: { label: true, color: 'warning' }, slotContent: 'Label' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-chip',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamChip',
        svgDesc: 'Schematic of the Chip component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="60" y="60" width="580" height="80" rx="40" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="60" y="60" width="580" height="80" rx="40" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.5"/>
  <circle cx="108" cy="100" r="28" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.1))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="108" y="104" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <rect x="148" y="80" width="280" height="40" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="288" y="105" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label / #default slot</text>
  <circle cx="572" cy="100" r="24" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.1))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="572" y="104" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">close</text>
  <circle cx="68" cy="68" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="72.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="108" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="148" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="148" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="430" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="430" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="548" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="548" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="68" cy="132" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="68" y="136" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <circle cx="108" cy="132" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="108" y="136" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">7</text>
  <text x="350" y="200" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">⑥ overlay + ⑦ underlay = absolute layers, opacity:0 at rest</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-chip&gt;</code> — 7 internal parts. The chip is a full-round pill by default. Absolute layers (overlay ⑥, underlay ⑦) handle interaction states.`,
        legend: [
            {
                num: 1,
                cls: '.origam-chip',
                descriptionKey: 'components.chip.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;span&gt;</code> by default; switches to <code>&lt;a&gt;</code> when a link prop is set. Pill shape by default (<code>border-radius: 9999px</code>).'
            },
            {
                num: 2,
                cls: '.origam-chip__prepend',
                descriptionKey: 'components.chip.anatomy.prepend',
                descriptionFallback: 'Leading area. Renders <code>prependIcon</code> or <code>prependAvatar</code>, or the <code>#prepend</code> slot. Present only when <code>hasPrepend</code>.'
            },
            {
                num: 3,
                cls: '.origam-chip__content',
                descriptionKey: 'components.chip.anatomy.content',
                descriptionFallback: 'Label zone. Contains the <code>#default</code> slot text or the <code>text</code> prop. Has <code>data-no-activator</code> attribute.'
            },
            {
                num: 4,
                cls: '.origam-chip__filter',
                descriptionKey: 'components.chip.anatomy.filter',
                descriptionFallback: 'Filter check icon area. Visible only when <code>filter=true</code> and the chip is selected inside a ChipGroup. Uses <code>OrigamExpandX</code> transition.'
            },
            {
                num: 5,
                cls: '.origam-chip__close',
                descriptionKey: 'components.chip.anatomy.close',
                descriptionFallback: 'Close button (<code>OrigamBtn variant="text"</code>). Present when <code>closable=true</code> or the <code>#close</code> slot is used.'
            },
            {
                num: 6,
                cls: '.origam-chip__overlay',
                descriptionKey: 'components.chip.anatomy.overlay',
                descriptionFallback: 'Interaction overlay. <code>opacity: 0</code> at rest → 0.24 on hover → 0.12 on focus. Present only when the chip is clickable.'
            },
            {
                num: 7,
                cls: '.origam-chip__underlay',
                descriptionKey: 'components.chip.anatomy.underlay',
                descriptionFallback: 'Reserved absolute underlay. <code>position: absolute</code>. Currently unpainted (no background).'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<span class="origam-chip origam-chip--size-default">
  <!-- interaction overlay (hover/focus/active) -->
  <span class="origam-chip__overlay" />
  <span class="origam-chip__underlay" />

  <!-- filter icon (expand-x transition, visible when selected in group) -->
  <div class="origam-chip__filter">
    <slot name="filter" />
  </div>

  <!-- prepend slot: icon or avatar -->
  <div class="origam-chip__prepend">
    <slot name="prepend" />
  </div>

  <!-- main label / default slot -->
  <div class="origam-chip__content" data-no-activator="">
    <slot name="default" />
  </div>

  <!-- append slot: icon or avatar -->
  <div class="origam-chip__append">
    <slot name="append" />
  </div>

  <!-- close button -->
  <origam-btn class="origam-chip__close" variant="text" size="x-small">
    <slot name="close" />
  </origam-btn>
</span>`,
        classes: [
            {
                cls: 'origam-chip',
                descriptionKey: 'components.chip.anatomy.root',
                descriptionFallback: 'Root element. Full-round pill by default.'
            },
            {
                cls: 'origam-chip__overlay',
                descriptionKey: 'components.chip.anatomy.overlay',
                descriptionFallback: 'Interaction overlay. Opacity animates on hover/focus/active.'
            },
            {
                cls: 'origam-chip__underlay',
                descriptionKey: 'components.chip.anatomy.underlay',
                descriptionFallback: 'Reserved absolute underlay layer.'
            },
            {
                cls: 'origam-chip__filter',
                descriptionKey: 'components.chip.anatomy.filter',
                descriptionFallback: 'Filter check icon container. Shown with ExpandX transition when selected in filter mode.'
            },
            {
                cls: 'origam-chip__prepend',
                descriptionKey: 'components.chip.anatomy.prepend',
                descriptionFallback: 'Leading icon or avatar container.'
            },
            {
                cls: 'origam-chip__content',
                descriptionKey: 'components.chip.anatomy.content',
                descriptionFallback: 'Label container.'
            },
            {
                cls: 'origam-chip__append',
                descriptionKey: 'components.chip.anatomy.append',
                descriptionFallback: 'Trailing icon or avatar container.'
            },
            {
                cls: 'origam-chip__close',
                descriptionKey: 'components.chip.anatomy.close',
                descriptionFallback: 'Close button rendered as an OrigamBtn with variant="text".'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-chip---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.chip.css_vars.background_color',
            descriptionFallback: 'Default chip background color.'
        },
        {
            name: '--origam-chip---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.chip.css_vars.color',
            descriptionFallback: 'Default chip foreground (text/icon) color.'
        },
        {
            name: '--origam-chip---border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.chip.css_vars.border_radius',
            descriptionFallback: 'Border radius. Full pill by default. Overridden by the label modifier to radius.sm.'
        },
        {
            name: '--origam-chip---font-weight',
            defaultValue: '{font.weight.regular}',
            descriptionKey: 'components.chip.css_vars.font_weight',
            descriptionFallback: 'Chip label font weight.'
        },
        {
            name: '--origam-chip---opacity-disabled',
            defaultValue: '0.3',
            descriptionKey: 'components.chip.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity applied when the chip is disabled.'
        },
        {
            name: '--origam-chip---density',
            defaultValue: '0px',
            descriptionKey: 'components.chip.css_vars.density',
            descriptionFallback: 'Density offset: 0 (default), -8px (compact).'
        },
        {
            name: '--origam-chip__overlay---opacity',
            defaultValue: '0',
            descriptionKey: 'components.chip.css_vars.overlay_opacity',
            descriptionFallback: 'Overlay opacity at rest. Animates to 0.24 on hover and 0.12 on focus/active.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.chip.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.chip.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed chipStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.chip.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.chip.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.chip.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.chip.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.chip.a11y.key_activate',
                actionFallback: 'Activates the chip (fires click event) when it is clickable.'
            },
            {
                key: 'Tab',
                actionKey: 'components.chip.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element. Chip is focusable only when clickable (tabindex=0).'
            }
        ],
        notes: [
            {
                noteKey: 'components.chip.a11y.close_label_note',
                noteFallback: 'The close button receives an aria-label from the closeLabel prop, defaulting to the translated "Close" string.'
            },
            {
                noteKey: 'components.chip.a11y.disabled_note',
                noteFallback: 'When disabled=true, the chip receives the disabled attribute and pointer events are removed.'
            },
            {
                noteKey: 'components.chip.a11y.overlay_note',
                noteFallback: 'The overlay span receives focus-visible styles to indicate keyboard focus visually.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/chip.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'chip.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.chip.tokens.background_color',
                descriptionFallback: 'Default chip background.'
            },
            {
                tokenPath: 'chip.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.chip.tokens.border_radius',
                descriptionFallback: 'Full-pill border radius by default.'
            },
            {
                tokenPath: 'chip.font-weight',
                value: '{font.weight.regular}',
                type: 'fontWeight',
                descriptionKey: 'components.chip.tokens.font_weight',
                descriptionFallback: 'Chip label font weight.'
            },
            {
                tokenPath: 'chip.selected.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.chip.tokens.selected_background_color',
                descriptionFallback: 'Background when the chip is selected inside a ChipGroup.'
            },
            {
                tokenPath: 'chip.overlay.opacity',
                value: '{opacity.0}',
                type: 'number',
                descriptionKey: 'components.chip.tokens.overlay_opacity',
                descriptionFallback: 'Overlay opacity at rest (0). Animates on hover/focus/active.'
            },
            {
                tokenPath: 'chip.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.chip.tokens.transition_duration',
                descriptionFallback: 'Transition duration for overlay opacity animation.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Design',
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.chip.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' }
                ]
            },
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.chip.playground.size',
                labelFallback: 'Size',
                defaultValue: 'default',
                options: [
                    { label: 'x-small', value: 'x-small' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                    { label: 'large', value: 'large' },
                    { label: 'x-large', value: 'x-large' }
                ]
            },
            {
                prop: 'closable',
                kind: 'switch',
                labelKey: 'components.chip.playground.closable',
                labelFallback: 'Closable',
                defaultValue: false
            },
            {
                prop: 'label',
                kind: 'switch',
                labelKey: 'components.chip.playground.label',
                labelFallback: 'Label shape',
                defaultValue: false
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.chip.playground.border',
                labelFallback: 'Border',
                defaultValue: false
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.chip.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-star', value: 'mdi-star' },
                    { label: 'mdi-check', value: 'mdi-check' },
                    { label: 'mdi-account', value: 'mdi-account' },
                    { label: 'mdi-tag', value: 'mdi-tag' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.chip.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
