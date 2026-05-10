<template>
	<Story
			group="components"
			title="Radio/OrigamRadioGroup"
	>

		<Variant title="Default">
			<div style="padding: 24px; max-width: 400px;">
				<origam-radio-group
						v-model="defaultModel"
						label="Pick one"
						:items="defaultItems"
						data-cy="radio-group-default"
				/>
			</div>
		</Variant>

		<Variant title="Direction — horizontal">
			<div style="padding: 24px; max-width: 600px;">
				<origam-radio-group
						v-model="horizontalModel"
						label="Tier"
						:items="planItems"
						:direction="DIRECTION.HORIZONTAL"
						data-cy="radio-group-horizontal"
				/>
				<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary); margin-top: 8px;" data-cy="radio-group-horizontal-status">
					selected = {{ horizontalModel || '(none)' }}
				</p>
			</div>
		</Variant>

		<Variant title="Without label">
			<div style="padding: 24px; max-width: 400px;">
				<origam-radio-group
						v-model="nolabelModel"
						:items="defaultItems"
						data-cy="radio-group-nolabel"
				/>
			</div>
		</Variant>

		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;">
					<origam-radio-group
							v-model="statesModel"
							v-bind="state"
							label="Stateful group"
							:items="defaultItems"
							:error-messages="state.error ? ['Pick something to continue'] : []"
							data-cy="radio-group-states"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error"    title="error"/>
			</template>
		</Variant>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;">
					<origam-radio-group
							v-model="colorModel"
							v-bind="state"
							label="Tinted group"
							:items="defaultItems"
							data-cy="radio-group-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect v-model="state.activeColor"  title="activeColor"  :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 400px;">
					<origam-radio-group
							v-model="densityModel"
							:density="state.density"
							label="Density-aware"
							:items="defaultItems"
							data-cy="radio-group-density"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="With hint">
			<div style="padding: 24px; max-width: 400px;">
				<origam-radio-group
						v-model="hintModel"
						label="Newsletter frequency"
						hint="You can change this later in account settings."
						persistent-hint
						:items="frequencyItems"
						data-cy="radio-group-hint"
				/>
			</div>
		</Variant>

		<Variant title="Slot — label">
			<div style="padding: 24px; max-width: 400px;">
				<origam-radio-group
						v-model="slotModel"
						:items="defaultItems"
						data-cy="radio-group-slot-label"
				>
					<template #label="{ label, required }">
						<strong>Custom label</strong>
						<span v-if="required" style="color: var(--origam-color-feedback-danger-bg);"> *</span>
						<small style="display: block; color: var(--origam-color-text-secondary);">
							{{ label }}
						</small>
					</template>
				</origam-radio-group>
			</div>
		</Variant>

		<Variant title="Slot — item (custom radio render)">
			<div style="padding: 24px; max-width: 400px;">
				<origam-radio-group
						v-model="slotItemModel"
						label="Custom-rendered options"
						:items="defaultItems"
						data-cy="radio-group-slot-item"
				>
					<template #item="{ id }">
						<origam-radio
								v-model="slotItemModel"
								value="alpha"
								label="Alpha (slot)"
								:aria-describedby="id"
						/>
						<origam-radio
								v-model="slotItemModel"
								value="bravo"
								label="Bravo (slot)"
								:aria-describedby="id"
						/>
						<origam-radio
								v-model="slotItemModel"
								value="charlie"
								label="Charlie (slot)"
								:aria-describedby="id"
						/>
					</template>
				</origam-radio-group>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRadioGroupProps>({
					label: 'Pick one',
					density: DENSITY.DEFAULT,
					direction: DIRECTION.VERTICAL,
					disabled: false,
					readonly: false,
					required: false,
					error: false,
					hint: '',
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; max-width: 500px;">
					<origam-radio-group
							v-model="playgroundModel"
							v-bind="state"
							:items="defaultItems"
							data-cy="radio-group-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"     title="label"/>
				<HstText     v-model="state.hint"      title="hint"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.direction" title="direction" :options="[
					{ label: 'vertical', value: DIRECTION.VERTICAL },
					{ label: 'horizontal', value: DIRECTION.HORIZONTAL },
				]"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstCheckbox v-model="state.required"  title="required"/>
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

	import { OrigamRadio, OrigamRadioGroup } from '@origam/components'
	import { DENSITY, DIRECTION } from '@origam/enums'
	import type { IColorProps, IDensityProps, IRadioGroupProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'

	const defaultItems = [
		{ value: 'alpha',   label: 'Alpha'   },
		{ value: 'bravo',   label: 'Bravo'   },
		{ value: 'charlie', label: 'Charlie' },
	]

	const planItems = [
		{ value: 'free',    label: 'Free'    },
		{ value: 'pro',     label: 'Pro'     },
		{ value: 'team',    label: 'Team'    },
		{ value: 'enterprise', label: 'Enterprise' },
	]

	const frequencyItems = [
		{ value: 'daily',   label: 'Daily'   },
		{ value: 'weekly',  label: 'Weekly'  },
		{ value: 'monthly', label: 'Monthly' },
		{ value: 'never',   label: 'Never'   },
	]

	const defaultModel    = ref()
	const horizontalModel = ref('pro')
	const nolabelModel    = ref()
	const statesModel     = ref()
	const colorModel      = ref()
	const densityModel    = ref()
	const hintModel       = ref()
	const slotModel       = ref()
	const slotItemModel   = ref()
	const playgroundModel = ref()
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadioGroup.md"/>
