<template>
	<Story
			group="components"
			title="OtpInputField/OrigamOtpInputField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IOtpInputFieldProps>({
					label: 'Verification code',
					length: 6,
					type: 'text',
					divider: undefined,
					variant: undefined,
					color: 'primary',
					density: undefined,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="otp-playground"
				/>
				<div data-cy="otp-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"    title="label"/>
				<HstSlider   v-model="state.length"   title="length"  :min="4" :max="10"/>
				<HstSelect   v-model="state.type"     title="type"    :options="otpTypeList"/>
				<HstText     v-model="state.divider"  title="divider"/>
				<HstSelect   v-model="state.variant"  title="variant" :options="variantInputList"/>
				<HstSelect   v-model="state.color"    title="color"   :options="intentList"/>
				<HstSelect   v-model="state.density"  title="density" :options="densityList"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — length"
				:init-state="() => useStoryInitState<{ length: number }>({ length: 6 })"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="lengthModel"
						:length="state.length"
						label="OTP code"
						data-cy="otp-length"
				/>
				<div data-cy="otp-length-status">value = {{ lengthModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.length" title="length" :min="4" :max="10"/>
			</template>
		</Variant>

		<Variant
				title="Prop — type"
				:init-state="() => useStoryInitState<{ type: string }>({ type: 'text' })"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="typeModel"
						:type="state.type"
						:length="6"
						label="OTP type"
						data-cy="otp-type"
				/>
				<div data-cy="otp-type-status">value = {{ typeModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type" title="type" :options="otpTypeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — divider"
				:init-state="() => useStoryInitState<{ divider: string }>({ divider: '-' })"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="dividerModel"
						:divider="state.divider"
						:length="6"
						label="With divider"
						data-cy="otp-divider"
				/>
				<div data-cy="otp-divider-status">value = {{ dividerModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.divider" title="divider"/>
			</template>
		</Variant>

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="variantModel"
						:variant="state.variant"
						:length="4"
						label="Variant"
						data-cy="otp-variant"
				/>
				<div data-cy="otp-variant-status">value = {{ variantModel }}</div>
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
					<origam-otp-input-field v-model="colorModel" v-bind="state" label="Colored OTP (interactive)" data-cy="otpfield-color"/>
					<div data-cy="otpfield-color-status">value = {{ colorModel }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-otp-input-field :model-value="'1234'" color="primary" label='color="primary" only' data-cy="otpfield-color-fixture-color-only"/>
						<origam-otp-input-field :model-value="'1234'" bg-color="success" label='bg-color="success" only' data-cy="otpfield-color-fixture-bg-only"/>
						<origam-otp-input-field :model-value="'1234'" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="otpfield-color-fixture-combo"/>
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
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-otp-input-field v-model="colorModel" v-bind="state" label="Colored OTP (interactive)" data-cy="otpfield-color"/>
					<div data-cy="otpfield-color-status">value = {{ colorModel }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-otp-input-field :model-value="'1234'" color="primary" label='color="primary" only' data-cy="otpfield-color-fixture-color-only"/>
						<origam-otp-input-field :model-value="'1234'" bg-color="success" label='bg-color="success" only' data-cy="otpfield-color-fixture-bg-only"/>
						<origam-otp-input-field :model-value="'1234'" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="otpfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect v-model="state.hover" title="hover" :options="hoverList"/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-otp-input-field v-model="colorModel" v-bind="state" label="Colored OTP (interactive)" data-cy="otpfield-color"/>
					<div data-cy="otpfield-color-status">value = {{ colorModel }}</div>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-otp-input-field :model-value="'1234'" color="primary" label='color="primary" only' data-cy="otpfield-color-fixture-color-only"/>
						<origam-otp-input-field :model-value="'1234'" bg-color="success" label='bg-color="success" only' data-cy="otpfield-color-fixture-bg-only"/>
						<origam-otp-input-field :model-value="'1234'" color="warning" bg-color="primary" label='color="warning" + bg-color="primary"' data-cy="otpfield-color-fixture-combo"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect v-model="state.active" title="active" :options="activeList"/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-otp-input-field v-model="densityModel" :density="state.density" label="Density OTP" data-cy="otpfield-density"/>
				<div data-cy="otpfield-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & error"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Invalid code'] : []"
						:length="6"
						label="Stateful OTP"
						data-cy="otp-states"
				/>
				<div data-cy="otp-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-otp-input-field
					v-model="emitModel"
					:length="6"
					label="Enter OTP"
					data-cy="otp-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="otp-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — finish">
			<origam-otp-input-field
					v-model="emitFinishModel"
					:length="4"
					label="Complete 4 digits"
					data-cy="otp-emit-finish"
					@finish="logEvent('finish', $event)"
			/>
			<div data-cy="otp-emit-finish-status">value = {{ emitFinishModel }}</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamOtpInputField } from '@origam/components'
	import { DENSITY, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IOtpInputFieldProps, IOptions } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	const lengthModel     = ref<string | null>(null)
	const typeModel       = ref<string | null>(null)
	const dividerModel    = ref<string | null>(null)
	const variantModel    = ref<string | null>(null)
	const colorModel      = ref<string | null>(null)
	const densityModel    = ref<string | null>(null)
	const statesModel     = ref<string | null>(null)
	const emitModel       = ref<string | null>(null)
	const emitFinishModel = ref<string | null>(null)
	const playgroundModel = ref<string | null>(null)

	const otpTypeList: Array<IOptions<string>> = [
		{ label: 'text',     value: 'text'     },
		{ label: 'password', value: 'password' },
		{ label: 'number',   value: 'number'   },
	]
</script>

<docs lang="md" src="@docs/components/OtpInputField/OrigamOtpInputField.md"/>
