<template>
	<Story
			group="components"
			title="Pagination/OrigamPagination"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

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
				<origam-pagination v-model="page" v-bind="state" data-cy="pagination-playground"/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.length"            title="length" :min="1"/>
				<HstNumber   v-model="state.totalVisible"      title="totalVisible" :min="3"/>
				<HstCheckbox v-model="state.showFirstLastPage" title="showFirstLastPage"/>
				<HstCheckbox v-model="state.disabled"          title="disabled"/>
				<HstSelect   v-model="state.color"             title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — length & totalVisible">
			<origam-pagination v-model="page" :length="10"/>
		</Variant>

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

		<Variant
				title="Prop — color & bgColor"
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
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
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
							<HstSelect
							:model-value="state._hActive"
							:options="activeList"
							title="active"
							@update:model-value="(v) => state._hActive = v"
						/>
</template>
		</Variant>

		<Variant title="Prop — disabled">
			<origam-pagination v-model="page" :length="10" disabled/>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — first">
			<origam-pagination v-model="page" :length="10" show-first-last-page>
				<template #first>
					<span>Custom slot content</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slot — info">
			<origam-pagination v-model="page" :length="10" with-info :total="200" :per-page="20">
				<template #info>
					<span>Custom slot content</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slot — item">
			<origam-pagination v-model="page" :length="5">
				<template #item>
					<span style="padding: 0 4px; cursor: pointer;">•</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slot — last">
			<origam-pagination v-model="page" :length="10" show-first-last-page>
				<template #last>
					<span>Custom slot content</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slot — next">
			<origam-pagination v-model="page" :length="10">
				<template #next>
					<span>Custom slot content</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slot — prev">
			<origam-pagination v-model="page" :length="10">
				<template #prev>
					<span>Custom slot content</span>
				</template>
			</origam-pagination>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant title="Emit — first">
			<origam-pagination
					v-model="page"
					:length="10"
					show-first-last-page
					@first="logEvent('first', $event)"
			/>
		</Variant>

		<Variant title="Emit — last">
			<origam-pagination
					v-model="page"
					:length="10"
					show-first-last-page
					@last="logEvent('last', $event)"
			/>
		</Variant>

		<Variant title="Emit — next">
			<origam-pagination
					v-model="page"
					:length="10"
					@next="logEvent('next', $event)"
			/>
		</Variant>

		<Variant title="Emit — prev">
			<origam-pagination
					v-model="page"
					:length="10"
					@prev="logEvent('prev', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-pagination
					v-model="page"
					:length="10"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant
				title="Compact"
				:init-state="() => useStoryInitState<{ compact?: boolean }>({ compact: true })"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						:length="12"
						:compact="state.compact"
						data-cy="pagination-compact"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.compact" title="compact"/>
			</template>
		</Variant>

		<Variant title="Compact + showFirstLastPage">
			<origam-pagination v-model="page" :length="12" compact show-first-last-page data-cy="pagination-compact-first-last"/>
		</Variant>

		<Variant title="Color — default vs primary">
			<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
				<div>
					<small style="display: block; margin-bottom: 8px; color: #666;">
						Default — subtle text-only, transparent surface
					</small>
					<origam-pagination
							:model-value="3"
							:length="6"
							data-cy="pagination-default-look"
					/>
				</div>
				<div>
					<small style="display: block; margin-bottom: 8px; color: #666;">
						color="primary" — filled "stylé" look from the PDF
					</small>
					<origam-pagination
							:model-value="3"
							:length="6"
							color="primary"
							data-cy="pagination-primary-look"
					/>
				</div>
			</div>
		</Variant>

		<Variant
				title="With info"
				:init-state="() => useStoryInitState<{ total?: number; perPage?: number; withInfo?: boolean }>({ total: 248, perPage: 20, withInfo: true })"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						:length="Math.ceil((state.total ?? 0) / (state.perPage ?? 10))"
						:total="state.total"
						:per-page="state.perPage"
						:with-info="state.withInfo"
						data-cy="pagination-with-info"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.withInfo" title="withInfo"/>
				<HstNumber   v-model="state.total"   title="total"   :min="0"/>
				<HstNumber   v-model="state.perPage" title="perPage" :min="1" :max="100"/>
			</template>
		</Variant>

		<Variant title="Sizes — small · default · large (stacked rows)">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
				<origam-pagination v-model="page" :length="3" size="small" data-cy="pagination-size-small"/>
				<origam-pagination v-model="page" :length="3" size="default" data-cy="pagination-size-default"/>
				<origam-pagination v-model="page" :length="3" size="large" data-cy="pagination-size-large"/>
			</div>
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
	import {
		activeList,
		hoverList,
		intentList
	} from '@stories/const'

	const page = ref(1)
</script>

<docs lang="md" src="@docs/components/Pagination/OrigamPagination.md"/>
