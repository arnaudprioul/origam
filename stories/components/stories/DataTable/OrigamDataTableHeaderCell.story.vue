<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaderCell"
	>
		<!--
			Note: <origam-data-table-header-cell> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-header-cell-default-parent">
				<origam-data-table-header-cell data-cy="origam-data-table-header-cell-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableHeaderCellProps>({ x: 0, y: 0 })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-header-cell-playground-parent">
				<origam-data-table-header-cell v-bind="state" data-cy="origam-data-table-header-cell-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.x" title="x"/>
				<HstNumber v-model="state.y" title="y"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableHeaderCell, OrigamDataTable } from '@origam/components'
	import type { IDataTableHeaderCellProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeaderCell.md"/>
