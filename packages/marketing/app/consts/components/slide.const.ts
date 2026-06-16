/**
 * /components/slide — full documentation data for OrigamSlideGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Slide/slide-group.interface.ts  (props)
 *   - packages/ds/src/components/Slide/OrigamSlideGroup.vue      (template BEM, defineExpose, slots)
 *   - packages/ds/tokens/component/slide-group.json              (CSS tokens)
 *
 * NOTE: The catalog slug "slide" maps to OrigamSlideGroup — a horizontally
 * scrollable carousel container with drag and arrow navigation.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SLIDE_DOC: IComponentDoc = {
    slug: 'slide',
    name: 'Slide',
    tag: 'origam-slide-group',
    icon: 'mdi-gesture-swipe-horizontal',
    category: 'Media',
    descriptionKey: 'components.catalog.slide.description',
    descriptionFallback: 'Horizontally scrollable slide group with drag scroll, keyboard navigation and optional arrow controls.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-slidegroup--design',
    docUrl: 'http://localhost:4000/components/Slide/OrigamSlideGroup',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'centerActive',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide.props.center_active.description',
            descriptionFallback: 'When true, the active item is scrolled to the center of the container.'
        },
        {
            name: 'nextIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-right'",
            descriptionKey: 'components.slide.props.next_icon.description',
            descriptionFallback: 'Icon for the "next" navigation arrow.'
        },
        {
            name: 'prevIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-left'",
            descriptionKey: 'components.slide.props.prev_icon.description',
            descriptionFallback: 'Icon for the "previous" navigation arrow.'
        },
        {
            name: 'showArrows',
            type: { label: "boolean | 'always'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide.props.show_arrows.description',
            descriptionFallback: "Controls arrow visibility. false = hidden, true = shown when needed, 'always' = always visible."
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.slide.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        },
        // ── IDirectionProps ────────────────────────────────────────────
        {
            name: 'direction',
            type: { label: 'TDirection', slug: 'direction', kind: 'type' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.slide.props.direction.description',
            descriptionFallback: 'Scroll axis. horizontal (default) or vertical.'
        },
        // ── IGroupProps ────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'string | number | string[] | number[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slide.props.model_value.description',
            descriptionFallback: 'The currently selected item value (or array for multi-select). Synced via v-model.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide.props.multiple.description',
            descriptionFallback: 'Allows multiple items to be selected simultaneously.'
        },
        // ── IDisplayProps ──────────────────────────────────────────────
        {
            name: 'displayLevel',
            type: { label: 'TDisplayLevel', slug: 'display-level', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slide.props.display_level.description',
            descriptionFallback: 'Responsive breakpoint below which the component is hidden.'
        },
        // ── IBorderProps / IRoundedProps ───────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide.props.border.description',
            descriptionFallback: 'Applies a border to the slide group container.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slide.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string | number | string[] | number[]', slug: '', kind: 'primitive' },
            descriptionKey: 'components.slide.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the selected item changes. Syncs with v-model.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ isSelected, toggle, select, selectedValues }',
            descriptionKey: 'components.slide.slots.default.description',
            descriptionFallback: 'Container for slide items. Slot props expose selection helpers for child items.'
        },
        {
            slot: 'prev',
            slotProps: '—',
            descriptionKey: 'components.slide.slots.prev.description',
            descriptionFallback: 'Replaces the previous arrow button with custom content.'
        },
        {
            slot: 'next',
            slotProps: '—',
            descriptionKey: 'components.slide.slots.next.description',
            descriptionFallback: 'Replaces the next arrow button with custom content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.slide.examples.basic.title',
            titleFallback: 'Basic slide group',
            lang: 'vue',
            code: `<template>
  <origam-slide-group show-arrows>
    <origam-chip
      v-for="item in items"
      :key="item"
      :text="item"
      class="ma-2"
    />
  </origam-slide-group>
</template>

<script setup>
const items = ['React', 'Vue', 'Angular', 'Svelte', 'SolidJS']
</script>`
        },
        {
            titleKey: 'components.slide.examples.selection.title',
            titleFallback: 'With selection',
            lang: 'vue',
            code: `<template>
  <origam-slide-group v-model="selected" show-arrows>
    <origam-chip
      v-for="item in items"
      :key="item"
      :value="item"
      :text="item"
      class="ma-2"
    />
  </origam-slide-group>
  <p>Selected: {{ selected }}</p>
</template>

<script setup>
import { ref } from 'vue'
const selected = ref(null)
const items = ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Vue', 'Nuxt']
</script>`
        },
        {
            titleKey: 'components.slide.examples.arrows.title',
            titleFallback: 'Always show arrows',
            lang: 'vue',
            code: `<template>
  <origam-slide-group show-arrows="always">
    <origam-btn
      v-for="n in 10"
      :key="n"
      :text="\`Item \${n}\`"
      class="ma-2"
      variant="tonal"
    />
  </origam-slide-group>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-slide-group',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamSlideGroup',
        svgDesc: 'Schematic of the SlideGroup component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="40" y="50" width="52" height="80" rx="3" fill="var(--origam-color__surface---sunken, #fbf5ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="66" y="94" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prev</text>
  <rect x="100" y="50" width="460" height="80" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <rect x="108" y="58" width="120" height="64" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="168" y="94" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">item 1</text>
  <rect x="236" y="58" width="120" height="64" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="296" y="94" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">item 2</text>
  <rect x="364" y="58" width="120" height="64" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="424" y="94" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">item 3</text>
  <rect x="568" y="50" width="52" height="80" rx="3" fill="var(--origam-color__surface---sunken, #fbf5ff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="594" y="94" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">next</text>
  <circle cx="36" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="108" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="576" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="576" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <line x1="46" y1="40" x2="80" y2="22" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="22" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-slide-group</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-slide-group&gt;</code> — 4 internal parts: root container ①, prev affix ②, scrollable container ③, next affix ④.`,
        legend: [
            {
                num: 1,
                cls: '.origam-slide-group',
                descriptionKey: 'components.slide.anatomy.root',
                descriptionFallback: 'Root flex container. Clips overflow to hide off-screen items.'
            },
            {
                num: 2,
                cls: '.origam-slide-group__prev',
                descriptionKey: 'components.slide.anatomy.prev',
                descriptionFallback: 'Previous arrow affix. Rendered only when showArrows is active. Hosts the #prev slot or a default OrigamIcon.'
            },
            {
                num: 3,
                cls: '.origam-slide-group__container',
                descriptionKey: 'components.slide.anatomy.container',
                descriptionFallback: 'Scrollable viewport. overflow: hidden with scroll event handling for arrow state.'
            },
            {
                num: 4,
                cls: '.origam-slide-group__next',
                descriptionKey: 'components.slide.anatomy.next',
                descriptionFallback: 'Next arrow affix. Rendered only when showArrows is active. Hosts the #next slot or a default OrigamIcon.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: flex container with overflow clip -->
<component :is="tag" class="origam-slide-group">
  <!-- prev arrow affix (v-if="hasAffixes") -->
  <div class="origam-slide-group__prev" @mousedown="scrollTo('prev')">
    <slot name="prev"><origam-icon :icon="prevIcon" /></slot>
  </div>

  <!-- scrollable container -->
  <div ref="containerRef" class="origam-slide-group__container" @scroll="handleScroll">
    <div ref="contentRef" class="origam-slide-group__content">
      <slot :is-selected="..." :toggle="..." />
    </div>
  </div>

  <!-- next arrow affix (v-if="hasAffixes") -->
  <div class="origam-slide-group__next" @mousedown="scrollTo('next')">
    <slot name="next"><origam-icon :icon="nextIcon" /></slot>
  </div>
</component>`,
        classes: [
            {
                cls: 'origam-slide-group',
                descriptionKey: 'components.slide.anatomy.root',
                descriptionFallback: 'Root element. Flex container with overflow:hidden.'
            },
            {
                cls: 'origam-slide-group__prev',
                descriptionKey: 'components.slide.anatomy.prev',
                descriptionFallback: 'Previous navigation arrow area.'
            },
            {
                cls: 'origam-slide-group__container',
                descriptionKey: 'components.slide.anatomy.container',
                descriptionFallback: 'Scrollable viewport (overflow:hidden, flex: 1 0 auto).'
            },
            {
                cls: 'origam-slide-group__content',
                descriptionKey: 'components.slide.anatomy.content',
                descriptionFallback: 'Inner flex container hosting the slotted items.'
            },
            {
                cls: 'origam-slide-group__next',
                descriptionKey: 'components.slide.anatomy.next',
                descriptionFallback: 'Next navigation arrow area.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-slide-group---display',
            defaultValue: 'flex',
            descriptionKey: 'components.slide.css_vars.display',
            descriptionFallback: 'Root display mode.'
        },
        {
            name: '--origam-slide-group---overflow',
            defaultValue: 'hidden',
            descriptionKey: 'components.slide.css_vars.overflow',
            descriptionFallback: 'Root overflow clipping.'
        },
        {
            name: '--origam-slide-group---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.slide.css_vars.transition_duration',
            descriptionFallback: 'Scroll animation duration.'
        },
        {
            name: '--origam-slide-group__prev---min-width',
            defaultValue: '52px',
            descriptionKey: 'components.slide.css_vars.prev_min_width',
            descriptionFallback: 'Minimum width of the prev/next arrow affixes.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.slide.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.slide.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.slide.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.slide.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.slide.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.slide.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group (implicit via scroll container)'],
        keyboard: [
            {
                key: 'Arrow Left / Right',
                actionKey: 'components.slide.a11y.key_arrow',
                actionFallback: 'Moves focus between items inside the scroll container.'
            },
            {
                key: 'Tab',
                actionKey: 'components.slide.a11y.key_tab',
                actionFallback: 'Focuses the slide group container, then Tab moves through items.'
            },
            {
                key: 'Home / End',
                actionKey: 'components.slide.a11y.key_home_end',
                actionFallback: 'Jumps focus to the first or last item.'
            }
        ],
        notes: [
            {
                noteKey: 'components.slide.a11y.scroll_note',
                noteFallback: 'The scroll container is keyboard-accessible. Arrow keys trigger programmatic scrollTo calls for cross-browser scroll support.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/slide-group.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'slide-group.display',
                value: 'flex',
                type: 'other',
                descriptionKey: 'components.slide.tokens.display',
                descriptionFallback: 'Root display mode.'
            },
            {
                tokenPath: 'slide-group.overflow',
                value: 'hidden',
                type: 'other',
                descriptionKey: 'components.slide.tokens.overflow',
                descriptionFallback: 'Root overflow.'
            },
            {
                tokenPath: 'slide-group.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.slide.tokens.transition_duration',
                descriptionFallback: 'Scroll transition duration.'
            },
            {
                tokenPath: 'slide-group.prev.min-width',
                value: '52px',
                type: 'dimension',
                descriptionKey: 'components.slide.tokens.prev_min_width',
                descriptionFallback: 'Minimum width of the prev/next arrow affixes.'
            }
        ]
    } satisfies IComponentTokens
}
