<template>
	<div
			:class="selectionControlClasses"
			:style="selectionControlStyles"
			v-bind="rootAttrs"
	>
		<div
				:style="textColorStyles"
				class="origam-selection-control__wrapper"
		>
			<slot
					name="default"
					v-bind="{ model, textColorStyles, backgroundColorStyles, icon, props: { onFocus: handleFocus, onBlur: handleBlur, id } }"
			/>

			<div
					v-ripple="rippleProp"
					class="origam-selection-control__input"
			>
				<slot
						name="input"
						v-bind="{ model, textColorStyles, backgroundColorStyles, icon, props: { ...inputAttrs, disabled: props.disabled, label: props.label, name: props.name, type: props.type, value: trueValue, onFocus: handleFocus, onBlur: handleBlur, id, onInput: handleInput } }"
				>
					<template v-if="icon">
						<origam-icon
								key="icon"
								:icon="icon"
						/>
					</template>

					<input
							:id="id"
							ref="inputRef"
							:aria-checked="props.type === 'checkbox' ? model : undefined"
							:aria-disabled="props.disabled"
							:aria-label="props.label"
							:checked="model"
							:disabled="props.disabled"
							:name="props.name"
							:type="props.type"
							:value="trueValue"
							v-bind="inputAttrs"
							@blur="handleBlur"
							@focus="handleFocus"
							@input="handleInput"
					/>
				</slot>
			</div>
		</div>

		<div class="origam-selection-control__label">
			<slot name="label">
				<origam-label
						:for="id"
						:required="required"
						:text="label"
						@click="handleClickLabel"
				/>
			</slot>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, nextTick, ref, shallowRef, StyleValue, useAttrs } from 'vue'
	import { OrigamIcon, OrigamLabel } from '../../components'

	import { useDefaults, useProps, useSelectionControl } from '../../composables'

	import { vRipple } from '../../directives'

	import type { ISelectionControlEmits, ISelectionControlProps, ISelectionControlSlots } from "../../interfaces"

	import { filterInputAttrs, forwardRefs, getUid, matchesSelector } from '../../utils'

	const _props = withDefaults(defineProps<ISelectionControlProps>(), {})

	// Resolve props against the closest `provideDefaults({ 'origam-selection-control': … })`
	// injected by a parent `OrigamSelectionControlGroup`.
	const props = useDefaults(_props)

	const emits = defineEmits<ISelectionControlEmits>()

	defineSlots<ISelectionControlSlots>()

	const {filterProps} = useProps<ISelectionControlProps>(props)

	const inputRef = ref<HTMLInputElement>()

	const attrs = useAttrs()

	const {
		group,
		densityClasses,
		icon,
		model,
		textColorStyles,
		backgroundColorStyles,
		trueValue
	} = useSelectionControl(props)

	const uid = getUid()
	const isFocused = shallowRef(false)
	const isFocusVisible = shallowRef(false)
	const id = computed(() => props.id || `input-${uid}`)
	const isInteractive = computed(() => {
		return !props.disabled && !props.readonly
	})

	group?.onForceUpdate(() => {
		if (inputRef.value) {
			inputRef.value.checked = model.value
		}
	})

	const handleFocus = (e: FocusEvent) => {
		if (!isInteractive.value) return

		isFocused.value = true
		if (matchesSelector(e.target as HTMLElement, ':focus-visible') !== false) {
			isFocusVisible.value = true
		}
	}
	const handleBlur = () => {
		isFocused.value = false
		isFocusVisible.value = false
	}
	const handleClickLabel = (e: MouseEvent) => {
		emits('click:label', e)
	}
	const handleInput = (e: Event) => {
		if (!isInteractive.value) return

		if (props.readonly && group) {
			nextTick(() => group.forceUpdate())
		}
		model.value = (e.target as HTMLInputElement).checked
	}

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)

	const rippleProp = computed(() => {
		if (props.ripple) {
			return [!props.disabled && !props.readonly, null, ['center', 'circle']]
		}

		return [false, null, ['center', 'circle']]
	})

	// CLASS & STYLES

	// Strict color/bgColor channel separation:
	//   • `color` (foreground)    → applied on the SC root so the
	//     LABEL inherits it via `currentColor` (label sits on the
	//     root, not under the wrapper).
	//   • `bgColor` (background)  → forwarded to the consuming
	//     component via the slot scope (`backgroundColorStyles`); the
	//     track / thumb / input element decides where to apply it.
	//
	// Pre-fix `backgroundColorStyles.value` was added to the SC
	// ROOT styles, which painted the ENTIRE selection-control box
	// (label + wrapper + input area) with the consumer's bgColor.
	// Reported by the user — "il y a toujours un fond vert sur tout
	// l'element".
	const selectionControlStyles = computed(() => {
		return [
			textColorStyles.value,
			props.style
		] as StyleValue
	})
	const selectionControlClasses = computed(() => {
		return [
			'origam-selection-control',
			{
				'origam-selection-control--dirty': model.value,
				'origam-selection-control--disabled': props.disabled,
				'origam-selection-control--error': props.error,
				'origam-selection-control--focused': isFocused.value,
				'origam-selection-control--focus-visible': isFocusVisible.value,
				'origam-selection-control--inline': props.inline
			},
			densityClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, inputRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-selection-control {
		$this: &;

		align-items: center;
		contain: layout;
		display: flex;
		flex: 1 0;
		grid-area: control;
		position: relative;
		user-select: none;

		.origam-label {
			white-space: normal;
			word-break: break-word;
			height: 100%;
		}

		&__wrapper {
			width: calc(40px + 1.5 * var(--origam-selection-control--density));
			height: calc(40px + 1.5 * var(--origam-selection-control--density));
			display: inline-flex;
			align-items: center;
			position: relative;
			justify-content: center;
			flex: none;
		}

		&__input {
			width: calc(40px + 1.5 * var(--origam-selection-control--density));
			height: calc(40px + 1.5 * var(--origam-selection-control--density));
			align-items: center;
			display: flex;
			flex: none;
			justify-content: center;
			position: relative;
			border-radius: 50%;

			> .origam-icon {
				opacity: 0.7;
			}

			:deep(input) {
				cursor: pointer;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}

			&:before {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 100%;
				background-color: currentColor;
				opacity: 0;
				pointer-events: none;
			}

			&:hover {
				&:before {
					opacity: 0.04;
				}
			}
		}

		&--disabled,
		&--dirty,
		&--error {
			#{$this}__input {
				> .origam-icon {
					opacity: 1;
				}
			}
		}

		&--error,
		&--disabled {
			.origam-label {
				opacity: 1;
			}
		}

		&--disabled {
			opacity: 0.5;
			pointer-events: none;
		}

		&--error {
			:not(#{$this}--disabled) {
				.origam-label {
					/* --origam-selection-control__label---color-error: {color.feedback.danger.fgSubtle} (fallback: var(--origam-color-feedback-danger-fgSubtle)) */
					color: var(--origam-selection-control__label---color-error, var(--origam-color-feedback-danger-fgSubtle, #B91C1C));
				}

				#{$this}__input {
					> .origam-icon {
						/* --origam-selection-control__icon---color-error: {color.feedback.danger.fgSubtle} */
						color: var(--origam-selection-control__icon---color-error, var(--origam-color-feedback-danger-fgSubtle, #B91C1C));
					}
				}
			}
		}

		&--inline {
			display: inline-flex;
			flex: 0 0 auto;
			min-width: 0;
			max-width: 100%;

			.origam-label {
				width: auto;
			}
		}

		&--focus-visible {
			#{$this}__input {
				&:before {
					opacity: calc(0.12 * 1);
				}
			}
		}

		&--density-default {
			--origam-selection-control--density: 0px;
		}

		&--density-compact {
			--origam-selection-control--density: -8px;
		}
	}
</style>

