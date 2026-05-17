<template>
	<Story
			group="components"
			title="List/OrigamListSubheader"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IListSubheader>({
					title: 'Subheader',
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					inset: false,
					sticky: false,
				})"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-subheader v-bind="state" data-cy="list-subheader-playground"/>
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
					<origam-list-item title="Item three"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.title"   title="title"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.bgColor" title="bgColor" :options="intentList"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
				<HstCheckbox v-model="state.inset"   title="inset"/>
				<HstCheckbox v-model="state.sticky"  title="sticky"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant
				title="Prop — title"
				:init-state="() => useStoryInitState<{ title?: string }>({ title: 'Section Title' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-subheader :title="state.title" data-cy="list-subheader-title"/>
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-subheader v-bind="state" title="Colored Subheader" data-cy="list-subheader-color"/>
					<origam-list-item title="Item one"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-subheader :rounded="state.rounded" title="Rounded Subheader" data-cy="list-subheader-rounded"/>
					<origam-list-item title="Item one"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — inset"
				:init-state="() => useStoryInitState<{ inset: boolean }>({ inset: true })"
		>
			<template #default="{ state }">
				<origam-list>
					<origam-list-subheader :inset="state.inset" title="Inset Subheader" data-cy="list-subheader-inset"/>
					<origam-list-item title="Item one" :prepend-icon="MDI_ICONS.ACCOUNT"/>
					<origam-list-item title="Item two" :prepend-icon="MDI_ICONS.STAR"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inset" title="inset"/>
			</template>
		</Variant>

		<Variant
				title="Prop — sticky"
				:init-state="() => useStoryInitState<{ sticky: boolean }>({ sticky: true })"
		>
			<template #default="{ state }">
				<origam-list style="max-height: 150px; overflow-y: auto;">
					<origam-list-subheader :sticky="state.sticky" title="Sticky Section" data-cy="list-subheader-sticky"/>
					<origam-list-item v-for="n in 8" :key="n" :title="`Item ${n}`"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.sticky" title="sticky"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-list>
				<origam-list-subheader data-cy="list-subheader-slot-default">
					<template #default>
						<span style="font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">Custom Slot Title</span>
					</template>
				</origam-list-subheader>
				<origam-list-item title="Item one"/>
			</origam-list>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamList, OrigamListItem, OrigamListSubheader } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IListSubheader, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, roundedList } from '@stories/const'
</script>
