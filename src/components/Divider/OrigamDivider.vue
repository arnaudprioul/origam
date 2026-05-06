<template>
	<hr
			:aria-orientation="dividerOrientation"
			:class="dividerClasses"
			:role="dividerRole"
			:style="dividerStyles"
	/>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useAttrs } from 'vue'
	import { useBothColor, useMargin, useProps } from '../../composables'
	import { DIRECTION } from '../../enums'

	import type { IDividerProps } from '../../interfaces'

	import { convertToUnit } from '../../utils'

	const attrs = useAttrs()

	const props = withDefaults(defineProps<IDividerProps>(), {
		direction: DIRECTION.HORIZONTAL
	})

	const {filterProps} = useProps<IDividerProps>(props)

	const dividerOrientation = computed(() => {
		return !attrs.role || attrs.role === 'separator'
				? props.direction
				: undefined
	})
	const dividerRole = computed(() => {
		return `${attrs.role || 'separator'}`
	})

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASSES & STYLES

	const dividerClasses = computed(() => {
		return [
			'origam-divider',
			`origam-divider--${props.direction}`,
			{
				'origam-divider--inset': props.inset
			},
			marginClasses.value,
			props.class
		]
	})
	const dividerStyles = computed(() => {
		const styles = [
			marginStyles.value,
			colorStyles.value,
			props.style
		]

		if (props.length) {
			styles.push({[props.direction === DIRECTION.VERTICAL ? '--origam-divider---max-height' : '--origam-divider---max-width']: convertToUnit(props.length)})
		}

		if (props.thickness) {
			styles.push({[props.direction === DIRECTION.VERTICAL ? '--origam-divider---border-right-width' : '--origam-divider---border-top-width']: convertToUnit(props.thickness)})
		}

		return styles as StyleValue
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
	.origam-divider {
		display: block;
		flex: 1 1 100%;
		height: 0px;
		max-height: 0px;
		max-width: var(--origam-divider---max-width, 100%);
		opacity: 0.12;
		transition: inherit;
		border-style: solid;

		// Per-side longhands so the inline `--origam-divider---border-{top|right}-width`
		// vars set by the script (length/thickness) actually take effect.
		border-top-width: var(--origam-divider---border-top-width, thin);
		border-right-width: 0;
		border-bottom-width: 0;
		border-left-width: 0;
		margin: 0;

		&--vertical {
			align-self: stretch;
			border-top-width: 0;
			border-right-width: var(--origam-divider---border-right-width, thin);
			border-bottom-width: 0;
			border-left-width: 0;
			display: inline-flex;
			height: auto;
			margin-left: -1px;
			max-height: var(--origam-divider---max-height, 100%);
			max-width: 0px;
			vertical-align: text-bottom;
			width: 0px;
		}

		// Inset — indents the divider from both ends by 16px so it doesn't
		// extend to the full container edge (useful inside lists/cards).
		&--inset {
			margin-inline-start: var(--origam-divider--inset---margin-inline-start, 16px);
			max-width: calc(100% - var(--origam-divider--inset---margin-inline-start, 16px));

			&.origam-divider--vertical {
				margin-block-start: var(--origam-divider--inset---margin-block-start, 8px);
				max-height: calc(100% - var(--origam-divider--inset---margin-block-start, 8px) * 2);
			}
		}
	}
</style>
