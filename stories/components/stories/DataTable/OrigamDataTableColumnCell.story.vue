<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableColumnCell"
	>

		<!--
			<origam-data-table-column-cell> is a single body cell. The
			parent table renders one per (row × header) intersection.
			Demos below show different cell renderings via the
			column-level slots.
		-->

		<Variant title="Default body cell">
			<origam-data-table :headers="headers" :items="items" data-cy="column-cell-default"/>
		</Variant>

		<Variant title="Aligned columns (start / center / end)">
			<origam-data-table :headers="alignedHeaders" :items="items" data-cy="column-cell-aligned"/>
		</Variant>

		<Variant title="Slot — item.{key} (custom cell render)">
			<origam-data-table :headers="headers" :items="items" data-cy="column-cell-slot">
				<template #item.commits="{ value }">
					<span :style="{
						display: 'inline-block',
						padding: '2px 8px',
						borderRadius: '999px',
						fontSize: '0.75rem',
						background: value > 100 ? 'var(--origam-color-action-primary-bg)' : 'var(--origam-color-surface-overlay)',
						color: value > 100 ? 'var(--origam-color-action-primary-fg)' : 'var(--origam-color-text-secondary)',
					}">
						{{ value }}
					</span>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Note">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>OrigamDataTableColumnCell</code> is internal to
					<code>OrigamDataTable</code>. Override individual cells
					via the <code>item.{key}</code> slot of the parent table
					(see slot Variant above) instead of using this component
					directly.
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableColumnCell } from '@origam/components'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

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

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableColumnCell.md"/>
