/**
 * /components/bracket — full documentation data for OrigamBracket.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Bracket/bracket.interface.ts  (props)
 *   - packages/ds/src/components/Bracket/OrigamBracket.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/bracket.json                (CSS tokens)
 *
 * Family: OrigamBracket (root) + OrigamBracketRound + OrigamBracketMatch + OrigamBracketCompetitor
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

export const BRACKET_DOC: IComponentDoc = {
    slug: 'bracket',
    name: 'Bracket',
    tag: 'origam-bracket',
    icon: 'mdi-tournament',
    category: 'Data Display',
    descriptionKey: 'components.catalog.bracket.description',
    descriptionFallback: 'Tournament bracket renderer supporting single-elimination, double-elimination and round-robin layouts with SVG connector paths.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-bracket--design',
    docUrl: 'http://localhost:4000/components/Bracket/OrigamBracket',

    family: [
        {
            slug: 'bracket-round',
            name: 'BracketRound',
            descriptionKey: 'components.catalog.bracket_round.description',
            descriptionFallback: 'Renders a single round column (or row in vertical mode) containing its OrigamBracketMatch cards.'
        },
        {
            slug: 'bracket-match',
            name: 'BracketMatch',
            descriptionKey: 'components.catalog.bracket_match.description',
            descriptionFallback: 'A single match card showing two OrigamBracketCompetitor rows with optional scores.'
        },
        {
            slug: 'bracket-competitor',
            name: 'BracketCompetitor',
            descriptionKey: 'components.catalog.bracket_competitor.description',
            descriptionFallback: 'One competitor row inside a match card: avatar, seed, name and score. Carries winner/loser/pending state.'
        }
    ],

    props: [
        {
            name: 'rounds',
            type: { label: 'IBracketRound[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.bracket.props.rounds.description',
            descriptionFallback: 'Required. Pre-ordered list of rounds. Each round has an id, title, matches array and optional side marker for double-elimination.'
        },
        {
            name: 'variant',
            type: { label: 'TBracketVariant', slug: 'bracket-variant', kind: 'type' },
            defaultValue: "'single-elimination'",
            descriptionKey: 'components.bracket.props.variant.description',
            descriptionFallback: 'Tournament shape: "single-elimination" renders a tree, "double-elimination" adds a losers bracket, "round-robin" renders an NxN results matrix.'
        },
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.bracket.props.direction.description',
            descriptionFallback: 'Layout axis. Horizontal stacks rounds as columns (classic tree). Vertical stacks rounds as rows. Ignored for round-robin.'
        },
        {
            name: 'showRoundTitles',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket.props.show_round_titles.description',
            descriptionFallback: 'Toggle round header labels (e.g. "Quarter-finals") above each round column.'
        },
        {
            name: 'showScores',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket.props.show_scores.description',
            descriptionFallback: 'Toggle the score column on each competitor row.'
        },
        {
            name: 'showSeed',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket.props.show_seed.description',
            descriptionFallback: 'Render a seed number prefix before competitor names (e.g. "1. Team Liquid").'
        },
        {
            name: 'interactive',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket.props.interactive.description',
            descriptionFallback: 'When true, match cards show cursor affordance, hover state and keyboard focus. Click handlers still fire when false.'
        },
        {
            name: 'winnersLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Winners bracket'",
            descriptionKey: 'components.bracket.props.winners_label.description',
            descriptionFallback: 'Heading above the winners bracket tree in double-elimination mode. Pre-translate before passing.'
        },
        {
            name: 'losersLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'Losers bracket'",
            descriptionKey: 'components.bracket.props.losers_label.description',
            descriptionFallback: 'Heading above the losers bracket tree in double-elimination mode. Pre-translate before passing.'
        },
        { name: 'color', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.bracket.props.color.description', descriptionFallback: 'Intent or custom foreground color.' },
        { name: 'bgColor', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.bracket.props.bg_color.description', descriptionFallback: 'Background color of the bracket surface.' },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.bracket.props.rounded.description', descriptionFallback: 'Border-radius token or boolean.' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.bracket.props.elevation.description', descriptionFallback: 'Box-shadow elevation token.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.bracket.props.border.description', descriptionFallback: 'Applies a border to the bracket container.' },
        { name: 'density', type: { label: 'TDensity', slug: 'density', kind: 'type' }, defaultValue: "'default'", descriptionKey: 'components.bracket.props.density.description', descriptionFallback: 'Density modifier affecting gaps and match card sizing.' },
        { name: 'width', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.bracket.props.width.description', descriptionFallback: 'Bracket container width.' },
        { name: 'height', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.bracket.props.height.description', descriptionFallback: 'Bracket container height.' },
        { name: 'tag', type: { label: 'string', slug: '', kind: 'primitive' }, defaultValue: "'div'", descriptionKey: 'components.bracket.props.tag.description', descriptionFallback: 'HTML element rendered at the root. role="region" is always set.' }
    ],

    emits: [
        { event: 'match-click', payload: { label: 'IBracketMatch, IBracketRound, MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.bracket.emits.match_click.description', descriptionFallback: 'Fired when the user clicks a match card. Payload: the match, its parent round and the DOM event.' },
        { event: 'winner-click', payload: { label: 'IBracketCompetitor, IBracketMatch, MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.bracket.emits.winner_click.description', descriptionFallback: 'Fired when the user clicks a competitor marked as winner.' },
        { event: 'competitor-click', payload: { label: 'IBracketCompetitor, IBracketMatch, MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.bracket.emits.competitor_click.description', descriptionFallback: 'Fired when the user clicks any competitor row in a match.' },
        { event: 'round-robin-cell-click', payload: { label: 'IBracketCompetitor, IBracketCompetitor, MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.bracket.emits.round_robin_cell_click.description', descriptionFallback: 'Fired when the user clicks a round-robin result cell. Payload: row competitor, column competitor, DOM event.' }
    ],

    slots: [
        { slot: 'match', slotProps: '{ match, round }', descriptionKey: 'components.bracket.slots.match.description', descriptionFallback: 'Override any match card rendering. Receives the full match descriptor and its parent round.' },
        { slot: 'competitor', slotProps: '{ competitor, match, isWinner }', descriptionKey: 'components.bracket.slots.competitor.description', descriptionFallback: 'Override any competitor row inside a match card.' },
        { slot: 'round-title', slotProps: '{ round }', descriptionKey: 'components.bracket.slots.round_title.description', descriptionFallback: 'Override the round title header above each column.' },
        { slot: 'connector', slotProps: '{ path }', descriptionKey: 'components.bracket.slots.connector.description', descriptionFallback: 'Override SVG connector path elements drawn between match cards.' }
    ],

    examples: [
        {
            titleKey: 'components.bracket.examples.single.title',
            titleFallback: 'Single-elimination bracket',
            lang: 'vue',
            code: `<template>
  <origam-bracket
    :rounds="rounds"
    variant="single-elimination"
    show-seed
    @match-click="onMatchClick"
  />
</template>
<script setup lang="ts">
const rounds = [
  {
    id: 'qf', title: 'Quarter-finals',
    matches: [
      { id: 'm1', competitors: [{ id: 1, name: 'Team A', seed: 1 }, { id: 2, name: 'Team B', seed: 8 }], scores: [2, 0], winnerId: 1 },
      { id: 'm2', competitors: [{ id: 3, name: 'Team C', seed: 4 }, { id: 4, name: 'Team D', seed: 5 }], scores: [1, 2], winnerId: 4 }
    ]
  },
  {
    id: 'sf', title: 'Semi-finals',
    matches: [
      { id: 'm3', competitors: [{ id: 1, name: 'Team A', seed: 1 }, { id: 4, name: 'Team D', seed: 5 }] }
    ]
  }
]
const onMatchClick = (match, round, event) => console.log(match, round)
</script>`
        },
        {
            titleKey: 'components.bracket.examples.round_robin.title',
            titleFallback: 'Round-robin matrix',
            lang: 'vue',
            code: `<template>
  <origam-bracket
    :rounds="rounds"
    variant="round-robin"
    color="primary"
    @round-robin-cell-click="onCellClick"
  />
</template>`
        },
        {
            titleKey: 'components.bracket.examples.custom_match.title',
            titleFallback: 'Custom match slot',
            lang: 'vue',
            code: `<template>
  <origam-bracket :rounds="rounds">
    <template #match="{ match, round }">
      <origam-card
        :title="match.competitors.map(c => c.name).join(' vs ')"
        :subtitle="round.title"
        rounded="md"
      />
    </template>
  </origam-bracket>
</template>`
        }
    ],

    previewVariants: [
        { label: 'single-elimination', props: { variant: 'single-elimination' } },
        { label: 'round-robin', props: { variant: 'round-robin' } },
        { label: 'with scores', props: { variant: 'single-elimination', showScores: true, showSeed: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-bracket',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamBracket',
        svgDesc: 'Schematic of the Bracket component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="10" y="10" width="680" height="220" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="20" width="180" height="200" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="110" y="40" font-size="9" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Round 1</text>
  <rect x="30" y="50" width="160" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.4))" stroke-width="1.5"/>
  <rect x="30" y="125" width="160" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.4))" stroke-width="1.5"/>
  <rect x="250" y="20" width="180" height="200" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="340" y="40" font-size="9" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Semi-finals</text>
  <rect x="260" y="87" width="160" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <line x1="190" y1="80" x2="260" y2="117" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="4 2"/>
  <line x1="190" y1="155" x2="260" y2="117" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="4 2"/>
  <rect x="480" y="20" width="180" height="200" rx="4" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="570" y="40" font-size="9" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Final</text>
  <circle cx="12" cy="12" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="12" y="16" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="22" cy="22" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="22" y="26" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="32" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="56" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="195" cy="117" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="195" y="121" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="262" cy="89" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="262" y="93" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-bracket&gt;</code> — 5 parts: root container ①, round column ②, match card ③, SVG connector paths ④, competitor row ⑤.',
        legend: [
            { num: 1, cls: '.origam-bracket', descriptionKey: 'components.bracket.anatomy.root', descriptionFallback: 'Root element. role="region" with aria-label. Scrollable overflow:auto for wide brackets.' },
            { num: 2, cls: '.origam-bracket__rounds', descriptionKey: 'components.bracket.anatomy.rounds', descriptionFallback: 'Flex row (horizontal) or column (vertical) containing all round columns.' },
            { num: 3, cls: '.origam-bracket__match', descriptionKey: 'components.bracket.anatomy.match', descriptionFallback: 'Individual match card rendered by OrigamBracketMatch. Has hover state and focus ring when interactive=true.' },
            { num: 4, cls: '.origam-bracket__connectors', descriptionKey: 'components.bracket.anatomy.connectors', descriptionFallback: 'SVG overlay drawing connector paths between match cards. aria-hidden, positioned absolutely.' },
            { num: 5, cls: '.origam-bracket__competitor', descriptionKey: 'components.bracket.anatomy.competitor', descriptionFallback: 'Competitor row rendered by OrigamBracketCompetitor. Carries winner/loser/pending state classes.' }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-bracket---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.bracket.css_vars.color', descriptionFallback: 'Default text color.' },
        { name: '--origam-bracket---background-color', defaultValue: 'transparent', descriptionKey: 'components.bracket.css_vars.background_color', descriptionFallback: 'Bracket container background.' },
        { name: '--origam-bracket---gap-round', defaultValue: '{space.12}', descriptionKey: 'components.bracket.css_vars.gap_round', descriptionFallback: 'Gap between round columns.' },
        { name: '--origam-bracket__match---width', defaultValue: '240px', descriptionKey: 'components.bracket.css_vars.match_width', descriptionFallback: 'Default match card width.' },
        { name: '--origam-bracket__match---background-color', defaultValue: '{color.surface.default}', descriptionKey: 'components.bracket.css_vars.match_background', descriptionFallback: 'Match card background.' },
        { name: '--origam-bracket__match---border-radius', defaultValue: '{radius.md}', descriptionKey: 'components.bracket.css_vars.match_border_radius', descriptionFallback: 'Match card border-radius.' },
        { name: '--origam-bracket__competitor---height', defaultValue: '36px', descriptionKey: 'components.bracket.css_vars.competitor_height', descriptionFallback: 'Competitor row height.' },
        { name: '--origam-bracket__competitor-winner---background-color', defaultValue: '{color.action.primary.bgSubtle}', descriptionKey: 'components.bracket.css_vars.winner_bg', descriptionFallback: 'Background of the winning competitor row.' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>', descriptionKey: 'components.bracket.exposed.filter_props', descriptionFallback: 'Utility to forward a filtered subset of props to child components.' },
        { name: 'displayRounds', type: 'ComputedRef<IBracketRound[]>', descriptionKey: 'components.bracket.exposed.display_rounds', descriptionFallback: 'Processed rounds array after normalization (sorted, side-grouped for double-elimination).' },
        { name: 'connectorPaths', type: 'ComputedRef<Array<{ key: string; d: string }>>', descriptionKey: 'components.bracket.exposed.connector_paths', descriptionFallback: 'Computed SVG path data for connector lines between match cards.' },
        { name: 'roundRobinCompetitors', type: 'ComputedRef<IBracketCompetitor[]>', descriptionKey: 'components.bracket.exposed.round_robin_competitors', descriptionFallback: 'Flattened unique competitor list extracted from all rounds (round-robin matrix axes).' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['region', 'table', 'row', 'cell', 'rowheader', 'columnheader', 'gridcell'],
        keyboard: [
            { key: 'Tab', actionKey: 'components.bracket.a11y.key_tab', actionFallback: 'Moves focus between interactive match cards when interactive=true.' },
            { key: 'Enter / Space', actionKey: 'components.bracket.a11y.key_activate', actionFallback: 'Fires the match-click emit on the focused match card.' }
        ],
        notes: [
            { noteKey: 'components.bracket.a11y.region_label', noteFallback: 'The root element has role="region" and aria-label from the prop for a clear landmark.' },
            { noteKey: 'components.bracket.a11y.round_robin_table', noteFallback: 'Round-robin mode uses role="table" / role="row" / role="cell" / role="rowheader" / role="columnheader" for full grid semantics.' },
            { noteKey: 'components.bracket.a11y.connectors_hidden', noteFallback: 'SVG connector paths are aria-hidden — purely decorative.' },
            { noteKey: 'components.bracket.a11y.interactive_focus', noteFallback: 'When interactive=true, match cards receive focus-visible ring styling for keyboard navigation.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/bracket.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'bracket.gap-round', value: '{space.12}', type: 'dimension', descriptionKey: 'components.bracket.tokens.gap_round', descriptionFallback: 'Gap between round columns.' },
            { tokenPath: 'bracket.match.width', value: '240px', type: 'dimension', descriptionKey: 'components.bracket.tokens.match_width', descriptionFallback: 'Default match card width.' },
            { tokenPath: 'bracket.match.border-radius', value: '{radius.md}', type: 'dimension', descriptionKey: 'components.bracket.tokens.match_border_radius', descriptionFallback: 'Match card border-radius.' },
            { tokenPath: 'bracket.match-final.border-color', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.bracket.tokens.final_border', descriptionFallback: 'Border color of the grand-final match card.' },
            { tokenPath: 'bracket.competitor-winner.background-color', value: '{color.action.primary.bgSubtle}', type: 'color', descriptionKey: 'components.bracket.tokens.winner_bg', descriptionFallback: 'Background of the winning competitor row.' },
            { tokenPath: 'bracket.round-title.text-transform', value: 'uppercase', type: 'other', descriptionKey: 'components.bracket.tokens.round_title_transform', descriptionFallback: 'Round title text transform.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            { prop: 'variant', kind: 'select', labelKey: 'components.bracket.playground.variant', labelFallback: 'Variant', defaultValue: 'single-elimination', options: [{ label: 'single-elimination', value: 'single-elimination' }, { label: 'double-elimination', value: 'double-elimination' }, { label: 'round-robin', value: 'round-robin' }] },
            { prop: 'direction', kind: 'select', labelKey: 'components.bracket.playground.direction', labelFallback: 'Direction', defaultValue: 'horizontal', options: [{ label: 'horizontal', value: 'horizontal' }, { label: 'vertical', value: 'vertical' }] },
            { prop: 'showRoundTitles', kind: 'switch', labelKey: 'components.bracket.playground.show_round_titles', labelFallback: 'Show round titles', defaultValue: true },
            { prop: 'showScores', kind: 'switch', labelKey: 'components.bracket.playground.show_scores', labelFallback: 'Show scores', defaultValue: true },
            { prop: 'showSeed', kind: 'switch', labelKey: 'components.bracket.playground.show_seed', labelFallback: 'Show seed', defaultValue: false },
            { prop: 'interactive', kind: 'switch', labelKey: 'components.bracket.playground.interactive', labelFallback: 'Interactive', defaultValue: true }
        ]
    } satisfies IComponentPlayground
}
