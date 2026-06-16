/**
 * /components/textarea-field — full documentation data for OrigamTextareaField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/TextareaField/textarea-field.interface.ts  (props)
 *   - packages/ds/src/components/TextareaField/OrigamTextareaField.vue      (template, defineExpose)
 *   - packages/ds/tokens/component/textarea-field.json                      (CSS tokens)
 *
 * FAMILY: rich-toolbar (RichToolbar sub-component, shown in rich mode).
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

export const TEXTAREA_FIELD_DOC: IComponentDoc = {
    slug: 'textarea-field',
    name: 'TextareaField',
    tag: 'origam-textarea-field',
    icon: 'mdi-text-box-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.textarea_field.description',
    descriptionFallback: 'Multi-line textarea with auto-grow, manual resize, counter, and an optional rich-text (contenteditable) mode with a formatting toolbar.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-textareafield--design',
    docUrl: 'http://localhost:4000/components/TextareaField/OrigamTextareaField',

    family: [
        {
            slug: 'rich-toolbar',
            name: 'RichToolbar',
            descriptionKey: 'components.catalog.rich_toolbar.description',
            descriptionFallback: 'Formatting toolbar shown above a rich TextareaField.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.model_value.description',
            descriptionFallback: 'Current textarea value. Synced via v-model.'
        },
        {
            name: 'autoGrow',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.auto_grow.description',
            descriptionFallback: 'Automatically grows the textarea height to fit its content (up to maxRows).'
        },
        {
            name: 'rows',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '5',
            descriptionKey: 'components.textarea_field.props.rows.description',
            descriptionFallback: 'Initial number of visible text rows.'
        },
        {
            name: 'maxRows',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.max_rows.description',
            descriptionFallback: 'Maximum rows when autoGrow is enabled. Beyond this the area scrolls.'
        },
        {
            name: 'noResize',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.no_resize.description',
            descriptionFallback: 'Disables the manual resize grip.'
        },
        {
            name: 'counter',
            type: { label: 'boolean | number | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.counter.description',
            descriptionFallback: 'Shows a character counter. Pass a number to set the max limit (shown as n/max).'
        },
        {
            name: 'autofocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.autofocus.description',
            descriptionFallback: 'Focuses the textarea on mount.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.placeholder.description',
            descriptionFallback: 'Placeholder text displayed when the field is empty.'
        },
        {
            name: 'persistentPlaceholder',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.persistent_placeholder.description',
            descriptionFallback: 'Shows the placeholder even when the field has a value.'
        },
        {
            name: 'persistentCounter',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.persistent_counter.description',
            descriptionFallback: 'Shows the counter even when the field is not focused.'
        },
        {
            name: 'prefix',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.prefix.description',
            descriptionFallback: 'Non-editable prefix shown inside the field before the text.'
        },
        {
            name: 'suffix',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.suffix.description',
            descriptionFallback: 'Non-editable suffix shown inside the field after the text.'
        },
        {
            name: 'persistentClear',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.persistent_clear.description',
            descriptionFallback: 'Always shows the clear button (not just on focus/hover).'
        },
        // ── IFieldProps ────────────────────────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.label.description',
            descriptionFallback: 'Field label text.'
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.hint.description',
            descriptionFallback: 'Helper text below the field.'
        },
        {
            name: 'persistentHint',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.persistent_hint.description',
            descriptionFallback: 'Always shows the hint (not just on focus).'
        },
        {
            name: 'errorMessages',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.error_messages.description',
            descriptionFallback: 'Validation error messages shown below the field in error state.'
        },
        // ── Rich mode props ────────────────────────────────────────────
        {
            name: 'mode',
            type: { label: 'TTextareaMode', slug: 'textarea-mode', kind: 'type' },
            defaultValue: "'plain'",
            descriptionKey: 'components.textarea_field.props.mode.description',
            descriptionFallback: "Render mode. 'plain' (default) = standard <textarea>. 'rich' = contenteditable surface + formatting toolbar."
        },
        {
            name: 'output',
            type: { label: 'TTextareaOutput', slug: 'textarea-output', kind: 'type' },
            defaultValue: "'html'",
            descriptionKey: 'components.textarea_field.props.output.description',
            descriptionFallback: "When mode='rich', format of the emitted value. 'html' (default) emits sanitised HTML, 'markdown' emits a CommonMark subset."
        },
        {
            name: 'toolbar',
            type: { label: 'ReadonlyArray<TTextareaToolbarCommand> | false', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.toolbar.description',
            descriptionFallback: "Ordered list of toolbar commands in rich mode. Pass false to hide the toolbar entirely."
        },
        {
            name: 'toolbarPosition',
            type: { label: 'TTextareaToolbarPosition', slug: 'textarea-toolbar-position', kind: 'type' },
            defaultValue: "'top'",
            descriptionKey: 'components.textarea_field.props.toolbar_position.description',
            descriptionFallback: "Position of the toolbar relative to the editing surface in rich mode: 'top' or 'bottom'."
        },
        // ── IStatusProps ───────────────────────────────────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.disabled.description',
            descriptionFallback: 'Disables the textarea.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.textarea_field.props.readonly.description',
            descriptionFallback: 'Makes the textarea non-editable.'
        },
        // ── IColorProps / IDensityProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.textarea_field.props.color.description',
            descriptionFallback: 'Active state color (focus ring, floating label).'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.textarea_field.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density of the field.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.textarea_field.emits.update_model_value.description',
            descriptionFallback: 'Emitted on every input event.'
        },
        {
            event: 'update:height',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.textarea_field.emits.update_height.description',
            descriptionFallback: 'Emitted when the textarea height changes in autoGrow mode.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.textarea_field.emits.click_control.description',
            descriptionFallback: 'Fired when the user clicks the textarea control area.'
        },
        {
            event: 'mousedown:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.textarea_field.emits.mousedown_control.description',
            descriptionFallback: 'Fired on mousedown on the control area.'
        },
        {
            event: 'format',
            payload: { label: 'TTextareaToolbarCommand', slug: '', kind: 'primitive' },
            descriptionKey: 'components.textarea_field.emits.format.description',
            descriptionFallback: 'Emitted when a rich-text toolbar command is applied (click or keyboard shortcut).'
        }
    ],

    slots: [
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.prepend.description',
            descriptionFallback: 'Content placed before the field (outside the input chrome).'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.append.description',
            descriptionFallback: 'Content placed after the field (outside the input chrome).'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.prepend_inner.description',
            descriptionFallback: 'Content placed inside the field before the textarea element.'
        },
        {
            slot: 'appendInner',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.append_inner.description',
            descriptionFallback: 'Content placed inside the field after the textarea element.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.label.description',
            descriptionFallback: 'Replaces the label element.'
        },
        {
            slot: 'floatingLabel',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.floating_label.description',
            descriptionFallback: 'Replaces the floating label clone shown in the notch.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.textarea_field.slots.loader.description',
            descriptionFallback: 'Custom loading indicator shown while loading=true.'
        },
        {
            slot: 'counter',
            slotProps: '{ counter: string, max?: string | number, value: string | number }',
            descriptionKey: 'components.textarea_field.slots.counter.description',
            descriptionFallback: 'Replaces the character counter with custom content.'
        },
        {
            slot: 'toolbar',
            slotProps: 'ITextareaToolbarSlotProps',
            descriptionKey: 'components.textarea_field.slots.toolbar.description',
            descriptionFallback: 'Replaces the entire rich-text toolbar (rich mode only).'
        },
        {
            slot: 'toolbar-item',
            slotProps: '{ command, label, icon, isActive, onClick }',
            descriptionKey: 'components.textarea_field.slots.toolbar_item.description',
            descriptionFallback: 'Replaces a single toolbar button in rich mode.'
        }
    ],

    examples: [
        {
            titleKey: 'components.textarea_field.examples.basic.title',
            titleFallback: 'Basic textarea',
            lang: 'vue',
            code: `<template>
  <origam-textarea-field
    v-model="text"
    label="Description"
    placeholder="Enter description…"
    :rows="4"
    :counter="500"
  />
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>`
        },
        {
            titleKey: 'components.textarea_field.examples.auto_grow.title',
            titleFallback: 'Auto-grow',
            lang: 'vue',
            code: `<template>
  <origam-textarea-field
    v-model="bio"
    label="Biography"
    :auto-grow="true"
    :rows="2"
    :max-rows="8"
    :no-resize="true"
  />
</template>

<script setup>
import { ref } from 'vue'
const bio = ref('')
</script>`
        },
        {
            titleKey: 'components.textarea_field.examples.rich.title',
            titleFallback: 'Rich text mode',
            lang: 'vue',
            code: `<template>
  <origam-textarea-field
    v-model="html"
    label="Rich content"
    mode="rich"
    output="html"
    toolbar-position="top"
  />
</template>

<script setup>
import { ref } from 'vue'
const html = ref('<p>Start typing…</p>')
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-textarea-field',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamTextareaField',
        svgDesc: 'Schematic of the TextareaField component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="20" width="644" height="220" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="48" y="58" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Description</text>
  <rect x="48" y="68" width="604" height="36" rx="3" fill="var(--origam-color__surface---sunken, #f8f5ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="60" y="91" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">B  I  U  code  link  ≡  1. ▼H</text>
  <rect x="48" y="112" width="604" height="88" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="60" y="140" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="sans-serif">Start typing rich content here…</text>
  <rect x="628" y="192" width="16" height="8" rx="2" fill="var(--origam-color__border---default, rgba(168,85,247,0.5))"/>
  <text x="400" y="222" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="end" font-family="'JetBrains Mono',monospace">0 / 500</text>
  <circle cx="36" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="56.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="56" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="68.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="56" cy="108" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="112.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="636" cy="192" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="636" y="196.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
  <circle cx="408" cy="218" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="408" y="222.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">6</text>
  <line x1="46" y1="20" x2="80" y2="6" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="6" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-textarea-field</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-textarea-field&gt;</code> — 6 internal parts: root ①, label ②, rich toolbar ③ (rich mode only), editing surface ④, resize grip ⑤, counter ⑥.`,
        legend: [
            {
                num: 1,
                cls: '.origam-textarea-field',
                descriptionKey: 'components.textarea_field.anatomy.root',
                descriptionFallback: 'Root element. Wraps the OrigamField chrome (label, messages, prepend/append).'
            },
            {
                num: 2,
                cls: '.origam-field__label',
                descriptionKey: 'components.textarea_field.anatomy.label',
                descriptionFallback: 'OrigamLabel rendered above the input surface.'
            },
            {
                num: 3,
                cls: '.origam-rich-toolbar',
                descriptionKey: 'components.textarea_field.anatomy.toolbar',
                descriptionFallback: 'Formatting toolbar (rich mode only). Position top/bottom driven by toolbarPosition prop.'
            },
            {
                num: 4,
                cls: '.origam-textarea-field__surface',
                descriptionKey: 'components.textarea_field.anatomy.surface',
                descriptionFallback: 'The editing surface. In plain mode: a native <textarea>. In rich mode: a contenteditable div.'
            },
            {
                num: 5,
                cls: '.origam-textarea-field__grip',
                descriptionKey: 'components.textarea_field.anatomy.grip',
                descriptionFallback: 'Manual resize grip shown when noResize=false and autoGrow=false.'
            },
            {
                num: 6,
                cls: '.origam-textarea-field__counter',
                descriptionKey: 'components.textarea_field.anatomy.counter',
                descriptionFallback: 'Character counter shown when counter prop is set.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-textarea-field__textarea---opacity',
            defaultValue: '0',
            descriptionKey: 'components.textarea_field.css_vars.textarea_opacity',
            descriptionFallback: 'Initial opacity of the textarea (revealed on activation to 1).'
        },
        {
            name: '--origam-textarea-field__textarea---opacity-active',
            defaultValue: '1',
            descriptionKey: 'components.textarea_field.css_vars.textarea_opacity_active',
            descriptionFallback: 'Active textarea opacity.'
        },
        {
            name: '--origam-textarea-field__textarea---transition-duration',
            defaultValue: '0.15s',
            descriptionKey: 'components.textarea_field.css_vars.textarea_transition_duration',
            descriptionFallback: 'Fade-in duration for the textarea.'
        },
        {
            name: '--origam-textarea-field__grip---border-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.textarea_field.css_vars.grip_border_color',
            descriptionFallback: 'Border color of the resize grip handle.'
        },
        {
            name: '--origam-textarea-field__grip---opacity',
            defaultValue: '{opacity.26}',
            descriptionKey: 'components.textarea_field.css_vars.grip_opacity',
            descriptionFallback: 'Resting opacity of the grip handle.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar---bg-color',
            defaultValue: '{color.surface.sunken}',
            descriptionKey: 'components.textarea_field.css_vars.toolbar_bg',
            descriptionFallback: 'Toolbar background (tinted vs. editor surface).'
        },
        {
            name: '--origam-textarea-field__rich-toolbar---border-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.textarea_field.css_vars.toolbar_border',
            descriptionFallback: 'Toolbar border color.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.textarea_field.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.textarea_field.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.textarea_field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.textarea_field.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.textarea_field.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.textarea_field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['textbox'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.textarea_field.a11y.key_tab',
                actionFallback: 'Focuses the textarea.'
            },
            {
                key: 'Shift+Tab',
                actionKey: 'components.textarea_field.a11y.key_shift_tab',
                actionFallback: 'Moves focus to the previous interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.textarea_field.a11y.label_note',
                noteFallback: 'The label prop generates an <origam-label> with a for= attribute pointing to the textarea id. Always use label or aria-label to identify the field.'
            },
            {
                noteKey: 'components.textarea_field.a11y.rich_note',
                noteFallback: 'In rich mode the contenteditable div has role="textbox" aria-multiline="true". Toolbar buttons expose aria-pressed for toggle commands (bold, italic, etc.).'
            },
            {
                noteKey: 'components.textarea_field.a11y.counter_note',
                noteFallback: 'When counter is set, the textarea has aria-describedby pointing to the counter element. Screen readers announce the remaining character count.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/textarea-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'textarea-field.textarea.opacity',
                value: '{opacity.0}',
                type: 'number',
                descriptionKey: 'components.textarea_field.tokens.textarea_opacity',
                descriptionFallback: 'Initial textarea opacity (revealed on mount).'
            },
            {
                tokenPath: 'textarea-field.textarea.transition-duration',
                value: '0.15s',
                type: 'duration',
                descriptionKey: 'components.textarea_field.tokens.textarea_transition',
                descriptionFallback: 'Fade-in duration.'
            },
            {
                tokenPath: 'textarea-field.grip.border-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.textarea_field.tokens.grip_border',
                descriptionFallback: 'Resize grip border color.'
            },
            {
                tokenPath: 'textarea-field.rich-toolbar.bg-color',
                value: '{color.surface.sunken}',
                type: 'color',
                descriptionKey: 'components.textarea_field.tokens.toolbar_bg',
                descriptionFallback: 'Rich toolbar background.'
            },
            {
                tokenPath: 'textarea-field.rich-toolbar.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.textarea_field.tokens.toolbar_radius',
                descriptionFallback: 'Rich toolbar border radius.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.textarea_field.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Description'
            },
            {
                prop: 'placeholder',
                kind: 'text',
                labelKey: 'components.textarea_field.playground.placeholder',
                labelFallback: 'Placeholder',
                defaultValue: 'Enter text…'
            },
            {
                prop: 'rows',
                kind: 'number',
                labelKey: 'components.textarea_field.playground.rows',
                labelFallback: 'Rows',
                defaultValue: 4
            },
            {
                prop: 'autoGrow',
                kind: 'switch',
                labelKey: 'components.textarea_field.playground.auto_grow',
                labelFallback: 'Auto-grow',
                defaultValue: false
            },
            {
                prop: 'noResize',
                kind: 'switch',
                labelKey: 'components.textarea_field.playground.no_resize',
                labelFallback: 'No resize',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.textarea_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.textarea_field.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
