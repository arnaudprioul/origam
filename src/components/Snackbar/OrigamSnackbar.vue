<template>
	<origam-overlay
			ref="origamOverlayRef"
			v-model="isActive"
			:class="snackbarClasses"
			:content-props="contentProps"
			:scrim="false"
			:scroll-strategy="SCROLL_STRATEGIES.NONE"
			:style="snackbarStyles"
			disable-global-stack
			no-click-animation
			persistent
			v-bind="{ ...overlayProps, ...scopeId }"
			@touchend="handleTouchend"
			@touchstart-passive="handleTouchstart"
	>
		<template #default>
      <span
		      key="underlay"
		      class="origam-snackbar__underlay"
      />

			<div
					v-if="props.timer && !isHovering"
					key="timer"
					class="origam-snackbar__timer"
			>
				<origam-progress
						ref="origamProgressRef"
						:max="props.timeout"
						:model-value="countdown.time.value"
						:type="PROGRESS_TYPE.LINEAR"
				/>
			</div>

			<div
					v-if="hasContent"
					key="content"
					aria-live="polite"
					class="origam-snackbar__content"
					role="status"
			>
				<template v-if="hasPrepend">
					<div class="origam-snackbar__prepend">
						<slot name="prepend">
							<origam-icon
									v-if="hasIcon"
									key="prepend-icon"
									:icon="icon"
									:size="28"
							/>
						</slot>
					</div>
				</template>

				<slot name="text">
					<span>{{ text }}</span>
				</slot>

				<slot name="default"/>
			</div>

			<div
					v-if="slots.action"
					class="origam-snackbar__actions"
			>
				<slot
						name="action"
						v-bind="{ isActive }"
				/>
			</div>

		</template>
	</origam-overlay>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		inject,
		mergeProps,
		onMounted,
		ref,
		shallowRef,
		StyleValue,
		toRef,
		useSlots,
		watch,
		watchEffect
	} from 'vue'
	import { OrigamIcon, OrigamOverlay, OrigamProgress, OrigamSnack } from '../../components'

	import {
		useBorder,
		useBothColor,
		useCountdown,
		useElevation,
		useLayout,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useScopeId,
		useStatus,
		useToggleScope,
		useVModel
	} from '../../composables'

	import { ORIGAM_LAYOUT_KEY } from '../../consts'

	import { PROGRESS_TYPE, SCROLL_STRATEGIES } from '../../enums'

	import type { ISnackbarProps } from "../../interfaces"

	import type { TOrigamOverlay, TOrigamProgress, TTransitionProps } from '../../types'

	import { forwardRefs, refElement } from '../../utils'

	const props = withDefaults(defineProps<ISnackbarProps>(), {
		timeout: 5000,
		location: 'bottom',
		border: true,
		rounded: true,
		elevation: 1,
		transition: () => ({
			component: OrigamSnack
		}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<ISnackbarProps>(props)

	const slots = useSlots()

	const isActive = useVModel(props, 'modelValue')
	const {positionClasses} = usePosition(props)
	const {scopeId} = useScopeId()
	const countdown = useCountdown(Number(props.timeout))
	const {icon, statusClasses} = useStatus(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {elevationClasses} = useElevation(props)

	const origamOverlayRef = ref<TOrigamOverlay>()
	const origamProgressRef = ref<TOrigamProgress>()
	const isHovering = shallowRef(false)
	const startY = shallowRef(0)
	const mainStyles = ref()
	const hasLayout = inject(ORIGAM_LAYOUT_KEY, undefined)

	useToggleScope(() => !!hasLayout, () => {
		const layout = useLayout()

		watchEffect(() => {
			mainStyles.value = layout.mainStyles.value
		})
	})

	let activeTimeout = -1
	const startTimeout = () => {
		countdown.reset()
		window.clearTimeout(activeTimeout)
		const timeout = Number(props.timeout)

		if (!isActive.value || timeout === -1) return

		const element = refElement(origamProgressRef.value)

		countdown.start(element)

		activeTimeout = window.setTimeout(() => {
			isActive.value = false
		}, timeout)
	}
	const clearTimeout = () => {
		countdown.reset()
		window.clearTimeout(activeTimeout)
	}

	watch(isActive, startTimeout)
	watch(() => props.timeout, startTimeout)

	onMounted(() => {
		if (isActive.value) startTimeout()
	})

	const handlePointerenter = () => {
		isHovering.value = true
		clearTimeout()
	}
	const handlePointerleave = () => {
		isHovering.value = false
		startTimeout()
	}
	const handleTouchstart = (event: TouchEvent) => {
		startY.value = event.touches[0].clientY
	}
	const handleTouchend = (event: TouchEvent) => {
		if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
			isActive.value = false
		}
	}

	const overlayProps = computed(() => {
		return origamOverlayRef.value?.filterProps(props, ['class', 'style', 'id', 'contentProps', 'modelValue', 'disableGlobalStack', 'noClickAnimation', 'persistent', 'scrim', 'scrollStrategy'])
	})
	const contentProps = computed(() => {
		return mergeProps({
			class: [
				'origam-snackbar__wrapper'
			],
			style: [
				colorStyles.value,
				roundedStyles.value,
				borderStyles.value,
				paddingStyles.value,
				marginStyles.value
			],
			onPointerenter: handlePointerenter,
			onPointerleave: handlePointerleave
		}, props.contentProps)
	})

	const hasPrepend = computed(() => {
		return !!(slots['prepend'] || icon.value)
	})
	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
	})
	const hasContent = slots.default || slots.text || !!(props.text) || hasPrepend.value

	// CLASS & STYLES

	const locationClasses = computed(() => {
		return props.location.split(' ').reduce((acc, loc) => {
			acc[`origam-snackbar--${loc}`] = true

			return acc
		}, {} as Record<string, any>)
	})
	const snackbarStyles = computed(() => {
		return [
			mainStyles.value,
			props.style
		] as StyleValue
	})
	const snackbarClasses = computed(() => {
		return [
			'origam-snackbar',
			{
				'origam-snackbar--active': isActive.value,
				'origam-snackbar--multi-line': props.multiLine && !props.vertical,
				'origam-snackbar--timer': !!props.timer,
				'origam-snackbar--vertical': props.vertical
			},
			locationClasses.value,
			positionClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			elevationClasses.value,
			statusClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, origamOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-snackbar {
		$this: &;

		justify-content: center;
		z-index: var(--origam-snackbar---z-index, var(--origam-z-index-toast, 1060));
		margin: var(--origam-snackbar---margin, 8px);
		margin-inline-end: calc(var(--origam-snackbar---margin, 8px) + 0px);
		padding: var(--origam-layout---position-top) var(--origam-layout---position-right) var(--origam-layout---position-bottom) var(--origam-layout---position-left);

		&:not(#{$this}--center) {
			&:not(#{$this}--top) {
				align-items: flex-end;
			}
		}

		:deep(#{$this}__wrapper) {
			align-items: center;
			display: flex;
			max-width: var(--origam-snackbar__wrapper---max-width, 672px);
			min-height: var(--origam-snackbar__wrapper---min-height, 48px);
			min-width: var(--origam-snackbar__wrapper---min-width, 344px);
			overflow: hidden;
			padding: 0;
		}

		&__underlay {
			position: absolute;
		}

		&__content {
			flex-grow: 1;
			font-size: var(--origam-snackbar__content---font-size, 0.875rem);
			font-weight: var(--origam-snackbar__content---font-weight, 400);
			letter-spacing: var(--origam-snackbar__content---letter-spacing, 0.0178571429em);
			line-height: var(--origam-snackbar__content---line-height, 1.425);
			margin-right: auto;
			padding: var(--origam-snackbar__content---padding-block, 14px) var(--origam-snackbar__content---padding-inline, 16px);
			text-align: initial;
			align-items: center;
			display: flex;
		}

		&__prepend {
			margin-inline-end: var(--origam-snackbar__prepend---margin-inline-end, 12px);
		}

		&__actions {
			align-items: center;
			align-self: center;
			display: flex;
			margin-inline-end: var(--origam-snackbar__actions---margin-inline-end, 8px);

			> .origam-btn {
				padding: 0 8px;
				min-width: auto;
			}
		}

		&__timer {
			width: 100%;
			position: absolute;
			top: 0;

			:deep(.origam-progress-linear) {
				transition: var(--origam-snackbar__timer---transition-duration, 0.2s) var(--origam-snackbar__timer---transition-easing, linear);
			}
		}

		&--border {
			:deep(#{$this}__wrapper) {
				border-width: var(--origam-snackbar__wrapper---border-width, thin);
				border-style: var(--origam-snackbar__wrapper---border-style, solid);
				box-shadow: none;
			}
		}

		&--rounded {
			:deep(#{$this}__wrapper) {
				border-radius: var(--origam-snackbar__wrapper---border-radius, 4px);
			}
		}

		&--absolute {
			position: absolute;
			z-index: var(--origam-snackbar--absolute---z-index, var(--origam-z-index-raised, 1));
		}

		&--multi-line {
			#{$this}__wrapper {
				min-height: var(--origam-snackbar--multi-line---wrapper-min-height, 68px);
			}
		}

		&--vertical {
			#{$this}__wrapper {
				flex-direction: column;

				#{$this}__actions {
					align-self: flex-end;
					margin-bottom: var(--origam-snackbar--vertical---actions-margin-bottom, 8px);
				}
			}
		}

		&--center {
			align-items: center;
			justify-content: center;
		}

		&--top {
			align-items: flex-start;
		}

		&--bottom {
			align-items: flex-end;
		}

		&--left,
		&--start {
			justify-content: flex-start;
		}

		&--right, &--end {
			justify-content: flex-end;
		}
	}
</style>

