<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerControls"
	>
		<!--
			Note: <origam-date-picker-controls> is a sub-component of <origam-date-picker>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-date-picker data-cy="origam-date-picker-controls-default-parent">
				<origam-date-picker-controls data-cy="origam-date-picker-controls-default"/>
			</origam-date-picker>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDatePickerControlsProps>({ active: '', disabled: false, disabledMonth: false, disabledYear: false, disabledNext: false, disabledPrev: false, text: '' })"
		>
			<template #default="{ state }">
			<origam-date-picker data-cy="origam-date-picker-controls-playground-parent">
				<origam-date-picker-controls v-bind="state" data-cy="origam-date-picker-controls-playground"/>
			</origam-date-picker>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.active" title="active"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.disabledMonth" title="disabledMonth"/>
				<HstCheckbox v-model="state.disabledYear" title="disabledYear"/>
				<HstCheckbox v-model="state.disabledNext" title="disabledNext"/>
				<HstCheckbox v-model="state.disabledPrev" title="disabledPrev"/>
				<HstText v-model="state.text" title="text"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDatePickerControls, OrigamDatePicker } from '@origam/components'
	import type { IDatePickerControlsProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerControls.md"/>
