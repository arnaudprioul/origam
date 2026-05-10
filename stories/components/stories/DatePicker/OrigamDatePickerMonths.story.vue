<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerMonths"
	>
		<!--
			Note: <origam-date-picker-months> is a sub-component of <origam-date-picker>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-date-picker data-cy="origam-date-picker-months-default-parent">
				<origam-date-picker-months data-cy="origam-date-picker-months-default"/>
			</origam-date-picker>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDatePickerMonthsProps>({ month: 0, year: 0 })"
		>
			<template #default="{ state }">
			<origam-date-picker data-cy="origam-date-picker-months-playground-parent">
				<origam-date-picker-months v-bind="state" data-cy="origam-date-picker-months-playground"/>
			</origam-date-picker>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.month" title="month"/>
				<HstNumber v-model="state.year" title="year"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDatePickerMonths, OrigamDatePicker } from '@origam/components'
	import type { IDatePickerMonthsProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerMonths.md"/>
