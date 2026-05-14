<template>
	<Story
			group="components"
			title="NumberField/OrigamNumberField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
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
					compact: false,
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
				<HstSelect   v-model="state.variant"      title="variant"  :options="variantInputList"/>
				<HstSelect   v-model="state.density"      title="density"  :options="densityList"/>
				<HstSlider   v-model="state.min"          title="min"      :min="-100" :max="0"/>
				<HstSlider   v-model="state.max"          title="max"      :min="1"    :max="1000"/>
				<HstSlider   v-model="state.step"         title="step"     :min="1"    :max="50"/>
				<HstCheckbox v-model="state.split"        title="split"/>
				<HstCheckbox v-model="state.hideControls" title="hideControls"/>
				<HstCheckbox v-model="state.compact"      title="compact"/>
				<HstCheckbox v-model="state.disabled"     title="disabled"/>
				<HstCheckbox v-model="state.readonly"     title="readonly"/>
				<HstCheckbox v-model="state.error"        title="error"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
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
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-number-field
							v-model="colorModel"
							v-bind="state"
							label="Colored number (interactive)"
							data-cy="numberfield-color"
					/>
					<div data-cy="numberfield-color-status">value = {{ colorModel }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-number-field :model-value="42" color="primary" label='color="primary" only' data-cy="numberfield-color-fixture-color-only"/>
						<origam-number-field :model-value="42" bg-color="success" label='bg-color="success" only' data-cy="numberfield-color-fixture-bg-only"/>
						<origam-number-field :model-value="42" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="numberfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-number-field v-model="densityModel" :density="state.density" label="Density number" data-cy="numberfield-density"/>
				<div data-cy="numberfield-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — min, max, step & precision"
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

		<Variant
				title="Prop — split"
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

		<Variant
				title="Prop — hideControls"
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

		<Variant
				title="Prop — compact"
				:init-state="() => useStoryInitState<{ min: number, max: number, step: number }>({ min: 0, max: 99, step: 1 })"
		>
			<template #default="{ state }">
				<origam-number-field
						v-model="compactModel"
						:min="state.min"
						:max="state.max"
						:step="state.step"
						compact
						label="Quantity"
						data-cy="numberfield-compact"
				/>
				<div data-cy="numberfield-compact-status">value = {{ compactModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.min"  title="min"  :min="-100" :max="0"/>
				<HstSlider v-model="state.max"  title="max"  :min="1"    :max="1000"/>
				<HstSlider v-model="state.step" title="step" :min="1"    :max="50"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & error"
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

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — appendInner">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — clear">
			<origam-number-field v-model="playgroundModel" label="Quantity" clearable>
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — decrement">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #decrement>
					<origam-icon :icon="MDI_ICONS.MINUS"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<span>Custom slot content</span>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — details">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #details>
					<span>Custom details area</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — field">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #field>
					<span>Custom field content</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #floatingLabel>
					<span>Floating label</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — increment">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #increment>
					<origam-icon :icon="MDI_ICONS.PLUS"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #label>
					<span>Custom label</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — loader">
			<origam-number-field v-model="playgroundModel" label="Quantity" loading>
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — message">
			<origam-number-field v-model="playgroundModel" label="Quantity" :error-messages="['Error message']">
				<template #message="{ message }">
					<span>{{ message }}</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — messages">
			<origam-number-field v-model="playgroundModel" label="Quantity" :error-messages="['Error one', 'Error two']">
				<template #messages>
					<span>Custom messages area</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-number-field v-model="playgroundModel" label="Price">
				<template #prefix>
					<span>€</span>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-number-field v-model="playgroundModel" label="Quantity">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-number-field>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-number-field v-model="playgroundModel" label="Weight">
				<template #suffix>
					<span>kg</span>
				</template>
			</origam-number-field>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click:clear">
			<origam-number-field
					v-model="playgroundModel"
					label="Clearable"
					clearable
					data-cy="numberfield-emit-click-clear"
					@click:clear="logEvent('click:clear', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:control">
			<origam-number-field
					v-model="playgroundModel"
					label="Click control"
					data-cy="numberfield-emit-click-control"
					@click:control="logEvent('click:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — mousedown:control">
			<origam-number-field
					v-model="playgroundModel"
					label="Mousedown control"
					data-cy="numberfield-emit-mousedown-control"
					@mousedown:control="logEvent('mousedown:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-number-field
					v-model="emitModel"
					label="Update value"
					data-cy="numberfield-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="numberfield-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — increment & decrement">
			<origam-number-field
					v-model="emitIncModel"
					label="Increment / decrement"
					data-cy="numberfield-emit-inc"
					@increment="logEvent('increment', $event)"
					@decrement="logEvent('decrement', $event)"
			/>
			<div data-cy="numberfield-emit-inc-status">value = {{ emitIncModel }}</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamNumberField } from '@origam/components'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, INumberFieldProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	const variantModel    = ref<number | null>(null)
	const colorModel      = ref<number | null>(null)
	const densityModel    = ref<number | null>(null)
	const rangeModel      = ref<number | null>(50)
	const splitModel      = ref<number | null>(0)
	const hideCtrlModel   = ref<number | null>(0)
	const statesModel     = ref<number | null>(0)
	const emitModel       = ref<number | null>(0)
	const emitIncModel    = ref<number | null>(0)
	const compactModel    = ref<number | null>(3)
	const playgroundModel = ref<number | null>(0)
</script>

<docs lang="md" src="@docs/components/NumberField/OrigamNumberField.md"/>
