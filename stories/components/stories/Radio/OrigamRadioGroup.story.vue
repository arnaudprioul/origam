<template>
	<Story
			group="components"
			title="Radio/OrigamRadioGroup"
	>
		<Variant title="Default">
			<origam-radio-group data-cy="origam-radio-group-default"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRadioGroupProps>({  })"
		>
			<template #default="{ state }">
			<origam-radio-group v-bind="state" data-cy="origam-radio-group-playground"/>
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
	import { OrigamRadioGroup } from '@origam/components'
	import type { IRadioGroupProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Radio/OrigamRadioGroup.md"/>
