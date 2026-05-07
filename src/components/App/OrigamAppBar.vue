<template>
	<origam-toolbar
			ref="origamToolbarRef"
			:class="appBarClasses"
			:collapse="isCollapsed"
			:flat="isFlat"
			:style="appBarStyles"
			v-bind="toolbarProps"
	>
		<template
				v-if="hasAppend"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="hasPrepend"
				#prepend
		>
			<slot name="prepend"/>
			<div
					v-if="hasImage"
					class="origam-bar__img"
			>
				<slot name="img">
					<origam-img v-bind="image"/>
				</slot>
			</div>
		</template>

		<template
				v-if="hasContent"
				#content
		>
			<slot name="content"/>
		</template>

		<template
				v-if="slots.default"
				#default
		>
			<slot name="default"/>
		</template>
	</origam-toolbar>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamImg, OrigamToolbar } from '../../components'

	import { useActive, useLayoutItem, useProps, useScroll, useSsrBoot, useToggleScope } from '../../composables'

	import { BLOCK, DENSITY } from '../../enums'

	import type { IAppBarProps } from '../../interfaces'

	import type { TOrigamToolbar } from "../../types"

	import { forwardRefs, int } from "../../utils"

	import { computed, ComputedRef, ref, shallowRef, StyleValue, toRef, useSlots, watchEffect } from 'vue'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits and slot detection for the AppBar component.
	 ********************************************************/
	const props = withDefaults(defineProps<IAppBarProps>(), {
		tag: 'header',
		density: DENSITY.DEFAULT,
		scrollThreshold: 300,
		location: BLOCK.TOP,
		modelValue: true
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IAppBarProps>(props)

	const {ssrBootStyles} = useSsrBoot()
	const slots = useSlots()

	const origamToolbarRef = ref<TOrigamToolbar>()
	const toolbarProps = computed(() => {
		return origamToolbarRef.value?.filterProps(props, ['class', 'style', 'collapse', 'flat'])
	})

	const hasImage = computed(() => {
		return !!(props.image || slots.img)
	})
	const hasPrepend = computed(() => {
		return hasImage.value || slots.prepend
	})
	const hasContent = computed(() => {
		return slots.content
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	const {isActive, activeClasses} = useActive(props, 'modelValue')

	/*********************************************************
	 * Scroll
	 *
	 * @description
	 * Scroll-behaviour driven visibility, collapse and
	 * elevation logic for the sticky app bar.
	 ********************************************************/
	const scrollBehavior = computed(() => {
		const behavior = new Set(props.scrollBehavior?.split(' ') ?? [])

		return {
			hide: behavior.has('hide'),
			// fullyHide: behavior.has('fully-hide'),
			inverted: behavior.has('inverted'),
			collapse: behavior.has('collapse'),
			elevate: behavior.has('elevate'),
			fadeImage: behavior.has('fade-image')
			// shrink: behavior.has('shrink'),
		}
	})
	const canScroll = computed(() => {
		const behavior = scrollBehavior.value

		return (
				behavior.hide ||
				behavior.inverted ||
				behavior.collapse ||
				behavior.elevate ||
				behavior.fadeImage ||
				!isActive.value
		)
	})

	const {
		currentScroll,
		scrollThreshold,
		isScrollingUp,
		scrollRatio
	} = useScroll(props, {canScroll})
	useToggleScope(computed(() => !!props.scrollBehavior), () => {
		watchEffect(() => {
			if (scrollBehavior.value.hide) {
				if (scrollBehavior.value.inverted) {
					isActive.value = currentScroll.value > scrollThreshold.value
				} else {
					isActive.value = isScrollingUp.value || (currentScroll.value < scrollThreshold.value)
				}
			} else {
				isActive.value = true
			}
		})
	})

	const isCollapsed = computed(() => props.collapse || (
			scrollBehavior.value.collapse &&
			(scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0)
	))
	const isFlat = computed(() => props.flat || (
			scrollBehavior.value.elevate &&
			(scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0)
	))
	const height = computed(() => {
		if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0

		return props.height ?? 0
	})

	/*********************************************************
	 * Layout
	 *
	 * @description
	 * Registers the bar as a layout item so sibling regions
	 * (main, nav drawer) offset correctly.
	 ********************************************************/
	const {layoutItemStyles} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order as string)),
		position: toRef(props, 'location'),
		layoutSize: height,
		elementSize: shallowRef(undefined),
		active: isActive as unknown as ComputedRef,
		absolute: toRef(props, 'absolute')
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Composes layout item styles and active modifier class.
	 ********************************************************/
	const appBarStyles = computed(() => {
		return [
			layoutItemStyles.value,
			ssrBootStyles.value,
			props.style
		] as StyleValue
	})
	const appBarClasses = computed(() => {
		return [
			'origam-app-bar',
			`origam-app-bar--${props.location}`,
			activeClasses.value,
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface: filterProps forwarded from toolbar ref.
	 ********************************************************/
	defineExpose(forwardRefs({
		filterProps
	}, origamToolbarRef))

</script>
