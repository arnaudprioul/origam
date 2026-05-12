<template>
	<Story
			group="components"
			title="Transition/OrigamSlideX"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--slide-x',
					disabled: false,
					group: false,
					hideOnLeave: false,
					leaveAbsolute: false,
					origin: ''
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-playground" @click="togglePlayground = !togglePlayground">Toggle</button>
					<origam-slide-x v-bind="state">
						<div v-if="togglePlayground" class="story-target" data-cy="target-playground">Playground</div>
					</origam-slide-x>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.name"     title="name"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.group"    title="group"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — disabled (animation off)">
			<template #default>
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-disabled" @click="toggleDisabled = !toggleDisabled">Toggle</button>
					<origam-slide-x disabled>
						<div v-if="toggleDisabled" class="story-target" data-cy="target-disabled">No animation — instant show/hide</div>
					</origam-slide-x>
				</div>
			</template>
		</Variant>

		<Variant title="Prop — group (transition-group)">
			<template #default>
				<div class="story-shell">
					<div style="display: flex; gap: 8px;">
						<button class="story-toggle" data-cy="group-add"    @click="groupItems.push(groupItems.length + 1)">Add</button>
						<button class="story-toggle" data-cy="group-remove" @click="groupItems.pop()">Remove</button>
					</div>
					<origam-slide-x group>
						<div v-for="item in groupItems" :key="item" class="story-target" :data-cy="`target-group-${item}`">Item {{ item }}</div>
					</origam-slide-x>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamSlideX } from '@origam/components'
	import type { ITransitionProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const toggleDisabled = ref(false)
	const togglePlayground = ref(false)
	const groupItems = ref([1, 2])
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-toggle { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target { padding: 12px 16px; border-radius: 6px; background: var(--origam-color-surface-default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamSlideX.md"/>
