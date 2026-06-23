/**
 * /components/window-item — documentation data for OrigamWindowItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Window/window-item.interface.ts (props/emits)
 *   - packages/ds/src/components/Window/OrigamWindowItem.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/window.json                   (window-item tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const WINDOW_ITEM_DOC: IComponentDoc = {
    slug: 'window-item',
    name: 'WindowItem',
    tag: 'origam-window-item',
    icon: 'mdi-page-next-outline',
    category: 'Layout',
    parentSlug: 'window',
    descriptionKey: 'components.catalog.window_item.description',
    descriptionFallback: 'A single pane inside an OrigamWindow. Holds the content for one window value and animates in/out with the window transition (per-item override possible).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-window--design',
    docUrl: 'http://localhost:4000/components/Window/OrigamWindowItem',

    family: [
        {
            slug: 'window',
            name: 'Window',
            descriptionKey: 'components.catalog.window.description',
            descriptionFallback: 'Slide switcher container that orchestrates the active WindowItem.'
        }
    ],

    related: [
        {
            slug: 'window',
            name: 'Window',
            kind: 'component',
            descriptionKey: 'components.catalog.window.description',
            descriptionFallback: 'Parent container — provides the group context this item registers into.'
        }
    ],

    props: [
        {
            name: 'value',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window_item.props.value.description',
            descriptionFallback: 'Identifier for this pane. The parent Window shows the item whose value matches its modelValue.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window_item.props.disabled.description',
            descriptionFallback: 'Prevents this pane from becoming active via navigation.'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window_item.props.selected_class.description',
            descriptionFallback: 'Class applied to the item while it is the active pane.'
        },
        {
            name: 'transition',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window_item.props.transition.description',
            descriptionFallback: 'Overrides the parent Window transition for this pane when entering in the forward direction.'
        },
        {
            name: 'reverseTransition',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window_item.props.reverse_transition.description',
            descriptionFallback: 'Overrides the transition used when this pane enters in the reverse direction.'
        }
    ],

    emits: [
        {
            event: 'group:selected',
            payload: { label: '{ value: any }', slug: '', kind: 'primitive' },
            descriptionKey: 'components.window_item.emits.group_selected.description',
            descriptionFallback: 'Fired by the group machinery when this item becomes the active pane.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.window_item.slots.default.description',
            descriptionFallback: 'Pane content shown while this item is active.'
        }
    ],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.window_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.window_item.exposed.css',
            descriptionFallback: 'Reactive scoped CSS string generated for this item.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.window_item.exposed.id',
            descriptionFallback: 'Unique style-sheet id for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.window_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.window_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.window_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ],

    cssVars: [
        {
            name: '--origam-window-item---x-transition-duration',
            defaultValue: '{motion.duration.slow}',
            descriptionKey: 'components.window_item.css_vars.x_transition_duration',
            descriptionFallback: 'Duration of the horizontal slide transition.'
        },
        {
            name: '--origam-window-item---x-transition-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.window_item.css_vars.x_transition_easing',
            descriptionFallback: 'Easing curve of the horizontal slide transition.'
        },
        {
            name: '--origam-window-item---y-transition-duration',
            defaultValue: '{motion.duration.slow}',
            descriptionKey: 'components.window_item.css_vars.y_transition_duration',
            descriptionFallback: 'Duration of the vertical slide transition.'
        },
        {
            name: '--origam-window-item---y-transition-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.window_item.css_vars.y_transition_easing',
            descriptionFallback: 'Easing curve of the vertical slide transition.'
        }
    ],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                key: 'components.window_item.a11y.tabpanel',
                fallback: 'When used to build a tab interface, give the WindowItem role="tabpanel" and wire aria-labelledby to its controlling tab.'
            },
            {
                key: 'components.window_item.a11y.inert',
                fallback: 'Inactive panes are removed from the flow; lazy-rendered items are not in the DOM until first activated.'
            }
        ]
    },

    tokens: {
        source: 'packages/ds/tokens/component/window.json',
        tokens: [
            {
                tokenPath: 'window-item.x-transition-duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.window_item.tokens.x_transition_duration',
                descriptionFallback: 'Horizontal transition duration.'
            },
            {
                tokenPath: 'window-item.y-transition-duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.window_item.tokens.y_transition_duration',
                descriptionFallback: 'Vertical transition duration.'
            }
        ]
    } satisfies IComponentTokens,

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-window-item',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamWindowItem',
        svgDesc: 'Schematic of a single window pane inside its parent Window.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="160" rx="6" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1.5" stroke-dasharray="5 3"/>
  <rect x="44" y="44" width="612" height="112" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="104" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Active pane content (#default slot)</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="52" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="52" y="56" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-window-item&gt;</code> — the parent Window ① mounts only the active item ② and animates it with the window transition.`,
        legend: [
            {
                num: 1,
                cls: '.origam-window (parent)',
                descriptionKey: 'components.window_item.anatomy.window',
                descriptionFallback: 'Parent OrigamWindow. Provides the group context and the active value.'
            },
            {
                num: 2,
                cls: '.origam-window-item',
                descriptionKey: 'components.window_item.anatomy.item',
                descriptionFallback: 'The pane itself (flex: 1 1 auto). Rendered only while active; transitions via the x/y transition tokens.'
            }
        ] satisfies IComponentAnatomyLegendItem[]
    } satisfies IComponentAnatomy
}
