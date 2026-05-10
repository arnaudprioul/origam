<template>
	<Story
			group="components"
			title="DataList/OrigamDataTitle"
	>
		<Variant title="Default">
			<origam-data-title data-cy="origam-data-title-default"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDataTitleProps>({ text: '' })"
		>
			<template #default="{ state }">
			<origam-data-title v-bind="state" data-cy="origam-data-title-playground"/>
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
	import { OrigamDataTitle } from '@origam/components'
	import type { IDataTitleProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/DataList/OrigamDataTitle.md"/>
