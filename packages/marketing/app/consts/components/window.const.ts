/**
 * /components/window — full documentation data for OrigamWindow.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Window/window.interface.ts       (props, emits)
 *   - packages/ds/src/interfaces/Window/window-item.interface.ts  (sub-component)
 *   - packages/ds/src/components/Window/OrigamWindow.vue          (template BEM, defineExpose)
 *   - packages/ds/src/components/Window/OrigamWindowItem.vue      (item component)
 *   - packages/ds/tokens/component/window.json                    (CSS tokens)
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

export const WINDOW_DOC: IComponentDoc = {
    slug: 'window',
    name: 'Window',
    tag: 'origam-window',
    icon: 'mdi-view-carousel',
    category: 'Navigation',
    descriptionKey: 'components.catalog.window.description',
    descriptionFallback: 'Slide-based content switcher with previous/next navigation, touch swipe, keyboard support and configurable transitions. The base for Carousel, Stepper and Tab panels.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-window--design',
    docUrl: 'http://localhost:4000/components/Window/OrigamWindow',

    family: [
        {
            slug: 'window-item',
            name: 'WindowItem',
            descriptionKey: 'components.catalog.window_item.description',
            descriptionFallback: 'One slide inside a Window. Handles transition animation, lazy rendering and group membership lifecycle.'
        }
    ],

    related: [
        {
            slug: 'carousel',
            name: 'Carousel',
            kind: 'component',
            descriptionKey: 'components.related.carousel.description',
            descriptionFallback: 'Carousel is built on top of Window and adds autoplay, indicator dots and image preloading.'
        },
        {
            slug: 'stepper',
            name: 'Stepper',
            kind: 'component',
            descriptionKey: 'components.related.stepper.description',
            descriptionFallback: 'Stepper uses Window for its panel animation layer.'
        },
        {
            slug: 'tabs',
            name: 'Tabs',
            kind: 'component',
            descriptionKey: 'components.related.tabs.description',
            descriptionFallback: 'Tabs pairs a TabBar with a Window for accessible panel switching.'
        }
    ],

    props: [
        // ── Own props ─────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window.props.model_value.description',
            descriptionFallback: 'v-model for the currently active slide. Matches the value prop of the active WindowItem.'
        },
        {
            name: 'continuous',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.continuous.description',
            descriptionFallback: 'When true, the prev/next navigation wraps around (first ↔ last).'
        },
        {
            name: 'reverse',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.reverse.description',
            descriptionFallback: 'Reverses the slide direction. Useful for RTL or countdown-style sequences.'
        },
        {
            name: 'showArrows',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.show_arrows.description',
            descriptionFallback: 'Controls arrow visibility: false=hidden, true=always shown, "hover"=shown on hover.'
        },
        {
            name: 'nextIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-right'",
            descriptionKey: 'components.window.props.next_icon.description',
            descriptionFallback: 'Icon for the next button. Override for custom iconography.'
        },
        {
            name: 'prevIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-left'",
            descriptionKey: 'components.window.props.prev_icon.description',
            descriptionFallback: 'Icon for the prev button.'
        },
        {
            name: 'touch',
            type: { label: 'boolean | ITouchHandlers', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.window.props.touch.description',
            descriptionFallback: 'Enable touch swipe to navigate. Pass an ITouchHandlers object to override left/right/up/down handlers.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.disabled.description',
            descriptionFallback: 'Disables navigation (arrows and keyboard). The active slide remains visible.'
        },
        {
            name: 'mandatory',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.mandatory.description',
            descriptionFallback: 'When true, always keeps at least one item selected (deselect is not allowed).'
        },
        {
            name: 'selectedClass',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-window-item--active'",
            descriptionKey: 'components.window.props.selected_class.description',
            descriptionFallback: 'CSS class applied to the currently active WindowItem.'
        },
        // ── IDirectionProps ───────────────────────────────────────
        {
            name: 'direction',
            type: { label: 'TDirection', slug: 'direction', kind: 'type' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.window.props.direction.description',
            descriptionFallback: 'Slide animation axis: horizontal (default) or vertical.'
        },
        // ── IBgColorProps ─────────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window.props.bg_color.description',
            descriptionFallback: 'Background color applied to the arrow buttons.'
        },
        // ── IElevationProps / IRoundedProps / IBorderProps ─────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation applied to the window wrapper.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.window.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the window wrapper.'
        },
        // ── IActiveProps / IHoverProps ─────────────────────────────
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.active.description',
            descriptionFallback: 'Forces the active state (forwarded to arrow buttons).'
        },
        {
            name: 'hover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.window.props.hover.description',
            descriptionFallback: 'Forces the hover state on the arrow buttons.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.window.emits.update_model_value.description',
            descriptionFallback: 'Fired when the active slide changes.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ group }',
            descriptionKey: 'components.window.slots.default.description',
            descriptionFallback: 'Slide content. Place OrigamWindowItem children here. Receives the group provide context.'
        },
        {
            slot: 'arrows',
            slotProps: '{ prevProps, nextProps, canMoveBack, canMoveForward }',
            descriptionKey: 'components.window.slots.arrows.description',
            descriptionFallback: 'Full replacement for both prev and next buttons. Receives the bound props and canMove flags.'
        },
        {
            slot: 'prev',
            slotProps: '{ props, canMove }',
            descriptionKey: 'components.window.slots.prev.description',
            descriptionFallback: 'Replaces only the previous button. Receives bound props and canMove boolean.'
        },
        {
            slot: 'next',
            slotProps: '{ props, canMove }',
            descriptionKey: 'components.window.slots.next.description',
            descriptionFallback: 'Replaces only the next button.'
        },
        {
            slot: 'additional',
            slotProps: '{ group }',
            descriptionKey: 'components.window.slots.additional.description',
            descriptionFallback: 'Slot rendered after the container (outside the slide stack). Useful for indicator dots or progress bars that must not clip with the content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.window.examples.basic.title',
            titleFallback: 'Basic window',
            lang: 'vue',
            code: `<script setup lang="ts">
import { ref } from 'vue'
const slide = ref(0)
</script>
<template>
  <origam-window v-model="slide" show-arrows>
    <origam-window-item :value="0">
      <div style="padding: 2rem; background: #f5f0ff;">Slide 1</div>
    </origam-window-item>
    <origam-window-item :value="1">
      <div style="padding: 2rem; background: #ede9fe;">Slide 2</div>
    </origam-window-item>
    <origam-window-item :value="2">
      <div style="padding: 2rem; background: #ddd6fe;">Slide 3</div>
    </origam-window-item>
  </origam-window>
</template>`
        },
        {
            titleKey: 'components.window.examples.vertical.title',
            titleFallback: 'Vertical direction',
            lang: 'vue',
            code: `<template>
  <origam-window v-model="slide" direction="vertical" show-arrows>
    <origam-window-item :value="0"><div style="padding:2rem">Top</div></origam-window-item>
    <origam-window-item :value="1"><div style="padding:2rem">Bottom</div></origam-window-item>
  </origam-window>
</template>`
        },
        {
            titleKey: 'components.window.examples.continuous.title',
            titleFallback: 'Continuous (wrap-around)',
            lang: 'vue',
            code: `<template>
  <origam-window v-model="slide" continuous show-arrows>
    <origam-window-item v-for="i in 5" :key="i" :value="i - 1">
      <div style="padding: 2rem; text-align: center;">Slide {{ i }}</div>
    </origam-window-item>
  </origam-window>
</template>`
        }
    ],

    previewVariants: [
        { label: 'with arrows', props: { showArrows: true } },
        { label: 'vertical', props: { showArrows: true, direction: 'vertical' } },
        { label: 'continuous', props: { showArrows: true, continuous: true } },
        { label: 'hover arrows', props: { showArrows: 'hover' } },
        { label: 'rounded', props: { showArrows: true, rounded: 'lg', elevation: '2' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-window',
        svgViewBox: '0 0 700 260',
        svgTitle: 'Anatomy of OrigamWindow',
        svgDesc: 'Schematic of the Window component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="200" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="30" y="30" width="640" height="180" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))"/>
  <rect x="30" y="30" width="640" height="180" rx="4" fill="none" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1" stroke-dasharray="5 3"/>
  <rect x="170" y="60" width="360" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <text x="350" y="125" font-size="13" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">WindowItem content</text>
  <circle cx="50" cy="120" r="20" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="50" y="124" font-size="14" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">‹</text>
  <circle cx="650" cy="120" r="20" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="650" y="124" font-size="14" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">›</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="38" cy="38" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="38" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="350" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="64" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="50" cy="100" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="50" y="104" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="650" cy="100" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="650" y="104" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="350" y="248" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">④ prev and ⑤ next rendered when showArrows is set</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-window&gt;</code> — 5 internal parts. The root ① wraps the container ② which holds the active WindowItem ③. Prev ④ and next ⑤ arrow buttons overlay the container sides.`,
        legend: [
            {
                num: 1,
                cls: '.origam-window',
                descriptionKey: 'components.window.anatomy.root',
                descriptionFallback: 'Root element. position: relative; overflow: hidden. Receives tag, rounded, elevation and bgColor.'
            },
            {
                num: 2,
                cls: '.origam-window__container',
                descriptionKey: 'components.window.anatomy.container',
                descriptionFallback: 'Inner flex column. display: flex; flex-direction: column; height: inherit. Hosts the #default slot (WindowItem children).'
            },
            {
                num: 3,
                cls: 'origam-window-item',
                descriptionKey: 'components.window.anatomy.item',
                descriptionFallback: 'Each slide — rendered inside OrigamWindowItem. Only the active item is visible; transitions are handled by OrigamTransition wrapping each item.'
            },
            {
                num: 4,
                cls: '.origam-window__controls [prev]',
                descriptionKey: 'components.window.anatomy.prev',
                descriptionFallback: 'Previous arrow button. Absolute-positioned on the left/top edge. Hidden when showArrows=false or canMoveBack=false.'
            },
            {
                num: 5,
                cls: '.origam-window__controls [next]',
                descriptionKey: 'components.window.anatomy.next',
                descriptionFallback: 'Next arrow button. Absolute-positioned on the right/bottom edge.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" ref="rootRef" class="origam-window">
  <div class="origam-window__container">
    <!-- default slot: OrigamWindowItem children -->
    <slot name="default" v-bind="group" />

    <!-- navigation controls -->
    <div v-if="showArrows !== false" class="origam-window__controls">
      <slot name="arrows" v-bind="{ prevProps, nextProps, canMoveBack, canMoveForward }">
        <slot name="prev" v-bind="{ props: prevProps, canMove: canMoveBack }">
          <origam-btn v-if="canMoveBack" v-bind="prevProps" />
        </slot>
        <origam-spacer v-if="!canMoveBack" />
        <slot name="next" v-bind="{ props: nextProps, canMove: canMoveForward }">
          <origam-btn v-if="canMoveForward" v-bind="nextProps" />
        </slot>
      </slot>
    </div>
  </div>

  <!-- outside the container — for indicators etc. -->
  <slot name="additional" v-bind="group" />
</component>`,
        classes: [
            { cls: 'origam-window', descriptionKey: 'components.window.anatomy.root', descriptionFallback: 'Root wrapper.' },
            { cls: 'origam-window__container', descriptionKey: 'components.window.anatomy.container', descriptionFallback: 'Flex column container for slides.' },
            { cls: 'origam-window__controls', descriptionKey: 'components.window.anatomy.controls', descriptionFallback: 'Arrow buttons container (absolute inset).' },
            { cls: 'origam-window-item', descriptionKey: 'components.window.anatomy.item', descriptionFallback: 'Individual slide wrapper.' },
            { cls: 'origam-window-item--active', descriptionKey: 'components.window.anatomy.item_active', descriptionFallback: 'Applied to the currently active WindowItem.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-window---overflow',
            defaultValue: 'hidden',
            descriptionKey: 'components.window.css_vars.overflow',
            descriptionFallback: 'Overflow of the root element (hidden to clip exiting slides).'
        },
        {
            name: '--origam-window---transition-duration',
            defaultValue: '{motion.duration.slow}',
            descriptionKey: 'components.window.css_vars.transition_duration',
            descriptionFallback: 'Slide transition duration.'
        },
        {
            name: '--origam-window---transition-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.window.css_vars.transition_easing',
            descriptionFallback: 'Easing function for slide transitions.'
        },
        {
            name: '--origam-window---controls-color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.window.css_vars.controls_color',
            descriptionFallback: 'Icon color of the arrow buttons.'
        },
        {
            name: '--origam-window---controls-hover-color',
            defaultValue: '{color.action.primary.fg}',
            descriptionKey: 'components.window.css_vars.controls_hover_color',
            descriptionFallback: 'Arrow button icon color on hover.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.window.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'group',
            type: 'GroupProvide',
            descriptionKey: 'components.window.exposed.group',
            descriptionFallback: 'Group selection context provided to all WindowItem children. Used to wire the active state.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.window.exposed.css',
            descriptionFallback: 'Reactive CSS string for computed styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.window.exposed.id',
            descriptionFallback: 'Unique style-sheet ID.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.window.exposed.load',
            descriptionFallback: 'Injects the style sheet on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.window.exposed.unload',
            descriptionFallback: 'Removes the style sheet on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.window.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['region'],
        keyboard: [
            {
                key: 'ArrowLeft / ArrowRight',
                actionKey: 'components.window.a11y.key_horizontal',
                actionFallback: 'Navigate to the previous/next slide when direction="horizontal".'
            },
            {
                key: 'ArrowUp / ArrowDown',
                actionKey: 'components.window.a11y.key_vertical',
                actionFallback: 'Navigate to the previous/next slide when direction="vertical".'
            },
            {
                key: 'Tab',
                actionKey: 'components.window.a11y.key_tab',
                actionFallback: 'Moves focus through arrow buttons and content inside the active slide.'
            }
        ],
        notes: [
            {
                noteKey: 'components.window.a11y.role',
                noteFallback: 'Consider adding role="region" and aria-label to the window to make the slide region identifiable to screen readers.'
            },
            {
                noteKey: 'components.window.a11y.arrow_buttons',
                noteFallback: 'Arrow buttons are OrigamBtn with icon props — always provide aria-label (e.g. "Previous slide", "Next slide") via the prevProps/nextProps slots.'
            },
            {
                noteKey: 'components.window.a11y.live_region',
                noteFallback: 'For auto-advancing windows (e.g. carousel), add aria-live="polite" on the active slide container so screen readers announce the new content.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/window.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'window.transition-duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.window.tokens.transition_duration',
                descriptionFallback: 'Slide transition duration.'
            },
            {
                tokenPath: 'window.transition-easing',
                value: '{motion.easing.standard}',
                type: 'cubicBezier',
                descriptionKey: 'components.window.tokens.transition_easing',
                descriptionFallback: 'Slide transition easing.'
            },
            {
                tokenPath: 'window.controls.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.window.tokens.controls_color',
                descriptionFallback: 'Arrow button icon color.'
            },
            {
                tokenPath: 'window.item-x-transition.duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.window.tokens.item_x_transition',
                descriptionFallback: 'Horizontal slide transition duration per item.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'showArrows',
                kind: 'select',
                labelKey: 'components.window.playground.show_arrows',
                labelFallback: 'Show arrows',
                defaultValue: 'true',
                options: [
                    { label: 'false', value: 'false' },
                    { label: 'true', value: 'true' },
                    { label: 'hover', value: 'hover' }
                ]
            },
            {
                prop: 'direction',
                kind: 'select',
                labelKey: 'components.window.playground.direction',
                labelFallback: 'Direction',
                defaultValue: 'horizontal',
                options: [
                    { label: 'horizontal', value: 'horizontal' },
                    { label: 'vertical', value: 'vertical' }
                ]
            },
            {
                prop: 'continuous',
                kind: 'switch',
                labelKey: 'components.window.playground.continuous',
                labelFallback: 'Continuous (wrap-around)',
                defaultValue: false
            },
            {
                prop: 'reverse',
                kind: 'switch',
                labelKey: 'components.window.playground.reverse',
                labelFallback: 'Reverse direction',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.window.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            },
            {
                prop: 'elevation',
                kind: 'select',
                labelKey: 'components.window.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '4', value: '4' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
