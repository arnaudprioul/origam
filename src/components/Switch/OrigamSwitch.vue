<template>
	<!-- Skeleton mode: replace the entire switch with a skeleton placeholder -->
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
				<template #default="{backgroundColorStyles}">
					<!--
						`bgColor` channel only — the track is the "box behind
						the circle". `color` (foreground) is applied on the
						SC wrapper (so the label inherits it) and on the
						thumb via `background-color: currentColor` in SCSS.
						The two channels stay strictly separate per the
						project's color contract.
					-->
					<div
							:style="backgroundColorStyles"
							class="origam-switch__track"
							@click="handleTrackClick"
					>
						<div
								v-if="slots['track.true']"
								key="prepend"
								class="origam-switch__track-true"
						>
							<slot
									name="track.true"
									v-bind="{model, isValid}"
							/>
						</div>

						<div
								v-if="slots['track.false']"
								key="append"
								class="origam-switch__track-false"
						>
							<slot
									name="track.false"
									v-bind="{model, isValid}"
							/>
						</div>
					</div>
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

					<!--
						Thumb (cercle) — `color` channel. Inherits via
						`background-color: currentColor` in SCSS, where
						`currentColor` resolves to the SC wrapper's
						`textColorStyles` (set by `useSelectionControl`
						from `props.color`). Pre-fix this was driven by
						`backgroundColorStyles` which mixed the bgColor
						channel into the thumb — violated the strict
						color/bgColor separation contract.
					-->
					<div
							:class="['origam-switch__thumb', { 'origam-switch__thumb--filled': !!icon || loaderConfig.isActive }]"
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
												:color="props.color"
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
</template>

