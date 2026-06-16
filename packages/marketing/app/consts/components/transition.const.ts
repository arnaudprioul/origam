/**
 * /components/transition — full documentation data for the OrigamTransition family.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Transition/transition.interface.ts  (props)
 *   - packages/ds/src/components/Transition/OrigamFade.vue           (fade)
 *   - packages/ds/src/components/Transition/OrigamSlideX.vue         (slide-x)
 *   - packages/ds/src/components/Transition/OrigamSlideY.vue         (slide-y)
 *   - packages/ds/src/components/Transition/OrigamExpandX.vue        (expand-x)
 *   - packages/ds/src/components/Transition/OrigamExpandY.vue        (expand-y)
 *   - packages/ds/src/components/Transition/OrigamScaleRotate.vue    (scale-rotate)
 *   - packages/ds/tokens/component/transition.json                   (CSS tokens)
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

export const TRANSITION_DOC: IComponentDoc = {
    slug: 'transition',
    name: 'Transition',
    tag: 'origam-transition',
    icon: 'mdi-transition',
    category: 'Utility',
    descriptionKey: 'components.catalog.transition.description',
    descriptionFallback: 'CSS-driven Vue transition wrappers. The family includes Fade, SlideX, SlideY, ExpandX, ExpandY, ScaleRotate and a generic Transition component. All are prefers-reduced-motion aware.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-transition--design',
    docUrl: 'http://localhost:4000/components/Transition/OrigamTransition',

    family: [
        {
            slug: 'transition-fade',
            name: 'Fade',
            descriptionKey: 'components.catalog.transition_fade.description',
            descriptionFallback: 'Opacity-only enter/leave transition (origam-transition--fade).'
        },
        {
            slug: 'transition-slide-x',
            name: 'SlideX',
            descriptionKey: 'components.catalog.transition_slide_x.description',
            descriptionFallback: 'Horizontal slide + fade transition (origam-transition--slide-x).'
        },
        {
            slug: 'transition-slide-y',
            name: 'SlideY',
            descriptionKey: 'components.catalog.transition_slide_y.description',
            descriptionFallback: 'Vertical slide + fade transition (origam-transition--slide-y).'
        },
        {
            slug: 'transition-expand-x',
            name: 'ExpandX',
            descriptionKey: 'components.catalog.transition_expand_x.description',
            descriptionFallback: 'Horizontal width expand/collapse transition.'
        },
        {
            slug: 'transition-expand-y',
            name: 'ExpandY',
            descriptionKey: 'components.catalog.transition_expand_y.description',
            descriptionFallback: 'Vertical height expand/collapse transition.'
        },
        {
            slug: 'transition-scale-rotate',
            name: 'ScaleRotate',
            descriptionKey: 'components.catalog.transition_scale_rotate.description',
            descriptionFallback: 'Scale + rotate + fade combined transition (origam-transition--scale-rotate).'
        }
    ],

    props: [
        {
            name: 'mode',
            type: { label: 'TTransitionMode', slug: 'transition-mode', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.transition.props.mode.description',
            descriptionFallback: 'Vue transition mode: "in-out" (new enters then old leaves) or "out-in" (old leaves then new enters).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.transition.props.disabled.description',
            descriptionFallback: 'Disables all animation — content appears/disappears instantly. Automatically true when prefers-reduced-motion: reduce is detected.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--fade'",
            descriptionKey: 'components.transition.props.name.description',
            descriptionFallback: 'Vue transition name class prefix. Each sub-component sets this to its own CSS class (e.g. origam-transition--slide-x). Override to use custom CSS keyframes.'
        },
        {
            name: 'group',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.transition.props.group.description',
            descriptionFallback: 'When true, renders a <transition-group> instead of <transition>. Enables list-move animation.'
        },
        {
            name: 'hideOnLeave',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.transition.props.hide_on_leave.description',
            descriptionFallback: 'Sets the leaving element to visibility: hidden immediately so it does not participate in layout during the leave animation.'
        },
        {
            name: 'leaveAbsolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.transition.props.leave_absolute.description',
            descriptionFallback: 'Positions the leaving element absolutely during the leave phase to prevent layout jank in group transitions.'
        },
        {
            name: 'origin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.transition.props.origin.description',
            descriptionFallback: 'CSS transform-origin applied to the element during the transition (used by scale-based transitions).'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.transition.slots.default.description',
            descriptionFallback: 'A single child element (or multiple when group=true) that will be transitioned.'
        }
    ],

    examples: [
        {
            titleKey: 'components.transition.examples.fade.title',
            titleFallback: 'Fade',
            lang: 'vue',
            code: `<template>
  <origam-fade>
    <div v-if="show" key="content">Hello</div>
  </origam-fade>
</template>`
        },
        {
            titleKey: 'components.transition.examples.slide.title',
            titleFallback: 'SlideX and SlideY',
            lang: 'vue',
            code: `<template>
  <origam-slide-x>
    <div v-if="show" key="panel">Sliding panel</div>
  </origam-slide-x>

  <origam-slide-y>
    <div v-if="show" key="panel2">Sliding panel (Y)</div>
  </origam-slide-y>
</template>`
        },
        {
            titleKey: 'components.transition.examples.expand.title',
            titleFallback: 'Expand (accordion)',
            lang: 'vue',
            code: `<template>
  <origam-expand-y>
    <div v-if="expanded" key="body">
      <p>This content expands vertically.</p>
    </div>
  </origam-expand-y>
</template>`
        }
    ],

    previewVariants: [
        { label: 'fade', props: { name: 'origam-transition--fade' } },
        { label: 'slide-x', props: { name: 'origam-transition--slide-x' } },
        { label: 'slide-y', props: { name: 'origam-transition--slide-y' } },
        { label: 'scale-rotate', props: { name: 'origam-transition--scale-rotate' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-transition',
        svgViewBox: '0 0 700 160',
        svgTitle: 'Anatomy of OrigamTransition',
        svgDesc: 'Schematic showing transition wrapper over entering and leaving elements.',
        svg: `
  <rect x="0" y="0" width="700" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="40" width="280" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="180" y="84" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">enter-active</text>
  <rect x="380" y="40" width="280" height="80" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="5 3" opacity="0.5"/>
  <text x="520" y="84" font-size="11" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">leave-active</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="388" cy="48" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="388" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="80" font-size="20" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">→</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-transition&gt;</code> — wraps a single child. During a transition, the entering element ① is animated in while the leaving element ② animates out (sequence depends on <code>mode</code>).`,
        legend: [
            {
                num: 1,
                cls: '[enter-active]',
                descriptionKey: 'components.transition.anatomy.enter',
                descriptionFallback: 'The entering element receives the transition CSS class (e.g. origam-transition--fade-enter-active).'
            },
            {
                num: 2,
                cls: '[leave-active]',
                descriptionKey: 'components.transition.anatomy.leave',
                descriptionFallback: 'The leaving element receives the leave-active class and exits. In out-in mode this completes before the enter starts.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- generic wrapper — delegates to <transition> or <transition-group> -->
<component :is="group ? 'transition-group' : 'transition'" :name="name" v-bind="transitionProps">
  <slot name="default" />
</component>`,
        classes: [
            { cls: 'origam-transition--fade', descriptionKey: 'components.transition.anatomy.fade_cls', descriptionFallback: 'Opacity-only CSS transition class.' },
            { cls: 'origam-transition--slide-x', descriptionKey: 'components.transition.anatomy.slide_x_cls', descriptionFallback: 'Horizontal slide + fade CSS transition class.' },
            { cls: 'origam-transition--slide-y', descriptionKey: 'components.transition.anatomy.slide_y_cls', descriptionFallback: 'Vertical slide + fade CSS transition class.' },
            { cls: 'origam-transition--scale-rotate', descriptionKey: 'components.transition.anatomy.scale_rotate_cls', descriptionFallback: 'Scale + rotate + fade CSS transition class.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-transition---default-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.transition.css_vars.default_duration',
            descriptionFallback: 'Default transition duration (300 ms).'
        },
        {
            name: '--origam-transition---default-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.transition.css_vars.default_easing',
            descriptionFallback: 'Default easing function (cubic-bezier).'
        },
        {
            name: '--origam-transition---slide-x-distance',
            defaultValue: '100%',
            descriptionKey: 'components.transition.css_vars.slide_x_distance',
            descriptionFallback: 'Horizontal translate distance for slide-x transition.'
        },
        {
            name: '--origam-transition---slide-y-distance',
            defaultValue: '100%',
            descriptionKey: 'components.transition.css_vars.slide_y_distance',
            descriptionFallback: 'Vertical translate distance for slide-y transition.'
        },
        {
            name: '--origam-transition---scale-from',
            defaultValue: '0.95',
            descriptionKey: 'components.transition.css_vars.scale_from',
            descriptionFallback: 'Initial scale value for scale-based transitions.'
        },
        {
            name: '--origam-transition---expand-duration',
            defaultValue: '{motion.duration.slow}',
            descriptionKey: 'components.transition.css_vars.expand_duration',
            descriptionFallback: 'Duration for expand-x/expand-y transitions (400 ms — slightly slower for layout shifts).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.transition.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to the underlying transition.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.transition.a11y.reduced_motion',
                noteFallback: 'All Origam transition components detect prefers-reduced-motion: reduce and disable the animation (disabled=true) automatically. Content still appears/disappears instantly.'
            },
            {
                noteKey: 'components.transition.a11y.no_role',
                noteFallback: 'Transition wrappers are transparent to the accessibility tree — they add no ARIA roles or attributes. Only the slotted content is announced by screen readers.'
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
                descriptionKey: 'components.transition.tokens.default_duration',
                descriptionFallback: 'Default enter/leave duration.'
            },
            {
                tokenPath: 'transition.slide-x.duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.transition.tokens.slide_x_duration',
                descriptionFallback: 'Slide-X duration.'
            },
            {
                tokenPath: 'transition.expand.duration',
                value: '{motion.duration.slow}',
                type: 'duration',
                descriptionKey: 'components.transition.tokens.expand_duration',
                descriptionFallback: 'Expand-Y / expand-X duration (slightly slower for layout animations).'
            },
            {
                tokenPath: 'transition.scale.scale-from',
                value: '0.95',
                type: 'number',
                descriptionKey: 'components.transition.tokens.scale_from',
                descriptionFallback: 'Initial scale value for scale-based transitions.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'name',
                kind: 'select',
                labelKey: 'components.transition.playground.name',
                labelFallback: 'Transition',
                defaultValue: 'origam-transition--fade',
                options: [
                    { label: 'fade', value: 'origam-transition--fade' },
                    { label: 'slide-x', value: 'origam-transition--slide-x' },
                    { label: 'slide-y', value: 'origam-transition--slide-y' },
                    { label: 'scale-rotate', value: 'origam-transition--scale-rotate' }
                ]
            },
            {
                prop: 'mode',
                kind: 'select',
                labelKey: 'components.transition.playground.mode',
                labelFallback: 'Mode',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'in-out', value: 'in-out' },
                    { label: 'out-in', value: 'out-in' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.transition.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'group',
                kind: 'switch',
                labelKey: 'components.transition.playground.group',
                labelFallback: 'Group mode',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
