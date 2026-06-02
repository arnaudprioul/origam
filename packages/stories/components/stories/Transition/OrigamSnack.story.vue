<template>
	<Story
			group="components"
			title="Transition/OrigamSnack"
	>
		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--snack',
					disabled: false,
					group: false,
					hideOnLeave: false,
					leaveAbsolute: false,
					origin: ''
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-functional" @click="toggleFunctional = !toggleFunctional">Toggle</button>
					<origam-snack
							:name="state.name"
							:mode="state.mode"
							:disabled="state.disabled"
							:group="state.group"
							:hide-on-leave="state.hideOnLeave"
							:leave-absolute="state.leaveAbsolute"
							:origin="state.origin || undefined"
					>
						<div v-if="!state.group && toggleFunctional" class="story-target" data-cy="target-functional">Snack transition</div>
						<template v-if="state.group">
							<div v-for="item in groupItemsFunctional" :key="item" class="story-target" :data-cy="`target-group-functional-${item}`">Snack {{ item }}</div>
						</template>
					</origam-snack>
					<div v-if="state.group" style="display: flex; gap: 8px;">
						<button class="story-toggle" data-cy="group-add-functional" @click="groupItemsFunctional.push(groupItemsFunctional.length + 1)">Add</button>
						<button class="story-toggle" data-cy="group-remove-functional" @click="groupItemsFunctional.pop()">Remove</button>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Animation">
					<HstText     v-model="state.name"     title="Name"/>
					<HstSelect   v-model="state.mode"     title="Mode" :options="TRANSITION_MODE_OPTIONS"/>
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
				</StoryGroup>
				<StoryGroup title="Group">
					<HstCheckbox v-model="state.group" title="Group (TransitionGroup)"/>
				</StoryGroup>
				<StoryGroup title="Leave Behaviour">
					<HstCheckbox v-model="state.hideOnLeave"    title="Hide On Leave"/>
					<HstCheckbox v-model="state.leaveAbsolute"  title="Leave Absolute"/>
				</StoryGroup>
				<StoryGroup title="Origin">
					<HstText v-model="state.origin" title="Transform Origin"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="story-shell">
				<button class="story-toggle" data-cy="toggle-slot-default" @click="toggleSlotDefault = !toggleSlotDefault">Toggle</button>
				<origam-snack>
					<div v-if="toggleSlotDefault" class="story-target" data-cy="target-slot-default">
						<span>Custom slot content</span>
					</div>
				</origam-snack>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--snack',
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
					<origam-snack v-bind="state">
						<div v-if="togglePlayground" class="story-target" data-cy="target-playground">Playground</div>
					</origam-snack>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Functional">
					<HstText     v-model="state.name"         title="Name"/>
					<HstSelect   v-model="state.mode"         title="Mode"             :options="TRANSITION_MODE_OPTIONS"/>
					<HstCheckbox v-model="state.disabled"     title="Disabled"/>
					<HstCheckbox v-model="state.group"        title="Group"/>
					<HstCheckbox v-model="state.hideOnLeave"  title="Hide On Leave"/>
					<HstCheckbox v-model="state.leaveAbsolute" title="Leave Absolute"/>
					<HstText     v-model="state.origin"       title="Transform Origin"/>
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

	import { OrigamSnack } from '@origam/components'
	import { TRANSITION_MODE } from '@origam/enums'
	import type { IOptions, ITransitionProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const toggleFunctional  = ref(false)
	const toggleSlotDefault = ref(false)
	const togglePlayground  = ref(false)

	const groupItemsFunctional = ref([1])

	const TRANSITION_MODE_OPTIONS: Array<IOptions<string | undefined>> = [
		{ label: '(none)', value: undefined },
		{ label: 'in-out', value: TRANSITION_MODE.IN_OUT },
		{ label: 'out-in', value: TRANSITION_MODE.OUT_IN },
		{ label: 'default', value: TRANSITION_MODE.DEFAULT }
	]
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-toggle { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target { padding: 12px 16px; border-radius: 6px; background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamSnack.md"/>
