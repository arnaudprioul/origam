<template>
	<Story
			group="components"
			title="Loader/OrigamLoader"
	>
		<!--
			Playground — first by convention. Exposes every ILoaderProps knob.
		-->
		<Variant
				title="Default"
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

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — loading"
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

		<Variant
				title="Prop — color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<origam-loader loading :color="state.color"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-loader loading :tag="state.tag" data-cy="loader-tagged"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default (idle content)">
			<origam-loader>
				<span style="font-style: italic;">Custom default slot content</span>
			</origam-loader>
		</Variant>

		<Variant title="Slot — loader (custom spinner)">
			<origam-loader loading>
				<template #loader>
					<span style="font-weight: 600;">Loading, please wait...</span>
				</template>
			</origam-loader>
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
