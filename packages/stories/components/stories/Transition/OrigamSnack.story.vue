<template>
	<Story
			group="components"
			title="Transition/OrigamSnack"
	>
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
					<origam-snack disabled>
						<div v-if="toggleDisabled" class="story-target" data-cy="target-disabled">No animation — instant show/hide</div>
					</origam-snack>
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
					<origam-snack group>
						<div v-for="item in groupItems" :key="item" class="story-target" :data-cy="`target-group-${item}`">Snack {{ item }}</div>
					</origam-snack>
				</div>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div class="story-shell">
				<button class="story-toggle" data-cy="toggle-slot-default" @click="toggleSlotDefault = !toggleSlotDefault">Toggle</button>
				<origam-snack>
					<div v-if="toggleSlotDefault" class="story-target" data-cy="target-slot-default">
						<span>Custom slot content</span>
					</div>
				</origam-snack>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamSnack } from '@origam/components'
	import type { ITransitionProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const toggleDisabled = ref(false)
	const togglePlayground = ref(false)
	const toggleSlotDefault = ref(false)
	const groupItems = ref([1])
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-toggle { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target { padding: 12px 16px; border-radius: 6px; background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamSnack.md"/>
