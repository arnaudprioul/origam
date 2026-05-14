<template>
	<component
			:is="tag"
			:class="cardTextClasses"
			:style="cardTextStyles"
	>
		<slot name="default">
			<span>{{ text }}</span>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useProps , useStyle} from "../../composables"
	import type { ICardTextProps } from '../../interfaces'

	import { computed, StyleValue } from 'vue'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props and filter for the card text body area.
	 ********************************************************/

	const props = withDefaults(defineProps<ICardTextProps>(), {tag: 'div'})

	const {filterProps} = useProps<ICardTextProps>(props)

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Composes BEM classes and passes through host styles.
	 ********************************************************/

	const cardTextStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const cardTextClasses = computed(() => {
		return [
			'origam-card-text',
			props.class
		]
	})
	const {id, css, load, isLoaded, unload} = useStyle(cardTextStyles)


	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface: filterProps.
	 ********************************************************/

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
	.origam-card-text {
		flex: var(--origam-card-text---flex);
		font-size: var(--origam-card-text---font-size);
		font-weight: var(--origam-card-text---font-weight);
		letter-spacing: var(--origam-card-text---letter-spacing);
		text-transform: var(--origam-card-text---text-transform);

		padding-block-start: var(--origam-card-text---padding-block-start);
		padding-block-end: var(--origam-card-text---padding-block-end);
		padding-inline-start: var(--origam-card-text---padding-inline-start);
		padding-inline-end: var(--origam-card-text---padding-inline-end);

		margin-block-start: var(--origam-card-text---margin-block-start);
		margin-block-end: var(--origam-card-text---margin-block-end);
		margin-inline-start: var(--origam-card-text---margin-inline-start);
		margin-inline-end: var(--origam-card-text---margin-inline-end);

		border-color: var(--origam-card-text---border-color);
		border-style: var(--origam-card-text---border-style);
		border-width: var(--origam-card-text---border-width);
		border-radius: var(--origam-card-text---border-radius);
	}
</style>

<style>
	:root {
		--origam-card-text---flex: 1 1 auto;
		--origam-card-text---font-size: 0.875rem;
		--origam-card-text---font-weight: 400;
		--origam-card-text---letter-spacing: 0.0178571429em;
		--origam-card-text---text-transform: none;

		--origam-card-text---border-top-width: 0;
		--origam-card-text---border-left-width: 0;
		--origam-card-text---border-bottom-width: 0;
		--origam-card-text---border-right-width: 0;
		--origam-card-text---border-width: var(--origam-card-text---border-top-width) var(--origam-card-text---border-left-width) var(--origam-card-text---border-bottom-width) var(--origam-card-text---border-right-width);
		--origam-card-text---border-color: rgba(0, 0, 0, 0.87);
		--origam-card-text---border-style: solid;
		--origam-card-text---border-start-start-radius: 0;
		--origam-card-text---border-start-end-radius: 0;
		--origam-card-text---border-end-start-radius: 0;
		--origam-card-text---border-end-end-radius: 0;
		--origam-card-text---border-radius: var(--origam-card-text---border-start-start-radius) var(--origam-card-text---border-start-end-radius) var(--origam-card-text---border-end-start-radius) var(--origam-card-text---border-end-end-radius);

		--origam-card-text---padding-block-start: 1rem;
		--origam-card-text---padding-block-end: 1rem;
		--origam-card-text---padding-inline-start: 1rem;
		--origam-card-text---padding-inline-end: 1rem;

		--origam-card-text---margin-block-start: 0;
		--origam-card-text---margin-block-end: 0;
		--origam-card-text---margin-inline-start: 0;
		--origam-card-text---margin-inline-end: 0;
	}
</style>
