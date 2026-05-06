<template>
	<component
			:is="tag"
			:class="ratingFieldItemClasses"
			:style="ratingFieldItemStyles"
	>
		<label :for="id">
			<span class="origam-rating-field-item__hidden">{{ t(itemAriaLabel, value, length) }}</span>
			<slot
					v-if="showStar"
					name="item"
					v-bind="{props: ratingBtnProps, value}"
			>
				<origam-btn
						ref="origamBtnRef"
						v-bind="{...ratingBtnProps}"
						@click="handleClick"
						@mouseenter="handleMouseEnter"
						@mouseleave="handleMouseLeave"
				/>
			</slot>
		</label>

		<input
				:id="id"
				:checked="checked"
				:disabled="disabled"
				:name="name"
				:readonly="readonly"
				:value="value"
				class="origam-rating-field-item__hidden"
				tabindex="-1"
				type="radio"
		/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue } from 'vue'
	import { OrigamBtn } from '../../components'

	import { useLocale, useProps } from "../../composables"

	import { MDI_ICONS, VARIANT } from "../../enums"

	import type { IRatingFieldItemProps } from '../../interfaces'

	import type { TOrigamBtn } from "../../types"

	const props = withDefaults(defineProps<IRatingFieldItemProps>(), {
		index: -1,
		showStar: true,
		emptyIcon: MDI_ICONS.STAR_OUTLINE,
		fullIcon: MDI_ICONS.STAR,
		tag: 'div',
		itemAriaLabel: 'origam.rating.ariaLabel.item'
	})

	const emits = defineEmits(['mouseenter', 'mouseleave', 'click'])

	const {filterProps} = useProps<IRatingFieldItemProps>(props)

	const {t} = useLocale()

	const origamBtnRef = ref<TOrigamBtn>()

	const id = computed(() => {
		return `${props.name}-${String(props.value).replace('.', '-')}`
	})

	const ratingBtnProps = computed(() => {
		const isFullIcon = props.isHovering ? props.isHovered : props.isFilled
		const icon = isFullIcon ? props.fullIcon : props.emptyIcon
		const btnProps = origamBtnRef.value?.filterProps(props, ['class', 'style', 'id', 'bgColor', 'activeBgColor', 'hoverBgColor'])

		// `variant: text` so each star reads as an icon-only affordance —
		// the rating field is supposed to look like a row of stars, not
		// a row of buttons. Pre-fix the `<origam-btn>` rendered with its
		// default elevated/tonal chrome (background + border + shadow),
		// turning the row into a series of pill-buttons. The user
		// specifically reported "il faut que les btn soit en text, on
		// ne doit pas voir le background". Spread last so a consumer
		// override on the item itself still wins.
		return {variant: VARIANT.TEXT, ...btnProps, icon}
	})

	const handleMouseEnter = (e: MouseEvent) => {
		emits('mouseenter', e)
	}
	const handleMouseLeave = (e: MouseEvent) => {
		emits('mouseleave', e)
	}
	const handleClick = (e: Event) => {
		emits('click', e)
	}

	// CLASS & STYLES

	const ratingFieldItemStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const ratingFieldItemClasses = computed(() => {
		return [
			'origam-rating-field-item',
			{
				'origam-rating-field-item--half': props.halfIncrements && props.value % 1 > 0,
				'origam-rating-field-item--full': props.halfIncrements && props.value % 1 === 0
			},
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
	.origam-rating-field-item {
		&__label {
			cursor: pointer;

			.origam-btn {
				opacity: 1;
				transition-property: transform;

				:deep(.origam-icon) {
					transition: inherit;
					transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
				}
			}
		}

		&__hidden {
			height: 0;
			opacity: 0;
			position: absolute;
			width: 0;
		}

		&--full {

		}

		&--half {
			overflow: hidden;
			position: absolute;
			clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
			z-index: 1;

			&,
			&:hover {
				:deep(.origam-btn__overlay) {
					opacity: 0;
				}
			}
		}
	}
</style>

<style>

</style>
