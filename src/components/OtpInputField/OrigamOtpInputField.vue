<template>
	<div
			:class="otpInputFieldClasses"
			:style="otpInputFieldStyles"
			v-bind="{ ...rootAttrs }"
	>
		<div
				ref="contentRef"
				:style="dimensionStyles"
				class="origam-otp-input-field__content"
		>
			<template
					v-for="(_, i) in fields"
					:key="i"
			>
				<template v-if="divider && i !== 0">
					<span class="origam-otp-input-field__divider">
						{{ divider }}
					</span>
				</template>

				<origam-field
						ref="origamFieldRef"
						:focused="(isFocused && focusAll) || focusIndex === i"
						v-bind="{...fieldProps(i)}"
				>
					<template
							v-if="slots.prependInner"
							#prependInner
					>
						<slot name="prependInner"/>
					</template>

					<template
							v-if="slots.floatingLabel"
							#floatingLabel
					>
						<slot name="floatingLabel"/>
					</template>

					<template
							v-if="slots.label"
							#label
					>
						<slot name="label"/>
					</template>

					<template
							v-if="slots.prefix"
							#prefix
					>
						<slot name="prefix"/>
					</template>

					<template #default>
						<input
								ref="inputRef"
								:aria-label="t('origam.input.otp', i + 1)"
								:autofocus="i === 0 && autofocus"
								:disabled="disabled"
								:inputmode="type === 'number' ? 'numeric' : 'text'"
								:maxlength="i === 0 ? length : '1'"
								:min="type === 'number' ? 0 : undefined"
								:placeholder="placeholder"
								:type="type === 'number' ? 'text' : type"
								:value="model[i]"
								autocomplete="one-time-code"
								class="origam-otp-input-field__field"
								@blur="handleBlur"
								@focus="handleFocus($event, i)"
								@input="handleInput"
								@keydown="handleKeydown"
								@paste="handlePaste(i, $event)"
						/>
					</template>

					<template
							v-if="slots.suffix"
							#suffix
					>
						<slot name="suffix"/>
					</template>

					<template
							v-if="slots.appendInner"
							#appendInner
					>
						<slot name="appendInner"/>
					</template>

					<template
							v-if="slots.clear"
							#clear
					>
						<slot name="clear"/>
					</template>
				</origam-field>
			</template>

			<input
					:value="model.join('')"
					class="origam-otp-input-field__input"
					type="hidden"
					v-bind="{ ...inputAttrs }"
			/>

			<origam-overlay
					:model-value="!!loading"
					contained
					content-class="origam-otp-input-field__loader"
					persistent
			>
				<template #loader>
					<slot name="loader">
						<origam-progress
								:color="typeof props.loading === 'boolean' ? undefined : loading"
								:size="24"
								:type="PROGRESS_TYPE.CIRCULAR"
								indeterminate
								width="2"
						/>
					</slot>
				</template>
			</origam-overlay>

			<slot name="default"/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>

	import { computed, nextTick, ref, StyleValue, useAttrs, useSlots, watch } from "vue"
	import { OrigamField, OrigamOverlay, OrigamProgress } from "../../components"

	import { useDimension, useFocus, useLocale, useProps, useVModel } from "../../composables"

	import { OTP_INPUT_FIELD_TYPE, PROGRESS_TYPE } from "../../enums"

	import type { IOtpInputFieldEmits, IOtpInputFieldProps, IOtpInputFieldSlots } from "../../interfaces"

	import type { TOrigamField } from "../../types"

	import { filterInputAttrs, focusChild, forwardRefs } from "../../utils"

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits, slots and filterProps for the OtpInputField component.
	 ********************************************************/
	const props = withDefaults(defineProps<IOtpInputFieldProps>(), {
		type: OTP_INPUT_FIELD_TYPE.NUMBER,
		length: 6
	})

	const emits = defineEmits<IOtpInputFieldEmits>()

	defineSlots<IOtpInputFieldSlots>()

	const {filterProps} = useProps<IOtpInputFieldProps>(props)

	const {t} = useLocale()
	const attrs = useAttrs()
	const slots = useSlots()

	/*********************************************************
	 * Dimension & focus
	 *
	 * @description
	 * dimensionStyles drives width/height CSS vars from props.
	 * isFocused tracks whether any cell has focus.
	 ********************************************************/
	const {dimensionStyles} = useDimension(props)
	const {isFocused, onFocus: focus, onBlur: blur} = useFocus(props)

	/*********************************************************
	 * Value & model
	 *
	 * @description
	 * model is a char-array split from the string v-model value.
	 * length / fields drive the rendered cell count.
	 ********************************************************/
	const model = useVModel(
			props,
			'modelValue',
			'',
			(val) => val == null ? [] : String(val).split(''),
			(val) => val.join('')
	)

	const length = computed(() => {
		return Number(props.length)
	})
	const fields = computed(() => {
		return Array(length.value).fill(0)
	})

	/*********************************************************
	 * DOM refs
	 *
	 * @description
	 * focusIndex tracks which cell currently has focus (-1 = none).
	 * contentRef is the scrollable wrapper used by focusChild.
	 * inputRef holds native <input> references, one per cell.
	 * origamFieldRef holds OrigamField component references.
	 * current is the currently focused native input.
	 ********************************************************/
	const focusIndex = ref(-1)

	const contentRef = ref<HTMLElement>()
	const inputRef = ref<Array<HTMLInputElement>>([])
	const origamFieldRef = ref<Array<TOrigamField>>([])

	const current = computed(() => {
		return inputRef.value[focusIndex.value]
	})

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

	const fieldProps = (index: number) => {
		return origamFieldRef.value?.[index]?.filterProps(props, ['class', 'style', 'id', 'label'])
	}

	/*********************************************************
	 * Event handlers
	 *
	 * @description
	 * handleInput, handleKeydown, handlePaste manage OTP cell navigation.
	 * handleFocus / handleBlur track focusIndex and isFocused state.
	 * handleClear resets the model and returns focus to the first cell.
	 * reset is exposed for external programmatic clearing.
	 * isInvalidValue guards non-numeric characters in number mode.
	 ********************************************************/
	const handleInput = () => {
		if (!current.value) return

		// The maxlength attribute doesn't work for the number type input, so the text type is used.
		// The following logic simulates the behavior of a number input.
		if (isInvalidValue(current.value.value)) {
			current.value.value = ''
			return
		}

		const array = model.value.slice()
		const value = current.value.value

		array[focusIndex.value] = value

		let target: any = null

		if (focusIndex.value > model.value.length) {
			target = model.value.length + 1
		} else if (focusIndex.value + 1 !== length.value) {
			target = 'next'
		}

		model.value = array

		if (target) focusChild(contentRef.value!, target)
	}

	const handleKeydown = (e: KeyboardEvent) => {
		const array = model.value.slice()
		const index = focusIndex.value
		let target: 'next' | 'prev' | 'first' | 'last' | number | null = null

		if (![
			'ArrowLeft',
			'ArrowRight',
			'Backspace',
			'Delete'
		].includes(e.key)) return

		e.preventDefault()

		if (e.key === 'ArrowLeft') {
			target = 'prev'
		} else if (e.key === 'ArrowRight') {
			target = 'next'
		} else if (['Backspace', 'Delete'].includes(e.key)) {
			array[focusIndex.value] = ''

			model.value = array

			if (focusIndex.value > 0 && e.key === 'Backspace') {
				target = 'prev'
			} else {
				requestAnimationFrame(() => {
					inputRef.value[index]?.select()
				})
			}
		}

		requestAnimationFrame(() => {
			if (target != null) {
				focusChild(contentRef.value!, target)
			}
		})
	}

	const handlePaste = (index: number, e: ClipboardEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const clipboardText = e?.clipboardData?.getData('Text').slice(0, length.value) ?? ''

		if (isInvalidValue(clipboardText)) return

		model.value = clipboardText.split('')

		inputRef.value?.[index].blur()
	}

	const reset = () => {
		model.value = []
	}

	const handleClear = (e: MouseEvent) => {
		e.stopPropagation()

		model.value = []

		nextTick(() => {
			inputRef.value?.[0]?.focus()
		})

		emits('click:clear', e)
	}

	const handleFocus = (_e: FocusEvent, index: number) => {
		if (!isFocused.value) focus()

		focusIndex.value = index
	}

	const handleBlur = () => {
		blur()

		focusIndex.value = -1
	}

	const isInvalidValue = (value: string) => {
		return props.type === OTP_INPUT_FIELD_TYPE.NUMBER && /[^0-9]/g.test(value)
	}

	watch(model, (val) => {
		if (val.length === length.value) emits('finish', val.join(''))
	}, {deep: true})

	watch(focusIndex, (val) => {
		if (val < 0) return

		nextTick(() => {
			inputRef.value[val]?.select()
		})
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * otpInputFieldStyles and otpInputFieldClasses compose the BEM root.
	 ********************************************************/
	const otpInputFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const otpInputFieldClasses = computed(() => {
		return [
			'origam-otp-input-field',
			{
				'origam-otp-input-field--divided': !!props.divider
			},
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Exposes blur, focus, reset, isFocused and filterProps to
	 * parent ref consumers.
	 ********************************************************/
	defineExpose(forwardRefs({
		blur: () => {
			inputRef.value?.some(input => {
				input.blur()
				return true
			})
		},
		focus: () => {
			inputRef.value?.[0]?.focus()
		},
		reset,
		isFocused,
		filterProps
	}))

</script>

<style
		lang="scss"
		scoped
>
	.origam-otp-input-field {
		$this: &;

		align-items: center;
		display: flex;
		justify-content: center;
		/* --origam-otp-input-field---padding-block: 0.5rem (fallback) */
		padding: var(--origam-otp-input-field---padding-block, .5rem) 0;
		position: relative;
		/* --origam-otp-input-field---border-radius: 4px (fallback) */
		border-radius: var(--origam-otp-input-field---border-radius, 4px);

		.origam-field {
			height: 100%;
			--origam-field---padding-start: 0;
			--origam-field---padding-end: 0;
		}

		&__divider {
			/* --origam-otp-input-field__divider---margin-inline: 8px (fallback) */
			margin: 0 var(--origam-otp-input-field__divider---margin-inline, 8px);
		}

		&__content {
			align-items: center;
			display: flex;
			/* --origam-otp-input-field---gap: 0.5rem (fallback) */
			gap: var(--origam-otp-input-field---gap, .5rem);
			/* --origam-otp-input-field__content---height: 64px (fallback) */
			height: var(--origam-otp-input-field__content---height, 64px);
			/* --origam-otp-input-field__content---padding: 0.5rem (fallback) */
			padding: var(--origam-otp-input-field__content---padding, .5rem);
			justify-content: center;
			/* --origam-otp-input-field__content---max-width: 320px (fallback) */
			max-width: var(--origam-otp-input-field__content---max-width, 320px);
			position: relative;
			border-radius: inherit;
		}

		&__field {
			color: var(--origam-otp-input-field__cell---color, inherit);
			/* --origam-otp-input-field__cell---font-size: 1.25rem (fallback) */
			font-size: var(--origam-otp-input-field__cell---font-size, 1.25rem);
			height: 100%;
			/* --origam-otp-input-field__cell---outline: none (fallback) */
			outline: var(--origam-otp-input-field__cell---outline, none);
			/* --origam-otp-input-field__cell---text-align: center (fallback) */
			text-align: var(--origam-otp-input-field__cell---text-align, center);
			width: 100%;
			// User report: "il y a toujours un border tout autour".
			// The native `<input>` ships a 2px UA border that stacked on
			// top of the design's `.origam-field__outline-*` rectangle —
			// each cell read as a double-bordered chip. Reset the UA
			// border so only the field outline remains.
			border: var(--origam-otp-input-field__cell---border, none);
			background: var(--origam-otp-input-field__cell---background, transparent);

			&[type=number]::-webkit-outer-spin-button,
			&[type=number]::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}

			&[type=number] {
				-moz-appearance: textfield;
			}
		}

		&__loader {
			align-items: center;
			display: flex;
			height: 100%;
			justify-content: center;
			width: 100%;

			.origam-progress {
				position: absolute;
			}
		}

		&--divided {
			#{$this}__content {
				/* --origam-otp-input-field__content---max-width-divided: 360px (fallback) */
				max-width: var(--origam-otp-input-field__content---max-width-divided, 360px);
			}
		}
	}

</style>
