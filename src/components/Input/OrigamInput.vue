<template>
	<div
			:class="inputClasses"
			:style="inputStyles"
	>
    <span
		    v-if="hasPrepend"
		    key="prepend"
		    class="origam-input__prepend"
		    @click="handleClickPrepend"
    >
      <slot name="prepend">
        <origam-avatar
		        v-if="prependAvatar"
		        key="prepend-avatar"
		        :density="density"
		        :image="prependAvatar"
        />
        <origam-icon
		        v-if="prependIcon"
		        key="prepend-icon"
		        :density="density"
		        :icon="prependIcon"
        />
      </slot>
    </span>

		<div
				:class="inputControlClasses"
				:style="inputControlStyles"
		>
			<slot
					name="default"
					v-bind="inputProps"
			/>
		</div>

		<span
				v-if="hasAppend"
				key="append"
				class="origam-input__append"
				@click="handleClickAppend"
		>
      <slot name="append">
       <origam-avatar
		       v-if="appendAvatar"
		       key="append-avatar"
		       :density="density"
		       :image="appendAvatar"
       />
       <origam-icon
		       v-if="appendIcon"
		       key="append-icon"
		       :density="density"
		       :icon="appendIcon"
       />
     </slot>
    </span>

		<div
				v-if="hasDetails"
				class="origam-input__details"
		>
			<slot
					name="messages"
					v-bind="{hasMessages, messages}"
			>
				<origam-messages
						:id="messagesId"
						:active="hasMessages"
						:messages="messages"
				>
					<template
							v-if="slots.message"
							#default="{message}"
					>
						<slot
								name="message"
								v-bind="{message}"
						/>
					</template>
				</origam-messages>
			</slot>

			<slot
					name="details"
					v-bind="inputProps"
			/>
		</div>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useAttrs, useSlots } from 'vue'
	import { OrigamAvatar, OrigamIcon } from '../../components'
	import { OrigamMessages } from '../../components/Messages'

	import {
		useAdjacent,
		useBothColor,
		useDefaults,
		useDensity,
		useDimension,
		useProps,
		useRtl,
		useValidation
	} from '../../composables'

	import { DENSITY, DIRECTION } from '../../enums'

	import type { IInputEmits, IInputProps, IInputSlots } from '../../interfaces'

	import { getUid, wrapInArray } from '../../utils'

	const _props = withDefaults(defineProps<IInputProps>(), {
		direction: DIRECTION.HORIZONTAL,
		centerAffix: true,
		density: DENSITY.DEFAULT
	})
	const props = useDefaults(_props)

	const emits = defineEmits<IInputEmits>()

	defineSlots<IInputSlots>()
	const slots = useSlots()

	const attrs = useAttrs()

	const uid = getUid()
	const id = computed(() => {
		return props.id || `input-${uid}`
	})
	const messagesId = computed(() => {
		return `${id.value}-messages`
	})

	const {
		errorMessages,
		isDirty,
		isDisabled,
		isReadonly,
		isPristine,
		isValid,
		isValidating,
		reset,
		resetValidation,
		validate,
		validationClasses
	} = useValidation(props, 'origam-input', id)

	const {
		hasPrepend,
		hasAppend,
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const messages = computed(() => {
		if (props.errorMessages?.length || (!isPristine.value && errorMessages.value.length)) {
			return errorMessages.value
		} else if (props.hint && (props.persistentHint || props.focused)) {
			return wrapInArray(props.hint)
		}

		return wrapInArray(props.messages ?? [])
	})

	const inputProps = computed(() => {
		return {
			id: id.value,
			messagesId: messagesId.value,
			isDirty: isDirty.value,
			isDisabled: isDisabled.value,
			isReadonly: isReadonly.value,
			isPristine: isPristine.value,
			isValid: isValid.value,
			isValidating: isValidating.value,
			reset,
			resetValidation,
			validate
		}
	})

	const hasMessages = computed(() => {
		return messages.value.length > 0
	})
	const hasDetails = computed(() => {
		return !props.hideDetails || (
				props.hideDetails === 'auto' &&
				(hasMessages.value || slots.details)
		)
	})

	// CLASS & STYLES

	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {colorStyles} = useBothColor(toRef(props.bgColor), toRef(props.color))
	const {rtlClasses} = useRtl()

	const inputStyles = computed(() => {
		return [
			dimensionStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const inputClasses = computed(() => {
		return [
			'origam-input',
			`origam-input--${props.direction}`,
			{
				'origam-input--center-affix': props.centerAffix,
				'origam-input--hide-spin-buttons': props.hideSpinButtons
			},
			densityClasses.value,
			validationClasses.value,
			rtlClasses.value,
			props.class
		]
	})
	const inputControlClasses = computed(() => {
		return [
			'origam-input__control'
		]
	})

	// EXPOSE

	const {filterProps} = useProps<IInputProps>(props)

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-input {
		$this: &;

		display: grid;
		flex: 1 1 auto;
		font-size: var(--origam-input---font-size, 1rem);
		font-weight: var(--origam-input---font-weight, 400);
		line-height: var(--origam-input---line-height, 1.5);

		--origam-input---padding-top: 16px;
		--origam-input__control---height: 56px;

		&__details {
			align-items: flex-end;
			display: flex;
			font-size: 0.75rem;
			font-weight: 400;
			grid-area: messages;
			letter-spacing: 0.0333333333em;
			line-height: 1;;
			min-height: 22px;
			padding-top: 6px;
			overflow: hidden;
			justify-content: space-between;
		}

		&__details,
		&__prepend,
		&__append {
			> .origam-icon {
				opacity: var(--origam-input---icon-opacity, 0.7);
			}
		}

		&__prepend,
		&__append {
			display: flex;
			align-items: flex-start;
			padding-top: 8px;
		}

		&__prepend {
			grid-area: prepend;
		}

		&__append {
			grid-area: append;
		}

		&__control {
			display: flex;
			grid-area: control;
		}

		&--disabled {
			pointer-events: none;
		}

		&--density-default {
			--origam-input---density: 0px;
		}

		&--density-compact {
			--origam-input---density: -8px;
		}

		&--vertical {
			grid-template-areas: "append" "control" "prepend";
			grid-template-rows: max-content auto max-content;
			grid-template-columns: min-content;

			#{$this}__prepend {
				margin-block-start: 16px;
			}

			#{$this}__append {
				margin-block-end: 16px;
			}
		}

		&--horizontal {
			grid-template-areas: "prepend control append" "a messages b";
			grid-template-columns: max-content minmax(0, 1fr) max-content;
			grid-template-rows: auto auto;

			#{$this}__prepend {
				margin-inline-end: 16px;
			}

			#{$this}__append {
				margin-inline-start: 16px;
			}
		}

		&--disabled,
		&--error {
			#{$this}__details {
				> .origam-messages {
					opacity: 1;
				}
			}

			#{$this}__details,
			#{$this}__prepend,
			#{$this}__append {
				> .origam-icon {
					opacity: 1;
				}
			}
		}

		&--disabled {
			#{$this}__details,
			#{$this}__prepend,
			#{$this}__append {
				opacity: var(--origam-input---disabled-opacity, 0.5);
			}
		}

		&--error {
			&:not(#{$this}--disabled) {
				#{$this}__details {
					> .origam-messages {
						color: var(--origam-input---error-color, var(--origam-color-feedback-danger-fg-subtle));
					}
				}

				#{$this}__details,
				#{$this}__prepend,
				#{$this}__append {
					> .origam-icon {
						color: var(--origam-input---error-color, var(--origam-color-feedback-danger-fg-subtle));
					}
				}
			}
		}

		&--center-affix {
			#{$this}__prepend,
			#{$this}__append {
				align-items: center;
				padding-top: 0;
			}
		}

		&--hide-spin-buttons {
			:deep(input) {
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}

				&[type=number] {
					-moz-appearance: textfield;
				}
			}
		}
	}
</style>

