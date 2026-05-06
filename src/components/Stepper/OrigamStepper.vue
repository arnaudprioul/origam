<template>
	<nav
			:id="id"
			:class="stepperClasses"
			aria-label="Progress steps"
	>
		<slot name="default">
			<template v-if="hasItems">
				<template
						v-for="(item, index) in items"
						:key="index"
				>
					<!-- Connector BEFORE item (not before first) -->
					<template v-if="showConnectors && index > 0">
						<span
								:class="connectorClasses(index)"
								aria-hidden="true"
						/>
					</template>

					<origam-stepper-item
							v-bind="item"
							:index="index"
							:data-cy="`stepper-item-${index}`"
							@click="handleItemClick"
					/>
				</template>
			</template>
		</slot>
	</nav>
</template>

<script
		lang="ts"
		setup
>
	import { computed, provide, ref, StyleValue, useSlots, watch } from 'vue'

	import { OrigamStepperItem } from '../../components'
	import { ORIGAM_STEPPER_KEY } from '../../consts'
	import { DENSITY, SIZES } from '../../enums'
	import {
		useColorEffect,
		useDensity,
		useProps,
		useSize,
		useStyle
	} from '../../composables'

	import type { IStepperProps } from '../../interfaces'
	import type { TStepperItemStatus } from '../../types'

	const props = withDefaults(defineProps<IStepperProps>(), {
		orientation: 'horizontal',
		clickable: false,
		showConnectors: true,
		modelValue: 0,
		density: DENSITY.DEFAULT,
		size: SIZES.DEFAULT
	})

	const emit = defineEmits<{
		(e: 'update:modelValue', value: number): void
	}>()

	const { filterProps } = useProps<IStepperProps>(props)

	const slots = useSlots()

	// Internal reactive model (writable ref synced with prop)
	const internalModel = ref<number>(props.modelValue ?? 0)

	watch(() => props.modelValue, (val) => {
		if (val !== undefined) internalModel.value = val
	})

	// Provide stepper context for child items
	provide(ORIGAM_STEPPER_KEY, {
		modelValue: internalModel,
		orientation: computed(() => props.orientation ?? 'horizontal'),
		clickable: computed(() => props.clickable ?? false),
		color: computed(() => props.color)
	})

	const handleItemClick = (index: number) => {
		if (!props.clickable) return
		internalModel.value = index
		emit('update:modelValue', index)
	}

	// Items either from prop or from slot
	const hasItems = computed(() => {
		return (props.items && props.items.length > 0) || !!slots.default
	})

	// Connector status between two items
	const connectorStatus = (index: number): TStepperItemStatus => {
		// Connector at position index is between item[index-1] and item[index]
		// It's "done" if item at index-1 is done or active (and model has passed it)
		const modelValue = internalModel.value
		if ((index - 1) < modelValue) return 'done'
		return 'pending'
	}

	const connectorClasses = (index: number) => [
		'origam-stepper__connector',
		`origam-stepper__connector--${connectorStatus(index)}`
	]

	// CLASS & STYLES

	const { colorStyles } = useColorEffect(props)
	const { densityClasses } = useDensity(props)
	const { sizeClasses } = useSize(props)

	const stepperStyles = computed(() => {
		return [
			colorStyles.value,
			props.style
		] as StyleValue
	})

	const stepperClasses = computed(() => [
		'origam-stepper',
		`origam-stepper--${props.orientation ?? 'horizontal'}`,
		densityClasses.value,
		sizeClasses.value,
		props.class
	])

	const { id, css, load, isLoaded, unload } = useStyle(stepperStyles)

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
	.origam-stepper {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 0;
		padding-block: var(--origam-stepper---padding-block, 8px);
		padding-inline: var(--origam-stepper---padding-inline, 8px);
		background-color: var(--origam-stepper---background-color, var(--origam-color-surface-default));
		color: var(--origam-stepper---color, var(--origam-color-text-primary));
		width: 100%;
		box-sizing: border-box;

		// Vertical orientation
		&--vertical {
			flex-direction: column;

			.origam-stepper__connector {
				width: var(--origam-stepper---connector-thickness, 2px);
				height: var(--origam-stepper---gap, 16px);
				min-height: 16px;
				margin-inline-start: calc((var(--origam-stepper---indicator-size, 32px) / 2) - (var(--origam-stepper---connector-thickness, 2px) / 2));
				margin-block: 4px;
				align-self: flex-start;
			}
		}

		// Connector line between steps
		&__connector {
			flex: 1;
			height: var(--origam-stepper---connector-thickness, 2px);
			min-width: 16px;
			margin-inline: 4px;
			// Align connector to the center of the indicator: indicator-size / 2 from the top of the item.
			// Items themselves are top-aligned (align-items: flex-start on parent), so we use
			// margin-block-start to push the connector down to visually center it with the circle.
			margin-block-start: calc((var(--origam-stepper---indicator-size, 32px) / 2) - (var(--origam-stepper---connector-thickness, 2px) / 2));
			align-self: flex-start;
			background-color: var(--origam-stepper---connector-color, var(--origam-color-border-subtle));
			border-radius: var(--origam-radius-full, 9999px);
			transition: background-color 0.2s ease;

			// When the connector is "done" (preceding step has been completed)
			&--done {
				background-color: var(--origam-stepper---connector-color-done, var(--origam-color-action-primary-bg));
			}

			// Vertical connector — override width/height
			.origam-stepper--vertical & {
				flex: 0 0 auto;
				margin-block-start: 0;
				align-self: flex-start;
			}
		}

		// Density variants
		&--density-comfortable {
			padding-block: 12px;
			padding-inline: 12px;
		}

		&--density-default {
			padding-block: 8px;
			padding-inline: 8px;
		}

		&--density-compact {
			padding-block: 4px;
			padding-inline: 4px;
		}
	}
</style>
