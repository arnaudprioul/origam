<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRows"
	>
		<!--
			Playground — the body container with pagination. Internal
			component; override via `item`, `row` or `no-data` slots on
			the parent table.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ itemsPerPage: number }>({ itemsPerPage: 3 })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="manyItems"
						:items-per-page="state.itemsPerPage"
						data-cy="rows-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.itemsPerPage" title="itemsPerPage" :min="1" :max="20" :step="1"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — items (basic body render)">
			<origam-data-table :headers="headers" :items="items" data-cy="rows-default"/>
		</Variant>

		<Variant title="Prop — items empty (no-data state)">
			<origam-data-table
					:headers="headers"
					:items="[]"
					no-data-text="No data — try adjusting your filters."
					data-cy="rows-empty"
			/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — no-data (custom empty state)">
			<origam-data-table :headers="headers" :items="[]" data-cy="rows-slot-no-data">
				<template #no-data>
					<div style="padding: 32px; text-align: center;">
						<p style="margin: 0 0 8px; font-weight: 600;">No commits yet</p>
						<small style="color: var(--origam-color__text---secondary);">
							The team will appear here as soon as activity rolls in.
						</small>
					</div>
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
		commits: 10 + (i * 17 % 190),
	}))
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRows.md"/>
