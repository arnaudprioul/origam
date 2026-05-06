<template>
	<Story
			group="components"
			title="Window/OrigamWindowItem"
	>

		<!-- ════════════ DEFAULT (selected via parent) ════════════ -->
		<Variant title="Default">
			<div class="story-shell" data-cy="windowitem-default">
				<origam-window v-model="defaultStep" :style="hostStyle">
					<origam-window-item :value="1" data-cy="item-default-1">
						<div :style="slideStyle(0)">Item 1</div>
					</origam-window-item>
					<origam-window-item :value="2" data-cy="item-default-2">
						<div :style="slideStyle(1)">Item 2</div>
					</origam-window-item>
					<origam-window-item :value="3" data-cy="item-default-3">
						<div :style="slideStyle(2)">Item 3</div>
					</origam-window-item>
				</origam-window>
				<div class="story-status" data-cy="status-default">Active value: <strong>{{ defaultStep }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ DISABLED (item is skipped by group) ════════════ -->
		<Variant title="Disabled">
			<div class="story-shell" data-cy="windowitem-disabled">
				<origam-window v-model="disabledStep" :style="hostStyle">
					<origam-window-item :value="1" data-cy="item-disabled-1">
						<div :style="slideStyle(0)">Enabled</div>
					</origam-window-item>
					<origam-window-item :value="2" disabled data-cy="item-disabled-2">
						<div :style="slideStyle(1)">Locked</div>
					</origam-window-item>
					<origam-window-item :value="3" data-cy="item-disabled-3">
						<div :style="slideStyle(2)">Enabled</div>
					</origam-window-item>
				</origam-window>
				<div class="story-status" data-cy="status-disabled">Active value: <strong>{{ disabledStep }}</strong></div>
			</div>
		</Variant>

		<!-- ════════════ TRANSITION (false / custom name) ════════════ -->
		<Variant
				title="Transition"
				:init-state="() => useStoryInitState<{ transition: string | boolean | undefined, step: number }>({ transition: undefined, step: 1 })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="windowitem-transition">
					<origam-window v-model="state.step" :style="hostStyle">
						<origam-window-item v-for="n in 3" :key="n" :value="n" :transition="state.transition" :data-cy="`item-transition-${n}`">
							<div :style="slideStyle(n - 1)">Slide {{ n }}</div>
						</origam-window-item>
					</origam-window>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.transition" title="transition" :options="transitionList"/>
			</template>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ step: number, transition: string | boolean | undefined, reverseTransition: string | boolean | undefined }>({ step: 1, transition: undefined, reverseTransition: undefined })"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="windowitem-playground">
					<origam-window v-model="state.step" :style="hostStyle">
						<origam-window-item
								v-for="n in 3"
								:key="n"
								:value="n"
								:transition="state.transition"
								:reverse-transition="state.reverseTransition"
								:data-cy="`item-playground-${n}`"
						>
							<div :style="slideStyle(n - 1)">Slide {{ n }}</div>
						</origam-window-item>
					</origam-window>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.transition"        title="transition"        :options="transitionList"/>
				<HstSelect v-model="state.reverseTransition" title="reverseTransition" :options="transitionList"/>
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
	import type { IOptions } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const defaultStep = ref(1)
	const disabledStep = ref(1)

	const transitionList: Array<IOptions<string | boolean | undefined>> = [
		{ label: '(default — inherit window axis)', value: undefined },
		{ label: 'false (no transition)',           value: false },
		{ label: 'origam-fade-transition',          value: 'origam-fade-transition' },
		{ label: 'origam-scale-rotate-transition',  value: 'origam-scale-rotate-transition' },
	]

	const hostStyle: CSSProperties = {
		width: '100%',
		height: '180px',
		border: '1px solid var(--origam-color-border-subtle, rgba(0, 0, 0, 0.12))',
		borderRadius: '6px',
		backgroundColor: 'var(--origam-color-surface-default, rgba(0, 0, 0, 0.03))',
	}

	const palette = ['#5B8DEF', '#22C55E', '#F59E0B', '#EF4444']
	function slideStyle (i: number): CSSProperties {
		return {
			width: '100%',
			height: '100%',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontWeight: '600',
			fontSize: '1.25rem',
			color: '#fff',
			background: palette[i % palette.length],
		}
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color-text-secondary, rgba(0, 0, 0, 0.66)); }
</style>

<docs lang="md" src="@docs/components/Window/OrigamWindowItem.md"/>
