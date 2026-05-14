<template>
	<Story
			group="components"
			title="Checkbox/OrigamCheckboxBtn"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ICheckboxBtnProps>({
					label: 'Accept terms',
					indeterminate: false,
					disabled: false,
					readonly: false,
					color: undefined,
					trueIcon: MDI_ICONS.CHECKBOX_MARKED,
					falseIcon: MDI_ICONS.CHECKBOX_BLANK_OUTLINE,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-checkbox-btn
							v-model="playgroundModel"
							v-bind="state"
							data-cy="checkbox-btn-playground"
					/>
					<div data-cy="checkbox-btn-playground-status">value = {{ playgroundModel }}</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"         title="label"/>
				<HstCheckbox v-model="state.indeterminate" title="indeterminate"/>
				<HstCheckbox v-model="state.disabled"      title="disabled"/>
				<HstCheckbox v-model="state.readonly"      title="readonly"/>
				<HstSelect   v-model="state.color"         title="color"     :options="intentList"/>
				<HstSelect   v-model="state.trueIcon"      title="trueIcon"  :options="iconList"/>
				<HstSelect   v-model="state.falseIcon"     title="falseIcon" :options="iconList"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant title="Prop — modelValue (checked / unchecked)">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
				<origam-checkbox-btn
						v-model="checkedModel"
						label="Interactive checkbox button"
						data-cy="checkbox-btn-model"
				/>
				<div data-cy="checkbox-btn-model-status">value = {{ checkedModel }}</div>
			</div>
		</Variant>

		<Variant title="Prop — indeterminate">
			<div style="padding: 24px;">
				<origam-checkbox-btn
						:indeterminate="true"
						label="Partial selection"
						data-cy="checkbox-btn-indeterminate"
				/>
			</div>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-checkbox-btn
							v-bind="state"
							:model-value="true"
							label="Tinted checkbox button"
							data-cy="checkbox-btn-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-checkbox-btn
							v-bind="state"
							:hover="state._hHover" :model-value="true"
							label="Tinted checkbox button"
							data-cy="checkbox-btn-color"
					/>
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
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-checkbox-btn
							v-bind="state"
							:active="state._hActive" :model-value="true"
							label="Tinted checkbox button"
							data-cy="checkbox-btn-color"
					/>
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
				title="Prop — disabled & readonly"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-checkbox-btn
							v-model="statesModel"
							v-bind="state"
							label="Stateful checkbox button"
							data-cy="checkbox-btn-states"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — label">
			<div style="padding: 24px;">
				<origam-checkbox-btn
						v-model="slotLabelModel"
						value="custom"
						data-cy="checkbox-btn-slot-label"
				>
					<template #label>
						<strong>Custom label</strong>
						<small style="margin-inline-start: 8px; color: var(--origam-color__text---secondary);">via slot</small>
					</template>
				</origam-checkbox-btn>
			</div>
		</Variant>

		<Variant title="Slot — input">
			<div style="padding: 24px;">
				<origam-checkbox-btn
						v-model="slotInputModel"
						label="Custom input control"
						data-cy="checkbox-btn-slot-input"
				>
					<template #input="{ props: inputProps, icon, model }">
						<div
								v-bind="inputProps"
								style="width: 24px; height: 24px; border: 2px solid var(--origam-color__action--primary---bg); border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
						>
							<origam-icon v-if="icon" :icon="icon"/>
							<span v-else-if="model" style="font-size: 12px; color: var(--origam-color__action--primary---bg);">✓</span>
						</div>
					</template>
				</origam-checkbox-btn>
			</div>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<div style="padding: 24px;">
				<origam-checkbox-btn
						v-model="emitModel"
						label="Toggle me"
						data-cy="checkbox-btn-emit-update"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
				<div data-cy="checkbox-btn-emit-status">value = {{ emitModel }}</div>
			</div>
		</Variant>

		<Variant title="Emit — update:indeterminate">
			<div style="padding: 24px;">
				<origam-checkbox-btn
						v-model="emitIndeterminateModel"
						:indeterminate="true"
						label="Watch indeterminate change"
						data-cy="checkbox-btn-emit-indeterminate"
						@update:indeterminate="logEvent('update:indeterminate', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — click:label">
			<div style="padding: 24px;">
				<origam-checkbox-btn
						v-model="emitClickLabelModel"
						label="Click the label"
						data-cy="checkbox-btn-emit-click-label"
						@click:label="logEvent('click:label', $event)"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamCheckboxBtn, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { ICheckboxBtnProps, IColorProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		hoverList,
		iconList, intentList
	} from '@stories/const'

	const checkedModel           = ref(false)
	const statesModel            = ref(false)
	const slotLabelModel         = ref(false)
	const slotInputModel         = ref(false)
	const emitModel              = ref(false)
	const emitIndeterminateModel = ref(false)
	const emitClickLabelModel    = ref(false)
	const playgroundModel        = ref(false)
</script>

<docs lang="md" src="@docs/components/Checkbox/OrigamCheckboxBtn.md"/>
