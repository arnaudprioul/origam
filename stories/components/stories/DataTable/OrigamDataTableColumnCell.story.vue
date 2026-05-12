<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableColumnCell"
	>
		<!--
			Playground — demonstrates the single body cell through the
			parent table. OrigamDataTableColumnCell is internal; use the
			parent table slots to customise cells.
		-->
		<Variant title="Playground">
			<origam-data-table :headers="headers" :items="items" data-cy="column-cell-default"/>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — align (start / center / end)">
			<!--
				Column-level align is defined on the header object.
				start = left-aligned, center = centred, end = right-aligned.
			-->
			<origam-data-table :headers="alignedHeaders" :items="items" data-cy="column-cell-aligned"/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — item.{key} (custom cell render)">
			<!--
				Use the item.{key} slot of the parent table to override how
				a cell's value is rendered — here `commits` is shown as a
				colour-coded pill.
			-->
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
