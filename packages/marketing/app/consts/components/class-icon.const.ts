/**
 * /components/class-icon — full documentation data for OrigamClassIcon.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Icon/icon.interface.ts          (IIconComponentProps)
 *   - packages/ds/src/components/Icon/OrigamClassIcon.vue        (template BEM, defineExpose)
 *
 * PARENT: icon
 * FAMILY: Icon/ sub-components
 */
import type {
    IComponentDoc,
    IComponentExposed,
    IComponentA11y
} from '~/interfaces/components-catalog.interface'

export const CLASS_ICON_DOC: IComponentDoc = {
    slug: 'class-icon',
    name: 'ClassIcon',
    tag: 'origam-class-icon',
    icon: 'mdi-format-color-fill',
    category: 'Media & Display',
    descriptionKey: 'components.catalog.class_icon.description',
    descriptionFallback: 'Renders a CSS class-based icon (e.g. MDI font) by applying the icon string as a class on the root element.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-icon--design',
    docUrl: 'http://localhost:4000/components/Icon/OrigamIcon',

    parentSlug: 'icon',

    family: [
        {
            slug: 'icon',
            name: 'Icon',
            descriptionKey: 'components.catalog.icon.description',
            descriptionFallback: 'Universal icon renderer that dispatches to the correct icon strategy.'
        },
        {
            slug: 'component-icon',
            name: 'ComponentIcon',
            descriptionKey: 'components.catalog.component_icon.description',
            descriptionFallback: 'Renders a Vue component as an icon.'
        }
    ],

    props: [
        {
            name: 'icon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.class_icon.props.icon.description',
            descriptionFallback: 'MDI class name or any CSS icon class applied to the root element, e.g. "mdi-star".'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.class_icon.props.size.description',
            descriptionFallback: 'Named size token (x-small…x-large) or a numeric pixel value applied as font-size and line-height.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'i'",
            descriptionKey: 'components.class_icon.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <i>.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.class_icon.props.disabled.description',
            descriptionFallback: 'Applies reduced opacity and blocks pointer events.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.class_icon.props.color.description',
            descriptionFallback: 'Foreground color intent or CSS color for the icon glyph.'
        }
    ],

    emits: [],

    slots: [],

    examples: [
        {
            titleKey: 'components.class_icon.examples.basic.title',
            titleFallback: 'Basic MDI class icon',
            lang: 'vue',
            code: `<template>
  <origam-class-icon icon="mdi-star" />
  <origam-class-icon icon="mdi-heart" size="large" color="danger" />
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { icon: 'mdi-star' } },
        { label: 'large', props: { icon: 'mdi-heart', size: 'large' } },
        { label: 'colored', props: { icon: 'mdi-check-circle', color: 'success', size: 'large' } }
    ],

    anatomy: {
        rootClass: 'origam-icon',
        svgViewBox: '0 0 400 120',
        svgTitle: 'Anatomy of OrigamClassIcon',
        svgDesc: 'Schematic of ClassIcon with 1 internal part.',
        svg: `
  <rect x="0" y="0" width="400" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="30" width="80" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="80" y="67" font-size="22" text-anchor="middle" font-family="'Material Design Icons'" fill="var(--origam-color__action--primary---bg, #7c3aed)">★</text>
  <circle cx="48" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <line x1="57" y1="38" x2="160" y2="30" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="164" y="33" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-icon</text>
  <text x="164" y="47" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">icon class applied as className</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-class-icon&gt;</code> — 1 part. The icon string is applied directly as a CSS class on the root <code>&lt;i&gt;</code> element.',
        legend: [
            {
                num: 1,
                cls: '.origam-icon',
                descriptionKey: 'components.class_icon.anatomy.root',
                descriptionFallback: 'Root element (defaults to <code>&lt;i&gt;</code>). The <code>icon</code> prop value is injected as a CSS class, e.g. <code>mdi-star</code>.'
            }
        ],
        code: `<i class="origam-icon mdi mdi-star" />`,
        classes: [
            {
                cls: 'origam-icon',
                descriptionKey: 'components.class_icon.anatomy.root',
                descriptionFallback: 'Base class applied to the root element. Always present.'
            },
            {
                cls: 'origam-icon--size-{size}',
                descriptionKey: 'components.class_icon.anatomy.size',
                descriptionFallback: 'Size modifier when a named TSize token is passed, e.g. origam-icon--size-large.'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-icon---font-size',
            defaultValue: '24px',
            descriptionKey: 'components.class_icon.css_vars.font_size',
            descriptionFallback: 'Icon font-size. Overridden per size variant class.'
        }
    ],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.class_icon.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.class_icon.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.class_icon.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.class_icon.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.class_icon.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.class_icon.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.class_icon.a11y.decorative',
                noteFallback: 'Decorative icons should have aria-hidden="true" on the parent OrigamIcon. When meaningful, pass aria-label on the wrapping interactive element.'
            }
        ]
    } satisfies IComponentA11y
}
