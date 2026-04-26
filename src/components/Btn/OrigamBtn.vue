<template>
	<component
			:is="link.tag"
			:id="id"
			v-ripple="isRipple"
			:class="btnClasses"
			:disabled="isDisabled || undefined"
			:href="link.href.value"
			:type="link.tag === 'a' ? undefined : 'button'"
			:value="valueAttr"
			@click="handleClick"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
    <span
		    key="overlay"
		    class="origam-btn__overlay"
    />
		<span
				key="underlay"
				class="origam-btn__underlay"
		/>

		<slot name="wrapper">
			<origam-loader
					:loading="loading"
					class="origam-btn__loader"
			>
				<template
						v-if="hasLoader"
						#loader
				>
					<slot
							name="loader"
							v-bind="progressProps"
					>
						<origam-progress-circular
								ref="origamProgressRef"
								v-bind="progressProps"
						/>
					</slot>
				</template>

				<template #default>
          <span
		          v-if="hasPrepend"
		          key="prepend"
		          class="origam-btn__prepend"
		          @click="handleClickPrepend"
          >
            <slot name="prepend">
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
							class="origam-btn__content"
							data-no-activator=""
					>
            <slot name="default">
              <template v-if="hasIcon">
                <origam-icon
		                key="content-icon"
		                :icon="icon"
                />
              </template>
              <template v-else>
                {{ text }}
              </template>
            </slot>
          </span>

					<span
							v-if="hasAppend"
							key="append"
							class="origam-btn__append"
							@click="handleClickAppend"
					>
            <slot name="append">
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
           </slot>
          </span>
				</template>
			</origam-loader>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue, toRef, useAttrs, useSlots } from 'vue'
	import { OrigamAvatar, OrigamIcon, OrigamLoader, OrigamProgressCircular } from '../../components'

	import {
		useActive,
		useAdjacent,
		useBorder,
		useColorEffect,
		useDensity,
		useDimension,
		useElevation,
		useGroupItem,
		useHover,
		useLink,
		useLoader,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useSelectLink,
		useSize,
		useStatus,
		useStyle,
		useVariant
	} from '../../composables'

	import { ORIGAM_BTN_TOGGLE_KEY } from '../../consts'

	import { vRipple } from '../../directives'

	import { DENSITY, SIZES } from '../../enums'

	import type { IBtnProps } from '../../interfaces'

	import type { TOrigamProgressCircular } from "../../types"

	const attrs = useAttrs()

	const props = withDefaults(defineProps<IBtnProps>(), {
		tag: 'button',
		ripple: true,
		active: undefined,
		size: SIZES.DEFAULT,
		density: DENSITY.DEFAULT
	})

	defineEmits(['group:selected', 'click:append', 'click:prepend'])

	const {filterProps} = useProps<IBtnProps>(props)

	const origamProgressRef = ref<TOrigamProgressCircular>()

	const group = useGroupItem(props, ORIGAM_BTN_TOGGLE_KEY, false)
	const link = useLink(props, attrs)
	const slots = useSlots()

	useSelectLink(link, group?.select)

	const {isHover, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave} = useHover(props)
	const {isActive: active} = useActive(props)

	const isActive = computed(() => {
		if (active.value !== undefined) {
			return active.value
		}

		if (link.isLink.value) {
			return link.isActive?.value
		}

		return group?.isSelected.value
	})
	const isDisabled = computed(() => group?.disabled.value || props.disabled)
	const valueAttr = computed(() => {
		if (props.value === undefined || typeof props.value === 'symbol') return undefined

		return Object(props.value) === props.value
				? JSON.stringify(props.value, null, 0)
				: props.value
	})
	const isRipple = computed(() => {
		return [
			!isDisabled.value && props.ripple,
			null,
			props.icon ? ['center'] : null
		]
	})

	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {loaderClasses} = useLoader(props)
	const {locationStyles} = useLocation(props)
	const {positionClasses} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {sizeClasses, sizeStyles} = useSize(props)
	const {icon, prependIcon, appendIcon, statusClasses} = useStatus(props)
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive)
	const {elevationClasses, elevationStyles} = useElevation(props, toRef(props, 'flat'), bgColor)
	const {variantClasses} = useVariant(props)
	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, prependIcon, appendIcon)

	const handleClick = (e: MouseEvent) => {
		if (
				isDisabled.value ||
				(link.isLink.value && (
						e.metaKey ||
						e.ctrlKey ||
						e.shiftKey ||
						(e.button !== 0) ||
						attrs.target === '_blank'
				))
		) return

		link.navigate?.(e)
		group?.toggle()
	}

	const hasIcon = computed(() => {
		return !!(icon.value && props.icon !== true)
	})
	const hasLoader = computed(() => {
		return slots.loader || props.loading
	})

	const progressProps = computed(() => {
		return Object.assign({
					size: '23',
					indeterminate: true
				},
				origamProgressRef.value?.filterProps(props, ['class', 'style', 'id']))
	})

	// CLASS & STYLES

	const btnStyles = computed(() => {
		return [
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			dimensionStyles.value,
			locationStyles.value,
			roundedStyles.value,
			sizeStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const btnClasses = computed(() => {
		return [
			'origam-btn',
			group?.selectedClass.value,
			{
				'origam-btn--active': isActive.value,
				'origam-btn--block': props.block,
				'origam-btn--disabled': isDisabled.value,
				// Legacy boolean shortcut — kept in v2.x. `variantClasses`
				// emits `origam-btn--variant-flat` when `variant="flat"`,
				// so consumers can pick either spelling.
				'origam-btn--flat': props.flat,
				'origam-btn--icon': !!props.icon,
				'origam-btn--loading': props.loading,
				'origam-btn--slim': props.slim,
				'origam-btn--stacked': props.stacked
			},
			variantClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			loaderClasses.value,
			positionClasses.value,
			roundedClasses.value,
			sizeClasses.value,
			statusClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(btnStyles)

	// EXPOSE

	defineExpose({
		group,
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
	.origam-btn {
		$this: &;

		position: var(--origam-btn---position, relative);
		vertical-align: middle;
		flex-shrink: 0;

		font-size: var(--origam-btn---font-size);
		font-weight: var(--origam-btn---font-weight);
		letter-spacing: var(--origam-btn---letter-spacing);
		line-height: var(--origam-btn---line-height);
		text-decoration: var(--origam-btn---text-decoration);
		text-indent: var(--origam-btn---text-indent);

		transition-property: box-shadow, transform, opacity, background;
		transition-duration: var(--origam-btn---transition-duration, 0.28s);
		transition-timing-function: var(--origam-btn---transition-easing, cubic-bezier(0.4, 0, 0.2, 1));

		padding: 0 16px;

		width: var(--origam-btn---width, auto);
		min-width: var(--origam-btn---min-width, calc(var(--origam-btn---width, 64px) + var(--origam-btn---density, 0)));
		max-width: var(--origam-btn---max-width, 100%);
		height: var(--origam-btn---height, 36px);
		min-height: var(--origam-btn---min-height, calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0)));
		max-height: var(--origam-btn---max-height, 100%);

		background-color: var(--origam-btn---background-color, rgb(230, 230, 230));
		color: var(--origam-btn---color, rgba(30, 30, 30, 0.87));

		outline: none;
		cursor: pointer;
		user-select: none;
		opacity: var(--origam-btn---opacity, 1);

		border-width: var(--origam-btn-group---border-width);
		border-style: var(--origam-btn-group---border-style);
		border-color: var(--origam-btn-group---border-color);
		border-radius: var(--origam-btn-group---border-radius, 4px);

		&--size-x-small {
			--origam-btn---height: 20px;
			--origam-btn---font-size: 0.625rem;
			--origam-btn---min-width: 36px;
			padding: 0 8px;

			:deep(.origam-icon) {
				--origam-btn---font-size: 16px;
			}
		}

		&--size-small {
			--origam-btn---height: 28px;
			--origam-btn---font-size: 0.75rem;
			--origam-btn---min-width: 50px;
			padding: 0 12px;

			:deep(.origam-icon) {
				--origam-btn---font-size: 20px;
			}
		}

		&--size-default {
			--origam-btn---height: 36px;
			--origam-btn---font-size: 0.875rem;
			--origam-btn---min-width: 64px;
			padding: 0 16px;

			:deep(.origam-icon) {
				--origam-btn---font-size: 24px;
			}
		}

		&--size-large {
			--origam-btn---height: 44px;
			--origam-btn---font-size: 1rem;
			--origam-btn---min-width: 78px;
			padding: 0 20px;

			:deep(.origam-icon) {
				--origam-btn---font-size: 28px;
			}
		}

		&--size-x-large {
			--origam-btn---height: 52px;
			--origam-btn---font-size: 1.125rem;
			--origam-btn---min-width: 92px;
			padding: 0 24px;

			:deep(.origam-icon) {
				--origam-btn---font-size: 32px;
			}
		}

		&--density-comfortable {
			--origam-btn---density: 8px;
		}

		&--density-default {
			--origam-btn---density: 0px;
		}

		&--density-compact {
			--origam-btn---density: -8px;
		}

		&--border {
			--origam-btn---border-width: thin;
		}

		&--absolute {
			--origam-btn---position: absolute;
		}

		&--fixed {
			--origam-btn---position: fixed;
		}

		&:hover,
		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--origam-btn__overlay---opacity: var(--origam-btn---overlay-opacity-hover, 0.12);
			}
		}

		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--origam-btn__overlay---opacity: var(--origam-btn---overlay-opacity-hover, 0.12);
			}

			&:hover,
			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--origam-btn__overlay---opacity: var(--origam-btn---overlay-opacity-hover, 0.12);
				}
			}
		}

		&--icon {
			--origam-btn---border-radius: var(--origam-btn---border-radius-icon, 50%);

			--origam-btn---min-width: 0;
			--origam-btn---width: calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0));
			--origam-btn---height: calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0));

			padding: 0;
		}

		&--flat,
		&--variant-flat {
			// Default rendering — keeps the intent bg + fg from useColorEffect.
			// `--flat` is the legacy boolean shortcut for `variant="flat"`; both
			// classes are emitted while `flat: boolean` remains in the API.
			box-shadow: none;
		}

		// ────────────────────────────────────────────────────────────
		// Variants — each one overrides the rendered chrome on top of
		// the intent vars set inline by `useColorEffect`. `!important`
		// is required because `useColorEffect` ships its colors as
		// inline `:style="{ '--origam-btn---background-color': … }"`,
		// which beats class-level CSS in normal cascade order. Mirrors
		// Vuetify's `.v-btn--variant-{name}` strategy.
		// ────────────────────────────────────────────────────────────

		&--variant-text {
			background-color: transparent !important;
			box-shadow: none;
		}

		&--variant-elevated {
			box-shadow: var(--origam-btn---box-shadow-elevated, var(--origam-shadow-md));
		}

		&--variant-tonal {
			// Tonal: tinted background, original color text. Uses the inline
			// intent's bg with reduced opacity via `color-mix` when supported,
			// falling back to the surface-overlay token.
			background-color: var(
				--origam-btn---background-color-tonal,
				var(--origam-color-surface-overlay)
			) !important;
			box-shadow: none;
		}

		&--variant-outlined {
			background-color: transparent !important;
			border-width: var(--origam-btn---border-width-outlined, var(--origam-border-width-thin));
			border-style: solid;
			border-color: currentColor;
			box-shadow: none;
		}

		&--variant-plain {
			background-color: transparent !important;
			box-shadow: none;
			opacity: var(--origam-btn---opacity-plain, var(--origam-opacity-70));

			&:hover,
			&:focus-visible {
				opacity: 1;
			}
		}

		// Glassmorphism — translucent tint of the current text color +
		// backdrop-filter blur. The tint uses `currentColor` so the
		// effect adapts to whichever foreground intent is active and
		// flips correctly between light and dark themes (bg-color-mix
		// is naturally theme-aware via the inherited text color).
		//
		// CSS-first / JS-fallback principle: `backdrop-filter` is
		// gated by `@supports`. Browsers that lack it fall back to a
		// stronger tint (no blur) so the variant still reads as a
		// distinct surface.
		&--variant-ghost {
			background-color: var(
				--origam-btn---background-color-ghost,
				color-mix(in srgb, currentColor 8%, transparent)
			) !important;
			border-width: var(--origam-btn---border-width-ghost, var(--origam-border-width-thin));
			border-style: solid;
			border-color: var(
				--origam-btn---border-color-ghost,
				color-mix(in srgb, currentColor 16%, transparent)
			);
			box-shadow: none;

			@supports (backdrop-filter: blur(8px)) or (-webkit-backdrop-filter: blur(8px)) {
				backdrop-filter: var(--origam-btn---backdrop-filter-ghost, blur(8px));
				-webkit-backdrop-filter: var(--origam-btn---backdrop-filter-ghost, blur(8px));
			}

			@supports not ((backdrop-filter: blur(8px)) or (-webkit-backdrop-filter: blur(8px))) {
				// No blur support — bump the tint a bit so the variant still
				// reads as a discrete surface (Safari < 9, IE legacy).
				background-color: var(
					--origam-btn---background-color-ghost,
					color-mix(in srgb, currentColor 14%, transparent)
				) !important;
			}

			&:hover,
			&:focus-visible {
				background-color: var(
					--origam-btn---background-color-ghost-hover,
					color-mix(in srgb, currentColor 14%, transparent)
				) !important;
			}
		}

		&--block {
			display: flex;
			flex: 1 0 auto;

			--origam-btn---min-width: 100%;
		}

		&--disabled {
			pointer-events: none;
			--origam-btn---opacity: var(--origam-btn---opacity-disabled, 0.26);

			&:hover {
				--origam-btn---opacity: var(--origam-btn---opacity-disabled, 0.26);
			}
		}

		&--loading {
			pointer-events: none;

			#{$this}__content,
			#{$this}__prepend,
			#{$this}__append {
				opacity: 0;
			}
		}

		&--stacked {
			#{$this}__loader {
				grid-template-areas: "prepend" "content" "append";
				grid-template-columns: auto;
				grid-template-rows: max-content max-content max-content;
				justify-items: center;
				align-content: center;
			}

			#{$this}__content {
				flex-direction: column;
				line-height: 1.25;
			}

			#{$this}__prepend,
			#{$this}__append,
			#{$this}__content > :deep(.origam-icon--start),
			#{$this}__content > :deep(.origam-icon--end) {
				margin-inline: 0;
			}

			#{$this}__prepend,
			#{$this}__content > :deep(.origam-icon--start) {
				margin-bottom: 4px;
			}

			#{$this}__append,
			#{$this}__content > :deep(.origam-icon--end) {
				margin-top: 4px;
			}

			#{$this}__content {
				white-space: normal;
			}

			&#{$this}--size-x-small {
				--origam-btn---height: 56px;
				font-size: 0.625rem;
				min-width: 56px;
				padding: 0 12px;
			}

			&#{$this}--size-small {
				--origam-btn---height: 64px;
				font-size: 0.75rem;
				min-width: 64px;
				padding: 0 14px;
			}

			&#{$this}--size-default {
				--origam-btn---height: 72px;
				font-size: 0.875rem;
				min-width: 72px;
				padding: 0 16px;
			}

			&#{$this}--size-large {
				--origam-btn---height: 80px;
				font-size: 1rem;
				min-width: 80px;
				padding: 0 18px;
			}

			&#{$this}--size-x-large {
				--origam-btn---height: 88px;
				font-size: 1.125rem;
				min-width: 88px;
				padding: 0 20px;
			}

			&#{$this}--density-default {
				height: calc(var(--origam-btn---height) + 0px);
			}

			&#{$this}--density-compact {
				height: calc(var(--origam-btn---height) + -24px);
			}
		}

		&--slim {
			padding: 0 8px;
		}

		&--rounded {
			--origam-btn---border-radius: var(--origam-btn---border-radius-rounded, 24px);

			&#{$this}--icon {
				--origam-btn---border-radius: var(--origam-btn---border-radius, 4px);
			}
		}

		#{$this}__loader {
			align-items: center;
			justify-content: center;
			display: inline-grid;
			grid-template-areas: "prepend content append";
			grid-template-columns: max-content auto max-content;
			height: 100%;
			width: 100%;

			:deep(.origam-progress--circular) {
				width: 1.5em;
				height: 1.5em;
			}
		}

		&__content,
		&__prepend,
		&__append {
			align-items: center;
			display: flex;

			transition: transform, opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
		}

		&__prepend {
			grid-area: prepend;

			margin-inline-start: var(--origam-btn__prepend---margin-inline-start);
			margin-inline-end: var(--origam-btn__prepend---margin-inline-end);
		}

		&__append {
			grid-area: append;

			margin-inline-start: var(--origam-btn__append---margin-inline-start);
			margin-inline-end: var(--origam-btn__append---margin-inline-end);
		}

		&__content {
			grid-area: content;
			justify-content: center;
			white-space: nowrap;

			margin-inline-start: var(--origam-btn__content---margin-inline-start);
			margin-inline-end: var(--origam-btn__content---margin-inline-end);

			> :deep(.origam-icon--start) {
				--origam-btn__content---margin-inline-start: calc(var(--origam-btn---height) / -9);
				--origam-btn__content---margin-inline-end: calc(var(--origam-btn---height) / 4.5);
			}

			> :deep(.origam-icon--end) {
				--origam-btn__content---margin-inline-start: calc(var(--origam-btn---height) / 4.5);
				--origam-btn__content---margin-inline-end: calc(var(--origam-btn---height) / -9);
			}
		}

		&__overlay {
			background-color: var(--origam-color-overlay-scrim);
			border-radius: inherit;
			opacity: var(--origam-btn__overlay---opacity, 0);
			transition: opacity 0.2s ease-in-out;
		}

		&__overlay,
		&__underlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		}
	}
