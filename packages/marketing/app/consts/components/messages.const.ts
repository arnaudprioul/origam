/**
 * /components/messages — full documentation data for OrigamMessages.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Messages/messages.interface.ts  (props)
 *   - packages/ds/src/components/Messages/OrigamMessages.vue     (template BEM)
 *   - packages/ds/tokens/component/messages.json                 (CSS tokens)
 *
 * OrigamMessages renders a live region (aria-live="polite" role="status")
 * used by form fields (TextField, NumberField, PasswordField…) to
 * announce validation/hint messages. It is a utility sub-component,
 * not typically used standalone.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const MESSAGES_DOC: IComponentDoc = {
    slug: 'messages',
    name: 'Messages',
    tag: 'origam-messages',
    icon: 'mdi-message-text-outline',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.messages.description',
    descriptionFallback: 'Accessible live region that displays a list of validation or hint messages below form fields. Supports transitions, custom slot content, and full design token customisation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-messages--design',
    docUrl: 'http://localhost:4000/components/Messages/OrigamMessages',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'TextField uses OrigamMessages to display its validation messages.'
        },
        {
            slug: 'field',
            name: 'Field',
            kind: 'component',
            descriptionKey: 'components.catalog.field.description',
            descriptionFallback: 'OrigamField composes OrigamMessages in its details slot.'
        }
    ],

    props: [
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.messages.props.active.description',
            descriptionFallback: 'When true, the messages container is visible. Controls the v-show and transition entry.'
        },
        {
            name: 'messages',
            type: { label: 'Array<string> | string', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.messages.props.messages.description',
            descriptionFallback: 'One or more message strings to display. Each string is rendered as a separate row (origam-messages__message).'
        },
        // ── ITagProps ────────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.messages.props.tag.description',
            descriptionFallback: 'Root HTML tag rendered for the messages container.'
        },
        // ── IColorProps ──────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.messages.props.color.description',
            descriptionFallback: 'Text color applied to all message rows.'
        },
        // ── IDensityProps ────────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.messages.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding/spacing density.'
        },
        // ── IRoundedProps ────────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.messages.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the container.'
        },
        // ── IElevationProps ──────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.messages.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation applied to the messages container.'
        },
        // ── IBorderProps ─────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.messages.props.border.description',
            descriptionFallback: 'Applies a border to the container. Pass true for the default or a CSS shorthand.'
        },
        // ── IPaddingProps / IMarginProps ─────────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.messages.props.padding.description',
            descriptionFallback: 'Inner padding override.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.messages.props.margin.description',
            descriptionFallback: 'Outer margin override.'
        },
        // ── ITransitionComponentProps ────────────────────────────────────
        {
            name: 'transition',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: "'slide-y-transition'",
            descriptionKey: 'components.messages.props.transition.description',
            descriptionFallback: 'Enter/leave transition applied to each message row. Defaults to the slide-y-transition.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ message: string }',
            descriptionKey: 'components.messages.slots.default.description',
            descriptionFallback: 'Custom renderer for each individual message row. Receives the message string. By default renders the message as plain text.'
        }
    ],

    examples: [
        {
            titleKey: 'components.messages.examples.basic.title',
            titleFallback: 'Basic messages',
            lang: 'vue',
            code: `<template>
  <origam-messages
    :active="hasErrors"
    :messages="['This field is required', 'Must be a valid email']"
    color="danger"
  />
</template>`
        },
        {
            titleKey: 'components.messages.examples.hint.title',
            titleFallback: 'Hint message',
            lang: 'vue',
            code: `<template>
  <origam-messages
    :active="true"
    messages="Password must be at least 8 characters."
    color="info"
  />
</template>`
        },
        {
            titleKey: 'components.messages.examples.custom_slot.title',
            titleFallback: 'Custom slot',
            lang: 'vue',
            code: `<template>
  <origam-messages :active="true" :messages="['Required', 'Too short']">
    <template #default="{ message }">
      <span>
        <origam-icon icon="mdi-alert-circle" size="x-small" />
        {{ message }}
      </span>
    </template>
  </origam-messages>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-messages',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamMessages',
        svgDesc: 'Schematic of the Messages component with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="30" width="640" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1.5"/>
  <rect x="50" y="52" width="580" height="26" rx="3" fill="var(--origam-color__feedback--danger---bgSubtle, rgba(239,68,68,0.06))"/>
  <text x="340" y="69" font-size="9" fill="var(--origam-color__feedback--danger---fg, #dc2626)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-messages__message — "This field is required"</text>
  <rect x="50" y="84" width="580" height="26" rx="3" fill="var(--origam-color__feedback--danger---bgSubtle, rgba(239,68,68,0.04))"/>
  <text x="340" y="101" font-size="9" fill="var(--origam-color__feedback--danger---fg, #dc2626)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-messages__message — "Must be a valid email"</text>
  <circle cx="26" cy="34" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="26" y="38" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="26" cy="56" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="26" y="60" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="26" cy="88" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="26" y="92" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-messages&gt;</code> — 3 parts: the root live-region container, and one <code>__message</code> row per entry in the messages array.',
        legend: [
            {
                num: 1,
                cls: '.origam-messages',
                descriptionKey: 'components.messages.anatomy.root',
                descriptionFallback: 'Root container. Has aria-live="polite" and role="status" for screen-reader announcements.'
            },
            {
                num: 2,
                cls: '.origam-messages__message (row 1)',
                descriptionKey: 'components.messages.anatomy.message_1',
                descriptionFallback: 'First message row. Enters/leaves with the slide-y transition.'
            },
            {
                num: 3,
                cls: '.origam-messages__message (row n)',
                descriptionKey: 'components.messages.anatomy.message_n',
                descriptionFallback: 'Subsequent message rows — one per entry in the messages array.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div
  class="origam-messages"
  aria-live="polite"
  role="status"
>
  <transition-group name="slide-y-transition">
    <div
      v-for="message in normalizedMessages"
      :key="message"
      class="origam-messages__message"
    >
      <slot :message="message">{{ message }}</slot>
    </div>
  </transition-group>
</div>`,
        classes: [
            {
                cls: 'origam-messages',
                descriptionKey: 'components.messages.anatomy.root',
                descriptionFallback: 'Root container — aria-live="polite" + role="status" live region.'
            },
            {
                cls: 'origam-messages__message',
                descriptionKey: 'components.messages.anatomy.message',
                descriptionFallback: 'Individual message row. One per string in the messages prop.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-messages---color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.messages.css_vars.color',
            descriptionFallback: 'Default message text color. Inherits from the parent context (OrigamField injects the error/hint color).'
        },
        {
            name: '--origam-messages---font-size',
            defaultValue: '12px',
            descriptionKey: 'components.messages.css_vars.font_size',
            descriptionFallback: 'Font size of all message rows (fixed 12 px per spec).'
        },
        {
            name: '--origam-messages---min-height',
            defaultValue: '14px',
            descriptionKey: 'components.messages.css_vars.min_height',
            descriptionFallback: 'Minimum height preserved even with no messages, preventing layout jump.'
        },
        {
            name: '--origam-messages---opacity',
            defaultValue: '{opacity.87}',
            descriptionKey: 'components.messages.css_vars.opacity',
            descriptionFallback: 'Container opacity.'
        },
        {
            name: '--origam-messages__message---transition-duration',
            defaultValue: '{motion.duration.normal}',
            descriptionKey: 'components.messages.css_vars.message_transition',
            descriptionFallback: 'Duration of the slide-y enter/leave transition per message row.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['status'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.messages.a11y.live_region',
                noteFallback: 'The root element carries aria-live="polite" and role="status". Screen readers announce new messages without interrupting the current speech flow.'
            },
            {
                noteKey: 'components.messages.a11y.color_note',
                noteFallback: 'Color alone is never the sole indicator — message text is always visible. Ensure sufficient contrast ratio (≥4.5:1) when overriding the color prop.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/messages.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'messages.color',
                value: 'currentColor',
                type: 'color',
                descriptionKey: 'components.messages.tokens.color',
                descriptionFallback: 'Inherits the field context color (error=danger, hint=info).'
            },
            {
                tokenPath: 'messages.font-size',
                value: '12px',
                type: 'dimension',
                descriptionKey: 'components.messages.tokens.font_size',
                descriptionFallback: 'Fixed 12 px per design spec.'
            },
            {
                tokenPath: 'messages.min-height',
                value: '14px',
                type: 'dimension',
                descriptionKey: 'components.messages.tokens.min_height',
                descriptionFallback: 'Prevents layout collapse when messages array is empty.'
            },
            {
                tokenPath: 'messages.message.transition-duration',
                value: '{motion.duration.normal}',
                type: 'duration',
                descriptionKey: 'components.messages.tokens.message_transition',
                descriptionFallback: 'Slide-y transition duration for individual message rows.'
            }
        ]
    } satisfies IComponentTokens
}
