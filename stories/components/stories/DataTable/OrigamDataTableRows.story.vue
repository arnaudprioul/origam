<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRows"
	>

		<!--
			<origam-data-table-rows> is the body container — it iterates
			the data items and renders one <origam-data-table-row> each.
			Best previewed inside its parent <origam-data-table>.
		-->

		<Variant title="Default body">
			<origam-data-table :headers="headers" :items="items" data-cy="rows-default"/>
		</Variant>

		<Variant title="Empty state (no items)">
			<origam-data-table
					:headers="headers"
					:items="[]"
					no-data-text="No data — try adjusting your filters."
					data-cy="rows-empty"
			/>
		</Variant>

		<Variant
				title="Pagination"
				:init-state="() => useStoryInitState<{ itemsPerPage: number }>({ itemsPerPage: 3 })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="manyItems"
						:items-per-page="state.itemsPerPage"
						data-cy="rows-paginated"
				/>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.itemsPerPage" title="itemsPerPage" :min="1" :max="20" :step="1"/>
			</template>
		</Variant>

		<Variant title="Slot — body.no-data (custom empty state)">
			<origam-data-table :headers="headers" :items="[]" data-cy="rows-slot-no-data">
				<template #no-data>
					<div style="padding: 32px; text-align: center;">
						<p style="margin: 0 0 8px; font-weight: 600;">No commits yet</p>
						<small style="color: var(--origam-color-text-secondary);">
							The team will appear here as soon as activity rolls in.
						</small>
					</div>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Note">
			<div style="padding: 24px; max-width: 600px; font-size: 0.875rem; line-height: 1.5;">
				<p>
					<code>&lt;origam-data-table-rows&gt;</code> is internal to
					<code>OrigamDataTable</code>. Override the rendering with
					the <code>item</code>, <code>row</code> or
					<code>no-data</code> slots on the parent table instead of
					instantiating this component yourself.
				</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableRows } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const items = [
		{ name: 'Alice', team: 'Frontend', commits: 142 },
		{ name: 'Bob',   team: 'Backend',  commits: 98  },
		{ name: 'Carol', team: 'Design',   commits: 31  },
	]

	const manyItems = Array.from({ length: 12 }, (_, i) => ({
		name:    `User ${i + 1}`,
		team:    ['Frontend', 'Backend', 'Design', 'DevOps'][i % 4],
		commits: Math.round(Math.random() * 200),
	}))
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRows.md"/>
