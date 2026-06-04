<template>
	<Story
			group="components"
			title="Avatar/OrigamAvatarGroup"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAvatarGroupProps>>({
					color: undefined,
					bgColor: 'primary',
					size: undefined,
					density: undefined,
					rounded: undefined,
					elevation: undefined,
					border: undefined,
					direction: 'horizontal'
				})"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:items="people"
						:max="4"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:direction="state.direction"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border" title="Border" :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Direction">
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<Partial<IAvatarGroupProps>>({
					bgColor: 'primary',
					expandOnHover: true,
					expandOnClick: true
				})"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:items="people"
						:max="4"
						:bg-color="state.bgColor"
						:expand-on-hover="state.expandOnHover"
						:expand-on-click="state.expandOnClick"
						:hover="resolveHoverState(state.hover)"
						:active="resolveActiveState(state.active)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Expand">
					<HstCheckbox v-model="state.expandOnHover" title="Expand on Hover"/>
					<HstCheckbox v-model="state.expandOnClick" title="Expand on Click"/>
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
				:init-state="() => useStoryInitState<Partial<IAvatarGroupProps>>({
					max: 4,
					expandOnHover: false,
					expandOnClick: false,
					tag: undefined
				})"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:items="people"
						:max="state.max"
						:expand-on-hover="state.expandOnHover"
						:expand-on-click="state.expandOnClick"
						:tag="state.tag"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Data">
					<HstNumber v-model="state.max" title="Max" :min="1" :max="10"/>
				</StoryGroup>
				<StoryGroup title="Behaviour">
					<HstCheckbox v-model="state.expandOnHover" title="Expand on Hover"/>
					<HstCheckbox v-model="state.expandOnClick" title="Expand on Click"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:active">
			<origam-avatar-group
					:items="people"
					:max="3"
					expand-on-click
					@update:active="logEvent('update:active', $event)"
			/>
		</Variant>

		<Variant title="Events - update:hover">
			<origam-avatar-group
					:items="people"
					:max="3"
					expand-on-hover
					@update:hover="logEvent('update:hover', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-avatar-group :items="people" :max="4">
				<span>Custom slot content</span>
			</origam-avatar-group>
		</Variant>

		<Variant title="Slots - Avatar">
			<origam-avatar-group :items="people" :max="4">
				<template #avatar="{ item, index }">
					<origam-avatar
							:bg-color="index % 2 === 0 ? 'primary' : 'secondary'"
							class="origam-avatar-group__item"
							:text="(item as IAvatarProps).text"
					/>
				</template>
			</origam-avatar-group>
		</Variant>

		<Variant title="Slots - Rest">
			<origam-avatar-group :items="people" :max="3">
				<template #rest="{ length }">
					<origam-avatar
							class="origam-avatar-group__rest"
							bg-color="info"
							:text="`+${length}`"
					/>
				</template>
			</origam-avatar-group>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Omit<IAvatarGroupProps, 'items'>>({
					max: 4,
					direction: 'horizontal',
					expandOnHover: false,
					expandOnClick: false,
					bgColor: 'primary'
				})"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:items="people"
						:max="state.max"
						:direction="state.direction"
						:expand-on-hover="state.expandOnHover"
						:expand-on-click="state.expandOnClick"
						:color="state.color"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstNumber v-model="state.max" title="Max" :min="1" :max="10"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.size"      title="Size"      :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
					<HstSelect v-model="state.direction" title="Direction" :options="DIRECTION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.expandOnHover" title="Expand on Hover"/>
					<HstCheckbox v-model="state.expandOnClick" title="Expand on Click"/>
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

	import { OrigamAvatar, OrigamAvatarGroup } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type {
		IAvatarGroupProps,
		IAvatarProps,
		IOptions
	} from '@origam/interfaces'
	import type { TDirection } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		resolveActiveState,
		BORDER_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		resolveHoverState,
		ROUNDED_OPTIONS,
		SIZE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const DIRECTION_OPTIONS: Array<IOptions<TDirection>> = [
		{ label: 'Horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'Vertical',   value: DIRECTION.VERTICAL }
	]

	const people: Array<IAvatarProps> = [
		{ text: 'AP', bgColor: 'primary' },
		{ text: 'JC', bgColor: 'secondary' },
		{ text: 'MS', bgColor: 'success' },
		{ text: 'KL', bgColor: 'warning' },
		{ text: 'RT', bgColor: 'danger' },
		{ text: 'NB', bgColor: 'info' },
		{ text: 'OT', bgColor: 'neutral' }
	]
</script>

<docs lang="md" src="@docs/components/Avatar/OrigamAvatarGroup.md"/>
