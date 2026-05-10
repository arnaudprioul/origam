<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCell"
	>

		<!--
			<origam-data-table-headers-cell> is the desktop variant of the
			header cell — it owns the title + sort indicator combination.
			A separate `…HeadersCellMobile` story shows the mobile fallback.
		-->

		<Variant title="Default header cell">
			<origam-data-table :headers="headers" :items="items" data-cy="headers-cell-default"/>
		</Variant>

		<Variant title="Sortable + active sort indicator">
			<origam-data-table
					:headers="sortableHeaders"
					:items="items"
					sort-by="commits"
					data-cy="headers-cell-sortable"
			/>
		</Variant>

		<Variant title="Selection cell (master checkbox)">
			<origam-data-table
					:headers="headers"
					:items="items"
					show-select
					data-cy="headers-cell-select"
			/>
		</Variant>

		<Variant title="Note">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>OrigamDataTableHeadersCell</code> is internal — its
					rendering is dictated by the <code>headers</code> array
					passed to <code>&lt;origam-data-table&gt;</code>. Override
					individual cells via the <code>header.{key}</code> slot
					instead of subclassing this component.
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableHeadersCell } from '@origam/components'

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
