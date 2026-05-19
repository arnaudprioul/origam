<template>
	<Story
			group="components"
			title="Audio/OrigamAudio (emits)"
	>
		<Variant title="Emit — play / pause / ended / update:playbackRate">
			<div
					class="story-shell"
					data-cy="audio-emit-transport"
			>
				<p class="hint">
					Counters increment on each emit. Use the transport
					row to drive them; <code>update:playbackRate</code>
					fires when picking a value from the cog menu.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Emit demo"
						artist="Origam"
						class="story-audio"
						data-cy="audio-emit-transport-player"
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

		<Variant title="Emit — previous / next">
			<div
					class="story-shell"
					data-cy="audio-emit-nav"
			>
				<p class="hint">
					Click the <code>⏮</code> / <code>⏭</code> buttons.
					The component ALSO skips ±10 s on the current track
					internally so an isolated player keeps working without
					a playlist controller bound to it.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Playlist demo"
						artist="Origam"
						class="story-audio"
						data-cy="audio-emit-nav-player"
						@previous="counters.previous++"
						@next="counters.next++"
				/>
				<dl class="story-counters">
					<div>
						<dt>previous</dt>
						<dd data-cy="audio-emit-count-previous">{{ counters.previous }}</dd>
					</div>
					<div>
						<dt>next</dt>
						<dd data-cy="audio-emit-count-next">{{ counters.next }}</dd>
					</div>
				</dl>
			</div>
		</Variant>

		<Variant title="Emit — timeupdate / volumechange / loadedmetadata">
			<div
					class="story-shell"
					data-cy="audio-emit-native"
			>
				<p class="hint">
					Native DOM events forwarded verbatim. Last 8 entries
					logged in chronological order.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Native emit relay"
						artist="Origam"
						class="story-audio"
						data-cy="audio-emit-native-player"
						@timeupdate="logEmit('timeupdate', state.currentTime)"
						@volumechange="logEmit('volumechange', state.volume)"
						@loadedmetadata="logEmit('loadedmetadata', state.duration)"
				/>
				<pre
						class="story-log"
						data-cy="audio-emit-native-log"
				>{{ logLines.join('\n') }}</pre>
			</div>
		</Variant>

		<Variant title="Emit — waveform peaks (logs 200 values)">
			<div
					class="story-shell"
					data-cy="audio-emit-waveform"
			>
				<p class="hint">
					Fires once per recomputation (typically on
					<code>src</code> change). Payload is the downsampled
					peaks array (0..1 amplitudes) — handy for analytics
					or forwarding to an external visualiser.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						:waveform="true"
						title="Listen to the waveform emit"
						data-cy="audio-emit-waveform-player"
						@waveform="onWaveform"
				/>
				<div
						class="story-log"
						data-cy="audio-emit-waveform-log"
				>
					<strong>Last peaks emitted ({{ waveformLogCount }} recomputations) :</strong>
					<code v-if="waveformLastPeaks.length === 0">— waiting for first decode —</code>
					<code v-else>[{{ waveformLastPeaks.slice(0, 10).map(v => v.toFixed(2)).join(', ') }}, … +{{ waveformLastPeaks.length - 10 }} more]</code>
				</div>
			</div>
		</Variant>

		<Variant title="Emit — download (URL payload)">
			<div
					class="story-shell"
					data-cy="audio-emit-download"
			>
				<p class="hint">
					Set <code>downloadable</code> and open the cog menu.
					Click Download — the URL is emitted alongside the
					native download dialog.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						:downloadable="true"
						title="Download emit demo"
						artist="Origam"
						class="story-audio"
						data-cy="audio-emit-download-player"
						@download="logEmit('download', $event)"
				/>
				<pre
						class="story-log"
						data-cy="audio-emit-download-log"
				>{{ logLines.join('\n') }}</pre>
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

	const SOUND_HELIX_TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

	const state = reactive({
		currentTime: 0,
		volume: 1,
		duration: 0
	})

	const counters = reactive({
		play: 0,
		pause: 0,
		ended: 0,
		playbackRate: 0,
		previous: 0,
		next: 0
	})

	const logLines = ref<Array<string>>([])
	const waveformLastPeaks = ref<Array<number>>([])
	const waveformLogCount = ref(0)

	function logEmit (name: string, payload: unknown): void {
		const safe = typeof payload === 'string' || typeof payload === 'number'
			? String(payload)
			: JSON.stringify(payload)
		logLines.value = [`${ name } → ${ safe }`, ...logLines.value].slice(0, 8)
	}

	function onWaveform (peaks: Array<number>): void {
		waveformLastPeaks.value = peaks
		waveformLogCount.value += 1
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 16px;
		max-width: 720px;
	}

	.hint {
		margin: 0;
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, #555);
	}

	.story-audio {
		width: 100%;
		max-width: 640px;
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
</style>
