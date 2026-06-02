<template>
	<Story
			group="components"
			title="DataTable/OrigamDataTableColumnCell"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDataTableColumnProps>>({ align: ALIGN.START, tag: 'td' })"
		>
			<template #default="{ state }">
				<table>
					<tbody>
						<tr>
							<origam-data-table-column-cell
									:align="state.align"
									:tag="state.tag"
									:width="state.width"
									:height="state.height"
									:max-width="state.maxWidth"
									:max-height="state.maxHeight"
									:min-width="state.minWidth"
									:min-height="state.minHeight"
									:padding="state.padding"
									:padding-top="state.paddingTop"
									:padding-bottom="state.paddingBottom"
									:padding-left="state.paddingLeft"
									:padding-right="state.paddingRight"
									:padding-block="state.paddingBlock"
									:padding-inline="state.paddingInline"
							>
								Cell content
							</origam-data-table-column-cell>
						</tr>
					</tbody>
				</table>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Align">
					<HstSelect v-model="state.align" title="Align" :options="ALIGN_COLUMN_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding"       title="Padding"/>
					<HstText v-model="state.paddingTop"    title="Padding Top"/>
					<HstText v-model="state.paddingBottom" title="Padding Bottom"/>
					<HstText v-model="state.paddingLeft"   title="Padding Left"/>
					<HstText v-model="state.paddingRight"  title="Padding Right"/>
					<HstText v-model="state.paddingBlock"  title="Padding Block"/>
					<HstText v-model="state.paddingInline" title="Padding Inline"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IDataTableColumnProps>>({ tag: 'td', fixed: false, lastFixed: false, nowrap: false })"
		>
			<template #default="{ state }">
				<table style="width: 400px; border-collapse: collapse;">
					<tbody>
						<tr>
							<origam-data-table-column-cell
									:tag="state.tag"
									:fixed="state.fixed"
									:fixed-offset="state.fixedOffset || undefined"
									:last-fixed="state.lastFixed"
									:nowrap="state.nowrap"
							>
								Cell with functional props
							</origam-data-table-column-cell>
						</tr>
					</tbody>
				</table>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Fixed">
					<HstCheckbox v-model="state.fixed"     title="Fixed"/>
					<HstText     v-model="state.fixedOffset" title="Fixed Offset"/>
					<HstCheckbox v-model="state.lastFixed" title="Last Fixed"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.nowrap" title="No Wrap"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<table>
				<tbody>
					<tr>
						<origam-data-table-column-cell tag="td">
							<strong>Custom</strong> cell content
						</origam-data-table-column-cell>
					</tr>
				</tbody>
			</table>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDataTableColumnProps>({ align: ALIGN.START, tag: 'td' })"
		>
			<template #default="{ state }">
				<table>
					<tbody>
						<tr>
							<origam-data-table-column-cell v-bind="state">
								Cell content
							</origam-data-table-column-cell>
						</tr>
					</tbody>
				</table>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.align" title="Align" :options="ALIGN_COLUMN_OPTIONS"/>
					<HstText   v-model="state.width"  title="Width"/>
					<HstText   v-model="state.height" title="Height"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect   v-model="state.tag"       title="Tag"         :options="TAG_OPTIONS"/>
					<HstCheckbox v-model="state.fixed"     title="Fixed"/>
					<HstCheckbox v-model="state.lastFixed" title="Last Fixed"/>
					<HstCheckbox v-model="state.nowrap"    title="No Wrap"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ALIGN } from '@origam/enums'
	import { OrigamDataTableColumnCell } from '@origam/components'
	import type { IDataTableColumnProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { ALIGN_OPTIONS, TAG_OPTIONS } from '@stories/const'

	const ALIGN_COLUMN_OPTIONS = ALIGN_OPTIONS.filter(
		(o) => o.value === undefined || o.value === ALIGN.START || o.value === ALIGN.END || o.value === ALIGN.CENTER
	)
</script>

<docs lang="md" src="@docs/components/DataTable/OrigamDataTableColumnCell.md"/>
