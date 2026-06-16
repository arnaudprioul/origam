/**
 * /components/treeview — full documentation data for OrigamTreeview.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Treeview/treeview.interface.ts  (props)
 *   - packages/ds/src/components/Treeview/OrigamTreeview.vue     (template BEM, defineExpose, emits)
 *   - packages/ds/src/components/Treeview/OrigamTreeviewNode.vue (sub-component)
 *   - packages/ds/tokens/component/treeview.json                 (CSS tokens)
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

export const TREEVIEW_DOC: IComponentDoc = {
    slug: 'treeview',
    name: 'Treeview',
    tag: 'origam-treeview',
    icon: 'mdi-file-tree',
    category: 'Data Display',
    descriptionKey: 'components.catalog.treeview.description',
    descriptionFallback: 'Hierarchical tree structure with expand/collapse, single/multi selection and optional guide lines. Items are defined via a typed ITreeviewNode list.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-treeview--design',
    docUrl: 'http://localhost:4000/components/Treeview/OrigamTreeview',

    family: [
        {
            slug: 'treeview-node',
            name: 'TreeviewNode',
            descriptionKey: 'components.catalog.treeview_node.description',
            descriptionFallback: 'Single node in a Treeview: renders the chevron, icon, label and size, and recursively renders children.'
        }
    ],

    props: [
        // ── Own props ─────────────────────────────────────────────
        {
            name: 'items',
            type: { label: 'ITreeviewNode[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            required: true,
            descriptionKey: 'components.treeview.props.items.description',
            descriptionFallback: 'Array of ITreeviewNode objects defining the tree. Each node has id, label, optional icon, size, disabled, expandable and children fields.'
        },
        {
            name: 'modelValue',
            type: { label: 'string[] | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.treeview.props.model_value.description',
            descriptionFallback: 'v-model for the selected node id(s). String for single, string[] for multiple selection.'
        },
        {
            name: 'expandedValue',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.treeview.props.expanded_value.description',
            descriptionFallback: 'Array of expanded node ids. Synced via the update:expandedValue emit.'
        },
        {
            name: 'selectMode',
            type: { label: 'TTreeviewSelectMode', slug: 'treeview-select-mode', kind: 'type' },
            defaultValue: "'none'",
            descriptionKey: 'components.treeview.props.select_mode.description',
            descriptionFallback: 'Selection behavior: none (no selection), single (one at a time) or multiple (checkbox-style).'
        },
        {
            name: 'selectableNodes',
            type: { label: 'TTreeviewSelectableNodes', slug: 'treeview-selectable-nodes', kind: 'type' },
            defaultValue: "'leaf'",
            descriptionKey: 'components.treeview.props.selectable_nodes.description',
            descriptionFallback: 'Which nodes can be selected: leaf (only leaf nodes), branch (only parents) or all.'
        },
        {
            name: 'showLines',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.treeview.props.show_lines.description',
            descriptionFallback: 'Renders vertical guide lines connecting sibling nodes at each depth level.'
        },
        {
            name: 'expandOnClick',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.treeview.props.expand_on_click.description',
            descriptionFallback: 'When true, clicking anywhere on the row expands/collapses it. When false, only the chevron icon triggers expand.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.treeview.props.color.description',
            descriptionFallback: 'Color applied to selected nodes (row background and text). Accepts semantic intents.'
        },
        // ── ISizeProps ─────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.treeview.props.size.description',
            descriptionFallback: 'Controls icon and chevron size via the size token scale.'
        },
        // ── IDensityProps ──────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.treeview.props.density.description',
            descriptionFallback: 'Row height density.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string[] | string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.treeview.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected set changes.'
        },
        {
            event: 'update:expandedValue',
            payload: { label: 'string[]', slug: '', kind: 'primitive' },
            descriptionKey: 'components.treeview.emits.update_expanded_value.description',
            descriptionFallback: 'Fired when a node is expanded or collapsed.'
        },
        {
            event: 'select',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.treeview.emits.select.description',
            descriptionFallback: 'Fired when a node is selected. Payload is the node id.'
        },
        {
            event: 'toggle',
            payload: { label: 'string, boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.treeview.emits.toggle.description',
            descriptionFallback: 'Fired when a node is expanded/collapsed. Payload: (id, expanded).'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.treeview.examples.basic.title',
            titleFallback: 'Basic file tree',
            lang: 'vue',
            code: `<script setup lang="ts">
import type { ITreeviewNode } from 'origam'

const items: ITreeviewNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: 'mdi-folder',
    children: [
      { id: 'main', label: 'main.ts', icon: 'mdi-language-typescript' },
      { id: 'app',  label: 'App.vue', icon: 'mdi-vuejs' }
    ]
  },
  { id: 'pkg', label: 'package.json', icon: 'mdi-code-json' }
]
</script>
<template>
  <origam-treeview :items="items" show-lines />
</template>`
        },
        {
            titleKey: 'components.treeview.examples.selection.title',
            titleFallback: 'Single selection',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import type { ITreeviewNode } from 'origam'

const selected = ref<string>()
const items: ITreeviewNode[] = [
  { id: 'a', label: 'Node A' },
  { id: 'b', label: 'Node B', children: [
    { id: 'b1', label: 'Node B1' }
  ] }
]
</script>
<template>
  <origam-treeview
    v-model="selected"
    :items="items"
    select-mode="single"
  />
  <p>Selected: {{ selected }}</p>
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'default tree',
            props: { showLines: true, selectMode: 'none', expandOnClick: false }
        },
        {
            label: 'single select',
            props: { showLines: true, selectMode: 'single', expandOnClick: true }
        },
        {
            label: 'no lines',
            props: { showLines: false, selectMode: 'none' }
        },
        {
            label: 'colored selection',
            props: { showLines: true, selectMode: 'single', color: 'primary' }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-treeview',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamTreeview',
        svgDesc: 'Schematic showing the Treeview root and one TreeviewNode with its parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="380" height="180" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <line x1="50" y1="60" x2="50" y2="160" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <rect x="30" y="50" width="350" height="36" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="70" y="71" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" font-family="'JetBrains Mono',monospace">src/</text>
  <text x="40" y="71" font-size="14" fill="var(--origam-color__text---tertiary, #7e5fb0)">›</text>
  <rect x="50" y="100" width="320" height="32" rx="4" fill="transparent"/>
  <text x="80" y="121" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" font-family="'JetBrains Mono',monospace">main.ts</text>
  <rect x="50" y="140" width="320" height="32" rx="4" fill="transparent"/>
  <text x="80" y="161" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" font-family="'JetBrains Mono',monospace">App.vue</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="38" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="50" cy="58" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="50" cy="110" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="50" y="114" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-treeview&gt;</code> — the root ① is a <code>role="tree"</code> container; each node ② is a <code>role="treeitem"</code> with a chevron ③ and recursive children ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-treeview',
                descriptionKey: 'components.treeview.anatomy.root',
                descriptionFallback: 'Root element. role="tree", aria-multiselectable when selectMode="multiple".'
            },
            {
                num: 2,
                cls: '.origam-treeview-node',
                descriptionKey: 'components.treeview.anatomy.node',
                descriptionFallback: 'Each node row. role="treeitem". aria-selected, aria-expanded, aria-disabled are set dynamically.'
            },
            {
                num: 3,
                cls: '.origam-treeview-node__chevron',
                descriptionKey: 'components.treeview.anatomy.chevron',
                descriptionFallback: 'Expand/collapse indicator. Rotated 90° when the node is expanded.'
            },
            {
                num: 4,
                cls: '.origam-treeview-node__children',
                descriptionKey: 'components.treeview.anatomy.children',
                descriptionFallback: 'Container for child nodes. Indented by indent-size per depth level.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div role="tree" class="origam-treeview" aria-label="File tree">
  <origam-treeview-node
    v-for="node in items"
    :key="node.id"
    :node="node"
    :depth="0"
  />
</div>`,
        classes: [
            { cls: 'origam-treeview', descriptionKey: 'components.treeview.anatomy.root', descriptionFallback: 'Root tree container.' },
            { cls: 'origam-treeview-node', descriptionKey: 'components.treeview.anatomy.node', descriptionFallback: 'Individual node wrapper.' },
            { cls: 'origam-treeview-node__chevron', descriptionKey: 'components.treeview.anatomy.chevron', descriptionFallback: 'Expand icon.' },
            { cls: 'origam-treeview-node__label', descriptionKey: 'components.treeview.anatomy.label', descriptionFallback: 'Node label text.' },
            { cls: 'origam-treeview-node__children', descriptionKey: 'components.treeview.anatomy.children', descriptionFallback: 'Children container (indented).' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-treeview---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.treeview.css_vars.background_color',
            descriptionFallback: 'Treeview background color.'
        },
        {
            name: '--origam-treeview---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.treeview.css_vars.color',
            descriptionFallback: 'Default node text color.'
        },
        {
            name: '--origam-treeview---indent-size',
            defaultValue: '{space.4}',
            descriptionKey: 'components.treeview.css_vars.indent_size',
            descriptionFallback: 'Per-depth indentation size.'
        },
        {
            name: '--origam-treeview---row-height',
            defaultValue: '{space.8}',
            descriptionKey: 'components.treeview.css_vars.row_height',
            descriptionFallback: 'Height of each tree row.'
        },
        {
            name: '--origam-treeview---row-bg-hover',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.treeview.css_vars.row_bg_hover',
            descriptionFallback: 'Row background on hover.'
        },
        {
            name: '--origam-treeview---row-bg-selected',
            defaultValue: '{color.action.primary.bgSubtle}',
            descriptionKey: 'components.treeview.css_vars.row_bg_selected',
            descriptionFallback: 'Row background when selected.'
        },
        {
            name: '--origam-treeview---guide-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.treeview.css_vars.guide_color',
            descriptionFallback: 'Color of the vertical guide lines (show-lines).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.treeview.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'isExpanded',
            type: '(id: string) => boolean',
            descriptionKey: 'components.treeview.exposed.is_expanded',
            descriptionFallback: 'Returns true if the given node id is currently expanded.'
        },
        {
            name: 'isSelected',
            type: '(id: string) => boolean',
            descriptionKey: 'components.treeview.exposed.is_selected',
            descriptionFallback: 'Returns true if the given node id is in the selected set.'
        },
        {
            name: 'toggleExpanded',
            type: '(id: string) => void',
            descriptionKey: 'components.treeview.exposed.toggle_expanded',
            descriptionFallback: 'Programmatically expand or collapse a node by id.'
        },
        {
            name: 'toggleSelected',
            type: '(id: string) => void',
            descriptionKey: 'components.treeview.exposed.toggle_selected',
            descriptionFallback: 'Programmatically select or deselect a node by id.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.treeview.exposed.css',
            descriptionFallback: 'Reactive CSS string for computed styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.treeview.exposed.id',
            descriptionFallback: 'Unique style-sheet ID.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.treeview.exposed.load',
            descriptionFallback: 'Injects the style sheet on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.treeview.exposed.unload',
            descriptionFallback: 'Removes the style sheet on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.treeview.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['tree', 'treeitem'],
        keyboard: [
            {
                key: 'ArrowRight',
                actionKey: 'components.treeview.a11y.key_expand',
                actionFallback: 'Expands a collapsed node, or moves focus to the first child of an already-expanded node.'
            },
            {
                key: 'ArrowLeft',
                actionKey: 'components.treeview.a11y.key_collapse',
                actionFallback: 'Collapses an expanded node, or moves focus to the parent node.'
            },
            {
                key: 'ArrowDown / ArrowUp',
                actionKey: 'components.treeview.a11y.key_vertical',
                actionFallback: 'Moves focus to the next/previous visible node in the tree.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.treeview.a11y.key_select',
                actionFallback: 'Selects the focused node (when selectMode is not none).'
            }
        ],
        notes: [
            {
                noteKey: 'components.treeview.a11y.aria_roles',
                noteFallback: 'Root element has role="tree"; each node has role="treeitem". aria-selected, aria-expanded and aria-disabled are set reactively.'
            },
            {
                noteKey: 'components.treeview.a11y.multiselect',
                noteFallback: 'aria-multiselectable is set to true on the tree root when selectMode="multiple".'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/treeview.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'treeview.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.treeview.tokens.background_color',
                descriptionFallback: 'Tree background.'
            },
            {
                tokenPath: 'treeview.row-bg-selected',
                value: '{color.action.primary.bgSubtle}',
                type: 'color',
                descriptionKey: 'components.treeview.tokens.row_bg_selected',
                descriptionFallback: 'Row background when selected.'
            },
            {
                tokenPath: 'treeview.indent-size',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.treeview.tokens.indent_size',
                descriptionFallback: 'Indentation per depth level.'
            },
            {
                tokenPath: 'treeview.guide-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.treeview.tokens.guide_color',
                descriptionFallback: 'Guide line color.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'selectMode',
                kind: 'select',
                labelKey: 'components.treeview.playground.select_mode',
                labelFallback: 'Select mode',
                defaultValue: 'none',
                options: [
                    { label: 'none', value: 'none' },
                    { label: 'single', value: 'single' },
                    { label: 'multiple', value: 'multiple' }
                ]
            },
            {
                prop: 'selectableNodes',
                kind: 'select',
                labelKey: 'components.treeview.playground.selectable_nodes',
                labelFallback: 'Selectable nodes',
                defaultValue: 'leaf',
                options: [
                    { label: 'leaf', value: 'leaf' },
                    { label: 'branch', value: 'branch' },
                    { label: 'all', value: 'all' }
                ]
            },
            {
                prop: 'showLines',
                kind: 'switch',
                labelKey: 'components.treeview.playground.show_lines',
                labelFallback: 'Show guide lines',
                defaultValue: true
            },
            {
                prop: 'expandOnClick',
                kind: 'switch',
                labelKey: 'components.treeview.playground.expand_on_click',
                labelFallback: 'Expand on row click',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.treeview.playground.color',
                labelFallback: 'Selection color',
                defaultValue: 'primary',
                options: [
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
