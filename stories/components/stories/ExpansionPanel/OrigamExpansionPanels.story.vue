<template>
	<Story
			group="components"
			title="ExpansionPanel/OrigamExpansionPanels"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<origam-expansion-panels data-cy="expansion-default">
				<origam-expansion-panel title="Panel 1" content="Content of panel 1" data-cy="expansion-default-p1"/>
				<origam-expansion-panel title="Panel 2" content="Content of panel 2" data-cy="expansion-default-p2"/>
				<origam-expansion-panel title="Panel 3" content="Content of panel 3" data-cy="expansion-default-p3"/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ ITEMS PROP ════════════ -->
		<Variant title="Items prop">
			<origam-expansion-panels :items="panelItems" data-cy="expansion-items"/>
		</Variant>

		<!-- ════════════ DEFAULT SLOT (explicit children with title / content slots) ════════════ -->
		<Variant title="Default slot">
			<origam-expansion-panels data-cy="expansion-slot">
				<origam-expansion-panel data-cy="expansion-slot-p1">
					<template #title>
						<span>Custom title one</span>
					</template>
					<template #default>
						<p>Slot-driven content for panel one.</p>
					</template>
				</origam-expansion-panel>
				<origam-expansion-panel data-cy="expansion-slot-p2">
					<template #title>
						<span>Custom title two</span>
					</template>
					<template #default>
						<p>Slot-driven content for panel two.</p>
					</template>
				</origam-expansion-panel>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ MULTIPLE ════════════ -->
		<Variant title="Multiple">
			<origam-expansion-panels multiple data-cy="expansion-multiple">
				<origam-expansion-panel title="Alpha"   content="Alpha content"/>
				<origam-expansion-panel title="Beta"    content="Beta content"/>
				<origam-expansion-panel title="Gamma"   content="Gamma content"/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ MANDATORY ════════════ -->
		<Variant title="Mandatory">
			<origam-expansion-panels mandatory data-cy="expansion-mandatory">
				<origam-expansion-panel title="Always one open" content="This panel stays open."/>
				<origam-expansion-panel title="Panel two"       content="Panel two content."/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-expansion-panels :density="state.density" data-cy="expansion-density">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
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
				<origam-expansion-panels :color="state.color" :bg-color="state.bgColor" data-cy="expansion-color">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
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
				<origam-expansion-panels :bg-color="state.bgColor" data-cy="expansion-bgcolor">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
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
				<origam-expansion-panels :rounded="state.rounded" data-cy="expansion-rounded">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
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
				<origam-expansion-panels :border="state.border" data-cy="expansion-border">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ FLAT ════════════ -->
		<Variant
				title="Flat"
				:init-state="() => useStoryInitState<{ flat: boolean }>({ flat: true })"
		>
			<template #default="{ state }">
				<origam-expansion-panels :flat="state.flat" data-cy="expansion-flat">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.flat" title="flat"/>
			</template>
		</Variant>

		<!-- ════════════ ACCORDION ════════════ -->
		<Variant title="Accordion">
			<origam-expansion-panels accordion data-cy="expansion-accordion">
				<origam-expansion-panel title="Step 1" content="First step content."/>
				<origam-expansion-panel title="Step 2" content="Second step content."/>
				<origam-expansion-panel title="Step 3" content="Third step content."/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ INSET ════════════ -->
		<Variant title="Inset">
			<origam-expansion-panels inset data-cy="expansion-inset">
				<origam-expansion-panel title="Panel 1" content="Content 1"/>
				<origam-expansion-panel title="Panel 2" content="Content 2"/>
			</origam-expansion-panels>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IExpansionPanelsProps>({
					density: DENSITY.DEFAULT,
					color: undefined,
					bgColor: undefined,
					rounded: undefined,
					border: false,
					flat: false,
					accordion: false,
					inset: false,
					multiple: false,
					mandatory: false,
				})"
		>
			<template #default="{ state }">
				<origam-expansion-panels v-bind="state" data-cy="expansion-playground">
					<origam-expansion-panel title="Panel 1" content="Content 1"/>
					<origam-expansion-panel title="Panel 2" content="Content 2"/>
					<origam-expansion-panel title="Panel 3" content="Content 3"/>
				</origam-expansion-panels>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstCheckbox v-model="state.border"    title="border"/>
				<HstCheckbox v-model="state.flat"      title="flat"/>
				<HstCheckbox v-model="state.accordion" title="accordion"/>
				<HstCheckbox v-model="state.inset"     title="inset"/>
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.mandatory" title="mandatory"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamExpansionPanel, OrigamExpansionPanels } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type {
		IBorderProps,
		IColorProps,
		IDensityProps,
		IExpansionPanelProps,
		IExpansionPanelsProps,
		IRoundedProps
	} from '@origam/interfaces'

	import { densityList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const panelItems: Array<IExpansionPanelProps> = [
		{ title: 'Item A', content: 'Content for item A' },
		{ title: 'Item B', content: 'Content for item B' },
		{ title: 'Item C', content: 'Content for item C' },
	]
</script>
