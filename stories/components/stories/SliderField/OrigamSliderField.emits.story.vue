<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderField — Emits"
	>
		<Variant title="Emit — end">
			<origam-slider-field
					v-model="model"
					:min="0"
					:max="100"
					label="Drag to end"
					data-cy="slider-emit-end"
					@end="logEvent('end', $event)"
			/>
		</Variant>

		<Variant title="Emit — start">
			<origam-slider-field
					v-model="model"
					:min="0"
					:max="100"
					label="Drag to start"
					data-cy="slider-emit-start"
					@start="logEvent('start', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:focused">
			<origam-slider-field
					v-model="model"
					:min="0"
					:max="100"
					label="Focus me"
					data-cy="slider-emit-focused"
					@update:focused="logEvent('update:focused', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-slider-field
					v-model="model"
					:min="0"
					:max="100"
					label="Move me"
					data-cy="slider-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="slider-emit-status">value = {{ model }}</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { logEvent } from 'histoire/client'

	import { OrigamSliderField } from '@origam/components'

	const model = ref(50)
</script>
