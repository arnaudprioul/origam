<template>
	<Story
			group="components"
			title="Transition/OrigamFade"
	>
		<!--
			Playground — first by convention. Exposes every ITransitionProps knob.
			Toggle the button to see the animation in action.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--fade',
					disabled: false,
					group: false,
					hideOnLeave: false,
					leaveAbsolute: false,
					origin: ''
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button
							class="story-toggle"
							data-cy="toggle-playground"
							@click="togglePlayground = !togglePlayground"
					>
						Toggle
					</button>
					<origam-fade v-bind="state">
						<div
								v-if="togglePlayground"
								class="story-target"
								data-cy="target-playground"
						>
							Playground
						</div>
					</origam-fade>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.name"          title="name"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.group"         title="group"/>
				<HstCheckbox v-model="state.hideOnLeave"   title="hideOnLeave"/>
				<HstCheckbox v-model="state.leaveAbsolute" title="leaveAbsolute"/>
				<HstText     v-model="state.origin"        title="origin"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — disabled (animation off)">
			<template #default>
				<div class="story-shell">
					<button
							class="story-toggle"
							data-cy="toggle-disabled"
							@click="toggleDisabled = !toggleDisabled"
					>
						Toggle
					</button>
					<origam-fade disabled>
						<div
								v-if="toggleDisabled"
								class="story-target"
								data-cy="target-disabled"
						>
							No animation — instant show/hide
						</div>
					</origam-fade>
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
					<origam-fade group>
						<div
								v-for="item in groupItems"
								:key="item"
								class="story-target"
								:data-cy="`target-group-${item}`"
						>
							Item {{ item }}
						</div>
					</origam-fade>
				</div>
			</template>
		</Variant>

		<Variant title="Prop — appear (mount animation)">
			<template #default>
				<div class="story-shell">
					<button
							class="story-toggle"
							data-cy="toggle-appear"
							@click="appearKey++"
					>
						Remount
					</button>
					<origam-fade :key="appearKey">
						<div class="story-target" data-cy="target-appear">
							Mounted at {{ appearKey }}
						</div>
					</origam-fade>
				</div>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div class="story-shell">
				<button
						class="story-toggle"
						data-cy="toggle-slot-default"
						@click="toggleSlotDefault = !toggleSlotDefault"
				>
					Toggle
				</button>
				<origam-fade>
					<div v-if="toggleSlotDefault" class="story-target" data-cy="target-slot-default">
						<span>Custom slot content</span>
					</div>
				</origam-fade>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamFade } from '@origam/components'
	import type { ITransitionProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const toggleDisabled    = ref(false)
	const togglePlayground  = ref(false)
	const toggleSlotDefault = ref(false)
	const appearKey         = ref(0)
	const groupItems        = ref([1, 2])
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 12px;
		align-items: flex-start;
	}
	.story-toggle {
		appearance: none;
		border: 1px solid currentColor;
		background: transparent;
		color: inherit;
		padding: 6px 14px;
		border-radius: 6px;
		cursor: pointer;
		font: inherit;
	}
	.story-target {
		padding: 12px 16px;
		border-radius: 6px;
		background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06));
		border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12));
	}
</style>

<docs lang="md" src="@docs/components/Transition/OrigamFade.md"/>
