<template>
	<component
			:is="tag"
			ref="root"
			:class="parallaxClasses"
			:style="parallaxStyles"
			@mouseenter="handleMovementStart"
			@mouseleave="handleMovementStop"
			@mousemove="handleMovement"
	>
		<slot name="default"/>
		<audio
				v-if="audio"
				ref="audioRef"
				type="audio/mpeg"
				@ended="handleStop"
		>
			<source :src="audio">
		</audio>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, onBeforeUnmount, onMounted, provide, ref, StyleValue, toRef, watch } from 'vue'
	import type { Ref } from 'vue'
	import {
		useAudio,
		useBorder,
		useBothColor,
		useDimension,
		useDisplay,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useThrottleFn
	} from '../../composables'

	import { ORIGAM_PARALLAX_KEY } from '../../consts'

	import { PARALLAX_EVENT } from '../../enums'

	import type { IBox, IParallaxProps } from '../../interfaces'

	import { getCenter, getTargetBox, inViewport } from '../../utils'

	const props = withDefaults(defineProps<IParallaxProps>(), {
		duration: 1000,
		easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
		perspective: 1000,
		tag: 'div',
		event: PARALLAX_EVENT.MOVE,
		active: true
	})

	const {filterProps} = useProps<IParallaxProps>(props)

	const {audioRef, audioData, onStop: handleStop} = useAudio(props)
	const {platform} = useDisplay()
	const {dimensionStyles} = useDimension(props)
	// Pre-fix `IParallaxProps` did not extend `IColorProps` — the SCSS
	// read `var(--origam-parallax---background-color)` from tokens but
	// the consumer's intent had no override path.
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {borderStyles, borderClasses} = useBorder(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {elevationClasses} = useElevation(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const root = ref<HTMLElement>()

	const isMoving = ref(false)
	const leftOnce = ref(false)
	const shape = ref<IBox | DOMRect | null>(null)
	const movement = ref({
		x: 0,
		y: 0
	})
	const data = ref()

	const isTouch = computed(() => {
		return platform.value.touch
	})
	const eventActions = computed(() => {
		return {
			move: {
				action: mouseMovement,
				condition: isMoving.value && !isTouch.value,
				type: isTouch.value ? 'deviceorientation' : null
			},
			scroll: {
				action: scrollMovement,
				condition: !!shape.value?.height,
				type: 'scroll'
			},
			orientation: {
				action: orientationElement,
				condition: props.event === 'move' && isTouch.value,
				type: 'deviceorientation'
			}
		}
	})
	const eventMap = computed<{ move: any, scroll: any, orientation: any }>(() => {
		return {
			orientation: 'deviceorientation',
			scroll: 'scroll',
			move: isTouch.value ? 'deviceorientation' : null
		}
	})

	const mouseMovement = ({target, event}: { target: IBox | DOMRect, event: MouseEvent }) => {
		const x = event.clientX
		const y = event.clientY

		const relativeX = x - target.left
		const relativeY = y - target.top

		const center = getCenter(target)

		const mouseMovementX = relativeX / center.x
		const mouseMovementY = relativeY / center.y

		return {
			x: mouseMovementX,
			y: mouseMovementY,
			target
		}
	}
	const scrollMovement = ({target}: { target: IBox | DOMRect }) => {
		const x = window.scrollX
		const y = window.scrollY

		const relativeX = x - target.left
		const relativeY = y - target.top

		const center = getCenter(target)

		const mouseMovementX = relativeX / center.x
		const mouseMovementY = relativeY / center.y

		return {
			x: mouseMovementX,
			y: mouseMovementY,
			target
		}
	}
	const orientationElement = ({event, target}: { target: IBox | DOMRect, event: DeviceOrientationEvent }) => {
		const x = event.gamma ?? 1 / 45
		const y = event.beta ?? 1 / 90

		return {x, y, target}
	}

	const handleMovement = useThrottleFn((event: MouseEvent & DeviceOrientationEvent) => {
		if (!props.active && !root.value) return

		if (!isMoving.value && !leftOnce.value) {
			// fixes the specific case when mouseenter didn't trigger on page refresh
			handleMovementStart()
		}

		shape.value = getTargetBox(root.value as unknown as HTMLElement)
		const isInViewport = inViewport(shape.value)
		const condition = eventActions.value[props.event].condition
		const action = eventActions.value[props.event].action

		if (isInViewport && condition) {
			movement.value = action({
				target: shape.value,
				event
			})
			data.value = {x: event.clientX, y: event.clientY}
		}
	}, 100)
	// Parametrised on `event` so we can detach the OLD listener and attach
	// the NEW one when the consumer flips the `event` prop at runtime.
	// The previous implementation only ever read `props.event` via the
	// closure, so `removeEvents()` would try to remove a listener that
	// was never installed — leaving the old listener attached and the
	// new one missing. Result: switching `event="move"` → `event="scroll"`
	// at runtime silently kept the page on `move` mode.
	const addEvents = (event: typeof props.event = props.event) => {
		if (eventMap.value[event]) {
			window.addEventListener(eventMap.value[event], handleMovement, true)
		}
	}
	const removeEvents = (event: typeof props.event = props.event) => {
		if (eventMap.value[event]) {
			window.removeEventListener(eventMap.value[event], handleMovement, true)
		}
	}

	const handleMovementStart = () => {
		if (!props.active) return

		isMoving.value = true
	}
	const handleMovementStop = () => {
		if (!props.active) return

		// fixes the specific case when mouseenter didn't trigger on page refresh
		leftOnce.value = true
		isMoving.value = false
	}

	onMounted(() => {
		addEvents()
	})

	onBeforeUnmount(() => {
		removeEvents()
	})

	// Re-attach the right window listener when the consumer flips `event`
	// at runtime (e.g. via the Histoire HstSelect control). Without this
	// watcher, `event="move"` → `event="scroll"` left the old (no-op for
	// move) state in place and never registered the scroll listener.
	watch(() => props.event, (newEvent, oldEvent) => {
		if (newEvent === oldEvent) return
		removeEvents(oldEvent)
		addEvents(newEvent)
		// Reset internal movement state so the previous mode's last
		// frame doesn't ghost into the new mode.
		isMoving.value = false
		movement.value = { x: 0, y: 0 }
	})

	// `toRef(props, 'key')` (2-arg form) returns a *reactive* ref tracking
	// the prop. The previous code used `toRef(value)` (1-arg) which froze
	// every ref to its initial value — provided `isMoving` was stuck on
	// `false`, so `<OrigamParallaxElement>` always saw a zero movement
	// and never translated. Same bug for `event`/`duration`/`easing`.
	// `animationDuration` is an alias for `duration` (kept for backwards compat).
	// When both are set, `animationDuration` wins so existing consumers that
	// used the old prop name are not silently ignored. A one-shot
	// `console.warn` flags the deprecated prop so consumers migrate to
	// `duration` before the v3.0.0 removal.
	let _animationDurationWarned = false
	const resolvedDuration = computed(() => {
		if (props.animationDuration != null && !_animationDurationWarned) {
			_animationDurationWarned = true
			// eslint-disable-next-line no-console
			console.warn(
				'[origam] OrigamParallax: the `animationDuration` prop is deprecated and will be removed in v3.0.0. ' +
				'Use `duration` instead. Both props currently resolve to the same value (`animationDuration` wins when both are set).'
			)
		}
		return props.animationDuration ?? props.duration ?? 1000
	})

	provide(ORIGAM_PARALLAX_KEY, {
		audioData,
		event: toRef(props, 'event'),
		eventData: data,
		isMoving: computed(() => isMoving.value || props.event === PARALLAX_EVENT.SCROLL) as unknown as Ref<boolean>,
		movement,
		duration: resolvedDuration,
		easing: toRef(props, 'easing'),
		shape
	})

	// CLASS & STYLES

	const parallaxStyles = computed(() => {
		return [
			dimensionStyles.value,
			borderStyles.value,
			colorStyles.value,
			roundedStyles.value,
			paddingStyles.value,
			marginStyles.value,
			// Forward `perspective` as a component-scoped CSS variable so
			// the SCSS owns the actual `perspective:` declaration. Lets the
			// design-token layer override the default per-theme without
			// touching the JS, and keeps the Style-Dictionary chromique
			// pattern consistent across components.
			{
				'--origam-parallax---perspective': `${props.perspective}px`
			},
			props.style
		] as StyleValue
	})
	const parallaxClasses = computed(() => {
		return [
			'origam-parallax',
			borderClasses.value,
			roundedClasses.value,
			elevationClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	// Chromique — every visual knob resolves through component-scoped CSS
	// variables fed by `tokens/component/parallax.json`. The Style-Dictionary
	// build emits the `:root, [data-theme=...] { --origam-parallax---*: ... }`
	// defaults; the SCSS only consumes them. The `--origam-parallax---perspective`
	// override is forwarded from JS (see `parallaxStyles` above) so the
	// runtime `perspective` prop still wins over the token default.
	.origam-parallax {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;

		perspective: var(--origam-parallax---perspective, 1000px);
		transform-origin: var(--origam-parallax---transform-origin, center center);
		// `transition-duration` / `transition-timing-function` are read by
		// the descendant `<OrigamParallaxElement>` via the provided
		// `duration` / `easing` refs — surfaced here for siblings or
		// consumers that want to animate parallax-adjacent layers (overlay,
		// caption, …) at the same cadence as the parallax layers.
		transition-duration: var(--origam-parallax---transition-duration, 600ms);
		transition-timing-function: var(--origam-parallax---transition-timing-function, cubic-bezier(0.23, 1, 0.32, 1));

		background-color: var(--origam-parallax---background-color, transparent);
		color: var(--origam-parallax---color, inherit);
	}
</style>
