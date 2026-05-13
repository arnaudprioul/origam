<template>
	<Story
			group="components"
			title="Picker/OrigamPicker"
	>
		<!--
			Playground — first by convention. All main IPickerProps knobs
			wired via the sidebar.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IPickerProps>({
					title: 'Playground',
					landscape: false,
					hideHeader: false,
					rounded: undefined,
					elevation: undefined,
					color: undefined,
					bgColor: undefined
				})"
		>
			<template #default="{ state }">
				<origam-picker v-bind="state" data-cy="picker-playground">
					<template v-if="!state.hideHeader" #header>
						<div style="padding: 12px 16px; background: var(--origam-color__surface---overlay, #f3f3f3);">
							Header zone
						</div>
					</template>
					<div style="padding: 12px 16px;">Body content.</div>
					<template #actions>
						<origam-btn variant="text" text="Cancel"/>
						<origam-btn text="Save"/>
					</template>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
				<HstCheckbox v-model="state.landscape"  title="landscape"/>
				<HstCheckbox v-model="state.hideHeader" title="hideHeader"/>
				<HstSelect v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect v-model="state.color"     title="color"     :options="colorList"/>
				<HstSelect v-model="state.bgColor"   title="bgColor"   :options="colorList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — title">
			<origam-picker title="Pick something" data-cy="picker-default">
				<p data-cy="picker-default-body">Body content lives in the default slot.</p>
			</origam-picker>
		</Variant>

		<Variant
				title="Prop — title (editable)"
				:init-state="() => useStoryInitState<{ title: string }>({ title: 'Pick a date' })"
		>
			<template #default="{ state }">
				<origam-picker :title="state.title" data-cy="picker-title-prop">
					<p style="padding: 12px 16px;">Body</p>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hideHeader"
				:init-state="() => useStoryInitState<{ hideHeader: boolean }>({ hideHeader: true })"
		>
			<template #default="{ state }">
				<origam-picker
						title="Hidden when toggled"
						:hide-header="state.hideHeader"
						data-cy="picker-hide-header"
				>
					<p style="padding: 12px 16px;">Bodyless picker example.</p>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideHeader" title="hideHeader"/>
			</template>
		</Variant>

		<Variant
				title="Prop — landscape"
				:init-state="() => useStoryInitState<{ landscape: boolean }>({ landscape: true })"
		>
			<template #default="{ state }">
				<origam-picker
						title="Landscape layout"
						:landscape="state.landscape"
						data-cy="picker-landscape"
				>
					<template #header>
						<div data-cy="picker-landscape-header" style="padding: 12px 16px;">Header</div>
					</template>
					<div data-cy="picker-landscape-body" style="padding: 12px 16px;">Body</div>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.landscape" title="landscape"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-picker
						title="Color"
						v-bind="state"
						data-cy="picker-color"
				>
					<div style="padding: 12px 16px;">Body</div>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="colorList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="colorList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation"
				:init-state="() => useStoryInitState<IElevationProps>({})"
		>
			<template #default="{ state }">
				<origam-picker
						title="Elevation"
						:elevation="state.elevation"
						data-cy="picker-elevation"
				>
					<div style="padding: 12px 16px;">elevation={{ state.elevation ?? '(unset)' }}</div>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-picker
						title="Rounded"
						:rounded="state.rounded"
						border
						data-cy="picker-rounded"
				>
					<div style="padding: 12px 16px;">rounded={{ state.rounded ?? '(unset)' }}</div>
				</origam-picker>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — actions">
			<origam-picker title="With actions" data-cy="picker-actions">
				<div data-cy="picker-actions-body" style="padding: 12px 16px;">Body</div>
				<template #actions>
					<origam-btn
							variant="text"
							text="Cancel"
							data-cy="picker-actions-cancel"
					/>
					<origam-btn
							text="Save"
							data-cy="picker-actions-save"
					/>
				</template>
			</origam-picker>
		</Variant>

		<Variant title="Slot — header">
			<origam-picker title="With header" data-cy="picker-header">
				<template #header>
					<div data-cy="picker-header-content" style="padding: 12px 16px; background: var(--origam-color__surface---overlay, #f3f3f3);">
						Custom header content
					</div>
				</template>
				<div data-cy="picker-header-body" style="padding: 12px 16px;">Body</div>
			</origam-picker>
		</Variant>

		<Variant title="Slot — title">
			<origam-picker data-cy="picker-title-slot">
				<template #title>
					<origam-picker-title
							tag="h2"
							title="Custom title via slot"
							data-cy="picker-title-slot-content"
					/>
				</template>
				<div data-cy="picker-title-slot-body" style="padding: 12px 16px;">Body</div>
			</origam-picker>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamPicker, OrigamPickerTitle } from '@origam/components'
	import type {
		IColorProps,
		IElevationProps,
		IPickerProps,
		IRoundedProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { colorList, elevationList, roundedList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Picker/OrigamPicker.md"/>
