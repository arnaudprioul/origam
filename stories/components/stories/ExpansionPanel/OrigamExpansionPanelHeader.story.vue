<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanelHeader"
	>
		<!--
			<origam-expansion-panel-header> is the clickable bar of an
			<origam-expansion-panel>. Playground — first variant.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IExpansionPanelHeaderProps>({
					title: 'Section heading',
					hideActions: false,
					readonly: false,
					static: false,
					focusable: true,
					density: DENSITY.DEFAULT,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels data-cy="expansion-panel-header-playground-parent">
					<origam-expansion-panel>
						<origam-expansion-panel-header v-bind="state" data-cy="expansion-panel-header-playground"/>
						<origam-expansion-panel-content content="Body"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"       title="title"/>
				<HstSelect   v-model="state.density"     title="density" :options="densityList"/>
				<HstCheckbox v-model="state.hideActions" title="hideActions"/>
				<HstCheckbox v-model="state.readonly"    title="readonly"/>
				<HstCheckbox v-model="state.static"      title="static"/>
				<HstCheckbox v-model="state.focusable"   title="focusable"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — title">
			<origam-expansion-panels data-cy="expansion-panel-header-default">
				<origam-expansion-panel>
					<origam-expansion-panel-header title="Section heading"/>
					<origam-expansion-panel-content content="Body content for the panel."/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Prop — prependIcon & appendIcon">
			<origam-expansion-panels data-cy="expansion-panel-header-icons">
				<origam-expansion-panel>
					<origam-expansion-panel-header
							title="Settings"
							:prepend-icon="MDI_ICONS.COG_OUTLINE"
							:append-icon="MDI_ICONS.OPEN_IN_NEW"
					/>
					<origam-expansion-panel-content content="Settings panel content"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-expansion-panels data-cy="expansion-panel-header-color">
					<origam-expansion-panel>
						<origam-expansion-panel-header v-bind="state" title="Tinted header"/>
						<origam-expansion-panel-content content="Tinted body"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-expansion-panels data-cy="expansion-panel-header-density">
					<origam-expansion-panel>
						<origam-expansion-panel-header :density="state.density" title="Density-aware"/>
						<origam-expansion-panel-content content="Body"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="Prop — hideActions (no expand arrow)">
			<origam-expansion-panels data-cy="expansion-panel-header-hide-actions">
				<origam-expansion-panel>
					<origam-expansion-panel-header title="No arrow" hide-actions/>
					<origam-expansion-panel-content content="Body without an arrow toggle"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Prop — expandIcon & collapseIcon (custom icons)">
			<origam-expansion-panels data-cy="expansion-panel-header-custom-icons">
				<origam-expansion-panel>
					<origam-expansion-panel-header
							title="Plus / minus toggle"
							:expand-icon="MDI_ICONS.PLUS"
							:collapse-icon="MDI_ICONS.MINUS"
					/>
					<origam-expansion-panel-content content="Body"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamExpansionPanel,
		OrigamExpansionPanelContent,
		OrigamExpansionPanelHeader,
		OrigamExpansionPanels,
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IDensityProps, IExpansionPanelHeaderProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/ExpansionPanel/OrigamExpansionPanelHeader.md"/>
