<template>
	<Story
			group="components"
			title="Select/OrigamSelect"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Default"
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
				<HstSelect   v-model="state.variant"       title="variant" :options="variantInputList"/>
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

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant title="Prop — items (string list)">
			<origam-select
					v-model="stringModel"
					:items="stringItems"
					label="Country"
					data-cy="select-string"
			/>
			<div data-cy="select-string-status">value = {{ stringModel }}</div>
		</Variant>

		<Variant title="Prop — items (object list)">
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

		<Variant title="Prop — multiple">
			<origam-select
					v-model="multipleModel"
					:items="stringItems"
					multiple
					label="Multiple countries"
					data-cy="select-multiple"
			/>
			<div data-cy="select-multiple-status">value = {{ multipleModel }}</div>
		</Variant>

		<Variant
				title="Prop — chips & closableChips"
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

		<Variant
				title="Prop — autocomplete"
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

		<Variant
				title="Prop — variant"
				:init-state="() => useStoryInitState<{ variant?: TVariantInput }>({ variant: VARIANT_INPUT.OUTLINED })"
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
				<HstSelect v-model="state.variant" title="variant" :options="variantInputList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-select
							v-model="colorModel"
							:items="stringItems"
							v-bind="state"
							label="Colored select (interactive)"
							data-cy="select-color"
					/>
					<div data-cy="select-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-select :items="stringItems" :model-value="'France'"
						               color="primary"
						               label='color="primary" only'
						               data-cy="select-color-fixture-color-only"/>
						<origam-select :items="stringItems" :model-value="'France'"
						               bg-color="success"
						               label='bg-color="success" only'
						               data-cy="select-color-fixture-bg-only"/>
						<origam-select :items="stringItems" :model-value="'France'"
						               color="warning" bg-color="primary"
						               label='color="warning" + bg-color="primary"'
						               data-cy="select-color-fixture-combo"/>
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
					<origam-select
							v-model="colorModel"
							:items="stringItems"
							v-bind="state"
							label="Colored select (interactive)"
							data-cy="select-color"
					/>
					<div data-cy="select-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-select :items="stringItems" :model-value="'France'"
						               color="primary"
						               label='color="primary" only'
						               data-cy="select-color-fixture-color-only"/>
						<origam-select :items="stringItems" :model-value="'France'"
						               bg-color="success"
						               label='bg-color="success" only'
						               data-cy="select-color-fixture-bg-only"/>
						<origam-select :items="stringItems" :model-value="'France'"
						               color="warning" bg-color="primary"
						               label='color="warning" + bg-color="primary"'
						               data-cy="select-color-fixture-combo"/>
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
					<origam-select
							v-model="colorModel"
							:items="stringItems"
							v-bind="state"
							label="Colored select (interactive)"
							data-cy="select-color"
					/>
					<div data-cy="select-color-status">value = {{ colorModel }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-select :items="stringItems" :model-value="'France'"
						               color="primary"
						               label='color="primary" only'
						               data-cy="select-color-fixture-color-only"/>
						<origam-select :items="stringItems" :model-value="'France'"
						               bg-color="success"
						               label='bg-color="success" only'
						               data-cy="select-color-fixture-bg-only"/>
						<origam-select :items="stringItems" :model-value="'France'"
						               color="warning" bg-color="primary"
						               label='color="warning" + bg-color="primary"'
						               data-cy="select-color-fixture-combo"/>
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
				title="Prop — disabled, readonly & error"
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

		<Variant title="Prop — noDataText (empty items)">
			<origam-select
					v-model="noDataModel"
					:items="[]"
					no-data-text="Nothing found"
					label="Empty list"
					data-cy="select-no-data"
			/>
		</Variant>

		<Variant
				title="Prop — loading (interactive)"
				:init-state="() => useStoryInitState({
					enabled: true,
					kind: 'line',
					progress: 42,
					circularSize: 24
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; max-width: 480px;">
					<origam-select
							:items="stringItems"
							:loading="resolveSelectLoading(state)"
							label="Demo field"
							data-cy="select-loading-interactive"
					/>
					<pre style="margin-top: 16px; padding: 12px; background: var(--origam-color__surface---overlay); border-radius: 8px; font-size: 12px;">loading = {{ describeSelectLoading(state) }}</pre>
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

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — prepend & append">
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

		<Variant title="Slot — append">
			<origam-select
					:items="stringItems"
					label="Append slot"
					data-cy="select-slot-append"
			>
				<template #append>
					<origam-icon :icon="MDI_ICONS.STAR"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — appendInner">
			<origam-select
					:items="stringItems"
					label="Append inner slot"
					data-cy="select-slot-append-inner"
			>
				<template #appendInner>
					<origam-icon :icon="MDI_ICONS.INFORMATION_OUTLINE"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — chip">
			<origam-select
					v-model="chipSlotModel"
					:items="stringItems"
					multiple
					chips
					label="Chip slot"
					data-cy="select-slot-chip"
			>
				<template #chip="{ item }">
					<origam-chip :text="String(item.title ?? item.value ?? item)" color="primary" data-cy="select-slot-chip-item"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — clear">
			<origam-select
					v-model="clearSlotModel"
					:items="stringItems"
					clearable
					label="Clear slot"
					data-cy="select-slot-clear"
			>
				<template #clear>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — floatingLabel">
			<origam-select
					:items="stringItems"
					label="Floating label slot"
					data-cy="select-slot-floating-label"
			>
				<template #floatingLabel>
					<span style="font-style: italic;">Custom floating label</span>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — item">
			<origam-select
					v-model="itemSlotModel"
					:items="stringItems"
					label="Item slot"
					data-cy="select-slot-item"
			>
				<template #item="{ item, props: itemProps }">
					<li v-bind="itemProps" style="padding: 8px 16px; cursor: pointer; list-style: none;">
						<origam-icon :icon="MDI_ICONS.EARTH"/>
						{{ item.title ?? item.value ?? item }}
					</li>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — items.append">
			<origam-select
					:items="stringItems"
					label="Items append slot"
					data-cy="select-slot-items-append"
			>
				<template #items.append>
					<div style="padding: 8px 16px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
						End of list
					</div>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — items.prepend">
			<origam-select
					:items="stringItems"
					label="Items prepend slot"
					data-cy="select-slot-items-prepend"
			>
				<template #items.prepend>
					<div style="padding: 8px 16px; font-size: 0.75rem; color: var(--origam-color__text---secondary);">
						Start of list
					</div>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — label">
			<origam-select
					:items="stringItems"
					data-cy="select-slot-label"
			>
				<template #label>
					<span style="font-style: italic; color: var(--origam-color__action--primary---bg);">Custom label</span>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — loader">
			<origam-select
					:items="stringItems"
					loading
					label="Loading select"
					data-cy="select-slot-loader"
			>
				<template #loader>
					<span>Loading…</span>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — noData">
			<origam-select
					:items="[]"
					label="No data slot"
					data-cy="select-slot-no-data"
			>
				<template #noData>
					<div style="padding: 16px; text-align: center; color: var(--origam-color__text---secondary);">
						Nothing to show here
					</div>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — prefix">
			<origam-select
					:items="stringItems"
					label="Prefix slot"
					data-cy="select-slot-prefix"
			>
				<template #prefix>
					<span>+33</span>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-select
					:items="stringItems"
					label="Prepend slot"
					data-cy="select-slot-prepend"
			>
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.EARTH"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — prependInner">
			<origam-select
					:items="stringItems"
					label="Prepend inner slot"
					data-cy="select-slot-prepend-inner"
			>
				<template #prependInner>
					<origam-icon :icon="MDI_ICONS.MAGNIFY"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — selection">
			<origam-select
					v-model="selectionSlotModel"
					:items="stringItems"
					multiple
					label="Selection slot"
					data-cy="select-slot-selection"
			>
				<template #selection="{ item }">
					<origam-chip :text="String(item.title ?? item.value ?? item)" size="small" data-cy="select-slot-selection-chip"/>
				</template>
			</origam-select>
		</Variant>

		<Variant title="Slot — suffix">
			<origam-select
					:items="stringItems"
					label="Suffix slot"
					data-cy="select-slot-suffix"
			>
				<template #suffix>
					<span>kg</span>
				</template>
			</origam-select>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

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

		<Variant title="Emit — update:menu">
			<origam-select
					v-model="emitMenuModel"
					:items="stringItems"
					label="Open / close dropdown"
					data-cy="select-emit-menu"
					@update:menu="logEvent('update:menu', $event)"
			/>
		</Variant>

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

		<Variant title="Emit — click:append">
			<origam-select
					:items="stringItems"
					:append-icon="MDI_ICONS.STAR"
					label="Click append icon"
					data-cy="select-emit-click-append"
					@click:append="logEvent('click:append', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:appendInner">
			<origam-select
					:items="stringItems"
					:append-inner-icon="MDI_ICONS.INFORMATION_OUTLINE"
					label="Click append inner icon"
					data-cy="select-emit-click-append-inner"
					@click:appendInner="logEvent('click:appendInner', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:control">
			<origam-select
					:items="stringItems"
					label="Click control"
					data-cy="select-emit-click-control"
					@click:control="logEvent('click:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:prepend">
			<origam-select
					:items="stringItems"
					:prepend-icon="MDI_ICONS.EARTH"
					label="Click prepend icon"
					data-cy="select-emit-click-prepend"
					@click:prepend="logEvent('click:prepend', $event)"
			/>
		</Variant>

		<Variant title="Emit — click:prependInner">
			<origam-select
					:items="stringItems"
					:prepend-inner-icon="MDI_ICONS.MAGNIFY"
					label="Click prepend inner icon"
					data-cy="select-emit-click-prepend-inner"
					@click:prependInner="logEvent('click:prependInner', $event)"
			/>
		</Variant>

		<Variant title="Emit — mousedown:control">
			<origam-select
					:items="stringItems"
					label="Mousedown control"
					data-cy="select-emit-mousedown-control"
					@mousedown:control="logEvent('mousedown:control', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:focused">
			<origam-select
					:items="stringItems"
					label="Focus the select"
					data-cy="select-emit-update-focused"
					@update:focused="logEvent('update:focused', $event)"
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

	import { OrigamChip, OrigamIcon, OrigamSelect } from '@origam/components'
	import { DENSITY, MDI_ICONS, VARIANT_INPUT } from '@origam/enums'
	import type { IColorProps, IDensityProps, ISelectProps } from '@origam/interfaces'
	import type { TLoadingValue, TVariantInput } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, variantInputList,
		hoverList
	} from '@stories/const'

	interface ILoadingState {
		enabled: boolean
		kind: 'bool' | 'number' | 'line' | 'circular' | 'skeleton'
		progress: number
		circularSize: number
	}

	const resolveSelectLoading = (state: ILoadingState): TLoadingValue => {
		if (!state.enabled) return false
		if (state.kind === 'bool') return true
		if (state.kind === 'number') return state.progress
		if (state.kind === 'line') return { type: 'line' }
		if (state.kind === 'circular') return { type: 'circular', size: state.circularSize }
		if (state.kind === 'skeleton') return { type: 'skeleton' }
		return false
	}

	const describeSelectLoading = (state: ILoadingState): string => {
		const v = resolveSelectLoading(state)
		return JSON.stringify(v, null, 2)
	}

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
	const chipSlotModel     = ref<string[]>([])
	const clearSlotModel    = ref<string | null>(null)
	const itemSlotModel     = ref<string | null>(null)
	const selectionSlotModel = ref<string[]>([])
	const emitModel         = ref<string | null>(null)
	const emitMenuModel     = ref<string | null>(null)
	const emitClearModel    = ref<string | null>(null)
	const playgroundModel   = ref<any>(null)
</script>

<docs lang="md" src="@docs/components/Select/OrigamSelect.md"/>
