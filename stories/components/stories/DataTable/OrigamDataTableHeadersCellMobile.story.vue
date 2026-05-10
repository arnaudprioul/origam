<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCellMobile"
	>
		<!--
			Note: <origam-data-table-headers-cell-mobile> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-headers-cell-mobile-default-parent">
				<origam-data-table-headers-cell-mobile data-cy="origam-data-table-headers-cell-mobile-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableHeadersCellMobileProps>({ colspan: 0 })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-headers-cell-mobile-playground-parent">
				<origam-data-table-headers-cell-mobile v-bind="state" data-cy="origam-data-table-headers-cell-mobile-playground"/>
			</origam-data-table>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.colspan" title="colspan"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableHeadersCellMobile, OrigamDataTable } from '@origam/components'
	import type { IDataTableHeadersCellMobileProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeadersCellMobile.md"/>
