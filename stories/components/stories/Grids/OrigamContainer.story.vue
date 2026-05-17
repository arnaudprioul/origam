<template>
	<Story
			group="components"
			title="Grids/OrigamContainer"
	>
		<!--
			Playground — first variant by convention. Surfaces every
			IContainerProps knob via the sidebar controls.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IContainerProps>({
					fluid: false,
					fullscreen: false,
					tag: 'div'
				})"
		>
			<template #default="{ state }">
				<origam-container v-bind="state">
					<div class="demo-cell">container</div>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fluid"      title="fluid"/>
				<HstCheckbox v-model="state.fullscreen" title="fullscreen"/>
				<HstSelect   v-model="state.tag"        title="tag"      :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — fluid & fullscreen"
				:init-state="() => useStoryInitState<{
					fluid?: boolean
					fullscreen?: boolean
				}>({})"
		>
			<template #default="{ state }">
				<origam-container v-bind="state" style="background: var(--origam-color__surface---overlay, #ececec);">
					<div class="demo-cell">container content</div>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.fluid"      title="fluid"/>
				<HstCheckbox v-model="state.fullscreen" title="fullscreen"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-container :tag="state.tag">
					<div class="demo-cell">tag={{ state.tag }}</div>
				</origam-container>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-container>
				<origam-row>
					<origam-col cols="6">
						<div class="demo-cell">A</div>
					</origam-col>
					<origam-col cols="6">
						<div class="demo-cell">B</div>
					</origam-col>
				</origam-row>
			</origam-container>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import type { IContainerProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { tagList } from '@stories/const'
</script>

<style scoped>
	.demo-cell {
		padding: 12px;
		text-align: center;
	}
</style>

<docs lang="md" src="@docs/components/Grids/OrigamContainer.md"/>
