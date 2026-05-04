<template>
	<Story
			group="components"
			title="Pagination/OrigamPagination"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant title="Basic">
			<origam-pagination v-model="page" :length="10"/>
		</Variant>

		<!-- ════════════ LENGTH & VISIBLE ════════════ -->
		<Variant
				title="Length and total visible"
				:init-state="() => useStoryInitState<{ length?: number; totalVisible?: number }>({ length: 20, totalVisible: 7 })"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						:length="state.length"
						:total-visible="state.totalVisible"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.length"       title="length"       :min="1" :max="100"/>
				<HstNumber v-model="state.totalVisible" title="totalVisible" :min="3" :max="15"/>
			</template>
		</Variant>

		<!-- ════════════ FIRST / LAST PAGE ════════════ -->
		<Variant
				title="First / last page buttons"
				:init-state="() => useStoryInitState<{ showFirstLastPage?: boolean }>({ showFirstLastPage: true })"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						:length="20"
						:show-first-last-page="state.showFirstLastPage"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showFirstLastPage" title="showFirstLastPage"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-pagination v-model="page" :length="10" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ DISABLED ════════════ -->
		<Variant title="Disabled">
			<origam-pagination v-model="page" :length="10" disabled/>
		</Variant>

		<!-- ════════════ SLOT: item ════════════ -->
		<Variant title="Slot — item">
			<origam-pagination v-model="page" :length="5">
				<template #item>
					<span style="padding: 0 4px; cursor: pointer;">•</span>
				</template>
			</origam-pagination>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-pagination
					v-model="page"
					:length="10"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					length?: number
					totalVisible?: number
					showFirstLastPage?: boolean
					disabled?: boolean
					color?: string
				}>({
					length: 15,
					totalVisible: 7,
					showFirstLastPage: false,
					disabled: false,
					color: undefined
				})"
		>
			<template #default="{ state }">
				<origam-pagination v-model="page" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.length"           title="length" :min="1"/>
				<HstNumber   v-model="state.totalVisible"     title="totalVisible" :min="3"/>
				<HstCheckbox v-model="state.showFirstLastPage" title="showFirstLastPage"/>
				<HstCheckbox v-model="state.disabled"         title="disabled"/>
				<HstSelect   v-model="state.color"            title="color" :options="intentList"/>
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

	import { OrigamPagination } from '@origam/components'
	import type { IColorProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList } from '@stories/const'

	const page = ref(1)
</script>

<docs lang="md" src="@docs/components/Pagination/OrigamPagination.md"/>
