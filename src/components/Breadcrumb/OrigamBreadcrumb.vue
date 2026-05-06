<template>
	<component
			:is="tag"
			:id="id"
			:class="breadcrumbClasses"
			aria-label="Breadcrumb"
	>
		<origam-defaults-provider :defaults="slotDefaults">
			<slot name="default">
				<template v-if="hasItems">
					<ol class="origam-breadcrumb__items">
						<template
								v-for="(item, index) in items"
								:key="index"
						>
							<li class="origam-breadcrumb__item">
								<slot
										:name="`item.${index}`"
										v-bind="{item, index}"
								>
									<slot
											name="item"
											v-bind="{ item, index }"
									>
										<origam-breadcrumb-item v-bind="item">
											<slot name="item.title"/>
										</origam-breadcrumb-item>
									</slot>
								</slot>

								<template v-if="!isLastItem(index)">
									<slot
											:name="`divider.${index}`"
											v-bind="{divider}"
									>
										<slot
												name="divider"
												v-bind="{divider}"
										>
											<origam-breadcrumb-divider :divider="divider"/>
										</slot>
									</slot>
								</template>
							</li>
						</template>
					</ol>
				</template>
			</slot>
		</origam-defaults-provider>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBreadcrumbDivider, OrigamBreadcrumbItem, OrigamDefaultsProvider } from '../../components'

	import {
		useBorder,
		useColorEffect,
		useDensity,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useStyle
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IBreadcrumbItemProps, IBreadcrumbProps } from '../../interfaces'

	import type { TBreadcrumbItem } from '../../types'

	import { computed, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBreadcrumbProps>(), {
		divider: '/',
		items: () => [] as Array<TBreadcrumbItem>,
		tag: 'nav',
		density: DENSITY.DEFAULT
	})

	const {filterProps} = useProps<IBreadcrumbProps>(props)

	// Push visual-token props down to every descendant `<origam-breadcrumb-item>`
	// as DEFAULTS — items that pass their own props still win.
	const slotDefaults = computed(() => ({
		'origam-breadcrumb-item': {
			density: props.density,
			color: props.color,
			disabled: props.disabled
		}
	}))

	const {colorStyles} = useColorEffect(props, undefined, undefined, computed(() => !!props.disabled))
	const {densityClasses} = useDensity(props)
	const {elevationStyles, elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// `useDefaults` inside each `OrigamBreadcrumbItem` handles the
	// density/color fallback — no manual merge needed here.
	// `disabled` and `isActive` are structural (not visual tokens), so
	// they remain explicitly set on the item object.
	const items = computed(() => {
		return props.items.map((item, index) => {
			return typeof item === 'string' ? {title: item, disabled: isLastItem(index)} : {
				...item,
				disabled: isLastItem(index) || item.disabled,
				isActive: isLastItem(index)
			}
		}) as Array<IBreadcrumbItemProps>
	})
	const isLastItem = (index: number) => {
		return index === props.items.length - 1
	}

	const slots = useSlots()
	const hasItems = computed(() => {
		return slots.default || items.value
	})

	// CLASS & STYLES

	const breadcrumbStyles = computed(() => {
		return [
			elevationStyles.value,
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const breadcrumbClasses = computed(() => {
		return [
			'origam-breadcrumb',
			elevationClasses.value,
			densityClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(breadcrumbStyles)

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
	.origam-breadcrumb {
		// Runtime-composed transition (property + duration + timing from tokens via :root from style-dictionary output)
		--origam-breadcrumb---border-top-width: 0px;
		--origam-breadcrumb---border-left-width: 0px;
		--origam-breadcrumb---border-bottom-width: 0px;
		--origam-breadcrumb---border-right-width: 0px;
		--origam-breadcrumb---border-width: var(--origam-breadcrumb---border-top-width) var(--origam-breadcrumb---border-left-width) var(--origam-breadcrumb---border-bottom-width) var(--origam-breadcrumb---border-right-width);
		--origam-breadcrumb---border-color: currentColor;
		--origam-breadcrumb---border-style: solid;
		--origam-breadcrumb---border-radius: var(--origam-breadcrumb---border-radius-token, 0px);
		--origam-breadcrumb---density: 0px;
		--origam-breadcrumb---box-shadow: var(--origam-shadow-none, none);
		// Hex retirés : rgba(0,0,0,0.87) → var(--origam-color-text-primary) ; rgb(230,230,230) → transparent (token breadcrumb.background)
		--origam-breadcrumb---color: var(--origam-breadcrumb---color-token, var(--origam-color-text-primary));
		--origam-breadcrumb---background: var(--origam-breadcrumb---background-token, transparent);
		--origam-breadcrumb---margin-inline-start: 0px;
		--origam-breadcrumb---margin-inline-end: 0px;
		--origam-breadcrumb---margin-block-start: 0px;
		--origam-breadcrumb---margin-block-end: 0px;
		--origam-breadcrumb---padding-block-start: 8px;
		--origam-breadcrumb---padding-block-end: 8px;
		--origam-breadcrumb---padding-inline-start: 8px;
		--origam-breadcrumb---padding-inline-end: 8px;
		--origam-breadcrumb---transition-duration: 0.2s, 0.1s;
		--origam-breadcrumb---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-breadcrumb---transition-property: transform, color;
		--origam-breadcrumb---transition: var(--origam-breadcrumb---transition-property) var(--origam-breadcrumb---transition-duration) var(--origam-breadcrumb---transition-timing-function);

		transition: var(--origam-breadcrumb---transition);

		background: var(--origam-breadcrumb---background);
		box-shadow: var(--origam-breadcrumb---box-shadow);
		color: var(--origam-breadcrumb---color);

		border-color: var(--origam-breadcrumb---border-color);
		border-style: var(--origam-breadcrumb---border-style);
		border-width: var(--origam-breadcrumb---border-width);
		border-radius: var(--origam-breadcrumb---border-radius);

		padding-block-start: calc(var(--origam-breadcrumb---padding-block-start) - var(--origam-breadcrumb---density));
		padding-block-end: calc(var(--origam-breadcrumb---padding-block-end) - var(--origam-breadcrumb---density));
		padding-inline-start: calc(var(--origam-breadcrumb---padding-inline-start) - var(--origam-breadcrumb---density));
		padding-inline-end: calc(var(--origam-breadcrumb---padding-inline-end) - var(--origam-breadcrumb---density));

		margin-block-start: var(--origam-breadcrumb---margin-block-start);
		margin-block-end: var(--origam-breadcrumb---margin-block-end);
		margin-inline-start: var(--origam-breadcrumb---margin-inline-start);
		margin-inline-end: var(--origam-breadcrumb---margin-inline-end);

		&__items {
			display: flex;
			align-items: center;
			line-height: 1.6;
			list-style: none;
			margin-block: 0;
			padding-inline-start: 0;
		}

		&__item {
			display: flex;
			align-items: center;
		}

		&--elevated {
			// Hex retirés : rgba(0,0,0,0.05) + rgba(0,0,0,0.08) → var(--origam-shadow-md)
			--origam-breadcrumb---box-shadow: var(--origam-shadow-md, 0px 6px 24px 0px rgba(0,0,0,0.05), 0px 0px 0px 1px rgba(0,0,0,0.08));
		}

		&--border {
			--origam-breadcrumb---border-width: thin;
		}

		// Rounded variants — mirrors OrigamBtn / OrigamSheet pattern.
		// Direct border-radius declarations ensure the computed property
		// updates immediately without CSS var cascade delays.
		&--rounded {
			border-radius: var(--origam-radius-2xl, 24px);
		}

		&--rounded-x-small {
			border-radius: var(--origam-radius-xs, 2px);
		}

		&--rounded-small {
			border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-default {
			border-radius: var(--origam-radius-md, 8px);
		}

		&--rounded-medium {
			border-radius: var(--origam-radius-lg, 12px);
		}

		&--rounded-large {
			border-radius: var(--origam-radius-xl, 16px);
		}

		&--rounded-x-large {
			border-radius: var(--origam-radius-2xl, 24px);
		}

		// Density formula `padding - density` → comfortable=−8 (grows), compact=+8 (shrinks).
		&--density-comfortable {
			--origam-breadcrumb---density: -8px;
		}

		&--density-default {
			--origam-breadcrumb---density: 0px;
		}

		&--density-compact {
			--origam-breadcrumb---density: 8px;
		}
	}
</style>