</style>

<!--
	Lot 1 migration — `<style>:root{}` block removed.
	The component now consumes the generated tokens from
	`src/assets/css/tokens/{primitive,light,dark}.css` (loaded once via the
	consumer's `import 'origam/styles'` or `import 'origam/tokens/css/light'`).

	Calc-based fallbacks (margins/paddings tied to height) live in the
	`<style scoped>` block above as defaults on the element itself, so a
	consumer who hasn't loaded the token CSS still sees a working button.
-->
<style
		lang="scss"
		scoped
>
	.origam-btn {
		// Calc-based defaults that depend on local --origam-btn---height —
		// these can't live in the token JSON because they reference the
		// resolved value at the component-instance level (size variant,
		// density modifier, etc.).
		--origam-btn__content---margin-inline-start: 0;
		--origam-btn__content---margin-inline-end: 0;

		--origam-btn__append---margin-inline-end: calc(var(--origam-btn---height) / -9);
		--origam-btn__append---margin-inline-start: calc(var(--origam-btn---height) / 4.5);

		--origam-btn__prepend---margin-inline-start: calc(var(--origam-btn---height) / -9);
		--origam-btn__prepend---margin-inline-end: calc(var(--origam-btn---height) / 4.5);

		--origam-btn---min-width: calc(var(--origam-btn---width, 36px) + var(--origam-btn---density, 0));
		--origam-btn---min-height: calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0));
	}
</style>
