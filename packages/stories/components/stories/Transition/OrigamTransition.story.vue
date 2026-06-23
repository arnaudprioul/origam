<template>
	<Story
			group="components"
			title="Transition/OrigamTransition"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<ITransitionComponentProps>({
					transition: 'origam-transition--fade'
				})"
		>
			<template #default="{ state }">
				<div class="story-stack">
					<button
							class="story-toggle"
							data-cy="toggle-design"
							@click="toggleDesign = !toggleDesign"
					>
						Toggle
					</button>
					<origam-transition :transition="state.transition" :disabled="state.disabled">
						<div
								v-if="toggleDesign"
								class="story-target"
								data-cy="target-design"
						>
							Transition content
						</div>
					</origam-transition>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Transition">
					<HstSelect
							v-model="state.transition"
							title="Transition"
							:options="TRANSITION_CSS_OPTIONS"
					/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<ITransitionComponentProps>({
					transition: 'origam-transition--fade',
					disabled: false
				})"
		>
			<template #default="{ state }">
				<div class="story-stack">
					<button
							class="story-toggle"
							data-cy="toggle-functional"
							@click="toggleFunctional = !toggleFunctional"
					>
						Toggle
					</button>
					<origam-transition :transition="state.transition" :disabled="state.disabled">
						<div
								v-if="toggleFunctional"
								class="story-target"
								data-cy="target-functional"
						>
							Functional content
						</div>
					</origam-transition>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
				</StoryGroup>
				<StoryGroup title="Transition">
					<HstSelect
							v-model="state.transition"
							title="Transition (CSS name)"
							:options="TRANSITION_CSS_OPTIONS"
					/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<div class="story-stack">
				<button
						class="story-toggle"
						data-cy="toggle-slot-default"
						@click="toggleSlotDefault = !toggleSlotDefault"
				>
					Toggle
				</button>
				<origam-transition transition="origam-transition--fade">
					<div
							v-if="toggleSlotDefault"
							class="story-target"
							data-cy="target-slot-default"
					>
						<strong>Custom</strong> slot content via default slot
					</div>
				</origam-transition>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITransitionComponentProps>({
					transition: 'origam-transition--fade',
					disabled: false
				})"
		>
			<template #default="{ state }">
				<div class="story-stack">
					<button
							class="story-toggle"
							data-cy="toggle-playground"
							@click="togglePlayground = !togglePlayground"
					>
						Toggle (playground)
					</button>
					<origam-transition v-bind="state">
						<div
								v-if="togglePlayground"
								class="story-target"
								data-cy="target-playground"
						>
							Playground content
						</div>
					</origam-transition>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect
							v-model="state.transition"
							title="Transition"
							:options="TRANSITION_CSS_OPTIONS"
					/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
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

	import { OrigamTransition } from '@origam/components'
	import type { ITransitionComponentProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'

	const toggleDesign     = ref(false)
	const toggleFunctional = ref(false)
	const toggleSlotDefault = ref(false)
	const togglePlayground  = ref(false)

	const TRANSITION_CSS_OPTIONS = [
		{ label: 'fade',                     value: 'origam-transition--fade' },
		{ label: 'scale-rotate',             value: 'origam-transition--scale-rotate' },
		{ label: 'slide-x',                  value: 'origam-transition--slide-x' },
		{ label: 'slide-y',                  value: 'origam-transition--slide-y' },
		{ label: 'snack',                    value: 'origam-transition--snack' },
		{ label: 'translate-bottom',         value: 'origam-transition--translate-bottom' },
		{ label: 'translate-picker',         value: 'origam-transition--translate-picker' },
		{ label: 'reverse-translate-picker', value: 'origam-transition--reverse-translate-picker' }
	]
</script>

<style scoped>
	.story-stack {
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

<docs lang="md" src="@docs/components/Transition/OrigamTransition.md"/>
