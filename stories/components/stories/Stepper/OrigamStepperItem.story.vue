<template>
	<Story
			group="components"
			title="Stepper/OrigamStepperItem"
	>
		<!--
			Note: <origam-stepper-item> is a sub-component of <origam-stepper>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-stepper data-cy="origam-stepper-item-default-parent">
				<origam-stepper-item data-cy="origam-stepper-item-default"/>
			</origam-stepper>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IStepperItemProps>({ index: 0, title: '', subtitle: '', clickable: false })"
		>
			<template #default="{ state }">
			<origam-stepper data-cy="origam-stepper-item-playground-parent">
				<origam-stepper-item v-bind="state" data-cy="origam-stepper-item-playground"/>
			</origam-stepper>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.index" title="index"/>
				<HstText v-model="state.title" title="title"/>
				<HstText v-model="state.subtitle" title="subtitle"/>
				<HstCheckbox v-model="state.clickable" title="clickable"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamStepperItem, OrigamStepper } from '@origam/components'
	import type { IStepperItemProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Stepper/OrigamStepperItem.md"/>
