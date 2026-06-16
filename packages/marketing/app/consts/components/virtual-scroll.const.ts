/**
 * /components/virtual-scroll — full documentation data for OrigamVirtualScroll.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/VirtualScroll/virtual-scroll.interface.ts      (props)
 *   - packages/ds/src/interfaces/VirtualScroll/virtual-scroll-item.interface.ts (sub-component)
 *   - packages/ds/src/components/VirtualScroll/OrigamVirtualScroll.vue          (template BEM, defineExpose)
 *   - packages/ds/src/components/VirtualScroll/OrigamVirtualScrollItem.vue      (item component)
 *   - packages/ds/tokens/component/virtual-scroll.json                          (CSS tokens)
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

export const VIRTUAL_SCROLL_DOC: IComponentDoc = {
    slug: 'virtual-scroll',
    name: 'VirtualScroll',
    tag: 'origam-virtual-scroll',
    icon: 'mdi-view-list',
    category: 'Data Display',
    descriptionKey: 'components.catalog.virtual_scroll.description',
    descriptionFallback: 'Window-based virtual list renderer that only mounts visible rows, keeping the DOM small for arbitrarily large datasets. Supports both wrapper and renderless modes.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-virtual-scroll--design',
    docUrl: 'http://localhost:4000/components/VirtualScroll/OrigamVirtualScroll',

    family: [
        {
            slug: 'virtual-scroll-item',
            name: 'VirtualScrollItem',
            descriptionKey: 'components.catalog.virtual_scroll_item.description',
            descriptionFallback: 'Wrapper per virtualized slot. Uses ResizeObserver to forward measured heights to the parent scroller so item heights can vary.'
        }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'any[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.virtual_scroll.props.items.description',
            descriptionFallback: 'Source array of items to virtualize. Can contain any value — the type is forwarded as-is to the #default slot.'
        },
        {
            name: 'renderless',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.virtual_scroll.props.renderless.description',
            descriptionFallback: 'When true, removes the scroll container wrapper — the parent is responsible for the scroll context. Useful when embedding inside a Dialog or custom scroll root.'
        },
        // ── IDimensionProps ────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.virtual_scroll.props.height.description',
            descriptionFallback: 'Height of the scroll container. Required unless renderless=true.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.virtual_scroll.props.max_height.description',
            descriptionFallback: 'Maximum height for the container (used with auto-height layouts).'
        },
        // ── IVirtualProps ──────────────────────────────────────────
        {
            name: 'itemHeight',
            type: { label: 'number | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.virtual_scroll.props.item_height.description',
            descriptionFallback: 'Estimated (or fixed) item height in pixels. Used for initial spacer calculation. When null, item heights are measured dynamically via ResizeObserver.'
        },
        {
            name: 'overscan',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '2',
            descriptionKey: 'components.virtual_scroll.props.overscan.description',
            descriptionFallback: 'Number of items rendered outside the visible window for smooth scrolling. Higher values reduce blank flashes but increase DOM size.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ item: any, index: number }',
            descriptionKey: 'components.virtual_scroll.slots.default.description',
            descriptionFallback: 'Template for each rendered item. Receives item (raw value from items array) and index.'
        },
        {
            slot: 'item.renderless',
            slotProps: '{ item: any, index: number, itemRef: Ref<HTMLElement | null> }',
            descriptionKey: 'components.virtual_scroll.slots.item_renderless.description',
            descriptionFallback: 'Alternative slot used in renderless mode. Receives itemRef which must be bound to the root element so the ResizeObserver can measure height.'
        }
    ],

    examples: [
        {
            titleKey: 'components.virtual_scroll.examples.basic.title',
            titleFallback: 'Basic virtual list',
            lang: 'vue',
            code: `<script setup lang="ts">
const items = Array.from({ length: 10000 }, (_, i) => ({ id: i, label: \`Item \${i + 1}\` }))
</script>
<template>
  <origam-virtual-scroll :items="items" height="400">
    <template #default="{ item }">
      <div style="padding: 12px; border-bottom: 1px solid #eee;">
        {{ item.label }}
      </div>
    </template>
  </origam-virtual-scroll>
</template>`
        },
        {
            titleKey: 'components.virtual_scroll.examples.fixed_height.title',
            titleFallback: 'Fixed item height (optimised)',
            lang: 'vue',
            code: `<template>
  <origam-virtual-scroll :items="items" height="400" :item-height="48">
    <template #default="{ item }">
      <div style="height: 48px; display: flex; align-items: center; padding: 0 16px;">
        {{ item.label }}
      </div>
    </template>
  </origam-virtual-scroll>
</template>`
        }
    ],

    previewVariants: [
        { label: 'wrapper', props: { renderless: false, height: 300 } },
        { label: 'fixed height', props: { renderless: false, height: 300, itemHeight: 48 } },
        { label: 'renderless', props: { renderless: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-virtual-scroll',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamVirtualScroll',
        svgDesc: 'Schematic showing the virtual scroll container with spacers and visible items.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="100" y="20" width="500" height="200" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" style="overflow:hidden"/>
  <rect x="100" y="20" width="500" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="350" y="36" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">spacer-top (padding-top)</text>
  <rect x="100" y="56" width="500" height="40" rx="2" fill="var(--origam-color__surface---raised, #f8f5fe)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="350" y="79" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">virtual-scroll-item #47</text>
  <rect x="100" y="104" width="500" height="40" rx="2" fill="var(--origam-color__surface---raised, #f8f5fe)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="350" y="127" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">virtual-scroll-item #48</text>
  <rect x="100" y="152" width="500" height="40" rx="2" fill="var(--origam-color__surface---raised, #f8f5fe)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="350" y="175" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">virtual-scroll-item #49</text>
  <rect x="100" y="196" width="500" height="24" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="350" y="212" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">spacer-bottom (padding-bottom)</text>
  <circle cx="108" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="108" cy="64" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="108" y="68" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="108" cy="204" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="108" y="208" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-virtual-scroll&gt;</code> — the container ① holds a top spacer ② (padding-top), the currently visible VirtualScrollItems, and a bottom spacer ③ (padding-bottom). Items outside the viewport are unmounted.`,
        legend: [
            {
                num: 1,
                cls: '.origam-virtual-scroll',
                descriptionKey: 'components.virtual_scroll.anatomy.root',
                descriptionFallback: 'Scroll container. overflow-y: auto, height fixed or max-height constrained.'
            },
            {
                num: 2,
                cls: '.origam-virtual-scroll__spacer',
                descriptionKey: 'components.virtual_scroll.anatomy.spacer',
                descriptionFallback: 'Top spacer div. padding-top dynamically set to fill the height of all items above the visible window.'
            },
            {
                num: 3,
                cls: '.origam-virtual-scroll__spacer (bottom)',
                descriptionKey: 'components.virtual_scroll.anatomy.spacer_bottom',
                descriptionFallback: 'Bottom spacer div. padding-bottom fills the height of all items below the visible window.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div ref="containerRef" class="origam-virtual-scroll">
  <!-- top spacer — fills height of items above viewport -->
  <div ref="markerRef" class="origam-virtual-scroll__spacer" :style="{ 'padding-top': paddingTop + 'px' }" />

  <!-- only currently visible items are mounted -->
  <origam-virtual-scroll-item
    v-for="(item, index) in computedItems"
    :key="index"
    class="origam-virtual-scroll__item"
    @update:height="handleItemResize(index, $event)"
  >
    <slot :item="item.raw" :index="item.index" />
  </origam-virtual-scroll-item>

  <!-- bottom spacer — fills height of items below viewport -->
  <div class="origam-virtual-scroll__spacer" :style="{ 'padding-bottom': paddingBottom + 'px' }" />
</div>`,
        classes: [
            { cls: 'origam-virtual-scroll', descriptionKey: 'components.virtual_scroll.anatomy.root', descriptionFallback: 'Scroll container.' },
            { cls: 'origam-virtual-scroll__spacer', descriptionKey: 'components.virtual_scroll.anatomy.spacer', descriptionFallback: 'Spacer divs (top and bottom).' },
            { cls: 'origam-virtual-scroll__item', descriptionKey: 'components.virtual_scroll.anatomy.item', descriptionFallback: 'Each rendered item wrapper.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-virtual-scroll---item-height',
            defaultValue: '48px',
            descriptionKey: 'components.virtual_scroll.css_vars.item_height',
            descriptionFallback: 'Default estimated item height used for initial spacer calculation (48px = standard list row).'
        },
        {
            name: '--origam-virtual-scroll---scroll-padding',
            defaultValue: '{space.0}',
            descriptionKey: 'components.virtual_scroll.css_vars.scroll_padding',
            descriptionFallback: 'scroll-padding on the scroll container, so focused items are not obscured by sticky headers.'
        },
        {
            name: '--origam-virtual-scroll---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.virtual_scroll.css_vars.transition_duration',
            descriptionFallback: 'Item appear/disappear transition duration (fast to avoid jank during rapid scrolling).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'scrollToIndex',
            type: '(index: number) => void',
            descriptionKey: 'components.virtual_scroll.exposed.scroll_to_index',
            descriptionFallback: 'Programmatically scrolls to bring the item at the given index into view.'
        },
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.virtual_scroll.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.virtual_scroll.exposed.css',
            descriptionFallback: 'Reactive CSS string for computed styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.virtual_scroll.exposed.id',
            descriptionFallback: 'Unique style-sheet ID.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.virtual_scroll.exposed.load',
            descriptionFallback: 'Injects the style sheet on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.virtual_scroll.exposed.unload',
            descriptionFallback: 'Removes the style sheet on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.virtual_scroll.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.virtual_scroll.a11y.key_tab',
                actionFallback: 'Focuses the scroll container, then navigates through rendered items.'
            },
            {
                key: 'ArrowDown / ArrowUp',
                actionKey: 'components.virtual_scroll.a11y.key_scroll',
                actionFallback: 'Scrolls the list when the container has focus.'
            }
        ],
        notes: [
            {
                noteKey: 'components.virtual_scroll.a11y.dom_size',
                noteFallback: 'Only visible items are in the DOM — screen readers may announce fewer items than the total count. Add aria-setsize and aria-posinset on each rendered item if the total count matters semantically.'
            },
            {
                noteKey: 'components.virtual_scroll.a11y.focus',
                noteFallback: 'When scrollToIndex is called programmatically, focus management is the consumer responsibility. Items outside the visible window are unmounted and cannot receive focus.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/virtual-scroll.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'virtual-scroll.item-height',
                value: '48px',
                type: 'dimension',
                descriptionKey: 'components.virtual_scroll.tokens.item_height',
                descriptionFallback: 'Default estimated item height.'
            },
            {
                tokenPath: 'virtual-scroll.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.virtual_scroll.tokens.transition_duration',
                descriptionFallback: 'Item transition duration.'
            },
            {
                tokenPath: 'virtual-scroll.scroll-padding',
                value: '{space.0}',
                type: 'dimension',
                descriptionKey: 'components.virtual_scroll.tokens.scroll_padding',
                descriptionFallback: 'Scroll container scroll-padding.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'height',
                kind: 'select',
                labelKey: 'components.virtual_scroll.playground.height',
                labelFallback: 'Container height',
                defaultValue: '300',
                options: [
                    { label: '200px', value: '200' },
                    { label: '300px', value: '300' },
                    { label: '400px', value: '400' },
                    { label: '500px', value: '500' }
                ]
            },
            {
                prop: 'renderless',
                kind: 'switch',
                labelKey: 'components.virtual_scroll.playground.renderless',
                labelFallback: 'Renderless mode',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
