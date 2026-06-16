/**
 * /components/blockquote — full documentation data for OrigamBlockquote.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Blockquote/blockquote.interface.ts  (props)
 *   - packages/ds/src/components/Blockquote/OrigamBlockquote.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/blockquote.json                   (CSS tokens)
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

export const BLOCKQUOTE_DOC: IComponentDoc = {
    slug: 'blockquote',
    name: 'Blockquote',
    tag: 'origam-blockquote',
    icon: 'mdi-format-quote-open',
    category: 'Typography',
    descriptionKey: 'components.catalog.blockquote.description',
    descriptionFallback: 'Typographic citation component with five visual variants, author/source attribution and locale-aware decorative quote marks.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-blockquote--design',
    docUrl: 'http://localhost:4000/components/Blockquote/OrigamBlockquote',

    family: [],

    props: [
        {
            name: 'variant',
            type: { label: 'TBlockquoteVariant', slug: 'blockquote-variant', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.blockquote.props.variant.description',
            descriptionFallback: 'Visual variant: "default" = left accent bar, "elegant" = serif italic, "quoted" = decorative glyph background, "pull" = centered large pull quote with top/bottom rules, "minimal" = thin bar with smaller text.'
        },
        {
            name: 'author',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.blockquote.props.author.description',
            descriptionFallback: 'Author of the citation rendered as "— Author" in the attribution footer. Can be overridden via the #author slot.'
        },
        {
            name: 'source',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.blockquote.props.source.description',
            descriptionFallback: 'Source label (book, publication, URL label) appended after the author as ", Source". Wrapped in <cite> when the cite prop is set.'
        },
        {
            name: 'cite',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.blockquote.props.cite.description',
            descriptionFallback: 'URL the citation references. Maps to the native cite attribute on the rendered <blockquote>.'
        },
        {
            name: 'lang',
            type: { label: 'TBlockquoteLang', slug: 'blockquote-lang', kind: 'type' },
            defaultValue: "'auto'",
            descriptionKey: 'components.blockquote.props.lang.description',
            descriptionFallback: 'Locale hint for decorative quote marks (variant="quoted"). "auto" reads document.documentElement.lang at mount, falling back to "en".'
        },
        {
            name: 'align',
            type: { label: 'TBlockquoteAlign', slug: 'blockquote-align', kind: 'type' },
            defaultValue: "'left'",
            descriptionKey: 'components.blockquote.props.align.description',
            descriptionFallback: 'Text alignment. The pull variant forces "center" when this prop is not set. Accepts "left", "center" or "right".'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'blockquote'",
            descriptionKey: 'components.blockquote.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <blockquote>; use "q" for inline citations.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.blockquote.props.color.description',
            descriptionFallback: 'Text color axis. Tokenised intents resolve to their fgSubtle shade; custom values are applied verbatim.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.blockquote.props.bg_color.description',
            descriptionFallback: 'Accent color axis: drives the decorative bar / pull rules, the background quote glyph and the author label. Does NOT paint a surface fill.'
        },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.blockquote.props.rounded.description', descriptionFallback: 'Border-radius token or boolean.' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.blockquote.props.elevation.description', descriptionFallback: 'Box-shadow elevation token.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.blockquote.props.border.description', descriptionFallback: 'Applies a border. Distinct from the variant accent bar.' },
        { name: 'padding', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.blockquote.props.padding.description', descriptionFallback: 'Custom padding overriding token defaults.' },
        { name: 'margin', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.blockquote.props.margin.description', descriptionFallback: 'Custom margin. The component imposes no margin by default.' }
    ],

    emits: [],

    slots: [
        { slot: 'default', slotProps: '—', descriptionKey: 'components.blockquote.slots.default.description', descriptionFallback: 'Citation body content. Rendered inside the __body div.' },
        { slot: 'author', slotProps: '—', descriptionKey: 'components.blockquote.slots.author.description', descriptionFallback: 'Custom author rendering (link, badge, locale-formatted name). Wins over the author prop.' },
        { slot: 'source', slotProps: '—', descriptionKey: 'components.blockquote.slots.source.description', descriptionFallback: 'Custom source rendering. Wins over the source prop. Wrapped in <cite> by default.' }
    ],

    examples: [
        {
            titleKey: 'components.blockquote.examples.default.title',
            titleFallback: 'Default variant',
            lang: 'vue',
            code: `<template>
  <origam-blockquote
    author="Marcus Aurelius"
    source="Meditations, Book II"
    cite="https://example.com/meditations"
  >
    You have power over your mind — not outside events. Realise this, and you will find strength.
  </origam-blockquote>
</template>`
        },
        {
            titleKey: 'components.blockquote.examples.pull.title',
            titleFallback: 'Pull-quote variant',
            lang: 'vue',
            code: `<template>
  <origam-blockquote
    variant="pull"
    bg-color="primary"
    author="Origam Team"
  >
    Design systems are the grammar of interface design.
  </origam-blockquote>
</template>`
        },
        {
            titleKey: 'components.blockquote.examples.quoted.title',
            titleFallback: 'Quoted with locale marks',
            lang: 'vue',
            code: `<template>
  <origam-blockquote
    variant="quoted"
    lang="fr"
    bg-color="secondary"
    author="Victor Hugo"
    source="Les Misérables"
  >
    Ceux qui vivent sont ceux qui luttent.
  </origam-blockquote>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { variant: 'default', bgColor: 'primary', author: 'Author' }, slotContent: 'A wise quotation about design.' },
        { label: 'elegant', props: { variant: 'elegant', bgColor: 'secondary' }, slotContent: 'An elegant serif citation in italics.' },
        { label: 'pull', props: { variant: 'pull', bgColor: 'primary', align: 'center' }, slotContent: 'A large centered pull quote for editorial use.' },
        { label: 'minimal', props: { variant: 'minimal', bgColor: 'neutral' }, slotContent: 'A minimal sidebar annotation.' },
        { label: 'quoted', props: { variant: 'quoted', bgColor: 'info' }, slotContent: 'A citation with a decorative background glyph.' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-blockquote',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamBlockquote',
        svgDesc: 'Schematic of the Blockquote component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="180" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="20" width="6" height="180" rx="2" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="50" font-size="28" fill="var(--origam-color__action--primary---bg, #7c3aed)" opacity="0.12" font-family="serif" font-weight="700">"</text>
  <rect x="36" y="30" width="630" height="100" rx="3" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.02))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="351" y="85" font-size="11" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot — citation body</text>
  <rect x="36" y="145" width="630" height="40" rx="3" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.15))" stroke-width="1"/>
  <text x="351" y="170" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">— Author, Source</text>
  <circle cx="22" cy="22" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="22" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="28" cy="22" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="28" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="50" cy="22" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="50" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="40" cy="145" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="40" y="149" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="660" cy="22" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="660" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-blockquote&gt;</code> — 5 parts: root ①, accent bar ②, quote mark glyph ③ (variant="quoted" only), body ④, attribution footer ⑤ (author + source).',
        legend: [
            { num: 1, cls: '.origam-blockquote', descriptionKey: 'components.blockquote.anatomy.root', descriptionFallback: 'Root element. Defaults to <blockquote>; overridable via tag. Carries variant, align, color and accent modifier classes.' },
            { num: 2, cls: '.origam-blockquote__mark--bg', descriptionKey: 'components.blockquote.anatomy.mark', descriptionFallback: 'Decorative opening quote glyph. Absolute, z-index 0, opacity ~0.08. Visible only in variant="quoted".' },
            { num: 3, cls: '.origam-blockquote__body', descriptionKey: 'components.blockquote.anatomy.body', descriptionFallback: 'Citation body wrapper. z-index 1 in quoted variant to sit above the glyph.' },
            { num: 4, cls: '.origam-blockquote__attribution', descriptionKey: 'components.blockquote.anatomy.attribution', descriptionFallback: 'Footer <footer> containing the author span, separator and source <cite>. Renders only when author or source is present.' },
            { num: 5, cls: '.origam-blockquote__source', descriptionKey: 'components.blockquote.anatomy.source', descriptionFallback: '<cite> element wrapping the source label. Receives source---color token for secondary italic styling.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<blockquote class="origam-blockquote origam-blockquote--variant-default">
  <!-- Decorative glyph (variant="quoted" only) -->
  <span class="origam-blockquote__mark origam-blockquote__mark--bg" aria-hidden="true">"</span>

  <!-- Citation body — #default slot -->
  <div class="origam-blockquote__body">
    <slot />
  </div>

  <!-- Attribution footer (v-if="hasAttribution") -->
  <footer class="origam-blockquote__attribution">
    <span class="origam-blockquote__dash" aria-hidden="true">— </span>
    <span class="origam-blockquote__author">
      <slot name="author">{{ author }}</slot>
    </span>
    <span class="origam-blockquote__separator" aria-hidden="true">, </span>
    <cite class="origam-blockquote__source">
      <slot name="source">{{ source }}</slot>
    </cite>
  </footer>
</blockquote>`,
        rootClass: 'origam-blockquote',
        classes: [
            { cls: 'origam-blockquote', descriptionKey: 'components.blockquote.anatomy.root_class', descriptionFallback: 'Root element.' },
            { cls: 'origam-blockquote__mark', descriptionKey: 'components.blockquote.anatomy.mark_class', descriptionFallback: 'Quote glyph container (aria-hidden).' },
            { cls: 'origam-blockquote__mark--bg', descriptionKey: 'components.blockquote.anatomy.mark_bg_class', descriptionFallback: 'Absolute positioned large background glyph for quoted variant.' },
            { cls: 'origam-blockquote__body', descriptionKey: 'components.blockquote.anatomy.body_class', descriptionFallback: 'Citation body block.' },
            { cls: 'origam-blockquote__attribution', descriptionKey: 'components.blockquote.anatomy.attribution_class', descriptionFallback: '<footer> for author and source.' },
            { cls: 'origam-blockquote__author', descriptionKey: 'components.blockquote.anatomy.author_class', descriptionFallback: 'Author name span.' },
            { cls: 'origam-blockquote__source', descriptionKey: 'components.blockquote.anatomy.source_class', descriptionFallback: '<cite> wrapping the source label.' },
            { cls: 'origam-blockquote__dash', descriptionKey: 'components.blockquote.anatomy.dash_class', descriptionFallback: 'Em-dash before author (aria-hidden).' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-blockquote---padding-block', defaultValue: '{space.4}', descriptionKey: 'components.blockquote.css_vars.padding_block', descriptionFallback: 'Block padding of the citation container.' },
        { name: '--origam-blockquote---padding-inline', defaultValue: '{space.6}', descriptionKey: 'components.blockquote.css_vars.padding_inline', descriptionFallback: 'Inline padding. Expanded by the accent bar width in default/elegant variants.' },
        { name: '--origam-blockquote---font-size', defaultValue: '{font.size.lg}', descriptionKey: 'components.blockquote.css_vars.font_size', descriptionFallback: 'Citation body font size.' },
        { name: '--origam-blockquote---font-style', defaultValue: 'normal', descriptionKey: 'components.blockquote.css_vars.font_style', descriptionFallback: 'Font style. Overridden to italic in elegant and minimal variants.' },
        { name: '--origam-blockquote---line-height', defaultValue: '{font.lineHeight.relaxed}', descriptionKey: 'components.blockquote.css_vars.line_height', descriptionFallback: 'Citation body line-height.' },
        { name: '--origam-blockquote---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.blockquote.css_vars.color', descriptionFallback: 'Citation text color. Overridden by color intent classes.' },
        { name: '--origam-blockquote---resolved-accent-color', defaultValue: '{color.action.primary.bg}', descriptionKey: 'components.blockquote.css_vars.accent_color', descriptionFallback: 'Resolved accent color driving the bar, glyph and author label.' },
        { name: '--origam-blockquote__accent---width', defaultValue: '4px', descriptionKey: 'components.blockquote.css_vars.accent_width', descriptionFallback: 'Width of the decorative accent bar (default / elegant variants).' },
        { name: '--origam-blockquote__author---color', defaultValue: '{color.text.secondary}', descriptionKey: 'components.blockquote.css_vars.author_color', descriptionFallback: 'Author attribution color.' },
        { name: '--origam-blockquote--quoted---glyph-size', defaultValue: '8rem', descriptionKey: 'components.blockquote.css_vars.glyph_size', descriptionFallback: 'Size of the decorative background quote glyph (variant="quoted").' },
        { name: '--origam-blockquote--quoted---glyph-opacity', defaultValue: '0.08', descriptionKey: 'components.blockquote.css_vars.glyph_opacity', descriptionFallback: 'Opacity of the background glyph.' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'effectiveLang', type: 'ComputedRef<string>', descriptionKey: 'components.blockquote.exposed.effective_lang', descriptionFallback: 'Resolved locale (after "auto" resolution from DOM or fallback to "en").' },
        { name: 'effectiveAlign', type: 'ComputedRef<string>', descriptionKey: 'components.blockquote.exposed.effective_align', descriptionFallback: 'Resolved text alignment after applying per-variant defaults.' },
        { name: 'openMark', type: 'ComputedRef<string>', descriptionKey: 'components.blockquote.exposed.open_mark', descriptionFallback: 'Locale-appropriate opening quote glyph (e.g. """ for en, "«" for fr).' },
        { name: 'closeMark', type: 'ComputedRef<string>', descriptionKey: 'components.blockquote.exposed.close_mark', descriptionFallback: 'Locale-appropriate closing quote glyph.' },
        { name: 'showQuoteMark', type: 'ComputedRef<boolean>', descriptionKey: 'components.blockquote.exposed.show_quote_mark', descriptionFallback: 'True when the decorative glyph should render (variant="quoted").' },
        { name: 'hasAttribution', type: 'ComputedRef<boolean>', descriptionKey: 'components.blockquote.exposed.has_attribution', descriptionFallback: 'True when the attribution footer should render (author or source present).' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['blockquote'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.blockquote.a11y.key_tab', actionFallback: 'Moves focus through interactive content inside the citation body if any.' }
        ],
        notes: [
            { noteKey: 'components.blockquote.a11y.cite_attr', noteFallback: 'The cite prop maps to the native cite attribute on the <blockquote>, providing the URL to assistive technologies and browser inspectors.' },
            { noteKey: 'components.blockquote.a11y.decorative_glyph', noteFallback: 'The decorative quote mark (<span class="origam-blockquote__mark">) is aria-hidden="true" — it is purely decorative and not announced by screen readers.' },
            { noteKey: 'components.blockquote.a11y.attribution_dash', noteFallback: 'The em-dash before the author name (<span class="origam-blockquote__dash">) is also aria-hidden to avoid double reading.' },
            { noteKey: 'components.blockquote.a11y.source_cite', noteFallback: 'The source label is wrapped in <cite> for semantic correctness per the HTML spec.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/blockquote.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'blockquote.font-size', value: '{font.size.lg}', type: 'dimension', descriptionKey: 'components.blockquote.tokens.font_size', descriptionFallback: 'Body font size.' },
            { tokenPath: 'blockquote.line-height', value: '{font.lineHeight.relaxed}', type: 'number', descriptionKey: 'components.blockquote.tokens.line_height', descriptionFallback: 'Body line-height.' },
            { tokenPath: 'blockquote.accent.color', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.blockquote.tokens.accent_color', descriptionFallback: 'Default accent bar / glyph color.' },
            { tokenPath: 'blockquote.accent.width', value: '4px', type: 'dimension', descriptionKey: 'components.blockquote.tokens.accent_width', descriptionFallback: 'Accent bar width.' },
            { tokenPath: 'blockquote.pull.font-size', value: '{font.size.3xl}', type: 'dimension', descriptionKey: 'components.blockquote.tokens.pull_font_size', descriptionFallback: 'Font size in pull variant.' },
            { tokenPath: 'blockquote.quoted.glyph-size', value: '8rem', type: 'dimension', descriptionKey: 'components.blockquote.tokens.glyph_size', descriptionFallback: 'Background glyph size in quoted variant.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Design is not just what it looks like and feels like. Design is how it works.',
        controls: [
            { prop: 'variant', kind: 'select', labelKey: 'components.blockquote.playground.variant', labelFallback: 'Variant', defaultValue: 'default', options: [{ label: 'default', value: 'default' }, { label: 'elegant', value: 'elegant' }, { label: 'quoted', value: 'quoted' }, { label: 'pull', value: 'pull' }, { label: 'minimal', value: 'minimal' }] },
            { prop: 'bgColor', kind: 'select', labelKey: 'components.blockquote.playground.bg_color', labelFallback: 'Accent color', defaultValue: 'primary', options: [{ label: 'primary', value: 'primary' }, { label: 'secondary', value: 'secondary' }, { label: 'success', value: 'success' }, { label: 'danger', value: 'danger' }, { label: 'warning', value: 'warning' }, { label: 'info', value: 'info' }, { label: 'neutral', value: 'neutral' }] },
            { prop: 'author', kind: 'text', labelKey: 'components.blockquote.playground.author', labelFallback: 'Author', defaultValue: 'Steve Jobs' },
            { prop: 'source', kind: 'text', labelKey: 'components.blockquote.playground.source', labelFallback: 'Source', defaultValue: '' },
            { prop: 'align', kind: 'select', labelKey: 'components.blockquote.playground.align', labelFallback: 'Align', defaultValue: 'left', options: [{ label: 'left', value: 'left' }, { label: 'center', value: 'center' }, { label: 'right', value: 'right' }] },
            { prop: 'lang', kind: 'select', labelKey: 'components.blockquote.playground.lang', labelFallback: 'Quote mark lang', defaultValue: 'auto', options: [{ label: 'auto', value: 'auto' }, { label: 'en', value: 'en' }, { label: 'fr', value: 'fr' }, { label: 'de', value: 'de' }, { label: 'es', value: 'es' }] }
        ]
    } satisfies IComponentPlayground
}
