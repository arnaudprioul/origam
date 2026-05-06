<template>
	<origam-input
			ref="origamInputRef"
			v-model:model-value="model"
			:class="passwordFieldClasses"
			:focused="isFocused"
			:style="passwordFieldStyles"
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
							<origam-menu
									ref="origamMenuRef"
									:model-value="showRequirements"
									persistent
									:target="origamInputRef"
									content-class="origam-password-field__info"
									v-bind="resolvedMenuProps"
							>
								<slot
										name="info"
										v-bind="{infos}"
								>
									<origam-row dense>
										<origam-col
												v-for="info in infos"
												:key="info.key"
										>
											<origam-sheet
													:class="{'origam-password-field__item--valid': isChecked(info.key)}"
													class="origam-password-field__item"
													:color="isChecked(info.key) ? 'success' : 'default'"
													rounded="12px"
											>
												<div class="origam-password-field__validate">
													<origam-icon
															:color="isChecked(info.key) ? 'success' : 'accent'"
															:icon="isChecked(info.key) ? MDI_ICONS.CHECK_CIRCLE_OUTLINE : MDI_ICONS.CLOSE_CIRCLE_OUTLINE"
													/>
												</div>
												<div
														v-if="info.icon"
														class="origam-password-field__icon"
												>
													{{ info.icon }}
												</div>
											</origam-sheet>
										</origam-col>
									</origam-row>
								</slot>
							</origam-menu>
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
									:type="currentType"
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

					<template #appendInner>
						<div
								class="origam-password-field__toggle-icon"
								@mousedown="handleToggleShow"
						>
							<slot
									name="appendInner"
									v-bind="{icon: currentIcon}"
							>
								<origam-icon :icon="currentIcon"/>
							</slot>
						</div>
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
							#default="{counter, max, value}"
					>
						<slot
								name="counter"
								v-bind="{counter, max, value}"
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
	import { computed, nextTick, ref, StyleValue, useAttrs, useSlots } from 'vue'

	import {
		OrigamCol,
		OrigamCounter,
		OrigamField,
		OrigamIcon,
		OrigamInput,
		OrigamMenu,
		OrigamRow,
		OrigamSheet
	} from '../../components'

	import {
		useAdjacent,
		useAdjacentInner,
		useDefaults,
		useFocus,
		useLocale,
		useProps,
		useVModel
	} from '../../composables'
	import {
		REQUIREMENT_MIN_LENGTH,
		REQUIREMENT_NUMBER,
		REQUIREMENT_SPECIAL,
		REQUIREMENT_TINY,
		REQUIREMENT_UPPERCASE
	} from '../../consts'
	import { vIntersect } from '../../directives'
	import { DENSITY, DIRECTION, MDI_ICONS, TEXT_FIELD_TYPE } from '../../enums'
	import type { IPasswordFieldEmits, IPasswordFieldProps, IPasswordFieldSlots } from '../../interfaces'
	import type { TOrigamField, TOrigamInput, TOrigamMenu } from '../../types'
	import { filterInputAttrs, forwardRefs } from '../../utils'

	/*********************************************************
	 * Global
	 *
	 * `<OrigamPasswordField>` is a TextField specialised for password
	 * entry. Beyond the parent's text affordances, it adds:
	 *   - Show/hide toggle on the appendInner icon.
	 *   - Strength-requirements popup driven by `requirements` + the
	 *     `need*` flags + `minLength`. The popup auto-opens on focus
	 *     (or stays open when `persistentRequirements`).
	 *   - Each enabled requirement is auto-injected as a validation rule
	 *     so consumers don't have to repeat the regex in their `rules`.
	 ********************************************************/
	const _props = withDefaults(defineProps<IPasswordFieldProps>(), {
		minLength: 8,
		eager: true,
		offIcon: MDI_ICONS.EYE_OFF,
		onIcon: MDI_ICONS.EYE_OUTLINE,
		menuProps: () => ({
			closeDelay: 250,
			closeOnContentClick: true,
			locationStrategy: 'connected',
			location: 'bottom left',
			openDelay: 300,
			scrim: false,
			scrollStrategy: 'reposition'
		}),
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		rounded: true
	})
	const props = useDefaults(_props)

	const emits = defineEmits<IPasswordFieldEmits>()

	defineSlots<IPasswordFieldSlots>()
	const slots = useSlots()

	const attrs = useAttrs()

	const {t} = useLocale()

	const model = useVModel(props, 'modelValue')

	/*********************************************************
	 * Adjacent (outer + inner)
	 ********************************************************/
	const {
		onClickPrependInner: handleClickPrependInner,
		onClickAppendInner: handleClickAppendInner
	} = useAdjacentInner(props)
	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend
	} = useAdjacent(props)

	/*********************************************************
	 * Intersect — focuses the input on first scroll-into-view when
	 * `autofocus` is set. Avoids stealing focus from off-screen forms.
	 ********************************************************/
	const handleIntersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[]) => {
		if (!props.autofocus || !isIntersecting) return

		;(entries[0].target as HTMLInputElement)?.focus?.()
	}
	const intersect = computed(() => {
		return [{handler: handleIntersect}, null, ['once']]
	})

	/*********************************************************
	 * Refs
	 ********************************************************/
	const origamInputRef = ref<TOrigamInput>()
	const origamFieldRef = ref<TOrigamField>()
	const origamMenuRef = ref<TOrigamMenu>()
	const inputRef = ref<HTMLInputElement>()

	/*********************************************************
	 * Focus / control events
	 ********************************************************/
	const {isFocused, onFocus, onBlur: handleBlur} = useFocus(props)
	const isActive = computed(() => {
		return props.persistentPlaceholder || isFocused.value || props.active
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
	}

	/*********************************************************
	 * Counter & details
	 ********************************************************/
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
		if (props.maxlength) return props.maxlength as unknown as undefined

		if (!props.counter || (typeof props.counter !== 'number' && typeof props.counter !== 'string')) {
			return undefined
		}

		return props.counter
	})
	const hasCounter = computed(() => {
		return slots.counter || (props.counter !== false && props.counter != null)
	})
	const hasDetails = computed(() => {
		return hasCounter.value || slots.details
	})

	/*********************************************************
	 * Requirements popup
	 *
	 * `infos` is the live map of enabled requirements (keyed by
	 * `info.key` so the menu and validation rule both see the same
	 * descriptor). `showRequirements` gates the popup visibility.
	 * `isChecked` evaluates each rule against the current value.
	 ********************************************************/
	const infos = computed(() => {
		const localeInfos: { [key: string]: any } = {
			minLength: REQUIREMENT_MIN_LENGTH(props.minLength)
		}

		if (props.needTiny) localeInfos.tiny = REQUIREMENT_TINY
		if (props.needUppercase) localeInfos.uppercase = REQUIREMENT_UPPERCASE
		if (props.needNumber) localeInfos.number = REQUIREMENT_NUMBER
		if (props.needSpecial) localeInfos.special = REQUIREMENT_SPECIAL

		return localeInfos
	})
	const showRequirements = computed(() => {
		if (!props.requirements) return false

		return isFocused.value || props.persistentRequirements
	})

	const isChecked = (key: string) => {
		return infos.value[key]?.reg.test(model.value)
	}

	/*********************************************************
	 * Show / hide toggle
	 ********************************************************/
	const show = ref(false)
	const currentIcon = computed(() => {
		return show.value ? props.offIcon : props.onIcon
	})
	const currentType = computed(() => {
		return show.value ? TEXT_FIELD_TYPE.TEXT : TEXT_FIELD_TYPE.PASSWORD
	})
	const handleToggleShow = () => {
		show.value = !show.value
	}

	/*********************************************************
	 * Validation
	 *
	 * Auto-injects one rule per enabled requirement so `<origam-input>`'s
	 * validation pipeline picks them up. Keeps user-supplied `rules`
	 * intact and prepends the requirement rules so user errors win
	 * the priority race.
	 ********************************************************/
	const enrichedRules = computed(() => {
		const base = Array.isArray(props.rules) ? [...props.rules] : []

		Object.keys(infos.value).forEach((key) => {
			const info = infos.value[key]

			base.push((value: any) => {
				return info.reg.test(value || '') ||
						t('origam.validation.must_contains', {value: info.message})
			})
		})

		return base
	})

	/*********************************************************
	 * Props passed down
	 ********************************************************/
	const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const fieldProps = computed(() => {
		return origamFieldRef.value?.filterProps(props, ['class', 'id', 'active', 'dirty', 'disabled', 'focused', 'error', 'style'])
	})
	const resolvedMenuProps = computed(() => {
		return {
			...props.menuProps,
			activatorProps: {
				...((props.menuProps as any)?.activatorProps || {}),
				'aria-haspopup': 'listbox'
			}
		}
	})

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const passwordFieldStyles = computed(() => {
		return [props.style] as StyleValue
	})
	const passwordFieldClasses = computed(() => {
		return [
			'origam-password-field',
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 ********************************************************/
	const {filterProps} = useProps<IPasswordFieldProps>(props)

	defineExpose(forwardRefs({filterProps}))
</script>

<style
		lang="scss"
		scoped
>
	.origam-password-field {
		$this: &;

		input {
			color: inherit;
			opacity: 0;
			flex: 1;
			transition: var(--origam-password-field__input---transition, 0.15s opacity cubic-bezier(0.4, 0, 0.2, 1));
			min-width: 0;

			&:focus,
			&:active {
				outline: none;
			}

			&:invalid {
				box-shadow: none;
			}
		}

		&__toggle-icon {
			cursor: var(--origam-password-field__toggle-icon---cursor, pointer);
			opacity: var(--origam-password-field__toggle-icon---opacity, 1);
		}

		&__details {
			padding-inline: var(--origam-password-field__details---padding-inline, 16px);
		}

		&__infos {
			padding-block: var(--origam-password-field__infos---padding, 0px);
			padding-inline: var(--origam-password-field__infos---padding-inline, 10px);
		}

		&__item {
			overflow: var(--origam-password-field__item---overflow, visible);
			padding: var(--origam-password-field__item---padding, 8px);
			position: var(--origam-password-field__item---position, relative);
			text-align: var(--origam-password-field__item---text-align, center);

			#{$this}__icon {
				opacity: var(--origam-password-field__item-icon---opacity, 0.2);
			}

			&--valid {
				#{$this}__icon {
					opacity: var(--origam-password-field__item--valid---icon-opacity, 1);
				}
			}
		}

		&__validate {
			position: var(--origam-password-field__validate---position, absolute);
			top: var(--origam-password-field__validate---top, 0px);
			right: var(--origam-password-field__validate---right, 0px);
			transform: var(--origam-password-field__validate---transform, translate(50%, -50%));
		}

		&__icon {
			font-size: var(--origam-password-field__icon---font-size, 45px);
			font-weight: var(--origam-password-field__icon---font-weight, bold);
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

<!--
	Lot 3.0/3.1 port — the entire OrigamPasswordField has been ported
	with the namespace adapted (`Origam*` → `Origam*`, classes/CSS vars
	mirrored, `origam.validation.must_contains`). The bg-color="rgba(230,230,230, 0.50)"
	hardcoded on each requirement Sheet was dropped — the Sheet's
	`color` prop already drives the theme-aware tint via the design
	tokens, no inline RGBA needed.
-->
