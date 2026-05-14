<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaderCell"
	>
		<!--
			Playground — shows a single header cell (sortable + aligned)
			via the parent table. OrigamDataTableHeaderCell is internal;
			customise via the `header.{key}` slot.
		-->
		<Variant title="Playground">
			<origam-data-table :headers="sortableHeaders" :items="items" data-cy="header-cell-default"/>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — sortable (sort indicator)">
			<origam-data-table :headers="sortableHeaders" :items="items" data-cy="header-cell-sortable"/>
		</Variant>

		<Variant title="Prop — align (start / center / end)">
			<origam-data-table :headers="alignedHeaders" :items="items" data-cy="header-cell-aligned"/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — header.{key} (per-column override)">
			<!--
				Override a specific column header via `header.{key}` on the
				parent table — here the `commits` column gets an icon prefix.
			-->
			<origam-data-table :headers="headers" :items="items" data-cy="header-cell-slot">
				<template #header.commits>
					<span style="display: inline-flex; align-items: center; gap: 4px;">
						<origam-icon :icon="MDI_ICONS.STAR" :size="12"/>
						<strong>Total commits</strong>
					</span>
				</template>
			</origam-data-table>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits' },
	]

	const sortableHeaders = headers.map((h) => ({ ...h, sortable: true }))

	const alignedHeaders = [
		{ title: 'Start',  key: 'name',    align: 'start' },
		{ title: 'Center', key: 'team',    align: 'center' },
		{ title: 'End',    key: 'commits', align: 'end' },
	]

	const items = [
		{ name: 'Alice', team: 'Frontend', commits: 142 },
		{ name: 'Bob',   team: 'Backend',  commits: 98  },
		{ name: 'Carol', team: 'Design',   commits: 31  },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeaderCell.md"/>
