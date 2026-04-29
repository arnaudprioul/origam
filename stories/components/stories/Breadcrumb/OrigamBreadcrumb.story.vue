<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumb"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<origam-breadcrumb :items="items" data-cy="breadcrumb-default"/>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<origam-breadcrumb :items="items" data-cy="breadcrumb-items"/>
		</Variant>

		<!-- ════════════ DEFAULT SLOT (explicit children) ════════════ -->
		<Variant title="Default slot">
			<origam-breadcrumb data-cy="breadcrumb-slot">
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

		<!-- ════════════ DENSITY ════════════ -->
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

		<!-- ════════════ COLOR ════════════ -->
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

		<!-- ════════════ ROUNDED ════════════ -->
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

		<!-- ════════════ BORDER ════════════ -->
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

		<!-- ════════════ DIVIDER (custom string) ════════════ -->
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

		<!-- ════════════ DIVIDER (icon) ════════════ -->
		<Variant title="Divider (icon)">
			<origam-breadcrumb
					:divider="MDI_ICONS.CHEVRON_RIGHT"
					:items="items"
					data-cy="breadcrumb-divider-icon"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBreadcrumbProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					divider: '/',
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
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.bgColor" title="bgColor" :options="intentList"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
				<HstCheckbox v-model="state.border"  title="border"/>
				<HstText     v-model="state.divider" title="divider"/>
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
		OrigamBreadcrumbItem
	} from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type {
		IBorderProps,
		IBreadcrumbProps,
		IColorProps,
		IDensityProps,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TBreadcrumbItem } from '@origam/types'

	import { densityList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const items: Array<TBreadcrumbItem> = [
		{ title: 'Home',    href: '/'        },
		{ title: 'Section', href: '/section' },
		{ title: 'Current'                   },
	]
</script>
