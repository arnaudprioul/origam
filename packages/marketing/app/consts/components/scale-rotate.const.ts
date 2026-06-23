/**
 * /components/scale-rotate — full documentation data for OrigamScaleRotate.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Transition/transition.interface.ts  (ITransitionProps)
 *   - packages/ds/src/components/Transition/OrigamScaleRotate.vue    (template, style)
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

export const SCALE_ROTATE_DOC: IComponentDoc = {
    slug: 'scale-rotate',
    name: 'ScaleRotate',
    tag: 'origam-scale-rotate',
    icon: 'mdi-rotate-3d-variant',
    category: 'Utility',
    descriptionKey: 'components.catalog.transition_scale_rotate.description',
    descriptionFallback: 'CSS-driven Vue transition that combines scale(0) + rotate(−45deg) + opacity on enter, with a symmetric leave. Sub-component of the Transition family.',
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
            slug: 'slide-y',
            name: 'SlideY',
            descriptionKey: 'components.catalog.transition_slide_y.description',
            descriptionFallback: 'Vertical slide + fade transition.'
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
        }
    ],

    props: [
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--scale-rotate'",
            descriptionKey: 'components.scale_rotate.props.name.description',
            descriptionFallback: 'Vue transition name class prefix. Defaults to origam-transition--scale-rotate.'
        },
        {
            name: 'mode',
            type: { label: 'TTransitionMode', slug: 'transition-mode', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.scale_rotate.props.mode.description',
            descriptionFallback: 'Vue transition mode: "in-out" or "out-in".'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.scale_rotate.props.disabled.description',
            descriptionFallback: 'Disables the animation. Content appears/disappears instantly.'
        },
        {
            name: 'group',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.scale_rotate.props.group.description',
            descriptionFallback: 'When true, renders a <transition-group> to enable list-move animation.'
        },
        {
            name: 'hideOnLeave',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.scale_rotate.props.hide_on_leave.description',
            descriptionFallback: 'Sets the leaving element to visibility: hidden immediately.'
        },
        {
            name: 'leaveAbsolute',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.scale_rotate.props.leave_absolute.description',
            descriptionFallback: 'Positions the leaving element absolutely during the leave phase to prevent layout jank.'
        },
        {
            name: 'origin',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.scale_rotate.props.origin.description',
            descriptionFallback: 'CSS transform-origin applied during the transition.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.scale_rotate.slots.default.description',
            descriptionFallback: 'A single child element (or multiple when group=true) that receives the scale-rotate transition.'
        }
    ],

    examples: [
        {
            titleKey: 'components.scale_rotate.examples.basic.title',
            titleFallback: 'Basic scale-rotate transition',
            lang: 'vue',
            code: `<template>
  <origam-btn @click="show = !show">Toggle</origam-btn>
  <origam-scale-rotate>
    <origam-icon v-if="show" key="icon" icon="mdi-check-circle" />
  </origam-scale-rotate>
</template>
<script setup>
const show = ref(true)
</script>`
        },
        {
            titleKey: 'components.scale_rotate.examples.mode.title',
            titleFallback: 'out-in mode',
            lang: 'vue',
            code: `<template>
  <origam-scale-rotate mode="out-in">
    <origam-icon :key="step" :icon="icons[step]" />
  </origam-scale-rotate>
</template>`
        },
        {
            titleKey: 'components.scale_rotate.examples.group.title',
            titleFallback: 'List animation (group)',
            lang: 'vue',
            code: `<template>
  <origam-scale-rotate :group="true">
    <origam-chip v-for="tag in tags" :key="tag" :text="tag" />
  </origam-scale-rotate>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-transition--scale-rotate',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamScaleRotate',
        svgDesc: 'Schematic of the scale-rotate transition with entering and leaving elements.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="40" y="40" width="260" height="100" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="170" y="86" font-size="11" fill="var(--origam-color__text---primary, #3b1c6e)" text-anchor="middle" font-family="'JetBrains Mono',monospace">enter-active</text>
  <text x="170" y="102" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">scale(0) rotate(−45deg) → full</text>
  <rect x="400" y="40" width="260" height="100" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="5 3" opacity="0.5"/>
  <text x="530" y="86" font-size="11" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">leave-active</text>
  <text x="530" y="102" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">full → opacity 0</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="408" cy="48" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="408" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="95" font-size="22" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle">→</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-scale-rotate&gt;</code> — wraps one child element. The enter ① animates from scale(0) + rotate(−45deg) + opacity:0 to full. The leave ② transitions opacity out over 0.3 s.`,
        legend: [
            {
                num: 1,
                cls: '.origam-transition--scale-rotate-enter-active',
                descriptionKey: 'components.scale_rotate.anatomy.enter',
                descriptionFallback: 'Enter phase. Child animates from scale(0) rotate(−45deg) opacity:0 to identity. Duration: 0.3 s, easing: cubic-bezier(0.4,0,0.2,1).'
            },
            {
                num: 2,
                cls: '.origam-transition--scale-rotate-leave-active',
                descriptionKey: 'components.scale_rotate.anatomy.leave',
                descriptionFallback: 'Leave phase. Child transitions opacity and transform out over 0.3 s.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- wraps <transition> or <transition-group> via useCssTransition -->
<component :is="tag" :name="name" v-bind="transitionProps">
  <slot name="default" />
</component>

<!-- CSS keyframes (global, not scoped) -->
<!-- .origam-transition--scale-rotate-enter-from { opacity: 0; transform: scale(0) rotate(-45deg); }
     .origam-transition--scale-rotate-enter-active,
     .origam-transition--scale-rotate-leave-active { transition-property: transform, opacity; transition-duration: 0.3s; } -->`,
        classes: [
            {
                cls: 'origam-transition--scale-rotate',
                descriptionKey: 'components.scale_rotate.anatomy.class_root',
                descriptionFallback: 'CSS transition class prefix applied by Vue.'
            },
            {
                cls: 'origam-transition--scale-rotate-enter-from',
                descriptionKey: 'components.scale_rotate.anatomy.class_enter_from',
                descriptionFallback: 'Starting state: opacity:0, transform: scale(0) rotate(−45deg).'
            },
            {
                cls: 'origam-transition--scale-rotate-enter-active',
                descriptionKey: 'components.scale_rotate.anatomy.class_enter_active',
                descriptionFallback: 'Transition active state for enter (0.3 s, standard easing).'
            },
            {
                cls: 'origam-transition--scale-rotate-leave-active',
                descriptionKey: 'components.scale_rotate.anatomy.class_leave_active',
                descriptionFallback: 'Transition active state for leave (0.3 s).'
            },
            {
                cls: 'origam-transition--scale-rotate-move',
                descriptionKey: 'components.scale_rotate.anatomy.class_move',
                descriptionFallback: 'Move transition applied in group mode (0.5 s, transform-only).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-transition---default-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.scale_rotate.css_vars.duration',
            descriptionFallback: 'Default transition duration for the scale-rotate animation (0.3 s hardcoded in the CSS class, token reference for override).'
        },
        {
            name: '--origam-transition---default-easing',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.scale_rotate.css_vars.easing',
            descriptionFallback: 'Easing function: cubic-bezier(0.4, 0, 0.2, 1).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.scale_rotate.exposed.filter_props',
            descriptionFallback: 'Forwards a filtered subset of props to the underlying transition.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.scale_rotate.a11y.reduced_motion',
                noteFallback: 'The transition is disabled automatically when prefers-reduced-motion: reduce is detected (disabled prop becomes true via useCssTransition).'
            },
            {
                noteKey: 'components.scale_rotate.a11y.no_role',
                noteFallback: 'The wrapper is transparent to the accessibility tree. Only the slotted child is announced by screen readers.'
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
                descriptionKey: 'components.scale_rotate.tokens.duration',
                descriptionFallback: 'Default enter/leave duration shared by all transition sub-components.'
            },
            {
                tokenPath: 'transition.default.easing',
                value: '{motion.easing.standard}',
                type: 'cubicBezier',
                descriptionKey: 'components.scale_rotate.tokens.easing',
                descriptionFallback: 'Default easing function (cubic-bezier).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'mode',
                kind: 'select',
                labelKey: 'components.scale_rotate.playground.mode',
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
                labelKey: 'components.scale_rotate.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'group',
                kind: 'switch',
                labelKey: 'components.scale_rotate.playground.group',
                labelFallback: 'Group mode',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
