<template>
	<Story
			group="components"
			title="ColorPickerField/OrigamColorPickerField"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant
				title="Basic"
				:init-state="() => useStoryInitState<{ label?: string }>({ label: 'Brand colour' })"
		>
			<template #default="{ state }">
				<origam-color-picker-field
						v-model="color"
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
				<origam-color-picker-field v-model="variantColor" :variant="state.variant" label="Variant" data-cy="colorpickerfield-variant" style="max-width: 320px"/>
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
				<origam-color-picker-field v-model="densityColor" :density="state.density" label="Density colour" data-cy="colorpickerfield-density" style="max-width: 320px"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ CLOSE ON SELECT ════════════ -->
		<Variant
				title="Close on select"
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

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
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

		<!-- ════════════ SLOT: colorSelection ════════════ -->
		<Variant title="Slot — colorSelection">
			<origam-color-picker-field
					v-model="color"
					label="Custom value display"
					style="max-width: 320px"
			>
				<template #colorSelection>
					<span style="font-style: italic;">{{ color ?? 'none' }}</span>
				</template>
			</origam-color-picker-field>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-color-picker-field
					v-model="color"
					label="Colour"
					style="max-width: 320px"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:menu ════════════ -->
		<Variant title="Emit — update:menu">
			<origam-color-picker-field
					v-model="color"
					label="Colour"
					style="max-width: 320px"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					label?: string
					closeOnSelect?: boolean
					disabled?: boolean
					readonly?: boolean
				}>({
					label: 'Brand colour',
					closeOnSelect: false,
					disabled: false,
					readonly: false
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

	import { OrigamColorPickerField } from '@origam/components'
	import { DENSITY, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	const color = ref(null)
	const ifaceColor = ref(null)
	const variantColor = ref(null)
	const densityColor = ref(null)
</script>

<docs lang="md" src="@docs/components/ColorPickerField/OrigamColorPickerField.md"/>
