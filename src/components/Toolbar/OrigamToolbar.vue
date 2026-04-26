<template>
	<component
			:is="tag"
			:id="id"
			:class="barClasses"
	>
		<slot name="default">
			<div class="origam-toolbar__wrapper">
				<div
						v-if="hasPrepend"
						class="origam-toolbar__prepend"
				>
					<slot name="prepend"/>
				</div>
				<div
						v-if="hasTitle"
						class="origam-toolbar__title"
				>
					<slot name="title">
						<origam-title :text="title"/>
					</slot>
				</div>
				<div class="origam-toolbar__content">
					<slot name="content"/>
				</div>
				<div
						v-if="hasAppend"
						class="origam-toolbar__append"
				>
					<slot name="append"/>
				</div>
			</div>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, toRef, useSlots } from 'vue'
	import { OrigamTitle } from "../../components"
	import {
		useBorder,
		useBothColor,
		useDensity,
		useDimension,
		useElevation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useRtl,
		useStyle
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IToolbarProps } from '../../interfaces'

	const props = withDefaults(defineProps<IToolbarProps>(), {
		tag: 'header',
		density: DENSITY.DEFAULT,
		modelValue: true
	})

	const {filterProps} = useProps<IToolbarProps>(props)

	const {rtlClasses} = useRtl()

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {elevationClasses, elevationStyles} = useElevation(props, toRef(props, 'flat'), toRef(props, 'bgColor'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {positionStyles, positionClasses} = usePosition(props)

	const slots = useSlots()

	const hasPrepend = computed(() => {
		return slots.prepend
	})
	const hasTitle = computed(() => {
		return !!(props.title || slots.title)
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	// CLASS & STYLES

	const barStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			positionStyles.value,
			dimensionStyles.value,
			elevationStyles.value,
			props.style
		]
	})
	const barClasses = computed(() => {
		return [
			'origam-toolbar',
			{
				'origam-toolbar--collapse': props.collapse,
				'origam-toolbar--flat': props.flat,
				'origam-toolbar--floating': props.floating
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			rtlClasses.value,
			positionClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(barStyles)

	// EXPOSE

	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-toolbar {
		$this: &;

		max-width: var(--origam-toolbar---max-width);
		width: var(--origam-toolbar---width);
		height: var(--origam-toolbar---height);
		box-sizing: var(--origam-toolbar---box-sizing);

		overflow: var(--origam-toolbar---overflow);

		position: var(--origam-toolbar---position);
		z-index: var(--origam-toolbar---zIndex);

		transform: var(--origam-toolbar---transform);
		transition-duration: var(--origam-toolbar---transition-duration);
		transition-property: var(--origam-toolbar---transition-property);
		transition-timing-function: var(--origam-toolbar---transition-timing-function);

		border-color: var(--origam-toolbar---border-color);
		border-style: var(--origam-toolbar---border-style);
		border-width: var(--origam-toolbar---border-width);
		border-radius: var(--origam-toolbar---border-radius);

		background: var(--origam-toolbar---background);
		box-shadow: var(--origam-toolbar---box-shadow);
		color: var(--origam-toolbar---color);

		&--border {
			--origam-toolbar---border-width: thin;
			--origam-toolbar---box-shadow: none;
		}

		&--rounded {
			--origam-toolbar---border-radius: 4px;
		}

		&--absolute {
			--origam-toolbar---position: absolute;
		}

		&--fixed {
			--origam-toolbar---position: fixed;
		}

		&--sticky {
			--origam-toolbar---position: sticky;
		}

		&--collapse {
			--origam-toolbar---max-width: 112px;
			--origam-toolbar---overflow: hidden;
			--origam-toolbar---border-end-end-radius: 24px;

			#{$this}__title {
				--origam-toolbar__title---display: none;
			}
		}

		&--flat {
			--origam-toolbar---box-shadow: none;
		}

		&--floating {
			--origam-toolbar---display: inline-flex;
		}

		&__wrapper {
			align-items: var(--origam-toolbar__wrapper---align-items);
			display: var(--origam-toolbar__wrapper---display);
			flex: var(--origam-toolbar__wrapper---flex);
			flex-direction: var(--origam-toolbar__wrapper---flex-direction);
			justify-content: var(--origam-toolbar__wrapper---justify-content);
			height: var(--origam-toolbar__wrapper---height);
			flex-wrap: var(--origam-toolbar__wrapper---flex-wrap);
		}

		&__content,
		&__extension {
			align-items: var(--origam-toolbar__content---align-items);
			display: var(--origam-toolbar__content---display);
			position: var(--origam-toolbar__content---position);
			transition: var(--origam-toolbar__content---transition);
			flex-grow: var(--origam-toolbar__content---flex-grow);
			flex-basis: var(--origam-toolbar__content---flex-basis);
			max-width: var(--origam-toolbar__content---max-width);
		}

		&__content {
			height: var(--origam-toolbar__content---height);

			> .origam-btn:first-child {
				margin-inline-start: 10px;
			}

			> .origam-btn:last-child {
				margin-inline-end: 10px;
			}

			> #{$this}__title {
				--origam-toolbar__title---margin-inline-start: 16px;
			}
		}

		&__prepend {
			align-items: var(--origam-toolbar__prepend---align-items);
			align-self: var(--origam-toolbar__prepend---align-self);
			display: var(--origam-toolbar__prepend---display);
			margin-inline: var(--origam-toolbar__prepend---margin-inline);
			height: var(--origam-toolbar__prepend---height);
			flex-grow: var(--origam-toolbar__prepend---flex-grow);
			flex-shrink: var(--origam-toolbar__prepend---flex-shrink);
			flex-basis: var(--origam-toolbar__prepend---flex-basis);
		}

		&__append {
			align-items: var(--origam-toolbar__append---align-items);
			align-self: var(--origam-toolbar__append---align-self);
			display: var(--origam-toolbar__append---display);
			margin-inline: var(--origam-toolbar__append---margin-inline);
			height: var(--origam-toolbar__append---height);
			flex-grow: var(--origam-toolbar__append---flex-grow);
			flex-shrink: var(--origam-toolbar__append---flex-shrink);
			flex-basis: var(--origam-toolbar__append---flex-basis);
		}

		&__title {
			align-items: var(--origam-toolbar__title---align-items);
			height: var(--origam-toolbar__title---height);
			flex-grow: var(--origam-toolbar__title---flex-grow);
			flex-shrink: var(--origam-toolbar__title---flex-shrink);
			flex-basis: var(--origam-toolbar__title---flex-basis);
			align-self: var(--origam-toolbar__title---align-self);
			padding-block: var(--origam-toolbar__title---padding-block);
			padding-inline: var(--origam-toolbar__title---padding-inline);
			min-width: var(--origam-toolbar__title---min-width);
			margin-inline: var(--origam-toolbar__title---margin-inline);
			display: var(--origam-toolbar__title---display);

			.origam-title {
				font-size: var(--origam-toolbar__title---font-size);
				font-weight: var(--origam-toolbar__title---font-weight);
				letter-spacing: var(--origam-toolbar__title---letter-spacing);
				line-height: var(--origam-toolbar__title---line-height);
				text-transform: var(--origam-toolbar__title---text-transform);
				margin-block: 0;
			}
		}

		&__items {
			display: flex;
			height: inherit;
			align-self: stretch;

			> .origam-btn {
				border-radius: 0;
			}
		}
	}
</style>



