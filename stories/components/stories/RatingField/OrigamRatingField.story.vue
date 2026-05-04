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

	import { useStoryInitState } from '@stories/composables'
	import { sizeList } from '@stories/const'

	const rating = ref(3)
	const halfRating = ref(2.5)
</script>

<docs lang="md" src="@docs/components/RatingField/OrigamRatingField.md"/>
