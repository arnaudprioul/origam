<template>
	<Story
			group="components"
			title="Toolbar/OrigamToolbar"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant title="Basic">
			<origam-toolbar title="My Application" data-cy="toolbar-basic"/>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-toolbar
						v-bind="state"
						title="Colored Toolbar"
						data-cy="toolbar-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<{ elevation?: number, flat?: boolean }>({})"
		>
			<template #default="{ state }">
				<origam-toolbar
						:elevation="state.elevation"
						:flat="state.flat"
						title="Elevation Toolbar"
						data-cy="toolbar-elevation"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-toolbar
						:rounded="state.rounded"
						title="Rounded Toolbar"
						data-cy="toolbar-rounded"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-toolbar
						:density="state.density"
						title="Density Toolbar"
						data-cy="toolbar-density"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ MODIFIERS ════════════ -->
		<Variant
				title="Modifiers"
				:init-state="() => useStoryInitState<{
					collapse?: boolean
					flat?: boolean
					floating?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<origam-toolbar
						v-bind="state"
						title="Toolbar Modifiers"
						data-cy="toolbar-modifiers"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.collapse"  title="collapse"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.floating"  title="floating"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: prepend ════════════ -->
		<Variant title="Slot — prepend">
			<origam-toolbar title="With Prepend" data-cy="toolbar-slot-prepend">
				<template #prepend>
					<origam-btn :icon="MDI_ICONS.MENU" aria-label="Navigation menu"/>
				</template>
			</origam-toolbar>
		</Variant>

		<!-- ════════════ SLOT: append ════════════ -->
		<Variant title="Slot — append">
			<origam-toolbar title="With Append" data-cy="toolbar-slot-append">
				<template #append>
					<origam-btn :icon="MDI_ICONS.ACCOUNT" aria-label="Account"/>
					<origam-btn :icon="MDI_ICONS.DOTS_VERTICAL" aria-label="More"/>
				</template>
			</origam-toolbar>
		</Variant>

		<!-- ════════════ SLOT: content ════════════ -->
		<Variant title="Slot — content">
			<origam-toolbar title="With Content" data-cy="toolbar-slot-content">
				<template #content>
					<span style="flex: 1;"/>
					<origam-btn text="Action" color="primary"/>
				</template>
			</origam-toolbar>
		</Variant>

		<!-- ════════════ SLOT: title ════════════ -->
		<Variant title="Slot — title">
			<origam-toolbar data-cy="toolbar-slot-title">
				<template #title>
					<span style="font-style: italic; font-weight: 600;">Custom title</span>
				</template>
			</origam-toolbar>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IToolbarProps>({
					title: 'My App',
					elevation: undefined,
					flat: false,
					collapse: false,
					floating: false,
					density: undefined,
					rounded: undefined
				})"
		>
			<template #default="{ state }">
				<origam-toolbar v-bind="state" data-cy="toolbar-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"     title="title"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.collapse"  title="collapse"/>
				<HstCheckbox v-model="state.floating"  title="floating"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamToolbar } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IColorProps,
		IDensityProps,
		IRoundedProps,
		IToolbarProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		densityList,
		elevationList,
		intentList,
		roundedList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Toolbar/OrigamToolbar.md"/>
