// Unit tests for `useWaveform` — exercises the fetch + decode + bin
// pipeline against a stubbed OfflineAudioContext + fetch. jsdom does
// not implement Web Audio, so we patch the global ourselves and feed
// the composable a synthetic AudioBuffer-shaped object.

import { nextTick, ref } from 'vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useWaveform } from '@origam/composables/Audio/use-waveform.composable'

interface FakeAudioBuffer {
    length: number
    getChannelData: (index: number) => Float32Array
}

/**
 * Build a deterministic Float32Array of `length` samples whose envelope
 * grows linearly from 0 to 1 — easy to assert against after the
 * downsampling pass.
 */
function makeRamp (length: number): Float32Array {
    const data = new Float32Array(length)
    for (let i = 0; i < length; i++) {
        data[i] = i / (length - 1)
    }
    return data
}

function patchWebAudio (audioBuffer: FakeAudioBuffer) {
    const decode = vi.fn().mockResolvedValue(audioBuffer)
    class OfflineCtx {
        decodeAudioData = decode
        constructor (_channels: number, _length: number, _rate: number) {}
    }
    Object.defineProperty(window, 'OfflineAudioContext', { configurable: true, value: OfflineCtx })
    return { decode }
}

function patchFetch (status = 200, bytes = 16) {
    const arrayBuffer = new ArrayBuffer(bytes)
    const fetchSpy = vi.fn().mockResolvedValue({
        ok: status >= 200 && status < 300,
        status,
        arrayBuffer: () => Promise.resolve(arrayBuffer)
    })
    Object.defineProperty(globalThis, 'fetch', { configurable: true, value: fetchSpy })
    return { fetchSpy, arrayBuffer }
}

describe('useWaveform', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'OfflineAudioContext', { configurable: true, value: undefined })
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('returns an empty peaks array when the source is undefined', async () => {
        patchFetch()
        const src = ref<string | undefined>(undefined)
        const { peaks } = useWaveform(src)
        await nextTick()
        expect(peaks.value).toEqual([])
    })

    it('downsamples the channel into the requested number of bins', async () => {
        const samples = makeRamp(2000)
        const audioBuffer: FakeAudioBuffer = {
            length: samples.length,
            getChannelData: () => samples
        }
        patchWebAudio(audioBuffer)
        patchFetch()

        const src = ref<string | undefined>('/track.mp3')
        const { peaks, isComputing, error, compute } = useWaveform(src, { bins: 10 })
        await compute()
        expect(error.value).toBeNull()
        expect(peaks.value).toHaveLength(10)
        expect(isComputing.value).toBe(false)
        // The ramp is normalised so the loudest bucket is 1.
        expect(peaks.value[peaks.value.length - 1]).toBeCloseTo(1, 5)
        // The first bucket is the quietest.
        expect(peaks.value[0]).toBeLessThan(peaks.value[peaks.value.length - 1])
    })

    it('normalises so the loudest bucket equals 1 even when raw samples are small', async () => {
        const samples = new Float32Array(800)
        for (let i = 0; i < samples.length; i++) samples[i] = (i % 100) * 0.001 // very quiet
        const audioBuffer: FakeAudioBuffer = {
            length: samples.length,
            getChannelData: () => samples
        }
        patchWebAudio(audioBuffer)
        patchFetch()

        const src = ref<string | undefined>('/track.mp3')
        const { peaks, compute } = useWaveform(src, { bins: 8 })
        await compute()
        const max = Math.max(...peaks.value)
        expect(max).toBeCloseTo(1, 5)
    })

    it('captures an error when OfflineAudioContext is missing', async () => {
        Object.defineProperty(window, 'OfflineAudioContext', { configurable: true, value: undefined })
        patchFetch()
        const src = ref<string | undefined>('/track.mp3')
        const { error, peaks, compute } = useWaveform(src, { bins: 8 })
        await compute()
        expect(error.value).not.toBeNull()
        expect(peaks.value).toEqual([])
    })

    it('captures an error when the fetch returns a non-2xx status', async () => {
        const audioBuffer: FakeAudioBuffer = {
            length: 16,
            getChannelData: () => new Float32Array(16)
        }
        patchWebAudio(audioBuffer)
        patchFetch(404)
        const src = ref<string | undefined>('/missing.mp3')
        const { error, peaks, compute } = useWaveform(src, { bins: 4 })
        await compute()
        expect(error.value).not.toBeNull()
        expect(peaks.value).toEqual([])
    })

    it('recomputes when the source ref changes', async () => {
        const audioBuffer: FakeAudioBuffer = {
            length: 64,
            getChannelData: () => makeRamp(64)
        }
        const { decode } = patchWebAudio(audioBuffer)
        patchFetch()

        const src = ref<string | undefined>('/a.mp3')
        const { compute } = useWaveform(src, { bins: 8 })
        await compute()
        const firstCalls = decode.mock.calls.length
        src.value = '/b.mp3'
        // Allow the watcher microtask to flush.
        await nextTick()
        await nextTick()
        expect(decode.mock.calls.length).toBeGreaterThan(firstCalls)
    })
})
