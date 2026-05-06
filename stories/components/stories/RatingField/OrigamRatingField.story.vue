<template>
	<Story
			group="components"
			title="RatingField/OrigamRatingField"
	>

		<!-- ════════════ LENGTH ════════════ -->
		<Variant
				title="Length"
				:init-state="() => useStoryInitState<{ length?: number }>({ length: 5 })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" :length="state.length"/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.length" title="length" :min="1" :max="20"/>
			</template>
		</Variant>

		<!-- ════════════ HALF INCREMENTS ════════════ -->
		<Variant
				title="Half increments"
				:init-state="() => useStoryInitState<{ halfIncrements?: boolean }>({ halfIncrements: true })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="halfRating" :half-increments="state.halfIncrements"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.halfIncrements" title="halfIncrements"/>
			</template>
		</Variant>

		<!-- ════════════ HOVER ════════════ -->
		<Variant
				title="Hover preview"
				:init-state="() => useStoryInitState<{ hover?: boolean }>({ hover: true })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" :hover="state.hover"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hover" title="hover"/>
			</template>
		</Variant>

		<!-- ════════════ STATES ════════════ -->
		<Variant
				title="States"
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

		<!-- ════════════ SIZE ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<{ size?: string }>({ size: undefined })"
		>
			<template #default="{ state }">
				<origam-rating-field v-model="rating" :size="state.size"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ ITEM LABELS ════════════ -->
		<Variant title="Item labels">
			<origam-rating-field
					v-model="rating"
					:item-labels="['Terrible', 'Bad', 'OK', 'Good', 'Excellent']"
					item-label-position="top"
			/>
		</Variant>

		<!-- ════════════ SLOT: label ════════════ -->
		<Variant title="Slot — label">
			<origam-rating-field v-model="rating">
				<template #label>
					<span style="font-weight: bold;">Rate us</span>
				</template>
			</origam-rating-field>
		</Variant>

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<!--
			ONE variant per interface — `IColorProps` covers `color`,
			`bgColor`, plus the `hover*` / `active*` state variants.
			Same Btn / Switch / SliderField / Select pattern: all six
			fields surface together so consumers can explore them as one
			cohesive concept.
			Channel mapping for the rating field (icon-only buttons —
			variant: text — so `color` is the dominant axis):
			  • `color`   → star icon color (filled + outline)
			  • `bgColor` → wrapping field surface (only visible if a
			                non-text variant is later applied)
			  • hover/active variants modify the matching channel on
			    the matching interaction state.
			The hardcoded fixtures below the interactive control give
			the e2e suite stable `data-cy="rating-color-fixture-{n}"`
			selectors.
		-->
		<Variant
				title="Color"
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
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-rating-field
					v-model="rating"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
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
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamRatingField } from '@origam/components'
	import type { IColorProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, sizeList } from '@stories/const'

	const rating = ref(3)
	const halfRating = ref(2.5)
	const colorRating = ref(3)
</script>

<docs lang="md" src="@docs/components/RatingField/OrigamRatingField.md"/>
