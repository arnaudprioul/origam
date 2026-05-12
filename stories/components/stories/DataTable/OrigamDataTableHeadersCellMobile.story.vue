<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCellMobile"
	>
		<!--
			Playground — the mobile fallback header cell (stacked card
			layout). OrigamDataTableHeadersCellMobile is internal and
			activated automatically when the parent uses `mobile` mode.
		-->
		<Variant title="Playground">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="headers" :items="items" mobile data-cy="mobile-cell-default"/>
			</div>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — sortable (sort indicator on mobile)">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="sortableHeaders" :items="items" mobile data-cy="mobile-cell-sortable"/>
			</div>
		</Variant>

		<Variant title="Prop — showSelect (mobile checkbox row)">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="headers" :items="items" mobile show-select data-cy="mobile-cell-select"/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable } from '@origam/components'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const sortableHeaders = headers.map((h) => ({ ...h, sortable: true }))

	const items = [
		{ name: 'Alice', team: 'Frontend', commits: 142 },
		{ name: 'Bob',   team: 'Backend',  commits: 98  },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeadersCellMobile.md"/>
