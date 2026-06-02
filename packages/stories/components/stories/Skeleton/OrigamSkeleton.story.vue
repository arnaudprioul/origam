<template>
	<Story
			group="components"
			title="Skeleton/OrigamSkeleton"
	>
		<!--
			Playground — first by convention. Exposes every ISkeletonProps knob.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<ISkeletonProps>({
					variant: 'text',
					width: '200',
					loading: true,
					pulse: true,
					rounded: undefined,
					bgColor: undefined
				})"
		>
			<template #default="{ state }">
				<origam-skeleton
						v-bind="state"
						data-cy="skeleton-default"
				>
					<p>Content loaded</p>
				</origam-skeleton>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.variant" title="variant"  :options="variantList"/>
				<HstText     v-model="state.width"   title="width"/>
				<HstText     v-model="state.height"  title="height"/>
				<HstCheckbox v-model="state.loading" title="loading"/>
				<HstCheckbox v-model="state.pulse"   title="pulse"/>
				<HstSelect   v-model="state.rounded" title="rounded"  :options="roundedList"/>
				<HstSelect   v-model="state.bgColor" title="bgColor"  :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — variant">
			<div style="display: flex; flex-direction: column; gap: 20px; max-width: 320px; padding: 16px;">
				<div>
					<p style="font-size: 12px; color: var(--origam-color__text---secondary, #666); margin-bottom: 6px;">text</p>
					<origam-skeleton
							variant="text"
							width="80%"
							data-cy="skeleton-variant-text"
					/>
				</div>
				<div>
					<p style="font-size: 12px; color: var(--origam-color__text---secondary, #666); margin-bottom: 6px;">rectangular</p>
					<origam-skeleton
							variant="rectangular"
							width="100%"
							height="80px"
							data-cy="skeleton-variant-rectangular"
					/>
				</div>
				<div>
					<p style="font-size: 12px; color: var(--origam-color__text---secondary, #666); margin-bottom: 6px;">circular</p>
					<origam-skeleton
							variant="circular"
							width="48"
							data-cy="skeleton-variant-circular"
					/>
				</div>
				<div>
					<p style="font-size: 12px; color: var(--origam-color__text---secondary, #666); margin-bottom: 6px;">list-item</p>
					<origam-skeleton
							variant="list-item"
							data-cy="skeleton-variant-list-item"
					/>
				</div>
				<div>
					<p style="font-size: 12px; color: var(--origam-color__text---secondary, #666); margin-bottom: 6px;">card</p>
					<origam-skeleton
							variant="card"
							data-cy="skeleton-variant-card"
					/>
				</div>
			</div>
		</Variant>

		<Variant
				title="Prop — bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px; max-width: 320px;">
					<origam-skeleton
							v-bind="state"
							variant="rectangular"
							width="100%"
							height="48px"
							data-cy="skeleton-color"
					/>
					<div style="border-top: 1px dashed var(--origam-color__border---default, #ccc); padding-top: 16px; display: flex; flex-direction: column; gap: 8px;">
						<origam-skeleton bg-color="primary" variant="text" width="200" data-cy="skeleton-color-primary"/>
						<origam-skeleton bg-color="success" variant="text" width="200" data-cy="skeleton-color-success"/>
						<origam-skeleton bg-color="warning" variant="text" width="200" data-cy="skeleton-color-warning"/>
						<origam-skeleton bg-color="danger"  variant="text" width="200" data-cy="skeleton-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size & rounded"
				:init-state="() => useStoryInitState<{ size?: TSize; rounded?: TRounded | boolean }>({ size: 'default' })"
		>
			<template #default="{ state }">
				<origam-skeleton
						:size="state.size"
						:rounded="state.rounded"
						variant="rectangular"
						width="120"
						height="120"
						data-cy="skeleton-size-rounded"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size"    title="size"    :options="sizeList"/>
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — loading"
				:init-state="() => useStoryInitState<{ loading: boolean }>({ loading: true })"
		>
			<template #default="{ state }">
				<origam-skeleton
						:loading="state.loading"
						variant="text"
						width="200"
						data-cy="skeleton-loading"
				>
					<p data-cy="skeleton-slot-content">Content loaded</p>
				</origam-skeleton>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.loading" title="loading"/>
			</template>
		</Variant>

		<Variant
				title="Prop — pulse"
				:init-state="() => useStoryInitState<{ pulse: boolean }>({ pulse: true })"
		>
			<template #default="{ state }">
				<origam-skeleton
						:pulse="state.pulse"
						variant="text"
						width="200"
						data-cy="skeleton-pulse"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.pulse" title="pulse"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<origam-skeleton
					:loading="false"
					variant="text"
					width="200"
					data-cy="skeleton-slot-default"
			>
				<span>Custom slot content</span>
			</origam-skeleton>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamSkeleton } from '@origam/components'
	import type {
		IColorProps,
		IOptions,
		ISkeletonProps
	} from '@origam/interfaces'
	import type { TRounded, TSize, TSkeletonVariant } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		intentList,
		roundedList,
		sizeList
	} from '@stories/const'

	const variantList: Array<IOptions<TSkeletonVariant>> = [
		{ label: 'text', value: 'text' },
		{ label: 'rectangular', value: 'rectangular' },
		{ label: 'circular', value: 'circular' },
		{ label: 'card', value: 'card' },
		{ label: 'list-item', value: 'list-item' }
	]
</script>

<style scoped>
	p {
		margin: 0;
	}
</style>

<docs lang="md" src="@docs/components/Skeleton/OrigamSkeleton.md"/>
