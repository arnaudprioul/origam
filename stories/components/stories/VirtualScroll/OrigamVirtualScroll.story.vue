<template>
	<Story
			group="components"
			title="VirtualScroll/OrigamVirtualScroll"
	>
		<!--
			Playground — first by convention. Exposes every prop knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ itemHeight: number, height: number, count: number }>({ itemHeight: 48, height: 320, count: 200 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="vs-playground">
					<origam-virtual-scroll
							:items="makeRows(state.count)"
							:item-height="state.itemHeight"
							:height="state.height"
							class="story-host"
							data-cy="vs-playground-host"
					>
						<template #item="{ item, index }">
							<div
									class="story-row"
									:style="{ height: `${state.itemHeight}px`, minHeight: `${state.itemHeight}px`, lineHeight: `${state.itemHeight}px` }"
									:data-cy="`row-playground-${index}`"
							>{{ item.label }}</div>
						</template>
					</origam-virtual-scroll>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.itemHeight" title="itemHeight (px)"/>
				<HstNumber v-model="state.height"     title="height (px)"/>
				<HstNumber v-model="state.count"      title="rows"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — itemHeight"
				:init-state="() => useStoryInitState<{ itemHeight: number }>({ itemHeight: 32 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="vs-item-height">
					<origam-virtual-scroll
							:items="rows500"
							:item-height="state.itemHeight"
							height="320"
							class="story-host"
							data-cy="vs-item-height-host"
					>
						<template #item="{ item, index }">
							<div
									class="story-row"
									:style="{ height: `${state.itemHeight}px`, minHeight: `${state.itemHeight}px`, lineHeight: `${state.itemHeight}px` }"
									:data-cy="`row-item-height-${index}`"
							>{{ item.label }}</div>
						</template>
					</origam-virtual-scroll>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.itemHeight" title="itemHeight (px)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — height"
				:init-state="() => useStoryInitState<{ height: number }>({ height: 240 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="vs-height">
					<origam-virtual-scroll
							:items="rows500"
							:item-height="48"
							:height="state.height"
							class="story-host"
							data-cy="vs-height-host"
					>
						<template #item="{ item, index }">
							<div class="story-row" :data-cy="`row-height-${index}`">{{ item.label }}</div>
						</template>
					</origam-virtual-scroll>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.height" title="height (px)"/>
			</template>
		</Variant>

		<Variant title="Prop — scrollToIndex (method)">
			<div class="story-shell" data-cy="vs-scroll-to-index">
				<origam-virtual-scroll
						ref="vsRef"
						:items="rows1k"
						:item-height="48"
						height="320"
						class="story-host"
						data-cy="vs-scroll-to-index-host"
				>
					<template #item="{ item, index }">
						<div class="story-row" :data-cy="`row-sti-${index}`">{{ item.label }}</div>
					</template>
				</origam-virtual-scroll>
				<div class="story-actions">
					<button class="story-btn" data-cy="sti-jump-0"   @click="jumpTo(0)">Top</button>
					<button class="story-btn" data-cy="sti-jump-100" @click="jumpTo(100)">Index 100</button>
					<button class="story-btn" data-cy="sti-jump-500" @click="jumpTo(500)">Index 500</button>
					<button class="story-btn" data-cy="sti-jump-999" @click="jumpTo(999)">End</button>
				</div>
			</div>
		</Variant>

		<!-- ── Slots ───────────────────────────────────────────────── -->

		<Variant title="Slot — item">
			<div class="story-shell" data-cy="vs-slot-item">
				<origam-virtual-scroll
						:items="slotRows"
						:item-height="48"
						height="240"
						class="story-host"
						data-cy="vs-slot-item-host"
				>
					<template #item="{ item, index }">
						<div class="story-row" :data-cy="`row-slot-${index}`">
							<strong>{{ item.label }}</strong>
						</div>
					</template>
				</origam-virtual-scroll>
			</div>
		</Variant>

		<Variant title="Slot — item.renderless">
			<div class="story-shell" data-cy="vs-slot-item-renderless">
				<origam-virtual-scroll
						:items="slotRows"
						:item-height="48"
						height="240"
						class="story-host"
						data-cy="vs-slot-item-renderless-host"
				>
					<template #item.renderless="{ item, index }">
						<div class="story-row" :data-cy="`row-renderless-${index}`">
							{{ item.label }}
						</div>
					</template>
				</origam-virtual-scroll>
			</div>
		</Variant>

		<!-- ── Functional ───────────────────────────────────────────── -->

		<Variant title="Dynamic items (append & replace)">
			<div class="story-shell" data-cy="vs-dynamic">
				<origam-virtual-scroll
						:items="dynamicRows"
						:item-height="48"
						height="240"
						class="story-host"
						data-cy="vs-dynamic-host"
				>
					<template #item="{ item, index }">
						<div class="story-row" :data-cy="`row-dynamic-${index}`">{{ item.label }}</div>
					</template>
				</origam-virtual-scroll>
				<div class="story-actions">
					<button class="story-btn" data-cy="dynamic-add"     @click="appendRow">Append row</button>
					<button class="story-btn" data-cy="dynamic-replace" @click="replaceRows">Replace</button>
				</div>
				<div class="story-status" data-cy="dynamic-count">Rows: <strong>{{ dynamicRows.length }}</strong></div>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref, shallowRef } from 'vue'

	import { OrigamVirtualScroll } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	type TRow = { id: number, label: string }

	function makeRows (n: number): Array<TRow> {
		return Array.from({ length: n }, (_, i) => ({ id: i, label: `Row #${i.toString().padStart(4, '0')}` }))
	}

	const rows1k = shallowRef<Array<TRow>>(makeRows(1000))
	const rows500 = shallowRef<Array<TRow>>(makeRows(500))
	const slotRows = shallowRef<Array<TRow>>(makeRows(50))
	const dynamicRows = ref<Array<TRow>>(makeRows(20))

	function appendRow () {
		const i = dynamicRows.value.length
		dynamicRows.value = [...dynamicRows.value, { id: i, label: `Appended #${i}` }]
	}

	function replaceRows () {
		dynamicRows.value = makeRows(50).map((r) => ({ id: r.id, label: `Replaced ${r.id}` }))
	}

	const vsRef = ref<{ scrollToIndex: (i: number) => void } | null>(null)
	function jumpTo (index: number) {
		vsRef.value?.scrollToIndex(index)
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; }
	.story-host {
		width: 100%;
		max-width: 480px;
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 6px;
	}
	.story-row {
		display: flex;
		align-items: center;
		padding: 0 16px;
		height: 48px;
		min-height: 48px;
		font: 0.875rem/1 system-ui, sans-serif;
		border-bottom: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.06));
		box-sizing: border-box;
	}
	.story-actions { display: flex; gap: 8px; flex-wrap: wrap; }
	.story-btn {
		appearance: none;
		border: 1px solid currentColor;
		background: transparent;
		color: inherit;
		padding: 6px 12px;
		border-radius: 6px;
		cursor: pointer;
		font: inherit;
	}
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/VirtualScroll/OrigamVirtualScroll.md"/>
