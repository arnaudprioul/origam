<template>
	<Story
			group="components"
			title="DatePickerField/OrigamDatePickerField"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant
				title="Basic"
				:init-state="() => useStoryInitState<{ label?: string }>({ label: 'Appointment' })"
		>
			<template #default="{ state }">
				<origam-date-picker-field
						v-model="date"
						:label="state.label"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.label" title="label"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<Variant
				title="Color"
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
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ VARIANT (TVariantInput) ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-date-picker-field v-model="variantDate" :variant="state.variant" label="Variant" data-cy="datepickerfield-variant" style="max-width: 320px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-date-picker-field v-model="densityDate" :density="state.density" label="Density date" data-cy="datepickerfield-density" style="max-width: 320px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ RANGE ════════════ -->
		<Variant title="Range">
			<origam-date-picker-field
					v-model="dates"
					label="Date range"
					range
					style="max-width: 320px"
			/>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<origam-date-picker-field
					v-model="dates"
					label="Select dates"
					multiple
					style="max-width: 320px"
			/>
		</Variant>

		<!-- ════════════ CLOSE ON SELECT ════════════ -->
		<Variant
				title="Close on select"
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

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
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

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-date-picker-field
					v-model="date"
					label="Date"
					style="max-width: 320px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:menu ════════════ -->
		<Variant title="Emit — update:menu">
			<origam-date-picker-field
					v-model="date"
					label="Date"
					style="max-width: 320px"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
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
	import { densityList, intentList, variantInputList } from '@stories/const'

	const date = ref(null)
	const dates = ref([])
	const colorDate = ref(null)
	const variantDate = ref(null)
	const densityDate = ref(null)
</script>

<docs lang="md" src="@docs/components/DatePickerField/OrigamDatePickerField.md"/>
