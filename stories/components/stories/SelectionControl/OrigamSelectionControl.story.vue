<template>
	<Story
			group="components"
			title="SelectionControl/OrigamSelectionControl"
	>

		<!-- ════════════ TYPE (checkbox / radio / switch) ════════════ -->
		<Variant
				title="Type"
				:init-state="() => useStoryInitState<{ type: string }>({ type: 'checkbox' })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="typeModel" :type="state.type">
					<origam-selection-control value="a" label="Option A" data-cy="sc-type-a"/>
					<origam-selection-control value="b" label="Option B" data-cy="sc-type-b"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.type" title="type" :options="typeList"/>
			</template>
		</Variant>

		<!-- ════════════ LABEL ════════════ -->
		<Variant
				title="Label"
				:init-state="() => useStoryInitState<{ label?: string, required: boolean }>({ label: 'Accept terms', required: false })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="labelModel" type="checkbox">
					<origam-selection-control
							value="accepted"
							:label="state.label"
							:required="state.required"
							data-cy="sc-label"
					/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"    title="label"/>
				<HstCheckbox v-model="state.required" title="required"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="colorModel" type="checkbox">
					<origam-selection-control v-bind="state" value="a" label="Colored control" data-cy="sc-color"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="densityModel" type="checkbox">
					<origam-selection-control :density="state.density" value="a" label="Dense control" data-cy="sc-density"/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ICONS (trueIcon / falseIcon) ════════════ -->
		<Variant
				title="Icons (trueIcon / falseIcon)"
				:init-state="() => useStoryInitState<{ trueIcon?: TIcon, falseIcon?: TIcon }>({ trueIcon: MDI_ICONS.CHECK_CIRCLE, falseIcon: MDI_ICONS.CIRCLE_OUTLINE })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="iconsModel" type="checkbox">
					<origam-selection-control
							:true-icon="state.trueIcon"
							:false-icon="state.falseIcon"
							value="a"
							label="Custom icons"
							data-cy="sc-icons"
					/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.trueIcon"  title="trueIcon"  :options="iconList"/>
				<HstSelect v-model="state.falseIcon" title="falseIcon" :options="iconList"/>
			</template>
		</Variant>

		<!-- ════════════ VALUES (trueValue / falseValue) ════════════ -->
		<Variant
				title="Values (trueValue / falseValue)"
				:init-state="() => useStoryInitState<{ trueValue?: any, falseValue?: any }>({ trueValue: 'YES', falseValue: 'NO' })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="valuesModel" type="checkbox">
					<origam-selection-control
							:true-value="state.trueValue"
							:false-value="state.falseValue"
							label="True=YES / False=NO"
							data-cy="sc-values"
					/>
				</origam-selection-control-group>
				<div style="margin-top: 8px; font-size: 0.8em; opacity: 0.7;">
					Current value: {{ valuesModel }}
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.trueValue"  title="trueValue"/>
				<HstText v-model="state.falseValue" title="falseValue"/>
			</template>
		</Variant>

		<!-- ════════════ STATES (disabled / readonly) ════════════ -->
		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean }>({ disabled: false, readonly: false })"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="statesModel" type="checkbox">
					<origam-selection-control
							:disabled="state.disabled"
							:readonly="state.readonly"
							value="a"
							label="Stateful control"
							data-cy="sc-states"
					/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-selection-control-group v-model="slotDefaultModel" type="checkbox">
				<origam-selection-control value="custom" data-cy="sc-slot-default">
					<template #default="{ model, props: slotProps }">
						<div
								v-bind="slotProps"
								style="display: flex; align-items: center; gap: 8px; padding: 8px; border: 1px solid var(--origam-color-border-subtle); border-radius: 4px; cursor: pointer;"
						>
							<span>{{ model ? 'Checked' : 'Unchecked' }}</span>
						</div>
					</template>
				</origam-selection-control>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ SLOT: label ════════════ -->
		<Variant title="Slot — label">
			<origam-selection-control-group v-model="slotLabelModel" type="checkbox">
				<origam-selection-control value="a" data-cy="sc-slot-label">
					<template #label>
						<span style="font-style: italic; color: var(--origam-color-action-primary-bg);">Custom label slot</span>
					</template>
				</origam-selection-control>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ SLOT: input ════════════ -->
		<Variant title="Slot — input">
			<origam-selection-control-group v-model="slotInputModel" type="checkbox">
				<origam-selection-control value="a" label="Custom input" data-cy="sc-slot-input">
					<template #input="{ props: inputProps, icon, model }">
						<div
								v-bind="inputProps"
								style="width: 24px; height: 24px; border: 2px solid var(--origam-color-action-primary-bg); border-radius: 4px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
						>
							<origam-icon v-if="icon" :icon="icon"/>
							<span v-else-if="model" style="font-size: 12px;">✓</span>
						</div>
					</template>
				</origam-selection-control>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ EMIT: click:label ════════════ -->
		<Variant title="Emit — click:label">
			<origam-selection-control-group v-model="emitModel" type="checkbox">
				<origam-selection-control
						value="a"
						label="Click the label"
						data-cy="sc-emit-click-label"
						@click:label="logEvent('click:label', $event)"
				/>
			</origam-selection-control-group>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISelectionControlProps>({
					label: 'Control label',
					type: 'checkbox',
					color: undefined,
					density: undefined,
					trueIcon: undefined,
					falseIcon: undefined,
					disabled: false,
					readonly: false,
					required: false,
				})"
		>
			<template #default="{ state }">
				<origam-selection-control-group v-model="playgroundModel" :type="state.type">
					<origam-selection-control
							v-bind="state"
							value="playground-val"
							data-cy="sc-playground"
					/>
				</origam-selection-control-group>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"     title="label"/>
				<HstSelect   v-model="state.type"      title="type"      :options="typeList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.trueIcon"  title="trueIcon"  :options="iconList"/>
				<HstSelect   v-model="state.falseIcon" title="falseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.required"  title="required"/>
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

	import { OrigamIcon, OrigamSelectionControl, OrigamSelectionControlGroup } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IColorProps,
		IDensityProps,
		IOptions,
		ISelectionControlProps
	} from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'

	const typeModel       = ref<string[]>([])
	const labelModel      = ref<string[]>([])
	const colorModel      = ref<string[]>([])
	const densityModel    = ref<string[]>([])
	const iconsModel      = ref<string[]>([])
	const valuesModel     = ref<any>(undefined)
	const statesModel     = ref<string[]>([])
	const slotDefaultModel = ref<string[]>([])
	const slotLabelModel  = ref<string[]>([])
	const slotInputModel  = ref<string[]>([])
	const emitModel       = ref<string[]>([])
	const playgroundModel = ref<any>(undefined)

	const typeList: Array<IOptions<string>> = [
		{ label: 'checkbox', value: 'checkbox' },
		{ label: 'radio',    value: 'radio'    },
		{ label: 'switch',   value: 'switch'   },
	]
</script>
