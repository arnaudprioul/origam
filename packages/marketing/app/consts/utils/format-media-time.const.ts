import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const FORMAT_MEDIA_TIME_UTIL_DOC: IUtilDoc = {
    slug: 'format-media-time',
    name: 'formatMediaTime',
    category: 'Media',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.format_media_time.description',
    descriptionFallback: 'Convert a duration in seconds to a media-player time string. Short durations use "mm:ss"; durations ≥ 1 hour use "h:mm:ss". Non-finite or negative inputs return "--:--" as a loading placeholder.',
    signature: `function formatMediaTime(seconds: number): string`,
    params: [
        {
            name: 'seconds',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.format_media_time.param_seconds',
            descriptionFallback: 'Duration in seconds. Non-finite or negative values return "--:--".',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.format_media_time.returns',
        descriptionFallback: 'Time string formatted as "mm:ss" (< 1 h) or "h:mm:ss" (≥ 1 h), or "--:--" when input is invalid.',
    },
    sourceFile: 'packages/ds/src/utils/Media/format-time.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.format_media_time.example_basic',
            titleFallback: 'Format audio/video durations',
            code: `import { formatMediaTime } from 'origam'

formatMediaTime(65)      // → '01:05'
formatMediaTime(3725)    // → '1:02:05'
formatMediaTime(NaN)     // → '--:--'
formatMediaTime(-1)      // → '--:--'`,
            lang: 'typescript',
        },
    ],
    related: ['format-date', 'format-time', 'format-bytes'],
}
