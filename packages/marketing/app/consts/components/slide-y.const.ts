/**
 * /components/slide-y — full documentation data for OrigamSlideY.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Transition/transition.interface.ts  (ITransitionProps)
 *   - packages/ds/src/components/Transition/OrigamSlideY.vue         (template, style)
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
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SLIDE_Y_DOC: IComponentDoc = {
    slug: 'slide-y',
    name: 'SlideY',
    tag: 'origam-slide-y',
    icon: 'mdi-arrow-up-down',
    category: 'Utility',
    descriptionKey: 'components.catalog.transition_slide_y.description',
    descriptionFallback: 'CSS-driven Vue transition that slides a child element vertically (translateY −15px → identity) combined with an opacity fade. Sub-component of the Transition family.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-transition--design',
    docUrl: 'http://localhost:4000/components/Transition/OrigamTransition',

    parentSlug: 'transition',

    family: [
        {
            slug: 'transition',
            name: 'Transition',
            descriptionKey: 'components.catalog.transition.description',
            descriptionFallback: 'CSS-driven Vue transition wrappers. Fade, SlideX, SlideY, ExpandX, ExpandY, ScaleRotate.'
        },
        {
            slug: 'transition-fade',
            name: 'Fade',
            descriptionKey: 'components.catalog.transition_fade.description',
            descriptionFallback: 'Opacity-only enter/leave transition.'
        },
        {
            slug: 'slide-x',
            name: 'SlideX',
            descriptionKey: 'components.catalog.transition_slide_x.description',
            descriptionFallback: 'Horizontal slide + fade transition.'
        },
        {
            slug: 'expand-x',
            name: 'ExpandX',
            descriptionKey: 'components.catalog.transition_expand_x.description',
            descriptionFallback: 'Horizontal width expand/collapse transition.'
        },
        {
            slug: 'expand-y',
            name: 'ExpandY',
            descriptionKey: 'components.catalog.transition_expand_y.description',
            descriptionFallback: 'Vertical height expand/collapse transition.'
        },
        {
            slug: 'scale-rotate',
            name: 'ScaleRotate',
            descriptionKey: 'components.catalog.transition_scale_rotate.description',
            descriptionFallback: 'Scale + rotate + fade combined transition.'
        }
    ],

    props: [
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--slide-y'",
            descriptionKey: 'components.slide_y.props.name.description',
            descriptionFallback: 'Vue transition name class prefix. Defaults to origam-transition--slide-y.'
        },
        {
            name: 'mode',
            type: { label: 'TTransitionMode', slug: 'transition-mode', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slide_y.props.mode.description',
            descriptionFallback: 'Vue transition mode: "in-out" or "out-in".'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide_y.props.disabled.description',
            descriptionFallback: 'Disables the animation. Content appears/disappears instantly.'
        },
        {
            name: 'group',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide_y.props.group.description',
            descriptionFallback: 'When true, renders a <transition-group> to enable list-move animation.'
        },
        {
            name: 'hideOnLeave',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide_y.props.hide_on_leave.description',
            descriptionFallback: 'Sets the leaving element to visibility: hidden immediately.'
        },
        {
            name: 'leaveAbsolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.slide_y.props.leave_absolute.description',
            descriptionFallback: 'Positions the leaving element absolutely during leave to prevent layout jank.'
        },
        {
            name: 'origin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.slide_y.props.origin.description',
            descriptionFallback: 'CSS transform-origin applied during the transition.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.slide_y.slots.default.description',
            descriptionFallback: 'A single child element (or multiple when group=true) that receives the vertical slide transition.'
        }
    ],

    examples: [
        {
            titleKey: 'components.slide_y.examples.basic.title',
            titleFallback: 'Basic vertical slide',
            lang: 'vue',
            code: `<template>
  <origam-btn @click="show = !show">Toggle</origam-btn>
  <origam-slide-y>
    <div v-if="show" key="panel" class="my-panel">Sliding in from top</div>
  </origam-slide-y>
</template>
<script setup>
const show = ref(true)
</script>`
        },
        {
            titleKey: 'components.slide_y.examples.mode.title',
            titleFallback: 'out-in mode (accordion item)',
            lang: 'vue',
            code: `<template>
  <origam-slide-y mode="out-in">
    <div :key="activeSection">{{ sections[activeSection] }}</div>
  </origam-slide-y>
</template>`
        },
        {
            titleKey: 'components.slide_y.examples.group.title',
            titleFallback: 'Animated list (group)',
            lang: 'vue',
            code: `<template>
  <origam-slide-y :group="true">
    <div v-for="item in items" :key="item.id">{{ item.label }}</div>
  </origam-slide-y>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-transition--slide-y',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamSlideY',
        svgDesc: 'Schematic of the slide-y transition with enter and leave phases.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="40" width="260" height="120" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="170" y="93" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">enter-active</text>
  <text x="170" y="111" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">translateY(−15px) → 0</text>
  <text x="170" y="127" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">opacity: 0 → 1</text>
  <rect x="400" y="40" width="260" height="120" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="5 3" opacity="0.5"/>
  <text x="530" y="93" font-size="11" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">leave-active</text>
  <text x="530" y="111" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">0 → translateY(−15px)</text>
  <text x="530" y="127" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">opacity: 1 → 0</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="408" cy="48" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="408" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="105" font-size="22" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">→</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-slide-y&gt;</code> — enter ① slides from translateY(−15px) + opacity:0 to identity. Leave ② reverses the same transform + fades out. Duration: 0.3 s; move: 0.5 s.`,
        legend: [
            {
                num: 1,
                cls: '.origam-transition--slide-y-enter-active',
                descriptionKey: 'components.slide_y.anatomy.enter',
                descriptionFallback: 'Enter phase. Child animates from translateY(−15px) + opacity:0 to identity. Duration: 0.3 s, easing: cubic-bezier(0.4,0,0.2,1).'
            },
            {
                num: 2,
                cls: '.origam-transition--slide-y-leave-active',
                descriptionKey: 'components.slide_y.anatomy.leave',
                descriptionFallback: 'Leave phase. Child slides back to translateY(−15px) + opacity:0 over 0.3 s.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- wraps <transition> or <transition-group> via useCssTransition -->
<component :is="tag" :name="name" v-bind="transitionProps">
  <slot name="default" />
</component>

<!-- CSS (global, not scoped) -->
<!-- .origam-transition--slide-y-enter-from,
     .origam-transition--slide-y-leave-to { opacity: 0; transform: translateY(-15px); }
     .origam-transition--slide-y-enter-active,
     .origam-transition--slide-y-leave-active { transition-property: transform, opacity; transition-duration: 0.3s; } -->`,
        classes: [
            {
                cls: 'origam-transition--slide-y',
                descriptionKey: 'components.slide_y.anatomy.class_root',
                descriptionFallback: 'CSS transition class prefix applied by Vue.'
            },
            {
                cls: 'origam-transition--slide-y-enter-from',
                descriptionKey: 'components.slide_y.anatomy.class_enter_from',
                descriptionFallback: 'Starting state: opacity:0, transform: translateY(−15px).'
            },
            {
                cls: 'origam-transition--slide-y-leave-to',
                descriptionKey: 'components.slide_y.anatomy.class_leave_to',
                descriptionFallback: 'End state on leave: same as enter-from (symmetric).'
            },
            {
                cls: 'origam-transition--slide-y-enter-active',
                descriptionKey: 'components.slide_y.anatomy.class_enter_active',
                descriptionFallback: 'Active enter: transitions transform and opacity over 0.3 s.'
            },
            {
                cls: 'origam-transition--slide-y-leave-active',
                descriptionKey: 'components.slide_y.anatomy.class_leave_active',
                descriptionFallback: 'Active leave: transitions transform and opacity over 0.3 s.'
            },
            {
                cls: 'origam-transition--slide-y-move',
                descriptionKey: 'components.slide_y.anatomy.class_move',
                descriptionFallback: 'Move transition in group mode: transform only, 0.5 s.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-transition---slide-y-distance',
            defaultValue: '100%',
            descriptionKey: 'components.slide_y.css_vars.distance',
            descriptionFallback: 'Vertical translate distance token. The component hardcodes −15px in its CSS class; this token is the reference value for Style Dictionary.'
        },
        {
            name: '--origam-transition---default-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.slide_y.css_vars.duration',
            descriptionFallback: 'Default transition duration (0.3 s hardcoded in CSS class).'
        },
        {
            name: '--origam-transition---default-easing',
            defaultValue: '{motion.easing.decelerate}',
            descriptionKey: 'components.slide_y.css_vars.easing',
            descriptionFallback: 'Easing function for slide-y (decelerate: cubic-bezier(0.4,0,0.2,1)).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.slide_y.exposed.filter_props',
            descriptionFallback: 'Forwards a filtered subset of props to the underlying transition.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.slide_y.a11y.reduced_motion',
                noteFallback: 'Animation is disabled automatically when prefers-reduced-motion: reduce is detected (disabled=true via useCssTransition).'
            },
            {
                noteKey: 'components.slide_y.a11y.no_role',
                noteFallback: 'The wrapper is transparent to the accessibility tree. Only the slotted child is announced by screen readers.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/transition.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'transition.slide-y.duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.slide_y.tokens.duration',
                descriptionFallback: 'Enter/leave duration for the slide-y transition.'
            },
            {
                tokenPath: 'transition.slide-y.easing',
                value: '{motion.easing.decelerate}',
                type: 'cubicBezier',
                descriptionKey: 'components.slide_y.tokens.easing',
                descriptionFallback: 'Easing for slide-y (decelerate).'
            },
            {
                tokenPath: 'transition.slide-y.translate-distance',
                value: '100%',
                type: 'dimension',
                descriptionKey: 'components.slide_y.tokens.distance',
                descriptionFallback: 'Token reference for the slide vertical offset.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'mode',
                kind: 'select',
                labelKey: 'components.slide_y.playground.mode',
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
                labelKey: 'components.slide_y.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'group',
                kind: 'switch',
                labelKey: 'components.slide_y.playground.group',
                labelFallback: 'Group mode',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
