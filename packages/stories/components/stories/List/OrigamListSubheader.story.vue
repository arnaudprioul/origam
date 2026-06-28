<template>
	<Story
			group="components"
			title="List/OrigamListSubheader"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IListSubheader>>({ title: 'Subheader', color: undefined, bgColor: undefined, rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-subheader
							:color="state.color"
							:bg-color="state.bgColor"
							:rounded="state.rounded"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:padding="state.padding"
							:padding-inline="state.paddingInline"
							:margin="state.margin"
							:tag="state.tag"
							:font-size="state.fontSize"
							:font-weight="state.fontWeight"
							:line-height="state.lineHeight"
							:title="state.title"
					/>
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
					<origam-list-item title="Item three"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontSize"   title="Font Size"    :options="FONT_SIZE_OPTIONS"/>
					<HstSelect v-model="state.fontWeight" title="Font Weight"  :options="FONT_WEIGHT_OPTIONS"/>
					<HstSelect v-model="state.lineHeight" title="Line Height"  :options="LINE_HEIGHT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding"       title="Padding"/>
					<HstText v-model="state.paddingInline" title="Padding Inline"/>
					<HstText v-model="state.margin"        title="Margin"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IListSubheader>>({ title: 'Subheader', inset: false, sticky: false })"
		>
			<template #default="{ state }">
				<origam-list style="max-height: 200px; overflow-y: auto;">
					<origam-list-subheader
							:title="state.title"
							:inset="state.inset"
							:sticky="state.sticky"
					/>
					<origam-list-item v-for="n in 8" :key="n" :title="`Item ${n}`"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.inset"  title="Inset"/>
					<HstCheckbox v-model="state.sticky" title="Sticky"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-list>
				<origam-list-subheader>
					<template #default>
						<strong style="letter-spacing: 0.1em; text-transform: uppercase;">Custom Slot Title</strong>
					</template>
				</origam-list-subheader>
				<origam-list-item title="Item one"/>
				<origam-list-item title="Item two"/>
			</origam-list>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IListSubheader>({ title: 'Subheader', inset: false, sticky: false })"
		>
			<template #default="{ state }">
				<origam-list style="max-height: 200px; overflow-y: auto;">
					<origam-list-subheader v-bind="state"/>
					<origam-list-item v-for="n in 6" :key="n" :title="`Item ${n}`"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded" title="Rounded"  :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.border"  title="Border"   :options="BORDER_OPTIONS"/>
					<HstSelect v-model="state.tag"     title="Tag"      :options="TAG_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.inset"  title="Inset"/>
					<HstCheckbox v-model="state.sticky" title="Sticky"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamList, OrigamListItem, OrigamListSubheader } from '@origam/components'
	import type { IListSubheader } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		FONT_SIZE_OPTIONS,
		FONT_WEIGHT_OPTIONS,
		LINE_HEIGHT_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'
</script>
