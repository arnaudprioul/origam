/**
 * /components/dialog-confirmation — full documentation data for OrigamDialogConfirmation.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Dialog/dialog-confirmation.interface.ts  (props + emits)
 *   - packages/ds/src/interfaces/Dialog/dialog.interface.ts               (IDialogProps extended)
 *   - packages/ds/src/components/Dialog/OrigamDialogConfirmation.vue      (template, slots, defineExpose)
 *   - packages/ds/tokens/component/dialog-confirmation.json               (CSS tokens)
 *
 * FAMILY: Dialog folder — sub-component of dialog.
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

export const DIALOG_CONFIRMATION_DOC: IComponentDoc = {
    slug: 'dialog-confirmation',
    name: 'DialogConfirmation',
    tag: 'origam-dialog-confirmation',
    icon: 'mdi-check-circle-outline',
    category: 'Overlay',
    descriptionKey: 'components.catalog.dialog_confirmation.description',
    descriptionFallback: 'Opinionated dialog with built-in Validate / Cancel footer buttons and a read-to-enable guard — the Validate button is only enabled once the user has scrolled to the bottom of the content (isRead pattern).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-dialog--design',
    docUrl: 'http://localhost:4000/components/Dialog/OrigamDialogConfirmation',

    parentSlug: 'dialog',

    family: [
        {
            slug: 'dialog',
            name: 'Dialog',
            descriptionKey: 'components.catalog.dialog.description',
            descriptionFallback: 'Modal overlay dialog built on OrigamOverlay and OrigamCard.'
        }
    ],

    related: [
        {
            slug: 'overlay',
            name: 'Overlay',
            kind: 'component',
            descriptionKey: 'components.catalog.overlay.description',
            descriptionFallback: 'Low-level overlay primitive that Dialog (and therefore DialogConfirmation) is built upon.'
        },
        {
            slug: 'card',
            name: 'Card',
            kind: 'component',
            descriptionKey: 'components.catalog.card.description',
            descriptionFallback: 'Card rendered as dialog body inside DialogConfirmation.'
        }
    ],

    props: [
        // ── Own prop ───────────────────────────────────────────────────
        {
            name: 'cancellable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.dialog_confirmation.props.cancellable.description',
            descriptionFallback: 'When true (default), a Cancel button is rendered in the footer alongside Validate. Set to false for non-cancellable flows.'
        },
        // ── IDialogProps (selected) ────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.model_value.description',
            descriptionFallback: 'v-model binding for the dialog open/close state.'
        },
        {
            name: 'title',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.title.description',
            descriptionFallback: 'Dialog title forwarded to the inner OrigamDialog header.'
        },
        {
            name: 'subtitle',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.subtitle.description',
            descriptionFallback: 'Subtitle rendered below the title in the dialog header.'
        },
        {
            name: 'text',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.text.description',
            descriptionFallback: 'Body text forwarded to the inner dialog card text slot.'
        },
        {
            name: 'status',
            type: { label: 'TStatus', slug: 'status', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.status.description',
            descriptionFallback: 'Semantic status (success, warning, danger, info). Resolves the header prepend icon and applies a status CSS class.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.icon.description',
            descriptionFallback: 'Custom icon in the dialog header prepend slot. Overrides the status icon when both are set.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog_confirmation.props.color.description',
            descriptionFallback: 'Intent or custom colour forwarded to the inner OrigamDialog.'
        },
        {
            name: 'size',
            type: { label: 'TSize', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.dialog_confirmation.props.size.description',
            descriptionFallback: 'Controls the dialog width (xs: 320px … xl: 1080px) via size tokens.'
        },
        {
            name: 'fullscreen',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog_confirmation.props.fullscreen.description',
            descriptionFallback: 'Expands the dialog to cover the full viewport.'
        },
        {
            name: 'scrollable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog_confirmation.props.scrollable.description',
            descriptionFallback: 'Enables vertical scrolling inside the dialog body while header and footer remain fixed. Required for the isRead pattern to work correctly (the sentinel must be at the bottom of a scrollable area).'
        },
        {
            name: 'persistent',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog_confirmation.props.persistent.description',
            descriptionFallback: 'Prevents closing via Escape or outside-click. Recommended for critical confirmation flows.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog_confirmation.props.disabled.description',
            descriptionFallback: 'Disables the activator and prevents the dialog from opening.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.dialog_confirmation.emits.update_model_value.description',
            descriptionFallback: 'Fired when the dialog open/close state changes.'
        },
        {
            event: 'validate',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.dialog_confirmation.emits.validate.description',
            descriptionFallback: 'Fired when the user clicks the Validate button (only possible after isRead=true). The dialog closes automatically.'
        },
        {
            event: 'cancel',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.dialog_confirmation.emits.cancel.description',
            descriptionFallback: 'Fired when the user clicks the Cancel button. The dialog closes automatically.'
        }
    ],

    slots: [
        {
            slot: 'activator',
            slotProps: '{ props }',
            descriptionKey: 'components.dialog_confirmation.slots.activator.description',
            descriptionFallback: 'Element that triggers the dialog. Bind the provided props to wire aria-haspopup="dialog", aria-expanded and the click handler.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.loader.description',
            descriptionFallback: 'Custom loading indicator forwarded to the inner OrigamDialog loader slot.'
        },
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.header.description',
            descriptionFallback: 'Replaces the entire card header with custom content.'
        },
        {
            slot: 'header-prepend',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.header_prepend.description',
            descriptionFallback: 'Content before the title. By default renders the status/icon.'
        },
        {
            slot: 'header-title',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.header_title.description',
            descriptionFallback: 'Custom title content.'
        },
        {
            slot: 'header-subtitle',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.header_subtitle.description',
            descriptionFallback: 'Custom subtitle below the title in the header.'
        },
        {
            slot: 'header-content',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.header_content.description',
            descriptionFallback: 'Extra content area inside the header.'
        },
        {
            slot: 'header-append',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.header_append.description',
            descriptionFallback: 'Content after the title row (defaults to close icon).'
        },
        {
            slot: 'asset',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.asset.description',
            descriptionFallback: 'Visual asset rendered above the body text.'
        },
        {
            slot: 'text',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.text.description',
            descriptionFallback: 'Body text forwarded to the inner card text slot.'
        },
        {
            slot: 'content',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.content.description',
            descriptionFallback: 'Main dialog content. The isRead IntersectionObserver sentinel is appended after this slot — scroll to the bottom to enable the Validate button.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.default.description',
            descriptionFallback: 'Replaces the entire dialog body (including the default card layout).'
        },
        {
            slot: 'footer',
            slotProps: '—',
            descriptionKey: 'components.dialog_confirmation.slots.footer.description',
            descriptionFallback: 'Overrides the default Cancel / Validate footer layout with custom content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.dialog_confirmation.examples.basic.title',
            titleFallback: 'Basic confirmation dialog',
            lang: 'vue',
            code: `<template>
  <origam-dialog-confirmation
    title="Delete item"
    text="This action cannot be undone."
    status="danger"
    @validate="handleDelete"
    @cancel="handleCancel"
  >
    <template #activator="{ props }">
      <origam-btn v-bind="props" color="danger" text="Delete" />
    </template>
  </origam-dialog-confirmation>
</template>

<script setup lang="ts">
  const handleDelete = () => { /* … */ }
  const handleCancel = () => { /* … */ }
