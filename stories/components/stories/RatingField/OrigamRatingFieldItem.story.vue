<template>
	<Story
			group="components"
			title="RatingField/OrigamRatingFieldItem"
	>
		<!--
			Note: <origam-rating-field-item> is a sub-component of <origam-rating-field>.
			The stories below render it inside its parent so it has the
			surrounding context (provide/inject keys) it needs.
		-->

		<Variant title="Default">
			<origam-rating-field data-cy="origam-rating-field-item-default-parent">
				<origam-rating-field-item data-cy="origam-rating-field-item-default"/>
			</origam-rating-field>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRatingFieldItemProps>({ name: '', index: 0, value: 0, label: '', showStar: false, isFilled: false, isHovered: false, isHovering: false, disabled: false, readonly: false, halfIncrements: false, checked: false, length: 0 })"
		>
			<template #default="{ state }">
			<origam-rating-field data-cy="origam-rating-field-item-playground-parent">
				<origam-rating-field-item v-bind="state" data-cy="origam-rating-field-item-playground"/>
			</origam-rating-field>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.name" title="name"/>
				<HstNumber v-model="state.index" title="index"/>
				<HstNumber v-model="state.value" title="value"/>
				<HstText v-model="state.label" title="label"/>
				<HstCheckbox v-model="state.showStar" title="showStar"/>
				<HstCheckbox v-model="state.isFilled" title="isFilled"/>
				<HstCheckbox v-model="state.isHovered" title="isHovered"/>
				<HstCheckbox v-model="state.isHovering" title="isHovering"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstCheckbox v-model="state.readonly" title="readonly"/>
				<HstCheckbox v-model="state.halfIncrements" title="halfIncrements"/>
				<HstCheckbox v-model="state.checked" title="checked"/>
				<HstNumber v-model="state.length" title="length"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamRatingFieldItem, OrigamRatingField } from '@origam/components'
	import type { IRatingFieldItemProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/RatingField/OrigamRatingFieldItem.md"/>
