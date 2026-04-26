<template>
	<template v-if="loading">
		<tr class="origam-data-table-headers origam-data-table-headers--progress">
			<th
					:colspan="columns.length"
					class="origam-data-table-header-cell"
			>
				<slot name="loader">
					<origam-progress
							:color="color"
							:type="PROGRESS_TYPE.LINEAR"
							absolute
							active
							indeterminate
							thickness="4"
					/>
				</slot>
			</th>
		</tr>
	</template>
	<template v-else>
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
		&__progress {
			> .origam-data-table-headers-cell {
				border: none;
				height: auto;
				padding: 0;
			}

			&:deep(.origam-progress) {
				position: relative;
			}
		}
	}
</style>

