/**
 * /components/contextual-menu — full documentation data for OrigamContextualMenu.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ContextualMenu/contextual-menu.interface.ts  (props)
 *   - packages/ds/src/components/ContextualMenu/OrigamContextualMenu.vue      (template, defineExpose)
 *   - packages/ds/tokens/component/contextual-menu.json                       (CSS tokens)
 *
 * OrigamContextualMenu extends IMenuProps transparently — all slots from OrigamMenu
 * are forwarded via $slots passthrough.
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

export const CONTEXTUAL_MENU_DOC: IComponentDoc = {
    slug: 'contextual-menu',
    name: 'ContextualMenu',
    tag: 'origam-contextual-menu',
    icon: 'mdi-menu',
    category: 'Navigation',
    descriptionKey: 'components.catalog.contextual_menu.description',
    descriptionFallback: 'Right-click context menu that opens at the cursor position. Wraps OrigamMenu with openOnContextMenu + target="cursor" + activator="cursor" preconfigured.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-contextualmenu--design',
    docUrl: 'http://localhost:4000/components/ContextualMenu/OrigamContextualMenu',

    family: [],

    related: [
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'components.catalog.menu.description',
            descriptionFallback: 'The underlying Menu component that ContextualMenu wraps.'
        },
        {
            slug: 'overlay',
            name: 'Overlay',
            kind: 'component',
            descriptionKey: 'components.catalog.overlay.description',
            descriptionFallback: 'Base overlay primitive used by Menu and ContextualMenu for positioning.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.contextual_menu.props.model_value.description',
            descriptionFallback: 'v-model controlling whether the context menu is open.'
        },
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.id.description',
            descriptionFallback: 'Unique id for the menu element (for ARIA associations).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.contextual_menu.props.disabled.description',
            descriptionFallback: 'Prevents the context menu from opening on right-click.'
        },
        {
            name: 'closeDelay',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '250',
            descriptionKey: 'components.contextual_menu.props.close_delay.description',
            descriptionFallback: 'Delay in ms before the menu closes after the trigger condition is no longer met.'
        },
        {
            name: 'openDelay',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.contextual_menu.props.open_delay.description',
            descriptionFallback: 'Delay in ms before the menu opens after the right-click event.'
        },
        {
            name: 'transition',
            type: { label: 'string | boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.transition.description',
            descriptionFallback: 'Named transition applied to the menu panel when opening/closing.'
        },
        {
            name: 'zIndex',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.z_index.description',
            descriptionFallback: 'CSS z-index for the menu overlay.'
        },
        {
            name: 'maxHeight',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.max_height.description',
            descriptionFallback: 'Maximum height of the menu panel. Number is interpreted as px.'
        },
        {
            name: 'maxWidth',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.max_width.description',
            descriptionFallback: 'Maximum width of the menu panel. Number is interpreted as px.'
        },
        {
            name: 'minWidth',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.min_width.description',
            descriptionFallback: 'Minimum width of the menu panel.'
        },
        {
            name: 'width',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.width.description',
            descriptionFallback: 'Width of the menu panel. Number is interpreted as px.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.color.description',
            descriptionFallback: 'Intent or custom colour for the menu surface.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.rounded.description',
            descriptionFallback: 'Border-radius token for the menu panel.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.contextual_menu.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation for the menu panel.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.contextual_menu.emits.update_model_value.description',
            descriptionFallback: 'Fired when the menu opens or closes.'
        },
        {
            event: 'contextmenu',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.contextual_menu.emits.contextmenu.description',
            descriptionFallback: 'Bubbles the native contextmenu event for parent interception.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.contextual_menu.slots.default.description',
            descriptionFallback: 'Menu item content — typically a list of OrigamListItem elements.'
        },
        {
            slot: 'activator',
            slotProps: '{ props: object, isActive: boolean }',
            descriptionKey: 'components.contextual_menu.slots.activator.description',
            descriptionFallback: 'The element that receives the right-click listener. Use when you need to define the trigger zone explicitly.'
        }
    ],

    examples: [
        {
            titleKey: 'components.contextual_menu.examples.basic.title',
            titleFallback: 'Basic right-click menu',
            lang: 'vue',
            code: `<template>
  <origam-contextual-menu>
    <origam-list>
      <origam-list-item title="Cut"   prepend-icon="mdi-content-cut" />
      <origam-list-item title="Copy"  prepend-icon="mdi-content-copy" />
      <origam-list-item title="Paste" prepend-icon="mdi-content-paste" />
    </origam-list>
    <template #activator="{ props }">
      <div v-bind="props" style="padding: 2rem; border: 1px dashed currentColor;">
        Right-click anywhere here
      </div>
    </template>
  </origam-contextual-menu>
</template>`
        },
        {
            titleKey: 'components.contextual_menu.examples.controlled.title',
            titleFallback: 'Controlled open state',
            lang: 'vue',
            code: `<template>
  <origam-contextual-menu v-model="open" @contextmenu="onContext">
    <origam-list>
      <origam-list-item title="Inspect" prepend-icon="mdi-magnify" @click="open = false"/>
    </origam-list>
    <template #activator="{ props }">
      <section v-bind="props" style="height: 200px; border: 1px solid currentColor;">
        Right-click anywhere
      </section>
    </template>
  </origam-contextual-menu>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
  function onContext(e: MouseEvent) { console.log('context at', e.clientX, e.clientY) }
</script>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { modelValue: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-contextual-menu',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamContextualMenu',
        svgDesc: 'Schematic of the ContextualMenu component with numbered regions.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #f5f5f5)" rx="4"/>
  <rect x="20" y="20" width="660" height="230" rx="4" fill="var(--origam-color__surface---raised, #fafafa)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1" stroke-dasharray="6 3"/>
  <text x="350" y="135" font-size="13" fill="var(--origam-color__text---disabled, #bbb)" text-anchor="middle" font-family="system-ui">Right-click zone (#activator)</text>
  <circle cx="36" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="200" y="160" width="220" height="120" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.12))" stroke-width="1.5" filter="url(#shadow)"/>
  <circle cx="216" cy="168" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="216" y="172.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <rect x="208" y="180" width="204" height="32" rx="4" fill="var(--origam-color__action--secondary---bg, rgba(124,58,237,0.08))"/>
  <text x="220" y="200" font-size="11" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Cut</text>
  <rect x="208" y="214" width="204" height="32" rx="4" fill="none"/>
  <text x="220" y="234" font-size="11" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Copy</text>
  <rect x="208" y="248" width="204" height="28" rx="4" fill="none"/>
  <text x="220" y="266" font-size="11" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Paste</text>
  <circle cx="216" cy="200" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="216" y="204.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="350" y="290" font-size="9" fill="var(--origam-color__text---disabled, #b0b0b0)" text-anchor="middle" font-style="italic">① = activator zone (v-bind="props"). ② = menu panel (role="menu"). ③ = menu items (#default slot).</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-contextual-menu&gt;</code>. The component wraps <code>OrigamMenu</code> with <code>openOnContextMenu</code> + <code>target="cursor"</code> pre-configured. Menu panel positions at the exact cursor coordinates of the right-click.`,
        legend: [
            {
                num: 1,
                cls: 'activator zone',
                descriptionKey: 'components.contextual_menu.anatomy.activator',
                descriptionFallback: 'The element or region that captures the <code>contextmenu</code> event. Defined via the <code>#activator</code> slot or the parent element when no activator is provided.'
            },
            {
                num: 2,
                cls: '.origam-contextual-menu (OrigamMenu root)',
                descriptionKey: 'components.contextual_menu.anatomy.menu_panel',
                descriptionFallback: 'Floating menu panel positioned at the cursor via <code>target="cursor"</code>. Background and box-shadow come from contextual-menu tokens. Position is <code>fixed</code> relative to the viewport.'
            },
            {
                num: 3,
                cls: '#default slot',
                descriptionKey: 'components.contextual_menu.anatomy.content',
                descriptionFallback: 'Menu content — typically an <code>&lt;origam-list&gt;</code> with <code>&lt;origam-list-item&gt;</code> elements. Max-width is constrained by <code>--origam-contextual-menu__content---max-width</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamContextualMenu wraps OrigamMenu with preconfigured open-on-context-menu -->
<!-- All OrigamMenu slots are forwarded transparently -->
<origam-menu
  open-on-context-menu
  target="cursor"
  activator="cursor"
>
  <!-- #default slot: your menu content -->
  <origam-list>
    <origam-list-item title="Cut"   prepend-icon="mdi-content-cut" />
    <origam-list-item title="Copy"  prepend-icon="mdi-content-copy" />
    <origam-list-item title="Paste" prepend-icon="mdi-content-paste" />
  </origam-list>

  <!-- #activator slot: the right-click zone -->
  <template #activator="{ props }">
    <div v-bind="props">Right-click zone</div>
  </template>
</origam-menu>`,
        classes: [
            { cls: 'origam-contextual-menu', descriptionKey: 'components.contextual_menu.anatomy.root', descriptionFallback: 'Root element — thin wrapper over OrigamMenu. Inherits all Menu BEM classes.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-contextual-menu---background',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.contextual_menu.css_vars.background',
            descriptionFallback: 'Background color of the menu panel.'
        },
        {
            name: '--origam-contextual-menu---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.contextual_menu.css_vars.color',
            descriptionFallback: 'Foreground color of the menu panel.'
        },
        {
            name: '--origam-contextual-menu---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.contextual_menu.css_vars.border_radius',
            descriptionFallback: 'Border-radius of the menu panel.'
        },
        {
            name: '--origam-contextual-menu---box-shadow',
            defaultValue: '{shadow.lg}',
            descriptionKey: 'components.contextual_menu.css_vars.box_shadow',
            descriptionFallback: 'Box shadow (elevation) of the menu panel.'
        },
        {
            name: '--origam-contextual-menu---z-index',
            defaultValue: '{zIndex.dropdown} → 1000',
            descriptionKey: 'components.contextual_menu.css_vars.z_index',
            descriptionFallback: 'Z-index of the menu panel. Appears above content but below modal-level surfaces.'
        },
        {
            name: '--origam-contextual-menu__content---max-width',
            defaultValue: '320px',
            descriptionKey: 'components.contextual_menu.css_vars.content_max_width',
            descriptionFallback: 'Maximum width of the menu content area.'
        },
        {
            name: '--origam-contextual-menu---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.contextual_menu.css_vars.transition_duration',
            descriptionFallback: 'Open/close transition duration.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.contextual_menu.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to the underlying OrigamMenu.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.contextual_menu.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.contextual_menu.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.contextual_menu.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.contextual_menu.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.contextual_menu.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['menu', 'menuitem'],
        keyboard: [
            {
                key: 'Escape',
                actionKey: 'components.contextual_menu.a11y.key_escape',
                actionFallback: 'Closes the context menu and returns focus to the trigger element.'
            },
            {
                key: '↑ / ↓',
                actionKey: 'components.contextual_menu.a11y.key_navigate',
                actionFallback: 'Navigate between menu items.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.contextual_menu.a11y.key_select',
                actionFallback: 'Activates the focused menu item.'
            }
        ],
        notes: [
            {
                noteKey: 'components.contextual_menu.a11y.cursor_note',
                noteFallback: 'The menu panel is positioned at the exact cursor coordinates of the right-click event via target="cursor". This matches the native browser context menu behaviour.'
            },
            {
                noteKey: 'components.contextual_menu.a11y.focus_note',
                noteFallback: 'On open, focus moves to the first enabled menu item. On close (Escape), focus returns to the element that received the right-click.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/contextual-menu.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'contextual-menu.background',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.contextual_menu.tokens.background',
                descriptionFallback: 'Menu panel background.'
            },
            {
                tokenPath: 'contextual-menu.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.contextual_menu.tokens.border_radius',
                descriptionFallback: 'Menu panel border-radius.'
            },
            {
                tokenPath: 'contextual-menu.box-shadow',
                value: '{shadow.lg}',
                type: 'shadow',
                descriptionKey: 'components.contextual_menu.tokens.box_shadow',
                descriptionFallback: 'Menu panel elevation shadow.'
            },
            {
                tokenPath: 'contextual-menu.z-index',
                value: '{zIndex.dropdown}',
                type: 'number',
                descriptionKey: 'components.contextual_menu.tokens.z_index',
                descriptionFallback: 'Stack order of the menu panel (= 1000).'
            },
            {
                tokenPath: 'contextual-menu.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.contextual_menu.tokens.transition_duration',
                descriptionFallback: 'Open/close animation duration.'
            },
            {
                tokenPath: 'contextual-menu.content.max-width',
                value: '320px',
                type: 'dimension',
                descriptionKey: 'components.contextual_menu.tokens.content_max_width',
                descriptionFallback: 'Maximum width of the content area.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'switch',
                labelKey: 'components.contextual_menu.playground.model_value',
                labelFallback: 'Open',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.contextual_menu.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.contextual_menu.playground.rounded',
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
                labelKey: 'components.contextual_menu.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'none', value: 'none' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
