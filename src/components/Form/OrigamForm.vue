<template>
	<form
			ref="formRef"
			:class="formClasses"
			:style="formStyles"
			novalidate
			@reset="handleReset"
			@submit="handleSubmit"
	>
		<div class="origam-form__content">
			<slot
					name="default"
					v-bind="form"
			/>
		</div>

		<div
				v-if="hasMessages"
				class="origam-form__details"
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
		</div>

		<div
				v-if="slots.actions"
				class="origam-form__actions"
		>
			<slot
					name="actions"
					v-bind="{submit: () => handleSubmit, reset: () => handleReset}"
			/>
		</div>
	</form>
</template>

<script
		lang="ts"
		setup
>
	import { computed, nextTick, ref, StyleValue, useAttrs, useSlots } from 'vue'
	import { OrigamMessages } from '../../components'

	import { useDefaults, useForm, useMessage, useProps, useValidation } from '../../composables'

	import type { IFormEmits, IFormProps, IFormSlots, ISubmitEventPromise } from '../../interfaces'

	import { forwardRefs, getUid } from '../../utils'

	const _props = withDefaults(defineProps<IFormProps>(), {})
	const props = useDefaults(_props)

	const emits = defineEmits<IFormEmits>()

	defineSlots<IFormSlots>()
	const slots = useSlots()

	const attrs = useAttrs()

	const {filterProps} = useProps<IFormProps>(props)

	/*********************************************************
	 * Reset & Submit
	 *
	 * @description
	 *
	 ********************************************************/
	const form = useForm(props)
	const formRef = ref<HTMLFormElement>()

	/*********************************************************
	 * Validation globale (form-level)
	 *
	 * @description
	 * useValidation gère les règles et errorMessages au niveau
	 * du formulaire, et s'enregistre auprès d'un éventuel
	 * formulaire parent (nested forms).
	 ********************************************************/
	const {
		errorMessages,
		isValid: formIsValid,
		validate: validateFormRules,
		reset: resetFormValidation,
		validationClasses
	} = useValidation(props as any)

	/*********************************************************
	 * Messages globaux
	 *
	 * @description
	 * Seules les erreurs des règles du formulaire lui-même
	 * (props.rules, props.errorMessages) sont affichées ici.
	 * Les erreurs des champs enfants sont affichées sur les champs.
	 ********************************************************/
	const messagesId = `origam-form-messages-${ getUid() }`

	const { hasMessages, messages } = useMessage(props, errorMessages)

	/*********************************************************
	 * Event
	 *
	 * @description
	 *
	 ********************************************************/
	const scrollToFirstError = async (options?: boolean | ScrollIntoViewOptions) => {
		await nextTick()

		const el = formRef.value?.querySelector('.origam-input--error') as HTMLElement | null

		if (!el) return

		const scrollOptions = typeof options === 'object'
			? options
			: { behavior: 'smooth' as const, block: 'center' as const }

		el.scrollIntoView(scrollOptions)
	}

	const handleReset = (e: Event) => {
		e.preventDefault()
		form.reset()
		resetFormValidation()
	}

	const handleSubmit = (_e: Event) => {
		const e = _e as ISubmitEventPromise

		const ready = Promise.all([form.validate(), validateFormRules()])
				.then(([childResult]) => ({
					valid: childResult.valid && formIsValid.value !== false,
					errors: childResult.errors
				}))

		e.then = ready.then.bind(ready)
		e.catch = ready.catch.bind(ready)
		e.finally = ready.finally.bind(ready)

		emits('submit', e)

		if (!e.defaultPrevented) {
			ready.then(({ valid }) => {
				if (valid) {
					formRef.value?.submit()
				}
			})
		}

		ready.then(({ valid }) => {
			if (!valid && props.scrollToError) {
				scrollToFirstError(props.scrollToError)
			}
		})

		e.preventDefault()
	}

	// CLASSES & STYLES

	const formStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const formClasses = computed(() => {
		return [
			'origam-form',
			validationClasses.value,
			props.class
		]
	})

	defineExpose(forwardRefs({ filterProps, ...form, errorMessages, formIsValid, scrollToFirstError }, formRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-form {
		$this: &;

		&__actions {
			margin-top: 16px;
			display: flex;
			gap: 8px;
		}

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

			> .origam-icon {
				opacity: 0.7;
			}
		}

		&--error {
			#{$this}__details {
				> .origam-messages {
					opacity: 1;
					color: rgba(255, 0, 0, 1);
				}
			}

			#{$this}__details {
				> .origam-icon {
					opacity: 1;
					color: rgba(255, 0, 0, 1);
				}
			}
		}
	}
</style>
