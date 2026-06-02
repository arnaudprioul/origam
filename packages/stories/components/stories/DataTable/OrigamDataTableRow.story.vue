<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableRow"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<IDesignState>({ mobileBreakpoint: undefined })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="headers"
						:items="items"
						:mobile-breakpoint="state.mobileBreakpoint || undefined"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Responsive">
					<HstSelect v-model="state.mobileBreakpoint" title="Mobile Breakpoint" :options="MOBILE_BREAKPOINT_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<IFunctionalState>({ showSelect: false, showExpand: false, selectStrategy: 'page' })"
		>
			<template #default="{ state }">
				<origam-data-table
						v-model="functionalSelected"
						:headers="headers"
						:items="items"
						:show-select="state.showSelect"
						:show-expand="state.showExpand"
						:select-strategy="state.selectStrategy"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Selection">
					<HstCheckbox v-model="state.showSelect" title="Show Select"/>
					<HstSelect v-model="state.selectStrategy" title="Select Strategy" :options="SELECT_STRATEGY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Expand">
					<HstCheckbox v-model="state.showExpand" title="Show Expand"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - expand">
			<origam-data-table
					:headers="headers"
					:items="items"
					show-expand
					@expand="logEvent('expand', $event)"
			/>
		</Variant>

		<Variant title="Events - select">
			<origam-data-table
					v-model="emitSelected"
					:headers="headers"
					:items="items"
					show-select
					@select="logEvent('select', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - item.data-table-select">
			<origam-data-table :headers="headers" :items="items" show-select>
				<template #item.data-table-select="{ item, isSelected, toggleSelect }">
					<input
							type="checkbox"
							:checked="isSelected([item])"
							:aria-label="`Select row ${item.name}`"
							@change="toggleSelect(item)"
					/>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slots - item.data-table-expand">
			<origam-data-table :headers="headers" :items="items" show-expand>
				<template #item.data-table-expand="{ toggleExpand, isExpanded, item }">
					<button type="button" @click="toggleExpand(item)">
						{{ isExpanded(item) ? 'Collapse' : 'Expand' }}
					</button>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slots - item">
			<origam-data-table :headers="headers" :items="items">
				<template #item="{ item }">
					<tr>
						<td>
							<strong>{{ item.name }}</strong>
							<small>{{ item.role }}</small>
						</td>
						<td>{{ item.team }}</td>
						<td>{{ item.commits }}</td>
					</tr>
				</template>
			</origam-data-table>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IPlaygroundState>({ showSelect: false, showExpand: false, selectStrategy: 'page', mobileBreakpoint: undefined })"
		>
			<template #default="{ state }">
				<origam-data-table
						v-model="playgroundSelected"
						:headers="headers"
						:items="items"
						:show-select="state.showSelect"
						:show-expand="state.showExpand"
						:select-strategy="state.selectStrategy"
						:mobile-breakpoint="state.mobileBreakpoint || undefined"
						@expand="logEvent('expand', $event)"
						@select="logEvent('select', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.mobileBreakpoint" title="Mobile Breakpoint" :options="MOBILE_BREAKPOINT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.showSelect" title="Show Select"/>
					<HstSelect v-model="state.selectStrategy" title="Select Strategy" :options="SELECT_STRATEGY_OPTIONS"/>
					<HstCheckbox v-model="state.showExpand" title="Show Expand"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamDataTable } from '@origam/components'
	import { BREAKPOINTS, DATATABLE_SELECT_STRATEGY } from '@origam/enums'
	import type { IDataTableRowProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import type { IOptions } from '@origam/interfaces'
	import type { TBreakpoint } from '@origam/types'
	import type { TDataTableSelectStrategy } from '@origam/types'

	interface IDesignState {
		mobileBreakpoint?: number | TBreakpoint
	}

	interface IFunctionalState {
		showSelect: boolean
		showExpand: boolean
		selectStrategy: TDataTableSelectStrategy
	}

	interface IPlaygroundState extends IDesignState, IFunctionalState {}

	const MOBILE_BREAKPOINT_OPTIONS: Array<IOptions<TBreakpoint | undefined>> = [
		{ label: '(default)', value: undefined },
		{ label: 'xs', value: BREAKPOINTS.XS },
		{ label: 'sm', value: BREAKPOINTS.SM },
		{ label: 'md', value: BREAKPOINTS.MD },
		{ label: 'lg', value: BREAKPOINTS.LG },
		{ label: 'xl', value: BREAKPOINTS.XL },
		{ label: 'xxl', value: BREAKPOINTS.XXL }
	]

	const SELECT_STRATEGY_OPTIONS: Array<IOptions<TDataTableSelectStrategy>> = [
		{ label: 'Page', value: DATATABLE_SELECT_STRATEGY.PAGE },
		{ label: 'Single', value: DATATABLE_SELECT_STRATEGY.SINGLE },
		{ label: 'All', value: DATATABLE_SELECT_STRATEGY.ALL }
	]

	const headers = [
		{ title: 'Name',    key: 'name' },
		{ title: 'Team',    key: 'team' },
		{ title: 'Commits', key: 'commits', align: 'end' as const }
	]

	const items = [
		{ name: 'Alice', team: 'Frontend', role: 'lead',   commits: 142 },
		{ name: 'Bob',   team: 'Backend',  role: 'senior', commits: 98  },
		{ name: 'Carol', team: 'Design',   role: 'staff',  commits: 31  }
	]

	const functionalSelected = ref<unknown[]>([])
	const emitSelected = ref<unknown[]>([])
	const playgroundSelected = ref<unknown[]>([])
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableRow.md"/>
