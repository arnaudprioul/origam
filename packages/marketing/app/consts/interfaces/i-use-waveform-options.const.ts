import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_USE_WAVEFORM_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-use-waveform-options',
    name: 'IUseWaveformOptions',
    category: 'Audio',
    descriptionKey: '',
    descriptionFallback: `Options accepted by \`useWaveform()\` to configure how the audio file
is fetched and decoded into waveform peak data.`,
    definition: `export interface IUseWaveformOptions {
    bins?: number;
    crossOrigin?: string;
}`,
    extends: [],
    props: [
        { name: 'bins', type: 'number', optional: true, descriptionFallback: `Number of amplitude buckets (bars) to downsample the decoded
audio into. A higher value produces a finer-grained waveform but
costs more processing time.` },
        { name: 'crossOrigin', type: 'string', optional: true, descriptionFallback: `CORS credentials mode forwarded to \`fetch()\`.

- \`'use-credentials'\` — include cookies / auth headers.
- any other value (or \`undefined\`) — \`'same-origin'\` semantics.` },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Audio/audio-player.interface.ts',
    examples: [],
}
