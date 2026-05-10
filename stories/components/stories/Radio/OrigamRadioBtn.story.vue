<template>
	<Story
			group="components"
			title="Radio/OrigamRadioBtn"
	>

		<Variant title="Default">
			<div style="padding: 24px;">
				<origam-radio-btn
						v-model="defaultModel"
						value="alpha"
						label="Alpha"
						data-cy="radio-btn-default"
				/>
			</div>
		</Variant>

		<Variant title="Group of options (shared v-model)">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
				<origam-radio-btn v-model="groupModel" value="cat"  label="Cat"  data-cy="radio-btn-group-cat"/>
				<origam-radio-btn v-model="groupModel" value="dog"  label="Dog"  data-cy="radio-btn-group-dog"/>
				<origam-radio-btn v-model="groupModel" value="fish" label="Fish" data-cy="radio-btn-group-fish"/>
				<p style="font-size: 0.75rem; color: var(--origam-color-text-secondary);" data-cy="radio-btn-group-status">
					selected = {{ groupModel || '(none)' }}
				</p>
			</div>
		</Variant>

		<Variant
				title="States"
				:init-state="() => useStoryInitState<{ disabled: boolean, readonly: boolean, error: boolean }>({ disabled: false, readonly: false, error: false })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-radio-btn
							v-model="statesModel"
							v-bind="state"
							value="enabled"
							label="Stateful radio"
							data-cy="radio-btn-states"
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
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-radio-btn
							v-model="colorModel"
							v-bind="state"
							value="picked"
							label="Tinted radio"
							data-cy="radio-btn-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect v-model="state.activeColor"  title="activeColor"  :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
				<HstSelect v-model="state.hoverColor"   title="hoverColor"   :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor" title="hoverBgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
					<origam-radio-btn v-model="densityModel" :density="state.density" value="x" label="Density-aware" data-cy="radio-btn-density"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="Custom icons (true / false)">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
				<origam-radio-btn
						v-model="iconsModel"
						value="liked"
						label="Star / outlined star"
						:true-icon="MDI_ICONS.STAR"
						:false-icon="MDI_ICONS.STAR_OUTLINE"
						data-cy="radio-btn-icons"
				/>
			</div>
		</Variant>

		<Variant title="Slot — label">
			<div style="padding: 24px;">
				<origam-radio-btn
						v-model="slotModel"
						value="custom"
						data-cy="radio-btn-slot-label"
				>
					<template #label>
						<strong>Custom label</strong>
						<small style="margin-inline-start: 8px; color: var(--origam-color-text-secondary);">
							rendered via slot
						</small>
					</template>
				</origam-radio-btn>
			</div>
		</Variant>

		<Variant title="Emit — update:modelValue + click:label">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 12px;">
				<origam-radio-btn
						v-model="emitModel"
						value="emitted"
						label="Watch logs"
						data-cy="radio-btn-emit"
						@update:model-value="logEvent('update:modelValue', $event)"
						@click:label="logEvent('click:label', $event)"
				/>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRadioBtnProps>({
					value: 'play',
					label: 'Toggle me',
					density: DENSITY.DEFAULT,
					color: undefined,
					disabled: false,
					readonly: false,
					error: false,
					trueIcon: MDI_ICONS.RADIOBOX_MARKED,
					falseIcon: MDI_ICONS.RADIOBOX_BLANK,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-radio-btn
							v-model="playgroundModel"
							v-bind="state"
							data-cy="radio-btn-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.label"     title="label"/>
				<HstText     v-model="state.value"     title="value"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.error"     title="error"/>
				<HstSelect   v-model="state.trueIcon"  title="trueIcon"  :options="iconList"/>
				<HstSelect   v-model="state.falseIcon" title="falseIcon" :options="iconList"/>
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

	import { OrigamRadioBtn } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, IRadioBtnProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, intentList } from '@stories/const'

	const defaultModel    = ref()
	const groupModel      = ref()
	const statesModel     = ref()
	const colorModel      = ref()
	const densityModel    = ref()
	const iconsModel      = ref()
	const slotModel       = ref()
	const emitModel       = ref()
	const playgroundModel = ref()
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadioBtn.md"/>
