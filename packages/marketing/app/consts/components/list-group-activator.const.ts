/**
 * /components/list-group-activator — full documentation data for OrigamListGroupActivator.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/List/list-group.interface.ts        (IListActivatorProps)
 *   - packages/ds/src/components/List/OrigamListGroupActivator.vue   (template BEM, defineExpose)
 *   - packages/ds/tokens/component/list.json                         (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const LIST_GROUP_ACTIVATOR_DOC: IComponentDoc = {
    slug: 'list-group-activator',
    name: 'ListGroupActivator',
    tag: 'origam-list-group-activator',
    icon: 'mdi-format-list-group',
    category: 'Data Display',
    descriptionKey: 'components.catalog.list_group_activator.description',
    descriptionFallback: 'Internal wrapper component that registers the nested group activator context via useNestedGroupActivator. Consumed internally by OrigamListGroup to wire the toggle header to the expand/collapse mechanism.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-list--design',
    docUrl: 'http://localhost:4000/components/List/OrigamList',
    parentSlug: 'list-group',

    family: [],

    related: [
        {
            slug: 'list-group',
            name: 'ListGroup',
            kind: 'component',
            descriptionKey: 'components.catalog.list_group.description',
            descriptionFallback: 'Parent collapsible group that owns OrigamListGroupActivator as its header slot.'
        },
        {
            slug: 'list',
            name: 'List',
            kind: 'component',
            descriptionKey: 'components.catalog.list.description',
            descriptionFallback: 'Container for List, ListGroup and ListSubheader components.'
        }
    ],

    props: [
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.list_group_activator.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to div; can be set to any valid HTML tag by the parent (e.g. header).'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.list_group_activator.slots.default.description',
            descriptionFallback: 'Content of the activator header — typically a ListItem with the group title and expand icon.'
        }
    ],

    examples: [
        {
            titleKey: 'components.list_group_activator.examples.implicit.title',
            titleFallback: 'Implicit usage via ListGroup',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-group title="Settings">
      <origam-list-item title="Profile" />
      <origam-list-item title="Password" />
    </origam-list-group>
  </origam-list>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-list-group-activator',
        svgViewBox: '0 0 700 140',
        svgTitle: 'Anatomy of OrigamListGroupActivator',
        svgDesc: 'Schematic showing the activator wrapper element wrapping the header slot content.',
        svg: `
  <rect x="0" y="0" width="700" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="30" y="30" width="640" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="38" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="60" y="44" width="560" height="52" rx="4" fill="var(--origam-color__surface---sunken, #f3eeff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="340" y="73" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot — ListItem / custom activator header</text>
  <circle cx="68" cy="52" r="8" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="68" y="56" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-list-group-activator&gt;</code> — a transparent wrapper ① rendered as the tag prop value (default: <code>&lt;div&gt;</code>). The default slot ② holds the activator header content (typically a ListItem).`,
        legend: [
            {
                num: 1,
                cls: '.origam-list-group-activator',
                descriptionKey: 'components.list_group_activator.anatomy.root',
                descriptionFallback: 'Root element. Rendered via <component :is="tag"> — defaults to <div>. Registers the nested group activator context via useNestedGroupActivator() on mount.'
            },
            {
                num: 2,
                cls: '#default slot',
                descriptionKey: 'components.list_group_activator.anatomy.slot',
                descriptionFallback: 'Default slot content — the interactive header element (usually an OrigamListItem) that the user clicks to expand/collapse the ListGroup.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" class="origam-list-group-activator">
  <slot name="default" />
</component>`,
        classes: [
            {
                cls: 'origam-list-group-activator',
                descriptionKey: 'components.list_group_activator.anatomy.root',
                descriptionFallback: 'Root wrapper element. Registers useNestedGroupActivator context so child ListItems can toggle the parent ListGroup open/close state.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.list_group_activator.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.list_group_activator.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.list_group_activator.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.list_group_activator.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.list_group_activator.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list_group_activator.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.list_group_activator.a11y.context',
                noteFallback: 'OrigamListGroupActivator is a context-only wrapper — it has no ARIA role or keyboard contract of its own. The slotted content (OrigamListItem) owns the interactive surface with the correct aria-expanded and role="button" attributes.'
            },
            {
                noteKey: 'components.list_group_activator.a11y.transparent',
                noteFallback: 'The component renders a plain <div> (or tag prop value) with no ARIA attributes added at this level. It is transparent to the accessibility tree.'
            }
        ]
    } satisfies IComponentA11y
}
