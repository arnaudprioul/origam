<template>
	<Story
			group="components"
			title="Window/OrigamWindow"
	>

		<Variant title="Default">
			<div class="story-shell" data-cy="window-default">
				<origam-window v-model="defaultStep" :style="hostStyle">
					<origam-window-item v-for="n in 3" :key="n" :value="n" :data-cy="`item-default-${n}`">
						<div :style="slideStyle(n)">Slide {{ n }}</div>
					</origam-window-item>
				</origam-window>
				<div class="story-status" data-cy="status-default">Active value: <strong>{{ defaultStep }}</strong></div>
			</div>
		</Variant>

		<Variant
				title="Direction"
				:init-state="() => useStoryInitState<{ direction: TDirection, step: number }>({ direction: DIRECTION.HORIZONTAL, step: 1 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="window-direction">
					<origam-window v-model="state.step" :direction="state.direction" :style="hostStyle">
						<origam-window-item v-for="n in 3" :key="n" :value="n" :data-cy="`item-direction-${n}`">
							<div :style="slideStyle(n)">Slide {{ n }} — {{ state.direction }}</div>
						</origam-window-item>
					</origam-window>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
			</template>
		</Variant>

		<Variant title="Continuous">
			<div class="story-shell" data-cy="window-continuous">
				<origam-window v-model="continuousStep" continuous :style="hostStyle">
					<origam-window-item v-for="n in 3" :key="n" :value="n" :data-cy="`item-continuous-${n}`">
						<div :style="slideStyle(n)">Slide {{ n }}</div>
					</origam-window-item>
				</origam-window>
				<div class="story-status" data-cy="status-continuous">Active value: <strong>{{ continuousStep }}</strong></div>
			</div>
		</Variant>

		<Variant
				title="Show arrows"
				:init-state="() => useStoryInitState<{ showArrows: string | boolean | undefined, step: number }>({ showArrows: true, step: 1 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="window-show-arrows">
					<origam-window v-model="state.step" :show-arrows="state.showArrows" :style="hostStyle">
						<origam-window-item v-for="n in 3" :key="n" :value="n" :data-cy="`item-arrows-${n}`">
							<div :style="slideStyle(n)">Slide {{ n }}</div>
						</origam-window-item>
					</origam-window>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.showArrows" title="showArrows" :options="showArrowsList"/>
			</template>
		</Variant>

		<Variant
				title="Touch"
				:init-state="() => useStoryInitState<{ touch: boolean, step: number }>({ touch: true, step: 1 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="window-touch">
					<origam-window v-model="state.step" :touch="state.touch" :style="hostStyle">
						<origam-window-item v-for="n in 3" :key="n" :value="n" :data-cy="`item-touch-${n}`">
							<div :style="slideStyle(n)">Slide {{ n }}</div>
						</origam-window-item>
					</origam-window>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.touch" title="touch"/>
			</template>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IWindowProps & { step: number }>({
					step: 1,
					direction: DIRECTION.HORIZONTAL,
					continuous: false,
					reverse: false,
					showArrows: true,
					touch: true,
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="window-playground">
					<origam-window
							v-model="state.step"
							:direction="state.direction"
							:continuous="state.continuous"
							:reverse="state.reverse"
							:show-arrows="state.showArrows"
							:touch="state.touch"
							:style="hostStyle"
					>
						<origam-window-item v-for="n in 4" :key="n" :value="n" :data-cy="`item-playground-${n}`">
							<div :style="slideStyle(n)">Slide {{ n }}</div>
						</origam-window-item>
					</origam-window>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.direction"  title="direction"  :options="directionList"/>
				<HstCheckbox v-model="state.continuous" title="continuous"/>
				<HstCheckbox v-model="state.reverse"    title="reverse"/>
				<HstSelect   v-model="state.showArrows" title="showArrows" :options="showArrowsList"/>
				<HstCheckbox v-model="state.touch"      title="touch"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref, type CSSProperties } from 'vue'

	import { OrigamWindow, OrigamWindowItem } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type { IOptions, IWindowProps } from '@origam/interfaces'
	import type { TDirection } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const defaultStep = ref(1)
	const continuousStep = ref(1)

	const directionList: Array<IOptions<TDirection>> = [
		{ label: 'horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'vertical',   value: DIRECTION.VERTICAL },
	]

	const showArrowsList: Array<IOptions<string | boolean | undefined>> = [
		{ label: 'true (overflow)', value: true },
		{ label: 'false',           value: false },
		{ label: 'hover',           value: 'hover' },
	]

	const hostStyle: CSSProperties = {
		width: '100%',
		height: '180px',
		border: '1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12))',
		borderRadius: '6px',
		backgroundColor: 'var(--origam-color-surface-default, rgba(0, 0, 0, 0.03))',
	}

	const palette = ['#5B8DEF', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6']
	function slideStyle (n: number): CSSProperties {
		return {
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontWeight: '600',
			fontSize: '1.25rem',
			color: '#fff',
			background: palette[(n - 1) % palette.length],
		}
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Window/OrigamWindow.md"/>
