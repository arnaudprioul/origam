<template>
	<Story
			group="components"
			title="TextField/OrigamTextField"
	>

		<!-- ════════════ VARIANT ════════════ -->
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

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<!--
			ONE variant per interface — `IColorProps` covers `color`,
			`bgColor`, plus the `hover*` / `active*` state variants. All
			six fields surface together (Btn / Switch / SliderField /
			Select / RatingField / Radio / PasswordField pattern).
			Channel mapping (TextField family):
			  • `color`   → label + outline / underline accent
			  • `bgColor` → field surface
			  • hover/active modify the matching channel on the matching
			    state.
		-->
		<Variant
				title="Color"
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
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
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

		<!-- ════════════ TYPE ════════════ -->
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

		<!-- ════════════ COUNTER ════════════ -->
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

		<!-- ════════════ PREFIX / SUFFIX ════════════ -->
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

		<!-- ════════════ STATES ════════════ -->
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

		<!-- ════════════ SLOT: prependInner / appendInner ════════════ -->
		<Variant title="Slot — prependInner / appendInner">
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

		<!-- ════════════ SLOT: prepend / append ════════════ -->
		<Variant title="Slot — prepend / append">
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

		<!-- ════════════ SLOT: label ════════════ -->
		<Variant title="Slot — label">
			<origam-text-field v-model="slotLabelModel" data-cy="textfield-slot-label">
				<template #label>
					<span style="font-style: italic;">Custom label</span>
				</template>
			</origam-text-field>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-text-field
					v-model="emitModel"
					label="Type here"
					data-cy="textfield-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="textfield-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: focus / blur ════════════ -->
		<Variant title="Emit — focus / blur">
			<origam-text-field
					v-model="emitFocusModel"
					label="Focus & blur"
					data-cy="textfield-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: click:clear ════════════ -->
		<Variant title="Emit — click:clear">
			<origam-text-field
					v-model="emitClearModel"
					label="Clearable"
					clearable
					data-cy="textfield-emit-clear"
					@click:clear="logEvent('click:clear', $event)"
			/>
		</Variant>

		<!-- ════════════ LOADING SHAPES ════════════ -->
		<Variant title="Loading shapes">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
				<origam-text-field label="loading={true}" loading data-cy="text-field-loading-bool"/>
				<origam-text-field label="loading={42}" :loading="42" data-cy="text-field-loading-number"/>
				<origam-text-field label="loading={ type: 'line' }" :loading="{ type: 'line' }" data-cy="text-field-loading-line"/>
				<origam-text-field label="loading={ type: 'circular' }" :loading="{ type: 'circular' }" data-cy="text-field-loading-circular"/>
				<origam-text-field label="loading={ type: 'skeleton' }" :loading="{ type: 'skeleton' }" data-cy="text-field-loading-skeleton"/>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
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
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, IOptions, ITextFieldProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	const variantModel   = ref('')
	const colorModel     = ref('')
	const densityModel   = ref('')
	const typeModel      = ref('')
	const counterModel   = ref('')
	const prefixModel    = ref('')
	const statesModel    = ref('')
	const slotInnerModel = ref('')
	const slotOuterModel = ref('')
	const slotLabelModel = ref('')
	const emitModel      = ref('')
	const emitFocusModel = ref('')
	const emitClearModel = ref('')
	const playgroundModel = ref('')

	const typeList: Array<IOptions<string>> = [
		{ label: 'text',   value: 'text'   },
		{ label: 'email',  value: 'email'  },
		{ label: 'search', value: 'search' },
		{ label: 'tel',    value: 'tel'    },
		{ label: 'url',    value: 'url'    },
	]
</script>

<docs lang="md" src="@docs/components/TextField/OrigamTextField.md"/>
