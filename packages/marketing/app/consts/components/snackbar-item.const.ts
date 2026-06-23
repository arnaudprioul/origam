/**
 * /components/snackbar-item — full documentation data for OrigamSnackbarItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Snackbar/snackbar-item.interface.ts  (props)
 *   - packages/ds/src/components/Snackbar/OrigamSnackbarItem.vue       (template, emits, slots)
 *   - packages/ds/tokens/component/snackbar-group.json (item sub-object) (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SNACKBAR_ITEM_DOC: IComponentDoc = {
    slug: 'snackbar-item',
    name: 'SnackbarItem',
    tag: 'origam-snackbar-item',
    icon: 'mdi-message-badge-outline',
    category: 'Feedback',
    descriptionKey: 'components.catalog.snackbar_item.description',
    descriptionFallback: 'Pure visual layer for a single toast notification. Handles intent theming, icon, title, message, action buttons and the dismiss control.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-snackbar--design',
    docUrl: 'http://localhost:4000/components/Snackbar/OrigamSnackbar',

    parentSlug: 'snackbar',

    family: [
        {
            slug: 'snackbar',
            name: 'Snackbar',
            descriptionKey: 'components.catalog.snackbar.description',
            descriptionFallback: 'Temporary overlay that delivers brief non-blocking feedback at a configurable viewport location.'
        },
        {
            slug: 'snackbar-group',
            name: 'SnackbarGroup',
            descriptionKey: 'components.catalog.snackbar_group.description',
            descriptionFallback: 'Manages a queue of toast notifications stacked at a viewport anchor.'
        }
    ],

    props: [
        {
            name: 'intent',
            type: { label: 'TIntent', slug: 'intent', kind: 'type' },
            defaultValue: "'info'",
            descriptionKey: 'components.snackbar_item.props.intent.description',
            descriptionFallback: 'Semantic intent — drives the icon default and the surface colouring via feedback tokens (primary, success, warning, danger, info).'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.title.description',
            descriptionFallback: 'Optional bold first line rendered above the message. Useful for short labels such as "Saved" or "Error".'
        },
        {
            name: 'message',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.message.description',
            descriptionFallback: 'Body text rendered under the title. Can be omitted when content is supplied via the default slot.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon | false', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.icon.description',
            descriptionFallback: 'Prepend icon override. Omit to use the per-intent default. Pass false to suppress the icon entirely.'
        },
        {
            name: 'actions',
            type: { label: 'ReadonlyArray<ISnackbarGroupItemAction>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.actions.description',
            descriptionFallback: 'Action buttons rendered inline after the text block. Each action fires handler() and dismisses the item unless keepOpen: true.'
        },
        {
            name: 'dismissible',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.snackbar_item.props.dismissible.description',
            descriptionFallback: 'Whether to render the close (x) dismiss button.'
        },
        {
            name: 'dismissLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Dismiss notification'",
            descriptionKey: 'components.snackbar_item.props.dismiss_label.description',
            descriptionFallback: 'Accessible label for the dismiss button. Defaults to the DS locale key origam.snackbar.dismiss.'
        },
        {
            name: 'role',
            type: { label: "'status' | 'alert'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.role.description',
            descriptionFallback: 'ARIA role. Inferred from intent when not set: warning / danger → "alert", others → "status".'
        },
        {
            name: 'ariaLive',
            type: { label: "'polite' | 'assertive'", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.aria_live.description',
            descriptionFallback: 'ARIA live region politeness. Inferred from intent when not set: warning / danger → "assertive", others → "polite".'
        },
        {
            name: 'dataCy',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_item.props.data_cy.description',
            descriptionFallback: 'data-cy attribute injected on the root element so each toast is addressable in e2e tests.'
        }
    ],

    emits: [
        {
            event: 'dismiss',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.snackbar_item.emits.dismiss.description',
            descriptionFallback: 'Fired when the user clicks the dismiss button.'
        },
        {
            event: 'action',
            payload: { label: 'ISnackbarGroupItemAction', slug: '', kind: 'primitive' },
            descriptionKey: 'components.snackbar_item.emits.action.description',
            descriptionFallback: 'Fired when the user clicks an action button, forwarding the action descriptor.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.snackbar_item.slots.default.description',
            descriptionFallback: 'Additional content rendered inside the text block after the message.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.snackbar_item.slots.prepend.description',
            descriptionFallback: 'Replaces the intent icon with custom content.'
        },
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.snackbar_item.slots.title.description',
            descriptionFallback: 'Replaces the title text with custom content. Rendered only when the title prop is set.'
        },
        {
            slot: 'message',
            slotProps: '—',
            descriptionKey: 'components.snackbar_item.slots.message.description',
            descriptionFallback: 'Replaces the message text with custom content.'
        },
        {
            slot: 'actions',
            slotProps: '—',
            descriptionKey: 'components.snackbar_item.slots.actions.description',
            descriptionFallback: 'Replaces the rendered action buttons with custom content.'
        }
    ],

    examples: [
        {
            titleKey: 'components.snackbar_item.examples.intents.title',
            titleFallback: 'Intents',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <origam-snackbar-item intent="success" title="Saved" message="Your changes have been saved." />
    <origam-snackbar-item intent="danger" title="Error" message="An unexpected error occurred." />
    <origam-snackbar-item intent="warning" message="Your session expires in 5 minutes." />
    <origam-snackbar-item intent="info" message="A new version is available." :dismissible="false" />
  </div>
</template>`
        },
        {
            titleKey: 'components.snackbar_item.examples.actions.title',
            titleFallback: 'With actions',
            lang: 'vue',
            code: `<template>
  <origam-snackbar-item
    intent="info"
    title="Update available"
    message="Reload to get the latest version."
    :actions="[{ label: 'Reload', handler: () => location.reload(), intent: 'primary' }]"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'info', props: { intent: 'info', title: 'Info', message: 'This is an informational message.' } },
        { label: 'success', props: { intent: 'success', title: 'Success', message: 'Operation completed successfully.' } },
        { label: 'warning', props: { intent: 'warning', message: 'Something might need your attention.' } },
        { label: 'danger', props: { intent: 'danger', title: 'Error', message: 'An error has occurred.' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-snackbar-item',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamSnackbarItem',
        svgDesc: 'Schematic of the SnackbarItem component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #f8f5ff)" rx="4"/>
  <rect x="20" y="24" width="660" height="172" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="36" y="40" width="600" height="120" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="5 3"/>
  <text x="48" y="58" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__content</text>
  <rect x="48" y="65" width="48" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="72" y="108" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <rect x="108" y="65" width="300" height="80" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="120" y="83" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__text</text>
  <rect x="120" y="88" width="280" height="20" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="260" y="102" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__title</text>
  <rect x="120" y="115" width="280" height="16" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.03))"/>
  <text x="260" y="127" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__message</text>
  <rect x="420" y="65" width="120" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="480" y="108" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__actions</text>
  <rect x="616" y="65" width="28" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="630" y="108" font-size="7" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">✕</text>
  <circle cx="28" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="36" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="44" cy="55" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="59" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="56" cy="73" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="77" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="116" cy="73" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="116" y="77" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <circle cx="116" cy="107" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="116" y="111" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">5</text>
  <circle cx="428" cy="73" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="428" y="77" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">6</text>
  <circle cx="624" cy="73" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="624" y="77" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">7</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-snackbar-item&gt;</code> — 7 internal parts. The <code>__content</code> row holds the prepend icon and the text block; <code>__actions</code> and <code>__dismiss</code> are appended when present.`,
        legend: [
            {
                num: 1,
                cls: '.origam-snackbar-item',
                descriptionKey: 'components.snackbar_item.anatomy.root',
                descriptionFallback: 'Root element. Carries the intent modifier class (e.g. <code>--intent-success</code>) and the role / aria-live / aria-atomic attributes.'
            },
            {
                num: 2,
                cls: '.origam-snackbar-item__content',
                descriptionKey: 'components.snackbar_item.anatomy.content',
                descriptionFallback: 'Flex row hosting the prepend icon and the text block.'
            },
            {
                num: 3,
                cls: '.origam-snackbar-item__prepend',
                descriptionKey: 'components.snackbar_item.anatomy.prepend',
                descriptionFallback: 'Leading icon area. Defaults to the per-intent MDI icon; replaced by the <code>#prepend</code> slot or hidden when <code>icon=false</code>.'
            },
            {
                num: 4,
                cls: '.origam-snackbar-item__title',
                descriptionKey: 'components.snackbar_item.anatomy.title',
                descriptionFallback: 'Bold first-line label. Rendered only when the <code>title</code> prop is set.'
            },
            {
                num: 5,
                cls: '.origam-snackbar-item__message',
                descriptionKey: 'components.snackbar_item.anatomy.message',
                descriptionFallback: 'Body text. Rendered when the <code>message</code> prop or the <code>#message</code> slot is provided.'
            },
            {
                num: 6,
                cls: '.origam-snackbar-item__actions',
                descriptionKey: 'components.snackbar_item.anatomy.actions',
                descriptionFallback: 'Action buttons row. Rendered only when <code>actions</code> is non-empty or the <code>#actions</code> slot is used.'
            },
            {
                num: 7,
                cls: '.origam-snackbar-item__dismiss',
                descriptionKey: 'components.snackbar_item.anatomy.dismiss',
                descriptionFallback: 'Close button (OrigamBtn icon x-small). Hidden when <code>dismissible=false</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-snackbar-item origam-snackbar-item--intent-success">
  <div class="origam-snackbar-item__content">
    <div class="origam-snackbar-item__prepend">
      <slot name="prepend"><origam-icon :icon="resolvedIcon" :size="24" /></slot>
    </div>
    <div class="origam-snackbar-item__text">
      <div class="origam-snackbar-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="origam-snackbar-item__message">
        <slot name="message">{{ message }}</slot>
      </div>
      <slot/>
    </div>
  </div>
  <div class="origam-snackbar-item__actions">
    <slot name="actions">
      <origam-btn v-for="action in actions" variant="text" />
    </slot>
  </div>
  <origam-btn class="origam-snackbar-item__dismiss" :icon="MDI_ICONS.CLOSE" size="x-small" variant="text" />
</div>`,
        classes: [
            {
                cls: 'origam-snackbar-item',
                descriptionKey: 'components.snackbar_item.anatomy.root',
                descriptionFallback: 'Root element with intent modifier and ARIA attributes.'
            },
            {
                cls: 'origam-snackbar-item__content',
                descriptionKey: 'components.snackbar_item.anatomy.content',
                descriptionFallback: 'Flex row: prepend icon + text block.'
            },
            {
                cls: 'origam-snackbar-item__prepend',
                descriptionKey: 'components.snackbar_item.anatomy.prepend',
                descriptionFallback: 'Leading icon area.'
            },
            {
                cls: 'origam-snackbar-item__text',
                descriptionKey: 'components.snackbar_item.anatomy.text',
                descriptionFallback: 'Column: title + message + default slot.'
            },
            {
                cls: 'origam-snackbar-item__title',
                descriptionKey: 'components.snackbar_item.anatomy.title',
                descriptionFallback: 'Bold title text.'
            },
            {
                cls: 'origam-snackbar-item__message',
                descriptionKey: 'components.snackbar_item.anatomy.message',
                descriptionFallback: 'Body message text.'
            },
            {
                cls: 'origam-snackbar-item__actions',
                descriptionKey: 'components.snackbar_item.anatomy.actions',
                descriptionFallback: 'Action buttons row.'
            },
            {
                cls: 'origam-snackbar-item__dismiss',
                descriptionKey: 'components.snackbar_item.anatomy.dismiss',
                descriptionFallback: 'Close/dismiss button.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-snackbar-item---gap',
            defaultValue: '12px',
            descriptionKey: 'components.snackbar_item.css_vars.gap',
            descriptionFallback: 'Gap between the prepend area and the text+actions block.'
        },
        {
            name: '--origam-snackbar-item---min-width',
            defaultValue: '288px',
            descriptionKey: 'components.snackbar_item.css_vars.min_width',
            descriptionFallback: 'Minimum width of the item.'
        },
        {
            name: '--origam-snackbar-item---max-width',
            defaultValue: '420px',
            descriptionKey: 'components.snackbar_item.css_vars.max_width',
            descriptionFallback: 'Maximum width of the item.'
        },
        {
            name: '--origam-snackbar-item---padding',
            defaultValue: '12px 14px',
            descriptionKey: 'components.snackbar_item.css_vars.padding',
            descriptionFallback: 'Inner padding of the item.'
        },
        {
            name: '--origam-snackbar-item---border-radius',
            defaultValue: '8px',
            descriptionKey: 'components.snackbar_item.css_vars.border_radius',
            descriptionFallback: 'Corner radius of the item card.'
        },
        {
            name: '--origam-snackbar-item---background-color',
            defaultValue: 'var(--origam-color__surface---default)',
            descriptionKey: 'components.snackbar_item.css_vars.background_color',
            descriptionFallback: 'Default background. Intent variants override this via feedback tokens.'
        },
        {
            name: '--origam-snackbar-item---border-color',
            defaultValue: 'var(--origam-color__border---subtle)',
            descriptionKey: 'components.snackbar_item.css_vars.border_color',
            descriptionFallback: 'Default border colour. Intent variants override this via feedback tokens.'
        },
        {
            name: '--origam-snackbar-item---box-shadow',
            defaultValue: '0 4px 12px rgba(0,0,0,0.12)',
            descriptionKey: 'components.snackbar_item.css_vars.box_shadow',
            descriptionFallback: 'Elevation shadow for the item card.'
        },
        {
            name: '--origam-snackbar-item__title---font-weight',
            defaultValue: '600',
            descriptionKey: 'components.snackbar_item.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the title line.'
        },
        {
            name: '--origam-snackbar-item__message---opacity',
            defaultValue: '0.85',
            descriptionKey: 'components.snackbar_item.css_vars.message_opacity',
            descriptionFallback: 'Opacity of the message text, giving the title visual priority.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.snackbar_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['status', 'alert'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.snackbar_item.a11y.key_tab',
                actionFallback: 'Moves focus to the dismiss button or action buttons.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.snackbar_item.a11y.key_activate',
                actionFallback: 'Activates the focused dismiss or action button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.snackbar_item.a11y.live_note',
                noteFallback: 'aria-live is set to "assertive" for warning and danger intents, "polite" for others. The value can be overridden via the ariaLive prop.'
            },
            {
                noteKey: 'components.snackbar_item.a11y.atomic_note',
                noteFallback: 'aria-atomic="true" ensures screen readers read the entire item when it is updated.'
            },
            {
                noteKey: 'components.snackbar_item.a11y.dismiss_note',
                noteFallback: 'The dismiss button carries aria-label="Dismiss notification" (or the dismissLabel prop value). It is keyboard-focusable and activated via Enter/Space.'
            },
            {
                noteKey: 'components.snackbar_item.a11y.contrast_note',
                noteFallback: 'The v-contrast directive ensures foreground and background token combinations meet WCAG AA contrast ratios for each intent.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/snackbar-group.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Item tokens live under the snackbar-group.item sub-object.',
        excerpt: [
            {
                tokenPath: 'snackbar-group.item.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.snackbar_item.tokens.background_color',
                descriptionFallback: 'Default background color. Intent variants reference feedback tokens.'
            },
            {
                tokenPath: 'snackbar-group.item.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.snackbar_item.tokens.border_radius',
                descriptionFallback: 'Corner radius of the item card.'
            },
            {
                tokenPath: 'snackbar-group.item.box-shadow',
                value: '{shadow.md}',
                type: 'shadow',
                descriptionKey: 'components.snackbar_item.tokens.box_shadow',
                descriptionFallback: 'Elevation shadow applied to the card.'
            },
            {
                tokenPath: 'snackbar-group.item.title-font-weight',
                value: '{font.weight.semibold}',
                type: 'fontWeight',
                descriptionKey: 'components.snackbar_item.tokens.title_font_weight',
                descriptionFallback: 'Font weight of the title text.'
            },
            {
                tokenPath: 'snackbar-group.item.message-opacity',
                value: '0.85',
                type: 'number',
                descriptionKey: 'components.snackbar_item.tokens.message_opacity',
                descriptionFallback: 'Opacity of the message text.'
            }
        ]
    } satisfies IComponentTokens
}
