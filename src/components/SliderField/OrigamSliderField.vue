<template>
	<origam-input
			ref="origamInputRef"
			:class="sliderFieldClasses"
			:focused="isFocused"
			:style="sliderFieldStyles"
			v-bind="{ ...inputProps}"
	>
		<template
				v-if="hasPrepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot
					name="default"
					v-bind="{id,messagesId,isDisabled,isReadonly,isValid}"
			>
				<div class="origam-slider-field__label">
					<slot name="label">
						<origam-label
								:for="id"
								:required="required"
								:text="label"
						/>
					</slot>
				</div>

				<div
						class="origam-slider-field__container"
						@mousedown="handleSliderMousedown"
						@touchstartPassive="handleSliderTouchstart"
				>

					<origam-slider-field-track
							ref="origamSliderFieldTrackRef"
							:start="isRange ? trackRangeStart : 0"
							:stop="isRange ? trackRangeStop : trackStop"
							class="origam-slider-field__track"
							v-bind="{...trackProps}"
					/>

					<template v-if="!isRange">
						<input
								:id="id"
								:disabled="isDisabled"
								:name="name || id"
								:readonly="isReadonly"
								:value="model"
								tabindex="-1"
						/>

						<origam-slider-field-thumb
								ref="origamSliderFieldThumbRef"
								:aria-describedby="messagesId"
								:focused="isFocused"
								:max="max"
								:min="min"
								:model-value="model"
								:position="trackStop"
								class="origam-slider-field__thumb"
								v-bind="{...thumbProps}"
								@blur="handleBlur"
								@focus="handleFocus"
								@update:model-value="handleUpdateModelValue"
						>
							<template
									v-if="slots['thumb.label']"
									#default
							>
								<slot name="thumb.label"/>
							</template>
						</origam-slider-field-thumb>
					</template>
					<template v-else>
						<input
								:id="`${id}__start`"
								:disabled="isDisabled"
								:name="name || id"
								:readonly="isReadonly"
								:value="model[0]"
								tabindex="-1"
						/>

						<origam-slider-field-thumb
								ref="origamSliderFieldStartThumbRef"
								:aria-describedby="messagesId"
								:focused="isFocused && activeThumbRef === origamSliderFieldStartThumbRef?.$el"
								:max="model[1]"
								:min="min"
								:model-value="model[0]"
								:position="trackRangeStart"
								class="origam-slider-field__thumb origam-slider-field__thumb--start"
								v-bind="{...thumbProps}"
								@blur="handleBlur"
								@focus="handleRangeFocusStart"
								@update:model-value="handleUpdateModelValue"
						>
							<template
									v-if="slots['thumb.labelStart']"
									#default
							>
								<slot name="thumb.labelStart"/>
							</template>
						</origam-slider-field-thumb>

						<input
								:id="`${id}__stop`"
								:disabled="isDisabled"
								:name="name || id"
								:readonly="isReadonly"
								:value="model[1]"
								tabindex="-1"
						/>

						<origam-slider-field-thumb
								ref="origamSliderFieldStopThumbRef"
								:aria-describedby="messagesId"
								:focused="isFocused && activeThumbRef === origamSliderFieldStopThumbRef?.$el"
								:max="max"
								:min="model[0]"
								:model-value="model[1]"
								:position="trackRangeStop"
								class="origam-slider-field__thumb origam-slider-field__thumb--stop"
								v-bind="{...thumbProps}"
								@blur="handleBlur"
								@focus="handleRangeFocusStop"
								@update:model-value="handleUpdateModelValue"
						>
							<template
									v-if="slots['thumb.labelStop']"
									#default
							>
								<slot name="thumb.labelStop"/>
							</template>
						</origam-slider-field-thumb>
					</template>
				</div>
			</slot>
		</template>

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="slots.details"
				#details="detailsSlotProps"
		>
			<slot
					name="details"
					v-bind="detailsSlotProps"
			/>
		</template>

		<template
				v-if="slots.messages"
				#messages="{hasMessages, messages}"
		>
			<slot
					name="messages"
					v-bind="{hasMessages, messages}"
			/>
		</template>

		<template
				v-if="slots.message"
				#message="{message}"
		>
			<slot
					name="message"
					v-bind="{message}"
			/>
		</template>
	</origam-input>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, useSlots, WritableComputedRef } from 'vue'
	import { OrigamInput, OrigamLabel, OrigamSliderFieldThumb, OrigamSliderFieldTrack } from '../../components'

	import {
	useFocus,
	useProps,
	useRtl,
	useSlider,
	useSteps,
	useStyle,
	useVModel
} from '../../composables'

	import { DENSITY, DIRECTION } from '../../enums'

	import type { ISliderFieldProps } from "../../interfaces"

	import type { TOrigamInput, TOrigamSliderFieldThumb, TOrigamSliderFieldTrack } from '../../types'

	import { getSliderFieldOffset, omit } from '../../utils'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits, slots and component refs.
	 ********************************************************/
	const props = withDefaults(defineProps<ISliderFieldProps>(), {
		min: 0,
		max: 100,
		modelValue: 0,
		step: 0,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT
	})

	const emits = defineEmits(['update:focused', 'update:modelValue', 'start', 'end'])

	const {filterProps} = useProps<ISliderFieldProps>(props)

	const origamInputRef = ref<TOrigamInput>()
	const origamSliderFieldThumbRef = ref<TOrigamSliderFieldThumb>()
	const origamSliderFieldTrackRef = ref<TOrigamSliderFieldTrack>()
	const origamSliderFieldStartThumbRef = ref<TOrigamSliderFieldThumb>()
	const origamSliderFieldStopThumbRef = ref<TOrigamSliderFieldThumb>()

	const slots = useSlots()

	/*********************************************************
	 * Value & Range
	 *
	 * @description
	 * Model value management, range mode detection, and the
	 * core useSlider composable wiring (drag, thumb refs,
	 * start/end/move callbacks).
	 ********************************************************/
	const isRange = computed(() => {
		return props.range
	})

	const steps = useSteps(props)

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {
		activeThumbRef,
		min,
		max,
		mousePressed,
		roundValue,
		onSliderMousedown: handleSliderMousedown,
		onSliderTouchstart: handleSliderTouchstart,
		position,
		hasLabels
	} = useSlider({
		origamSliderFieldTrackRef,
		origamSliderFieldThumbRef,
		origamSliderFieldStartThumbRef,
		origamSliderFieldStopThumbRef,
		props,
		steps,
		onSliderStart: ({value}) => {
			if (!isRange.value) {
				model.value = roundValue(value)
			}

			emits('start', model.value)
		},
		onSliderEnd: ({value}) => {
			if (isRange.value) {
				const modelVal = model.value as [number, number]

				const newValue: [number, number] = activeThumbRef.value === origamSliderFieldStartThumbRef.value?.$el
						? [value, modelVal[1]]
						: [modelVal[0], value]

				if (newValue[0] < newValue[1]) {
					model.value = newValue
				}
			} else {
				model.value = roundValue(value)
			}

			emits('end', model.value)
		},
		onSliderMove: ({value}) => {
			if (isRange.value) {
				const [start, stop] = model.value as [number, number]

				if (start === stop && start !== min.value) {
					activeThumbRef.value = value > start ? origamSliderFieldStopThumbRef.value?.$el : origamSliderFieldStartThumbRef.value?.$el
					activeThumbRef.value?.focus()
				}

				if (activeThumbRef.value === origamSliderFieldStartThumbRef.value?.$el) {
					model.value = [Math.min(value, stop), stop]
				} else {
					model.value = [start, Math.max(start, value)]
				}
			} else {
				model.value = roundValue(value)
			}
		},
		getActiveThumb: (e: MouseEvent | TouchEvent) => {
			if (isRange.value) {
				// Pre-fix three copy-paste typos in this branch made the
				// STOP thumb completely unreachable in range mode:
				//   1. `if (!start || !start)` — second clause should
				//      check `!stop`. With STOP never validated, the
				//      function happily proceeded with a null ref.
				//   2. `stopOffset = …(e, START.$el, …)` — measured
				//      the click distance to the START thumb instead
				//      of the STOP thumb, so both offsets resolved to
				//      the same point.
				//   3. The ternary returned `START.$el` in BOTH
				//      branches, so the active thumb always resolved
				//      to START regardless of which one the user
				//      clicked.
				// User-reported: "je ne peux pas cliqué sur le 2eme
				// control, je peux changé le premier mais le 2eme
				// impossible".
				if (!origamSliderFieldStartThumbRef.value || !origamSliderFieldStopThumbRef.value) return

				const startOffset = getSliderFieldOffset(e, origamSliderFieldStartThumbRef.value.$el, props.direction)
				const stopOffset  = getSliderFieldOffset(e, origamSliderFieldStopThumbRef.value.$el, props.direction)

				const a = Math.abs(startOffset)
				const b = Math.abs(stopOffset)

				return (a < b || (a === b && startOffset < 0))
						? origamSliderFieldStartThumbRef.value.$el
						: origamSliderFieldStopThumbRef.value.$el
			} else {
				return origamSliderFieldThumbRef.value?.$el
			}
		}
	})

	/*********************************************************
	 * Value
	 ********************************************************/

	const model = useVModel(
			props,
			'modelValue',
			isRange.value ? [min.value, max.value] : min.value,
			(value: number | string | Array<number> | Array<string> | undefined) => {
				if (isRange.value) {
					const array = value as Array<number> | Array<string>
					if (!array?.length) return [min.value, max.value]

					return array.map((val) => steps.roundValue(val))
				}

				return steps.roundValue(value == null ? steps.min.value : value as number | string)
			}
	) as WritableComputedRef<[number, number] | number> & { readonly externalValue: Array<number> | number }

	/*********************************************************
	 * Focus
	 *
	 * @description
	 * Focus state and range-thumb focus routing — ensures the
	 * correct thumb is focused when thumbs overlap at min/max.
	 ********************************************************/

	/*********************************************************
	 * Effect
	 ********************************************************/

	const {isFocused, onFocus, onBlur} = useFocus(props)
	const {rtlClasses} = useRtl()

	/*********************************************************
	 * Event handlers
	 ********************************************************/

	const handleFocus = () => {
		onFocus()
	}
	const handleRangeFocusStart = (e: FocusEvent) => {
		onFocus()

		const modelVal = model.value as [number, number]

		activeThumbRef.value = origamSliderFieldStartThumbRef.value?.$el

		// Make sure second thumb is focused if
		// the thumbs are on top of each other
		// and they are both at minimum value
		// but only if focused from outside.
		if (modelVal[0] === modelVal[1] && modelVal[1] === min.value && e.relatedTarget !== origamSliderFieldStopThumbRef.value?.$el) {
			origamSliderFieldStartThumbRef.value?.$el.blur()
			origamSliderFieldStopThumbRef.value?.$el.focus()
		}
	}
	const handleRangeFocusStop = (e: FocusEvent) => {
		onFocus()

		const modelVal = model.value as [number, number]

		activeThumbRef.value = origamSliderFieldStopThumbRef.value?.$el

		// Make sure second thumb is focused if
		// the thumbs are on top of each other
		// and they are both at minimum value
		// but only if focused from outside.
		if (modelVal[0] === modelVal[1] && modelVal[0] === max.value && e.relatedTarget !== origamSliderFieldStartThumbRef.value?.$el) {
			origamSliderFieldStopThumbRef.value?.$el.blur()
			origamSliderFieldStartThumbRef.value?.$el.focus()
		}
	}
	const handleBlur = () => {
		onBlur()

		if (isRange.value) {
			activeThumbRef.value = undefined
		}
	}

	/*********************************************************
	 * Track positions
	 *
	 * @description
	 * Computed track fill positions for single and range mode.
	 ********************************************************/
	const trackStop = computed(() => {
		if (isRange.value) return

		return position(model.value as number)
	})
	const trackRangeStart = computed(() => {
		if (!isRange.value) return

		const modelVal = model.value as [number, number]

		return position(modelVal[0] as number)
	})
	const trackRangeStop = computed(() => {
		if (!isRange.value) return

		const modelVal = model.value as [number, number]

		return position(modelVal[1] as number)
	})

	const handleUpdateModelValue = (v: number | [number, number]) => {
		model.value = v
	}

	/*********************************************************
	 * Props forwarding
	 *
	 * @description
	 * Filtered props forwarded to child Input, Thumb and Track.
	 ********************************************************/

	/*********************************************************
	 * Forwarded props
	 ********************************************************/

	const inputProps = computed(() => {
		// Strip the entire IColorProps surface so `OrigamInput` (the
		// row wrapper) doesn't paint the consumer's intent on its
		// background. `color` / `bgColor` stay strictly scoped to the
		// slider track + thumb (per the project's color contract).
		// Same fix family as the OrigamSwitch wrapper-bg leak in 3b6ba3f.
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused', 'centerAffix', 'color', 'bgColor', 'activeColor', 'activeBgColor', 'hoverColor', 'hoverBgColor'])
	})
	const thumbProps = computed(() => {
		return omit(props.thumbProps ?? {}, ['modelValue', 'class', 'focused', 'min', 'max', 'position'])
	})
	const trackProps = computed(() => {
		return omit(props.trackProps ?? {}, ['class', 'start', 'stop'])
	})

	const hasPrepend = computed(() => {
		return !!(props.label) || slots.label || slots.prepend
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Root element classes and styles.
	 ********************************************************/
	const sliderFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const sliderFieldClasses = computed(() => {
		return [
			'origam-slider-field',
			{
				'origam-slider-field--has-labels': slots.tickLabel || hasLabels.value,
				'origam-slider-field--focused': isFocused.value,
				'origam-slider-field--pressed': mousePressed.value,
				'origam-slider-field--disabled': props.disabled,
				'origam-slider-field--range': isRange.value
			},
			rtlClasses.value,
			props.class
		]
	})
	const {id, css, load, isLoaded, unload} = useStyle(sliderFieldStyles)


	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface exposed to parent refs.
	 ********************************************************/
	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-slider-field {
		$this: &;

		&__container {
			position: relative;
			min-height: inherit;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			input {
				cursor: default;
				padding: 0;
				width: 100%;
				display: none;
			}
		}

		&__label {
			margin-inline-end: 12px;
		}

		&.origam-input {
			:deep(.origam-input__append),
			:deep(.origam-input__prepend) {
				padding: 0;
			}

			&--disabled {
				pointer-events: none;

				#{$this}__container {
					opacity: 0.38;
				}
			}

			&--error {
				--origam-slider-field__track---color: var(--origam-slider-field--error__track---color, inherit);

				:not(.origam-input--disabled) {
					--origam-slider-field__track---background-color: var(--origam-slider-field--error__track---background-color, currentColor);

					#{$this}__container {
						color: rgba(255, 0, 0, 1);
					}
				}
			}

			&--horizontal {
				align-items: center;
				margin-inline: 8px 8px;

				:deep(.origam-input__control) {
					min-height: 32px;
					display: flex;
					align-items: center;
				}

				:deep(.origam-slider-field-track) {
					display: flex;
					align-items: center;
					width: 100%;
					touch-action: pan-y;
					font-size: 0.5rem;
					padding: 0 5px;
					background-color: rgb(148, 148, 148);
					height: 14px;
					cursor: pointer;
					transition: 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1);

					.origam-slider-field-track__background {
						height: 14px;
					}

					.origam-slider-field-track__fill {
						height: inherit;
					}

					.origam-slider-field-track__tick {
						margin-top: calc(calc(14px + 2px) / 2);
					}

					.origam-slider-field-track__tick-label {
						margin-top: calc(14px / 2 + 8px);
						transform: translateX(-50%);
					}

					.origam-slider-field-track__tick--first {
						margin-inline-start: calc(14px + 1px);
						transform: translateX(0%);
					}

					.origam-slider-field-track__tick--last {
						margin-inline-start: calc(100% - 14px - 1px);
						transform: translateX(-100%);
					}
				}

				:deep(.origam-slider-field-thumb) {
					top: 50%;
					transform: translateY(-50%);
					inset-inline-start: calc(var(--origam-slider-field-thumb---position) - var(--origam-slider-field-thumb---size, 20) / 2);

					.origam-slider-field-thumb__label-container {
						left: calc(var(--origam-slider-field-thumb---size, 4) / 2);
						top: 0;
					}

					.origam-slider-field-thumb__label {
						bottom: calc(var(--origam-slider-field-thumb---size, 4) / 2);
						transform: translateX(-50%);

						&:before {
							border-left: 6px solid transparent;
							border-right: 6px solid transparent;
							border-top: 6px solid currentColor;
							bottom: -6px;
						}
					}
				}
			}

			&--vertical {
				justify-content: center;
				margin-top: 12px;
				margin-bottom: 12px;

				:deep(.origam-input__control) {
					min-height: 300px;
				}

				:deep(.origam-slider-field-track) {
					height: 100%;
					display: flex;
					justify-content: center;
					width: calc(var(--origam-slider-field-track---size, 2) + 2px);
					touch-action: pan-x;

					.origam-slider-field-track__background {
						width: var(--origam-slider-field-track---size, 2);
					}

					.origam-slider-field-track__fill {
						width: inherit;
					}

					.origam-slider-field-track__ticks {
						height: 100%;
					}

					.origam-slider-field-track__tick {
						margin-inline-start: calc(calc(var(--origam-slider-field-track---size) + 2px) / 2);
						transform: translate(calc(var(--origam-slider-field-track---size, 2) / -2), calc(var(--origam-slider-field-track---size, 2) / 2));
					}

					.origam-slider-field-track__tick--first {
						bottom: calc(0% + var(--origam-slider-field-track---size, 2) + 1px);
					}

					.origam-slider-field-track__tick--last {
						bottom: calc(100% - var(--origam-slider-field-track---size, 2) - 1px);
					}

					.origam-slider-field-track__tick-label {
						margin-inline-start: calc(var(--origam-slider-field-track---size, 2) / 2 + 12px);
						transform: translateY(-50%);
					}
				}

				:deep(.origam-slider-field-thumb) {
					top: calc(var(--origam-slider-field-thumb---position) - var(--origam-slider-field-thumb---size, 4) / 2);

					.origam-slider-field-thumb__label-container {
						top: calc(var(--origam-slider-field-thumb---size, 4) / 2);
						right: 0;
					}

					.origam-slider-field-thumb__label {
						top: -12.5px;
						left: calc(var(--origam-slider-field-thumb---size, 4) / 2);

						&:before {
							border-right: 6px solid currentColor;
							border-top: 6px solid transparent;
							border-bottom: 6px solid transparent;
							left: -6px;
						}
					}
				}
			}
		}

		&--has-labels {
			> :deep(.origam-input__control) {
				margin-bottom: 4px;
			}
		}

		&--pressed {
			--origam-slider-field---transition: var(--origam-slider-field--pressed---transition, none);
		}

		&--focused {
			:deep(.origam-slider-field-track) {
				.origam-slider-field-track__tick {
					opacity: 1;
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
