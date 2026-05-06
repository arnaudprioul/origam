<template>
	<component
			:is="tag"
			:class="mainClasses"
			:style="mainStyles"
	>
		<div
				:class="{'origam-main__scroller': props.scrollable}"
				class="origam-main__wrapper"
		>
			<slot name="default"/>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue } from 'vue'
	import { useBorder, useLayout, useMargin, usePadding, useProps, useRounded, useSsrBoot } from '../../composables'

	import type { IMainProps } from '../../interfaces'

	const props = withDefaults(defineProps<IMainProps>(), {tag: 'main'})

	const {filterProps} = useProps<IMainProps>(props)

	const {mainStyles: mainLayoutStyles} = useLayout()
	const {ssrBootStyles} = useSsrBoot()
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	// CLASS & STYLES

	const mainStyles = computed(() => {
		return [
			mainLayoutStyles.value,
			ssrBootStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const mainClasses = computed(() => {
		return [
			'origam-main',
			{
				'origam-main--scrollable': props.scrollable
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
	// Pre-fix every `var(--origam-main--{prop})` read used DOUBLE-dash
	// while the token build emits TRIPLE-dash (`--origam-main---{prop}`,
	// matching the project's component block/property convention). All
	// 11 reads resolved to nothing, so the main element used CSS browser
	// defaults instead of the design tokens (`flex: 1 0 auto`,
	// `max-width: 100%`, transitions, etc.). Same family of bug as the
	// OrigamDrawer fix in 0b7ea51 — confirmed by token-grep:
	//   tokens emit: 13× `--origam-main---*` triple-dash
	//   SCSS read:   11× `--origam-main--*`  double-dash (resolved → ∅)
	.origam-main {
		$this: &;

		flex: var(--origam-main---flex);
		max-width: var(--origam-main---max-width);
		transition-duration: var(--origam-main---transition-duration);
		transition-property: var(--origam-main---transition-property);
		transition-timing-function: var(--origam-main---transition-timing-function);
		padding-inline-start: var(--origam-layout---position-left);
		padding-inline-end: var(--origam-layout---position-right);
		padding-block-start: var(--origam-layout---position-top);
		padding-block-end: var(--origam-layout---position-bottom);

		&__scroller {
			max-width: var(--origam-main__scroller---max-width);
			position: var(--origam-main__scroller---position);
		}

		&--scrollable {
			display: var(--origam-main---display);
			position: var(--origam-main---position);
			top: var(--origam-main---position-top);
			left: var(--origam-main---position-left);
			width: var(--origam-main---width);
			height: var(--origam-main---height);

			#{$this}__scroller {
				flex: 1 1 auto;
				overflow-y: auto;

				--origam-layout---position-left: 0px;
				--origam-layout---position-right: 0px;
				--origam-layout---position-top: 0px;
				--origam-layout---position-bottom: 0px;
			}
		}
	}
</style>

