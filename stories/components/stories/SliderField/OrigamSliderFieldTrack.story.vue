<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderFieldTrack"
	>
		<!--
			Note: <origam-slider-field-track> is a sub-component of <origam-slider-field>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-slider-field data-cy="origam-slider-field-track-default-parent">
				<origam-slider-field-track data-cy="origam-slider-field-track-default"/>
			</origam-slider-field>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISliderFieldTrackProps>({ start: 0, stop: 0, disabled: false })"
		>
			<template #default="{ state }">
			<origam-slider-field data-cy="origam-slider-field-track-playground-parent">
				<origam-slider-field-track v-bind="state" data-cy="origam-slider-field-track-playground"/>
			</origam-slider-field>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.start" title="start"/>
				<HstNumber v-model="state.stop" title="stop"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSliderFieldTrack, OrigamSliderField } from '@origam/components'
	import type { ISliderFieldTrackProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/SliderField/OrigamSliderFieldTrack.md"/>
