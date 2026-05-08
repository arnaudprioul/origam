<template>
	<Story
			group="components"
			title="VirtualScroll/OrigamVirtualScrollItem"
	>

		<Variant title="Default">
			<div class="story-shell" data-cy="vsi-default">
				<origam-virtual-scroll-item
						class="story-row"
						data-cy="vsi-default-host"
						@update:height="onHeight('default', $event)"
				>
					<div class="story-content">Single item — content-box height is observed</div>
				</origam-virtual-scroll-item>
				<div class="story-status" data-cy="vsi-default-status">Last height: <strong>{{ heights.default ?? 'pending' }}</strong></div>
			</div>
		</Variant>

		<Variant
				title="Dynamic height"
				:init-state="() => useStoryInitState<{ rows: number }>({ rows: 1 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="vsi-dynamic">
					<origam-virtual-scroll-item
							class="story-row"
							data-cy="vsi-dynamic-host"
							@update:height="onHeight('dynamic', $event)"
					>
						<div class="story-content" data-cy="vsi-dynamic-content">
							<p v-for="n in Math.max(1, state.rows)" :key="n" class="story-line">Content line {{ n }}</p>
						</div>
					</origam-virtual-scroll-item>
					<div class="story-status" data-cy="vsi-dynamic-status">
						Last height: <strong>{{ heights.dynamic ?? 'pending' }}</strong> px
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.rows" title="content lines"/>
			</template>
		</Variant>

		<Variant title="Renderless">
			<div class="story-shell" data-cy="vsi-renderless">
				<origam-virtual-scroll-item
						renderless
						@update:height="onHeight('renderless', $event)"
				>
					<template #renderless="{ itemRef }">
						<article
								:ref="itemRef"
								class="story-card"
								data-cy="vsi-renderless-host"
						>
							<h4>Renderless</h4>
							<p>The host element is owned by the consumer; the item still emits <code>update:height</code>.</p>
						</article>
					</template>
				</origam-virtual-scroll-item>
				<div class="story-status" data-cy="vsi-renderless-status">Last height: <strong>{{ heights.renderless ?? 'pending' }}</strong></div>
			</div>
		</Variant>

		<Variant title="Inside a list">
			<div class="story-shell" data-cy="vsi-list">
				<origam-virtual-scroll-item
						v-for="n in 6"
						:key="n"
						class="story-row"
						:data-cy="`vsi-list-row-${n}`"
				>
					<div class="story-content">Item {{ n }}</div>
				</origam-virtual-scroll-item>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive } from 'vue'

	import { OrigamVirtualScrollItem } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const heights = reactive<Record<string, number | undefined>>({
		default:    undefined,
		dynamic:    undefined,
		renderless: undefined,
	})

	function onHeight (key: keyof typeof heights, h: number) {
		heights[key] = h
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; max-width: 480px; }
	.story-row {
		border: 1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12));
		border-radius: 6px;
		padding: 12px 16px;
		background: var(--origam-color-surface-default, rgba(0, 0, 0, 0.03));
	}
	.story-content { font: 0.95rem/1.4 system-ui, sans-serif; }
	.story-line { margin: 0 0 6px; font: 0.875rem/1.4 system-ui, sans-serif; }
	.story-card {
		border: 1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12));
		border-radius: 8px;
		padding: 16px;
		background: var(--origam-color-surface-default, rgba(0, 0, 0, 0.03));
	}
	.story-card h4 { margin: 0 0 8px; font: 600 1rem/1.2 system-ui, sans-serif; }
	.story-card p  { margin: 0; font: 0.875rem/1.4 system-ui, sans-serif; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/VirtualScroll/OrigamVirtualScrollItem.md"/>
