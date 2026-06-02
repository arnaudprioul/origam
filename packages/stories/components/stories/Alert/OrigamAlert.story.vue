<template>
	<Story
			group="components"
			title="Alert/OrigamAlert"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAlertProps>>({ text: 'Alert message.', status: undefined, color: undefined, bgColor: undefined })"
		>
			<template #default="{ state }">
				<origam-alert
						:status="state.status"
						:status-icon-position="state.statusIconPosition"
						:color="state.color"
						:bg-color="state.bgColor"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:prepend-icon="state.prependIcon || undefined"
						:append-icon="state.appendIcon || undefined"
						:width="state.width"
						:height="state.height"
						:text="state.text"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Status">
					<HstSelect v-model="state.status"             title="Status"          :options="STATUS_OPTIONS"/>
					<HstSelect v-model="state.statusIconPosition" title="Status Position" :options="STATUS_POSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
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
				<StoryGroup title="Icons">
					<HstSelect v-model="state.prependIcon" title="Prepend Icon" :options="ICON_OPTIONS"/>
					<HstSelect v-model="state.appendIcon"  title="Append Icon"  :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<IHoverProps & IBgColorProps>({ bgColor: 'info' })"
		>
			<template #default="{ state }">
				<origam-alert :bg-color="state.bgColor" :hover="state.hover" text="Hover over this alert."/>
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
				:init-state="() => useStoryInitState<Partial<IAlertProps>>({ text: 'Alert message.', title: '', modelValue: true, closable: false, prominent: false })"
		>
			<template #default="{ state }">
				<origam-alert
						:text="state.text"
						:title="state.title || undefined"
						:model-value="state.modelValue"
						:closable="state.closable"
						:close-icon="state.closeIcon || undefined"
						:prominent="state.prominent"
						:tag="state.tag"
						@click:close="state.modelValue = false"
						@update:model-value="state.modelValue = $event"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text"  title="Text"/>
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.modelValue" title="Model Value (visible)"/>
					<HstCheckbox v-model="state.closable"   title="Closable"/>
					<HstCheckbox v-model="state.prominent"  title="Prominent"/>
				</StoryGroup>
				<StoryGroup title="Close">
					<HstSelect v-model="state.closeIcon" title="Close Icon" :options="ICON_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - click:close">
			<origam-alert
					closable
					text="Click the close button to fire click:close."
					@click:close="logEvent('click:close', $event)"
			/>
		</Variant>

		<Variant title="Events - update:hover">
			<origam-alert
					text="Hover over this alert to fire update:hover."
					@update:hover="logEvent('update:hover', $event)"
			/>
		</Variant>

		<Variant title="Events - update:modelValue">
			<origam-alert
					closable
					text="Dismiss this alert to fire update:modelValue."
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-alert>
				<span>Custom default slot content</span>
			</origam-alert>
		</Variant>

		<Variant title="Slots - Title">
			<origam-alert text="Body text.">
				<template #title>
					<strong>Custom title via slot</strong>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slots - Text">
			<origam-alert>
				<template #text>
					<em>Custom text slot content</em>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slots - Prepend">
			<origam-alert text="Custom prepend slot.">
				<template #prepend>
					<origam-icon :icon="shieldIcon"/>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slots - Append">
			<origam-alert text="Alert with append slot.">
				<template #append>
					<origam-icon :icon="heartIcon"/>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slots - Close">
			<origam-alert closable text="Alert with custom close slot.">
				<template #close>
					<origam-icon :icon="closeCircleIcon"/>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slots - Wrapper">
			<origam-alert>
				<template #wrapper>
					<div style="padding: 16px; border: 2px dashed var(--origam-color__border---subtle);">
						<span>Custom wrapper slot content</span>
					</div>
				</template>
			</origam-alert>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAlertProps>({ text: 'Alert message.', status: undefined })"
		>
			<template #default="{ state }">
				<origam-alert v-bind="state" @click:close="logEvent('click:close', $event)" @update:hover="logEvent('update:hover', $event)"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text"  title="Text"/>
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.status"   title="Status"   :options="STATUS_OPTIONS"/>
					<HstSelect   v-model="state.color"    title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"  title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.density"  title="Density"  :options="DENSITY_OPTIONS"/>
					<HstSelect   v-model="state.rounded"  title="Rounded"  :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.closable"   title="Closable"/>
					<HstCheckbox v-model="state.prominent"  title="Prominent"/>
					<HstCheckbox v-model="state.modelValue" title="Visible (modelValue)"/>
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

	import { OrigamAlert, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IAlertProps,
		IBgColorProps,
		IHoverProps
	} from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		ICON_OPTIONS,
		ROUNDED_OPTIONS,
		STATUS_OPTIONS,
		STATUS_POSITION_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const shieldIcon = MDI_ICONS.SHIELD_CHECK
	const heartIcon = MDI_ICONS.HEART
	const closeCircleIcon = MDI_ICONS.CLOSE_CIRCLE
</script>

<docs lang="md" src="@docs/components/Alert/OrigamAlert.md"/>
