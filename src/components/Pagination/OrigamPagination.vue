<template>
	<component
			:is="tag"
			ref="resizeRef"
			:aria-label="ariaLabel"
			:class="paginationClasses"
			:style="paginationStyles"
			role="navigation"
			@keydown="handleKeydown"
	>
		<span
				v-if="withInfo"
				class="origam-pagination__info"
				data-cy="pagination-info"
		>
			<slot
					name="info"
					v-bind="{ start: infoStart, end: infoEnd, total: totalInt }"
			>
				{{ t(infoText, infoStart, infoEnd, totalInt) }}
			</slot>
		</span>

		<template v-if="compact">
			<ul class="origam-pagination__list origam-pagination__list--compact">
				<template v-if="showFirstLastPage">
					<li
							key="first"
							class="origam-pagination__first"
					>
						<slot
								name="first"
								v-bind="{...controls.first}"
						>
							<origam-btn v-bind="{...controls.first }"/>
						</slot>
					</li>
				</template>

				<li
						key="prev"
						class="origam-pagination__prev"
				>
					<slot
							name="prev"
							v-bind="{...controls.prev}"
					>
						<origam-btn v-bind="{...controls.prev }"/>
					</slot>
				</li>

				<li class="origam-pagination__compact-label">
					<span>{{ t(pageText) }}</span>
					<input
							ref="compactInputRef"
							:value="page"
							:min="start"
							:max="length"
							:disabled="disabled"
							type="number"
							class="origam-pagination__compact-input"
							aria-label="Page number"
							data-cy="pagination-compact-input"
							@change="handleCompactInput"
							@keydown.enter.prevent="handleCompactInput"
					/>
					<span>{{ t(ofText) }}</span>
					<span>{{ length }}</span>
				</li>

				<li
						key="next"
						class="origam-pagination__next"
				>
					<slot
							name="next"
							v-bind="{...controls.next}"
					>
						<origam-btn v-bind="{...controls.next }"/>
					</slot>
				</li>

				<template v-if="showFirstLastPage">
					<li
							key="last"
							class="origam-pagination__last"
					>
						<slot
								name="last"
								v-bind="{...controls.last}"
						>
							<origam-btn v-bind="{...controls.last }"/>
						</slot>
					</li>
				</template>
			</ul>
		</template>

		<template v-else>
			<ul class="origam-pagination__list">
				<template v-if="showFirstLastPage">
					<li
							key="first"
							class="origam-pagination__first"
					>
						<slot
								name="first"
								v-bind="{...controls.first}"
						>
							<origam-btn v-bind="{...controls.first }"/>
						</slot>
					</li>
				</template>

				<li
						key="prev"
						class="origam-pagination__prev"
				>
					<slot
							name="prev"
							v-bind="{...controls.prev}"
					>
						<origam-btn v-bind="{...controls.prev }"/>
					</slot>
				</li>

				<template
						v-for="(item) in items"
						:key="item.key"
				>
					<li
							:class="{'origam-pagination__item--is-active': item.isActive}"
							class="origam-pagination__item"
					>
						<slot :name="`item-${item.key}`">
							<slot name="item">
								<origam-btn
										:text="item.page.toString()"
										v-bind="{ ...item.props }"
								/>
							</slot>
						</slot>
					</li>
				</template>

				<li
						key="next"
						class="origam-pagination__next"
				>
					<slot
							name="next"
							v-bind="{...controls.next}"
					>
						<origam-btn v-bind="{...controls.next }"/>
					</slot>
				</li>

				<template v-if="showFirstLastPage">
					<li
							key="last"
							class="origam-pagination__last"
					>
						<slot
								name="last"
								v-bind="{...controls.last}"
						>
							<origam-btn v-bind="{...controls.last }"/>
						</slot>
					</li>
				</template>
			</ul>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { ComponentPublicInstance, computed, nextTick, ref, shallowRef, StyleValue } from "vue"
	import { OrigamBtn } from "../../components"

	import { useDisplay, useLocale, useProps, useRefs, useResizeObserver, useVModel } from "../../composables"

	import { KEYBOARD_VALUES, MDI_ICONS, VARIANT } from "../../enums"

	import type { IPaginationProps } from "../../interfaces"

	import { createRange, int } from "../../utils"

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits and filterProps for the Pagination component.
	 ********************************************************/
	const props = withDefaults(defineProps<IPaginationProps>(), {
		prevIcon: MDI_ICONS.CHEVRON_LEFT,
		nextIcon: MDI_ICONS.CHEVRON_RIGHT,
		firstIcon: MDI_ICONS.CHEVRON_DOUBLE_LEFT,
		lastIcon: MDI_ICONS.CHEVRON_DOUBLE_RIGHT,
		tag: 'div',
		ellipsis: '...',
		length: 1,
		start: 1,
		modelValue: 1, // TODO - Delete default value for modelValue
		ariaLabel: 'origam.pagination.ariaLabel.root',
		pageAriaLabel: 'origam.pagination.ariaLabel.page',
		currentPageAriaLabel: 'origam.pagination.ariaLabel.currentPage',
		firstAriaLabel: 'origam.pagination.ariaLabel.first',
		previousAriaLabel: 'origam.pagination.ariaLabel.previous',
		nextAriaLabel: 'origam.pagination.ariaLabel.next',
		lastAriaLabel: 'origam.pagination.ariaLabel.last',
		compact: false,
		pageText: 'origam.pagination.page',
		ofText: 'origam.pagination.of',
		withInfo: false,
		infoText: 'origam.pagination.info',
		perPage: 10
	})

	const emits = defineEmits([
		'update:modelValue',
		'first',
		'next',
		'prev',
		'last'
	])

	const {filterProps} = useProps<IPaginationProps>(props)

	const {t} = useLocale()

	/*********************************************************
	 * Value
	 *
	 * @description
	 * page is the controlled current-page number.
	 * width / maxButtons support the responsive total-visible calculation.
	 ********************************************************/
	const page = useVModel(props, 'modelValue', props.start)

	/*********************************************************
	 * Composables
	 ********************************************************/

	const {width} = useDisplay()
	const maxButtons = shallowRef(-1)

	const {resizeRef} = useResizeObserver((entries: ResizeObserverEntry[]) => {
		if (!entries.length) return

		const {target, contentRect} = entries[0]

		const firstItem = target.querySelector('.origam-pagination__list > *') as HTMLElement

		if (!firstItem) return

		const totalWidth = contentRect.width
		const itemWidth =
				firstItem.offsetWidth +
				parseFloat(getComputedStyle(firstItem).marginRight) * 2

		maxButtons.value = getMax(totalWidth, itemWidth)
	})
	const {refs, updateRef} = useRefs<ComponentPublicInstance>()

	/*********************************************************
	 * Range & items
	 *
	 * @description
	 * length / start are int-coerced copies of the props.
	 * totalVisible computes how many page buttons fit.
	 * range produces the raw sequence (numbers + ellipsis strings).
	 * sharedBtnColorProps / controlColorProps forward the uniform six-field
	 * IColorProps contract to every btn in the row so `color`/`bgColor`
	 * changes repaint them all simultaneously.
	 * items maps range to the full button prop objects.
	 * controls produces the first/prev/next/last button prop objects.
	 ********************************************************/
	const length = computed(() => {
		return int(props.length)
	})
	const start = computed(() => {
		return int(props.start)
	})
	const totalVisible = computed(() => {
		if (props.totalVisible != null) {
			return int(props.totalVisible)
		}

		if (maxButtons.value >= 0) {
			return maxButtons.value
		}

		return getMax(width.value, 58)
	})
	const range = computed(() => {
		if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return []

		if (totalVisible.value <= 0) return []
		else if (totalVisible.value === 1) return [page.value]

		if (length.value <= totalVisible.value) {
			return createRange(length.value, start.value)
		}

		const even = totalVisible.value % 2 === 0
		const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2)
		const left = even ? middle : middle + 1
		const right = length.value - middle

		if (left - page.value >= 0) {
			return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value]
		} else if (page.value - right >= (even ? 1 : 0)) {
			const rangeLength = totalVisible.value - 1
			const rangeStart = length.value - rangeLength + start.value
			return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)]
		} else {
			const rangeLength = Math.max(1, totalVisible.value - 3)
			const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value
			return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value]
		}
	})
	// Uniform color contract — every btn in the row (page items 1..n,
	// the ellipsis, AND first / prev / next / last) receives the SAME
	// six IColorProps fields. Changing `color` repaints every text/icon,
	// changing `bgColor` repaints every surface, hover/active rungs
	// work identically. The active item differentiates itself via
	// `active: true` only; a disabled btn shows its standard --disabled
	// veil (Btn's opacity rule), nothing intent-specific.
	// User report: "putain pourquoi tous les btn ne sont pas gérés de
	// la même manière sur la pagination ; je change la couleur, tous
	// les btns voient leur couleur changer ; etc."
	const sharedBtnColorProps = computed(() => ({
		color: props.color,
		bgColor: props.bgColor,
		hoverColor: props.hoverColor,
		hoverBgColor: props.hoverBgColor,
		activeColor: props.activeColor,
		activeBgColor: props.activeBgColor,
	}))
	const controlColorProps = sharedBtnColorProps

	const items = computed(() => {
		return range.value.map((item, index) => {
			const ref = (e: any) => updateRef(e, index)

			if (typeof item === 'string') {
				return {
					isActive: false,
					key: `ellipsis-${index}`,
					page: item,
					props: {
						ref,
						// Same six IColorProps as the rest of the row —
						// even though the ellipsis is non-clickable
						// (`disabled: true`), it must read as visually
						// part of the same nav row, just dimmed by the
						// Btn's --disabled veil. Pre-fix it rendered
						// in the default neutral grey while the
						// surrounding btns took the consumer's bgColor,
						// breaking the user's "tous les btn ensemble"
						// expectation.
						...sharedBtnColorProps.value,
						ellipsis: true,
						icon: true,
						disabled: true
					}
				}
			} else {
				const isActive = item === page.value
				return {
					isActive,
					key: item,
					page: item,
					props: {
						ref,
						...sharedBtnColorProps.value,
						ellipsis: false,
						icon: true,
						disabled: !!props.disabled || +props.length < 2,
						// `active: true` lets the inner `<origam-btn>`
						// add its own --active overlay so the current
						// page reads as selected — without forcing the
						// non-active items into a different shape. All
						// six IColorProps fields are forwarded
						// uniformly via `sharedBtnColorProps` (above),
						// so a `color` / `bgColor` change on the
						// pagination updates EVERY btn at once — the
						// behaviour the user expects from a uniform row
						// of nav buttons.
						active: isActive,
						'aria-current': isActive,
						'aria-label': t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
						onClick: (e: Event) => setValue(e, item)
					}
				}
			}
		})
	})
	const controls = computed(() => {
		const prevDisabled = !!props.disabled || page.value <= start.value
		const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1

		return {
			first: {
				...controlColorProps.value,
				icon: props.firstIcon,
				onClick: (e: Event) => setValue(e, start.value, 'first'),
				disabled: prevDisabled,
				'aria-label': props.firstAriaLabel,
				'aria-disabled': prevDisabled
			},
			prev: {
				...controlColorProps.value,
				icon: props.prevIcon,
				onClick: (e: Event) => setValue(e, page.value - 1, 'prev'),
				disabled: prevDisabled,
				'aria-label': props.previousAriaLabel,
				'aria-disabled': prevDisabled
			},
			next: {
				...controlColorProps.value,
				icon: props.nextIcon,
				onClick: (e: Event) => setValue(e, page.value + 1, 'next'),
				disabled: nextDisabled,
				'aria-label': props.nextAriaLabel,
				'aria-disabled': nextDisabled
			},
			last: {
				...controlColorProps.value,
				icon: props.lastIcon,
				onClick: (e: Event) => setValue(e, start.value + length.value - 1, 'last'),
				disabled: nextDisabled,
				'aria-label': props.lastAriaLabel,
				'aria-disabled': nextDisabled
			}
		}
	})

	/*********************************************************
	 * Keyboard navigation
	 *
	 * @description
	 * handleKeydown moves the page with arrow keys and updates focus.
	 * getMax computes the maximum visible buttons from available width.
	 * setValue sets the page value and fires the named event.
	 * updateFocus focuses the newly-active page button.
	 ********************************************************/
	const getMax = (totalWidth: number, itemWidth: number) => {
		const minButtons = props.showFirstLastPage ? 5 : 3
		return Math.max(0, Math.floor(
				// Round to two decimal places to avoid floating point errors
				+((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2)
		))
	}
	const setValue = (e: Event, value: number, event?: any) => {
		e.preventDefault()
		page.value = value

		if (event) {
			emits(event, value)
		}
	}
	const updateFocus = () => {
		const currentIndex = page.value - start.value

		refs.value[currentIndex]?.$el.focus()
	}

	/*********************************************************
	 * Event handlers
	 ********************************************************/

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYBOARD_VALUES.LEFT && !props.disabled && page.value > +props.start) {
			page.value = page.value - 1
			nextTick(updateFocus)
		} else if (e.key === KEYBOARD_VALUES.RIGHT && !props.disabled && page.value < start.value + length.value - 1) {
			page.value = page.value + 1
			nextTick(updateFocus)
		}
	}

	/*********************************************************
	 * Compact mode
	 *
	 * @description
	 * compactInputRef holds the native number input for compact mode.
	 * handleCompactInput clamps and applies the typed value.
	 ********************************************************/
	const compactInputRef = ref<HTMLInputElement | null>(null)

	const handleCompactInput = (e: Event) => {
		const input = e.target as HTMLInputElement
		const raw = parseInt(input.value, 10)
		const clamped = isNaN(raw)
			? start.value
			: Math.min(Math.max(raw, start.value), length.value)

		// Sync the input's displayed value to the clamped value
		input.value = String(clamped)
		page.value = clamped
	}

	/*********************************************************
	 * With-info label
	 *
	 * @description
	 * "Showing 21-40 of 248" range label.
	 * `total` (items count) drives the right-hand bound; `perPage` slices
	 * the range; `currentPage` (== `page.value`) anchors it. When `total`
	 * is omitted we fall back to `length * perPage` so the label still
	 * renders something sensible. End is clamped to `total` so the last
	 * page reads "41-43 of 43" rather than "41-50 of 43".
	 ********************************************************/
	const perPageInt = computed(() => {
		const v = int(props.perPage)
		return Number.isFinite(v) && v > 0 ? v : 10
	})
	const totalInt = computed(() => {
		if (props.total != null) return int(props.total)
		return length.value * perPageInt.value
	})
	const infoStart = computed(() => {
		if (totalInt.value <= 0) return 0
		return (page.value - start.value) * perPageInt.value + 1
	})
	const infoEnd = computed(() => {
		if (totalInt.value <= 0) return 0
		return Math.min(infoStart.value + perPageInt.value - 1, totalInt.value)
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * `--colored` modifier is toggled as soon as the consumer passes any
	 * truthy intent on `color`/`bgColor`. Drives the SCSS branch that
	 * lets the inner OrigamBtn instances render with their own intent
	 * fill (PDF "stylé" look). When absent, the SCSS overrides the
	 * btn's default surface to a transparent neutral so the row reads
	 * as a subtle, ghost-like nav.
	 ********************************************************/
	const isColored = computed(() => !!(props.color || props.bgColor))

	const paginationClasses = computed(() => {
		return [
			'origam-pagination',
			{
				'origam-pagination--colored': isColored.value,
				'origam-pagination--compact': !!props.compact,
				'origam-pagination--with-info': !!props.withInfo
			},
			props.class
		]
	})
	const paginationStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Exposes filterProps to parent ref consumers.
	 ********************************************************/
	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-pagination {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--origam-pagination---gap-info, 16px);
		padding-block: var(--origam-pagination---padding-block, 0);
		padding-inline: var(--origam-pagination---padding-inline, 0);

		&--with-info {
			justify-content: space-between;
		}

		&__info {
			display: inline-flex;
			align-items: center;
			color: var(--origam-pagination--info---color, currentColor);
			font-size: var(--origam-pagination--info---font-size, 0.75rem);
			font-weight: var(--origam-pagination--info---font-weight, 400);
			white-space: nowrap;
		}

		&__list {
			display: inline-flex;
			list-style-type: none;
			justify-content: center;
			margin: 0;
			padding: 0;
		}

		&:not(&--colored) {
			:deep(.origam-btn:not(.origam-btn--active):not(:hover)) {
				--origam-btn---background-color: var(--origam-pagination---background-color, transparent);
				--origam-btn---color: var(--origam-pagination---color, currentColor);
			}

			:deep(.origam-btn:hover:not(.origam-btn--active)) {
				--origam-btn---background-color: var(--origam-pagination---background-color-hover, rgba(0, 0, 0, 0.04));
				--origam-btn---color: var(--origam-pagination---color, currentColor);
			}
		}

		&--colored {
			:deep(.origam-btn) {
				box-shadow: var(--origam-pagination--primary---box-shadow, none);
			}
		}

		&__item {
			&--is-active {
				:deep(.origam-btn__overlay) {
					opacity: var(--origam-pagination__item--is-active---active-overlay-opacity, var(--origam-pagination__item---active-overlay-opacity, 0.12))
				}
			}
		}

		&__item,
		&__first,
		&__prev,
		&__next,
		&__last {
			margin: var(--origam-pagination---gap, 4px);
		}

		:deep(.origam-btn) {
			border-radius: var(--origam-pagination---border-radius, 4px);
		}

		:deep(.origam-btn--rounded) {
			border-radius: var(--origam-pagination---border-radius-rounded, 24px);
		}

		:deep(.origam-btn--icon) {
			border-radius: var(--origam-pagination---border-radius-circle, 9999px);
		}

		:deep(.origam-btn__overlay) {
			transition: none;
		}

		&__list--compact {
			flex-wrap: nowrap;
			align-items: center;
			width: auto;
		}

		&__compact-label {
			display: inline-flex;
			align-items: center;
			gap: var(--origam-pagination---label-gap, 8px);
			list-style: none;
			margin: var(--origam-pagination---gap, 4px);
			white-space: nowrap;
		}

		&__compact-input {
			display: inline-block;
			width: var(--origam-pagination---input-width, 3em);
			padding-inline: var(--origam-pagination---input-padding-inline, 4px);
			text-align: center;
			border: 1px solid currentColor;
			border-radius: var(--origam-pagination---border-radius, 4px);
			font: inherit;
			line-height: 1.5;

			appearance: textfield;

			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				appearance: none;
				margin: 0;
			}

			&:focus-visible {
				outline: 2px solid currentColor;
				outline-offset: 2px;
			}
		}
	}
</style>
