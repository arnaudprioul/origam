<template>
	<Story
			group="components"
			title="Sheet/OrigamSheet"
	>
		<!-- ════════════ COLOR ════════════ -->
		<!--
			`colorList` mixes intents and every CSS-color format the prop
			accepts. On Sheet the intent values are no-op (no intent →
			SCSS mapping is wired); CSS values resolve via `useColor`
			and produce inline `color` / `background-color` declarations.
		-->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-sheet v-bind="state" style="padding: 16px;">
					Sheet
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="colorList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="colorList"/>
			</template>
		</Variant>

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
				:init-state="() => useStoryInitState<IElevationProps>({})"
		>
			<template #default="{ state }">
				<origam-sheet :elevation="state.elevation" style="padding: 16px;">
					elevation={{ state.elevation ?? '(unset)' }}
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({})"
		>
			<template #default="{ state }">
				<origam-sheet :rounded="state.rounded" border style="padding: 16px;">
					rounded={{ state.rounded ?? '(unset)' }}
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ POSITION ════════════ -->
		<Variant
				title="Position"
				:init-state="() => useStoryInitState<{ position?: TPosition }>({ position: undefined })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 160px; background: var(--origam-color-surface-overlay, #ececec); border-radius: 4px;">
					<origam-sheet
							:position="state.position"
							:top="0"
							:right="0"
							border
							style="padding: 12px; width: 160px;"
					>
						position={{ state.position ?? '(unset)' }}
					</origam-sheet>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.position" title="position" :options="positionList"/>
			</template>
		</Variant>

		<!-- ════════════ DIMENSION ════════════ -->
		<Variant
				title="Dimension"
				:init-state="() => useStoryInitState<IDimensionProps>({ width: 240, height: 120 })"
		>
			<template #default="{ state }">
				<origam-sheet v-bind="state" border style="padding: 16px;">
					{{ state.width }}×{{ state.height }}
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.width"  title="width"/>
				<HstNumber v-model="state.height" title="height"/>
				<HstNumber v-model="state.minWidth"  title="minWidth"/>
				<HstNumber v-model="state.maxWidth"  title="maxWidth"/>
			</template>
		</Variant>

		<!-- ════════════ MODIFIERS (border / rounded) ════════════ -->
		<Variant
				title="Modifiers"
				:init-state="() => useStoryInitState<{
					border?: boolean
					rounded?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<origam-sheet v-bind="state" style="padding: 16px;">
					Modifiers
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border"  title="border"/>
				<HstCheckbox v-model="state.rounded" title="rounded"/>
			</template>
		</Variant>

		<!-- ════════════ TAG ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-sheet :tag="state.tag" border style="padding: 16px;">
					tag={{ state.tag }}
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot — default">
			<origam-sheet border rounded style="padding: 16px;">
				<strong>Custom default slot</strong>
				<p>Anything goes inside a sheet.</p>
			</origam-sheet>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISheetProps>({
					color: undefined,
					bgColor: undefined,
					elevation: undefined,
					rounded: undefined,
					position: undefined,
					width: undefined,
					height: undefined,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-sheet v-bind="state" style="padding: 16px;">
					Playground sheet
				</origam-sheet>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.color"     title="color"     :options="colorList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="colorList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstSelect   v-model="state.position"  title="position"  :options="positionList"/>
				<HstNumber   v-model="state.width"     title="width"/>
				<HstNumber   v-model="state.height"    title="height"/>
				<HstSelect   v-model="state.tag"       title="tag"       :options="tagList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSheet } from '@origam/components'
	import type {
		IColorProps,
		IDimensionProps,
		IElevationProps,
		IRoundedProps,
		ISheetProps
	} from '@origam/interfaces'
	import type { TPosition } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		colorList,
		elevationList,
		positionList,
		roundedList,
		tagList
	} from '@stories/const'
</script>
