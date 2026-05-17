<template>
	<component
			:is="tag"
			class="origam-qr-code"
			:class="rootClasses"
			:style="rootStyles"
			role="img"
			:aria-label="resolvedAriaLabel"
			data-cy="origam-qr-code"
	>
		<span
				ref="svgHost"
				class="origam-qr-code__svg-host"
		/>
		<span
				v-if="hasCustomCenter"
				class="origam-qr-code__center"
				aria-hidden="true"
		>
			<slot
					v-if="hasCenterSlot"
					name="center"
					:size="centerSize"
			/>
			<origam-icon
					v-else-if="icon"
					:icon="icon"
					class="origam-qr-code__center-icon"
			/>
		</span>
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

	import { OrigamIcon } from '../Icon'

	import {
		useBackgroundColor,
		useBorder,
		useMargin,
		usePadding,
		useQrCode,
		useSize,
		useTextColor
	} from '../../composables'

	import type {
		IQrCodeProps,
		IQrCodeSlots,
		ISrcObject
	} from '../../interfaces'

	import type { TRounded } from '../../types'

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
	 * - `color`     (IColorProps)    → composable `foreground`
	 * - `bgColor`   (IBgColorProps)  → composable `background`
	 * - `size`      (ISizeProps)     → wrapper width/height via useSize
	 * - `rounded`   (IRoundedProps)  → per-module SVG `rx`/`ry`
	 *                                  (mapped to a 0..0.5 module-unit
	 *                                  cornerRadius). Wrapper stays
	 *                                  sharp — a QR with a rounded box
	 *                                  is rarely the user intent.
	 * - `quietZone`                  → composable `margin`
	 * - `icon`                       → centred OrigamIcon overlay
	 * - `image`                      → centred raster/vector image
	 *                                  passed down to the SVG <image>
	 * - `border`    (IBorderProps)   → wrapper border via useBorder
	 * - `margin`    (IMarginProps)   → wrapper spacing via useMargin
	 * - `padding`   (IPaddingProps)  → wrapper spacing via usePadding
	 ********************************************************/
	const props = withDefaults(defineProps<IQrCodeProps>(), {
		tag: 'div',
		size: 240,
		errorCorrectionLevel: 'M',
		color: 'currentColor',
		bgColor: 'transparent',
		quietZone: 4,
		rounded: undefined,
		icon: undefined,
		image: undefined,
		ariaLabel: undefined
	})

	defineSlots<IQrCodeSlots>()

	/*********************************************************
	 * Slots — `center` overrides BOTH `icon` and `image`. The first
	 * truthy of the three drives the centre overlay (slot > image > icon).
	 ********************************************************/
	const slots = useSlots()

	const hasCenterSlot = computed(() => !!slots.center)
	const hasCustomCenter = computed(
		() => hasCenterSlot.value || !!props.icon
	)

	/*********************************************************
	 * `rounded` → per-module cornerRadius (in module units 0..0.5).
	 *
	 * Mapping table — picked so each named rung paints a visually
	 * distinct module shape:
	 *   x-small        → 0.10 (barely-softened square)
	 *   small          → 0.18
	 *   default        → 0.25 (rounded square)
	 *   medium         → 0.30
	 *   large          → 0.40
	 *   x-large        → 0.50 (circle modules)
	 *   shaped[-invert] → fallback to default — the composite radii
	 *                     don't translate to a per-module rx/ry, so
	 *                     we settle on the canonical mid-rung.
	 *
	 * `true`  → 0.50 (legacy "fully rounded")
	 * `false` / `''` / `null` / `undefined` → 0
	 * `number` → clamped to [0, 0.5]
	 * string CSS dimension (e.g. `'4px'`) → 0 (modules speak module
	 * units, not pixels — pixel input falls back to square modules).
	 ********************************************************/
	const ROUNDED_TO_CORNER: Readonly<Record<string, number>> = {
		'x-small': 0.10,
		'small': 0.18,
		'default': 0.25,
		'medium': 0.30,
		'large': 0.40,
		'x-large': 0.50,
		'shaped': 0.25,
		'shaped-invert': 0.25
	}

	const resolvedCornerRadius = computed<number>(() => {
		const r = props.rounded

		if (r === undefined || r === null || r === false || r === '') return 0
		if (r === true) return 0.5
		if (typeof r === 'number') return Math.max(0, Math.min(0.5, r))
		if (typeof r === 'string' && r in ROUNDED_TO_CORNER) {
			return ROUNDED_TO_CORNER[r as TRounded]
		}

		return 0
	})

	/*********************************************************
	 * Image overlay → forward to the composable `logo` channel.
	 *
	 * Accepts either a raw URL string or an ISrcObject. The
	 * composable speaks the lower-level `logo` shape; we extract
	 * `src` here (other ISrcObject keys — srcset, aspectRatio, … —
	 * don't make sense inside an inline SVG `<image>` element).
	 ********************************************************/
	const resolvedImageLogo = computed(() => {
		if (hasCustomCenter.value) return undefined
		const img = props.image
		if (!img) return undefined

		const src = typeof img === 'string' ? img : (img as ISrcObject).src
		if (!src) return undefined

		return { src }
	})

	/*********************************************************
	 * Resolved options snapshot — maps public DS prop names to the
	 * composable's internal contract (foreground / background /
	 * margin / cornerRadius / logo).
	 ********************************************************/
	const resolvedOptions = computed(() => ({
		errorCorrectionLevel: props.errorCorrectionLevel,
		foreground: props.color ?? 'currentColor',
		background: props.bgColor ?? 'transparent',
		margin: props.quietZone ?? 4,
		cornerRadius: resolvedCornerRadius.value,
		logo: resolvedImageLogo.value
	}))

	const { svg, size: matrixSize } = useQrCode(() => props.value, resolvedOptions)

	/*********************************************************
	 * Centre overlay geometry — the central reserved square is
	 * ~20% of the matrix module count, mirroring the default logo
	 * overlay ratio expected by the composable.
	 ********************************************************/
	const centerSize = computed(() => Math.round(matrixSize.value * 0.2))

	/*********************************************************
	 * SVG injection — innerHTML mirrors the `<OrigamCode>` approach
	 * and avoids the `v-html` lint warning. The SVG string itself is
	 * sanitised inside the composable (XML metacharacters in
	 * user-controlled `color` / `bgColor` / `image.src` are escaped
	 * before they reach this element).
	 *
	 * The SVG is written into a dedicated `<span>` host so the
	 * `#center` slot / `icon` overlay siblings survive the
	 * innerHTML write.
	 ********************************************************/
	const svgHost = ref<HTMLElement | null>(null)

	watchEffect(() => {
		const target = svgHost.value
		if (!target) return
		target.innerHTML = svg.value
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
	 * DS transverse composables — wrapper-level tokens.
	 * `useRounded` is intentionally NOT consumed here: the `rounded`
	 * prop in this component drives per-module SVG corners, not the
	 * wrapper. Consumers who really need a rounded outer box can
	 * still bind `class` / `style` directly.
	 ********************************************************/
	const { textColorClasses, textColorStyles } = useTextColor(props, 'color')
	const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(props, 'bgColor')
	const { sizeClasses, sizeStyles } = useSize(props)
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
		...sizeClasses.value,
		...borderClasses.value,
		...marginClasses.value,
		...paddingClasses.value,
		props.class
	])

	const rootStyles = computed<StyleValue>(() => [
		textColorStyles.value,
		backgroundColorStyles.value,
		sizeStyles.value,
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
	}

	.origam-qr-code__svg-host {
		display: block;
		width: 100%;
		height: 100%;

		:deep(svg) {
			display: block;
			width: 100%;
			height: 100%;
		}
	}

	.origam-qr-code__center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20%;
		height: 20%;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
	}

	.origam-qr-code__center-icon {
		width: 100%;
		height: 100%;
	}
</style>
