<template>
	<Story
			group="components"
			title="Breadcrumb/OrigamBreadcrumb"
	>

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IBreadcrumbProps>>({ color: undefined, bgColor: undefined, density: 'default', rounded: undefined, elevation: undefined, border: false, borderColor: undefined, borderStyle: undefined, divider: '/' })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:color="state.color"
						:padding="state.padding"
						:margin="state.margin"
						:bg-color="state.bgColor"
						:density="state.density"
						:rounded="state.rounded"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:divider="state.divider"
						:items="items"
				/>
			</template>
			<template #controls="{ state }">
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
				<StoryGroup title="Divider">
					<HstText v-model="state.divider" title="Divider"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IBreadcrumbProps>>({ disabled: false, activeClass: undefined, tag: 'nav' })"
		>
			<template #default="{ state }">
				<origam-breadcrumb
						:disabled="state.disabled"
						:active-class="state.activeClass"
						:tag="state.tag"
						:items="items"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Data">
					<HstText v-model="state.activeClass" title="Active Class"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Slots - Default">
			<origam-breadcrumb>
				<ol class="origam-breadcrumb__items">
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Home" href="/"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-divider divider="/"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Section" href="/section"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-divider divider="/"/>
					</li>
					<li class="origam-breadcrumb__item">
						<origam-breadcrumb-item title="Current"/>
					</li>
				</ol>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slots - Item">
			<origam-breadcrumb :items="items">
				<template #item="{ item, index }">
					<origam-breadcrumb-item
							v-bind="item"
							:prepend-icon="index === 0 ? homeIcon : undefined"
					/>
				</template>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slots - Divider">
			<origam-breadcrumb :items="items">
				<template #divider>
					<origam-icon :icon="chevronDoubleRightIcon"/>
				</template>
			</origam-breadcrumb>
		</Variant>

		<Variant title="Slots - Item.Title">
			<origam-breadcrumb :items="items">
				<template #item.title="{ item }">
					<strong>{{ item.title }}</strong>
				</template>
			</origam-breadcrumb>
		</Variant>

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IBreadcrumbProps>({ divider: '/', density: 'default', disabled: false })"
		>
			<template #default="{ state }">
				<origam-breadcrumb v-bind="state" :items="items"/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.divider" title="Divider"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
					<HstSelect   v-model="state.tag"      title="Tag"      :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBreadcrumb, OrigamBreadcrumbDivider, OrigamBreadcrumbItem, OrigamIcon } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IBreadcrumbProps } from '@origam/interfaces'
	import type { TBreadcrumbItem } from '@origam/types'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		ROUNDED_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const homeIcon = MDI_ICONS.HOME
	const chevronDoubleRightIcon = MDI_ICONS.CHEVRON_DOUBLE_RIGHT

	const items: Array<TBreadcrumbItem> = [
		{ title: 'Home',    href: '/'        },
		{ title: 'Section', href: '/section' },
		{ title: 'Current'                   },
	]
</script>
