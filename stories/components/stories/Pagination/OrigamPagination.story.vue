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

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<!--
			ONE variant per interface — `IColorProps` covers `color`,
			`bgColor`, plus the `hover*` / `active*` state variants. All
			six fields surface together (Btn / Switch / SliderField /
			Select / RatingField / Radio / Password / TextField pattern).
			Channel mapping (Pagination forwards the full shape to each
			inner btn item, so the rungs are driven by the Btn's own
			`useColorEffect`):
			  • `color`      → resting btn fg
			  • `bgColor`    → resting btn surface
			  • `hoverColor` / `hoverBgColor`   → hover state
			  • `activeColor` / `activeBgColor` → currently selected page
			Hardcoded fixtures below the interactive control give the
			e2e suite stable `data-cy="pagination-color-fixture-{n}"`
			selectors.
		-->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-pagination v-model="page" :length="10" v-bind="state" data-cy="pagination-color"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-pagination :model-value="3" :length="6"
						                   color="primary"
						                   data-cy="pagination-color-fixture-color-only"/>
						<origam-pagination :model-value="3" :length="6"
						                   bg-color="success"
						                   data-cy="pagination-color-fixture-bg-only"/>
						<origam-pagination :model-value="3" :length="6"
						                   color="warning" bg-color="primary"
						                   hover-color="info" hover-bg-color="info"
						                   active-color="danger" active-bg-color="danger"
						                   data-cy="pagination-color-fixture-combo"/>
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

		<!-- ════════════ COMPACT ════════════ -->
		<Variant title="Compact">
			<origam-pagination v-model="page" :length="12" compact data-cy="pagination-compact"/>
		</Variant>

		<!-- ════════════ COMPACT + FIRST/LAST ════════════ -->
		<Variant title="Compact + showFirstLastPage">
			<origam-pagination v-model="page" :length="12" compact show-first-last-page data-cy="pagination-compact-first-last"/>
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
