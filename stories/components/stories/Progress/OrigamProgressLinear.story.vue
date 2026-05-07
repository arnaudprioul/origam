<template>
	<Story
			group="components"
			title="Progress/OrigamProgressLinear"
	>

		<Variant title="Basic usage">
			<div style="display:flex; flex-direction: column; gap: 16px; min-width: 320px;">
				<origam-progress-linear :model-value="35" color="primary"/>
				<origam-progress-linear indeterminate active color="primary"/>
			</div>
		</Variant>

		<Variant
				title="Value (determinate)"
				:init-state="() => useStoryInitState<{ modelValue?: number, max?: number }>({
					modelValue: 50,
					max: 100,
				})"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:model-value="state.modelValue"
						:max="state.max"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.modelValue" title="modelValue"/>
				<HstNumber v-model="state.max"        title="max"/>
			</template>
		</Variant>

		<Variant
				title="Indeterminate"
				:init-state="() => useStoryInitState<{ indeterminate?: boolean, active?: boolean }>({
					indeterminate: true,
					active: true,
				})"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:indeterminate="state.indeterminate"
						:active="state.active"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
				<HstCheckbox v-model="state.active"        title="active"/>
			</template>
		</Variant>

		<Variant
				title="Buffer + Stream"
				:init-state="() => useStoryInitState<{ modelValue?: number, bufferValue?: number, stream?: boolean, active?: boolean }>({
					modelValue: 35,
					bufferValue: 60,
					stream: true,
					active: true,
				})"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:model-value="state.modelValue"
						:buffer-value="state.bufferValue"
						:stream="state.stream"
						:active="state.active"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.modelValue"  title="modelValue"/>
				<HstNumber   v-model="state.bufferValue" title="bufferValue"/>
				<HstCheckbox v-model="state.stream"      title="stream"/>
				<HstCheckbox v-model="state.active"      title="active"/>
			</template>
		</Variant>

		<Variant
				title="Thickness"
				:init-state="() => useStoryInitState<{ thickness?: number }>({ thickness: 4 })"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:thickness="state.thickness"
						:model-value="60"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.thickness" title="thickness"/>
			</template>
		</Variant>

		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:color="state.color"
						:bg-color="state.bgColor"
						:model-value="60"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:rounded="state.rounded"
						:model-value="50"
						:thickness="12"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Reverse"
				:init-state="() => useStoryInitState<{ reverse?: boolean }>({ reverse: false })"
		>
			<template #default="{ state }">
				<origam-progress-linear
						:reverse="state.reverse"
						:model-value="40"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.reverse" title="reverse"/>
			</template>
		</Variant>

		<Variant
				title="Absolute (positioned)"
				:init-state="() => useStoryInitState<{ absolute?: boolean, location?: string }>({
					absolute: true,
					location: 'top',
				})"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 80px; width: 100%; border: 1px dashed var(--origam-color-border-default, #ccc);">
					<origam-progress-linear
							:absolute="state.absolute"
							:location="state.location"
							indeterminate
							active
							color="primary"
					/>
					<span style="padding: 24px;">Parent container</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.absolute" title="absolute"/>
				<HstSelect
						v-model="state.location"
						title="location"
						:options="[
							{ label: 'top', value: 'top' },
							{ label: 'bottom', value: 'bottom' },
						]"
				/>
			</template>
		</Variant>

		<Variant title="Slot - default (label)">
			<origam-progress-linear
					:model-value="73"
					:buffer-value="90"
					color="primary"
					:thickness="20"
			>
				<template #default="{ value, buffer }">
					<small style="color: white; font-weight: 600;">
						{{ Math.round(Number(value)) }}% (buffer {{ Math.round(Number(buffer)) }}%)
					</small>
				</template>
			</origam-progress-linear>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IProgressLinearProps>({
					modelValue: 42,
					bufferValue: 70,
					max: 100,
					thickness: 4,
					indeterminate: false,
					active: true,
					stream: false,
					reverse: false,
					rounded: undefined,
					color: 'primary',
				})"
		>
			<template #default="{ state }">
				<origam-progress-linear v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.modelValue"    title="modelValue"/>
				<HstNumber   v-model="state.bufferValue"   title="bufferValue"/>
				<HstNumber   v-model="state.max"           title="max"/>
				<HstNumber   v-model="state.thickness"     title="thickness"/>
				<HstSelect   v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect   v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect   v-model="state.rounded"       title="rounded"       :options="roundedList"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
				<HstCheckbox v-model="state.active"        title="active"/>
				<HstCheckbox v-model="state.stream"        title="stream"/>
				<HstCheckbox v-model="state.reverse"       title="reverse"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamProgressLinear } from '@origam/components'
	import type { IColorProps, IProgressLinearProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, roundedList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Progress/OrigamProgressLinear.md"/>
