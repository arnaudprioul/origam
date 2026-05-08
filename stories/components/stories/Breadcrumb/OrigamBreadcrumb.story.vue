<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumb"
	>

		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:color="state.color"
						:bg-color="state.bgColor"
						:items="items"
						data-cy="breadcrumb-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:density="state.density"
						:items="items"
						data-cy="breadcrumb-density"
				/>
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
				<origam-breadcrumb
						:rounded="state.rounded"
						:items="items"
						data-cy="breadcrumb-rounded"
				/>
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
				<origam-breadcrumb
						:border="state.border"
						:items="items"
						data-cy="breadcrumb-border"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<IElevationProps>({ elevation: 4 })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:elevation="state.elevation"
						:items="items"
						data-cy="breadcrumb-elevation"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<Variant
				title="Divider (string)"
				:init-state="() => useStoryInitState<{ divider: string }>({ divider: '>' })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:divider="state.divider"
						:items="items"
						data-cy="breadcrumb-divider-string"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.divider" title="divider"/>
			</template>
		</Variant>

		<Variant title="Divider (icon)">
			<origam-breadcrumb
					:divider="MDI_ICONS.CHEVRON_RIGHT"
					:items="items"
					data-cy="breadcrumb-divider-icon"
			/>
		</Variant>

		<Variant
				title="Disabled"
				:init-state="() => useStoryInitState<{ disabled: boolean }>({ disabled: true })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:disabled="state.disabled"
						:items="items"
						data-cy="breadcrumb-disabled"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<Variant title="Slot — default">
			<origam-breadcrumb data-cy="breadcrumb-slot-default">
				<ol class="origam-breadcrumb__items">
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Home" href="/" data-cy="breadcrumb-slot-home"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-divider divider="/" data-cy="breadcrumb-slot-div-1"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Section" href="/section" data-cy="breadcrumb-slot-section"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-divider divider="/" data-cy="breadcrumb-slot-div-2"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Current" data-cy="breadcrumb-slot-current"/>
					</li>
				</ol>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slot — item">
			<origam-breadcrumb :items="items" data-cy="breadcrumb-slot-item">
				<template #item="{ item, index }">
					<origam-breadcrumb-item
							v-bind="item"
							:prepend-icon="index === 0 ? MDI_ICONS.HOME : undefined"
							:data-cy="`breadcrumb-slot-item-${index}`"
					/>
				</template>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slot — divider">
			<origam-breadcrumb :items="items" data-cy="breadcrumb-slot-divider">
				<template #divider>
					<origam-icon :icon="MDI_ICONS.CHEVRON_DOUBLE_RIGHT" data-cy="breadcrumb-slot-divider-icon"/>
				</template>
			</origam-breadcrumb>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBreadcrumbProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					elevation: undefined,
					divider: '/',
					disabled: false,
				})"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						v-bind="state"
						:items="items"
						data-cy="breadcrumb-playground"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstCheckbox v-model="state.border"    title="border"/>
				<HstText     v-model="state.divider"   title="divider"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamBreadcrumb,
		OrigamBreadcrumbDivider,
		OrigamBreadcrumbItem,
		OrigamIcon
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IBorderProps,
		IBreadcrumbProps,
		IColorProps,
		IDensityProps,
		IElevationProps,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TBreadcrumbItem } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, elevationList, intentList, roundedList } from '@stories/const'

	const items: Array<TBreadcrumbItem> = [
		{ title: 'Home',    href: '/'        },
		{ title: 'Section', href: '/section' },
		{ title: 'Current'                   },
	]
</script>
