<template>
	<Story
			group="components"
			title="Loader/OrigamLoader"
	>
		<!--
			OrigamLoader is a thin conditional wrapper:
			  • when `loading` is truthy  → renders the #loader slot
			    (default = OrigamProgress, type=circular, indeterminate)
			  • when `loading` is falsy   → renders the #default slot

			Each Variant below isolates one orthogonal concern so a Playwright
			spec can click directly into it and assert runtime behavior.
		-->

		<!-- ════════════ BASIC USAGE ════════════ -->
		<Variant title="Basic usage">
			<div class="demo-row" style="display:flex; gap: 24px; align-items: center;">
				<origam-loader loading/>
				<origam-loader>
					<span>Idle (loading = false)</span>
				</origam-loader>
			</div>
		</Variant>

		<!-- ════════════ LOADING STATE TOGGLE ════════════ -->
		<Variant
				title="Loading"
				:init-state="() => useStoryInitState<{ loading?: boolean }>({ loading: true })"
		>
			<template #default="{ state }">
				<origam-loader :loading="state.loading">
					<span>Idle content</span>
				</origam-loader>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.loading" title="loading"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (intent) ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-loader loading :color="state.color"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ TAG (polymorphism) ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-loader loading :tag="state.tag" data-cy="loader-tagged"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default ════════════ -->
		<Variant title="Slot - default (idle)">
			<origam-loader>
				<span style="font-style: italic;">Custom default slot content</span>
			</origam-loader>
		</Variant>

		<!-- ════════════ SLOT: loader ════════════ -->
		<Variant title="Slot - loader">
			<origam-loader loading>
				<template #loader>
					<span style="font-weight: 600;">Loading, please wait...</span>
				</template>
			</origam-loader>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ILoaderProps>({
					loading: true,
					color: 'primary',
					tag: 'span',
					loadingText: ''
				})"
		>
			<template #default="{ state }">
				<origam-loader v-bind="state">
					<span>Idle content</span>
				</origam-loader>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.loading"     title="loading"/>
				<HstSelect   v-model="state.color"       title="color"  :options="intentList"/>
				<HstSelect   v-model="state.tag"         title="tag"    :options="tagList"/>
				<HstText     v-model="state.loadingText" title="loadingText"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamLoader } from '@origam/components'
	import type { IColorProps, ILoaderProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, tagList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Loader/OrigamLoader.md"/>
