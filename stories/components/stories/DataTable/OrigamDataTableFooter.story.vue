<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableFooter"
	>

		<!--
			<origam-data-table-footer> is the bottom bar of the table. It
			usually shows the pagination controls and the rows-per-page
			selector. The realistic preview is via the parent table.
		-->

		<Variant title="Default footer (with pagination)">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="3"
					data-cy="footer-default"
			/>
		</Variant>

		<Variant
				title="Items-per-page choices"
				:init-state="() => useStoryInitState<{ itemsPerPage: number }>({ itemsPerPage: 5 })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:items-per-page="state.itemsPerPage"
						:items-per-page-options="[
							{ value: 3, title: '3' },
							{ value: 5, title: '5' },
							{ value: 10, title: '10' },
							{ value: -1, title: 'All' },
						]"
						data-cy="footer-itemsperpage"
				/>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.itemsPerPage" title="itemsPerPage" :min="1" :max="20" :step="1"/>
			</template>
		</Variant>

		<Variant title="Hide default footer (use custom slot)">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="3"
					hide-default-footer
					data-cy="footer-hide-default"
			>
				<template #footer>
					<tfoot>
						<tr>
							<td colspan="3" style="padding: 12px; text-align: end; background: var(--origam-color-surface-overlay);">
								<small>Custom footer — {{ items.length }} total entries</small>
							</td>
						</tr>
					</tfoot>
				</template>
			</origam-data-table>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableFooter } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits', align: 'end' },
	]

	const items = Array.from({ length: 12 }, (_, i) => ({
		name:    `User ${i + 1}`,
		team:    ['Frontend', 'Backend', 'Design', 'DevOps'][i % 4],
		commits: Math.round(Math.random() * 200),
	}))
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableFooter.md"/>
