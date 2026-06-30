<template>
	<Story
			group="components"
			title="Label/OrigamLabel"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ILabelProps>>({ text: 'OrigamLabel' })"
		>
			<template #default="{ state }">
				<origam-label
						:color="state.color"
						:bg-color="state.bgColor"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:rounded="state.rounded"
						:margin="state.margin"
						:padding="state.padding"
						:text="state.text"
						:font-size="state.fontSize"
						:font-weight="state.fontWeight"
						:line-height="state.lineHeight"
						:letter-spacing="state.letterSpacing"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontSize"      title="Font Size"      :options="FONT_SIZE_OPTIONS"/>
					<HstSelect v-model="state.fontWeight"    title="Font Weight"    :options="FONT_WEIGHT_OPTIONS"/>
					<HstSelect v-model="state.lineHeight"    title="Line Height"    :options="LINE_HEIGHT_OPTIONS"/>
					<HstSelect v-model="state.letterSpacing" title="Letter Spacing" :options="LETTER_SPACING_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.margin"  title="Margin"/>
					<HstText v-model="state.padding" title="Padding"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ILabelProps>>({ tag: 'label', text: 'OrigamLabel' })"
		>
			<template #default="{ state }">
				<origam-label
						:tag="state.tag"
						:text="state.text"
						:name="state.name"
						:floating="state.floating"
						:required="state.required"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
					<HstText v-model="state.name" title="Name"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.floating" title="Floating"/>
					<HstCheckbox v-model="state.required" title="Required"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="LABEL_TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - click">
			<origam-label
					text="Click me"
					@click="logEvent('click', $event)"
			/>
		</Variant>

		<Variant title="Slots - Default">
			<origam-label>
				Email <em style="opacity: .6;">(optional)</em>
			</origam-label>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ILabelProps>({ tag: 'label', text: 'OrigamLabel' })"
		>
			<template #default="{ state }">
				<origam-label v-bind="state" @click="logEvent('click', $event)"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
					<HstText v-model="state.name" title="Name"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.border"  title="Border"   :options="BORDER_OPTIONS"/>
					<HstSelect v-model="state.rounded" title="Rounded"  :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.floating" title="Floating"/>
					<HstCheckbox v-model="state.required" title="Required"/>
					<HstSelect   v-model="state.tag"      title="Tag"      :options="LABEL_TAG_OPTIONS"/>
				</StoryGroup>
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
	import type { ILabelProps, IOptions } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		FONT_SIZE_OPTIONS,
		FONT_WEIGHT_OPTIONS,
		LETTER_SPACING_OPTIONS,
		LINE_HEIGHT_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const LABEL_TAG_OPTIONS: Array<IOptions<string | undefined>> = [
		{ label: '(default — label)', value: undefined },
		{ label: 'label', value: 'label' },
		{ label: 'span', value: 'span' },
		{ label: 'legend', value: 'legend' },
		{ label: 'div', value: 'div' },
	]
</script>

<docs lang="md" src="@docs/components/Label/OrigamLabel.md"/>
