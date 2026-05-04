<template>
	<Story
			group="components"
			title="TextareaField/OrigamTextareaField"
	>

		<!-- ════════════ VARIANT ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="variantModel"
						:variant="state.variant"
						label="Label"
						data-cy="textarea-variant"
				/>
				<div data-cy="textarea-variant-status">value = {{ variantModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<!-- ════════════ ROWS ════════════ -->
		<Variant
				title="Rows"
				:init-state="() => useStoryInitState<{ rows: number, autoGrow: boolean, maxRows: number }>({ rows: 3, autoGrow: false, maxRows: 8 })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="rowsModel"
						:rows="state.rows"
						:auto-grow="state.autoGrow"
						:max-rows="state.maxRows"
						label="Rows config"
						data-cy="textarea-rows"
				/>
				<div data-cy="textarea-rows-status">value = {{ rowsModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider   v-model="state.rows"     title="rows"     :min="1" :max="10"/>
				<HstCheckbox v-model="state.autoGrow" title="autoGrow"/>
				<HstSlider   v-model="state.maxRows"  title="maxRows"  :min="1" :max="20"/>
			</template>
		</Variant>

		<!-- ════════════ NO RESIZE ════════════ -->
		<Variant
				title="No resize"
				:init-state="() => useStoryInitState<{ noResize: boolean }>({ noResize: true })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="noResizeModel"
						:no-resize="state.noResize"
						label="No resize"
						data-cy="textarea-no-resize"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.noResize" title="noResize"/>
			</template>
		</Variant>

		<!-- ════════════ COUNTER ════════════ -->
		<Variant
				title="Counter"
				:init-state="() => useStoryInitState<{ counter: number }>({ counter: 500 })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="counterModel"
						:counter="state.counter"
						label="With counter"
						data-cy="textarea-counter"
				/>
				<div data-cy="textarea-counter-status">value = {{ counterModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.counter" title="counter (max chars)" :min="10" :max="2000"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="statesModel"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Content too long'] : []"
						label="Stateful textarea"
						data-cy="textarea-states"
				/>
				<div data-cy="textarea-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: prepend / append ════════════ -->
		<Variant title="Slot — prepend / append">
			<origam-textarea-field v-model="slotOuterModel" label="With outer slots" data-cy="textarea-slot-outer">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.TEXT_BOX"/>
				</template>
				<template #append>
					<origam-icon :icon="MDI_ICONS.STAR"/>
				</template>
			</origam-textarea-field>
			<div data-cy="textarea-slot-outer-status">value = {{ slotOuterModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-textarea-field
					v-model="emitModel"
					label="Type here"
					data-cy="textarea-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="textarea-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: focus / blur ════════════ -->
		<Variant title="Emit — focus / blur">
			<origam-textarea-field
					v-model="emitFocusModel"
					label="Focus & blur"
					data-cy="textarea-emit-focus"
					@focus="logEvent('focus', $event)"
					@blur="logEvent('blur', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:height ════════════ -->
		<Variant title="Emit — update:height">
			<origam-textarea-field
					v-model="emitHeightModel"
					label="Auto-grow (watch height)"
					auto-grow
					data-cy="textarea-emit-height"
					@update:height="logEvent('update:height', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ITextareaFieldProps>({
					label: 'Message',
					color: 'primary',
					variant: undefined,
					density: undefined,
					rows: 4,
					autoGrow: false,
					noResize: false,
					counter: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-textarea-field
						v-model="playgroundModel"
						v-bind="state"
						data-cy="textarea-playground"
				/>
				<div data-cy="textarea-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"   title="label"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.variant" title="variant" :options="variantInputList"/>
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstSlider   v-model="state.rows"    title="rows"    :min="1" :max="12"/>
				<HstCheckbox v-model="state.autoGrow"  title="autoGrow"/>
				<HstCheckbox v-model="state.noResize"  title="noResize"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.error"     title="error"/>
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

	import { OrigamIcon, OrigamTextareaField } from '@origam/components'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, ITextareaFieldProps } from '@origam/interfaces'
	import type { TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantInputList } from '@stories/const'

	const variantModel    = ref('')
	const rowsModel       = ref('')
	const noResizeModel   = ref('')
	const counterModel    = ref('')
	const statesModel     = ref('')
	const slotOuterModel  = ref('')
	const emitModel       = ref('')
	const emitFocusModel  = ref('')
	const emitHeightModel = ref('')
	const playgroundModel = ref('')
</script>

<docs lang="md" src="@docs/components/TextareaField/OrigamTextareaField.md"/>
