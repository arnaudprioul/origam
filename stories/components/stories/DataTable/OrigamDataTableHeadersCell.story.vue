<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCell"
	>
		<!--
			Note: <origam-data-table-headers-cell> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-headers-cell-default-parent">
				<origam-data-table-headers-cell data-cy="origam-data-table-headers-cell-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableHeadersCellProps>({  })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-headers-cell-playground-parent">
				<origam-data-table-headers-cell v-bind="state" data-cy="origam-data-table-headers-cell-playground"/>
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
	import { OrigamDataTableHeadersCell, OrigamDataTable } from '@origam/components'
	import type { IDataTableHeadersCellProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeadersCell.md"/>
