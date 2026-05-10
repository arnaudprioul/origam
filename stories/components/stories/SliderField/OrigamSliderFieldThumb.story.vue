<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderFieldThumb"
	>
		<!--
			Note: <origam-slider-field-thumb> is a sub-component of <origam-slider-field>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-slider-field data-cy="origam-slider-field-thumb-default-parent">
				<origam-slider-field-thumb data-cy="origam-slider-field-thumb-default"/>
			</origam-slider-field>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISliderFieldThumbProps>({ min: 0, max: 0, focused: false, modelValue: 0, position: 0, readonly: false, disabled: false })"
		>
			<template #default="{ state }">
			<origam-slider-field data-cy="origam-slider-field-thumb-playground-parent">
				<origam-slider-field-thumb v-bind="state" data-cy="origam-slider-field-thumb-playground"/>
			</origam-slider-field>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.min" title="min"/>
				<HstNumber v-model="state.max" title="max"/>
				<HstCheckbox v-model="state.focused" title="focused"/>
				<HstNumber v-model="state.modelValue" title="modelValue"/>
				<HstNumber v-model="state.position" title="position"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSliderFieldThumb, OrigamSliderField } from '@origam/components'
	import type { ISliderFieldThumbProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/SliderField/OrigamSliderFieldThumb.md"/>
