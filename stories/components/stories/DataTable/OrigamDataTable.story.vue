<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTable"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant title="Basic">
			<origam-data-table
					:headers="headers"
					:items="items"
			/>
		</Variant>

		<!-- ════════════ SORTING ════════════ -->
		<Variant
				title="Sorting"
				:init-state="() => useStoryInitState<{ multiSort?: boolean; mustSort?: boolean }>({ multiSort: false, mustSort: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:multi-sort="state.multiSort"
						:must-sort="state.mustSort"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiSort" title="multiSort"/>
				<HstCheckbox v-model="state.mustSort"  title="mustSort"/>
			</template>
		</Variant>

		<!-- ════════════ PAGINATION ════════════ -->
		<Variant
				title="Pagination"
				:init-state="() => useStoryInitState<{ itemsPerPage?: number }>({ itemsPerPage: 5 })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="manyItems"
						:items-per-page="state.itemsPerPage"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.itemsPerPage" title="itemsPerPage" :min="1" :max="20"/>
			</template>
		</Variant>

		<!-- ════════════ SELECTION ════════════ -->
		<Variant title="Selection">
			<origam-data-table
					v-model="selected"
					:headers="headers"
					:items="items"
					show-select
					item-value="id"
			/>
			<div style="margin-top: 8px; font-size: 0.75rem;">
				Selected IDs: {{ selected.join(', ') || 'none' }}
			</div>
		</Variant>

		<!-- ════════════ SEARCH ════════════ -->
		<Variant title="Search">
			<origam-text-field
					v-model="search"
					label="Search"
					clearable
					style="max-width: 320px; margin-bottom: 12px;"
			/>
			<origam-data-table
					:headers="headers"
					:items="items"
					:search="search"
			/>
		</Variant>

		<!-- ════════════ LOADING ════════════ -->
		<Variant
				title="Loading"
				:init-state="() => useStoryInitState<{ loading?: boolean }>({ loading: true })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:loading="state.loading"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.loading" title="loading"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: top ════════════ -->
		<Variant title="Slot — top">
			<origam-data-table
					:headers="headers"
					:items="items"
			>
				<template #top>
					<div style="padding: 12px; font-weight: bold;">User list</div>
				</template>
			</origam-data-table>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					showSelect?: boolean
					multiSort?: boolean
					mustSort?: boolean
					itemsPerPage?: number
					loading?: boolean
					hideDefaultHeader?: boolean
					hideDefaultFooter?: boolean
				}>({
					showSelect: false,
					multiSort: false,
					mustSort: false,
					itemsPerPage: 5,
					loading: false,
					hideDefaultHeader: false,
					hideDefaultFooter: false
				})"
		>
			<template #default="{ state }">
				<origam-data-table
						v-model="selected"
						:headers="sortableHeaders"
						:items="manyItems"
						v-bind="state"
						item-value="id"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showSelect"        title="showSelect"/>
				<HstCheckbox v-model="state.multiSort"         title="multiSort"/>
				<HstCheckbox v-model="state.mustSort"          title="mustSort"/>
				<HstNumber   v-model="state.itemsPerPage"      title="itemsPerPage" :min="1"/>
				<HstCheckbox v-model="state.loading"           title="loading"/>
				<HstCheckbox v-model="state.hideDefaultHeader" title="hideDefaultHeader"/>
				<HstCheckbox v-model="state.hideDefaultFooter" title="hideDefaultFooter"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamDataTable, OrigamTextField } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const selected = ref([])
	const search = ref('')

	const headers = [
		{ title: 'ID',         key: 'id' },
		{ title: 'First name', key: 'firstName' },
		{ title: 'Last name',  key: 'lastName' },
		{ title: 'Age',        key: 'age' },
	]

	const sortableHeaders = headers.map(h => ({ ...h, sortable: true }))

	const items = [
		{ id: 1, firstName: 'Alice',   lastName: 'Dupont',  age: 30 },
		{ id: 2, firstName: 'Bob',     lastName: 'Martin',  age: 25 },
		{ id: 3, firstName: 'Claire',  lastName: 'Bernard', age: 35 },
		{ id: 4, firstName: 'David',   lastName: 'Leroy',   age: 28 },
		{ id: 5, firstName: 'Eve',     lastName: 'Moreau',  age: 22 },
	]

	const manyItems = Array.from({ length: 25 }, (_, i) => ({
		id: i + 1,
		firstName: `First${i + 1}`,
		lastName:  `Last${i + 1}`,
		age:       20 + (i % 30)
	}))
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTable.md"/>
