<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaders"
	>

		<!--
			<origam-data-table-headers> is the header row container. Best
			seen inside its parent <origam-data-table>. The story below
			focuses on what changes in the header row across modes.
		-->

		<Variant title="Default header">
			<origam-data-table :headers="headers" :items="items" data-cy="headers-default"/>
		</Variant>

		<Variant
				title="Sortable headers"
				:init-state="() => useStoryInitState<{ multiSort: boolean }>({ multiSort: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:multi-sort="state.multiSort"
						data-cy="headers-sortable"
				/>
				<p style="padding: 8px; font-size: 0.75rem; color: var(--origam-color-text-secondary);">
					Click a column title to sort. Hold shift to add a secondary sort if multiSort is on.
				</p>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiSort" title="multiSort"/>
			</template>
		</Variant>

		<Variant title="With selection column">
			<origam-data-table
					:headers="headers"
					:items="items"
					show-select
					data-cy="headers-select"
			/>
		</Variant>

		<Variant title="Hide default header (custom slot)">
			<origam-data-table :headers="headers" :items="items" hide-default-header data-cy="headers-hide-default">
				<template #headers>
					<tr style="background: var(--origam-color-action-primary-bg); color: var(--origam-color-action-primary-fg);">
						<th style="padding: 12px; text-align: start;">Custom team roster</th>
						<th style="padding: 12px; text-align: end;" :colspan="2">{{ items.length }} members</th>
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
	import { OrigamDataTable, OrigamDataTableHeaders } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

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

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeaders.md"/>
