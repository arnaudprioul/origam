<template>
	<Story
			group="components"
			title="ColorPickerField/OrigamColorPickerField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
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
				title="Prop — hover (hoverColor & hoverBgColor)"
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
			</template>
		</Variant>

		<Variant
				title="Prop — active (activeColor & activeBgColor)"
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

	import { OrigamColorPickerField } from '@origam/components'
	import { DENSITY, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps } from '@origam/interfaces'
	import type { TDensity, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	const color       = ref(null)
	const ifaceColor  = ref(null)
	const variantColor = ref(null)
	const densityColor = ref(null)
</script>

<docs lang="md" src="@docs/components/ColorPickerField/OrigamColorPickerField.md"/>
