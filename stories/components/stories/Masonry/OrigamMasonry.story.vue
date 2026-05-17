<template>
	<Story
			group="components"
			title="Masonry/OrigamMasonry"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IMasonryProps>({
					columns: 3,
					gap: 'md',
					animated: true,
					align: 'top'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="masonry-playground"
				>
					<origam-masonry
							v-bind="state"
							class="masonry-host"
							data-cy="masonry-playground-host"
					>
						<div
								v-for="card in playgroundCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
								data-cy="masonry-playground-card"
						>
							<span class="card__index">#{{ card.id }}</span>
							<span class="card__height">{{ card.height }}px</span>
						</div>
					</origam-masonry>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.columns"
						title="columns"
						:min="1"
						:max="8"
				/>
				<HstSelect
						v-model="state.gap"
						title="gap"
						:options="masonryGapList"
				/>
				<HstSelect
						v-model="state.align"
						title="align"
						:options="masonryAlignList"
				/>
				<HstCheckbox
						v-model="state.animated"
						title="animated"
				/>
			</template>
		</Variant>

		<Variant title="Prop — columns">
			<div
					class="story-shell"
					data-cy="masonry-columns"
			>
				<div
						v-for="count in [2, 3, 4, 5]"
						:key="count"
						class="story-col"
				>
					<strong>columns = {{ count }}</strong>
					<origam-masonry
							:columns="count"
							gap="sm"
							class="masonry-host"
							:data-cy="`masonry-columns-${count}`"
					>
						<div
								v-for="card in playgroundCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							#{{ card.id }}
						</div>
					</origam-masonry>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — columnBreakpoints">
			<div
					class="story-shell"
					data-cy="masonry-breakpoints"
			>
				<p class="hint">
					Resize the panel — the column count adapts via container
					query (≥ 480 px → 2 cols, ≥ 720 px → 3 cols, ≥ 960 px → 4 cols).
				</p>
				<origam-masonry
						:columns="1"
						:column-breakpoints="{ 480: 2, 720: 3, 960: 4 }"
						gap="sm"
						class="masonry-host"
						data-cy="masonry-breakpoints-host"
				>
					<div
							v-for="card in playgroundCards"
							:key="card.id"
							class="card"
							:style="{ height: card.height + 'px' }"
					>
						#{{ card.id }} — {{ card.height }}px
					</div>
				</origam-masonry>
			</div>
		</Variant>

		<Variant title="Prop — gap">
			<div
					class="story-shell"
					data-cy="masonry-gap"
			>
				<div
						v-for="size in masonryGapSizes"
						:key="size"
						class="story-col"
				>
					<strong>gap = {{ size }}</strong>
					<origam-masonry
							:columns="3"
							:gap="size"
							class="masonry-host"
							:data-cy="`masonry-gap-${size}`"
					>
						<div
								v-for="card in playgroundCards.slice(0, 9)"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							#{{ card.id }}
						</div>
					</origam-masonry>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — animated">
			<div
					class="story-shell"
					data-cy="masonry-animated"
			>
				<p class="hint">
					Click the button to shuffle the items; observe the transition
					behaviour for `animated=true` vs `animated=false`.
				</p>
				<button
						class="story-btn"
						data-cy="masonry-animated-shuffle"
						@click="shuffleCards"
				>
					Shuffle items
				</button>
				<div class="story-col">
					<strong>animated = true</strong>
					<origam-masonry
							:columns="3"
							gap="sm"
							:animated="true"
							class="masonry-host"
							data-cy="masonry-animated-true"
					>
						<div
								v-for="card in shuffledCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							#{{ card.id }}
						</div>
					</origam-masonry>
				</div>
				<div class="story-col">
					<strong>animated = false</strong>
					<origam-masonry
							:columns="3"
							gap="sm"
							:animated="false"
							class="masonry-host"
							data-cy="masonry-animated-false"
					>
						<div
								v-for="card in shuffledCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							#{{ card.id }}
						</div>
					</origam-masonry>
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

	import { OrigamMasonry } from '@origam/components'

	import { GRID_GAP_SIZES, MASONRY_ALIGNS } from '@origam/consts'

	import type { IMasonryProps, IOptions } from '@origam/interfaces'

	import type { TGridGapSize, TMasonryAlign } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const masonryGapList: Array<IOptions<TGridGapSize>> = GRID_GAP_SIZES.map(v => ({label: v, value: v}))
	const masonryAlignList: Array<IOptions<TMasonryAlign>> = MASONRY_ALIGNS.map(v => ({label: v, value: v}))
	const masonryGapSizes: ReadonlyArray<TGridGapSize> = GRID_GAP_SIZES

	interface IPlaygroundCard {
		id: number
		height: number
	}

	const seededHeights = [
		180, 240, 110, 320, 200, 150, 280, 130,
		220, 170, 260, 140, 310, 190, 250, 160
	]

	const playgroundCards: ReadonlyArray<IPlaygroundCard> = seededHeights.map((h, i) => ({
		id: i + 1,
		height: h
	}))

	const shuffledCards = ref<IPlaygroundCard[]>([...playgroundCards])

	const shuffleCards = () => {
		const next = [...shuffledCards.value]
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[next[i], next[j]] = [next[j], next[i]]
		}
		shuffledCards.value = next
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 24px;
		padding: 16px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-col > strong {
		font: 0.75rem/1 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-btn {
		align-self: flex-start;
		padding: 6px 12px;
		font: 0.875rem/1 system-ui, sans-serif;
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.16));
		border-radius: 4px;
		background: var(--origam-color__surface---default, #fff);
		cursor: pointer;
	}

	.masonry-host {
		padding: 8px;
		border: 1px dashed var(--origam-color__border---subtle, rgba(0, 0, 0, 0.16));
		border-radius: 6px;
		background: var(--origam-color__surface---subtle, #f7f7f7);
	}

	.card {
		padding: 12px;
		background: var(--origam-color__surface---default, #fff);
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 4px;
		font: 0.875rem/1 system-ui, sans-serif;
		color: var(--origam-color__text---primary, #1a1a1a);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.card__index {
		font-weight: 600;
	}

	.card__height {
		font-size: 0.75rem;
		color: var(--origam-color__text---secondary, #555);
	}
</style>

<docs lang="md" src="@docs/components/Masonry/OrigamMasonry.md"/>
