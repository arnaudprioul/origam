/**
 * /components/drawer — full documentation data for OrigamDrawer.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Drawer/drawer.interface.ts  (props)
 *   - packages/ds/src/components/Drawer/OrigamDrawer.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/drawer.json               (CSS tokens)
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

export const DRAWER_DOC: IComponentDoc = {
    slug: 'drawer',
    name: 'Drawer',
    tag: 'origam-drawer',
    icon: 'mdi-page-layout-sidebar-left',
    category: 'Layout',
    descriptionKey: 'components.catalog.drawer.description',
    descriptionFallback: 'Side-panel navigation drawer that integrates with the Origam layout grid. Supports rail/mini mode, expand-on-hover, temporary/persistent variants, touch drag, and four docking edges (left, right, top, bottom).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-drawer--design',
    docUrl: 'http://localhost:4000/components/Drawer/OrigamDrawer',

    family: [],

    related: [
        {
            slug: 'layout',
            name: 'Layout',
            kind: 'component',
            descriptionKey: 'components.catalog.layout.description',
            descriptionFallback: 'Layout container that the Drawer registers with to reserve side space.'
        },
        {
            slug: 'app-bar',
            name: 'AppBar',
            kind: 'component',
            descriptionKey: 'components.catalog.app_bar.description',
            descriptionFallback: 'Top bar that can be clipped by or clip the Drawer depending on DOM order and the clipped prop.'
        },
        {
            slug: 'dialog',
            name: 'Dialog',
            kind: 'component',
            descriptionKey: 'components.catalog.dialog.description',
            descriptionFallback: 'Modal overlay alternative when the panel should be centred rather than edge-docked.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.drawer.props.model_value.description',
            descriptionFallback: 'v-model binding for the open/close state. Defaults to true (drawer shown).'
        },
        {
            name: 'permanent',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.drawer.props.permanent.description',
            descriptionFallback: 'When true the drawer is always visible and cannot be dismissed. null = automatic (browser-width driven via resize watcher).'
        },
        {
            name: 'temporary',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.temporary.description',
            descriptionFallback: 'Renders the drawer as a temporary overlay with a scrim. Clicking the scrim closes it.'
        },
        {
            name: 'rail',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.drawer.props.rail.description',
            descriptionFallback: 'Collapses the drawer to rail (icon-only) width defined by railWidth. null means uncollapsed.'
        },
        {
            name: 'railWidth',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '56',
            descriptionKey: 'components.drawer.props.rail_width.description',
            descriptionFallback: 'Width in pixels when rail=true.'
        },
        {
            name: 'width',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: '256',
            descriptionKey: 'components.drawer.props.width.description',
            descriptionFallback: 'Full expanded width of the drawer in pixels.'
        },
        {
            name: 'expandOnHover',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.expand_on_hover.description',
            descriptionFallback: 'When combined with rail=true, expands the drawer to its full width on mouse hover and emits update:rail=false. Returns to rail on mouse leave.'
        },
        {
            name: 'floating',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.floating.description',
            descriptionFallback: 'Removes the border on the open edge of the drawer.'
        },
        {
            name: 'sticky',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.sticky.description',
            descriptionFallback: 'Switches the drawer to position: sticky instead of absolute, so it scrolls with the page and sticks at the top when reaching its boundary.'
        },
        {
            name: 'push',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.drawer.props.push.description',
            descriptionFallback: 'Whether the drawer reserves space in the layout grid, pushing adjacent toolbar/main/footer. null = derived from permanent (permanent drawers push, temporary drawers overlay).'
        },
        {
            name: 'clipped',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.drawer.props.clipped.description',
            descriptionFallback: 'When true the drawer slots below the AppBar instead of extending full height. null = resolved from HTML declaration order.'
        },
        {
            name: 'touchless',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.touchless.description',
            descriptionFallback: 'Disables touch-drag to open/close the drawer.'
        },
        {
            name: 'disableResizeWatcher',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.disable_resize_watcher.description',
            descriptionFallback: 'Prevents the drawer from auto-toggling between permanent and temporary based on the viewport width.'
        },
        {
            name: 'disableRouteWatcher',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.drawer.props.disable_route_watcher.description',
            descriptionFallback: 'Prevents the temporary drawer from automatically closing on Vue Router navigation.'
        },
        // ── ILayoutItemProps (selected) ────────────────────────────────
        {
            name: 'location',
            type: { label: 'TInline', slug: '', kind: 'primitive' },
            defaultValue: "'left'",
            descriptionKey: 'components.drawer.props.location.description',
            descriptionFallback: 'Docking edge. Accepts "left", "right", "top", "bottom". Controls slide direction and border placement.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'nav'",
            descriptionKey: 'components.drawer.props.tag.description',
            descriptionFallback: 'HTML element at the root. Defaults to nav for semantic navigation drawers.'
        },
        // ── ITransitionComponentProps ──────────────────────────────────
        {
            name: 'transition',
            type: { label: 'string | TTransitionProps', slug: '', kind: 'primitive' },
            defaultValue: "'origam-transition--drawer'",
            descriptionKey: 'components.drawer.props.transition.description',
            descriptionFallback: 'Enter/leave transition name or config. Defaults to origam-transition--drawer (full-width slide). Pass false to disable.'
        },
        // ── IBgColorProps ──────────────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.drawer.props.bg_color.description',
            descriptionFallback: 'Background color override for the drawer surface.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.drawer.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token. Overrides the default (none for permanent, lg for temporary).'
        },
        // ── IScrimProps ────────────────────────────────────────────────
        {
            name: 'scrim',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.drawer.props.scrim.description',
            descriptionFallback: 'Shows a scrim overlay when the drawer is open in temporary mode. Pass a color string to customise the scrim color.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.drawer.emits.update_model_value.description',
            descriptionFallback: 'Fired when the open/close state changes (e.g. scrim click, route change, resize watcher).'
        },
        {
            event: 'update:rail',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.drawer.emits.update_rail.description',
            descriptionFallback: 'Fired by expand-on-hover: true when hovered (expand), false when the cursor leaves (collapse back to rail).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.drawer.slots.default.description',
            descriptionFallback: 'Main scrollable content area of the drawer (navigation list, links, etc.).'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.drawer.slots.prepend.description',
            descriptionFallback: 'Fixed content above the scrollable area. Typically the app logo or user avatar.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.drawer.slots.append.description',
            descriptionFallback: 'Fixed content below the scrollable area. Typically settings or logout links.'
        },
        {
            slot: 'wrapper',
            slotProps: '—',
            descriptionKey: 'components.drawer.slots.wrapper.description',
            descriptionFallback: 'Replaces the entire inner layout (prepend + content + append wrapper). Use for fully custom drawer layouts.'
        }
    ],

    examples: [
        {
            titleKey: 'components.drawer.examples.permanent.title',
            titleFallback: 'Permanent navigation drawer',
            lang: 'vue',
            code: `<template>
  <origam-layout>
    <origam-drawer permanent>
      <origam-list>
        <origam-list-item title="Dashboard" prepend-icon="mdi-home" />
        <origam-list-item title="Projects" prepend-icon="mdi-folder" />
        <origam-list-item title="Settings" prepend-icon="mdi-cog" />
      </origam-list>
    </origam-drawer>
    <origam-main>
      <!-- page content -->
    </origam-main>
  </origam-layout>
</template>`
        },
        {
            titleKey: 'components.drawer.examples.rail.title',
            titleFallback: 'Rail mode with expand-on-hover',
            lang: 'vue',
            code: `<template>
  <origam-drawer
    v-model:rail="isRail"
    :rail="isRail"
    expand-on-hover
    permanent
  >
    <template #prepend>
      <origam-btn icon="mdi-menu" @click="isRail = !isRail" />
    </template>
    <origam-list>
      <origam-list-item title="Home" prepend-icon="mdi-home" />
    </origam-list>
  </origam-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const isRail = ref(true)
</script>`
        },
        {
            titleKey: 'components.drawer.examples.temporary.title',
            titleFallback: 'Temporary (mobile) drawer',
            lang: 'vue',
            code: `<template>
  <origam-btn prepend-icon="mdi-menu" text="Open" @click="open = true" />
  <origam-drawer v-model="open" temporary location="left">
    <origam-list>
      <origam-list-item title="Home" prepend-icon="mdi-home" />
      <origam-list-item title="About" prepend-icon="mdi-information" />
    </origam-list>
  </origam-drawer>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>`
        }
    ],

    previewVariants: [
        {
            label: 'left (default)',
            props: { location: 'left', permanent: true, width: 200 },
            slotContent: 'Navigation'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-drawer',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamDrawer',
        svgDesc: 'Schematic of the Drawer component showing the three-zone layout: prepend, content, append.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- drawer panel -->
  <rect x="30" y="20" width="200" height="260" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- prepend zone -->
  <rect x="30" y="20" width="200" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.07))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="130" y="54" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#prepend</text>
  <!-- content zone -->
  <rect x="30" y="80" width="200" height="140" rx="0" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="130" y="155" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default (scrollable)</text>
  <!-- append zone -->
  <rect x="30" y="220" width="200" height="60" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="130" y="254" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#append</text>
  <!-- layout reservation hint -->
  <rect x="240" y="20" width="440" height="260" rx="4" fill="rgba(0,0,0,0.02)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1" stroke-dasharray="6 4"/>
  <text x="460" y="155" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-style="italic">layout main content (offset by drawer width)</text>
  <!-- numbering -->
  <circle cx="38" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="38" cy="88" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="92.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="38" cy="228" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="38" y="232.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="38" cy="148" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="38" y="152.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <!-- scrim overlay hint -->
  <rect x="240" y="20" width="440" height="260" rx="4" fill="rgba(0,0,0,0.06)" stroke="rgba(0,0,0,0.1)" stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>
  <text x="460" y="40" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">scrim (temporary mode only)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-drawer&gt;</code> — 4 parts: ① root drawer panel (teleported into the layout grid), ② prepend zone (fixed header), ③ append zone (fixed footer), ④ scrollable content (#default slot).`,
        legend: [
            {
                num: 1,
                cls: '.origam-drawer',
                descriptionKey: 'components.drawer.anatomy.root',
                descriptionFallback: 'Root nav element. Teleported into <code>#layout-id .origam-layout__wrapper</code> so it participates in the layout grid. Renders inline when no OrigamLayout ancestor exists.'
            },
            {
                num: 2,
                cls: '.origam-drawer__prepend',
                descriptionKey: 'components.drawer.anatomy.prepend',
                descriptionFallback: 'Fixed zone above the scrollable content. Rendered only when the #prepend slot is filled. <code>flex: none</code> so it does not participate in content scrolling.'
            },
            {
                num: 3,
                cls: '.origam-drawer__append',
                descriptionKey: 'components.drawer.anatomy.append',
                descriptionFallback: 'Fixed zone below the scrollable content. Rendered only when the #append slot is filled. <code>flex: none</code>.'
            },
            {
                num: 4,
                cls: '.origam-drawer__content',
                descriptionKey: 'components.drawer.anatomy.content',
                descriptionFallback: 'Scrollable content area hosting the #default slot. <code>overflow-y: auto</code>; fills remaining height between prepend and append.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<teleport :to="layoutTarget" :disabled="isLayoutOrphan">
  <origam-transition :transition="transition">
    <!-- root: nav by default -->
    <nav v-if="isActive" class="origam-drawer origam-drawer--left">
      <!-- inner wrapper: prepend | content | append -->
      <div class="origam-drawer__wrapper">
        <!-- fixed header slot -->
        <div class="origam-drawer__prepend">
          <slot name="prepend" />
        </div>

        <!-- scrollable navigation content -->
        <div class="origam-drawer__content">
          <slot name="default" />
        </div>

        <!-- fixed footer slot -->
        <div class="origam-drawer__append">
          <slot name="append" />
        </div>
      </div>
    </nav>
  </origam-transition>

  <!-- scrim: visible only in temporary mode -->
  <origam-overlay-scrim :active="isTemporary && isActive" @click="close" />
</teleport>`,
        classes: [
            {
                cls: 'origam-drawer',
                descriptionKey: 'components.drawer.anatomy.root',
                descriptionFallback: 'Root element. Controls all layout, transition, and z-index properties.'
            },
            {
                cls: 'origam-drawer--left',
                descriptionKey: 'components.drawer.anatomy.left',
                descriptionFallback: 'Applied when location="left". Sets top: 0; left: 0 and right: auto, with border-right-width: thin.'
            },
            {
                cls: 'origam-drawer--right',
                descriptionKey: 'components.drawer.anatomy.right',
                descriptionFallback: 'Applied when location="right". Sets top: 0; left: auto; right: 0, with border-left-width: thin.'
            },
            {
                cls: 'origam-drawer--temporary',
                descriptionKey: 'components.drawer.anatomy.temporary',
                descriptionFallback: 'Applied when temporary=true. Applies shadow.lg and shows the scrim.'
            },
            {
                cls: 'origam-drawer--rail',
                descriptionKey: 'components.drawer.anatomy.rail',
                descriptionFallback: 'Applied when rail=true. Collapses width to railWidth (default 56px).'
            },
            {
                cls: 'origam-drawer--expand-on-hover',
                descriptionKey: 'components.drawer.anatomy.expand_on_hover',
                descriptionFallback: 'Applied when expandOnHover=true. Enables the hover-triggered width transition.'
            },
            {
                cls: 'origam-drawer--floating',
                descriptionKey: 'components.drawer.anatomy.floating',
                descriptionFallback: 'Applied when floating=true. Removes the side border.'
            },
            {
                cls: 'origam-drawer--sticky',
                descriptionKey: 'components.drawer.anatomy.sticky',
                descriptionFallback: 'Applied when sticky=true. Switches height to auto and uses position: sticky.'
            },
            {
                cls: 'origam-drawer__wrapper',
                descriptionKey: 'components.drawer.anatomy.wrapper',
                descriptionFallback: 'Inner flex container. Hosts prepend, content, and append zones in a column layout.'
            },
            {
                cls: 'origam-drawer__content',
                descriptionKey: 'components.drawer.anatomy.content',
                descriptionFallback: 'Scrollable main area. overflow-y: auto; flex: 0 1 auto; height: 100%.'
            },
            {
                cls: 'origam-drawer__prepend',
                descriptionKey: 'components.drawer.anatomy.prepend',
                descriptionFallback: 'Fixed header area. flex: none.'
            },
            {
                cls: 'origam-drawer__append',
                descriptionKey: 'components.drawer.anatomy.append',
                descriptionFallback: 'Fixed footer area. flex: none.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-drawer---background',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.drawer.css_vars.background',
            descriptionFallback: 'Background color of the drawer panel.'
        },
        {
            name: '--origam-drawer---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.drawer.css_vars.color',
            descriptionFallback: 'Foreground (text/icon) color.'
        },
        {
            name: '--origam-drawer---box-shadow',
            defaultValue: '{shadow.none}',
            descriptionKey: 'components.drawer.css_vars.box_shadow',
            descriptionFallback: 'Box shadow. Applied to shadow.lg automatically in temporary mode.'
        },
        {
            name: '--origam-drawer---width',
            defaultValue: '100%',
            descriptionKey: 'components.drawer.css_vars.width',
            descriptionFallback: 'Drawer panel width. Driven by the width prop and layout item styles (useLayoutItem).'
        },
        {
            name: '--origam-drawer---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.drawer.css_vars.transition_duration',
            descriptionFallback: 'Duration of the open/close slide animation.'
        },
        {
            name: '--origam-drawer---transition-timing-function',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.drawer.css_vars.transition_timing_function',
            descriptionFallback: 'Easing function for the open/close transition.'
        },
        {
            name: '--origam-drawer__scrim---background',
            defaultValue: '{color.overlay.scrim}',
            descriptionKey: 'components.drawer.css_vars.scrim_background',
            descriptionFallback: 'Scrim overlay background color (temporary mode).'
        },
        {
            name: '--origam-drawer__scrim---opacity',
            defaultValue: '0.2',
            descriptionKey: 'components.drawer.css_vars.scrim_opacity',
            descriptionFallback: 'Scrim opacity. Animates with drag progress during touch drag.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.drawer.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.drawer.exposed.css',
            descriptionFallback: 'Reactive CSS string from drawerStyles. Used by OrigamDefaultsProvider.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.drawer.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this drawer instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.drawer.exposed.load',
            descriptionFallback: 'Injects the computed style sheet on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.drawer.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.drawer.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['navigation'],
        keyboard: [
            {
                key: 'Tab / Shift+Tab',
                actionKey: 'components.drawer.a11y.key_tab',
                actionFallback: 'Moves focus between interactive elements inside the drawer.'
            },
            {
                key: 'Escape',
                actionKey: 'components.drawer.a11y.key_escape',
                actionFallback: 'Closes the drawer when in temporary mode (if the overlay scrim is active).'
            }
        ],
        notes: [
            {
                noteKey: 'components.drawer.a11y.nav_note',
                noteFallback: 'The root element renders as <nav> by default (configurable via the tag prop). This gives it an implicit navigation landmark role, discoverable by screen reader landmark navigation.'
            },
            {
                noteKey: 'components.drawer.a11y.label_note',
                noteFallback: 'The root element carries aria-label set to the name prop (or "Navigation" as fallback). Provide a meaningful name prop when multiple navigation landmarks exist on the page.'
            },
            {
                noteKey: 'components.drawer.a11y.scrim_note',
                noteFallback: 'The scrim overlay in temporary mode is purely decorative and hidden from assistive technologies. It only handles click events to close the drawer.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/drawer.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'drawer.background',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.drawer.tokens.background',
                descriptionFallback: 'Drawer surface background color.'
            },
            {
                tokenPath: 'drawer.box-shadow',
                value: '{shadow.none}',
                type: 'shadow',
                descriptionKey: 'components.drawer.tokens.box_shadow',
                descriptionFallback: 'Default shadow (none for permanent). Overridden to shadow.lg in temporary mode.'
            },
            {
                tokenPath: 'drawer.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.drawer.tokens.transition_duration',
                descriptionFallback: 'Open/close animation duration.'
            },
            {
                tokenPath: 'drawer.temporary.box-shadow',
                value: '{shadow.lg}',
                type: 'shadow',
                descriptionKey: 'components.drawer.tokens.temporary_box_shadow',
                descriptionFallback: 'Shadow applied when the drawer is in temporary mode to elevate it above the scrim.'
            },
            {
                tokenPath: 'drawer.scrim.background',
                value: '{color.overlay.scrim}',
                type: 'color',
                descriptionKey: 'components.drawer.tokens.scrim_background',
                descriptionFallback: 'Background of the scrim shown behind the temporary drawer.'
            },
            {
                tokenPath: 'drawer.scrim.opacity',
                value: '0.2',
                type: 'number',
                descriptionKey: 'components.drawer.tokens.scrim_opacity',
                descriptionFallback: 'Scrim opacity in temporary mode. Tracks drag progress during touch open/close.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Navigation content',
        controls: [
            {
                prop: 'location',
                kind: 'select',
                labelKey: 'components.drawer.playground.location',
                labelFallback: 'Location',
                defaultValue: 'left',
                options: [
                    { label: 'left', value: 'left' },
                    { label: 'right', value: 'right' },
                    { label: 'top', value: 'top' },
                    { label: 'bottom', value: 'bottom' }
                ]
            },
            {
                prop: 'temporary',
                kind: 'switch',
                labelKey: 'components.drawer.playground.temporary',
                labelFallback: 'Temporary',
                defaultValue: false
            },
            {
                prop: 'rail',
                kind: 'switch',
                labelKey: 'components.drawer.playground.rail',
                labelFallback: 'Rail mode',
                defaultValue: false
            },
            {
                prop: 'expandOnHover',
                kind: 'switch',
                labelKey: 'components.drawer.playground.expand_on_hover',
                labelFallback: 'Expand on hover',
                defaultValue: false
            },
            {
                prop: 'floating',
                kind: 'switch',
                labelKey: 'components.drawer.playground.floating',
                labelFallback: 'Floating (no border)',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
