<template>
	<component
			:is="tag"
			v-ripple="props.ripple"
			:aria-expanded="isSelected"
			:class="expansionPanelHeaderClasses"
			:disabled="isDisabled"
			:style="expansionPanelHeaderStyles"
			:tabindex="isDisabled ? -1 : undefined"
			type="button"
			@click="handleExpand"
	>
		<span class="origam-expansion-panel-header__overlay"/>

		<div class="origam-expansion-panel-header__wrapper">
      <span
		      v-if="hasPrepend"
		      key="prepend"
		      class="origam-expansion-panel-header__prepend"
		      @click="handleClickPrepend"
      >
        <slot
		        name="prepend"
		        v-bind="slotProps"
        >
          <origam-avatar
		          v-if="prependAvatar"
		          key="prepend-avatar"
		          :density="density"
		          :image="prependAvatar"
          />
          <origam-icon
		          v-if="prependIcon"
		          key="prepend-icon"
		          :density="density"
		          :icon="prependIcon"
          />
        </slot>
      </span>

			<span
					v-if="hasTitle"
					class="origam-expansion-panel-header__title"
			>
        <slot
		        name="default"
		        v-bind="slotProps"
        >
          {{ title }}
        </slot>
      </span>

			<span
					v-if="hasAppend || !props.hideActions"
					key="append"
					class="origam-expansion-panel-header__append"
					@click="handleClickAppend"
			>
        <slot
		        name="append"
		        v-bind="slotProps"
        >
          <origam-avatar
		          v-if="appendAvatar"
		          key="append-avatar"
		          :density="density"
		          :image="appendAvatar"
          />
          <origam-icon
		          v-if="appendIcon"
		          key="append-icon"
		          :density="density"
		          :icon="appendIcon"
          />
          <origam-icon
		          v-if="!props.hideActions"
		          :icon="isSelected ? collapseIcon : expandIcon"
          />
        </slot>
      </span>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, StyleValue, toRef, useSlots } from 'vue'
	import { OrigamAvatar, OrigamIcon } from '../../components'

	import {
		useAdjacent,
		useBorder,
		useBothColor,
		useDensity,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '../../composables'

	import { ORIGAM_EXPANSION_PANEL_KEY } from '../../consts'

	import { vRipple } from '../../directives'

	import { MDI_ICONS } from "../../enums"

	import type { IExpansionPanelHeaderProps } from '../../interfaces'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props and injection of the parent expansion panel context.
	 ********************************************************/
	const props = withDefaults(defineProps<IExpansionPanelHeaderProps>(), {
		tag: 'button',
		expandIcon: MDI_ICONS.CHEVRON_DOWN,
		collapseIcon: MDI_ICONS.CHEVRON_UP
	})

	defineEmits(['click:append', 'click:prepend'])

	const {filterProps} = useProps<IExpansionPanelHeaderProps>(props)

	const expansionPanel = inject(ORIGAM_EXPANSION_PANEL_KEY)

	if (!expansionPanel) throw new Error('[Origam] expansion-panel-content needs to be placed inside expansion-panel')

	const slots = useSlots()

	/*********************************************************
	 * Group & Expand
	 *
	 * @description
	 * Selection state, expand/collapse toggle, and slot props.
	 ********************************************************/
	const handleExpand = () => {
		if (!props.readonly) {
			expansionPanel.toggle()
		}
	}

	const isSelected = computed(() => {
		return expansionPanel.isSelected.value
	})
	const isDisabled = computed(() => {
		return expansionPanel.disabled.value
	})

	const slotProps = computed(() => {
		return {
			collapseIcon: props.collapseIcon,
			disabled: expansionPanel.disabled.value,
			expanded: expansionPanel.isSelected.value,
			expandIcon: props.expandIcon,
			readonly: props.readonly
		}
	})

	const hasTitle = computed(() => {
		return slots.default || props.title
	})

	/*********************************************************
	 * Adjacent
	 *
	 * @description
	 * Prepend/append icon slots and click handlers.
	 ********************************************************/
	const {
		hasAppend,
		hasPrepend,
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Composable-driven class and style composition.
	 ********************************************************/
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	// Phase 3 (Vague D) — class-first companion alongside inline styles.
	const {colorClasses, colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)

	const expansionPanelHeaderStyles = computed(() => {
		return [
			colorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const expansionPanelHeaderClasses = computed(() => {
		return [
			'origam-expansion-panel-header',
			{
				'origam-expansion-panel-header--active': expansionPanel.isSelected.value,
				'origam-expansion-panel-header--focusable': props.focusable,
				'origam-expansion-panel-header--static': props.static
			},
			colorClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			roundedClasses.value,
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Forwards filterProps to parent components.
	 ********************************************************/
	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-expansion-panel-header {
		$this: &;

		outline: var(--origam-expansion-panel__header---outline, none);
		border-radius: var(--origam-expansion-panel__header---border-radius, inherit);
		font-size: var(--origam-expansion-panel__header---font-size, 0.9375rem);
		line-height: var(--origam-expansion-panel__header---line-height, 1);
		min-height: var(--origam-expansion-panel__header---min-height, 48px);
		width: var(--origam-expansion-panel__header---width, 100%);
		border: var(--origam-expansion-panel__header---border, none);

		&__wrapper {
			align-items: var(--origam-expansion-panel__header__wrapper---align-items, center);
			text-align: start;
			display: var(--origam-expansion-panel__header__wrapper---display, flex);
			width: 100%;
			height: 100%;
			padding-block: var(--origam-expansion-panel__header__wrapper---padding-block, 16px);
			padding-inline: var(--origam-expansion-panel__header__wrapper---padding-inline, 24px);
			position: relative;
			transition: var(--origam-expansion-panel__header__wrapper---transition-duration, 0.3s) min-height var(--origam-expansion-panel__header__wrapper---transition-easing, cubic-bezier(0.4, 0, 0.2, 1));
			justify-content: var(--origam-expansion-panel__header__wrapper---justify-content, space-between);
		}

		&__overlay {
			position: var(--origam-expansion-panel__header__overlay---position, absolute);
			top: var(--origam-expansion-panel__header__overlay---top, 0);
			left: var(--origam-expansion-panel__header__overlay---left, 0);
			width: 100%;
			height: 100%;
			background-color: currentColor;
			border-radius: var(--origam-expansion-panel__header__overlay---border-radius, inherit);
			opacity: var(--origam-expansion-panel__header__overlay---opacity, 0);
		}

		&__append,
		&__prepend {
			display: inline-flex;
			margin-bottom: var(--origam-expansion-panel__header__append---margin-block, -4px);
			margin-top: var(--origam-expansion-panel__header__append---margin-block, -4px);
			user-select: none;
		}

		&__append {
			margin-inline-start: var(--origam-expansion-panel__header__append---margin-inline-start, auto);
		}

		&__prepend {
			margin-inline-end: var(--origam-expansion-panel__header__prepend---margin-inline-end, 8px);
		}

		&:hover {
			.origam-expansion-panel-header__overlay {
				opacity: calc(0.04 * 1);
			}
		}

		&:focus-visible,
		&:focus {
			.origam-expansion-panel-header__overlay {
				opacity: var(--origam-expansion-panel__header---focus-overlay-opacity, calc(0.12 * 1));
			}
		}

		&--focusable {
			&#{$this}--active {

				.origam-expansion-panel-header__overlay {
					opacity: var(--origam-expansion-panel__header---focus-overlay-opacity, calc(0.12 * 1));
				}

				&:hover {
					.origam-expansion-panel-header__overlay {
						opacity: calc((0.12 + 0.04) * 1);
					}
				}

				&:focus-visible,
				&:focus {
					.origam-expansion-panel-header__overlay {
						opacity: calc((0.12 + 0.12) * 1);
					}
				}
			}
		}
	}

</style>

