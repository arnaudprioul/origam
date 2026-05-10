<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableColumnCell"
	>
		<!--
			Note: <origam-data-table-column-cell> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-column-cell-default-parent">
				<origam-data-table-column-cell data-cy="origam-data-table-column-cell-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableColumnProps>({ fixed: false, fixedOffset: 0, lastFixed: false, nowrap: false })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-column-cell-playground-parent">
				<origam-data-table-column-cell v-bind="state" data-cy="origam-data-table-column-cell-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fixed" title="fixed"/>
				<HstNumber v-model="state.fixedOffset" title="fixedOffset"/>
				<HstCheckbox v-model="state.lastFixed" title="lastFixed"/>
				<HstCheckbox v-model="state.nowrap" title="nowrap"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableColumnCell, OrigamDataTable } from '@origam/components'
	import type { IDataTableColumnProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableColumnCell.md"/>
