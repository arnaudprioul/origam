<template>
	<Story
			group="components"
			title="InfiniteScroll/OrigamInfiniteScroll"
	>

		<Variant title="Basic — end side">
			<origam-infinite-scroll
					height="300"
					@load="handleLoad"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
			>
				<div
						v-for="item in items"
						:key="item"
						style="padding: 12px; border-bottom: 1px solid var(--origam-color__border---default, #e0e0e0);"
				>
					Item {{ item }}
				</div>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Manual mode">
			<origam-infinite-scroll
					height="300"
					mode="manual"
					@load="handleLoad"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
			>
				<div
						v-for="item in items"
						:key="item"
						style="padding: 12px; border-bottom: 1px solid var(--origam-color__border---default, #e0e0e0);"
				>
					Item {{ item }}
				</div>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Both sides">
			<origam-infinite-scroll
					height="300"
					side="both"
					@load="handleLoad"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
			>
				<div
						v-for="item in items"
						:key="item"
						style="padding: 12px; border-bottom: 1px solid var(--origam-color__border---default, #e0e0e0);"
				>
					Item {{ item }}
				</div>
			</origam-infinite-scroll>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-infinite-scroll
					height="200"
					@load="handleLoadEmpty"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
					data-cy="infinite-scroll-slot-default"
			>
				<div v-for="item in itemsShort" :key="item" style="padding: 12px;">
					<span>Custom slot content</span>
				</div>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slot — error">
			<origam-infinite-scroll
					height="200"
					@load="handleLoadError"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
					data-cy="infinite-scroll-slot-error"
			>
				<div style="padding: 12px;">Item</div>
				<template #error>
					<div style="text-align: center; padding: 16px; color: var(--origam-color__action--danger---bg);">Custom slot content</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slot — loadMore">
			<origam-infinite-scroll
					height="300"
					mode="manual"
					@load="handleLoad"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
					data-cy="infinite-scroll-slot-load-more"
			>
				<div v-for="item in items" :key="item" style="padding: 12px;">Item {{ item }}</div>
				<template #loadMore="{ props }">
					<div style="text-align: center; padding: 12px;">
						<button v-bind="props" style="padding: 8px 16px; cursor: pointer;">Load more</button>
					</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slot — loading">
			<origam-infinite-scroll
					height="300"
					mode="manual"
					@load="handleLoad"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
			>
				<div
						v-for="item in items"
						:key="item"
						style="padding: 12px;"
				>
					Item {{ item }}
				</div>
				<template #loading>
					<div style="text-align: center; padding: 16px; opacity: 0.6;">Loading more…</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Slot — empty">
			<origam-infinite-scroll
					height="200"
					@load="handleLoadEmpty"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
			>
				<div style="padding: 12px;">Only item</div>
				<template #empty>
					<div style="text-align: center; padding: 16px; opacity: 0.6;">No more items</div>
				</template>
			</origam-infinite-scroll>
		</Variant>

		<Variant title="Emit — load">
			<origam-infinite-scroll
					height="300"
					@load="(e) => { logEvent('load', { side: e.side }); e.done('ok') }"
					style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
			>
				<div
						v-for="item in items"
						:key="item"
						style="padding: 12px;"
				>
					Item {{ item }}
				</div>
			</origam-infinite-scroll>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					side?: string
					mode?: string
					height?: number
				}>({
					side: 'end',
					mode: 'intersect',
					height: 300
				})"
		>
			<template #default="{ state }">
				<origam-infinite-scroll
						:side="state.side"
						:mode="state.mode"
						:height="state.height"
						@load="handleLoad"
						style="overflow-y: auto; border: 1px solid var(--origam-color__border---default, #e0e0e0); border-radius: 4px;"
				>
					<div
							v-for="item in items"
							:key="item"
							style="padding: 12px; border-bottom: 1px solid var(--origam-color__border---default, #e0e0e0);"
					>
						Item {{ item }}
					</div>
				</origam-infinite-scroll>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.side" title="side" :options="sideList"/>
				<HstSelect v-model="state.mode" title="mode" :options="modeList"/>
				<HstNumber v-model="state.height" title="height (px)" :min="100"/>
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

	import { useStoryInitState } from '@stories/composables'

	const items = ref(Array.from({ length: 20 }, (_, i) => i + 1))
	const itemsShort = ref([1, 2, 3])

	const handleLoad = ({ side, done }: { side: string; done: (status: string) => void }) => {
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

	const handleLoadEmpty = ({ done }: { done: (status: string) => void }) => {
		done('empty')
	}

	const handleLoadError = ({ done }: { done: (status: string) => void }) => {
		done('error')
	}

	const sideList = [
		{ label: 'end',   value: 'end' },
		{ label: 'start', value: 'start' },
		{ label: 'both',  value: 'both' },
	]

	const modeList = [
		{ label: 'intersect', value: 'intersect' },
		{ label: 'manual',    value: 'manual' },
	]
</script>

<docs lang="md" src="@docs/components/InfiniteScroll/OrigamInfiniteScroll.md"/>
