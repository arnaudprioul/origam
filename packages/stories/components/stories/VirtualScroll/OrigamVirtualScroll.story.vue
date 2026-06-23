<template>
	<Story
			group="components"
			title="VirtualScroll/OrigamVirtualScroll"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IVirtualScrollProps>>({ itemHeight: 48, height: 320, width: undefined })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-virtual-scroll
							:item-height="state.itemHeight"
							:height="state.height"
							:width="state.width"
							:max-height="state.maxHeight"
							:min-height="state.minHeight"
							:max-width="state.maxWidth"
							:min-width="state.minWidth"
							:items="rows200"
							class="story-host"
					>
						<template #item="{ item, index }">
							<div
									class="story-row"
									:style="{ height: `${state.itemHeight ?? 48}px`, minHeight: `${state.itemHeight ?? 48}px`, lineHeight: `${state.itemHeight ?? 48}px` }"
									:data-cy="`row-design-${index}`"
							>{{ item.label }}</div>
						</template>
					</origam-virtual-scroll>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Dimension">
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
				</StoryGroup>
				<StoryGroup title="Item Sizing">
					<HstNumber v-model="state.itemHeight" title="Item Height (px)" :min="16" :max="128" :step="4"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IVirtualScrollProps>>({ itemHeight: 48, height: 320, renderless: false, scrollDuration: 300, scrollEasing: 'easeInOutCubic' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-virtual-scroll
							ref="vsFunctionalRef"
							:items="rows1k"
							:item-height="state.itemHeight"
							:height="state.height"
							:renderless="state.renderless"
							:scroll-duration="state.scrollDuration"
							:scroll-easing="state.scrollEasing"
							class="story-host"
					>
						<template #item="{ item, index }">
							<div
									class="story-row"
									:style="{ height: `${state.itemHeight ?? 48}px`, minHeight: `${state.itemHeight ?? 48}px`, lineHeight: `${state.itemHeight ?? 48}px` }"
									:data-cy="`row-functional-${index}`"
							>{{ item.label }}</div>
						</template>
					</origam-virtual-scroll>
					<div class="story-actions">
						<button class="story-btn" @click="jumpFunctional(0)">Top</button>
						<button class="story-btn" @click="jumpFunctional(500)">Index 500</button>
						<button class="story-btn" @click="jumpFunctional(999)">End</button>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber v-model="state.itemHeight" title="Item Height (px)" :min="16" :max="128" :step="4"/>
					<HstText   v-model="state.height"     title="Height"/>
				</StoryGroup>
				<StoryGroup title="Mode">
					<HstCheckbox v-model="state.renderless" title="Renderless"/>
				</StoryGroup>
				<StoryGroup title="Scroll Animation">
					<HstNumber v-model="state.scrollDuration" title="Scroll Duration (ms)" :min="0" :max="2000" :step="50"/>
					<HstSelect v-model="state.scrollEasing"   title="Scroll Easing"        :options="SCROLL_EASING_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Item">
			<div class="story-shell">
				<origam-virtual-scroll
						:items="slotRows"
						:item-height="48"
						height="240"
						class="story-host"
				>
					<template #item="{ item, index }">
						<div class="story-row story-row--slot" :data-cy="`row-slot-item-${index}`">
							<strong>{{ item.label }}</strong>
						</div>
					</template>
				</origam-virtual-scroll>
			</div>
		</Variant>

		<Variant title="Slots - Item.renderless">
			<div class="story-shell">
				<origam-virtual-scroll
						:items="slotRows"
						:item-height="48"
						height="240"
						renderless
						class="story-host story-host--renderless"
				>
					<template #item.renderless="{ item, index, itemRef }">
						<div :ref="itemRef" class="story-row" :data-cy="`row-slot-renderless-${index}`">
							{{ item.label }}
						</div>
					</template>
				</origam-virtual-scroll>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IVirtualScrollProps>>({ itemHeight: 48, height: 320, renderless: false, scrollDuration: 300, scrollEasing: 'easeInOutCubic' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-virtual-scroll
							ref="vsPlaygroundRef"
							:items="rows1k"
							:item-height="state.itemHeight"
							:height="state.height"
							:width="state.width"
							:max-height="state.maxHeight"
							:min-height="state.minHeight"
							:max-width="state.maxWidth"
							:min-width="state.minWidth"
							:renderless="state.renderless"
							:scroll-duration="state.scrollDuration"
							:scroll-easing="state.scrollEasing"
							class="story-host"
					>
						<template #item="{ item, index }">
							<div
									class="story-row"
									:style="{ height: `${state.itemHeight ?? 48}px`, minHeight: `${state.itemHeight ?? 48}px`, lineHeight: `${state.itemHeight ?? 48}px` }"
									:data-cy="`row-playground-${index}`"
							>{{ item.label }}</div>
						</template>
					</origam-virtual-scroll>
					<div class="story-actions">
						<button class="story-btn" @click="jumpPlayground(0)">Top</button>
						<button class="story-btn" @click="jumpPlayground(500)">Index 500</button>
						<button class="story-btn" @click="jumpPlayground(999)">End</button>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstNumber v-model="state.itemHeight" title="Item Height (px)" :min="16" :max="128" :step="4"/>
					<HstText   v-model="state.height"     title="Height"/>
					<HstText   v-model="state.width"      title="Width"/>
					<HstText   v-model="state.maxHeight"  title="Max Height"/>
					<HstText   v-model="state.minHeight"  title="Min Height"/>
					<HstText   v-model="state.maxWidth"   title="Max Width"/>
					<HstText   v-model="state.minWidth"   title="Min Width"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.renderless"    title="Renderless"/>
					<HstNumber   v-model="state.scrollDuration" title="Scroll Duration (ms)" :min="0" :max="2000" :step="50"/>
					<HstSelect   v-model="state.scrollEasing"   title="Scroll Easing"        :options="SCROLL_EASING_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref, shallowRef } from 'vue'

	import { OrigamVirtualScroll } from '@origam/components'
	import type { IVirtualScrollProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	type TRow = { id: number, label: string }

	function makeRows (n: number): Array<TRow> {
		return Array.from({ length: n }, (_, i) => ({ id: i, label: `Row #${i.toString().padStart(4, '0')}` }))
	}

	const rows1k = shallowRef<Array<TRow>>(makeRows(1000))
	const rows200 = shallowRef<Array<TRow>>(makeRows(200))
	const slotRows = shallowRef<Array<TRow>>(makeRows(50))

	const SCROLL_EASING_OPTIONS = [
		{ label: 'linear', value: 'linear' },
		{ label: 'easeInQuad', value: 'easeInQuad' },
		{ label: 'easeOutQuad', value: 'easeOutQuad' },
		{ label: 'easeInOutQuad', value: 'easeInOutQuad' },
		{ label: 'easeInCubic', value: 'easeInCubic' },
		{ label: 'easeOutCubic', value: 'easeOutCubic' },
		{ label: 'easeInOutCubic (default)', value: 'easeInOutCubic' },
		{ label: 'easeInQuart', value: 'easeInQuart' },
		{ label: 'easeOutQuart', value: 'easeOutQuart' },
		{ label: 'easeInOutQuart', value: 'easeInOutQuart' },
		{ label: 'easeInQuint', value: 'easeInQuint' },
		{ label: 'easeOutQuint', value: 'easeOutQuint' },
		{ label: 'easeInOutQuint', value: 'easeInOutQuint' }
	]

	const vsFunctionalRef = ref<{ scrollToIndex: (i: number) => void } | null>(null)
	function jumpFunctional (index: number) {
		vsFunctionalRef.value?.scrollToIndex(index)
	}

	const vsPlaygroundRef = ref<{ scrollToIndex: (i: number) => void } | null>(null)
	function jumpPlayground (index: number) {
		vsPlaygroundRef.value?.scrollToIndex(index)
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
	.story-host--renderless {
		overflow: auto;
		height: 240px;
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
	.story-row--slot { background-color: var(--origam-color__surface---subtle, rgba(0, 0, 0, 0.03)); }
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
</style>

<docs lang="md" src="@docs/components/VirtualScroll/OrigamVirtualScroll.md"/>
