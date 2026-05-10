<template>
	<Story
			group="components"
			title="InfiniteScroll/OrigamInfiniteScrollIntersect"
	>
		<Variant title="Default">
			<origam-infinite-scroll-intersect data-cy="origam-infinite-scroll-intersect-default"/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IInfiniteScrollIntersectProps>({ margin: '' })"
		>
			<template #default="{ state }">
			<origam-infinite-scroll-intersect v-bind="state" data-cy="origam-infinite-scroll-intersect-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.margin" title="margin"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamInfiniteScrollIntersect } from '@origam/components'
	import type { IInfiniteScrollIntersectProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
</script>

<docs lang="md" src="@docs/components/InfiniteScroll/OrigamInfiniteScrollIntersect.md"/>
