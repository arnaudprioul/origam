<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCell"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersCellProps>>({ color: undefined })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:color="state.color"
						:sort-asc-icon="state.sortAscIcon || undefined"
						:sort-desc-icon="state.sortDescIcon || undefined"
						:multi-sort="state.multiSort"
						:disable-sort="state.disableSort"
						:sticky="state.sticky"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.sortAscIcon"  title="Sort Asc Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.sortDescIcon" title="Sort Desc Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sort">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.sticky" title="Sticky"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersCellProps>>({ disableSort: false, multiSort: false, sticky: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:multi-sort="state.multiSort"
						:disable-sort="state.disableSort"
						:sticky="state.sticky"
						sort-by="commits"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Sort Behaviour">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.sticky" title="Sticky"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersCellProps>>({ color: undefined, multiSort: false, disableSort: false, sticky: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:color="state.color"
						:sort-asc-icon="state.sortAscIcon || undefined"
						:sort-desc-icon="state.sortDescIcon || undefined"
						:multi-sort="state.multiSort"
						:disable-sort="state.disableSort"
						:sticky="state.sticky"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"        title="Color"          :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.sortAscIcon"  title="Sort Asc Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.sortDescIcon" title="Sort Desc Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
					<HstCheckbox v-model="state.sticky"      title="Sticky"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable } from '@origam/components'
	import type { IDataTableHeadersCellProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ICON_OPTIONS
	} from '@stories/const'

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

<docs
		lang="md"
		src="@docs/components/DataTable/OrigamDataTableHeadersCell.md"
/>
