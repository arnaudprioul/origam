<template>
	<Story
			group="components"
			title="Toolbar/OrigamToolbar"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IToolbarProps>>({ title: 'My App', bgColor: 'primary', color: 'white' })"
		>
			<template #default="{ state }">
				<origam-toolbar
						:color="state.color"
						:bg-color="state.bgColor"
						:elevation="state.elevation"
						:flat="state.flat"
						:rounded="state.rounded"
						:density="state.density"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:width="state.width"
						:height="state.height"
						:position="state.position"
						:title="state.title"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect   v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstCheckbox v-model="state.flat"      title="Flat"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
				<StoryGroup title="Position">
					<HstSelect v-model="state.position" title="Position" :options="POSITION_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IActiveProps & IBgColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-toolbar
						:bg-color="state.bgColor"
						:hover="resolveHoverState(state.hover)"
						:active="resolveActiveState(state.active)"
						title="Toolbar"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect v-model="state.hover"  title="Hover"  :options="HOVER_OPTIONS"/>
					<HstSelect v-model="state.active" title="Active" :options="ACTIVE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IToolbarProps>>({ title: 'My App' })"
		>
			<template #default="{ state }">
				<origam-toolbar
						:title="state.title"
						:collapse="state.collapse"
						:floating="state.floating"
						:model-value="state.modelValue"
						:tag="state.tag"
						:margin="state.margin"
						:padding="state.padding"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Modifiers">
					<HstCheckbox v-model="state.collapse"   title="Collapse"/>
					<HstCheckbox v-model="state.floating"   title="Floating"/>
					<HstCheckbox v-model="state.modelValue" title="Model Value (visible)"/>
				</StoryGroup>
				<StoryGroup title="Link">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.margin"  title="Margin"/>
					<HstText v-model="state.padding" title="Padding"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-toolbar title="With Default Slot">
				<span>Custom slot content</span>
			</origam-toolbar>
		</Variant>

		<Variant title="Slots - Prepend">
			<origam-toolbar title="With Prepend">
				<template #prepend>
					<origam-btn :icon="menuIcon" aria-label="Navigation menu"/>
				</template>
			</origam-toolbar>
		</Variant>

		<Variant title="Slots - Append">
			<origam-toolbar title="With Append">
				<template #append>
					<origam-btn :icon="accountIcon" aria-label="Account"/>
					<origam-btn :icon="moreIcon"    aria-label="More"/>
				</template>
			</origam-toolbar>
		</Variant>

		<Variant title="Slots - Content">
			<origam-toolbar title="With Content">
				<template #content>
					<span style="flex: 1;"/>
					<origam-btn text="Action" color="primary"/>
				</template>
			</origam-toolbar>
		</Variant>

		<Variant title="Slots - Title">
			<origam-toolbar>
				<template #title>
					<span style="font-style: italic; font-weight: 600;">Custom title</span>
				</template>
			</origam-toolbar>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IToolbarProps>({ title: 'My App', bgColor: 'primary', color: 'white' })"
		>
			<template #default="{ state }">
				<origam-toolbar v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect   v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect   v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
					<HstCheckbox v-model="state.flat"      title="Flat"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.collapse"  title="Collapse"/>
					<HstCheckbox v-model="state.floating"  title="Floating"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamToolbar } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IActiveProps,
		IBgColorProps,
		IHoverProps,
		IToolbarProps
	} from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		resolveActiveState,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		resolveHoverState,
		POSITION_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const menuIcon    = MDI_ICONS.MENU
	const accountIcon = MDI_ICONS.ACCOUNT
	const moreIcon    = MDI_ICONS.DOTS_VERTICAL
</script>

<docs lang="md" src="@docs/components/Toolbar/OrigamToolbar.md"/>
