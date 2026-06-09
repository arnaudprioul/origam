<template>
	<Story
			group="components"
			title="Bracket/OrigamBracketCompetitor"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IBracketCompetitorProps>>({
					color: 'primary',
					showScore: true,
					showSeed: false
				})"
		>
			<template #default="{ state }">
				<div class="story-competitor-shell">
					<origam-bracket-competitor
							:competitor="COMPETITOR"
							:score="2"
							:color="state.color"
							:bg-color="state.bgColor"
							:show-score="state.showScore"
							:show-seed="state.showSeed"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Display">
					<HstCheckbox v-model="state.showScore" title="Show Score"/>
					<HstCheckbox v-model="state.showSeed"  title="Show Seed"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="State">
			<div class="story-competitor-shell">
				<origam-bracket-competitor :competitor="COMPETITOR" :score="2" :is-winner="true"/>
				<origam-bracket-competitor :competitor="COMPETITOR_B" :score="0" :is-loser="true"/>
				<origam-bracket-competitor :competitor="COMPETITOR" :score="1" :advantage-rounds="1"/>
				<origam-bracket-competitor :competitor="COMPETITOR_AVATAR" :score="3"/>
				<origam-bracket-competitor :competitor="null"/>
			</div>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IBracketCompetitorProps>>({
					interactive: true,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<div class="story-competitor-shell">
					<origam-bracket-competitor
							:competitor="COMPETITOR"
							:score="2"
							:interactive="state.interactive"
							:tag="state.tag"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.interactive" title="Interactive"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - click">
			<div class="story-competitor-shell" data-cy="competitor-emit-click">
				<origam-bracket-competitor
						:competitor="COMPETITOR"
						:score="2"
						@click="logEvent('click', $event)"
				/>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IBracketCompetitorProps>({
					competitor: COMPETITOR,
					score: 2,
					color: 'primary',
					bgColor: undefined,
					isWinner: false,
					isLoser: false,
					advantageRounds: 0,
					showScore: true,
					showSeed: true,
					interactive: true,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<div class="story-competitor-shell">
					<origam-bracket-competitor
							v-bind="state"
							@click="logEvent('click', $event)"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstNumber v-model="state.score"   title="Score"/>
				</StoryGroup>
				<StoryGroup title="State">
					<HstCheckbox v-model="state.isWinner" title="Is Winner"/>
					<HstCheckbox v-model="state.isLoser"  title="Is Loser"/>
					<HstNumber   v-model="state.advantageRounds" title="Advantage Rounds"/>
				</StoryGroup>
				<StoryGroup title="Display">
					<HstCheckbox v-model="state.showScore" title="Show Score"/>
					<HstCheckbox v-model="state.showSeed"  title="Show Seed"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.interactive" title="Interactive"/>
					<HstSelect   v-model="state.tag"         title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBracketCompetitor } from '@origam/components'
	import type { IBracketCompetitor, IBracketCompetitorProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS, TAG_OPTIONS } from '@stories/const'

	const COMPETITOR: IBracketCompetitor = { id: 't1', name: 'T1', seed: 1 }
	const COMPETITOR_B: IBracketCompetitor = { id: 'g2', name: 'G2', seed: 4 }
	const COMPETITOR_AVATAR: IBracketCompetitor = {
		id: 'tl',
		name: 'Team Liquid',
		seed: 3,
		avatar: 'https://i.pravatar.cc/40?img=12'
	}
</script>

<style scoped>
	.story-competitor-shell {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 240px;
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 6px;
		padding: 4px;
	}
</style>

<docs lang="md" src="@docs/components/Bracket/OrigamBracketCompetitor.md"/>
