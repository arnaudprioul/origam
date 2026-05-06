<template>
	<origam-expand-y @after-leave="handleAfterLeave">
		<component
				:is="tag"
				v-show="isSelected"
				:class="expansionPanelContentClasses"
				:style="expansionPanelContentStyles"
		>
			<div class="origam-expansion-panel-content__wrapper">
				<template v-if="loaderConfig.isActive && loaderConfig.kind === 'skeleton'">
					<slot name="loader">
						<origam-skeleton variant="text" :loading="true" v-bind="loaderConfig.overrides"/>
						<origam-skeleton variant="text" :loading="true" v-bind="loaderConfig.overrides"/>
						<origam-skeleton variant="text" :loading="true" v-bind="loaderConfig.overrides"/>
					</slot>
				</template>

				<template v-else-if="loaderConfig.isActive">
					<slot name="loader">
						<origam-progress
								:active="true"
								:indeterminate="loaderConfig.indeterminate"
								:model-value="loaderConfig.modelValue"
								:type="loaderConfig.kind === 'circular' ? PROGRESS_TYPE.CIRCULAR : PROGRESS_TYPE.LINEAR"
								:class="['origam-expansion-panel-content__progress', `origam-expansion-panel-content__progress--${loaderConfig.kind}`]"
								thickness="4"
								v-bind="loaderConfig.overrides"
						/>
					</slot>
				</template>

				<template v-if="!loaderConfig.isActive || loaderConfig.kind !== 'skeleton'">
					<template v-if="hasContent">
						<slot name="default">
							<template v-if="isComponent">
								<component :is="content"/>
							</template>

							<template v-else>
								{{ content }}
							</template>
						</slot>
					</template>
				</template>
			</div>
		</component>
	</origam-expand-y>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, StyleValue, toRef } from 'vue'
	import { OrigamExpandY, OrigamProgress, OrigamSkeleton } from '../../components'

	import {
		useBorder,
		useBothColor,
		useDensity,
		useLazy,
		useLoader,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import { PROGRESS_TYPE } from '../../enums'

	import { ORIGAM_EXPANSION_PANEL_KEY } from '../../consts'

	import type { IExpansionPanelContentProps } from '../../interfaces'

	const props = withDefaults(defineProps<IExpansionPanelContentProps>(), {
		tag: 'div'
	})

	const {filterProps} = useProps<IExpansionPanelContentProps>(props)

	const expansionPanel = inject(ORIGAM_EXPANSION_PANEL_KEY)

	if (!expansionPanel) throw new Error('[Origam] expansion-panel-content needs to be placed inside expansion-panel')

	const {hasContent, onAfterLeave: handleAfterLeave} = useLazy(props, expansionPanel.isSelected)

	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {loaderClasses, loaderConfig} = useLoader(props, 'line')

	const isSelected = computed(() => {
		return expansionPanel.isSelected.value
	})
	const isComponent = computed(() => {
		return typeof props.content !== 'string'
	})

	// CLASSES & STYLES

	const expansionPanelContentStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const expansionPanelContentClasses = computed(() => {
		return [
			'origam-expansion-panel-content',
			loaderClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			roundedClasses.value,
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
	// Defaults provided by tokens/component/expansion-panel.json content section.
	.origam-expansion-panel-content {
		display: var(--origam-expansion-panel__content---display, flex);

		&__wrapper {
			padding-block-start: var(--origam-expansion-panel__content---padding-block-start, 8px);
			padding-block-end: var(--origam-expansion-panel__content---padding-block-end, 16px);
			padding-inline-start: var(--origam-expansion-panel__content---padding-inline-start, 24px);
			padding-inline-end: var(--origam-expansion-panel__content---padding-inline-end, 24px);
			flex: var(--origam-expansion-panel__content---flex, 1 1 auto);
			max-width: var(--origam-expansion-panel__content---max-width, 100%);
		}
	}
</style>

