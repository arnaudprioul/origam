<template>
	<Story
			group="components"
			title="Btn/OrigamBtnGroup"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IBtnGroupProps>>({
					color: undefined,
					bgColor: undefined,
					density: 'default',
					rounded: undefined,
					border: false,
					borderColor: undefined,
					borderStyle: undefined,
					elevation: undefined,
					margin: undefined,
					padding: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-btn-group
						:color="state.color"
						:bg-color="state.bgColor"
						:density="state.density"
						:rounded="state.rounded"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:elevation="state.elevation"
						:margin="state.margin"
						:padding="state.padding"
				>
					<origam-btn text="One"/>
					<origam-btn text="Two"/>
					<origam-btn text="Three"/>
				</origam-btn-group>
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
				<StoryGroup title="Spacing">
					<HstText v-model="state.margin"  title="Margin"/>
					<HstText v-model="state.padding" title="Padding"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IBtnGroupProps>>({
					divided: false,
					tag: 'div',
				})"
		>
			<template #default="{ state }">
				<origam-btn-group
						:divided="state.divided"
						:tag="state.tag"
						color="primary"
				>
					<origam-btn text="Bold"/>
					<origam-btn text="Italic"/>
					<origam-btn text="Underline"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.divided" title="Divided"/>
				</StoryGroup>
				<StoryGroup title="Tag">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-btn-group>
				<origam-btn text="One"/>
				<origam-btn text="Two"/>
				<origam-btn text="Three"/>
			</origam-btn-group>
		</Variant>

		<Variant title="Slots - Item">
			<origam-btn-group :items="actions">
				<template #item="{ item, index }">
					<origam-btn
							v-bind="item"
							:data-cy="`btn-group-item-slot-${index}`"
							:append-icon="appendIcon"
					/>
				</template>
			</origam-btn-group>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IBtnGroupProps>({
					color: undefined,
					bgColor: undefined,
					density: 'default',
					rounded: undefined,
					border: false,
					elevation: undefined,
					divided: false,
					tag: 'div',
				})"
		>
			<template #default="{ state }">
				<origam-btn-group v-bind="state">
					<origam-btn text="One"/>
					<origam-btn text="Two"/>
					<origam-btn text="Three"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.rounded"   title="Rounded"   :options="ROUNDED_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
					<HstSelect v-model="state.border"    title="Border"    :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.divided" title="Divided"/>
					<HstSelect   v-model="state.tag"     title="Tag"       :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamBtnGroup } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IBtnGroupProps, IBtnProps } from '@origam/interfaces'

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

	const appendIcon = MDI_ICONS.CHEVRON_RIGHT

	const actions: Array<IBtnProps> = [
		{ text: 'Save'   },
		{ text: 'Edit'   },
		{ text: 'Delete' },
	]
</script>

<docs lang="md" src="@docs/components/Btn/OrigamBtnGroup.md"/>
