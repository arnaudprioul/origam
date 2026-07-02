<template>
	<Story
			group="components"
			title="Progress/OrigamProgressCircular"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IProgressCircularProps> & IBgColorProps>({
					color: 'primary',
					bgColor: undefined,
					size: 'large',
					modelValue: 60,
					max: 100,
					thickness: 4,
					rotate: 0,
				})"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:model-value="state.modelValue"
						:max="state.max"
						:thickness="state.thickness"
						:rotate="state.rotate"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size" title="Size" :options="SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstNumber v-model="state.thickness" title="Thickness" :min="1" :max="20" :step="1"/>
					<HstNumber v-model="state.rotate"    title="Rotate (deg)" :min="-360" :max="360" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstNumber v-model="state.modelValue" title="Value"  :min="0" :max="100" :step="1"/>
					<HstNumber v-model="state.max"        title="Max"    :min="1" :max="1000" :step="1"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IProgressCircularProps>>({
					indeterminate: false,
					active: true,
					absolute: false,
					striped: false,
					modelValue: 42,
					max: 100,
					tag: 'div',
				})"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:indeterminate="state.indeterminate"
						:active="state.active"
						:absolute="state.absolute"
						:striped="state.striped"
						:model-value="state.modelValue"
						:max="state.max"
						:tag="state.tag"
						color="primary"
						size="large"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstCheckbox v-model="state.active"        title="Active"/>
					<HstCheckbox v-model="state.absolute"      title="Absolute"/>
					<HstCheckbox v-model="state.striped"       title="Striped"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstNumber v-model="state.modelValue" title="Value" :min="0" :max="100" :step="1"/>
					<HstNumber v-model="state.max"        title="Max"   :min="1" :max="1000" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-progress-circular
					:model-value="73"
					size="x-large"
					color="primary"
			>
				<template #default="{ value }">
					<strong>{{ Math.round(Number(value)) }}%</strong>
				</template>
			</origam-progress-circular>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IProgressCircularProps> & IBgColorProps>({
					modelValue: 42,
					max: 100,
					thickness: 4,
					indeterminate: false,
					rotate: 0,
					size: 'large',
					color: 'primary',
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-progress-circular v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.size"    title="Size"     :options="SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstNumber v-model="state.thickness" title="Thickness"   :min="1" :max="20"   :step="1"/>
					<HstNumber v-model="state.rotate"    title="Rotate (deg)" :min="-360" :max="360" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstNumber   v-model="state.modelValue"    title="Value" :min="0" :max="100" :step="1"/>
					<HstNumber   v-model="state.max"           title="Max"   :min="1" :max="1000" :step="1"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamProgressCircular } from '@origam/components'
	import type { IBgColorProps, IProgressCircularProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		SIZE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Progress/OrigamProgressCircular.md"/>
