<template>
	<Story
			group="components"
			title="Icon/OrigamIcon"
	>

		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<origam-icon
						:size="state.size"
						:icon="MDI_ICONS.HOME"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-icon
						v-bind="state"
						:icon="MDI_ICONS.HEART"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: undefined })"
		>
			<template #default="{ state }">
				<origam-icon
						:tag="state.tag"
						:icon="MDI_ICONS.STAR"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<Variant title="Emit — click (button mode)">
			<origam-icon
					:icon="MDI_ICONS.CLOSE"
					aria-label="Close"
					@click="logEvent('click', $event)"
			/>
		</Variant>

		<Variant title="Slot — default (ligature string)">
			<origam-icon>mdi-heart</origam-icon>
		</Variant>

		<Variant title="Dispatch — SVG path">
			<origam-icon :icon="SVG_PATH_HEART"/>
		</Variant>

		<Variant title="All sizes — side by side">
			<div style="display:flex;gap:16px;align-items:center;">
				<origam-icon :icon="MDI_ICONS.HOME" size="x-small"/>
				<origam-icon :icon="MDI_ICONS.HOME" size="small"/>
				<origam-icon :icon="MDI_ICONS.HOME" size="default"/>
				<origam-icon :icon="MDI_ICONS.HOME" size="large"/>
				<origam-icon :icon="MDI_ICONS.HOME" size="x-large"/>
			</div>
		</Variant>

		<Variant title="All intents — side by side">
			<div style="display:flex;gap:16px;align-items:center;">
				<origam-icon :icon="MDI_ICONS.HEART" color="primary"/>
				<origam-icon :icon="MDI_ICONS.HEART" color="success"/>
				<origam-icon :icon="MDI_ICONS.HEART" color="danger"/>
				<origam-icon :icon="MDI_ICONS.HEART" color="warning"/>
				<origam-icon :icon="MDI_ICONS.HEART" color="info"/>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IIconComponentProps>({
					icon: MDI_ICONS.HOME,
					size: undefined,
					color: undefined,
					bgColor: undefined,
					tag: undefined,
					disabled: false,
				})"
		>
			<template #default="{ state }">
				<origam-icon v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.icon"    title="icon"    :options="iconList"/>
				<HstSelect v-model="state.size"    title="size"    :options="sizeList"/>
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
				<HstSelect v-model="state.tag"     title="tag"     :options="tagList"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IIconComponentProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { iconList, intentList, sizeList, tagList } from '@stories/const'

	// A real 24×24 SVG path for the heart shape — demonstrates the SVG dispatch path.
	const SVG_PATH_HEART =
		'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
</script>

<docs lang="md" src="@docs/components/Icon/OrigamIcon.md"/>
