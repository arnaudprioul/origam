/**
 * /components/component-icon — full documentation data for OrigamComponentIcon.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Icon/icon.interface.ts          (IIconComponentProps)
 *   - packages/ds/src/components/Icon/OrigamComponentIcon.vue    (template BEM, defineExpose)
 *
 * PARENT: icon
 * FAMILY: Icon/ sub-components
 */
import type {
    IComponentDoc,
    IComponentExposed,
    IComponentA11y
} from '~/interfaces/components-catalog.interface'

export const COMPONENT_ICON_DOC: IComponentDoc = {
    slug: 'component-icon',
    name: 'ComponentIcon',
    tag: 'origam-component-icon',
    icon: 'mdi-puzzle-outline',
    category: 'Media & Display',
    descriptionKey: 'components.catalog.component_icon.description',
    descriptionFallback: 'Renders a Vue component as an icon by using <component :is="icon"> inside the root wrapper.',
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
            slug: 'class-icon',
            name: 'ClassIcon',
            descriptionKey: 'components.catalog.class_icon.description',
            descriptionFallback: 'Renders a CSS class-based icon (e.g. MDI font).'
        }
    ],

    props: [
        {
            name: 'icon',
            type: { label: 'TIcon', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.component_icon.props.icon.description',
            descriptionFallback: 'A Vue component reference rendered as the icon via <component :is="icon">.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.component_icon.props.size.description',
            descriptionFallback: 'Named size token or numeric pixel value. Applied as font-size, width and height.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.component_icon.props.tag.description',
            descriptionFallback: 'HTML element wrapping the component icon. Defaults to <div>.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.component_icon.props.disabled.description',
            descriptionFallback: 'Applies reduced opacity and blocks pointer events.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.component_icon.props.color.description',
            descriptionFallback: 'Foreground color intent or CSS color applied to the wrapper.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.component_icon.slots.default.description',
            descriptionFallback: 'Fallback slot. When provided, replaces the dynamic component rendering.'
        }
    ],

    examples: [
        {
            titleKey: 'components.component_icon.examples.basic.title',
            titleFallback: 'Vue component as icon',
            lang: 'vue',
            code: `<script setup>
import MyLogoIcon from './MyLogoIcon.vue'
</script>
<template>
  <origam-component-icon :icon="MyLogoIcon" size="large" />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-icon',
        svgViewBox: '0 0 400 120',
        svgTitle: 'Anatomy of OrigamComponentIcon',
        svgDesc: 'Schematic of ComponentIcon with 2 internal parts.',
        svg: `
  <rect x="0" y="0" width="400" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="20" width="100" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="55" y="35" width="70" height="50" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="90" y="65" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">&lt;component/&gt;</text>
  <circle cx="48" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="63" cy="43" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="63" y="47" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="57" y1="28" x2="160" y2="20" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="164" y="23" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-icon (wrapper div)</text>
  <line x1="72" y1="43" x2="160" y2="60" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="164" y="63" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">&lt;component :is="icon"&gt;</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-component-icon&gt;</code> — 2 parts. The wrapper <code>div</code> hosts a dynamic <code>&lt;component :is="icon"&gt;</code>.',
        legend: [
            {
                num: 1,
                cls: '.origam-icon',
                descriptionKey: 'components.component_icon.anatomy.root',
                descriptionFallback: 'Root wrapper element (defaults to <code>&lt;div&gt;</code>). Carries size classes and style overrides.'
            },
            {
                num: 2,
                cls: '.origam-icon--component',
                descriptionKey: 'components.component_icon.anatomy.component',
                descriptionFallback: 'Modifier class identifying this as a component-strategy icon. The Vue component from the <code>icon</code> prop is rendered inside.'
            }
        ],
        code: `<div class="origam-icon origam-icon--component">
  <component :is="iconComponent" v-if="hasIcon" />
  <slot name="default" />
</div>`,
        classes: [
            {
                cls: 'origam-icon',
                descriptionKey: 'components.component_icon.anatomy.root',
                descriptionFallback: 'Base wrapper class. Always present.'
            },
            {
                cls: 'origam-icon--component',
                descriptionKey: 'components.component_icon.anatomy.component',
                descriptionFallback: 'Strategy modifier. Signals the component-icon rendering path.'
            },
            {
                cls: 'origam-icon--size-{size}',
                descriptionKey: 'components.component_icon.anatomy.size',
                descriptionFallback: 'Size modifier when a named TSize token is passed.'
            }
        ]
    },

    cssVars: [
        {
            name: '--origam-icon---font-size',
            defaultValue: '24px',
            descriptionKey: 'components.component_icon.css_vars.font_size',
            descriptionFallback: 'Controls width and height of the component icon wrapper.'
        }
    ],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.component_icon.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.component_icon.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.component_icon.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.component_icon.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.component_icon.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.component_icon.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.component_icon.a11y.decorative',
                noteFallback: 'Decorative icons should have aria-hidden="true". When used as a meaningful icon, the parent interactive element must carry an aria-label.'
            }
        ]
    } satisfies IComponentA11y
}
