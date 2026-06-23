/**
 * /components/btn — full documentation data for OrigamBtn.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Btn/btn.interface.ts  (props)
 *   - packages/ds/src/components/Btn/OrigamBtn.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/btn.json            (CSS tokens)
 *
 * FAN-OUT PATTERN: to document a new component, replicate this file
 * and fill each section by reading the three source files listed above.
 * Never invent values — always verify against source.
 *
 * Props are grouped for readability; the table on the page renders them flat.
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

export const BTN_DOC: IComponentDoc = {
    slug: 'btn',
    name: 'Btn',
    tag: 'origam-btn',
    icon: 'mdi-gesture-tap-button',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.btn.description',
    descriptionFallback: 'Polymorphic action element with intent, variant, size and icon support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-btn--design',
    docUrl: 'http://localhost:4000/components/Btn/OrigamBtn',

    family: [
        {
            slug: 'btn-group',
            name: 'BtnGroup',
            descriptionKey: 'components.catalog.btn_group.description',
            descriptionFallback: 'Groups Btn elements into a connected segmented control.'
        },
        {
            slug: 'btn-toggle',
            name: 'BtnToggle',
            descriptionKey: 'components.catalog.btn_toggle.description',
            descriptionFallback: 'Single or multi-select toggle group of Btn elements.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.text.description',
            descriptionFallback: 'Button label text. Can also be set via the default slot.'
        },
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.active.description',
            descriptionFallback: 'Forces the button into its active/pressed visual state.'
        },
        {
            name: 'icon',
            type: { label: 'boolean | TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.icon.description',
            descriptionFallback: 'Renders the button as an icon-only button. Pass true to shrink padding, or a TIcon string to also set the icon.'
        },
        {
            name: 'block',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.block.description',
            descriptionFallback: 'Makes the button fill the full width of its container.'
        },
        {
            name: 'slim',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.slim.description',
            descriptionFallback: 'Reduces horizontal padding for tighter layouts.'
        },
        {
            name: 'stacked',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.stacked.description',
            descriptionFallback: 'Stacks the prepend icon above the label text vertically.'
        },
        {
            name: 'flat',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.flat.description',
            descriptionFallback: 'Deprecated. Use variant="flat" instead. Kept for backward compatibility.'
        },
        // ── IVariantProps ──────────────────────────────────────────────
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'elevated'",
            descriptionKey: 'components.btn.props.variant.description',
            descriptionFallback: 'Visual style variant. Controls elevation, fill and border rendering.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the button surface. Accepts semantic intents (primary, success, danger…) or a CSS color. Hex values emit a deprecation warning since v0.4.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.bg_color.description',
            descriptionFallback: 'Background color override, independent of the intent color.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.btn.props.size.description',
            descriptionFallback: 'Controls the button height and font-size via design tokens.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.btn.props.density.description',
            descriptionFallback: 'Adjusts vertical and horizontal padding density.'
        },
        // ── IAdjacentProps ─────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.prepend_icon.description',
            descriptionFallback: 'MDI or custom icon displayed before the label.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.append_icon.description',
            descriptionFallback: 'MDI or custom icon displayed after the label.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar displayed in the prepend slot.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar displayed in the append slot.'
        },
        // ── IStatusProps ───────────────────────────────────────────────
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.disabled.description',
            descriptionFallback: 'Disables the button. Sets aria-disabled and prevents click events.'
        },
        {
            name: 'loading',
            type: { label: 'TLoadingValue', slug: 'loading-value', kind: 'type' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.loading.description',
            descriptionFallback: 'Shows a progress spinner and sets aria-busy while true.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.readonly.description',
            descriptionFallback: 'Makes the button non-interactive without disabling it visually.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'button'",
            descriptionKey: 'components.btn.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to button; becomes a when href or to is set.'
        },
        // ── ILinkProps ─────────────────────────────────────────────────
        {
            name: 'href',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.href.description',
            descriptionFallback: 'Renders the button as an anchor tag pointing to this URL.'
        },
        {
            name: 'to',
            type: { label: 'string | RouteLocationRaw', slug: 'route-location-raw', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.to.description',
            descriptionFallback: 'Vue Router destination. Automatically sets tag="a" and uses router-link.'
        },
        {
            name: 'target',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.target.description',
            descriptionFallback: 'Anchor target attribute, e.g. "_blank".'
        },
        {
            name: 'rel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.rel.description',
            descriptionFallback: 'Anchor rel attribute, e.g. "noopener noreferrer".'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean. true = theme default; pill = full-round.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for the default border or a CSS shorthand.'
        },
        {
            name: 'borderColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.border_color.description',
            descriptionFallback: 'Override border color without affecting width or style.'
        },
        {
            name: 'borderStyle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.border_style.description',
            descriptionFallback: 'Override border style (solid, dashed, dotted…).'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token. Overrides the variant default elevation.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.height.description',
            descriptionFallback: 'Overrides the button height. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.width.description',
            descriptionFallback: 'Overrides the button width.'
        },
        {
            name: 'minWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.min_width.description',
            descriptionFallback: 'Minimum button width.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.max_width.description',
            descriptionFallback: 'Maximum button width.'
        },
        // ── IRippleProps ───────────────────────────────────────────────
        {
            name: 'ripple',
            type: { label: "boolean | { class: string }", slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.btn.props.ripple.description',
            descriptionFallback: 'Enables the Material ripple effect on click. Set to false to disable.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.btn.emits.click.description',
            descriptionFallback: 'Fired on button click. Also fires on Enter/Space for keyboard users.'
        },
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.btn.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the prepend slot area. Stops propagation.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.btn.emits.click_append.description',
            descriptionFallback: 'Fired when the user clicks the append slot area.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.btn.slots.default.description',
            descriptionFallback: 'Main button label content. Overrides the text prop.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.btn.slots.prepend.description',
            descriptionFallback: 'Replaces the prepend icon/avatar area with custom content.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.btn.slots.append.description',
            descriptionFallback: 'Replaces the append icon/avatar area with custom content.'
        },
        {
            slot: 'loader',
            slotProps: '{ progressProps }',
            descriptionKey: 'components.btn.slots.loader.description',
            descriptionFallback: 'Custom spinner shown while loading=true. progressProps mirrors OrigamProgress props.'
        },
        {
            slot: 'wrapper',
            slotProps: '—',
            descriptionKey: 'components.btn.slots.wrapper.description',
            descriptionFallback: 'Replaces the entire inner layout (advanced). Use when you need full control over prepend/content/append.'
        }
    ],

    examples: [
        {
            titleKey: 'components.btn.examples.variants.title',
            titleFallback: 'Variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <origam-btn variant="flat"     text="Flat" />
    <origam-btn variant="elevated" text="Elevated" />
    <origam-btn variant="tonal"    text="Tonal" />
    <origam-btn variant="outlined" text="Outlined" />
    <origam-btn variant="text"     text="Text" />
    <origam-btn variant="plain"    text="Plain" />
    <origam-btn variant="ghost"    text="Ghost" />
  </div>
</template>`
        },
        {
            titleKey: 'components.btn.examples.intents.title',
            titleFallback: 'Intents (color)',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
    <origam-btn color="primary"   text="Primary" />
    <origam-btn color="secondary" text="Secondary" />
    <origam-btn color="success"   text="Success" />
    <origam-btn color="danger"    text="Danger" />
    <origam-btn color="warning"   text="Warning" />
    <origam-btn color="info"      text="Info" />
  </div>
</template>`
        },
        {
            titleKey: 'components.btn.examples.icons.title',
            titleFallback: 'Icons & states',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center;">
    <origam-btn prepend-icon="mdi-account" text="Profile" />
    <origam-btn append-icon="mdi-arrow-right" text="Next" />
    <origam-btn icon="mdi-heart" aria-label="Like" />
    <origam-btn disabled text="Disabled" />
    <origam-btn loading  text="Loading…" />
    <origam-btn stacked prepend-icon="mdi-star" text="Stacked" />
  </div>
</template>`
        }
    ],

    /**
     * PREVIEW VARIANTS
     * Real OrigamBtn instances shown in the header preview band.
     * Sourced from the btn.const.ts playground config.
     */
    previewVariants: [
        { label: 'default', props: { color: 'primary', variant: 'elevated', prependIcon: 'mdi-arrow-down' }, slotContent: 'Default' },
        { label: 'outlined', props: { color: 'primary', variant: 'outlined' }, slotContent: 'Outlined' },
        { label: 'tonal', props: { color: 'primary', variant: 'tonal' }, slotContent: 'Tonal' },
        { label: 'ghost', props: { color: 'primary', variant: 'ghost' }, slotContent: 'Ghost' },
        { label: 'disabled', props: { color: 'primary', variant: 'elevated', disabled: true }, slotContent: 'Disabled', ariaLabel: 'Disabled button' },
        { label: 'loading', props: { color: 'primary', variant: 'elevated', loading: true }, slotContent: 'Loading', ariaLabel: 'Loading button' },
        { label: 'rounded pill', props: { color: 'primary', variant: 'elevated', rounded: 'pill' }, slotContent: 'Pill' }
    ] satisfies IComponentPreviewVariant[],

    /**
     * ANATOMY
     * Sourced from packages/ds/src/components/Btn/OrigamBtn.vue <template>.
     * BEM classes extracted from the actual SCSS in the same file.
     */
    anatomy: {
        rootClass: 'origam-btn',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamBtn',
        svgDesc: 'Schematic of the Btn component with 8 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="44" width="548" height="116" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="28" y="44" width="548" height="116" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
  <rect x="28" y="156" width="548" height="5" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.18))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.35))" stroke-width="1"/>
  <rect x="28" y="156" width="200" height="5" rx="0" fill="var(--origam-color__feedback--info---bg, rgba(8,145,178,0.6))"/>
  <rect x="48" y="56" width="508" height="92" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="60" y="66" width="76" height="72" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <rect x="72" y="80" width="52" height="44" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="98" y="106" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <rect x="144" y="66" width="320" height="72" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="180" y="88" width="248" height="26" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))"/>
  <text x="304" y="105" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Label / #default slot</text>
  <rect x="472" y="66" width="76" height="72" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <rect x="484" y="80" width="52" height="44" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="510" y="106" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <circle cx="36" cy="52" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="56.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="568" cy="52" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="568" y="56.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <line x1="578" y1="50" x2="612" y2="36" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="616" y="38" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">abs · opacity 0</text>
  <circle cx="568" cy="152" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="568" y="156.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <line x1="578" y1="152" x2="612" y2="152" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="616" y="155" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-style="italic">abs · décoratif</text>
  <circle cx="300" cy="159" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="300" y="163" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <line x1="300" y1="168" x2="300" y2="184" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="300" y="196" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">loader-line | loader-circular</text>
  <circle cx="56" cy="64" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="68" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
  <circle cx="98" cy="72" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="98" y="76" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">6</text>
  <circle cx="304" cy="72" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="304" y="76" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">7</text>
  <circle cx="510" cy="72" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="510" y="76" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">8</text>
  <line x1="46" y1="46" x2="84" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="88" y="30" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-btn</text>
  <line x1="66" y1="60" x2="96" y2="20" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="100" y="20" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__loader · inline-grid 3col</text>
  <text x="350" y="245" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">② ③ ④ = calques absolus, invisibles au repos ou conditionnels</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-btn&gt;</code> — 8 internal parts, each numbered per BEM class. Absolute layers (overlay ②, underlay ③, progress ④) sit over the root; the loader grid ⑤ stacks prepend / content / append in a 3-column inline-grid.`,
        legend: [
            {
                num: 1,
                cls: '.origam-btn',
                descriptionKey: 'components.btn.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;button&gt;</code> by default, <code>&lt;a&gt;</code> when <code>href</code> is set.'
            },
            {
                num: 2,
                cls: '.origam-btn__overlay',
                descriptionKey: 'components.btn.anatomy.overlay',
                descriptionFallback: 'Absolute scrim. <code>opacity: 0</code> → 0.12 hover → 0.2 active. Driven by <code>--origam-btn__overlay---opacity</code>.'
            },
            {
                num: 3,
                cls: '.origam-btn__underlay',
                descriptionKey: 'components.btn.anatomy.underlay',
                descriptionFallback: 'Absolute decorative layer. <code>inset: 0 / pointer-events: none</code>. Reserved for tonal/ghost compositing.'
            },
            {
                num: 4,
                cls: '.origam-btn__progress',
                descriptionKey: 'components.btn.anatomy.progress',
                descriptionFallback: 'Rendered only when <code>loading</code> is active. Modes: linear strip (<code>loader-line</code>) or circular spinner (<code>loader-circular</code>).'
            },
            {
                num: 5,
                cls: '.origam-btn__loader',
                descriptionKey: 'components.btn.anatomy.loader',
                descriptionFallback: '<code>inline-grid</code>, 3 columns: max-content / auto / max-content. In <code>--stacked</code> mode switches to 3 rows.'
            },
            {
                num: 6,
                cls: '.origam-btn__prepend',
                descriptionKey: 'components.btn.anatomy.prepend',
                descriptionFallback: 'Leading slot. Renders <code>prependIcon</code> or <code>prependAvatar</code>, or the <code>#prepend</code> slot. <code>v-if="hasPrepend"</code>.'
            },
            {
                num: 7,
                cls: '.origam-btn__content',
                descriptionKey: 'components.btn.anatomy.content',
                descriptionFallback: 'Label zone. Contains the <code>#default</code> slot. Hidden via <code>opacity: 0</code> in <code>loader-circular</code> mode.'
            },
            {
                num: 8,
                cls: '.origam-btn__append',
                descriptionKey: 'components.btn.anatomy.append',
                descriptionFallback: 'Trailing slot. Renders <code>appendIcon</code> or <code>appendAvatar</code>, or the <code>#append</code> slot. <code>v-if="hasAppend"</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: resolves to <button> or <a> via useLink -->
<component :is="link.tag" class="origam-btn">
  <!-- interaction overlay (hover/active ripple background) -->
  <span class="origam-btn__overlay" />
  <!-- underlay reserved for future use -->
  <span class="origam-btn__underlay" />

  <!-- circular/line progress loader (visible only when loading=true) -->
  <origam-progress class="origam-btn__progress" />

  <!-- inner layout grid: prepend | content | append -->
  <origam-loader class="origam-btn__loader">
    <!-- prepend slot: icon or avatar before label -->
    <span class="origam-btn__prepend">
      <slot name="prepend" />
    </span>

    <!-- main label / icon-only content -->
    <span class="origam-btn__content">
      <slot name="default" />
    </span>

    <!-- append slot: icon or avatar after label -->
    <span class="origam-btn__append">
      <slot name="append" />
    </span>
  </origam-loader>
</component>`,
        classes: [
            {
                cls: 'origam-btn',
                descriptionKey: 'components.btn.anatomy.root',
                descriptionFallback: 'Root element. Renders as <button> by default, or <a> when href/to is set.'
            },
            {
                cls: 'origam-btn__overlay',
                descriptionKey: 'components.btn.anatomy.overlay',
                descriptionFallback: 'Interaction overlay layer. Opacity animates on hover/active to show the surface tint.'
            },
            {
                cls: 'origam-btn__underlay',
                descriptionKey: 'components.btn.anatomy.underlay',
                descriptionFallback: 'Reserved underlay layer (future use). Positioned identically to __overlay.'
            },
            {
                cls: 'origam-btn__progress',
                descriptionKey: 'components.btn.anatomy.progress',
                descriptionFallback: 'OrigamProgress spinner injected when loading=true. Positioned absolutely over the content.'
            },
            {
                cls: 'origam-btn__loader',
                descriptionKey: 'components.btn.anatomy.loader',
                descriptionFallback: 'Inner grid container: grid-template-areas "prepend content append". Hosts all visible children.'
            },
            {
                cls: 'origam-btn__prepend',
                descriptionKey: 'components.btn.anatomy.prepend',
                descriptionFallback: 'Prepend area: grid-area prepend. Hosts prependIcon, prependAvatar, or the prepend slot.'
            },
            {
                cls: 'origam-btn__content',
                descriptionKey: 'components.btn.anatomy.content',
                descriptionFallback: 'Label/icon area: grid-area content. Contains the default slot text or icon-only content.'
            },
            {
                cls: 'origam-btn__append',
                descriptionKey: 'components.btn.anatomy.append',
                descriptionFallback: 'Append area: grid-area append. Hosts appendIcon, appendAvatar, or the append slot.'
            }
        ]
    } satisfies IComponentAnatomy,

    /**
     * CSS VARIABLES
     * Sourced from packages/ds/tokens/component/btn.json
     * + --origam-btn---* vars found in the SCSS <style> block of OrigamBtn.vue.
     */
    cssVars: [
        {
            name: '--origam-btn---background-color',
            defaultValue: '{color.action.secondary.bg}',
            descriptionKey: 'components.btn.css_vars.background_color',
            descriptionFallback: 'Default button background color. Resolves to the secondary action surface.'
        },
        {
            name: '--origam-btn---color',
            defaultValue: '{color.action.secondary.fg}',
            descriptionKey: 'components.btn.css_vars.color',
            descriptionFallback: 'Default foreground (text/icon) color.'
        },
        {
            name: '--origam-btn---height',
            defaultValue: '36px',
            descriptionKey: 'components.btn.css_vars.height',
            descriptionFallback: 'Button height. Overridden per size class (x-small: 20px … x-large: 52px).'
        },
        {
            name: '--origam-btn---font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.btn.css_vars.font_size',
            descriptionFallback: 'Button font size. Overridden per size variant.'
        },
        {
            name: '--origam-btn---font-weight',
            defaultValue: '{font.weight.medium}',
            descriptionKey: 'components.btn.css_vars.font_weight',
            descriptionFallback: 'Button font weight.'
        },
        {
            name: '--origam-btn---letter-spacing',
            defaultValue: '{font.letterSpacing.widest}',
            descriptionKey: 'components.btn.css_vars.letter_spacing',
            descriptionFallback: 'Letter spacing applied to button label.'
        },
        {
            name: '--origam-btn---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.btn.css_vars.border_radius',
            descriptionFallback: 'Border radius. Overridden by rounded prop and icon mode.'
        },
        {
            name: '--origam-btn---border-radius-icon',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.btn.css_vars.border_radius_icon',
            descriptionFallback: 'Border radius when icon=true (full circle).'
        },
        {
            name: '--origam-btn---opacity',
            defaultValue: '1',
            descriptionKey: 'components.btn.css_vars.opacity',
            descriptionFallback: 'Button opacity. Set to --origam-btn---opacity-disabled (0.5) when disabled.'
        },
        {
            name: '--origam-btn---box-shadow-elevated',
            defaultValue: '{shadow.md}',
            descriptionKey: 'components.btn.css_vars.box_shadow_elevated',
            descriptionFallback: 'Box shadow used by variant="elevated".'
        },
        {
            name: '--origam-btn---transition-duration',
            defaultValue: '{motion.duration.slow}',
            descriptionKey: 'components.btn.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for shadow, transform, opacity and background.'
        },
        {
            name: '--origam-btn---density',
            defaultValue: '0px',
            descriptionKey: 'components.btn.css_vars.density',
            descriptionFallback: 'Density offset applied to height and min-width. compact: -8px, comfortable: +8px.'
        },
        {
            name: '--origam-btn__overlay---opacity',
            defaultValue: '0',
            descriptionKey: 'components.btn.css_vars.overlay_opacity',
            descriptionFallback: 'Overlay opacity. Animates on hover (0.12) and active (0.2).'
        }
    ] satisfies IComponentCssVar[],

    /**
     * EXPOSED
     * Sourced from defineExpose({}) in OrigamBtn.vue (line ~450).
     */
    exposed: [
        {
            name: 'group',
            type: 'GroupItemProvide | null',
            descriptionKey: 'components.btn.exposed.group',
            descriptionFallback: 'Group item context when the button is inside a BtnToggle or BtnGroup. Null otherwise.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.btn.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component (e.g. OrigamProgress inside the loader slot).'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.btn.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed btnStyles. Used by OrigamDefaultsProvider to inject styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.btn.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance (used by useStyle to scope injected CSS).'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.btn.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.btn.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.btn.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    /**
     * COMPOSABLE
     * OrigamBtn does NOT ship a dedicated composable.
     * The btn-specific logic (useActive, useHover, useGroupItem, useSelectLink…)
     * is handled by transversal composables inside the component itself.
     * This field is intentionally absent — the template section will be hidden.
     */

    /**
     * ACCESSIBILITY
     * Sourced from OrigamBtn.vue template:
     *   - aria-disabled on <a> when disabled (line 10)
     *   - type="button" on <button> (line 12)
     *   - aria-busy from loading via OrigamProgress (role="progressbar")
     *   - v-ripple for visual feedback
     *   - focus-visible outline in SCSS (:focus-visible block)
     *   - prefers-reduced-motion: transition: none in SCSS
     */
    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.btn.a11y.key_activate',
                actionFallback: 'Activates the button (fires click event). Native <button> behavior.'
            },
            {
                key: 'Tab',
                actionKey: 'components.btn.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.btn.a11y.disabled_note',
                noteFallback: 'When disabled=true and tag is <a>, aria-disabled="true" is set instead of the disabled attribute (which has no effect on anchors). Pointer events are removed via CSS.'
            },
            {
                noteKey: 'components.btn.a11y.focus_note',
                noteFallback: 'Focus-visible outline uses 2px solid currentColor with a 2px offset. The outline is only shown for keyboard navigation (not mouse click).'
            },
            {
                noteKey: 'components.btn.a11y.loading_note',
                noteFallback: 'When loading=true, OrigamProgress is injected with role="progressbar". The button is non-interactive (pointer-events: none) during loading.'
            },
            {
                noteKey: 'components.btn.a11y.reduced_motion_note',
                noteFallback: 'All transitions are disabled under prefers-reduced-motion: reduce.'
            },
            {
                noteKey: 'components.btn.a11y.icon_note',
                noteFallback: 'Icon-only buttons (icon prop) must have an aria-label describing the action — the label text is not visible.'
            }
        ]
    } satisfies IComponentA11y,

    /**
     * DESIGN TOKENS (DTCG)
     * Sourced from packages/ds/tokens/component/btn.json.
     * Only a curated excerpt is shown — see the source file for the full list.
     */
    tokens: {
        sourceFile: 'packages/ds/tokens/component/btn.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types. Figma variables sync via packages/figma-plugin.',
        excerpt: [
            {
                tokenPath: 'btn.background-color',
                value: '{color.action.secondary.bg}',
                type: 'color',
                descriptionKey: 'components.btn.tokens.background_color',
                descriptionFallback: 'Default button background. References the semantic secondary action background.'
            },
            {
                tokenPath: 'btn.color',
                value: '{color.action.secondary.fg}',
                type: 'color',
                descriptionKey: 'components.btn.tokens.color',
                descriptionFallback: 'Default foreground color (text and icons).'
            },
            {
                tokenPath: 'btn.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.btn.tokens.border_radius',
                descriptionFallback: 'Default border radius. Overridden to {radius.full} for icon-only buttons.'
            },
            {
                tokenPath: 'btn.height',
                value: '36px',
                type: 'dimension',
                descriptionKey: 'components.btn.tokens.height',
                descriptionFallback: 'Default height. Size variants override this (height-xs=20px … height-xl=52px).'
            },
            {
                tokenPath: 'btn.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.btn.tokens.font_weight',
                descriptionFallback: 'Label font weight.'
            },
            {
                tokenPath: 'btn.transition-duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.btn.tokens.transition_duration',
                descriptionFallback: 'Duration of shadow, transform, opacity and background transitions.'
            },
            {
                tokenPath: 'btn.box-shadow-elevated',
                value: '{shadow.md}',
                type: 'shadow',
                descriptionKey: 'components.btn.tokens.box_shadow_elevated',
                descriptionFallback: 'Box shadow for variant="elevated".'
            },
            {
                tokenPath: 'btn.primary.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.btn.tokens.primary_background_color',
                descriptionFallback: 'Background when color="primary".'
            }
        ]
    } satisfies IComponentTokens,

    /**
     * PLAYGROUND
     * Controls for the live demo section.
     * Limited to 7 props most relevant for a quick visual demo.
     */
    playground: {
        defaultSlotContent: 'Click me',
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.btn.playground.color',
                labelFallback: 'Color / Intent',
                defaultValue: 'primary',
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
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.btn.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'elevated',
                options: [
                    { label: 'elevated', value: 'elevated' },
                    { label: 'flat', value: 'flat' },
                    { label: 'tonal', value: 'tonal' },
                    { label: 'outlined', value: 'outlined' },
                    { label: 'text', value: 'text' },
                    { label: 'plain', value: 'plain' },
                    { label: 'ghost', value: 'ghost' }
                ]
            },
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.btn.playground.size',
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
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.btn.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: '0', value: '0' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' },
                    { label: 'pill', value: 'pill' }
                ]
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.btn.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-star', value: 'mdi-star' },
                    { label: 'mdi-account', value: 'mdi-account' },
                    { label: 'mdi-check', value: 'mdi-check' },
                    { label: 'mdi-download', value: 'mdi-download' },
                    { label: 'mdi-arrow-right', value: 'mdi-arrow-right' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.btn.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'loading',
                kind: 'switch',
                labelKey: 'components.btn.playground.loading',
                labelFallback: 'Loading',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
