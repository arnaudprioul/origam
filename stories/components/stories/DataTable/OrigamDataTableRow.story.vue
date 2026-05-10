<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRow"
	>
		<!--
			Note: <origam-data-table-row> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-row-default-parent">
				<origam-data-table-row data-cy="origam-data-table-row-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableRowProps>({  })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-row-playground-parent">
				<origam-data-table-row v-bind="state" data-cy="origam-data-table-row-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<!-- TODO: add HstControl bindings for the prop surface -->
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableRow, OrigamDataTable } from '@origam/components'
	import type { IDataTableRowProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRow.md"/>
