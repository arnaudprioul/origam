<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRow"
	>

		<!--
			<origam-data-table-row> renders a single body row. The
			realistic flow is via the parent <origam-data-table>, which
			creates one row per item. Stories below preview that.
		-->

		<Variant title="Default (within DataTable)">
			<origam-data-table :headers="headers" :items="items" data-cy="row-default"/>
		</Variant>

		<Variant title="Selectable rows">
			<origam-data-table
					v-model="selectedKeys"
					:headers="headers"
					:items="items"
					show-select
					data-cy="row-selectable"
			/>
			<p style="padding: 8px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
				Selected keys: {{ selectedKeys.length ? selectedKeys.join(', ') : '(none)' }}
			</p>
		</Variant>

		<Variant title="Slot — body.item (custom row render)">
			<origam-data-table :headers="headers" :items="items" data-cy="row-slot">
				<template #item="{ item }">
					<tr style="background: color-mix(in srgb, var(--origam-color-action-primary-bg) 4%, transparent);">
						<td style="padding: 8px;">
							<strong>{{ item.name }}</strong>
							<small style="display: block; color: var(--origam-color-text-secondary);">{{ item.role }}</small>
						</td>
						<td style="padding: 8px;">{{ item.team }}</td>
						<td style="padding: 8px; font-variant-numeric: tabular-nums;">{{ item.commits }}</td>
					</tr>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Note">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>&lt;origam-data-table-row&gt;</code> is rendered by
					<code>&lt;origam-data-table-rows&gt;</code> for each row of
					data — you don't usually instantiate it yourself. Override
					the <code>item</code> slot of <code>&lt;origam-data-table&gt;</code>
					instead (see the slot Variant above).
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamDataTable, OrigamDataTableRow } from '@origam/components'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const items = [
		{ name: 'Alice', team: 'Frontend', role: 'lead',     commits: 142 },
		{ name: 'Bob',   team: 'Backend',  role: 'senior',   commits: 98  },
		{ name: 'Carol', team: 'Design',   role: 'staff',    commits: 31  },
	]

	const selectedKeys = ref<unknown[]>([])
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRow.md"/>
