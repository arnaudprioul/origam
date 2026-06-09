<template>
	<Story
			group="components"
			title="Progress/OrigamProgress"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IProgressProps>>({ type: 'circular', color: 'primary', size: 'default', thickness: 4, modelValue: 60 })"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:padding="state.padding"
						:margin="state.margin"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:rounded="state.rounded"
						:thickness="state.thickness"
						:model-value="state.modelValue"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Type">
					<HstSelect v-model="state.type" title="Type" :options="PROGRESS_TYPE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size" title="Size" :options="SIZE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Thickness">
					<HstNumber v-model="state.thickness" title="Thickness" :min="1" :max="24" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Value">
					<HstNumber v-model="state.modelValue" title="Value" :min="0" :max="100" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ ÉTAT ══════════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<Partial<IProgressProps>>({ type: 'circular', color: 'primary', active: true, indeterminate: false })"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:color="state.color"
						:active="state.active"
						:indeterminate="state.indeterminate"
						:model-value="60"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.type"  title="Type"  :options="PROGRESS_TYPE_OPTIONS"/>
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstCheckbox v-model="state.active"        title="Active"/>
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IProgressProps>>({ type: 'linear', modelValue: 50, max: 100, bufferValue: 75, stream: false, striped: false, reverse: false, clickable: false, absolute: false })"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:model-value="state.modelValue"
						:max="state.max"
						:buffer-value="state.bufferValue"
						:stream="state.stream"
						:striped="state.striped"
						:reverse="state.reverse"
						:clickable="state.clickable"
						:absolute="state.absolute"
						:tag="state.tag"
						:location="state.location"
						:rotate="state.rotate"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Type">
					<HstSelect v-model="state.type" title="Type" :options="PROGRESS_TYPE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstNumber v-model="state.modelValue"  title="Value"        :min="0" :max="100" :step="1"/>
					<HstNumber v-model="state.max"         title="Max"          :min="1" :max="200" :step="1"/>
					<HstNumber v-model="state.bufferValue" title="Buffer Value" :min="0" :max="100" :step="1"/>
					<HstNumber v-model="state.rotate"      title="Rotate (circular)" :min="-360" :max="360" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Layout (linear only)">
					<HstCheckbox v-model="state.stream"    title="Stream"/>
					<HstCheckbox v-model="state.striped"   title="Striped"/>
					<HstCheckbox v-model="state.reverse"   title="Reverse"/>
					<HstCheckbox v-model="state.clickable" title="Clickable"/>
					<HstCheckbox v-model="state.absolute"  title="Absolute"/>
					<HstSelect   v-model="state.location"  title="Location" :options="LOCATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-progress
					type="circular"
					:model-value="73"
					size="x-large"
					color="primary"
			>
				<template #default="{ value }">
					<strong>{{ Math.round(Number(value)) }}%</strong>
				</template>
			</origam-progress>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IProgressProps>({ type: 'circular', modelValue: 42, max: 100, thickness: 4, indeterminate: false, active: true, size: 'default', color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-progress v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.type"      title="Type"      :options="PROGRESS_TYPE_OPTIONS"/>
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.size"      title="Size"      :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstNumber v-model="state.thickness" title="Thickness" :min="1" :max="24" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstNumber   v-model="state.modelValue"  title="Value"         :min="0"   :max="100" :step="1"/>
					<HstNumber   v-model="state.max"         title="Max"           :min="1"   :max="200" :step="1"/>
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstCheckbox v-model="state.active"        title="Active"/>
					<HstCheckbox v-model="state.reverse"       title="Reverse (linear)"/>
					<HstCheckbox v-model="state.stream"        title="Stream (linear)"/>
					<HstCheckbox v-model="state.striped"       title="Striped (linear)"/>
					<HstCheckbox v-model="state.clickable"     title="Clickable (linear)"/>
					<HstNumber   v-model="state.rotate"        title="Rotate (circular)" :min="-360" :max="360" :step="1"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamProgress } from '@origam/components'
	import type { IProgressProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		PROGRESS_TYPE_OPTIONS,
		ROUNDED_OPTIONS,
		SIZE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const LOCATION_OPTIONS = [
		{ label: '(none)', value: undefined },
		{ label: 'top', value: 'top' },
		{ label: 'bottom', value: 'bottom' },
		{ label: 'start', value: 'start' },
		{ label: 'end', value: 'end' },
		{ label: 'center', value: 'center' },
	]
</script>

<docs lang="md" src="@docs/components/Progress/OrigamProgress.md"/>
