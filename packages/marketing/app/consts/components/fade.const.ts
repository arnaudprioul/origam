/**
 * /components/fade — full documentation data for OrigamFade.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Transition/transition.interface.ts  (props)
 *   - packages/ds/src/components/Transition/OrigamFade.vue           (template BEM, defineExpose)
 *   - packages/ds/tokens/component/transition.json                   (CSS tokens)
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

export const FADE_DOC: IComponentDoc = {
    slug: 'fade',
    name: 'Fade',
    tag: 'origam-fade',
    icon: 'mdi-transition',
    category: 'Utility',
    descriptionKey: 'components.catalog.fade.description',
    descriptionFallback: 'Opacity-only enter/leave CSS transition. A thin wrapper around the generic Transition that sets name="origam-transition--fade".',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-transition--design',
    docUrl: 'http://localhost:4000/components/Transition/OrigamTransition',
    parentSlug: 'transition',

    family: [],

    related: [
        {
            slug: 'transition',
            name: 'Transition',
            kind: 'component',
            descriptionKey: 'components.catalog.transition.description',
            descriptionFallback: 'Parent generic transition wrapper. OrigamFade pre-sets the fade CSS name.'
        }
    ],

    props: [
        {
            name: 'mode',
            type: { label: 'TTransitionMode', slug: 'transition-mode', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.fade.props.mode.description',
            descriptionFallback: 'Vue transition mode: "in-out" (new enters then old leaves) or "out-in" (old leaves then new enters).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.fade.props.disabled.description',
            descriptionFallback: 'Disables all animation — content appears/disappears instantly. Automatically true when prefers-reduced-motion: reduce is detected.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--fade'",
            descriptionKey: 'components.fade.props.name.description',
            descriptionFallback: 'Vue transition name class prefix. Pre-set to "origam-transition--fade". Override to use a custom CSS keyframe set.'
        },
        {
            name: 'group',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.fade.props.group.description',
            descriptionFallback: 'When true, renders a <transition-group> instead of <transition>. Enables list-move animation.'
        },
        {
            name: 'hideOnLeave',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.fade.props.hide_on_leave.description',
            descriptionFallback: 'Sets the leaving element to visibility: hidden immediately so it does not participate in layout during the leave animation.'
        },
        {
            name: 'leaveAbsolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.fade.props.leave_absolute.description',
            descriptionFallback: 'Positions the leaving element absolutely during the leave phase to prevent layout jank in group transitions.'
        },
        {
            name: 'origin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.fade.props.origin.description',
            descriptionFallback: 'CSS transform-origin applied to the element during the transition.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.fade.slots.default.description',
            descriptionFallback: 'A single child element (or multiple when group=true) that will be faded in/out.'
        }
    ],

    examples: [
        {
            titleKey: 'components.fade.examples.basic.title',
            titleFallback: 'Basic fade',
            lang: 'vue',
            code: `<template>
  <origam-btn @click="show = !show">Toggle</origam-btn>
  <origam-fade>
    <div v-if="show" key="content">Hello, I fade!</div>
  </origam-fade>
</template>`
        },
        {
            titleKey: 'components.fade.examples.mode.title',
            titleFallback: 'Out-in mode (swap)',
            lang: 'vue',
            code: `<template>
  <origam-fade mode="out-in">
    <div :key="view" style="padding: 8px; background: var(--origam-color__surface---raised)">{{ view }}</div>
  </origam-fade>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-transition--fade',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamFade',
        svgDesc: 'Schematic showing the fade transition: an entering element at full opacity and a leaving element at opacity 0.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="40" width="260" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="170" y="75" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">enter-active</text>
  <text x="170" y="91" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">opacity: 0 → 1</text>
  <rect x="400" y="40" width="260" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="5 3" opacity="0.45"/>
  <text x="530" y="75" font-size="11" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">leave-active</text>
  <text x="530" y="91" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">opacity: 1 → 0</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="408" cy="48" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="408" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="80" font-size="20" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">→</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-fade&gt;</code> — wraps a single child. During the transition, the entering element ① fades from <code>opacity: 0</code> to <code>1</code> while the leaving element ② fades from <code>1</code> to <code>0</code> over 300 ms.`,
        legend: [
            {
                num: 1,
                cls: '.origam-transition--fade-enter-active',
                descriptionKey: 'components.fade.anatomy.enter',
                descriptionFallback: 'Applied to the entering element. Sets transition-property: opacity, duration: 0.3s, easing: cubic-bezier(0.4, 0, 0.2, 1).'
            },
            {
                num: 2,
                cls: '.origam-transition--fade-leave-active',
                descriptionKey: 'components.fade.anatomy.leave',
                descriptionFallback: 'Applied to the leaving element. Same duration and easing. Opacity animates from 1 to 0 via .origam-transition--fade-leave-to.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" :name="name" v-bind="transitionProps">
  <slot name="default" />
</component>`,
        classes: [
            {
                cls: 'origam-transition--fade',
                descriptionKey: 'components.fade.anatomy.cls_root',
                descriptionFallback: 'Transition name used as the CSS class prefix for enter/leave phases.'
            },
            {
                cls: 'origam-transition--fade-enter-active',
                descriptionKey: 'components.fade.anatomy.cls_enter_active',
                descriptionFallback: 'Active entering phase: transition-property: opacity; duration: 0.3s.'
            },
            {
                cls: 'origam-transition--fade-leave-active',
                descriptionKey: 'components.fade.anatomy.cls_leave_active',
                descriptionFallback: 'Active leaving phase: same timing as enter.'
            },
            {
                cls: 'origam-transition--fade-enter-from',
                descriptionKey: 'components.fade.anatomy.cls_enter_from',
                descriptionFallback: 'Initial state of the entering element: opacity: 0.'
            },
            {
                cls: 'origam-transition--fade-leave-to',
                descriptionKey: 'components.fade.anatomy.cls_leave_to',
                descriptionFallback: 'Final state of the leaving element: opacity: 0.'
            },
            {
                cls: 'origam-transition--fade-move',
                descriptionKey: 'components.fade.anatomy.cls_move',
                descriptionFallback: 'Applied to sibling elements that shift position when group=true. Animates transform over 0.5s.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-transition---default-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.fade.css_vars.duration',
            descriptionFallback: 'Fade enter/leave duration (300 ms). Hardcoded in the SCSS block as 0.3s; override via the token rebuild.'
        },
        {
            name: '--origam-transition---default-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.fade.css_vars.easing',
            descriptionFallback: 'Easing function for both enter and leave phases: cubic-bezier(0.4, 0, 0.2, 1).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.fade.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to the underlying transition element.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.fade.a11y.reduced_motion',
                noteFallback: 'useCssTransition automatically sets disabled=true when prefers-reduced-motion: reduce is detected. Content appears/disappears instantly with no opacity animation.'
            },
            {
                noteKey: 'components.fade.a11y.transparent',
                noteFallback: 'The transition wrapper adds no elements to the DOM — it is transparent to the accessibility tree. Only the slotted content is announced by screen readers.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/transition.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'transition.default.duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.fade.tokens.duration',
                descriptionFallback: 'Fade enter/leave transition duration (300 ms).'
            },
            {
                tokenPath: 'transition.default.easing',
                value: '{motion.easing.standard}',
                type: 'string',
                descriptionKey: 'components.fade.tokens.easing',
                descriptionFallback: 'Easing applied to the opacity transition: cubic-bezier(0.4, 0, 0.2, 1).'
            }
        ]
    } satisfies IComponentTokens
}
