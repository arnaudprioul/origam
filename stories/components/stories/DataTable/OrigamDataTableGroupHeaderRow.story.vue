<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableGroupHeaderRow"
	>
		<!--
			Note: <origam-data-table-group-header-row> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-group-header-row-default-parent">
				<origam-data-table-group-header-row data-cy="origam-data-table-group-header-row-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableGroupHeaderRowProps>({ index: 0 })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-group-header-row-playground-parent">
				<origam-data-table-group-header-row v-bind="state" data-cy="origam-data-table-group-header-row-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.index" title="index"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableGroupHeaderRow, OrigamDataTable } from '@origam/components'
	import type { IDataTableGroupHeaderRowProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableGroupHeaderRow.md"/>
