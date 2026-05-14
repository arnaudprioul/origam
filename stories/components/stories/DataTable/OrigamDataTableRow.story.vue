<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRow"
	>
		<!--
			Playground — a single body row rendered via the parent table.
			OrigamDataTableRow is internal; use the `item` slot on
			OrigamDataTable for custom row rendering.
		-->
		<Variant title="Playground">
			<origam-data-table :headers="headers" :items="items" data-cy="row-default"/>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — showSelect (selectable rows)">
			<origam-data-table
					v-model="selectedKeys"
					:headers="headers"
					:items="items"
					show-select
					data-cy="row-selectable"
			/>
			<p style="padding: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
				Selected keys: {{ selectedKeys.length ? selectedKeys.join(', ') : '(none)' }}
			</p>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — item.data-table-expand">
			<origam-data-table :headers="headers" :items="items" show-expand data-cy="row-slot-expand">
				<template #item.data-table-expand="{ toggleExpand, isExpanded, item }">
					<button @click="toggleExpand(item)">{{ isExpanded(item) ? 'Collapse' : 'Expand' }}</button>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — item.data-table-select">
			<origam-data-table :headers="headers" :items="items" show-select data-cy="row-slot-select">
				<template #item.data-table-select="{ item, isSelected, toggleSelect }">
					<input type="checkbox" :checked="isSelected([item])" @change="toggleSelect(item)"/>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — item (custom row render)">
			<!--
				The `item` scoped slot on the parent table gives full
				control over the `<tr>` markup for every data row.
			-->
			<origam-data-table :headers="headers" :items="items" data-cy="row-slot">
				<template #item="{ item }">
					<tr style="background: color-mix(in srgb, var(--origam-color__action--primary---bg) 4%, transparent);">
						<td style="padding: 8px;">
							<strong>{{ item.name }}</strong>
							<small style="display: block; color: var(--origam-color__text---secondary);">{{ item.role }}</small>
						</td>
						<td style="padding: 8px;">{{ item.team }}</td>
						<td style="padding: 8px; font-variant-numeric: tabular-nums;">{{ item.commits }}</td>
					</tr>
				</template>
			</origam-data-table>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — expand">
			<origam-data-table
					:headers="headers"
					:items="items"
					show-expand
					data-cy="row-emit-expand"
					@expand="logEvent('expand', $event)"
			/>
		</Variant>

		<Variant title="Emit — select">
			<origam-data-table
					v-model="selectedKeys"
					:headers="headers"
					:items="items"
					show-select
					data-cy="row-emit-select"
					@select="logEvent('select', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamDataTable } from '@origam/components'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const items = [
		{ name: 'Alice', team: 'Frontend', role: 'lead',   commits: 142 },
		{ name: 'Bob',   team: 'Backend',  role: 'senior', commits: 98  },
		{ name: 'Carol', team: 'Design',   role: 'staff',  commits: 31  },
	]

	const selectedKeys = ref<unknown[]>([])
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRow.md"/>
