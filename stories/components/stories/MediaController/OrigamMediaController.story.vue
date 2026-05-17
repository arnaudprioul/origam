<template>
	<Story
			group="components"
			title="MediaController/OrigamMediaController"
	>
		<Variant title="Playground">
			<div
					class="story-shell"
					data-cy="media-controller-playground"
			>
				<p class="hint">
					Standalone <code>&lt;OrigamMediaController&gt;</code> driven by a hidden
					<code>&lt;video&gt;</code> element. The Controller is media-agnostic —
					it consumes the reactive <code>state</code> / <code>methods</code>
					surface returned by <code>useVideoPlayer()</code> (and tomorrow
					<code>useAudioPlayer()</code>).
				</p>
				<div class="story-media">
					<video
							ref="playgroundVideoRef"
							:src="BIG_BUCK_BUNNY"
							class="story-media-el"
							preload="metadata"
							playsinline
							data-cy="media-controller-playground-video"
					/>
				</div>
				<origam-media-controller
						:state="playgroundApi.state"
						:methods="playgroundApi.methods"
						data-cy="media-controller-playground-host"
				/>
			</div>
		</Variant>

		<Variant title="Variant — inset (overlay over the media surface)">
			<div
					class="story-shell"
					data-cy="media-controller-inset"
			>
				<p class="hint">
					In <code>inset</code> mode the Controller sits at the bottom of the
					media surface with a dark gradient. The parent owns the autohide
					logic and feeds <code>:visible</code> accordingly.
				</p>
				<div class="story-grid">
					<div class="story-col">
						<strong>inset = false (always-on)</strong>
						<div class="story-media">
							<video
									ref="insetOffVideoRef"
									:src="BIG_BUCK_BUNNY"
									class="story-media-el"
									preload="metadata"
									playsinline
									data-cy="media-controller-inset-off-video"
							/>
						</div>
						<origam-media-controller
								:state="insetOffApi.state"
								:methods="insetOffApi.methods"
								:inset="false"
								data-cy="media-controller-inset-off-host"
						/>
					</div>
					<div class="story-col">
						<strong>inset = true (overlay)</strong>
						<div class="story-media story-media--overlay">
							<video
									ref="insetOnVideoRef"
									:src="BIG_BUCK_BUNNY"
									class="story-media-el"
									preload="metadata"
									playsinline
									data-cy="media-controller-inset-on-video"
							/>
							<origam-media-controller
									:state="insetOnApi.state"
									:methods="insetOnApi.methods"
									:inset="true"
									:visible="true"
									data-cy="media-controller-inset-on-host"
							/>
						</div>
					</div>
				</div>
			</div>
		</Variant>

		<Variant title="Variant — #extraControlsRight slot">
			<div
					class="story-shell"
					data-cy="media-controller-extras-right"
			>
				<p class="hint">
					The <code>#extraControlsRight</code> slot lets consumers inject
					media-specific buttons (captions / PiP / fullscreen on
					<code>&lt;OrigamVideo&gt;</code>, share / pin / mark on a custom
					Audio player, …) without forking the shell.
				</p>
				<div class="story-media">
					<video
							ref="extrasVideoRef"
							:src="BIG_BUCK_BUNNY"
							class="story-media-el"
							preload="metadata"
							playsinline
							data-cy="media-controller-extras-video"
					/>
				</div>
				<origam-media-controller
						:state="extrasApi.state"
						:methods="extrasApi.methods"
						data-cy="media-controller-extras-host"
				>
					<template #extraControlsRight>
						<button
								type="button"
								class="story-extra-btn"
								aria-label="Share"
								data-cy="media-controller-extras-share"
						>★</button>
						<button
								type="button"
								class="story-extra-btn"
								aria-label="Pin"
								data-cy="media-controller-extras-pin"
						>📌</button>
						<button
								type="button"
								class="story-extra-btn"
								aria-label="Mark"
								data-cy="media-controller-extras-mark"
						>✓</button>
					</template>
				</origam-media-controller>
			</div>
		</Variant>

		<Variant title="Variant — #configExtra slot (custom config rows)">
			<div
					class="story-shell"
					data-cy="media-controller-config-extra"
			>
				<p class="hint">
					The <code>#configExtra</code> slot adds custom rows to the config
					menu — typical use cases include audio output device picker or
					subtitle-track selector. The slot receives
					<code>{ closeMenu }</code> so the consumer can dismiss the menu after
					their action fires.
				</p>
				<div class="story-media">
					<video
							ref="configExtraVideoRef"
							:src="BIG_BUCK_BUNNY"
							class="story-media-el"
							preload="metadata"
							playsinline
							data-cy="media-controller-config-extra-video"
					/>
				</div>
				<origam-media-controller
						:state="configExtraApi.state"
						:methods="configExtraApi.methods"
						data-cy="media-controller-config-extra-host"
				>
					<template #configExtra="{ closeMenu }">
						<button
								type="button"
								class="story-config-row"
								data-cy="media-controller-config-extra-audio-output"
								@click="onPickAudioOutput(closeMenu)"
						>
							<span>Audio output</span>
							<span class="story-config-row__value">{{ pickedAudioOutput }}</span>
						</button>
					</template>
				</origam-media-controller>
			</div>
		</Variant>

		<Variant title="Variant — visible=false (hidden inset behaviour)">
			<div
					class="story-shell"
					data-cy="media-controller-visible-false"
			>
				<p class="hint">
					When <code>inset</code> is true AND <code>visible</code> is false, the
					Controller paints with <code>opacity: 0</code> and
					<code>pointer-events: none</code>. The toolbar still mounts so
					internal state (menu, hover, volume cluster) survives the autohide
					cycle.
				</p>
				<div class="story-media story-media--overlay">
					<video
							ref="hiddenVideoRef"
							:src="BIG_BUCK_BUNNY"
							class="story-media-el"
							preload="metadata"
							playsinline
							data-cy="media-controller-visible-false-video"
					/>
					<origam-media-controller
							:state="hiddenApi.state"
							:methods="hiddenApi.methods"
							:inset="true"
							:visible="false"
							data-cy="media-controller-visible-false-host"
					/>
				</div>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamMediaController } from '@origam/components'

	import { useVideoPlayer } from '@origam/composables'

	const BIG_BUCK_BUNNY = 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4'

	const playgroundVideoRef = ref<HTMLVideoElement | null>(null)
	const playgroundApi = useVideoPlayer({ videoRef: playgroundVideoRef })

	const insetOffVideoRef = ref<HTMLVideoElement | null>(null)
	const insetOffApi = useVideoPlayer({ videoRef: insetOffVideoRef })

	const insetOnVideoRef = ref<HTMLVideoElement | null>(null)
	const insetOnApi = useVideoPlayer({ videoRef: insetOnVideoRef })

	const extrasVideoRef = ref<HTMLVideoElement | null>(null)
	const extrasApi = useVideoPlayer({ videoRef: extrasVideoRef })

	const configExtraVideoRef = ref<HTMLVideoElement | null>(null)
	const configExtraApi = useVideoPlayer({ videoRef: configExtraVideoRef })

	const hiddenVideoRef = ref<HTMLVideoElement | null>(null)
	const hiddenApi = useVideoPlayer({ videoRef: hiddenVideoRef })

	const pickedAudioOutput = ref<string>('Default')

	function onPickAudioOutput (closeMenu: () => void): void {
		pickedAudioOutput.value = pickedAudioOutput.value === 'Default' ? 'AirPods Pro' : 'Default'
		closeMenu()
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

	.story-media {
		position: relative;
		background: #000000;
		border-radius: 8px;
		overflow: hidden;
		aspect-ratio: 16 / 9;
	}

	.story-media--overlay {
		display: block;
	}

	.story-media-el {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: contain;
	}

	.story-extra-btn {
		all: unset;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		color: #ffffff;
		cursor: pointer;
		border-radius: 50%;
		opacity: 0.85;
	}

	.story-extra-btn:hover,
	.story-extra-btn:focus-visible {
		opacity: 1;
		background-color: rgba(255, 255, 255, 0.12);
	}

	.story-config-row {
		all: unset;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		color: #ffffff;
		cursor: pointer;
		font-size: 0.75rem;
	}

	.story-config-row:hover {
		background-color: rgba(255, 255, 255, 0.12);
	}

	.story-config-row__value {
		margin-left: auto;
		color: rgba(255, 255, 255, 0.7);
	}
</style>
