<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerMonth"
	>
		<!--
			Note: <origam-date-picker-month> is a sub-component of <origam-date-picker>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-date-picker data-cy="origam-date-picker-month-default-parent">
				<origam-date-picker-month data-cy="origam-date-picker-month-default"/>
			</origam-date-picker>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDatePickerMonthProps>({ hideWeekdays: false, multiple: false, range: false, showWeek: false })"
		>
			<template #default="{ state }">
			<origam-date-picker data-cy="origam-date-picker-month-playground-parent">
				<origam-date-picker-month v-bind="state" data-cy="origam-date-picker-month-playground"/>
			</origam-date-picker>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideWeekdays" title="hideWeekdays"/>
				<HstCheckbox v-model="state.multiple" title="multiple"/>
				<HstCheckbox v-model="state.range" title="range"/>
				<HstCheckbox v-model="state.showWeek" title="showWeek"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDatePickerMonth, OrigamDatePicker } from '@origam/components'
	import type { IDatePickerMonthProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerMonth.md"/>
