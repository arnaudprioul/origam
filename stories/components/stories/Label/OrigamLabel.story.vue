<template>
	<Story
			group="components"
			title="Label/OrigamLabel"
	>
		<!--
			Playground — first by convention. Exposes every ILabelProps knob.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ILabelProps>({
					tag: 'label',
					text: 'OrigamLabel',
					required: false,
					floating: false,
					color: undefined,
					bgColor: undefined
				})"
		>
			<template #default="{ state }">
				<origam-label v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.tag"      title="tag"      :options="labelTagList"/>
				<HstText     v-model="state.text"     title="text"/>
				<HstCheckbox v-model="state.required" title="required"/>
				<HstCheckbox v-model="state.floating" title="floating"/>
				<HstSelect   v-model="state.color"    title="color"    :options="colorList"/>
				<HstSelect   v-model="state.bgColor"  title="bgColor"  :options="colorList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-label v-bind="state" text="OrigamLabel"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="colorList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="colorList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — required & floating"
				:init-state="() => useStoryInitState<{ required?: boolean, floating?: boolean }>({})"
		>
			<template #default="{ state }">
				<origam-label v-bind="state" text="OrigamLabel"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.required" title="required"/>
				<HstCheckbox v-model="state.floating" title="floating"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'label' })"
		>
			<template #default="{ state }">
				<origam-label :tag="state.tag" text="OrigamLabel"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="labelTagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-label>
				Email <em style="opacity: .6;">(optional)</em>
			</origam-label>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — click">
			<origam-label
					text="Click me"
					@click="logEvent('click', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamLabel } from '@origam/components'
	import type {
		IColorProps,
		ILabelProps,
		IOptions
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { colorList } from '@stories/const'

	/**
	 * Tags that make sense for an inline label (form-control association
	 * vs neutral inline span vs fieldset legend). Inlined here because
	 * the subset is meaningful only in this story.
	 */
	const labelTagList: Array<IOptions<string>> = [
		{ label: '(default — label)', value: undefined },
		{ label: 'label', value: 'label' },
		{ label: 'span', value: 'span' },
		{ label: 'legend', value: 'legend' },
		{ label: 'div', value: 'div' },
	]
</script>

<docs lang="md" src="@docs/components/Label/OrigamLabel.md"/>
