import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_QR_CODE_DOC: IComposableDoc = {
    slug: 'use-qr-code',
    name: 'useQrCode',
    domain: 'QrCode',
    icon: 'mdi-qrcode',
    descriptionKey: '',
    descriptionFallback: 'Headless QR-code composable. Encodes a string payload using qrcode-generator (Reed-Solomon + matrix masking) and returns a reactive SVG string, the raw module matrix, and the matrix size. The encoder is LRU-cached at module level to avoid rebuilding identical matrices on re-renders. Fully SSR-safe — no DOM API is touched.',
    signature: `function useQrCode(
  value: MaybeRefOrGetter<string>,
  options?: MaybeRefOrGetter<IUseQrCodeOptions>
): {
  svg: ComputedRef<string>
  modules: ComputedRef<boolean[][]>
  size: ComputedRef<number>
}`,
    params: [
        {
            name: 'value',
            type: 'MaybeRefOrGetter<string>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The payload to encode: URL, text, vCard, etc. Accepts a plain string, a ref, or a getter function. Reactive — the SVG rebuilds whenever value changes.',
        },
        {
            name: 'options',
            type: 'MaybeRefOrGetter<IUseQrCodeOptions>',
            required: false,
            defaultValue: '{}',
            descriptionKey: '',
            descriptionFallback: 'Encoding and rendering options: errorCorrectionLevel ("L" | "M" | "Q" | "H"), foreground, background, margin (module units), cornerRadius (per <rect>), and logo ({ src, size, padding, background }).',
        },
    ],
    returns: [
        {
            name: 'svg',
            type: 'ComputedRef<string>',
            descriptionKey: '',
            descriptionFallback: 'Complete SVG string with a viewBox scaled to the module grid. Safe for v-html or <img src="data:image/svg+xml,…">. Rebuilds when value or options change.',
        },
        {
            name: 'modules',
            type: 'ComputedRef<boolean[][]>',
            descriptionKey: '',
            descriptionFallback: 'N×N boolean grid where true = dark module. Use to render a custom canvas or WebGL QR code.',
        },
        {
            name: 'size',
            type: 'ComputedRef<number>',
            descriptionKey: '',
            descriptionFallback: 'The side length of the module matrix (modules.value.length). Grows with payload complexity and ECC level.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Basic reactive QR code',
            code: `<script setup lang="ts">
import { ref } from 'vue'
import { useQrCode } from 'origam'

const url = ref('https://origam.dev')
const { svg } = useQrCode(url, {
  errorCorrectionLevel: 'M',
  foreground: '#000000',
  background: '#ffffff',
  margin: 2
})
</script>

<template>
  <input v-model="url" placeholder="Enter URL" />
  <div v-html="svg" style="width: 200px; height: 200px" />
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Via OrigamQrCode component',
            code: `<origam-qr-code
  value="https://origam.dev"
  error-correction-level="H"
  foreground="var(--origam-color-primary)"
  :logo="{ src: '/logo.svg', size: 0.25 }"
  width="256"
/>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom canvas rendering using modules',
            code: `<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useQrCode } from 'origam'

const canvas = ref<HTMLCanvasElement>()
const { modules } = useQrCode('https://example.com')

watchEffect(() => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  const grid = modules.value
  const cell = 4
  ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
  grid.forEach((row, r) => row.forEach((dark, c) => {
    ctx.fillStyle = dark ? '#000' : '#fff'
    ctx.fillRect(c * cell, r * cell, cell, cell)
  }))
})
</script>

<template>
  <canvas ref="canvas" :width="modules.length * 4" :height="modules.length * 4" />
</template>`,
            lang: 'vue',
        },
    ],
    related: ['use-clipboard'],
    consumedInterfaces: ['IUseQrCodeOptions', 'IQrCodeLogo'],
}
