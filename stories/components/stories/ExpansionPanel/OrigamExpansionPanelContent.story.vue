<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanelContent"
	>
		<!--
			<origam-expansion-panel-content> is the body block revealed
			when the parent panel expands. Playground — first variant.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					content: string,
					density: string,
					lazy: boolean,
					color: string,
				}>({
					content: 'Lorem ipsum body.',
					density: DENSITY.DEFAULT,
					lazy: false,
					color: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels data-cy="expansion-content-playground-parent">
					<origam-expansion-panel>
						<origam-expansion-panel-header title="Playground"/>
						<origam-expansion-panel-content v-bind="state" data-cy="expansion-content-playground"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.content" title="content"/>
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstCheckbox v-model="state.lazy"    title="lazy"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — content (text)">
			<origam-expansion-panels data-cy="expansion-content-default">
				<origam-expansion-panel>
					<origam-expansion-panel-header title="Open me"/>
					<origam-expansion-panel-content content="Body text via the `content` prop. Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-expansion-panels data-cy="expansion-content-color">
					<origam-expansion-panel>
						<origam-expansion-panel-header title="Tinted body"/>
						<origam-expansion-panel-content v-bind="state" content="Lorem ipsum body."/>
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
				<origam-expansion-panels data-cy="expansion-content-density">
					<origam-expansion-panel>
						<origam-expansion-panel-header title="Density-aware"/>
						<origam-expansion-panel-content :density="state.density" content="Body"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant title="Prop — lazy (mount on first open)">
			<origam-expansion-panels data-cy="expansion-content-lazy">
				<origam-expansion-panel>
					<origam-expansion-panel-header title="Lazy body — mounted only when first opened"/>
					<origam-expansion-panel-content lazy>
						<p style="font-size: 0.875rem;">
							This block is only inserted into the DOM the first
							time the panel opens. Useful for heavy renders
							inside many collapsed panels.
						</p>
					</origam-expansion-panel-content>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (rich content)">
			<origam-expansion-panels data-cy="expansion-content-slot">
				<origam-expansion-panel>
					<origam-expansion-panel-header title="Open for details"/>
					<origam-expansion-panel-content>
						<p style="margin: 0 0 8px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						<ul style="margin: 0; padding-left: 16px;">
							<li>Item one</li>
							<li>Item two</li>
							<li>Item three</li>
						</ul>
					</origam-expansion-panel-content>
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
	import { DENSITY } from '@origam/enums'
	import type { IColorProps, IDensityProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/ExpansionPanel/OrigamExpansionPanelContent.md"/>
