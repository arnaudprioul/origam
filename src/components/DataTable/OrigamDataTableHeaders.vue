<template>
	<!--
		Pre-fix: `<template v-if="loading">…</template><template v-else>…</template>`
		caused the progress bar to REPLACE the header row entirely — column
		titles vanished while loading, and the user reported "loading is
		misplaced". Vuetify's `<v-data-table loading>` keeps the header
		visible and shows a thin LinearProgress UNDER the header row. We do
		the same: render the columns ALWAYS, then conditionally append the
		progress row below.
	-->
	<template v-if="mobile">
		<slot
				name="mobile"
				v-bind="slotProps"
		>
			<origam-data-table-headers-cell-mobile
					ref="origamDataTableHeadersCellMobileRef"
					:class="dataTableHeadersClasses"
					:columns="columns"
					:style="dataTableHeadersStyles"
					v-bind="dataTableHeadersCellMobileProps"
			/>
		</slot>
	</template>
	<template v-else>
		<slot
				name="default"
				v-bind="slotProps"
		>
			<origam-data-table-headers-cell
					ref="origamDataTableHeadersCellRef"
					:class="dataTableHeadersClasses"
					:headers="headers"
					:style="dataTableHeadersStyles"
					v-bind="dataTableHeadersCellProps"
			/>
		</slot>
	</template>

	<!--
		Mirrors Vuetify's `VDataTableHeaders.tsx` exactly:
		  <tr class="v-data-table-progress">
		    <th :colspan="columns.length">
		      <LoaderSlot active indeterminate />
		    </th>
		  </tr>
		With SCSS:
		  .v-data-table-progress > th { border: none; height: auto;
		                                padding: 0 }
		The progress bar uses its natural ~2–4px height and renders as
		a thin animated indicator between the header titles row and the
		first body row. NO `absolute` positioning — the bar just sits
		in document flow with `padding: 0` on the `<th>` collapsing the
		space around it.
	-->
	<template v-if="loading">
		<tr class="origam-data-table-headers origam-data-table-headers--progress">
			<th
					:colspan="columns.length"
					class="origam-data-table-headers__progress-cell"
			>
				<slot name="loader">
					<origam-progress
							:color="color"
							:type="PROGRESS_TYPE.LINEAR"
							active
							indeterminate
							thickness="2"
					/>
				</slot>
			</th>
		</tr>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableHeadersCell, OrigamDataTableHeadersCellMobile, OrigamProgress } from '../../components'

	import { useDisplay, useHeaders, useHeadersCell, useLoader, useProps, useSelection, useSort } from '../../composables'

	import { PROGRESS_TYPE } from '../../enums'

	import type { IDataTableHeadersProps, IDataTableHeadersSlotProps } from '../../interfaces'
	import type { TOrigamDataTableHeadersCell, TOrigamDataTableHeadersCellMobile } from "../../types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IDataTableHeadersProps>(), {})

	const {filterProps} = useProps<IDataTableHeadersProps>(props)

	const origamDataTableHeadersCellRef = ref<TOrigamDataTableHeadersCell>()
	const origamDataTableHeadersCellMobileRef = ref<TOrigamDataTableHeadersCellMobile>()

	const {toggleSort, sortBy, isSorted} = useSort()
	const {someSelected, allSelected, selectAll} = useSelection()
	const {columns, headers} = useHeaders()
	const {loaderClasses} = useLoader(props)
	const {getSortIcon} = useHeadersCell(props)

	const {displayClasses, mobile} = useDisplay(props)

	const slotProps = computed(() => {
		return {
			headers: headers.value,
			columns: columns.value,
			toggleSort,
			isSorted,
			sortBy: sortBy.value,
			someSelected: someSelected.value,
			allSelected: allSelected.value,
			selectAll,
			getSortIcon
		} satisfies IDataTableHeadersSlotProps
	})

	const dataTableHeadersCellProps = computed(() => {
		return origamDataTableHeadersCellRef.value?.filterProps(props)
	})
	const dataTableHeadersCellMobileProps = computed(() => {
		return origamDataTableHeadersCellMobileRef.value?.filterProps(props)
	})

	// CLASSES & STYLES

	const dataTableHeadersClasses = computed(() => {
		return [
			'origam-data-table-headers',
			{
				'origam-data-table-headers--sticky': props.sticky
			},
			displayClasses.value,
			loaderClasses.value,
			props.class
		]
	})
	const dataTableHeadersStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-data-table-headers {
		// 1:1 mirror of Vuetify's `.v-data-table-progress`:
		//   .v-data-table-progress > th { border: none; height: auto;
		//                                  padding: 0 }
		// The progress bar's own ~2–4px height defines the row height;
		// the `<th>` strips its inherited cell padding so the bar
		// reads as a thin underline of the header titles row.
		&--progress > &__progress-cell {
			border: none;
			height: auto;
			padding: 0;
		}
	}
</style>

