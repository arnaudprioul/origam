/**
 * /components/virtual-scroll-item — full documentation data for OrigamVirtualScrollItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/VirtualScroll/virtual-scroll-item.interface.ts   (IVirtualScrollItemProps, IVirtualScrollItemEmits)
 *   - packages/ds/src/components/VirtualScroll/OrigamVirtualScrollItem.vue        (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/virtual-scroll.json                            (CSS tokens)
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

export const VIRTUAL_SCROLL_ITEM_DOC: IComponentDoc = {
    slug: 'virtual-scroll-item',
    name: 'VirtualScrollItem',
    tag: 'origam-virtual-scroll-item',
    icon: 'mdi-view-list',
    category: 'Data Display',
    descriptionKey: 'components.catalog.virtual_scroll_item.description',
    descriptionFallback: 'Per-item wrapper used by OrigamVirtualScroll — attaches a ResizeObserver to measure its height and emits update:height so the virtual engine can recalculate padding spacers.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-virtual-scroll--design',
    docUrl: 'http://localhost:4000/components/VirtualScroll/OrigamVirtualScroll',

    parentSlug: 'virtual-scroll',

    family: [
        {
            slug: 'virtual-scroll',
            name: 'VirtualScroll',
            descriptionKey: 'components.catalog.virtual_scroll.description',
            descriptionFallback: 'Window-based virtual list renderer that only mounts visible rows, keeping the DOM small for arbitrarily large datasets.'
        }
    ],

    related: [
        {
            slug: 'virtual-scroll',
            name: 'VirtualScroll',
            kind: 'component',
            descriptionKey: 'components.catalog.virtual_scroll.description',
            descriptionFallback: 'Parent virtual scroller — injects OrigamVirtualScrollItem internally for each visible slot.'
        }
    ],

    props: [
        {
            name: 'renderless',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.virtual_scroll_item.props.renderless.description',
            descriptionFallback: 'When true the component renders no wrapper element — instead it exposes a renderless slot with an itemRef binding for the consumer\'s root element to be observed by ResizeObserver.'
        }
    ],

    emits: [
        {
            event: 'update:height',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.virtual_scroll_item.emits.update_height.description',
            descriptionFallback: 'Fired whenever the ResizeObserver detects a height change on the item element. The virtual engine uses this value to update its intrinsic-size cache.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.virtual_scroll_item.slots.default.description',
            descriptionFallback: 'Item content rendered inside the wrapper div (non-renderless mode). The wrapper div itself is observed by ResizeObserver.'
        },
        {
            slot: 'renderless',
            slotProps: '{ itemRef }',
            descriptionKey: 'components.virtual_scroll_item.slots.renderless.description',
            descriptionFallback: 'Only available when renderless=true. Provides the itemRef template-ref callback that must be bound to the consumer\'s root element so ResizeObserver can observe it.'
        }
    ],

    examples: [
        {
            titleKey: 'components.virtual_scroll_item.examples.default.title',
            titleFallback: 'Within a VirtualScroll (internal usage)',
            lang: 'vue',
            code: `<template>
  <!-- OrigamVirtualScroll renders OrigamVirtualScrollItem internally.
       Consumers rarely use it directly. -->
  <origam-virtual-scroll :items="largeList" :item-height="48">
    <template #default="{ item }">
      <div style="padding: 8px 16px;">{{ item.label }}</div>
    </template>
  </origam-virtual-scroll>
</template>

<script setup lang="ts">
const largeList = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: \`Item \${i + 1}\` }))
</script>`
        },
        {
            titleKey: 'components.virtual_scroll_item.examples.renderless.title',
            titleFallback: 'Renderless mode (advanced)',
            lang: 'vue',
            code: `<template>
  <origam-virtual-scroll-item renderless @update:height="onHeight">
    <template #renderless="{ itemRef }">
      <article :ref="itemRef" class="custom-item">
        Custom item with variable height
      </article>
    </template>
  </origam-virtual-scroll-item>
</template>

<script setup lang="ts">
const onHeight = (h: number) => console.log('height:', h)
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-virtual-scroll-item',
        svgViewBox: '0 0 560 200',
        svgTitle: 'Anatomy of OrigamVirtualScrollItem',
        svgDesc: 'Schematic of the VirtualScrollItem component with 2 numbered modes.',
        svg: `
  <rect x="0" y="0" width="560" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- wrapper mode -->
  <rect x="20" y="30" width="240" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="140" y="56" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">renderless=false</text>
  <rect x="36" y="66" width="208" height="84" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="140" y="110" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <!-- renderless mode -->
  <rect x="300" y="30" width="240" height="140" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__text---tertiary, #7e5fb0)" stroke-width="1.5" stroke-dasharray="5 3"/>
  <text x="420" y="56" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">renderless=true</text>
  <rect x="316" y="66" width="208" height="84" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="420" y="102" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#renderless slot</text>
  <text x="420" y="118" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">{ itemRef }</text>
  <!-- numbers -->
  <circle cx="32" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="312" cy="38" r="10" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="312" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="280" y="185" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">ResizeObserver on resizeRef in both modes — emits update:height on height change</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-virtual-scroll-item&gt;</code> — 2 render modes. In wrapper mode (①) the component renders a <code>.origam-virtual-scroll-item</code> div with the default slot. In renderless mode (②) no root element is rendered — the consumer binds <code>itemRef</code> to its own element.`,
        legend: [
            {
                num: 1,
                cls: '.origam-virtual-scroll-item',
                descriptionKey: 'components.virtual_scroll_item.anatomy.wrapper',
                descriptionFallback: 'Wrapper div rendered when <code>renderless=false</code> (default). Observed by ResizeObserver via the <code>resizeRef</code> binding. Emits <code>update:height</code> on any height change.'
            },
            {
                num: 2,
                cls: '#renderless slot',
                descriptionKey: 'components.virtual_scroll_item.anatomy.renderless',
                descriptionFallback: 'When <code>renderless=true</code> no wrapper is rendered. The <code>itemRef</code> slot prop must be bound to the consumer element so ResizeObserver can observe it.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- renderless=false (default): wrapper div -->
<div ref="resizeRef" class="origam-virtual-scroll-item" v-bind="attrs">
  <slot name="default" />
</div>

<!-- renderless=true: no wrapper element -->
<slot name="renderless" :item-ref="resizeRef" />`,
        classes: [
            {
                cls: 'origam-virtual-scroll-item',
                descriptionKey: 'components.virtual_scroll_item.anatomy.wrapper',
                descriptionFallback: 'Root wrapper element in non-renderless mode. No visual styling — purely a measurement anchor for ResizeObserver.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-virtual-scroll---item-height',
            defaultValue: '48px',
            descriptionKey: 'components.virtual_scroll_item.css_vars.item_height',
            descriptionFallback: 'Estimated item height used by the virtual engine for initial layout. Overridden at runtime via the update:height event.'
        },
        {
            name: '--origam-virtual-scroll---transition-duration',
            defaultValue: 'var(--origam-motion__duration---fast)',
            descriptionKey: 'components.virtual_scroll_item.css_vars.transition_duration',
            descriptionFallback: 'Duration for item appear/disappear transitions. Fast to avoid jank during rapid scrolling.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.virtual_scroll_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.virtual_scroll_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.virtual_scroll_item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.virtual_scroll_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.virtual_scroll_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.virtual_scroll_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.virtual_scroll_item.a11y.role_note',
                noteFallback: 'OrigamVirtualScrollItem has no ARIA role — it is a transparent measurement wrapper. ARIA semantics are entirely determined by the consuming content in the default/renderless slot.'
            },
            {
                noteKey: 'components.virtual_scroll_item.a11y.renderless_note',
                noteFallback: 'In renderless mode the component renders no DOM element — the consumer\'s own element carries all semantic roles. This makes renderless mode the preferred approach for accessible list items (use a native <li> as the observed element).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/virtual-scroll.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. OrigamVirtualScrollItem has no intrinsic visual tokens; it inherits layout tokens from the parent virtual-scroll token group.',
        excerpt: [
            {
                tokenPath: 'virtual-scroll.item-height',
                value: '48px',
                type: 'dimension',
                descriptionKey: 'components.virtual_scroll_item.tokens.item_height',
                descriptionFallback: 'Default estimated item height used by the virtual engine for initial layout.'
            },
            {
                tokenPath: 'virtual-scroll.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.virtual_scroll_item.tokens.transition_duration',
                descriptionFallback: 'Duration for item transitions.'
            },
            {
                tokenPath: 'virtual-scroll.transition-easing',
                value: '{motion.easing.standard}',
                type: 'cubicBezier',
                descriptionKey: 'components.virtual_scroll_item.tokens.transition_easing',
                descriptionFallback: 'Easing for virtual scroll item transitions.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'renderless',
                kind: 'switch',
                labelKey: 'components.virtual_scroll_item.playground.renderless',
                labelFallback: 'Renderless mode',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
