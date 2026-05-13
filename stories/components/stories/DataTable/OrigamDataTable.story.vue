<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTable"
	>
		<!--
			Playground — first by convention. All main props wired via
			sidebar controls.
		-->
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

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — headers & items (basic dataset)">
			<origam-data-table
					:headers="headers"
					:items="items"
			/>
		</Variant>

		<Variant
				title="Prop — multiSort & mustSort"
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

		<Variant
				title="Prop — itemsPerPage (pagination)"
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

		<Variant title="Prop — showSelect">
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

		<Variant title="Prop — search">
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

		<Variant
				title="Prop — loading"
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

		<Variant
				title="Prop — loading (all shapes)"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'line',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-data-table
							:headers="headers"
							:items="items"
							:loading="resolveDtLoading(state)"
							data-cy="data-table-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeDtLoading(state) }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.enabled" title="enabled (loading)"/>
				<HstSelect
						v-model="state.kind"
						title="kind"
						:options="[
							{ label: 'true (default)', value: 'bool' },
							{ label: 'number', value: 'number' },
							{ label: '{ type: line }', value: 'line' },
							{ label: '{ type: circular }', value: 'circular' },
							{ label: '{ type: skeleton }', value: 'skeleton' }
						]"
				/>
				<HstNumber v-model="state.progress" title="progress (when kind=number)" :min="0" :max="100" :step="1"/>
				<HstNumber v-model="state.circularSize" title="circular size (when kind=circular)" :min="12" :max="64" :step="2"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						v-bind="state"
						data-cy="data-table-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamDataTable, OrigamTextField } from '@origam/components'
	import type { IColorProps } from '@origam/interfaces'
	import type { TLoadingValue } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveDtLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeDtLoading = (state: ILoadingState): string => {
		const v = resolveDtLoading(state)
		return JSON.stringify(v, null, 2)
	}

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
