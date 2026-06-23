/**
 * /components/bracket-competitor — full documentation data for OrigamBracketCompetitor.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Bracket/bracket-competitor-component.interface.ts (IBracketCompetitorProps)
 *   - packages/ds/src/components/Bracket/OrigamBracketCompetitor.vue               (template BEM, defineExpose, aria-*)
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

export const BRACKET_COMPETITOR_DOC: IComponentDoc = {
    slug: 'bracket-competitor',
    name: 'BracketCompetitor',
    tag: 'origam-bracket-competitor',
    icon: 'mdi-account-box-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.bracket_competitor.description',
    descriptionFallback: 'A single competitor row inside a bracket match card, showing seed, avatar, name, advantage badge, forfeit indicator and score.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-bracket--design',
    docUrl: 'http://localhost:4000/components/Bracket/OrigamBracketCompetitor',
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
            slug: 'bracket-round',
            name: 'BracketRound',
            descriptionKey: 'components.catalog.bracket_round.description',
            descriptionFallback: 'Renders a single round column containing its OrigamBracketMatch cards.'
        }
    ],

    props: [
        {
            name: 'competitor',
            type: { label: 'IBracketCompetitor | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.bracket_competitor.props.competitor.description',
            descriptionFallback: 'Competitor data payload. null renders a "TBD" placeholder when the participant is not yet determined.'
        },
        {
            name: 'score',
            type: { label: 'number | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_competitor.props.score.description',
            descriptionFallback: 'Score for this competitor. Accepts a number or a string for non-numeric markers. Shows "—" when undefined.'
        },
        {
            name: 'isWinner',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_competitor.props.is_winner.description',
            descriptionFallback: 'Applies the --winner modifier: bolder text and intent-tinted background to highlight the winning side.'
        },
        {
            name: 'isLoser',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_competitor.props.is_loser.description',
            descriptionFallback: 'Applies the --loser modifier: reduced opacity to de-emphasize the losing side after a completed match.'
        },
        {
            name: 'showScore',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_competitor.props.show_score.description',
            descriptionFallback: 'Toggles visibility of the score column.'
        },
        {
            name: 'showSeed',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_competitor.props.show_seed.description',
            descriptionFallback: 'Toggles visibility of the seed number prefix.'
        },
        {
            name: 'interactive',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.bracket_competitor.props.interactive.description',
            descriptionFallback: 'When true: cursor:pointer, hover background, role="button", tabindex, keyboard support (Enter/Space emits click).'
        },
        {
            name: 'advantageRounds',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_competitor.props.advantage_rounds.description',
            descriptionFallback: 'Head-start rounds carried into the match. When > 0 a +N badge is rendered next to the name.'
        },
        {
            name: 'forfeit',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.bracket_competitor.props.forfeit.description',
            descriptionFallback: 'Marks this competitor as forfeited: name is struck through and a "forfeit" tag is shown.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_competitor.props.color.description',
            descriptionFallback: 'Foreground text/icon color applied to the row.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_competitor.props.bg_color.description',
            descriptionFallback: 'Background color of the row.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.bracket_competitor.props.density.description',
            descriptionFallback: 'Controls row height and padding. compact: 28px, default: 36px, comfortable: 44px.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.bracket_competitor.props.tag.description',
            descriptionFallback: 'HTML element rendered as the competitor row root.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'MouseEvent | KeyboardEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.bracket_competitor.emits.click.description',
            descriptionFallback: 'Fired on click (interactive=true) or keyboard Enter/Space. Not fired when interactive=false.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.bracket_competitor.examples.basic.title',
            titleFallback: 'Standalone competitor row',
            lang: 'vue',
            code: `<template>
  <origam-bracket-competitor
    :competitor="{ id: '1', name: 'Team Alpha', seed: 1 }"
    :score="3"
    is-winner
    show-seed
  />
</template>`
        },
        {
            titleKey: 'components.bracket_competitor.examples.tbd.title',
            titleFallback: 'TBD placeholder',
            lang: 'vue',
            code: `<template>
  <origam-bracket-competitor
    :competitor="null"
    :show-score="false"
  />
</template>`
        },
        {
            titleKey: 'components.bracket_competitor.examples.advantage.title',
            titleFallback: 'With advantage badge',
            lang: 'vue',
            code: `<template>
  <origam-bracket-competitor
    :competitor="{ id: '1', name: 'Grand Final Winner', seed: 1 }"
    :score="0"
    :advantage-rounds="2"
  />
</template>`
        }
    ],

    previewVariants: [
        {
            label: 'default',
            props: {},
            ariaLabel: 'Bracket competitor default'
        },
        {
            label: 'winner',
            props: { isWinner: true },
            ariaLabel: 'Bracket competitor winner'
        },
        {
            label: 'loser',
            props: { isLoser: true },
            ariaLabel: 'Bracket competitor loser'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-bracket-competitor',
        svgViewBox: '0 0 640 160',
        svgTitle: 'Anatomy of OrigamBracketCompetitor',
        svgDesc: 'Schematic of the BracketCompetitor row with 5 numbered parts.',
        svg: `
  <rect x="0" y="0" width="640" height="160" fill="var(--origam-color__surface---sunken, #f9f5ff)" rx="4"/>
  <rect x="20" y="40" width="600" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="30" y="55" width="24" height="50" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1"/>
  <text x="42" y="84" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">seed</text>
  <circle cx="78" cy="80" r="20" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.12))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="78" y="84" font-size="8" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">avatar</text>
  <rect x="108" y="60" width="280" height="40" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.25))" stroke-width="1"/>
  <text x="248" y="84" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">Team Name</text>
  <rect x="398" y="62" width="52" height="36" rx="10" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.15))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <text x="424" y="84" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace">+2</text>
  <rect x="562" y="60" width="44" height="40" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1"/>
  <text x="584" y="84" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="monospace" font-weight="600">3</text>
  <circle cx="28" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="52.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="42" cy="56" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="42" y="60.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="78" cy="60" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="78" y="64.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="248" cy="58" r="8" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="248" y="62.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="424" cy="60" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="424" y="64.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="584" cy="58" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="584" y="62.5" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-bracket-competitor&gt;</code> — 6 internal parts: root row, seed, avatar, name, advantage badge and score.',
        legend: [
            {
                num: 1,
                cls: '.origam-bracket-competitor',
                descriptionKey: 'components.bracket_competitor.anatomy.root',
                descriptionFallback: 'Root element. Flex row with gap. role="button" and tabindex when interactive=true.'
            },
            {
                num: 2,
                cls: '.origam-bracket-competitor__seed',
                descriptionKey: 'components.bracket_competitor.anatomy.seed',
                descriptionFallback: 'Seed number prefix. Visible only when showSeed=true and competitor.seed != null.'
            },
            {
                num: 3,
                cls: '.origam-bracket-competitor__avatar',
                descriptionKey: 'components.bracket_competitor.anatomy.avatar',
                descriptionFallback: 'Competitor avatar image. Visible only when competitor.avatar is set.'
            },
            {
                num: 4,
                cls: '.origam-bracket-competitor__name',
                descriptionKey: 'components.bracket_competitor.anatomy.name',
                descriptionFallback: 'Competitor name. flex: 1 auto with overflow ellipsis. Shows "TBD" when competitor is null.'
            },
            {
                num: 5,
                cls: '.origam-bracket-competitor__advantage',
                descriptionKey: 'components.bracket_competitor.anatomy.advantage',
                descriptionFallback: 'Advantage badge (+N rounds head start). Visible only when advantageRounds > 0.'
            },
            {
                num: 6,
                cls: '.origam-bracket-competitor__score',
                descriptionKey: 'components.bracket_competitor.anatomy.score',
                descriptionFallback: 'Score cell. Right-aligned. Visible only when showScore=true. Shows "—" when score is undefined.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-bracket-competitor origam-bracket-competitor--interactive" role="button" tabindex="0">
  <span class="origam-bracket-competitor__seed">1</span>
  <img class="origam-bracket-competitor__avatar" src="..." alt="Team Alpha avatar" />
  <span class="origam-bracket-competitor__name">Team Alpha</span>
  <span class="origam-bracket-competitor__advantage" aria-label="2-round head start">+2</span>
  <span class="origam-bracket-competitor__score">3</span>
</div>`,
        classes: [
            {
                cls: 'origam-bracket-competitor',
                descriptionKey: 'components.bracket_competitor.anatomy.root',
                descriptionFallback: 'Root flex row element.'
            },
            {
                cls: 'origam-bracket-competitor__seed',
                descriptionKey: 'components.bracket_competitor.anatomy.seed',
                descriptionFallback: 'Seed number displayed before the name.'
            },
            {
                cls: 'origam-bracket-competitor__avatar',
                descriptionKey: 'components.bracket_competitor.anatomy.avatar',
                descriptionFallback: 'Avatar image (circular).'
            },
            {
                cls: 'origam-bracket-competitor__name',
                descriptionKey: 'components.bracket_competitor.anatomy.name',
                descriptionFallback: 'Competitor name with overflow ellipsis.'
            },
            {
                cls: 'origam-bracket-competitor__advantage',
                descriptionKey: 'components.bracket_competitor.anatomy.advantage',
                descriptionFallback: 'Advantage pill badge (+N).'
            },
            {
                cls: 'origam-bracket-competitor__score',
                descriptionKey: 'components.bracket_competitor.anatomy.score',
                descriptionFallback: 'Score value right-aligned.'
            },
            {
                cls: 'origam-bracket-competitor--winner',
                descriptionKey: 'components.bracket_competitor.anatomy.winner',
                descriptionFallback: 'Winner state: bolder text and intent-tinted background.'
            },
            {
                cls: 'origam-bracket-competitor--loser',
                descriptionKey: 'components.bracket_competitor.anatomy.loser',
                descriptionFallback: 'Loser state: reduced opacity.'
            },
            {
                cls: 'origam-bracket-competitor--tbd',
                descriptionKey: 'components.bracket_competitor.anatomy.tbd',
                descriptionFallback: 'TBD state: italic, reduced opacity.'
            },
            {
                cls: 'origam-bracket-competitor--interactive',
                descriptionKey: 'components.bracket_competitor.anatomy.interactive',
                descriptionFallback: 'Interactive state: cursor pointer, hover background, focus-visible outline.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-bracket-competitor---height',
            defaultValue: '36px',
            descriptionKey: 'components.bracket_competitor.css_vars.height',
            descriptionFallback: 'Minimum row height. compact: 28px, comfortable: 44px.'
        },
        {
            name: '--origam-bracket-competitor---padding-block',
            defaultValue: '4px',
            descriptionKey: 'components.bracket_competitor.css_vars.padding_block',
            descriptionFallback: 'Vertical padding. compact: 2px, comfortable: 8px.'
        },
        {
            name: '--origam-bracket-competitor---padding-inline',
            defaultValue: '12px',
            descriptionKey: 'components.bracket_competitor.css_vars.padding_inline',
            descriptionFallback: 'Horizontal padding of the row.'
        },
        {
            name: '--origam-bracket-competitor---gap',
            defaultValue: '8px',
            descriptionKey: 'components.bracket_competitor.css_vars.gap',
            descriptionFallback: 'Gap between seed, avatar, name, advantage and score.'
        },
        {
            name: '--origam-bracket-competitor---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.bracket_competitor.css_vars.font_size',
            descriptionFallback: 'Row font size. compact: 0.8125rem.'
        },
        {
            name: '--origam-bracket-competitor---color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.bracket_competitor.css_vars.color',
            descriptionFallback: 'Row text color.'
        },
        {
            name: '--origam-bracket-competitor---background-color',
            defaultValue: 'transparent',
            descriptionKey: 'components.bracket_competitor.css_vars.background_color',
            descriptionFallback: 'Row background color.'
        },
        {
            name: '--origam-bracket-competitor--winner---background-color',
            defaultValue: 'rgba(25, 118, 210, 0.08)',
            descriptionKey: 'components.bracket_competitor.css_vars.winner_background_color',
            descriptionFallback: 'Background tint applied when isWinner=true.'
        },
        {
            name: '--origam-bracket-score---min-width',
            defaultValue: '28px',
            descriptionKey: 'components.bracket_competitor.css_vars.score_min_width',
            descriptionFallback: 'Minimum width of the score column.'
        },
        {
            name: '--origam-bracket-avatar---size',
            defaultValue: '20px',
            descriptionKey: 'components.bracket_competitor.css_vars.avatar_size',
            descriptionFallback: 'Width and height of the competitor avatar.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.bracket_competitor.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.bracket_competitor.a11y.key_activate',
                actionFallback: 'Emits the click event when interactive=true.'
            },
            {
                key: 'Tab',
                actionKey: 'components.bracket_competitor.a11y.key_tab',
                actionFallback: 'Moves focus to the next interactive element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.bracket_competitor.a11y.aria_label_note',
                noteFallback: 'Dynamic aria-label is computed: "name, score N, winner" — screen readers announce the full match context.'
            },
            {
                noteKey: 'components.bracket_competitor.a11y.tbd_note',
                noteFallback: 'When competitor is null, aria-label becomes "To be determined".'
            },
            {
                noteKey: 'components.bracket_competitor.a11y.advantage_note',
                noteFallback: 'The advantage badge has its own aria-label: "N-round head start".'
            },
            {
                noteKey: 'components.bracket_competitor.a11y.focus_note',
                noteFallback: 'focus-visible outline: 2px solid primary color with -2px offset when interactive=true.'
            }
        ]
    } satisfies IComponentA11y
}
