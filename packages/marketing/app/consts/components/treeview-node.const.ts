/**
 * /components/treeview-node — full documentation data for OrigamTreeviewNode.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Treeview/treeview.interface.ts     (ITreeviewNodeProps, ITreeviewNode)
 *   - packages/ds/src/components/Treeview/OrigamTreeviewNode.vue    (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/treeview.json                    (CSS tokens)
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

export const TREEVIEW_NODE_DOC: IComponentDoc = {
    slug: 'treeview-node',
    name: 'TreeviewNode',
    tag: 'origam-treeview-node',
    icon: 'mdi-file-tree',
    category: 'Data Display',
    descriptionKey: 'components.catalog.treeview_node.description',
    descriptionFallback: 'Single node in a Treeview — renders chevron, icon, label and size badge; recursively renders children when expanded. Handles its own expand/select keyboard interactions.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-treeview--design',
    docUrl: 'http://localhost:4000/components/Treeview/OrigamTreeview',

    parentSlug: 'treeview',

    family: [
        {
            slug: 'treeview',
            name: 'Treeview',
            descriptionKey: 'components.catalog.treeview.description',
            descriptionFallback: 'Hierarchical tree structure that manages expansion, selection and guide lines.'
        }
    ],

    related: [
        {
            slug: 'treeview',
            name: 'Treeview',
            kind: 'component',
            descriptionKey: 'components.catalog.treeview.description',
            descriptionFallback: 'Parent container — provides the treeview context via inject.'
        }
    ],

    props: [
        {
            name: 'node',
            type: { label: 'ITreeviewNode', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.treeview_node.props.node.description',
            descriptionFallback: 'The node data object. Shape: { id, label, icon?, size?, children?, disabled?, expandable? }.'
        },
        {
            name: 'depth',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.treeview_node.props.depth.description',
            descriptionFallback: 'Nesting depth level used to compute the inline-start indent via CSS calc. Automatically incremented for child nodes.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'node',
            slotProps: '{ node, depth, isExpanded, isSelected }',
            descriptionKey: 'components.treeview_node.slots.node.description',
            descriptionFallback: 'Custom render slot injected after the row. Receives the current node data, depth, expanded and selected states. Forwarded recursively to all child OrigamTreeviewNode instances.'
        }
    ],

    examples: [
        {
            titleKey: 'components.treeview_node.examples.basic.title',
            titleFallback: 'Standalone node (inside a treeview)',
            lang: 'vue',
            code: `<template>
  <origam-treeview :items="items">
    <template #node="{ node, isExpanded, isSelected }">
      <origam-chip
        v-if="node.size"
        :text="node.size"
        size="x-small"
        color="primary"
        variant="tonal"
      />
    </template>
  </origam-treeview>
</template>

<script setup lang="ts">
const items = [
  {
    id: '1',
    label: 'src',
    children: [
      { id: '2', label: 'main.ts', size: '4 KB' },
      { id: '3', label: 'App.vue', size: '2 KB' }
    ]
  }
]
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-treeview-node',
        svgViewBox: '0 0 640 280',
        svgTitle: 'Anatomy of OrigamTreeviewNode',
        svgDesc: 'Schematic of the TreeviewNode component with 8 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="640" height="280" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- node wrapper -->
  <rect x="20" y="30" width="600" height="230" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- row -->
  <rect x="36" y="46" width="568" height="48" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <!-- guide lines (2 levels) -->
  <rect x="48" y="46" width="2" height="48" fill="var(--origam-color__border---subtle, rgba(168,85,247,0.3))"/>
  <rect x="64" y="46" width="2" height="48" fill="var(--origam-color__border---subtle, rgba(168,85,247,0.2))"/>
  <!-- chevron -->
  <rect x="72" y="58" width="20" height="24" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="82" y="74" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle">›</text>
  <!-- icon -->
  <rect x="98" y="58" width="24" height="24" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="110" y="74" font-size="11" fill="var(--origam-color__text---primary, #1a1035)" text-anchor="middle">📁</text>
  <!-- label -->
  <rect x="130" y="58" width="300" height="24" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="240" y="74" font-size="10" fill="var(--origam-color__text---primary, #1a1035)" font-family="'JetBrains Mono',monospace">node.label</text>
  <!-- size -->
  <rect x="438" y="58" width="60" height="24" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="468" y="74" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">size</text>
  <!-- slot node -->
  <rect x="36" y="106" width="568" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="320" y="128" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#node slot</text>
  <!-- children group -->
  <rect x="36" y="154" width="568" height="88" rx="3" fill="var(--origam-color__surface---sunken, #f9f5ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="320" y="200" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-treeview-node (recursive children)</text>
  <!-- numbers -->
  <circle cx="30" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="30" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="44" cy="54" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="44" y="58" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="48" cy="70" r="7" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="48" y="74" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="82" cy="54" r="7" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="82" y="58" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="110" cy="54" r="7" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="110" y="58" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="240" cy="54" r="7" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="240" y="58" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <circle cx="468" cy="54" r="7" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="468" y="58" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">7</text>
  <circle cx="320" cy="162" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="320" y="166" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">8</text>
  <line x1="30" y1="26" x2="60" y2="10" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="64" y="8" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-treeview-node</text>
  <text x="320" y="260" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">③ guide lines · ④ chevron · ⑤ icon · ⑥ label · ⑦ size — inside ② row; ⑧ = recursive children</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-treeview-node&gt;</code> — 8 parts. The root wrapper holds the interactive row (with guide lines, chevron, icon, label and size) followed by the optional node slot and the recursive children group.`,
        legend: [
            {
                num: 1,
                cls: '.origam-treeview-node',
                descriptionKey: 'components.treeview_node.anatomy.root',
                descriptionFallback: 'Root wrapper, <code>role="none"</code>. Flex column, no ARIA role — ARIA is on the inner row.'
            },
            {
                num: 2,
                cls: '.origam-treeview-node__row',
                descriptionKey: 'components.treeview_node.anatomy.row',
                descriptionFallback: 'Interactive row. <code>role="treeitem"</code>, <code>aria-expanded</code>, <code>aria-selected</code>, <code>aria-disabled</code>, <code>tabindex</code>. Handles click and keyboard events.'
            },
            {
                num: 3,
                cls: '.origam-treeview-node__guide',
                descriptionKey: 'components.treeview_node.anatomy.guide',
                descriptionFallback: 'Vertical guide line repeated once per depth level (depth > 0 and showLines=true). <code>aria-hidden="true"</code>.'
            },
            {
                num: 4,
                cls: '.origam-treeview-node__chevron',
                descriptionKey: 'components.treeview_node.anatomy.chevron',
                descriptionFallback: 'Expand/collapse indicator. Rotates 90° when expanded. Invisible (<code>visibility: hidden</code>) on leaf nodes.'
            },
            {
                num: 5,
                cls: '.origam-treeview-node__icon',
                descriptionKey: 'components.treeview_node.anatomy.icon',
                descriptionFallback: 'Node icon — custom <code>node.icon</code>, or a folder emoji (expanded/collapsed), or a document emoji for leaves. <code>aria-hidden="true"</code>.'
            },
            {
                num: 6,
                cls: '.origam-treeview-node__label',
                descriptionKey: 'components.treeview_node.anatomy.label',
                descriptionFallback: 'Node label text. <code>flex: 1</code>, truncated with ellipsis. Uses the <code>node.label</code> value.'
            },
            {
                num: 7,
                cls: '.origam-treeview-node__size',
                descriptionKey: 'components.treeview_node.anatomy.size',
                descriptionFallback: 'Optional size badge. Only rendered when <code>node.size</code> is provided.'
            },
            {
                num: 8,
                cls: '.origam-treeview-node__children',
                descriptionKey: 'components.treeview_node.anatomy.children',
                descriptionFallback: 'Children container, <code>role="group"</code>, <code>aria-label="{node.label} contents"</code>. Shown only when expanded. Recursively renders <code>&lt;OrigamTreeviewNode&gt;</code> for each child.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: role="none" (ARIA on inner row) -->
<div class="origam-treeview-node" role="none">
  <!-- interactive row: role="treeitem" -->
  <div
    class="origam-treeview-node__row"
    role="treeitem"
    :aria-expanded="hasChildren ? isNodeExpanded : undefined"
    :aria-selected="isSelectable ? isNodeSelected : undefined"
    :aria-disabled="node.disabled || undefined"
    :aria-label="node.label"
    tabindex="0"
  >
    <!-- guide lines (once per depth, v-for + v-if) -->
    <span class="origam-treeview-node__guide" aria-hidden="true" />

    <!-- chevron: rotates on expand, hidden on leaves -->
    <span class="origam-treeview-node__chevron" aria-hidden="true">
      &#8250;
    </span>

    <!-- icon: custom, folder, or leaf -->
    <span class="origam-treeview-node__icon" aria-hidden="true" />

    <!-- label text -->
    <span class="origam-treeview-node__label">{{ node.label }}</span>

    <!-- optional size badge -->
    <span class="origam-treeview-node__size">{{ node.size }}</span>
  </div>

  <!-- custom #node slot (after the row) -->
  <slot name="node" :node="node" :depth="depth" :is-expanded="isNodeExpanded" :is-selected="isNodeSelected" />

  <!-- recursive children (v-if="isNodeExpanded && hasChildren") -->
  <div class="origam-treeview-node__children" role="group">
    <origam-treeview-node v-for="child in node.children" :key="child.id" :node="child" :depth="depth + 1" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-treeview-node',
                descriptionKey: 'components.treeview_node.anatomy.root',
                descriptionFallback: 'Root wrapper. role="none", flex column.'
            },
            {
                cls: 'origam-treeview-node--expanded',
                descriptionKey: 'components.treeview_node.anatomy.expanded',
                descriptionFallback: 'Applied when the node is in expanded state.'
            },
            {
                cls: 'origam-treeview-node--selected',
                descriptionKey: 'components.treeview_node.anatomy.selected',
                descriptionFallback: 'Applied when the node is in selected state.'
            },
            {
                cls: 'origam-treeview-node--disabled',
                descriptionKey: 'components.treeview_node.anatomy.disabled',
                descriptionFallback: 'Applied when node.disabled=true.'
            },
            {
                cls: 'origam-treeview-node__row',
                descriptionKey: 'components.treeview_node.anatomy.row',
                descriptionFallback: 'Interactive row element. Carries role="treeitem" and all ARIA attributes.'
            },
            {
                cls: 'origam-treeview-node__row--selected',
                descriptionKey: 'components.treeview_node.anatomy.row_selected',
                descriptionFallback: 'Applied to the row when selected.'
            },
            {
                cls: 'origam-treeview-node__row--disabled',
                descriptionKey: 'components.treeview_node.anatomy.row_disabled',
                descriptionFallback: 'Applied to the row when disabled.'
            },
            {
                cls: 'origam-treeview-node__row--selectable',
                descriptionKey: 'components.treeview_node.anatomy.row_selectable',
                descriptionFallback: 'Applied to the row when the node can be selected.'
            },
            {
                cls: 'origam-treeview-node__guide',
                descriptionKey: 'components.treeview_node.anatomy.guide',
                descriptionFallback: 'Vertical guide line. Rendered once per depth level when showLines is active.'
            },
            {
                cls: 'origam-treeview-node__chevron',
                descriptionKey: 'components.treeview_node.anatomy.chevron',
                descriptionFallback: 'Expand indicator. Rotates on expand, hidden on leaf nodes.'
            },
            {
                cls: 'origam-treeview-node__chevron--expanded',
                descriptionKey: 'components.treeview_node.anatomy.chevron_expanded',
                descriptionFallback: 'Applied when node is expanded. Rotates chevron 90°.'
            },
            {
                cls: 'origam-treeview-node__chevron--hidden',
                descriptionKey: 'components.treeview_node.anatomy.chevron_hidden',
                descriptionFallback: 'Applied on leaf nodes (visibility: hidden, space preserved).'
            },
            {
                cls: 'origam-treeview-node__icon',
                descriptionKey: 'components.treeview_node.anatomy.icon',
                descriptionFallback: 'Node icon element. aria-hidden="true".'
            },
            {
                cls: 'origam-treeview-node__label',
                descriptionKey: 'components.treeview_node.anatomy.label',
                descriptionFallback: 'Node label. flex: 1, truncated with ellipsis.'
            },
            {
                cls: 'origam-treeview-node__size',
                descriptionKey: 'components.treeview_node.anatomy.size',
                descriptionFallback: 'Size badge. Only rendered when node.size is provided.'
            },
            {
                cls: 'origam-treeview-node__children',
                descriptionKey: 'components.treeview_node.anatomy.children',
                descriptionFallback: 'Children container. role="group", shown only when expanded.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-treeview---indent-size',
            defaultValue: '16px',
            descriptionKey: 'components.treeview_node.css_vars.indent_size',
            descriptionFallback: 'Indent per depth level. Applied via CSS calc on the row padding-inline-start.'
        },
        {
            name: '--origam-treeview---row-height',
            defaultValue: '32px',
            descriptionKey: 'components.treeview_node.css_vars.row_height',
            descriptionFallback: 'Minimum row height.'
        },
        {
            name: '--origam-treeview---row-padding-inline',
            defaultValue: '8px',
            descriptionKey: 'components.treeview_node.css_vars.row_padding_inline',
            descriptionFallback: 'Horizontal padding added to the base indent on the row.'
        },
        {
            name: '--origam-treeview---row-bg-hover',
            defaultValue: 'var(--origam-color__surface---overlay)',
            descriptionKey: 'components.treeview_node.css_vars.row_bg_hover',
            descriptionFallback: 'Row background on hover.'
        },
        {
            name: '--origam-treeview---row-bg-selected',
            defaultValue: 'var(--origam-color__action--primary---bgSubtle)',
            descriptionKey: 'components.treeview_node.css_vars.row_bg_selected',
            descriptionFallback: 'Row background when selected.'
        },
        {
            name: '--origam-treeview---row-color-selected',
            defaultValue: 'var(--origam-color__action--primary---fgSubtle)',
            descriptionKey: 'components.treeview_node.css_vars.row_color_selected',
            descriptionFallback: 'Label color when selected.'
        },
        {
            name: '--origam-treeview---row-color-disabled',
            defaultValue: 'var(--origam-color__text---disabled)',
            descriptionKey: 'components.treeview_node.css_vars.row_color_disabled',
            descriptionFallback: 'Label color when disabled.'
        },
        {
            name: '--origam-treeview---chevron-size',
            defaultValue: '16px',
            descriptionKey: 'components.treeview_node.css_vars.chevron_size',
            descriptionFallback: 'Width and height of the chevron element.'
        },
        {
            name: '--origam-treeview---chevron-color',
            defaultValue: 'var(--origam-color__text---secondary)',
            descriptionKey: 'components.treeview_node.css_vars.chevron_color',
            descriptionFallback: 'Color of the chevron glyph.'
        },
        {
            name: '--origam-treeview---guide-color',
            defaultValue: 'var(--origam-color__border---subtle)',
            descriptionKey: 'components.treeview_node.css_vars.guide_color',
            descriptionFallback: 'Color of the vertical guide lines.'
        },
        {
            name: '--origam-treeview---guide-thickness',
            defaultValue: '1px',
            descriptionKey: 'components.treeview_node.css_vars.guide_thickness',
            descriptionFallback: 'Thickness of the vertical guide lines.'
        },
        {
            name: '--origam-treeview---label-font-size',
            defaultValue: '0.75rem',
            descriptionKey: 'components.treeview_node.css_vars.label_font_size',
            descriptionFallback: 'Font size of the node label.'
        },
        {
            name: '--origam-treeview---icon-size',
            defaultValue: '16px',
            descriptionKey: 'components.treeview_node.css_vars.icon_size',
            descriptionFallback: 'Font size of the node icon.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.treeview_node.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'isNodeExpanded',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.treeview_node.exposed.is_node_expanded',
            descriptionFallback: 'Reactive ref: true when this node is currently expanded.'
        },
        {
            name: 'isNodeSelected',
            type: 'ComputedRef<boolean>',
            descriptionKey: 'components.treeview_node.exposed.is_node_selected',
            descriptionFallback: 'Reactive ref: true when this node is currently selected.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.treeview_node.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.treeview_node.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.treeview_node.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.treeview_node.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.treeview_node.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['treeitem'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.treeview_node.a11y.key_activate',
                actionFallback: 'Selects the node (if selectable) or toggles expansion (if it has children and is not selectable).'
            },
            {
                key: 'ArrowRight',
                actionKey: 'components.treeview_node.a11y.key_arrow_right',
                actionFallback: 'If collapsed and has children: expands. If expanded and has children: moves focus to first child.'
            },
            {
                key: 'ArrowLeft',
                actionKey: 'components.treeview_node.a11y.key_arrow_left',
                actionFallback: 'If expanded: collapses the node. If collapsed: moves focus to the parent treeitem.'
            },
            {
                key: 'Tab',
                actionKey: 'components.treeview_node.a11y.key_tab',
                actionFallback: 'Moves focus out of the tree to the next focusable element in the page.'
            }
        ],
        notes: [
            {
                noteKey: 'components.treeview_node.a11y.role_note',
                noteFallback: 'OrigamTreeviewNode uses a wrapper with role="none" and an inner interactive div with role="treeitem". ARIA attributes (aria-expanded, aria-selected, aria-disabled, aria-label) are applied to the inner row only.'
            },
            {
                noteKey: 'components.treeview_node.a11y.group_note',
                noteFallback: 'The children container uses role="group" with aria-label="{node.label} contents" as required by the ARIA tree pattern.'
            },
            {
                noteKey: 'components.treeview_node.a11y.focus_note',
                noteFallback: 'Focus-visible outline is applied on the row via :focus-visible (2px solid, outline-offset: -2px).'
            },
            {
                noteKey: 'components.treeview_node.a11y.decorative_note',
                noteFallback: 'Guide lines, chevron and icon are all aria-hidden="true". Only the label contributes to the accessible name (supplemented by aria-label="node.label" on the treeitem).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/treeview.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. All node-level tokens inherit from the root treeview token group.',
        excerpt: [
            {
                tokenPath: 'treeview.indent-size',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.treeview_node.tokens.indent_size',
                descriptionFallback: 'Indent per depth level.'
            },
            {
                tokenPath: 'treeview.row-height',
                value: '{space.8}',
                type: 'dimension',
                descriptionKey: 'components.treeview_node.tokens.row_height',
                descriptionFallback: 'Minimum row height.'
            },
            {
                tokenPath: 'treeview.row-bg-hover',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.treeview_node.tokens.row_bg_hover',
                descriptionFallback: 'Row background on hover.'
            },
            {
                tokenPath: 'treeview.row-bg-selected',
                value: '{color.action.primary.bgSubtle}',
                type: 'color',
                descriptionKey: 'components.treeview_node.tokens.row_bg_selected',
                descriptionFallback: 'Row background when selected.'
            },
            {
                tokenPath: 'treeview.label-font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.treeview_node.tokens.label_font_size',
                descriptionFallback: 'Font size of the node label.'
            },
            {
                tokenPath: 'treeview.guide-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.treeview_node.tokens.guide_color',
                descriptionFallback: 'Color of the vertical guide lines.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'depth',
                kind: 'number',
                labelKey: 'components.treeview_node.playground.depth',
                labelFallback: 'Depth level',
                defaultValue: 0
            }
        ]
    } satisfies IComponentPlayground
}
