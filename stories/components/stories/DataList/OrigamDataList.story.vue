<template>
	<Story
			group="components"
			title="DataList/OrigamDataList"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant title="Basic">
			<origam-data-list :items="basicItems"/>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: undefined })"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" :density="state.density"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ ADJACENT ICONS ════════════ -->
		<Variant
				title="Adjacent icons"
				:init-state="() => useStoryInitState<IAdjacentProps>({})"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER & ROUNDED ════════════ -->
		<Variant
				title="Border and rounded"
				:init-state="() => useStoryInitState<IBorderProps & IRoundedProps>({ border: false, rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border"  title="border"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: item ════════════ -->
		<Variant title="Slot — item">
			<origam-data-list :items="basicItems">
				<template #item="{ item, index }">
					<div style="display: flex; justify-content: space-between; padding: 4px 0;">
						<strong>{{ item.title?.text }}</strong>
						<span>{{ item.text?.[0]?.text }}</span>
					</div>
				</template>
			</origam-data-list>
		</Variant>

		<!-- ════════════ SLOT: item.title ════════════ -->
		<Variant title="Slot — item.title">
			<origam-data-list :items="basicItems">
				<template #item.title="props">
					<em>{{ props.text }}</em>
				</template>
			</origam-data-list>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDensityProps & IAdjacentProps & IBorderProps & IRoundedProps>({
					density: undefined,
					prependIcon: undefined,
					appendIcon: undefined,
					border: false,
					rounded: undefined
				})"
		>
			<template #default="{ state }">
				<origam-data-list :items="basicItems" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"     title="density"     :options="densityList"/>
				<HstSelect   v-model="state.prependIcon" title="prependIcon" :options="iconList"/>
				<HstSelect   v-model="state.appendIcon"  title="appendIcon"  :options="iconList"/>
				<HstCheckbox v-model="state.border"      title="border"/>
				<HstSelect   v-model="state.rounded"     title="rounded"     :options="roundedList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDataList } from '@origam/components'
	import type { IAdjacentProps, IBorderProps, IDensityProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, iconList, roundedList } from '@stories/const'

	const basicItems = [
		{ title: { text: 'Status' },   text: [{ text: 'Active' }] },
		{ title: { text: 'Created' },  text: [{ text: '2024-01-15' }] },
		{ title: { text: 'Owner' },    text: [{ text: 'Alice Dupont' }] },
		{ title: { text: 'Priority' }, text: [{ text: 'High' }] },
	]
</script>

<docs lang="md" src="@docs/components/DataList/OrigamDataList.md"/>
