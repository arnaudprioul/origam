<template>
	<Story
			group="components"
			title="Divider/OrigamDivider"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IDividerProps>>({ direction: 'horizontal' })"
		>
			<template #default="{ state }">
				<div
						v-if="state.direction === 'vertical'"
						style="display: flex; gap: 12px; align-items: center; height: 64px;"
				>
					<span>Left</span>
					<origam-divider
							:direction="state.direction"
							:color="state.color"
							:bg-color="state.bgColor"
							:length="state.length"
							:thickness="state.thickness"
							:inset="state.inset"
							:margin="state.margin"
					/>
					<span>Right</span>
				</div>
				<div
						v-else
						style="display: flex; flex-direction: column; gap: 12px;"
				>
					<span>Top</span>
					<origam-divider
							:direction="state.direction"
							:color="state.color"
							:bg-color="state.bgColor"
							:length="state.length"
							:thickness="state.thickness"
							:inset="state.inset"
							:margin="state.margin"
					/>
					<span>Bottom</span>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Direction">
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstCheckbox v-model="state.inset" title="Inset"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.length"    title="Length (px or CSS)"/>
					<HstText v-model="state.thickness" title="Thickness (px or CSS)"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.margin" title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDividerProps>({ direction: 'horizontal' })"
		>
			<template #default="{ state }">
				<div
						v-if="state.direction === 'vertical'"
						style="display: flex; gap: 12px; align-items: center; height: 64px;"
				>
					<span>Left</span>
					<origam-divider v-bind="state"/>
					<span>Right</span>
				</div>
				<div
						v-else
						style="display: flex; flex-direction: column; gap: 12px;"
				>
					<span>Top</span>
					<origam-divider v-bind="state"/>
					<span>Bottom</span>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
					<HstCheckbox v-model="state.inset"   title="Inset"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstText v-model="state.length"    title="Length"/>
					<HstText v-model="state.thickness" title="Thickness"/>
					<HstText v-model="state.margin"    title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDivider } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type { IDividerProps, IOptions } from '@origam/interfaces'
	import type { TDirection } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS } from '@stories/const'

	const DIRECTION_OPTIONS: Array<IOptions<TDirection | undefined>> = [
		{ label: '(default — horizontal)', value: undefined },
		{ label: 'Horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'Vertical', value: DIRECTION.VERTICAL },
	]
</script>

<docs lang="md" src="@docs/components/Divider/OrigamDivider.md"/>
