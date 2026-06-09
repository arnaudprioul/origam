<template>
	<Story
			group="components"
			title="Tooltip/OrigamTooltip"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ITooltipProps>>({
					text: 'Tooltip text',
					location: 'right',
					color: undefined,
					bgColor: undefined,
					offset: 10
				})"
		>
			<template #default="{ state }">
				<div class="tooltip-story-host">
					<origam-tooltip
							:color="state.color"
							:bg-color="state.bgColor"
							:location="state.location"
							:origin="state.origin"
							:offset="state.offset"
							:viewport-margin="state.viewportMargin"
							:width="state.width"
							:height="state.height"
							:min-width="state.minWidth"
							:max-width="state.maxWidth"
							:min-height="state.minHeight"
							:max-height="state.maxHeight"
							:text="state.text"
							open-on-hover
					>
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Hover me"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Position">
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
					<HstText   v-model="state.origin"   title="Origin"/>
					<HstNumber v-model="state.offset"   title="Offset"/>
					<HstNumber v-model="state.viewportMargin" title="Viewport Margin"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"     title="Width"/>
					<HstText v-model="state.height"    title="Height"/>
					<HstText v-model="state.minWidth"  title="Min Width"/>
					<HstText v-model="state.maxWidth"  title="Max Width"/>
					<HstText v-model="state.minHeight" title="Min Height"/>
					<HstText v-model="state.maxHeight" title="Max Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ITooltipProps>>({
					text: 'Tooltip text',
					openOnHover: true,
					openOnClick: false,
					openOnContextMenu: false,
					openOnFocus: false,
					closeOnContentClick: false,
					closeOnBack: false,
					openDelay: undefined,
					closeDelay: undefined,
					eager: true,
					disabled: false,
					scrollStrategy: 'reposition',
					locationStrategy: 'connected',
					scrim: false,
					persistent: true
				})"
		>
			<template #default="{ state }">
				<div class="tooltip-story-host">
					<origam-tooltip
							:text="state.text"
							:open-on-hover="state.openOnHover"
							:open-on-click="state.openOnClick"
							:open-on-context-menu="state.openOnContextMenu"
							:open-on-focus="state.openOnFocus"
							:close-on-content-click="state.closeOnContentClick"
							:close-on-back="state.closeOnBack"
							:open-delay="state.openDelay"
							:close-delay="state.closeDelay"
							:eager="state.eager"
							:disabled="state.disabled"
							:scroll-strategy="state.scrollStrategy"
							:location-strategy="state.locationStrategy"
							:scrim="state.scrim"
							:persistent="state.persistent"
					>
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Interact with me"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
				</StoryGroup>
				<StoryGroup title="Open Triggers">
					<HstCheckbox v-model="state.openOnHover"        title="Open on Hover"/>
					<HstCheckbox v-model="state.openOnClick"        title="Open on Click"/>
					<HstCheckbox v-model="state.openOnContextMenu"  title="Open on Context Menu"/>
					<HstCheckbox v-model="state.openOnFocus"        title="Open on Focus"/>
					<HstCheckbox v-model="state.closeOnContentClick" title="Close on Content Click"/>
					<HstCheckbox v-model="state.closeOnBack"        title="Close on Back"/>
				</StoryGroup>
				<StoryGroup title="Delays">
					<HstNumber v-model="state.openDelay"  title="Open Delay (ms)"/>
					<HstNumber v-model="state.closeDelay" title="Close Delay (ms)"/>
				</StoryGroup>
				<StoryGroup title="Strategy">
					<HstSelect v-model="state.locationStrategy" title="Location Strategy" :options="LOCATION_STRATEGY_OPTIONS"/>
					<HstSelect v-model="state.scrollStrategy"   title="Scroll Strategy"   :options="SCROLL_STRATEGY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled"   title="Disabled"/>
					<HstCheckbox v-model="state.eager"      title="Eager"/>
					<HstCheckbox v-model="state.scrim"      title="Scrim"/>
					<HstCheckbox v-model="state.persistent" title="Persistent"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Events - update:modelValue">
			<div class="tooltip-story-host">
				<origam-tooltip
						text="Watch Events tab"
						open-on-hover
						@update:model-value="logEvent('update:modelValue', $event)"
				>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Hover (watch Events)"/>
					</template>
				</origam-tooltip>
			</div>
		</Variant>

		<Variant title="Slots - Activator">
			<div class="tooltip-story-host">
				<origam-tooltip text="Tooltip text" open-on-hover>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Custom activator"/>
					</template>
				</origam-tooltip>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div class="tooltip-story-host">
				<origam-tooltip location="top" open-on-hover>
					<template #activator="{ props: a }">
						<origam-btn v-bind="a" text="Rich tooltip"/>
					</template>
					<strong>Bold</strong> tooltip with <em>custom markup</em>.
				</origam-tooltip>
			</div>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ITooltipProps>({
					text: 'Tooltip text',
					location: 'right',
					openOnHover: true,
					openOnClick: false,
					offset: 10
				})"
		>
			<template #default="{ state }">
				<div class="tooltip-story-host">
					<origam-tooltip v-bind="state" @update:model-value="logEvent('update:modelValue', $event)">
						<template #activator="{ props: a }">
							<origam-btn v-bind="a" text="Interact with me"/>
						</template>
					</origam-tooltip>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.text" title="Text"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"    title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"  title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
					<HstNumber v-model="state.offset"   title="Offset"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.openOnHover" title="Open on Hover"/>
					<HstCheckbox v-model="state.openOnClick" title="Open on Click"/>
					<HstCheckbox v-model="state.disabled"    title="Disabled"/>
					<HstCheckbox v-model="state.eager"       title="Eager"/>
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

	import { OrigamBtn, OrigamTooltip } from '@origam/components'
	import { LOCATION_STRATEGIES, SCROLL_STRATEGIES } from '@origam/enums'
	import type { ITooltipProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import { COLOR_OPTIONS } from '@stories/const'

	const LOCATION_OPTIONS = [
		{ label: 'top',    value: 'top' },
		{ label: 'bottom', value: 'bottom' },
		{ label: 'left',   value: 'left' },
		{ label: 'right',  value: 'right' },
		{ label: 'top center',    value: 'top center' },
		{ label: 'bottom center', value: 'bottom center' },
		{ label: 'left center',   value: 'left center' },
		{ label: 'right center',  value: 'right center' },
	]

	const LOCATION_STRATEGY_OPTIONS = [
		{ label: 'connected', value: LOCATION_STRATEGIES.CONNECTED },
		{ label: 'static',    value: LOCATION_STRATEGIES.STATIC },
	]

	const SCROLL_STRATEGY_OPTIONS = [
		{ label: 'reposition', value: SCROLL_STRATEGIES.REPOSITION },
		{ label: 'close',      value: SCROLL_STRATEGIES.CLOSE },
		{ label: 'block',      value: SCROLL_STRATEGIES.BLOCK },
		{ label: 'none',       value: SCROLL_STRATEGIES.NONE },
	]
</script>

<style scoped>
	.tooltip-story-host {
		padding: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>

<docs lang="md" src="@docs/components/Tooltip/OrigamTooltip.md"/>
