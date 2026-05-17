<template>
	<Story
			group="components"
			title="List/OrigamListGroup"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IListGroupProps>({
					title: 'Group',
					color: undefined,
					bgColor: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
					expandIcon: MDI_ICONS.CHEVRON_DOWN,
					collapseIcon: MDI_ICONS.CHEVRON_UP,
					fluid: false,
				})"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group v-bind="state" data-cy="list-group-playground">
						<template #items>
							<origam-list-item title="Item one"/>
							<origam-list-item title="Item two"/>
							<origam-list-item title="Item three"/>
						</template>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.title"        title="title"/>
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect v-model="state.prependIcon"  title="prependIcon"  :options="iconList"/>
				<HstSelect v-model="state.appendIcon"   title="appendIcon"   :options="iconList"/>
				<HstSelect v-model="state.expandIcon"   title="expandIcon"   :options="iconList"/>
				<HstSelect v-model="state.collapseIcon" title="collapseIcon" :options="iconList"/>
				<HstCheckbox v-model="state.fluid"      title="fluid"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant
				title="Prop — expandIcon & collapseIcon"
				:init-state="() => useStoryInitState<{ expandIcon?: TIcon, collapseIcon?: TIcon }>({ expandIcon: MDI_ICONS.CHEVRON_DOWN, collapseIcon: MDI_ICONS.CHEVRON_UP })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group
							:expand-icon="state.expandIcon"
							:collapse-icon="state.collapseIcon"
							title="Expand / Collapse icons"
							data-cy="list-group-icons"
					>
						<template #items>
							<origam-list-item title="Item one"/>
							<origam-list-item title="Item two"/>
						</template>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.expandIcon"   title="expandIcon"   :options="iconList"/>
				<HstSelect v-model="state.collapseIcon" title="collapseIcon" :options="iconList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group v-bind="state" title="Colored group" data-cy="list-group-color">
						<template #items>
							<origam-list-item title="Item one"/>
							<origam-list-item title="Item two"/>
						</template>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — adjacent (prependIcon / appendIcon)"
				:init-state="() => useStoryInitState<IAdjacentProps>({ prependIcon: MDI_ICONS.FOLDER })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group v-bind="state" title="Group with icons" data-cy="list-group-adjacent">
						<template #items>
							<origam-list-item title="Item one"/>
							<origam-list-item title="Item two"/>
						</template>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — fluid"
				:init-state="() => useStoryInitState<{ fluid: boolean }>({ fluid: true })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-group :fluid="state.fluid" title="Fluid group" data-cy="list-group-fluid">
						<template #items>
							<origam-list-item title="Item one"/>
							<origam-list-item title="Item two"/>
						</template>
					</origam-list-group>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fluid" title="fluid"/>
			</template>
		</Variant>

		<Variant title="Prop — nested (recursive groups)">
			<origam-list data-cy="list-group-nested">
				<origam-list-group title="Parent" :prepend-icon="MDI_ICONS.FOLDER" data-cy="list-group-parent">
					<template #items>
						<origam-list-item title="Direct child"/>
						<origam-list-group title="Child group" data-cy="list-group-child">
							<template #items>
								<origam-list-item title="Nested item one"/>
								<origam-list-item title="Nested item two"/>
							</template>
						</origam-list-group>
					</template>
				</origam-list-group>
			</origam-list>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-list>
				<origam-list-group data-cy="list-group-slot-default">
					<div style="padding: 8px 16px; font-style: italic;">Fully custom default slot content</div>
				</origam-list-group>
			</origam-list>
		</Variant>

		<Variant title="Slot — activator">
			<origam-list>
				<origam-list-group title="Group A" data-cy="list-group-slot-activator">
					<template #activator="{ events, props, isOpen, toggleIcon }">
						<origam-list-item
								v-bind="props"
								v-on="events"
								:append-icon="toggleIcon"
								:prepend-icon="isOpen ? MDI_ICONS.FOLDER_OPEN : MDI_ICONS.FOLDER"
								title="Custom activator"
								data-cy="list-group-slot-activator-item"
						/>
					</template>
					<template #items>
						<origam-list-item title="Child item one"/>
						<origam-list-item title="Child item two"/>
					</template>
				</origam-list-group>
			</origam-list>
		</Variant>

		<Variant title="Slot — items">
			<origam-list>
				<origam-list-group title="Custom items" data-cy="list-group-slot-items">
					<template #items>
						<origam-list-item :prepend-icon="MDI_ICONS.STAR" title="Custom item one" data-cy="list-group-slot-item-1"/>
						<origam-list-item :prepend-icon="MDI_ICONS.STAR" title="Custom item two" data-cy="list-group-slot-item-2"/>
					</template>
				</origam-list-group>
			</origam-list>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant title="Emit — click:activator">
			<origam-list>
				<origam-list-group
						title="Click the header"
						data-cy="list-group-emit-activator"
						@click:activator="logEvent('click:activator', $event)"
				>
					<template #items>
						<origam-list-item title="Item one"/>
					</template>
				</origam-list-group>
			</origam-list>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamList, OrigamListGroup, OrigamListItem } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IAdjacentProps, IColorProps, IListGroupProps } from '@origam/interfaces'
	import type { TIcon } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { iconList, intentList } from '@stories/const'
</script>
