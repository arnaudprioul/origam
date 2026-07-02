<template>
	<Story
			group="components"
			title="Messages/OrigamMessages"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IMessagesProps>>({
					messages: ['Hint message.'],
					active: true,
					fontSize: undefined,
					lineHeight: undefined
				})"
		>
			<template #default="{ state }">
				<origam-messages
						:messages="state.messages"
						:active="state.active"
						:color="state.color"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:padding="state.padding"
						:margin="state.margin"
						:font-size="state.fontSize"
						:line-height="state.lineHeight"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Typography">
					<HstSelect v-model="state.fontSize"   title="Font Size"   :options="FONT_SIZE_OPTIONS"/>
					<HstSelect v-model="state.lineHeight" title="Line Height" :options="LINE_HEIGHT_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstText   v-model="state.elevation" title="Elevation"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IMessagesProps>>({ messages: ['First message.', 'Second message.'], active: true, tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-messages
						:messages="state.messages"
						:active="state.active"
						:tag="state.tag"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.active" title="Active"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstText v-model="state.messages" title="Messages (first)"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-messages :messages="['Custom rendered message']" active>
				<template #default="{ message }">
					<span style="color: var(--origam-color__feedback--danger---fg, #b00020); font-weight: 600;">{{ message }}</span>
				</template>
			</origam-messages>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IMessagesProps>({ messages: ['Hint message.'], active: true })"
		>
			<template #default="{ state }">
				<origam-messages v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.messages" title="Messages (first)"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"   :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.active" title="Active"/>
					<HstSelect   v-model="state.tag"    title="Tag"    :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamMessages } from '@origam/components'
	import type { IMessagesProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		FONT_SIZE_OPTIONS,
		LINE_HEIGHT_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Messages/OrigamMessages.md"/>
