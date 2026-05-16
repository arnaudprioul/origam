<template>
	<Story
			group="components"
			title="Sound/OrigamSound"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISoundProps>({
					src: SAMPLE_MP3,
					cover: SAMPLE_COVER,
					metadata: { ...DEFAULT_METADATA },
					waveform: false,
					autoplay: false,
					muted: false,
					loop: false,
					controls: 'custom'
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="sound-playground"
				>
					<origam-sound
							v-bind="state"
							class="story-sound"
							data-cy="sound-playground-player"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.src"
						title="src"
				/>
				<HstText
						v-model="state.cover"
						title="cover"
				/>
				<HstCheckbox
						v-model="state.autoplay"
						title="autoplay"
				/>
				<HstCheckbox
						v-model="state.muted"
						title="muted"
				/>
				<HstCheckbox
						v-model="state.loop"
						title="loop"
				/>
				<HstCheckbox
						v-model="state.waveform"
						title="waveform"
				/>
				<HstSelect
						v-model="state.controls"
						title="controls"
						:options="controlsOptions"
				/>
			</template>
		</Variant>

		<Variant title="Prop — controls (custom vs native vs none)">
			<div
					class="story-shell"
					data-cy="sound-controls-modes"
			>
				<p class="hint">
					The component supports three controls modes: a custom in-house
					toolbar, the browser's native bar, or no UI at all (consumer
					drives playback through the #controls slot or programmatically).
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>controls = 'custom'</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								:cover="SAMPLE_COVER"
								:metadata="DEFAULT_METADATA"
								controls="custom"
								class="story-sound"
								data-cy="sound-controls-custom"
						/>
					</div>
					<div class="story-col">
						<strong>controls = 'native'</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								controls="native"
								class="story-sound"
								data-cy="sound-controls-native"
						/>
					</div>
					<div class="story-col">
						<strong>controls = 'none'</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								controls="none"
								class="story-sound"
								data-cy="sound-controls-none"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — waveform (true vs false)">
			<div
					class="story-shell"
					data-cy="sound-waveform-modes"
			>
				<p class="hint">
					When waveform is enabled, the component decodes the audio
					through OfflineAudioContext and replaces the scrubber with
					a canvas-drawn peak visualisation. Click the canvas to seek.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>waveform = false</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								:cover="SAMPLE_COVER"
								:metadata="DEFAULT_METADATA"
								:waveform="false"
								class="story-sound"
								data-cy="sound-waveform-off"
						/>
					</div>
					<div class="story-col">
						<strong>waveform = true</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								:cover="SAMPLE_COVER"
								:metadata="DEFAULT_METADATA"
								:waveform="true"
								class="story-sound"
								data-cy="sound-waveform-on"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Prop — metadata (Media Session API)">
			<div
					class="story-shell"
					data-cy="sound-metadata-block"
			>
				<p class="hint">
					Pass title / artist / album / artwork to surface the track
					on the OS lock-screen via the Media Session API. The block
					also drives the in-toolbar typography.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>With metadata</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								:cover="SAMPLE_COVER"
								:metadata="DEFAULT_METADATA"
								class="story-sound"
								data-cy="sound-metadata-with"
						/>
					</div>
					<div class="story-col">
						<strong>No metadata</strong>
						<origam-sound
								:src="SAMPLE_MP3"
								class="story-sound"
								data-cy="sound-metadata-without"
						/>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — controls (timestamp-only minimal bar)">
			<div
					class="story-shell"
					data-cy="sound-slot-controls"
			>
				<p class="hint">
					The default toolbar can be entirely replaced via the
					#controls scoped slot.
				</p>
				<origam-sound
						:src="SAMPLE_MP3"
						:cover="SAMPLE_COVER"
						:metadata="DEFAULT_METADATA"
						class="story-sound"
						data-cy="sound-slot-controls-player"
				>
					<template #controls="{ playing, currentTime, duration, methods }">
						<div class="story-custom-controls">
							<button
									type="button"
									class="story-custom-controls__btn"
									:aria-label="playing ? 'Pause' : 'Play'"
									data-cy="sound-slot-controls-play"
									@click="playing ? methods.pause() : methods.play()"
							>{{ playing ? 'Pause' : 'Play' }}</button>
							<span class="story-custom-controls__time">
								{{ formatTimestamp(currentTime) }} / {{ formatTimestamp(duration) }}
							</span>
						</div>
					</template>
				</origam-sound>
			</div>
		</Variant>

		<Variant title="Slot — cover (rotating vinyl)">
			<div
					class="story-shell"
					data-cy="sound-slot-cover"
			>
				<p class="hint">
					The #cover slot replaces the default image with anything —
					here a spinning vinyl with the album art at the centre.
				</p>
				<origam-sound
						:src="SAMPLE_MP3"
						:metadata="DEFAULT_METADATA"
						class="story-sound"
						data-cy="sound-slot-cover-player"
				>
					<template #cover>
						<div
								class="story-vinyl"
								data-cy="sound-slot-cover-vinyl"
						>
							<img
									:src="SAMPLE_COVER"
									class="story-vinyl__art"
									alt=""
							/>
							<div class="story-vinyl__center"/>
						</div>
					</template>
				</origam-sound>
			</div>
		</Variant>

		<Variant title="Slot — waveform (custom DIV bars)">
			<div
					class="story-shell"
					data-cy="sound-slot-waveform"
			>
				<p class="hint">
					The #waveform slot lets consumers render the peaks however
					they like — here as a row of div bars instead of a canvas.
				</p>
				<origam-sound
						:src="SAMPLE_MP3"
						:cover="SAMPLE_COVER"
						:metadata="DEFAULT_METADATA"
						:waveform="true"
						class="story-sound"
						data-cy="sound-slot-waveform-player"
				>
					<template #waveform="{ peaks, currentTime, duration }">
						<div
								class="story-bars"
								data-cy="sound-slot-waveform-bars"
						>
							<span
									v-for="(peak, index) in peaks"
									:key="index"
									class="story-bars__bar"
									:class="{ 'story-bars__bar--played': isPlayed(index, peaks.length, currentTime, duration) }"
									:style="{ height: `${Math.max(2, peak * 100)}%` }"
							/>
						</div>
					</template>
				</origam-sound>
			</div>
		</Variant>

		<Variant title="Emit — waveform peaks (logs 200 values)">
			<div
					class="story-shell"
					data-cy="sound-emit-waveform"
			>
				<p class="hint">
					Listen to the @waveform event to capture the computed peaks
					array. Useful for sharing the visual to other widgets.
				</p>
				<origam-sound
						:src="SAMPLE_MP3"
						:cover="SAMPLE_COVER"
						:metadata="DEFAULT_METADATA"
						:waveform="true"
						class="story-sound"
						data-cy="sound-emit-waveform-player"
						@waveform="onWaveform"
				/>
				<dl class="story-counters">
					<div>
						<dt>peaks length</dt>
						<dd data-cy="sound-emit-waveform-length">{{ peaksLength }}</dd>
					</div>
					<div>
						<dt>first 5</dt>
						<dd data-cy="sound-emit-waveform-sample">{{ peaksSample }}</dd>
					</div>
				</dl>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref } from 'vue'

	import { OrigamSound } from '@origam/components'

	import type { ISoundProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const SAMPLE_MP3 = 'https://www.w3schools.com/html/horse.mp3'
	const SAMPLE_COVER = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'

	const DEFAULT_METADATA = {
		title: 'Sample track',
		artist: 'origam DS',
		album: 'OrigamSound demo',
		artwork: [
			{ src: SAMPLE_COVER, sizes: '512x512', type: 'image/jpeg' }
		]
	}

	const controlsOptions = [
		{ value: 'custom', label: 'custom' },
		{ value: 'native', label: 'native' },
		{ value: 'none', label: 'none' }
	]

	const peaksRef = ref<Array<number>>([])
	const peaksLength = computed<number>(() => peaksRef.value.length)
	const peaksSample = computed<string>(() => peaksRef.value.slice(0, 5).map((value) => value.toFixed(3)).join(', '))

	function onWaveform (peaks: Array<number>): void {
		peaksRef.value = peaks
	}

	function formatTimestamp (seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
		const total = Math.floor(seconds)
		const m = Math.floor(total / 60)
		const s = total % 60
		return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
	}

	function isPlayed (index: number, total: number, currentTime: number, duration: number): boolean {
		if (!Number.isFinite(duration) || duration <= 0) return false
		const ratio = currentTime / duration
		return index <= Math.floor(ratio * total)
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 960px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 16px;
	}

	.story-col {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.story-col strong {
		font: 600 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---primary, #171717);
	}

	.story-sound {
		max-width: 480px;
	}

	.story-custom-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 12px;
		background: var(--origam-color__surface---raised, #f3f4f6);
		border-radius: 6px;
		color: inherit;
		font: 0.875rem/1.2 system-ui, sans-serif;
	}

	.story-custom-controls__btn {
		background: var(--origam-color__action---primary-bg, #8b5cf6);
		color: #ffffff;
		border: 0;
		padding: 4px 12px;
		border-radius: 4px;
		cursor: pointer;
		font: inherit;
	}

	.story-custom-controls__time {
		font-family: ui-monospace, monospace;
	}

	.story-vinyl {
		position: relative;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		background: radial-gradient(circle, #1a1a1a 0%, #000 70%);
		overflow: hidden;
		animation: spin 3s linear infinite;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.story-vinyl__art {
		width: 60%;
		height: 60%;
		object-fit: cover;
		border-radius: 50%;
	}

	.story-vinyl__center {
		position: absolute;
		width: 8px;
		height: 8px;
		background: #ffffff;
		border-radius: 50%;
	}

	@keyframes spin {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	.story-bars {
		display: flex;
		align-items: center;
		gap: 1px;
		width: 100%;
		height: 40px;
	}

	.story-bars__bar {
		flex: 1 1 auto;
		min-width: 2px;
		background: var(--origam-color__surface---raised, #e5e5e5);
		border-radius: 1px;
		transition: background 120ms ease;
	}

	.story-bars__bar--played {
		background: var(--origam-color__action---primary-bg, #8b5cf6);
	}

	.story-counters {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		margin: 0;
		padding: 12px;
		background: var(--origam-color__surface---raised, #f3f4f6);
		border-radius: 8px;
	}

	.story-counters > div {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.story-counters dt {
		font: 0.75rem/1.2 ui-monospace, monospace;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-counters dd {
		margin: 0;
		font: 600 0.875rem/1.2 ui-monospace, monospace;
		word-break: break-all;
	}
</style>

<docs lang="md" src="@docs/components/Sound/OrigamSound.md"/>
