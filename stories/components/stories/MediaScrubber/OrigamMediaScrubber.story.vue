<template>
	<Story
			group="components"
			title="MediaScrubber/OrigamMediaScrubber"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IMediaScrubberProps>({
					modelValue: 30,
					min: 0,
					max: 100,
					step: 0,
					buffered: undefined,
					orientation: 'horizontal',
					disabled: false,
					showThumbOnHoverOnly: false,
					showHoverTooltip: false,
					ariaLabel: 'Demo scrubber'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="media-scrubber-playground"
				>
					<p class="hint">
						Live value: <strong>{{ state.modelValue }}</strong>
					</p>
					<div :class="state.orientation === 'vertical' ? 'scrubber-vertical-host' : 'scrubber-horizontal-host'">
						<origam-media-scrubber
								v-bind="state"
								v-model="state.modelValue"
								data-cy="media-scrubber-playground-host"
						/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber
						v-model="state.modelValue"
						title="modelValue"
				/>
				<HstNumber
						v-model="state.min"
						title="min"
				/>
				<HstNumber
						v-model="state.max"
						title="max"
				/>
				<HstNumber
						v-model="state.step"
						title="step"
				/>
				<HstNumber
						v-model="state.buffered"
						title="buffered"
				/>
				<HstSelect
						v-model="state.orientation"
						title="orientation"
						:options="orientationOptions"
				/>
				<HstCheckbox
						v-model="state.showThumbOnHoverOnly"
						title="showThumbOnHoverOnly"
				/>
				<HstCheckbox
						v-model="state.showHoverTooltip"
						title="showHoverTooltip"
				/>
				<HstCheckbox
						v-model="state.disabled"
						title="disabled"
				/>
				<HstText
						v-model="state.color"
						title="color (intent or CSS)"
				/>
				<HstSelect
						v-model="state.rounded"
						title="rounded"
						:options="roundedOptions"
				/>
			</template>
		</Variant>

		<Variant title="Variant — orientation (horizontal / vertical)">
			<div
					class="story-shell"
					data-cy="media-scrubber-orientation"
			>
				<p class="hint">
					Same primitive, two orientations. Vertical maps `pointerY`
					inversely (top of track = max, bottom = min) and uses
					ArrowUp / ArrowDown for keyboard increments.
				</p>
				<div class="story-row">
					<div class="story-col">
						<strong>horizontal</strong>
						<div class="scrubber-horizontal-host">
							<origam-media-scrubber
									v-model="horizontalValue"
									:max="100"
									:step="5"
									aria-label="Horizontal demo"
									data-cy="media-scrubber-horizontal"
							/>
						</div>
						<span class="value-label">{{ horizontalValue }}</span>
					</div>
					<div class="story-col">
						<strong>vertical</strong>
						<div class="scrubber-vertical-host">
							<origam-media-scrubber
									v-model="verticalValue"
									orientation="vertical"
									:max="1"
									:step="0.05"
									aria-label="Vertical demo"
									data-cy="media-scrubber-vertical"
							/>
						</div>
						<span class="value-label">{{ verticalLabel }}</span>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Variant — buffer (media use case)">
			<div
					class="story-shell"
					data-cy="media-scrubber-buffer"
			>
				<p class="hint">
					Horizontal scrubber with a `buffered` channel — the lighter
					bar represents the portion the browser has downloaded
					ahead of the playhead (YouTube pattern).
				</p>
				<div class="scrubber-horizontal-host">
					<origam-media-scrubber
							v-model="bufferValue"
							:max="100"
							:buffered="70"
							aria-label="Timeline with buffer"
							data-cy="media-scrubber-with-buffer"
					/>
				</div>
				<span class="value-label">value = {{ bufferValue }} • buffered = 70</span>
			</div>
		</Variant>

		<Variant title="Variant — showHoverTooltip + formatHoverTooltip">
			<div
					class="story-shell"
					data-cy="media-scrubber-tooltip"
			>
				<p class="hint">
					Hover the track to see the formatter at work. The example
					maps a [0, 1] range to a `0% .. 100%` label.
				</p>
				<div class="scrubber-horizontal-host">
					<origam-media-scrubber
							v-model="tooltipValue"
							:max="1"
							:step="0.01"
							show-hover-tooltip
							:format-hover-tooltip="(v: number) => Math.round(v * 100) + '%'"
							aria-label="Tooltip demo"
							data-cy="media-scrubber-with-tooltip"
					/>
				</div>
				<span class="value-label">value = {{ Math.round(tooltipValue * 100) }}%</span>
			</div>
		</Variant>

		<Variant title="Variant — keyboard / a11y">
			<div
					class="story-shell"
					data-cy="media-scrubber-keyboard"
			>
				<p class="hint">
					Tab into the scrubber, then use:
					<strong>Arrow keys</strong> (Left/Right or Up/Down on
					vertical) to nudge,
					<strong>PageUp / PageDown</strong> to jump ±10 % of range,
					<strong>Home / End</strong> for min / max. ARIA contract:
					<code>role="slider"</code> + <code>aria-valuemin / max / now / text</code>.
				</p>
				<div class="scrubber-horizontal-host">
					<origam-media-scrubber
							v-model="keyboardValue"
							:max="200"
							:step="10"
							:aria-value-text="keyboardValue + ' units'"
							aria-label="Keyboard demo"
							data-cy="media-scrubber-keyboard-host"
					/>
				</div>
				<span class="value-label">value = {{ keyboardValue }}</span>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref } from 'vue'

	import { OrigamMediaScrubber } from '@origam/components'

	import type { IMediaScrubberProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	interface IOption<T> {
		label: string
		value: T
	}

	const orientationOptions: Array<IOption<'horizontal' | 'vertical'>> = [
		{ label: 'horizontal', value: 'horizontal' },
		{ label: 'vertical', value: 'vertical' }
	]

	const roundedOptions: Array<IOption<string>> = [
		{ label: '(none)', value: '' },
		{ label: 'none', value: 'none' },
		{ label: 'xs', value: 'xs' },
		{ label: 'sm', value: 'sm' },
		{ label: 'md', value: 'md' },
		{ label: 'lg', value: 'lg' },
		{ label: 'xl', value: 'xl' },
		{ label: 'full', value: 'full' }
	]

	const horizontalValue = ref<number>(40)
	const verticalValue = ref<number>(0.6)
	const bufferValue = ref<number>(30)
	const tooltipValue = ref<number>(0.45)
	const keyboardValue = ref<number>(100)

	const verticalLabel = computed(() => `${Math.round(verticalValue.value * 100)} %`)
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		padding: 16px;
		max-width: 720px;
		background: var(--origam-color__surface---default, #0f172a);
		color: var(--origam-color__text---primary, #f8fafc);
		border-radius: 8px;
	}

	.hint {
		flex-basis: 100%;
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #94a3b8);
	}

	.story-row {
		display: flex;
		gap: 32px;
		flex-basis: 100%;
		align-items: stretch;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
		border-radius: 8px;
		background: rgba(255, 255, 255, 0.06);
		min-width: 220px;
		flex: 1 1 auto;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #f8fafc);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.scrubber-horizontal-host {
		flex-basis: 100%;
		min-width: 280px;
	}

	.scrubber-vertical-host {
		height: 120px;
		width: 24px;
		display: flex;
		align-items: stretch;
		justify-content: center;
	}

	.value-label {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---secondary, #94a3b8);
	}
</style>
