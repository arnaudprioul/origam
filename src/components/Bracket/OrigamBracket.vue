<template>
	<component
			:is="tag"
			:id="resolvedId"
			:aria-label="ariaLabel"
			:class="rootClasses"
			:style="rootStyles"
			role="region"
	>
		<template v-if="variant === BRACKET_VARIANT.ROUND_ROBIN">
			<div
					class="origam-bracket__round-robin"
					data-cy="origam-bracket-round-robin"
					role="table"
			>
				<div
						class="origam-bracket__rr-row origam-bracket__rr-row--head"
						role="row"
				>
					<div
							class="origam-bracket__rr-corner"
							role="columnheader"
					/>
					<div
							v-for="competitor in roundRobinCompetitors"
							:key="`head-${competitor.id}`"
							:title="competitor.name"
							class="origam-bracket__rr-head"
							role="columnheader"
					>
						{{ competitor.name }}
					</div>
				</div>
				<div
						v-for="row in roundRobinCompetitors"
						:key="`row-${row.id}`"
						class="origam-bracket__rr-row"
						role="row"
				>
					<div
							:title="row.name"
							class="origam-bracket__rr-head origam-bracket__rr-head--row"
							role="rowheader"
					>
						{{ row.name }}
					</div>
					<div
							v-for="col in roundRobinCompetitors"
							:key="`cell-${row.id}-${col.id}`"
							:aria-label="describeRoundRobinCell(row, col)"
							:class="roundRobinCellClasses(row, col)"
							role="cell"
							@click="onRoundRobinCellClick(row, col, $event)"
					>
						<template v-if="row.id === col.id">
							—
						</template>
						<template v-else>
							{{ roundRobinScore(row, col) }}
						</template>
					</div>
				</div>
			</div>
		</template>

		<template v-else>
			<div
					:class="treeClasses"
					data-cy="origam-bracket-tree"
			>
				<svg
						v-if="showConnectors"
						:viewBox="connectorViewBox"
						aria-hidden="true"
						class="origam-bracket__connectors"
						preserveAspectRatio="none"
				>
					<template
							v-for="path in connectorPaths"
							:key="path.key"
					>
						<slot
								name="connector"
								:from="path.from"
								:to="path.to"
						>
							<path
									:class="['origam-bracket__connector', { 'origam-bracket__connector--winner': path.winner }]"
									:d="path.d"
									fill="none"
							/>
						</slot>
					</template>
				</svg>

				<origam-bracket-round
						v-for="(round, index) in displayRounds"
						:key="round.id"
						:color="color"
						:data-cy="`origam-bracket-round-${index}`"
						:direction="direction"
						:index="index"
						:interactive="interactive"
						:round="round"
						:show-round-title="showRoundTitles"
						:show-scores="showScores"
						:show-seed="showSeed"
						:style="roundStyleFor(index)"
						:total-rounds="displayRounds.length"
						class="origam-bracket__round"
						@competitor-click="onCompetitorClick"
						@match-click="onMatchClick"
						@winner-click="onWinnerClick"
				>
					<template
							v-if="$slots['round-title']"
							#round-title="scope"
					>
						<slot
								name="round-title"
								v-bind="scope"
						/>
					</template>
					<template
							v-if="$slots.match"
							#match="scope"
					>
						<slot
								name="match"
								v-bind="scope"
						/>
					</template>
					<template
							v-if="$slots.competitor"
							#competitor="scope"
					>
						<slot
								name="competitor"
								v-bind="scope"
						/>
					</template>
				</origam-bracket-round>
			</div>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'

	import OrigamBracketRound from './OrigamBracketRound.vue'

	import { useProps, useRounded } from '../../composables'

	import {
		BRACKET_DEFAULT_MATCH_GAP,
		BRACKET_DEFAULT_MATCH_HEIGHT,
		BRACKET_DEFAULT_MATCH_WIDTH,
		BRACKET_DEFAULT_ROUND_GAP
	} from '../../consts'

	import { BRACKET_VARIANT, DIRECTION } from '../../enums'

	import type {
		IBracketCompetitor,
		IBracketMatch,
		IBracketProps,
		IBracketRound
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 ********************************************************/
	const props = withDefaults(defineProps<IBracketProps>(), {
		tag: 'div',
		variant: BRACKET_VARIANT.SINGLE_ELIMINATION,
		direction: DIRECTION.HORIZONTAL,
		showRoundTitles: true,
		showScores: true,
		showSeed: false,
		interactive: true,
		color: 'primary'
	})

	const emit = defineEmits<{
		(e: 'match-click', match: IBracketMatch, round: IBracketRound, event: MouseEvent): void
		(e: 'winner-click', competitor: IBracketCompetitor, match: IBracketMatch, event: MouseEvent | KeyboardEvent): void
		(e: 'competitor-click', competitor: IBracketCompetitor, match: IBracketMatch, event: MouseEvent | KeyboardEvent): void
	}>()

	const {filterProps} = useProps<IBracketProps>(props)

	const resolvedId = computed(() => props.id ?? 'origam-bracket')
	const ariaLabel = 'Tournament bracket'

	/*********************************************************
	 * Display rounds
	 *
	 * @description
	 * Single-elimination and round-robin pass straight through.
	 * Double-elimination sorts rounds into Winner Bracket, then
	 * Loser Bracket, then Grand Final — preserving the input
	 * order within each group.
	 ********************************************************/
	const displayRounds = computed<IBracketRound[]>(() => {
		if (props.variant !== BRACKET_VARIANT.DOUBLE_ELIMINATION) return props.rounds

		const winners = props.rounds.filter(r => r.side === 'winner' || r.side === undefined)
		const losers = props.rounds.filter(r => r.side === 'loser')
		const grandFinals = props.rounds.filter(r => r.side === 'grand-final')

		return [...winners, ...losers, ...grandFinals]
	})

	/*********************************************************
	 * Round-robin computed
	 *
	 * @description
	 * For round-robin we ignore the round axis and collapse
	 * every match into a competitor x competitor lookup.
	 ********************************************************/
	const roundRobinCompetitors = computed<IBracketCompetitor[]>(() => {
		const seen = new Map<string | number, IBracketCompetitor>()

		for (const round of props.rounds) {
			for (const match of round.matches) {
				if (match.competitorA && !seen.has(match.competitorA.id)) {
					seen.set(match.competitorA.id, match.competitorA)
				}
				if (match.competitorB && !seen.has(match.competitorB.id)) {
					seen.set(match.competitorB.id, match.competitorB)
				}
			}
		}

		return Array.from(seen.values())
	})

	const roundRobinMap = computed<Map<string, IBracketMatch>>(() => {
		const out = new Map<string, IBracketMatch>()

		for (const round of props.rounds) {
			for (const match of round.matches) {
				if (!match.competitorA || !match.competitorB) continue

				const aId = match.competitorA.id
				const bId = match.competitorB.id

				out.set(`${aId}|${bId}`, match)
			}
		}

		return out
	})

	const findRoundRobinMatch = (rowId: string | number, colId: string | number): IBracketMatch | undefined => {
		return roundRobinMap.value.get(`${rowId}|${colId}`) ?? roundRobinMap.value.get(`${colId}|${rowId}`)
	}

	const roundRobinScore = (row: IBracketCompetitor, col: IBracketCompetitor): string => {
		const match = findRoundRobinMatch(row.id, col.id)
		if (!match) return ''

		const isOrderedNormal = match.competitorA?.id === row.id
		const rowScore = isOrderedNormal ? match.scoreA : match.scoreB
		const colScore = isOrderedNormal ? match.scoreB : match.scoreA

		if (rowScore == null && colScore == null) return ''

		return `${rowScore ?? '—'} – ${colScore ?? '—'}`
	}

	const roundRobinCellClasses = (row: IBracketCompetitor, col: IBracketCompetitor) => {
		const isDiag = row.id === col.id
		const match = findRoundRobinMatch(row.id, col.id)
		const isWinner = match?.winnerId === row.id

		return [
			'origam-bracket__rr-cell',
			{
				'origam-bracket__rr-cell--diag': isDiag,
				'origam-bracket__rr-cell--winner': isWinner,
				'origam-bracket__rr-cell--clickable': !isDiag && match && props.interactive
			}
		]
	}

	const describeRoundRobinCell = (row: IBracketCompetitor, col: IBracketCompetitor): string => {
		if (row.id === col.id) return `${row.name} versus itself, not applicable`

		const match = findRoundRobinMatch(row.id, col.id)
		if (!match) return `${row.name} vs ${col.name}, no match`

		const score = roundRobinScore(row, col)

		return `${row.name} vs ${col.name}${score ? `, score ${score}` : ''}`
	}

	const onRoundRobinCellClick = (row: IBracketCompetitor, col: IBracketCompetitor, event: MouseEvent) => {
		if (row.id === col.id) return

		const match = findRoundRobinMatch(row.id, col.id)
		if (!match) return

		const round = props.rounds.find(r => r.matches.some(m => m.id === match.id))
		if (!round) return

		emit('match-click', match, round, event)
	}

	/*********************************************************
	 * Connector layout
	 *
	 * @description
	 * Pure-function path computation. Each round occupies one
	 * column of width `matchWidth`. Matches inside a round are
	 * evenly spaced — the spacing doubles at each round so the
	 * tree branches classically.
	 *
	 * Connector path = horizontal exit (16px) + vertical
	 * traversal to the centre of the target match + horizontal
	 * entry (16px).
	 ********************************************************/
	const matchWidth = BRACKET_DEFAULT_MATCH_WIDTH
	const matchHeight = BRACKET_DEFAULT_MATCH_HEIGHT
	const baseGap = BRACKET_DEFAULT_MATCH_GAP
	const roundGap = BRACKET_DEFAULT_ROUND_GAP

	const isHorizontal = computed<boolean>(() => props.direction === DIRECTION.HORIZONTAL)

	/*********************************************************
	 * Round thickness — direction-aware
	 *
	 * @description
	 * In horizontal mode each round is a column of width `matchWidth`
	 * (~240 px). In vertical mode each round is a row whose thickness
	 * controls how compact the bracket is vertically AND where the SVG
	 * connectors anchor. Using `matchWidth` (240) leaves a lot of empty
	 * space below every match card; using a tighter value keeps the
	 * connectors aligned with the cards while shrinking the layout.
	 ********************************************************/
	const verticalRoundThickness = 120
	const roundThickness = computed<number>(() => isHorizontal.value ? matchWidth : verticalRoundThickness)

	const showConnectors = computed<boolean>(() => {
		if (props.variant === BRACKET_VARIANT.ROUND_ROBIN) return false

		return displayRounds.value.length > 1
	})

	const maxMatchesInRound = computed<number>(() => {
		let max = 1

		for (const r of displayRounds.value) {
			if (r.matches.length > max) max = r.matches.length
		}

		return max
	})

	const totalHeight = computed<number>(() => {
		return maxMatchesInRound.value * (matchHeight + baseGap)
	})

	const totalWidth = computed<number>(() => {
		const n = displayRounds.value.length

		return n * roundThickness.value + (n - 1) * roundGap
	})

	const connectorViewBox = computed<string>(() => {
		if (isHorizontal.value) {
			return `0 0 ${totalWidth.value} ${totalHeight.value}`
		}

		return `0 0 ${totalHeight.value} ${totalWidth.value}`
	})

	type TConnectorPath = {
		key: string
		d: string
		from: { matchId: IBracketMatch['id']; x: number; y: number }
		to: { matchId: IBracketMatch['id']; x: number; y: number }
		winner: boolean
	}

	const matchYCenter = (_roundIndex: number, matchIndex: number, roundMatchCount: number): number => {
		// Each round is vertically centered. Matches share the available
		// height evenly.
		const slot = totalHeight.value / roundMatchCount

		return slot * matchIndex + slot / 2
	}

	const matchXCenter = (roundIndex: number): number => {
		const t = roundThickness.value
		return roundIndex * (t + roundGap) + t / 2
	}

	const connectorPaths = computed<TConnectorPath[]>(() => {
		if (!showConnectors.value) return []

		const paths: TConnectorPath[] = []

		for (let r = 0; r < displayRounds.value.length - 1; r += 1) {
			const round = displayRounds.value[r]
			const nextRound = displayRounds.value[r + 1]

			for (let i = 0; i < round.matches.length; i += 1) {
				const match = round.matches[i]
				let nextIndex = -1
				let nextMatch: IBracketMatch | undefined

				if (match.nextMatchId != null) {
					nextIndex = nextRound.matches.findIndex(m => m.id === match.nextMatchId)
					if (nextIndex !== -1) nextMatch = nextRound.matches[nextIndex]
				}

				if (nextIndex === -1) {
					// Positional fallback: i -> floor(i / 2)
					nextIndex = Math.floor(i / 2)
					nextMatch = nextRound.matches[nextIndex]
				}

				if (!nextMatch) continue

				const fromXCenter = matchXCenter(r)
				const toXCenter = matchXCenter(r + 1)
				const fromX = fromXCenter + roundThickness.value / 2
				const toX = toXCenter - roundThickness.value / 2
				const fromY = matchYCenter(r, i, round.matches.length)
				const toY = matchYCenter(r + 1, nextIndex, nextRound.matches.length)
				const midX = (fromX + toX) / 2

				const isWinnerPath = match.winnerId != null

				const horiz = isHorizontal.value
				const d = horiz
					? `M ${fromX},${fromY} L ${midX},${fromY} L ${midX},${toY} L ${toX},${toY}`
					: `M ${fromY},${fromX} L ${fromY},${midX} L ${toY},${midX} L ${toY},${toX}`

				paths.push({
					key: `${match.id}-${nextMatch.id}`,
					d,
					from: {matchId: match.id, x: fromX, y: fromY},
					to: {matchId: nextMatch.id, x: toX, y: toY},
					winner: isWinnerPath
				})
			}
		}

		return paths
	})

	const roundStyleFor = (_index: number): StyleValue => {
		const minHeight = `${totalHeight.value}px`

		if (isHorizontal.value) {
			return {
				minHeight,
				width: `${matchWidth}px`,
				flex: '0 0 auto'
			}
		}

		return {
			minWidth: `${totalHeight.value}px`,
			height: `${verticalRoundThickness}px`,
			flex: '0 0 auto'
		}
	}

	/*********************************************************
	 * Event proxies
	 ********************************************************/
	const onMatchClick = (match: IBracketMatch, event: MouseEvent) => {
		const round = displayRounds.value.find(r => r.matches.some(m => m.id === match.id))
		if (!round) return

		emit('match-click', match, round, event)
	}

	const onWinnerClick = (competitor: IBracketCompetitor, match: IBracketMatch, event: MouseEvent | KeyboardEvent) => {
		emit('winner-click', competitor, match, event)
	}

	const onCompetitorClick = (competitor: IBracketCompetitor, match: IBracketMatch, _side: 'A' | 'B', event: MouseEvent | KeyboardEvent) => {
		emit('competitor-click', competitor, match, event)
	}

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const {roundedClasses, roundedStyles} = useRounded(props)

	const rootStyles = computed<StyleValue>(() => {
		return [
			roundedStyles.value,
			{
				'--origam-bracket---round-gap': `${roundGap}px`,
				'--origam-bracket---match-gap': `${baseGap}px`
			},
			props.style
		] as StyleValue
	})

	const rootClasses = computed(() => {
		return [
			'origam-bracket',
			`origam-bracket--variant-${props.variant}`,
			`origam-bracket--direction-${props.direction}`,
			`origam-bracket--density-${props.density ?? 'default'}`,
			`origam-bracket--color-${props.color}`,
			roundedClasses.value,
			props.class
		]
	})

	const treeClasses = computed(() => {
		return [
			'origam-bracket__tree',
			`origam-bracket__tree--direction-${props.direction}`
		]
	})

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		filterProps,
		displayRounds,
		connectorPaths,
		roundRobinCompetitors
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-bracket {
		display: block;
		position: relative;
		color: var(--origam-bracket---color, currentColor);
		background-color: var(--origam-bracket---background-color, transparent);
		padding-block: var(--origam-bracket---padding-block, 16px);
		padding-inline: var(--origam-bracket---padding-inline, 16px);
		overflow: auto;

		&__tree {
			display: flex;
			position: relative;
			gap: var(--origam-bracket---round-gap, 48px);
			min-width: max-content;

			&--direction-horizontal {
				flex-direction: row;
				align-items: stretch;
			}

			&--direction-vertical {
				flex-direction: column;
				align-items: stretch;
			}
		}

		&__round {
			position: relative;
			z-index: 1;
		}

		&__connectors {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
			z-index: 0;
			overflow: visible;
		}

		&__connector {
			stroke: var(--origam-bracket-connector---stroke-color, var(--origam-color__border---default, rgba(0, 0, 0, 0.24)));
			stroke-width: var(--origam-bracket-connector---stroke-width, 1px);

			&--winner {
				stroke: var(--origam-bracket-connector---stroke-color-winner, var(--origam-color__action--primary---bg, #1976d2));
				stroke-width: calc(var(--origam-bracket-connector---stroke-width, 1px) + 1px);
			}
		}

		&__round-robin {
			display: grid;
			gap: 1px;
			background: var(--origam-color__border---subtle, rgba(0, 0, 0, 0.08));
			border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.08));
			border-radius: 6px;
			overflow: hidden;
			min-width: max-content;
		}

		&__rr-row {
			display: grid;
			grid-template-columns: 200px repeat(auto-fit, minmax(72px, 1fr));
			gap: 1px;
		}

		&__rr-corner {
			background: var(--origam-bracket-round-robin---header-background, var(--origam-color__surface---subtle, #f5f5f5));
		}

		&__rr-head {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px 12px;
			background: var(--origam-bracket-round-robin---header-background, var(--origam-color__surface---subtle, #f5f5f5));
			color: var(--origam-bracket-round-robin---header-color, var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)));
			font-size: 0.8125rem;
			font-weight: 600;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;

			&--row {
				justify-content: flex-start;
			}
		}

		&__rr-cell {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: var(--origam-bracket-round-robin---cell-size, 56px);
			padding: 8px;
			background: var(--origam-bracket-round-robin---cell-background, var(--origam-color__surface---default, #fff));
			font-size: 0.8125rem;
			color: var(--origam-color__text---primary, #1a1a1a);

			&--diag {
				background: var(--origam-bracket-round-robin---cell-background-diag, var(--origam-color__surface---subtle, #f5f5f5));
				color: var(--origam-color__text---tertiary, rgba(0, 0, 0, 0.4));
			}

			&--winner {
				font-weight: 600;
				color: var(--origam-color__action--primary---fg, #1976d2);
			}

			&--clickable {
				cursor: pointer;

				&:hover {
					background: var(--origam-color__surface---elevated, #fafafa);
				}
			}
		}

		&--density-compact {
			--origam-bracket-match---min-height: 56px;
			--origam-bracket-competitor---height: 28px;
			--origam-bracket-round---match-gap: 16px;
		}
	}
</style>

<style>
	:root {
		--origam-bracket---round-gap: 48px;
		--origam-bracket---match-gap: 24px;
		--origam-bracket---padding-block: 16px;
		--origam-bracket---padding-inline: 16px;
		--origam-bracket-connector---stroke-width: 1px;
	}
</style>
