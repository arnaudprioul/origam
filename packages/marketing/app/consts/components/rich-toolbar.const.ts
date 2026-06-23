/**
 * /components/rich-toolbar — full documentation data for OrigamRichToolbar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Textarea/textarea-toolbar.interface.ts  (props)
 *   - packages/ds/src/components/TextareaField/OrigamRichToolbar.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/src/enums/Textarea/textarea-toolbar-command.enum.ts    (TEXTAREA_TOOLBAR_COMMAND)
 *   - packages/ds/src/enums/Textarea/textarea-toolbar-position.enum.ts   (TEXTAREA_TOOLBAR_POSITION)
 *
 * NOTE: OrigamRichToolbar is an internal sub-component of OrigamTextareaField.
 * It is kept private to the package (exposed via the #toolbar slot).
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const RICH_TOOLBAR_DOC: IComponentDoc = {
    slug: 'rich-toolbar',
    name: 'RichToolbar',
    tag: 'origam-rich-toolbar',
    icon: 'mdi-format-text',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.rich_toolbar.description',
    descriptionFallback: 'Rich-text formatting toolbar with configurable command buttons (bold, italic, underline, link, lists, headings, code). Internal sub-component of OrigamTextareaField.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-rich-toolbar--design',
    docUrl: 'http://localhost:4000/components/TextareaField/OrigamRichToolbar',

    family: [
        {
            slug: 'textarea-field',
            name: 'TextareaField',
            descriptionKey: 'components.catalog.textarea_field.description',
            descriptionFallback: 'Multi-line text input with optional rich-text editing support and this toolbar.'
        }
    ],

    parentSlug: 'textarea-field',

    related: [
        {
            slug: 'btn',
            name: 'Btn',
            kind: 'component',
            descriptionKey: 'components.rich_toolbar.related.btn.description',
            descriptionFallback: 'Each command button inside the toolbar is an OrigamBtn with variant="text" and icon=true.'
        }
    ],

    props: [
        {
            name: 'items',
            type: { label: 'ReadonlyArray<TTextareaToolbarCommand>', slug: 'textarea-toolbar-command', kind: 'type' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.rich_toolbar.props.items.description',
            descriptionFallback: 'Ordered list of command identifiers to display. Available values: bold, italic, underline, link, list-bullet, list-ordered, heading, heading-1, heading-2, heading-3, code-inline, clear-format.'
        },
        {
            name: 'active',
            type: { label: 'ITextareaRichActiveState', slug: '', kind: 'primitive' },
            defaultValue: '—',
            required: true,
            descriptionKey: 'components.rich_toolbar.props.active.description',
            descriptionFallback: 'Reactive state object describing which commands are currently active at the caret. Shape: { bold, italic, underline, code, link, listBullet, listOrdered, heading: 0|1|2|3 }.'
        },
        {
            name: 'position',
            type: { label: 'TTextareaToolbarPosition', slug: 'textarea-toolbar-position', kind: 'type' },
            defaultValue: "'top'",
            descriptionKey: 'components.rich_toolbar.props.position.description',
            descriptionFallback: 'Toolbar placement relative to the editable surface. Values: top, bottom, floating. floating uses position: sticky.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.rich_toolbar.props.disabled.description',
            descriptionFallback: 'Disables all command buttons and sets aria-disabled on the toolbar root.'
        }
    ],

    emits: [
        {
            event: 'format',
            payload: { label: 'TTextareaToolbarCommand, value?: string', slug: 'textarea-toolbar-command', kind: 'type' },
            descriptionKey: 'components.rich_toolbar.emits.format.description',
            descriptionFallback: 'Fired when a command button is clicked. For the link command, value carries the URL entered in the popover.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.rich_toolbar.examples.textarea_field.title',
            titleFallback: 'Usage via TextareaField',
            lang: 'vue',
            code: `<template>
  <origam-textarea-field
    v-model="content"
    rich
    :toolbar="['bold', 'italic', 'underline', 'link', 'list-bullet']"
    label="Description"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const content = ref('')
</script>`
        },
        {
            titleKey: 'components.rich_toolbar.examples.custom_toolbar.title',
            titleFallback: 'Custom toolbar via slot',
            lang: 'vue',
            code: `<template>
  <origam-textarea-field v-model="content" rich>
    <template #toolbar="{ format, isFormat, items, active }">
      <origam-rich-toolbar
        :items="items"
        :active="active"
        position="floating"
        @format="format"
      />
    </template>
  </origam-textarea-field>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const content = ref('')
</script>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-rich-toolbar',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamRichToolbar',
        svgDesc: 'Schematic of the RichToolbar component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #f8f9fa)" rx="4"/>
  <rect x="28" y="40" width="644" height="60" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1.5"/>
  <rect x="40" y="52" width="36" height="36" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="58" y="73" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="700">B</text>
  <rect x="84" y="52" width="36" height="36" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="102" y="73" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-style="italic">I</text>
  <rect x="128" y="52" width="36" height="36" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="146" y="73" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace" text-decoration="underline">U</text>
  <rect x="172" y="52" width="36" height="36" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="190" y="73" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">🔗</text>
  <rect x="216" y="52" width="36" height="36" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="234" y="73" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">≡</text>
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="58" cy="48" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="58" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="190" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="190" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <text x="360" y="140" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">① div.origam-rich-toolbar (role="toolbar")</text>
  <text x="360" y="160" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">② .origam-rich-toolbar__btn (per item)</text>
  <text x="360" y="180" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">③ .origam-rich-toolbar__link-host (link only)</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-rich-toolbar&gt;</code> — 3 principal parts: the toolbar root ①, each command button ②, and the link host with popover ③.`,
        legend: [
            {
                num: 1,
                cls: '.origam-rich-toolbar',
                descriptionKey: 'components.rich_toolbar.anatomy.root',
                descriptionFallback: 'Root element. <code>role="toolbar"</code>, <code>aria-label</code> localised, <code>aria-disabled</code> when disabled. Flex wrap layout.'
            },
            {
                num: 2,
                cls: '.origam-rich-toolbar__btn',
                descriptionKey: 'components.rich_toolbar.anatomy.btn',
                descriptionFallback: '<code>&lt;origam-btn variant="text" :icon="true"&gt;</code> for each command. <code>aria-pressed</code> toggles with active state. <code>@mousedown.prevent</code> prevents editor blur.'
            },
            {
                num: 3,
                cls: '.origam-rich-toolbar__link-host',
                descriptionKey: 'components.rich_toolbar.anatomy.link_host',
                descriptionFallback: 'Wrapper for the link command. Contains the toggle button and the popover panel.'
            },
            {
                num: 4,
                cls: '.origam-rich-toolbar__link-popover',
                descriptionKey: 'components.rich_toolbar.anatomy.link_popover',
                descriptionFallback: 'Absolutely positioned popover with a URL input and an Apply button. Opens when the link button is clicked.'
            },
            {
                num: 5,
                cls: '.origam-rich-toolbar__btn--active',
                descriptionKey: 'components.rich_toolbar.anatomy.btn_active',
                descriptionFallback: 'Modifier applied to a command button when the corresponding format is active at the caret position.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div
  class="origam-rich-toolbar origam-rich-toolbar--top"
  role="toolbar"
  aria-label="Text formatting"
>
  <!-- standard command button -->
  <origam-btn
    variant="text"
    :icon="true"
    class="origam-rich-toolbar__btn"
    :aria-label="labelFor(item)"
    :aria-pressed="isActive(item) ? 'true' : 'false'"
    @click="emit('format', item)"
  >
    <origam-icon :name="iconFor(item)" />
  </origam-btn>

  <!-- link command: button + popover -->
  <div class="origam-rich-toolbar__link-host">
    <origam-btn … @click="openLinkPopover">
      <origam-icon :name="iconFor('link')" />
    </origam-btn>
    <div v-if="linkPopoverOpen" class="origam-rich-toolbar__link-popover">
      <input class="origam-rich-toolbar__link-input" type="url" />
      <origam-btn @click="applyLink">Apply</origam-btn>
    </div>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-rich-toolbar',
                descriptionKey: 'components.rich_toolbar.anatomy.root',
                descriptionFallback: 'Root toolbar container.'
            },
            {
                cls: 'origam-rich-toolbar--top',
                descriptionKey: 'components.rich_toolbar.anatomy.mod_top',
                descriptionFallback: 'Position modifier: toolbar above the editable area.'
            },
            {
                cls: 'origam-rich-toolbar--bottom',
                descriptionKey: 'components.rich_toolbar.anatomy.mod_bottom',
                descriptionFallback: 'Position modifier: toolbar below the editable area.'
            },
            {
                cls: 'origam-rich-toolbar--floating',
                descriptionKey: 'components.rich_toolbar.anatomy.mod_floating',
                descriptionFallback: 'Position modifier: position: sticky, stays visible while the editor scrolls.'
            },
            {
                cls: 'origam-rich-toolbar__btn',
                descriptionKey: 'components.rich_toolbar.anatomy.btn',
                descriptionFallback: 'Command button (OrigamBtn variant="text" :icon="true").'
            },
            {
                cls: 'origam-rich-toolbar__btn--active',
                descriptionKey: 'components.rich_toolbar.anatomy.btn_active',
                descriptionFallback: 'Active state modifier on a command button.'
            },
            {
                cls: 'origam-rich-toolbar__link-host',
                descriptionKey: 'components.rich_toolbar.anatomy.link_host',
                descriptionFallback: 'Wrapper for the link button + popover.'
            },
            {
                cls: 'origam-rich-toolbar__link-popover',
                descriptionKey: 'components.rich_toolbar.anatomy.link_popover',
                descriptionFallback: 'Absolute popover panel with URL input and Apply button.'
            },
            {
                cls: 'origam-rich-toolbar__link-input',
                descriptionKey: 'components.rich_toolbar.anatomy.link_input',
                descriptionFallback: 'URL text input inside the link popover.'
            },
            {
                cls: 'origam-rich-toolbar__link-apply',
                descriptionKey: 'components.rich_toolbar.anatomy.link_apply',
                descriptionFallback: 'Apply button that confirms the link URL.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-textarea-field__rich-toolbar---gap',
            defaultValue: '4px',
            descriptionKey: 'components.rich_toolbar.css_vars.gap',
            descriptionFallback: 'Gap between command buttons in the toolbar.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar---padding',
            defaultValue: '4px',
            descriptionKey: 'components.rich_toolbar.css_vars.padding',
            descriptionFallback: 'Padding inside the toolbar container.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar---bg-color',
            defaultValue: 'var(--origam-color__surface---raised)',
            descriptionKey: 'components.rich_toolbar.css_vars.bg_color',
            descriptionFallback: 'Background color of the toolbar and link popover.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar---border-color',
            defaultValue: 'var(--origam-color__border---default)',
            descriptionKey: 'components.rich_toolbar.css_vars.border_color',
            descriptionFallback: 'Border color of the toolbar, input and popover.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar---border-radius',
            defaultValue: '4px',
            descriptionKey: 'components.rich_toolbar.css_vars.border_radius',
            descriptionFallback: 'Border radius of the toolbar and popover.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar-btn---size',
            defaultValue: '32px',
            descriptionKey: 'components.rich_toolbar.css_vars.btn_size',
            descriptionFallback: 'Height and min-width of each command button.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar-btn---bg-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.rich_toolbar.css_vars.btn_bg_color',
            descriptionFallback: 'Default background of each command button.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar-btn---color',
            defaultValue: 'var(--origam-color__text---secondary)',
            descriptionKey: 'components.rich_toolbar.css_vars.btn_color',
            descriptionFallback: 'Default foreground (icon) color of each command button.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar-btn-active---bg-color',
            defaultValue: 'var(--origam-color__action--primary---bgSubtle)',
            descriptionKey: 'components.rich_toolbar.css_vars.btn_active_bg_color',
            descriptionFallback: 'Background color of an active command button.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar-btn-active---color',
            defaultValue: 'var(--origam-color__action--primary---bg)',
            descriptionKey: 'components.rich_toolbar.css_vars.btn_active_color',
            descriptionFallback: 'Foreground color of an active command button.'
        },
        {
            name: '--origam-textarea-field__rich-toolbar-btn-focus---outline-color',
            defaultValue: 'var(--origam-color__action--primary---bg)',
            descriptionKey: 'components.rich_toolbar.css_vars.btn_focus_outline_color',
            descriptionFallback: 'Focus-visible outline color on each command button.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'openLinkPopover',
            type: '() => Promise<void>',
            descriptionKey: 'components.rich_toolbar.exposed.open_link_popover',
            descriptionFallback: 'Programmatically opens the link insertion popover and focuses the URL input.'
        },
        {
            name: 'closeLinkPopover',
            type: '() => void',
            descriptionKey: 'components.rich_toolbar.exposed.close_link_popover',
            descriptionFallback: 'Closes the link popover and clears the URL input.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['toolbar'],
        keyboard: [
            {
                key: 'Tab / Shift+Tab',
                actionKey: 'components.rich_toolbar.a11y.key_tab',
                actionFallback: 'Moves focus through command buttons. Each button is individually focusable.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.rich_toolbar.a11y.key_activate',
                actionFallback: 'Activates the focused command button and fires the format event.'
            },
            {
                key: 'Enter',
                actionKey: 'components.rich_toolbar.a11y.key_link_apply',
                actionFallback: 'Confirms the URL in the link popover input.'
            },
            {
                key: 'Escape',
                actionKey: 'components.rich_toolbar.a11y.key_escape',
                actionFallback: 'Closes the link popover without applying.'
            }
        ],
        notes: [
            {
                noteKey: 'components.rich_toolbar.a11y.role_toolbar_note',
                noteFallback: 'The root <div> has role="toolbar" and aria-label (localised via t()). This groups the controls semantically for screen readers.'
            },
            {
                noteKey: 'components.rich_toolbar.a11y.aria_pressed_note',
                noteFallback: 'Each command button carries aria-pressed="true|false" reflecting the active state at the caret. Screen readers announce the toggle state.'
            },
            {
                noteKey: 'components.rich_toolbar.a11y.aria_disabled_note',
                noteFallback: 'When disabled=true, the toolbar root gets aria-disabled="true" and each button gets the disabled attribute.'
            },
            {
                noteKey: 'components.rich_toolbar.a11y.mousedown_prevent_note',
                noteFallback: '@mousedown.prevent on every button prevents the contenteditable editor from losing focus when a format button is clicked.'
            },
            {
                noteKey: 'components.rich_toolbar.a11y.link_popover_note',
                noteFallback: 'The link button carries aria-expanded="true|false" to signal the popover state. The popover input is auto-focused on open (nextTick).'
            }
        ]
    } satisfies IComponentA11y,

    playground: {
        controls: [
            {
                prop: 'position',
                kind: 'select',
                labelKey: 'components.rich_toolbar.playground.position',
                labelFallback: 'Position',
                defaultValue: 'top',
                options: [
                    { label: 'top', value: 'top' },
                    { label: 'bottom', value: 'bottom' },
                    { label: 'floating', value: 'floating' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.rich_toolbar.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
