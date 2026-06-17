import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_WAVEFORM_DOC: IComposableDoc = {
    slug: 'use-waveform',
    name: 'useWaveform',
    domain: 'Audio',
    icon: 'mdi-waveform',
    descriptionKey: '',
    descriptionFallback: 'Headless waveform composable. Decodes the audio file referenced by a reactive URL ref, downsamples its channel-0 amplitude data into a configurable number of normalised peaks (default 200), and exposes the result as a reactive array. SSR-safe. Recomputes automatically when the source URL changes. Errors are captured reactively instead of thrown.',
    signature: `function useWaveform(
  srcRef: Ref<string | undefined | null>,
  options?: IUseWaveformOptions
): {
  peaks: Ref<Array<number>>
  isComputing: Ref<boolean>
  error: Ref<Error | null>
  compute: () => Promise<void>
}`,
    params: [
        {
            name: 'srcRef',
            type: 'Ref<string | undefined | null>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Reactive reference to the audio file URL. The composable watches this ref and re-triggers computation whenever the value changes. null / undefined clears the peaks array.',
        },
        {
            name: 'options',
            type: 'IUseWaveformOptions',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Optional: `bins` (number of peaks to produce, default 200) and `crossOrigin` ("use-credentials" | undefined) for the fetch credentials policy.',
        },
    ],
    returns: [
        {
            name: 'peaks',
            type: 'Ref<Array<number>>',
            descriptionKey: '',
            descriptionFallback: 'Array of `bins` values in [0, 1], where 1 is the loudest bucket in the track. Empty while computing or on error.',
        },
        {
            name: 'isComputing',
            type: 'Ref<boolean>',
            descriptionKey: '',
            descriptionFallback: 'True while the fetch + decode round-trip is in progress. Use to render a skeleton or loading indicator.',
        },
        {
            name: 'error',
            type: 'Ref<Error | null>',
            descriptionKey: '',
            descriptionFallback: 'Captures fetch errors (non-2xx response), decode errors (corrupt / unsupported audio), and OfflineAudioContext unavailability. null when no error.',
        },
        {
            name: 'compute',
            type: '() => Promise<void>',
            descriptionKey: '',
            descriptionFallback: 'Manually trigger a recomputation. Normally not needed — the composable re-runs automatically when srcRef changes. Useful for retry-on-error flows.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Waveform thumbnail for a playlist track',
            code: `<script setup lang="ts">
import { useWaveform } from 'origam'
import { ref } from 'vue'

const src = ref('/tracks/song.mp3')
const { peaks, isComputing, error } = useWaveform(src, { bins: 80 })
</script>

<template>
  <div v-if="isComputing" class="skeleton" />
  <div v-else-if="error" class="error">Failed to load waveform</div>
  <svg v-else viewBox="0 0 80 32" width="160" height="32">
    <rect
      v-for="(peak, i) in peaks"
      :key="i"
      :x="i * 2"
      y="0"
      width="1"
      :height="peak * 32"
    />
  </svg>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Using OrigamAudio (recommended)',
            code: `<template>
  <origam-audio src="/track.mp3" :waveform-bins="200" />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-audio-player', 'use-audio', 'use-media-player'],
    consumedInterfaces: ['IUseWaveformOptions'],
    noteFallback: 'useWaveform uses OfflineAudioContext to decode the full audio file off-line (without requiring playback). The fetch uses `cache: "force-cache"` so the waveform decode and the player stream typically reuse the same network cache entry. Feature-detects and falls back to webkitOfflineAudioContext for older Safari.',
}
