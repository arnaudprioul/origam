<template>
	<origam-skeleton
			v-if="isSkeletonLoading"
			variant="rectangular"
			:rounded="true"
			:width="'52px'"
			:height="'32px'"
			v-bind="loaderConfig.overrides"
	/>

	<origam-input
			v-else
			:id="id"
			ref="origamInputRef"
			v-model="model"
			:class="switchClasses"
			:focused="isFocused"
			:style="switchStyles"
			v-bind="{ ...rootAttrs, ...inputProps }"
	>
		<template #default="{id, messagesId, isDisabled, isReadonly, isValid}">
			<origam-selection-control
					:id="id"
					ref="origamSelectionControlRef"
					v-model="model"
					:aria-checked="indeterminate ? 'mixed' : undefined"
					:aria-describedby="messagesId"
					:disabled="isDisabled"
					:readonly="isReadonly"
					type="checkbox"
					v-bind="{ ...controlProps, ...controlAttrs }"
					@blur="handleBlur"
					@focus="handleFocus"
					@update:model-value="handleChange"
			>
				<template #default="{bgColor: scBgColor}">
					<origam-switch-track
							:bg-color="scBgColor"
							:disabled="isDisabled"
							:error="isValid === false"
							:inset="inset"
							:is-valid="isValid"
							:model-value="model"
							:readonly="isReadonly"
							@click="handleTrackClick"
					>
						<template
								v-if="slots['track.true']"
								#track.true="slotProps"
						>
							<slot
									name="track.true"
									v-bind="slotProps"
							/>
						</template>

						<template
								v-if="slots['track.false']"
								#track.false="slotProps"
						>
							<slot
									name="track.false"
									v-bind="slotProps"
							/>
						</template>
					</origam-switch-track>
				</template>

				<template #input="{model, icon, props: selectionControlProps}">
					<input
							ref="input"
							:aria-checked="selectionControlProps.type === 'checkbox' ? model : undefined"
							:aria-disabled="selectionControlProps.disabled"
							:aria-label="selectionControlProps.label"
							:checked="model"
							v-bind="selectionControlProps"
					/>
					<div
							:class="getSwitchThumbClasses(icon)"
					>
						<origam-translate-scale>
							<template v-if="!loaderConfig.isActive">
								<origam-icon
										v-if="icon"
										:icon="icon"
										size="x-small"
								/>
							</template>

							<template v-if="hasLoading">
								<slot name="loader">
									<div class="origam-switch__loader">
										<origam-progress
												:active="loaderConfig.isActive"
												:color="color"
												:indeterminate="loaderConfig.indeterminate"
												:model-value="loaderConfig.modelValue"
												:size="SIZES.X_SMALL"
												:type="PROGRESS_TYPE.CIRCULAR"
												class="origam-switch__progress origam-switch__progress--circular"
												thickness="2"
												v-bind="loaderConfig.overrides"
										/>
									</div>
								</slot>
							</template>
						</origam-translate-scale>
					</div>
				</template>
			</origam-selection-control>
		</template>
	</origam-input>
