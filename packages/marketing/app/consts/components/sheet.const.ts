/**
 * /components/sheet — full documentation data for OrigamSheet.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Sheet/sheet.interface.ts           (props)
 *   - packages/ds/src/interfaces/Sheet/sheet-emits.interface.ts     (emits)
 *   - packages/ds/src/components/Sheet/OrigamSheet.vue              (template BEM, defineExpose)
 *   - packages/ds/tokens/component/sheet.json                       (CSS tokens)
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

export const SHEET_DOC: IComponentDoc = {
    slug: 'sheet',
    name: 'Sheet',
    tag: 'origam-sheet',
    icon: 'mdi-card-outline',
    category: 'Overlay & Surface',
    descriptionKey: 'components.catalog.sheet.description',
    descriptionFallback: 'General-purpose surface container with optional swipe-to-expand bottom-sheet gesture. Used as the base layer for Dialog, Picker, ColorPickerField and other overlay components.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-sheet--design',
    docUrl: 'http://localhost:4000/components/Sheet/OrigamSheet',

    family: [],

    related: [
        {
            slug: 'dialog',
            name: 'Dialog',
            kind: 'component',
            descriptionKey: 'components.sheet.related.dialog',
            descriptionFallback: 'Dialog uses OrigamSheet as its primary surface container.'
        },
        {
            slug: 'picker',
            name: 'Picker',
            kind: 'component',
            descriptionKey: 'components.sheet.related.picker',
            descriptionFallback: 'Picker wraps OrigamSheet to get its rounded-top surface.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'side',
            type: { label: 'TDirectionBoth', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.side.description',
            descriptionFallback: "Edge the sheet is anchored to. Only 'bottom' activates the swipe gesture today. Other values reserve the prop for future side-sheet patterns."
        },
        {
            name: 'swipeable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.sheet.props.swipeable.description',
            descriptionFallback: "Enables the mobile-style swipe-to-expand / swipe-to-dismiss gesture. Effective only when side='bottom'."
        },
        {
            name: 'snapPoints',
            type: { label: 'ReadonlyArray<TSheetSnapPoint>', slug: '', kind: 'primitive' },
            defaultValue: "closed/peek(120px)/half(50vh)/full(90vh)",
            descriptionKey: 'components.sheet.props.snap_points.description',
            descriptionFallback: 'Discrete heights the sheet settles on after a drag. Each entry is { id, height } where height is a number (px) or CSS length string.'
        },
        {
            name: 'defaultSnap',
            type: { label: 'TSheetSnapId', slug: '', kind: 'primitive' },
            defaultValue: "'half'",
            descriptionKey: 'components.sheet.props.default_snap.description',
            descriptionFallback: "Initial snap id when the sheet mounts. One of 'closed', 'peek', 'half', 'full' or a custom id."
        },
        {
            name: 'open',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.open.description',
            descriptionFallback: "v-model:open — false maps to the 'closed' snap, true restores the last non-closed snap."
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.sheet.props.disabled.description',
            descriptionFallback: 'Disables the swipe gesture. The sheet stays at defaultSnap.'
        },
        {
            name: 'persistent',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.sheet.props.persistent.description',
            descriptionFallback: "Prevents swipe-dismiss below the 'closed' snap. A fast downward flick snaps to the next non-zero point instead."
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.sheet.props.tag.description',
            descriptionFallback: 'Root HTML element.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.color.description',
            descriptionFallback: 'Text/foreground color of the sheet surface.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.bg_color.description',
            descriptionFallback: 'Background color override for the sheet surface.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.sheet.props.border.description',
            descriptionFallback: 'Applies border tokens to the sheet surface.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.rounded.description',
            descriptionFallback: 'Border-radius applied to the sheet. When swipeable=true the sheet token defaults to 2xl on the top corners.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token applied to the surface.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.width.description',
            descriptionFallback: 'Width override.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.sheet.props.height.description',
            descriptionFallback: 'Height override. Used by the swipe composable to set the live snap height via --origam-sheet---swipe-height.'
        },
        // ── IActiveProps / IHoverProps ─────────────────────────────────
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.sheet.props.active.description',
            descriptionFallback: 'Forces the active visual state.'
        }
    ],

    emits: [
        {
            event: 'update:snap',
            payload: { label: 'TSheetSnapId', slug: '', kind: 'primitive' },
            descriptionKey: 'components.sheet.emits.update_snap.description',
            descriptionFallback: "Emitted whenever the gesture or snapTo() settles on a new snap-point id ('closed', 'peek', 'half', 'full' or custom)."
        },
        {
            event: 'update:open',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.sheet.emits.update_open.description',
            descriptionFallback: "Emitted on the closed/non-closed boundary to keep v-model:open consistent when the user dismisses via swipe."
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.sheet.slots.default.description',
            descriptionFallback: 'Main sheet content. Rendered after the drag handle (when swipeable=true).'
        }
    ],

    examples: [
        {
            titleKey: 'components.sheet.examples.basic.title',
            titleFallback: 'Basic surface',
            lang: 'vue',
            code: `<template>
  <origam-sheet rounded="lg" elevation="4" style="padding: 1.5rem;">
    <h3>Sheet surface</h3>
    <p>A generic elevated container.</p>
  </origam-sheet>
</template>`
        },
        {
            titleKey: 'components.sheet.examples.bottom_sheet.title',
            titleFallback: 'Bottom sheet (swipeable)',
            lang: 'vue',
            code: `<template>
  <origam-sheet
    v-model:open="open"
    side="bottom"
    :swipeable="true"
    default-snap="half"
    style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 400;"
  >
    <div style="padding: 1.5rem;">
      <p>Drag the handle to expand or dismiss.</p>
    </div>
  </origam-sheet>
</template>
<script setup>
const open = ref(true)
</script>`
        },
        {
            titleKey: 'components.sheet.examples.custom_snaps.title',
            titleFallback: 'Custom snap points',
            lang: 'vue',
            code: `<template>
  <origam-sheet
    side="bottom"
    :swipeable="true"
    :snap-points="[
      { id: 'closed', height: 0 },
      { id: 'peek',   height: '80px' },
      { id: 'full',   height: '85vh' }
    ]"
    default-snap="peek"
  >
    <slot />
  </origam-sheet>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default',  props: { bgColor: 'surface', rounded: 'md', elevation: '2' }, slotContent: 'Sheet surface' },
        { label: 'colored',  props: { bgColor: 'primary', color: 'white', rounded: 'lg' }, slotContent: 'Colored sheet' },
        { label: 'outlined', props: { border: true, rounded: 'lg' }, slotContent: 'Outlined' },
        { label: 'elevated', props: { elevation: '8', rounded: 'xl' }, slotContent: 'Elevated' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-sheet',
        svgViewBox: '0 0 520 200',
        svgTitle: 'Anatomy of OrigamSheet',
        svgDesc: 'Schematic of the Sheet component with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="520" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="30" width="480" height="150" rx="12" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="215" y="46" width="90" height="8" rx="4" fill="var(--origam-color__border---subtle, rgba(124,58,237,0.3))"/>
  <text x="260" y="105" font-size="12" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <circle cx="28" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="260" cy="40" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="260" y="44" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="40" cy="105" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="40" y="109" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-sheet&gt;</code> — 3 parts: root surface ①, drag handle (when swipeable) ②, and default slot content ③.`,
        legend: [
            {
                num: 1,
                cls: '.origam-sheet',
                descriptionKey: 'components.sheet.anatomy.root',
                descriptionFallback: 'Root element. Polymorphic (tag prop). Carries all BEM modifiers and CSS variable overrides from tokens.'
            },
            {
                num: 2,
                cls: '.origam-sheet__handle / .origam-sheet__handle-pill',
                descriptionKey: 'components.sheet.anatomy.handle',
                descriptionFallback: 'Drag handle rendered only when swipeable=true and side="bottom". Has role="button" and tabindex="0" for keyboard accessibility.'
            },
            {
                num: 3,
                cls: '#default slot',
                descriptionKey: 'components.sheet.anatomy.content',
                descriptionFallback: 'Main content area. Rendered below the handle when swipeable.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<component :is="tag" class="origam-sheet">
  <!-- drag handle — shown when swipeable + side="bottom" -->
  <div
    v-if="showHandle"
    class="origam-sheet__handle"
    role="button"
    tabindex="0"
    aria-label="Drag handle"
  >
    <span class="origam-sheet__handle-pill" />
  </div>

  <!-- main content -->
  <slot name="default" />
</component>`,
        classes: [
            { cls: 'origam-sheet', descriptionKey: 'components.sheet.anatomy.root', descriptionFallback: 'Root block. Polymorphic surface.' },
            { cls: 'origam-sheet__handle', descriptionKey: 'components.sheet.anatomy.handle', descriptionFallback: 'Handle zone. Pointer-events target for swipe gesture.' },
            { cls: 'origam-sheet__handle-pill', descriptionKey: 'components.sheet.anatomy.handle_pill', descriptionFallback: 'Visual pill indicator inside the handle.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-sheet---background',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.sheet.css_vars.background',
            descriptionFallback: 'Surface background color.'
        },
        {
            name: '--origam-sheet---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.sheet.css_vars.color',
            descriptionFallback: 'Surface foreground color.'
        },
        {
            name: '--origam-sheet---box-shadow',
            defaultValue: '{shadow.none}',
            descriptionKey: 'components.sheet.css_vars.box_shadow',
            descriptionFallback: 'Box-shadow elevation. Overridden by elevation prop.'
        },
        {
            name: '--origam-sheet---swipe-height',
            defaultValue: '50vh',
            descriptionKey: 'components.sheet.css_vars.swipe_height',
            descriptionFallback: 'Live height driven by the swipe gesture composable. Updated on every pointer-move frame during a drag.'
        },
        {
            name: '--origam-sheet__handle---width',
            defaultValue: '32px',
            descriptionKey: 'components.sheet.css_vars.handle_width',
            descriptionFallback: 'Width of the drag handle pill.'
        },
        {
            name: '--origam-sheet__handle---height',
            defaultValue: '4px',
            descriptionKey: 'components.sheet.css_vars.handle_height',
            descriptionFallback: 'Height of the drag handle pill.'
        },
        {
            name: '--origam-sheet__handle---color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.sheet.css_vars.handle_color',
            descriptionFallback: 'Background color of the drag handle pill.'
        },
        {
            name: '--origam-sheet__swipeable---border-radius',
            defaultValue: '{radius.2xl}',
            descriptionKey: 'components.sheet.css_vars.swipeable_border_radius',
            descriptionFallback: 'Border-radius applied to top corners when swipeable=true.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.sheet.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'snapTo',
            type: '(id: TSheetSnapId) => void',
            descriptionKey: 'components.sheet.exposed.snap_to',
            descriptionFallback: 'Imperatively snap the sheet to a given snap-point id.'
        },
        {
            name: 'currentSnap',
            type: 'Ref<TSheetSnapId>',
            descriptionKey: 'components.sheet.exposed.current_snap',
            descriptionFallback: 'Reactive current snap-point id.'
        },
        {
            name: 'isDragging',
            type: 'Ref<boolean>',
            descriptionKey: 'components.sheet.exposed.is_dragging',
            descriptionFallback: 'True while the user is dragging the sheet handle.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.sheet.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.sheet.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.sheet.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.sheet.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.sheet.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab (handle)',
                actionKey: 'components.sheet.a11y.key_tab',
                actionFallback: 'Focuses the drag handle button when swipeable=true.'
            },
            {
                key: 'Enter / Space (handle)',
                actionKey: 'components.sheet.a11y.key_enter',
                actionFallback: 'Cycles through snap points when the handle is focused.'
            }
        ],
        notes: [
            {
                noteKey: 'components.sheet.a11y.handle_note',
                noteFallback: 'The drag handle has role="button", tabindex="0" and aria-label="Drag handle" so keyboard users can navigate snap points without touch.'
            },
            {
                noteKey: 'components.sheet.a11y.reduced_motion_note',
                noteFallback: 'Under prefers-reduced-motion, the height transition is disabled. Height still changes imperatively but without animation.'
            },
            {
                noteKey: 'components.sheet.a11y.overlay_note',
                noteFallback: 'OrigamSheet is a surface-only primitive. Overlay focus-trap and aria-modal semantics are managed by the Dialog or Drawer wrapper using this component.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/sheet.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'sheet.background',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.sheet.tokens.background',
                descriptionFallback: 'Surface background color.'
            },
            {
                tokenPath: 'sheet.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.sheet.tokens.color',
                descriptionFallback: 'Surface text color.'
            },
            {
                tokenPath: 'sheet.handle.width',
                value: '32px',
                type: 'dimension',
                descriptionKey: 'components.sheet.tokens.handle_width',
                descriptionFallback: 'Handle pill width.'
            },
            {
                tokenPath: 'sheet.handle.height',
                value: '4px',
                type: 'dimension',
                descriptionKey: 'components.sheet.tokens.handle_height',
                descriptionFallback: 'Handle pill height.'
            },
            {
                tokenPath: 'sheet.handle.color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.sheet.tokens.handle_color',
                descriptionFallback: 'Handle pill color.'
            },
            {
                tokenPath: 'sheet.swipeable.border-radius',
                value: '{radius.2xl}',
                type: 'dimension',
                descriptionKey: 'components.sheet.tokens.swipeable_border_radius',
                descriptionFallback: 'Top-corner border-radius in swipeable mode.'
            },
            {
                tokenPath: 'sheet.bottom.snap-peek',
                value: '120px',
                type: 'dimension',
                descriptionKey: 'components.sheet.tokens.snap_peek',
                descriptionFallback: 'Default peek snap-point height.'
            },
            {
                tokenPath: 'sheet.bottom.snap-half',
                value: '50vh',
                type: 'dimension',
                descriptionKey: 'components.sheet.tokens.snap_half',
                descriptionFallback: 'Default half-expanded snap-point height.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Sheet content',
        controls: [
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.sheet.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: 'md',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' },
                    { label: 'xl', value: 'xl' },
                    { label: '2xl', value: '2xl' }
                ]
            },
            {
                prop: 'elevation',
                kind: 'select',
                labelKey: 'components.sheet.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '4', value: '4' },
                    { label: '8', value: '8' }
                ]
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.sheet.playground.border',
                labelFallback: 'Border',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.sheet.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
