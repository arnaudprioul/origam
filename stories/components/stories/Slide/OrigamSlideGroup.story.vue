<template>
	<Story
			group="components"
			title="Slide/OrigamSlideGroup"
	>

		<Variant title="Default">
			<div class="story-shell" data-cy="slidegroup-default">
				<origam-slide-group :style="hostStyle" data-cy="slidegroup-default-host">
					<div
							v-for="n in 25"
							:key="n"
							class="story-tag"
							:data-cy="`tag-default-${n}`"
					>Tag {{ n }}</div>
				</origam-slide-group>
			</div>
		</Variant>

		<Variant
				title="Direction"
				:init-state="() => useStoryInitState<{ direction: TDirection }>({ direction: DIRECTION.HORIZONTAL })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="slidegroup-direction">
					<origam-slide-group
							:direction="state.direction"
							:style="state.direction === DIRECTION.VERTICAL ? hostStyleVertical : hostStyle"
							data-cy="slidegroup-direction-host"
					>
						<div
								v-for="n in 25"
								:key="n"
								class="story-tag"
								:data-cy="`tag-direction-${n}`"
						>Tag {{ n }}</div>
					</origam-slide-group>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
			</template>
		</Variant>

		<Variant
				title="Show arrows"
				:init-state="() => useStoryInitState<{ showArrows: boolean | string }>({ showArrows: 'always' })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="slidegroup-show-arrows">
					<origam-slide-group :show-arrows="state.showArrows" :style="hostStyle" data-cy="slidegroup-arrows-host">
						<div
								v-for="n in 25"
								:key="n"
								class="story-tag"
								:data-cy="`tag-arrows-${n}`"
						>Tag {{ n }}</div>
					</origam-slide-group>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.showArrows" title="showArrows" :options="showArrowsList"/>
			</template>
		</Variant>

		<Variant title="No overflow">
			<div class="story-shell" data-cy="slidegroup-no-overflow">
				<origam-slide-group :style="hostStyle" data-cy="slidegroup-no-overflow-host">
					<div v-for="n in 3" :key="n" class="story-tag" :data-cy="`tag-no-overflow-${n}`">Tag {{ n }}</div>
				</origam-slide-group>
			</div>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ direction: TDirection, showArrows: boolean | string, centerActive: boolean }>({
					direction: DIRECTION.HORIZONTAL,
					showArrows: 'always',
					centerActive: false,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="slidegroup-playground">
					<origam-slide-group
							:direction="state.direction"
							:show-arrows="state.showArrows"
							:center-active="state.centerActive"
							:style="state.direction === DIRECTION.VERTICAL ? hostStyleVertical : hostStyle"
							data-cy="slidegroup-playground-host"
					>
						<div
								v-for="n in 25"
								:key="n"
								class="story-tag"
								:data-cy="`tag-playground-${n}`"
						>Tag {{ n }}</div>
					</origam-slide-group>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.direction"    title="direction"    :options="directionList"/>
				<HstSelect   v-model="state.showArrows"   title="showArrows"   :options="showArrowsList"/>
				<HstCheckbox v-model="state.centerActive" title="centerActive"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { type CSSProperties } from 'vue'

	import { OrigamSlideGroup } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type { IOptions } from '@origam/interfaces'
	import type { TDirection } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const directionList: Array<IOptions<TDirection>> = [
		{ label: 'horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'vertical',   value: DIRECTION.VERTICAL },
	]

	const showArrowsList: Array<IOptions<boolean | string>> = [
		{ label: 'true (overflow only)', value: true },
		{ label: 'always',               value: 'always' },
		{ label: 'desktop',              value: 'desktop' },
		{ label: 'mobile',               value: 'mobile' },
		{ label: 'false (never)',        value: false },
	]

	const hostStyle: CSSProperties = {
		width: '100%',
		maxWidth: '480px',
		border: '1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12))',
		borderRadius: '6px',
		padding: '8px',
	}

	const hostStyleVertical: CSSProperties = {
		...hostStyle,
		height: '240px',
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; }
	.story-tag {
		flex: 0 0 auto;
		padding: 8px 14px;
		margin: 0 6px;
		border-radius: 999px;
		background: var(--origam-color-surface-default, rgba(0, 0, 0, 0.06));
		border: 1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12));
		font: 0.875rem/1 system-ui, sans-serif;
		white-space: nowrap;
	}
</style>

<docs lang="md" src="@docs/components/Slide/OrigamSlideGroup.md"/>
