/**
 * /components/avatar — full documentation data for OrigamAvatar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Avatar/avatar.interface.ts       (IAvatarProps / IAvatarEmits)
 *   - packages/ds/src/interfaces/Avatar/avatar-group.interface.ts (IAvatarGroupProps)
 *   - packages/ds/src/components/Avatar/OrigamAvatar.vue          (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/avatar.json                    (CSS tokens)
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

export const AVATAR_DOC: IComponentDoc = {
    slug: 'avatar',
    name: 'Avatar',
    tag: 'origam-avatar',
    icon: 'mdi-account-circle',
    category: 'Data Display',
    descriptionKey: 'components.catalog.avatar.description',
    descriptionFallback: 'Circular or rounded media container for user images, icons or initials text.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-avatar--design',
    docUrl: 'http://localhost:4000/components/Avatar/OrigamAvatar',

    family: [
        {
            slug: 'avatar-group',
            name: 'AvatarGroup',
            descriptionKey: 'components.catalog.avatar_group.description',
            descriptionFallback: 'Stacked group of Avatar elements with overflow counter and hover/click expand.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'image',
            type: { label: 'string | ISrcObject', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.image.description',
            descriptionFallback: 'Image URL or ISrcObject (srcset / lazy-src). Takes precedence over icon and text.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.icon.description',
            descriptionFallback: 'MDI or custom icon rendered centered inside the avatar. Shown when no image is provided.'
        },
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.text.description',
            descriptionFallback: 'Initials or short label rendered inside the avatar when no image or icon is set.'
        },
        // ── ISizeProps ──────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.avatar.props.size.description',
            descriptionFallback: 'Controls the avatar diameter via design tokens (24 / 32 / 40 / 48 / 56px).'
        },
        // ── IDensityProps ───────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.avatar.props.density.description',
            descriptionFallback: 'Adjusts the effective avatar size via the density offset.'
        },
        // ── IRoundedProps ───────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.rounded.description',
            descriptionFallback: 'Border-radius token. Default is full circle ({radius.full}).'
        },
        // ── IColorProps / IBgColorProps ─────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.color.description',
            descriptionFallback: 'Foreground/text color applied to the avatar surface.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.bg_color.description',
            descriptionFallback: 'Background color of the avatar when no image is shown.'
        },
        // ── IElevationProps ─────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        // ── IBorderProps ────────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.avatar.props.border.description',
            descriptionFallback: 'Applies a border ring around the avatar.'
        },
        // ── IActiveProps ────────────────────────────────────────────────
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.avatar.props.active.description',
            descriptionFallback: 'Forces the avatar into its active/selected visual state.'
        },
        // ── IHoverProps ─────────────────────────────────────────────────
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.avatar.props.hover.description',
            descriptionFallback: 'Enables hover state tracking and propagation.'
        },
        // ── ITagProps ───────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.avatar.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        }
    ],

    emits: [
        {
            event: 'update:hover',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.avatar.emits.update_hover.description',
            descriptionFallback: 'Propagates the hover state when hover tracking is enabled.'
        },
        {
            event: 'update:active',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.avatar.emits.update_active.description',
            descriptionFallback: 'Propagates the active/selected state.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.avatar.slots.default.description',
            descriptionFallback: 'Custom content rendered inside the avatar, replacing image/icon/text auto-rendering.'
        },
        {
            slot: 'avatar',
            slotProps: '—',
            descriptionKey: 'components.avatar.slots.avatar.description',
            descriptionFallback: 'Replaces the OrigamImg element inside the image zone.'
        },
        {
            slot: 'icon',
            slotProps: '—',
            descriptionKey: 'components.avatar.slots.icon.description',
            descriptionFallback: 'Replaces the OrigamIcon element inside the icon zone.'
        },
        {
            slot: 'text',
            slotProps: '—',
            descriptionKey: 'components.avatar.slots.text.description',
            descriptionFallback: 'Replaces the text span inside the text zone.'
        }
    ],

    examples: [
        {
            titleKey: 'components.avatar.examples.types.title',
            titleFallback: 'Image, icon and text',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <origam-avatar image="https://i.pravatar.cc/80" />
    <origam-avatar icon="mdi-account" bg-color="primary" />
    <origam-avatar text="AB" bg-color="success" />
  </div>
</template>`
        },
        {
            titleKey: 'components.avatar.examples.sizes.title',
            titleFallback: 'Sizes',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 1rem; align-items: center;">
    <origam-avatar size="x-small" icon="mdi-account" bg-color="secondary" />
    <origam-avatar size="small"   icon="mdi-account" bg-color="secondary" />
    <origam-avatar size="default" icon="mdi-account" bg-color="secondary" />
    <origam-avatar size="large"   icon="mdi-account" bg-color="secondary" />
    <origam-avatar size="x-large" icon="mdi-account" bg-color="secondary" />
  </div>
</template>`
        },
        {
            titleKey: 'components.avatar.examples.group.title',
            titleFallback: 'Avatar Group',
            lang: 'vue',
            code: `<template>
  <origam-avatar-group :max="3" size="default">
    <origam-avatar image="https://i.pravatar.cc/80?img=1" />
    <origam-avatar image="https://i.pravatar.cc/80?img=2" />
    <origam-avatar image="https://i.pravatar.cc/80?img=3" />
    <origam-avatar image="https://i.pravatar.cc/80?img=4" />
    <origam-avatar image="https://i.pravatar.cc/80?img=5" />
  </origam-avatar-group>
</template>`
        }
    ],

    previewVariants: [
        { label: 'image', props: { image: 'https://i.pravatar.cc/80?img=10', size: 'default' } },
        { label: 'icon', props: { icon: 'mdi-account', bgColor: 'primary', size: 'default' } },
        { label: 'text', props: { text: 'AB', bgColor: 'success', size: 'default' } },
        { label: 'large', props: { icon: 'mdi-star', bgColor: 'warning', size: 'large' } },
        { label: 'rounded', props: { icon: 'mdi-home', bgColor: 'secondary', rounded: 'md' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-avatar',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamAvatar',
        svgDesc: 'Schematic of the Avatar component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <circle cx="350" cy="100" r="72" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="350" cy="100" r="72" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.5"/>
  <circle cx="350" cy="100" r="60" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <rect x="320" y="70" width="60" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="350" y="104" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">image/icon/text</text>
  <circle cx="282" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="282" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="302" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="302" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="322" cy="78" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="322" y="82" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="290" y1="32" x2="350" y2="32" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="480" y="36" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-avatar</text>
  <text x="480" y="52" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__wrapper</text>
  <text x="480" y="70" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__image / __icon / __text</text>
  <text x="350" y="186" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Priority: image → icon → text (mutually exclusive slots)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-avatar&gt;</code> — 4 internal parts. Content priority: <code>image</code> wins over <code>icon</code> wins over <code>text</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-avatar',
                descriptionKey: 'components.avatar.anatomy.root',
                descriptionFallback: 'Root element. Circle by default via <code>border-radius: {radius.full}</code>. Size tokens set <code>height</code> and <code>width</code>.'
            },
            {
                num: 2,
                cls: '.origam-avatar__wrapper',
                descriptionKey: 'components.avatar.anatomy.wrapper',
                descriptionFallback: 'Inner flex container (<code>inline-flex; align-items: center; justify-content: center</code>). Fills 100% of the root.'
            },
            {
                num: 3,
                cls: '.origam-avatar__image',
                descriptionKey: 'components.avatar.anatomy.image',
                descriptionFallback: 'Image container. Present only when <code>hasImage</code>. Wraps <code>OrigamImg</code> with <code>overflow: hidden; border-radius: inherit</code>. Creates a stacking context for the negative z-index on the inner img.'
            },
            {
                num: 4,
                cls: '.origam-avatar__icon / .origam-avatar__text',
                descriptionKey: 'components.avatar.anatomy.icon_text',
                descriptionFallback: 'Fallback content zones. <code>__icon</code> wraps <code>OrigamIcon</code>; <code>__text</code> wraps a <code>&lt;span&gt;</code> with initials. Mutually exclusive with the image zone.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-avatar origam-avatar--size-default">
  <div class="origam-avatar__wrapper">
    <!-- Image mode -->
    <div class="origam-avatar__image">
      <origam-img cover eager ... />
    </div>

    <!-- Icon mode (when no image) -->
    <div class="origam-avatar__icon">
      <origam-icon :icon="icon" />
    </div>

    <!-- Text/initials mode (when no image or icon) -->
    <div class="origam-avatar__text">
      <span>{{ text }}</span>
    </div>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-avatar',
                descriptionKey: 'components.avatar.anatomy.root',
                descriptionFallback: 'Root element. Full circle by default.'
            },
            {
                cls: 'origam-avatar__wrapper',
                descriptionKey: 'components.avatar.anatomy.wrapper',
                descriptionFallback: 'Inner centering flex container.'
            },
            {
                cls: 'origam-avatar__image',
                descriptionKey: 'components.avatar.anatomy.image',
                descriptionFallback: 'Image container with overflow hidden and border-radius inherit.'
            },
            {
                cls: 'origam-avatar__icon',
                descriptionKey: 'components.avatar.anatomy.icon',
                descriptionFallback: 'Icon container (fallback when no image).'
            },
            {
                cls: 'origam-avatar__text',
                descriptionKey: 'components.avatar.anatomy.text',
                descriptionFallback: 'Initials/text container (fallback when no image or icon).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-avatar---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.avatar.css_vars.background_color',
            descriptionFallback: 'Avatar background when no image is shown. Overridden by bgColor prop and status.'
        },
        {
            name: '--origam-avatar---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.avatar.css_vars.color',
            descriptionFallback: 'Foreground (icon/text) color. Overridden by color prop and status.'
        },
        {
            name: '--origam-avatar---border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.avatar.css_vars.border_radius',
            descriptionFallback: 'Border radius. Full circle by default; overridden by the rounded prop.'
        },
        {
            name: '--origam-avatar---height',
            defaultValue: '40px',
            descriptionKey: 'components.avatar.css_vars.height',
            descriptionFallback: 'Avatar height. Set per size variant (24 / 32 / 40 / 48 / 56px).'
        },
        {
            name: '--origam-avatar---width',
            defaultValue: '40px',
            descriptionKey: 'components.avatar.css_vars.width',
            descriptionFallback: 'Avatar width. Set per size variant (same as height).'
        },
        {
            name: '--origam-avatar---density',
            defaultValue: '0px',
            descriptionKey: 'components.avatar.css_vars.density',
            descriptionFallback: 'Density offset subtracted from height and width. compact=+8px, comfortable=-8px.'
        },
        {
            name: '--origam-avatar---font-size',
            defaultValue: '{font.size.3xl}',
            descriptionKey: 'components.avatar.css_vars.font_size',
            descriptionFallback: 'Icon/text font size. Set per size variant.'
        },
        {
            name: '--origam-avatar---box-shadow',
            defaultValue: '{shadow.none}',
            descriptionKey: 'components.avatar.css_vars.box_shadow',
            descriptionFallback: 'Avatar box shadow. Changed to {shadow.md} when elevation is set.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.avatar.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.avatar.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed avatarStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.avatar.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.avatar.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.avatar.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.avatar.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.avatar.a11y.alt_note',
                noteFallback: 'When using the image prop, pass an ISrcObject with an alt property to provide a text alternative for screen readers. Plain string URLs result in an empty alt.'
            },
            {
                noteKey: 'components.avatar.a11y.icon_note',
                noteFallback: 'Icon-only avatars should be wrapped in a container with an accessible label (e.g. aria-label on the parent) when they convey meaning.'
            },
            {
                noteKey: 'components.avatar.a11y.interactive_note',
                noteFallback: 'When active=true or the avatar is used in an interactive context (click handlers), wrap it in a button or add role="button" with a keyboard handler.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/avatar.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'avatar.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.avatar.tokens.background_color',
                descriptionFallback: 'Default avatar background (when no image).'
            },
            {
                tokenPath: 'avatar.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.avatar.tokens.border_radius',
                descriptionFallback: 'Full-circle border radius by default.'
            },
            {
                tokenPath: 'avatar.size-md',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.avatar.tokens.size_md',
                descriptionFallback: 'Default size (40×40px).'
            },
            {
                tokenPath: 'avatar.size-xs',
                value: '24px',
                type: 'dimension',
                descriptionKey: 'components.avatar.tokens.size_xs',
                descriptionFallback: 'X-small size (24×24px).'
            },
            {
                tokenPath: 'avatar.size-xl',
                value: '72px',
                type: 'dimension',
                descriptionKey: 'components.avatar.tokens.size_xl',
                descriptionFallback: 'X-large size (72×72px).'
            },
            {
                tokenPath: 'avatar.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.avatar.tokens.transition_duration',
                descriptionFallback: 'Transition duration for size, dimension and color changes.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'bgColor',
                kind: 'select',
                labelKey: 'components.avatar.playground.bg_color',
                labelFallback: 'Background color',
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
                prop: 'size',
                kind: 'select',
                labelKey: 'components.avatar.playground.size',
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
                prop: 'icon',
                kind: 'select',
                labelKey: 'components.avatar.playground.icon',
                labelFallback: 'Icon',
                defaultValue: 'mdi-account',
                options: [
                    { label: 'mdi-account', value: 'mdi-account' },
                    { label: 'mdi-star', value: 'mdi-star' },
                    { label: 'mdi-heart', value: 'mdi-heart' },
                    { label: 'mdi-check', value: 'mdi-check' },
                    { label: '(none)', value: '' }
                ]
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.avatar.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: 'circle (default)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: '0', value: '0' }
                ]
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.avatar.playground.border',
                labelFallback: 'Border',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
