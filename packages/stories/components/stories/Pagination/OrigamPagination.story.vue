<template>
	<Story
			group="components"
			title="Pagination/OrigamPagination"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<IPaginationProps>>({
					color: 'primary',
					length: 10,
					totalVisible: 7
				})"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						:color="state.color"
						:padding="state.padding"
						:margin="state.margin"
						:bg-color="state.bgColor"
						:size="state.size"
						:density="state.density"
						:elevation="state.elevation"
						:border="state.border"
						:border-color="state.borderColor"
						:border-style="state.borderStyle"
						:length="state.length"
						:total-visible="state.totalVisible"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Sizing">
					<HstSelect v-model="state.size"    title="Size"    :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density" title="Density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border"      title="Border"       :options="BORDER_OPTIONS"/>
					<HstText   v-model="state.borderColor" title="Border Color"/>
					<HstSelect v-model="state.borderStyle" title="Border Style" :options="BORDER_STYLE_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Pagination">
					<HstNumber v-model="state.length"       title="Length"        :min="1" :max="100"/>
					<HstNumber v-model="state.totalVisible" title="Total Visible" :min="3" :max="15"/>
				</StoryGroup>
				<StoryGroup title="Spacing">
					<HstText v-model="state.padding" title="Padding"/>
					<HstText v-model="state.margin"  title="Margin"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<IPaginationProps>>({
					length: 15,
					totalVisible: 7,
					showFirstLastPage: false,
					disabled: false,
					compact: false,
					withInfo: false,
					total: 200,
					perPage: 20
				})"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						:length="state.length"
						:total-visible="state.totalVisible"
						:show-first-last-page="state.showFirstLastPage"
						:disabled="state.disabled"
						:compact="state.compact"
						:with-info="state.withInfo"
						:total="state.total"
						:per-page="state.perPage"
						:tag="state.tag"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
				</StoryGroup>
				<StoryGroup title="Layout">
					<HstCheckbox v-model="state.showFirstLastPage" title="Show First/Last Page"/>
					<HstCheckbox v-model="state.compact"           title="Compact"/>
				</StoryGroup>
				<StoryGroup title="Info">
					<HstCheckbox v-model="state.withInfo" title="With Info"/>
					<HstNumber   v-model="state.total"    title="Total Items"    :min="0"/>
					<HstNumber   v-model="state.perPage"  title="Per Page"       :min="1" :max="100"/>
				</StoryGroup>
				<StoryGroup title="Link">
					<HstSelect v-model="state.tag" title="Tag" :options="TAG_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ EMITS ════════════════════════ -->

		<Variant title="Events - update:modelValue">
			<origam-pagination
					v-model="page"
					:length="10"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>

		<Variant title="Events - first">
			<origam-pagination
					v-model="page"
					:length="10"
					show-first-last-page
					@first="logEvent('first', $event)"
			/>
		</Variant>

		<Variant title="Events - prev">
			<origam-pagination
					v-model="page"
					:length="10"
					@prev="logEvent('prev', $event)"
			/>
		</Variant>

		<Variant title="Events - next">
			<origam-pagination
					v-model="page"
					:length="10"
					@next="logEvent('next', $event)"
			/>
		</Variant>

		<Variant title="Events - last">
			<origam-pagination
					v-model="page"
					:length="10"
					show-first-last-page
					@last="logEvent('last', $event)"
			/>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - First">
			<origam-pagination v-model="page" :length="10" show-first-last-page>
				<template #first>
					<span>|&lt;</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slots - Last">
			<origam-pagination v-model="page" :length="10" show-first-last-page>
				<template #last>
					<span>&gt;|</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slots - Prev">
			<origam-pagination v-model="page" :length="10">
				<template #prev>
					<span>&lt; Prev</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slots - Next">
			<origam-pagination v-model="page" :length="10">
				<template #next>
					<span>Next &gt;</span>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slots - Item">
			<origam-pagination v-model="page" :length="5">
				<template #item="{ page: p }">
					<button style="padding: 0 8px; cursor: pointer; font-weight: bold;">{{ p }}</button>
				</template>
			</origam-pagination>
		</Variant>

		<Variant title="Slots - Info">
			<origam-pagination v-model="page" :length="10" with-info :total="200" :per-page="20">
				<template #info="{ start, end, total: t }">
					<em>Records {{ start }}–{{ end }} of {{ t }}</em>
				</template>
			</origam-pagination>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IPaginationProps>({
					length: 15,
					totalVisible: 7,
					color: 'primary'
				})"
		>
			<template #default="{ state }">
				<origam-pagination
						v-model="page"
						v-bind="state"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstNumber v-model="state.length"       title="Length"        :min="1" :max="100"/>
					<HstNumber v-model="state.totalVisible" title="Total Visible" :min="3" :max="15"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect v-model="state.color"     title="Color"     :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor"   title="Bg Color"  :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.size"      title="Size"      :options="SIZE_OPTIONS"/>
					<HstSelect v-model="state.density"   title="Density"   :options="DENSITY_OPTIONS"/>
					<HstSelect v-model="state.elevation" title="Elevation" :options="ELEVATION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.showFirstLastPage" title="Show First/Last Page"/>
					<HstCheckbox v-model="state.compact"           title="Compact"/>
					<HstCheckbox v-model="state.disabled"          title="Disabled"/>
					<HstCheckbox v-model="state.withInfo"          title="With Info"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { logEvent } from 'histoire/client'

	import { OrigamPagination } from '@origam/components'
	import type { IPaginationProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		BORDER_STYLE_OPTIONS,
		COLOR_OPTIONS,
		DENSITY_OPTIONS,
		ELEVATION_OPTIONS,
		SIZE_OPTIONS,
		TAG_OPTIONS
	} from '@stories/const'

	const page = ref(1)
</script>

<docs lang="md" src="@docs/components/Pagination/OrigamPagination.md"/>
