<template>
	<Story
			group="components"
			title="Dialog/OrigamDialogConfirmation"
	>
		<Variant title="Default">
			<origam-dialog-confirmation data-cy="origam-dialog-confirmation-default"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDialogConfirmationProps>({ cancellable: false })"
		>
			<template #default="{ state }">
			<origam-dialog-confirmation v-bind="state" data-cy="origam-dialog-confirmation-playground"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.cancellable" title="cancellable"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDialogConfirmation } from '@origam/components'
	import type { IDialogConfirmationProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/Dialog/OrigamDialogConfirmation.md"/>
