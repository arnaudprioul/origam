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
	>
		<slot
				v-if="hasCenter"
				name="center"
				:size="centerSize"
		/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		ref,
		type StyleValue,
		useSlots,
		watchEffect
	} from 'vue'

	import {
		useBackgroundColor,
		useBorder,
		useMargin,
		usePadding,
		useQrCode,
		useRounded,
		useTextColor
	} from '../../composables'

	import type {
		IQrCodeProps,
		IQrCodeSlots
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
	 *
	 * Prop mapping (public DS API → composable internal contract):
	 * - `color`    (IColorProps)   → composable `foreground`
	 * - `bgColor`  (IBgColorProps) → composable `background`
	 * - `quietZone`                → composable `margin`
	 * - `rounded`  (IRoundedProps) → wrapper border-radius via useRounded
	 * - `border`   (IBorderProps)  → wrapper border via useBorder
	 * - `margin`   (IMarginProps)  → wrapper spacing via useMargin
	 * - `padding`  (IPaddingProps) → wrapper spacing via usePadding
	 ********************************************************/
	const props = withDefaults(defineProps<IQrCodeProps>(), {
		tag: 'div',
		size: 240,
		errorCorrectionLevel: 'M',
		color: 'currentColor',
		bgColor: 'transparent',
		quietZone: 4,
		cornerRadius: 0,
		logo: undefined,
		ariaLabel: undefined
	})

	defineSlots<IQrCodeSlots>()

	/*********************************************************
	 * Slots
	 ********************************************************/
	const slots = useSlots()

	const hasCenter = computed(() => !!slots.center)

	/*********************************************************
	 * Resolved options snapshot — maps public DS prop names to the
	 * composable's internal contract (foreground / background / margin).
	 * When the #center slot is provided, logo is suppressed — the slot
	 * owns the centre overlay entirely.
	 ********************************************************/
	const resolvedOptions = computed(() => ({
		errorCorrectionLevel: props.errorCorrectionLevel,
		foreground: props.color ?? 'currentColor',
		background: props.bgColor ?? 'transparent',
		margin: props.quietZone ?? 4,
		cornerRadius: props.cornerRadius,
		logo: hasCenter.value ? undefined : props.logo
	}))

	const { svg, size: matrixSize } = useQrCode(() => props.value, resolvedOptions)

	/*********************************************************
	 * Center slot geometry — the central reserved square is ~20% of
	 * the matrix module count, mirroring the default logo overlay ratio.
	 ********************************************************/
	const centerSize = computed(() => Math.round(matrixSize.value * 0.2))

	/*********************************************************
	 * SVG injection — innerHTML mirrors the `<OrigamCode>` approach
	 * and avoids the `v-html` lint warning. The SVG string itself is
	 * sanitised inside the composable (XML metacharacters in
	 * user-controlled `color` / `bgColor` / `logo.src` are
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
	 * DS transverse composables — wrapper-level tokens
	 ********************************************************/
	const { textColorClasses, textColorStyles } = useTextColor(props, 'color')
	const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
	const { roundedClasses, roundedStyles } = useRounded(props)
	const { borderClasses, borderStyles } = useBorder(props)
	const { marginClasses, marginStyles } = useMargin(props)
	const { paddingClasses, paddingStyles } = usePadding(props)

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const rootClasses = computed(() => [
		`origam-qr-code--ecc-${props.errorCorrectionLevel.toLowerCase()}`,
		...textColorClasses.value,
		...backgroundColorClasses.value,
		...roundedClasses.value,
		...borderClasses.value,
		...marginClasses.value,
		...paddingClasses.value,
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [
		{
			width: resolvedSize.value,
			height: resolvedSize.value
		},
		textColorStyles.value,
		backgroundColorStyles.value,
		roundedStyles.value,
		borderStyles.value,
		marginStyles.value,
		paddingStyles.value,
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
		position: relative;

		:deep(svg) {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
</style>
