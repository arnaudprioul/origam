<template>
	<Story
			group="components"
			title="Divider/OrigamDivider"
	>
		<!--
			Playground — first by convention. Exposes every IDividerProps knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IDividerProps>({
					direction: undefined,
					length: undefined,
					thickness: undefined
				})"
		>
			<template #default="{ state }">
				<div v-if="state.direction === 'vertical'" style="display: flex; gap: 12px; align-items: center; height: 64px;">
					<span>Left</span>
					<origam-divider v-bind="state"/>
					<span>Right</span>
				</div>
				<div v-else style="display: flex; flex-direction: column; gap: 12px;">
					<span>Top</span>
					<origam-divider v-bind="state"/>
					<span>Bottom</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
				<HstNumber v-model="state.length"    title="length (px)"/>
				<HstNumber v-model="state.thickness" title="thickness (px)"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — direction"
				:init-state="() => useStoryInitState<{ direction?: TDirection }>({ direction: undefined })"
		>
			<template #default="{ state }">
				<div v-if="state.direction === 'vertical'" style="display: flex; gap: 12px; align-items: center; height: 32px;">
					<span>Left</span>
					<origam-divider :direction="state.direction"/>
					<span>Right</span>
				</div>
				<div v-else style="display: flex; flex-direction: column; gap: 12px;">
					<span>Top</span>
					<origam-divider :direction="state.direction"/>
					<span>Bottom</span>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — length"
				:init-state="() => useStoryInitState<{ length?: number | string }>({ length: 120 })"
		>
			<template #default="{ state }">
				<origam-divider :length="state.length"/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.length" title="length (px)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — thickness"
				:init-state="() => useStoryInitState<{ thickness?: number | string }>({ thickness: 2 })"
		>
			<template #default="{ state }">
				<origam-divider :thickness="state.thickness"/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.thickness" title="thickness (px)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<origam-divider v-bind="state" data-cy="divider-color"/>
					<origam-divider color="primary" data-cy="divider-color-primary"/>
					<origam-divider color="success" data-cy="divider-color-success"/>
					<origam-divider color="warning" data-cy="divider-color-warning"/>
					<origam-divider color="danger"  data-cy="divider-color-danger"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamDivider } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type {
		IColorProps,
		IDividerProps,
		IOptions
	} from '@origam/interfaces'
	import type { TDirection } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	/**
	 * Divider direction options. Inlined here because the divider is the
	 * only component currently consuming this enum at story level.
	 */
	const directionList: Array<IOptions<TDirection>> = [
		{ label: '(default — horizontal)', value: undefined },
		{ label: 'Horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'Vertical', value: DIRECTION.VERTICAL },
	]
</script>

<docs lang="md" src="@docs/components/Divider/OrigamDivider.md"/>
