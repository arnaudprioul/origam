/**
 * /components/field — full documentation data for OrigamField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Field/field.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/Field/OrigamField.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/field.json              (CSS tokens)
 *
 * NOTE: OrigamField is the shared primitive for all input components
 * (TextField, NumberField, PasswordField, TextareaField, OtpInputField, etc.).
 * It is not rendered directly by consumers — use a specific input field component.
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

export const FIELD_DOC: IComponentDoc = {
    slug: 'field',
    name: 'Field',
    tag: 'origam-field',
    icon: 'mdi-form-textbox',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.field.description',
    descriptionFallback: 'Shared form-field shell used by all input components (TextField, NumberField, PasswordField…). Provides the label, prefix/suffix, prepend/append-inner zones, loader, outline/underline rendering and error state. Not intended for direct use — consume through a specific input component.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-field--design',
    docUrl: 'http://localhost:4000/components/Field/OrigamField',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'Standard single-line text input built on top of Field.'
        },
        {
            slug: 'file-field',
            name: 'FileField',
            kind: 'component',
            descriptionKey: 'components.catalog.file_field.description',
            descriptionFallback: 'File upload field with dropzone and chip display modes.'
        }
    ],

    props: [
        // ── Own props ─────────────────────────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.label.description',
            descriptionFallback: 'Floating label text. Floats above the field when focused or dirty.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.disabled.description',
            descriptionFallback: 'Disables all interaction. Sets opacity to 0.5.'
        },
        {
            name: 'error',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.error.description',
            descriptionFallback: 'Error state. true = visual error (--error modifier). string = error AND becomes the inline message for consumers that display it (e.g. FileField dropzone).'
        },
        {
            name: 'dirty',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.dirty.description',
            descriptionFallback: 'Forces the field into its "filled/dirty" state (label floats, clearable icon shown).'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.flat.description',
            descriptionFallback: 'Removes the box shadow on solo variants.'
        },
        {
            name: 'inline',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.inline.description',
            descriptionFallback: 'Renders the field inline (display: inline-flex) instead of full-width.'
        },
        {
            name: 'prefix',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.prefix.description',
            descriptionFallback: 'Non-editable text shown before the input value (e.g. "$" or "https://").'
        },
        {
            name: 'suffix',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.suffix.description',
            descriptionFallback: 'Non-editable text shown after the input value (e.g. ".com" or "kg").'
        },
        {
            name: 'persistentClear',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.persistent_clear.description',
            descriptionFallback: 'Shows the clear icon even when the field is not focused.'
        },
        {
            name: 'reverse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.reverse.description',
            descriptionFallback: 'Reverses the icon/input layout direction (RTL-like swap).'
        },
        {
            name: 'singleLine',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.single_line.description',
            descriptionFallback: 'Prevents the label from floating — the placeholder is shown instead.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.required.description',
            descriptionFallback: 'Marks the field as required. Appends an asterisk to the label.'
        },
        {
            name: 'centerAffix',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.field.props.center_affix.description',
            descriptionFallback: 'When true, vertically centres the prepend/append inner icons relative to the field height.'
        },
        // ── IVariantProps ──────────────────────────────────────────────
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.field.props.variant.description',
            descriptionFallback: "Visual style. Values: 'outlined' | 'underlined' | 'filled' | 'solo' | 'solo-filled' | 'solo-inverted' | 'plain'."
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.field.props.density.description',
            descriptionFallback: 'Field density: compact, comfortable or default.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.field.props.size.description',
            descriptionFallback: 'Height tier: x-small (28px), small, default (36px), large (44px), x-large (52px).'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.color.description',
            descriptionFallback: 'Active (focused) border and label colour.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.bg_color.description',
            descriptionFallback: 'Field background colour (relevant for filled/solo variants).'
        },
        // ── IAdjacentInnerProps ────────────────────────────────────────
        {
            name: 'prependInnerIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.prepend_inner_icon.description',
            descriptionFallback: 'Icon displayed inside the field before the input value.'
        },
        {
            name: 'appendInnerIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.append_inner_icon.description',
            descriptionFallback: 'Icon displayed inside the field after the input value.'
        },
        {
            name: 'clearIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-close-circle-outline'",
            descriptionKey: 'components.field.props.clear_icon.description',
            descriptionFallback: 'Icon shown in the clearable button.'
        },
        {
            name: 'clearable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.clearable.description',
            descriptionFallback: 'Shows a clear button when the field has a value.'
        },
        // ── ILoaderProps ──────────────────────────────────────────────
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.field.props.loading.description',
            descriptionFallback: 'Shows a progress loader at the bottom of the field.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.field.props.rounded.description',
            descriptionFallback: 'Border-radius override. true = theme default, pill = full round.'
        }
    ],

    emits: [
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.field.emits.focus.description',
            descriptionFallback: 'Fired when the inner input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.field.emits.blur.description',
            descriptionFallback: 'Fired when the inner input loses focus.'
        },
        {
            event: 'click:prepend-inner',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.field.emits.click_prepend_inner.description',
            descriptionFallback: 'Fired when the prepend-inner zone is clicked.'
        },
        {
            event: 'click:append-inner',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.field.emits.click_append_inner.description',
            descriptionFallback: 'Fired when the append-inner zone is clicked.'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.field.emits.click_clear.description',
            descriptionFallback: 'Fired when the clear button is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ id, aria-describedby, isActive, isFocused, ref, onBlur, onFocus }',
            descriptionKey: 'components.field.slots.default.description',
            descriptionFallback: 'The native input element slot. Provides ref binding and focus handlers for wiring up a <input>, <textarea>, or custom control.'
        },
        {
            slot: 'label',
            slotProps: '{ label, required }',
            descriptionKey: 'components.field.slots.label.description',
            descriptionFallback: 'Replaces the floating label with custom markup.'
        },
        {
            slot: 'floatingLabel',
            slotProps: '{ label, required }',
            descriptionKey: 'components.field.slots.floating_label.description',
            descriptionFallback: 'Replaces only the floated (above-field) label state.'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.field.slots.prepend_inner.description',
            descriptionFallback: 'Content placed inside the field before the input value.'
        },
        {
            slot: 'appendInner',
            slotProps: '—',
            descriptionKey: 'components.field.slots.append_inner.description',
            descriptionFallback: 'Content placed inside the field after the input value.'
        },
        {
            slot: 'prefix',
            slotProps: '—',
            descriptionKey: 'components.field.slots.prefix.description',
            descriptionFallback: 'Replaces the prefix text with custom markup.'
        },
        {
            slot: 'suffix',
            slotProps: '—',
            descriptionKey: 'components.field.slots.suffix.description',
            descriptionFallback: 'Replaces the suffix text with custom markup.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.field.slots.loader.description',
            descriptionFallback: 'Custom loader shown at the bottom of the field when loading is active.'
        }
    ],

    examples: [
        {
            titleKey: 'components.field.examples.variants.title',
            titleFallback: 'Field variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <origam-text-field label="Outlined (default)" variant="outlined" />
    <origam-text-field label="Underlined" variant="underlined" />
    <origam-text-field label="Filled" variant="filled" />
    <origam-text-field label="Solo" variant="solo" />
    <origam-text-field label="Plain" variant="plain" />
  </div>
</template>`
        },
        {
            titleKey: 'components.field.examples.affixes.title',
            titleFallback: 'Prefix / suffix / inner icons',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    <origam-text-field label="Price" prefix="$" suffix="USD" />
    <origam-text-field label="Search" prepend-inner-icon="mdi-magnify" clearable />
    <origam-text-field label="Password" append-inner-icon="mdi-eye" />
  </div>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-field',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamField',
        svgDesc: 'Schematic of the Field component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="60" width="644" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="40" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__label (floating)</text>
  <rect x="28" y="56" width="200" height="16" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.1))"/>
  <rect x="28" y="134" width="644" height="2" rx="1" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.3))"/>
  <text x="350" y="150" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">loader (OrigamProgress)</text>
  <rect x="48" y="72" width="60" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="78" y="104" font-size="7.5" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">prepend</text>
  <rect x="116" y="72" width="40" height="56" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="136" y="104" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">prefix</text>
  <rect x="164" y="72" width="300" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="314" y="104" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">__input (#default slot)</text>
  <rect x="472" y="72" width="40" height="56" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="492" y="104" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">suffix</text>
  <rect x="520" y="72" width="40" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="540" y="104" font-size="7.5" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">clear</text>
  <rect x="568" y="72" width="84" height="56" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="610" y="104" font-size="7.5" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">append</text>
  <circle cx="36" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="72" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-field&gt;</code> — 7 internal zones. The field is a CSS Grid with columns: prepend-inner / input / clear / append-inner. Label floats above the top edge when active.`,
        legend: [
            {
                num: 1,
                cls: '.origam-field',
                descriptionKey: 'components.field.anatomy.root',
                descriptionFallback: 'Root grid container. display: grid; grid-template-areas: "prepend-inner field clear append-inner".'
            },
            {
                num: 2,
                cls: '.origam-field__overlay',
                descriptionKey: 'components.field.anatomy.overlay',
                descriptionFallback: 'Interaction scrim (hover/focus ripple). pointer-events: none.'
            },
            {
                num: 3,
                cls: '.origam-field__prepend-inner',
                descriptionKey: 'components.field.anatomy.prepend_inner',
                descriptionFallback: 'Leading icon/avatar zone inside the field border.'
            },
            {
                num: 4,
                cls: '.origam-field__field',
                descriptionKey: 'components.field.anatomy.field',
                descriptionFallback: 'Input area containing label, prefix, #default slot and suffix.'
            },
            {
                num: 5,
                cls: '.origam-field__clearable',
                descriptionKey: 'components.field.anatomy.clearable',
                descriptionFallback: 'Clear icon button. Shown when clearable=true and field is dirty/focused.'
            },
            {
                num: 6,
                cls: '.origam-field__append-inner',
                descriptionKey: 'components.field.anatomy.append_inner',
                descriptionFallback: 'Trailing icon/avatar zone inside the field border.'
            },
            {
                num: 7,
                cls: '.origam-field__loader',
                descriptionKey: 'components.field.anatomy.loader',
                descriptionFallback: 'Progress bar at the bottom of the field. Rendered when loading is active and kind !== skeleton.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-field origam-field--variant-outlined">
  <!-- interaction overlay -->
  <div class="origam-field__overlay" />

  <!-- loader (OrigamProgress) — v-if hasLoader -->
  <div class="origam-field__loader"><origam-progress /></div>

  <!-- prepend inner icon / avatar -->
  <div class="origam-field__prepend-inner">
    <slot name="prependInner" />
  </div>

  <!-- input area: label + prefix + #default + suffix -->
  <div class="origam-field__field">
    <label class="origam-field__label">{{ label }}</label>
    <span class="origam-field__prefix">{{ prefix }}</span>
    <slot name="default" v-bind="slotProps" />
    <span class="origam-field__suffix">{{ suffix }}</span>
  </div>

  <!-- clearable button — v-if showClear -->
  <div class="origam-field__clearable">
    <origam-icon :icon="clearIcon" />
  </div>

  <!-- append inner icon / avatar -->
  <div class="origam-field__append-inner">
    <slot name="appendInner" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-field',
                descriptionKey: 'components.field.anatomy.root',
                descriptionFallback: 'Root grid container.'
            },
            {
                cls: 'origam-field--variant-outlined',
                descriptionKey: 'components.field.anatomy.variant_outlined',
                descriptionFallback: 'Variant modifier. One of: outlined, underlined, filled, solo, solo-filled, solo-inverted, plain.'
            },
            {
                cls: 'origam-field--focused',
                descriptionKey: 'components.field.anatomy.focused',
                descriptionFallback: 'Applied when the embedded input has focus.'
            },
            {
                cls: 'origam-field--error',
                descriptionKey: 'components.field.anatomy.error',
                descriptionFallback: 'Applied when the error prop is truthy. Changes border and label colour to the danger semantic.'
            },
            {
                cls: 'origam-field__overlay',
                descriptionKey: 'components.field.anatomy.overlay',
                descriptionFallback: 'Interaction scrim layer.'
            },
            {
                cls: 'origam-field__field',
                descriptionKey: 'components.field.anatomy.field',
                descriptionFallback: 'Core input region containing label, prefix, slot and suffix.'
            },
            {
                cls: 'origam-field__prepend-inner',
                descriptionKey: 'components.field.anatomy.prepend_inner',
                descriptionFallback: 'Leading inner icon/avatar zone.'
            },
            {
                cls: 'origam-field__append-inner',
                descriptionKey: 'components.field.anatomy.append_inner',
                descriptionFallback: 'Trailing inner icon/avatar zone.'
            },
            {
                cls: 'origam-field__clearable',
                descriptionKey: 'components.field.anatomy.clearable',
                descriptionFallback: 'Clear button zone.'
            },
            {
                cls: 'origam-field__loader',
                descriptionKey: 'components.field.anatomy.loader',
                descriptionFallback: 'Progress loader zone at the bottom.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-field---border-radius',
            defaultValue: '{radius.sm} (4px)',
            descriptionKey: 'components.field.css_vars.border_radius',
            descriptionFallback: 'Field corner radius. Overridden by the rounded prop.'
        },
        {
            name: '--origam-field---border-color',
            defaultValue: '{color.border.default}',
            descriptionKey: 'components.field.css_vars.border_color',
            descriptionFallback: 'Default outline/underline colour.'
        },
        {
            name: '--origam-field---border-width',
            defaultValue: '{border.width.thin}',
            descriptionKey: 'components.field.css_vars.border_width',
            descriptionFallback: 'Border width for outlined/underlined variants.'
        },
        {
            name: '--origam-field---border-opacity',
            defaultValue: '0.38',
            descriptionKey: 'components.field.css_vars.border_opacity',
            descriptionFallback: 'Border opacity at rest. Transitions to 1 on focus.'
        },
        {
            name: '--origam-field---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.field.css_vars.color',
            descriptionFallback: 'Field text colour inherited by the input.'
        },
        {
            name: '--origam-field---font-size',
            defaultValue: '16px',
            descriptionKey: 'components.field.css_vars.font_size',
            descriptionFallback: 'Input font size.'
        },
        {
            name: '--origam-field---opacity-disabled',
            defaultValue: '0.5',
            descriptionKey: 'components.field.css_vars.opacity_disabled',
            descriptionFallback: 'Opacity when disabled.'
        },
        {
            name: '--origam-field---transition-duration',
            defaultValue: '{motion.duration.normal}',
            descriptionKey: 'components.field.css_vars.transition_duration',
            descriptionFallback: 'Duration for label float, border and opacity transitions.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.field.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props to the embedded input element.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.field.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.field.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.field.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        },
        {
            name: 'styleId',
            type: 'string',
            descriptionKey: 'components.field.exposed.style_id',
            descriptionFallback: 'Secondary style ID used for variant-level scoped styles.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.field.a11y.key_tab',
                actionFallback: 'Moves focus to the embedded input element (passed via #default slot).'
            },
            {
                key: 'Escape',
                actionKey: 'components.field.a11y.key_escape',
                actionFallback: 'Clears the field when clearable=true and focus is inside the field.'
            }
        ],
        notes: [
            {
                noteKey: 'components.field.a11y.label_for',
                noteFallback: 'The floating label is wired to the input via the id passed through the default slot props. Consumers must bind the id from slotProps to their <input> id attribute.'
            },
            {
                noteKey: 'components.field.a11y.aria_describedby',
                noteFallback: 'The aria-describedby attribute is provided through the default slot props and must be forwarded to the native <input> so screen readers read associated messages.'
            },
            {
                noteKey: 'components.field.a11y.error_state',
                noteFallback: 'When error is truthy, the --error modifier class is applied. Consumers are responsible for adding aria-invalid="true" to the native input.'
            },
            {
                noteKey: 'components.field.a11y.required',
                noteFallback: 'The required prop appends * to the label. The native required attribute must be added to the <input> element directly by the consuming component.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'field.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.field.tokens.border_radius',
                descriptionFallback: 'Field corner radius (4px).'
            },
            {
                tokenPath: 'field.border-color',
                value: '{color.border.default}',
                type: 'color',
                descriptionKey: 'components.field.tokens.border_color',
                descriptionFallback: 'Default border colour.'
            },
            {
                tokenPath: 'field.border-opacity',
                value: '0.38',
                type: 'number',
                descriptionKey: 'components.field.tokens.border_opacity',
                descriptionFallback: 'Border opacity at rest (translucent on inactive state).'
            },
            {
                tokenPath: 'field.font-size',
                value: '16px',
                type: 'dimension',
                descriptionKey: 'components.field.tokens.font_size',
                descriptionFallback: 'Base input font size.'
            },
            {
                tokenPath: 'field.input.padding-block-md',
                value: '6px',
                type: 'dimension',
                descriptionKey: 'components.field.tokens.input_padding_block_md',
                descriptionFallback: 'Block padding for size=default (36px control). Centres input text vertically.'
            },
            {
                tokenPath: 'field.error.border-color',
                value: '{color.feedback.danger.border}',
                type: 'color',
                descriptionKey: 'components.field.tokens.error_border_color',
                descriptionFallback: 'Border colour in error state.'
            }
        ]
    } satisfies IComponentTokens
}
