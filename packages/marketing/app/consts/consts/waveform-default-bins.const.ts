import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const WAVEFORM_DEFAULT_BINS_CONST_DOC: IConstDoc = {
    slug: 'waveform-default-bins',
    name: 'WAVEFORM_DEFAULT_BINS',
    category: 'Audio',
    descriptionKey: 'consts.catalog.waveform_default_bins.description',
    descriptionFallback: 'Default number of waveform peaks (bins) produced by useWaveform: 200 is the sweet spot between visual density (one pixel per peak on a 200 px-wide waveform) and decode cost (~5 ms on a 30 s mp3).',
    definition: `export const WAVEFORM_DEFAULT_BINS = 200`,
    value: '200',
    usedBy: [
        { name: 'useWaveform' },
        { name: 'OrigamAudio', slug: 'audio' },
    ],
    sourceFile: 'packages/ds/src/consts/Audio/audio.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.waveform_default_bins.example',
            titleFallback: 'Increase resolution for a wide waveform',
            code: `<OrigamAudio src="/track.mp3" waveform :waveform-bins="400" />
<!-- Default is WAVEFORM_DEFAULT_BINS = 200 -->`,
            lang: 'html',
        },
    ],
}
