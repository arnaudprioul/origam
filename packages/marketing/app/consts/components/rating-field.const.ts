/**
 * /components/rating-field — full documentation data for OrigamRatingField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/RatingField/rating-field.interface.ts  (props)
 *   - packages/ds/src/components/RatingField/OrigamRatingField.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/rating-field.json                    (CSS tokens)
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

export const RATING_FIELD_DOC: IComponentDoc = {
    slug: 'rating-field',
    name: 'RatingField',
    tag: 'origam-rating-field',
    icon: 'mdi-star-half-full',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.rating_field.description',
    descriptionFallback: 'Star-rating input with configurable length, half-increment support, hover preview and clearable option.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-rating-field--design',
    docUrl: 'http://localhost:4000/components/RatingField/OrigamRatingField',

    family: [
        {
            slug: 'rating-field-item',
            name: 'RatingFieldItem',
            descriptionKey: 'components.catalog.rating_field_item.description',
            descriptionFallback: 'Individual star item in a RatingField. Handles filled/hovered state and half-increment layout.'
        }
    ],

    related: [
        {
            slug: 'input',
            name: 'Input',
            kind: 'component',
            descriptionKey: 'components.rating_field.related.input',
            descriptionFallback: 'RatingField wraps OrigamInput to inherit label, error and messages orchestration.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.rating_field.props.model_value.description',
            descriptionFallback: 'Current rating value. Bound with v-model. Clamped to [0, length].'
        },
        {
            name: 'length',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '5',
            descriptionKey: 'components.rating_field.props.length.description',
            descriptionFallback: 'Total number of rating items (stars). Default is 5.'
        },
        {
            name: 'clearable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field.props.clearable.description',
            descriptionFallback: 'Shows a clear button when the current value > 0 and the field is not disabled or readonly.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field.props.disabled.description',
            descriptionFallback: 'Disables all interaction. Hides the clear button and prevents click/hover events.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field.props.readonly.description',
            descriptionFallback: 'Makes the field read-only (pointer-events: none). Useful for display-only ratings.'
        },
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field.props.hover.description',
            descriptionFallback: 'Enables hover preview: hovering a star highlights all stars up to that position.'
        },
        {
            name: 'halfIncrements',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field.props.half_increments.description',
            descriptionFallback: 'Allows selection of half-star values (0.5, 1.5, 2.5…). Renders two items per star position.'
        },
        {
            name: 'fullIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field.props.full_icon.description',
            descriptionFallback: 'MDI icon used for filled (selected) stars. Defaults to mdi-star.'
        },
        {
            name: 'emptyIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field.props.empty_icon.description',
            descriptionFallback: 'MDI icon used for unfilled stars. Defaults to mdi-star-outline.'
        },
        {
            name: 'itemLabels',
            type: { label: 'Array<string>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field.props.item_labels.description',
            descriptionFallback: 'Text labels displayed above or below each star position.'
        },
        {
            name: 'itemLabelPosition',
            type: { label: 'TBlock', slug: 'block', kind: 'type' },
            defaultValue: "'top'",
            descriptionKey: 'components.rating_field.props.item_label_position.description',
            descriptionFallback: "Position of item labels: 'top' (above the star row) or 'bottom' (below)."
        },
        {
            name: 'itemAriaLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field.props.item_aria_label.description',
            descriptionFallback: 'Aria-label template for each star item. Interpolated with the item value.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field.props.name.description',
            descriptionFallback: 'Name used for the radio inputs in the star row. Auto-generated if not provided.'
        },
        // ── IInputProps ────────────────────────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field.props.label.description',
            descriptionFallback: 'Label rendered above the star row via OrigamLabel.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field.props.required.description',
            descriptionFallback: 'Marks the field as required.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.rating_field.props.tag.description',
            descriptionFallback: 'Root HTML tag. Defaults to div.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.rating_field.props.size.description',
            descriptionFallback: 'Controls the size of each star icon.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.rating_field.props.density.description',
            descriptionFallback: 'Adjusts the density of the Input wrapper.'
        },
        // ── IRippleProps ───────────────────────────────────────────────
        {
            name: 'ripple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.rating_field.props.ripple.description',
            descriptionFallback: 'Enables ripple effect on each star item.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.rating_field.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the user clicks a star. Carries the new numeric rating value.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, messagesId, isDisabled, isReadonly, isValid }',
            descriptionKey: 'components.rating_field.slots.default.description',
            descriptionFallback: 'Replaces the entire inner layout (label + star row). Receives input context.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.rating_field.slots.label.description',
            descriptionFallback: 'Custom label content replacing the default OrigamLabel.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.rating_field.slots.prepend.description',
            descriptionFallback: 'Content prepended before the rating row.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.rating_field.slots.append.description',
            descriptionFallback: 'Content appended after the rating row.'
        },
        {
            slot: 'itemLabel',
            slotProps: '—',
            descriptionKey: 'components.rating_field.slots.item_label.description',
            descriptionFallback: 'Custom label content for each star position. Also supports per-index slot `itemLabel.{index}`.'
        },
        {
            slot: 'messages',
            slotProps: '{ hasMessages, messages }',
            descriptionKey: 'components.rating_field.slots.messages.description',
            descriptionFallback: 'Custom messages/errors area below the star row.'
        }
    ],

    examples: [
        {
            titleKey: 'components.rating_field.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-rating-field v-model="rating" label="Your rating" />
</template>
<script setup>
const rating = ref(3)
</script>`
        },
        {
            titleKey: 'components.rating_field.examples.hover.title',
            titleFallback: 'Hover preview & half increments',
            lang: 'vue',
            code: `<template>
  <origam-rating-field
    v-model="rating"
    :hover="true"
    :half-increments="true"
    :clearable="true"
    label="Rate this item"
  />
</template>
<script setup>
const rating = ref(2.5)
</script>`
        },
        {
            titleKey: 'components.rating_field.examples.custom_icons.title',
            titleFallback: 'Custom icons',
            lang: 'vue',
            code: `<template>
  <origam-rating-field
    v-model="rating"
    full-icon="mdi-heart"
    empty-icon="mdi-heart-outline"
    color="danger"
    label="How much do you love it?"
  />
</template>
<script setup>
const rating = ref(4)
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-rating-field',
        svgViewBox: '0 0 560 180',
        svgTitle: 'Anatomy of OrigamRatingField',
        svgDesc: 'Schematic of the RatingField component with 5 numbered parts.',
        svg: `
  <rect x="0" y="0" width="560" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="520" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="40" y="55" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Rating label</text>
  <text x="40" y="110" font-size="28" fill="var(--origam-color__feedback--warning---bg, #f59e0b)" font-family="'JetBrains Mono',monospace">★★★★☆</text>
  <rect x="440" y="92" width="28" height="28" rx="14" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1.5"/>
  <text x="454" y="112" font-size="14" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">×</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="56" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="80" cy="68" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="80" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="180" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="180" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="454" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="454" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-rating-field&gt;</code> — 5 parts: root ①, label ②, star wrapper ③, individual star item ④, and clear button ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-rating-field',
                descriptionKey: 'components.rating_field.anatomy.root',
                descriptionFallback: 'Root element. Inline-flex container. Wraps OrigamInput for label/messages.'
            },
            {
                num: 2,
                cls: '.origam-rating-field__label',
                descriptionKey: 'components.rating_field.anatomy.label',
                descriptionFallback: 'Label zone rendered via OrigamLabel. Visible when label prop is set.'
            },
            {
                num: 3,
                cls: '.origam-rating-field__wrapper',
                descriptionKey: 'components.rating_field.anatomy.wrapper',
                descriptionFallback: 'Per-star-position wrapper. Hosts optional itemLabel above/below the star.'
            },
            {
                num: 4,
                cls: '.origam-rating-field__content',
                descriptionKey: 'components.rating_field.anatomy.content',
                descriptionFallback: 'Inner row hosting one or two OrigamRatingFieldItem per position (two when halfIncrements=true).'
            },
            {
                num: 5,
                cls: '.origam-rating-field__clear',
                descriptionKey: 'components.rating_field.anatomy.clear',
                descriptionFallback: 'Clear button (OrigamBtn icon). Visible when clearable=true and modelValue > 0.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-rating-field">
  <!-- hidden empty item for keyboard baseline -->
  <div class="origam-rating-field__empty">
    <origam-rating-field-item :value="0" :show-star="false" />
  </div>

  <!-- optional clear button -->
  <origam-btn class="origam-rating-field__clear" icon="mdi-close-circle-outline" />

  <!-- star rows -->
  <div v-for="range in ranges" class="origam-rating-field__wrapper">
    <!-- optional top label -->
    <span>{{ itemLabels[index] }}</span>
    <div class="origam-rating-field__content">
      <origam-rating-field-item :value="range - 0.5" />  <!-- half -->
      <origam-rating-field-item :value="range" />         <!-- full -->
    </div>
  </div>
</div>`,
        classes: [
            { cls: 'origam-rating-field', descriptionKey: 'components.rating_field.anatomy.root', descriptionFallback: 'Root block.' },
            { cls: 'origam-rating-field__label', descriptionKey: 'components.rating_field.anatomy.label', descriptionFallback: 'Label wrapper.' },
            { cls: 'origam-rating-field__empty', descriptionKey: 'components.rating_field.anatomy.empty', descriptionFallback: 'Hidden zero-value item for keyboard.' },
            { cls: 'origam-rating-field__clear', descriptionKey: 'components.rating_field.anatomy.clear', descriptionFallback: 'Clear button.' },
            { cls: 'origam-rating-field__wrapper', descriptionKey: 'components.rating_field.anatomy.wrapper', descriptionFallback: 'Per-star-position wrapper.' },
            { cls: 'origam-rating-field__content', descriptionKey: 'components.rating_field.anatomy.content', descriptionFallback: 'Star item row.' },
            { cls: 'origam-rating-field--hover', descriptionKey: 'components.rating_field.anatomy.modifier_hover', descriptionFallback: 'Applied when hover=true.' },
            { cls: 'origam-rating-field--readonly', descriptionKey: 'components.rating_field.anatomy.modifier_readonly', descriptionFallback: 'Applied when readonly=true. Disables pointer-events.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-rating-field---gap',
            defaultValue: '{space.1}',
            descriptionKey: 'components.rating_field.css_vars.gap',
            descriptionFallback: 'Gap between star items.'
        },
        {
            name: '--origam-rating-field---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.rating_field.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for star fill animations.'
        },
        {
            name: '--origam-rating-field__item---color',
            defaultValue: '{color.text.disabled}',
            descriptionKey: 'components.rating_field.css_vars.item_color',
            descriptionFallback: 'Color of unfilled star items.'
        },
        {
            name: '--origam-rating-field__item---color-active',
            defaultValue: '{color.feedback.warning.bg}',
            descriptionKey: 'components.rating_field.css_vars.item_color_active',
            descriptionFallback: 'Color of filled (selected) star items.'
        },
        {
            name: '--origam-rating-field__item---font-size',
            defaultValue: '{font.size.2xl}',
            descriptionKey: 'components.rating_field.css_vars.item_font_size',
            descriptionFallback: 'Icon size for each star item.'
        },
        {
            name: '--origam-rating-field__item---scale-hover',
            defaultValue: '1.15',
            descriptionKey: 'components.rating_field.css_vars.item_scale_hover',
            descriptionFallback: 'Transform scale applied to a star on hover.'
        },
        {
            name: '--origam-rating-field---opacity-disabled',
            defaultValue: '{opacity.32}',
            descriptionKey: 'components.rating_field.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity of the entire field when disabled.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.rating_field.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to sub-components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.rating_field.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.rating_field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.rating_field.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.rating_field.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.rating_field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['radiogroup', 'radio'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.rating_field.a11y.key_tab',
                actionFallback: 'Moves focus to the first or next star item.'
            },
            {
                key: 'Arrow Left / Right',
                actionKey: 'components.rating_field.a11y.key_arrows',
                actionFallback: 'Navigates between star positions.'
            },
            {
                key: 'Space',
                actionKey: 'components.rating_field.a11y.key_space',
                actionFallback: 'Selects the focused star value.'
            }
        ],
        notes: [
            {
                noteKey: 'components.rating_field.a11y.radio_note',
                noteFallback: 'Each star item renders a native <input type="radio">. Screen readers announce position and total (e.g. "3 of 5").'
            },
            {
                noteKey: 'components.rating_field.a11y.readonly_note',
                noteFallback: 'When readonly=true, pointer-events are disabled. The read-only class is applied to the root.'
            },
            {
                noteKey: 'components.rating_field.a11y.item_aria_label_note',
                noteFallback: 'itemAriaLabel provides a custom aria-label template for each star, replacing the default numeric label.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/rating-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'rating-field.gap',
                value: '{space.1}',
                type: 'dimension',
                descriptionKey: 'components.rating_field.tokens.gap',
                descriptionFallback: 'Gap between star items in the row.'
            },
            {
                tokenPath: 'rating-field.item.color',
                value: '{color.text.disabled}',
                type: 'color',
                descriptionKey: 'components.rating_field.tokens.item_color',
                descriptionFallback: 'Color of unfilled stars.'
            },
            {
                tokenPath: 'rating-field.item.color-active',
                value: '{color.feedback.warning.bg}',
                type: 'color',
                descriptionKey: 'components.rating_field.tokens.item_color_active',
                descriptionFallback: 'Color of filled (selected) stars.'
            },
            {
                tokenPath: 'rating-field.item.font-size',
                value: '{font.size.2xl}',
                type: 'dimension',
                descriptionKey: 'components.rating_field.tokens.item_font_size',
                descriptionFallback: 'Icon size for star items.'
            },
            {
                tokenPath: 'rating-field.item.scale-hover',
                value: '1.15',
                type: 'number',
                descriptionKey: 'components.rating_field.tokens.item_scale_hover',
                descriptionFallback: 'Scale transform on hover.'
            },
            {
                tokenPath: 'rating-field.opacity-disabled',
                value: '{opacity.32}',
                type: 'number',
                descriptionKey: 'components.rating_field.tokens.opacity_disabled',
                descriptionFallback: 'Opacity when the field is disabled.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'number',
                labelKey: 'components.rating_field.playground.model_value',
                labelFallback: 'Value',
                defaultValue: 3
            },
            {
                prop: 'length',
                kind: 'number',
                labelKey: 'components.rating_field.playground.length',
                labelFallback: 'Length (stars)',
                defaultValue: 5
            },
            {
                prop: 'hover',
                kind: 'switch',
                labelKey: 'components.rating_field.playground.hover',
                labelFallback: 'Hover preview',
                defaultValue: true
            },
            {
                prop: 'halfIncrements',
                kind: 'switch',
                labelKey: 'components.rating_field.playground.half_increments',
                labelFallback: 'Half increments',
                defaultValue: false
            },
            {
                prop: 'clearable',
                kind: 'switch',
                labelKey: 'components.rating_field.playground.clearable',
                labelFallback: 'Clearable',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.rating_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.rating_field.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
