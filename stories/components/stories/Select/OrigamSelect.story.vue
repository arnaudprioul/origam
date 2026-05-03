<template>
	<Story
			group="components"
			title="Select/OrigamSelect"
	>

		<!-- ════════════ ITEMS (string list) ════════════ -->
		<Variant title="Items — string list">
			<origam-select
					v-model="stringModel"
					:items="stringItems"
					label="Country"
					data-cy="select-string"
			/>
			<div data-cy="select-string-status">value = {{ stringModel }}</div>
		</Variant>

		<!-- ════════════ ITEMS (object list) ════════════ -->
		<Variant title="Items — object list">
			<origam-select
					v-model="objectModel"
					:items="objectItems"
					item-title="title"
					item-value="value"
					label="Country code"
					data-cy="select-object"
			/>
			<div data-cy="select-object-status">value = {{ objectModel }}</div>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<origam-select
					v-model="multipleModel"
					:items="stringItems"
					multiple
					label="Multiple countries"
					data-cy="select-multiple"
			/>
			<div data-cy="select-multiple-status">value = {{ multipleModel }}</div>
		</Variant>

		<!-- ════════════ CHIPS ════════════ -->
		<Variant
				title="Chips"
				:init-state="() => useStoryInitState<{ chips: boolean, closableChips: boolean }>({ chips: true, closableChips: false })"
		>
			<template #default="{ state }">
				<origam-select
						v-model="chipsModel"
						:items="stringItems"
						multiple
						:chips="state.chips"
						:closable-chips="state.closableChips"
						label="With chips"
						data-cy="select-chips"
				/>
				<div data-cy="select-chips-status">value = {{ chipsModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.chips"         title="chips"/>
				<HstCheckbox v-model="state.closableChips" title="closableChips"/>
			</template>
		</Variant>

		<!-- ════════════ AUTOCOMPLETE ════════════ -->
		<Variant
				title="Autocomplete"
				:init-state="() => useStoryInitState<{ autocomplete: boolean }>({ autocomplete: true })"
		>
			<template #default="{ state }">
				<origam-select
						v-model="autocompleteModel"
						:items="stringItems"
						:autocomplete="state.autocomplete"
						label="Search & select"
						data-cy="select-autocomplete"
				/>
				<div data-cy="select-autocomplete-status">value = {{ autocompleteModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.autocomplete" title="autocomplete"/>
			</template>
		</Variant>

		<!-- ════════════ VARIANT ════════════ -->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TVariant }>({ variant: undefined })"
		>
			<template #default="{ state }">
				<origam-select
						v-model="variantModel"
						:items="stringItems"
						:variant="state.variant"
						label="Variant"
						data-cy="select-variant"
				/>
				<div data-cy="select-variant-status">value = {{ variantModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="variantList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-select
						v-model="colorModel"
						:items="stringItems"
						:color="state.color"
						label="Colored select"
						data-cy="select-color"
				/>
				<div data-cy="select-color-status">value = {{ colorModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<origam-select
						v-model="statesModel"
						:items="stringItems"
						:disabled="state.disabled"
						:readonly="state.readonly"
						:error="state.error"
						:error-messages="state.error ? ['Please select an option'] : []"
						label="Stateful select"
						data-cy="select-states"
				/>
				<div data-cy="select-states-status">value = {{ statesModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<!-- ════════════ NO DATA ════════════ -->
		<Variant title="No data">
			<origam-select
					v-model="noDataModel"
					:items="[]"
					no-data-text="Nothing found"
					label="Empty list"
					data-cy="select-no-data"
			/>
		</Variant>

		<!-- ════════════ SLOT: prepend / append ════════════ -->
		<Variant title="Slot — prepend / append">
			<origam-select
					v-model="slotOuterModel"
					:items="stringItems"
					label="With outer slots"
					data-cy="select-slot-outer"
			>
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.EARTH"/>
				</template>
				<template #append>
					<origam-icon :icon="MDI_ICONS.STAR"/>
				</template>
			</origam-select>
			<div data-cy="select-slot-outer-status">value = {{ slotOuterModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-select
					v-model="emitModel"
					:items="stringItems"
					label="Select one"
					data-cy="select-emit-update"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
			<div data-cy="select-emit-status">value = {{ emitModel }}</div>
		</Variant>

		<!-- ════════════ EMIT: update:menu ════════════ -->
		<Variant title="Emit — update:menu">
			<origam-select
					v-model="emitMenuModel"
					:items="stringItems"
					label="Open / close dropdown"
					data-cy="select-emit-menu"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: click:clear ════════════ -->
		<Variant title="Emit — click:clear">
			<origam-select
					v-model="emitClearModel"
					:items="stringItems"
					clearable
					label="Clearable select"
					data-cy="select-emit-clear"
					@click:clear="logEvent('click:clear', $event)"
			/>
			<div data-cy="select-emit-clear-status">value = {{ emitClearModel }}</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISelectProps>({
					label: 'Select',
					color: 'primary',
					variant: undefined,
					density: undefined,
					multiple: false,
					chips: false,
					closableChips: false,
					autocomplete: false,
					clearable: false,
					disabled: false,
					readonly: false,
					error: false,
				})"
		>
			<template #default="{ state }">
				<origam-select
						v-model="playgroundModel"
						:items="stringItems"
						v-bind="state"
						data-cy="select-playground"
				/>
				<div data-cy="select-playground-status">value = {{ playgroundModel }}</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstSelect   v-model="state.color"         title="color"   :options="intentList"/>
				<HstSelect   v-model="state.variant"       title="variant" :options="variantList"/>
				<HstSelect   v-model="state.density"       title="density" :options="densityList"/>
				<HstCheckbox v-model="state.multiple"      title="multiple"/>
				<HstCheckbox v-model="state.chips"         title="chips"/>
				<HstCheckbox v-model="state.closableChips" title="closableChips"/>
				<HstCheckbox v-model="state.autocomplete"  title="autocomplete"/>
				<HstCheckbox v-model="state.clearable"     title="clearable"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
				<HstCheckbox v-model="state.error"         title="error"/>
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

	import { OrigamIcon, OrigamSelect } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, ISelectProps } from '@origam/interfaces'
	import type { TVariant } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, variantList } from '@stories/const'

	const stringItems = ['France', 'Germany', 'Spain', 'Italy', 'Portugal']
	const objectItems = [
		{ title: 'France',   value: 'fr' },
		{ title: 'Germany',  value: 'de' },
		{ title: 'Spain',    value: 'es' },
		{ title: 'Italy',    value: 'it' },
	]

	const stringModel       = ref<string | null>(null)
	const objectModel       = ref<string | null>(null)
	const multipleModel     = ref<string[]>([])
	const chipsModel        = ref<string[]>([])
	const autocompleteModel = ref<string | null>(null)
	const variantModel      = ref<string | null>(null)
	const colorModel        = ref<string | null>(null)
	const statesModel       = ref<string | null>(null)
	const noDataModel       = ref<string | null>(null)
	const slotOuterModel    = ref<string | null>(null)
	const emitModel         = ref<string | null>(null)
	const emitMenuModel     = ref<string | null>(null)
	const emitClearModel    = ref<string | null>(null)
	const playgroundModel   = ref<any>(null)
</script>

<docs lang="md" src="@docs/components/Select/OrigamSelect.md"/>
