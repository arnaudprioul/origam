<template>
	<Story
			group="components"
			title="DataList/OrigamDataText"
	>
		<Variant title="Default">
			<origam-data-text data-cy="origam-data-text-default"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTextProps>({ text: '' })"
		>
			<template #default="{ state }">
			<origam-data-text v-bind="state" data-cy="origam-data-text-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.text" title="text"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataText } from '@origam/components'
	import type { IDataTextProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataList/OrigamDataText.md"/>
