<template>
	<component
			:is="tag"
			ref="rootEl"
			class="origam-qr-code"
			:class="rootClasses"
			:style="rootStyles"
			role="img"
			:aria-label="resolvedAriaLabel"
			data-cy="origam-qr-code"
	/>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		ref,
		type StyleValue,
		watchEffect
	} from 'vue'

	import { useQrCode } from '../../composables'

	import type {
		IQrCodeProps
	} from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + defaults for `<OrigamQrCode>`. The component is a pure
	 * SVG renderer — it does NOT own state, NO event, NO input. The
	 * rendered output is the raw SVG string built by the `useQrCode`
	 * composable, mounted via `innerHTML` on the root ref (mirrors
	 * the `<OrigamCode>` pattern — bypasses the v-html lint warning
	 * while keeping the SVG sanitised at the composable layer).
	 *
	 * Defaults are inlined here (not pulled from a QR_CODE_DEFAULTS
	 * const) because the Vue SFC compiler analyses `withDefaults`
	 * statically and only resolves literals — cf. CLAUDE.md rule.
	 ********************************************************/
	const props = withDefaults(defineProps<IQrCodeProps>(), {
		tag: 'div',
		size: 240,
		errorCorrectionLevel: 'M',
		foreground: 'currentColor',
		background: 'transparent',
		margin: 4,
		cornerRadius: 0,
		logo: undefined,
		ariaLabel: undefined
	})

	/*********************************************************
	 * Resolved options snapshot — fed to the composable as a getter
	 * so reactive prop changes invalidate the cached matrix.
	 ********************************************************/
	const resolvedOptions = computed(() => ({
		errorCorrectionLevel: props.errorCorrectionLevel,
		foreground: props.foreground,
		background: props.background,
		margin: props.margin,
		cornerRadius: props.cornerRadius,
		logo: props.logo
	}))

	const { svg } = useQrCode(() => props.value, resolvedOptions)

	/*********************************************************
	 * SVG injection — innerHTML mirrors the `<OrigamCode>` approach
	 * and avoids the `v-html` lint warning. The SVG string itself is
	 * sanitised inside the composable (XML metacharacters in
	 * user-controlled `foreground` / `background` / `logo.src` are
	 * escaped before they reach this element).
	 ********************************************************/
	const rootEl = ref<HTMLElement | null>(null)

	watchEffect(() => {
		const target = rootEl.value
		if (!target) return
		target.innerHTML = svg.value
	})

	/*********************************************************
	 * Size resolution — accept either a number (px) or a string CSS
	 * dimension (`'14rem'`, `'min(80vw, 320px)'`, …). Numbers are
	 * suffixed with `px` for predictable layout.
	 ********************************************************/
	const resolvedSize = computed<string>(() => {
		if (typeof props.size === 'number') return `${props.size}px`
		return props.size
	})

	/*********************************************************
	 * ARIA — fallback to a localisable description of the payload.
	 * Consumers passing a custom `ariaLabel` override the default.
	 ********************************************************/
	const resolvedAriaLabel = computed<string>(() => {
		if (props.ariaLabel) return props.ariaLabel
		return `QR code for ${props.value}`
	})

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		`origam-qr-code--ecc-${props.errorCorrectionLevel.toLowerCase()}`,
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [
		{
			width: resolvedSize.value,
			height: resolvedSize.value
		},
		props.style
	] as StyleValue)

	/*********************************************************
	 * Expose — handy for parents that want to read the rendered SVG
	 * string (e.g. download as `.svg` file).
	 ********************************************************/
	defineExpose({
		svg
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-qr-code {
		display: inline-block;
		line-height: 0;
		color: var(--origam-qr-code---foreground);
		background-color: var(--origam-qr-code---background-color);

		:deep(svg) {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
