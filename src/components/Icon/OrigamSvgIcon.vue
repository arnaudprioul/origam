<template>
	<component
			:is="tag"
			:class="iconClasses"
			:style="iconStyles"
	>
		<svg
				aria-hidden="true"
				class="origam-icon__svg"
				role="img"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
		>
			<template v-if="!isArray(icon)">
				<path :d="icon"></path>
			</template>
			<template v-else>
				<template
						v-for="(path, index) in icon"
						:key="index"
				>
					<template v-if="isArray(path)">
						<path
								:d="path[0]"
								:fill-opacity="path[1]"
						></path>
					</template>
					<template v-else>
						<path :d="path"></path>
					</template>
				</template>
			</template>
		</svg>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { useProps } from "../../composables"
	import { SIZES_ARRAY } from '../../consts'

	import type { IIconComponentProps } from '../../interfaces'
	import type { TSize } from '../../types'

	import { convertToUnit } from '../../utils'

	const props = withDefaults(defineProps<IIconComponentProps>(), {tag: 'div'})

	const {filterProps} = useProps<IIconComponentProps>(props)

	const isArray = (data: any) => {
		return Array.isArray(data)
	}

	// CLASS & STYLES

	const iconStyles = computed(() => {
		const numericSize = typeof props.size === 'number'
				? convertToUnit(props.size)
				: undefined

		return [
			{
				'font-size': numericSize,
				'width': numericSize,
				'height': numericSize
			},
			props.style
		] as StyleValue
	})

	const iconClasses = computed(() => {
		const namedSize = typeof props.size === 'string' && SIZES_ARRAY.includes(props.size as TSize)
				? `origam-icon--size-${props.size}`
				: undefined

		return [
			'origam-icon',
			'origam-icon--svg',
			namedSize,
			props.class
		]
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
	.origam-icon--svg {
		// Make the inline SVG inherit the host's text color so the design-token
		// `currentColor` chain works end-to-end (set `color: …` on an ancestor
		// → the path is filled with that colour). Width/height mirror the
		// font-size driven by the named-size class on .origam-icon.
		display: inline-flex;
		align-items: center;
		justify-content: center;

		.origam-icon__svg {
			width: 1em;
			height: 1em;
			fill: currentColor;
		}
	}
</style>
