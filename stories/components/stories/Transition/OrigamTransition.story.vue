<template>
	<Story
			group="components"
			title="Transition/OrigamTransition"
	>
		<!--
			Playground — first by convention. OrigamTransition is a dispatcher
			that accepts either a CSS class name string or a component object.
		-->
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

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — transition (string name)">
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-default"
							@click="toggleDefault = !toggleDefault"
					>
						Toggle
					</button>
					<origam-transition transition="origam-transition--fade">
						<div
								v-if="toggleDefault"
								class="story-target"
								data-cy="target-default"
						>
							Fade transition via CSS class name
						</div>
					</origam-transition>
				</div>
			</template>
		</Variant>

		<Variant title="Prop — transition (component object)">
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-component"
							@click="toggleComponent = !toggleComponent"
					>
						Toggle
					</button>
					<origam-transition :transition="{ component: OrigamScaleRotate }">
						<div
								v-if="toggleComponent"
								class="story-target"
								data-cy="target-component"
						>
							Component-driven transition
						</div>
					</origam-transition>
				</div>
			</template>
		</Variant>

		<Variant title="Prop — disabled (animation off)">
			<template #default>
				<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
					<button
							class="story-toggle"
							data-cy="toggle-disabled"
							@click="toggleDisabled = !toggleDisabled"
					>
						Toggle
					</button>
					<origam-transition transition="origam-transition--fade" disabled>
						<div
								v-if="toggleDisabled"
								class="story-target"
								data-cy="target-disabled"
						>
							No animation — instant show/hide
						</div>
					</origam-transition>
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
