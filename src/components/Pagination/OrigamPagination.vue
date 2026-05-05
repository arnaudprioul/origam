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
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { ComponentPublicInstance, computed, nextTick, shallowRef, StyleValue } from "vue"
	import { OrigamBtn } from "../../components"

	import { useDisplay, useLocale, useProps, useRefs, useResizeObserver, useVModel } from "../../composables"

	import { KEYBOARD_VALUES, MDI_ICONS, VARIANT } from "../../enums"

	import type { IPaginationProps } from "../../interfaces"

	import { createRange, int } from "../../utils"

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
		lastAriaLabel: 'origam.pagination.ariaLabel.last'
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

	const page = useVModel(props, 'modelValue', props.start)
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
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYBOARD_VALUES.LEFT && !props.disabled && page.value > +props.start) {
			page.value = page.value - 1
			nextTick(updateFocus)
		} else if (e.key === KEYBOARD_VALUES.RIGHT && !props.disabled && page.value < start.value + length.value - 1) {
			page.value = page.value + 1
			nextTick(updateFocus)
		}
	}

	// CLASS & STYLES

	const paginationClasses = computed(() => {
		return [
			'origam-pagination',
			props.class
		]
	})
	const paginationStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-pagination {

		&__list {
			display: inline-flex;
			list-style-type: none;
			justify-content: center;
			width: 100%;
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
	}
</style>
