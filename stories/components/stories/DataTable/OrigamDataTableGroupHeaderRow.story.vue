<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableGroupHeaderRow"
	>

		<!--
			<origam-data-table-group-header-row> is the collapsable group
			separator inserted when the table groups items by a column.
			Best previewed via the parent table with `group-by`.
		-->

		<Variant title="Group by — single column">
			<origam-data-table
					:headers="headers"
					:items="items"
					:group-by="[{ key: 'team', order: 'asc' }]"
					data-cy="group-header-default"
			/>
		</Variant>

		<Variant title="Group by — multiple columns (nested)">
			<origam-data-table
					:headers="extendedHeaders"
					:items="extendedItems"
					:group-by="[{ key: 'team', order: 'asc' }, { key: 'role', order: 'asc' }]"
					data-cy="group-header-nested"
			/>
		</Variant>

		<Variant title="Slot — group.header (custom group row render)">
			<origam-data-table
					:headers="headers"
					:items="items"
					:group-by="[{ key: 'team', order: 'asc' }]"
					data-cy="group-header-slot"
			>
				<template #group-header="{ group, items: groupItems, isOpen, toggleGroup }">
					<tr @click="toggleGroup(group)" style="cursor: pointer; background: var(--origam-color-surface-overlay);">
						<td colspan="3" style="padding: 8px 12px;">
							<strong>{{ group }}</strong>
							<small style="margin-inline-start: 8px; color: var(--origam-color-text-secondary);">
								{{ groupItems.length }} member(s) — {{ isOpen ? '▼' : '▶' }}
							</small>
						</td>
					</tr>
				</template>
			</origam-data-table>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableGroupHeaderRow } from '@origam/components'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const extendedHeaders = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Role',    key: 'role'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const items = [
		{ name: 'Alice',   team: 'Frontend', commits: 142 },
		{ name: 'Bob',     team: 'Backend',  commits: 98  },
		{ name: 'Carol',   team: 'Design',   commits: 31  },
		{ name: 'Dan',     team: 'Frontend', commits: 87  },
		{ name: 'Eve',     team: 'Backend',  commits: 64  },
	]

	const extendedItems = items.map((it) => ({
		...it,
		role: ['lead', 'staff', 'senior', 'lead', 'senior'][items.indexOf(it)] ?? 'staff',
	}))
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableGroupHeaderRow.md"/>
