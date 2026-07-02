<template>
	<Story
			group="components"
			title="Transition/OrigamScaleRotate"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--scale-rotate',
					mode: undefined,
					origin: ''
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button
							class="story-toggle"
							data-cy="toggle-design"
							@click="toggleDesign = !toggleDesign"
					>Toggle</button>
					<origam-scale-rotate
							:name="state.name"
							:mode="state.mode"
							:origin="state.origin"
					>
						<div v-if="toggleDesign" class="story-target" data-cy="target-design">Scale Rotate</div>
					</origam-scale-rotate>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Transition">
					<HstText   v-model="state.name"   title="Name"/>
					<HstSelect v-model="state.mode"   title="Mode"   :options="TRANSITION_MODE_OPTIONS"/>
					<HstText   v-model="state.origin" title="Origin"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<ITransitionProps>({
					disabled: false,
					group: false,
					hideOnLeave: false,
					leaveAbsolute: false
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div class="story-controls-row">
						<button
								class="story-toggle"
								data-cy="toggle-functional"
								@click="toggleFunctional = !toggleFunctional"
						>Toggle</button>
						<button
								class="story-toggle"
								data-cy="group-add"
								@click="functionalGroupItems.push(functionalGroupItems.length + 1)"
						>Add</button>
						<button
								class="story-toggle"
								data-cy="group-remove"
								@click="functionalGroupItems.pop()"
						>Remove</button>
					</div>
					<origam-scale-rotate
							:disabled="state.disabled"
							:group="state.group"
							:hide-on-leave="state.hideOnLeave"
							:leave-absolute="state.leaveAbsolute"
					>
						<div v-if="!state.group && toggleFunctional" class="story-target" data-cy="target-functional">Functional content</div>
						<div
								v-for="item in state.group ? functionalGroupItems : []"
								:key="item"
								class="story-target"
								:data-cy="`target-functional-group-${item}`"
						>Item {{ item }}</div>
					</origam-scale-rotate>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled"      title="Disabled"/>
					<HstCheckbox v-model="state.hideOnLeave"   title="Hide On Leave"/>
					<HstCheckbox v-model="state.leaveAbsolute" title="Leave Absolute"/>
				</StoryGroup>
				<StoryGroup title="Mode">
					<HstCheckbox v-model="state.group" title="Group (transition-group)"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-shell">
				<button
						class="story-toggle"
						data-cy="toggle-slot-default"
						@click="toggleSlotDefault = !toggleSlotDefault"
				>Toggle</button>
				<origam-scale-rotate>
					<div v-if="toggleSlotDefault" class="story-target" data-cy="target-slot-default">
						<span>Custom slot content</span>
					</div>
				</origam-scale-rotate>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--scale-rotate',
					mode: undefined,
					disabled: false,
					group: false,
					hideOnLeave: false,
					leaveAbsolute: false,
					origin: ''
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div class="story-controls-row">
						<button
								class="story-toggle"
								data-cy="toggle-playground"
								@click="togglePlayground = !togglePlayground"
						>Toggle</button>
						<button
								class="story-toggle"
								data-cy="group-add-playground"
								@click="playgroundGroupItems.push(playgroundGroupItems.length + 1)"
						>Add</button>
						<button
								class="story-toggle"
								data-cy="group-remove-playground"
								@click="playgroundGroupItems.pop()"
						>Remove</button>
					</div>
					<origam-scale-rotate v-bind="state">
						<div v-if="!state.group && togglePlayground" class="story-target" data-cy="target-playground">Playground</div>
						<div
								v-for="item in state.group ? playgroundGroupItems : []"
								:key="item"
								class="story-target"
								:data-cy="`target-playground-group-${item}`"
						>Item {{ item }}</div>
					</origam-scale-rotate>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstText   v-model="state.name"   title="Name"/>
					<HstSelect v-model="state.mode"   title="Mode"   :options="TRANSITION_MODE_OPTIONS"/>
					<HstText   v-model="state.origin" title="Origin"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled"      title="Disabled"/>
					<HstCheckbox v-model="state.group"         title="Group (transition-group)"/>
					<HstCheckbox v-model="state.hideOnLeave"   title="Hide On Leave"/>
					<HstCheckbox v-model="state.leaveAbsolute" title="Leave Absolute"/>
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

	import { OrigamScaleRotate } from '@origam/components'
	import { TRANSITION_MODE } from '@origam/enums'
	import type { ITransitionProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const toggleDesign = ref(false)
	const toggleFunctional = ref(false)
	const toggleSlotDefault = ref(false)
	const togglePlayground = ref(false)

	const functionalGroupItems = ref([1, 2])
	const playgroundGroupItems = ref([1, 2])

	const TRANSITION_MODE_OPTIONS = [
		{ label: '(none)', value: undefined },
		{ label: TRANSITION_MODE.IN_OUT, value: TRANSITION_MODE.IN_OUT },
		{ label: TRANSITION_MODE.OUT_IN, value: TRANSITION_MODE.OUT_IN },
		{ label: TRANSITION_MODE.DEFAULT, value: TRANSITION_MODE.DEFAULT }
	]
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-controls-row { display: flex; gap: 8px; }
	.story-toggle { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target { padding: 12px 16px; border-radius: 6px; background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamScaleRotate.md"/>
