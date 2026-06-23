/**
 * /components/alert — full documentation data for OrigamAlert.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Alert/alert.interface.ts  (props / emits)
 *   - packages/ds/src/components/Alert/OrigamAlert.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/alert.json              (CSS tokens)
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

export const ALERT_DOC: IComponentDoc = {
    slug: 'alert',
    name: 'Alert',
    tag: 'origam-alert',
    icon: 'mdi-alert-circle-outline',
    category: 'Feedback',
    descriptionKey: 'components.catalog.alert.description',
    descriptionFallback: 'Contextual feedback message with intent colors, optional title, dismiss button and icon slots.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-alert--design',
    docUrl: 'http://localhost:4000/components/Alert/OrigamAlert',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.title.description',
            descriptionFallback: 'Bold title text rendered at the top of the alert body.'
        },
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.text.description',
            descriptionFallback: 'Alert body text. Can also be set via the default slot.'
        },
        {
            name: 'closable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.alert.props.closable.description',
            descriptionFallback: 'Adds a close button that emits click:close and hides the alert via v-model.'
        },
        {
            name: 'closeIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-close'",
            descriptionKey: 'components.alert.props.close_icon.description',
            descriptionFallback: 'Icon used for the close button. Defaults to the MDI close icon.'
        },
        {
            name: 'closeLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam.close'",
            descriptionKey: 'components.alert.props.close_label.description',
            descriptionFallback: 'Accessible aria-label for the close button.'
        },
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.alert.props.model_value.description',
            descriptionFallback: 'Controls the visibility of the alert. Use v-model to bind two-way.'
        },
        // ── IColorProps / IBgColorProps ─────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the alert surface.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.bg_color.description',
            descriptionFallback: 'Background color override independent of the intent color.'
        },
        // ── IBorderProps ────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.alert.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for the default or a CSS shorthand.'
        },
        {
            name: 'borderColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.border_color.description',
            descriptionFallback: 'Override border color without affecting width or style.'
        },
        // ── IDensityProps ───────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.alert.props.density.description',
            descriptionFallback: 'Adjusts vertical and horizontal padding density.'
        },
        // ── IDimensionProps ─────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.height.description',
            descriptionFallback: 'Overrides the alert height.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.width.description',
            descriptionFallback: 'Overrides the alert width.'
        },
        // ── IElevationProps ─────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token. Adds the box-shadow-elevated when set.'
        },
        // ── IStatusProps ────────────────────────────────────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.alert.props.disabled.description',
            descriptionFallback: 'Disables interactive elements inside the alert.'
        },
        // ── IRoundedProps ───────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        },
        // ── ITagProps ───────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.alert.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        },
        // ── IAdjacentProps ──────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.prepend_icon.description',
            descriptionFallback: 'Icon displayed in the prepend area (left of the alert text).'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.append_icon.description',
            descriptionFallback: 'Icon displayed in the append area (right of the alert text).'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the prepend area.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the append area.'
        },
        // ── IPositionProps / ILocationProps ─────────────────────────────
        {
            name: 'position',
            type: { label: "'static' | 'relative' | 'fixed' | 'absolute' | 'sticky'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.alert.props.position.description',
            descriptionFallback: 'CSS position property for the root element.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.alert.emits.update_model_value.description',
            descriptionFallback: 'Fired when the alert is dismissed via the close button.'
        },
        {
            event: 'click:close',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.alert.emits.click_close.description',
            descriptionFallback: 'Fired when the user clicks the close button.'
        },
        {
            event: 'update:hover',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.alert.emits.update_hover.description',
            descriptionFallback: 'Propagates the hover state to the parent when hover tracking is enabled.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.default.description',
            descriptionFallback: 'Main alert body content. Overrides the text prop.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.title.description',
            descriptionFallback: 'Replaces the title rendering. Overrides the title prop.'
        },
        {
            slot: 'text',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.text.description',
            descriptionFallback: 'Replaces the text body rendering. Overrides the text prop.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.prepend.description',
            descriptionFallback: 'Replaces the prepend icon area with custom content.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.append.description',
            descriptionFallback: 'Replaces the append icon area with custom content.'
        },
        {
            slot: 'close',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.close.description',
            descriptionFallback: 'Replaces the close button with custom content.'
        },
        {
            slot: 'wrapper',
            slotProps: '—',
            descriptionKey: 'components.alert.slots.wrapper.description',
            descriptionFallback: 'Replaces the entire inner layout (prepend + content + append + close).'
        }
    ],

    examples: [
        {
            titleKey: 'components.alert.examples.intents.title',
            titleFallback: 'Intent colors',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <origam-alert color="success" title="Success" text="Operation completed successfully." prepend-icon="mdi-check-circle" />
    <origam-alert color="danger"  title="Error"   text="Something went wrong." prepend-icon="mdi-alert-circle" />
    <origam-alert color="warning" title="Warning" text="Please review your settings." prepend-icon="mdi-alert" />
    <origam-alert color="info"    title="Info"    text="A new update is available." prepend-icon="mdi-information" />
  </div>
</template>`
        },
        {
            titleKey: 'components.alert.examples.closable.title',
            titleFallback: 'Closable alert',
            lang: 'vue',
            code: `<template>
  <origam-alert
    v-model="visible"
    color="primary"
    closable
    title="Dismissable"
    text="Click the close button to hide this alert."
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
</script>`
        },
        {
            titleKey: 'components.alert.examples.border.title',
            titleFallback: 'Border accent',
            lang: 'vue',
            code: `<template>
  <origam-alert
    color="info"
    border="start"
    title="Note"
    text="This alert uses a left accent border."
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'success', props: { color: 'success', title: 'Success', text: 'Operation completed.', prependIcon: 'mdi-check-circle' } },
        { label: 'danger', props: { color: 'danger', title: 'Error', text: 'Something went wrong.', prependIcon: 'mdi-alert-circle' } },
        { label: 'warning', props: { color: 'warning', title: 'Warning', text: 'Review your settings.', prependIcon: 'mdi-alert' } },
        { label: 'info', props: { color: 'info', title: 'Info', text: 'Update available.', prependIcon: 'mdi-information' } },
        { label: 'closable', props: { color: 'primary', title: 'Dismissable', closable: true, text: 'Click × to close.' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-alert',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamAlert',
        svgDesc: 'Schematic of the Alert component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="40" width="660" height="160" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="40" width="660" height="160" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.5"/>
  <rect x="20" y="40" width="4" height="160" rx="0" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.6"/>
  <rect x="32" y="56" width="60" height="128" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="62" y="125" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prepend</text>
  <rect x="104" y="56" width="458" height="128" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <rect x="116" y="66" width="434" height="34" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="333" y="88" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="600">Header (icon + title)</text>
  <rect x="116" y="106" width="434" height="64" rx="2" fill="none"/>
  <text x="333" y="140" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Body / #default slot</text>
  <rect x="570" y="56" width="52" height="128" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="596" y="125" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">close</text>
  <rect x="22" y="196" width="656" height="4" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.15))"/>
  <circle cx="28" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="62" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="62" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="108" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="333" cy="74" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="333" y="78" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="333" cy="114" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="333" y="118" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="574" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="574" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <circle cx="350" cy="200" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="204" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">7</text>
  <text x="350" y="230" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">⑦ underlay = absolute layer, decorative</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-alert&gt;</code> — 7 internal parts in a CSS grid (prepend | content | close). The underlay ⑦ is an absolute decorative layer behind the content.`,
        legend: [
            {
                num: 1,
                cls: '.origam-alert',
                descriptionKey: 'components.alert.anatomy.root',
                descriptionFallback: 'Root element. CSS grid with 4 columns: prepend / content / append / close. <code>role="alert"</code> (assertive) for warning/error, <code>role="status"</code> (polite) for info/success.'
            },
            {
                num: 2,
                cls: '.origam-alert__prepend',
                descriptionKey: 'components.alert.anatomy.prepend',
                descriptionFallback: 'Leading area (grid-area: prepend). Renders <code>prependIcon</code> or <code>prependAvatar</code>, or the <code>#prepend</code> slot.'
            },
            {
                num: 3,
                cls: '.origam-alert__content',
                descriptionKey: 'components.alert.anatomy.content',
                descriptionFallback: 'Content container (grid-area: content). Holds the header (<code>__header</code>) and body (<code>__body</code>).'
            },
            {
                num: 4,
                cls: '.origam-alert__header',
                descriptionKey: 'components.alert.anatomy.header',
                descriptionFallback: 'Header area inside content. Contains the icon and/or title. Rendered only when <code>hasHeader</code> is true.'
            },
            {
                num: 5,
                cls: '.origam-alert__body',
                descriptionKey: 'components.alert.anatomy.body',
                descriptionFallback: 'Body area. Contains the <code>#text</code> slot or <code>text</code> prop, plus the <code>#default</code> slot.'
            },
            {
                num: 6,
                cls: '.origam-alert__close',
                descriptionKey: 'components.alert.anatomy.close',
                descriptionFallback: 'Close button area (grid-area: close). Rendered only when <code>closable=true</code> or the <code>#close</code> slot is used.'
            },
            {
                num: 7,
                cls: '.origam-alert__underlay',
                descriptionKey: 'components.alert.anatomy.underlay',
                descriptionFallback: 'Absolute decorative layer. <code>grid-area: none; position: absolute</code>. Used for the colored border-radius adaptation in the inset border modifier.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-alert" role="status" aria-live="polite">
  <span class="origam-alert__underlay" />

  <!-- prepend: icon or avatar -->
  <div class="origam-alert__prepend">
    <slot name="prepend" />
  </div>

  <!-- content: header + body + default slot -->
  <div class="origam-alert__content">
    <div class="origam-alert__header">
      <!-- icon + title -->
      <span class="origam-alert__title">
        <slot name="title" />
      </span>
    </div>
    <div class="origam-alert__body">
      <slot name="text" />
      <slot name="default" />
    </div>
  </div>

  <!-- close button -->
  <div class="origam-alert__close">
    <slot name="close" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-alert',
                descriptionKey: 'components.alert.anatomy.root',
                descriptionFallback: 'Root grid container. role="alert" or "status" based on intent.'
            },
            {
                cls: 'origam-alert__underlay',
                descriptionKey: 'components.alert.anatomy.underlay',
                descriptionFallback: 'Absolute decorative underlay layer.'
            },
            {
                cls: 'origam-alert__prepend',
                descriptionKey: 'components.alert.anatomy.prepend',
                descriptionFallback: 'Leading icon/avatar zone.'
            },
            {
                cls: 'origam-alert__content',
                descriptionKey: 'components.alert.anatomy.content',
                descriptionFallback: 'Main content column.'
            },
            {
                cls: 'origam-alert__header',
                descriptionKey: 'components.alert.anatomy.header',
                descriptionFallback: 'Header row inside content (icon + title).'
            },
            {
                cls: 'origam-alert__title',
                descriptionKey: 'components.alert.anatomy.title',
                descriptionFallback: 'Title text element inside the header.'
            },
            {
                cls: 'origam-alert__body',
                descriptionKey: 'components.alert.anatomy.body',
                descriptionFallback: 'Body text zone.'
            },
            {
                cls: 'origam-alert__append',
                descriptionKey: 'components.alert.anatomy.append',
                descriptionFallback: 'Trailing icon/avatar zone (grid-area: append).'
            },
            {
                cls: 'origam-alert__close',
                descriptionKey: 'components.alert.anatomy.close',
                descriptionFallback: 'Close button container (grid-area: close).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-alert---background-color',
            defaultValue: '{color.surface.disabled}',
            descriptionKey: 'components.alert.css_vars.background_color',
            descriptionFallback: 'Default alert background color. Overridden by status (warning/success/info/error) and color prop.'
        },
        {
            name: '--origam-alert---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.alert.css_vars.color',
            descriptionFallback: 'Default foreground color. Overridden by status colors.'
        },
        {
            name: '--origam-alert---border-radius',
            defaultValue: '{radius.none}',
            descriptionKey: 'components.alert.css_vars.border_radius',
            descriptionFallback: 'Border radius. Zero by default; overridden by the rounded prop.'
        },
        {
            name: '--origam-alert---padding-block-start',
            defaultValue: '{space.4}',
            descriptionKey: 'components.alert.css_vars.padding_block_start',
            descriptionFallback: 'Top padding. Adjusted by density.'
        },
        {
            name: '--origam-alert---padding-inline-start',
            defaultValue: '{space.4}',
            descriptionKey: 'components.alert.css_vars.padding_inline_start',
            descriptionFallback: 'Leading (left) padding. Adjusted by density.'
        },
        {
            name: '--origam-alert---density',
            defaultValue: '0px',
            descriptionKey: 'components.alert.css_vars.density',
            descriptionFallback: 'Density offset: comfortable=-8px, default=0px, compact=+8px.'
        },
        {
            name: '--origam-alert---box-shadow-elevated',
            defaultValue: '{shadow.md}',
            descriptionKey: 'components.alert.css_vars.box_shadow_elevated',
            descriptionFallback: 'Box shadow for elevated variant (when elevation prop is set).'
        },
        {
            name: '--origam-alert__title---font-size',
            defaultValue: '{font.size.2xl}',
            descriptionKey: 'components.alert.css_vars.title_font_size',
            descriptionFallback: 'Font size of the title area.'
        },
        {
            name: '--origam-alert__title---font-weight',
            defaultValue: '{font.weight.medium}',
            descriptionKey: 'components.alert.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the title text.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.alert.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.alert.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed alertStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.alert.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.alert.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.alert.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.alert.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['alert', 'status'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.alert.a11y.key_tab',
                actionFallback: 'Moves focus to the close button when closable=true.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.alert.a11y.key_close',
                actionFallback: 'Activates the close button when focused.'
            }
        ],
        notes: [
            {
                noteKey: 'components.alert.a11y.role_note',
                noteFallback: 'Alerts with status "warning" or "error" use role="alert" with aria-live="assertive". Other statuses use role="status" with aria-live="polite".'
            },
            {
                noteKey: 'components.alert.a11y.close_label_note',
                noteFallback: 'The close button receives an aria-label from the closeLabel prop, defaulting to the translated "Close" string via the locale system.'
            },
            {
                noteKey: 'components.alert.a11y.hover_note',
                noteFallback: 'The component tracks hover state via @mouseenter/@mouseleave and propagates it via update:hover. Focus visible styles are applied for keyboard navigation.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/alert.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'alert.background-color',
                value: '{color.surface.disabled}',
                type: 'color',
                descriptionKey: 'components.alert.tokens.background_color',
                descriptionFallback: 'Default alert background.'
            },
            {
                tokenPath: 'alert.padding-block-start',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.alert.tokens.padding_block_start',
                descriptionFallback: 'Default top/bottom block padding.'
            },
            {
                tokenPath: 'alert.success.bg',
                value: '{color.feedback.success.bg}',
                type: 'color',
                descriptionKey: 'components.alert.tokens.success_bg',
                descriptionFallback: 'Background for the success status variant.'
            },
            {
                tokenPath: 'alert.warning.bg',
                value: '{color.feedback.warning.bg}',
                type: 'color',
                descriptionKey: 'components.alert.tokens.warning_bg',
                descriptionFallback: 'Background for the warning status variant.'
            },
            {
                tokenPath: 'alert.danger.bg',
                value: '{color.feedback.danger.bg}',
                type: 'color',
                descriptionKey: 'components.alert.tokens.danger_bg',
                descriptionFallback: 'Background for the danger/error status variant.'
            },
            {
                tokenPath: 'alert.title.font-size',
                value: '{font.size.2xl}',
                type: 'dimension',
                descriptionKey: 'components.alert.tokens.title_font_size',
                descriptionFallback: 'Font size of the title area.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.alert.playground.color',
                labelFallback: 'Color / Intent',
                defaultValue: 'success',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' }
                ]
            },
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.alert.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Alert title'
            },
            {
                prop: 'text',
                kind: 'text',
                labelKey: 'components.alert.playground.text',
                labelFallback: 'Text',
                defaultValue: 'This is an alert message.'
            },
            {
                prop: 'closable',
                kind: 'switch',
                labelKey: 'components.alert.playground.closable',
                labelFallback: 'Closable',
                defaultValue: false
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.alert.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: 'mdi-information',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-check-circle', value: 'mdi-check-circle' },
                    { label: 'mdi-alert-circle', value: 'mdi-alert-circle' },
                    { label: 'mdi-alert', value: 'mdi-alert' },
                    { label: 'mdi-information', value: 'mdi-information' }
                ]
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.alert.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'pill', value: 'pill' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
