/**
 * /components/rating-field-item — full documentation data for OrigamRatingFieldItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/RatingField/rating-field-item.interface.ts  (props)
 *   - packages/ds/src/components/RatingField/OrigamRatingFieldItem.vue        (template BEM, defineExpose)
 *   - packages/ds/tokens/component/rating-field.json                          (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const RATING_FIELD_ITEM_DOC: IComponentDoc = {
    slug: 'rating-field-item',
    name: 'RatingFieldItem',
    tag: 'origam-rating-field-item',
    icon: 'mdi-star',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.rating_field_item.description',
    descriptionFallback: 'Individual star item in a RatingField. Renders an icon-only Btn in text variant that handles filled/hovered/half-increment state and a visually-hidden radio input.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-rating-field--design',
    docUrl: 'http://localhost:4000/components/RatingField/OrigamRatingFieldItem',

    parentSlug: 'rating-field',

    family: [
        {
            slug: 'rating-field',
            name: 'RatingField',
            descriptionKey: 'components.catalog.rating_field.description',
            descriptionFallback: 'Star-rating input with configurable length, half-increment support, hover preview and clearable option.'
        }
    ],

    related: [
        {
            slug: 'btn',
            name: 'Btn',
            kind: 'component',
            descriptionKey: 'components.rating_field_item.related.btn',
            descriptionFallback: 'RatingFieldItem renders an OrigamBtn in variant="text" icon mode as the interactive star surface.'
        }
    ],

    props: [
        {
            name: 'value',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.rating_field_item.props.value.description',
            descriptionFallback: 'Numeric value this star represents (e.g. 1, 1.5, 2, …). Required.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field_item.props.name.description',
            descriptionFallback: 'Name attribute used to build the id of the hidden radio input (id = "{name}-{value}").'
        },
        {
            name: 'index',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '-1',
            descriptionKey: 'components.rating_field_item.props.index.description',
            descriptionFallback: 'Zero-based position of this item in the parent RatingField.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field_item.props.label.description',
            descriptionFallback: 'Accessible label for this star. Falls back to the itemAriaLabel locale key.'
        },
        {
            name: 'showStar',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.rating_field_item.props.show_star.description',
            descriptionFallback: 'When false, the OrigamBtn icon is hidden (half-increment placeholder).'
        },
        {
            name: 'isFilled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.is_filled.description',
            descriptionFallback: 'True when this star is within the current rating value (shows fullIcon).'
        },
        {
            name: 'isHovered',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.is_hovered.description',
            descriptionFallback: 'True when the cursor is over this star or a later star (triggers hover preview).'
        },
        {
            name: 'isHovering',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.is_hovering.description',
            descriptionFallback: 'True when the parent RatingField is in a hover state. Controls whether isFilled or isHovered drives the icon selection.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.disabled.description',
            descriptionFallback: 'Disables the star button and the hidden radio input.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.readonly.description',
            descriptionFallback: 'Makes the star non-interactive without disabling it visually.'
        },
        {
            name: 'checked',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.checked.description',
            descriptionFallback: 'Checked state of the underlying hidden radio input.'
        },
        {
            name: 'halfIncrements',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rating_field_item.props.half_increments.description',
            descriptionFallback: 'Enables half-star rendering. When true, items with fractional values apply clip-path to show only half the star.'
        },
        {
            name: 'fullIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-star'",
            descriptionKey: 'components.rating_field_item.props.full_icon.description',
            descriptionFallback: 'MDI icon shown when the star is filled (isFilled=true or isHovered=true).'
        },
        {
            name: 'emptyIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-star-outline'",
            descriptionKey: 'components.rating_field_item.props.empty_icon.description',
            descriptionFallback: 'MDI icon shown when the star is empty.'
        },
        {
            name: 'length',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field_item.props.length.description',
            descriptionFallback: 'Total number of stars in the parent RatingField. Used to build the accessible label.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field_item.props.color.description',
            descriptionFallback: 'Icon color. Overrides the default star fill color from the rating-field token.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field_item.props.size.description',
            descriptionFallback: 'Size of the inner Btn / icon. Propagated from the parent RatingField.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.rating_field_item.props.density.description',
            descriptionFallback: 'Density passed down from the parent RatingField.'
        },
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.rating_field_item.props.ripple.description',
            descriptionFallback: 'Enables the Material ripple on the star button.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.rating_field_item.props.tag.description',
            descriptionFallback: 'Root HTML element rendered by the component.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'Event', slug: '', kind: 'primitive' },
            descriptionKey: 'components.rating_field_item.emits.click.description',
            descriptionFallback: 'Fired when the star button is clicked. Forwarded from the inner OrigamBtn.'
        },
        {
            event: 'mouseenter',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.rating_field_item.emits.mouseenter.description',
            descriptionFallback: 'Fired when the pointer enters this star. Used by the parent to drive hover preview.'
        },
        {
            event: 'mouseleave',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.rating_field_item.emits.mouseleave.description',
            descriptionFallback: 'Fired when the pointer leaves this star. Used by the parent to clear hover preview.'
        }
    ],

    slots: [
        {
            slot: 'item',
            slotProps: '{ props: ratingBtnProps, value }',
            descriptionKey: 'components.rating_field_item.slots.item.description',
            descriptionFallback: 'Replaces the default OrigamBtn star with a custom element. Receives all computed btn props and the numeric value.'
        }
    ],

    examples: [
        {
            titleKey: 'components.rating_field_item.examples.standalone.title',
            titleFallback: 'Standalone (internal usage)',
            lang: 'vue',
            code: `<!-- RatingFieldItem is intended to be used INSIDE OrigamRatingField.
     Use OrigamRatingField directly for consumer-facing code. -->
<template>
  <origam-rating-field v-model="rating" :length="5" />
</template>
<script setup>
import { ref } from 'vue'
const rating = ref(3)
</script>`
        },
        {
            titleKey: 'components.rating_field_item.examples.custom_slot.title',
            titleFallback: 'Custom item slot via RatingField',
            lang: 'vue',
            code: `<template>
  <origam-rating-field v-model="rating" :length="5">
    <template #item="{ props: itemProps, value }">
      <origam-btn v-bind="itemProps" :icon="value <= rating ? 'mdi-heart' : 'mdi-heart-outline'" />
    </template>
  </origam-rating-field>
</template>
<script setup>
import { ref } from 'vue'
const rating = ref(2)
</script>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-rating-field-item',
        svgViewBox: '0 0 460 180',
        svgTitle: 'Anatomy of OrigamRatingFieldItem',
        svgDesc: 'Schematic of the RatingFieldItem component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="460" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="420" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="40" y="40" width="60" height="32" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="70" y="61" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">label</text>
  <rect x="110" y="40" width="200" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="210" y="88" font-size="22" fill="var(--origam-color__feedback--warning---bg, #f59e0b)" text-anchor="middle">★</text>
  <rect x="120" y="132" width="180" height="12" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))"/>
  <text x="210" y="143" font-size="8" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-family="'JetBrains Mono',monospace">hidden radio input</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="118" cy="48" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="118" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="210" cy="136" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="210" y="140" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-rating-field-item&gt;</code> — 4 parts. Root ① wraps the visually-hidden accessible label ② and the star Btn ③ (with fullIcon/emptyIcon). A hidden radio input ④ tracks the selection state for screen readers and form submission.`,
        legend: [
            {
                num: 1,
                cls: '.origam-rating-field-item',
                descriptionKey: 'components.rating_field_item.anatomy.root',
                descriptionFallback: 'Root element (div by default). Applies --half / --full modifier classes when halfIncrements is active.'
            },
            {
                num: 2,
                cls: '.origam-rating-field-item__hidden (label)',
                descriptionKey: 'components.rating_field_item.anatomy.hidden_label',
                descriptionFallback: 'Visually-hidden <span> inside a <label> element. Provides the accessible text ("Rate 3 of 5") for screen readers. width/height: 0, opacity: 0.'
            },
            {
                num: 3,
                cls: '.origam-btn (variant="text" icon)',
                descriptionKey: 'components.rating_field_item.anatomy.btn',
                descriptionFallback: 'Inner OrigamBtn rendered in variant="text" icon mode. Displays fullIcon or emptyIcon depending on filled/hovered state. The #item slot overrides this.'
            },
            {
                num: 4,
                cls: '.origam-rating-field-item__hidden (input)',
                descriptionKey: 'components.rating_field_item.anatomy.hidden_input',
                descriptionFallback: 'Visually-hidden native <input type="radio"> (tabindex="-1"). Tracks checked state for form participation and screen reader state. Not focusable — keyboard navigation uses the Btn.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-rating-field-item">
  <!-- visually-hidden label for screen readers -->
  <label :for="id">
    <span class="origam-rating-field-item__hidden">Rate {{ value }} of {{ length }}</span>

    <!-- the clickable star icon (OrigamBtn in text/icon mode) -->
    <origam-btn
      v-if="showStar"
      variant="text"
      :icon="isFullIcon ? fullIcon : emptyIcon"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    />
  </label>

  <!-- visually-hidden radio input, not focusable -->
  <input
    class="origam-rating-field-item__hidden"
    type="radio"
    :id="id"
    :name="name"
    :value="value"
    :checked="checked"
    :disabled="disabled"
    :readonly="readonly"
    tabindex="-1"
  />
</div>`,
        classes: [
            {
                cls: 'origam-rating-field-item',
                descriptionKey: 'components.rating_field_item.anatomy.root',
                descriptionFallback: 'Root block element.'
            },
            {
                cls: 'origam-rating-field-item--half',
                descriptionKey: 'components.rating_field_item.anatomy.half',
                descriptionFallback: 'Applied when halfIncrements=true and value is fractional. Clips the star to show only the left half via clip-path.'
            },
            {
                cls: 'origam-rating-field-item--full',
                descriptionKey: 'components.rating_field_item.anatomy.full',
                descriptionFallback: 'Applied when halfIncrements=true and value is a whole number.'
            },
            {
                cls: 'origam-rating-field-item__hidden',
                descriptionKey: 'components.rating_field_item.anatomy.hidden',
                descriptionFallback: 'Visually-hidden utility class (height/width: 0, opacity: 0, position: absolute). Applied to both the label span and the radio input.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-rating-field---item-color',
            defaultValue: '{color.text.disabled}',
            descriptionKey: 'components.rating_field_item.css_vars.item_color',
            descriptionFallback: 'Default (empty) star color.'
        },
        {
            name: '--origam-rating-field---item-color-active',
            defaultValue: '{color.feedback.warning.bg}',
            descriptionKey: 'components.rating_field_item.css_vars.item_color_active',
            descriptionFallback: 'Star color when filled or hovered.'
        },
        {
            name: '--origam-rating-field---item-color-disabled',
            defaultValue: '{color.text.disabled}',
            descriptionKey: 'components.rating_field_item.css_vars.item_color_disabled',
            descriptionFallback: 'Star color when disabled.'
        },
        {
            name: '--origam-rating-field---item-font-size',
            defaultValue: '{font.size.2xl}',
            descriptionKey: 'components.rating_field_item.css_vars.item_font_size',
            descriptionFallback: 'Icon size of each star.'
        },
        {
            name: '--origam-rating-field---item-scale-hover',
            defaultValue: '1.15',
            descriptionKey: 'components.rating_field_item.css_vars.item_scale_hover',
            descriptionFallback: 'Scale applied to the star on hover.'
        },
        {
            name: '--origam-rating-field---item-transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.rating_field_item.css_vars.item_transition_duration',
            descriptionFallback: 'Transition duration for scale and color animations.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.rating_field_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.rating_field_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'ComputedRef<string>',
            descriptionKey: 'components.rating_field_item.exposed.id',
            descriptionFallback: 'Computed id of the hidden radio input ("{name}-{value}").'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.rating_field_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.rating_field_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.rating_field_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.rating_field_item.exposed.style_id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['radio'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.rating_field_item.a11y.key_tab',
                actionFallback: 'Focuses the star button. The hidden radio input is tabindex="-1" and not directly reachable by Tab.'
            },
            {
                key: 'Space / Enter',
                actionKey: 'components.rating_field_item.a11y.key_activate',
                actionFallback: 'Activates the star button, emitting click and setting the parent RatingField value.'
            }
        ],
        notes: [
            {
                noteKey: 'components.rating_field_item.a11y.hidden_input_note',
                noteFallback: 'The hidden radio input is always present but tabindex="-1". It participates in form submission and screen-reader state announcements without entering the normal keyboard focus order.'
            },
            {
                noteKey: 'components.rating_field_item.a11y.label_note',
                noteFallback: 'The accessible label (aria text) is built from the itemAriaLabel locale key via t(itemAriaLabel, value, length). It reads "Rate N of M stars" for screen readers.'
            },
            {
                noteKey: 'components.rating_field_item.a11y.half_note',
                noteFallback: 'In half-increment mode, items with value % 1 > 0 use clip-path to show half a star. Both the full and half items render a separate label/input pair so the underlying model remains accessible.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/rating-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. RatingFieldItem inherits item-level tokens from rating-field.json.',
        excerpt: [
            {
                tokenPath: 'rating-field.item.color',
                value: '{color.text.disabled}',
                type: 'color',
                descriptionKey: 'components.rating_field_item.tokens.item_color',
                descriptionFallback: 'Default (empty) star color.'
            },
            {
                tokenPath: 'rating-field.item.color-active',
                value: '{color.feedback.warning.bg}',
                type: 'color',
                descriptionKey: 'components.rating_field_item.tokens.item_color_active',
                descriptionFallback: 'Star color when filled or hovered.'
            },
            {
                tokenPath: 'rating-field.item.font-size',
                value: '{font.size.2xl}',
                type: 'dimension',
                descriptionKey: 'components.rating_field_item.tokens.item_font_size',
                descriptionFallback: 'Icon size of each star.'
            },
            {
                tokenPath: 'rating-field.item.scale-hover',
                value: '1.15',
                type: 'number',
                descriptionKey: 'components.rating_field_item.tokens.item_scale_hover',
                descriptionFallback: 'Scale transform on hover.'
            },
            {
                tokenPath: 'rating-field.item.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.rating_field_item.tokens.item_transition_duration',
                descriptionFallback: 'Animation duration for scale and color changes.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'value',
                kind: 'number',
                labelKey: 'components.rating_field_item.playground.value',
                labelFallback: 'Value',
                defaultValue: 1
            },
            {
                prop: 'isFilled',
                kind: 'switch',
                labelKey: 'components.rating_field_item.playground.is_filled',
                labelFallback: 'Filled',
                defaultValue: false
            },
            {
                prop: 'fullIcon',
                kind: 'select',
                labelKey: 'components.rating_field_item.playground.full_icon',
                labelFallback: 'Full icon',
                defaultValue: 'mdi-star',
                options: [
                    { label: 'mdi-star', value: 'mdi-star' },
                    { label: 'mdi-heart', value: 'mdi-heart' },
                    { label: 'mdi-thumb-up', value: 'mdi-thumb-up' }
                ]
            },
            {
                prop: 'emptyIcon',
                kind: 'select',
                labelKey: 'components.rating_field_item.playground.empty_icon',
                labelFallback: 'Empty icon',
                defaultValue: 'mdi-star-outline',
                options: [
                    { label: 'mdi-star-outline', value: 'mdi-star-outline' },
                    { label: 'mdi-heart-outline', value: 'mdi-heart-outline' },
                    { label: 'mdi-thumb-up-outline', value: 'mdi-thumb-up-outline' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.rating_field_item.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
