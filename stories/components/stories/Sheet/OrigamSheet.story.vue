<template>
	<Story
			group="components"
			title="Sheet/OrigamSheet"
	>

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

		<Variant title="Slot — default">
			<origam-sheet border rounded style="padding: 16px;">
				<strong>Custom default slot</strong>
				<p>Anything goes inside a sheet.</p>
			</origam-sheet>
		</Variant>

		<Variant
				title="Bottom — swipeable"
				:init-state="() => useStoryInitState<{
					defaultSnap: 'closed' | 'peek' | 'half' | 'full'
					persistent: boolean
				}>({ defaultSnap: 'peek', persistent: false })"
		>
			<template #default="{ state }">
				<div style="position: relative; height: 480px; background: var(--origam-color-surface-overlay, #f5f5f5); overflow: hidden; border-radius: 8px;">
					<div style="padding: 16px;">
						<strong>Page content</strong>
						<p style="font-size: 12px; color: var(--origam-color-text-secondary);">
							Drag the pill at the top of the sheet to expand or dismiss.
						</p>
					</div>
					<origam-sheet
							:swipeable="true"
							side="bottom"
							:default-snap="state.defaultSnap"
							:persistent="state.persistent"
							elevation="lg"
							style="background: var(--origam-color-surface-default);"
							data-cy="sheet-bottom-swipeable"
					>
						<template #default>
							<div style="padding: 0 16px 16px;">
								<h3 style="margin: 4px 0 12px; font-size: 14px; font-weight: 600;">Choose a destination</h3>
								<ul style="list-style: none; padding: 0; margin: 0;">
									<li v-for="i in 16" :key="i" style="padding: 12px 0; border-bottom: 1px solid var(--origam-color-border-subtle, #ddd);">
										Item {{ i }} — Lorem ipsum dolor sit amet
									</li>
								</ul>
							</div>
						</template>
					</origam-sheet>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.defaultSnap"
						title="defaultSnap"
						:options="snapList"
				/>
				<HstCheckbox
						v-model="state.persistent"
						title="persistent"
				/>
			</template>
		</Variant>

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

	// Local list — Sheet is the only consumer of TSheetSnapId today, so
	// there's no upside to promoting this to `@stories/const`. Promote
	// the day a second component needs the same dropdown.
	const snapList = [
		{ label: 'closed', value: 'closed' },
		{ label: 'peek',   value: 'peek' },
		{ label: 'half',   value: 'half' },
		{ label: 'full',   value: 'full' }
	]
</script>

<docs lang="md" src="@docs/components/Sheet/OrigamSheet.md"/>
