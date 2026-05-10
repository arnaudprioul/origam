<template>
	<Story
			group="components"
			title="Radio/OrigamRadioBtn"
	>
		<Variant title="Default">
			<origam-radio-btn data-cy="origam-radio-btn-default"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRadioBtnProps>({  })"
		>
			<template #default="{ state }">
			<origam-radio-btn v-bind="state" data-cy="origam-radio-btn-playground"/>
			</template>
			<template #controls="{ state }">
				<!-- TODO: add HstControl bindings for the prop surface -->
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamRadioBtn } from '@origam/components'
	import type { IRadioBtnProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadioBtn.md"/>
