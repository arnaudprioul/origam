<template>
	<component
			:is="tag"
			:class="labelClasses"
			:style="labelStyles"
			:id="id"
			:name="name"
			@click="handleClick"
	>
		<slot name="default">
			<span>{{ text }}</span><sup v-if="required">*</sup>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef } from 'vue'
	import { useBorder, useBothColor, useDefaults, useMargin, usePadding, useProps, useRounded } from '../../composables'

	import type { ILabelEmits, ILabelProps, ILabelSlots } from '../../interfaces'

	const _props = withDefaults(defineProps<ILabelProps>(), {
		tag: 'label'
	})
	const props = useDefaults(_props)

	const emits = defineEmits<ILabelEmits>()

	defineSlots<ILabelSlots>()

	const handleClick = (e: MouseEvent) => {
		emits('click', e)
	}

	// CLASS & STYLES

	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	// Phase 3 (Vague D) — class-first companion alongside inline styles.
	const {colorClasses, colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const labelStyles = computed(() => {
		return [
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const labelClasses = computed(() => {
		return [
			'origam-label',
			{
				'origam-label--floating': props.floating
			},
			colorClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	// EXPOSE

	const {filterProps} = useProps<ILabelProps>(props)

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-label {
		color:           var(--origam-label---color);
		font-size:       var(--origam-label---font-size);
		font-weight:     var(--origam-label---font-weight);
		line-height:     var(--origam-label---line-height);
		letter-spacing:  var(--origam-label---letter-spacing);
		pointer-events:  var(--origam-label---pointer-events);
		transition-duration:        var(--origam-label---transition-duration);
		transition-timing-function: var(--origam-label---transition-easing);

		// Required indicator — the <sup>*</sup> child element.
		sup {
			color: var(--origam-label---required-indicator-color);
		}

		// Floating state — the cloned label used in the notch animation.
		// Visibility is driven by the label token; the float animation itself
		// is done by OrigamField's JS. The rule here makes the token consumable.
		&--floating {
			font-size:  var(--origam-label__floating---font-size);
			visibility: var(--origam-label__floating---visibility);
		}
	}
</style>

