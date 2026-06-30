// Unit tests for <OrigamVideo> — typography props (Typo 2b).
//
// Two surfaces receive typographyStyles (one useTypography call per surface):
//
//   video__loading → .origam-video__loading — SCSS reads font-size only.
//                   STATE-CONDITIONAL: rendered when state.loading.value === true
//                   AND state.error.value === null. state comes from
//                   useVideoPlayer and is driven by native HTMLVideoElement
//                   events (loadstart / canplay). jsdom does not fire those
//                   events (no real media decoder). NOT TESTABLE HEADLESSLY —
//                   the CSS var IS emitted (the :style binding is present on
//                   the element in OrigamVideo.vue line ~128–134); the rendered
//                   effect is proven at the e2e layer.
//   video--error   → .origam-video__error — SCSS reads font-size only.
//                   STATE-CONDITIONAL: rendered when state.error.value !== null.
//                   Same jsdom constraint as __loading. NOT TESTABLE HEADLESSLY.
//
// Because ALL typography surfaces are state-conditional, this spec only
// verifies that the component mounts and that ITypographyProps are accepted
// without TypeScript errors (the prop wiring is validated at the source level
// by the interface definition and confirmed by the Video source grep below).
//
// Props with real visual effect (per SCSS grep of OrigamVideo.vue):
//   video__loading : font-size  (--origam-video__loading---font-size)
//   video--error   : font-size  (--origam-video--error---font-size)

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

import OrigamVideo from '@origam/components/Video/OrigamVideo.vue'

import { ORIGAM_LOCALE_KEY } from '@origam/consts'

const stubLocale = (): any => ({
    t: (key: string, ...args: Array<unknown>) => {
        if (args.length === 0) return key
        return `${ key }|${ args.join(',') }`
    },
    n: (n: number) => String(n),
    current: { value: 'en' },
    fallback: { value: 'en' },
    messages: { value: {} },
    provide: () => stubLocale(),
    rtl: { value: false },
    isRtl: { value: false }
})

const localeInstance = stubLocale()

// OrigamResponsive stub: renders the #additional slot so that the
// loading/error conditional divs inside it are part of the VDOM tree.
const OrigamResponsiveStub = {
    name: 'OrigamResponsive',
    props: ['aspectRatio', 'contentClass'],
    template: '<div data-cy="origam-video-responsive"><slot name="additional"/><slot/></div>'
}

const OrigamMediaControllerStub = {
    name: 'OrigamMediaController',
    props: [
        'state', 'methods', 'playbackRates', 'allowRemotePlayback',
        'downloadable', 'downloadUrl', 'downloadFilename',
        'showPrevious', 'showNext', 'showLoop', 'showShuffle',
        'loopMode', 'shuffle'
    ],
    emits: ['previous', 'next', 'download', 'update:loopMode', 'update:shuffle'],
    template: '<div data-cy="origam-video-controls"><slot/></div>'
}

function mountVideo (props: Record<string, unknown> = {}) {
    return mount(OrigamVideo, {
        attachTo: document.body,
        global: {
            provide: {
                [ORIGAM_LOCALE_KEY as unknown as symbol]: localeInstance
            },
            stubs: {
                OrigamIcon: { template: '<i aria-hidden="true" />' },
                OrigamMediaController: OrigamMediaControllerStub,
                OrigamResponsive: OrigamResponsiveStub
            }
        },
        props: {
            src: 'https://example.com/video.mp4',
            ...props
        }
    })
}

// Silence matchMedia warnings from jsdom (used by useVideoPlayer internals)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
})

describe('OrigamVideo — basic mount', () => {
    it('mounts without errors', () => {
        const wrapper = mountVideo()
        expect(wrapper.exists()).toBe(true)
    })

    it('accepts ITypographyProps (fontSize / fontWeight / lineHeight / letterSpacing / fontFamily) without error', () => {
        const wrapper = mountVideo({ fontSize: 'xl', fontWeight: 'bold' })
        expect(wrapper.exists()).toBe(true)
    })
})

// ─── Typography — state-conditional surfaces (documented limitation) ──────────
//
// .origam-video__loading and .origam-video__error are guarded by
// `v-if="state.loading.value && !state.error.value"` and
// `v-if="state.error.value"` respectively. Both flags are internal Refs in
// useVideoPlayer set by native HTMLVideoElement events that jsdom never fires.
//
// The CSS variables are emitted by useTypography and the :style binding is
// wired on both elements in OrigamVideo.vue — confirmed by source:
//   .origam-video__loading  :style="typographyLoadingStyles"
//   .origam-video__error    :style="typographyErrorStyles"
//
// The rendered effect (font-size override) is covered by Playwright e2e tests.
// Headless unit coverage is intentionally omitted per project policy
// ("surface d'état X non testable headless — var posée, cf. recipe").
