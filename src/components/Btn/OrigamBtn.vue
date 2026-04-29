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
		useDefaults,
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

	const _props = withDefaults(defineProps<IBtnProps>(), {
		tag: 'button',
		ripple: true,
		active: undefined,
		size: SIZES.DEFAULT,
		density: DENSITY.DEFAULT
	})

	// `useDefaults` resolves each prop against the closest
	// `<OrigamDefaultsProvider>` (or `provideDefaults({ 'origam-btn': … })`
	// from a parent like `OrigamBtnGroup` / `OrigamBtnToggle`). Without
	// this hook the parent's `color` / `density` / `bgColor` settings
	// silently dropped when buttons were passed via the default slot —
	// only the `items` prop path was honoured (and even that flipped the
	// override semantics: parent `??` item, instead of item-wins).
	const props = useDefaults(_props)

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
		// Exclude `size`, `type` and (critically) `tag` from filterProps.
		// The Btn's own `tag` prop is `'button'` or `'a'` (from useLink),
		// and without this exclusion `Object.assign` propagates it onto
		// the spinner — which then renders as a NATIVE <button> with the
		// user-agent default chrome (light-gray bg, 2px outset border,
		// rounded corners). That's the "gros carré blanc" Arnaud was
		// seeing INSIDE the loading button. Verified via Playwright DOM
		// dump: depth 2 was a <button> with bg rgb(239,239,239) and
		// border "2px outset rgb(0,0,0)" — straight UA defaults.
		return Object.assign({
					size: '23',
					indeterminate: true
				},
				origamProgressRef.value?.filterProps(props, ['class', 'style', 'id', 'tag', 'size', 'type']))
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

		// Density modulates BOTH the explicit height/min-height AND the
		// horizontal padding so the visual difference between
		// compact / default / comfortable is unmistakable. Previously
		// density only nudged `min-height` while a fixed `height: 36px`
		// took precedence, so `compact` (negative offset) was a no-op.
		padding: 0 calc(16px + var(--origam-btn---density-padding-x, 0px));

		width: var(--origam-btn---width, auto);
		min-width: var(--origam-btn---min-width, calc(var(--origam-btn---width, 64px) + var(--origam-btn---density, 0px)));
		max-width: var(--origam-btn---max-width, 100%);
		// Density is folded INTO the rendered height, not just min-height,
		// so `compact` (negative offset) actually shrinks the button. The
		// min-height var indirection is preserved for consumer overrides
		// (e.g. forcing a tighter button via `--origam-btn---min-height`).
		height: calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0px));
		min-height: var(--origam-btn---min-height, calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0px)));
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
		// Read `--origam-btn---border-radius` first so the `&--rounded`,
		// `&--icon` and consumer `:style` overrides actually take effect.
		// Falls back to the inherited group radius (or 4px) when unset.
		border-radius: var(
			--origam-btn---border-radius,
			var(--origam-btn-group---border-radius, 4px)
		);

		// ──────────────────────────────────────────────────────────────
		// __loader BEM child — declared FIRST (before any `&--*`
		// modifier) so the source-order tie-breaker between equally
		// specific selectors gives the win to the modifier overrides
		// (e.g. `&--stacked __loader { grid-template-areas: …vertical… }`,
		// `&--loading __loader { display: inline-flex }`). Previously this
		// rule lived at the bottom of the block, so every modifier on
		// `__loader` was silently shadowed and the stacked layout stayed
		// horizontal. Verified via Playwright DOM dump: rule 1
		// (`.origam-btn--stacked .origam-btn__loader[data-v]`) and rule 2
		// (`.origam-btn .origam-btn__loader[data-v]`) had identical
		// (0,3,0) specificity, so source order decided.
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

		// Size variants: each one re-applies the density-aware horizontal
		// padding so `compact` / `comfortable` keeps modulating the
		// breathing room regardless of size. Without `density-padding-x`,
		// these blocks would wipe out the base `padding: 0 calc(...)` rule.
		&--size-x-small {
			--origam-btn---height: 20px;
			--origam-btn---font-size: 0.625rem;
			--origam-btn---min-width: 36px;
			padding: 0 calc(8px + var(--origam-btn---density-padding-x, 0px));

			:deep(.origam-icon) {
				--origam-btn---font-size: 16px;
			}
		}

		&--size-small {
			--origam-btn---height: 28px;
			--origam-btn---font-size: 0.75rem;
			--origam-btn---min-width: 50px;
			padding: 0 calc(12px + var(--origam-btn---density-padding-x, 0px));

			:deep(.origam-icon) {
				--origam-btn---font-size: 20px;
			}
		}

		&--size-default {
			--origam-btn---height: 36px;
			--origam-btn---font-size: 0.875rem;
			--origam-btn---min-width: 64px;
			padding: 0 calc(16px + var(--origam-btn---density-padding-x, 0px));

			:deep(.origam-icon) {
				--origam-btn---font-size: 24px;
			}
		}

		&--size-large {
			--origam-btn---height: 44px;
			--origam-btn---font-size: 1rem;
			--origam-btn---min-width: 78px;
			padding: 0 calc(20px + var(--origam-btn---density-padding-x, 0px));

			:deep(.origam-icon) {
				--origam-btn---font-size: 28px;
			}
		}

		&--size-x-large {
			--origam-btn---height: 52px;
			--origam-btn---font-size: 1.125rem;
			--origam-btn---min-width: 92px;
			padding: 0 calc(24px + var(--origam-btn---density-padding-x, 0px));

			:deep(.origam-icon) {
				--origam-btn---font-size: 32px;
			}
		}

		// Density tokens — offsets applied to height + horizontal padding.
		// Sign convention: positive grows the button, negative shrinks it.
		// `density-padding-x` is half of `density` so the horizontal change
		// scales with the vertical one without dwarfing the label.
		&--density-comfortable {
			--origam-btn---density: 8px;
			--origam-btn---density-padding-x: 4px;
		}

		&--density-default {
			--origam-btn---density: 0px;
			--origam-btn---density-padding-x: 0px;
		}

		&--density-compact {
			--origam-btn---density: -8px;
			--origam-btn---density-padding-x: -4px;
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
			// Square button: width must match the rendered height (which
			// already includes density via the base `height` rule). We add
			// density here too so width keeps parity with height — but we
			// do NOT touch `--origam-btn---height` itself, otherwise the
			// base rule would re-add density and double-count.
			--origam-btn---width: calc(var(--origam-btn---height, 36px) + var(--origam-btn---density, 0px));

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

			// During loading, OrigamLoader's `v-if/v-else` removes the
			// __prepend/__content/__append children entirely, so the
			// 3-column grid below collapses to empty cells that can read
			// as a "white square" depending on the parent bg. Switch to a
			// centered flex layout so only the spinner shows, perfectly
			// centered.
			#{$this}__loader {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				grid-template-areas: none;
				grid-template-columns: none;
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

			// Same density-aware padding pattern as the non-stacked size
			// variants — keeps `compact`/`comfortable` modulating breathing
			// room across all stacked sizes.
			&#{$this}--size-x-small {
				--origam-btn---height: 56px;
				font-size: 0.625rem;
				min-width: 56px;
				padding: 0 calc(12px + var(--origam-btn---density-padding-x, 0px));
			}

			&#{$this}--size-small {
				--origam-btn---height: 64px;
				font-size: 0.75rem;
				min-width: 64px;
				padding: 0 calc(14px + var(--origam-btn---density-padding-x, 0px));
			}

			&#{$this}--size-default {
				--origam-btn---height: 72px;
				font-size: 0.875rem;
				min-width: 72px;
				padding: 0 calc(16px + var(--origam-btn---density-padding-x, 0px));
			}

			&#{$this}--size-large {
				--origam-btn---height: 80px;
				font-size: 1rem;
				min-width: 80px;
				padding: 0 calc(18px + var(--origam-btn---density-padding-x, 0px));
			}

			&#{$this}--size-x-large {
				--origam-btn---height: 88px;
				font-size: 1.125rem;
				min-width: 88px;
				padding: 0 calc(20px + var(--origam-btn---density-padding-x, 0px));
			}

			// Stacked amplifies the density delta — the icon-over-label
			// layout reads "wider" so it needs a stronger compression /
			// expansion to feel different from the size-x-large baseline.
			// The base height rule (`calc(--origam-btn---height + density)`)
			// picks these new values up automatically — no explicit `height`
			// override needed.
			&#{$this}--density-comfortable {
				--origam-btn---density: 16px;
			}

			&#{$this}--density-compact {
				--origam-btn---density: -24px;
			}
		}

		&--slim {
			padding: 0 8px;
		}

		// ────────────────────────────────────────────────────────────
		// Rounded variants — mirror the origam enum-driven API.
		// `useRounded` emits one of:
		//   - `--rounded`            → legacy boolean (max curvature)
		//   - `--rounded-{name}`     → named variant from `ROUNDED` enum
		// Each variant binds `--origam-btn---border-radius` to a primitive
		// `--origam-radius-*` token so theme switches stay seamless.
		// ────────────────────────────────────────────────────────────
		&--rounded {
			--origam-btn---border-radius: var(--origam-btn---border-radius-rounded, var(--origam-radius-2xl, 24px));

			&#{$this}--icon {
				--origam-btn---border-radius: var(--origam-btn---border-radius, 4px);
			}
		}

		&--rounded-x-small {
			--origam-btn---border-radius: var(--origam-radius-xs, 2px);
		}

		&--rounded-small {
			--origam-btn---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-default {
			--origam-btn---border-radius: var(--origam-radius-md, 8px);
		}

		&--rounded-medium {
			--origam-btn---border-radius: var(--origam-radius-lg, 12px);
		}

		&--rounded-large {
			--origam-btn---border-radius: var(--origam-radius-xl, 16px);
		}

		&--rounded-x-large {
			--origam-btn---border-radius: var(--origam-radius-2xl, 24px);
		}

		// __loader BEM block (base layout) was moved next to the BEM
		// children below — see `&__loader` further down. The base rule had
		// to live AFTER the modifier blocks (`&--stacked`, `&--loading`,
		// etc.) that override grid-template-areas, otherwise CSS source
		// order at equal specificity made the base win unconditionally
		// (e.g. stacked stayed horizontal). Cf. Playwright DOM dump.

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
