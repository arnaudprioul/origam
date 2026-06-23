/**
 * /components/menu — full documentation data for OrigamMenu.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Menu/menu.interface.ts  (props)
 *   - packages/ds/src/components/Menu/OrigamMenu.vue     (template BEM, slots, defineExpose)
 *   - packages/ds/tokens/component/menu.json             (CSS tokens)
 *
 * NOTE: OrigamMenu extends IOverlayProps + IListProps + IListItemProps.
 * Only the menu-specific props are listed here; all overlay + list props
 * are inherited and apply via pass-through.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const MENU_DOC: IComponentDoc = {
    slug: 'menu',
    name: 'Menu',
    tag: 'origam-menu',
    icon: 'mdi-menu',
    category: 'Overlay',
    descriptionKey: 'components.catalog.menu.description',
    descriptionFallback: 'Floating contextual menu anchored to an activator element. Supports nested sub-menus, keyboard navigation, items array shorthand, and full slot customisation.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-menu--design',
    docUrl: 'http://localhost:4000/components/Menu/OrigamMenu',

    family: [],

    related: [
        {
            slug: 'contextual-menu',
            name: 'ContextualMenu',
            kind: 'component',
            descriptionKey: 'components.catalog.contextual_menu.description',
            descriptionFallback: 'Right-click contextual menu variant.'
        },
        {
            slug: 'list',
            name: 'List',
            kind: 'component',
            descriptionKey: 'components.catalog.list.description',
            descriptionFallback: 'OrigamList is used inside the default slot of the Menu to render items.'
        },
        {
            slug: 'overlay',
            name: 'Overlay',
            kind: 'component',
            descriptionKey: 'components.catalog.overlay.description',
            descriptionFallback: 'OrigamMenu wraps OrigamOverlay for its positioning and focus-trap logic.'
        }
    ],

    props: [
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.id.description',
            descriptionFallback: 'HTML id applied to the overlay root and referenced by aria-owns on the activator.'
        },
        // ── IOverlayProps (selected subset) ────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.menu.props.model_value.description',
            descriptionFallback: 'Controls the open/closed state. Use v-model to sync with parent.'
        },
        {
            name: 'activator',
            type: { label: 'string | Element | ComponentPublicInstance', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.activator.description',
            descriptionFallback: 'The element or selector that triggers the menu. Can also be set via the #activator slot.'
        },
        {
            name: 'openOnClick',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.menu.props.open_on_click.description',
            descriptionFallback: 'Opens the menu when the activator is clicked.'
        },
        {
            name: 'openOnContextMenu',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.menu.props.open_on_context_menu.description',
            descriptionFallback: 'Opens the menu on right-click (contextmenu event) instead of regular click.'
        },
        {
            name: 'openOnHover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.menu.props.open_on_hover.description',
            descriptionFallback: 'Opens the menu when hovering the activator element.'
        },
        {
            name: 'closeOnContentClick',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.menu.props.close_on_content_click.description',
            descriptionFallback: 'Closes the menu when the user clicks inside its content area.'
        },
        {
            name: 'closeOnBack',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.menu.props.close_on_back.description',
            descriptionFallback: 'Closes the menu when the user presses Escape or navigates back.'
        },
        {
            name: 'location',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'bottom'",
            descriptionKey: 'components.menu.props.location.description',
            descriptionFallback: 'Preferred position of the menu relative to the activator (top, bottom, left, right, start, end, and combinations).'
        },
        {
            name: 'offset',
            type: { label: 'number | [number, number]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.offset.description',
            descriptionFallback: 'Pixel offset from the activator. Pass [crossAxis, mainAxis] for two-axis control.'
        },
        {
            name: 'minWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.min_width.description',
            descriptionFallback: 'Minimum width of the menu surface. Defaults to the activator width when unset.'
        },
        {
            name: 'maxWidth',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.max_width.description',
            descriptionFallback: 'Maximum width of the menu surface.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.max_height.description',
            descriptionFallback: 'Maximum height before the menu becomes scrollable. Default: calc(100vh - 32px) from the token.'
        },
        {
            name: 'eager',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.menu.props.eager.description',
            descriptionFallback: 'Renders the menu content even when closed (useful for pre-fetching).'
        },
        {
            name: 'transition',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: "'scale-transition'",
            descriptionKey: 'components.menu.props.transition.description',
            descriptionFallback: 'Enter/leave transition. Pass false to disable.'
        },
        // ── IListProps (selected shorthand) ───────────────────────────
        {
            name: 'items',
            type: { label: 'Array<ListItem>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.menu.props.items.description',
            descriptionFallback: 'Shorthand array of list-item props. Each entry renders an OrigamListItem. Nested items create sub-menus automatically.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.title.description',
            descriptionFallback: 'Optional subheader title rendered above the items list.'
        },
        // ── IColorProps / IBorderProps (from IOverlayProps chain) ─────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.color.description',
            descriptionFallback: 'Text color of the menu surface.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the menu panel.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.menu.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the menu panel. Default from token: {shadow.lg}.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.menu.emits.update_model_value.description',
            descriptionFallback: 'Fired when the menu opens or closes. Used for v-model binding.'
        },
        {
            event: 'contextmenu',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.menu.emits.contextmenu.description',
            descriptionFallback: 'Bubbles the native contextmenu event from the activator, forwarded for parents that want to intercept right-click.'
        }
    ],

    slots: [
        {
            slot: 'activator',
            slotProps: '{ props }',
            descriptionKey: 'components.menu.slots.activator.description',
            descriptionFallback: 'The element that triggers the menu. Bind the provided props to make the activator keyboard and ARIA-aware.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.menu.slots.default.description',
            descriptionFallback: 'Full replacement of the menu content. When provided, the items array and title are ignored.'
        }
    ],

    examples: [
        {
            titleKey: 'components.menu.examples.basic.title',
            titleFallback: 'Basic menu',
            lang: 'vue',
            code: `<template>
  <origam-menu
    :items="[
      { title: 'Edit', prependIcon: 'mdi-pencil' },
      { title: 'Duplicate', prependIcon: 'mdi-content-copy' },
      { title: 'Delete', prependIcon: 'mdi-delete', color: 'danger' }
    ]"
  >
    <template #activator="{ props }">
      <origam-btn v-bind="props" text="Actions" append-icon="mdi-chevron-down" />
    </template>
  </origam-menu>
</template>`
        },
        {
            titleKey: 'components.menu.examples.nested.title',
            titleFallback: 'Nested sub-menu',
            lang: 'vue',
            code: `<template>
  <origam-menu
    :items="[
      { title: 'File', children: [
        { title: 'New', prependIcon: 'mdi-file-plus' },
        { title: 'Open', prependIcon: 'mdi-folder-open' }
      ]},
      { title: 'Settings', prependIcon: 'mdi-cog' }
    ]"
  >
    <template #activator="{ props }">
      <origam-btn v-bind="props" text="Menu" />
    </template>
  </origam-menu>
</template>`
        },
        {
            titleKey: 'components.menu.examples.custom.title',
            titleFallback: 'Custom slot content',
            lang: 'vue',
            code: `<template>
  <origam-menu>
    <template #activator="{ props }">
      <origam-btn v-bind="props" icon="mdi-dots-vertical" aria-label="More options" />
    </template>

    <origam-list>
      <origam-list-item
        v-for="action in actions"
        :key="action.value"
        :title="action.label"
        :prepend-icon="action.icon"
        @click="action.handler"
      />
    </origam-list>
  </origam-menu>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-menu',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamMenu',
        svgDesc: 'Schematic of the Menu component with 5 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="50" y="20" width="120" height="36" rx="4" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.9"/>
  <text x="110" y="42" font-size="10" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace">Activator</text>
  <rect x="50" y="64" width="280" height="180" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1.5"/>
  <rect x="60" y="74" width="260" height="26" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="190" y="91" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-menu__title (subheader)</text>
  <rect x="60" y="106" width="260" height="36" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="190" y="128" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-menu__item (list-item)</text>
  <rect x="60" y="148" width="260" height="36" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="190" y="170" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-menu__item (hover)</text>
  <rect x="60" y="190" width="260" height="36" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="190" y="212" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-menu__item</text>
  <circle cx="46" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="46" y="28" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="46" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="46" y="72" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="46" cy="110" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="46" y="114" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="46" cy="152" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="46" y="156" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="46" cy="194" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="46" y="198" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-menu&gt;</code> — 5 parts: activator (slot), content panel, optional title subheader, and list items (rendered from the items array or default slot).',
        legend: [
            {
                num: 1,
                cls: '#activator slot',
                descriptionKey: 'components.menu.anatomy.activator',
                descriptionFallback: 'The element that triggers the menu open/close. Receives an event-binding props object from the overlay.'
            },
            {
                num: 2,
                cls: '.origam-menu__list',
                descriptionKey: 'components.menu.anatomy.list',
                descriptionFallback: 'OrigamList container rendered inside the overlay panel (default slot fallback).'
            },
            {
                num: 3,
                cls: '.origam-menu__title',
                descriptionKey: 'components.menu.anatomy.title',
                descriptionFallback: 'Optional OrigamListSubheader injected when the title prop is set.'
            },
            {
                num: 4,
                cls: '.origam-menu__items',
                descriptionKey: 'components.menu.anatomy.items',
                descriptionFallback: 'OrigamListGroup container iterating over the items array.'
            },
            {
                num: 5,
                cls: '.origam-menu__item',
                descriptionKey: 'components.menu.anatomy.item',
                descriptionFallback: 'Each OrigamListItem rendered from the items array. When an item has children, a nested OrigamMenu is rendered instead.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-overlay role="menu" v-model="isActive">
  <template #activator="{ props }">
    <slot name="activator" v-bind="{ props }"/>
  </template>

  <template #default>
    <div class="origam-menu__content">
      <slot name="default">
        <origam-list class="origam-menu__list">
          <origam-list-subheader v-if="title" class="origam-menu__title">
            {{ title }}
          </origam-list-subheader>
          <origam-list-group class="origam-menu__items">
            <origam-list-item
              v-for="item in items"
              class="origam-menu__item"
              v-bind="item"
            />
          </origam-list-group>
        </origam-list>
      </slot>
    </div>
  </template>
</origam-overlay>`,
        classes: [
            {
                cls: 'origam-menu',
                descriptionKey: 'components.menu.anatomy.root',
                descriptionFallback: 'Root class applied to the overlay element (role="menu").'
            },
            {
                cls: 'origam-menu__list',
                descriptionKey: 'components.menu.anatomy.list',
                descriptionFallback: 'OrigamList rendered as the default items container.'
            },
            {
                cls: 'origam-menu__title',
                descriptionKey: 'components.menu.anatomy.title',
                descriptionFallback: 'OrigamListSubheader rendered when title prop is set.'
            },
            {
                cls: 'origam-menu__items',
                descriptionKey: 'components.menu.anatomy.items',
                descriptionFallback: 'OrigamListGroup iterating over the items array.'
            },
            {
                cls: 'origam-menu__item',
                descriptionKey: 'components.menu.anatomy.item',
                descriptionFallback: 'Each OrigamListItem rendered per item in the items array.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-menu---background',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.menu.css_vars.background',
            descriptionFallback: 'Menu panel background color.'
        },
        {
            name: '--origam-menu---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.menu.css_vars.color',
            descriptionFallback: 'Menu text color.'
        },
        {
            name: '--origam-menu---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.menu.css_vars.border_radius',
            descriptionFallback: 'Border-radius of the menu panel.'
        },
        {
            name: '--origam-menu---box-shadow',
            defaultValue: '{shadow.lg}',
            descriptionKey: 'components.menu.css_vars.box_shadow',
            descriptionFallback: 'Drop shadow applied to the menu panel.'
        },
        {
            name: '--origam-menu---max-height',
            defaultValue: 'calc(100vh - 32px)',
            descriptionKey: 'components.menu.css_vars.max_height',
            descriptionFallback: 'Maximum height before the menu becomes scrollable.'
        },
        {
            name: '--origam-menu---z-index',
            defaultValue: '{zIndex.dropdown}',
            descriptionKey: 'components.menu.css_vars.z_index',
            descriptionFallback: 'Z-index of the menu overlay panel.'
        },
        {
            name: '--origam-menu---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.menu.css_vars.transition_duration',
            descriptionFallback: 'Enter/leave transition duration.'
        },
        {
            name: '--origam-menu__content---padding',
            defaultValue: '{space.1}',
            descriptionKey: 'components.menu.css_vars.content_padding',
            descriptionFallback: 'Inner padding of the menu content area.'
        },
        {
            name: '--origam-menu__content---max-width',
            defaultValue: '320px',
            descriptionKey: 'components.menu.css_vars.content_max_width',
            descriptionFallback: 'Maximum width of the menu content area.'
        }
    ] satisfies IComponentCssVar[],

    a11y: {
        roles: ['menu'],
        keyboard: [
            {
                key: 'Escape',
                actionKey: 'components.menu.a11y.key_close',
                actionFallback: 'Closes the menu and returns focus to the activator.'
            },
            {
                key: 'ArrowDown',
                actionKey: 'components.menu.a11y.key_next_item',
                actionFallback: 'Moves focus to the next menu item.'
            },
            {
                key: 'ArrowUp',
                actionKey: 'components.menu.a11y.key_prev_item',
                actionFallback: 'Moves focus to the previous menu item.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.menu.a11y.key_select',
                actionFallback: 'Activates the focused menu item.'
            },
            {
                key: 'Tab',
                actionKey: 'components.menu.a11y.key_tab',
                actionFallback: 'Closes the menu and moves focus to the next focusable element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.menu.a11y.activator_note',
                noteFallback: 'The activator element receives aria-haspopup="menu" and aria-expanded="true/false" bound by the overlay. The menu id is referenced via aria-owns.'
            },
            {
                noteKey: 'components.menu.a11y.role_note',
                noteFallback: 'The menu panel has role="menu". Each item should carry role="menuitem" (provided automatically by OrigamListItem when inside a menu).'
            },
            {
                noteKey: 'components.menu.a11y.focus_note',
                noteFallback: 'Focus is trapped inside the menu when open. On close, focus returns to the activator element.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/menu.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'menu.background',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.menu.tokens.background',
                descriptionFallback: 'Menu panel background — inherits the raised surface token.'
            },
            {
                tokenPath: 'menu.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.menu.tokens.border_radius',
                descriptionFallback: 'Border radius of the menu panel.'
            },
            {
                tokenPath: 'menu.box-shadow',
                value: '{shadow.lg}',
                type: 'shadow',
                descriptionKey: 'components.menu.tokens.box_shadow',
                descriptionFallback: 'Drop shadow applied to the floating panel.'
            },
            {
                tokenPath: 'menu.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.menu.tokens.transition_duration',
                descriptionFallback: 'Enter/leave animation duration.'
            },
            {
                tokenPath: 'menu.z-index',
                value: '{zIndex.dropdown}',
                type: 'number',
                descriptionKey: 'components.menu.tokens.z_index',
                descriptionFallback: 'Stacking order of the floating menu panel.'
            },
            {
                tokenPath: 'menu.content.max-width',
                value: '320px',
                type: 'dimension',
                descriptionKey: 'components.menu.tokens.content_max_width',
                descriptionFallback: 'Maximum width of the scrollable content inner area.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'location',
                kind: 'select',
                labelKey: 'components.menu.playground.location',
                labelFallback: 'Location',
                defaultValue: 'bottom',
                options: [
                    { label: 'bottom', value: 'bottom' },
                    { label: 'top', value: 'top' },
                    { label: 'left', value: 'left' },
                    { label: 'right', value: 'right' },
                    { label: 'bottom start', value: 'bottom start' },
                    { label: 'bottom end', value: 'bottom end' }
                ]
            },
            {
                prop: 'closeOnContentClick',
                kind: 'switch',
                labelKey: 'components.menu.playground.close_on_content_click',
                labelFallback: 'Close on content click',
                defaultValue: true
            },
            {
                prop: 'openOnHover',
                kind: 'switch',
                labelKey: 'components.menu.playground.open_on_hover',
                labelFallback: 'Open on hover',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.menu.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' }
                ]
            },
            {
                prop: 'elevation',
                kind: 'select',
                labelKey: 'components.menu.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: '0', value: '0' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
