<template>
	<Story
			group="components"
			title="InfiniteScroll/OrigamInfiniteScrollIntersect"
	>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IInfiniteScrollIntersectProps>>({ side: 'end', margin: '' })"
		>
			<template #default="{ state }">
				<origam-infinite-scroll
						:side="state.side"
						:margin="state.margin || undefined"
						style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
						@load="handleLoad"
						data-cy="infinite-scroll-intersect-functional"
				>
					<div
							v-for="(item, i) in items"
							:key="i"
							style="padding: 8px 16px; border-bottom: 1px solid var(--origam-color__border---subtle);"
					>
						Item #{{ i + 1 }} — {{ item }}
					</div>
				</origam-infinite-scroll>
				<p style="margin-top: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Scroll to the bottom — the sentinel triggers a load and appends 10 more items.
				</p>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Behaviour">
					<HstSelect v-model="state.side" title="Side" :options="SIDE_OPTIONS"/>
					<HstText   v-model="state.margin" title="Margin (IntersectionObserver rootMargin)"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - intersect">
			<origam-infinite-scroll
					style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
					data-cy="infinite-scroll-intersect-emit"
					@load="handleEmitLoad"
			>
				<div
						v-for="(item, i) in emitItems"
						:key="i"
						style="padding: 8px 16px; border-bottom: 1px solid var(--origam-color__border---subtle);"
				>
					Item #{{ i + 1 }} — {{ item }}
				</div>
			</origam-infinite-scroll>
			<p style="margin-top: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
				The internal sentinel emits <code>intersect</code> when scrolled into view — check the Histoire event log.
			</p>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IInfiniteScrollIntersectProps>>({ side: 'end', margin: '' })"
		>
			<template #default="{ state }">
				<origam-infinite-scroll
						:side="state.side"
						:margin="state.margin || undefined"
						style="height: 300px; border: 1px solid var(--origam-color__border---subtle); border-radius: 8px;"
						@load="handlePlaygroundLoad"
						data-cy="infinite-scroll-intersect-playground"
				>
					<div
							v-for="(item, i) in playgroundItems"
							:key="i"
							style="padding: 8px 16px; border-bottom: 1px solid var(--origam-color__border---subtle);"
					>
						Item #{{ i + 1 }} — {{ item }}
					</div>
				</origam-infinite-scroll>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Functional">
					<HstSelect v-model="state.side"   title="Side"   :options="SIDE_OPTIONS"/>
					<HstText   v-model="state.margin" title="Margin (rootMargin)"/>
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
	import { logEvent } from 'histoire/client'

	import { OrigamInfiniteScroll } from '@origam/components'
	import { INFINITE_SCROLL_SIDE } from '@origam/enums'
	import type { IInfiniteScrollIntersectProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const SIDE_OPTIONS = [
		{ label: 'end',   value: INFINITE_SCROLL_SIDE.END },
		{ label: 'start', value: INFINITE_SCROLL_SIDE.START },
		{ label: 'both',  value: INFINITE_SCROLL_SIDE.BOTH }
	]

	const items = ref(Array.from({ length: 20 }, (_, i) => `lorem ipsum ${i + 1}`))
	let nextId = items.value.length

	const handleLoad = ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				nextId += 1
				items.value.push(`appended row ${nextId}`)
			}
			done('ok')
		}, 600)
	}

	const emitItems = ref(Array.from({ length: 20 }, (_, i) => `emit item ${i + 1}`))
	let emitNextId = emitItems.value.length

	const handleEmitLoad = ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
		logEvent('intersect', { side: 'end', isIntersecting: true })
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				emitNextId += 1
				emitItems.value.push(`emit row ${emitNextId}`)
			}
			done('ok')
		}, 600)
	}

	const playgroundItems = ref(Array.from({ length: 20 }, (_, i) => `item ${i + 1}`))
	let playgroundNextId = playgroundItems.value.length

	const handlePlaygroundLoad = ({ done }: { done: (status: 'ok' | 'empty' | 'error') => void }) => {
		setTimeout(() => {
			for (let i = 0; i < 10; i++) {
				playgroundNextId += 1
				playgroundItems.value.push(`item ${playgroundNextId}`)
			}
			done('ok')
		}, 600)
	}
</script>

<docs lang="md" src="@docs/components/InfiniteScroll/OrigamInfiniteScrollIntersect.md"/>
