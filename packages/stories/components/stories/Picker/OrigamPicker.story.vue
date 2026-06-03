<template>
	<Story
			group="components"
			title="Picker/OrigamPicker"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IPickerProps>>({ title: 'Picker', bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-picker
						:color="state.color"
						:bg-color="state.bgColor"
						:elevation="state.elevation"
						:rounded="state.rounded"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:width="state.width"
						:height="state.height"
						:title="state.title"
				>
					<div style="padding: 12px 16px;">Body content.</div>
					<template #actions>
						<origam-btn variant="text" text="Cancel"/>
						<origam-btn text="Save"/>
					</template>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT (design + fonctionnel) ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IActiveProps & IBgColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-picker
						:bg-color="state.bgColor"
						:hover="resolveHoverState(state.hover)"
						:active="resolveActiveState(state.active)"
						title="Picker"
				>
					<div style="padding: 12px 16px;">Body content.</div>
				</origam-picker>
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
				:init-state="() => useStoryInitState<Partial<IPickerProps>>({ title: 'Picker', landscape: false, hideHeader: false })"
		>
			<template #default="{ state }">
				<origam-picker
						:title="state.title"
						:landscape="state.landscape"
						:hide-header="state.hideHeader"
						:tag="state.tag"
						:side="state.side"
						:disabled="state.disabled"
						:persistent="state.persistent"
						:open="state.open"
						:default-snap="state.defaultSnap"
				>
					<template v-if="!state.hideHeader" #header>
						<div style="padding: 12px 16px;">Header zone</div>
					</template>
					<div style="padding: 12px 16px;">Body content.</div>
					<template #actions>
						<origam-btn variant="text" text="Cancel"/>
						<origam-btn text="Save"/>
					</template>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.landscape"  title="Landscape"/>
					<HstCheckbox v-model="state.hideHeader" title="Hide Header"/>
				</StoryGroup>
				<StoryGroup title="Sheet">
					<HstSelect   v-model="state.side"         title="Side"          :options="SIDE_OPTIONS"/>
					<HstSelect   v-model="state.defaultSnap"  title="Default Snap"  :options="SNAP_OPTIONS"/>
					<HstCheckbox v-model="state.disabled"     title="Disabled"/>
					<HstCheckbox v-model="state.persistent"   title="Persistent"/>
					<HstCheckbox v-model="state.open"         title="Open"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-picker title="Default slot">
				<p style="padding: 12px 16px;">Custom slot content via the <strong>default</strong> slot.</p>
			</origam-picker>
		</Variant>

		<Variant title="Slots - Title">
			<origam-picker>
				<template #title>
					<origam-picker-title
							tag="h2"
							title="Custom title via slot"
					/>
				</template>
				<div style="padding: 12px 16px;">Body content.</div>
			</origam-picker>
		</Variant>

		<Variant title="Slots - Header">
			<origam-picker title="With header">
				<template #header>
					<div style="padding: 12px 16px; background: var(--origam-color__surface---overlay, #f3f3f3);">
						Custom header content
					</div>
				</template>
				<div style="padding: 12px 16px;">Body content.</div>
			</origam-picker>
		</Variant>

		<Variant title="Slots - Actions">
			<origam-picker title="With actions">
				<div style="padding: 12px 16px;">Body content.</div>
				<template #actions>
					<origam-btn variant="text" text="Cancel"/>
					<origam-btn text="Save"/>
				</template>
			</origam-picker>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IPickerProps>({ title: 'Picker', bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-picker v-bind="state">
					<template #header>
						<div style="padding: 12px 16px;">Header zone</div>
					</template>
					<div style="padding: 12px 16px;">Body content.</div>
					<template #actions>
						<origam-btn variant="text" text="Cancel"/>
						<origam-btn text="Save"/>
					</template>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.landscape"  title="Landscape"/>
					<HstCheckbox v-model="state.hideHeader" title="Hide Header"/>
					<HstCheckbox v-model="state.disabled"   title="Disabled"/>
					<HstCheckbox v-model="state.persistent" title="Persistent"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamPicker, OrigamPickerTitle } from '@origam/components'
	import { BLOCK, INLINE } from '@origam/enums'
	import type {
		IActiveProps,
		IBgColorProps,
		IHoverProps,
		IOptions,
		IPickerProps
	} from '@origam/interfaces'
	import type { TDirectionBoth, TSheetSnapId } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		resolveActiveState,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		resolveHoverState,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const SIDE_OPTIONS: Array<IOptions<TDirectionBoth | undefined>> = [
		{ label: '(none)', value: undefined },
		{ label: 'Top',    value: BLOCK.TOP },
		{ label: 'Bottom', value: BLOCK.BOTTOM },
		{ label: 'Left',   value: INLINE.LEFT },
		{ label: 'Right',  value: INLINE.RIGHT }
	]

	const SNAP_OPTIONS: Array<IOptions<TSheetSnapId | undefined>> = [
		{ label: '(none)',  value: undefined },
		{ label: 'Closed',  value: 'closed' },
		{ label: 'Peek',    value: 'peek' },
		{ label: 'Half',    value: 'half' },
		{ label: 'Full',    value: 'full' }
	]
</script>

<docs
		lang="md"
		src="@docs/components/Picker/OrigamPicker.md"
/>
