<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumbDivider"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IBreadcrumbDividerProps>>({ divider: '/' })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span>Segment A</span>
					<origam-breadcrumb-divider
							:divider="state.divider"
							:color="state.color"
							:size="state.size"
							:density="state.density"
							:padding="state.padding"
							:padding-inline="state.paddingInline"
							:margin="state.margin"
							:margin-inline="state.marginInline"
					/>
					<span>Segment B</span>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.divider" title="Divider"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color" title="Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding"       title="Padding"/>
					<HstText v-model="state.paddingInline" title="Padding Inline"/>
					<HstText v-model="state.margin"        title="Margin"/>
					<HstText v-model="state.marginInline"  title="Margin Inline"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div style="display: flex; align-items: center; gap: 8px;">
				<span>Segment A</span>
				<origam-breadcrumb-divider divider="/">
					<template #default>
						<strong>»</strong>
					</template>
				</origam-breadcrumb-divider>
				<span>Segment B</span>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IBreadcrumbDividerProps>({ divider: '/' })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span>Segment A</span>
					<origam-breadcrumb-divider v-bind="state"/>
					<span>Segment B</span>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.divider" title="Divider"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"   :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding"       title="Padding"/>
					<HstText v-model="state.paddingInline" title="Padding Inline"/>
					<HstText v-model="state.margin"        title="Margin"/>
					<HstText v-model="state.marginInline"  title="Margin Inline"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBreadcrumbDivider } from '@origam/components'
	import type { IBreadcrumbDividerProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		SIZE_OPTIONS
	} from '@stories/const'
</script>
