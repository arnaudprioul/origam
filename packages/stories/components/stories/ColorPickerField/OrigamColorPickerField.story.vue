<template>
	<Story
			group="components"
			title="ColorPickerField/OrigamColorPickerField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<{
					label?: string
					closeOnSelect?: boolean
					disabled?: boolean
					readonly?: boolean
					variant?: TVariantInput
					density?: TDensity
					color?: string
				}>({
					label: 'Brand colour',
					closeOnSelect: false,
					disabled: false,
					readonly: false,
					variant: undefined,
					density: undefined,
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
						v-bind="state"
						style="max-width: 320px"
				/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstSelect   v-model="state.color"         title="color"   :options="intentList"/>
				<HstSelect   v-model="state.variant"       title="variant" :options="variantInputList"/>
				<HstSelect   v-model="state.density"       title="density" :options="densityList"/>
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
					<origam-color-picker-field v-model="ifaceColor" v-bind="state" label="Field colour (interactive)" data-cy="colorpickerfield-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-color-picker-field color="primary" label='color="primary" only' data-cy="colorpickerfield-color-fixture-color-only"/>
						<origam-color-picker-field bg-color="success" label='bg-color="success" only' data-cy="colorpickerfield-color-fixture-bg-only"/>
						<origam-color-picker-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="colorpickerfield-color-fixture-combo"/>
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
					<origam-color-picker-field v-model="ifaceColor" v-bind="state" label="Field colour (interactive)" data-cy="colorpickerfield-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-color-picker-field color="primary" label='color="primary" only' data-cy="colorpickerfield-color-fixture-color-only"/>
						<origam-color-picker-field bg-color="success" label='bg-color="success" only' data-cy="colorpickerfield-color-fixture-bg-only"/>
						<origam-color-picker-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="colorpickerfield-color-fixture-combo"/>
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
					<origam-color-picker-field v-model="ifaceColor" v-bind="state" label="Field colour (interactive)" data-cy="colorpickerfield-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-color-picker-field color="primary" label='color="primary" only' data-cy="colorpickerfield-color-fixture-color-only"/>
						<origam-color-picker-field bg-color="success" label='bg-color="success" only' data-cy="colorpickerfield-color-fixture-bg-only"/>
						<origam-color-picker-field color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="colorpickerfield-color-fixture-combo"/>
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
				<origam-color-picker-field v-model="variantColor" :variant="state.variant" label="Variant" data-cy="colorpickerfield-variant" style="max-width: 320px"/>
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
				<origam-color-picker-field v-model="densityColor" :density="state.density" label="Density colour" data-cy="colorpickerfield-density" style="max-width: 320px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — closeOnSelect"
				:init-state="() => useStoryInitState<{ closeOnSelect?: boolean }>({ closeOnSelect: true })"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
						label="Colour"
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
				<origam-color-picker-field
						v-model="color"
						label="Colour"
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

		<Variant
				title="Prop — rules"
				:init-state="() => useStoryInitState<{ validateOn?: TValidateOn }>({ validateOn: 'blur' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px; max-width: 400px;">
					<origam-color-picker-field
							v-model="rulesColor"
							label="Required colour"
							:rules="colorRequiredRule"
							:validate-on="state.validateOn"
							data-cy="colorpickerfield-rules"
							style="max-width: 320px"
					/>
					<p style="font-size: 0.875em; color: var(--origam-color-neutral-600, #666);">
						Choose a colour then clear it (click × when visible) to trigger the error message.
					</p>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.validateOn" title="validateOn" :options="validateOnList"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-append">
				<template #append>
					<origam-icon :icon="MDI_ICONS.ARROW_RIGHT"/>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — appendInner">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-append-inner">
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — clear">
			<origam-color-picker-field v-model="color" label="Colour" clearable style="max-width: 320px" data-cy="colorpickerfield-slot-clear">
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — colorSelection">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-color-selection">
				<template #colorSelection>
					<span>Custom colour selection</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-floating-label">
				<template #floatingLabel>
					<span>Pick a colour</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-color-picker-field v-model="color" style="max-width: 320px" data-cy="colorpickerfield-slot-label">
				<template #label>
					<strong>Brand colour</strong>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — loader">
			<origam-color-picker-field v-model="color" label="Colour" loading style="max-width: 320px" data-cy="colorpickerfield-slot-loader">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-prepend-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.PALETTE"/>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-prefix">
				<template #prefix>
					<span>#</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-color-picker-field v-model="color" label="Colour" style="max-width: 320px" data-cy="colorpickerfield-slot-suffix">
				<template #suffix>
					<span>px</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-color-picker-field
					v-model="color"
					label="Colour"
					style="max-width: 320px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:menu">
			<origam-color-picker-field
					v-model="color"
					label="Colour"
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

	import { OrigamColorPickerField, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IOptions } from '@origam/interfaces'
	import type { TDensity, TValidateOn, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	const color       = ref(null)
	const ifaceColor  = ref(null)
	const variantColor = ref(null)
	const densityColor = ref(null)
	const rulesColor   = ref(null)

	const colorRequiredRule = [(v: unknown) => !!v || 'Color required']

	const validateOnList: Array<IOptions<TValidateOn>> = [
		{ label: 'input', value: 'input' },
		{ label: 'blur', value: 'blur' },
		{ label: 'submit', value: 'submit' },
		{ label: 'lazy', value: 'lazy' },
	]
</script>

<docs lang="md" src="@docs/components/ColorPickerField/OrigamColorPickerField.md"/>
