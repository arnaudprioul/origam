/**
 * /components/bracket-match — full documentation data for OrigamBracketMatch.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Bracket/bracket-match-component.interface.ts (IBracketMatchProps)
 *   - packages/ds/src/components/Bracket/OrigamBracketMatch.vue               (template BEM, defineExpose)
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

export const BRACKET_MATCH_DOC: IComponentDoc = {
    slug: 'bracket-match',
    name: 'BracketMatch',
    tag: 'origam-bracket-match',
    icon: 'mdi-sword-cross',
    category: 'Data Display',
    descriptionKey: 'components.catalog.bracket_match.description',
    descriptionFallback: 'A single match card inside a tournament bracket, showing two competitor rows with optional meta header (status, schedule, watch link) and score columns.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-bracket--design',
    docUrl: 'http://localhost:4000/components/Bracket/OrigamBracketMatch',
    parentSlug: 'bracket',

    family: [
        {
            slug: 'bracket',
            name: 'Bracket',
            descriptionKey: 'components.catalog.bracket.description',
            descriptionFallback: 'Tournament bracket renderer supporting single-elimination, double-elimination and round-robin layouts.'
        },
        {
            slug: 'bracket-round',
            name: 'BracketRound',
            descriptionKey: 'components.catalog.bracket_round.description',
            descriptionFallback: 'Renders a single round column containing its OrigamBracketMatch cards.'
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
            name: 'match',
            type: { label: 'IBracketMatch', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.bracket_match.props.match.description',
            descriptionFallback: 'Match payload containing competitorA, competitorB, scoreA, scoreB, winnerId, status, scheduledAt and advantage data.'
        },
        {
            name: 'status',
            type: { label: 'TBracketMatchStatus', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_match.props.status.description',
            descriptionFallback: 'Overrides match.status. Accepted values: "pending", "live", "completed", "forfeited".'
        },
        {
            name: 'to',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_match.props.to.description',
            descriptionFallback: 'URL for the "Watch live" link shown when status is "live".'
        },
        {
            name: 'isFinal',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_match.props.is_final.description',
            descriptionFallback: 'When true applies the --final visual treatment (elevated shadow, larger card, rounded corners).'
        },
        {
            name: 'showScores',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_match.props.show_scores.description',
            descriptionFallback: 'Forwarded to OrigamBracketCompetitor to toggle the score column.'
        },
        {
            name: 'showSeed',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_match.props.show_seed.description',
            descriptionFallback: 'Forwarded to OrigamBracketCompetitor to toggle the seed prefix.'
        },
        {
            name: 'interactive',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_match.props.interactive.description',
            descriptionFallback: 'When true the card and its competitor rows advertise interactivity (hover, cursor, role="button").'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: "'primary'",
            descriptionKey: 'components.bracket_match.props.color.description',
            descriptionFallback: 'Intent color forwarded to competitor rows. Drives the winner tint and the auto-contrast text color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_match.props.bg_color.description',
            descriptionFallback: 'Background color of the match card.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_match.props.density.description',
            descriptionFallback: 'Controls card and competitor row padding. compact: 56px min-height, comfortable: 88px.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_match.props.rounded.description',
            descriptionFallback: 'Border-radius override for the match card.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_match.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation override for the match card.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.bracket_match.props.tag.description',
            descriptionFallback: 'HTML element rendered as the match card root.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'IBracketMatch, MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_match.emits.click.description',
            descriptionFallback: 'Fired on card click (not inside a competitor row). Receives the match payload and the native event.'
        },
        {
            event: 'competitor-click',
            payload: { label: 'IBracketCompetitor, IBracketMatch, "A" | "B", MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_match.emits.competitor_click.description',
            descriptionFallback: 'Fired when a competitor row is clicked. Receives the competitor, match, side ("A" or "B") and the event.'
        },
        {
            event: 'winner-click',
            payload: { label: 'IBracketCompetitor, IBracketMatch, MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_match.emits.winner_click.description',
            descriptionFallback: 'Fired additionally when the clicked competitor is the winner of the match.'
        }
    ],

    slots: [
        {
            slot: 'competitor',
            slotProps: '{ competitor, match, isWinner, side }',
            descriptionKey: 'components.bracket_match.slots.competitor.description',
            descriptionFallback: 'Override the rendering of each competitor row. Used twice (side A and B). Receives competitor data, the match, winner flag and side identifier.'
        }
    ],

    examples: [
        {
            titleKey: 'components.bracket_match.examples.basic.title',
            titleFallback: 'Basic match card',
            lang: 'vue',
            code: `<template>
  <origam-bracket-match
    :match="{
      id: 'm1',
      competitorA: { id: 'c1', name: 'Team Alpha' },
      competitorB: { id: 'c2', name: 'Team Beta' },
      scoreA: 3,
      scoreB: 1,
      winnerId: 'c1',
      status: 'completed'
    }"
  />
</template>`
        },
        {
            titleKey: 'components.bracket_match.examples.live.title',
            titleFallback: 'Live match with watch link',
            lang: 'vue',
            code: `<template>
  <origam-bracket-match
    :match="{
      id: 'm2',
      competitorA: { id: 'c1', name: 'Team Alpha' },
      competitorB: { id: 'c2', name: 'Team Beta' },
      status: 'live'
    }"
    to="https://stream.example.com/match/m2"
  />
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-bracket-match',
        svgViewBox: '0 0 560 240',
        svgTitle: 'Anatomy of OrigamBracketMatch',
        svgDesc: 'Schematic of the BracketMatch card with 5 numbered parts.',
        svg: `
  <rect x="0" y="0" width="560" height="240" fill="var(--origam-color__surface---sunken, #f9f5ff)" rx="4"/>
  <rect x="30" y="20" width="500" height="200" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="30" y="20" width="500" height="36" rx="6" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="none"/>
  <text x="40" y="43" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="monospace">LIVE</text>
  <text x="80" y="43" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="monospace">14:00 UTC</text>
  <text x="420" y="43" font-size="9" fill="var(--origam-color__feedback--danger---bg, #d32f2f)" font-family="monospace" font-weight="600">Watch live ↗</text>
  <line x1="30" y1="56" x2="530" y2="56" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.08))" stroke-width="1"/>
  <rect x="30" y="56" width="500" height="82" fill="none"/>
  <rect x="40" y="68" width="480" height="32" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="60" y="88" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="monospace">Team Alpha</text>
  <text x="490" y="88" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="end" font-family="monospace" font-weight="600">3</text>
  <line x1="30" y1="138" x2="530" y2="138" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.08))" stroke-width="1"/>
  <rect x="40" y="146" width="480" height="32" rx="2" fill="none"/>
  <text x="60" y="166" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="monospace" opacity="0.7">Team Beta</text>
  <text x="490" y="166" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="end" font-family="monospace" font-weight="600">1</text>
  <circle cx="38" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="38" cy="60" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="38" y="64.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="280" cy="84" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="280" y="88.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="280" cy="162" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="280" y="166.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="280" cy="138" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="280" y="142.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-bracket-match&gt;</code> — 5 parts: root card, meta header, body, competitor rows (A / B) and divider.',
        legend: [
            {
                num: 1,
                cls: '.origam-bracket-match',
                descriptionKey: 'components.bracket_match.anatomy.root',
                descriptionFallback: 'Root card element. Flex column with border, rounded corners and optional box-shadow. role="group".'
            },
            {
                num: 2,
                cls: '.origam-bracket-match__meta',
                descriptionKey: 'components.bracket_match.anatomy.meta',
                descriptionFallback: 'Meta header bar. Visible only when match.scheduledAt or a resolved status is present. Contains status badge, watch link and schedule time.'
            },
            {
                num: 3,
                cls: '.origam-bracket-match__row (side A)',
                descriptionKey: 'components.bracket_match.anatomy.row_a',
                descriptionFallback: 'Competitor A row — an OrigamBracketCompetitor with isWinner/isLoser derived from match.winnerId.'
            },
            {
                num: 4,
                cls: '.origam-bracket-match__row (side B)',
                descriptionKey: 'components.bracket_match.anatomy.row_b',
                descriptionFallback: 'Competitor B row — same as A but for the second participant.'
            },
            {
                num: 5,
                cls: '.origam-bracket-match__divider',
                descriptionKey: 'components.bracket_match.anatomy.divider',
                descriptionFallback: 'OrigamDivider separator between the two competitor rows.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-bracket-match origam-bracket-match--interactive" role="group">
  <!-- meta header: visible when status or scheduledAt is set -->
  <div class="origam-bracket-match__meta">
    <span class="origam-bracket-match__status origam-bracket-match__status--live">LIVE</span>
    <a class="origam-bracket-match__watch" href="..." target="_blank" rel="noopener noreferrer">Watch live</a>
    <span class="origam-bracket-match__schedule">14:00 UTC</span>
  </div>

  <!-- body: the two competitor rows -->
  <div class="origam-bracket-match__body">
    <!-- #competitor slot (side A) -->
    <origam-bracket-competitor class="origam-bracket-match__row" :is-winner="true" />

    <origam-divider class="origam-bracket-match__divider" />

    <!-- #competitor slot (side B) -->
    <origam-bracket-competitor class="origam-bracket-match__row" :is-loser="true" />
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-bracket-match',
                descriptionKey: 'components.bracket_match.anatomy.root',
                descriptionFallback: 'Root card element with border and shadow.'
            },
            {
                cls: 'origam-bracket-match__meta',
                descriptionKey: 'components.bracket_match.anatomy.meta',
                descriptionFallback: 'Meta header bar with status, watch link and schedule.'
            },
            {
                cls: 'origam-bracket-match__status',
                descriptionKey: 'components.bracket_match.anatomy.status',
                descriptionFallback: 'Status badge with colored dot prefix (LIVE / Completed / TBD / Forfeit).'
            },
            {
                cls: 'origam-bracket-match__body',
                descriptionKey: 'components.bracket_match.anatomy.body',
                descriptionFallback: 'Container for the two competitor rows.'
            },
            {
                cls: 'origam-bracket-match__row',
                descriptionKey: 'components.bracket_match.anatomy.row',
                descriptionFallback: 'Applied to each OrigamBracketCompetitor inside the body.'
            },
            {
                cls: 'origam-bracket-match__divider',
                descriptionKey: 'components.bracket_match.anatomy.divider',
                descriptionFallback: 'Separator between the two competitor rows.'
            },
            {
                cls: 'origam-bracket-match--final',
                descriptionKey: 'components.bracket_match.anatomy.final',
                descriptionFallback: 'Final match: elevated shadow, larger card.'
            },
            {
                cls: 'origam-bracket-match--interactive',
                descriptionKey: 'components.bracket_match.anatomy.interactive',
                descriptionFallback: 'Hover state: border-color and background-color transition.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-bracket-match---width',
            defaultValue: '240px',
            descriptionKey: 'components.bracket_match.css_vars.width',
            descriptionFallback: 'Default width of the match card.'
        },
        {
            name: '--origam-bracket-match---min-height',
            defaultValue: '72px',
            descriptionKey: 'components.bracket_match.css_vars.min_height',
            descriptionFallback: 'Minimum card height. compact: 56px, comfortable: 88px.'
        },
        {
            name: '--origam-bracket-match---border-radius',
            defaultValue: '6px',
            descriptionKey: 'components.bracket_match.css_vars.border_radius',
            descriptionFallback: 'Card border-radius.'
        },
        {
            name: '--origam-bracket-match---border-color',
            defaultValue: 'var(--origam-color__border---subtle)',
            descriptionKey: 'components.bracket_match.css_vars.border_color',
            descriptionFallback: 'Card border color.'
        },
        {
            name: '--origam-bracket-match---background-color',
            defaultValue: 'var(--origam-color__surface---default)',
            descriptionKey: 'components.bracket_match.css_vars.background_color',
            descriptionFallback: 'Card surface background color.'
        },
        {
            name: '--origam-bracket-match---transition-duration',
            defaultValue: '120ms',
            descriptionKey: 'components.bracket_match.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for background-color, border-color and box-shadow on hover.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.bracket_match.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['group'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.bracket_match.a11y.key_tab',
                actionFallback: 'Moves focus into the match card and through each competitor row.'
            }
        ],
        notes: [
            {
                noteKey: 'components.bracket_match.a11y.aria_label_note',
                noteFallback: 'The root has aria-label="Match: A versus B" computed from competitor names.'
            },
            {
                noteKey: 'components.bracket_match.a11y.live_note',
                noteFallback: 'The "Watch live" link opens in a new tab with rel="noopener noreferrer" for security.'
            },
            {
                noteKey: 'components.bracket_match.a11y.status_note',
                noteFallback: 'Status badges (LIVE, Completed…) are preceded by a colored dot using ::before — no alt text needed as the text label is present.'
            },
            {
                noteKey: 'components.bracket_match.a11y.reduced_motion_note',
                noteFallback: 'LIVE badge animation (blink + ping) is disabled under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y
}
