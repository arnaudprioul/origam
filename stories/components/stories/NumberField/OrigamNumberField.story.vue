<template>
	<Story
			group="components"
			title="NumberField/OrigamNumberField"
	>

		<!-- ════════════ VARIANT ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariant }>({ variant: undefined })"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="variantModel"
						:variant="state.variant"
						label="Quantity"
						data-cy="numberfield-variant"
				/>
				<div data-cy="numberfield-variant-status">value = {{ variantModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantList"/>
			</template>
		</Variant>

		<!-- ════════════ MIN / MAX / STEP ════════════ -->
		<Variant
				title="Min / max / step / precision"
				:init-state="() => useStoryInitState<{ min: number, max: number, step: number, precision: number }>({ min: 0, max: 100, step: 1, precision: 0 })"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="rangeModel"
						:min="state.min"
						:max="state.max"
						:step="state.step"
						:precision="state.precision"
						label="Range"
						data-cy="numberfield-range"
				/>
				<div data-cy="numberfield-range-status">value = {{ rangeModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.min"       title="min"       :min="-1000" :max="0"/>
				<HstSlider v-model="state.max"       title="max"       :min="1"     :max="1000"/>
				<HstSlider v-model="state.step"      title="step"      :min="0.01"  :max="100"/>
				<HstSlider v-model="state.precision" title="precision" :min="0"     :max="4"/>
			</template>
		</Variant>

		<!-- ════════════ SPLIT ════════════ -->
		<Variant
				title="Split mode"
				:init-state="() => useStoryInitState<{ split: boolean }>({ split: true })"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="splitModel"
						:split="state.split"
						label="Split counter"
						data-cy="numberfield-split"
				/>
				<div data-cy="numberfield-split-status">value = {{ splitModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.split" title="split"/>
			</template>
		</Variant>

		<!-- ════════════ HIDE CONTROLS ════════════ -->
		<Variant
				title="Hide controls"
				:init-state="() => useStoryInitState<{ hideControls: boolean }>({ hideControls: true })"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="hideCtrlModel"
						:hide-controls="state.hideControls"
						label="No buttons"
						data-cy="numberfield-hide-controls"
				/>
				<div data-cy="numberfield-hide-controls-status">value = {{ hideCtrlModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideControls" title="hideControls"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Out of range'] : []"
						label="Stateful"
						data-cy="numberfield-states"
				/>
				<div data-cy="numberfield-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-number-field
					v-model="emitModel"
					label="Update value"
					data-cy="numberfield-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="numberfield-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: increment / decrement ════════════ -->
		<Variant title="Emit — increment / decrement">
			<origam-number-field
					v-model="emitIncModel"
					label="Increment / decrement"
					data-cy="numberfield-emit-inc"
					@increment="logEvent('increment', $event)"
					@decrement="logEvent('decrement', $event)"
			/>
			<div data-cy="numberfield-emit-inc-status">value = {{ emitIncModel }}</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<INumberFieldProps>({
					label: 'Quantity',
					color: 'primary',
					variant: undefined,
					density: undefined,
					min: 0,
					max: 100,
					step: 1,
					precision: 0,
					split: false,
					hideControls: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="numberfield-playground"
				/>
				<div data-cy="numberfield-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"        title="label"/>
				<HstSelect   v-model="state.color"        title="color"    :options="intentList"/>
				<HstSelect   v-model="state.variant"      title="variant"  :options="variantList"/>
				<HstSelect   v-model="state.density"      title="density"  :options="densityList"/>
				<HstSlider   v-model="state.min"          title="min"      :min="-100" :max="0"/>
				<HstSlider   v-model="state.max"          title="max"      :min="1"    :max="1000"/>
				<HstSlider   v-model="state.step"         title="step"     :min="1"    :max="50"/>
				<HstCheckbox v-model="state.split"        title="split"/>
				<HstCheckbox v-model="state.hideControls" title="hideControls"/>
				<HstCheckbox v-model="state.disabled"     title="disabled"/>
				<HstCheckbox v-model="state.readonly"     title="readonly"/>
				<HstCheckbox v-model="state.error"        title="error"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamNumberField } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { IColorProps, IDensityProps, INumberFieldProps } from '@origam/interfaces'
	import type { TVariant } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantList } from '@stories/const'

	const variantModel    = ref<number | null>(null)
	const rangeModel      = ref<number | null>(50)
	const splitModel      = ref<number | null>(0)
	const hideCtrlModel   = ref<number | null>(0)
	const statesModel     = ref<number | null>(0)
	const emitModel       = ref<number | null>(0)
	const emitIncModel    = ref<number | null>(0)
	const playgroundModel = ref<number | null>(0)
</script>

<docs lang="md" src="@docs/components/NumberField/OrigamNumberField.md"/>
