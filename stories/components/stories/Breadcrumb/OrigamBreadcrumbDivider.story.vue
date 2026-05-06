<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumbDivider"
	>

		<!-- ════════════ DIVIDER (string vs icon) ════════════ -->
		<Variant
				title="Divider string vs icon"
				:init-state="() => useStoryInitState<{ divider: string }>({ divider: '/' })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<origam-breadcrumb-divider :divider="state.divider" data-cy="breadcrumb-divider-string"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.divider" title="divider (string or MDI icon name)"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<origam-breadcrumb-divider v-bind="state" divider="/" data-cy="breadcrumb-divider-color"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ SIZE ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<origam-breadcrumb-divider :size="state.size" divider="/" data-cy="breadcrumb-divider-size"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<origam-breadcrumb-divider :density="state.density" divider="/" data-cy="breadcrumb-divider-density"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ICON DIVIDER ════════════ -->
		<Variant title="Icon divider">
			<div style="display: flex; align-items: center; gap: 8px;">
				<origam-breadcrumb-divider :divider="MDI_ICONS.CHEVRON_RIGHT" data-cy="breadcrumb-divider-icon"/>
			</div>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<div style="display: flex; align-items: center; gap: 8px;">
				<origam-breadcrumb-divider divider="/" data-cy="breadcrumb-divider-slot">
					<template #default>
						<span style="font-weight: 700; color: var(--origam-color-action-primary-bg);">»</span>
					</template>
				</origam-breadcrumb-divider>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBreadcrumbDividerProps>({
					divider: '/',
					color: undefined,
					bgColor: undefined,
					size: undefined,
					density: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span>Segment A</span>
					<origam-breadcrumb-divider v-bind="state" data-cy="breadcrumb-divider-playground"/>
					<span>Segment B</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.divider"  title="divider"/>
				<HstSelect v-model="state.color"    title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor"  title="bgColor" :options="intentList"/>
				<HstSelect v-model="state.size"     title="size"    :options="sizeList"/>
				<HstSelect v-model="state.density"  title="density" :options="densityList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBreadcrumbDivider } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IBreadcrumbDividerProps,
		IColorProps,
		IDensityProps,
		ISizeProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, intentList, sizeList } from '@stories/const'
</script>
