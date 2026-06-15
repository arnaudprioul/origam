/**
 * /components/btn — full documentation data for OrigamBtn.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Btn/btn.interface.ts
 * cross-checked against packages/ds/src/components/Btn/OrigamBtn.vue.
 * The .md doc was used only for descriptions and example copy.
 *
 * Props are grouped for readability; the table on the page renders them flat.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

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
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.text.description',
            descriptionFallback: 'Button label text. Can also be set via the default slot.'
        },
        {
            name: 'active',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.active.description',
            descriptionFallback: 'Forces the button into its active/pressed visual state.'
        },
        {
            name: 'icon',
            type: 'boolean | TIcon',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.icon.description',
            descriptionFallback: 'Renders the button as an icon-only button. Pass true to shrink padding, or a TIcon string to also set the icon.'
        },
        {
            name: 'block',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.block.description',
            descriptionFallback: 'Makes the button fill the full width of its container.'
        },
        {
            name: 'slim',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.slim.description',
            descriptionFallback: 'Reduces horizontal padding for tighter layouts.'
        },
        {
            name: 'stacked',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.stacked.description',
            descriptionFallback: 'Stacks the prepend icon above the label text vertically.'
        },
        {
            name: 'flat',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.flat.description',
            descriptionFallback: 'Deprecated. Use variant="flat" instead. Kept for backward compatibility.'
        },
        // ── IVariantProps ──────────────────────────────────────────────
        {
            name: 'variant',
            type: "'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain' | 'ghost'",
            defaultValue: "'elevated'",
            descriptionKey: 'components.btn.props.variant.description',
            descriptionFallback: 'Visual style variant. Controls elevation, fill and border rendering.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: 'TIntent | string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the button surface. Accepts semantic intents (primary, success, danger…) or a CSS color. Hex values emit a deprecation warning since v0.4.'
        },
        {
            name: 'bgColor',
            type: 'TIntent | string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.bg_color.description',
            descriptionFallback: 'Background color override, independent of the intent color.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: "'x-small' | 'small' | 'default' | 'large' | 'x-large' | number",
            defaultValue: "'default'",
            descriptionKey: 'components.btn.props.size.description',
            descriptionFallback: 'Controls the button height and font-size via design tokens.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: "'default' | 'compact' | 'comfortable'",
            defaultValue: "'default'",
            descriptionKey: 'components.btn.props.density.description',
            descriptionFallback: 'Adjusts vertical and horizontal padding density.'
        },
        // ── IAdjacentProps ─────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: 'TIcon',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.prepend_icon.description',
            descriptionFallback: 'MDI or custom icon displayed before the label.'
        },
        {
            name: 'appendIcon',
            type: 'TIcon',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.append_icon.description',
            descriptionFallback: 'MDI or custom icon displayed after the label.'
        },
        {
            name: 'prependAvatar',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar displayed in the prepend slot.'
        },
        {
            name: 'appendAvatar',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar displayed in the append slot.'
        },
        // ── IStatusProps ───────────────────────────────────────────────
        {
            name: 'disabled',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.disabled.description',
            descriptionFallback: 'Disables the button. Sets aria-disabled and prevents click events.'
        },
        {
            name: 'loading',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.loading.description',
            descriptionFallback: 'Shows a progress spinner and sets aria-busy while true.'
        },
        {
            name: 'readonly',
            type: 'boolean',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.readonly.description',
            descriptionFallback: 'Makes the button non-interactive without disabling it visually.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: 'string',
            defaultValue: "'button'",
            descriptionKey: 'components.btn.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to button; becomes a when href or to is set.'
        },
        // ── ILinkProps ─────────────────────────────────────────────────
        {
            name: 'href',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.href.description',
            descriptionFallback: 'Renders the button as an anchor tag pointing to this URL.'
        },
        {
            name: 'to',
            type: 'string | RouteLocationRaw',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.to.description',
            descriptionFallback: 'Vue Router destination. Automatically sets tag="a" and uses router-link.'
        },
        {
            name: 'target',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.target.description',
            descriptionFallback: 'Anchor target attribute, e.g. "_blank".'
        },
        {
            name: 'rel',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.rel.description',
            descriptionFallback: 'Anchor rel attribute, e.g. "noopener noreferrer".'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean",
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean. true = theme default; pill = full-round.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: 'boolean | string',
            defaultValue: 'false',
            descriptionKey: 'components.btn.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for the default border or a CSS shorthand.'
        },
        {
            name: 'borderColor',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.border_color.description',
            descriptionFallback: 'Override border color without affecting width or style.'
        },
        {
            name: 'borderStyle',
            type: 'string',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.border_style.description',
            descriptionFallback: 'Override border style (solid, dashed, dotted…).'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token. Overrides the variant default elevation.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: 'string | number',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.height.description',
            descriptionFallback: 'Overrides the button height. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'width',
            type: 'string | number',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.width.description',
            descriptionFallback: 'Overrides the button width.'
        },
        {
            name: 'minWidth',
            type: 'string | number',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.min_width.description',
            descriptionFallback: 'Minimum button width.'
        },
        {
            name: 'maxWidth',
            type: 'string | number',
            defaultValue: 'undefined',
            descriptionKey: 'components.btn.props.max_width.description',
            descriptionFallback: 'Maximum button width.'
        },
        // ── ILoaderProps ───────────────────────────────────────────────
        {
            name: 'loaderKind',
            type: "'overlay' | 'skeleton' | 'line'",
            defaultValue: "'overlay'",
            descriptionKey: 'components.btn.props.loader_kind.description',
            descriptionFallback: 'Controls which spinner style is shown while loading=true.'
        },
        // ── IRippleProps ───────────────────────────────────────────────
        {
            name: 'ripple',
            type: 'boolean | RippleDirectiveBinding',
            defaultValue: 'true',
            descriptionKey: 'components.btn.props.ripple.description',
            descriptionFallback: 'Enables the Material ripple effect on click. Set to false to disable.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: 'MouseEvent',
            descriptionKey: 'components.btn.emits.click.description',
            descriptionFallback: 'Fired on button click. Also fires on Enter/Space for keyboard users.'
        },
        {
            event: 'click:prepend',
            payload: 'MouseEvent',
            descriptionKey: 'components.btn.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the prepend slot area. Stops propagation.'
        },
        {
            event: 'click:append',
            payload: 'MouseEvent',
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
    ]
}
