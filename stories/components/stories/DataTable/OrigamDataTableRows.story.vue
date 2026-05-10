<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRows"
	>
		<!--
			Note: <origam-data-table-rows> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-rows-default-parent">
				<origam-data-table-rows data-cy="origam-data-table-rows-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableRowsProps>({ hideNoData: false, noDataText: '' })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-rows-playground-parent">
				<origam-data-table-rows v-bind="state" data-cy="origam-data-table-rows-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideNoData" title="hideNoData"/>
				<HstText v-model="state.noDataText" title="noDataText"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableRows, OrigamDataTable } from '@origam/components'
	import type { IDataTableRowsProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRows.md"/>
