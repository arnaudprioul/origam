<template>
	<Story
			group="components"
			title="Transition/OrigamTransition"
	>

		<Variant title="Default — string name">
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-default"
							@click="toggleDefault = !toggleDefault"
					>
						Toggle (default)
					</button>
					<origam-transition transition="origam-transition--fade">
						<div
								v-if="toggleDefault"
								class="story-target"
								data-cy="target-default"
						>
							Default content
						</div>
					</origam-transition>
				</div>
			</template>
		</Variant>

		<Variant title="Component dispatch">
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-component"
							@click="toggleComponent = !toggleComponent"
					>
						Toggle (component)
					</button>
					<origam-transition :transition="{ component: OrigamScaleRotate }">
						<div
								v-if="toggleComponent"
								class="story-target"
								data-cy="target-component"
						>
							Component-driven
						</div>
					</origam-transition>
				</div>
			</template>
		</Variant>

		<Variant title="Disabled">
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-disabled"
							@click="toggleDisabled = !toggleDisabled"
					>
						Toggle (disabled)
					</button>
					<origam-transition transition="origam-transition--fade" disabled>
						<div
								v-if="toggleDisabled"
								class="story-target"
								data-cy="target-disabled"
						>
							No animation
						</div>
					</origam-transition>
				</div>
			</template>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ disabled?: boolean; transition?: string }>({
					disabled: false,
					transition: 'origam-transition--fade'
				})"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-playground"
							@click="togglePlayground = !togglePlayground"
					>
						Toggle (playground)
					</button>
					<origam-transition
							:transition="state.transition"
							:disabled="state.disabled"
					>
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
				<HstSelect
						v-model="state.transition"
						title="transition"
						:options="transitionList"
				/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { OrigamTransition, OrigamScaleRotate } from '@origam/components'
	import type { IOptions } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const toggleDefault = ref(false)
	const toggleComponent = ref(false)
	const toggleDisabled = ref(false)
	const togglePlayground = ref(false)

	const transitionList: Array<IOptions<string>> = [
		{ label: 'fade',                    value: 'origam-transition--fade' },
		{ label: 'scale-rotate',            value: 'origam-transition--scale-rotate' },
		{ label: 'slide-x',                 value: 'origam-transition--slide-x' },
		{ label: 'slide-y',                 value: 'origam-transition--slide-y' },
		{ label: 'snack',                   value: 'origam-transition--snack' },
		{ label: 'translate-bottom',        value: 'origam-transition--translate-bottom' },
		{ label: 'translate-picker',        value: 'origam-transition--translate-picker' },
		{ label: 'reverse-translate-picker',value: 'origam-transition--reverse-translate-picker' }
	]
</script>

<style scoped>
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
		background: var(--origam-color-surface-default, rgba(0, 0, 0, 0.06));
		border: 1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12));
	}
</style>

<docs lang="md" src="@docs/components/Transition/OrigamTransition.md"/>
