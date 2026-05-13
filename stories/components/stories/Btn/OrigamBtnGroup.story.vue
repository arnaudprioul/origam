<template>
	<Story
			group="components"
			title="Btn/OrigamBtnGroup"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBtnGroupProps & { divided?: boolean }>({
					density: DENSITY.DEFAULT,
					divided: false,
					rounded: undefined,
					border: false,
					color: undefined,
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-btn-group v-bind="state" data-cy="btn-group-playground">
					<origam-btn text="One"   data-cy="btn-group-playground-1"/>
					<origam-btn text="Two"   data-cy="btn-group-playground-2"/>
					<origam-btn text="Three" data-cy="btn-group-playground-3"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstCheckbox v-model="state.divided" title="divided"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant title="Prop — items">
			<origam-btn-group :items="actions" data-cy="btn-group-items"/>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<{ density?: TDensity }>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-btn-group :density="state.density" data-cy="btn-group-density">
					<origam-btn text="A" data-cy="btn-group-density-A"/>
					<origam-btn text="B" data-cy="btn-group-density-B"/>
					<origam-btn text="C" data-cy="btn-group-density-C"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — divided"
				:init-state="() => useStoryInitState<{ divided: boolean }>({ divided: true })"
		>
			<template #default="{ state }">
				<origam-btn-group :divided="state.divided" color="primary" data-cy="btn-group-divided">
					<origam-btn text="Bold"      data-cy="btn-group-divided-1"/>
					<origam-btn text="Italic"    data-cy="btn-group-divided-2"/>
					<origam-btn text="Underline" data-cy="btn-group-divided-3"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.divided" title="divided"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-btn-group :rounded="state.rounded" data-cy="btn-group-rounded">
					<origam-btn text="On"  data-cy="btn-group-rounded-1"/>
					<origam-btn text="Off" data-cy="btn-group-rounded-2"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — border"
				:init-state="() => useStoryInitState<{ border: boolean }>({ border: true })"
		>
			<template #default="{ state }">
				<origam-btn-group :border="state.border" data-cy="btn-group-border">
					<origam-btn text="Yes" data-cy="btn-group-border-1"/>
					<origam-btn text="No"  data-cy="btn-group-border-2"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-btn-group v-bind="state" data-cy="btn-group-color">
					<origam-btn text="Save"   data-cy="btn-group-color-1"/>
					<origam-btn text="Edit"   data-cy="btn-group-color-2"/>
					<origam-btn text="Delete" data-cy="btn-group-color-3"/>
				</origam-btn-group>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — item (custom render)">
			<origam-btn-group :items="actions" data-cy="btn-group-item-slot">
				<template #item="{ item, index }">
					<origam-btn
							v-bind="item"
							:data-cy="`btn-group-item-slot-${index}`"
							:append-icon="MDI_ICONS.CHEVRON_RIGHT"
					/>
				</template>
			</origam-btn-group>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamBtnGroup } from '@origam/components'
	import { DENSITY, MDI_ICONS } from '@origam/enums'
	import type { IBtnGroupProps, IBtnProps, IColorProps, IRoundedProps } from '@origam/interfaces'
	import type { TDensity } from '@origam/types'

	import {
		borderList,
		densityList, intentList, roundedList
	} from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const actions: Array<IBtnProps> = [
		{ text: 'Save'   },
		{ text: 'Edit'   },
		{ text: 'Delete' },
	]
</script>

<docs lang="md" src="@docs/components/Btn/OrigamBtnGroup.md"/>
