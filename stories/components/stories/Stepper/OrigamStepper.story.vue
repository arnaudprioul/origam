<template>
	<Story
			group="components"
			title="Stepper/OrigamStepper"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IStepperProps>({
					modelValue: 1,
					orientation: 'horizontal',
					clickable: false,
					showConnectors: true,
					color: undefined,
					bgColor: undefined,
					density: 'default',
					size: 'default'
				})"
		>
			<template #default="{ state }">
				<origam-stepper
						v-bind="state"
						:items="defaultItems"
						data-cy="stepper-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstSlider    v-model="state.modelValue"     title="modelValue"     :min="0" :max="3" :step="1"/>
				<HstSelect    v-model="state.orientation"    title="orientation"    :options="orientationList"/>
				<HstCheckbox  v-model="state.clickable"      title="clickable"/>
				<HstCheckbox  v-model="state.showConnectors" title="showConnectors"/>
				<HstSelect    v-model="state.color"          title="color"          :options="intentList"/>
				<HstSelect    v-model="state.bgColor"        title="bgColor"        :options="intentList"/>
				<HstSelect    v-model="state.density"        title="density"        :options="densityList"/>
				<HstSelect    v-model="state.size"           title="size"           :options="sizeList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — default (horizontal)">
			<origam-stepper
					:items="defaultItems"
					:model-value="1"
					data-cy="stepper-default"
			/>
		</Variant>

		<Variant title="Vertical">
			<origam-stepper
					:items="defaultItems"
					:model-value="1"
					orientation="vertical"
					data-cy="stepper-vertical"
			/>
		</Variant>

		<Variant title="Status mix">
			<origam-stepper
					:items="statusMixItems"
					data-cy="stepper-status-mix"
			/>
		</Variant>

		<Variant title="With icons">
			<origam-stepper
					:items="iconItems"
					:model-value="1"
					data-cy="stepper-with-icons"
			/>
		</Variant>

		<Variant
				title="Clickable"
				:init-state="() => useStoryInitState<{ step: number }>({ step: 0 })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<origam-stepper
							v-model="state.step"
							:items="defaultItems"
							:clickable="true"
							data-cy="stepper-clickable"
					/>
					<p style="font-size: 0.875rem; color: var(--origam-color__text---secondary);">
						Active step: {{ state.step }}
					</p>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.step" title="step (v-model)" :min="0" :max="3" :step="1"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-stepper
						:items="defaultItems"
						:model-value="1"
						:color="state.color"
						:bg-color="state.bgColor"
						data-cy="stepper-color"
				/>
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
				<origam-stepper
						:items="defaultItems"
						:model-value="1"
						:color="state.color"
						:bg-color="state.bgColor"
						data-cy="stepper-color"
				/>
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
				<origam-stepper
						:items="defaultItems"
						:model-value="1"
						:color="state.color"
						:bg-color="state.bgColor"
						data-cy="stepper-color"
				/>
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
				title="Size / Density"
				:init-state="() => useStoryInitState<{ size: TSize; density: TDensity }>({ size: 'default', density: 'default' })"
		>
			<template #default="{ state }">
				<origam-stepper
						:items="defaultItems"
						:model-value="1"
						:size="state.size"
						:density="state.density"
						data-cy="stepper-size-density"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size"    title="size"    :options="sizeList"/>
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IStepperProps>({
					modelValue: 1,
					orientation: 'horizontal',
					clickable: false,
					showConnectors: true,
					color: undefined,
					bgColor: undefined,
					density: 'default',
					size: 'default'
				})"
		>
			<template #default="{ state }">
				<origam-stepper
						v-bind="state"
						:active="state._hActive" :hover="state._hHover" :items="defaultItems"
						data-cy="stepper-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstSlider    v-model="state.modelValue"     title="modelValue"     :min="0" :max="3" :step="1"/>
				<HstSelect    v-model="state.orientation"    title="orientation"    :options="orientationList"/>
				<HstCheckbox  v-model="state.clickable"      title="clickable"/>
				<HstCheckbox  v-model="state.showConnectors" title="showConnectors"/>
				<HstSelect    v-model="state.color"          title="color"          :options="intentList"/>
				<HstSelect    v-model="state.bgColor"        title="bgColor"        :options="intentList"/>
				<HstSelect    v-model="state.density"        title="density"        :options="densityList"/>
				<HstSelect    v-model="state.size"           title="size"           :options="sizeList"/>
			</template>
		</Variant>
		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-stepper :items="defaultItems" :model-value="1" data-cy="stepper-slot-default">
				<span>Custom slot content</span>
			</origam-stepper>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-stepper
					:items="defaultItems"
					:model-value="1"
					:clickable="true"
					data-cy="stepper-emit-model-value"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamStepper } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IOptions, IStepperItem, IStepperProps } from '@origam/interfaces'
	import type { TDensity, TSize, TStepperItemStatus, TStepperOrientation } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, sizeList,
		hoverList
	} from '@stories/const'

	// Orientation list
	const orientationList: Array<IOptions<TStepperOrientation>> = [
		{ label: 'Horizontal', value: 'horizontal' },
		{ label: 'Vertical', value: 'vertical' }
	]

	// Default 4-step items
	const defaultItems: Array<IStepperItem> = [
		{ title: 'Account', subtitle: 'Email & password' },
		{ title: 'Profile', subtitle: 'Personal info' },
		{ title: 'Plan', subtitle: 'Choose plan' },
		{ title: 'Confirm', subtitle: 'Review & submit' }
	]

	// Status mix items
	const statusMixItems: Array<IStepperItem> = [
		{ title: 'Account', status: 'done' as TStepperItemStatus },
		{ title: 'Profile', status: 'done' as TStepperItemStatus },
		{ title: 'Plan', status: 'active' as TStepperItemStatus },
		{ title: 'Billing', status: 'error' as TStepperItemStatus },
		{ title: 'Confirm', status: 'pending' as TStepperItemStatus }
	]

	// Items with icons
	const iconItems: Array<IStepperItem> = [
		{ title: 'Account', icon: MDI_ICONS.ACCOUNT },
		{ title: 'Settings', icon: MDI_ICONS.COG },
		{ title: 'Payment', icon: MDI_ICONS.CREDIT_CARD },
		{ title: 'Confirm', icon: MDI_ICONS.CHECK_CIRCLE }
	]
</script>

<docs lang="md" src="@docs/components/Stepper/OrigamStepper.md"/>
