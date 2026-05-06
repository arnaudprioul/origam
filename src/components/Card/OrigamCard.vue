<template>
	<component
			:is="link.tag"
			v-ripple="isClickable && props.ripple"
			:class="cardClasses"
			:href="link.href"
			:style="cardStyles"
			:tabindex="props.disabled ? -1 : undefined"
			@click="isClickable && link.navigate"
	>
    <span
		    v-if="isClickable"
		    key="overlay"
		    class="origam-card__overlay"
    />
		<span
				key="underlay"
				class="origam-card__underlay"
		/>

		<slot name="wrapper">
			<template v-if="hasLoading">
				<slot name="loader">
					<div class="origam-card__loader">
						<origam-skeleton
								v-if="loaderConfig.kind === 'skeleton'"
								variant="card"
								:loading="true"
								v-bind="loaderConfig.overrides"
						/>
						<origam-progress
								v-else
								:active="true"
								:color="props.color"
								:indeterminate="loaderConfig.indeterminate"
								:model-value="loaderConfig.modelValue"
								:type="PROGRESS_TYPE.LINEAR"
								class="origam-card__progress origam-card__progress--linear"
								thickness="4"
								v-bind="loaderConfig.overrides"
						/>
					</div>
				</slot>
			</template>

			<template v-if="!loaderConfig.isActive || loaderConfig.kind !== 'skeleton'">
				<template v-if="hasHeader">
					<slot name="header">
						<origam-card-header
								key="item"
								:append-avatar="appendAvatar"
								:append-icon="appendIcon"
								:density="density"
								:prepend-avatar="prependAvatar"
								:prepend-icon="prependIcon"
								:subtitle="subtitle"
								:title="title"
								class="origam-card__header"
								@click:prepend="handleClickPrepend"
								@click:append="handleClickAppend"
						>
							<template
									v-if="slots['header.append']"
									#append
							>
								<slot name="header.append"/>
							</template>

							<template
									v-if="slots['header.prepend']"
									#prepend
							>
								<slot name="header.prepend"/>
							</template>

							<template
									v-if="slots['header.title']"
									#title
							>
								<slot name="header.title"/>
							</template>

							<template
									v-if="slots['header.subtitle']"
									#subtitle
							>
								<slot name="header.subtitle"/>
							</template>

							<template
									v-if="slots['header.content']"
									#default
							>
								<slot name="header.content"/>
							</template>
						</origam-card-header>
					</slot>
				</template>

				<template v-if="hasAsset">
					<div
							key="image"
							class="origam-card__asset"
					>
						<slot name="asset">
							<origam-img
									key="image-img"
									:src="props.image"
									class="origam-card__image"
									cover
							/>
						</slot>
					</div>
				</template>

				<div class="origam-card__content">
					<template v-if="hasText">
						<slot name="text">
							<origam-card-text
									key="text"
									:text="props.text"
									class="origam-card__text"
							/>
						</slot>
					</template>

					<slot name="default"/>
				</div>

				<template v-if="hasFooter">
					<div class="origam-card__footer">
						<slot name="footer"/>
					</div>
				</template>
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCardHeader, OrigamCardText, OrigamImg, OrigamProgress, OrigamSkeleton } from '../../components'

	import {
		useAdjacent,
		useBorder,
		useBothColor,
		useDensity,
		useDimension,
		useElevation,
		useLink,
		useLoader,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded
	} from '../../composables'

	import { vRipple } from '../../directives'

	import { DENSITY, PROGRESS_TYPE } from '../../enums'

	import type { ICardProps } from '../../interfaces'

	import { computed, StyleValue, toRef, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICardProps>(), {ripple: true, density: DENSITY.DEFAULT, tag: 'div'})

	defineEmits(['click:append', 'click:prepend'])

	const {filterProps} = useProps<ICardProps>(props)

	const attrs = useAttrs()

	const link = useLink(props, attrs)

	const {borderClasses, borderStyles} = useBorder(props)
	// `useBothColor` produces inline `color: …` and `background-color: …`
	// declarations from intent props (`color`, `bgColor`). Pre-fix
	// `ICardProps` did NOT extend `IColorProps` and the SCSS read
	// `var(--origam-card---color)` / `--background` from tokens only —
	// the consumer-facing `<origam-card color="primary">` was a silent
	// no-op. Wiring `useBothColor` here makes the consumer's intent
	// land on the root element via inline-style specificity, overriding
	// the token defaults exactly like every other coloured component.
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses} = useElevation(props, toRef(props, 'flat'))
	const {loaderClasses, loaderConfig} = useLoader(props, 'line')
	const {locationStyles} = useLocation(props)
	const {positionClasses} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {paddingStyles, paddingClasses} = usePadding(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isClickable = computed(() => {
		return !props.disabled && props.link && (props.link || link.isClickable.value)
	})

	const slots = useSlots()

	// SLOTS

	const hasTitle = computed(() => {
		return slots['header.title'] || props.title != null
	})
	const hasSubtitle = computed(() => {
		return slots['header.subtitle'] || props.subtitle != null
	})
	const hasAsset = computed(() => {
		return !!(slots.asset || props.image)
	})
	const hasFooter = computed(() => {
		return slots.footer
	})
	const hasHeader = computed(() => {
		return slots.header || hasTitle.value || hasSubtitle.value || hasPrepend.value || hasAppend.value
	})
	const hasText = computed(() => {
		return slots.text || props.text != null
	})
	const hasLoading = computed(() => {
		return slots.loader || loaderConfig.isActive
	})

	// CLASS & STYLES

	const cardStyles = computed(() => {
		return [
			borderStyles.value,
			colorStyles.value,
			dimensionStyles.value,
			locationStyles.value,
			roundedStyles.value,
			marginStyles.value,
			paddingStyles.value,
			props.style
		] as StyleValue
	})
	const cardClasses = computed(() => {
		return [
			'origam-card',
			{
				'origam-card--disabled': props.disabled,
				'origam-card--flat': props.flat,
				'origam-card--hover': props.hover && !(props.disabled || props.flat),
				'origam-card--link': isClickable.value
			},
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			loaderClasses.value,
			positionClasses.value,
			roundedClasses.value,
			marginClasses.value,
			paddingClasses.value,
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
	.origam-card {
		$this: &;

		display: var(--origam-card---display);
		overflow: var(--origam-card---overflow);
		overflow-wrap: var(--origam-card---overflow-wrap);
		position: var(--origam-card---position);
		z-index: var(--origam-card---z-index);

		text-decoration: var(--origam-card---text-decoration);
		transition-duration: var(--origam-card---transition-duration);
		transition-property: var(--origam-card---transition-property);
		transition-timing-function: var(--origam-card---transition-timing-function);

		pointer-events: var(--origam-card---pointer-events);
		user-select: var(--origam-card---user-select);
		cursor: var(--origam-card---cursor);

		background: var(--origam-card---background);
		box-shadow: var(--origam-card---box-shadow);
		color: var(--origam-card---color);

		padding-block-start: calc(var(--origam-card---padding-block-start) + var(--origam-card---density));
		padding-block-end: calc(var(--origam-card---padding-block-end) + var(--origam-card---density));
		padding-inline-start: calc(var(--origam-card---padding-inline-start) + var(--origam-card---density));
		padding-inline-end: calc(var(--origam-card---padding-inline-end) + var(--origam-card---density));

		margin-block-start: var(--origam-card---margin-block-start);
		margin-block-end: var(--origam-card---margin-block-end);
		margin-inline-start: var(--origam-card---margin-inline-start);
		margin-inline-end: var(--origam-card---margin-inline-end);

		// Borders — per-side / per-corner reads matching the tokens that
		// `tokens/component/card.json` actually emits. Pre-fix the SCSS
		// read the singular shorthand `--origam-card---border-width` and
		// `--origam-card---border-radius` — neither variable is emitted
		// by Style Dictionary, so `var()` resolved to its CSS initial
		// (`medium` ≈ 3 px) and combined with `border-style: solid`
		// produced an unwanted 3 px black frame on every card. Same
		// family of bug as the Toolbar fix in 0b24362.
		border-color: var(--origam-card---border-color);
		border-style: var(--origam-card---border-style);
		border-top-width: var(--origam-card---border-top-width, 0);
		border-right-width: var(--origam-card---border-right-width, 0);
		border-bottom-width: var(--origam-card---border-bottom-width, 0);
		border-left-width: var(--origam-card---border-left-width, 0);
		border-start-start-radius: var(--origam-card---border-start-start-radius, 0);
		border-start-end-radius: var(--origam-card---border-start-end-radius, 0);
		border-end-end-radius: var(--origam-card---border-end-end-radius, 0);
		border-end-start-radius: var(--origam-card---border-end-start-radius, 0);

		// Asset wrapper — pre-fix had NO height/aspect constraint. If
		// the underlying `<origam-img>` was still loading (or the
		// network blocked the asset), the picture's intrinsic
		// `aspect-ratio: 0` made the wrapper claim unbounded vertical
		// space, blowing up the card to ~500 px tall on a 340 px wide
		// card. Default to `16/9` so the asset area is always bounded
		// and matches the proportions Vuetify uses on `<v-card image>`.
		// Consumers needing a different ratio override either via the
		// `#asset` slot (full control) or by setting
		// `--origam-card__asset---aspect-ratio` on the card.
		&__asset {
			aspect-ratio: var(--origam-card__asset---aspect-ratio, 16 / 9);
			overflow: hidden;
		}

		&__overlay {
			background-color: var(--origam-card__overlay---background-color, var(--origam-color-overlay-scrim));
			border-radius: var(--origam-card__overlay---border-radius, inherit);
			opacity: var(--origam-card__overlay---opacity, var(--origam-card---overlay-opacity, 0));
			pointer-events: var(--origam-card__overlay---pointer-events, none);
			position: var(--origam-card__overlay---position, absolute);
			bottom: var(--origam-card__overlay---position-bottom, var(--origam-card---overlay-position-bottom, 0));
			left: var(--origam-card__overlay---position-left, var(--origam-card---overlay-position-left, 0));
			right: var(--origam-card__overlay---position-right, var(--origam-card---overlay-position-right, 0));
			top: var(--origam-card__overlay---position-top, var(--origam-card---overlay-position-top, 0));
			transition-property: var(--origam-card__overlay---transition-property, var(--origam-card---overlay-transition-property, opacity));
			transition-duration: var(--origam-card__overlay---transition-duration, var(--origam-card---overlay-transition-duration, 0.2s));
			transition-timing-function: var(--origam-card__overlay---transition-timing-function, var(--origam-card---overlay-transition-timing-function, ease-in-out));
		}

		&__underlay {
			position: var(--origam-card__underlay---position, var(--origam-card---underlay-position, absolute));
		}

		> * {
			opacity: var(--origam-card---opacity);
		}

		// `border={true}` — opt-in border on all four sides (Vuetify
		// parity). The base rule reads per-side widths now, so this
		// modifier needs to set each side explicitly.
		&--border {
			--origam-card---border-top-width: thin;
			--origam-card---border-right-width: thin;
			--origam-card---border-bottom-width: thin;
			--origam-card---border-left-width: thin;
			--origam-card---box-shadow: none;
		}

		// Directional rungs — `useBorder` emits BOTH `--border` and
		// `--border-{dir}` for direction values, so these rules need to
		// reset the OTHER three sides back to 0 (same pattern as
		// OrigamToolbar's directional border rules in 0b24362).
		&--border-top {
			--origam-card---border-top-width: thin;
			--origam-card---border-right-width: 0;
			--origam-card---border-bottom-width: 0;
			--origam-card---border-left-width: 0;
		}

		&--border-right {
			--origam-card---border-top-width: 0;
			--origam-card---border-right-width: thin;
			--origam-card---border-bottom-width: 0;
			--origam-card---border-left-width: 0;
		}

		&--border-bottom {
			--origam-card---border-top-width: 0;
			--origam-card---border-right-width: 0;
			--origam-card---border-bottom-width: thin;
			--origam-card---border-left-width: 0;
		}

		&--border-left {
			--origam-card---border-top-width: 0;
			--origam-card---border-right-width: 0;
			--origam-card---border-bottom-width: 0;
			--origam-card---border-left-width: thin;
		}

		&--rounded {
			--origam-card---border-start-start-radius: var(--origam-card---border-radius-rounded, 4px);
			--origam-card---border-start-end-radius: var(--origam-card---border-radius-rounded, 4px);
			--origam-card---border-end-end-radius: var(--origam-card---border-radius-rounded, 4px);
			--origam-card---border-end-start-radius: var(--origam-card---border-radius-rounded, 4px);
		}

		&--absolute {
			--origam-card---position: absolute;
		}

		&--fixed {
			--origam-card---position: fixed;
		}

		&--density-default {
			--origam-card---density: 0px;
		}

		&--density-compact {
			--origam-card---density: -8px;
		}

		&:hover,
		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--origam-card__overlay---opacity: var(--origam-card---overlay-opacity-hover, 0.12);
			}
		}

		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--origam-card__overlay---opacity: var(--origam-card---overlay-opacity-hover, 0.12);
			}

			&:hover,
			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--origam-card__overlay---opacity: var(--origam-card---overlay-opacity-hover, 0.12);
				}
			}
		}

		&--disabled {
			--origam-card---pointer-events: none;
			--origam-card---user-select: none;

			> * {
				--origam-card---opacity: var(--origam-card---opacity-disabled, 0.6);
			}
		}

		&--flated {
			--origam-card---box-shadow: none;
		}

		&--link {
			--origam-card---cursor: pointer;
		}

		&--hover {
			--origam-card---cursor: pointer;

			&:before {
				border-radius: var(--origam-card__before---border-radius, var(--origam-card---before-border-radius, inherit));
				bottom: var(--origam-card__before---bottom, var(--origam-card---before-bottom, 0));
				content: var(--origam-card__before---content, var(--origam-card---before-content, ""));
				display: var(--origam-card__before---display, var(--origam-card---before-display, block));
				left: var(--origam-card__before---left, var(--origam-card---before-left, 0));
				pointer-events: var(--origam-card__before---pointer-events, var(--origam-card---before-pointer-events, none));
				position: var(--origam-card__before---position, var(--origam-card---before-position, absolute));
				right: var(--origam-card__before---right, var(--origam-card---before-right, 0));
				top: var(--origam-card__before---top, var(--origam-card---before-top, 0));
				transition: var(--origam-card__before---transition, var(--origam-card---before-transition, inherit));
				opacity: var(--origam-card__before---opacity, var(--origam-card---before-opacity, 1));
				z-index: var(--origam-card__before---z-index, var(--origam-card---before-z-index, -1));
				box-shadow: var(--origam-card__before---box-shadow, var(--origam-card---before-box-shadow));
			}

			&:after {
				border-radius: var(--origam-card__after---border-radius, var(--origam-card---after-border-radius, inherit));
				bottom: var(--origam-card__after---bottom, var(--origam-card---after-bottom, 0));
				content: var(--origam-card__after---content, var(--origam-card---after-content, ""));
				display: var(--origam-card__after---display, var(--origam-card---after-display, block));
				left: var(--origam-card__after---left, var(--origam-card---after-left, 0));
				pointer-events: var(--origam-card__after---pointer-events, var(--origam-card---after-pointer-events, none));
				position: var(--origam-card__after---position, var(--origam-card---after-position, absolute));
				right: var(--origam-card__after---right, var(--origam-card---after-right, 0));
				top: var(--origam-card__after---top, var(--origam-card---after-top, 0));
				transition: var(--origam-card__after---transition, var(--origam-card---after-transition, inherit));
				z-index: var(--origam-card__after---z-index, var(--origam-card---after-z-index, 1));
				opacity: var(--origam-card__after---opacity, var(--origam-card---after-opacity, 0));
				box-shadow: var(--origam-card__after---box-shadow, var(--origam-card---after-box-shadow));
			}

			&:hover {
				--origam-card---box-shadow: var(--origam-card---box-shadow-hover);

				&:after {
					--origam-card__after---opacity: 1;
				}

				&:before {
					--origam-card__after---opacity: 0;
				}
			}
		}
	}
</style>

<!--
	Lot 1.5 migration — `<style>:root{}` block removed.
	The component now consumes the generated tokens from
	`src/assets/css/tokens/{primitive,light,dark}.css` (loaded once via the
	consumer's `import 'origam/styles'` or `import 'origam/tokens/css/light'`).

	Calc-based fallbacks (border-width compound, border-radius compound)
	live in the `<style scoped>` block below as defaults on the element itself,
	so a consumer who hasn't loaded the token CSS still sees a working card.
-->
<style
		lang="scss"
		scoped
>
	.origam-card {
		// Calc-based vars that compose multiple token-driven sub-values —
		// cannot be represented as a single token because their resolved value
		// depends on which individual side-tokens are set at the instance level.
		--origam-card---border-width: var(--origam-card---border-top-width, var(--origam-card---border-top-width, 0px)) var(--origam-card---border-left-width, 0px) var(--origam-card---border-bottom-width, 0px) var(--origam-card---border-right-width, 0px);
		--origam-card---border-radius: var(--origam-card---border-start-start-radius, 0px) var(--origam-card---border-start-end-radius, 0px) var(--origam-card---border-end-start-radius, 0px) var(--origam-card---border-end-end-radius, 0px);
	}
</style>
