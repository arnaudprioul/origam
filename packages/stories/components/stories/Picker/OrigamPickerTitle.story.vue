<template>
	<Story
			group="components"
			title="Picker/OrigamPickerTitle"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IPickerTitleProps>>({ title: 'Pick a date', color: undefined, bgColor: undefined, tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-picker-title
						:title="state.title"
						:color="state.color"
						:bg-color="state.bgColor"
						:tag="state.tag"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IPickerTitleProps>>({ title: 'Custom title', tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-picker-title
						:title="state.title"
						:tag="state.tag"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-picker-title>
				Custom <strong>rich</strong> content
			</origam-picker-title>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IPickerTitleProps>({ title: 'Pick a date', tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-picker-title v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamPickerTitle } from '@origam/components'
	import type { IPickerTitleProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Picker/OrigamPickerTitle.md"/>
