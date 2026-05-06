<template>
	<Story
			group="components"
			title="Progress/OrigamProgress"
	>
		<!--
			OrigamProgress is a *dispatcher* that picks either
			OrigamProgressCircular (type="circular") or OrigamProgressLinear
			(type="linear") and forwards every prop via `filterProps`.

			Each Variant below covers one orthogonal concern — same convention
			as the Btn reference story.
		-->

		<!-- ════════════ TYPE (circular vs linear) ════════════ -->
		<Variant
				title="Type"
				:init-state="() => useStoryInitState<{ type?: TProgressType }>({ type: PROGRESS_TYPE.CIRCULAR })"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:model-value="42"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.type"
						title="type"
						:options="progressTypeList"
				/>
			</template>
		</Variant>

		<!-- ════════════ DETERMINATE / VALUE ════════════ -->
		<Variant
				title="Value (determinate)"
				:init-state="() => useStoryInitState<{ type?: TProgressType, modelValue?: number, max?: number }>({
					type: PROGRESS_TYPE.LINEAR,
					modelValue: 50,
					max: 100,
				})"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:model-value="state.modelValue"
						:max="state.max"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type"       title="type" :options="progressTypeList"/>
				<HstNumber v-model="state.modelValue" title="modelValue"/>
				<HstNumber v-model="state.max"        title="max"/>
			</template>
		</Variant>

		<!-- ════════════ INDETERMINATE ════════════ -->
		<Variant
				title="Indeterminate"
				:init-state="() => useStoryInitState<{ type?: TProgressType, indeterminate?: boolean }>({
					type: PROGRESS_TYPE.CIRCULAR,
					indeterminate: true,
				})"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:indeterminate="state.indeterminate"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.type"          title="type" :options="progressTypeList"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<!-- ════════════ SIZE (circular variant) ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: 'default' })"
		>
			<template #default="{ state }">
				<origam-progress
						type="circular"
						:size="state.size"
						color="primary"
						indeterminate
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (intent) ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps & { type?: TProgressType }>({
					type: PROGRESS_TYPE.LINEAR,
					color: 'primary',
				})"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:color="state.color"
						:bg-color="state.bgColor"
						:model-value="60"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type"    title="type"    :options="progressTypeList"/>
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ THICKNESS ════════════ -->
		<Variant
				title="Thickness"
				:init-state="() => useStoryInitState<{ type?: TProgressType, thickness?: number }>({
					type: PROGRESS_TYPE.LINEAR,
					thickness: 4,
				})"
		>
			<template #default="{ state }">
				<origam-progress
						:type="state.type"
						:thickness="state.thickness"
						:model-value="60"
						color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type"      title="type" :options="progressTypeList"/>
				<HstNumber v-model="state.thickness" title="thickness"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default (label) ════════════ -->
		<Variant title="Slot - default (label)">
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

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IProgressProps>({
					type: PROGRESS_TYPE.CIRCULAR,
					modelValue: 42,
					max: 100,
					thickness: 4,
					indeterminate: false,
					active: true,
					size: 'default',
					color: 'primary',
				})"
		>
			<template #default="{ state }">
				<origam-progress v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.type"          title="type"          :options="progressTypeList"/>
				<HstNumber   v-model="state.modelValue"    title="modelValue"/>
				<HstNumber   v-model="state.max"           title="max"/>
				<HstNumber   v-model="state.thickness"     title="thickness"/>
				<HstSelect   v-model="state.size"          title="size"          :options="sizeList"/>
				<HstSelect   v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect   v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
				<HstCheckbox v-model="state.active"        title="active"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamProgress } from '@origam/components'
	import { PROGRESS_TYPE } from '@origam/enums'
	import type { IColorProps, IProgressProps, ISizeProps } from '@origam/interfaces'
	import type { TProgressType } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, progressTypeList, sizeList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Progress/OrigamProgress.md"/>
