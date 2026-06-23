/**
 * /components/dialog — full documentation data for OrigamDialog.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Dialog/dialog.interface.ts              (props)
 *   - packages/ds/src/interfaces/Dialog/dialog-confirmation.interface.ts (sub-component props)
 *   - packages/ds/src/components/Dialog/OrigamDialog.vue                 (template BEM, defineExpose, aria-*)
 *   - packages/ds/src/components/Dialog/OrigamDialogConfirmation.vue     (sub-component)
 *   - packages/ds/tokens/component/dialog.json                           (CSS tokens)
 *   - packages/ds/tokens/component/dialog-confirmation.json              (sub-component tokens)
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

export const DIALOG_DOC: IComponentDoc = {
    slug: 'dialog',
    name: 'Dialog',
    tag: 'origam-dialog',
    icon: 'mdi-card-outline',
    category: 'Overlay',
    descriptionKey: 'components.catalog.dialog.description',
    descriptionFallback: 'Modal overlay dialog built on OrigamOverlay and OrigamCard. Supports activator slot, focus trap, scrollable mode, fullscreen, size variants, and status icons.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-dialog--design',
    docUrl: 'http://localhost:4000/components/Dialog/OrigamDialog',

    family: [
        {
            slug: 'dialog-confirmation',
            name: 'DialogConfirmation',
            descriptionKey: 'components.catalog.dialog_confirmation.description',
            descriptionFallback: 'Opinionated dialog with built-in Validate / Cancel footer buttons and a read-to-enable guard (isRead pattern).'
        }
    ],

    related: [
        {
            slug: 'overlay',
            name: 'Overlay',
            kind: 'component',
            descriptionKey: 'components.catalog.overlay.description',
            descriptionFallback: 'Low-level overlay primitive that Dialog is built upon.'
        },
        {
            slug: 'card',
            name: 'Card',
            kind: 'component',
            descriptionKey: 'components.catalog.card.description',
            descriptionFallback: 'Card rendered as dialog body.'
        },
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.catalog.drawer.description',
            descriptionFallback: 'Side-panel alternative to Dialog for persistent navigation or detail panels.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'fullscreen',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog.props.fullscreen.description',
            descriptionFallback: 'Expands the dialog to cover the full viewport (100vw × 100vh), with border-radius and margin reset to 0.'
        },
        {
            name: 'retainFocus',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.dialog.props.retain_focus.description',
            descriptionFallback: 'Keeps keyboard focus trapped inside the dialog while it is open. Cycles between the first and last focusable element on Tab.'
        },
        {
            name: 'scrollable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog.props.scrollable.description',
            descriptionFallback: 'Enables vertical scrolling inside the dialog body while the header and footer remain fixed.'
        },
        {
            name: 'size',
            type: { label: 'TSize', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.dialog.props.size.description',
            descriptionFallback: 'Controls the dialog width via size tokens (xs: 320px, sm: 400px, md: 720px, lg: 960px, xl: 1080px).'
        },
        // ── IOverlayProps (selected) ──────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.model_value.description',
            descriptionFallback: 'v-model binding for the open/close state of the dialog.'
        },
        {
            name: 'persistent',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog.props.persistent.description',
            descriptionFallback: 'When true, clicking outside the dialog or pressing Escape does not close it. Useful for required confirmation dialogs.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.dialog.props.disabled.description',
            descriptionFallback: 'Disables the activator and prevents the dialog from opening.'
        },
        {
            name: 'zIndex',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '2400',
            descriptionKey: 'components.dialog.props.z_index.description',
            descriptionFallback: 'z-index of the overlay layer. Defaults to 2400 (above most overlays).'
        },
        {
            name: 'activatorProps',
            type: { label: 'object', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.activator_props.description',
            descriptionFallback: 'Extra props merged onto the activator element. Dialog automatically adds aria-haspopup="dialog" and aria-expanded.'
        },
        {
            name: 'contentClass',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.content_class.description',
            descriptionFallback: 'CSS class(es) applied to the overlay content wrapper (.origam-overlay__content).'
        },
        {
            name: 'openOnClick',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.dialog.props.open_on_click.description',
            descriptionFallback: 'Opens the dialog when the activator is clicked. Defaults to true (Dialog overrides OrigamOverlay\'s default to keep activator clicks working).'
        },
        {
            name: 'closeOnBack',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.dialog.props.close_on_back.description',
            descriptionFallback: 'Closes the dialog on browser back navigation.'
        },
        {
            name: 'transition',
            type: { label: 'TTransitionProps | string', slug: '', kind: 'primitive' },
            defaultValue: 'OrigamTranslateScale',
            descriptionKey: 'components.dialog.props.transition.description',
            descriptionFallback: 'Transition used when the dialog enters/leaves. Defaults to OrigamTranslateScale.'
        },
        {
            name: 'origin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'center center'",
            descriptionKey: 'components.dialog.props.origin.description',
            descriptionFallback: 'transform-origin for the enter/leave transition.'
        },
        {
            name: 'scrollStrategy',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'block'",
            descriptionKey: 'components.dialog.props.scroll_strategy.description',
            descriptionFallback: 'Scroll behavior while the dialog is open. "block" prevents page scrolling.'
        },
        // ── ICardProps (selected relevant) ────────────────────────────
        {
            name: 'title',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.title.description',
            descriptionFallback: 'Dialog title rendered in the card header. Referenced by aria-labelledby for accessible naming.'
        },
        {
            name: 'subtitle',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.subtitle.description',
            descriptionFallback: 'Subtitle rendered below the title in the card header.'
        },
        {
            name: 'text',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.text.description',
            descriptionFallback: 'Body text rendered inside the card text slot.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the card surface (forwarded to OrigamCard).'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token forwarded to the inner card.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.rounded.description',
            descriptionFallback: 'Border-radius token for the inner card (overrides --origam-dialog---border-radius).'
        },
        // ── IStatusProps ───────────────────────────────────────────────
        {
            name: 'status',
            type: { label: 'TStatus', slug: 'status', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.status.description',
            descriptionFallback: 'Semantic status (success, warning, danger, info) that resolves the header prepend icon and applies a status CSS class.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.dialog.props.icon.description',
            descriptionFallback: 'Custom MDI icon shown in the header-prepend slot. Overrides the status icon when both are set.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.dialog.emits.update_model_value.description',
            descriptionFallback: 'Fired when the dialog open/close state changes.'
        },
        {
            event: 'click:outside',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.dialog.emits.click_outside.description',
            descriptionFallback: 'Fired when the user clicks outside the dialog content area. Default behavior closes the dialog unless persistent=true.'
        },
        {
            event: 'isRead',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.dialog.emits.is_read.description',
            descriptionFallback: 'Fired the first time the bottom of the dialog content intersects the viewport (scroll-to-read pattern for ToS / consent dialogs). Payload is always true.'
        }
    ],

    slots: [
        {
            slot: 'activator',
            slotProps: '{ props }',
            descriptionKey: 'components.dialog.slots.activator.description',
            descriptionFallback: 'Element that triggers the dialog. Bind the provided props object onto your trigger element to wire aria-haspopup, aria-expanded and the click handler.'
        },
        {
            slot: 'default',
            slotProps: '{ isActive }',
            descriptionKey: 'components.dialog.slots.default.description',
            descriptionFallback: 'Replaces the entire dialog body (including the default OrigamCard). Use when you need a completely custom modal layout.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.loader.description',
            descriptionFallback: 'Custom loading indicator forwarded to the inner OrigamCard loader slot.'
        },
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.header.description',
            descriptionFallback: 'Replaces the entire card header with custom content.'
        },
        {
            slot: 'header-prepend',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.header_prepend.description',
            descriptionFallback: 'Content before the dialog title. By default renders the status/icon when set.'
        },
        {
            slot: 'header-title',
            slotProps: '{ titleId }',
            descriptionKey: 'components.dialog.slots.header_title.description',
            descriptionFallback: 'Custom title content. The titleId slot prop should be used as the element id so aria-labelledby resolves correctly.'
        },
        {
            slot: 'header-subtitle',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.header_subtitle.description',
            descriptionFallback: 'Custom subtitle content below the title in the header.'
        },
        {
            slot: 'header-content',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.header_content.description',
            descriptionFallback: 'Extra content area inside the header (between subtitle and append).'
        },
        {
            slot: 'header-append',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.header_append.description',
            descriptionFallback: 'Content after the title row. Defaults to the close icon button (mdi-close).'
        },
        {
            slot: 'asset',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.asset.description',
            descriptionFallback: 'Visual asset (image, illustration) rendered above the text content inside the card.'
        },
        {
            slot: 'text',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.text.description',
            descriptionFallback: 'Body text content forwarded to the inner card text slot.'
        },
        {
            slot: 'content',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.content.description',
            descriptionFallback: 'Main dialog content. Scrollable when scrollable=true. The isRead sentinel div is appended after this slot.'
        },
        {
            slot: 'footer',
            slotProps: '—',
            descriptionKey: 'components.dialog.slots.footer.description',
            descriptionFallback: 'Footer area typically used for action buttons (Cancel / Confirm).'
        }
    ],

    examples: [
        {
            titleKey: 'components.dialog.examples.basic.title',
            titleFallback: 'Basic dialog with activator',
            lang: 'vue',
            code: `<template>
  <origam-dialog title="Confirm action" size="small">
    <template #activator="{ props }">
      <origam-btn v-bind="props" text="Open dialog" color="primary" />
    </template>
    <template #content>
      <p>Are you sure you want to continue?</p>
    </template>
    <template #footer>
      <origam-btn text="Cancel" variant="text" @click="dialog = false" />
      <origam-btn text="Confirm" color="primary" />
    </template>
  </origam-dialog>
</template>`
        },
        {
            titleKey: 'components.dialog.examples.fullscreen.title',
            titleFallback: 'Fullscreen dialog',
            lang: 'vue',
            code: `<template>
  <origam-dialog title="Settings" fullscreen>
    <template #activator="{ props }">
      <origam-btn v-bind="props" text="Open fullscreen" />
    </template>
    <template #content>
      <p>Full viewport content here.</p>
    </template>
  </origam-dialog>
</template>`
        },
        {
            titleKey: 'components.dialog.examples.confirmation.title',
            titleFallback: 'Confirmation dialog (DialogConfirmation)',
            lang: 'vue',
            code: `<template>
  <origam-dialog-confirmation
    title="Delete item"
    text="This action cannot be undone. Scroll to the end to confirm."
    status="danger"
    @validate="handleDelete"
    @cancel="handleCancel"
  >
    <template #activator="{ props }">
      <origam-btn v-bind="props" color="danger" text="Delete" />
    </template>
  </origam-dialog-confirmation>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-dialog',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamDialog',
        svgDesc: 'Schematic of the Dialog component showing overlay wrapper, card body, header, content, and footer zones.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- overlay scrim -->
  <rect x="10" y="10" width="680" height="280" rx="4" fill="rgba(0,0,0,0.08)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="6 3"/>
  <text x="350" y="25" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-style="italic">origam-overlay (scrim)</text>
  <!-- card surface -->
  <rect x="100" y="40" width="500" height="220" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- header zone -->
  <rect x="100" y="40" width="500" height="56" rx="8" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="350" y="72" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">header — prepend | title | subtitle | append (close btn)</text>
  <!-- content zone -->
  <rect x="100" y="96" width="500" height="108" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="155" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#content slot + isRead sentinel</text>
  <!-- footer zone -->
  <rect x="100" y="204" width="500" height="56" rx="8" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="350" y="236" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">footer — action buttons</text>
  <!-- numbering -->
  <circle cx="18" cy="18" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="18" y="22.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="108" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="108" cy="104" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="108" y="108.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="108" cy="212" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="108" y="216.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-dialog&gt;</code> — 4 zones: ① overlay scrim, ② card header (prepend / title / append), ③ scrollable content body, ④ footer for actions.`,
        legend: [
            {
                num: 1,
                cls: '.origam-overlay (scrim)',
                descriptionKey: 'components.dialog.anatomy.overlay',
                descriptionFallback: 'Full-viewport overlay managed by OrigamOverlay. Blocks interaction with the page and handles click-outside / Escape key.'
            },
            {
                num: 2,
                cls: '.origam-card (header)',
                descriptionKey: 'components.dialog.anatomy.header',
                descriptionFallback: 'Card header zone with prepend (status icon), title (aria-labelledby target), subtitle, and append (close button).'
            },
            {
                num: 3,
                cls: '.origam-card__content',
                descriptionKey: 'components.dialog.anatomy.content',
                descriptionFallback: 'Scrollable content body. Contains the #content slot plus an invisible IntersectionObserver sentinel that fires isRead when scrolled into view.'
            },
            {
                num: 4,
                cls: '.origam-card__footer',
                descriptionKey: 'components.dialog.anatomy.footer',
                descriptionFallback: 'Footer area for action buttons. Typically Cancel and Confirm. Fixed at the bottom in scrollable mode.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-overlay v-model="isActive" class="origam-dialog">
  <!-- activator trigger element -->
  <template #activator="{ props }">
    <slot name="activator" v-bind="{ props }" />
  </template>

  <template #default="{ isActive }">
    <slot name="default" v-bind="{ isActive }">
      <!-- default body: OrigamCard -->
      <origam-card
        role="dialog"
        aria-modal="true"
        :aria-labelledby="dialogTitleId"
      >
        <!-- header zone: prepend | title | subtitle | append(close) -->
        <template #header-prepend><slot name="header-prepend" /></template>
        <template #header-title="{ titleId }"><slot name="header-title" v-bind="{ titleId }" /></template>
        <template #header-append>
          <slot name="header-append">
            <origam-btn icon="mdi-close" @click="handleClose" aria-label="Close dialog" />
          </slot>
        </template>

        <!-- scrollable content body -->
        <template #default>
          <slot name="content" />
          <div ref="endText" v-intersect="handleIntersect" />
        </template>

        <!-- footer actions -->
        <template #footer><slot name="footer" /></template>
      </origam-card>
    </slot>
  </template>
</origam-overlay>`,
        classes: [
            {
                cls: 'origam-dialog',
                descriptionKey: 'components.dialog.anatomy.root',
                descriptionFallback: 'Root class applied to the origam-overlay element. Drives alignment (center center) and size-width vars.'
            },
            {
                cls: 'origam-dialog--fullscreen',
                descriptionKey: 'components.dialog.anatomy.fullscreen',
                descriptionFallback: 'Applied when fullscreen=true. Resets width, max-width, max-height and border-radius to 100vw/100vh/0.'
            },
            {
                cls: 'origam-dialog--scrollable',
                descriptionKey: 'components.dialog.anatomy.scrollable',
                descriptionFallback: 'Applied when scrollable=true. Enables overflow-y: auto on the card content zone.'
            },
            {
                cls: 'origam-dialog--size-x-small',
                descriptionKey: 'components.dialog.anatomy.size_xs',
                descriptionFallback: 'Sets --origam-dialog---width to 320px.'
            },
            {
                cls: 'origam-dialog--size-small',
                descriptionKey: 'components.dialog.anatomy.size_sm',
                descriptionFallback: 'Sets --origam-dialog---width to 400px.'
            },
            {
                cls: 'origam-dialog--size-default',
                descriptionKey: 'components.dialog.anatomy.size_md',
                descriptionFallback: 'Sets --origam-dialog---width to 720px.'
            },
            {
                cls: 'origam-dialog--size-large',
                descriptionKey: 'components.dialog.anatomy.size_lg',
                descriptionFallback: 'Sets --origam-dialog---width to 960px.'
            },
            {
                cls: 'origam-dialog--size-x-large',
                descriptionKey: 'components.dialog.anatomy.size_xl',
                descriptionFallback: 'Sets --origam-dialog---width to 1080px.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-dialog---width',
            defaultValue: 'auto',
            descriptionKey: 'components.dialog.css_vars.width',
            descriptionFallback: 'Dialog width. Overridden per size class (xs: 320px → xl: 1080px) and set to 100vw in fullscreen mode.'
        },
        {
            name: '--origam-dialog---max-height',
            defaultValue: 'calc(100vh - 48px)',
            descriptionKey: 'components.dialog.css_vars.max_height',
            descriptionFallback: 'Maximum dialog height. Resolves to 100vh in fullscreen mode.'
        },
        {
            name: '--origam-dialog---max-width',
            defaultValue: 'calc(100vw - 48px)',
            descriptionKey: 'components.dialog.css_vars.max_width',
            descriptionFallback: 'Maximum dialog width.'
        },
        {
            name: '--origam-dialog---border-radius',
            defaultValue: '{radius.lg} (12px)',
            descriptionKey: 'components.dialog.css_vars.border_radius',
            descriptionFallback: 'Border radius applied to the overlay content wrapper. Reset to 0 in fullscreen mode.'
        },
        {
            name: '--origam-dialog---box-shadow',
            defaultValue: '{shadow.xl}',
            descriptionKey: 'components.dialog.css_vars.box_shadow',
            descriptionFallback: 'Box shadow applied to the dialog surface for depth.'
        },
        {
            name: '--origam-dialog---width-xs',
            defaultValue: '320px',
            descriptionKey: 'components.dialog.css_vars.width_xs',
            descriptionFallback: 'Width token for size="x-small".'
        },
        {
            name: '--origam-dialog---width-sm',
            defaultValue: '400px',
            descriptionKey: 'components.dialog.css_vars.width_sm',
            descriptionFallback: 'Width token for size="small".'
        },
        {
            name: '--origam-dialog---width-md',
            defaultValue: '720px',
            descriptionKey: 'components.dialog.css_vars.width_md',
            descriptionFallback: 'Width token for size="default".'
        },
        {
            name: '--origam-dialog---width-lg',
            defaultValue: '960px',
            descriptionKey: 'components.dialog.css_vars.width_lg',
            descriptionFallback: 'Width token for size="large".'
        },
        {
            name: '--origam-dialog---width-xl',
            defaultValue: '1080px',
            descriptionKey: 'components.dialog.css_vars.width_xl',
            descriptionFallback: 'Width token for size="x-large".'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.dialog.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to inner OrigamOverlay or OrigamCard instances.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.dialog.exposed.css',
            descriptionFallback: 'Reactive CSS string generated from dialogStyles. Used by OrigamDefaultsProvider for style injection.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.dialog.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this dialog instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.dialog.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.dialog.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.dialog.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        },
        {
            name: 'contentEl',
            type: 'HTMLElement | undefined',
            descriptionKey: 'components.dialog.exposed.content_el',
            descriptionFallback: 'Reference to the overlay content element forwarded from the inner OrigamOverlay ref.'
        },
        {
            name: 'activatorEl',
            type: 'HTMLElement | undefined',
            descriptionKey: 'components.dialog.exposed.activator_el',
            descriptionFallback: 'Reference to the activator element forwarded from the inner OrigamOverlay ref.'
        },
        {
            name: 'globalTop',
            type: 'boolean',
            descriptionKey: 'components.dialog.exposed.global_top',
            descriptionFallback: 'True when this dialog is the topmost open overlay in the global stack.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['dialog'],
        keyboard: [
            {
                key: 'Escape',
                actionKey: 'components.dialog.a11y.key_escape',
                actionFallback: 'Closes the dialog (unless persistent=true).'
            },
            {
                key: 'Tab',
                actionKey: 'components.dialog.a11y.key_tab',
                actionFallback: 'Cycles focus through focusable elements inside the dialog. When retainFocus=true, Tab wraps from last to first element.'
            },
            {
                key: 'Shift+Tab',
                actionKey: 'components.dialog.a11y.key_shift_tab',
                actionFallback: 'Cycles focus backwards. Wraps from first to last element when retainFocus=true.'
            }
        ],
        notes: [
            {
                noteKey: 'components.dialog.a11y.role_note',
                noteFallback: 'The inner OrigamCard renders role="dialog" and aria-modal="true". The title element is linked via aria-labelledby using the auto-generated dialogTitleId.'
            },
            {
                noteKey: 'components.dialog.a11y.focus_note',
                noteFallback: 'On open, focus moves to the overlay content element. On close, focus returns to the activator element.'
            },
            {
                noteKey: 'components.dialog.a11y.activator_note',
                noteFallback: 'The activator element automatically receives aria-haspopup="dialog" and aria-expanded bound to the open state.'
            },
            {
                noteKey: 'components.dialog.a11y.persistent_note',
                noteFallback: 'When persistent=true, Escape and click-outside do not close the dialog. Use this only for critical flows (e.g., unsaved changes warning).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/dialog.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'dialog.background',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.dialog.tokens.background',
                descriptionFallback: 'Dialog surface background. Uses the raised surface semantic color.'
            },
            {
                tokenPath: 'dialog.border-radius',
                value: '{radius.lg}',
                type: 'dimension',
                descriptionKey: 'components.dialog.tokens.border_radius',
                descriptionFallback: 'Border radius applied to the dialog content wrapper. Reset to 0 in fullscreen mode.'
            },
            {
                tokenPath: 'dialog.box-shadow',
                value: '{shadow.xl}',
                type: 'shadow',
                descriptionKey: 'components.dialog.tokens.box_shadow',
                descriptionFallback: 'Elevation shadow for the dialog surface.'
            },
            {
                tokenPath: 'dialog.z-index',
                value: '{zIndex.modal}',
                type: 'number',
                descriptionKey: 'components.dialog.tokens.z_index',
                descriptionFallback: 'z-index of the dialog overlay (default: 2400).'
            },
            {
                tokenPath: 'dialog.width-md',
                value: '720px',
                type: 'dimension',
                descriptionKey: 'components.dialog.tokens.width_md',
                descriptionFallback: 'Default dialog width (size="default").'
            },
            {
                tokenPath: 'dialog.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.dialog.tokens.transition_duration',
                descriptionFallback: 'Enter/leave transition duration.'
            },
            {
                tokenPath: 'dialog.header.padding',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.dialog.tokens.header_padding',
                descriptionFallback: 'Padding inside the dialog header zone.'
            },
            {
                tokenPath: 'dialog.content.padding-inline',
                value: '{space.6}',
                type: 'dimension',
                descriptionKey: 'components.dialog.tokens.content_padding_inline',
                descriptionFallback: 'Horizontal padding of the dialog body content.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.dialog.playground.size',
                labelFallback: 'Size',
                defaultValue: 'default',
                options: [
                    { label: 'x-small (320px)', value: 'x-small' },
                    { label: 'small (400px)', value: 'small' },
                    { label: 'default (720px)', value: 'default' },
                    { label: 'large (960px)', value: 'large' },
                    { label: 'x-large (1080px)', value: 'x-large' }
                ]
            },
            {
                prop: 'fullscreen',
                kind: 'switch',
                labelKey: 'components.dialog.playground.fullscreen',
                labelFallback: 'Fullscreen',
                defaultValue: false
            },
            {
                prop: 'scrollable',
                kind: 'switch',
                labelKey: 'components.dialog.playground.scrollable',
                labelFallback: 'Scrollable',
                defaultValue: false
            },
            {
                prop: 'persistent',
                kind: 'switch',
                labelKey: 'components.dialog.playground.persistent',
                labelFallback: 'Persistent (no outside-click close)',
                defaultValue: false
            },
            {
                prop: 'status',
                kind: 'select',
                labelKey: 'components.dialog.playground.status',
                labelFallback: 'Status',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'success', value: 'success' },
                    { label: 'warning', value: 'warning' },
                    { label: 'danger', value: 'danger' },
                    { label: 'info', value: 'info' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
