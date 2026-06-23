<template>
	<div
			v-if="isSkeletonLoading"
			class="origam-switch__skeleton"
			:class="{ 'origam-switch__skeleton--inset': inset }"
			aria-busy="true"
			aria-label="Loading"
			role="status"
			data-cy="origam-switch-skeleton"
	>
		<span class="origam-switch__skeleton-track"/>
		<span class="origam-switch__skeleton-thumb"/>
	</div>

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

						<template
								v-if="isLineLoading"
								#overlay
						>
							<origam-progress
									:active="loaderConfig.isActive"
									:color="color"
									:indeterminate="loaderConfig.indeterminate"
									:model-value="loaderConfig.modelValue"
									:type="PROGRESS_TYPE.LINEAR"
									class="origam-switch__progress origam-switch__progress--linear"
									data-cy="origam-switch-progress-linear"
									v-bind="loaderConfig.overrides"
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
							<div
									v-if="hasCircularLoading"
									class="origam-switch__loader"
							>
								<slot name="loader">
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
								</slot>
							</div>

							<origam-icon
									v-else-if="icon"
									:icon="icon"
									size="x-small"
							/>
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

	import type { ISwitchProps} from "../../interfaces"

	import type { ISwitchEmits } from '../../interfaces/Switch/switch.interface'

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

	defineEmits<ISwitchEmits>()


	const {isHover, hoverState} = useHover(props)
	useStateEffect(props, isHover, undefined, hoverState, undefined)
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

	const _hasLoading = computed(() => {
		return slots.loader || loaderConfig.value.isActive
	})

	// True when the whole switch should be replaced by a skeleton placeholder.
	const isSkeletonLoading = computed(() => {
		return loaderConfig.value.isActive && loaderConfig.value.kind === 'skeleton'
	})

	/**
	 * True when the active loader kind is `'line'` — a thin linear
	 * progress that overlays the track at the switch's full width
	 * (52 × 32 footprint). Visually completes the existing skeleton
	 * and circular variants:
	 *   - `'circular'`  → spinning circle INSIDE the thumb (default).
	 *   - `'line'`      → indeterminate line ACROSS the track.
	 *   - `'skeleton'`  → custom switch-shaped placeholder block.
	 */
	const isLineLoading = computed(() => {
		return loaderConfig.value.isActive && loaderConfig.value.kind === 'line'
	})

	/**
	 * True when the thumb itself should host the spinner — i.e. any
	 * active loader EXCEPT the line variant (which lives on the
	 * track) or skeleton (which replaces the whole switch).
	 */
	const hasCircularLoading = computed(() => {
		if (slots.loader) return true
		const cfg = loaderConfig.value
		return cfg.isActive && cfg.kind !== 'line' && cfg.kind !== 'skeleton'
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
	const {id: styleId, css, load, isLoaded, unload} = useStyle(switchStyles)


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
		isLoaded,
		styleId
	})
</script>

<style
		lang="scss"
		scoped
>
	/*
	 * Skeleton placeholder mimicking the switch silhouette — a 52×32
	 * rounded track + a 20px circular thumb pinned to the left so the
	 * shape is unmistakably a switch (vs the previous plain rectangle
	 * which looked like a generic loading bar). Both halves share the
	 * `--origam-switch__skeleton-bg` pulse animation inherited from
	 * the broader skeleton token so the rhythm matches OrigamSkeleton.
	 */
	@keyframes origam-switch-skeleton-pulse {
		0%, 100% { opacity: 1; }
		50%      { opacity: 0.55; }
	}

	.origam-switch__skeleton {
		position: relative;
		display: inline-block;
		width: var(--origam-switch__skeleton---width, 52px);
		height: var(--origam-switch__skeleton---height, 32px);
		animation: origam-switch-skeleton-pulse 1.6s ease-in-out infinite;

		@media (prefers-reduced-motion: reduce) {
			animation: none;
		}

		.origam-switch__skeleton-track {
			position: absolute;
			inset: 0;
			border-radius: 999px;
			background-color: var(--origam-switch__skeleton-track---background-color, color-mix(in srgb, currentColor 14%, transparent));
		}

		.origam-switch__skeleton-thumb {
			position: absolute;
			top: 50%;
			left: 6px;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			transform: translateY(-50%);
			background-color: var(--origam-switch__skeleton-thumb---background-color, color-mix(in srgb, currentColor 28%, transparent));
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
		}

		&--inset {
			.origam-switch__skeleton-thumb {
				/* inset switches use a 24px thumb that overflows the track */
				width: 24px;
				height: 24px;
				left: 4px;
			}
		}
	}

	.origam-switch {
		$this: &;

		:deep(.origam-label) {
			padding-inline-start: 10px;
		}

		/*
		 * Line loader — thin linear progress positioned ON the track,
		 * spanning the full switch footprint (46×14 standard or 52×32
		 * inset). Sits BEHIND the thumb so the thumb stays visually
		 * dominant and the consumer still sees the on/off position
		 * while the background indicates async work in flight.
		 *
		 * `OrigamProgressLinear` ships an inline `height: thickness`
		 * (4 px default) that wins over standard CSS — we force it
		 * to 100 % via `:deep()` so the bar fills the track height
		 * regardless of the standard / inset variant.
		 */
		&__progress--linear {
			position: absolute !important;
			inset: 0 !important;
			width: 100% !important;
			/*
			 * `OrigamProgressLinear` inlines `height: 4px` on its root via
			 * `:style="{ height: thickness }"`, which beats any non-important
			 * scoped rule. `!important` here is the only way to expand the
			 * loader to the full track height without subclassing the
			 * progress component.
			 */
			height: 100% !important;
			line-height: 1 !important;
			border-radius: inherit;
			pointer-events: none;
			z-index: 0;
			overflow: hidden;

			:deep(.origam-progress__background),
			:deep(.origam-progress__loader),
			:deep(.origam-progress__bar) {
				height: 100% !important;
			}
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
			border-radius: var(--origam-switch__thumb---border-radius, 50%);
			display: flex;
			font-size: 0.75rem;
			height: var(--origam-switch__thumb---size, 20px);
			justify-content: center;
			width: var(--origam-switch__thumb---size, 20px);
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

