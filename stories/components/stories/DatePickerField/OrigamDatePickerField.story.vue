<template>
	<Story
			group="components"
			title="DatePickerField/OrigamDatePickerField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					label?: string
					range?: boolean
					multiple?: boolean
					closeOnSelect?: boolean
					disabled?: boolean
					readonly?: boolean
				}>({
					label: 'Appointment',
					range: false,
					multiple: false,
					closeOnSelect: false,
					disabled: false,
					readonly: false
				})"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						v-bind="state"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstCheckbox v-model="state.range"         title="range"/>
				<HstCheckbox v-model="state.multiple"      title="multiple"/>
				<HstCheckbox v-model="state.closeOnSelect" title="closeOnSelect"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px; max-width: 400px;">
					<origam-date-picker-field v-model="colorDate" v-bind="state" label="Colored date (interactive)" data-cy="datepickerfield-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-date-picker-field color="primary" label='color="primary" only' data-cy="datepickerfield-color-fixture-color-only"/>
						<origam-date-picker-field bg-color="success" label='bg-color="success" only' data-cy="datepickerfield-color-fixture-bg-only"/>
						<origam-date-picker-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="datepickerfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px; max-width: 400px;">
					<origam-date-picker-field v-model="colorDate" v-bind="state" label="Colored date (interactive)" data-cy="datepickerfield-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-date-picker-field color="primary" label='color="primary" only' data-cy="datepickerfield-color-fixture-color-only"/>
						<origam-date-picker-field bg-color="success" label='bg-color="success" only' data-cy="datepickerfield-color-fixture-bg-only"/>
						<origam-date-picker-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="datepickerfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px; max-width: 400px;">
					<origam-date-picker-field v-model="colorDate" v-bind="state" label="Colored date (interactive)" data-cy="datepickerfield-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-date-picker-field color="primary" label='color="primary" only' data-cy="datepickerfield-color-fixture-color-only"/>
						<origam-date-picker-field bg-color="success" label='bg-color="success" only' data-cy="datepickerfield-color-fixture-bg-only"/>
						<origam-date-picker-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="datepickerfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-date-picker-field v-model="variantDate" :variant="state.variant" label="Variant" data-cy="datepickerfield-variant" style="max-width: 320px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-date-picker-field v-model="densityDate" :density="state.density" label="Density date" data-cy="datepickerfield-density" style="max-width: 320px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="Prop — range">
			<origam-date-picker-field
					v-model="dates"
					label="Date range"
					range
					style="max-width: 320px"
			/>
		</Variant>

		<Variant title="Prop — multiple">
			<origam-date-picker-field
					v-model="dates"
					label="Select dates"
					multiple
					style="max-width: 320px"
			/>
		</Variant>

		<Variant
				title="Prop — closeOnSelect"
				:init-state="() => useStoryInitState<{ closeOnSelect?: boolean }>({ closeOnSelect: true })"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						label="Date"
						:close-on-select="state.closeOnSelect"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.closeOnSelect" title="closeOnSelect"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled & readonly"
				:init-state="() => useStoryInitState<{ disabled?: boolean; readonly?: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						label="Date"
						:disabled="state.disabled"
						:readonly="state.readonly"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-date-picker-field
					v-model="date"
					label="Date"
					style="max-width: 320px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:menu">
			<origam-date-picker-field
					v-model="date"
					label="Date"
					style="max-width: 320px"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamDatePickerField } from '@origam/components'
	import { DENSITY, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	const date = ref(null)
	const dates = ref([])
	const colorDate = ref(null)
	const variantDate = ref(null)
	const densityDate = ref(null)
</script>

<docs lang="md" src="@docs/components/DatePickerField/OrigamDatePickerField.md"/>
