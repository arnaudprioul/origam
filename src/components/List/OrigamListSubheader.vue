<template>
	<component
			:is="tag"
			:class="listSubheaderClasses"
			:style="listSubheaderStyles"
	>
		<div
				v-if="hasText"
				class="origam-list-subheader__text"
		>
			<slot
					name="default"
					v-bind="{title}"
			>
				{{ title }}
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useSlots } from 'vue'
	import { useBorder, useBothColor, useMargin, usePadding, useProps, useRounded } from '../../composables'

	import type { IListSubheader } from '../../interfaces'

	const props = withDefaults(defineProps<IListSubheader>(), {tag: 'div'})

	const {filterProps} = useProps<IListSubheader>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const slots = useSlots()

	const hasText = computed(() => {
		return slots.default || props.title
	})

	// CLASS & STYLES

	const listSubheaderStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const listSubheaderClasses = computed(() => {
		return [
			'origam-list-subheader',
			{
				'origam-list-subheader--inset': props.inset,
				'origam-list-subheader--sticky': props.sticky
			},
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
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
	// Bug fix (port Origam): replaced Vuetify vars `--v-theme-on-surface` / `--v-medium-emphasis-opacity`
	// with Origam semantic tokens. Defaults now provided by tokens/component/list.json subheader section.
	.origam-list-subheader {
		align-items: center;
		background: inherit;
		color: var(--origam-list-subheader---color, var(--origam-color-text-secondary));
		display: flex;
		font-size: var(--origam-list-subheader---font-size, 0.875rem);
		font-weight: var(--origam-list-subheader---font-weight, 400);
		line-height: var(--origam-list-subheader---line-height, 1.375rem);
		padding-inline-end: var(--origam-list-subheader---padding-inline-end, 16px);
		min-height: var(--origam-list-subheader---min-height, 40px);
		transition: var(--origam-list-subheader---transition-duration, 0.2s) min-height var(--origam-list-subheader---transition-easing, cubic-bezier(0.4, 0, 0.2, 1));

		&__text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&--inset {
			--origam-list---indent-padding: var(--origam-list-subheader---inset-indent-padding, 32px);
		}

		&--sticky {
			background: inherit;
			left: 0;
			position: sticky;
			top: 0;
			z-index: 1;
		}
	}
</style>
