<template>
	<Story
			group="components"
			title="Picker/OrigamPickerTitle"
	>
		<!--
			Playground — first by convention. All IPickerTitleProps knobs
			wired via the sidebar.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IPickerTitleProps>({
					title: 'Playground',
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-picker-title v-bind="state" data-cy="picker-title-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.title" title="title"/>
				<HstSelect v-model="state.tag"   title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — title">
			<origam-picker-title
					title="Pick a date"
					data-cy="picker-title-default"
			/>
		</Variant>

		<Variant
				title="Prop — title (editable)"
				:init-state="() => useStoryInitState<{ title: string }>({ title: 'Custom title' })"
		>
			<template #default="{ state }">
				<origam-picker-title
						:title="state.title"
						data-cy="picker-title-prop"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag (polymorphic element)"
				:init-state="() => useStoryInitState<{ tag: string }>({ tag: 'h2' })"
		>
			<template #default="{ state }">
				<origam-picker-title
						:tag="state.tag"
						title="Polymorphic"
						data-cy="picker-title-tag"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.tag"
						title="tag"
						:options="tagList"
				/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (rich content)">
			<origam-picker-title data-cy="picker-title-slot">
				Custom <strong data-cy="picker-title-slot-strong">rich</strong> content
			</origam-picker-title>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamPickerTitle } from '@origam/components'
	import type { IPickerTitleProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Picker/OrigamPickerTitle.md"/>
