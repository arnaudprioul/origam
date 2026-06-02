<template>
	<Story
			group="components"
			title="Transition/OrigamSlideX"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<ITransitionProps>({ name: 'origam-transition--slide-x', mode: 'default' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-design" @click="toggleDesign = !toggleDesign">Toggle</button>
					<origam-slide-x :name="state.name" :mode="state.mode">
						<div v-if="toggleDesign" class="story-target" data-cy="target-design">Design variant</div>
					</origam-slide-x>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Animation">
					<HstText   v-model="state.name" title="Name (CSS class prefix)"/>
					<HstSelect v-model="state.mode" title="Mode" :options="TRANSITION_MODE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<ITransitionProps>({ disabled: false, group: false, hideOnLeave: false, leaveAbsolute: false, origin: '' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div class="story-actions">
						<button class="story-toggle" data-cy="toggle-functional" @click="toggleFunctional = !toggleFunctional">Toggle single</button>
						<button class="story-toggle" data-cy="group-add"         @click="groupItems.push(groupItems.length + 1)">Add item</button>
						<button class="story-toggle" data-cy="group-remove"      @click="groupItems.pop()">Remove item</button>
					</div>
					<origam-slide-x
							:disabled="state.disabled"
							:group="state.group"
							:hide-on-leave="state.hideOnLeave"
							:leave-absolute="state.leaveAbsolute"
							:origin="state.origin || undefined"
					>
						<div v-if="!state.group && toggleFunctional" class="story-target" data-cy="target-functional">Single item</div>
						<div v-for="item in state.group ? groupItems : []" :key="item" class="story-target" :data-cy="`target-group-${item}`">Item {{ item }}</div>
					</origam-slide-x>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled (animation off)"/>
				</StoryGroup>
				<StoryGroup title="Group">
					<HstCheckbox v-model="state.group" title="Group (transition-group)"/>
				</StoryGroup>
				<StoryGroup title="Leave Behaviour">
					<HstCheckbox v-model="state.hideOnLeave"    title="Hide On Leave"/>
					<HstCheckbox v-model="state.leaveAbsolute"  title="Leave Absolute"/>
				</StoryGroup>
				<StoryGroup title="Origin">
					<HstText v-model="state.origin" title="Origin (transform-origin)"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="story-shell">
				<button class="story-toggle" data-cy="toggle-slot-default" @click="toggleSlotDefault = !toggleSlotDefault">Toggle</button>
				<origam-slide-x>
					<div v-if="toggleSlotDefault" class="story-target" data-cy="target-slot-default">
						<strong>Custom</strong> slot content
					</div>
				</origam-slide-x>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITransitionProps>({ name: 'origam-transition--slide-x', mode: 'default', disabled: false, group: false, hideOnLeave: false, leaveAbsolute: false, origin: '' })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<div class="story-actions">
						<button class="story-toggle" data-cy="toggle-playground" @click="togglePlayground = !togglePlayground">Toggle single</button>
						<button class="story-toggle" data-cy="group-add-pg"      @click="groupItemsPg.push(groupItemsPg.length + 1)">Add item</button>
						<button class="story-toggle" data-cy="group-remove-pg"   @click="groupItemsPg.pop()">Remove item</button>
					</div>
					<origam-slide-x v-bind="state">
						<div v-if="!state.group && togglePlayground" class="story-target" data-cy="target-playground">Playground</div>
						<div v-for="item in state.group ? groupItemsPg : []" :key="item" class="story-target" :data-cy="`target-pg-group-${item}`">Item {{ item }}</div>
					</origam-slide-x>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstText   v-model="state.name" title="Name (CSS class prefix)"/>
					<HstSelect v-model="state.mode" title="Mode" :options="TRANSITION_MODE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled"     title="Disabled"/>
					<HstCheckbox v-model="state.group"        title="Group"/>
					<HstCheckbox v-model="state.hideOnLeave"  title="Hide On Leave"/>
					<HstCheckbox v-model="state.leaveAbsolute" title="Leave Absolute"/>
					<HstText     v-model="state.origin"       title="Origin"/>
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

	import { OrigamSlideX } from '@origam/components'
	import { TRANSITION_MODE } from '@origam/enums'
	import type { ITransitionProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const toggleDesign    = ref(false)
	const toggleFunctional = ref(false)
	const toggleSlotDefault = ref(false)
	const togglePlayground = ref(false)

	const groupItems   = ref([1, 2])
	const groupItemsPg = ref([1, 2])

	const TRANSITION_MODE_OPTIONS = [
		{ label: 'default', value: TRANSITION_MODE.DEFAULT },
		{ label: 'in-out',  value: TRANSITION_MODE.IN_OUT  },
		{ label: 'out-in',  value: TRANSITION_MODE.OUT_IN  }
	]
</script>

<style scoped>
	.story-shell   { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-actions { display: flex; gap: 8px; flex-wrap: wrap; }
	.story-toggle  { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target  { padding: 12px 16px; border-radius: 6px; background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamSlideX.md"/>
