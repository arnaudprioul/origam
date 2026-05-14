<template>
	<Story
			group="components"
			title="Progress/OrigamProgressCircular"
	>
		<!--
			Playground — first by convention. Exposes every IProgressCircularProps knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IProgressCircularProps>({
					modelValue: 42,
					max: 100,
					thickness: 4,
					indeterminate: false,
					rotate: 0,
					size: 'large',
					color: 'primary',
				})"
		>
			<template #default="{ state }">
				<origam-progress-circular v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.modelValue"    title="modelValue"/>
				<HstNumber   v-model="state.max"           title="max"/>
				<HstNumber   v-model="state.thickness"     title="thickness"/>
				<HstNumber   v-model="state.rotate"        title="rotate (deg)"/>
				<HstSelect   v-model="state.size"          title="size"          :options="sizeList"/>
				<HstSelect   v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect   v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — modelValue (determinate)"
				:init-state="() => useStoryInitState<{ modelValue?: number, max?: number }>({
					modelValue: 50,
					max: 100,
				})"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:model-value="state.modelValue"
						:max="state.max"
						color="primary"
						size="x-large"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.modelValue" title="modelValue"/>
				<HstNumber v-model="state.max"        title="max"/>
			</template>
		</Variant>

		<Variant
				title="Prop — indeterminate"
				:init-state="() => useStoryInitState<{ indeterminate?: boolean }>({ indeterminate: true })"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:indeterminate="state.indeterminate"
						color="primary"
						size="large"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: 'default' })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 16px; align-items: center;">
					<origam-progress-circular :size="state.size" indeterminate color="primary"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — thickness"
				:init-state="() => useStoryInitState<{ thickness?: number }>({ thickness: 4 })"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:thickness="state.thickness"
						indeterminate
						color="primary"
						size="large"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.thickness" title="thickness"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rotate"
				:init-state="() => useStoryInitState<{ rotate?: number }>({ rotate: 0 })"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:rotate="state.rotate"
						:model-value="35"
						color="primary"
						size="large"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.rotate" title="rotate (deg)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-progress-circular
						:color="state.color"
						:bg-color="state.bgColor"
						:model-value="60"
						size="large"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (label inside circle)">
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamProgressCircular } from '@origam/components'
	import type { IColorProps, IProgressCircularProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, sizeList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Progress/OrigamProgressCircular.md"/>
