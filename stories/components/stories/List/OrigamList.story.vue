<template>
	<Story
			group="components"
			title="List/OrigamList"
	>

		<!--
			REFERENCE STORY — pattern mirrors OrigamBtn.story.vue.

			Each <Variant> drives one orthogonal concern:
			  • one variant per "prop family" (color, size, density, …)
			  • one variant per slot
			  • one variant per emit — wire the listener to
			    `logEvent('event-name', $event)` (imported from
			    'histoire/client') so the emit shows up in histoire's
			    Events tab.
			  • one "playground" variant that exposes everything together
		-->

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

		<!-- ════════════ COLOR / INTENT ════════════ -->
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

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<IElevationProps>({ elevation: 4 })"
		>
			<template #default="{ state }">
				<origam-list :elevation="state.elevation" data-cy="list-elevation">
					<origam-list-item title="Item one"/>
					<origam-list-item title="Item two"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<!-- ════════════ LINES ════════════ -->
		<Variant
				title="Lines"
				:init-state="() => useStoryInitState<{ lines?: TLines }>({ lines: LINES.ONE })"
		>
			<template #default="{ state }">
				<origam-list :lines="state.lines" data-cy="list-lines">
					<origam-list-item title="One-line item"/>
					<origam-list-item title="Two-line" subtitle="With subtitle"/>
					<origam-list-item title="Three-line" subtitle="Extra detail here, very long text to force clamp"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.lines" title="lines" :options="linesList"/>
			</template>
		</Variant>

		<!-- ════════════ MODIFIERS (slim / nav / disabled) ════════════ -->
		<Variant
				title="Modifiers"
				:init-state="() => useStoryInitState<{ slim: boolean, nav: boolean, disabled: boolean }>({ slim: false, nav: false, disabled: false })"
		>
			<template #default="{ state }">
				<origam-list :slim="state.slim" :nav="state.nav" :disabled="state.disabled" data-cy="list-modifiers">
					<origam-list-item title="Dashboard"  :prepend-icon="MDI_ICONS.HOME"/>
					<origam-list-item title="Settings"   :prepend-icon="MDI_ICONS.COG"/>
					<origam-list-item title="Profile"    :prepend-icon="MDI_ICONS.ACCOUNT"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.slim"     title="slim"/>
				<HstCheckbox v-model="state.nav"      title="nav"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
			</template>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<origam-list :items="listItems" data-cy="list-items"/>
		</Variant>

		<!-- ════════════ GROUP (OrigamListGroup) ════════════ -->
		<Variant title="Group">
			<origam-list data-cy="list-group">
				<origam-list-group title="Fruits" data-cy="list-group-fruits">
					<template #items>
						<origam-list-item title="Apple"  data-cy="list-group-apple"/>
						<origam-list-item title="Banana" data-cy="list-group-banana"/>
						<origam-list-item title="Cherry" data-cy="list-group-cherry"/>
					</template>
				</origam-list-group>
				<origam-list-group title="Vegetables" data-cy="list-group-vegetables">
					<template #items>
						<origam-list-item title="Carrot" data-cy="list-group-carrot"/>
						<origam-list-item title="Potato" data-cy="list-group-potato"/>
					</template>
				</origam-list-group>
			</origam-list>
		</Variant>

		<!-- ════════════ SUBHEADER ════════════ -->
		<Variant title="Subheader">
			<origam-list data-cy="list-subheader">
				<origam-list-subheader title="Section A" data-cy="list-subheader-a"/>
				<origam-list-item title="Alpha" subtitle="First item"/>
				<origam-list-item title="Beta"  subtitle="Second item"/>
				<origam-list-subheader title="Section B" data-cy="list-subheader-b"/>
				<origam-list-item title="Gamma"/>
				<origam-list-item title="Delta"/>
			</origam-list>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-list data-cy="list-slot-default">
				<origam-list-item title="Alpha"   data-cy="list-slot-alpha"/>
				<origam-list-item title="Beta"    subtitle="With subtitle" data-cy="list-slot-beta"/>
				<origam-list-item title="Gamma"   data-cy="list-slot-gamma"/>
			</origam-list>
		</Variant>

		<!-- ════════════ SLOT: item (via items prop) ════════════ -->
		<Variant title="Slot — item">
			<origam-list :items="listItems" data-cy="list-slot-item">
				<template #item="{ itemProps }">
					<origam-list-item
							v-bind="itemProps"
							:prepend-icon="MDI_ICONS.STAR"
							data-cy="list-slot-item-custom"
					/>
				</template>
			</origam-list>
		</Variant>

		<!-- ════════════ SLOT: subheader ════════════ -->
		<Variant title="Slot — subheader">
			<origam-list :items="listItemsWithSubheader" data-cy="list-slot-subheader">
				<template #subheader="{ title }">
					<origam-list-subheader :title="`★ ${title}`" data-cy="list-slot-subheader-custom"/>
				</template>
			</origam-list>
		</Variant>

		<!-- ════════════ SLOT: groupActivator ════════════ -->
		<Variant title="Slot — groupActivator">
			<origam-list :items="listItemsWithGroup" data-cy="list-slot-group-activator">
				<template #groupActivator="{ props, isOpen, events, toggleIcon }">
					<origam-list-item
							v-bind="props"
							v-on="events"
							:append-icon="toggleIcon"
							:prepend-icon="MDI_ICONS.FOLDER"
							title="Custom Activator"
							data-cy="list-slot-group-activator-custom"
					/>
				</template>
			</origam-list>
		</Variant>

		<!-- ════════════ EMIT: update:selected ════════════ -->
		<Variant title="Emit — update:selected">
			<origam-list
					:items="selectableItems"
					data-cy="list-emit-selected"
					@update:selected="logEvent('update:selected', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: click:select ════════════ -->
		<Variant title="Emit — click:select">
			<origam-list
					:items="selectableItems"
					data-cy="list-emit-click-select"
					@click:select="logEvent('click:select', $event)"
			/>
		</Variant>

		<!-- ════════════ EMIT: update:opened ════════════ -->
		<Variant title="Emit — update:opened">
			<origam-list
					:items="listItemsWithGroup"
					data-cy="list-emit-opened"
					@update:opened="logEvent('update:opened', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND (everything together) ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IListProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					elevation: undefined,
					lines: undefined,
					slim: false,
					nav: false,
					disabled: false,
				})"
		>
			<template #default="{ state }">
				<origam-list v-bind="state" data-cy="list-playground">
					<origam-list-item title="Item one"   data-cy="list-playground-1"/>
					<origam-list-item title="Item two"   subtitle="With subtitle" data-cy="list-playground-2"/>
					<origam-list-item title="Item three" :prepend-icon="MDI_ICONS.STAR" data-cy="list-playground-3"/>
				</origam-list>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect   v-model="state.lines"     title="lines"     :options="linesList"/>
				<HstCheckbox v-model="state.border"    title="border"/>
				<HstCheckbox v-model="state.slim"      title="slim"/>
				<HstCheckbox v-model="state.nav"       title="nav"/>
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import {
		OrigamList,
		OrigamListGroup,
		OrigamListItem,
		OrigamListSubheader
	} from '@origam/components'
	import { DENSITY, LINES, MDI_ICONS } from '@origam/enums'
	import type {
		IBorderProps,
		IColorProps,
		IDensityProps,
		IElevationProps,
		IListProps,
		IOptions,
		IRoundedProps
	} from '@origam/interfaces'
	import type { TLines } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, elevationList, intentList, roundedList } from '@stories/const'

	const linesList: Array<IOptions<TLines | undefined>> = [
		{ label: '(none)', value: undefined    },
		{ label: 'One',    value: LINES.ONE    },
		{ label: 'Two',    value: LINES.TWO    },
		{ label: 'Three',  value: LINES.THREE  },
	]

	const listItems = [
		{ type: 'item', title: 'Item Alpha', subtitle: 'subtitle A' },
		{ type: 'item', title: 'Item Beta',  subtitle: 'subtitle B' },
		{ type: 'item', title: 'Item Gamma'                         },
	]

	const listItemsWithSubheader = [
		{ type: 'subheader', title: 'Fruits'      },
		{ type: 'item',      title: 'Apple'        },
		{ type: 'item',      title: 'Banana'       },
		{ type: 'subheader', title: 'Vegetables'   },
		{ type: 'item',      title: 'Carrot'       },
	]

	const listItemsWithGroup = [
		{
			type: 'group',
			title: 'Category A',
			children: [
				{ title: 'Item A-1' },
				{ title: 'Item A-2' },
			]
		},
		{
			type: 'group',
			title: 'Category B',
			children: [
				{ title: 'Item B-1' },
			]
		},
	]

	const selectableItems = [
		{ type: 'item', title: 'Option one',   value: 'one'   },
		{ type: 'item', title: 'Option two',   value: 'two'   },
		{ type: 'item', title: 'Option three', value: 'three' },
	]
</script>
