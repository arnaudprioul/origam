<template>
	<Story
			group="components"
			title="Progress/OrigamProgressLinear"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IProgressLinearProps> & { bgColor?: string }>({
					modelValue: 60,
					color: 'primary',
					rounded: undefined,
					thickness: 4,
					location: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:model-value="state.modelValue"
						:color="state.color"
						:bg-color="state.bgColor"
						:rounded="state.rounded"
						:thickness="state.thickness"
						:location="state.location"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstNumber v-model="state.thickness" title="Thickness" :min="1" :max="32" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Position">
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IProgressLinearProps>>({
					modelValue: 42,
					bufferValue: 70,
					max: 100,
					indeterminate: false,
					active: true,
					stream: false,
					reverse: false,
					absolute: false,
					clickable: false,
					striped: false,
					tag: 'div',
				})"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 80px; width: 100%;">
					<origam-progress-linear
							:model-value="state.modelValue"
							:buffer-value="state.bufferValue"
							:max="state.max"
							:indeterminate="state.indeterminate"
							:active="state.active"
							:stream="state.stream"
							:reverse="state.reverse"
							:absolute="state.absolute"
							:clickable="state.clickable"
							:striped="state.striped"
							:tag="state.tag"
							color="primary"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber   v-model="state.modelValue"  title="Model Value"   :min="0"   :max="100" :step="1"/>
					<HstNumber   v-model="state.bufferValue" title="Buffer Value"  :min="0"   :max="100" :step="1"/>
					<HstNumber   v-model="state.max"         title="Max"           :min="1"   :max="200" :step="1"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstCheckbox v-model="state.active"        title="Active"/>
					<HstCheckbox v-model="state.striped"       title="Striped"/>
				</StoryGroup>
				<StoryGroup title="Behaviour">
					<HstCheckbox v-model="state.stream"    title="Stream"/>
					<HstCheckbox v-model="state.reverse"   title="Reverse"/>
					<HstCheckbox v-model="state.clickable" title="Clickable"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.absolute" title="Absolute"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-progress-linear
					:model-value="73"
					:buffer-value="90"
					:thickness="20"
					color="primary"
			>
				<template #default="{ value, buffer }">
					<small style="color: white; font-weight: 600;">
						{{ Math.round(Number(value)) }}% (buffer {{ Math.round(Number(buffer)) }}%)
					</small>
				</template>
			</origam-progress-linear>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<IProgressLinearProps> & { bgColor?: string }>({
					modelValue: 42,
					bufferValue: 70,
					max: 100,
					color: 'primary',
					thickness: 4,
					indeterminate: false,
					active: true,
					stream: false,
					reverse: false,
					rounded: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-progress-linear v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstNumber v-model="state.thickness" title="Thickness" :min="1" :max="32" :step="1"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstNumber   v-model="state.modelValue"    title="Model Value"  :min="0" :max="100" :step="1"/>
					<HstNumber   v-model="state.bufferValue"   title="Buffer Value" :min="0" :max="100" :step="1"/>
					<HstNumber   v-model="state.max"           title="Max"          :min="1" :max="200" :step="1"/>
					<HstCheckbox v-model="state.indeterminate" title="Indeterminate"/>
					<HstCheckbox v-model="state.active"        title="Active"/>
					<HstCheckbox v-model="state.stream"        title="Stream"/>
					<HstCheckbox v-model="state.reverse"       title="Reverse"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamProgressLinear } from '@origam/components'
	import type { IProgressLinearProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS,
	} from '@stories/const'

	const LOCATION_OPTIONS = [
		{ label: '(none)', value: undefined },
		{ label: 'Top', value: 'top' },
		{ label: 'Bottom', value: 'bottom' },
		{ label: 'Left', value: 'left' },
		{ label: 'Right', value: 'right' },
		{ label: 'Start', value: 'start' },
		{ label: 'End', value: 'end' },
		{ label: 'Center', value: 'center' },
	]
</script>

<docs lang="md" src="@docs/components/Progress/OrigamProgressLinear.md"/>
