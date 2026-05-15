<template>
	<Story
			group="components"
			title="Bracket/OrigamBracket"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBracketProps>({
					rounds: SINGLE_ELIM_8,
					variant: BRACKET_VARIANT.SINGLE_ELIMINATION,
					direction: DIRECTION.HORIZONTAL,
					density: DENSITY.DEFAULT,
					showRoundTitles: true,
					showScores: true,
					showSeed: false,
					interactive: true,
					color: 'primary'
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="bracket-playground">
					<origam-bracket
							v-bind="state"
							data-cy="bracket-playground-host"
							@match-click="onPlaygroundMatch"
					/>
					<div class="story-status" data-cy="bracket-playground-status">
						clicks = <strong>{{ playgroundClicks }}</strong> | lastMatch = <strong>{{ playgroundLast }}</strong>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="bracketVariantList"/>
				<HstSelect v-model="state.direction" title="direction" :options="bracketDirectionList"/>
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
				<HstCheckbox v-model="state.showRoundTitles" title="showRoundTitles"/>
				<HstCheckbox v-model="state.showScores" title="showScores"/>
				<HstCheckbox v-model="state.showSeed" title="showSeed"/>
				<HstCheckbox v-model="state.interactive" title="interactive"/>
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant title="Prop — variant">
			<div class="story-shell" data-cy="bracket-variant">
				<div class="story-col">
					<strong>single-elimination</strong>
					<origam-bracket
							:rounds="SINGLE_ELIM_8"
							:variant="BRACKET_VARIANT.SINGLE_ELIMINATION"
							data-cy="bracket-variant-single"
					/>
				</div>

				<div class="story-col">
					<strong>double-elimination</strong>
					<origam-bracket
							:rounds="DOUBLE_ELIM_4"
							:variant="BRACKET_VARIANT.DOUBLE_ELIMINATION"
							data-cy="bracket-variant-double"
					/>
				</div>

				<div class="story-col">
					<strong>round-robin</strong>
					<origam-bracket
							:rounds="ROUND_ROBIN_4"
							:variant="BRACKET_VARIANT.ROUND_ROBIN"
							data-cy="bracket-variant-rr"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — direction">
			<div class="story-shell" data-cy="bracket-direction">
				<div class="story-col" data-cy="bracket-direction-h">
					<strong>horizontal</strong>
					<origam-bracket
							:rounds="SINGLE_ELIM_4"
							:direction="DIRECTION.HORIZONTAL"
							data-cy="bracket-direction-h-host"
					/>
				</div>
				<div class="story-col" data-cy="bracket-direction-v">
					<strong>vertical</strong>
					<origam-bracket
							:rounds="SINGLE_ELIM_4"
							:direction="DIRECTION.VERTICAL"
							data-cy="bracket-direction-v-host"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — density">
			<div class="story-shell" data-cy="bracket-density">
				<div class="story-col">
					<strong>default</strong>
					<origam-bracket
							:rounds="SINGLE_ELIM_4"
							:density="DENSITY.DEFAULT"
							data-cy="bracket-density-default"
					/>
				</div>
				<div class="story-col">
					<strong>compact</strong>
					<origam-bracket
							:rounds="SINGLE_ELIM_4"
							:density="DENSITY.COMPACT"
							data-cy="bracket-density-compact"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — match">
			<div class="story-shell" data-cy="bracket-slot-match">
				<origam-bracket
						:rounds="SINGLE_ELIM_4"
						data-cy="bracket-slot-match-host"
				>
					<template #match="{ match }">
						<div class="custom-match" data-cy="bracket-slot-match-card">
							<strong>{{ match.competitorA?.name ?? 'TBD' }}</strong>
							vs
							<strong>{{ match.competitorB?.name ?? 'TBD' }}</strong>
						</div>
					</template>
				</origam-bracket>
			</div>
		</Variant>

		<Variant title="Slot — competitor">
			<div class="story-shell" data-cy="bracket-slot-competitor">
				<origam-bracket
						:rounds="SINGLE_ELIM_4"
						data-cy="bracket-slot-competitor-host"
				>
					<template #competitor="{ competitor, isWinner }">
						<div
								:class="['custom-competitor', { 'custom-competitor--winner': isWinner }]"
								data-cy="bracket-slot-competitor-row"
						>
							<span class="custom-competitor__flag">🏳️</span>
							<span>{{ competitor?.name ?? 'TBD' }}</span>
						</div>
					</template>
				</origam-bracket>
			</div>
		</Variant>

		<Variant title="Emit — match-click">
			<div class="story-shell" data-cy="bracket-emit">
				<origam-bracket
						:rounds="SINGLE_ELIM_4"
						data-cy="bracket-emit-host"
						@match-click="onEmitMatch"
				/>
				<div class="story-status" data-cy="bracket-emit-status">
					clicks = <strong data-cy="bracket-emit-counter">{{ emitClicks }}</strong>
					| last = <strong>{{ emitLast }}</strong>
				</div>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamBracket } from '@origam/components'
	import { BRACKET_VARIANT, DENSITY, DIRECTION } from '@origam/enums'
	import type {
		IBracketMatch,
		IBracketProps,
		IBracketRound,
		IOptions
	} from '@origam/interfaces'
	import type { TBracketVariant } from '@origam/types'

	import { densityList, intentList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const bracketVariantList: Array<IOptions<TBracketVariant>> = [
		{label: 'single-elimination', value: BRACKET_VARIANT.SINGLE_ELIMINATION},
		{label: 'double-elimination', value: BRACKET_VARIANT.DOUBLE_ELIMINATION},
		{label: 'round-robin', value: BRACKET_VARIANT.ROUND_ROBIN}
	]

	const bracketDirectionList: Array<IOptions<'horizontal' | 'vertical'>> = [
		{label: 'horizontal', value: DIRECTION.HORIZONTAL},
		{label: 'vertical', value: DIRECTION.VERTICAL}
	]

	const SINGLE_ELIM_8: IBracketRound[] = [
		{
			id: 'qf',
			title: 'Quarter-finals',
			matches: [
				{
					id: 'qf1',
					competitorA: {id: 't1', name: 'T1', seed: 1},
					competitorB: {id: 'navi', name: 'NaVi', seed: 8},
					scoreA: 2,
					scoreB: 0,
					winnerId: 't1',
					status: 'completed',
					nextMatchId: 'sf1'
				},
				{
					id: 'qf2',
					competitorA: {id: 'g2', name: 'G2', seed: 5},
					competitorB: {id: 'tl', name: 'Team Liquid', seed: 4},
					scoreA: 2,
					scoreB: 1,
					winnerId: 'g2',
					status: 'completed',
					nextMatchId: 'sf1'
				},
				{
					id: 'qf3',
					competitorA: {id: 'fnc', name: 'FNATIC', seed: 3},
					competitorB: {id: 'astralis', name: 'Astralis', seed: 6},
					scoreA: 0,
					scoreB: 2,
					winnerId: 'astralis',
					status: 'completed',
					nextMatchId: 'sf2'
				},
				{
					id: 'qf4',
					competitorA: {id: 'c9', name: 'Cloud9', seed: 7},
					competitorB: {id: 'faze', name: 'FaZe', seed: 2},
					scoreA: 1,
					scoreB: 2,
					winnerId: 'faze',
					status: 'completed',
					nextMatchId: 'sf2'
				}
			]
		},
		{
			id: 'sf',
			title: 'Semi-finals',
			matches: [
				{
					id: 'sf1',
					competitorA: {id: 't1', name: 'T1', seed: 1},
					competitorB: {id: 'g2', name: 'G2', seed: 5},
					scoreA: 2,
					scoreB: 1,
					winnerId: 't1',
					status: 'completed',
					nextMatchId: 'final'
				},
				{
					id: 'sf2',
					competitorA: {id: 'astralis', name: 'Astralis', seed: 6},
					competitorB: {id: 'faze', name: 'FaZe', seed: 2},
					status: 'live',
					nextMatchId: 'final'
				}
			]
		},
		{
			id: 'final',
			title: 'Final',
			matches: [
				{
					id: 'final',
					competitorA: {id: 't1', name: 'T1', seed: 1},
					competitorB: null,
					status: 'pending'
				}
			]
		}
	]

	const SINGLE_ELIM_4: IBracketRound[] = [
		{
			id: 'sf',
			title: 'Semi-finals',
			matches: [
				{
					id: 'sf1',
					competitorA: {id: 't1', name: 'T1', seed: 1},
					competitorB: {id: 'g2', name: 'G2', seed: 4},
					scoreA: 2,
					scoreB: 0,
					winnerId: 't1',
					nextMatchId: 'f1'
				},
				{
					id: 'sf2',
					competitorA: {id: 'fnc', name: 'FNATIC', seed: 2},
					competitorB: {id: 'tl', name: 'Team Liquid', seed: 3},
					scoreA: 1,
					scoreB: 2,
					winnerId: 'tl',
					nextMatchId: 'f1'
				}
			]
		},
		{
			id: 'final',
			title: 'Final',
			matches: [
				{
					id: 'f1',
					competitorA: {id: 't1', name: 'T1', seed: 1},
					competitorB: {id: 'tl', name: 'Team Liquid', seed: 3},
					scoreA: 3,
					scoreB: 2,
					winnerId: 't1',
					status: 'completed'
				}
			]
		}
	]

	const DOUBLE_ELIM_4: IBracketRound[] = [
		{
			id: 'wb-sf',
			title: 'Winner semis',
			side: 'winner',
			matches: [
				{
					id: 'wsf1',
					competitorA: {id: 't1', name: 'T1'},
					competitorB: {id: 'g2', name: 'G2'},
					scoreA: 2, scoreB: 0, winnerId: 't1'
				},
				{
					id: 'wsf2',
					competitorA: {id: 'fnc', name: 'FNATIC'},
					competitorB: {id: 'tl', name: 'Team Liquid'},
					scoreA: 1, scoreB: 2, winnerId: 'tl'
				}
			]
		},
		{
			id: 'wb-f',
			title: 'Winner final',
			side: 'winner',
			matches: [
				{
					id: 'wf',
					competitorA: {id: 't1', name: 'T1'},
					competitorB: {id: 'tl', name: 'Team Liquid'},
					scoreA: 2, scoreB: 1, winnerId: 't1'
				}
			]
		},
		{
			id: 'lb-f',
			title: 'Loser final',
			side: 'loser',
			matches: [
				{
					id: 'lf',
					competitorA: {id: 'g2', name: 'G2'},
					competitorB: {id: 'fnc', name: 'FNATIC'},
					scoreA: 2, scoreB: 0, winnerId: 'g2'
				}
			]
		},
		{
			id: 'gf',
			title: 'Grand final',
			side: 'grand-final',
			matches: [
				{
					id: 'gf',
					competitorA: {id: 't1', name: 'T1'},
					competitorB: {id: 'tl', name: 'Team Liquid'},
					status: 'pending'
				}
			]
		}
	]

	const ROUND_ROBIN_4: IBracketRound[] = [
		{
			id: 'rr',
			title: 'Group stage',
			matches: [
				{
					id: 'rr1',
					competitorA: {id: 't1', name: 'T1'},
					competitorB: {id: 'g2', name: 'G2'},
					scoreA: 2, scoreB: 1, winnerId: 't1'
				},
				{
					id: 'rr2',
					competitorA: {id: 't1', name: 'T1'},
					competitorB: {id: 'fnc', name: 'FNATIC'},
					scoreA: 2, scoreB: 0, winnerId: 't1'
				},
				{
					id: 'rr3',
					competitorA: {id: 't1', name: 'T1'},
					competitorB: {id: 'tl', name: 'Team Liquid'},
					scoreA: 1, scoreB: 2, winnerId: 'tl'
				},
				{
					id: 'rr4',
					competitorA: {id: 'g2', name: 'G2'},
					competitorB: {id: 'fnc', name: 'FNATIC'},
					scoreA: 2, scoreB: 1, winnerId: 'g2'
				},
				{
					id: 'rr5',
					competitorA: {id: 'g2', name: 'G2'},
					competitorB: {id: 'tl', name: 'Team Liquid'},
					scoreA: 0, scoreB: 2, winnerId: 'tl'
				},
				{
					id: 'rr6',
					competitorA: {id: 'fnc', name: 'FNATIC'},
					competitorB: {id: 'tl', name: 'Team Liquid'},
					scoreA: 1, scoreB: 2, winnerId: 'tl'
				}
			]
		}
	]

	const playgroundClicks = ref<number>(0)
	const playgroundLast = ref<string>('—')
	const onPlaygroundMatch = (match: IBracketMatch) => {
		playgroundClicks.value += 1
		playgroundLast.value = String(match.id)
		logEvent('match-click', match)
	}

	const emitClicks = ref<number>(0)
	const emitLast = ref<string>('—')
	const onEmitMatch = (match: IBracketMatch) => {
		emitClicks.value += 1
		emitLast.value = String(match.id)
		logEvent('match-click', match)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 16px;
		overflow: auto;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-status {
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66));
	}

	.custom-match {
		padding: 12px;
		border: 1px dashed var(--origam-color__action--primary---bg, #1976d2);
		border-radius: 6px;
		font: 0.875rem/1.4 system-ui, sans-serif;
		display: flex;
		align-items: center;
		gap: 6px;
		background: var(--origam-color__surface---default, #fff);
	}

	.custom-competitor {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		font: 0.875rem/1.4 system-ui, sans-serif;
	}

	.custom-competitor--winner {
		font-weight: 700;
		color: var(--origam-color__action--primary---bg, #1976d2);
	}

	.custom-competitor__flag {
		font-size: 1rem;
	}
</style>

<docs lang="md" src="@docs/components/Bracket/OrigamBracket.md"/>
