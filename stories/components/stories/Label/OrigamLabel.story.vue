<template>
	<Story
			group="components"
			title="Label/OrigamLabel"
	>
		<!-- ════════════ COLOR ════════════ -->
		<!--
			`colorList` mixes intents and every CSS-color format the prop
			accepts. Label has no intent → SCSS mapping wired, so the
			intent values resolve as raw CSS strings via `useColor`.
		-->
		<Variant
				title="Color"
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

		<!-- ════════════ STATES (required / floating) ════════════ -->
		<Variant
				title="States"
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

		<!-- ════════════ TAG (polymorphism) ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'label' })"
		>
			<template #default="{ state }">
				<origam-label :tag="state.tag" text="OrigamLabel"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="labelTagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-label>
				Email <em style="opacity: .6;">(optional)</em>
			</origam-label>
		</Variant>

		<!-- ════════════ EMIT: @click ════════════ -->
		<Variant title="Emit — click">
			<origam-label
					text="Click me"
					@click="logEvent('click', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
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
