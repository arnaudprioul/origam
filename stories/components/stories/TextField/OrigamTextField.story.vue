<template>
	<Story
			group="components"
			title="TextField/OrigamTextField"
	>

		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="variantModel"
						:variant="state.variant"
						label="Label"
						data-cy="textfield-variant"
				/>
				<div data-cy="textfield-variant-status">value = {{ variantModel }}</div>
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
					<origam-text-field
							v-model="colorModel"
							v-bind="state"
							label="Colored field (interactive)"
							data-cy="textfield-color"
					/>
					<div data-cy="textfield-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-text-field :model-value="'Sample text'"
						                   color="primary"
						                   label='color="primary" only'
						                   data-cy="textfield-color-fixture-color-only"/>
						<origam-text-field :model-value="'Sample text'"
						                   bg-color="success"
						                   label='bg-color="success" only'
						                   data-cy="textfield-color-fixture-bg-only"/>
						<origam-text-field :model-value="'Sample text'"
						                   color="warning" bg-color="primary"
						                   label='color="warning" + bg-color="primary"'
						                   data-cy="textfield-color-fixture-combo"/>
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
					<origam-text-field
							v-model="colorModel"
							v-bind="state"
							label="Colored field (interactive)"
							data-cy="textfield-color"
					/>
					<div data-cy="textfield-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-text-field :model-value="'Sample text'"
						                   color="primary"
						                   label='color="primary" only'
						                   data-cy="textfield-color-fixture-color-only"/>
						<origam-text-field :model-value="'Sample text'"
						                   bg-color="success"
						                   label='bg-color="success" only'
						                   data-cy="textfield-color-fixture-bg-only"/>
						<origam-text-field :model-value="'Sample text'"
						                   color="warning" bg-color="primary"
						                   label='color="warning" + bg-color="primary"'
						                   data-cy="textfield-color-fixture-combo"/>
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
					<origam-text-field
							v-model="colorModel"
							v-bind="state"
							label="Colored field (interactive)"
							data-cy="textfield-color"
					/>
					<div data-cy="textfield-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-text-field :model-value="'Sample text'"
						                   color="primary"
						                   label='color="primary" only'
						                   data-cy="textfield-color-fixture-color-only"/>
						<origam-text-field :model-value="'Sample text'"
						                   bg-color="success"
						                   label='bg-color="success" only'
						                   data-cy="textfield-color-fixture-bg-only"/>
						<origam-text-field :model-value="'Sample text'"
						                   color="warning" bg-color="primary"
						                   label='color="warning" + bg-color="primary"'
						                   data-cy="textfield-color-fixture-combo"/>
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
				title="Size"
				:init-state="() => useStoryInitState<{ size: TSize }>({ size: SIZES.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-text-field
							v-model="sizeModel"
							:size="state.size"
							label="Size field (interactive)"
							data-cy="textfield-size"
					/>
					<div data-cy="textfield-size-status">size = {{ state.size }} · value = {{ sizeModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase — Sizes side by side (PDF heights: 28 / 36 / 44 / 52 px)</small>
						<origam-text-field size="small"   label='size="small" — 28px'   data-cy="textfield-size-fixture-sm"/>
						<origam-text-field size="default" label='size="default" — 36px' data-cy="textfield-size-fixture-md"/>
						<origam-text-field size="large"   label='size="large" — 44px'   data-cy="textfield-size-fixture-lg"/>
						<origam-text-field size="x-large" label='size="x-large" — 52px' data-cy="textfield-size-fixture-xl"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="densityModel"
						:density="state.density"
						label="Density field"
						data-cy="textfield-density"
				/>
				<div data-cy="textfield-density-status">value = {{ densityModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Type"
				:init-state="() => useStoryInitState<{ type: string }>({ type: 'text' })"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="typeModel"
						:type="state.type"
						label="Field type"
						data-cy="textfield-type"
				/>
				<div data-cy="textfield-type-status">value = {{ typeModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type" title="type" :options="typeList"/>
			</template>
		</Variant>

		<Variant
				title="Counter"
				:init-state="() => useStoryInitState<{ counter: number | boolean }>({ counter: 100 })"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="counterModel"
						:counter="state.counter"
						label="With counter"
						data-cy="textfield-counter"
				/>
				<div data-cy="textfield-counter-status">value = {{ counterModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.counter" title="counter (boolean or number)"/>
			</template>
		</Variant>

		<Variant
				title="Prefix & suffix"
				:init-state="() => useStoryInitState<{ prefix: string, suffix: string }>({ prefix: '$', suffix: '.00' })"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="prefixModel"
						:prefix="state.prefix"
						:suffix="state.suffix"
						label="Price"
						data-cy="textfield-prefix"
				/>
				<div data-cy="textfield-prefix-status">value = {{ prefixModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.prefix" title="prefix"/>
				<HstText v-model="state.suffix" title="suffix"/>
			</template>
		</Variant>

		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['This field has an error'] : []"
						label="Stateful field"
						data-cy="textfield-states"
				/>
				<div data-cy="textfield-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-text-field v-model="slotOuterModel" label="With outer slots" data-cy="textfield-slot-outer">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.ACCOUNT"/>
				</template>
				<template #append>
					<origam-icon :icon="MDI_ICONS.STAR"/>
				</template>
			</origam-text-field>
			<div data-cy="textfield-slot-outer-status">value = {{ slotOuterModel }}</div>
		</Variant>

		<Variant title="Slot — appendInner">
			<origam-text-field v-model="slotInnerModel" label="With inner slots" data-cy="textfield-slot-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
				</template>
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.CLOSE"/>
				</template>
			</origam-text-field>
			<div data-cy="textfield-slot-inner-status">value = {{ slotInnerModel }}</div>
		</Variant>

		<Variant title="Slot — clear">
			<origam-text-field v-model="slotClearModel" label="Clearable" clearable data-cy="textfield-slot-clear">
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — counter">
			<origam-text-field v-model="slotCounterModel" label="Custom counter" :counter="50" data-cy="textfield-slot-counter">
				<template #counter>
					<span>{{ slotCounterModel.length }} / 50</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-text-field label="Default slot" data-cy="textfield-slot-default">
				<span>Custom slot content</span>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — details">
			<origam-text-field v-model="slotDetailsModel" label="Custom details" data-cy="textfield-slot-details">
				<template #details>
					<span style="font-size: 0.75rem;">Custom hint text</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — field">
			<origam-text-field label="Field slot" data-cy="textfield-slot-field">
				<template #field>
					<span>Custom slot content</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-text-field v-model="slotFloatingLabelModel" data-cy="textfield-slot-floating-label">
				<template #floatingLabel>
					<span style="font-style: italic;">Floating label</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-text-field v-model="slotLabelModel" data-cy="textfield-slot-label">
				<template #label>
					<span style="font-style: italic;">Custom label</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — loader">
			<origam-text-field loading label="Loading field" data-cy="textfield-slot-loader">
				<template #loader>
					<span>Loading...</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — message">
			<origam-text-field v-model="slotMessageModel" label="Single message" :error="true" :error-messages="['Error']" data-cy="textfield-slot-message">
				<template #message="{ message }">
					<span style="font-style: italic;">{{ message }}</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — messages">
			<origam-text-field v-model="slotMessagesModel" label="Custom messages" :error="true" :error-messages="['Error one', 'Error two']" data-cy="textfield-slot-messages">
				<template #messages>
					<span style="color: var(--origam-color__action--danger---bg);">Custom error display</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-text-field v-model="slotPrefixModel" label="Price" data-cy="textfield-slot-prefix">
				<template #prefix>
					<span>$</span>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-text-field v-model="slotOuterModel" label="With outer slots" data-cy="textfield-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.ACCOUNT"/>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-text-field v-model="slotInnerModel" label="With inner slots" data-cy="textfield-slot-prepend-inner">
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
				</template>
			</origam-text-field>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-text-field v-model="slotSuffixModel" label="Amount" data-cy="textfield-slot-suffix">
				<template #suffix>
					<span>.00</span>
				</template>
			</origam-text-field>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — click:control">
			<origam-text-field
					v-model="emitControlModel"
					label="Click the control"
					data-cy="textfield-emit-click-control"
					@click:control="logEvent('click:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — mousedown:control">
			<origam-text-field
					v-model="emitMousedownModel"
					label="Mousedown on control"
					data-cy="textfield-emit-mousedown-control"
					@mousedown:control="logEvent('mousedown:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-text-field
					v-model="emitModel"
					label="Type here"
					data-cy="textfield-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="textfield-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<Variant title="Emit — focus / blur">
			<origam-text-field
					v-model="emitFocusModel"
					label="Focus & blur"
					data-cy="textfield-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:clear">
			<origam-text-field
					v-model="emitClearModel"
					label="Clearable"
					clearable
					data-cy="textfield-emit-clear"
					@click:clear="logEvent('click:clear', $event)"
			/>
		</Variant>

		<Variant
				title="Loading — interactive"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'line',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-text-field
							:loading="resolveTextFieldLoading(state)"
							label="Demo field"
							data-cy="textfield-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeTextFieldLoading(state) }}</pre>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.enabled" title="enabled (loading)"/>
				<HstSelect
						v-model="state.kind"
						title="kind"
						:options="[
							{ label: 'true (default)', value: 'bool' },
							{ label: 'number', value: 'number' },
							{ label: '{ type: line }', value: 'line' },
							{ label: '{ type: circular }', value: 'circular' },
							{ label: '{ type: skeleton }', value: 'skeleton' }
						]"
				/>
				<HstNumber v-model="state.progress" title="progress (when kind=number)" :min="0" :max="100" :step="1"/>
				<HstNumber v-model="state.circularSize" title="circular size (when kind=circular)" :min="12" :max="64" :step="2"/>
			</template>
		</Variant>

		<Variant title="Loading shapes">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
				<origam-text-field label="loading={true}" loading data-cy="text-field-loading-bool"/>
				<origam-text-field label="loading={42}" :loading="42" data-cy="text-field-loading-number"/>
				<origam-text-field label="loading={ type: 'line' }" :loading="{ type: 'line' }" data-cy="text-field-loading-line"/>
				<origam-text-field label="loading={ type: 'circular' }" :loading="{ type: 'circular' }" data-cy="text-field-loading-circular"/>
				<origam-text-field label="loading={ type: 'skeleton' }" :loading="{ type: 'skeleton' }" data-cy="text-field-loading-skeleton"/>
			</div>
		</Variant>

		<Variant title="Inline">
			<div style="display: flex; align-items: baseline; gap: 8px; padding: 16px; font-size: 16px;">
				<span>Origam</span>
				<span aria-hidden="true">·</span>
				<origam-text-field
						v-model="inlineModel"
						:inline="true"
						placeholder="Your value"
						data-cy="textfield-inline"
						aria-label="Inline editable value"
				/>
			</div>
			<div data-cy="textfield-inline-status">value = {{ inlineModel }}</div>
		</Variant>

		<!-- ── Mask ──────────────────────────────────────────────── -->

		<Variant
				title="Prop — mask (built-in patterns)"
				:init-state="() => useStoryInitState<{ pattern: string }>({ pattern: 'phone:fr' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-text-field
							v-model="maskBuiltinModel"
							:mask="state.pattern"
							label="Type a value"
							data-cy="textfield-mask-builtin"
							@valid="onMaskValid"
							@complete="onMaskComplete"
					/>
					<div data-cy="textfield-mask-builtin-status">
						unmasked = {{ maskBuiltinModel }} · valid = {{ maskBuiltinValid }} · complete = {{ maskBuiltinComplete }}
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.pattern" title="pattern" :options="maskBuiltinList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — mask (custom pattern)"
				:init-state="() => useStoryInitState<{ pattern: string }>({ pattern: '(##) ###-####' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-text-field
							v-model="maskCustomModel"
							:mask="state.pattern"
							label="Custom pattern"
							data-cy="textfield-mask-custom"
					/>
					<div data-cy="textfield-mask-custom-status">
						unmasked = {{ maskCustomModel }}
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.pattern" title="pattern (# digit · A letter · * any · rest = literal)"/>
			</template>
		</Variant>

		<Variant title="Prop — mask (credit card with Luhn)">
			<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
				<origam-text-field
						v-model="maskCreditModel"
						mask="creditcard"
						label="Card number"
						data-cy="textfield-mask-creditcard"
				/>
				<div data-cy="textfield-mask-creditcard-status">
					unmasked = {{ maskCreditModel }}
				</div>
				<small>Try 4111 1111 1111 1111 (valid Visa). Anything random will fail Luhn.</small>
			</div>
		</Variant>

		<Variant title="Prop — mask (IBAN)">
			<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
				<origam-text-field
						v-model="maskIbanModel"
						mask="iban"
						label="IBAN"
						data-cy="textfield-mask-iban"
				/>
				<div data-cy="textfield-mask-iban-status">
					unmasked = {{ maskIbanModel }}
				</div>
				<small>Try GB82WEST12345698765432 (valid). The check is real mod-97.</small>
			</div>
		</Variant>

		<Variant title="Emit — valid / complete">
			<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px;">
				<origam-text-field
						v-model="maskEmitModel"
						mask="phone:fr"
						label="French mobile"
						data-cy="textfield-mask-emit"
						@valid="onMaskEmitValid"
						@complete="onMaskEmitComplete"
				/>
				<div data-cy="textfield-mask-emit-status">
					valid-emits = {{ maskEmitValidCount }} · complete-emits = {{ maskEmitCompleteCount }}
				</div>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITextFieldProps>({
					label: 'Full name',
					color: 'primary',
					variant: undefined,
					density: undefined,
					type: 'text',
					placeholder: '',
					counter: false,
					clearable: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-text-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="textfield-playground"
				/>
				<div data-cy="textfield-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"       title="label"/>
				<HstText     v-model="state.placeholder" title="placeholder"/>
				<HstSelect   v-model="state.color"       title="color"   :options="intentList"/>
				<HstSelect   v-model="state.variant"     title="variant" :options="variantInputList"/>
				<HstSelect   v-model="state.density"     title="density" :options="densityList"/>
				<HstSelect   v-model="state.type"        title="type"    :options="typeList"/>
				<HstCheckbox v-model="state.counter"     title="counter"/>
				<HstCheckbox v-model="state.clearable"   title="clearable"/>
				<HstCheckbox v-model="state.disabled"    title="disabled"/>
				<HstCheckbox v-model="state.readonly"    title="readonly"/>
				<HstCheckbox v-model="state.error"       title="error"/>
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

	import { OrigamIcon, OrigamTextField } from '@origam/components'
	import { DENSITY, MDI_ICONS, SIZES, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IOptions, ITextFieldProps } from '@origam/interfaces'
	import type { TLoadingValue, TSize, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, sizeList, variantInputList,
		hoverList
	} from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveTextFieldLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeTextFieldLoading = (state: ILoadingState): string => {
		const v = resolveTextFieldLoading(state)
		return JSON.stringify(v, null, 2)
	}

	const variantModel          = ref('')
	const colorModel            = ref('')
	const sizeModel             = ref('')
	const inlineModel           = ref('')
	const densityModel          = ref('')
	const typeModel             = ref('')
	const counterModel          = ref('')
	const prefixModel           = ref('')
	const statesModel           = ref('')
	const slotInnerModel        = ref('')
	const slotOuterModel        = ref('')
	const slotLabelModel        = ref('')
	const slotClearModel        = ref('')
	const slotCounterModel      = ref('')
	const slotDetailsModel      = ref('')
	const slotFloatingLabelModel = ref('')
	const slotMessageModel      = ref('')
	const slotMessagesModel     = ref('')
	const slotPrefixModel       = ref('')
	const slotSuffixModel       = ref('')
	const emitModel             = ref('')
	const emitFocusModel        = ref('')
	const emitClearModel        = ref('')
	const emitControlModel      = ref('')
	const emitMousedownModel    = ref('')
	const playgroundModel       = ref('')

	const maskBuiltinModel      = ref('')
	const maskBuiltinValid      = ref(true)
	const maskBuiltinComplete   = ref(false)
	const maskCustomModel       = ref('')
	const maskCreditModel       = ref('')
	const maskIbanModel         = ref('')
	const maskEmitModel         = ref('')
	const maskEmitValidCount    = ref(0)
	const maskEmitCompleteCount = ref(0)

	const onMaskValid = (v: boolean): void => {
		maskBuiltinValid.value = v
		logEvent('valid', v)
	}
	const onMaskComplete = (payload: { complete: boolean, unmasked: string }): void => {
		maskBuiltinComplete.value = payload.complete
		logEvent('complete', payload)
	}
	const onMaskEmitValid = (v: boolean): void => {
		maskEmitValidCount.value++
		logEvent('valid', v)
	}
	const onMaskEmitComplete = (payload: { complete: boolean, unmasked: string }): void => {
		maskEmitCompleteCount.value++
		logEvent('complete', payload)
	}

	const maskBuiltinList: Array<IOptions<string>> = [
		{ label: 'phone:fr',             value: 'phone:fr'             },
		{ label: 'phone:us',             value: 'phone:us'             },
		{ label: 'phone:international',  value: 'phone:international'  },
		{ label: 'iban',                 value: 'iban'                 },
		{ label: 'siret',                value: 'siret'                },
		{ label: 'creditcard',           value: 'creditcard'           },
		{ label: 'date:iso',             value: 'date:iso'             },
		{ label: 'date:fr',              value: 'date:fr'              },
		{ label: 'date:us',              value: 'date:us'              },
		{ label: 'time',                 value: 'time'                 },
		{ label: 'time:12h',             value: 'time:12h'             },
		{ label: 'postcode:fr',          value: 'postcode:fr'          },
		{ label: 'postcode:us',          value: 'postcode:us'          },
	]

	const typeList: Array<IOptions<string>> = [
		{ label: 'text',   value: 'text'   },
		{ label: 'email',  value: 'email'  },
		{ label: 'search', value: 'search' },
		{ label: 'tel',    value: 'tel'    },
		{ label: 'url',    value: 'url'    },
	]
</script>

<docs lang="md" src="@docs/components/TextField/OrigamTextField.md"/>
