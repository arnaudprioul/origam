<template>
	<Story
			group="components"
			title="Masonry/OrigamMasonry"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IMasonryProps>>({})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-masonry
							:columns="3"
							gap="md"
							:color="state.color"
							:bg-color="state.bgColor"
							:rounded="state.rounded"
							:elevation="state.elevation"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:width="state.width"
							:height="state.height"
							:min-width="state.minWidth"
							:max-width="state.maxWidth"
							:margin="state.margin"
							:margin-top="state.marginTop"
							:margin-right="state.marginRight"
							:margin-bottom="state.marginBottom"
							:margin-left="state.marginLeft"
							:padding="state.padding"
							:padding-top="state.paddingTop"
							:padding-right="state.paddingRight"
							:padding-bottom="state.paddingBottom"
							:padding-left="state.paddingLeft"
							class="masonry-host"
					>
						<div
								v-for="card in previewCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							<span class="card__index">#{{ card.id }}</span>
							<span class="card__height">{{ card.height }}px</span>
						</div>
					</origam-masonry>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"    title="Width"/>
					<HstText v-model="state.height"   title="Height"/>
					<HstText v-model="state.minWidth" title="Min Width"/>
					<HstText v-model="state.maxWidth" title="Max Width"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.margin"       title="Margin"/>
					<HstText v-model="state.marginTop"    title="Margin Top"/>
					<HstText v-model="state.marginRight"  title="Margin Right"/>
					<HstText v-model="state.marginBottom" title="Margin Bottom"/>
					<HstText v-model="state.marginLeft"   title="Margin Left"/>
					<HstText v-model="state.padding"      title="Padding"/>
					<HstText v-model="state.paddingTop"    title="Padding Top"/>
					<HstText v-model="state.paddingRight"  title="Padding Right"/>
					<HstText v-model="state.paddingBottom" title="Padding Bottom"/>
					<HstText v-model="state.paddingLeft"   title="Padding Left"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IMasonryProps>>({ columns: 3, gap: 'md', animated: true, align: 'top' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button
							class="story-btn"
							@click="shuffleCards"
					>
						Shuffle items
					</button>
					<origam-masonry
							:columns="state.columns"
							:gap="state.gap"
							:animated="state.animated"
							:align="state.align"
							:column-breakpoints="state.columnBreakpoints"
							:tag="state.tag"
							class="masonry-host"
					>
						<div
								v-for="card in shuffledCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							<span class="card__index">#{{ card.id }}</span>
							<span class="card__height">{{ card.height }}px</span>
						</div>
					</origam-masonry>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstNumber v-model="state.columns"   title="Columns" :min="1" :max="8"/>
					<HstSelect v-model="state.gap"       title="Gap"     :options="MASONRY_GAP_OPTIONS"/>
					<HstSelect v-model="state.align"     title="Align"   :options="MASONRY_ALIGN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Behaviour">
					<HstCheckbox v-model="state.animated" title="Animated"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-masonry
						:columns="3"
						gap="md"
						class="masonry-host"
				>
					<div
							v-for="card in previewCards"
							:key="card.id"
							class="card"
							:style="{ height: card.height + 'px' }"
					>
						<span class="card__index">#{{ card.id }}</span>
						<span class="card__height">{{ card.height }}px</span>
					</div>
				</origam-masonry>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IMasonryProps>({ columns: 3, gap: 'md', animated: true, align: 'top' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button
							class="story-btn"
							@click="shuffleCards"
					>
						Shuffle items
					</button>
					<origam-masonry
							v-bind="state"
							class="masonry-host"
					>
						<div
								v-for="card in shuffledCards"
								:key="card.id"
								class="card"
								:style="{ height: card.height + 'px' }"
						>
							<span class="card__index">#{{ card.id }}</span>
							<span class="card__height">{{ card.height }}px</span>
						</div>
					</origam-masonry>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstNumber v-model="state.columns" title="Columns" :min="1" :max="8"/>
					<HstSelect v-model="state.gap"     title="Gap"     :options="MASONRY_GAP_OPTIONS"/>
					<HstSelect v-model="state.align"   title="Align"   :options="MASONRY_ALIGN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.animated" title="Animated"/>
					<HstSelect   v-model="state.tag"      title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
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

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const MASONRY_GAP_OPTIONS: Array<IOptions<TGridGapSize>> = GRID_GAP_SIZES.map(v => ({ label: v, value: v }))
	const MASONRY_ALIGN_OPTIONS: Array<IOptions<TMasonryAlign>> = MASONRY_ALIGNS.map(v => ({ label: v, value: v }))

	interface IPlaygroundCard {
		id: number
		height: number
	}

	const seededHeights = [
		180, 240, 110, 320, 200, 150, 280, 130,
		220, 170, 260, 140, 310, 190, 250, 160
	]

	const previewCards: ReadonlyArray<IPlaygroundCard> = seededHeights.slice(0, 9).map((h, i) => ({
		id: i + 1,
		height: h
	}))

	const allCards: ReadonlyArray<IPlaygroundCard> = seededHeights.map((h, i) => ({
		id: i + 1,
		height: h
	}))

	const shuffledCards = ref<IPlaygroundCard[]>([...allCards])

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
