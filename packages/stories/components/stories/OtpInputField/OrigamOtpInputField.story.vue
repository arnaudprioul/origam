<template>
	<Story
			group="components"
			title="OtpInputField/OrigamOtpInputField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Default"
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
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
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
				title="Prop — rules"
				:init-state="() => useStoryInitState<{ length: number }>({ length: 6 })"
		>
			<template #default="{ state }">
				<origam-otp-input-field
						v-model="rulesModel"
						:length="state.length"
						:rules="otpRules"
						label="Verification code (6 digits required)"
						validate-on="input"
						data-cy="otp-rules"
				/>
				<div data-cy="otp-rules-status">value = {{ rulesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.length" title="length" :min="4" :max="10"/>
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

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — appendInner">
			<origam-otp-input-field
					:length="6"
					label="Append inner slot"
					data-cy="otp-slot-append-inner"
			>
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.INFORMATION_OUTLINE"/>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — clear">
			<origam-otp-input-field
					:length="6"
					label="Clear slot"
					clearable
					data-cy="otp-slot-clear"
			>
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-otp-input-field
					:length="4"
					label="Default slot"
					data-cy="otp-slot-default"
			>
				<span>Custom slot content</span>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-otp-input-field
					:length="6"
					label="Floating label slot"
					data-cy="otp-slot-floating-label"
			>
				<template #floatingLabel>
					<span style="font-style: italic;">Custom floating label</span>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-otp-input-field
					:length="6"
					data-cy="otp-slot-label"
			>
				<template #label>
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">Custom label</span>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — loader">
			<origam-otp-input-field
					:length="6"
					loading
					label="Loading OTP"
					data-cy="otp-slot-loader"
			>
				<template #loader>
					<span>Loading…</span>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-otp-input-field
					:length="6"
					label="Prefix slot"
					data-cy="otp-slot-prefix"
			>
				<template #prefix>
					<span>+</span>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-otp-input-field
					:length="6"
					label="Prepend inner slot"
					data-cy="otp-slot-prepend-inner"
			>
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.LOCK_OUTLINE"/>
				</template>
			</origam-otp-input-field>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-otp-input-field
					:length="6"
					label="Suffix slot"
					data-cy="otp-slot-suffix"
			>
				<template #suffix>
					<span>OTP</span>
				</template>
			</origam-otp-input-field>
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

		<Variant title="Emit — click:clear">
			<origam-otp-input-field
					v-model="emitClearModel"
					:length="6"
					clearable
					label="Clearable OTP"
					data-cy="otp-emit-click-clear"
					@click:clear="logEvent('click:clear', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:control">
			<origam-otp-input-field
					:length="6"
					label="Click control"
					data-cy="otp-emit-click-control"
					@click:control="logEvent('click:control', $event)"
			/>
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

		<Variant title="Emit — mousedown:control">
			<origam-otp-input-field
					:length="6"
					label="Mousedown control"
					data-cy="otp-emit-mousedown-control"
					@mousedown:control="logEvent('mousedown:control', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamIcon, OrigamOtpInputField } from '@origam/components'
	import { useLocale } from '@origam/composables'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IOtpInputFieldProps, IOptions } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	const { t } = useLocale()

	const lengthModel     = ref<string | null>(null)
	const typeModel       = ref<string | null>(null)
	const dividerModel    = ref<string | null>(null)
	const variantModel    = ref<string | null>(null)
	const colorModel      = ref<string | null>(null)
	const densityModel    = ref<string | null>(null)
	const statesModel     = ref<string | null>(null)
	const rulesModel      = ref<string | null>(null)
	const emitModel        = ref<string | null>(null)
	const emitClearModel   = ref<string | null>(null)
	const emitFinishModel  = ref<string | null>(null)
	const playgroundModel  = ref<string | null>(null)

	const otpRules = [
		(v: string) => v.length === 6 || t('origam.validation.otp_incomplete', 'Code incomplet (6 chiffres requis)')
	]

	const otpTypeList: Array<IOptions<string>> = [
		{ label: 'text',     value: 'text'     },
		{ label: 'password', value: 'password' },
		{ label: 'number',   value: 'number'   },
	]
</script>

<docs lang="md" src="@docs/components/OtpInputField/OrigamOtpInputField.md"/>
