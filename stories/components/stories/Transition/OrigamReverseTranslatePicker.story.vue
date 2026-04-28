<template>
	<Story
			group="components"
			title="Transition/OrigamReverseTranslatePicker"
	>

		<Variant title="Default">
			<template #default>
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-default" @click="toggleDefault = !toggleDefault">Toggle</button>
					<origam-reverse-translate-picker>
						<div v-if="toggleDefault" class="story-target" data-cy="target-default">Reverse translate picker</div>
					</origam-reverse-translate-picker>
				</div>
			</template>
		</Variant>

		<Variant title="Disabled">
			<template #default>
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-disabled" @click="toggleDisabled = !toggleDisabled">Toggle</button>
					<origam-reverse-translate-picker disabled>
						<div v-if="toggleDisabled" class="story-target" data-cy="target-disabled">No animation</div>
					</origam-reverse-translate-picker>
				</div>
			</template>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITransitionProps>({
					name: 'origam-transition--reverse-translate-picker',
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
					<origam-reverse-translate-picker v-bind="state">
						<div v-if="togglePlayground" class="story-target" data-cy="target-playground">Playground</div>
					</origam-reverse-translate-picker>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.name"     title="name"/>
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
	import { OrigamReverseTranslatePicker } from '@origam/components'
	import type { ITransitionProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const toggleDefault = ref(false)
	const toggleDisabled = ref(false)
	const togglePlayground = ref(false)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; position: relative; }
	.story-toggle { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target { padding: 12px 16px; border-radius: 6px; background: var(--origam-color-surface-default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamReverseTranslatePicker.md"/>
