<template>
	<origam-text-field
			ref="origamTextFieldRef"
			v-model:focused="isFocused"
			v-model:model-value="search"
			:aria-label="t(label)"
			:class="selectClasses"
			:counter-value="counterValue"
			:dirty="isDirty"
			:placeholder="placeholder"
			:style="selectStyles"
			:title="t(label)"
			:validation-value="validationValue"
			v-bind="{ ...textFieldProps }"
			@blur="handleBlur"
			@change="handleChange"
			@keydown="handleKeydown"
			@update:model-value="handleModelUpdate"
			@click:clear="handleClear"
			@mousedown:control="handleMousedownControl"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

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

		<template #default>
			<origam-menu
					ref="origamMenuRef"
					v-model="menu"
					:close-on-content-click="false"
					:disabled="menuDisabled"
					:eager="eager"
					:location="BLOCK.BOTTOM"
					:max-height="310"
					:open-on-click="false"
					activator="parent"
					content-class="origam-select__content"
					v-bind="{ ...menuProps }"
					@after-leave="handleAfterLeave"
			>

				<template #default>
					<origam-list
							v-if="hasList"
							ref="origamListRef"
							:select-strategy="multiple ? SELECT_STRATEGY.INDEPENDENT : SELECT_STRATEGY.SINGLE_INDEPENDENT"
							:selected="selectedValues"
							:tabindex="-1"
							aria-live="polite"
							v-bind="{ ...listProps }"
							@focusin="handleFocusin"
							@focusout="handleFocusout"
							@keydown="handleListKeydown"
							@mousedown="handleMousedown"
							@scroll-passive="handleListScroll"
					>

						<template #default>
							<slot name="items.prepend"/>

							<template v-if="hasNoData">
								<slot name="noData">
									<origam-list-item :title="t(noDataText)"/>
								</slot>
							</template>

							<template v-else>
								<origam-virtual-scroll
										ref="origamVirtualScrollRef"
										:items="displayItems"
										renderless
								>
									<!-- Slot name MUST be `item.renderless` (with a dot) —
									     OrigamVirtualScroll declares `<slot name="item.renderless">`
									     and `<slot name="item.renderless.${index}">`. The previous
									     `#item:renderless` (colon) parsed as a different slot name
									     and never matched, so the v-for produced zero items in the
									     dropdown — the menu opened but the list was empty. -->
									<template #item.renderless="{item, index, itemRef}">
										<slot
												name="item"
												v-bind="{item, index, props: menuListItemProps(item, itemRef, index)}"
										>
											<origam-list-item
													:key="index"
													v-bind="menuListItemProps(item, itemRef, index)"
											>
												<template
														v-if="showCheckbox || item.props.prependAvatar || item.props.prependIcon"
														#prepend="{isSelected}"
												>
													<origam-checkbox-btn
															:key="item"
															:model-value="isSelected"
															:ripple="false"
															:tabindex="-1"
													/>

													<origam-avatar
															v-if="item.props.prependAvatar"
															:image="item.props.prependAvatar"
													/>

													<origam-icon
															v-if="item.props.prependIcon"
															:icon="item.props.prependIcon"
													/>
												</template>

												<template #title>
													<template v-if="isPristine">
														<span class="origam-select__text">{{ item.title }}</span>
													</template>
													<template v-else>
                          <span class="origam-select__unmask">
                            {{ item.title.substr(0, getMatches(item)?.title) }}
                          </span>
														<span class="origam-select__mask">
                            {{ item.title.substr(getMatches(item)?.title, search.length) }}
                          </span>
														<span class="origam-select__unmask">
                            {{ item.title.substr(getMatches(item)?.title + search.length) }}
                          </span>
													</template>
												</template>
											</origam-list-item>
										</slot>
									</template>
								</origam-virtual-scroll>
							</template>

							<slot name="items.append"/>
						</template>
					</origam-list>
				</template>
			</origam-menu>

			<template
					v-for="(item, index) in model"
					:key="index"
			>
				<div
						:class="{'origam-select__selection--selected' : index === selectionIndex}"
						:style="[textColorStyles]"
						class="origam-select__selection"
				>
					<template v-if="hasChips">
						<slot
								name="chip"
								v-bind="{ item, index, props: chipSlotProps(item) }"
						>
							<origam-chip
									key="chip"
									ref="origamChipsRef"
									v-bind="chipSlotProps(item)"
							>
								<template #default>
									<slot name="selection">
										{{ item.title }}
									</slot>
								</template>
							</origam-chip>
						</slot>
					</template>
					<template v-else>
            <span class="origam-select__selection-text">
              <slot name="selection">
                {{ item.title }}
              </slot>
              <span
		              v-if="multiple && (index < model.length - 1)"
		              class="origam-select__selection-comma"
              >
                {{ divider }}
              </span>
            </span>
					</template>
				</div>
			</template>
		</template>

		<template
				v-if="slots.suffix"
				#suffix
		>
			<slot name="suffix"/>
		</template>

		<template #appendInner>
			<slot name="appendInner">
				<origam-avatar
						v-if="appendInnerAvatar"
						key="append-avatar"
						:density="density"
						:image="appendInnerAvatar"
				/>
				<origam-icon
						v-if="appendInnerIcon"
						key="append-icon"
						:density="density"
						:icon="appendInnerIcon"
				/>
				<origam-icon
						:icon="menuIcon"
						class="origam-select__menu-icon"
						@click="noop"
						@mousedown="handleMousedownMenuIcon"
				/>
			</slot>
		</template>

		<template
				v-if="slots.clear"
				#clear
		>
			<slot name="clear"/>
		</template>

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>
	</origam-text-field>
