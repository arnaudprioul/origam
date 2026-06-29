<template>
	<Story
			group="components"
			title="InfiniteScroll/OrigamInfiniteScroll"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IInfiniteScrollProps>>({ height: '300px' })"
		>
			<template #default="{ state }">
				<origam-infinite-scroll
						:color="state.color"
						:bg-color="state.bgColor"
						:tag="state.tag"
						:direction="state.direction"
						:width="state.width"
						:height="state.height"
						:min-height="state.minHeight"
						:max-height="state.maxHeight"
						:min-width="state.minWidth"
						:max-width="state.maxWidth"
						:font-size="state.fontSize"
						side="end"
						mode="intersect"
						@load="handleDesignLoad"
				>
					<div
							v-for="item in designItems"
							:key="item"
							class="is-list-item"
					>
						Item {{ item }}
					</div>
				</origam-infinite-scroll>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontSize" title="Font Size" :options="FONT_SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
				</StoryGroup>
				<StoryGroup title="Direction">
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IInfiniteScrollProps>>({
					side: 'end',
					mode: 'intersect',
					loadMoreText: '',
					emptyText: '',
					margin: ''
				})"
		>
			<template #default="{ state }">
				<origam-infinite-scroll
						:side="state.side"
						:mode="state.mode"
						:load-more-text="state.loadMoreText || undefined"
						:empty-text="state.emptyText || undefined"
						:margin="state.margin || undefined"
						height="300px"
						@load="handleFunctionalLoad"
				>
					<div
							v-for="item in functionalItems"
							:key="item"
							class="is-list-item"
					>
						Item {{ item }}
					</div>
				</origam-infinite-scroll>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Scroll">
					<HstSelect v-model="state.side" title="Side" :options="SIDE_OPTIONS"/>
					<HstSelect v-model="state.mode" title="Mode" :options="MODE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Text">
					<HstText v-model="state.loadMoreText" title="Load More Text"/>
					<HstText v-model="state.emptyText"    title="Empty Text"/>
				</StoryGroup>
				<StoryGroup title="Intersection">
					<HstText v-model="state.margin" title="Margin (rootMargin)"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - load">
			<origam-infinite-scroll
					height="300px"
					side="end"
					mode="intersect"
					@load="(e) => { logEvent('load', { side: e.side }); e.done('ok') }"
			>
				<div
						v-for="item in eventItems"
						:key="item"
						class="is-list-item"
				>
					Item {{ item }}
				</div>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slots - Default">
			<origam-infinite-scroll
					height="200px"
					@load="handleLoadEmpty"
			>
				<div
						v-for="item in shortItems"
						:key="item"
						class="is-list-item"
				>
					Custom slot content — item {{ item }}
				</div>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slots - Error">
			<origam-infinite-scroll
					height="200px"
					@load="handleLoadError"
			>
				<div class="is-list-item">Item 1</div>
				<template #error>
					<div class="is-slot-feedback is-slot-feedback--error">Custom error feedback</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slots - Empty">
			<origam-infinite-scroll
					height="200px"
					@load="handleLoadEmpty"
			>
				<div class="is-list-item">Only item</div>
				<template #empty>
					<div class="is-slot-feedback">No more items to load</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slots - LoadMore">
			<origam-infinite-scroll
					height="300px"
					mode="manual"
					@load="handleLoadMoreLoad"
			>
				<div
						v-for="item in loadMoreItems"
						:key="item"
						class="is-list-item"
				>
					Item {{ item }}
				</div>
				<template #loadMore="{ props: slotProps }">
					<div class="is-slot-load-more">
						<button v-bind="slotProps">Load more items</button>
					</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slots - Loading">
			<origam-infinite-scroll
					height="300px"
					mode="manual"
					@load="handleLoadingLoad"
			>
				<div
						v-for="item in loadingItems"
						:key="item"
						class="is-list-item"
				>
					Item {{ item }}
				</div>
				<template #loading>
					<div class="is-slot-feedback">Loading more items…</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IInfiniteScrollProps>>({
					side: 'end',
					mode: 'intersect',
					height: '300px'
				})"
		>
			<template #default="{ state }">
				<origam-infinite-scroll
						v-bind="state"
						@load="handleLoad"
				>
					<div
							v-for="item in playgroundItems"
							:key="item"
							class="is-list-item"
					>
						Item {{ item }}
					</div>
				</origam-infinite-scroll>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.loadMoreText" title="Load More Text"/>
					<HstText v-model="state.emptyText"    title="Empty Text"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstText   v-model="state.width"     title="Width"/>
					<HstText   v-model="state.height"    title="Height"/>
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
					<HstSelect v-model="state.tag"       title="Tag"       :options="TAG_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontSize" title="Font Size" :options="FONT_SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect v-model="state.side" title="Side" :options="SIDE_OPTIONS"/>
					<HstSelect v-model="state.mode" title="Mode" :options="MODE_OPTIONS"/>
					<HstText   v-model="state.margin" title="Margin"/>
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
	import { ref } from 'vue'

	import { OrigamInfiniteScroll } from '@origam/components'
	import { DIRECTION, INFINITE_SCROLL_MODE, INFINITE_SCROLL_SIDE } from '@origam/enums'
	import type { IInfiniteScrollProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		FONT_SIZE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const DIRECTION_OPTIONS = [
		{ label: 'Vertical',   value: DIRECTION.VERTICAL },
		{ label: 'Horizontal', value: DIRECTION.HORIZONTAL }
	]

	const SIDE_OPTIONS = [
		{ label: 'End',   value: INFINITE_SCROLL_SIDE.END },
		{ label: 'Start', value: INFINITE_SCROLL_SIDE.START },
		{ label: 'Both',  value: INFINITE_SCROLL_SIDE.BOTH }
	]

	const MODE_OPTIONS = [
		{ label: 'Intersect', value: INFINITE_SCROLL_MODE.INTERSECT },
		{ label: 'Manual',    value: INFINITE_SCROLL_MODE.MANUAL }
	]

	const designItems     = ref(Array.from({ length: 20 }, (_, i) => i + 1))
	const functionalItems = ref(Array.from({ length: 20 }, (_, i) => i + 1))
	const eventItems      = ref(Array.from({ length: 20 }, (_, i) => i + 1))
	const shortItems      = ref([1, 2, 3])
	const loadMoreItems   = ref(Array.from({ length: 20 }, (_, i) => i + 1))
	const loadingItems    = ref(Array.from({ length: 20 }, (_, i) => i + 1))
	const playgroundItems = ref(Array.from({ length: 20 }, (_, i) => i + 1))

	const makeLoadHandler = (items: ReturnType<typeof ref<number[]>>) => {
		return ({ done }: { side: string; done: (status: string) => void }) => {
			const currentMax = items.value[items.value.length - 1] ?? 0

			if (currentMax >= 60) {
				done('empty')
				return
			}

			setTimeout(() => {
				const next = Array.from({ length: 10 }, (_, i) => currentMax + i + 1)
				items.value = [...items.value, ...next]
				done('ok')
			}, 800)
		}
	}

	const handleLoad      = makeLoadHandler(playgroundItems)
	const handleDesignLoad      = makeLoadHandler(designItems)
	const handleFunctionalLoad  = makeLoadHandler(functionalItems)
	const handleLoadMoreLoad    = makeLoadHandler(loadMoreItems)
	const handleLoadingLoad     = makeLoadHandler(loadingItems)
	const handleLoadEmpty = ({ done }: { done: (status: string) => void }) => done('empty')
	const handleLoadError = ({ done }: { done: (status: string) => void }) => done('error')
</script>

<style scoped>
	.is-list-item {
		padding: 12px;
		border-bottom: 1px solid var(--origam-color__border---default, #e0e0e0);
	}

	.is-slot-feedback {
		text-align: center;
		padding: 16px;
		opacity: 0.6;
	}

	.is-slot-feedback--error {
		opacity: 1;
		color: var(--origam-color__action--danger---bg);
	}

	.is-slot-load-more {
		text-align: center;
		padding: 12px;
	}
</style>

<docs lang="md" src="@docs/components/InfiniteScroll/OrigamInfiniteScroll.md"/>
