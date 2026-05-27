<template>
	<Story
			group="components"
			title="Title/OrigamTitle"
	>
		<!--
			Playground — first by convention. Exposes every ITitleProps knob.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITitleProps>({
					tag: 'h1',
					text: 'OrigamTitle',
					color: undefined,
					bgColor: undefined
				})"
		>
			<template #default="{ state }">
				<origam-title v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag"     title="tag"     :options="titleTagList"/>
				<HstText   v-model="state.text"    title="text"/>
				<HstSelect v-model="state.color"   title="color"   :options="colorList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="colorList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string, text?: string }>({ tag: 'h1', text: 'OrigamTitle' })"
		>
			<template #default="{ state }">
				<origam-title
						:tag="state.tag"
						:text="state.text"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="titleTagList"/>
				<HstText   v-model="state.text" title="text"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-title v-bind="state" text="OrigamTitle"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="colorList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="colorList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-title tag="h2">
				Welcome <em>back</em>
			</origam-title>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamTitle } from '@origam/components'
	import type {
		IColorProps,
		IOptions,
		ITitleProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { colorList } from '@stories/const'

	/**
	 * Heading-level tags surfaced in the Title controls. Inlined here
	 * (rather than exposed in `@stories/const/tag.const`) because the
	 * Title-specific subset is meaningful only in this story.
	 */
	const titleTagList: Array<IOptions<string>> = [
		{ label: '(default — h1)', value: undefined },
		{ label: 'h1', value: 'h1' },
		{ label: 'h2', value: 'h2' },
		{ label: 'h3', value: 'h3' },
		{ label: 'h4', value: 'h4' },
		{ label: 'h5', value: 'h5' },
		{ label: 'h6', value: 'h6' },
	]
</script>

<docs lang="md" src="@docs/components/Title/OrigamTitle.md"/>
