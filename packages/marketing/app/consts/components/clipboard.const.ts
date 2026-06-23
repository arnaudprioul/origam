/**
 * /components/clipboard — full documentation data for OrigamClipboard.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Clipboard/clipboard.interface.ts  (IClipboardProps, IClipboardEmits, IClipboardSlots)
 *   - packages/ds/src/components/Clipboard/OrigamClipboard.vue     (template, defineExpose)
 *   - packages/ds/tokens/component/clipboard.json                  (CSS tokens)
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

export const CLIPBOARD_DOC: IComponentDoc = {
    slug: 'clipboard',
    name: 'Clipboard',
    tag: 'origam-clipboard',
    icon: 'mdi-content-copy',
    category: 'Utility',
    descriptionKey: 'components.catalog.clipboard.description',
    descriptionFallback: 'Chrome-less copy-to-clipboard wrapper. Owns the navigator.clipboard.writeText pipeline and an auto-resetting "copied" flag. The default trigger is a single icon button; replace it entirely via the default scoped slot.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-clipboard--design',
    docUrl: 'http://localhost:4000/components/Clipboard/OrigamClipboard',

    family: [],
    related: [
        {
            slug: 'code',
            name: 'Code',
            kind: 'component',
            descriptionKey: 'components.catalog.code.description',
            descriptionFallback: 'Code block component that embeds a Clipboard copy button.'
        }
    ],

    props: [
        {
            name: 'value',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.clipboard.props.value.description',
            descriptionFallback: 'Text payload written to the clipboard on copy(). Re-read on each trigger so a parent that mutates the value between calls always copies the latest string.'
        },
        {
            name: 'feedbackDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '2000',
            descriptionKey: 'components.clipboard.props.feedback_duration.description',
            descriptionFallback: 'Duration in ms that the copied flag stays true after a successful write before auto-resetting.'
        },
        {
            name: 'feedbackText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Copied!'",
            descriptionKey: 'components.clipboard.props.feedback_text.description',
            descriptionFallback: 'Label shown inside the built-in trigger while copied is true. Pass a translated string for full i18n.'
        },
        {
            name: 'successText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.clipboard.props.success_text.description',
            descriptionFallback: 'Alias for feedbackText. Takes precedence when both are provided.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.clipboard.props.disabled.description',
            descriptionFallback: 'Disables the copy action. The default trigger becomes non-interactive; the scoped slot still receives copy() but it short-circuits.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'span'",
            descriptionKey: 'components.clipboard.props.tag.description',
            descriptionFallback: 'HTML root element tag.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.clipboard.props.color.description',
            descriptionFallback: 'Foreground color applied to the clipboard root.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.clipboard.props.bg_color.description',
            descriptionFallback: 'Background color applied to the clipboard root.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.clipboard.props.border.description',
            descriptionFallback: 'Applies a border to the root element.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.clipboard.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the root element.'
        },
        // ── IMarginProps / IPaddingProps ───────────────────────────────
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.clipboard.props.margin.description',
            descriptionFallback: 'Margin applied to the root element.'
        },
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.clipboard.props.padding.description',
            descriptionFallback: 'Padding applied to the root element.'
        }
    ],

    emits: [
        {
            event: 'copy',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.clipboard.emits.copy.description',
            descriptionFallback: 'Fired after a successful clipboard write. Carries the payload string.'
        },
        {
            event: 'error',
            payload: { label: 'Error', slug: '', kind: 'primitive' },
            descriptionKey: 'components.clipboard.emits.error.description',
            descriptionFallback: 'Fired after a failed write (clipboard API denied, no permission, etc.).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ copy, copied, error }',
            descriptionKey: 'components.clipboard.slots.default.description',
            descriptionFallback: 'Custom trigger. Receives copy() (async), copied (boolean) and error (Error | null). When omitted the component renders a default icon button with mdi-content-copy.'
        },
        {
            slot: 'feedback',
            slotProps: '{ copied }',
            descriptionKey: 'components.clipboard.slots.feedback.description',
            descriptionFallback: 'Custom feedback marker rendered when copied is true. Receives the copied boolean for symmetry with the default slot.'
        }
    ],

    examples: [
        {
            titleKey: 'components.clipboard.examples.basic.title',
            titleFallback: 'Default trigger',
            lang: 'vue',
            code: `<template>
  <!-- Built-in copy button with animated icon + "Copied!" label -->
  <origam-clipboard value="npm install origam" @copy="onCopy" />
</template>`
        },
        {
            titleKey: 'components.clipboard.examples.custom_trigger.title',
            titleFallback: 'Custom trigger via slot',
            lang: 'vue',
            code: `<template>
  <origam-clipboard :value="code" @copy="toast('Copied!')">
    <template #default="{ copy, copied }">
      <origam-btn
        :color="copied ? 'success' : 'primary'"
        :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
        :text="copied ? 'Copied!' : 'Copy code'"
        variant="tonal"
        @click="copy"
      />
    </template>
  </origam-clipboard>
</template>`
        },
        {
            titleKey: 'components.clipboard.examples.inline_code.title',
            titleFallback: 'Inline inside OrigamCode',
            lang: 'vue',
            code: `<template>
  <!-- OrigamCode embeds OrigamClipboard internally via copyable prop -->
  <origam-code
    :code="snippet"
    lang="bash"
    copyable
    compact
    prompt="$"
  />
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-clipboard',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamClipboard',
        svgDesc: 'Schematic of the Clipboard component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="40" width="660" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="40" y="60" width="100" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__action--primary---bg, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="90" y="95" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">default-trigger</text>
  <rect x="160" y="60" width="180" height="60" rx="4" fill="var(--origam-color__feedback--success---bgSubtle, rgba(22,163,74,0.06))" stroke="var(--origam-color__feedback--success---border, rgba(22,163,74,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="250" y="89" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">default-label</text>
  <text x="250" y="104" font-size="9" fill="var(--origam-color__feedback--success---fgSubtle, #16a34a)" text-anchor="middle" font-family="sans-serif">(visible when copied = true)</text>
  <circle cx="28" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="90" cy="54" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="90" y="58" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="250" cy="54" r="10" fill="var(--origam-color__feedback--success---fgSubtle, #16a34a)"/>
  <text x="250" y="58" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="350" y="165" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">② and ③ are the built-in trigger — replaced when #default slot is provided</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-clipboard&gt;</code> — root wrapper + optional default trigger (button + feedback label).`,
        legend: [
            { num: 1, cls: '.origam-clipboard', descriptionKey: 'components.clipboard.anatomy.root', descriptionFallback: 'Root element (default tag: span). Carries BEM modifiers --copied and --disabled.' },
            { num: 2, cls: '.origam-clipboard__default-trigger', descriptionKey: 'components.clipboard.anatomy.trigger', descriptionFallback: 'Built-in trigger button (all: unset). Rendered only when no #default slot is provided.' },
            { num: 3, cls: '.origam-clipboard__default-label', descriptionKey: 'components.clipboard.anatomy.label', descriptionFallback: 'Feedback text label (aria-live="polite"). Visible only when copied=true.' },
            { num: 4, cls: '.origam-clipboard__default-icon', descriptionKey: 'components.clipboard.anatomy.icon', descriptionFallback: 'OrigamIcon inside the default trigger. Switches between mdi-content-copy and mdi-check on copy.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root tag is configurable via 'tag' prop (default: span) -->
<span class="origam-clipboard origam-clipboard--copied">

  <!-- #default scoped slot (your custom trigger) -->
  <slot :copy="handleCopy" :copied="copied" :error="error">

    <!-- built-in trigger: rendered only when no slot is provided -->
    <button
      type="button"
      class="origam-clipboard__default-trigger"
      :disabled="disabled"
      :aria-label="defaultAriaLabel"
      @click="handleCopy"
    >
      <origam-icon
        class="origam-clipboard__default-icon"
        aria-hidden="true"
      />
      <!-- feedback label (aria-live="polite") -->
      <span v-if="copied" class="origam-clipboard__default-label">
        {{ resolvedFeedbackText }}
      </span>
    </button>

  </slot>
</span>`,
        classes: [
            { cls: 'origam-clipboard', descriptionKey: 'components.clipboard.anatomy.root', descriptionFallback: 'Root wrapper element.' },
            { cls: 'origam-clipboard--copied', descriptionKey: 'components.clipboard.anatomy.mod_copied', descriptionFallback: 'BEM modifier present while copied=true.' },
            { cls: 'origam-clipboard--disabled', descriptionKey: 'components.clipboard.anatomy.mod_disabled', descriptionFallback: 'BEM modifier present while disabled=true. Adds cursor: not-allowed.' },
            { cls: 'origam-clipboard__default-trigger', descriptionKey: 'components.clipboard.anatomy.trigger', descriptionFallback: 'Built-in copy button (all: unset).' },
            { cls: 'origam-clipboard__default-icon', descriptionKey: 'components.clipboard.anatomy.icon', descriptionFallback: 'Icon inside the default trigger.' },
            { cls: 'origam-clipboard__default-label', descriptionKey: 'components.clipboard.anatomy.label', descriptionFallback: 'Feedback text label (aria-live).' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-clipboard__feedback---color',
            defaultValue: '{color.feedback.success.fgSubtle}',
            descriptionKey: 'components.clipboard.css_vars.feedback_color',
            descriptionFallback: 'Text color of the default trigger while copied=true.'
        },
        {
            name: '--origam-clipboard__feedback---bg-color',
            defaultValue: '{color.feedback.success.bgSubtle}',
            descriptionKey: 'components.clipboard.css_vars.feedback_bg',
            descriptionFallback: 'Background color of the default trigger while copied=true.'
        },
        {
            name: '--origam-clipboard__feedback---font-size',
            defaultValue: '{font.size.xs}',
            descriptionKey: 'components.clipboard.css_vars.feedback_font_size',
            descriptionFallback: 'Font size of the default trigger.'
        },
        {
            name: '--origam-clipboard__feedback---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.clipboard.css_vars.feedback_border_radius',
            descriptionFallback: 'Border radius of the default trigger button.'
        },
        {
            name: '--origam-clipboard__feedback---gap',
            defaultValue: '{space.1}',
            descriptionKey: 'components.clipboard.css_vars.feedback_gap',
            descriptionFallback: 'Gap between the icon and the feedback label inside the default trigger.'
        },
        {
            name: '--origam-clipboard__feedback---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.clipboard.css_vars.transition_duration',
            descriptionFallback: 'Duration of color and background-color transitions.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'copy',
            type: '() => Promise<boolean>',
            descriptionKey: 'components.clipboard.exposed.copy',
            descriptionFallback: 'Triggers the copy pipeline programmatically. Returns true on success.'
        },
        {
            name: 'copied',
            type: 'Ref<boolean>',
            descriptionKey: 'components.clipboard.exposed.copied',
            descriptionFallback: 'Reactive boolean — true for feedbackDuration ms after a successful copy.'
        },
        {
            name: 'error',
            type: 'Ref<Error | null>',
            descriptionKey: 'components.clipboard.exposed.error',
            descriptionFallback: 'Set when the last copy attempt threw an error. Null otherwise.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.clipboard.a11y.key_tab',
                actionFallback: 'Moves focus to the default trigger button.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.clipboard.a11y.key_activate',
                actionFallback: 'Triggers the copy action from the focused default trigger button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.clipboard.a11y.aria_label',
                noteFallback: 'The default trigger carries a dynamic aria-label that changes from "Copy to clipboard" to "Value copied to clipboard" once copied. Sourced from useLocale for full i18n.'
            },
            {
                noteKey: 'components.clipboard.a11y.aria_live',
                noteFallback: 'The feedback label has aria-live="polite" so screen readers announce the success state without interrupting the current reading.'
            },
            {
                noteKey: 'components.clipboard.a11y.disabled_note',
                noteFallback: 'When disabled=true the default trigger has the disabled HTML attribute; the copy() exposed method short-circuits immediately.'
            },
            {
                noteKey: 'components.clipboard.a11y.custom_slot',
                noteFallback: 'When using a custom #default slot, ensure your trigger element has an appropriate aria-label and keyboard handler (or use origam-btn which handles both).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/clipboard.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'clipboard.feedback.color', value: '{color.feedback.success.fgSubtle}', type: 'color', descriptionKey: 'components.clipboard.tokens.color', descriptionFallback: 'Text color when copied.' },
            { tokenPath: 'clipboard.feedback.bg-color', value: '{color.feedback.success.bgSubtle}', type: 'color', descriptionKey: 'components.clipboard.tokens.bg_color', descriptionFallback: 'Background when copied.' },
            { tokenPath: 'clipboard.feedback.border-radius', value: '{radius.sm}', type: 'dimension', descriptionKey: 'components.clipboard.tokens.border_radius', descriptionFallback: 'Trigger border radius.' },
            { tokenPath: 'clipboard.feedback.font-size', value: '{font.size.xs}', type: 'dimension', descriptionKey: 'components.clipboard.tokens.font_size', descriptionFallback: 'Trigger font size.' },
            { tokenPath: 'clipboard.feedback.transition-duration', value: '{motion.duration.medium}', type: 'duration', descriptionKey: 'components.clipboard.tokens.transition_duration', descriptionFallback: 'Color/background transition duration.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'value',
                kind: 'text',
                labelKey: 'components.clipboard.playground.value',
                labelFallback: 'Value to copy',
                defaultValue: 'npm install origam'
            },
            {
                prop: 'feedbackDuration',
                kind: 'number',
                labelKey: 'components.clipboard.playground.feedback_duration',
                labelFallback: 'Feedback duration (ms)',
                defaultValue: 2000
            },
            {
                prop: 'feedbackText',
                kind: 'text',
                labelKey: 'components.clipboard.playground.feedback_text',
                labelFallback: 'Feedback text',
                defaultValue: 'Copied!'
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.clipboard.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
