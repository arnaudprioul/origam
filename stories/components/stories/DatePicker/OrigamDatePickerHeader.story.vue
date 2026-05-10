<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePickerHeader"
	>
		<!--
			Note: <origam-date-picker-header> is a sub-component of <origam-date-picker>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-date-picker data-cy="origam-date-picker-header-default-parent">
				<origam-date-picker-header data-cy="origam-date-picker-header-default"/>
			</origam-date-picker>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDatePickerHeaderProps>({ header: '' })"
		>
			<template #default="{ state }">
			<origam-date-picker data-cy="origam-date-picker-header-playground-parent">
				<origam-date-picker-header v-bind="state" data-cy="origam-date-picker-header-playground"/>
			</origam-date-picker>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.header" title="header"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDatePickerHeader, OrigamDatePicker } from '@origam/components'
	import type { IDatePickerHeaderProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePickerHeader.md"/>
