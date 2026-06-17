/**
 * /components/command-palette — full documentation data for OrigamCommandPalette.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/CommandPalette/command-palette.interface.ts  (props)
 *   - packages/ds/src/components/CommandPalette/OrigamCommandPalette.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/command-palette.json                       (CSS tokens)
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

export const COMMAND_PALETTE_DOC: IComponentDoc = {
    slug: 'command-palette',
    name: 'CommandPalette',
    tag: 'origam-command-palette',
    icon: 'mdi-magnify',
    category: 'Navigation',
    descriptionKey: 'components.catalog.command_palette.description',
    descriptionFallback: '⌘K-style command launcher overlay with fuzzy search, hotkey registration and a plugin registry via useCommand().',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-commandpalette--design',
    docUrl: 'http://localhost:4000/components/CommandPalette/OrigamCommandPalette',

    family: [],

    related: [
        {
            slug: 'kbd',
            name: 'Kbd',
            kind: 'component',
            descriptionKey: 'components.catalog.kbd.description',
            descriptionFallback: 'Keyboard shortcut badge used to display key hints in the palette footer.'
        },
        {
            slug: 'overlay',
            name: 'Overlay',
            kind: 'component',
            descriptionKey: 'components.catalog.overlay.description',
            descriptionFallback: 'Backdrop overlay used by CommandPalette to trap focus and close on outside click.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.command_palette.props.model_value.description',
            descriptionFallback: 'v-model controlling whether the palette is open.'
        },
        {
            name: 'hotkey',
            type: { label: 'TCommandPaletteHotkey | null', slug: '', kind: 'primitive' },
            defaultValue: "[['meta', 'k'], ['ctrl', 'k']]",
            descriptionKey: 'components.command_palette.props.hotkey.description',
            descriptionFallback: 'Global hotkey(s) that toggle the palette open. Defaults to ⌘K / Ctrl+K. Pass null to disable the global listener.'
        },
        {
            name: 'commands',
            type: { label: 'ReadonlyArray<ICommand>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.command_palette.props.commands.description',
            descriptionFallback: 'Static command list. When omitted the palette uses commands registered via the useCommand() global registry.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.command_palette.props.placeholder.description',
            descriptionFallback: 'Placeholder text inside the search input (already-translated string).'
        },
        {
            name: 'emptyText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.command_palette.props.empty_text.description',
            descriptionFallback: 'Empty-state message displayed when no command matches the current query.'
        },
        {
            name: 'maxHeight',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.command_palette.props.max_height.description',
            descriptionFallback: 'Maximum height of the result list. Number is interpreted as px.'
        },
        {
            name: 'width',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.command_palette.props.width.description',
            descriptionFallback: 'Width of the palette dialog. Number is interpreted as px.'
        },
        {
            name: 'loading',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.command_palette.props.loading.description',
            descriptionFallback: 'Displays a loader inside the result list while async commands are being fetched.'
        },
        {
            name: 'closeOnSelect',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.command_palette.props.close_on_select.description',
            descriptionFallback: 'Closes the palette automatically when a command is selected.'
        },
        {
            name: 'closeOnEscape',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.command_palette.props.close_on_escape.description',
            descriptionFallback: 'Closes the palette when the user presses Escape.'
        },
        {
            name: 'closeOnBackdrop',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.command_palette.props.close_on_backdrop.description',
            descriptionFallback: 'Closes the palette when the user clicks the backdrop overlay.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.command_palette.emits.update_model_value.description',
            descriptionFallback: 'Fired when the open state changes (open/close).'
        },
        {
            event: 'select',
            payload: { label: 'ICommand', slug: '', kind: 'primitive' },
            descriptionKey: 'components.command_palette.emits.select.description',
            descriptionFallback: 'Fired when the user selects a command from the result list.'
        },
        {
            event: 'query',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.command_palette.emits.query.description',
            descriptionFallback: 'Fired on every keystroke as the search query changes. Use for async command fetching.'
        }
    ],

    slots: [
        {
            slot: 'item',
            slotProps: '{ command: ICommand, isActive: boolean }',
            descriptionKey: 'components.command_palette.slots.item.description',
            descriptionFallback: 'Custom renderer for each result row. Exposes the command data and whether it is currently highlighted.'
        },
        {
            slot: 'empty',
            slotProps: '—',
            descriptionKey: 'components.command_palette.slots.empty.description',
            descriptionFallback: 'Custom empty state shown when no commands match the query.'
        },
        {
            slot: 'footer',
            slotProps: '—',
            descriptionKey: 'components.command_palette.slots.footer.description',
            descriptionFallback: 'Optional footer rendered below the result list (e.g. keyboard shortcut hints).'
        }
    ],

    examples: [
        {
            titleKey: 'components.command_palette.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-command-palette
    v-model="open"
    :commands="commands"
    placeholder="Type a command…"
    @select="onSelect"
  />
  <origam-btn text="Open palette (⌘K)" @click="open = true" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
  const commands = [
    { id: 'new-file',      label: 'New file',  icon: 'mdi-file-plus-outline', perform: () => {} },
    { id: 'open-settings', label: 'Settings',  icon: 'mdi-cog-outline',       perform: () => {} },
    { id: 'logout',        label: 'Sign out',  icon: 'mdi-logout',            perform: () => {} }
  ]
  function onSelect(cmd) { open.value = false }
</script>`
        },
        {
            titleKey: 'components.command_palette.examples.async.title',
            titleFallback: 'Async commands',
            lang: 'vue',
            code: `<template>
  <origam-command-palette
    v-model="open"
    :commands="results"
    :loading="fetching"
    @query="search"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
  const results = ref([])
  const fetching = ref(false)
  async function search(q: string) {
    fetching.value = true
    results.value = await fetchCommands(q)
    fetching.value = false
  }
</script>`
        },
        {
            titleKey: 'components.command_palette.examples.groups.title',
            titleFallback: 'Grouped commands',
            lang: 'vue',
            code: `<template>
  <origam-command-palette v-model="open" :commands="commands" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const open = ref(false)
  const commands = [
    { id: 'nav-home',     label: 'Go to Home',     group: 'Navigation', icon: 'mdi-home',     perform: () => {} },
    { id: 'nav-settings', label: 'Go to Settings',  group: 'Navigation', icon: 'mdi-cog',      perform: () => {} },
    { id: 'theme-dark',   label: 'Dark mode',       group: 'Theme',      icon: 'mdi-weather-night', perform: () => {} }
  ]
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-command-palette',
        svgViewBox: '0 0 700 320',
        svgTitle: 'Anatomy of OrigamCommandPalette',
        svgDesc: 'Schematic of the CommandPalette component with numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="320" fill="var(--origam-color__surface---sunken, #f5f5f5)" rx="4"/>
  <rect x="20" y="20" width="660" height="280" rx="4" fill="rgba(0,0,0,0.4)" stroke="none"/>
  <rect x="100" y="60" width="500" height="220" rx="12" fill="var(--origam-color__surface---elevated, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.12))" stroke-width="1.5"/>
  <rect x="100" y="60" width="500" height="54" rx="0" fill="none" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1" stroke-dasharray="4 2"/>
  <circle cx="126" cy="87" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="126" y="91.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="148" y="70" width="330" height="34" rx="6" fill="var(--origam-color__surface---sunken, #f5f5f5)" stroke="none"/>
  <text x="162" y="92" font-size="11" fill="var(--origam-color__text---disabled, #aaa)" font-family="'JetBrains Mono',monospace">Type a command…</text>
  <circle cx="490" cy="87" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="490" y="91.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <rect x="100" y="114" width="500" height="120" fill="var(--origam-color__surface---elevated, #fff)" stroke="none"/>
  <circle cx="116" cy="130" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="116" y="134.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="130" y="128" font-size="8" fill="var(--origam-color__text---secondary, #666)" font-family="'JetBrains Mono',monospace">NAVIGATION</text>
  <rect x="108" y="140" width="484" height="36" rx="6" fill="var(--origam-color__action--secondary---bg, rgba(124,58,237,0.08))"/>
  <circle cx="124" cy="158" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="124" y="162.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="148" y="161" font-size="11" fill="var(--origam-color__text---primary, #222)" font-family="system-ui,sans-serif">Go to Settings</text>
  <rect x="500" y="148" width="80" height="20" rx="4" fill="none" stroke="var(--origam-color__border---default, rgba(0,0,0,0.2))" stroke-width="1"/>
  <text x="540" y="161" font-size="9" fill="var(--origam-color__text---secondary, #666)" text-anchor="middle" font-family="'JetBrains Mono',monospace">⌘K</text>
  <circle cx="116" cy="206" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="116" y="210.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <rect x="100" y="234" width="500" height="46" rx="0" fill="var(--origam-color__surface---sunken, #f9f9f9)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.08))" stroke-width="1"/>
  <circle cx="116" cy="257" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="116" y="261.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <text x="300" y="280" font-size="9" fill="var(--origam-color__text---disabled, #b0b0b0)" text-anchor="middle" font-style="italic">① = backdrop (fixed / inset 0). ② = dialog (role="dialog"). ③ = group-title. ④ = item (role="option"). ⑤ = empty slot. ⑥ = footer.</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-command-palette&gt;</code> — 6 internal regions. The backdrop ① is a fixed scrim with blur; the dialog ② contains the search bar, listbox, and footer.`,
        legend: [
            {
                num: 1,
                cls: '.origam-command-palette__search',
                descriptionKey: 'components.command_palette.anatomy.search',
                descriptionFallback: 'Search bar row. Contains a magnify icon and a <code>&lt;input role="combobox"&gt;</code>.'
            },
            {
                num: 2,
                cls: '.origam-command-palette__dialog',
                descriptionKey: 'components.command_palette.anatomy.dialog',
                descriptionFallback: 'Dialog panel (<code>role="dialog" aria-modal="true"</code>). Width controlled by <code>--origam-command-palette---width</code>.'
            },
            {
                num: 3,
                cls: '.origam-command-palette__group-title',
                descriptionKey: 'components.command_palette.anatomy.group_title',
                descriptionFallback: 'Group subheader. Rendered for each distinct <code>group</code> value on commands.'
            },
            {
                num: 4,
                cls: '.origam-command-palette__item',
                descriptionKey: 'components.command_palette.anatomy.item',
                descriptionFallback: 'Command row (<code>role="option"</code>). Active row receives the active background token. Hosts icon, label, description and kbd hint.'
            },
            {
                num: 5,
                cls: '.origam-command-palette__empty',
                descriptionKey: 'components.command_palette.anatomy.empty',
                descriptionFallback: 'Empty-state container. Rendered when no commands match. Replaced by the <code>#empty</code> slot.'
            },
            {
                num: 6,
                cls: '.origam-command-palette__footer',
                descriptionKey: 'components.command_palette.anatomy.footer',
                descriptionFallback: 'Footer bar with keyboard shortcut hints (<code>↑↓</code> navigate, <code>↵</code> select, <code>Esc</code> close). Replaced by the <code>#footer</code> slot.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- fixed backdrop + blur -->
<div class="origam-command-palette" @click.self="close">
  <!-- dialog panel (role="dialog" aria-modal="true") -->
  <div class="origam-command-palette__dialog" role="dialog" aria-modal="true">

    <!-- search bar -->
    <div class="origam-command-palette__search">
      <origam-icon class="origam-command-palette__search-icon" />
      <input role="combobox" class="origam-command-palette__input" />
    </div>

    <!-- result listbox -->
    <div class="origam-command-palette__list" role="listbox">
      <!-- per-group subheader -->
      <div class="origam-command-palette__group-title">Navigation</div>

      <!-- each command row -->
      <div class="origam-command-palette__item" role="option">
        <origam-icon class="origam-command-palette__item-icon" />
        <span class="origam-command-palette__item-text">
          <span class="origam-command-palette__item-label">Go to Settings</span>
          <span class="origam-command-palette__item-description">…</span>
        </span>
        <span class="origam-command-palette__item-kbd">
          <origam-kbd :combination="['meta', 'k']" />
        </span>
      </div>

      <!-- empty state (slot) -->
      <slot name="empty">
        <div class="origam-command-palette__empty">No results</div>
      </slot>
    </div>

    <!-- footer (slot) -->
    <slot name="footer">
      <div class="origam-command-palette__footer">…</div>
    </slot>
  </div>
</div>`,
        classes: [
            { cls: 'origam-command-palette', descriptionKey: 'components.command_palette.anatomy.root', descriptionFallback: 'Root fixed overlay (backdrop). z-index from --origam-command-palette---z-index (2500).' },
            { cls: 'origam-command-palette__dialog', descriptionKey: 'components.command_palette.anatomy.dialog', descriptionFallback: 'Dialog panel. role="dialog" aria-modal="true".' },
            { cls: 'origam-command-palette__search', descriptionKey: 'components.command_palette.anatomy.search', descriptionFallback: 'Search bar row with icon + input.' },
            { cls: 'origam-command-palette__input', descriptionKey: 'components.command_palette.anatomy.input', descriptionFallback: 'Text input (role="combobox") driving the fuzzy search.' },
            { cls: 'origam-command-palette__list', descriptionKey: 'components.command_palette.anatomy.list', descriptionFallback: 'Scrollable result listbox (role="listbox").' },
            { cls: 'origam-command-palette__group-title', descriptionKey: 'components.command_palette.anatomy.group_title', descriptionFallback: 'Group subheader rendered when commands have a group value.' },
            { cls: 'origam-command-palette__item', descriptionKey: 'components.command_palette.anatomy.item', descriptionFallback: 'Command row (role="option"). Active state applies background-color-active token.' },
            { cls: 'origam-command-palette__item-icon', descriptionKey: 'components.command_palette.anatomy.item_icon', descriptionFallback: 'Optional icon at the start of the command row.' },
            { cls: 'origam-command-palette__item-label', descriptionKey: 'components.command_palette.anatomy.item_label', descriptionFallback: 'Primary label text.' },
            { cls: 'origam-command-palette__item-description', descriptionKey: 'components.command_palette.anatomy.item_description', descriptionFallback: 'Secondary description line under the label.' },
            { cls: 'origam-command-palette__item-kbd', descriptionKey: 'components.command_palette.anatomy.item_kbd', descriptionFallback: 'Keyboard shortcut hint area using OrigamKbd.' },
            { cls: 'origam-command-palette__empty', descriptionKey: 'components.command_palette.anatomy.empty', descriptionFallback: 'Empty-state message rendered when no commands match.' },
            { cls: 'origam-command-palette__footer', descriptionKey: 'components.command_palette.anatomy.footer', descriptionFallback: 'Footer bar with keyboard navigation hints.' },
            { cls: 'origam-command-palette__loading', descriptionKey: 'components.command_palette.anatomy.loading', descriptionFallback: 'Loading indicator rendered inside the list when loading=true.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-command-palette---z-index',
            defaultValue: '{zIndex.modal} → 2500',
            descriptionKey: 'components.command_palette.css_vars.z_index',
            descriptionFallback: 'Stack order of the fixed backdrop.'
        },
        {
            name: '--origam-command-palette---padding-top',
            defaultValue: '18vh',
            descriptionKey: 'components.command_palette.css_vars.padding_top',
            descriptionFallback: 'Vertical offset from the top of the viewport to the dialog panel.'
        },
        {
            name: '--origam-command-palette---width',
            defaultValue: '640px',
            descriptionKey: 'components.command_palette.css_vars.width',
            descriptionFallback: 'Width of the dialog panel. Clamped to calc(100vw - 32px) on small screens.'
        },
        {
            name: '--origam-command-palette---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.command_palette.css_vars.background_color',
            descriptionFallback: 'Dialog panel background color.'
        },
        {
            name: '--origam-command-palette---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.command_palette.css_vars.color',
            descriptionFallback: 'Dialog panel foreground color.'
        },
        {
            name: '--origam-command-palette---border-radius',
            defaultValue: '{radius.lg} → 12px',
            descriptionKey: 'components.command_palette.css_vars.border_radius',
            descriptionFallback: 'Dialog panel border-radius.'
        },
        {
            name: '--origam-command-palette---box-shadow',
            defaultValue: '{shadow.xl}',
            descriptionKey: 'components.command_palette.css_vars.box_shadow',
            descriptionFallback: 'Box shadow on the dialog panel.'
        },
        {
            name: '--origam-command-palette--backdrop---background-color',
            defaultValue: 'rgba(0, 0, 0, 0.45)',
            descriptionKey: 'components.command_palette.css_vars.backdrop_background_color',
            descriptionFallback: 'Semi-transparent backdrop color.'
        },
        {
            name: '--origam-command-palette--backdrop---backdrop-filter',
            defaultValue: 'blur(6px)',
            descriptionKey: 'components.command_palette.css_vars.backdrop_filter',
            descriptionFallback: 'Backdrop blur applied to the fixed scrim.'
        },
        {
            name: '--origam-command-palette__item---background-color-active',
            defaultValue: '{color.action.secondary.bg}',
            descriptionKey: 'components.command_palette.css_vars.item_background_color_active',
            descriptionFallback: 'Background of the currently highlighted command item.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'query',
            type: 'Ref<string>',
            descriptionKey: 'components.command_palette.exposed.query',
            descriptionFallback: 'Reactive current search query string.'
        },
        {
            name: 'filtered',
            type: 'ComputedRef<ICommand[]>',
            descriptionKey: 'components.command_palette.exposed.filtered',
            descriptionFallback: 'Computed list of commands that match the current query.'
        },
        {
            name: 'activeIndex',
            type: 'Ref<number>',
            descriptionKey: 'components.command_palette.exposed.active_index',
            descriptionFallback: 'Index of the currently highlighted command item in the filtered list.'
        },
        {
            name: 'isActive',
            type: 'Ref<boolean>',
            descriptionKey: 'components.command_palette.exposed.is_active',
            descriptionFallback: 'Whether the palette is currently open.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['dialog', 'combobox', 'listbox', 'option'],
        keyboard: [
            {
                key: '↑ / ↓',
                actionKey: 'components.command_palette.a11y.key_navigate',
                actionFallback: 'Move highlight between command items in the result list.'
            },
            {
                key: 'Enter',
                actionKey: 'components.command_palette.a11y.key_select',
                actionFallback: 'Execute the currently highlighted command.'
            },
            {
                key: 'Escape',
                actionKey: 'components.command_palette.a11y.key_close',
                actionFallback: 'Close the palette (when closeOnEscape=true).'
            },
            {
                key: '⌘K / Ctrl+K',
                actionKey: 'components.command_palette.a11y.key_open',
                actionFallback: 'Toggle the palette open from anywhere in the page (global hotkey).'
            }
        ],
        notes: [
            {
                noteKey: 'components.command_palette.a11y.combobox_note',
                noteFallback: 'The search input uses role="combobox" with aria-controls pointing to the listbox, aria-expanded reflecting whether results are shown, and aria-activedescendant tracking the highlighted option.'
            },
            {
                noteKey: 'components.command_palette.a11y.dialog_note',
                noteFallback: 'The dialog panel uses role="dialog" aria-modal="true" and aria-labelledby pointing to the search input id. Focus is trapped inside while the palette is open.'
            },
            {
                noteKey: 'components.command_palette.a11y.disabled_command_note',
                noteFallback: 'Disabled commands have aria-disabled="true" and cannot be selected via keyboard or mouse.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/command-palette.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'command-palette.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.command_palette.tokens.background_color',
                descriptionFallback: 'Dialog panel background.'
            },
            {
                tokenPath: 'command-palette.border-radius',
                value: '{radius.lg}',
                type: 'dimension',
                descriptionKey: 'components.command_palette.tokens.border_radius',
                descriptionFallback: 'Dialog panel border-radius.'
            },
            {
                tokenPath: 'command-palette.box-shadow',
                value: '{shadow.xl}',
                type: 'shadow',
                descriptionKey: 'components.command_palette.tokens.box_shadow',
                descriptionFallback: 'Dialog panel elevation shadow.'
            },
            {
                tokenPath: 'command-palette.item.background-color-active',
                value: '{color.action.secondary.bg}',
                type: 'color',
                descriptionKey: 'components.command_palette.tokens.item_background_color_active',
                descriptionFallback: 'Active item background.'
            },
            {
                tokenPath: 'command-palette.width',
                value: '640px',
                type: 'dimension',
                descriptionKey: 'components.command_palette.tokens.width',
                descriptionFallback: 'Default dialog width.'
            },
            {
                tokenPath: 'command-palette.backdrop.background-color',
                value: 'rgba(0, 0, 0, 0.45)',
                type: 'color',
                descriptionKey: 'components.command_palette.tokens.backdrop_background_color',
                descriptionFallback: 'Backdrop overlay color.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'modelValue',
                kind: 'switch',
                labelKey: 'components.command_palette.playground.model_value',
                labelFallback: 'Open',
                defaultValue: false
            },
            {
                prop: 'loading',
                kind: 'switch',
                labelKey: 'components.command_palette.playground.loading',
                labelFallback: 'Loading',
                defaultValue: false
            },
            {
                prop: 'closeOnSelect',
                kind: 'switch',
                labelKey: 'components.command_palette.playground.close_on_select',
                labelFallback: 'Close on select',
                defaultValue: true
            },
            {
                prop: 'closeOnBackdrop',
                kind: 'switch',
                labelKey: 'components.command_palette.playground.close_on_backdrop',
                labelFallback: 'Close on backdrop',
                defaultValue: true
            },
            {
                prop: 'placeholder',
                kind: 'text',
                labelKey: 'components.command_palette.playground.placeholder',
                labelFallback: 'Placeholder',
                defaultValue: 'Type a command…'
            }
        ]
    } satisfies IComponentPlayground
}
