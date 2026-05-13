<template>
	<Story
			group="components"
			title="BottomNav/OrigamBottomNav"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IBottomNavProps knob via the sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBottomNavProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					elevation: undefined,
					grow: false,
					mode: MODE.VERTICAL,
				})"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							v-bind="state"
							:items="navItems"
							data-cy="bottom-nav-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.grow"      title="grow"/>
				<HstSelect   v-model="state.mode"      title="mode"      :options="modeList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IBottomNavProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:color="state.color"
							:bg-color="state.bgColor"
							:items="navItems"
							data-cy="bottom-nav-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"      :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IBottomNavProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:color="state.color"
							:bg-color="state.bgColor"
							:items="navItems"
							data-cy="bottom-nav-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect v-model="state.hover" title="hover" :options="hoverList"/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IBottomNavProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:color="state.color"
							:bg-color="state.bgColor"
							:items="navItems"
							data-cy="bottom-nav-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect v-model="state.active" title="active" :options="activeList"/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IBottomNavProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:density="state.density"
							:items="navItems"
							data-cy="bottom-nav-density"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IBottomNavProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:rounded="state.rounded"
							:items="navItems"
							data-cy="bottom-nav-rounded"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — border"
				:init-state="() => useStoryInitState<IBottomNavProps>({ border: true })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:border="state.border"
							:items="navItems"
							data-cy="bottom-nav-border"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation"
				:init-state="() => useStoryInitState<IBottomNavProps>({ elevation: 8 })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:elevation="state.elevation"
							:items="navItems"
							data-cy="bottom-nav-elevation"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — grow"
				:init-state="() => useStoryInitState<IBottomNavProps>({ grow: true })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:grow="state.grow"
							:items="navItems"
							data-cy="bottom-nav-grow"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.grow" title="grow"/>
			</template>
		</Variant>

		<Variant
				title="Prop — mode"
				:init-state="() => useStoryInitState<IBottomNavProps>({ mode: MODE.VERTICAL })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:mode="state.mode"
							:items="navItems"
							data-cy="bottom-nav-mode"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.mode" title="mode" :options="modeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — modelValue (visible)"
				:init-state="() => useStoryInitState<{ visible: boolean }>({ visible: true })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="state.visible"
							:items="navItems"
							data-cy="bottom-nav-visible"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.visible" title="visible (modelValue)"/>
			</template>
		</Variant>

		<Variant title="Prop — items">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						data-cy="bottom-nav-items"
				/>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav :model-value="true" data-cy="bottom-nav-slot-default">
					<origam-btn :prepend-icon="MDI_ICONS.HOME"    text="Home"    data-cy="bottom-nav-slot-home"/>
					<origam-btn :prepend-icon="MDI_ICONS.MAGNIFY" text="Search"  data-cy="bottom-nav-slot-search"/>
					<origam-btn :prepend-icon="MDI_ICONS.ACCOUNT" text="Profile" data-cy="bottom-nav-slot-profile"/>
				</origam-bottom-nav>
			</div>
		</Variant>

		<Variant title="Slot — item">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav :model-value="true" :items="navItems" data-cy="bottom-nav-slot-item">
					<template #item="{ props: itemProps, index }">
						<origam-btn
								v-bind="itemProps"
								:prepend-icon="MDI_ICONS.STAR"
								:data-cy="`bottom-nav-slot-item-${index}`"
						/>
					</template>
				</origam-bottom-nav>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ visible: boolean, log: string[] }>({ visible: true, log: [] })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="state.visible"
							:items="navItems"
							data-cy="bottom-nav-emit-model"
							@update:model-value="(v: boolean) => {
								state.visible = v
								state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 4)
							}"
					/>
				</div>
				<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
					<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
				</ul>
				<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Events will appear here.</p>
			</template>
		</Variant>

		<Variant
				title="Emit — update:active"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:items="navItems"
							data-cy="bottom-nav-emit-active"
							@update:active="(v: any) => {
								state.log = [`update:active → ${v}`, ...state.log].slice(0, 4)
							}"
					/>
				</div>
				<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; padding-left: 16px;">
					<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
				</ul>
				<p v-if="state.log.length === 0" style="font-size: 0.8rem; opacity: 0.7;">Click a nav item to fire the event.</p>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBottomNav, OrigamBtn } from '@origam/components'
	import { DENSITY, MDI_ICONS, MODE } from '@origam/enums'
	import type {
		IBottomNavProps,
		IOptions
	} from '@origam/interfaces'
	import type { TMode } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		borderList,
		densityList, elevationList, intentList, roundedList,
		hoverList
	} from '@stories/const'

	const modeList: Array<IOptions<TMode>> = [
		{ label: 'vertical',   value: MODE.VERTICAL   },
		{ label: 'horizontal', value: MODE.HORIZONTAL },
		{ label: 'shift',      value: MODE.SHIFT      },
	]

	const navItems: Array<IBottomNavProps['items'][number]> = [
		{ text: 'Home',    prependIcon: MDI_ICONS.HOME,    value: 'home'    },
		{ text: 'Search',  prependIcon: MDI_ICONS.MAGNIFY, value: 'search'  },
		{ text: 'Profile', prependIcon: MDI_ICONS.ACCOUNT, value: 'profile' },
	]
</script>

<style scoped>
	.story-bottom-nav-shell {
		position: relative;
		width: 100%;
		height: 80px;
		overflow: hidden;
	}
</style>
