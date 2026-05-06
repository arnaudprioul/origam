<template>
	<Story
			group="components"
			title="Stepper/OrigamStepper"
	>
		<!-- ════════════ DEFAULT — 4 horizontal steps ════════════ -->
		<Variant title="Default">
			<origam-stepper
					:items="defaultItems"
					:model-value="1"
					data-cy="stepper-default"
			/>
		</Variant>

		<!-- ════════════ VERTICAL ════════════ -->
		<Variant title="Vertical">
			<origam-stepper
					:items="defaultItems"
					:model-value="1"
					orientation="vertical"
					data-cy="stepper-vertical"
			/>
		</Variant>

		<!-- ════════════ STATUS MIX (explicit statuses) ════════════ -->
		<Variant title="Status mix">
			<origam-stepper
					:items="statusMixItems"
					data-cy="stepper-status-mix"
			/>
		</Variant>

		<!-- ════════════ WITH ICONS ════════════ -->
		<Variant title="With icons">
			<origam-stepper
					:items="iconItems"
					:model-value="1"
					data-cy="stepper-with-icons"
			/>
		</Variant>

		<!-- ════════════ CLICKABLE (v-model demo) ════════════ -->
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
					<p style="font-size: 0.875rem; color: var(--origam-color-text-secondary);">
						Active step: {{ state.step }}
					</p>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.step" title="step (v-model)" :min="0" :max="3" :step="1"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR / INTENT ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-stepper
						:items="defaultItems"
						:model-value="1"
						:color="state.color"
						:bg-color="state.bgColor"
						:active-color="state.activeColor"
						:active-bg-color="state.activeBgColor"
						:hover-color="state.hoverColor"
						:hover-bg-color="state.hoverBgColor"
						data-cy="stepper-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ SIZE / DENSITY ════════════ -->
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

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamStepper } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IOptions, IStepperItem, IStepperProps } from '@origam/interfaces'
	import type { TDensity, TSize, TStepperItemStatus, TStepperOrientation } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, sizeList } from '@stories/const'

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
