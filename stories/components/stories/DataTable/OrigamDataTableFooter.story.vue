<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableFooter"
	>
		<!--
			Note: <origam-data-table-footer> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-footer-default-parent">
				<origam-data-table-footer data-cy="origam-data-table-footer-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableFooterProps>({ itemsPerPageText: '', pageText: '', firstPageLabel: '', prevPageLabel: '', nextPageLabel: '', lastPageLabel: '', showCurrentPage: false })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-footer-playground-parent">
				<origam-data-table-footer v-bind="state" data-cy="origam-data-table-footer-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.itemsPerPageText" title="itemsPerPageText"/>
				<HstText v-model="state.pageText" title="pageText"/>
				<HstText v-model="state.firstPageLabel" title="firstPageLabel"/>
				<HstText v-model="state.prevPageLabel" title="prevPageLabel"/>
				<HstText v-model="state.nextPageLabel" title="nextPageLabel"/>
				<HstText v-model="state.lastPageLabel" title="lastPageLabel"/>
				<HstCheckbox v-model="state.showCurrentPage" title="showCurrentPage"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableFooter, OrigamDataTable } from '@origam/components'
	import type { IDataTableFooterProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableFooter.md"/>
