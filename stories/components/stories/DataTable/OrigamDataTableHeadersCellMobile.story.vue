<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCellMobile"
	>

		<!--
			<origam-data-table-headers-cell-mobile> is the mobile fallback
			variant of the header cell — typically used when the table
			collapses to a stacked card layout below a breakpoint. Best
			previewed by narrowing the viewport (or use the playground).
		-->

		<Variant title="Default (mobile-style stacked header)">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="headers" :items="items" mobile data-cy="mobile-cell-default"/>
			</div>
		</Variant>

		<Variant title="Sortable on mobile">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="sortableHeaders" :items="items" mobile data-cy="mobile-cell-sortable"/>
			</div>
		</Variant>

		<Variant title="With selection (mobile checkbox row)">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table :headers="headers" :items="items" mobile show-select data-cy="mobile-cell-select"/>
			</div>
		</Variant>

		<Variant title="Note">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>OrigamDataTableHeadersCellMobile</code> is automatically
					selected when the parent <code>OrigamDataTable</code> is in
					mobile / narrow layout mode. There's rarely a reason to
					instantiate it yourself.
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableHeadersCellMobile } from '@origam/components'

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