</template><script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'
	import {
		OrigamIcon,
		OrigamInput,
		OrigamProgress,
		OrigamSelectionControl,
		OrigamSkeleton,
		OrigamSwitchTrack,
		OrigamTranslateScale
	} from '../../components'

	import {
		useFocus,
		useHover,
		useLoader,
		useProps,
		useStateEffect,
		useStyle,
		useVModel
} from '../../composables'

	import { DENSITY, PROGRESS_TYPE, SIZES } from '../../enums'

	import type { ISwitchProps } from "../../interfaces"

	import type { TOrigamInput, TOrigamSelectionControl } from "../../types"

	import { filterInputAttrs, getUid } from '../../utils'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, emits and composables.
	 ********************************************************/

	const props = withDefaults(defineProps<ISwitchProps>(), {
		density: DENSITY.DEFAULT,
		centerAffix: true
	})

	defineEmits(['update:modelValue', 'update:focused', 'update:indeterminate', 'click:label'])


	const {isHover, hoverState, hoverClasses, onMouseenter, onMouseleave} = useHover(props)
	const {
		borderClasses, borderStyles,
		roundedClasses, roundedStyles,
		elevationClasses, elevationStyles,
		paddingClasses, paddingStyles,
		marginClasses, marginStyles,
	} = useStateEffect(props, isHover, undefined, hoverState, undefined)
	const {filterProps} = useProps<ISwitchProps>(props)

	const origamSelectionControlRef = ref<TOrigamSelectionControl>()
	const origamInputRef = ref<TOrigamInput>()

	/*********************************************************
	 * Value
	 *
	 * @description
	 * Model binding, indeterminate state and focus handling.
	 ********************************************************/

	const indeterminate = useVModel(props, 'indeterminate')
	const model = useVModel(props, 'modelValue')

	/*********************************************************
	 * Effect
	 ********************************************************/

	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const slots = useSlots()

	const {loaderClasses, loaderConfig} = useLoader(props, 'circular')

	const uid = getUid()
	const id = computed(() => {
		return props.id || `switch-${uid}`
	})

	/*********************************************************
	 * Event handlers
	 *
	 * @description
	 * Change and track-click handlers.
	 ********************************************************/

	const handleChange = () => {
		if (indeterminate.value) {
			indeterminate.value = false
		}
	}
	const handleTrackClick = (_e: MouseEvent) => {
		// `OrigamSwitchTrack` already calls `stopPropagation` /
		// `preventDefault` on the native event before emitting — we just
		// need to forward the click to the hidden `<input>` so the
		// SelectionControl picks it up and toggles `model`.
		origamSelectionControlRef.value?.inputRef?.click()
	}

	/*********************************************************
	 * Props forwarding
	 *
	 * @description
	 * Filtered attrs and props passed down to inner components.
	 * `color` and `bgColor` are STRICTLY scoped to the SelectionControl
	 * (track / thumb / label). Stripping them from `inputProps` prevents
	 * `OrigamInput` (the outer row wrapper) from also applying them as
	 * `background-color` on its root — pre-fix the consumer's
	 * `bg-color="success"` painted the entire switch row green
	 * (including the label area), instead of just the track.
	 ********************************************************/

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

	/*********************************************************
	 * Forwarded props
	 ********************************************************/

	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'focused', 'id', 'style', 'color', 'bgColor', 'activeColor', 'activeBgColor', 'hoverColor', 'hoverBgColor'])
	})
	const controlProps = computed(() => {
		return origamSelectionControlRef.value?.filterProps(props, ['modelValue', 'type', 'disabled', 'readonly', 'class', 'style', 'id'])
	})

	/*********************************************************
	 * Loader
	 *
	 * @description
	 * Derived flags combining slot and prop loading states.
	 ********************************************************/

	const hasLoading = computed(() => {
		return slots.loader || loaderConfig.value.isActive
	})

	// True when the whole switch should be replaced by a skeleton placeholder.
	const isSkeletonLoading = computed(() => {
		return loaderConfig.value.isActive && loaderConfig.value.kind === 'skeleton'
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Root element classes and inline styles.
	 ********************************************************/

	const switchStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const getSwitchThumbClasses = (icon: unknown) => {
		return [
			'origam-switch__thumb',
			{ 'origam-switch__thumb--filled': !!icon || loaderConfig.value.isActive }
		]
	}
	const switchClasses = computed(() => {
		return [
			'origam-switch',
			{
				'origam-switch--flat': props.flat,
				'origam-switch--inset': props.inset,
				'origam-switch--indeterminate': indeterminate.value
			},
			loaderClasses.value,
			props.class
		]
	})
	const {id, css, load, isLoaded, unload} = useStyle(switchStyles)


	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface exposed to parent components.
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
	.origam-switch {
		$this: &;

		:deep(.origam-label) {
			padding-inline-start: 10px;
		}

		&__loader {
			display: flex;

			.origam-progress {
				color: currentColor;
			}
		}

		&__thumb {
			transition: none;

			@media (forced-colors: active) {
				border: 1px solid;
				color: buttontext;
			}
		}

		.origam-selection-control {
			min-height: calc(var(--origam-switch__selection-control---min-height, 56px) + var(--origam-input---density, 0px));

			:deep(.origam-selection-control__input) {
				border-radius: 50%;
				transition: 0.2s transform cubic-bezier(0.4, 0, 0.2, 1);
				position: absolute;
				transform: translateX(-10px);

				.origam-icon {
					position: absolute;
				}
			}

			&--dirty {
				:deep(.origam-selection-control__input) {
					transform: translateX(10px);
				}
			}

			&--error {
				&:not(.origam-selection-control--disabled) {
					#{$this}__thumb {
						background-color: rgba(255, 0, 0, 1);
						color: rgba(255, 255, 255, 1);
					}
				}
			}
		}

		&.origam-input {
			flex: 0 1 auto;

			&--vertical {
				:deep(.origam-label) {
					min-width: max-content;
				}

				:deep(.origam-selection-control__wrapper) {
					transform: rotate(-90deg);
				}
			}
		}

		.origam-selection-control__wrapper.origam--color-primary &__thumb,
		.origam-selection-control__wrapper.origam--color-secondary &__thumb,
		.origam-selection-control__wrapper.origam--color-success &__thumb,
		.origam-selection-control__wrapper.origam--color-warning &__thumb,
		.origam-selection-control__wrapper.origam--color-danger &__thumb,
		.origam-selection-control__wrapper.origam--color-info &__thumb,
		.origam-selection-control__wrapper.origam--color-neutral &__thumb {
			background-color: currentColor;
		}

		.origam-selection-control__wrapper[style*="color:"] &__thumb {
			background-color: currentColor;
		}

		&__thumb {
			align-items: center;
			background-color: var(--origam-switch__thumb---background-color, rgb(255, 255, 255));
			color: var(--origam-switch__thumb---color, currentColor);
			border: 1px solid var(--origam-switch__thumb---border-color, rgba(0, 0, 0, 0.18));
			border-radius: 50%;
			display: flex;
			font-size: 0.75rem;
			height: 20px;
			justify-content: center;
			width: 20px;
			pointer-events: none;
			transition: 0.15s 0.05s transform cubic-bezier(0, 0, 0.2, 1), 0.2s color cubic-bezier(0.4, 0, 0.2, 1), 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1), 0.2s border-color cubic-bezier(0.4, 0, 0.2, 1);
			position: relative;
			overflow: hidden;

			@media (forced-colors: active) {
				background-color: buttontext;
			}
		}

		&#{$this}--inset {

			#{$this}__thumb {
				height: 24px;
				width: 24px;
				transform: scale(0.6666666667);

				&--filled {
					transform: none;
				}
			}

			.origam-selection-control {
				&--dirty {
					#{$this}__thumb {
						transform: none;
						transition: 0.15s 0.05s transform cubic-bezier(0, 0, 0.2, 1);
					}
				}

			}

			:deep(.origam-selection-control__wrapper) {
				width: auto;
			}

			&:not(#{$this}--loading) {
				&:not(.origam-input--disabled) {
					.origam-selection-control--dirty {
						#{$this}__thumb {
							@media (forced-colors: active) {
								background-color: highlighttext;
								color: highlighttext;
							}
						}
					}
				}
			}
		}

		&#{$this}--indeterminate {
			:deep(.origam-selection-control__input) {
				transform: scale(0.8);
			}

			#{$this}__thumb {
				transform: scale(0.75);
			}
		}

		&#{$this}--disabled {
			#{$this}__thumb {
				@media (forced-colors: active) {
					background-color: graytext;
					color: graytext;
				}
			}
		}

		&#{$this}--loading {
			#{$this}__thumb {
				@media (forced-colors: active) {
					background-color: canvas;
				}
			}

			&#{$this}--inset,
			&#{$this}--indeterminate {
				#{$this}__thumb {
					@media (forced-colors: active) {
						border-width: 0;
					}
				}
			}
		}

		&:not(.origam-input--loading) {
			&:not(.origam-input--disabled) {
				.origam-selection-control--dirty {
					#{$this}__thumb {
						@media (forced-colors: active) {
							background-color: highlight;
						}
					}
				}
			}
		}

		&:not(.origam-input--disabled) {
			.origam-selection-control--dirty {
				#{$this}__thumb {
					@media (forced-colors: active) {
						color: highlight;
					}
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
