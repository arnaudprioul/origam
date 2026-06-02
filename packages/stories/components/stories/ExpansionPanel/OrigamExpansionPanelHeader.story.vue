<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanelHeader"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IExpansionPanelHeaderProps>>({
					title: 'Section heading',
					color: undefined,
					bgColor: undefined,
					density: undefined,
					rounded: undefined,
					border: undefined,
					borderColor: undefined,
					borderStyle: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
					expandIcon: undefined,
					collapseIcon: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel>
						<origam-expansion-panel-header
								:title="state.title"
								:color="state.color"
								:bg-color="state.bgColor"
								:density="state.density"
								:rounded="state.rounded"
								:border="state.border"
								:border-color="state.borderColor"
								:border-style="state.borderStyle"
								:prepend-icon="state.prependIcon || undefined"
								:append-icon="state.appendIcon || undefined"
								:expand-icon="state.expandIcon || undefined"
								:collapse-icon="state.collapseIcon || undefined"
						/>
						<origam-expansion-panel-content content="Body content"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prependIcon"  title="Prepend Icon"   :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.appendIcon"   title="Append Icon"    :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.expandIcon"   title="Expand Icon"    :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.collapseIcon" title="Collapse Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IBgColorProps & { active?: boolean | object }>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel>
						<origam-expansion-panel-header
								:bg-color="state.bgColor"
								:hover="state.hover"
								:active="state.active"
								title="State header"
						/>
						<origam-expansion-panel-content content="Body"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect v-model="state.hover"  title="Hover"  :options="HOVER_OPTIONS"/>
					<HstSelect v-model="state.active" title="Active" :options="ACTIVE_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IExpansionPanelHeaderProps>>({
					hideActions: false,
					readonly: false,
					static: false,
					focusable: true,
					ripple: true,
					tag: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel>
						<origam-expansion-panel-header
								:hide-actions="state.hideActions"
								:readonly="state.readonly"
								:static="state.static"
								:focusable="state.focusable"
								:ripple="state.ripple"
								:tag="state.tag"
								title="Functional header"
						/>
						<origam-expansion-panel-content content="Body"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.hideActions" title="Hide Actions"/>
					<HstCheckbox v-model="state.readonly"    title="Readonly"/>
					<HstCheckbox v-model="state.static"      title="Static"/>
					<HstCheckbox v-model="state.focusable"   title="Focusable"/>
					<HstCheckbox v-model="state.ripple"      title="Ripple"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - click:append">
			<origam-expansion-panels>
				<origam-expansion-panel>
					<origam-expansion-panel-header
							title="Click the append icon"
							:append-icon="appendIcon"
							@click:append="logEvent('click:append', $event)"
					/>
					<origam-expansion-panel-content content="Body"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Events - click:prepend">
			<origam-expansion-panels>
				<origam-expansion-panel>
					<origam-expansion-panel-header
							title="Click the prepend icon"
							:prepend-icon="prependIcon"
							@click:prepend="logEvent('click:prepend', $event)"
					/>
					<origam-expansion-panel-content content="Body"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-expansion-panels>
				<origam-expansion-panel>
					<origam-expansion-panel-header>
						<span>Custom default slot content</span>
					</origam-expansion-panel-header>
					<origam-expansion-panel-content content="Body"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Slots - Prepend">
			<origam-expansion-panels>
				<origam-expansion-panel>
					<origam-expansion-panel-header title="With prepend slot">
						<template #prepend>
							<origam-icon :icon="prependIcon"/>
						</template>
					</origam-expansion-panel-header>
					<origam-expansion-panel-content content="Body"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<Variant title="Slots - Append">
			<origam-expansion-panels>
				<origam-expansion-panel>
					<origam-expansion-panel-header title="With append slot">
						<template #append>
							<origam-icon :icon="appendIcon"/>
						</template>
					</origam-expansion-panel-header>
					<origam-expansion-panel-content content="Body"/>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IExpansionPanelHeaderProps>({
					title: 'Section heading',
					hideActions: false,
					readonly: false,
					static: false,
					focusable: true,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels>
					<origam-expansion-panel>
						<origam-expansion-panel-header
								v-bind="state"
								@click:append="logEvent('click:append', $event)"
								@click:prepend="logEvent('click:prepend', $event)"
						/>
						<origam-expansion-panel-content content="Body content"/>
					</origam-expansion-panel>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.title"       title="Title"/>
					<HstSelect v-model="state.prependIcon" title="Prepend Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.appendIcon"  title="Append Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density"  :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded" title="Rounded"  :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.hideActions" title="Hide Actions"/>
					<HstCheckbox v-model="state.readonly"    title="Readonly"/>
					<HstCheckbox v-model="state.static"      title="Static"/>
					<HstCheckbox v-model="state.focusable"   title="Focusable"/>
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

	import {
		OrigamExpansionPanel,
		OrigamExpansionPanelContent,
		OrigamExpansionPanelHeader,
		OrigamExpansionPanels,
		OrigamIcon,
	} from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IBgColorProps,
		IExpansionPanelHeaderProps,
		IHoverProps,
	} from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		HOVER_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS,
	} from '@stories/const'

	const prependIcon = MDI_ICONS.COG_OUTLINE
	const appendIcon = MDI_ICONS.OPEN_IN_NEW
</script>

<docs lang="md" src="@docs/components/ExpansionPanel/OrigamExpansionPanelHeader.md"/>
