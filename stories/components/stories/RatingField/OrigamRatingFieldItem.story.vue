<template>
	<Story
			group="components"
			title="RatingField/OrigamRatingFieldItem"
	>
		<!--
			<origam-rating-field-item> is a single star (or custom icon)
			in an <origam-rating-field>. Stories below use the parent
			rating-field for realistic wiring.
		-->

		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IRatingFieldItemProps>({
					value: 3,
					index: 1,
					name: 'rating',
					label: 'Item',
					showStar: true,
					isFilled: true,
					isHovered: false,
					isHovering: false,
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; gap: 4px; align-items: center;">
					<origam-rating-field-item v-bind="state" data-cy="rating-item-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.value"      title="value"      :min="0" :max="5" :step="0.5"/>
				<HstNumber   v-model="state.index"      title="index"      :min="0" :max="10"/>
				<HstText     v-model="state.name"       title="name"/>
				<HstText     v-model="state.label"      title="label"/>
				<HstCheckbox v-model="state.showStar"   title="showStar"/>
				<HstCheckbox v-model="state.isFilled"   title="isFilled"/>
				<HstCheckbox v-model="state.isHovered"  title="isHovered"/>
				<HstCheckbox v-model="state.isHovering" title="isHovering"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant title="Prop — embedded in RatingField">
			<div style="padding: 24px;">
				<origam-rating-field v-model="defaultValue" :length="5" data-cy="rating-item-default"/>
			</div>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'warning' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-rating-field v-model="colorValue" :length="5" v-bind="state" data-cy="rating-item-color"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"        title="color"        :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'warning' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-rating-field v-model="colorValue" :length="5" v-bind="state" data-cy="rating-item-color"/>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state.hover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state.hover = v && typeof v === 'object' ? { ...v } : v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'warning' })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-rating-field v-model="colorValue" :length="5" v-bind="state" data-cy="rating-item-color"/>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state.active"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state.active = v && typeof v === 'object' ? { ...v } : v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-rating-field v-model="densityValue" :length="5" :density="state.density" data-cy="rating-item-density"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: SIZES.DEFAULT })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<origam-rating-field v-model="sizeValue" :length="5" :size="state.size" data-cy="rating-item-size"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant title="Prop — fullIcon & emptyIcon (heart)">
			<div style="padding: 24px;">
				<origam-rating-field
						v-model="customIconValue"
						:length="5"
						:full-icon="MDI_ICONS.HEART"
						:empty-icon="MDI_ICONS.HEART_OUTLINE"
						color="danger"
						data-cy="rating-item-heart"
				/>
			</div>
		</Variant>

		<Variant title="Prop — readonly & disabled">
			<div style="padding: 24px; display: flex; flex-direction: column; gap: 16px;">
				<origam-rating-field :model-value="3.5" :length="5" readonly half-increments data-cy="rating-item-readonly"/>
				<origam-rating-field :model-value="2"   :length="5" disabled data-cy="rating-item-disabled"/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamRatingField, OrigamRatingFieldItem } from '@origam/components'
	import { DENSITY, MDI_ICONS, SIZES } from '@origam/enums'
	import type { IColorProps, IDensityProps, IRatingFieldItemProps, ISizeProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		densityList, intentList, sizeList,
		hoverList
	} from '@stories/const'

	const defaultValue    = ref(3)
	const colorValue      = ref(4)
	const densityValue    = ref(3)
	const sizeValue       = ref(2)
	const customIconValue = ref(4)
</script>

<docs lang="md" src="@docs/components/RatingField/OrigamRatingFieldItem.md"/>
