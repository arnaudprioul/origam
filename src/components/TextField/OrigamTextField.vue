<template>
	<origam-input
			ref="origamInputRef"
			v-model="model"
			:class="textFieldClasses"
			:focused="isFocused"
			:style="textFieldStyles"
			v-bind="{...rootAttrs, ...inputProps, rules: enrichedRules}"
			@click:prepend="handleClickPrepend"
			@click:append="handleClickAppend"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id, isDisabled, isDirty, isValid, isReadonly}">
			<slot
					name="field"
					v-bind="{id, isDisabled, isDirty, isValid, isReadonly}"
			>
				<origam-field
						:id="id"
						ref="origamFieldRef"
						:active="isActive || isDirty"
						:dirty="isDirty || props.dirty"
						:disabled="isDisabled"
						:error="isValid === false"
						:focused="isFocused"
						:role="props.role"
						v-bind="{...fieldProps}"
						@click="handleControlClick"
						@mousedown="handleControlMousedown"
						@click:clear="handleClear"
						@click:prepend-inner="handleClickPrependInner"
						@click:append-inner="handleClickAppendInner"
				>
					<template
							v-if="slots.loader"
							#loader
					>
						<slot name="loader"/>
					</template>

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

					<template #default="{class: fieldSlotClass, ref, ...fieldSlotProps}">
						<div
								:class="fieldSlotClass"
								data-no-activator=""
						>
							<slot
									name="default"
									v-bind="{ref, ...fieldSlotProps}"
							/>
							<input
									ref="inputRef"
									v-intersect="intersect"
									:autofocus="props.autofocus"
									:disabled="isDisabled"
									:name="props.name"
									:placeholder="props.placeholder"
									:readonly="isReadonly"
									:size="1"
									:type="props.type"
									:value="model"
									v-bind="{ ...fieldSlotProps, ...inputAttrs }"
									@blur="handleBlur"
									@focus="handleFocus"
									@input="handleInput"
							>
						</div>
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
			</slot>
		</template>

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="hasDetails"
				#details="detailsSlotProps"
		>
			<slot
					name="details"
					v-bind="detailsSlotProps"
			>
				<origam-counter
						:active="props.persistentCounter || isFocused"
						:disabled="props.disabled"
						:max="max"
						:value="counterValue"
				>
					<template
							v-if="slots.counter"
							#default="{counter, value, max}"
					>
						<slot
								name="counter"
								v-bind="{counter, value, max}"
						/>
					</template>
				</origam-counter>
			</slot>
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
	import { computed, nextTick, ref, toRef, StyleValue, useAttrs, useSlots } from 'vue'
	import { OrigamCounter, OrigamField, OrigamInput } from '../../components'

	import { useAdjacent, useAdjacentInner, useDefaults, useFocus, useLocale, useProps, useVModel } from '../../composables'

	import { ACTIVE_TEXT_FIELD_TYPE, INPUT_TEXT_FIELD_TYPE } from '../../consts'

	import { vIntersect } from '../../directives'

	import { DENSITY, DIRECTION, MDI_ICONS, TEXT_FIELD_TYPE } from '../../enums'

	import type { ITextFieldEmits, ITextFieldProps, ITextFieldSlots } from '../../interfaces'

	import type { TOrigamField, TOrigamInput } from "../../types"

	import { filterInputAttrs, forwardRefs } from '../../utils'

	const _props = withDefaults(defineProps<ITextFieldProps>(), {
		type: TEXT_FIELD_TYPE.TEXT,
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		clearIcon: MDI_ICONS.CLOSE_CIRCLE_OUTLINE,
		rounded: true
	})
	const props = useDefaults(_props)

	const emits = defineEmits<ITextFieldEmits>()

	defineSlots<ITextFieldSlots>()
	const slots = useSlots()

	const attrs = useAttrs()

	const {t} = useLocale()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus, onBlur: handleBlur} = useFocus(props)
	const {
		onClickPrependInner: handleClickPrependInner,
		onClickAppendInner: handleClickAppendInner
	} = useAdjacentInner(props)
	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const counterValue = computed(() => {
		if (typeof props.counterValue === 'function') {
			return props.counterValue(model.value)
		}

		if (props.counterValue) {
			return props.counterValue
		}

		return (model.value ?? '').toString().length
	})
	const max = computed(() => {
		if (attrs.maxlength) return attrs.maxlength as unknown as undefined

		if (!props.counter || (typeof props.counter !== 'number' && typeof props.counter !== 'string')) {
			return undefined
		}

		return props.counter
	})

	const intersect = computed(() => {
		return [{
			handler: handleIntersect
		}, null, ['once']]
	})
	const handleIntersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[]) => {
		if (!props.autofocus || !isIntersecting) return

		(entries[0].target as HTMLInputElement)?.focus?.()
	}

	const origamInputRef = ref<TOrigamInput>()
	const origamFieldRef = ref<TOrigamField>()
	const inputRef = ref<HTMLInputElement>()

	const isActive = computed(() => {
		return ACTIVE_TEXT_FIELD_TYPE.includes(props.type) || props.persistentPlaceholder || isFocused.value || props.active
	})

	const handleFocus = () => {
		nextTick(() => {
			const input: HTMLInputElement | undefined = inputRef.value

			if (input && input !== document.activeElement) {
				input.focus()
			}
		})

		if (!isFocused.value) onFocus()
	}
	const handleControlMousedown = (e: MouseEvent) => {
		emits('mousedown:control', e)

		if (e.target === inputRef.value) return

		handleFocus()
		e.preventDefault()
	}
	const handleControlClick = (e: MouseEvent) => {
		handleFocus()

		emits('click:control', e)
	}
	const handleClear = (e: MouseEvent) => {
		e.stopPropagation()

		handleFocus()

		nextTick(() => {
			model.value = null

			emits('click:clear', e)
		})
	}
	const handleInput = (e: Event) => {
		const el = e.target as HTMLInputElement

		model.value = el.value

		if (typeof props.modelModifiers === 'string' && INPUT_TEXT_FIELD_TYPE.includes(props.type)) {
			const caretPosition = [el.selectionStart, el.selectionEnd]

			nextTick(() => {
				el.selectionStart = caretPosition[0]
				el.selectionEnd = caretPosition[1]
			})
		}
	}

	const hasCounter = computed(() => {
		return slots.counter || (props.counter !== false && props.counter != null)
	})
	const hasDetails = computed(() => {
		return hasCounter.value || slots.details
	})

	const enrichedRules = computed(() => {
		const base = Array.isArray(props.rules) ? [...props.rules] : []

		if (props.counter && typeof props.counter === 'number') {
			const limit = props.counter
			base.push((v: string) => !v || v.length <= limit || t('origam.validation.max_length', [limit]))
		}

		return base
	})

	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const fieldProps = computed(() => {
		return origamFieldRef.value?.filterProps(props, ['class', 'id', 'active', 'dirty', 'disabled', 'focused', 'error', 'style'])
	})

	// CLASS & STYLES

	const textFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const textFieldClasses = computed(() => {
		return [
			'origam-text-field',
			props.class
		]
	})

	defineExpose(forwardRefs({filterProps}, origamInputRef, origamFieldRef, inputRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-text-field {
		$this: &;

		input {
			color: inherit;
			opacity: 0;
			flex: 1;
			transition: 0.15s opacity cubic-bezier(0.4, 0, 0.2, 1);
			min-width: 0;

			&:focus,
			&:active {
				outline: none;
			}

			&:invalid {
				box-shadow: none;
			}
		}

		&__details {
			padding-inline: var(--origam-text-field__details---padding-inline, 16px);
		}

		:deep(.origam-field) {
			&.origam-field--no-label,
			&.origam-field--active {
				input {
					opacity: 1;
				}
			}

			input {
				border: none;
				background: transparent;
			}
		}
	}
</style>

