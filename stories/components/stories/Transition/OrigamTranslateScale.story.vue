<template>
	<Story
			group="components"
			title="Transition/OrigamTranslateScale"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ name?: string; disabled?: boolean }>({
					name: 'origam-transition--transform-scale',
					disabled: false
				})"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-playground" @click="togglePlayground = !togglePlayground">Toggle</button>
					<origam-translate-scale :name="state.name" :disabled="state.disabled">
						<div v-if="togglePlayground" class="story-target" data-cy="target-playground">Playground</div>
					</origam-translate-scale>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.name"     title="name"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — disabled (animation off)">
			<template #default>
				<div class="story-shell">
					<button class="story-toggle" data-cy="toggle-disabled" @click="toggleDisabled = !toggleDisabled">Toggle</button>
					<origam-translate-scale disabled>
						<div v-if="toggleDisabled" class="story-target" data-cy="target-disabled">No animation — instant show/hide</div>
					</origam-translate-scale>
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
	import { OrigamTranslateScale } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const toggleDisabled = ref(false)
	const togglePlayground = ref(false)
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-toggle { appearance: none; border: 1px solid currentColor; background: transparent; color: inherit; padding: 6px 14px; border-radius: 6px; cursor: pointer; font: inherit; }
	.story-target { padding: 12px 16px; border-radius: 6px; background: var(--origam-color__surface---default, rgba(0, 0, 0, 0.06)); border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12)); }
</style>

<docs lang="md" src="@docs/components/Transition/OrigamTranslateScale.md"/>
