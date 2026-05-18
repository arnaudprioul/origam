<template>
	<Story
			group="components"
			title="Audio/OrigamAudio"
	>
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Record<string, unknown>>({
					src: SOUND_HELIX_TRACK,
					title: 'Sample Track',
					artist: 'SoundHelix',
					cover: PICSUM_COVER,
					autoplay: false,
					muted: false,
					loop: false,
					controls: 'custom',
					preload: 'metadata',
					playbackRate: 1,
					downloadable: false,
					downloadFilename: '',
					allowRemotePlayback: false
				})"
		>
			<template #default="{ state }">
				<div
						class="story-shell"
						data-cy="audio-default"
				>
					<p class="hint">
						Playground for the full prop surface. Toggle controls,
						metadata, cast, download, autoplay / muted / loop.
					</p>
					<origam-audio
							:src="state.src as string"
							:title="state.title as string || undefined"
							:artist="state.artist as string || undefined"
							:cover="state.cover as string || undefined"
							:autoplay="Boolean(state.autoplay)"
							:muted="Boolean(state.muted)"
							:loop="Boolean(state.loop)"
							:controls="state.controls as 'custom' | 'native'"
							:preload="state.preload as 'none' | 'metadata' | 'auto'"
							:playback-rate="Number(state.playbackRate)"
							:downloadable="Boolean(state.downloadable)"
							:download-filename="state.downloadFilename as string || undefined"
							:allow-remote-playback="Boolean(state.allowRemotePlayback)"
							class="story-audio"
							data-cy="audio-default-player"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText
						v-model="state.src"
						title="src"
				/>
				<HstText
						v-model="state.title"
						title="title"
				/>
				<HstText
						v-model="state.artist"
						title="artist"
				/>
				<HstText
						v-model="state.cover"
						title="cover (URL)"
				/>
				<HstSelect
						v-model="state.controls"
						title="controls"
						:options="controlsOptions"
				/>
				<HstSelect
						v-model="state.preload"
						title="preload"
						:options="preloadOptions"
				/>
				<HstNumber
						v-model="state.playbackRate"
						title="playbackRate"
				/>
				<HstText
						v-model="state.downloadFilename"
						title="downloadFilename"
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
						v-model="state.downloadable"
						title="downloadable"
				/>
				<HstCheckbox
						v-model="state.allowRemotePlayback"
						title="allowRemotePlayback"
				/>
			</template>
		</Variant>

		<Variant title="Variant — single track">
			<div
					class="story-shell"
					data-cy="audio-single"
			>
				<p class="hint">
					Bare `&lt;origam-audio&gt;` with just an `src`. The metadata
					strip stays hidden since title / artist / cover are absent.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						class="story-audio"
						data-cy="audio-single-player"
				/>
			</div>
		</Variant>

		<Variant title="Variant — with title / artist / cover">
			<div
					class="story-shell"
					data-cy="audio-meta"
			>
				<p class="hint">
					Adds the title + artist + cover strip above the controls.
					The 64×64 cover is painted via `&lt;origam-img&gt;`.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Podcast Episode 42"
						artist="Origam DS Cast"
						:cover="PICSUM_COVER"
						class="story-audio"
						data-cy="audio-meta-player"
				/>
			</div>
		</Variant>

		<Variant title="Variant — multiple sources (codec fallback)">
			<div
					class="story-shell"
					data-cy="audio-multi"
			>
				<p class="hint">
					`src` as an array of `&#123; src, type &#125;` descriptors lets the browser
					pick the first decodable codec.
				</p>
				<origam-audio
						:src="MULTI_SOURCES"
						title="Sample Track"
						artist="SoundHelix"
						class="story-audio"
						data-cy="audio-multi-player"
				/>
			</div>
		</Variant>

		<Variant title="Variant — downloadable">
			<div
					class="story-shell"
					data-cy="audio-downloadable"
			>
				<p class="hint">
					Setting `downloadable` adds a Download row to the cog menu.
					Clicking it fires the native download dialog and emits a
					`download` event.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						:downloadable="true"
						title="Downloadable Track"
						artist="SoundHelix"
						class="story-audio"
						data-cy="audio-downloadable-player"
						@download="logEmit('download', $event)"
				/>
				<pre
						class="story-log"
						data-cy="audio-downloadable-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Variant — controls=&quot;native&quot;">
			<div
					class="story-shell"
					data-cy="audio-native"
			>
				<p class="hint">
					Falls back to the browser's built-in audio bar. No
					`&lt;OrigamMediaController&gt;` is mounted.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						controls="native"
						title="Native controls"
						artist="Browser default"
						class="story-audio"
						data-cy="audio-native-player"
				/>
			</div>
		</Variant>

		<Variant title="Slot — override #metadata and #controls">
			<div
					class="story-shell"
					data-cy="audio-slots"
			>
				<p class="hint">
					The `#metadata` slot fully replaces the default cover +
					text strip; the `#controls` slot replaces the
					`&lt;OrigamMediaController&gt;`. Receives the runtime
					state + imperative methods.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Slot test"
						artist="Override"
						class="story-audio"
						data-cy="audio-slots-player"
				>
					<template #metadata>
						<div
								class="story-custom-meta"
								data-cy="audio-slots-meta"
						>
							<span class="story-custom-meta__badge">Now playing</span>
							<span class="story-custom-meta__title">Slot test — Override</span>
						</div>
					</template>
					<template #controls="{ playing, currentTime, duration, methods }">
						<div
								class="story-custom-controls"
								data-cy="audio-slots-controls"
						>
							<button
									type="button"
									class="story-custom-controls__btn"
									:aria-label="playing ? 'Pause' : 'Play'"
									data-cy="audio-slots-toggle"
									@click="playing ? methods.pause() : methods.play()"
							>{{ playing ? 'Pause' : 'Play' }}</button>
							<span class="story-custom-controls__time">
								{{ formatTimestamp(currentTime) }} / {{ formatTimestamp(duration) }}
							</span>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Emit — play / pause / ended / update:playbackRate (counters)">
			<div
					class="story-shell"
					data-cy="audio-emits"
			>
				<p class="hint">
					Counters increment on each emit. Use the controls to drive
					them; `update:playbackRate` fires when picking a value
					from the cog menu.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Emit demo"
						artist="Origam"
						class="story-audio"
						data-cy="audio-emit-player"
						@play="counters.play++"
						@pause="counters.pause++"
						@ended="counters.ended++"
						@update:playback-rate="counters.playbackRate++"
				/>
				<dl class="story-counters">
					<div>
						<dt>play</dt>
						<dd data-cy="audio-emit-count-play">{{ counters.play }}</dd>
					</div>
					<div>
						<dt>pause</dt>
						<dd data-cy="audio-emit-count-pause">{{ counters.pause }}</dd>
					</div>
					<div>
						<dt>ended</dt>
						<dd data-cy="audio-emit-count-ended">{{ counters.ended }}</dd>
					</div>
					<div>
						<dt>update:playbackRate</dt>
						<dd data-cy="audio-emit-count-playbackrate">{{ counters.playbackRate }}</dd>
					</div>
				</dl>
			</div>
		</Variant>

		<Variant title="Prop — waveform (true vs false)">
			<div class="story-shell" data-cy="audio-waveform-cmp">
				<p class="hint">
					Pass <code>:waveform="true"</code> to render a Web-Audio-decoded
					peak visualisation between the metadata strip and the
					controls. Click anywhere on the canvas to seek to that
					position. Pass <code>'auto'</code> to enable only when the
					browser supports <code>OfflineAudioContext</code>.
				</p>
				<div class="story-col">
					<strong>waveform = false (default)</strong>
					<origam-audio
							:src="WAVEFORM_SRC"
							title="Without waveform"
							artist="origam"
							data-cy="audio-waveform-off"
					/>
				</div>
				<div class="story-col">
					<strong>waveform = true</strong>
					<origam-audio
							:src="WAVEFORM_SRC"
							title="With waveform"
							artist="origam"
							:waveform="true"
							data-cy="audio-waveform-on"
					/>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — #waveform (custom DIV bars)">
			<div class="story-shell" data-cy="audio-waveform-slot">
				<p class="hint">
					Override the default canvas painter with arbitrary markup.
					Bindings: <code>{ peaks, currentTime, duration }</code>.
				</p>
				<origam-audio
						:src="WAVEFORM_SRC"
						:waveform="true"
						title="Custom waveform painter"
						data-cy="audio-waveform-custom"
				>
					<template #waveform="{ peaks, currentTime, duration }">
						<div class="custom-waveform" data-cy="audio-waveform-bars">
							<div
									v-for="(peak, i) in peaks"
									:key="i"
									class="custom-waveform__bar"
									:class="{ 'custom-waveform__bar--played': duration > 0 && (i / peaks.length) <= (currentTime / duration) }"
									:style="{ height: Math.max(2, peak * 100) + '%' }"
							/>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Emit — waveform peaks (logs 200 values)">
			<div class="story-shell" data-cy="audio-waveform-emit">
				<p class="hint">
					Fires once per recomputation (typically on
					<code>src</code> change). Payload is the downsampled
					peaks array (0..1 amplitudes) — handy for analytics or
					forwarding to an external visualiser.
				</p>
				<origam-audio
						:src="WAVEFORM_SRC"
						:waveform="true"
						title="Listen to the waveform emit"
						data-cy="audio-waveform-emit-target"
						@waveform="onWaveform"
				/>
				<div class="story-log" data-cy="audio-waveform-log">
					<strong>Last peaks emitted ({{ waveformLogCount }} recomputations) :</strong>
					<code v-if="waveformLastPeaks.length === 0">— waiting for first decode —</code>
					<code v-else>[{{ waveformLastPeaks.slice(0, 10).map(v => v.toFixed(2)).join(', ') }}, … +{{ waveformLastPeaks.length - 10 }} more]</code>
				</div>
			</div>
		</Variant>

		<Variant title="Slot — #cover (rotating vinyl)">
			<div class="story-shell" data-cy="audio-cover-slot">
				<p class="hint">
					Replace the default cover image with arbitrary markup.
					Combine with <code>state.playing.value</code> in the slot
					template for play-state-aware visuals — here a vinyl
					that spins while playing.
				</p>
				<origam-audio
						:src="WAVEFORM_SRC"
						title="Custom cover via slot"
						artist="origam"
						album="Slot demos"
						data-cy="audio-cover-vinyl"
				>
					<template #cover>
						<div class="custom-cover">
							<div class="custom-cover__vinyl"></div>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Prop — album (full metadata strip)">
			<div class="story-shell" data-cy="audio-album">
				<p class="hint">
					Add a third metadata line below the artist. Renders only
					when set — no placeholder.
				</p>
				<origam-audio
						:src="WAVEFORM_SRC"
						title="Episode 42"
						artist="origam podcast"
						album="Season 3, May 2026"
						cover="https://picsum.photos/seed/audio-album/120"
						data-cy="audio-album-target"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { reactive, ref } from 'vue'

	import { OrigamAudio } from '@origam/components'

	import type { IAudioSource } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const SOUND_HELIX_TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	const PICSUM_COVER = 'https://picsum.photos/seed/origam-audio/256/256'
	const WAVEFORM_SRC = SOUND_HELIX_TRACK

	const waveformLastPeaks = ref<Array<number>>([])
	const waveformLogCount = ref(0)

	function onWaveform (peaks: Array<number>): void {
		waveformLastPeaks.value = peaks
		waveformLogCount.value += 1
	}

	const MULTI_SOURCES: Array<IAudioSource> = [
		{ src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', type: 'audio/mpeg' },
		{ src: 'https://www.soundhelix.com/examples/ogg/SoundHelix-Song-1.ogg', type: 'audio/ogg' }
	]

	const controlsOptions = [
		{ value: 'custom', label: 'custom' },
		{ value: 'native', label: 'native' }
	]

	const preloadOptions = [
		{ value: 'none', label: 'none' },
		{ value: 'metadata', label: 'metadata' },
		{ value: 'auto', label: 'auto' }
	]

	const counters = reactive({
		play: 0,
		pause: 0,
		ended: 0,
		playbackRate: 0
	})

	const logLines = ref<Array<string>>([])

	function logEmit (name: string, payload: unknown): void {
		const safe = typeof payload === 'string' || typeof payload === 'number'
			? String(payload)
			: JSON.stringify(payload)
		logLines.value = [`${name} → ${safe}`, ...logLines.value].slice(0, 8)
	}

	function formatTimestamp (seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
		const total = Math.floor(seconds)
		const m = Math.floor(total / 60)
		const s = total % 60
		return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 640px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-audio {
		width: 100%;
		max-width: 560px;
	}

	.story-custom-meta {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 8px 12px;
		background: rgba(0, 0, 0, 0.04);
		border-radius: 8px;
	}

	.story-custom-meta__badge {
		font: 600 0.7rem/1.1 ui-monospace, monospace;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: var(--origam-color__action--primary---bg, #2563eb);
	}

	.story-custom-meta__title {
		font: 600 0.95rem/1.3 system-ui, sans-serif;
	}

	.story-custom-controls {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 8px 12px;
		background: rgba(0, 0, 0, 0.06);
		border-radius: 8px;
		font: 0.875rem/1.2 system-ui, sans-serif;
	}

	.story-custom-controls__btn {
		background: var(--origam-color__action--primary---bg, #2563eb);
		color: #ffffff;
		border: 0;
		padding: 6px 14px;
		border-radius: 6px;
		cursor: pointer;
		font: inherit;
	}

	.story-custom-controls__time {
		font-family: ui-monospace, monospace;
	}

	.story-log {
		margin: 0;
		padding: 8px 12px;
		background-color: rgba(0, 0, 0, 0.04);
		border-radius: 6px;
		font-size: 0.75rem;
		font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
		white-space: pre-wrap;
		min-height: 60px;
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
		font: 600 1rem/1.2 system-ui, sans-serif;
	}

	.custom-waveform {
		display: flex;
		align-items: center;
		gap: 2px;
		width: 100%;
		height: 56px;
	}

	.custom-waveform__bar {
		flex: 1 1 auto;
		min-width: 2px;
		background: color-mix(in srgb, currentColor 30%, transparent);
		border-radius: 1px;
	}

	.custom-waveform__bar--played {
		background: var(--origam-color__accent---base, currentColor);
	}

	.custom-cover {
		width: var(--origam-audio__cover---size, 64px);
		height: var(--origam-audio__cover---size, 64px);
		display: flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle at center, #1f2937 0%, #0f172a 100%);
		border-radius: 50%;
		overflow: hidden;
	}

	.custom-cover__vinyl {
		width: 80%;
		height: 80%;
		background:
			radial-gradient(circle at center, #f3f4f6 8%, transparent 9%),
			radial-gradient(circle at center, #1f2937 12%, transparent 13%),
			repeating-radial-gradient(circle at center, #111827 0 1px, #1f2937 1px 3px);
		border-radius: 50%;
		animation: vinyl-spin 4s linear infinite;
	}

	@keyframes vinyl-spin {
		from { transform: rotate(0deg); }
		to   { transform: rotate(360deg); }
	}
</style>
