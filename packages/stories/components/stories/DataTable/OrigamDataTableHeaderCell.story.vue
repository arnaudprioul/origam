<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaderCell"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDataTableHeaderCellProps>>({ color: undefined })"
		>
			<template #default="{ state }">
				<origam-data-table
						:color="state.color"
						:headers="sortableHeaders"
						:items="items"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDataTableHeaderCellProps>>({ disableSort: false, multiSort: false, sticky: false, sortAscIcon: MDI_ICONS.ARROW_UP, sortDescIcon: MDI_ICONS.ARROW_DOWN })"
		>
			<template #default="{ state }">
				<origam-data-table
						:disable-sort="state.disableSort"
						:multi-sort="state.multiSort"
						:sticky="state.sticky"
						:sort-asc-icon="state.sortAscIcon"
						:sort-desc-icon="state.sortDescIcon"
						:headers="sortableHeaders"
						:items="items"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Sort">
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.sticky" title="Sticky"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.sortAscIcon"  title="Sort Asc Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.sortDescIcon" title="Sort Desc Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Header">
			<origam-data-table :headers="headers" :items="items">
				<template #header.commits>
					<span>
						<origam-icon :icon="MDI_ICONS.STAR" :size="12"/>
						<strong>Total commits</strong>
					</span>
				</template>
			</origam-data-table>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IDataTableHeaderCellProps>>({ color: undefined, disableSort: false, multiSort: false, sticky: false, sortAscIcon: MDI_ICONS.ARROW_UP, sortDescIcon: MDI_ICONS.ARROW_DOWN })"
		>
			<template #default="{ state }">
				<origam-data-table
						:color="state.color"
						:disable-sort="state.disableSort"
						:multi-sort="state.multiSort"
						:sticky="state.sticky"
						:sort-asc-icon="state.sortAscIcon"
						:sort-desc-icon="state.sortDescIcon"
						:headers="sortableHeaders"
						:items="items"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.sticky"      title="Sticky"/>
					<HstSelect   v-model="state.sortAscIcon"  title="Sort Asc Icon"  :options="ICON_OPTIONS"/>
					<HstSelect   v-model="state.sortDescIcon" title="Sort Desc Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IDataTableHeaderCellProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ICON_OPTIONS
	} from '@stories/const'

	const headers = [
		{ title: 'Name',    key: 'name'    },
		{ title: 'Team',    key: 'team'    },
		{ title: 'Commits', key: 'commits' },
	]

	const sortableHeaders = headers.map((h) => ({ ...h, sortable: true }))

	const items = [
		{ name: 'Alice', team: 'Frontend', commits: 142 },
		{ name: 'Bob',   team: 'Backend',  commits: 98  },
		{ name: 'Carol', team: 'Design',   commits: 31  },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeaderCell.md"/>
