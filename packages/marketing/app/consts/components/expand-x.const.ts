/**
 * /components/expand-x — full documentation data for OrigamExpandX.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Transition/transition.interface.ts   (ITransitionProps)
 *   - packages/ds/src/components/Transition/OrigamExpandX.vue         (template, JS hooks, defineExpose)
 *   - packages/ds/tokens/component/transition.json                    (expand token group)
 *
 * FAMILY: Transition folder — sub-component of transition.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const EXPAND_X_DOC: IComponentDoc = {
    slug: 'expand-x',
    name: 'ExpandX',
    tag: 'origam-expand-x',
    icon: 'mdi-arrow-expand-horizontal',
    category: 'Utility',
    descriptionKey: 'components.catalog.transition_expand_x.description',
    descriptionFallback: 'JS-driven horizontal width expand/collapse transition. Animates the element width from 0 to its natural offsetWidth (enter) and back to 0 (leave). Duration 0.5s with cubic-bezier(0.4, 0, 0.2, 1).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-transition--design',
    docUrl: 'http://localhost:4000/components/Transition/OrigamExpandX',

    parentSlug: 'transition',

    family: [
        {
            slug: 'transition',
            name: 'Transition',
            descriptionKey: 'components.catalog.transition.description',
            descriptionFallback: 'Generic CSS-driven Vue transition wrapper.'
        },
        {
            slug: 'expand-y',
            name: 'ExpandY',
            descriptionKey: 'components.catalog.transition_expand_y.description',
            descriptionFallback: 'Vertical height expand/collapse transition (counterpart to ExpandX).'
        },
        {
            slug: 'transition-fade',
            name: 'Fade',
            descriptionKey: 'components.catalog.transition_fade.description',
            descriptionFallback: 'Opacity-only enter/leave transition.'
        },
        {
            slug: 'transition-slide-x',
            name: 'SlideX',
            descriptionKey: 'components.catalog.transition_slide_x.description',
            descriptionFallback: 'Horizontal slide + fade transition.'
        },
        {
            slug: 'transition-slide-y',
            name: 'SlideY',
            descriptionKey: 'components.catalog.transition_slide_y.description',
            descriptionFallback: 'Vertical slide + fade transition.'
        },
        {
            slug: 'transition-scale-rotate',
            name: 'ScaleRotate',
            descriptionKey: 'components.catalog.transition_scale_rotate.description',
            descriptionFallback: 'Scale + rotate + fade combined transition.'
        }
    ],

    related: [
        {
            slug: 'expansion-panel',
            name: 'ExpansionPanel',
            kind: 'component',
            descriptionKey: 'components.catalog.expansion_panel.description',
            descriptionFallback: 'Accordion component that uses ExpandY internally to animate the panel body.'
        }
    ],

    props: [
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--expand-x'",
            descriptionKey: 'components.expand_x.props.name.description',
            descriptionFallback: 'Vue transition name prefix. Drives the CSS class applied on enter/leave. Overridable to use custom CSS keyframes.'
        },
        {
            name: 'mode',
            type: { label: 'TTransitionMode', slug: 'transition-mode', kind: 'type' },
            defaultValue: "'in-out'",
            descriptionKey: 'components.expand_x.props.mode.description',
            descriptionFallback: "Vue transition mode. Defaults to 'in-out': the entering element expands first, then the leaving element collapses."
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expand_x.props.disabled.description',
            descriptionFallback: 'When true, the Vue transition uses :css="false" — JS hooks still run but no CSS classes are applied. Content appears/disappears instantly.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.expand_x.slots.default.description',
            descriptionFallback: 'A single child element to be transitioned. The JS hooks read its offsetWidth to animate width from 0 to natural size.'
        }
    ],

    examples: [
        {
            titleKey: 'components.expand_x.examples.basic.title',
            titleFallback: 'Expand a panel horizontally',
            lang: 'vue',
            code: `<template>
  <origam-btn text="Toggle" @click="show = !show" />
  <origam-expand-x>
    <div v-if="show" key="panel" style="overflow: hidden; white-space: nowrap;">
      Horizontally expanded content
    </div>
  </origam-expand-x>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(false)
</script>`
        },
        {
            titleKey: 'components.expand_x.examples.sidebar.title',
            titleFallback: 'Collapsible sidebar',
            lang: 'vue',
            code: `<template>
  <div style="display: flex;">
    <origam-expand-x>
      <nav v-if="sidebarOpen" key="sidebar" style="width: 240px;">
        <p>Sidebar nav</p>
      </nav>
    </origam-expand-x>
    <main>Main content</main>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const sidebarOpen = ref(true)
</script>`
        }
    ],

    anatomy: {
        rootClass: 'origam-transition--expand-x',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamExpandX',
        svgDesc: 'Schematic showing width expansion from 0 to natural size on enter, and collapse on leave.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- enter phase: 0 → full width -->
  <rect x="40" y="40" width="280" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="40" y="40" width="60" height="80" rx="6" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="none"/>
  <text x="180" y="76" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">enter-active</text>
  <text x="180" y="92" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">width: 0 → offsetWidth</text>
  <!-- arrow -->
  <text x="350" y="84" font-size="22" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">→</text>
  <!-- leave phase: full width → 0 -->
  <rect x="380" y="40" width="280" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="5 3" opacity="0.55"/>
  <rect x="600" y="40" width="60" height="80" rx="6" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="none" opacity="0.55"/>
  <text x="520" y="76" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace" opacity="0.7">leave-active</text>
  <text x="520" y="92" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace" opacity="0.7">width: offsetWidth → 0</text>
  <!-- markers -->
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="388" cy="48" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="388" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-expand-x&gt;</code> — wraps a single element. JS hooks read <code>offsetWidth</code> to animate width from 0 → natural size on enter ①, and back to 0 on leave ②. <code>overflow: hidden</code> is set during the transition to prevent content overflow.`,
        legend: [
            {
                num: 1,
                cls: '.origam-transition--expand-x-enter-active',
                descriptionKey: 'components.expand_x.anatomy.enter_active',
                descriptionFallback: 'Enter phase. CSS class drives transition-duration (0.5s), timing (cubic-bezier(0.4,0,0.2,1)) and transition-property (width). The JS beforeEnter hook stashes the initial width; enter sets width to 0 then requestAnimationFrame restores offsetWidth.'
            },
            {
                num: 2,
                cls: '.origam-transition--expand-x-leave-active',
                descriptionKey: 'components.expand_x.anatomy.leave_active',
                descriptionFallback: 'Leave phase. CSS class drives transition-duration (0.5s), timing and transition-property. The JS leave hook stashes the current width and animates to 0. afterLeave restores the initial style.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamExpandX — JS-driven <transition> -->
<transition
  name="origam-transition--expand-x"
  mode="in-out"
  :css="!disabled"
  @before-enter="handleBeforeEnter"
  @enter="handleEnter"
  @after-enter="handleAfterEnter"
  @enter-cancelled="handleEnterCancelled"
  @leave="handleLeave"
  @after-leave="handleAfterLeave"
  @leave-cancelled="handleLeaveCancelled"
>
  <slot name="default" />
</transition>`,
        classes: [
            {
                cls: 'origam-transition--expand-x-enter-active',
                descriptionKey: 'components.expand_x.anatomy.enter_active',
                descriptionFallback: 'Applied during enter. Sets transition-property: width, duration 0.5s.'
            },
            {
                cls: 'origam-transition--expand-x-leave-active',
                descriptionKey: 'components.expand_x.anatomy.leave_active',
                descriptionFallback: 'Applied during leave. Sets transition-property: width, duration 0.5s.'
            },
            {
                cls: 'origam-transition--expand-x-move',
                descriptionKey: 'components.expand_x.anatomy.move',
                descriptionFallback: 'Applied to elements repositioning in a group transition. Sets transition-property: transform, duration 0.5s.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-transition--expand-x-enter-active---transition-duration',
            defaultValue: '0.5s',
            descriptionKey: 'components.expand_x.css_vars.enter_duration',
            descriptionFallback: 'Duration of the enter (expand) animation.'
        },
        {
            name: '--origam-transition--expand-x-enter-active---transition-timing-function',
            defaultValue: 'cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.expand_x.css_vars.enter_timing',
            descriptionFallback: 'Easing function for the enter animation.'
        },
        {
            name: '--origam-transition--expand-x-enter-active---transition-property',
            defaultValue: 'width',
            descriptionKey: 'components.expand_x.css_vars.enter_property',
            descriptionFallback: 'CSS property animated on enter.'
        },
        {
            name: '--origam-transition--expand-x-enter-leave---transition-duration',
            defaultValue: '0.5s',
            descriptionKey: 'components.expand_x.css_vars.leave_duration',
            descriptionFallback: 'Duration of the leave (collapse) animation.'
        },
        {
            name: '--origam-transition--expand-x-enter-leave---transition-timing-function',
            defaultValue: 'cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.expand_x.css_vars.leave_timing',
            descriptionFallback: 'Easing function for the leave animation.'
        },
        {
            name: '--origam-transition--expand-x-enter-leave---transition-property',
            defaultValue: 'width',
            descriptionKey: 'components.expand_x.css_vars.leave_property',
            descriptionFallback: 'CSS property animated on leave.'
        },
        {
            name: '--origam-transition--expand-x-move---transition-duration',
            defaultValue: '0.5s',
            descriptionKey: 'components.expand_x.css_vars.move_duration',
            descriptionFallback: 'Duration of the move animation in group transitions.'
        },
        {
            name: '--origam-transition--expand-x-move---transition-property',
            defaultValue: 'transform',
            descriptionKey: 'components.expand_x.css_vars.move_property',
            descriptionFallback: 'CSS property animated during group moves.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.expand_x.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.expand_x.a11y.reduced_motion',
                noteFallback: 'Set disabled=true to suppress all animations for users with prefers-reduced-motion: reduce. OrigamDatePickerMonth passes this prop automatically when the media query matches.'
            },
            {
                noteKey: 'components.expand_x.a11y.no_role',
                noteFallback: 'ExpandX is transparent to the accessibility tree — it adds no ARIA roles or attributes. Only the slotted content is visible to screen readers.'
            },
            {
                noteKey: 'components.expand_x.a11y.overflow',
                noteFallback: 'During the transition, overflow: hidden is set on the element to prevent content from showing outside the animated bounds. The original overflow is restored in afterEnter / afterLeave.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/transition.json',
        pipelineNote: 'Expand tokens share the "expand" group with ExpandY. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'transition.expand.duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.expand_x.tokens.duration',
                descriptionFallback: 'Expand/collapse animation duration (shared with ExpandY). Slightly slower than fade/slide to account for layout reflow.'
            },
            {
                tokenPath: 'transition.expand.easing',
                value: '{motion.easing.standard}',
                type: 'cubicBezier',
                descriptionKey: 'components.expand_x.tokens.easing',
                descriptionFallback: 'Easing curve for the expand animation.'
            },
            {
                tokenPath: 'transition.expand.max-height-from',
                value: '0',
                type: 'dimension',
                descriptionKey: 'components.expand_x.tokens.from',
                descriptionFallback: 'Starting dimension for the expand animation (0 → offsetWidth).'
            }
        ]
    } satisfies IComponentTokens
}
