<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaders"
	>
		<!--
			Playground — shows the header row container via the parent
			table with sortable columns and multiSort toggle.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ multiSort: boolean; showSelect: boolean }>({ multiSort: false, showSelect: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:multi-sort="state.multiSort"
						:show-select="state.showSelect"
						data-cy="headers-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiSort"   title="multiSort"/>
				<HstCheckbox v-model="state.showSelect"  title="showSelect"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — headers (default non-sortable)">
			<origam-data-table :headers="headers" :items="items" data-cy="headers-default"/>
		</Variant>

		<Variant
				title="Prop — multiSort (click column to add secondary sort)"
				:init-state="() => useStoryInitState<{ multiSort: boolean }>({ multiSort: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:multi-sort="state.multiSort"
						data-cy="headers-sortable"
				/>
				<p style="padding: 8px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
					Click a column title to sort. Hold shift to add a secondary sort if multiSort is on.
				</p>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiSort" title="multiSort"/>
			</template>
		</Variant>

		<Variant title="Prop — showSelect (master checkbox in header)">
			<origam-data-table
					:headers="headers"
					:items="items"
					show-select
					data-cy="headers-select"
			/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-data-table :headers="headers" :items="items" data-cy="headers-slot-default">
				<template #default>
					<span>Custom slot content</span>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — headers (fully custom header row, hide default)">
			<origam-data-table :headers="headers" :items="items" hide-default-header data-cy="headers-hide-default">
				<template #headers>
					<tr style="background: var(--origam-color__action--primary---bg); color: var(--origam-color__action--primary---fg);">
						<th style="padding: 12px; text-align: start;">Custom team roster</th>
						<th style="padding: 12px; text-align: end;" :colspan="2">{{ items.length }} members</th>
					</tr>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — loader">
			<origam-data-table :headers="headers" :items="items" loading data-cy="headers-slot-loader">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — mobile">
			<div style="max-width: 360px;">
				<origam-data-table :headers="headers" :items="items" mobile data-cy="headers-slot-mobile">
					<template #mobile>
						<span>Custom mobile header</span>
					</template>
				</origam-data-table>
			</div>
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

	const sortableHeaders = headers.map((h) => ({ ...h, sortable: true }))

	const items = [
		{ name: 'Alice', team: 'Frontend', commits: 142 },
		{ name: 'Bob',   team: 'Backend',  commits: 98  },
		{ name: 'Carol', team: 'Design',   commits: 31  },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeaders.md"/>