</script>`
        },
        {
            titleKey: 'components.dialog_confirmation.examples.read_guard.title',
            titleFallback: 'Read-to-enable (terms of service)',
            lang: 'vue',
            code: `<template>
  <origam-dialog-confirmation
    title="Terms of Service"
    scrollable
    persistent
    @validate="handleAccept"
  >
    <template #activator="{ props }">
      <origam-btn v-bind="props" text="Read ToS" color="primary" />
    </template>
    <template #content>
      <p v-for="i in 20" :key="i">
        Long terms of service paragraph {{ i }}…
      </p>
    </template>
  </origam-dialog-confirmation>
</template>`
        },
        {
            titleKey: 'components.dialog_confirmation.examples.no_cancel.title',
            titleFallback: 'Non-cancellable confirmation',
            lang: 'vue',
            code: `<template>
  <origam-dialog-confirmation
    v-model="open"
    title="Required action"
    text="You must confirm to continue."
    :cancellable="false"
    persistent
    @validate="handleValidate"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(true)
  const handleValidate = () => { /* … */ }
</script>`
        }
    ],

    anatomy: {
        rootClass: 'origam-dialog',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamDialogConfirmation',
        svgDesc: 'Schematic of the DialogConfirmation component showing its inner OrigamDialog with header, content, and a two-button footer.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- overlay scrim -->
  <rect x="10" y="10" width="680" height="280" rx="4" fill="rgba(0,0,0,0.08)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="6 3"/>
  <text x="350" y="24" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-style="italic">OrigamDialog (inner overlay)</text>
  <!-- card surface -->
  <rect x="100" y="36" width="500" height="228" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- header zone -->
  <rect x="100" y="36" width="500" height="56" rx="8" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="350" y="68" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">header — prepend (status icon) | title | append (close)</text>
  <!-- content zone -->
  <rect x="100" y="92" width="500" height="100" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.12))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="146" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#content slot + isRead IntersectionObserver sentinel</text>
  <!-- footer zone -->
  <rect x="100" y="192" width="500" height="72" rx="8" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.18))" stroke-width="1"/>
  <!-- cancel button -->
  <rect x="120" y="212" width="100" height="32" rx="4" fill="none" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1"/>
  <text x="170" y="232" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="system-ui">Cancel</text>
  <!-- validate button -->
  <rect x="468" y="212" width="112" height="32" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="524" y="232" font-size="10" fill="#fff" text-anchor="middle" font-family="system-ui" font-weight="600">Validate</text>
  <text x="350" y="247" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">Validate enabled only when isRead = true (user scrolled to bottom)</text>
  <!-- markers -->
  <circle cx="18" cy="18" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="18" y="22.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="108" cy="44" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="48.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="108" cy="100" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="108" y="104.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="108" cy="200" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="108" y="204.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-dialog-confirmation&gt;</code> — wraps OrigamDialog with 4 zones: ① overlay scrim, ② header (status icon + title), ③ scrollable content + isRead sentinel, ④ two-button footer (Cancel / Validate).`,
        legend: [
            {
                num: 1,
                cls: '.origam-overlay (scrim)',
                descriptionKey: 'components.dialog_confirmation.anatomy.overlay',
                descriptionFallback: 'Full-viewport overlay inherited from OrigamDialog. Handles click-outside and Escape (unless persistent=true).'
            },
            {
                num: 2,
                cls: '.origam-card (header)',
                descriptionKey: 'components.dialog_confirmation.anatomy.header',
                descriptionFallback: 'Card header with status icon in prepend slot, title, and close button in append slot. All header-* slots are forwarded transparently.'
            },
            {
                num: 3,
                cls: '.origam-card__content',
                descriptionKey: 'components.dialog_confirmation.anatomy.content',
                descriptionFallback: 'Scrollable content body. An IntersectionObserver sentinel at the bottom fires the @isRead event when it enters the viewport, enabling the Validate button.'
            },
            {
                num: 4,
                cls: '.origam-card__footer (two-button bar)',
                descriptionKey: 'components.dialog_confirmation.anatomy.footer',
                descriptionFallback: 'Default footer with Cancel (left) and Validate (right) in a space-between row. The Validate button is disabled until isRead=true. Override with the #footer slot.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-dialog
  ref="origamDialogRef"
  v-model="isActive"
  v-bind="dialogProps"
  @is-read="handleIsRead"
>
  <template #activator="{ props }">
    <slot name="activator" v-bind="{ props }" />
  </template>

  <!-- all header-* slots forwarded -->
  <template #header><slot name="header" /></template>
  <template #header-prepend><slot name="header-prepend" /></template>
  <template #header-title><slot name="header-title" /></template>
  <!-- … -->

  <template #content><slot name="content" /></template>

  <!-- built-in footer: Cancel + Validate -->
  <template #footer>
    <slot name="footer">
      <origam-container fluid>
        <origam-row justify="space-between">
          <origam-col cols="auto">
            <origam-btn v-if="cancellable" text="Cancel" @click="handleCancel" />
          </origam-col>
          <origam-col cols="auto">
            <origam-btn :disabled="!validatable" text="Validate" @click="handleValidate" />
          </origam-col>
        </origam-row>
      </origam-container>
    </slot>
  </template>
</origam-dialog>`,
        classes: [
            {
                cls: 'origam-dialog',
                descriptionKey: 'components.dialog_confirmation.anatomy.root',
                descriptionFallback: 'Root class — delegated to the inner OrigamDialog. DialogConfirmation itself has no additional BEM root class.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-dialog-confirmation---icon-size',
            defaultValue: '28px',
            descriptionKey: 'components.dialog_confirmation.css_vars.icon_size',
            descriptionFallback: 'Size of the status icon in the header prepend slot.'
        },
        {
            name: '--origam-dialog-confirmation---icon-color-default',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.dialog_confirmation.css_vars.icon_color_default',
            descriptionFallback: 'Icon colour when no status is set.'
        },
        {
            name: '--origam-dialog-confirmation---icon-color-success',
            defaultValue: '{color.feedback.success.fgSubtle}',
            descriptionKey: 'components.dialog_confirmation.css_vars.icon_color_success',
            descriptionFallback: 'Icon colour when status="success".'
        },
        {
            name: '--origam-dialog-confirmation---icon-color-warning',
            defaultValue: '{color.feedback.warning.fgSubtle}',
            descriptionKey: 'components.dialog_confirmation.css_vars.icon_color_warning',
            descriptionFallback: 'Icon colour when status="warning".'
        },
        {
            name: '--origam-dialog-confirmation---icon-color-danger',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.dialog_confirmation.css_vars.icon_color_danger',
            descriptionFallback: 'Icon colour when status="danger".'
        },
        {
            name: '--origam-dialog-confirmation---icon-color-info',
            defaultValue: '{color.feedback.info.fgSubtle}',
            descriptionKey: 'components.dialog_confirmation.css_vars.icon_color_info',
            descriptionFallback: 'Icon colour when status="info".'
        },
        {
            name: '--origam-dialog-confirmation---title-font-size',
            defaultValue: '{font.size.lg}',
            descriptionKey: 'components.dialog_confirmation.css_vars.title_font_size',
            descriptionFallback: 'Title font size.'
        },
        {
            name: '--origam-dialog-confirmation---title-font-weight',
            defaultValue: '{font.weight.semibold}',
            descriptionKey: 'components.dialog_confirmation.css_vars.title_font_weight',
            descriptionFallback: 'Title font weight.'
        },
        {
            name: '--origam-dialog-confirmation---actions-gap',
            defaultValue: '{space.3}',
            descriptionKey: 'components.dialog_confirmation.css_vars.actions_gap',
            descriptionFallback: 'Gap between footer action buttons.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.dialog_confirmation.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to the inner OrigamDialog.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['dialog'],
        keyboard: [
            {
                key: 'Escape',
                actionKey: 'components.dialog_confirmation.a11y.key_escape',
                actionFallback: 'Closes the dialog (unless persistent=true).'
            },
            {
                key: 'Tab',
                actionKey: 'components.dialog_confirmation.a11y.key_tab',
                actionFallback: 'Cycles focus through Cancel, Validate and any other focusable elements inside the dialog (focus trap inherited from OrigamDialog).'
            },
            {
                key: 'Shift+Tab',
                actionKey: 'components.dialog_confirmation.a11y.key_shift_tab',
                actionFallback: 'Cycles focus backwards.'
            }
        ],
        notes: [
            {
                noteKey: 'components.dialog_confirmation.a11y.validate_disabled_note',
                noteFallback: 'The Validate button is rendered with disabled=true and aria-disabled until the user scrolls to the bottom of the content (isRead=true). This is intentional — it enforces that users read critical content before confirming.'
            },
            {
                noteKey: 'components.dialog_confirmation.a11y.role_note',
                noteFallback: 'role="dialog" and aria-modal="true" are applied by the inner OrigamDialog on the card element. The title is linked via aria-labelledby.'
            },
            {
                noteKey: 'components.dialog_confirmation.a11y.focus_note',
                noteFallback: 'On open, focus moves to the overlay content. On close, focus returns to the activator element.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/dialog-confirmation.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'dialog-confirmation.icon-size',
                value: '28px',
                type: 'dimension',
                descriptionKey: 'components.dialog_confirmation.tokens.icon_size',
                descriptionFallback: 'Status icon size in the header prepend slot.'
            },
            {
                tokenPath: 'dialog-confirmation.icon-color-danger',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.dialog_confirmation.tokens.icon_color_danger',
                descriptionFallback: 'Icon colour for danger status.'
            },
            {
                tokenPath: 'dialog-confirmation.title-font-size',
                value: '{font.size.lg}',
                type: 'dimension',
                descriptionKey: 'components.dialog_confirmation.tokens.title_font_size',
                descriptionFallback: 'Title font size.'
            },
            {
                tokenPath: 'dialog-confirmation.title-font-weight',
                value: '{font.weight.semibold}',
                type: 'fontWeight',
                descriptionKey: 'components.dialog_confirmation.tokens.title_font_weight',
                descriptionFallback: 'Title font weight.'
            },
            {
                tokenPath: 'dialog-confirmation.description-color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.dialog_confirmation.tokens.description_color',
                descriptionFallback: 'Body text colour.'
            },
            {
                tokenPath: 'dialog-confirmation.actions-gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.dialog_confirmation.tokens.actions_gap',
                descriptionFallback: 'Gap between Cancel and Validate buttons in the footer.'
            }
        ]
    } satisfies IComponentTokens
}
