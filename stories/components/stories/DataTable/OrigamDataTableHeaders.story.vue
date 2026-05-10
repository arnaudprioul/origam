<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaders"
	>
		<!--
			Note: <origam-data-table-headers> is a sub-component of <origam-data-table>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-data-table data-cy="origam-data-table-headers-default-parent">
				<origam-data-table-headers data-cy="origam-data-table-headers-default"/>
			</origam-data-table>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTableHeadersProps>({  })"
		>
			<template #default="{ state }">
			<origam-data-table data-cy="origam-data-table-headers-playground-parent">
				<origam-data-table-headers v-bind="state" data-cy="origam-data-table-headers-playground"/>
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
	import { OrigamDataTableHeaders, OrigamDataTable } from '@origam/components'
	import type { IDataTableHeadersProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeaders.md"/>
