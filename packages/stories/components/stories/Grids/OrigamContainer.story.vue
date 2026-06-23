<template>
	<Story
			group="components"
			title="Grids/OrigamContainer"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IContainerProps>>({})"
		>
			<template #default="{ state }">
				<origam-container
						:border="state.border"
						:border-top="state.borderTop"
						:border-bottom="state.borderBottom"
						:border-left="state.borderLeft"
						:border-right="state.borderRight"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:width="state.width"
						:height="state.height"
						:min-width="state.minWidth"
						:min-height="state.minHeight"
						:max-width="state.maxWidth"
						:max-height="state.maxHeight"
						:padding="state.padding"
						:padding-top="state.paddingTop"
						:padding-bottom="state.paddingBottom"
						:padding-left="state.paddingLeft"
						:padding-right="state.paddingRight"
						:margin="state.margin"
						:margin-top="state.marginTop"
						:margin-bottom="state.marginBottom"
						:margin-left="state.marginLeft"
						:margin-right="state.marginRight"
				>
					<div class="demo-cell">container</div>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"       title="Border"        :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor"  title="Border Color"/>
					<HstSelect v-model="state.borderStyle"  title="Border Style"  :options="BORDER_STYLE_OPTIONS"/>
					<HstText   v-model="state.borderTop"    title="Border Top"/>
					<HstText   v-model="state.borderBottom" title="Border Bottom"/>
					<HstText   v-model="state.borderLeft"   title="Border Left"/>
					<HstText   v-model="state.borderRight"  title="Border Right"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
				</StoryGroup>
				<StoryGroup title="Padding">
					<HstText v-model="state.padding"        title="Padding"/>
					<HstText v-model="state.paddingTop"     title="Padding Top"/>
					<HstText v-model="state.paddingBottom"  title="Padding Bottom"/>
					<HstText v-model="state.paddingLeft"    title="Padding Left"/>
					<HstText v-model="state.paddingRight"   title="Padding Right"/>
				</StoryGroup>
				<StoryGroup title="Margin">
					<HstText v-model="state.margin"        title="Margin"/>
					<HstText v-model="state.marginTop"     title="Margin Top"/>
					<HstText v-model="state.marginBottom"  title="Margin Bottom"/>
					<HstText v-model="state.marginLeft"    title="Margin Left"/>
					<HstText v-model="state.marginRight"   title="Margin Right"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IContainerProps>>({ tag: 'div', fluid: false, fullscreen: false })"
		>
			<template #default="{ state }">
				<origam-container
						:fluid="state.fluid"
						:fullscreen="state.fullscreen"
						:tag="state.tag"
				>
					<div class="demo-cell">container</div>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.fluid"      title="Fluid"/>
					<HstCheckbox v-model="state.fullscreen" title="Fullscreen"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-container>
				<origam-row>
					<origam-col cols="6">
						<div class="demo-cell">A</div>
					</origam-col>
					<origam-col cols="6">
						<div class="demo-cell">B</div>
					</origam-col>
				</origam-row>
			</origam-container>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IContainerProps>({ tag: 'div', fluid: false, fullscreen: false })"
		>
			<template #default="{ state }">
				<origam-container v-bind="state">
					<div class="demo-cell">container</div>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
					<HstText   v-model="state.width"       title="Width"/>
					<HstText   v-model="state.height"      title="Height"/>
					<HstText   v-model="state.padding"     title="Padding"/>
					<HstText   v-model="state.margin"      title="Margin"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.fluid"      title="Fluid"/>
					<HstCheckbox v-model="state.fullscreen" title="Fullscreen"/>
					<HstSelect   v-model="state.tag"        title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import type { IContainerProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'
</script>

<style scoped>
	.demo-cell {
		padding: 12px;
		text-align: center;
	}
</style>

<docs lang="md" src="@docs/components/Grids/OrigamContainer.md"/>
