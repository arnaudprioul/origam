<template>
	<component
			:is="tag"
			:class="breadcrumbDividerClasses"
			:style="breadcrumbDividerStyles"
	>
		<slot name="default">
			<template v-if="isIcon">
				<origam-icon :icon="divider"/>
			</template>
			<template v-else>
				{{ divider }}
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamIcon } from '../../components'

	import { useBothColor, useDensity, useMargin, usePadding, useProps, useSize, useStyle } from '../../composables'

	import { MDI_ICONS } from '../../enums'

	import type { IBreadcrumbDividerProps } from '../../interfaces'
	import type { TValueOf } from "../../types"

	import { computed, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IBreadcrumbDividerProps>(), {tag: 'span', divider: '/'})

	const {filterProps} = useProps<IBreadcrumbDividerProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {sizeStyles, sizeClasses} = useSize(props)

	const isIcon = computed(() => {
		return typeof props.divider !== 'string' || Object.values(MDI_ICONS).includes(props.divider as TValueOf<typeof MDI_ICONS>)
	})

	// CLASS & STYLES

	const breadcrumbDividerStyles = computed(() => {
		return [
			colorStyles.value,
			paddingStyles.value,
			marginStyles.value,
			sizeStyles.value,
			props.style
		] as StyleValue
	})
	const breadcrumbDividerClasses = computed(() => {
		return [
			'origam-breadcrumb-divider',
			densityClasses.value,
			sizeClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(breadcrumbDividerStyles)

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
	.origam-breadcrumbs-divider {
		// Default values for CSS custom properties — moved from :root {} global block
		// (no hex were present; values are keyword values only)
		--origam-breadcrumb-divider---border-top-width: 0px;
		--origam-breadcrumb-divider---border-left-width: 0px;
		--origam-breadcrumb-divider---border-bottom-width: 0px;
		--origam-breadcrumb-divider---border-right-width: 0px;
		--origam-breadcrumb-divider---border-width: var(--origam-breadcrumb-divider---border-top-width) var(--origam-breadcrumb-divider---border-left-width) var(--origam-breadcrumb-divider---border-bottom-width) var(--origam-breadcrumb-divider---border-right-width);
		--origam-breadcrumb-divider---border-color: currentColor;
		--origam-breadcrumb-divider---border-style: solid;
		--origam-breadcrumb-divider---border-radius: 0px;
		--origam-breadcrumb-divider---density: 0px;
		--origam-breadcrumb-divider---box-shadow: var(--origam-shadow-none, none);
		// color: inherit → token breadcrumb.divider.color → {color.text.secondary} with inherit fallback preserved
		--origam-breadcrumb-divider---color: var(--origam-breadcrumb-divider---color-token, inherit);
		--origam-breadcrumb-divider---opacity: 1;
		--origam-breadcrumb-divider---background: transparent;
		--origam-breadcrumb-divider---margin-inline-start: 0px;
		--origam-breadcrumb-divider---margin-inline-end: 0px;
		--origam-breadcrumb-divider---margin-block-start: 0px;
		--origam-breadcrumb-divider---margin-block-end: 0px;
		--origam-breadcrumb-divider---padding-block-start: 0px;
		--origam-breadcrumb-divider---padding-block-end: 0px;
		// Token breadcrumb.divider.padding-inline → {space.2} = 8px
		--origam-breadcrumb-divider---padding-inline-start: var(--origam-breadcrumb-divider---padding-inline, 8px);
		--origam-breadcrumb-divider---padding-inline-end: var(--origam-breadcrumb-divider---padding-inline, 8px);
		--origam-breadcrumb-divider---transition-duration: 0.2s, 0.1s;
		--origam-breadcrumb-divider---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-breadcrumb-divider---transition-property: transform, color;
		--origam-breadcrumb-divider---transition: var(--origam-breadcrumb-divider---transition-property) var(--origam-breadcrumb-divider---transition-duration) var(--origam-breadcrumb-divider---transition-timing-function);

		display: inline-block;
		vertical-align: middle;

		transition: var(--origam-breadcrumb-divider---transition);

		background: var(--origam-breadcrumb-divider---background);
		box-shadow: var(--origam-breadcrumb-divider---box-shadow);
		color: var(--origam-breadcrumb-divider---color);
		opacity: var(--origam-breadcrumb-divider---opacity);

		border-color: var(--origam-breadcrumb-divider---border-color);
		border-style: var(--origam-breadcrumb-divider---border-style);
		border-width: var(--origam-breadcrumb-divider---border-width);
		border-radius: var(--origam-breadcrumb-divider---border-radius);

		padding-block-start: calc(var(--origam-breadcrumb-divider---padding-block-start) - var(--origam-breadcrumb-divider---density));
		padding-block-end: calc(var(--origam-breadcrumb-divider---padding-block-end) - var(--origam-breadcrumb-divider---density));
		padding-inline-start: calc(var(--origam-breadcrumb-divider---padding-inline-start) - var(--origam-breadcrumb-divider---density));
		padding-inline-end: calc(var(--origam-breadcrumb-divider---padding-inline-end) - var(--origam-breadcrumb-divider---density));

		margin-block-start: var(--origam-breadcrumb-divider---margin-block-start);
		margin-block-end: var(--origam-breadcrumb-divider---margin-block-end);
		margin-inline-start: var(--origam-breadcrumb-divider---margin-inline-start);
		margin-inline-end: var(--origam-breadcrumb-divider---margin-inline-end);

		// Density formula `padding - density` → comfortable=−8 (grows), compact=+8 (shrinks).
		&--density-comfortable {
			--origam-breadcrumb-divider---density: -8px;
		}

		&--density-default {
			--origam-breadcrumb-divider---density: 0px;
		}

		&--density-compact {
			--origam-breadcrumb-divider---density: 8px;
		}
	}
</style>
