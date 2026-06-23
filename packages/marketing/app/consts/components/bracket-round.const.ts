/**
 * /components/bracket-round — full documentation data for OrigamBracketRound.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Bracket/bracket-round-component.interface.ts (IBracketRoundProps)
 *   - packages/ds/src/components/Bracket/OrigamBracketRound.vue               (template BEM, defineExpose)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const BRACKET_ROUND_DOC: IComponentDoc = {
    slug: 'bracket-round',
    name: 'BracketRound',
    tag: 'origam-bracket-round',
    icon: 'mdi-view-column-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.bracket_round.description',
    descriptionFallback: 'Renders a single round column (horizontal mode) or row (vertical mode) of a tournament bracket, containing its OrigamBracketMatch cards.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-bracket--design',
    docUrl: 'http://localhost:4000/components/Bracket/OrigamBracketRound',
    parentSlug: 'bracket',

    family: [
        {
            slug: 'bracket',
            name: 'Bracket',
            descriptionKey: 'components.catalog.bracket.description',
            descriptionFallback: 'Tournament bracket renderer supporting single-elimination, double-elimination and round-robin layouts.'
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
            descriptionFallback: 'A single competitor row inside a bracket match card.'
        }
    ],

    props: [
        {
            name: 'round',
            type: { label: 'IBracketRound', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.bracket_round.props.round.description',
            descriptionFallback: 'Round payload containing id, title, matches array and optional side (winner/loser for double-elimination).'
        },
        {
            name: 'index',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.bracket_round.props.index.description',
            descriptionFallback: 'Zero-based index of this round within the bracket. Used to compute isFinalRound.'
        },
        {
            name: 'totalRounds',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.bracket_round.props.total_rounds.description',
            descriptionFallback: 'Total number of rounds in the bracket. Used together with index to flag the last round as the final.'
        },
        {
            name: 'showRoundTitle',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_round.props.show_round_title.description',
            descriptionFallback: 'Toggles the round title <h3> heading above the match list.'
        },
        {
            name: 'showScores',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_round.props.show_scores.description',
            descriptionFallback: 'Forwarded to OrigamBracketMatch to toggle the score column.'
        },
        {
            name: 'showSeed',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_round.props.show_seed.description',
            descriptionFallback: 'Forwarded to OrigamBracketMatch to toggle the seed prefix.'
        },
        {
            name: 'interactive',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_round.props.interactive.description',
            descriptionFallback: 'Forwarded to OrigamBracketMatch to toggle match-card interactivity.'
        },
        {
            name: 'color',
            type: { label: 'TIntent', slug: 'intent', kind: 'type' },
            defaultValue: "'primary'",
            descriptionKey: 'components.bracket_round.props.color.description',
            descriptionFallback: 'Intent color forwarded to OrigamBracketMatch cards.'
        },
        {
            name: 'direction',
            type: { label: 'TDirection', slug: 'direction', kind: 'type' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.bracket_round.props.direction.description',
            descriptionFallback: 'Layout direction. horizontal = column of matches (single-elimination); vertical = row of matches.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.bracket_round.props.tag.description',
            descriptionFallback: 'HTML element rendered as the round container root.'
        }
    ],

    emits: [
        {
            event: 'match-click',
            payload: { label: 'IBracketMatch, MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_round.emits.match_click.description',
            descriptionFallback: 'Bubbled from OrigamBracketMatch when the match card is clicked (not inside a competitor row).'
        },
        {
            event: 'competitor-click',
            payload: { label: 'IBracketCompetitor, IBracketMatch, "A" | "B", MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_round.emits.competitor_click.description',
            descriptionFallback: 'Bubbled from OrigamBracketMatch when a competitor row is clicked.'
        },
        {
            event: 'winner-click',
            payload: { label: 'IBracketCompetitor, IBracketMatch, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_round.emits.winner_click.description',
            descriptionFallback: 'Bubbled from OrigamBracketMatch when the winner competitor row is clicked.'
        }
    ],

    slots: [
        {
            slot: 'round-title',
            slotProps: '{ round: IBracketRound, index: number }',
            descriptionKey: 'components.bracket_round.slots.round_title.description',
            descriptionFallback: 'Override the round title content. Receives the round data and its index.'
        },
        {
            slot: 'match',
            slotProps: '{ match: IBracketMatch, round: IBracketRound, isFinal: boolean }',
            descriptionKey: 'components.bracket_round.slots.match.description',
            descriptionFallback: 'Override the rendering of each match. Receives match data, round and isFinal flag.'
        }
    ],

    examples: [
        {
            titleKey: 'components.bracket_round.examples.basic.title',
            titleFallback: 'Standalone round',
            lang: 'vue',
            code: `<template>
  <origam-bracket-round
    :round="{
      id: 'r1',
      title: 'Semi-finals',
      matches: [
        {
          id: 'm1',
          competitorA: { id: 'c1', name: 'Team Alpha' },
          competitorB: { id: 'c2', name: 'Team Beta' },
          status: 'completed',
          winnerId: 'c1',
          scoreA: 3,
          scoreB: 1
        }
      ]
    }"
    :index="0"
    :total-rounds="2"
  />
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-bracket-round',
        svgViewBox: '0 0 480 220',
        svgTitle: 'Anatomy of OrigamBracketRound',
        svgDesc: 'Schematic of the BracketRound column with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="480" height="220" fill="var(--origam-color__surface---sunken, #f9f5ff)" rx="4"/>
  <rect x="20" y="16" width="440" height="188" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="20" y="16" width="440" height="32" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))"/>
  <text x="240" y="37" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace" font-weight="600">SEMI-FINALS</text>
  <rect x="40" y="64" width="400" height="52" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1"/>
  <text x="240" y="94" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">Match card 1</text>
  <rect x="40" y="136" width="400" height="52" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1"/>
  <text x="240" y="166" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">Match card 2</text>
  <circle cx="28" cy="24" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="28.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="240" cy="34" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="240" y="38.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="240" cy="90" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="240" y="94.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-bracket-round&gt;</code> — 3 parts: root column, round title heading and match list.',
        legend: [
            {
                num: 1,
                cls: '.origam-bracket-round',
                descriptionKey: 'components.bracket_round.anatomy.root',
                descriptionFallback: 'Root flex column container. role="group" with aria-labelledby pointing to the title. Direction modifier switches to row for vertical mode.'
            },
            {
                num: 2,
                cls: '.origam-bracket-round__title',
                descriptionKey: 'components.bracket_round.anatomy.title',
                descriptionFallback: 'Round title <h3>. Visible only when showRoundTitle=true. Gets a computed id for aria-labelledby.'
            },
            {
                num: 3,
                cls: '.origam-bracket-round__matches',
                descriptionKey: 'components.bracket_round.anatomy.matches',
                descriptionFallback: 'Flex column container for match cards. justify-content: space-around distributes matches evenly. Gap driven by --origam-bracket-round---match-gap.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-bracket-round origam-bracket-round--direction-horizontal" role="group" aria-labelledby="round-1-title">
  <h3 id="round-1-title" class="origam-bracket-round__title">Semi-finals</h3>
  <div class="origam-bracket-round__matches">
    <!-- #match slot × N -->
    <origam-bracket-match class="origam-bracket-round__match" />
    <origam-bracket-match class="origam-bracket-round__match" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-bracket-round',
                descriptionKey: 'components.bracket_round.anatomy.root',
                descriptionFallback: 'Root flex column container.'
            },
            {
                cls: 'origam-bracket-round__title',
                descriptionKey: 'components.bracket_round.anatomy.title',
                descriptionFallback: 'Round title heading <h3>.'
            },
            {
                cls: 'origam-bracket-round__matches',
                descriptionKey: 'components.bracket_round.anatomy.matches',
                descriptionFallback: 'Match cards container with space-around justification.'
            },
            {
                cls: 'origam-bracket-round__match',
                descriptionKey: 'components.bracket_round.anatomy.match',
                descriptionFallback: 'Applied to each OrigamBracketMatch inside the round.'
            },
            {
                cls: 'origam-bracket-round--final',
                descriptionKey: 'components.bracket_round.anatomy.final',
                descriptionFallback: 'Added to the last round (index === totalRounds - 1).'
            },
            {
                cls: 'origam-bracket-round--direction-horizontal',
                descriptionKey: 'components.bracket_round.anatomy.horizontal',
                descriptionFallback: 'Flex column layout — matches stack vertically in a column.'
            },
            {
                cls: 'origam-bracket-round--direction-vertical',
                descriptionKey: 'components.bracket_round.anatomy.vertical',
                descriptionFallback: 'Flex row layout — matches stack horizontally in a row.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-bracket-round-title---margin-block-end',
            defaultValue: '12px',
            descriptionKey: 'components.bracket_round.css_vars.title_margin_block_end',
            descriptionFallback: 'Bottom margin below the round title.'
        },
        {
            name: '--origam-bracket-round-title---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.bracket_round.css_vars.title_font_size',
            descriptionFallback: 'Font size of the round title.'
        },
        {
            name: '--origam-bracket-round-title---font-weight',
            defaultValue: '600',
            descriptionKey: 'components.bracket_round.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the round title.'
        },
        {
            name: '--origam-bracket-round-title---letter-spacing',
            defaultValue: '0.04em',
            descriptionKey: 'components.bracket_round.css_vars.title_letter_spacing',
            descriptionFallback: 'Letter spacing of the round title.'
        },
        {
            name: '--origam-bracket-round-title---text-transform',
            defaultValue: 'uppercase',
            descriptionKey: 'components.bracket_round.css_vars.title_text_transform',
            descriptionFallback: 'Text transform of the round title. Default uppercase.'
        },
        {
            name: '--origam-bracket-round---match-gap',
            defaultValue: '24px',
            descriptionKey: 'components.bracket_round.css_vars.match_gap',
            descriptionFallback: 'Gap between match cards in the round.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.bracket_round.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.bracket_round.a11y.key_tab',
                actionFallback: 'Moves focus through each match card within the round.'
            }
        ],
        notes: [
            {
                noteKey: 'components.bracket_round.a11y.labelledby_note',
                noteFallback: 'The round container has aria-labelledby pointing to the title element id when showRoundTitle=true, giving screen readers the round name context.'
            },
            {
                noteKey: 'components.bracket_round.a11y.final_note',
                noteFallback: 'The final round (last in the bracket) receives the --final modifier class. Consumers can use this for additional ARIA live-region announcements.'
            }
        ]
    } satisfies IComponentA11y
}
