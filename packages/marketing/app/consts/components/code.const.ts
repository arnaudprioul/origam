/**
 * /components/code — full documentation data for OrigamCode.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Code/code.interface.ts  (ICodeProps, IUseCodeReturn)
 *   - packages/ds/src/components/Code/OrigamCode.vue     (template, defineExpose)
 *   - packages/ds/tokens/component/code.json             (CSS tokens)
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
    IComponentAnatomyLegendItem,
    IComponentComposable
} from '~/interfaces/components-catalog.interface'

export const CODE_DOC: IComponentDoc = {
    slug: 'code',
    name: 'Code',
    tag: 'origam-code',
    icon: 'mdi-code-braces',
    category: 'Display',
    descriptionKey: 'components.catalog.code.description',
    descriptionFallback: 'Shiki-powered syntax-highlighted code block with optional line numbers, line highlighting, copy button, filename header, compact pill mode and theme awareness. Supports 14 languages and honours the active Origam theme.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-code--design',
    docUrl: 'http://localhost:4000/components/Code/OrigamCode',

    family: [],
    related: [
        {
            slug: 'clipboard',
            name: 'Clipboard',
            kind: 'component',
            descriptionKey: 'components.catalog.clipboard.description',
            descriptionFallback: 'Copy-to-clipboard primitive used internally by OrigamCode for the copyable feature.'
        }
    ],

    props: [
        {
            name: 'code',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.code.description',
            descriptionFallback: 'Code to highlight. When omitted, the default slot is used as the source. When both are provided, the prop wins.'
        },
        {
            name: 'lang',
            type: { label: 'TCodeLang', slug: 'code-lang', kind: 'type' },
            defaultValue: "'plaintext'",
            descriptionKey: 'components.code.props.lang.description',
            descriptionFallback: "Language grammar to apply. Supported: 'plaintext' | 'vue' | 'ts' | 'js' | 'tsx' | 'jsx' | 'scss' | 'css' | 'json' | 'bash' | 'html' | 'xml' | 'yaml' | 'md'. Unknown values fall back to plaintext."
        },
        {
            name: 'lineNumbers',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.code.props.line_numbers.description',
            descriptionFallback: 'Shows a left gutter with line numbers. Pure CSS counter — no JS layout work.'
        },
        {
            name: 'highlightLines',
            type: { label: 'number[] | string | null', slug: '', kind: 'primitive' },
            defaultValue: 'null',
            descriptionKey: 'components.code.props.highlight_lines.description',
            descriptionFallback: "Lines to highlight. Accepts a 1-based array ([2, 5, 6]) or a range string ('2,5-7'). Null/empty disables."
        },
        {
            name: 'copyable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.code.props.copyable.description',
            descriptionFallback: 'Shows the copy-to-clipboard button. True by default — most code blocks benefit from it.'
        },
        {
            name: 'filename',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.filename.description',
            descriptionFallback: "Optional filename rendered in the header bar (e.g. 'App.vue'). When present AND copyable=true, the header hosts the copy button; otherwise the copy button floats in the top-right corner."
        },
        {
            name: 'compact',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.code.props.compact.description',
            descriptionFallback: 'Renders as a single-line inline pill (ideal for install commands). Header, filename and line numbers are suppressed; the copy button collapses to a small icon.'
        },
        {
            name: 'prompt',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.prompt.description',
            descriptionFallback: "Decorative prefix rendered before the code (e.g. '$' for shell commands). Purely visual — not copied to clipboard."
        },
        {
            name: 'wrap',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.code.props.wrap.description',
            descriptionFallback: 'Wraps long lines instead of scrolling horizontally.'
        },
        {
            name: 'format',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.code.props.format.description',
            descriptionFallback: 'Auto-format the code before highlighting. Reserved — currently a no-op that warns in dev mode. Prettier is not bundled at runtime to keep the tarball small.'
        },
        // ── IBorderProps / IRoundedProps / IElevationProps ─────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.code.props.border.description',
            descriptionFallback: 'Applies a border to the code block.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.rounded.description',
            descriptionFallback: 'Border-radius override.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation token.'
        },
        // ── IDimensionProps ────────────────────────────────────────────
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.height.description',
            descriptionFallback: 'Explicit height. The scroller fills the remaining height in a constrained container.'
        },
        {
            name: 'maxHeight',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.max_height.description',
            descriptionFallback: 'Maximum height. Content scrolls when the code overflows.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.color.description',
            descriptionFallback: 'Foreground color override.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.code.props.bg_color.description',
            descriptionFallback: 'Background color override.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'figure'",
            descriptionKey: 'components.code.props.tag.description',
            descriptionFallback: 'Root HTML element. Defaults to <figure> for semantic correctness.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.code.slots.default.description',
            descriptionFallback: 'Source code as slot text. Used when the code prop is absent. Whitespace is preserved.'
        },
        {
            slot: 'header',
            slotProps: '{ filename, langName, copy, copied }',
            descriptionKey: 'components.code.slots.header.description',
            descriptionFallback: 'Replaces the default header bar (filename/lang badge + copy button). Receives filename, lang name, the copy function and the copied flag.'
        },
        {
            slot: 'footer',
            slotProps: '—',
            descriptionKey: 'components.code.slots.footer.description',
            descriptionFallback: 'Content appended after the code block inside a <footer> element.'
        }
    ],

    examples: [
        {
            titleKey: 'components.code.examples.basic.title',
            titleFallback: 'Basic code block',
            lang: 'vue',
            code: `<template>
  <origam-code
    lang="vue"
    :code="snippet"
    :line-numbers="true"
    copyable
  />
</template>

<script setup lang="ts">
const snippet = \`<origam-btn color="primary" text="Hello!" />\`
</script>`
        },
        {
            titleKey: 'components.code.examples.compact.title',
            titleFallback: 'Compact install command',
            lang: 'vue',
            code: `<template>
  <origam-code
    compact
    lang="bash"
    code="npm install origam"
    prompt="$"
    copyable
  />
</template>`
        },
        {
            titleKey: 'components.code.examples.highlight.title',
            titleFallback: 'Line highlighting',
            lang: 'vue',
            code: `<template>
  <origam-code
    lang="ts"
    :code="tsCode"
    highlight-lines="2,4-6"
    filename="example.ts"
    copyable
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { lang: 'ts', code: "const x: number = 42", copyable: true }, slotContent: '' },
        { label: 'compact', props: { lang: 'bash', code: 'npm install origam', compact: true, prompt: '$' }, slotContent: '' },
        { label: 'with filename', props: { lang: 'vue', code: '<origam-btn />', filename: 'App.vue' }, slotContent: '' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-code',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamCode',
        svgDesc: 'Schematic of the Code component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="190" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="20" width="660" height="36" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.06))"/>
  <text x="48" y="43" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">App.vue</text>
  <text x="620" y="43" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">Copy</text>
  <rect x="20" y="56" width="660" height="120" rx="0" fill="var(--origam-color__surface---sunken, #f8f5ff)"/>
  <rect x="20" y="80" width="660" height="20" rx="0" fill="var(--origam-color__feedback--warning---bgSubtle, rgba(180,130,0,0.12))"/>
  <text x="60" y="93" font-size="11" fill="var(--origam-color__text---primary, #1a0f3c)" font-family="'JetBrains Mono',monospace">const <tspan fill="var(--origam-color__feedback--info---fgSubtle, #0369a1)">x</tspan> = <tspan fill="var(--origam-color__feedback--warning---fgSubtle, #b45309)">42</tspan></text>
  <rect x="20" y="176" width="660" height="34" rx="0" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.04))"/>
  <text x="350" y="197" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">#footer slot</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="36" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="620" cy="36" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="620" y="40" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="28" cy="80" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="350" cy="116" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="120" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="28" cy="176" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="28" y="180" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-code&gt;</code> — 6 internal parts. Root is <code>&lt;figure&gt;</code> for W3C correctness.`,
        legend: [
            { num: 1, cls: '.origam-code', descriptionKey: 'components.code.anatomy.root', descriptionFallback: 'Root element (default tag: <figure>). Carries display, background, border, font-family and overflow tokens.' },
            { num: 2, cls: '.origam-code__header', descriptionKey: 'components.code.anatomy.header', descriptionFallback: 'Header bar rendered when filename is set. Contains the filename badge or lang badge and the copy button.' },
            { num: 3, cls: '.origam-code__copy', descriptionKey: 'components.code.anatomy.copy', descriptionFallback: 'OrigamBtn copy button. Positioned in the header (--header), floating top-right (--floating) or inline in compact mode (--compact).' },
            { num: 4, cls: '.origam-code__scroller', descriptionKey: 'components.code.anatomy.scroller', descriptionFallback: 'Scrollable area wrapping the <pre><code> pair. flex: 1 1 auto in non-compact mode so it fills a constrained height.' },
            { num: 5, cls: '.origam-code__pre / .origam-code__code', descriptionKey: 'components.code.anatomy.pre', descriptionFallback: '<pre><code> semantic pair. The <code> element carries data-lang and receives the shiki-highlighted innerHTML.' },
            { num: 6, cls: '.origam-code__footer', descriptionKey: 'components.code.anatomy.footer', descriptionFallback: '<footer> wrapper for the #footer slot. Only rendered when the footer slot is provided.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<figure class="origam-code">
  <!-- header bar: filename or lang badge + copy button -->
  <component :is="headerTag" class="origam-code__header">
    <span class="origam-code__filename">App.vue</span>
    <origam-btn class="origam-code__copy origam-code__copy--header" />
  </component>

  <!-- floating copy button (no header) -->
  <origam-btn class="origam-code__copy origam-code__copy--floating" />

  <!-- shell prompt prefix (compact only) -->
  <span class="origam-code__prompt" aria-hidden="true">$</span>

  <!-- scrollable code area -->
  <div class="origam-code__scroller">
    <pre class="origam-code__pre">
      <code ref="codeRef" class="origam-code__code" data-lang="ts" />
    </pre>
  </div>

  <!-- compact inline copy button -->
  <origam-btn class="origam-code__copy origam-code__copy--compact" />

  <!-- footer slot -->
  <footer class="origam-code__footer">
    <slot name="footer" />
  </footer>
</figure>`,
        classes: [
            { cls: 'origam-code', descriptionKey: 'components.code.anatomy.root', descriptionFallback: 'Root figure element.' },
            { cls: 'origam-code--compact', descriptionKey: 'components.code.anatomy.mod_compact', descriptionFallback: 'BEM modifier for compact pill mode. Switches display to inline-flex.' },
            { cls: 'origam-code__header', descriptionKey: 'components.code.anatomy.header', descriptionFallback: 'Header bar with filename/lang and copy button.' },
            { cls: 'origam-code__filename', descriptionKey: 'components.code.anatomy.filename', descriptionFallback: 'Filename badge in the header.' },
            { cls: 'origam-code__lang-badge', descriptionKey: 'components.code.anatomy.lang_badge', descriptionFallback: 'Language badge in the header when no filename is set.' },
            { cls: 'origam-code__copy', descriptionKey: 'components.code.anatomy.copy', descriptionFallback: 'Copy button (variants: --header, --floating, --compact).' },
            { cls: 'origam-code__scroller', descriptionKey: 'components.code.anatomy.scroller', descriptionFallback: 'Overflow-x: auto scroll container.' },
            { cls: 'origam-code__pre', descriptionKey: 'components.code.anatomy.pre', descriptionFallback: '<pre> element. Margin 0, white-space: pre.' },
            { cls: 'origam-code__code', descriptionKey: 'components.code.anatomy.code', descriptionFallback: '<code> element receiving shiki innerHTML.' },
            { cls: 'origam-code__row', descriptionKey: 'components.code.anatomy.row', descriptionFallback: 'One line row. Used for line numbers (CSS counter) and line highlighting.' },
            { cls: 'origam-code__prompt', descriptionKey: 'components.code.anatomy.prompt', descriptionFallback: 'Decorative shell prompt prefix (aria-hidden).' },
            { cls: 'origam-code__footer', descriptionKey: 'components.code.anatomy.footer', descriptionFallback: '<footer> element for the #footer slot.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-code---background-color',
            defaultValue: '{color.surface.sunken}',
            descriptionKey: 'components.code.css_vars.bg',
            descriptionFallback: 'Code block background colour.'
        },
        {
            name: '--origam-code---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.code.css_vars.color',
            descriptionFallback: 'Default foreground colour for non-highlighted tokens.'
        },
        {
            name: '--origam-code---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.code.css_vars.border_radius',
            descriptionFallback: 'Border radius.'
        },
        {
            name: '--origam-code---font-family',
            defaultValue: '{font.family.mono}',
            descriptionKey: 'components.code.css_vars.font_family',
            descriptionFallback: 'Monospace font stack.'
        },
        {
            name: '--origam-code---font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.code.css_vars.font_size',
            descriptionFallback: 'Font size.'
        },
        {
            name: '--origam-code---line-height',
            defaultValue: '1.6',
            descriptionKey: 'components.code.css_vars.line_height',
            descriptionFallback: 'Line height of code rows.'
        },
        {
            name: '--origam-code---padding-block',
            defaultValue: '{space.4}',
            descriptionKey: 'components.code.css_vars.padding_block',
            descriptionFallback: 'Vertical padding inside the code surface.'
        },
        {
            name: '--origam-code---padding-inline',
            defaultValue: '{space.4}',
            descriptionKey: 'components.code.css_vars.padding_inline',
            descriptionFallback: 'Horizontal padding inside the code surface.'
        },
        {
            name: '--origam-code__header---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.code.css_vars.header_bg',
            descriptionFallback: 'Header bar background.'
        },
        {
            name: '--origam-code__line-highlight---background-color',
            defaultValue: '{color.feedback.warning.bgSubtle}',
            descriptionKey: 'components.code.css_vars.line_highlight_bg',
            descriptionFallback: 'Background of highlighted lines.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'rebuild',
            type: '() => void',
            descriptionKey: 'components.code.exposed.rebuild',
            descriptionFallback: 'Force re-highlights the code. Useful when the theme changes or the code prop is mutated without Vue reactivity.'
        },
        {
            name: 'copied',
            type: 'Ref<boolean>',
            descriptionKey: 'components.code.exposed.copied',
            descriptionFallback: 'True for feedbackDuration ms after a successful copy.'
        },
        {
            name: 'codeRef',
            type: 'Ref<HTMLElement | undefined>',
            descriptionKey: 'components.code.exposed.code_ref',
            descriptionFallback: 'Template ref pointing to the inner <code> element. Useful for external syntax processing or DOM inspection.'
        }
    ] satisfies IComponentExposed[],

    composable: {
        name: 'useCode',
        importPath: "import { useCode } from 'origam'",
        descriptionKey: 'components.code.composable.description',
        descriptionFallback: 'Lazily instantiates a shiki highlighter singleton on first call and reuses it across every OrigamCode instance. Exposes highlight(), prime(), isReady() and resetCacheForTesting().',
        signature: `interface IUseCodeReturn {
  highlight(code: string, lang: TCodeLang): Promise<string>
  prime(): Promise<void>
  isReady(): boolean
  resetCacheForTesting(): void
}

function useCode(): IUseCodeReturn`,
        usageCode: `<script setup lang="ts">
import { useCode } from 'origam'

const { highlight, prime, isReady } = useCode()

// Warm the cache before component mount
await prime()

const html = await highlight('const x = 42', 'ts')
</script>`
    } satisfies IComponentComposable,

    a11y: {
        roles: ['figure'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.code.a11y.key_tab',
                actionFallback: 'Moves focus to the copy button when copyable=true.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.code.a11y.key_activate',
                actionFallback: 'Triggers the copy action on the focused copy button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.code.a11y.semantic',
                noteFallback: 'Root element defaults to <figure> for W3C correctness. The code block is rendered inside <pre><code data-lang="..."> which gives screen readers proper semantic context.'
            },
            {
                noteKey: 'components.code.a11y.copy_aria',
                noteFallback: 'The copy button aria-label and aria-live="polite" are set so screen readers announce "Copied" after a successful write without interrupting the current reading.'
            },
            {
                noteKey: 'components.code.a11y.prompt_hidden',
                noteFallback: 'The prompt prefix (<span aria-hidden="true">) is decorative — it is never read aloud and is never included in the clipboard payload.'
            },
            {
                noteKey: 'components.code.a11y.scrollable',
                noteFallback: 'The scrollable code area is focusable via keyboard when content overflows, allowing keyboard users to scroll horizontally.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/code.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'code.background-color', value: '{color.surface.sunken}', type: 'color', descriptionKey: 'components.code.tokens.bg', descriptionFallback: 'Block background.' },
            { tokenPath: 'code.border-radius', value: '{radius.md}', type: 'dimension', descriptionKey: 'components.code.tokens.border_radius', descriptionFallback: 'Corner radius.' },
            { tokenPath: 'code.font-family', value: '{font.family.mono}', type: 'fontFamily', descriptionKey: 'components.code.tokens.font_family', descriptionFallback: 'Monospace font stack.' },
            { tokenPath: 'code.font-size', value: '{font.size.sm}', type: 'dimension', descriptionKey: 'components.code.tokens.font_size', descriptionFallback: 'Font size.' },
            { tokenPath: 'code.syntax.keyword', value: '{color.feedback.danger.fgSubtle}', type: 'color', descriptionKey: 'components.code.tokens.syntax_keyword', descriptionFallback: 'Keyword token colour.' },
            { tokenPath: 'code.syntax.string', value: '{color.feedback.success.fgSubtle}', type: 'color', descriptionKey: 'components.code.tokens.syntax_string', descriptionFallback: 'String token colour.' },
            { tokenPath: 'code.syntax.function', value: '{color.feedback.info.fgSubtle}', type: 'color', descriptionKey: 'components.code.tokens.syntax_function', descriptionFallback: 'Function token colour.' },
            { tokenPath: 'code.line-highlight.background-color', value: '{color.feedback.warning.bgSubtle}', type: 'color', descriptionKey: 'components.code.tokens.line_highlight_bg', descriptionFallback: 'Highlighted line background.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'lang',
                kind: 'select',
                labelKey: 'components.code.playground.lang',
                labelFallback: 'Language',
                defaultValue: 'ts',
                options: [
                    { label: 'plaintext', value: 'plaintext' },
                    { label: 'vue', value: 'vue' },
                    { label: 'ts', value: 'ts' },
                    { label: 'js', value: 'js' },
                    { label: 'scss', value: 'scss' },
                    { label: 'css', value: 'css' },
                    { label: 'json', value: 'json' },
                    { label: 'bash', value: 'bash' },
                    { label: 'html', value: 'html' }
                ]
            },
            {
                prop: 'lineNumbers',
                kind: 'switch',
                labelKey: 'components.code.playground.line_numbers',
                labelFallback: 'Line numbers',
                defaultValue: false
            },
            {
                prop: 'copyable',
                kind: 'switch',
                labelKey: 'components.code.playground.copyable',
                labelFallback: 'Copyable',
                defaultValue: true
            },
            {
                prop: 'compact',
                kind: 'switch',
                labelKey: 'components.code.playground.compact',
                labelFallback: 'Compact',
                defaultValue: false
            },
            {
                prop: 'wrap',
                kind: 'switch',
                labelKey: 'components.code.playground.wrap',
                labelFallback: 'Wrap lines',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
