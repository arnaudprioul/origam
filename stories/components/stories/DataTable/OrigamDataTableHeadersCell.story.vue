<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCell"
	>
		<!--
			Playground — the desktop header cell (title + sort indicator).
			OrigamDataTableHeadersCell is internal; override via
			`header.{key}` on the parent table.
		-->
		<Variant title="Playground">
			<origam-data-table :headers="sortableHeaders" :items="items" data-cy="headers-cell-default"/>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — sortable (active sort indicator)">
			<origam-data-table
					:headers="sortableHeaders"
					:items="items"
					sort-by="commits"
					data-cy="headers-cell-sortable"
			/>
		</Variant>

		<Variant title="Prop — showSelect (master checkbox)">
			<origam-data-table
					:headers="headers"
					:items="items"
					show-select
					data-cy="headers-cell-select"
			/>
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
		{ name: 'Carol', team: 'Design',   commits: 31  },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeadersCell.md"/>
