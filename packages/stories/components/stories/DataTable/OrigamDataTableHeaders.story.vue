<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeaders"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersProps>>({ color: undefined })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:color="state.color"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersProps>>({ multiSort: false, disableSort: false, sticky: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						:multi-sort="state.multiSort"
						:disable-sort="state.disableSort"
						:sticky="state.sticky"
						:loading="state.loading"
						:loading-text="state.loadingText"
						:mobile-breakpoint="state.mobileBreakpoint"
						:sort-asc-icon="state.sortAscIcon || undefined"
						:sort-desc-icon="state.sortDescIcon || undefined"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Sort">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
					<HstSelect   v-model="state.sortAscIcon"  title="Sort Asc Icon"  :options="ICON_OPTIONS"/>
					<HstSelect   v-model="state.sortDescIcon" title="Sort Desc Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.sticky" title="Sticky"/>
					<HstSelect   v-model="state.mobileBreakpoint" title="Mobile Breakpoint" :options="MOBILE_BREAKPOINT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Loading">
					<HstCheckbox v-model="state.loading"     title="Loading"/>
					<HstText     v-model="state.loadingText" title="Loading Text"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-data-table :headers="headers" :items="items">
				<template #default>
					<span>Custom default slot content</span>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slots - Headers">
			<origam-data-table :headers="headers" :items="items" hide-default-header>
				<template #headers>
					<tr>
						<th style="padding: 12px; text-align: start; background: var(--origam-color__action--primary---bg); color: var(--origam-color__action--primary---fg);">Custom team roster</th>
						<th style="padding: 12px; text-align: end; background: var(--origam-color__action--primary---bg); color: var(--origam-color__action--primary---fg);" :colspan="2">{{ items.length }} members</th>
					</tr>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slots - Loader">
			<origam-data-table :headers="headers" :items="items" loading>
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-data-table>
		</Variant>

		<Variant title="Slots - Mobile">
			<div style="max-width: 360px;">
				<origam-data-table :headers="headers" :items="items" mobile>
					<template #mobile>
						<span>Custom mobile header</span>
					</template>
				</origam-data-table>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersProps>>({ multiSort: false })"
		>
			<template #default="{ state }">
				<origam-data-table
						:headers="sortableHeaders"
						:items="items"
						v-bind="state"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
					<HstCheckbox v-model="state.sticky"      title="Sticky"/>
					<HstCheckbox v-model="state.loading"     title="Loading"/>
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
	import { BREAKPOINTS } from '@origam/enums'
	import type { IDataTableHeadersProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ICON_OPTIONS
	} from '@stories/const'

	const MOBILE_BREAKPOINT_OPTIONS = [
		{ label: '(none)',    value: undefined },
		{ label: 'xs (0px)', value: BREAKPOINTS.XS },
		{ label: 'sm',       value: BREAKPOINTS.SM },
		{ label: 'md',       value: BREAKPOINTS.MD },
		{ label: 'lg',       value: BREAKPOINTS.LG },
		{ label: 'xl',       value: BREAKPOINTS.XL },
		{ label: 'xxl',      value: BREAKPOINTS.XXL },
	]

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
