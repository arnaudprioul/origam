<template>
	<Story
			group="components"
			title="Stepper/OrigamStepperItem"
	>

		<!--
			Note: <origam-stepper-item> consumes parent context from
			<origam-stepper> (model value, orientation, clickable). Each
			Variant wraps it in a stepper for a realistic preview.
		-->

		<Variant title="Default (within stepper items prop)">
			<origam-stepper :items="defaultItems" :model-value="1" data-cy="stepper-item-default-parent"/>
		</Variant>

		<Variant title="With icons">
			<origam-stepper data-cy="stepper-item-icon-parent">
				<origam-stepper-item index="0" title="Account" subtitle="Email"     :icon="MDI_ICONS.ACCOUNT_OUTLINE" status="done"/>
				<origam-stepper-item index="1" title="Profile" subtitle="Personal"  :icon="MDI_ICONS.CARD_ACCOUNT_DETAILS_OUTLINE" status="active"/>
				<origam-stepper-item index="2" title="Plan"    subtitle="Choose"    :icon="MDI_ICONS.STAR_OUTLINE" status="pending"/>
			</origam-stepper>
		</Variant>

		<Variant title="Status mix">
			<origam-stepper data-cy="stepper-item-status-mix">
				<origam-stepper-item index="0" title="Account" subtitle="Done"   status="done"/>
				<origam-stepper-item index="1" title="Profile" subtitle="Active" status="active"/>
				<origam-stepper-item index="2" title="Plan"    subtitle="Error"  status="error"/>
				<origam-stepper-item index="3" title="Confirm" subtitle="Idle"   status="pending"/>
			</origam-stepper>
		</Variant>

		<Variant
				title="Clickable"
				:init-state="() => useStoryInitState<{ step: number }>({ step: 0 })"
		>
			<template #default="{ state }">
				<origam-stepper v-model="state.step" :items="defaultItems" :clickable="true" data-cy="stepper-item-clickable"/>
				<p style="font-size: 0.75rem; color: var(--origam-color__text---secondary); padding: 8px;">
					Active step: {{ state.step }}
				</p>
			</template>
			<template #controls="{ state }">
				<HstSlider v-model="state.step" title="step (v-model)" :min="0" :max="3" :step="1"/>
			</template>
		</Variant>

		<Variant title="Vertical orientation">
			<origam-stepper :items="defaultItems" :model-value="1" orientation="vertical" data-cy="stepper-item-vertical"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IStepperItemProps>({
					title: 'Step',
					subtitle: 'Subtitle',
					icon: undefined,
					status: undefined,
					clickable: false,
					index: 0,
				})"
		>
			<template #default="{ state }">
				<origam-stepper data-cy="stepper-item-playground-parent">
					<origam-stepper-item v-bind="state" data-cy="stepper-item-playground"/>
				</origam-stepper>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"     title="title"/>
				<HstText     v-model="state.subtitle"  title="subtitle"/>
				<HstSelect   v-model="state.icon"      title="icon"     :options="iconList"/>
				<HstSelect   v-model="state.status"    title="status"   :options="[
					{ label: '(none)', value: undefined },
					{ label: 'pending', value: 'pending' },
					{ label: 'active',  value: 'active'  },
					{ label: 'done',    value: 'done'    },
					{ label: 'error',   value: 'error'   },
				]"/>
				<HstCheckbox v-model="state.clickable" title="clickable"/>
				<HstNumber   v-model="state.index"     title="index" :min="0"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamStepper, OrigamStepperItem } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IStepperItemProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { iconList } from '@stories/const'

	const defaultItems = [
		{ title: 'Account', subtitle: 'Email & password' },
		{ title: 'Profile', subtitle: 'Personal info' },
		{ title: 'Plan',    subtitle: 'Choose plan' },
		{ title: 'Confirm', subtitle: 'Review & submit' },
	]
</script>

<docs lang="md" src="@docs/components/Stepper/OrigamStepperItem.md"/>
