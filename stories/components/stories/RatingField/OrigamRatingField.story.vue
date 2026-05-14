<template>
	<Story
			group="components"
			title="RatingField/OrigamRatingField"
	>
		<!-- Playground — first by convention, surfaces every prop via sidebar controls. -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					length?: number
					halfIncrements?: boolean
					hover?: boolean
					clearable?: boolean
					disabled?: boolean
					readonly?: boolean
					size?: string
				}>({
					length: 5,
					halfIncrements: false,
					hover: false,
					clearable: false,
					disabled: false,
					readonly: false,
					size: undefined
				})"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.length"         title="length" :min="1" :max="20"/>
				<HstCheckbox v-model="state.halfIncrements" title="halfIncrements"/>
				<HstCheckbox v-model="state.hover"          title="hover"/>
				<HstCheckbox v-model="state.clearable"      title="clearable"/>
				<HstCheckbox v-model="state.disabled"       title="disabled"/>
				<HstCheckbox v-model="state.readonly"       title="readonly"/>
				<HstSelect   v-model="state.size"           title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ── Props ─────────────────────────────────────────────── -->

		<Variant
				title="Prop — length"
				:init-state="() => useStoryInitState<{ length?: number }>({ length: 5 })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" :length="state.length"/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.length" title="length" :min="1" :max="20"/>
			</template>
		</Variant>

		<Variant
				title="Prop — halfIncrements"
				:init-state="() => useStoryInitState<{ halfIncrements?: boolean }>({ halfIncrements: true })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="halfRating" :half-increments="state.halfIncrements"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.halfIncrements" title="halfIncrements"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<{ hover?: boolean }>({ hover: true })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" :hover="state.hover"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hover" title="hover"/>
			</template>
		</Variant>

		<Variant
				title="Prop — disabled, readonly & clearable"
				:init-state="() => useStoryInitState<{
					disabled?: boolean
					readonly?: boolean
					clearable?: boolean
				}>({ disabled: false, readonly: false, clearable: false })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.disabled"  title="disabled"/>
				<HstCheckbox v-model="state.readonly"  title="readonly"/>
				<HstCheckbox v-model="state.clearable" title="clearable"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<{ size?: string }>({ size: undefined })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" :size="state.size"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant title="Prop — itemLabels">
			<origam-rating-field
					v-model="rating"
					:item-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']"
					item-label-position="top"
			/>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-rating-field
							v-model="colorRating"
							v-bind="state"
							data-cy="rating-color"
					/>
					<div data-cy="rating-color-status">value = {{ colorRating }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-rating-field :model-value="3"
						                     color="primary"
						                     data-cy="rating-color-fixture-color-only"/>
						<origam-rating-field :model-value="3"
						                     color="success"
						                     data-cy="rating-color-fixture-success"/>
						<origam-rating-field :model-value="3"
						                     color="warning" hover-color="danger"
						                     data-cy="rating-color-fixture-hover"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-rating-field
							v-model="colorRating"
							v-bind="state"
							data-cy="rating-color"
					/>
					<div data-cy="rating-color-status">value = {{ colorRating }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-rating-field :model-value="3"
						                     color="primary"
						                     data-cy="rating-color-fixture-color-only"/>
						<origam-rating-field :model-value="3"
						                     color="success"
						                     data-cy="rating-color-fixture-success"/>
						<origam-rating-field :model-value="3"
						                     color="warning" hover-color="danger"
						                     data-cy="rating-color-fixture-hover"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hHover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => state._hHover = v"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-rating-field
							v-model="colorRating"
							v-bind="state"
							data-cy="rating-color"
					/>
					<div data-cy="rating-color-status">value = {{ colorRating }}</div>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-rating-field :model-value="3"
						                     color="primary"
						                     data-cy="rating-color-fixture-color-only"/>
						<origam-rating-field :model-value="3"
						                     color="success"
						                     data-cy="rating-color-fixture-success"/>
						<origam-rating-field :model-value="3"
						                     color="warning" hover-color="danger"
						                     data-cy="rating-color-fixture-hover"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<!-- ── Slots ─────────────────────────────────────────────── -->

		<Variant title="Slot — append">
			<origam-rating-field v-model="rating">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-rating-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-rating-field v-model="rating">
				<span>Custom slot content</span>
			</origam-rating-field>
		</Variant>

		<Variant title="Slot — details">
			<origam-rating-field v-model="rating">
				<template #details>
					<span>Custom details area</span>
				</template>
			</origam-rating-field>
		</Variant>

		<Variant title="Slot — itemLabel">
			<origam-rating-field v-model="rating" :item-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']" item-label-position="top">
				<template #itemLabel="{ label }">
					<strong>{{ label }}</strong>
				</template>
			</origam-rating-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-rating-field v-model="rating">
				<template #label>
					<span style="font-weight: bold;">Rate us</span>
				</template>
			</origam-rating-field>
		</Variant>

		<!-- ── Emits ─────────────────────────────────────────────── -->

		<Variant title="Emit — update:modelValue">
			<origam-rating-field
					v-model="rating"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamIcon, OrigamRatingField } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		hoverList,
		intentList, sizeList
	} from '@stories/const'

	const rating = ref(3)
	const halfRating = ref(2.5)
	const colorRating = ref(3)
</script>

<docs lang="md" src="@docs/components/RatingField/OrigamRatingField.md"/>