<script
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
		OrigamTranslateScale
	} from '../../components'

	import { useFocus, useLoader, useProps, useVModel } from '../../composables'

	import { DENSITY, PROGRESS_TYPE, SIZES } from '../../enums'

	import type { ISwitchProps } from "../../interfaces"

	import type { TOrigamInput, TOrigamSelectionControl } from "../../types"

	import { filterInputAttrs, getUid } from '../../utils'

	const props = withDefaults(defineProps<ISwitchProps>(), {
		density: DENSITY.DEFAULT,
		centerAffix: true
	})

	defineEmits(['update:modelValue', 'update:focused', 'update:indeterminate', 'click:label'])

	const {filterProps} = useProps<ISwitchProps>(props)

	const origamSelectionControlRef = ref<TOrigamSelectionControl>()
	const origamInputRef = ref<TOrigamInput>()

	const indeterminate = useVModel(props, 'indeterminate')
	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const slots = useSlots()

	const {loaderClasses, loaderConfig} = useLoader(props, 'circular')

	const uid = getUid()
	const id = computed(() => {
		return props.id || `switch-${uid}`
	})

	const handleChange = () => {
		if (indeterminate.value) {
			indeterminate.value = false
		}
	}
	const handleTrackClick = (e: Event) => {
		e.stopPropagation()
		e.preventDefault()
		origamSelectionControlRef.value?.inputRef?.click()
	}

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
	// `color` and `bgColor` are STRICTLY scoped to the SelectionControl
	// (track / thumb / label). Stripping them from `inputProps` prevents
	// `OrigamInput` (the outer row wrapper) from also applying them as
	// `background-color` on its root — pre-fix the consumer's
	// `bg-color="success"` painted the entire switch row green
	// (including the label area), instead of just the track.
	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'focused', 'id', 'style', 'color', 'bgColor', 'activeColor', 'activeBgColor', 'hoverColor', 'hoverBgColor'])
	})
	const controlProps = computed(() => {
		return origamSelectionControlRef.value?.filterProps(props, ['modelValue', 'type', 'disabled', 'readonly', 'class', 'style', 'id'])
	})

	const hasLoading = computed(() => {
		return slots.loader || loaderConfig.value.isActive
	})

	// True when the whole switch should be replaced by a skeleton placeholder.
	const isSkeletonLoading = computed(() => {
		return loaderConfig.value.isActive && loaderConfig.value.kind === 'skeleton'
	})

	// CLASS & STYLES

	const switchStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
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

	// EXPOSE

	defineExpose({
		filterProps
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

		&__track,
		&__thumb {
			transition: none;

			@media (forced-colors: active) {
				border: 1px solid;
				color: buttontext;
			}
		}

		.origam-selection-control {
			min-height: calc(var(--origam-input__control---height, 56px) + var(--origam-input---density, 0px));

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
					#{$this}__track,
					#{$this}__thumb {
						background-color: rgba(255, 0, 0, 1);
						color: rgba(255, 255, 255, 5);
					}
				}
			}

			&:not(.origam-selection-control--dirty) {
				#{$this}__track-true {
					opacity: 0;
				}
			}

			&--dirty {
				#{$this}__track-false {
					opacity: 0;
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

		&__track-true {
			margin-inline-end: auto;
		}

		&__track-false {
			margin-inline-start: auto;
		}

		// Track + thumb: read from CSS variables so the design-token
		// layer can override them per theme, AND so the inline
		// `:style="backgroundColorStyles"` (which sets `background-color`
		// directly) wins via inline-style specificity when the consumer
		// passes `color`/`bgColor` and the switch is checked.
		&__track {
			display: inline-flex;
			align-items: center;
			font-size: 0.5rem;
			padding: 0 5px;
			background-color: var(--origam-switch__track---background-color, rgb(163, 163, 163));
			border-radius: 9999px;
			height: 14px;
			opacity: 0.6;
			min-width: 36px;
			cursor: pointer;
			transition: 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1);
		}

		// Track keeps its transparency on BOTH states (Material rail).
		// The 0.6 opacity is intentional — it makes the track visually
		// distinct from the thumb (control-input) regardless of the
		// `bgColor` channel. Pre-fix this rule overrode opacity to 1
		// on `--dirty`, which made the ON-state track fully opaque and
		// erased the visual contrast with the thumb. Reported by the
		// user — "avec une transparence pour avoir une difference avec
		// le control-input".

		// Disabled checked state.
		.origam-selection-control--dirty.origam-selection-control--disabled &__track {
			background-color: var(--origam-switch__track---background-color-disabled, rgb(163, 163, 163));
		}

		// `color` prop applied — `useSelectionControl` inlines
		// `style="color: …"` on `.origam-selection-control__wrapper`
		// (the parent of both track and thumb). When that inline style
		// is present, the thumb fill switches to `currentColor` so the
		// consumer's `color` channel paints the cercle. The track
		// stays in its own `bgColor` channel — the two never
		// cross-pollute, per the project's color contract.
		.origam-selection-control__wrapper[style*="color:"] &__thumb {
			background-color: currentColor;
		}

		// Thumb default = the design token (Material white) with a
		// light translucent grey border so the cercle stays visually
		// identifiable on light backgrounds (where a white thumb on a
		// pale track is otherwise invisible). User feedback: remove
		// the box-shadow approach + add a thin border instead.
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
			#{$this}__track {
				border-radius: 9999px;
				font-size: 0.75rem;
				height: 32px;
				min-width: 52px;

				@media (forced-colors: active) {
					border-width: 2px;
				}
			}

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

		// Pre-fix: `&:not(--inset) &__thumb` carried a Material 3-layer
		// box-shadow + `&--flat` cleared it, plus an indeterminate
		// reset. Replaced by the light translucent border on the base
		// thumb rule above — flatter look, thumb stays identifiable
		// without the elevation halo.

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
				}
			}

			#{$this}__track,
			#{$this}__thumb {
				@media (forced-colors: active) {
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
				#{$this}__track {
					@media (forced-colors: active) {
						background-color: highlight;
					}
				}

				#{$this}__track,
				#{$this}_thumb {
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
