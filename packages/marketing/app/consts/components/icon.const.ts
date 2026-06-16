/**
 * /components/icon — full documentation data for OrigamIcon.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/Icon/icon.interface.ts
 * cross-checked against packages/ds/src/components/Icon/OrigamIcon.vue.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const ICON_DOC: IComponentDoc = {
    slug: 'icon',
    name: 'Icon',
    tag: 'origam-icon',
    icon: 'mdi-star-four-points',
    category: 'Media & Display',
    descriptionKey: 'components.catalog.icon.description',
    descriptionFallback: 'Universal icon renderer that adapts to MDI class icons, SVG paths, component-based icons and Unicode ligatures.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-icon--design',
    docUrl: 'http://localhost:4000/components/Icon/OrigamIcon',

    family: [
        {
            slug: 'icon-class',
            name: 'ClassIcon',
            descriptionKey: 'components.catalog.icon_class.description',
            descriptionFallback: 'Renders a CSS class-based icon (e.g. MDI font).'
        },
        {
            slug: 'icon-svg',
            name: 'SvgIcon',
            descriptionKey: 'components.catalog.icon_svg.description',
            descriptionFallback: 'Renders an inline SVG path icon.'
        },
        {
            slug: 'icon-component',
            name: 'ComponentIcon',
            descriptionKey: 'components.catalog.icon_component.description',
            descriptionFallback: 'Renders a Vue component as an icon.'
        },
        {
            slug: 'icon-ligature',
            name: 'LigatureIcon',
            descriptionKey: 'components.catalog.icon_ligature.description',
            descriptionFallback: 'Renders a ligature-based icon (Material Symbols / Material Icons font).'
        }
    ],

    props: [
        // ── IIconComponentProps own props ──────────────────────────────
        {
            name: 'icon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.icon.description',
            descriptionFallback: 'Icon identifier. Accepts an MDI name (mdi-*), a SVG path string, or a component reference.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.icon.props.disabled.description',
            descriptionFallback: 'Disables pointer interaction and applies a muted visual state.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'i'",
            descriptionKey: 'components.icon.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <i>.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: "'x-small' | 'small' | 'default' | 'large' | 'x-large' | number", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.icon.props.size.description',
            descriptionFallback: 'Controls the icon font-size via design tokens.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.color.description',
            descriptionFallback: 'Icon color. Accepts a semantic intent or a CSS color string.'
        },
        {
            name: 'bgColor',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.bg_color.description',
            descriptionFallback: 'Background color rendered behind the icon.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.height.description',
            descriptionFallback: 'Explicit height override.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.width.description',
            descriptionFallback: 'Explicit width override.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the icon container.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.icon.props.border.description',
            descriptionFallback: 'Applies a border around the icon container.'
        },
        // ── IPaddingProps / IMarginProps ───────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.padding.description',
            descriptionFallback: 'Shorthand padding applied to the icon container.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.icon.props.margin.description',
            descriptionFallback: 'Shorthand margin around the icon container.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.icon.slots.default.description',
            descriptionFallback: 'Text node that acts as the icon identifier (ligature mode). Also used to override the rendered icon with custom content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.icon.examples.basic.title',
            titleFallback: 'Basic icons',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.75rem; align-items: center;">
    <origam-icon icon="mdi-home" />
    <origam-icon icon="mdi-account" color="primary" />
    <origam-icon icon="mdi-star" size="large" color="warning" />
    <origam-icon icon="mdi-heart" size="x-large" color="danger" />
  </div>
</template>`
        },
        {
            titleKey: 'components.icon.examples.sizes.title',
            titleFallback: 'Sizes',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.75rem; align-items: center;">
    <origam-icon icon="mdi-bell" size="x-small" />
    <origam-icon icon="mdi-bell" size="small" />
    <origam-icon icon="mdi-bell" size="default" />
    <origam-icon icon="mdi-bell" size="large" />
    <origam-icon icon="mdi-bell" size="x-large" />
  </div>
</template>`
        },
        {
            titleKey: 'components.icon.examples.styled.title',
            titleFallback: 'Styled icon container',
            lang: 'vue',
            code: `<template>
  <origam-icon
    icon="mdi-check"
    color="success"
    bg-color="success"
    rounded="circle"
    size="large"
    padding="2"
  />
</template>`
        }
    ]
}
