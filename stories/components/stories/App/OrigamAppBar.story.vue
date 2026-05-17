<template>
	<Story
			group="components"
			title="App/OrigamAppBar"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IAppBarProps knob via the sidebar controls.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAppBarProps>({
					title: 'My Application',
					collapse: false,
					flat: false,
					floating: false,
					density: undefined,
					elevation: undefined,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false
				})"
		>
			<template #default="{ state }">
				<div style="height: 160px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar v-bind="state" :order="0" data-cy="app-bar-playground">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
							<template #append>
								<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More options"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"      title="title"/>
				<HstCheckbox v-model="state.collapse"   title="collapse"/>
				<HstCheckbox v-model="state.flat"       title="flat"/>
				<HstCheckbox v-model="state.floating"   title="floating"/>
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.density"    title="density"    :options="densityList"/>
				<HstSelect   v-model="state.elevation"  title="elevation"  :options="elevationList"/>
				<HstSelect   v-model="state.color"      title="color"      :options="intentList"/>
				<HstSelect   v-model="state.bgColor"    title="bgColor"    :options="intentList"/>
				<HstSelect   v-model="state.rounded"    title="rounded"    :options="roundedList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IAppBarProps>({ color: 'primary', bgColor: 'primary', title: 'My Application' })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" v-bind="state" data-cy="app-bar-color">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
							<template #append>
								<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More options"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.title"         title="title"/>
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IAppBarProps>({ color: 'primary', bgColor: 'primary', title: 'My Application' })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" v-bind="state" data-cy="app-bar-color">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
							<template #append>
								<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More options"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IAppBarProps>({ color: 'primary', bgColor: 'primary', title: 'My Application' })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" v-bind="state" data-cy="app-bar-color">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
							<template #append>
								<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More options"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IAppBarProps>({ density: undefined, title: 'Density AppBar' })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" v-bind="state" data-cy="app-bar-density">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation"
				:init-state="() => useStoryInitState<IAppBarProps>({ elevation: undefined, title: 'Elevation AppBar' })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" v-bind="state" data-cy="app-bar-elevation">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IAppBarProps>({ rounded: undefined, title: 'Rounded AppBar' })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" v-bind="state" data-cy="app-bar-rounded">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — collapse & flat & floating"
				:init-state="() => useStoryInitState<{ collapse: boolean, flat: boolean, floating: boolean }>({ collapse: false, flat: false, floating: false })"
		>
			<template #default="{ state }">
				<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
					<origam-app :full-height="false">
						<origam-app-bar :order="0" :collapse="state.collapse" :flat="state.flat" :floating="state.floating" title="Modifier AppBar" data-cy="app-bar-modifiers">
							<template #prepend>
								<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
							</template>
						</origam-app-bar>
						<origam-main>
							<div style="padding: 12px;">Main content</div>
						</origam-main>
					</origam-app>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.collapse"  title="collapse"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.floating"  title="floating"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — prepend">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="App with prepend" data-cy="app-bar-slot-prepend">
						<template #prepend>
							<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
						</template>
					</origam-app-bar>
					<origam-main>
						<div style="padding: 12px;">Prepend slot — typically a hamburger icon.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — append">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="App with append" data-cy="app-bar-slot-append">
						<template #append>
							<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
							<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More options"/>
						</template>
					</origam-app-bar>
					<origam-main>
						<div style="padding: 12px;">Append slot — typically action icons.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" data-cy="app-bar-slot-title">
						<template #title>
							<span style="font-style: italic; font-weight: 600;">Custom title</span>
						</template>
					</origam-app-bar>
					<origam-main>
						<div style="padding: 12px;">Title slot — override the default title rendering.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — content">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" data-cy="app-bar-slot-content">
						<template #content>
							<span>Custom slot content</span>
						</template>
					</origam-app-bar>
					<origam-main>
						<div style="padding: 12px;">Content slot — full bar content override.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — default">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="Default slot" data-cy="app-bar-slot-default">
						<span>Custom slot content</span>
					</origam-app-bar>
					<origam-main>
						<div style="padding: 12px;">Default slot — extra content injected into the bar.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<Variant title="Slot — img">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar :order="0" title="Image bar" data-cy="app-bar-slot-img">
						<template #img>
							<div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--origam-color__action--primary---bg, #1976d2) 0%, var(--origam-color__action--secondary---bg, #9c27b0) 100%);"/>
						</template>
					</origam-app-bar>
					<origam-main>
						<div style="padding: 12px;">Img slot — background image or gradient behind the bar.</div>
					</origam-main>
				</origam-app>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<div style="height: 140px; border: 1px solid var(--origam-color__border---subtle, #ccc);">
				<origam-app :full-height="false">
					<origam-app-bar
							:order="0"
							v-model="emitModelValue"
							title="Model value"
							data-cy="app-bar-emit-update"
							@update:modelValue="logEvent('update:modelValue', $event)"
					/>
					<origam-main>
						<div style="padding: 12px;">modelValue = {{ emitModelValue }}</div>
					</origam-main>
				</origam-app>
			</div>
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
	import { MDI_ICONS } from '@origam/enums'
	import type { IAppBarProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		borderList,
		densityList,
		elevationList,
		hoverList,
		intentList,
		roundedList
	} from '@stories/const'

	const emitModelValue = ref(true)
</script>

<docs lang="md" src="@docs/components/App/OrigamAppBar.md"/>
