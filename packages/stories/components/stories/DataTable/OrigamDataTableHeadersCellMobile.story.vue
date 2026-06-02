<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableHeadersCellMobile"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersCellMobileProps>>({ columns: defaultSortableColumns })"
		>
			<template #default="{ state }">
				<div style="max-width: 360px; padding: 16px;">
					<origam-data-table-headers-cell-mobile
							:color="state.color"
							:sticky="state.sticky"
							:columns="state.columns"
							:colspan="state.colspan"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.sticky"  title="Sticky"/>
					<HstNumber   v-model="state.colspan" title="Colspan" :min="1" :max="10" :step="1"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersCellMobileProps>>({ columns: defaultSortableColumns, multiSort: false, disableSort: false })"
		>
			<template #default="{ state }">
				<div style="max-width: 360px; padding: 16px;">
					<origam-data-table-headers-cell-mobile
							:columns="state.columns"
							:multi-sort="state.multiSort"
							:disable-sort="state.disableSort"
							:sort-asc-icon="state.sortAscIcon || undefined"
							:sort-desc-icon="state.sortDescIcon || undefined"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Sort">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
					<HstSelect   v-model="state.sortAscIcon"  title="Sort Asc Icon"  :options="ICON_OPTIONS"/>
					<HstSelect   v-model="state.sortDescIcon" title="Sort Desc Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - click:append">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile
						:columns="defaultSelectColumns"
						data-cy="mobile-cell-emit-click-append"
						@click:append="logEvent('click:append', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Events - click:prepend">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile
						:columns="defaultSortableColumns"
						data-cy="mobile-cell-emit-click-prepend"
						@click:prepend="logEvent('click:prepend', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Events - click:clear">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile
						:columns="defaultSortableColumns"
						data-cy="mobile-cell-emit-click-clear"
						@click:clear="logEvent('click:clear', $event)"
				/>
			</div>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - chip:append">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #chip:append>
						<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - chip:close">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #chip:close>
						<origam-icon :icon="MDI_ICONS.CLOSE"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - chip:default">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #chip:default>
						<span>Custom chip content</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - chip:filter">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #chip:filter>
						<origam-icon :icon="MDI_ICONS.FILTER"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - chip:prepend">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #chip:prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - clear">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #clear>
						<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.append">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.append>
						<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.appendInner">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.appendInner>
						<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.appendItem">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.appendItem>
						<span>Append item</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.chip">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.chip>
						<origam-chip text="Demo"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.floatingLabel">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.floatingLabel>
						<span>Sort by</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.item">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.item>
						<span>Custom item</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.label">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.label>
						<span>Sort columns</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.loader">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.loader>
						<span>Loading...</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.noData">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.noData>
						<span>No sortable columns</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.prepend">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.prepend>
						<origam-icon :icon="MDI_ICONS.HEART"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.prependInner">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.prependInner>
						<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.prependItem">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.prependItem>
						<span>Prepend item</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.prefix">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.prefix>
						<span>Sort:</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.selection">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.selection>
						<span>Custom selection</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<Variant title="Slots - select.suffix">
			<div style="max-width: 360px; padding: 16px;">
				<origam-data-table-headers-cell-mobile :columns="defaultSortableColumns">
					<template #select.suffix>
						<span>↕</span>
					</template>
				</origam-data-table-headers-cell-mobile>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IDataTableHeadersCellMobileProps>>({ columns: defaultSortableColumns, multiSort: false, disableSort: false })"
		>
			<template #default="{ state }">
				<div style="max-width: 360px; padding: 16px;">
					<origam-data-table-headers-cell-mobile
							v-bind="state"
							@click:append="logEvent('click:append', $event)"
							@click:prepend="logEvent('click:prepend', $event)"
							@click:clear="logEvent('click:clear', $event)"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect   v-model="state.color"   title="Color"   :options="COLOR_OPTIONS"/>
					<HstCheckbox v-model="state.sticky"  title="Sticky"/>
					<HstNumber   v-model="state.colspan" title="Colspan" :min="1" :max="10" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.multiSort"   title="Multi Sort"/>
					<HstCheckbox v-model="state.disableSort" title="Disable Sort"/>
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
	import { logEvent } from 'histoire/client'

	import { OrigamChip, OrigamDataTableHeadersCellMobile, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IDataTableHeadersCellMobileProps, IInternalDataTableHeader } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ICON_OPTIONS
	} from '@stories/const'

	const defaultSortableColumns: Array<IInternalDataTableHeader> = [
		{ key: 'name',    value: 'name',    title: 'Name',    sortable: true  },
		{ key: 'team',    value: 'team',    title: 'Team',    sortable: true  },
		{ key: 'commits', value: 'commits', title: 'Commits', sortable: false }
	]

	const defaultSelectColumns: Array<IInternalDataTableHeader> = [
		{ key: 'data-table-select', value: 'data-table-select', title: 'Select', sortable: false },
		...defaultSortableColumns
	]
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableHeadersCellMobile.md"/>
