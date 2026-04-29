<template>
	<Story
			group="components"
			title="List/OrigamList"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<origam-list data-cy="list-default">
				<origam-list-item title="Item one"   data-cy="list-default-1"/>
				<origam-list-item title="Item two"   data-cy="list-default-2"/>
				<origam-list-item title="Item three" data-cy="list-default-3"/>
			</origam-list>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<origam-list :items="listItems" data-cy="list-items"/>
		</Variant>

		<!-- ════════════ DEFAULT SLOT (explicit children + subheader) ════════════ -->
		<Variant title="Default slot">
			<origam-list data-cy="list-slot">
				<origam-list-subheader title="Section A" data-cy="list-slot-subheader-a"/>
				<origam-list-item
						title="Alpha"
						subtitle="First item with subtitle"
						data-cy="list-slot-alpha"
				/>
				<origam-list-item
						title="Beta"
						subtitle="Second item with subtitle"
						data-cy="list-slot-beta"
				/>
				<origam-list-subheader title="Section B" data-cy="list-slot-subheader-b"/>
				<origam-list-item title="Gamma" data-cy="list-slot-gamma"/>
				<origam-list-item title="Delta" data-cy="list-slot-delta"/>
			</origam-list>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-list :density="state.density" data-cy="list-density">
					<origam-list-item title="Item one"   data-cy="list-density-1"/>
					<origam-list-item title="Item two"   data-cy="list-density-2"/>
					<origam-list-item title="Item three" data-cy="list-density-3"/>
				</origam-list>
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
				<origam-list :color="state.color" :bg-color="state.bgColor" data-cy="list-color">
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ BG COLOR ════════════ -->
		<Variant
				title="BgColor"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<origam-list :bg-color="state.bgColor" data-cy="list-bgcolor">
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: true })"
		>
			<template #default="{ state }">
				<origam-list :rounded="state.rounded" data-cy="list-rounded">
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
				</origam-list>
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
				<origam-list :border="state.border" data-cy="list-border">
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ LINES ════════════ -->
		<Variant
				title="Lines"
				:init-state="() => useStoryInitState<IListProps>({ lines: LINES.ONE })"
		>
			<template #default="{ state }">
				<origam-list :lines="state.lines" data-cy="list-lines">
					<origam-list-item title="One-line item"/>
					<origam-list-item title="Two-line" subtitle="With subtitle"/>
					<origam-list-item title="Three-line" subtitle="Extra detail here"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.lines" title="lines" :options="linesList"/>
			</template>
		</Variant>

		<!-- ════════════ SLIM ════════════ -->
		<Variant
				title="Slim"
				:init-state="() => useStoryInitState<{ slim: boolean }>({ slim: true })"
		>
			<template #default="{ state }">
				<origam-list :slim="state.slim" data-cy="list-slim">
					<origam-list-item title="Slim item one"/>
					<origam-list-item title="Slim item two"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.slim" title="slim"/>
			</template>
		</Variant>

		<!-- ════════════ NAV ════════════ -->
		<Variant
				title="Nav"
				:init-state="() => useStoryInitState<{ nav: boolean }>({ nav: true })"
		>
			<template #default="{ state }">
				<origam-list :nav="state.nav" data-cy="list-nav">
					<origam-list-item title="Dashboard"  :prepend-icon="MDI_ICONS.HOME"/>
					<origam-list-item title="Settings"   :prepend-icon="MDI_ICONS.COG"/>
					<origam-list-item title="Profile"    :prepend-icon="MDI_ICONS.ACCOUNT"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.nav" title="nav"/>
			</template>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IListProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					lines: undefined,
					slim: false,
					nav: false,
				})"
		>
			<template #default="{ state }">
				<origam-list v-bind="state" data-cy="list-playground">
					<origam-list-item title="Item one"   data-cy="list-playground-1"/>
					<origam-list-item title="Item two"   subtitle="With subtitle" data-cy="list-playground-2"/>
					<origam-list-item title="Item three" data-cy="list-playground-3"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density" title="density" :options="densityList"/>
				<HstSelect   v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect   v-model="state.bgColor" title="bgColor" :options="intentList"/>
				<HstSelect   v-model="state.rounded" title="rounded" :options="roundedList"/>
				<HstCheckbox v-model="state.border"  title="border"/>
				<HstSelect   v-model="state.lines"   title="lines"   :options="linesList"/>
				<HstCheckbox v-model="state.slim"    title="slim"/>
				<HstCheckbox v-model="state.nav"     title="nav"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import {
		OrigamList,
		OrigamListItem,
		OrigamListSubheader
	} from '@origam/components'
	import { DENSITY, LINES, MDI_ICONS } from '@origam/enums'
	import type {
		IBorderProps,
		IColorProps,
		IDensityProps,
		IListProps,
		IRoundedProps
	} from '@origam/interfaces'
	import type { IOptions } from '@origam/interfaces'
	import type { TLines } from '@origam/types'

	import { densityList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const linesList: Array<IOptions<TLines>> = [
		{ label: '(none)', value: undefined },
		{ label: 'One',    value: LINES.ONE   },
		{ label: 'Two',    value: LINES.TWO   },
		{ label: 'Three',  value: LINES.THREE },
	]

	const listItems = [
		{ type: 'item', title: 'Item Alpha', subtitle: 'subtitle A' },
		{ type: 'item', title: 'Item Beta',  subtitle: 'subtitle B' },
		{ type: 'item', title: 'Item Gamma'                         },
	]
</script>
