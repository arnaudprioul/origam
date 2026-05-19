<template>
	<Story
			group="components"
			title="Audio/OrigamAudio (slots)"
	>
		<Variant title="Slot — metadata">
			<div
					class="story-shell"
					data-cy="audio-slot-metadata"
			>
				<p class="hint">
					The <code>#metadata</code> slot fully replaces the
					default title / artist / album header inside the
					body column.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Original title"
						artist="Original artist"
						:cover="PICSUM_COVER"
						class="story-audio"
						data-cy="audio-slot-metadata-player"
				>
					<template #metadata>
						<div
								class="story-custom-meta"
								data-cy="audio-slot-metadata-target"
						>
							<span class="story-custom-meta__badge">Now playing</span>
							<span class="story-custom-meta__title">Custom metadata via slot</span>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Slot — cover (rotating vinyl)">
			<div
					class="story-shell"
					data-cy="audio-slot-cover"
			>
				<p class="hint">
					Replace the default cover image with arbitrary
					markup. Here a vinyl that spins while the audio plays.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Custom cover via slot"
						artist="Origam"
						album="Slot demos"
						data-cy="audio-slot-cover-player"
				>
					<template #cover>
						<div
								class="custom-cover"
								data-cy="audio-slot-cover-vinyl"
						>
							<div class="custom-cover__vinyl"></div>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Slot — waveform (custom DIV bars)">
			<div
					class="story-shell"
					data-cy="audio-slot-waveform"
			>
				<p class="hint">
					Override the default waveform SliderField with arbitrary
					markup. Bindings: <code>{ peaks, currentTime, duration }</code>.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						:waveform="true"
						title="Custom waveform painter"
						data-cy="audio-slot-waveform-player"
				>
					<template #waveform="{ peaks, currentTime, duration }">
						<div
								class="custom-waveform"
								data-cy="audio-slot-waveform-target"
						>
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

		<Variant title="Slot — controls (custom transport)">
			<div
					class="story-shell"
					data-cy="audio-slot-controls"
			>
				<p class="hint">
					The <code>#controls</code> slot fully replaces the
					default Stemtracks transport <code>&lt;nav&gt;</code>.
					Receives the runtime state + imperative methods.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Slot test"
						artist="Override"
						class="story-audio"
						data-cy="audio-slot-controls-player"
				>
					<template #controls="{ playing, currentTime, duration, methods }">
						<div
								class="story-custom-controls"
								data-cy="audio-slot-controls-target"
						>
							<button
									type="button"
									class="story-custom-controls__btn"
									:aria-label="playing ? 'Pause' : 'Play'"
									data-cy="audio-slot-controls-toggle"
									@click="playing ? methods.pause() : void methods.play()"
							>{{ playing ? 'Pause' : 'Play' }}</button>
							<span class="story-custom-controls__time">
								{{ formatTimestamp(currentTime) }} / {{ formatTimestamp(duration) }}
							</span>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Slot — title (custom heading)">
			<div
					class="story-shell"
					data-cy="audio-slot-title"
			>
				<p class="hint">
					Override only the title rendering, keeping the
					default artist + album line untouched.
				</p>
				<origam-audio
						:src="SOUND_HELIX_TRACK"
						title="Default title"
						artist="Stays default"
						album="Stays default"
						:cover="PICSUM_COVER"
						class="story-audio"
						data-cy="audio-slot-title-player"
				>
					<template #title>
						<h2
								class="story-custom-title"
								data-cy="audio-slot-title-target"
						>Custom &lt;h2&gt; title via slot</h2>
					</template>
				</origam-audio>
			</div>
		</Variant>

		<Variant title="Slot — loading + error overlays">
			<div
					class="story-shell"
					data-cy="audio-slot-overlays"
			>
				<p class="hint">
					The <code>#loading</code> and <code>#error</code> slots
					override the default overlays. Demo here shows a bad URL
					so the error overlay reliably fires.
				</p>
				<origam-audio
						src="https://example.com/this-track-does-not-exist.mp3"
						title="Bad URL"
						artist="Origam"
						class="story-audio"
						data-cy="audio-slot-error-player"
				>
					<template #error="{ error }">
						<div
								class="story-custom-error"
								data-cy="audio-slot-error-target"
						>
							<strong>⚠ Error overlay (slot)</strong>
							<code>{{ ('message' in error && error.message) || 'Playback error' }}</code>
						</div>
					</template>
				</origam-audio>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamAudio } from '@origam/components'

	const SOUND_HELIX_TRACK = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
	const PICSUM_COVER = 'https://picsum.photos/seed/origam-audio/256/256'

	function formatTimestamp (seconds: number): string {
		if (!Number.isFinite(seconds) || seconds < 0) return '--:--'
		const total = Math.floor(seconds)
		const m = Math.floor(total / 60)
		const s = total % 60
		return `${ m.toString().padStart(2, '0') }:${ s.toString().padStart(2, '0') }`
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

	.story-custom-title {
		margin: 0;
		font: 700 1.1rem/1.2 system-ui, sans-serif;
		color: var(--origam-color__action--primary---bg, #2563eb);
	}

	.story-custom-error {
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px 14px;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.4);
		border-radius: 8px;
		color: #b91c1c;
		font: 0.875rem/1.3 system-ui, sans-serif;
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
		width: var(--origam-audio__cover---size, 96px);
		height: var(--origam-audio__cover---size, 96px);
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
		to { transform: rotate(360deg); }
	}
</style>
