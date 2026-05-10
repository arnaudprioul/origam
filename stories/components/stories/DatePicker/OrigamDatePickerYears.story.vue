<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerYears"
	>
		<!--
			Note: <origam-date-picker-years> is a sub-component of <origam-date-picker>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-date-picker data-cy="origam-date-picker-years-default-parent">
				<origam-date-picker-years data-cy="origam-date-picker-years-default"/>
			</origam-date-picker>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDatePickerYearsProps>({ year: 0 })"
		>
			<template #default="{ state }">
			<origam-date-picker data-cy="origam-date-picker-years-playground-parent">
				<origam-date-picker-years v-bind="state" data-cy="origam-date-picker-years-playground"/>
			</origam-date-picker>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.year" title="year"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDatePickerYears, OrigamDatePicker } from '@origam/components'
	import type { IDatePickerYearsProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerYears.md"/>
