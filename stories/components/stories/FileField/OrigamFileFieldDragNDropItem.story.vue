<template>
	<Story
			group="components"
			title="FileField/OrigamFileFieldDragNDropItem"
	>
		<!--
			Note: <origam-file-field-drag-n-drop-item> is a sub-component of <origam-file-field>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-file-field data-cy="origam-file-field-drag-n-drop-item-default-parent">
				<origam-file-field-drag-n-drop-item data-cy="origam-file-field-drag-n-drop-item-default"/>
			</origam-file-field>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IFileFieldDragNDropItemProps>({ index: 0, progress: 0, fileIcon: '', removeIcon: '', disabled: false, readonly: false, showSize: false })"
		>
			<template #default="{ state }">
			<origam-file-field data-cy="origam-file-field-drag-n-drop-item-playground-parent">
				<origam-file-field-drag-n-drop-item v-bind="state" data-cy="origam-file-field-drag-n-drop-item-playground"/>
			</origam-file-field>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.index" title="index"/>
				<HstNumber v-model="state.progress" title="progress"/>
				<HstText v-model="state.fileIcon" title="fileIcon"/>
				<HstText v-model="state.removeIcon" title="removeIcon"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.showSize" title="showSize"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamFileFieldDragNDropItem, OrigamFileField } from '@origam/components'
	import type { IFileFieldDragNDropItemProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/FileField/OrigamFileFieldDragNDropItem.md"/>
