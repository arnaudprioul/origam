<template>
	<Story
			group="components"
			title="App/OrigamAppBar"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IAppBarProps>>({
					title: 'My Application',
					color: undefined,
					bgColor: undefined,
					density: undefined,
					elevation: undefined,
					rounded: undefined,
					border: undefined,
					borderColor: undefined,
					borderStyle: undefined,
					width: undefined,
					height: undefined
				})"
		>
			<template #default="{ state }">
				<div class="app-bar-story-wrapper">
					<origam-app :full-height="false">
						<origam-app-bar
								:order="0"
								:title="state.title"
								:color="state.color"
								:bg-color="state.bgColor"
								:density="state.density"
								:elevation="state.elevation"
								:rounded="state.rounded"
								:border="state.border"
								:border-color="state.borderColor"
								:border-style="state.borderStyle"
								:width="state.width"
								:height="state.height"
								data-cy="app-bar-design"
						>
							<template #prepend>
								<origam-btn :icon="menuIcon" aria-label="Navigation menu"/>
							</template>
							<template #append>
								<origam-btn :icon="moreIcon" aria-label="More options"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<p class="app-bar-story-content">Main content</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
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
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"  title="Width"/>
					<HstText v-model="state.height" title="Height"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════ ÉTAT ══════════════════ -->

		<Variant
				title="State"
				:init-state="() => useStoryInitState<Partial<IAppBarProps>>({ bgColor: 'primary', title: 'My Application' })"
		>
			<template #default="{ state }">
				<div class="app-bar-story-wrapper">
					<origam-app :full-height="false">
						<origam-app-bar
								:order="0"
								:title="state.title"
								:bg-color="state.bgColor"
								:hover="resolveHoverState(state.hover)"
								:active="resolveActiveState(state.active)"
								data-cy="app-bar-state"
						>
							<template #prepend>
								<origam-btn :icon="menuIcon" aria-label="Navigation menu"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<p class="app-bar-story-content">Main content</p>
						</origam-main>
					</origam-app>
				</div>
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
				:init-state="() => useStoryInitState<Partial<IAppBarProps>>({
					title: 'My Application',
					collapse: false,
					flat: false,
					floating: false,
					modelValue: true,
					scrollBehavior: undefined,
					scrollThreshold: 300,
					scrollTarget: undefined,
					location: 'top',
					order: 0,
					absolute: false
				})"
		>
			<template #default="{ state }">
				<div class="app-bar-story-wrapper">
					<origam-app :full-height="false">
						<origam-app-bar
								:order="state.order"
								:title="state.title"
								:collapse="state.collapse"
								:flat="state.flat"
								:floating="state.floating"
								:model-value="state.modelValue"
								:scroll-behavior="state.scrollBehavior || undefined"
								:scroll-threshold="state.scrollThreshold"
								:scroll-target="state.scrollTarget || undefined"
								:location="state.location"
								:absolute="state.absolute"
								data-cy="app-bar-functional"
						>
							<template #prepend>
								<origam-btn :icon="menuIcon" aria-label="Navigation menu"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<p class="app-bar-story-content">Main content</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Modifiers">
					<HstCheckbox v-model="state.collapse"  title="Collapse"/>
					<HstCheckbox v-model="state.flat"      title="Flat"/>
					<HstCheckbox v-model="state.floating"  title="Floating"/>
					<HstCheckbox v-model="state.modelValue" title="Model Value (visible)"/>
					<HstCheckbox v-model="state.absolute"  title="Absolute"/>
				</StoryGroup>
				<StoryGroup title="Scroll">
					<HstSelect v-model="state.scrollBehavior" title="Scroll Behavior" :options="SCROLL_BEHAVIOR_OPTIONS"/>
					<HstNumber v-model="state.scrollThreshold" title="Scroll Threshold" :min="0" :max="1000" :step="50"/>
					<HstText   v-model="state.scrollTarget"   title="Scroll Target"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect v-model="state.location" title="Location" :options="LOCATION_OPTIONS"/>
					<HstNumber v-model="state.order"    title="Order"    :min="0" :max="10" :step="1"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:modelValue">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar
							:order="0"
							v-model="emitModelValue"
							title="Model Value"
							data-cy="app-bar-emit-update"
							@update:model-value="logEvent('update:modelValue', $event)"
					/>
					<origam-main>
						<p class="app-bar-story-content">modelValue = {{ emitModelValue }}</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Prepend">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="App with prepend" data-cy="app-bar-slot-prepend">
						<template #prepend>
							<origam-btn :icon="menuIcon" aria-label="Navigation menu"/>
						</template>
					</origam-app-bar>
					<origam-main>
						<p class="app-bar-story-content">Prepend slot — typically a hamburger icon.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slots - Append">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="App with append" data-cy="app-bar-slot-append">
						<template #append>
							<origam-btn :icon="accountIcon" aria-label="Account"/>
							<origam-btn :icon="moreIcon"    aria-label="More options"/>
						</template>
					</origam-app-bar>
					<origam-main>
						<p class="app-bar-story-content">Append slot — typically action icons.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slots - Title">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" data-cy="app-bar-slot-title">
						<template #title>
							<strong>Custom title</strong>
						</template>
					</origam-app-bar>
					<origam-main>
						<p class="app-bar-story-content">Title slot — override the default title rendering.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slots - Content">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" data-cy="app-bar-slot-content">
						<template #content>
							<span>Custom slot content</span>
						</template>
					</origam-app-bar>
					<origam-main>
						<p class="app-bar-story-content">Content slot — full bar content override.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slots - Default">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="Default slot" data-cy="app-bar-slot-default">
						<span>Extra inline content</span>
					</origam-app-bar>
					<origam-main>
						<p class="app-bar-story-content">Default slot — extra content injected into the bar.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slots - Img">
			<div class="app-bar-story-wrapper">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="Image bar" data-cy="app-bar-slot-img">
						<template #img>
							<div class="app-bar-story-img-gradient"/>
						</template>
					</origam-app-bar>
					<origam-main>
						<p class="app-bar-story-content">Img slot — background image or gradient behind the bar.</p>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAppBarProps>({
					title: 'My Application',
					collapse: false,
					flat: false,
					floating: false,
					modelValue: true
				})"
		>
			<template #default="{ state }">
				<div class="app-bar-story-wrapper">
					<origam-app :full-height="false">
						<origam-app-bar
								v-bind="state"
								:order="0"
								data-cy="app-bar-playground"
								@update:model-value="logEvent('update:modelValue', $event)"
						>
							<template #prepend>
								<origam-btn :icon="menuIcon" aria-label="Navigation menu"/>
							</template>
							<template #append>
								<origam-btn :icon="moreIcon" aria-label="More options"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<p class="app-bar-story-content">Main content</p>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.title" title="Title"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.collapse"   title="Collapse"/>
					<HstCheckbox v-model="state.flat"       title="Flat"/>
					<HstCheckbox v-model="state.floating"   title="Floating"/>
					<HstCheckbox v-model="state.modelValue" title="Visible"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'
	import { logEvent } from 'histoire/client'

	import { OrigamApp, OrigamAppBar, OrigamBtn, OrigamMain } from '@origam/components'
	import { MDI_ICONS, SCROLL_BEHAVIOR } from '@origam/enums'
	import type { IAppBarProps } from '@origam/interfaces'
	import type { IOptions } from '@origam/interfaces'
	import type { TScrollBehavior } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		ACTIVE_OPTIONS,
		resolveActiveState,
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		HOVER_OPTIONS,
		resolveHoverState,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const menuIcon    = MDI_ICONS.MENU
	const moreIcon    = MDI_ICONS.DOTS_VERTICAL
	const accountIcon = MDI_ICONS.ACCOUNT

	const SCROLL_BEHAVIOR_OPTIONS: Array<IOptions<TScrollBehavior | undefined>> = [
		{ label: '(none)',    value: undefined },
		{ label: 'hide',      value: SCROLL_BEHAVIOR.HIDE },
		{ label: 'inverted',  value: SCROLL_BEHAVIOR.INVERTED },
		{ label: 'collapse',  value: SCROLL_BEHAVIOR.COLLAPSE },
		{ label: 'elevate',   value: SCROLL_BEHAVIOR.ELEVATED }
	]

	const LOCATION_OPTIONS: Array<IOptions<'top' | 'bottom'>> = [
		{ label: 'top',    value: 'top' },
		{ label: 'bottom', value: 'bottom' }
	]

	const emitModelValue = ref(true)
</script>

<style scoped>
	.app-bar-story-wrapper {
		height: 160px;
		border: 1px solid var(--origam-color__border---subtle, #ccc);
	}

	.app-bar-story-content {
		padding: 12px;
		margin: 0;
	}

	.app-bar-story-img-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, var(--origam-color__action--primary---bg, #1976d2) 0%, var(--origam-color__action--secondary---bg, #9c27b0) 100%);
	}
</style>

<docs lang="md" src="@docs/components/App/OrigamAppBar.md"/>
