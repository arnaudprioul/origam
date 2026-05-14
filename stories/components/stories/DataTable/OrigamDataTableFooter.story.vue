<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableFooter"
	>
		<!--
			Playground — shows the footer pagination bar via the parent
			table. OrigamDataTableFooter is internal; control it through
			the parent table's props and the `footer` slot.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ itemsPerPage: number }>({ itemsPerPage: 5 })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:items-per-page="state.itemsPerPage"
						:items-per-page-options="[
							{ value: 3,  title: '3' },
							{ value: 5,  title: '5' },
							{ value: 10, title: '10' },
							{ value: -1, title: 'All' },
						]"
						data-cy="footer-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.itemsPerPage" title="itemsPerPage" :min="1" :max="20" :step="1"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — itemsPerPage (default = 3)">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="3"
					data-cy="footer-default"
			/>
		</Variant>

		<Variant title="Prop — itemsPerPageOptions (custom choices)">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="5"
					:items-per-page-options="[
						{ value: 3,  title: '3' },
						{ value: 5,  title: '5' },
						{ value: 10, title: '10' },
						{ value: -1, title: 'All' },
					]"
					data-cy="footer-itemsperpage"
			/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="3"
					data-cy="footer-slot-append"
			>
				<template #bottom>
					<origam-data-table-footer>
						<template #append>
							<span style="font-size: 0.75rem; opacity: 0.7;">Custom slot content</span>
						</template>
					</origam-data-table-footer>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — footer (custom footer, hide default)">
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
							<td colspan="3" style="padding: 12px; text-align: end; background: var(--origam-color__surface---overlay);">
								<small>Custom footer — {{ items.length }} total entries</small>
							</td>
						</tr>
					</tfoot>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="3"
					data-cy="footer-slot-prepend"
			>
				<template #bottom>
					<origam-data-table-footer>
						<template #prepend>
							<span style="font-size: 0.75rem; opacity: 0.7;">Custom slot content</span>
						</template>
					</origam-data-table-footer>
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
		commits: 20 + (i * 13 % 180),
	}))
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableFooter.md"/>
