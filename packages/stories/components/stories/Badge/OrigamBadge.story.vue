<template>
	<Story
			group="components"
			title="Badge/OrigamBadge"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IBadgeProps>>({ bgColor: 'primary', content: 3, modelValue: true, location: 'top right' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge
							:model-value="state.modelValue"
							:content="state.content"
							:color="state.color"
							:bg-color="state.bgColor"
							:rounded="state.rounded"
							:elevation="state.elevation"
							:border="state.border"
							:border-color="state.borderColor"
							:border-style="state.borderStyle"
							:status="state.status"
							:status-icon-position="state.statusIconPosition"
							:icon="state.icon || undefined"
							:location="state.location"
							:offset-x="state.offsetX"
							:offset-y="state.offsetY"
					>
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Status">
					<HstSelect v-model="state.status"             title="Status"          :options="STATUS_OPTIONS"/>
					<HstSelect v-model="state.statusIconPosition" title="Status Position" :options="STATUS_POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Icons">
					<HstSelect v-model="state.icon" title="Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Location">
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
					<HstText   v-model="state.offsetX"  title="Offset X"/>
					<HstText   v-model="state.offsetY"  title="Offset Y"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IBgColorProps & { modelValue?: boolean }>({ bgColor: 'primary', modelValue: true })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge
							:model-value="state.modelValue"
							:bg-color="state.bgColor"
							:hover="state.hover"
							:content="3"
					>
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Surface">
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Interaction">
					<HstSelect v-model="state.hover" title="Hover" :options="HOVER_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IBadgeProps>>({ modelValue: true, content: 3, dot: false, floating: false, inline: false })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge
							:model-value="state.modelValue"
							:content="state.content"
							:max="state.max"
							:dot="state.dot"
							:floating="state.floating"
							:inline="state.inline"
							:label="state.label"
							:tag="state.tag"
							bg-color="primary"
					>
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Visibility">
					<HstCheckbox v-model="state.modelValue" title="Model Value (visible)"/>
				</StoryGroup>
				<StoryGroup title="Content">
					<HstText   v-model="state.content" title="Content"/>
					<HstNumber v-model="state.max"     title="Max"/>
					<HstText   v-model="state.label"   title="Label (aria)"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.dot"      title="Dot"/>
					<HstCheckbox v-model="state.floating" title="Floating"/>
					<HstCheckbox v-model="state.inline"   title="Inline"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:hover">
			<div class="demo-host">
				<origam-badge
						:model-value="true"
						:content="3"
						bg-color="primary"
						@update:hover="logEvent('update:hover', $event)"
				>
					<origam-avatar text="AP"/>
				</origam-badge>
			</div>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div class="demo-host">
				<origam-badge :model-value="true" :content="3" bg-color="primary">
					<template #default>
						<span>Custom slot content</span>
					</template>
				</origam-badge>
			</div>
		</Variant>

		<Variant title="Slots - Badge">
			<div class="demo-host">
				<origam-badge :model-value="true" bg-color="success">
					<template #badge>
						<strong>!</strong>
					</template>
					<origam-avatar text="AP"/>
				</origam-badge>
			</div>
		</Variant>

		<Variant title="Slots - Prepend">
			<div class="demo-host">
				<origam-badge :model-value="true" :content="3" bg-color="primary">
					<origam-avatar text="AP"/>
					<template #prepend>
						<origam-icon :icon="heartIcon" size="x-small"/>
					</template>
				</origam-badge>
			</div>
		</Variant>

		<Variant title="Slots - Append">
			<div class="demo-host">
				<origam-badge :model-value="true" :content="3" bg-color="primary">
					<origam-avatar text="AP"/>
					<template #append>
						<origam-icon :icon="heartIcon" size="x-small"/>
					</template>
				</origam-badge>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IBadgeProps>({ modelValue: true, content: 3, bgColor: 'primary', location: 'top right' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge v-bind="state" @update:hover="logEvent('update:hover', $event)">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText   v-model="state.content" title="Content"/>
					<HstNumber v-model="state.max"     title="Max"/>
					<HstText   v-model="state.label"   title="Label (aria)"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
					<HstSelect v-model="state.status"    title="Status"    :options="STATUS_OPTIONS"/>
					<HstSelect v-model="state.location"  title="Location"  :options="LOCATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.modelValue" title="Model Value"/>
					<HstCheckbox v-model="state.dot"        title="Dot"/>
					<HstCheckbox v-model="state.floating"   title="Floating"/>
					<HstCheckbox v-model="state.inline"     title="Inline"/>
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

	import { OrigamAvatar, OrigamBadge, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IBadgeProps,
		IBgColorProps,
		IHoverProps,
		IOptions
	} from '@origam/interfaces'
	import type { TAnchor } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		STATUS_OPTIONS,
		STATUS_POSITION_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const heartIcon = MDI_ICONS.HEART

	const LOCATION_OPTIONS: Array<IOptions<TAnchor>> = [
		{ label: 'top right',     value: 'top right'     as TAnchor },
		{ label: 'top left',      value: 'top left'      as TAnchor },
		{ label: 'top center',    value: 'top center'    as TAnchor },
		{ label: 'bottom right',  value: 'bottom right'  as TAnchor },
		{ label: 'bottom left',   value: 'bottom left'   as TAnchor },
		{ label: 'bottom center', value: 'bottom center' as TAnchor }
	]
</script>

<style scoped>
	.demo-host {
		display: inline-flex;
		padding: 16px;
	}
</style>

<docs lang="md" src="@docs/components/Badge/OrigamBadge.md"/>
