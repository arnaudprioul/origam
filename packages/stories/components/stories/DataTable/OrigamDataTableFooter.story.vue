<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableFooter"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDataTableFooterProps>>({ color: undefined })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:items-per-page="5"
						:items-per-page-options="defaultOptions"
				>
					<template #bottom>
						<origam-data-table-footer
								:color="state.color"
								:align="state.align"
								:padding="state.padding"
								:padding-top="state.paddingTop"
								:padding-bottom="state.paddingBottom"
								:padding-left="state.paddingLeft"
								:padding-right="state.paddingRight"
								:padding-block="state.paddingBlock"
								:padding-inline="state.paddingInline"
								:prev-icon="state.prevIcon || undefined"
								:next-icon="state.nextIcon || undefined"
								:first-icon="state.firstIcon || undefined"
								:last-icon="state.lastIcon || undefined"
								:items-per-page-options="defaultOptions"
						/>
					</template>
				</origam-data-table>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Align">
					<HstSelect v-model="state.align" title="Align" :options="ALIGN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding"       title="Padding"/>
					<HstText v-model="state.paddingBlock"  title="Padding Block"/>
					<HstText v-model="state.paddingInline" title="Padding Inline"/>
					<HstText v-model="state.paddingTop"    title="Padding Top"/>
					<HstText v-model="state.paddingBottom" title="Padding Bottom"/>
					<HstText v-model="state.paddingLeft"   title="Padding Left"/>
					<HstText v-model="state.paddingRight"  title="Padding Right"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prevIcon"  title="Prev Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.nextIcon"  title="Next Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.firstIcon" title="First Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.lastIcon"  title="Last Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDataTableFooterProps>>({ showCurrentPage: true, itemsPerPageText: 'origam.dataFooter.itemsPerPageText', pageText: 'origam.dataFooter.pageText' })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:items-per-page="5"
						:items-per-page-options="defaultOptions"
				>
					<template #bottom>
						<origam-data-table-footer
								:show-current-page="state.showCurrentPage"
								:items-per-page-text="state.itemsPerPageText"
								:page-text="state.pageText"
								:first-page-label="state.firstPageLabel"
								:prev-page-label="state.prevPageLabel"
								:next-page-label="state.nextPageLabel"
								:last-page-label="state.lastPageLabel"
								:items-per-page-options="defaultOptions"
						/>
					</template>
				</origam-data-table>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Pagination">
					<HstCheckbox v-model="state.showCurrentPage" title="Show Current Page"/>
				</StoryGroup>
				<StoryGroup title="Labels">
					<HstText v-model="state.itemsPerPageText" title="Items Per Page Text"/>
					<HstText v-model="state.pageText"         title="Page Text"/>
					<HstText v-model="state.firstPageLabel"   title="First Page Label"/>
					<HstText v-model="state.prevPageLabel"    title="Prev Page Label"/>
					<HstText v-model="state.nextPageLabel"    title="Next Page Label"/>
					<HstText v-model="state.lastPageLabel"    title="Last Page Label"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Prepend">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="5"
					:items-per-page-options="defaultOptions"
			>
				<template #bottom>
					<origam-data-table-footer :items-per-page-options="defaultOptions">
						<template #prepend>
							<span style="font-size: 0.75rem; padding-inline: 8px;">Custom prepend slot</span>
						</template>
					</origam-data-table-footer>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slots - Append">
			<origam-data-table
					:headers="headers"
					:items="items"
					:items-per-page="5"
					:items-per-page-options="defaultOptions"
			>
				<template #bottom>
					<origam-data-table-footer :items-per-page-options="defaultOptions">
						<template #append>
							<span style="font-size: 0.75rem; padding-inline: 8px;">Custom append slot</span>
						</template>
					</origam-data-table-footer>
				</template>
			</origam-data-table>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IDataTableFooterProps>>({ showCurrentPage: true })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:items-per-page="5"
						:items-per-page-options="defaultOptions"
				>
					<template #bottom>
						<origam-data-table-footer v-bind="state" :items-per-page-options="defaultOptions"/>
					</template>
				</origam-data-table>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"  title="Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.align"  title="Align"  :options="ALIGN_OPTIONS"/>
					<HstText   v-model="state.padding" title="Padding"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prevIcon"  title="Prev Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.nextIcon"  title="Next Icon"  :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.firstIcon" title="First Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.lastIcon"  title="Last Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.showCurrentPage"  title="Show Current Page"/>
					<HstText     v-model="state.itemsPerPageText" title="Items Per Page Text"/>
					<HstText     v-model="state.pageText"         title="Page Text"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTable, OrigamDataTableFooter } from '@origam/components'
	import type { IDataTableFooterProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ALIGN_OPTIONS,
		COLOR_OPTIONS,
		ICON_OPTIONS
	} from '@stories/const'

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

	const defaultOptions = [
		{ value: 3,  title: '3' },
		{ value: 5,  title: '5' },
		{ value: 10, title: '10' },
		{ value: -1, title: 'All' },
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableFooter.md"/>
