<template>
	<Story
			group="components"
			title="VirtualScroll/OrigamVirtualScrollItem"
	>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<IVirtualScrollItemProps>({ renderless: false })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<template v-if="state.renderless">
						<origam-virtual-scroll-item
								:renderless="state.renderless"
								@update:height="onHeight('functional', $event)"
						>
							<template #renderless="{ itemRef }">
								<article
										:ref="itemRef"
										class="story-card"
								>
									<h4>Renderless</h4>
									<p>The host element is owned by the consumer; the item still emits <code>update:height</code>.</p>
								</article>
							</template>
						</origam-virtual-scroll-item>
					</template>
					<template v-else>
						<origam-virtual-scroll-item
								:renderless="state.renderless"
								class="story-row"
								@update:height="onHeight('functional', $event)"
						>
							<div class="story-content">Single item — content-box height is observed</div>
						</origam-virtual-scroll-item>
					</template>
					<div class="story-status">
						Last height: <strong>{{ heights.functional ?? 'pending' }}</strong>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Behaviour">
					<HstCheckbox v-model="state.renderless" title="Renderless"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - update:height">
			<div class="story-shell">
				<origam-virtual-scroll-item
						class="story-row"
						@update:height="logEvent('update:height', $event)"
				>
					<div class="story-content">Observed item — height emitted on mount/resize.</div>
				</origam-virtual-scroll-item>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-shell">
				<origam-virtual-scroll-item class="story-row">
					<strong>Custom</strong> slot content
				</origam-virtual-scroll-item>
			</div>
		</Variant>

		<Variant title="Slots - Renderless">
			<div class="story-shell">
				<origam-virtual-scroll-item
						renderless
						@update:height="onHeight('slot-renderless', $event)"
				>
					<template #renderless="{ itemRef }">
						<article
								:ref="itemRef"
								class="story-card"
						>
							<h4>Renderless slot</h4>
							<p>Consumer owns the host element.</p>
						</article>
					</template>
				</origam-virtual-scroll-item>
				<div class="story-status">Height: <strong>{{ heights['slot-renderless'] ?? 'pending' }}</strong></div>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IVirtualScrollItemProps & { rows: number }>({ renderless: false, rows: 1 })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-virtual-scroll-item
							class="story-row"
							:renderless="state.renderless"
							@update:height="onHeight('playground', $event)"
					>
						<div class="story-content">
							<p v-for="n in Math.max(1, state.rows)" :key="n" class="story-line">Content line {{ n }}</p>
						</div>
					</origam-virtual-scroll-item>
					<div class="story-status">
						Last height: <strong>{{ heights.playground ?? 'pending' }}</strong> px
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstNumber v-model="state.rows" title="Content lines" :min="1" :max="20" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.renderless" title="Renderless"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamVirtualScrollItem } from '@origam/components'
	import type { IVirtualScrollItemProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const heights = reactive<Record<string, number | undefined>>({
		functional:      undefined,
		playground:      undefined,
		'slot-renderless': undefined,
	})

	function onHeight (key: string, h: number) {
		heights[key] = h
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; max-width: 480px; }
	.story-row {
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 6px;
		padding: 12px 16px;
		background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.03));
	}
	.story-content { font: 0.95rem/1.4 system-ui, sans-serif; }
	.story-line { margin: 0 0 6px; font: 0.875rem/1.4 system-ui, sans-serif; }
	.story-card {
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
		border-radius: 8px;
		padding: 16px;
		background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.03));
	}
	.story-card h4 { margin: 0 0 8px; font: 600 1rem/1.2 system-ui, sans-serif; }
	.story-card p  { margin: 0; font: 0.875rem/1.4 system-ui, sans-serif; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/VirtualScroll/OrigamVirtualScrollItem.md"/>
