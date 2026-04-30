<template>
	<Story
			group="components"
			title="BottomNav/OrigamBottomNav"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<div class="story-bottom-nav-shell" data-cy="bottom-nav-default-shell">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						data-cy="bottom-nav-default"
				/>
			</div>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav
						:model-value="true"
						:items="navItems"
						data-cy="bottom-nav-items"
				/>
			</div>
		</Variant>

		<!-- ════════════ DEFAULT SLOT (explicit children) ════════════ -->
		<Variant title="Default slot">
			<div class="story-bottom-nav-shell">
				<origam-bottom-nav :model-value="true" data-cy="bottom-nav-slot">
					<origam-btn :prepend-icon="MDI_ICONS.HOME"    text="Home"    data-cy="bottom-nav-slot-home"/>
					<origam-btn :prepend-icon="MDI_ICONS.MAGNIFY" text="Search"  data-cy="bottom-nav-slot-search"/>
					<origam-btn :prepend-icon="MDI_ICONS.ACCOUNT" text="Profile" data-cy="bottom-nav-slot-profile"/>
				</origam-bottom-nav>
			</div>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
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

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div class="story-bottom-nav-shell">
					<origam-bottom-nav
							:model-value="true"
							:color="state.color"
							:items="navItems"
							data-cy="bottom-nav-color"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
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

		<!-- ════════════ BORDER ════════════ -->
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

		<!-- ════════════ ELEVATION ════════════ -->
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

		<!-- ════════════ GROW ════════════ -->
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

		<!-- ════════════ PLAYGROUND ════════════ -->
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
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBottomNav, OrigamBtn } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IBorderProps,
		IBottomNavProps,
		IColorProps,
		IDensityProps,
		IElevationProps,
		IRoundedProps
	} from '@origam/interfaces'

	import { densityList, elevationList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

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
