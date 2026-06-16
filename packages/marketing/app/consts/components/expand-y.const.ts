/**
 * /components/expand-y — full documentation data for OrigamExpandY.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Transition/transition.interface.ts   (ITransitionProps)
 *   - packages/ds/src/components/Transition/OrigamExpandY.vue         (template, JS hooks, defineExpose)
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

export const EXPAND_Y_DOC: IComponentDoc = {
    slug: 'expand-y',
    name: 'ExpandY',
    tag: 'origam-expand-y',
    icon: 'mdi-arrow-expand-vertical',
    category: 'Utility',
    descriptionKey: 'components.catalog.transition_expand_y.description',
    descriptionFallback: 'JS-driven vertical height expand/collapse transition. Animates the element height from 0 to its natural offsetHeight (enter) and back to 0 (leave). Duration 0.5s with cubic-bezier(0.4, 0, 0.2, 1). Commonly used for accordion and collapsible content.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-transition--design',
    docUrl: 'http://localhost:4000/components/Transition/OrigamExpandY',

    parentSlug: 'transition',

    family: [
        {
            slug: 'transition',
            name: 'Transition',
            descriptionKey: 'components.catalog.transition.description',
            descriptionFallback: 'Generic CSS-driven Vue transition wrapper.'
        },
        {
            slug: 'expand-x',
            name: 'ExpandX',
            descriptionKey: 'components.catalog.transition_expand_x.description',
            descriptionFallback: 'Horizontal width expand/collapse transition (counterpart to ExpandY).'
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
            descriptionFallback: 'Accordion component that uses ExpandY internally to animate the panel body open/close.'
        }
    ],

    props: [
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--expand-y'",
            descriptionKey: 'components.expand_y.props.name.description',
            descriptionFallback: 'Vue transition name prefix. Drives the CSS class applied on enter/leave. Overridable to use custom CSS keyframes.'
        },
        {
            name: 'mode',
            type: { label: 'TTransitionMode', slug: 'transition-mode', kind: 'type' },
            defaultValue: "'in-out'",
            descriptionKey: 'components.expand_y.props.mode.description',
            descriptionFallback: "Vue transition mode. Defaults to 'in-out': the entering element expands first, then the leaving element collapses."
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.expand_y.props.disabled.description',
            descriptionFallback: 'When true, the Vue transition uses :css="false" — JS hooks still run but no CSS classes are applied. Content appears/disappears instantly.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.expand_y.slots.default.description',
            descriptionFallback: 'A single child element to be transitioned. The JS hooks read its offsetHeight to animate height from 0 to its natural size.'
        }
    ],

    examples: [
        {
            titleKey: 'components.expand_y.examples.basic.title',
            titleFallback: 'Toggle content vertically',
            lang: 'vue',
            code: `<template>
  <origam-btn text="Toggle" @click="show = !show" />
  <origam-expand-y>
    <div v-if="show" key="content">
      <p>This content animates its height.</p>
      <p>Multiple lines work fine — height is measured at render time.</p>
    </div>
  </origam-expand-y>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(false)
</script>`
        },
        {
            titleKey: 'components.expand_y.examples.accordion.title',
            titleFallback: 'Simple accordion',
            lang: 'vue',
            code: `<template>
  <div v-for="(item, i) in items" :key="i">
    <origam-btn :text="item.title" @click="active = active === i ? -1 : i" />
    <origam-expand-y>
      <div v-if="active === i" :key="i">
        <p>{{ item.body }}</p>
      </div>
    </origam-expand-y>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const active = ref(-1)
  const items = [
    { title: 'Section 1', body: 'Content for section 1.' },
    { title: 'Section 2', body: 'Content for section 2.' }
  ]
</script>`
        },
        {
            titleKey: 'components.expand_y.examples.reduced_motion.title',
            titleFallback: 'Respect prefers-reduced-motion',
            lang: 'vue',
            code: `<template>
  <origam-expand-y :disabled="prefersReducedMotion">
    <div v-if="show" key="panel">Content</div>
  </origam-expand-y>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const show = ref(false)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
</script>`
        }
    ],

    anatomy: {
        rootClass: 'origam-transition--expand-y',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamExpandY',
        svgDesc: 'Schematic showing height expansion from 0 to natural size on enter, and collapse on leave.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- enter phase: 0 → full height -->
  <rect x="80" y="20" width="220" height="160" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="80" y="140" width="220" height="40" rx="6" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="none"/>
  <text x="190" y="100" font-size="10" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">enter-active</text>
  <text x="190" y="118" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">height: 0 → offsetHeight</text>
  <!-- arrow -->
  <text x="350" y="115" font-size="22" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">→</text>
  <!-- leave phase: full height → 0 -->
  <rect x="400" y="20" width="220" height="160" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="5 3" opacity="0.55"/>
  <rect x="400" y="20" width="220" height="40" rx="6" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="none" opacity="0.55"/>
  <text x="510" y="100" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace" opacity="0.7">leave-active</text>
  <text x="510" y="118" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace" opacity="0.7">height: offsetHeight → 0</text>
  <!-- markers -->
  <circle cx="88" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="88" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="408" cy="28" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="408" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-expand-y&gt;</code> — wraps a single element. JS hooks read <code>offsetHeight</code> to animate height from 0 → natural size on enter ①, and back to 0 on leave ②. <code>overflow: hidden</code> is set during the transition. ExpandY is the backbone of <code>&lt;origam-expansion-panel&gt;</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-transition--expand-y-enter-active',
                descriptionKey: 'components.expand_y.anatomy.enter_active',
                descriptionFallback: 'Enter phase. CSS class drives transition-duration (0.5s), timing (cubic-bezier(0.4,0,0.2,1)) and transition-property (height). The JS beforeEnter hook stashes the initial height; enter sets height to 0 then requestAnimationFrame restores offsetHeight.'
            },
            {
                num: 2,
                cls: '.origam-transition--expand-y-leave-active',
                descriptionKey: 'components.expand_y.anatomy.leave_active',
                descriptionFallback: 'Leave phase. CSS class drives transition-duration (0.5s) and property (height). The JS leave hook stashes the current height and animates to 0. afterLeave restores the initial style.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamExpandY — JS-driven <transition> -->
<transition
  name="origam-transition--expand-y"
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
                cls: 'origam-transition--expand-y-enter-active',
                descriptionKey: 'components.expand_y.anatomy.enter_active',
                descriptionFallback: 'Applied during enter. Sets transition-property: height, duration 0.5s.'
            },
            {
                cls: 'origam-transition--expand-y-leave-active',
                descriptionKey: 'components.expand_y.anatomy.leave_active',
                descriptionFallback: 'Applied during leave. Sets transition-property: height, duration 0.5s.'
            },
            {
                cls: 'origam-transition--expand-y-move',
                descriptionKey: 'components.expand_y.anatomy.move',
                descriptionFallback: 'Applied to elements repositioning in a group transition. Sets transition-property: transform, duration 0.5s.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-transition--expand-y-enter-active---transition-duration',
            defaultValue: '0.5s',
            descriptionKey: 'components.expand_y.css_vars.enter_duration',
            descriptionFallback: 'Duration of the enter (expand) animation.'
        },
        {
            name: '--origam-transition--expand-y-enter-active---transition-timing-function',
            defaultValue: 'cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.expand_y.css_vars.enter_timing',
            descriptionFallback: 'Easing function for the enter animation.'
        },
        {
            name: '--origam-transition--expand-y-enter-active---transition-property',
            defaultValue: 'height',
            descriptionKey: 'components.expand_y.css_vars.enter_property',
            descriptionFallback: 'CSS property animated on enter.'
        },
        {
            name: '--origam-transition--expand-y-enter-leave---transition-duration',
            defaultValue: '0.5s',
            descriptionKey: 'components.expand_y.css_vars.leave_duration',
            descriptionFallback: 'Duration of the leave (collapse) animation.'
        },
        {
            name: '--origam-transition--expand-y-enter-leave---transition-timing-function',
            defaultValue: 'cubic-bezier(0.4, 0, 0.2, 1)',
            descriptionKey: 'components.expand_y.css_vars.leave_timing',
            descriptionFallback: 'Easing function for the leave animation.'
        },
        {
            name: '--origam-transition--expand-y-enter-leave---transition-property',
            defaultValue: 'height',
            descriptionKey: 'components.expand_y.css_vars.leave_property',
            descriptionFallback: 'CSS property animated on leave.'
        },
        {
            name: '--origam-transition--expand-y-move---transition-duration',
            defaultValue: '0.5s',
            descriptionKey: 'components.expand_y.css_vars.move_duration',
            descriptionFallback: 'Duration of the move animation in group transitions.'
        },
        {
            name: '--origam-transition--expand-y-move---transition-property',
            defaultValue: 'transform',
            descriptionKey: 'components.expand_y.css_vars.move_property',
            descriptionFallback: 'CSS property animated during group moves.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.expand_y.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.expand_y.a11y.reduced_motion',
                noteFallback: 'Set disabled=true to suppress all animations for users with prefers-reduced-motion: reduce. OrigamExpansionPanel passes this automatically when the media query matches.'
            },
            {
                noteKey: 'components.expand_y.a11y.no_role',
                noteFallback: 'ExpandY is transparent to the accessibility tree — it adds no ARIA roles or attributes. Only the slotted content is visible to screen readers.'
            },
            {
                noteKey: 'components.expand_y.a11y.overflow',
                noteFallback: 'During the transition, overflow: hidden is set on the element to prevent content from showing outside the animated bounds. The original overflow is restored in afterEnter / afterLeave.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/transition.json',
        pipelineNote: 'Expand tokens share the "expand" group with ExpandX. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'transition.expand.duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.expand_y.tokens.duration',
                descriptionFallback: 'Expand/collapse animation duration (shared with ExpandX). Slightly slower than fade/slide to account for layout reflow.'
            },
            {
                tokenPath: 'transition.expand.easing',
                value: '{motion.easing.standard}',
                type: 'cubicBezier',
                descriptionKey: 'components.expand_y.tokens.easing',
                descriptionFallback: 'Easing curve for the expand animation.'
            },
            {
                tokenPath: 'transition.expand.max-height-from',
                value: '0',
                type: 'dimension',
                descriptionKey: 'components.expand_y.tokens.from',
                descriptionFallback: 'Starting dimension for the expand animation (0 → offsetHeight).'
            }
        ]
    } satisfies IComponentTokens
}
