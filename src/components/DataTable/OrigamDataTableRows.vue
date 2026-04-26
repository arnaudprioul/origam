<template>
	<template v-if="loading">
		<tr
				key="loading"
				class="origam-data-table-rows origam-data-table-rows--loading"
		>
			<td :colspan="columns.length">
				<slot name="loading">
					{{ t(loadingText) }}
				</slot>
			</td>
		</tr>
	</template>

	<template v-else-if="!(items && items.length) && !hideNoData">
		<tr
				key="no-data"
				class="origam-data-table-rows origam-data-table-rows--no-data"
		>
			<td :colspan="columns.length">
				<slot name="no-data">
					{{ t(noDataText) }}
				</slot>
			</td>
		</tr>
	</template>

	<template v-else>
		<template v-for="(item, index) in items">
			<template v-if="item.type === 'group'">
				<slot
						name="group-header"
						v-bind="groupHeaderSlotProps(item, index)"
				>
					<origam-data-table-group-header-row
							:key="`group-header_${item.id}`"
							v-bind="groupHeaderSlotProps(item, index)"
					>
						<!-- TODO SLOT BODY-->
					</origam-data-table-group-header-row>
				</slot>
			</template>

			<template v-else>
				<slot
						name="item"
						v-bind="itemSlotProps(item, index)"
				>
					<origam-data-table-row
							:item="item"
							v-bind="{...itemSlotProps(item, index).props}"
					>
						<!-- TODO SLOT BODY-->
					</origam-data-table-row>
				</slot>

				<template v-if="isExpanded(item)">
					<slot
							name="expanded-row"
							v-bind="slotProps"
					/>
				</template>
			</template>
		</template>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataTableGroupHeaderRow, OrigamDataTableRow } from '../../components'

	import { useDisplay, useExpanded, useGroupBy, useHeaders, useLocale, useProps, useSelection } from '../../composables'

	import type {
		IDataTableGroup,
		IDataTableGroupHeaderSlot,
		IDataTableItemBaseSlot,
		IDataTableItemSlot,
		IDataTableRowsProps
	} from '../../interfaces'

	import { getPrefixedEventHandlers } from '../../utils'

	import { mergeProps, useAttrs } from 'vue'

	const attrs = useAttrs()

	const props = withDefaults(defineProps<IDataTableRowsProps>(), {
		loadingText: 'origam.dataIterator.loadingText',
		noDataText: 'origam.noDataText'
	})

	const {filterProps} = useProps<IDataTableRowsProps>(props)

	const {t} = useLocale()

	const {columns} = useHeaders()
	const {expandOnClick, toggleExpand, isExpanded} = useExpanded()
	const {isSelected, toggleSelect} = useSelection()
	const {toggleGroup, isGroupOpen} = useGroupBy()
	const {mobile} = useDisplay(props)

	const slotProps = (item: any, index: number): IDataTableItemBaseSlot => {
		return {
			index,
			item: item.raw,
			internalItem: item,
			columns: columns.value,
			isExpanded,
			toggleExpand,
			isSelected,
			toggleSelect
		}
	}
	const groupHeaderSlotProps = (item: IDataTableGroup, index: number): IDataTableGroupHeaderSlot => {
		const slotPropsLocal = slotProps(item, index)

		return Object.assign({}, slotPropsLocal, {
			index,
			item,
			columns: columns.value,
			...getPrefixedEventHandlers(attrs, ':group-header', () => slotPropsLocal),
			isExpanded,
			toggleExpand,
			isSelected,
			toggleSelect,
			toggleGroup,
			isGroupOpen
		})
	}
	const itemSlotProps = (item: any, index: number): IDataTableItemSlot => {
		const slotPropsLocal = slotProps(item, index)

		return Object.assign({}, slotPropsLocal, {
			props: mergeProps(
					{
						key: `item_${item.key ?? item.index}`,
						onClick: expandOnClick.value ? () => {
							toggleExpand(item)
						} : undefined,
						index,
						item,
						cellProps: props.cellProps,
						mobile: mobile.value
					},
					getPrefixedEventHandlers(attrs, ':row', () => slotPropsLocal),
					typeof props.rowProps === 'function'
							? props.rowProps({
								item: slotPropsLocal.item,
								index: slotPropsLocal.index,
								internalItem: slotPropsLocal.internalItem
							})
							: props.rowProps
			)
		})
	}

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-data-table-rows {
		&--no-data {
			text-align: var(--origam-data-table-empty---text-align, center);
			color: var(--origam-data-table-rows--no-data---color, var(--origam-color-text-secondary));
		}

		&--loading {
			color: var(--origam-data-table-rows--loading---color, var(--origam-color-text-secondary));
		}
	}
</style>

