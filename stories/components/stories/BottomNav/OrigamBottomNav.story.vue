<template>
	<Story
			group="components"
			title="BottomNav/OrigamBottomNav"
	>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:color="state.color"
							:bg-color="state.bgColor"
							:hover-color="state.hoverColor"
							:hover-bg-color="state.hoverBgColor"
							:active-color="state.activeColor"
							:active-bg-color="state.activeBgColor"
							:items="navItems"
							data-cy="bottom-nav-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
				<HstSelect v-model="state.bgColor"      title="bgColor"      :options="intentList"/>
				<HstSelect v-model="state.hoverColor"   title="hoverColor"   :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor" title="hoverBgColor" :options="intentList"/>
				<HstSelect v-model="state.activeColor"  title="activeColor"  :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
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
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
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
				title="Border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
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
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<IElevationProps>({ elevation: 8 })"
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
				title="Grow"
				:init-state="() => useStoryInitState<{ grow: boolean }>({ grow: true })"
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
				title="Mode"
				:init-state="() => useStoryInitState<{ mode?: TMode }>({ mode: MODE.VERTICAL })"
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

		<Variant title="Items prop">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						data-cy="bottom-nav-items"
				/>
			</div>
		</Variant>

		<Variant
				title="Visible (modelValue)"
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

		<Variant title="Emit — update:modelValue">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						data-cy="bottom-nav-emit-model"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
			</div>
		</Variant>

		<Variant title="Emit — update:active">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						data-cy="bottom-nav-emit-active"
						@update:active="logEvent('update:active', $event)"
				/>
			</div>
		</Variant>

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
				<HstCheckbox v-model="state.border"    title="border"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.grow"      title="grow"/>
				<HstSelect   v-model="state.mode"      title="mode"      :options="modeList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBottomNav, OrigamBtn } from '@origam/components'
	import { DENSITY, MDI_ICONS, MODE } from '@origam/enums'
	import type {
		IBorderProps,
		IBottomNavProps,
		IColorProps,
		IDensityProps,
		IElevationProps,
		IOptions,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TMode } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, elevationList, intentList, roundedList } from '@stories/const'

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
