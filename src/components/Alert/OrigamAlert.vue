<template>
	<component
			:is="tag"
			:id="id"
			:class="alertClasses"
			role="alert"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
    <span
		    key="underlay"
		    class="origam-alert__underlay"
    />

		<slot name="wrapper">
			<template v-if="hasPrepend">
				<div
						key="prepend"
						class="origam-alert__prepend"
						@click="handleClickPrepend"
				>
					<slot name="prepend">
						<origam-avatar
								v-if="prependAvatar"
								key="prepend-avatar"
								:density="density"
								:image="prependAvatar"
								:size="size"
						/>
						<origam-icon
								v-if="prependIcon"
								key="prepend-icon"
								:density="density"
								:icon="prependIcon"
								:size="size"
						/>
					</slot>
				</div>
			</template>

			<div class="origam-alert__content">
				<div
						v-if="hasHeader"
						class="origam-alert__header"
				>
					<template v-if="hasIcon">
						<origam-icon
								key="content-icon"
								:icon="icon"
								:size="size"
						/>
					</template>
					<template v-if="hasTitle">
						<span class="origam-alert__title">
							<slot name="title">{{ title }}</slot>
						</span>
					</template>
				</div>

				<div class="origam-alert__body">
					<slot name="text">{{ text }}</slot>
				</div>

				<slot name="default"/>
			</div>

			<template v-if="hasAppend">
				<div
						key="append"
						class="origam-alert__append"
						@click="handleClickAppend"
				>
					<slot name="append">
						<origam-avatar
								v-if="appendAvatar"
								key="append-avatar"
								:density="density"
								:image="appendAvatar"
								:size="size"
						/>
						<origam-icon
								v-if="appendIcon"
								key="append-icon"
								:density="density"
								:icon="appendIcon"
								:size="size"
						/>
					</slot>
				</div>
			</template>
		</slot>

		<div
				v-if="hasClose"
				key="close"
				class="origam-alert__close"
		>
			<slot name="close">
				<origam-btn
						key="close-btn"
						:aria-label="t(closeLabel)"
						:icon="closeIcon"
						data-cy="close"
						size="x-small"
						@click="handleClose"
				/>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import type { ComputedRef, StyleValue } from 'vue'
	import { computed, ref, useSlots } from 'vue'
	import { OrigamAvatar, OrigamBtn, OrigamIcon } from '../../components'

	import {
		useActive,
		useAdjacent,
		useBorder,
		useColorEffect,
		useDensity,
		useDimension,
		useElevation,
		useHover,
		useLocale,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useStatus,
		useStyle
	} from '../../composables'

	import { DENSITY, MDI_ICONS } from '../../enums'

	import type { IAlertProps } from '../../interfaces'

	const props = withDefaults(defineProps<IAlertProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT,
		closeIcon: MDI_ICONS.CLOSE,
		closeLabel: 'origam.close',
		modelValue: true,
		hover: true
	})

	const emits = defineEmits(['click:close', 'update:modelValue', 'update:hover'])

	const {filterProps} = useProps<IAlertProps>(props)
	const {t} = useLocale()

	const slots = useSlots()

	const {activeClasses, isActive, onActive} = useActive(props, 'modelValue')
	const {isHover, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave, hoverClasses} = useHover(props)
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {densityClasses} = useDensity(props)
	const {borderStyles, borderClasses} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {locationStyles} = useLocation(props)
	const {positionClasses, positionStyles} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {icon, prependIcon, appendIcon, statusClasses} = useStatus(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, prependIcon, appendIcon)

	const handleClose = (e: MouseEvent) => {
		onActive()

		emits('click:close', e)
	}
	const size = computed(() => {
		return props.prominent ? 44 : 28
	})

	// SLOTS

	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
	})
	const hasTitle = computed(() => {
		return !!(slots.title || props.title)
	})
	const hasHeader = computed(() => {
		return hasTitle.value || hasIcon.value
	})
	const hasClose = computed(() => {
		return slots.close || props.closable
	})

	// CLASS & STYLES

	const alertStyles = computed(() => {
		return [
			dimensionStyles.value,
			colorStyles.value,
			locationStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			roundedStyles.value,
			positionStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const alertClasses = computed(() => {
		return [
			'origam-alert',
			{
				'origam-alert--prominent': props.prominent
			},
			hoverClasses.value,
			activeClasses.value,
			statusClasses.value,
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			elevationClasses.value,
			positionClasses.value,
			roundedClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(alertStyles)

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
	.origam-alert {
		$this: &;

		display: grid;
		flex: 1 1;
		grid-template-areas: "prepend content append close" ". content . .";
		grid-template-columns: max-content auto max-content max-content;
		overflow: hidden;
		position: var(--origam-alert---position);

		padding-block-start: calc(var(--origam-alert---padding-block-start) - var(--origam-alert---density));
		padding-block-end: calc(var(--origam-alert---padding-block-end) - var(--origam-alert---density));
		padding-inline-start: calc(var(--origam-alert---padding-inline-start) - var(--origam-alert---density));
		padding-inline-end: calc(var(--origam-alert---padding-inline-end) - var(--origam-alert---density));
		margin-block-start: var(--origam-alert---margin-block-start);
		margin-block-end: var(--origam-alert---margin-block-end);
		margin-inline-start: var(--origam-alert---margin-inline-start);
		margin-inline-end: var(--origam-alert---margin-inline-end);

		border-width: var(--origam-alert---border-width);
		border-style: var(--origam-alert---border-style);
		border-color: var(--origam-alert---border-color);
		border-radius: var(--origam-alert---border-radius);

		background-color: var(--origam-alert---background-color);
		color: var(--origam-alert---color);

		&--elevated {
			box-shadow: var(--origam-alert---box-shadow-elevated, var(--origam-shadow-md));
		}

		&--border {
			&#{$this}--border-left {
				--origam-alert---border-left-width: calc(24px - var(--origam-alert---density));

				#{$this}__underlay {
					--origam-alert__underlay---border-top-left-radius: 0;
					--origam-alert__underlay---border-bottom-left-radius: 0;
				}
			}

			&#{$this}--border-right {
				--origam-alert---border-right-width: calc(24px - var(--origam-alert---density));

				#{$this}__underlay {
					--origam-alert__underlay---border-top-right-radius: 0;
					--origam-alert__underlay---border-bottom-right-radius: 0;
				}
			}

			&#{$this}--border-top {
				--origam-alert---border-top-width: calc(24px - var(--origam-alert---density));

				#{$this}__underlay {
					--origam-alert__underlay---border-top-left-radius: 0;
					--origam-alert__underlay---border-top-right-radius: 0;
				}
			}

			&#{$this}--border-bottom {
				--origam-alert---border-bottom-width: calc(24px - var(--origam-alert---density));

				#{$this}__underlay {
					--origam-alert__underlay---border-bottom-left-radius: 0;
					--origam-alert__underlay---border-bottom-right-radius: 0;
				}
			}
		}

		&--rounded {
			--origam-alert---border-radius: 4px;
		}

		&--density-comfortable {
			--origam-alert---density: 8px;
		}

		&--density-default {
			--origam-alert---density: 0px;
		}

		&--density-compact {
			--origam-alert---density: 8px;
		}

		&--warning {
			--origam-alert---background-color: var(--origam-alert--warning---bg, var(--origam-color-feedback-warning-bg, rgb(251, 140, 0)));
			--origam-alert---color: var(--origam-alert--warning---fg, var(--origam-color-feedback-warning-fg, #ffffff));
		}

		&--success {
			--origam-alert---background-color: var(--origam-alert--success---bg, var(--origam-color-feedback-success-bg, rgb(76, 175, 80)));
			--origam-alert---color: var(--origam-alert--success---fg, var(--origam-color-feedback-success-fg, #ffffff));
		}

		&--info {
			--origam-alert---background-color: var(--origam-alert--info---bg, var(--origam-color-feedback-info-bg, rgb(33, 150, 243)));
			--origam-alert---color: var(--origam-alert--info---fg, var(--origam-color-feedback-info-fg, #ffffff));
		}

		&--error {
			--origam-alert---background-color: var(--origam-alert--danger---bg, var(--origam-color-feedback-danger-bg, rgb(207, 102, 121)));
			--origam-alert---color: var(--origam-alert--danger---fg, var(--origam-color-feedback-danger-fg, #ffffff));
		}

		&--absolute {
			--origam-alert---position: absolute;
		}

		&--fixed {
			--origam-alert---position: fixed;
		}

		&--sticky {
			--origam-alert---position: sticky;
		}

		&--relative {
			--origam-alert---position: relative;
		}

		&--prominent {
			grid-template-areas: "prepend content append close" "prepend content . .";

			#{$this}__prepend {
				--origam-alert__prepend---align-self: center;
			}
		}

		&__close {
			align-self: flex-start;
			flex: 0 1 auto;
			grid-area: close;
			padding-block-start: var(--origam-alert__close---padding-block-start);
			padding-block-end: var(--origam-alert__close---padding-block-end);
			padding-inline-start: var(--origam-alert__close---padding-inline-start);
			padding-inline-end: var(--origam-alert__close---padding-inline-end);
			margin-block-start: var(--origam-alert__close---margin-block-start);
			margin-block-end: var(--origam-alert__close---margin-block-end);
			margin-inline-start: calc(var(--origam-alert__close---margin-inline-start) - var(--origam-alert---density));
			margin-inline-end: var(--origam-alert__close---margin-inline-end);
		}

		&__content {
			align-self: center;
			grid-area: content;
			overflow: hidden;
		}

		&__append {
			align-self: flex-start;
			display: flex;
			grid-area: append;
			align-items: var(--origam-alert__append---align-items);
			padding-block-start: var(--origam-alert__append---padding-block-start);
			padding-block-end: var(--origam-alert__append---padding-block-end);
			padding-inline-start: var(--origam-alert__append---padding-inline-start);
			padding-inline-end: var(--origam-alert__append---padding-inline-end);
			margin-block-start: var(--origam-alert__append---margin-block-start);
			margin-block-end: var(--origam-alert__append---margin-block-end);
			margin-inline-start: calc(var(--origam-alert__append---margin-inline-start) - var(--origam-alert---density));
			margin-inline-end: var(--origam-alert__append---margin-inline-end);
		}

		&__prepend {
			align-self: flex-start;
			display: flex;
			grid-area: prepend;
			align-items: var(--origam-alert__prepend---align-items);
			padding-block-start: var(--origam-alert__prepend---padding-block-start);
			padding-block-end: var(--origam-alert__prepend---padding-block-end);
			padding-inline-start: var(--origam-alert__prepend---padding-inline-start);
			padding-inline-end: var(--origam-alert__prepend---padding-inline-end);
			margin-block-start: var(--origam-alert__prepend---margin-block-start);
			margin-block-end: var(--origam-alert__prepend---margin-block-end);
			margin-inline-start: var(--origam-alert__prepend---margin-inline-start);
			margin-inline-end: calc(var(--origam-alert__prepend---margin-inline-end) - var(--origam-alert---density));
		}

		&__underlay {
			grid-area: none;
			position: absolute;
			border-radius: var(--origam-alert__underlay---border-radius)
		}

		&__title {
			align-self: center;
			display: flex;
			align-items: var(--origam-alert__title---align-items);
			font-size: var(--origam-alert__title---font-size);
			font-weight: var(--origam-alert__title---font-weight);
			hyphens: var(--origam-alert__title---hyphens);
			letter-spacing: var(--origam-alert__title---letter-spacing);
			line-height: var(--origam-alert__title---line-height);
			overflow-wrap: var(--origam-alert__title---overflow-wrap);
			text-transform: var(--origam-alert__title---text-transform);
			word-break: var(--origam-alert__title---word-break);
			word-wrap: var(--origam-alert__title---word-wrap);
		}
	}

</style>