</template>

<script
		lang="ts"
		setup
>
	import {
		computed,
		inject,
		mergeProps,
		nextTick,
		ref,
		shallowRef,
		StyleValue,
		toRef,
		useSlots,
		VNodeRef,
		watch
	} from 'vue'
	import {
		OrigamAvatar,
		OrigamCheckboxBtn,
		OrigamChip,
		OrigamIcon,
		OrigamList,
		OrigamListItem,
		OrigamMenu,
		OrigamTextField,
		OrigamTranslateScale,
		OrigamVirtualScroll
	} from '../../components'

	import { useFilter, useItems, useLocale, useProps, useScrolling, useTextColor, useVModel } from '../../composables'

	import { IN_BROWSER, ORIGAM_FORM_KEY } from '../../consts'

	import {
		BLOCK,
		DENSITY,
		DIRECTION,
		FILTERS_MODE,
		KEYBOARD_VALUES,
		MDI_ICONS,
		SELECT_STRATEGY,
		TEXT_FIELD_TYPE
	} from '../../enums'

	import type { IInternalListItem, IItemProps, ISelectProps } from '../../interfaces'

	import type {
		TOrigamChip,
		TOrigamList,
		TOrigamMenu,
		TOrigamTextField,
		TOrigamVirtualScroll,
		TTransitionProps
	} from '../../types'

	import { deepEqual, forwardRefs, matchesSelector, noop, wrapInArray } from '../../utils'

	const props = withDefaults(defineProps<ISelectProps>(), {
		type: TEXT_FIELD_TYPE.TEXT,
		centerAffix: true,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT,
		border: true,
		rounded: true,
		modelValue: null,
		role: 'combobox',
		itemType: 'type',
		items: () => [],
		itemTitle: 'title',
		itemValue: 'value',
		itemChildren: 'children',
		itemProps: 'props',
		valueComparator: deepEqual,
		menuIcon: MDI_ICONS.MENU_DOWN_OUTLINE,
		divider: ',',
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps,
		filterKeys: () => ['title'],
		filterMode: FILTERS_MODE.INTERSECTION,
		closeText: 'origam.close',
		openText: 'origam.open',
		noDataText: 'origam.noDataText'
	})

	defineEmits(['click:control', 'mousedown:control', 'update:focused', 'update:modelValue', 'update:menu', 'click:prepend', 'click:prependInner', 'click:append', 'click:appendInner', 'click:clear'])

	const {filterProps} = useProps<ISelectProps>(props)

	const {t} = useLocale()

	const origamTextFieldRef = ref<TOrigamTextField>()
	const origamMenuRef = ref<TOrigamMenu>()
	const origamVirtualScrollRef = ref<TOrigamVirtualScroll>()
	const origamListRef = ref<TOrigamList>()
	const origamChipsRef = ref<TOrigamChip>()

	const slots = useSlots()

	const {textColorStyles} = useTextColor(toRef(props, 'color'))

	const {items, transformIn, transformOut} = useItems(props as IItemProps)
	const model = useVModel(
			props,
			'modelValue',
			[],
			(v) => {
				return transformIn(v === null ? [null] : wrapInArray(v))
			},
			(v) => {
				const transformed = transformOut(v)
				return props.multiple ? transformed : (transformed[0] ?? null)
			}
	)
	const search = useVModel(props, 'search', '')

	const validationValue = computed(() => {
		return model.externalValue
	})

	const menuState = useVModel(props, 'menu')
	const menu = computed({
		get: () => menuState.value,
		set: (v) => {
			if (menuState.value && !v && origamMenuRef.value?.openChildren) {
				return
			}

			menuState.value = v
		}
	})
	const counterValue = computed(() => {
		if (typeof props.counterValue === 'function') {
			return props.counterValue(model.value)
		}

		if (props.counterValue) {
			return props.counterValue
		}

		return model.value.length
	})
	const selectedValues = computed(() => {
		return model.value.map((selection) => selection.value)
	})
	const highlightFirst = computed(() => {
		const selectFirst = props.autoSelectFirst === true ||
				(props.autoSelectFirst === 'exact' && search.value === displayItems.value[0]?.title)
		return selectFirst &&
				displayItems.value.length > 0 &&
				!isPristine.value &&
				!listHasFocus.value
	})
	const showCheckbox = computed(() => {
		return props.multiple && !props.hideSelected
	})

	const hasNoData = computed(() => {
		return !displayItems.value.length && (!props.hideNoData || slots.noData)
	})

	const isFocused = shallowRef(false)
	const form = inject(ORIGAM_FORM_KEY, null)
	const isPristine = shallowRef(true)

	const {filteredItems, getMatches} = useFilter(props, items, () => isPristine.value ? '' : search.value)

	let keyboardLookupPrefix = ''
	let keyboardLookupLastTime: number

	const listHasFocus = shallowRef(false)
	const selectionIndex = shallowRef(-1)
	const isSelecting = shallowRef(false)

	const displayItems = computed(() => {
		if (props.hideSelected) {
			return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value))
		}

		return filteredItems.value
	})

	const menuDisabled = computed(() => {
		return (props.hideNoData && !displayItems.value.length) || props.readonly || form?.isReadonly.value
	})
	const menuProps = computed(() => {
		return {
			...props.menuProps,
			activatorProps: {
				...(props.menuProps?.activatorProps || {}),
				'aria-haspopup': 'listbox' // Set aria-haspopup to 'listbox'
			}
		}
	})

	const menuListItemProps = (item: IInternalListItem, itemRef: VNodeRef, index: number) => {
		return mergeProps(item.props ?? {}, {
			ref: itemRef,
			key: index,
			active: (highlightFirst.value && index === 0) ? true : isSelected(item),
			onClick: () => handleSelect(item, null)
		})
	}
	const isSelected = (item: IInternalListItem) => {
		return selectedValues.value.includes(item.value)
	}

	const {
		onListScroll: handleListScroll,
		onListKeydown: handleListKeydown
	} = useScrolling(origamListRef, origamTextFieldRef)

	const handleSelect = (item: IInternalListItem, set: boolean | null = true) => {
		if (item.props?.disabled) return

		if (props.multiple) {
			const index = model.value.findIndex((selection) => (props.valueComparator ? props.valueComparator(selection.value, item.value) : deepEqual(selection.value, item.value)))
			const add = set == null ? !~index : set

			if (~index) {
				const value = add ? [...model.value, item] : [...model.value]

				value.splice(index, 1)
				model.value = value
			} else if (add) {
				model.value = [...model.value, item]
			}

			if (props.clearOnSelect && props.autocomplete) {
				search.value = ''
			}
		} else {
			const add = set !== false

			model.value = add ? [item] : []

			if (props.autocomplete) {
				search.value = add ? item.title : ''
			}

			nextTick(() => {
				menu.value = false
				isPristine.value = true
			})
		}
	}
	const handleClear = () => {
		if (props.openOnClear) {
			menu.value = true
		}

		if (props.autocomplete) {
			search.value = ''
		}
	}
	const handleMousedownControl = () => {
		if (menuDisabled.value) return

		menu.value = !menu.value
	}
	const handleMousedownMenuIcon = (e: MouseEvent) => {
		if (menuDisabled.value) return

		if (isFocused.value) {
			e.preventDefault()
			e.stopPropagation()
		}
		menu.value = !menu.value
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (!e.key || props.readonly || form?.isReadonly.value) return

		const selectionStart = origamTextFieldRef.value?.selectionStart
		const length = model.value.length

		const keyAutocompleteOut = [KEYBOARD_VALUES.ENTER, KEYBOARD_VALUES.EMPTY, KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP, KEYBOARD_VALUES.HOME, KEYBOARD_VALUES.END]
		if ((props.autocomplete && selectionIndex.value > -1) || keyAutocompleteOut.includes(e.key as typeof keyAutocompleteOut[number])) {
			e.preventDefault()
		}

		const keyMenuOpen = [KEYBOARD_VALUES.ENTER, KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.EMPTY]
		if (keyMenuOpen.includes(e.key as typeof keyMenuOpen[number])) {
			menu.value = true
		}

		const keyMenuOut = [KEYBOARD_VALUES.ESC, KEYBOARD_VALUES.TAB]
		if (keyMenuOut.includes(e.key as typeof keyMenuOut[number])) {
			menu.value = false
		}

		if (e.key === KEYBOARD_VALUES.HOME) {
			origamListRef.value?.focus('first')
		} else if (e.key === KEYBOARD_VALUES.END) {
			origamListRef.value?.focus('last')
		}

		const keyAutocompleteEnter = [KEYBOARD_VALUES.ENTER, KEYBOARD_VALUES.TAB]
		if (props.autocomplete) {
			if (highlightFirst.value && keyAutocompleteEnter.includes(e.key as typeof keyAutocompleteEnter[number])) {
				handleSelect(displayItems.value[0] as IInternalListItem)
			}

			if (e.key === KEYBOARD_VALUES.DOWN && highlightFirst.value) {
				origamListRef.value?.focus('next')
			}

			const keyBack = [KEYBOARD_VALUES.BACKSPACE, KEYBOARD_VALUES.DELETE]
			if (keyBack.includes(e.key as typeof keyBack[number])) {
				if (
						!props.multiple &&
						model.value.length > 0 &&
						!search.value
				) return handleSelect(model.value[0], false)

				if (~selectionIndex.value) {
					const originalSelectionIndex = selectionIndex.value
					handleSelect(model.value[selectionIndex.value], false)

					selectionIndex.value = originalSelectionIndex >= length - 1 ? (length - 2) : originalSelectionIndex
				} else if (e.key === KEYBOARD_VALUES.BACKSPACE && !search.value) {
					selectionIndex.value = length - 1
				}
			}

			if (!props.multiple) return

			if (e.key === KEYBOARD_VALUES.LEFT) {
				if (selectionIndex.value < 0 && selectionStart > 0) return

				const prev = selectionIndex.value > -1
						? selectionIndex.value - 1
						: length - 1

				if (model.value[prev]) {
					selectionIndex.value = prev
				} else {
					selectionIndex.value = -1
					origamTextFieldRef.value?.setSelectionRange(search.value?.length, search.value?.length)
				}
			}

			if (e.key === KEYBOARD_VALUES.RIGHT) {
				if (selectionIndex.value < 0) return

				const next = selectionIndex.value + 1

				if (model.value[next]) {
					selectionIndex.value = next
				} else {
					selectionIndex.value = -1
					origamTextFieldRef.value?.setSelectionRange(0, 0)
				}
			}
		} else {
			// html select hotkeys
			const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds

			const checkPrintable = (e: KeyboardEvent) => {
				const isPrintableChar = e.key.length === 1
				const noModifier = !e.ctrlKey && !e.metaKey && !e.altKey

				return isPrintableChar && noModifier
			}

			if (props.multiple || !checkPrintable(e)) return

			const now = performance.now()

			if (now - keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
				keyboardLookupPrefix = ''
			}

			keyboardLookupPrefix += e.key.toLowerCase()
			keyboardLookupLastTime = now

			const item = items.value.find((item) => item.title?.toLowerCase().startsWith(keyboardLookupPrefix))

			if (item !== undefined) {
				model.value = [item as IInternalListItem]
				const index = displayItems.value.indexOf(item)

				if (IN_BROWSER) {
					window.requestAnimationFrame(() => {
						if (index >= 0) {
							origamVirtualScrollRef.value?.scrollToIndex(index)
						}
					})
				}
			}
		}
	}
	const handleBlur = (e: FocusEvent) => {
		if (!origamListRef.value?.$el.contains(e.relatedTarget as HTMLElement)) {
			menu.value = false
		}
	}
	const handleChange = (e: Event) => {
		if (matchesSelector(origamTextFieldRef.value, ':autofill') || matchesSelector(origamTextFieldRef.value, ':-webkit-autofill')) {
			const item = items.value.find(item => item.title === (e.target as HTMLInputElement).value)

			if (item) {
				handleSelect(item as IInternalListItem)
			}
		}
	}
	const handleAfterLeave = () => {
		if (isFocused.value) {
			isPristine.value = true
			origamTextFieldRef.value?.focus()
		}
	}
	const handleFocusin = () => {
		isFocused.value = true

		setTimeout(() => {
			listHasFocus.value = true
		})
	}
	const handleFocusout = () => {
		listHasFocus.value = false
	}
	const handleModelUpdate = (v: any) => {
		if (v == null || (v === '' && !props.multiple)) {
			model.value = []
		}

		if (origamTextFieldRef.value) {
			origamTextFieldRef.value.value = ''
		}
	}
	const handleMousedown = (e: MouseEvent) => {
		e.preventDefault()
	}

	// CHIPS

	const hasChips = computed(() => {
		return props.chips || slots.chip
	})

	const chipSlotProps = (item: IInternalListItem) => {
		return {
			closable: props.closableChips,
			disabled: item.props?.disabled,
			bgColor: 'rgba(168, 168, 168, 1)',
			color: 'rgb(255, 255, 255)',
			border: true,
			rounded: true,
			'onClick:close': (e: Event) => handleChipClose(e, item),
			onKeydown: (e: KeyboardEvent) => handleChipKeydown(e, item),
			onMousedown: (e: MouseEvent) => handleChipMousedown(e),
			modelValue: true,
			size: 'small',
			...props.chipProps
		}
	}

	const handleChipClose = (e: Event, item: IInternalListItem) => {
		e.stopPropagation()
		e.preventDefault()

		handleSelect(item, false)
	}
	const handleChipKeydown = (e: KeyboardEvent, item: IInternalListItem) => {
		if (e.key !== KEYBOARD_VALUES.ENTER && e.key !== KEYBOARD_VALUES.EMPTY) return

		e.preventDefault()
		e.stopPropagation()

		handleChipClose(e, item)
	}
	const handleChipMousedown = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	watch(isFocused, (val, oldVal) => {
		if (val === oldVal) return

		if (val) {
			isSelecting.value = true
			// @ts-expect-error TODO
			search.value = props.multiple ? '' : String(model.value?.at(-1)?.props.title ?? '')
			isPristine.value = true

			nextTick(() => isSelecting.value = false)
		} else {
			if (!props.multiple && search.value == null) model.value = []
			else if (
					highlightFirst.value &&
					!listHasFocus.value &&
					!model.value.some(({value}) => value === displayItems.value[0].value)
			) {
				handleSelect(displayItems.value[0] as IInternalListItem)
			}
			menu.value = false
			search.value = ''
			selectionIndex.value = -1
		}
	})

	watch(search, val => {
		if (!isFocused.value || isSelecting.value) return

		if (val) menu.value = true

		isPristine.value = !val
	})

	watch(menu, () => {
		if (!props.hideSelected && menu.value && model.value.length) {
			const index = displayItems.value.findIndex(
					item => model.value.some((s) => (props.valueComparator ? props.valueComparator(s.value, item.value) : deepEqual(s.value, item.value)))
			)
			if (IN_BROWSER) {
				window.requestAnimationFrame(() => {
					if (index >= 0) {
						origamVirtualScrollRef.value?.scrollToIndex(index)
					}
				})
			}
		}
	})

	watch(() => props.items, (newVal, oldVal) => {
		if (menu.value) return

		if (isFocused.value && !oldVal.length && newVal.length) {
			menu.value = true
		}
	})

	const hasList = computed(() => {
		return !props.hideNoData || displayItems.value.length || slots.prependItem || slots.appendItem || slots.noData
	})

	const textFieldProps = computed(() => {
		return origamTextFieldRef.value?.filterProps(props, ['class', 'id', 'style', 'counterValue', 'dirty', 'modelValue', 'placeholder', 'validationValue', 'focused'])
	})

	const isDirty = computed(() => {
		return model.value.length > 0
	})
	const placeholder = computed(() => {
		return isDirty.value || (!isFocused.value && props.label && !props.persistentPlaceholder) ? undefined : props.placeholder
	})
	const label = computed(() => {
		return menu.value ? props.closeText : props.openText
	})

	// CLASS & STYLES

	const selectStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const selectClasses = computed(() => {
		return [
			'origam-select',
			`origam-select--${props.multiple ? 'multiple' : 'single'}`,
			{
				'origam-select--autocomplete': props.autocomplete,
				'origam-select--active-menu': menu.value,
				'origam-select--chips': props.chips,
				'origam-select--selected': selectionIndex.value > -1
			},
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({
		filterProps,
		isFocused,
		menu,
		handleSelect
	}, origamTextFieldRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-select {
		$this: &;

		:deep(.origam-field) {
			.origam-field__prefix,
			.origam-field__suffix,
			.origam-field__input {
				cursor: pointer;

				> input {
					opacity: 0;
					flex: 0 0;
					position: absolute;
					width: 100%;
					align-self: stretch;
					padding: 0;
					transition: none;
					pointer-events: none;
					caret-color: transparent;
					font-size: 16px;
				}

				> #{$this}__selection,
				> #{$this}__selection-text {
					+ input {
						position: static;
						flex: 1 1;
					}
				}
			}

			&.origam-field--dirty {
				#{$this}__selection {
					margin-inline-end: 2px;
				}
			}
		}

		&__selection-text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__content {
			overflow: hidden;
			box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
			border-radius: 4px;
		}

		&__selection {
			display: inline-flex;
			align-items: center;
			letter-spacing: inherit;
			line-height: inherit;
			max-width: calc(100% - 2px - 2px);

			&:first-child {
				margin-inline-start: 0;
			}
		}

		&__menu-icon {
			margin-inline-start: 4px;
			transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&--selected {
			:deep(.origam-field) {
				.origam-field__input {
					> input {
						caret-color: transparent;
					}
				}
			}
		}

		&--active-menu {
			#{$this}__menu-icon {
				opacity: 1;
				transform: rotate(180deg);
			}
		}

		&#{$this}--autocomplete {
			:deep(.origam-field) {
				.origam-field__prefix,
				.origam-field__suffix,
				.origam-field__input {
					cursor: text;
				}

				.origam-field__input {
					> input {
						flex: 1 1;
						opacity: 1;
						pointer-events: auto;
						caret-color: inherit;
					}
				}

				input {
					min-width: 64px;
				}

				&:not(.origam-field--focused) {
					input {
						min-width: 0;
					}
				}
			}

			#{$this}__mask {
				background: rgb(66, 66, 66);
			}

			&#{$this}--selected {
				#{$this}__selection {
					opacity: 0.7;

					&--selected {
						opacity: 1;
					}
				}
			}

			&#{$this}--multiple {
				:deep(.origam-field) {
					input {
						position: relative;
					}
				}
			}

			&#{$this}--single {
				:deep(.origam-field) {
					input {
						left: 0;
						right: 0;
						padding-inline: inherit;
						opacity: 1;
					}

					&.origam-field--active {
						input {
							transition: none;
						}
					}

					&.origam-field--dirty {
						&:not(.origam-field--focused) {
							input {
								opacity: 0;
							}
						}
					}

					&.origam-field--focused {
						#{$this}__selection {
							opacity: 0;
						}
					}
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
