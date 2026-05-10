<template>
	<Story
			group="components"
			title="Switch/OrigamSwitchTrack"
	>
		<!--
			Note: <origam-switch-track> is a sub-component of <origam-switch>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-switch data-cy="origam-switch-track-default-parent">
				<origam-switch-track data-cy="origam-switch-track-default"/>
			</origam-switch>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISwitchTrackProps>({ modelValue: false, isValid: false, disabled: false, readonly: false, error: false, inset: false })"
		>
			<template #default="{ state }">
			<origam-switch data-cy="origam-switch-track-playground-parent">
				<origam-switch-track v-bind="state" data-cy="origam-switch-track-playground"/>
			</origam-switch>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.modelValue" title="modelValue"/>
				<HstCheckbox v-model="state.isValid" title="isValid"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.error" title="error"/>
				<HstCheckbox v-model="state.inset" title="inset"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSwitchTrack, OrigamSwitch } from '@origam/components'
	import type { ISwitchTrackProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Switch/OrigamSwitchTrack.md"/>
