/**
 * /components/avatar-group — full documentation data for OrigamAvatarGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Avatar/avatar-group.interface.ts  (IAvatarGroupProps / IAvatarGroupEmits)
 *   - packages/ds/src/components/Avatar/OrigamAvatarGroup.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/avatar.json                     (CSS tokens)
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

export const AVATAR_GROUP_DOC: IComponentDoc = {
    slug: 'avatar-group',
    name: 'AvatarGroup',
    tag: 'origam-avatar-group',
    icon: 'mdi-account-group',
    category: 'Data Display',
    descriptionKey: 'components.catalog.avatar_group.description',
    descriptionFallback: 'Stacked group of Avatar components with overflow counter, expand-on-hover and expand-on-click behaviours.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-avatar--design',
    docUrl: 'http://localhost:4000/components/Avatar/OrigamAvatarGroup',
    parentSlug: 'avatar',

    family: [
        {
            slug: 'avatar',
            name: 'Avatar',
            descriptionKey: 'components.catalog.avatar.description',
            descriptionFallback: 'Circular or rounded media container for user images, icons or initials text.'
        }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'IAvatarProps[]', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.avatar_group.props.items.description',
            descriptionFallback: 'Array of avatar data objects. Each entry is forwarded as props to an inner OrigamAvatar.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '5',
            descriptionKey: 'components.avatar_group.props.max.description',
            descriptionFallback: 'Maximum number of avatars to show before collapsing into a +N overflow chip.'
        },
        {
            name: 'expandOnHover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.avatar_group.props.expand_on_hover.description',
            descriptionFallback: 'When true, hovering the group expands all hidden avatars by setting margin to 0.'
        },
        {
            name: 'expandOnClick',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.avatar_group.props.expand_on_click.description',
            descriptionFallback: 'When true, clicking the group toggles the expanded state. Collapses when clicking outside.'
        },
        {
            name: 'direction',
            type: { label: 'TDirection', slug: 'direction', kind: 'type' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.avatar_group.props.direction.description',
            descriptionFallback: 'Stacking direction. horizontal stacks left-to-right; vertical stacks top-to-bottom.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar_group.props.size.description',
            descriptionFallback: 'Size applied to every child avatar via OrigamDefaultsProvider.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar_group.props.density.description',
            descriptionFallback: 'Density forwarded to every child avatar.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar_group.props.color.description',
            descriptionFallback: 'Foreground color forwarded to every child avatar.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar_group.props.bg_color.description',
            descriptionFallback: 'Background color forwarded to every child avatar.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar_group.props.rounded.description',
            descriptionFallback: 'Border-radius forwarded to every child avatar.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.avatar_group.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation forwarded to every child avatar.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.avatar_group.props.tag.description',
            descriptionFallback: 'HTML element rendered as the group root.'
        }
    ],

    emits: [
        {
            event: 'hover',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.avatar_group.emits.hover.description',
            descriptionFallback: 'Fired when the hover state changes. Propagated from the group interaction.'
        },
        {
            event: 'active',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.avatar_group.emits.active.description',
            descriptionFallback: 'Fired when the active/click state changes (expand-on-click groups).'
        }
    ],

    slots: [
        {
            slot: 'avatar',
            slotProps: '{ item: IAvatarProps, index: number }',
            descriptionKey: 'components.avatar_group.slots.avatar.description',
            descriptionFallback: 'Override the rendering of each visible avatar. Receives the item data and its index.'
        },
        {
            slot: 'rest',
            slotProps: '{ rest: IAvatarProps[], length: number }',
            descriptionKey: 'components.avatar_group.slots.rest.description',
            descriptionFallback: 'Override the +N overflow chip. Receives the hidden items array and its length.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.avatar_group.slots.default.description',
            descriptionFallback: 'Content inside the overflow chip avatar (the +N label). Replaces the default count text.'
        }
    ],

    examples: [
        {
            titleKey: 'components.avatar_group.examples.basic.title',
            titleFallback: 'Basic group',
            lang: 'vue',
            code: `<template>
  <origam-avatar-group
    :items="[
      { image: 'https://i.pravatar.cc/40?img=1' },
      { image: 'https://i.pravatar.cc/40?img=2' },
      { image: 'https://i.pravatar.cc/40?img=3' },
      { image: 'https://i.pravatar.cc/40?img=4' },
      { image: 'https://i.pravatar.cc/40?img=5' },
      { image: 'https://i.pravatar.cc/40?img=6' }
    ]"
    :max="4"
  />
</template>`
        },
        {
            titleKey: 'components.avatar_group.examples.expand.title',
            titleFallback: 'Expand on hover',
            lang: 'vue',
            code: `<template>
  <origam-avatar-group
    :items="[
      { text: 'AB' },
      { text: 'CD' },
      { text: 'EF' },
      { text: 'GH' }
    ]"
    :max="3"
    expand-on-hover
    bg-color="primary"
  />
</template>`
        },
        {
            titleKey: 'components.avatar_group.examples.vertical.title',
            titleFallback: 'Vertical direction',
            lang: 'vue',
            code: `<template>
  <origam-avatar-group
    :items="[
      { icon: 'mdi-account' },
      { icon: 'mdi-star' },
      { icon: 'mdi-heart' }
    ]"
    direction="vertical"
    bg-color="secondary"
  />
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'default',
            props: {},
            ariaLabel: 'Avatar group default'
        },
        {
            label: 'max=3',
            props: { max: 3 },
            ariaLabel: 'Avatar group max 3'
        },
        {
            label: 'expand hover',
            props: { max: 3, expandOnHover: true },
            ariaLabel: 'Avatar group expand on hover'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-avatar-group',
        svgViewBox: '0 0 560 180',
        svgTitle: 'Anatomy of OrigamAvatarGroup',
        svgDesc: 'Schematic of the AvatarGroup component with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="560" height="180" fill="var(--origam-color__surface---sunken, #f9f5ff)" rx="4"/>
  <rect x="20" y="40" width="520" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="80" cy="90" r="28" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="136" cy="90" r="28" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="192" cy="90" r="28" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="248" cy="90" r="28" fill="var(--origam-color__action--secondary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.35))" stroke-width="1.5" stroke-dasharray="4 2"/>
  <text x="248" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">+N</text>
  <circle cx="28" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="80" cy="62" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="80" y="66.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="248" cy="62" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="248" y="66.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <line x1="38" y1="46" x2="80" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="28" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="monospace">origam-avatar-group</text>
  <line x1="80" y1="52" x2="80" y2="32" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="95" y="26" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="monospace">__item (×N)</text>
  <line x1="248" y1="52" x2="248" y2="32" stroke="var(--origam-color__action--primary---bgHover, #a855f7)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="263" y="26" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="monospace">__rest (+N chip)</text>
  <text x="280" y="162" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Avatars overlap via negative margin; __rest is always last.</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-avatar-group&gt;</code> — 3 parts: root wrapper, item avatars and overflow rest chip.',
        legend: [
            {
                num: 1,
                cls: '.origam-avatar-group',
                descriptionKey: 'components.avatar_group.anatomy.root',
                descriptionFallback: 'Root element. Renders as an inline-flex container with <code>role="group"</code>. Direction modifier class controls flex-direction.'
            },
            {
                num: 2,
                cls: '.origam-avatar-group__item',
                descriptionKey: 'components.avatar_group.anatomy.item',
                descriptionFallback: 'Each visible avatar. Receives a negative margin-inline-start (horizontal) or margin-block-start (vertical) to create the overlap stack effect.'
            },
            {
                num: 3,
                cls: '.origam-avatar-group__rest',
                descriptionKey: 'components.avatar_group.anatomy.rest',
                descriptionFallback: 'Overflow avatar showing the +N count. Visible only when items.length > max. Same overlap margin as __item.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-avatar-group origam-avatar-group--horizontal" role="group">
  <!-- #avatar slot × N (visible items) -->
  <origam-avatar class="origam-avatar-group__item" />
  <origam-avatar class="origam-avatar-group__item" />
  <origam-avatar class="origam-avatar-group__item" />

  <!-- #rest slot — shown when items.length > max -->
  <origam-avatar class="origam-avatar-group__rest">
    <!-- #default slot — renders "+N" label -->
    +2
  </origam-avatar>
</div>`,
        classes: [
            {
                cls: 'origam-avatar-group',
                descriptionKey: 'components.avatar_group.anatomy.root',
                descriptionFallback: 'Root element. inline-flex wrapper with role="group".'
            },
            {
                cls: 'origam-avatar-group__item',
                descriptionKey: 'components.avatar_group.anatomy.item',
                descriptionFallback: 'Each visible avatar with negative overlap margin.'
            },
            {
                cls: 'origam-avatar-group__rest',
                descriptionKey: 'components.avatar_group.anatomy.rest',
                descriptionFallback: 'Overflow +N chip avatar shown when items exceed max.'
            },
            {
                cls: 'origam-avatar-group--horizontal',
                descriptionKey: 'components.avatar_group.anatomy.horizontal',
                descriptionFallback: 'Stacks avatars left-to-right with negative margin-inline-start.'
            },
            {
                cls: 'origam-avatar-group--vertical',
                descriptionKey: 'components.avatar_group.anatomy.vertical',
                descriptionFallback: 'Stacks avatars top-to-bottom with negative margin-block-start.'
            },
            {
                cls: 'origam-avatar-group--expand-on-hover',
                descriptionKey: 'components.avatar_group.anatomy.expand_on_hover',
                descriptionFallback: 'Applied when expandOnHover=true. Margins animate to 0 on :hover.'
            },
            {
                cls: 'origam-avatar-group--expand-on-click',
                descriptionKey: 'components.avatar_group.anatomy.expand_on_click',
                descriptionFallback: 'Applied when expandOnClick=true. cursor:pointer; toggled by click.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-avatar-group---position',
            defaultValue: 'relative',
            descriptionKey: 'components.avatar_group.css_vars.position',
            descriptionFallback: 'CSS position of the group root.'
        },
        {
            name: '--origam-avatar-group---flex-direction',
            defaultValue: 'row',
            descriptionKey: 'components.avatar_group.css_vars.flex_direction',
            descriptionFallback: 'Flex direction. Overridden by direction modifier classes.'
        },
        {
            name: '--origam-avatar-group---density',
            defaultValue: '0px',
            descriptionKey: 'components.avatar_group.css_vars.density',
            descriptionFallback: 'Density offset. compact: -6px, comfortable: 10px. Applied to overlap margin calculation.'
        },
        {
            name: '--origam-avatar-group__item---margin-inline-start',
            defaultValue: 'calc(-18px + var(--origam-avatar-group---density, 0px))',
            descriptionKey: 'components.avatar_group.css_vars.item_margin_inline_start',
            descriptionFallback: 'Horizontal overlap margin for each avatar item (horizontal mode).'
        },
        {
            name: '--origam-avatar-group__avatar---transition-duration',
            defaultValue: '200ms',
            descriptionKey: 'components.avatar_group.css_vars.avatar_transition_duration',
            descriptionFallback: 'Transition duration for the margin animation on expand.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.avatar_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.avatar_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed group styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.avatar_group.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.avatar_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.avatar_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.avatar_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.avatar_group.a11y.key_tab',
                actionFallback: 'Moves focus through each interactive avatar within the group.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.avatar_group.a11y.key_activate',
                actionFallback: 'Activates expand-on-click behaviour when expandOnClick=true.'
            }
        ],
        notes: [
            {
                noteKey: 'components.avatar_group.a11y.role_note',
                noteFallback: 'The root element has role="group" to semantically group related avatars for screen readers.'
            },
            {
                noteKey: 'components.avatar_group.a11y.collapse_note',
                noteFallback: 'When expandOnClick=true, clicking outside the group (v-click-outside) collapses it automatically.'
            },
            {
                noteKey: 'components.avatar_group.a11y.reduced_motion_note',
                noteFallback: 'Transition on the overlap margin respects prefers-reduced-motion via the transition-property var.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/avatar.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'avatar-group.density',
                value: '0px',
                type: 'dimension',
                descriptionKey: 'components.avatar_group.tokens.density',
                descriptionFallback: 'Density offset applied to overlap margin calculation.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'max',
                kind: 'number',
                labelKey: 'components.avatar_group.playground.max',
                labelFallback: 'Max visible',
                defaultValue: 4
            },
            {
                prop: 'expandOnHover',
                kind: 'switch',
                labelKey: 'components.avatar_group.playground.expand_on_hover',
                labelFallback: 'Expand on hover',
                defaultValue: false
            },
            {
                prop: 'expandOnClick',
                kind: 'switch',
                labelKey: 'components.avatar_group.playground.expand_on_click',
                labelFallback: 'Expand on click',
                defaultValue: false
            },
            {
                prop: 'direction',
                kind: 'select',
                labelKey: 'components.avatar_group.playground.direction',
                labelFallback: 'Direction',
                defaultValue: 'horizontal',
                options: [
                    { label: 'horizontal', value: 'horizontal' },
                    { label: 'vertical', value: 'vertical' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
