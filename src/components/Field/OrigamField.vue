<template>
	<div
			:class="fieldClasses"
			:style="fieldStyles"
			v-bind="attrs"
			@click="handleClick"
	>
		<div class="origam-field__overlay"/>

		<!--
			Skeleton kind: render OUTSIDE `.origam-field__loader` (which is the
			thin 2px-tall progress bar at the bottom edge — would clip the
			skeleton). The skeleton fills the field's content box and replaces
			the input/label/icons rendering below.
		-->
		<template v-if="loaderConfig.isActive && loaderConfig.kind === 'skeleton'">
			<origam-skeleton
					class="origam-field__skeleton"
					variant="rectangular"
					:loading="true"
					v-bind="loaderConfig.overrides"
			/>
		</template>

		<template v-if="hasLoader && loaderConfig.kind !== 'skeleton'">
			<slot name="loader">
				<div class="origam-field__loader">
					<origam-progress
							:active="true"
							:color="props.color"
							:indeterminate="loaderConfig.indeterminate"
							:model-value="loaderConfig.modelValue"
							:type="loaderConfig.kind === 'circular' ? PROGRESS_TYPE.CIRCULAR : PROGRESS_TYPE.LINEAR"
							:class="['origam-field__progress', `origam-field__progress--${loaderConfig.kind}`]"
							thickness="4"
							v-bind="loaderConfig.overrides"
					/>
				</div>
			</slot>
		</template>

		<template v-if="!loaderConfig.isActive || loaderConfig.kind !== 'skeleton'">
			<div
					v-if="hasPrependInner"
					key="prependInner"
					class="origam-field__prepend-inner"
					@click="handleClickPrependInner"
			>
				<slot name="prependInner">
					<origam-avatar
							v-if="props.prependInnerAvatar"
							key="prepend-avatar"
							:density="props.density"
							:image="props.prependInnerAvatar"
					/>
					<origam-icon
							v-if="props.prependInnerIcon"
							key="prepend-icon"
							:density="props.density"
							:icon="props.prependInnerIcon"
					/>
				</slot>
			</div>

			<div
					class="origam-field__field"
					data-no-activator=""
			>
				<template v-if="hasLabel">
					<slot
							name="label"
							v-bind="labelProps"
					>
						<origam-label
								v-bind="labelProps"
								ref="origamLabelRef"
						/>
					</slot>
				</template>

				<span
						v-if="hasPrefix"
						class="origam-field__prefix"
				>
	         <slot name="prefix">
	          <span>
	            {{ prefix }}
	          </span>
	         </slot>
	      </span>

				<slot
						name="default"
						v-bind="slotProps"
				/>

				<span
						v-if="hasSuffix"
						class="origam-field__suffix"
				>
	        <slot name="suffix">
	          <span>
	            {{ suffix }}
	          </span>
	        </slot>
	      </span>
			</div>

			<origam-expand-x
					v-if="hasClear"
					key="clear"
			>
				<div
						v-show="props.dirty"
						class="origam-field__clearable"
						@mousedown="handleMousedownClear"
				>
					<slot name="clear">
						<origam-icon
								:icon="props.clearIcon"
								@blur="handleBlur"
								@focus="handleFocus"
								@keydown="handleKeydownClear"
						/>
					</slot>
				</div>
			</origam-expand-x>

			<div
					v-if="hasAppendInner"
					key="appendInner"
					class="origam-field__append-inner"
					@click="handleClickAppendInner"
			>
				<slot name="appendInner">
					<origam-avatar
							v-if="props.appendInnerAvatar"
							key="append-avatar"
							:density="props.density"
							:image="props.appendInnerAvatar"
					/>
					<origam-icon
							v-if="props.appendInnerIcon"
							key="append-icon"
							:density="props.density"
							:icon="props.appendInnerIcon"
					/>
				</slot>
			</div>

			<div class="origam-field__outlines">
				<div class="origam-field__outline origam-field__outline--start"/>
				<div class="origam-field__outline origam-field__outline--notch">
					<template v-if="hasFloatingLabel">
						<slot
								name="floatingLabel"
								v-bind="floatingLabelProps"
						>
							<origam-label
									key="floating-label"
									v-bind="floatingLabelProps"
									ref="origamFloatingLabelRef"
							/>
						</slot>
					</template>
				</div>
				<div class="origam-field__outline origam-field__outline--end"/>
			</div>
		</template>

	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, useAttrs, useSlots, watch } from 'vue'
	import { OrigamAvatar, OrigamExpandX, OrigamIcon, OrigamLabel, OrigamProgress, OrigamSkeleton } from '../../components'

	import {
		useActive,
		useAdjacentInner,
		useBothColor,
		useDefaults,
		useDensity,
		useElevation,
		useFocus,
		useLoader,
		useProps,
		useRounded,
		useRtl,
		useVariant
	} from '../../composables'

	import { DENSITY, EASING, KEYBOARD_VALUES, MDI_ICONS, PROGRESS_TYPE, VARIANT_INPUT } from '../../enums'

	import type { IFieldEmits, IFieldProps, IFieldSlots } from '../../interfaces'

	import type { TOrigamLabel } from "../../types"

	import { animate, convertToUnit, getUid, nullifyTransforms } from '../../utils'

	const _props = withDefaults(defineProps<IFieldProps>(), {
		variant: VARIANT_INPUT.OUTLINED,
		density: DENSITY.DEFAULT,
		centerAffix: true,
		clearIcon: MDI_ICONS.CLOSE_CIRCLE_OUTLINE
	})
	const props = useDefaults(_props)

	defineEmits<IFieldEmits>()

	defineSlots<IFieldSlots>()
	const slots = useSlots()

	const attrs = useAttrs()

	/*********************************************************
	 * Adjacent
	 *
	 * @description
	 *
	 ********************************************************/
	const {
		hasAppendInner,
		onClickAppendInner: handleClickAppendInner,
		onClickPrependInner: handleClickPrependInner,
		clickClear: handleClickClear,
		hasPrependInner,
		hasClear
	} = useAdjacentInner(props)

	/*********************************************************
	 * Input
	 *
	 * @description
	 *
	 ********************************************************/
	const uid = getUid()
	const id = computed(() => props.id || `input-${uid}`)
	const messagesId = computed(() => `${id.value}-messages`)

	/*********************************************************
	 * Events
	 *
	 * @description
	 *
	 ********************************************************/
	const handleClick = (e: MouseEvent) => {
		if (e.target !== document.activeElement) {
			e.preventDefault()
		}
	}
	const handleKeydownClear = (e: KeyboardEvent) => {
		if (e.key !== KEYBOARD_VALUES.ENTER && e.key !== ' ') return

		e.preventDefault()
		e.stopPropagation()

		handleClickClear(new MouseEvent('click'))
	}
	const handleMousedownClear = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		handleClickClear(e)
	}

	/*********************************************************
	 * Slot Props
	 *
	 * @description
	 *
	 ********************************************************/
	const controlRef = ref<HTMLElement>()

	const slotProps = computed(() => {
		return {
			class: 'origam-field__input',
			id: id.value,
			'aria-describedby': messagesId.value,
			isActive: isActive.value,
			isFocused: isFocused.value,
			ref: controlRef.value,
			onBlur: handleBlur,
			onFocus: handleFocus
		}
	})

	/*********************************************************
	 * Label
	 *
	 * @description
	 *
	 ********************************************************/
	const origamLabelRef = ref<TOrigamLabel>()

	const hasLabel = computed(() => {
		return !props.singleLine && !!(props.label || slots.label)
	})
	const labelProps = computed(() => {
		const defaultLabelProps = origamLabelRef.value?.filterProps(props, ['text', 'class', 'style'])

		return {
			class: ['origam-field__label'],
			for: id.value,
			text: props.label,
			...defaultLabelProps
		}
	})

	/*********************************************************
	 * Floating Label
	 *
	 * @description
	 *
	 ********************************************************/
	const origamFloatingLabelRef = ref<TOrigamLabel>()

	const hasFloatingLabel = computed(() => {
		return !props.singleLine && !!(props.label || slots.floatingLabel)
	})
	const floatingLabelProps = computed(() => {
		const defaultFloatingLabelProps = origamFloatingLabelRef.value?.filterProps(props, ['text', 'class', 'style'])

		return {
			class: ['origam-field__label', 'origam-field__label--floating'],
			for: id.value,
			text: props.label,
			floating: true,
			ref: 'origamFloatingLabelRef',
			...defaultFloatingLabelProps
		}
	})

	/*********************************************************
	 * Loader
	 *
	 * @description
	 *
	 ********************************************************/
	const {loaderClasses, loaderConfig} = useLoader(props, 'line')

	const hasLoader = computed(() => {
		return slots.loader || loaderConfig.value.isActive
	})

	/*********************************************************
	 * Prefix & suffix
	 *
	 * @description
	 *
	 ********************************************************/
	const hasPrefix = computed(() => {
		return !!props.prefix || !!slots.prefix
	})
	const hasSuffix = computed(() => {
		return !!props.suffix || !!slots.suffix
	})

	/*********************************************************
	 * Effect
	 *
	 * @description
	 * isActive is a ref that holds a boolean value indicating whether the field is active.
	 ********************************************************/
	const {focusClasses, isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const {isActive: active, onActive: handleActive} = useActive(props)

	const isActive = computed(() => {
		return props.dirty || active.value || hasPrefix.value || hasSuffix.value
	})

	watch(isFocused, (newVal, oldVal) => {
		if (newVal !== oldVal) {
			handleActive()
		}
	})
	watch(isActive, (newVal, oldVal) => {
		if (hasLabel.value && newVal !== oldVal) {
			const el: HTMLElement = origamLabelRef.value!.$el
			const targetEl: HTMLElement = origamFloatingLabelRef.value!.$el

			requestAnimationFrame(() => {
				const rect = nullifyTransforms(el)
				const targetRect = targetEl.getBoundingClientRect()

				const x = targetRect.x - rect.x
				const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2)

				const targetWidth = targetRect.width / 0.75
				const width = Math.abs(targetWidth - rect.width) > 1
						? {maxWidth: convertToUnit(targetWidth)}
						: undefined

				const style = getComputedStyle(el)
				const targetStyle = getComputedStyle(targetEl)
				const duration = parseFloat(style.transitionDuration) * 1000 || 150
				const scale = parseFloat(targetStyle.getPropertyValue('--origam-field__label---font-size'))
				const color = targetStyle.getPropertyValue('color')

				el.style.visibility = 'visible'
				targetEl.style.visibility = 'hidden'

				animate(el, {
					transform: `translate(${x}px, ${y}px) scale(${scale})`,
					color,
					...width
				}, {
					duration,
					easing: EASING.STANDARD,
					direction: newVal ? 'normal' : 'reverse'
				}).finished.then(() => {
					el.style.removeProperty('visibility')
					targetEl.style.removeProperty('visibility')
				})
			})
		}
	}, {flush: 'post'})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * fieldClasses is a computed property that returns an array of classes for the field element.
	 * fieldStyles is a computed property that returns an array of styles for the field element.
	 ********************************************************/
	const color = computed(() => {
		return isActive.value && isFocused.value && props.activeColor ? props.activeColor : props.color
	})
	const bgColor = computed(() => {
		return isActive.value && isFocused.value && props.activeBgColor ? props.activeBgColor : props.bgColor
	})

	const {colorStyles} = useBothColor(bgColor, color)
	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {elevationClasses, elevationStyles} = useElevation(props)
	const {rtlClasses} = useRtl()
	const {variantClasses} = useVariant(props)

	const fieldStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const fieldClasses = computed(() => {
		return [
			'origam-field',
			{
				'origam-field--active': isActive.value,
				'origam-field--appended': hasAppendInner.value,
				'origam-field--center-affix': props.centerAffix,
				'origam-field--disabled': props.disabled,
				'origam-field--dirty': props.dirty,
				'origam-field--error': props.error,
				'origam-field--flat': props.flat,
				'origam-field--has-background': !!props.bgColor,
				'origam-field--persistent-clear': props.persistentClear,
				'origam-field--prepended': hasPrependInner.value,
				'origam-field--reverse': props.reverse,
				'origam-field--single-line': props.singleLine,
				'origam-field--no-label': !hasLabel.value,
				'origam-text-field--prefixed': props.prefix,
				'origam-text-field--suffixed': props.suffix
			},
			loaderClasses.value,
			rtlClasses.value,
			densityClasses.value,
			focusClasses.value,
			variantClasses.value,
			roundedClasses.value,
			elevationClasses.value,
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Exposes functions and components to the world.
	 *    filterProps is a function that filters out props that are not defined in the `IFieldProps` interface.
	 ********************************************************/
	const {filterProps} = useProps<IFieldProps>(props)

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-field {
		$this: &;

		// Skeleton-mode replacement element. Sized to fill the field's
		// content box so consumer code switching `loading` between values
		// keeps a stable visual footprint.
		&__skeleton {
			width: 100%;
			min-height: var(--origam-field__skeleton---min-height, var(--origam-input__control---height, 56px));
			border-radius: var(--origam-field---rounded);
			grid-column: 1 / -1;
			grid-row: 1;
		}

		display: grid;
		grid-template-areas: "prepend-inner field clear append-inner";
		grid-template-columns: min-content minmax(0, 1fr) min-content min-content;
		font-size: 16px;
		letter-spacing: 0.009375em;
		max-width: 100%;
		border-radius: var(--origam-field---rounded);
		contain: layout;
		flex: 1 0;
		grid-area: control;
		position: relative;
		padding-inline: var(--origam-field---padding-start) var(--origam-field---padding-end);

		.origam-chip {
			--origam-chip---height: 24px;
		}

		:deep(.origam-field__input) {
			align-items: center;
			color: inherit;
			column-gap: 2px;
			display: flex;
			flex-wrap: wrap;
			letter-spacing: 0.009375em;
			opacity: 0.7;
			// `box-sizing: border-box` so the inline padding tokens
			// (24px-top + 6px-bottom by default) are INCLUDED in the
			// 56px min-height target. Pre-fix the default `content-box`
			// stacked padding ON TOP of the height — every text field
			// rendered at 86px (56 + 24 + 6) instead of the 56px Material
			// baseline. User-reported.
			box-sizing: border-box;
			min-height: max(calc(var(--origam-input__control---height, 56px) + var(--origam-input---density, 0px)), 1.5rem + var(--origam-field__input---padding-top) + var(--origam-field__input---padding-bottom));
			min-width: 0;
			padding-inline: var(--origam-field__input---padding-start) var(--origam-field__input---padding-end);
			padding-top: var(--origam-field__input---padding-top);
			padding-bottom: var(--origam-field__input---padding-bottom);
			position: relative;
			width: 100%;
			row-gap: calc(8px - var(--origam-input---density, 0));
			border: none;
			background: transparent;

			&::placeholder {
				color: currentColor;
				opacity: 0;
			}

			&:focus,
			&:active {
				outline: none;

				&::placeholder {
					opacity: 0.5;
				}
			}

			&:invalid {
				box-shadow: none;
			}

			input,
			textarea {
				letter-spacing: inherit;
				border: none;

				&::placeholder {
					color: currentColor;
					opacity: 0.5;
				}

				&:focus,
				&:active {
					outline: none;
				}

				&:invalid {
					box-shadow: none;
				}
			}
		}

		&__prefix,
		&__suffix {
			align-items: center;
			color: currentColor;
			cursor: default;
			display: flex;
			opacity: 0;
			transition: inherit;
			white-space: nowrap;
			min-height: max(56px, 1.5rem + var(--origam-field-input---padding-top, 0px) + var(--origam-field-input---padding-bottom, 0px));
			padding-top: calc(var(--origam-field---padding-top, 4px) + calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density, 0px)));
			padding-bottom: var(--origam-field---padding-bottom, 6px);
		}

		&__prefix {
			padding-inline-start: var(--origam-field---padding-start, 16px);
		}

		&__suffix {
			padding-inline-end: var(--origam-field---padding-end, 16px);
		}

		&__field {
			flex: 1 0;
			grid-area: field;
			position: relative;
			align-items: flex-start;
			display: flex;
		}

		&__prepend-inner {
			grid-area: prepend-inner;
		}

		&__clearable {
			grid-area: clear;
		}

		&__append-inner {
			grid-area: append-inner;
		}

		&__append-inner,
		&__clearable,
		&__prepend-inner {
			display: flex;
			align-items: flex-start;
			padding-top: var(--origam-input---padding-top, 8px);
			padding-inline: var(--origam-field---padding-start) var(--origam-field---padding-end);

			> .origam-icon {
				opacity: 0.7;
			}
		}

		&__clearable {
			cursor: pointer;
			opacity: 0;
			overflow: hidden;
			margin-inline: 4px;
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
			transition-property: opacity, transform, width;
		}

		&__label {
			contain: layout paint;
			display: block;
			margin-inline-start: var(--origam-field__input---padding-start, 0);
			margin-inline-end: var(--origam-field__input---padding-end, 0);
			max-width: calc(100% - var(--origam-field__input---padding-start, 0) - var(--origam-field__input---padding-end, 0));
			pointer-events: none;
			position: absolute;
			top: calc(var(--origam-input---padding-top, 16px) + var(--origam-input---density) - 8px);
			transform-origin: left center;
			transition: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
			transition-property: opacity, transform;
			z-index: 1;

			&--floating {
				font-size: var(--origam-field__label---font-size);
				visibility: hidden;
				max-width: 100%;
				position: static;
			}
		}

		&__outlines {
			align-items: stretch;
			contain: layout;
			display: flex;
			height: 100%;
			left: 0;
			pointer-events: none;
			position: absolute;
			right: 0;
			width: 100%;

			#{$this}__outline {
				&--start {
					flex: 0 0 var(--origam-field---padding-start);
				}

				&--end {
					flex: 1;
				}

				&--notch {
					flex-basis: auto;
					flex-shrink: 0;
					flex-grow: 0;
					position: relative;
					max-width: calc(100% - 24px);
				}
			}
		}

		&--prefixed {
			--origam-field---padding-start: 6px;
		}

		&--suffixed {
			--origam-field---padding-end: 6px;
		}

		&--center-affix {
			#{$this}__append-inner,
			#{$this}__clearable,
			#{$this}__prepend-inner {
				align-items: center;
				padding-top: 0;
			}

			#{$this}__label {
				top: 50%;
				transform: translateY(-50%);

				&--floating {
					transform: none;
					top: calc(var(--origam-input---padding-top, 16px) / 2 + var(--origam-input---density, 0px));
				}
			}
		}

		&--active {
			#{$this}__label {
				visibility: hidden;

				&--floating {
					visibility: unset;
				}
			}

			#{$this}__prefix,
			#{$this}__suffix {
				opacity: 1;
			}
		}

		&--disabled {
			opacity: 0.5;
			pointer-events: none;

			#{$this}__prefix,
			#{$this}__suffix {
				color: currentColor;
			}
		}

		&--prepended {
			--origam-field---padding-start: 6px;
		}

		&--appended {
			--origam-field---padding-end: 6px;
		}

		&--focused {
			#{$this}__append-inner,
			#{$this}__prepend-inner {
				opacity: 1;
			}

			#{$this}__label {
				opacity: 1;
			}
		}

		&--disabled,
		&--error {
			#{$this}__append-inner,
			#{$this}__clearable,
			#{$this}__prepend-inner {
				> .origam-icon {
					opacity: 1;
				}
			}
		}

		&--error {
			&:not(#{$this}--disabled) {
				--origam-field---border-color: var(--origam-field--error---border-color, var(--origam-color-feedback-danger-border));

				#{$this}__append-inner,
				#{$this}__clearable,
				#{$this}__prepend-inner {
					> .origam-icon {
						color: var(--origam-field--error---color, var(--origam-color-feedback-danger-fgSubtle));
					}
				}

				#{$this}__label {
					color: var(--origam-field--error---color, var(--origam-color-feedback-danger-fgSubtle));
				}
			}
		}

		&--focused,
		&--persistent-clear {
			#{$this}__clearable {
				opacity: 1;
			}
		}

		&--no-label,
		&--active {
			input {
				opacity: 1;
			}
		}

		&--single-line {
			input {
				transition: none;
			}
		}

		&--variant {
			&-solo,
			&-solo-filled,
			&-solo-inverted {
				box-shadow: var(--origam-theme---elevation, var(--origam-field--variant-solo---box-shadow, var(--origam-shadow-sm)));
			}

			&-solo,
			&-solo-filled {
				border-color: transparent;
				--origam-field__input---padding-top: 20px;
			}

			&-solo-inverted {
				&#{$this}--focused {
					background: var(--origam-field---background-color);
				}
			}

			&-solo-filled {
				background: var(--origam-field---background-color);
			}

			// ── filled ──────────────────────────────────────────────────────
			// Solid background + bottom border only; no visible outer outline.
			// The background token defaults to a light surface overlay so the
			// field reads as "filled" on any theme background.
			&-filled {
				background: var(--origam-field--variant-filled---background-color, color-mix(in srgb, currentColor 12%, transparent));
				border-radius: var(--origam-field---rounded) var(--origam-field---rounded) 0 0;
				--origam-field__input---padding-top: 20px;

				#{$this}__outlines {
					#{$this}__outline {
						border-bottom: 1px solid var(--origam-field---border-color, currentColor);
						opacity: var(--origam-field--variant-filled---border-opacity, 0.42);
					}
				}

				&:hover,
				&#{$this}--focused {
					#{$this}__outlines {
						#{$this}__outline {
							opacity: 1;
						}
					}
				}

				&#{$this}--error:not(#{$this}--disabled) {
					#{$this}__outlines {
						#{$this}__outline {
							border-bottom-color: var(--origam-field---border-color, var(--origam-color-feedback-danger-border));
						}
					}
				}
			}

			// ── plain ────────────────────────────────────────────────────────
			// No chrome at all: transparent background, no border, no outline.
			// Useful for inline / dense contexts where the surrounding layout
			// provides enough visual affordance.
			&-plain {
				background: transparent;
				--origam-field---border-width: 0px;

				#{$this}__outlines {
					display: none;
				}

				:deep(.origam-field__input) {
					padding-inline: 0;
				}
			}

			&-outlined {
				--origam-field---border-width: 1px;
				--origam-field---border-opacity: .38;
				background: var(--origam-field---background-color, transparent);

				#{$this}__outline {
					border-color: var(--origam-field---border-color, currentColor);
					border-style: solid;
					opacity: var(--origam-field---border-opacity);

					&--start {
						border-top-width: var(--origam-field---border-width);
						border-bottom-width: var(--origam-field---border-width);
						border-inline-start-width: var(--origam-field---border-width);
						border-inline-end-width: 0;
						border-start-start-radius: var(--origam-field---rounded);
						border-start-end-radius: 0;
						border-end-end-radius: 0;
						border-end-start-radius: var(--origam-field---rounded);
					}

					&--end {
						border-top-width: var(--origam-field---border-width);
						border-bottom-width: var(--origam-field---border-width);
						border-inline-end-width: var(--origam-field---border-width);
						border-inline-start-width: 0;
						border-start-start-radius: 0;
						border-start-end-radius: var(--origam-field---rounded);
						border-end-end-radius: var(--origam-field---rounded);
						border-end-start-radius: 0;
					}

					&--notch {
						border-bottom-width: var(--origam-field---border-width);
						border-top-width: var(--origam-field---border-width);
						border-inline-width: 0;
						border-radius: 0;
					}
				}

				#{$this}__label {
					&#{$this}__label--floating {
						transform: translateY(-50%);
						transform-origin: center;
						margin: 0 4px;
					}
				}

				&#{$this}--active,
				&#{$this}--focused {
					#{$this}__outline--notch {
						border-top-width: 0;
					}
				}
			}

			&-underlined {
				--origam-field---border-width: 1px;
				--origam-field---border-opacity: .38;

				#{$this}__outline {
					border-color: var(--origam-field---border-color, currentColor);
					border-style: solid;
					opacity: var(--origam-field---border-opacity);
					transition: opacity .25s cubic-bezier(.4, 0, .2, 1);
					border-width: 0;

					&--start {
						border-bottom-width: var(--origam-field---border-width);
					}

					&--end {
						border-bottom-width: var(--origam-field---border-width);
					}

					&--notch {
						border-bottom-width: var(--origam-field---border-width);
					}
				}

				&:hover,
				&#{$this}--focused {
					--origam-field---border-opacity: 1;
				}
			}
		}

		@media (hover: hover) {
			&:hover {
				#{$this}__clearable {
					opacity: 1;
				}
			}
		}

		@media (hover: none) {
			#{$this}__clearable {
				opacity: 1;
			}
		}

		@media(prefers-reduced-motion: no-preference) {
			#{$this}__label {
				transition: .15s cubic-bezier(.4, 0, .2, 1);
				transition-property: opacity, transform
			}
		}
	}
</style>

