<template>
	<component
			:is="link.tag"
			v-ripple="rippleProps"
			:class="chipClasses"
			:disabled="props.disabled"
			:draggable="props.draggable"
			:href="link.href"
			:style="chipStyles"
			:tabindex="isClickable ? 0 : undefined"
			@click="handleClick"
			@keydown="isClickable && !isLink && handleKeydown"
	>
    <span
		    v-if="isClickable"
		    key="overlay"
		    class="origam-chip__overlay"
    />
		<span
				key="underlay"
				class="origam-chip__underlay"
		/>

		<template v-if="hasFilter">
			<origam-expand-x key="filter">
				<div
						v-show="isSelected"
						class="origam-chip__filter"
				>
					<slot
							name="filter"
							v-bind="{filterIcon}"
					>
						<origam-icon :icon="filterIcon"/>
					</slot>
				</div>
			</origam-expand-x>
		</template>

		<div
				v-if="hasPrepend"
				key="prepend"
				class="origam-chip__prepend"
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
		</div>

		<div
				class="origam-chip__content"
				data-no-activator=""
		>
			<slot
					name="default"
					v-bind="contentProps"
			>
				{{ text }}
			</slot>
		</div>

		<div
				v-if="hasAppend"
				key="append"
				class="origam-chip__append"
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
		</div>

		<div
				v-if="hasClose"
				key="close"
				class="origam-chip__close"
				@click="handleClickClose"
		>
			<slot
					name="close"
					v-bind="{closeIcon}"
			>
				<origam-icon
						v-if="closeIcon"
						key="close-icon"
						:aria-label="t(closeLabel)"
						:density="density"
						:icon="closeIcon"
						size="x-small"
				/>
			</slot>
		</div>

	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamAvatar, OrigamExpandX, OrigamIcon } from '../../components'

	import {
		useAdjacent,
		useBorder,
		useBothColor,
		useDefaults,
		useDensity,
		useElevation,
		useGroupItem,
		useLink,
		useLocale,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSize,
		useVModel
	} from '../../composables'

	import { ORIGAM_CHIP_GROUP_KEY } from '../../consts'

	import { vRipple } from '../../directives'

	import { KEYBOARD_VALUES, MDI_ICONS, SIZES } from '../../enums'

	import type { IChipProps } from '../../interfaces'

	import { computed, StyleValue, toRef, useAttrs, useSlots } from 'vue'

	const _props = withDefaults(defineProps<IChipProps>(), {
		tag: 'span',
		closeIcon: MDI_ICONS.CLOSE_CIRCLE_OUTLINE,
		filterIcon: MDI_ICONS.CHECK,
		closeLabel: 'origam.close',
		modelValue: true,
		// Default size — without this `withDefaults` value, `useSize`
		// emits no `--size-*` class on the chip root, and the size
		// variants (which alone declare padding / font-size) never
		// apply. Result pre-fix: chip rendered at body's 16px font and
		// 0 padding, collapsing to ~18px tall. Mirrors `OrigamBtn`'s
		// own `size: SIZES.DEFAULT` default.
		size: SIZES.DEFAULT
	})

	// Resolve each prop against the closest provider — typically a parent
	// `OrigamChipGroup` injecting `'origam-chip': { color, density, … }`.
	// Without this hook, group-level color / density never propagates to
	// chips passed via the default slot.
	const props = useDefaults(_props)

	const emits = defineEmits(['click:close', 'update:modelValue', 'group:selected', 'click', 'click:prepend', 'click:append'])

	const {filterProps} = useProps<IChipProps>(props)

	const {t} = useLocale()

	const attrs = useAttrs()
	const slots = useSlots()

	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {sizeClasses, sizeStyles} = useSize(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginStyles, marginClasses} = useMargin(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	const isActive = useVModel(props, 'modelValue')
	const group = useGroupItem(props, ORIGAM_CHIP_GROUP_KEY, false)
	const link = useLink(props, attrs)
	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasPrepend,
		hasAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isLink = computed(() => {
		return props.link && link.isLink.value
	})
	const isClickable = computed(() => {
		return !props.disabled && props.link && (!!group || props.link || link.isClickable.value)
	})
	const rippleProps = computed(() => {
		return [isClickable.value && props.ripple, null]
	})
	const isSelected = computed(() => {
		return !group || group.isSelected.value
	})

	const contentProps = computed(() => {
		return {
			isSelected: group?.isSelected.value,
			selectedClass: group?.selectedClass.value,
			select: group?.select,
			toggle: group?.toggle,
			value: group?.value.value,
			disabled: props.disabled
		}
	})

	const onClick = (e: MouseEvent) => {
		emits('click', e)

		if (!isClickable.value) return

		link.navigate?.(e)
		group?.toggle()
	}

	const handleClickClose = (e: MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		isActive.value = false

		emits('click:close', e)
	}
	const handleClick = (e: MouseEvent) => {
		onClick(e)
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === KEYBOARD_VALUES.ENTER || e.key === ' ') {
			e.preventDefault()
			onClick(e as any as MouseEvent)
		}
	}

	const hasClose = computed(() => {
		return slots.close || props.closable
	})
	const hasFilter = computed(() => {
		return (slots.filter || props.filter) && group
	})

	// CLASS & STYLES

	const chipStyles = computed(() => {
		return [
			sizeStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const chipClasses = computed(() => {
		return [
			'origam-chip',
			{
				'origam-chip--disabled': props.disabled,
				'origam-chip--label': props.label,
				'origam-chip--link': isClickable.value,
				'origam-chip--filter': hasFilter.value,
				'origam-chip--pill': props.pill
			},
			borderClasses.value,
			roundedClasses.value,
			densityClasses.value,
			elevationClasses.value,
			sizeClasses.value,
			paddingClasses.value,
			marginClasses.value,
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
	.origam-chip {
		$this: &;

		align-items: center;
		display: inline-flex;
		font-weight: var(--origam-chip---font-weight, 400);
		max-width: 100%;
		min-width: 0;
		overflow: hidden;
		position: relative;
		text-decoration: none;
		white-space: nowrap;
		vertical-align: middle;
		border-color: var(--origam-chip---border-color, currentColor);
		border-style: var(--origam-chip---border-style, solid);
		border-width: var(--origam-chip---border-width, 0px);
		border-radius: var(--origam-chip---border-radius, 9999px);

		background-color: var(--origam-chip---background-color);
		color: var(--origam-chip---color);

		&__content {
			align-items: center;
			display: inline-flex;
			overflow: hidden;
		}

		&__filter,
		&__prepend,
		&__append,
		&__close {
			align-items: center;
			display: inline-flex;
		}

		&__close {
			cursor: var(--origam-chip__close---cursor, pointer);
			flex: var(--origam-chip__close---flex, 0 1 auto);
			font-size: var(--origam-chip__close---font-size, 18px);
			max-height: var(--origam-chip__close---max-height, 18px);
			max-width: var(--origam-chip__close---max-width, 18px);
			user-select: var(--origam-chip__close---user-select, none);

			// Breathing room between the chip body and the close button.
			// Pre-fix the close icon was flush with the content (0px gap)
			// while the chip's right padding was 12px — the asymmetry read
			// as "the close has no room", per user feedback. The negative
			// `margin-inline-end` pulls the icon slightly past the chip's
			// inline padding to compensate for the close-circle glyph's
			// own internal whitespace, keeping the visual right edge of
			// the icon aligned with where a textual right edge would land.
			margin-inline-start: var(--origam-chip__close---margin-inline-start, 6px);
			margin-inline-end: var(--origam-chip__close---margin-inline-end, -4px);

			.origam-icon {
				font-size: inherit;
			}
		}

		&__filter {
			transition:
				var(--origam-chip__filter---transition-property, transform, opacity)
				var(--origam-chip__filter---transition-duration, 0.15s)
				var(--origam-chip__filter---transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
		}

		&__overlay {
			position: var(--origam-chip__overlay---position, absolute);
			top: var(--origam-chip__overlay---position-top, 0);
			left: var(--origam-chip__overlay---position-left, 0);
			width: var(--origam-chip__overlay---width, 100%);
			height: var(--origam-chip__overlay---height, 100%);
			background-color: var(--origam-chip__overlay---background-color, currentColor);
			border-radius: var(--origam-chip__overlay---border-radius, inherit);
			pointer-events: var(--origam-chip__overlay---pointer-events, none);
			opacity: var(--origam-chip__overlay---opacity, 0);
			transition:
				var(--origam-chip__overlay---transition-property, opacity)
				var(--origam-chip__overlay---transition-duration, 0.2s)
				var(--origam-chip__overlay---transition-timing-function, ease-in-out);
		}

		&--disabled {
			opacity: var(--origam-chip---opacity-disabled, 0.3);
			pointer-events: none;
			user-select: none;
		}

		&--label {
			border-radius: var(--origam-chip---border-radius-label, 4px);
		}

		// Size scale — heights / font-sizes / paddings mirror Vuetify's
		// `v-chip` for visual parity (the previous version only set
		// font-size + padding, leaving `height` undeclared so the chip
		// collapsed to its text content's line-box height ~18px). Each
		// rung now also pins `font-size` (instead of relying on a
		// CSS-var indirection that was never read by the base rule)
		// and `line-height: 1` so vertical centring with the prepend /
		// append icons stays clean.
		&--size-x-small {
			font-size: var(--origam-chip---font-size-xs, 0.625rem);
			line-height: 1;
			height: var(--origam-chip---height-xs, 20px);
			padding: 0 var(--origam-chip---padding-xs, 8px);
		}

		&--size-small {
			font-size: var(--origam-chip---font-size-sm, 0.75rem);
			line-height: 1;
			height: var(--origam-chip---height-sm, 24px);
			padding: 0 var(--origam-chip---padding-sm, 10px);
		}

		&--size-default {
			font-size: var(--origam-chip---font-size-md, 0.875rem);
			line-height: 1;
			height: var(--origam-chip---height-md, 32px);
			padding: 0 var(--origam-chip---padding-md, 12px);
		}

		&--size-large {
			font-size: var(--origam-chip---font-size-lg, 1rem);
			line-height: 1;
			height: var(--origam-chip---height-lg, 38px);
			padding: 0 var(--origam-chip---padding-lg, 14px);
		}

		&--size-x-large {
			font-size: var(--origam-chip---font-size-xl, 1.125rem);
			line-height: 1;
			height: var(--origam-chip---height-xl, 44px);
			padding: 0 var(--origam-chip---padding-xl, 17px);
		}

		&--density-default {
			--origam-chip---density: 0px;
		}

		&--density-compact {
			--origam-chip---density: -8px;
		}

		&:hover {
			> #{$this}__overlay {
				--origam-chip__overlay---opacity: var(--origam-chip---overlay-opacity-hover, 0.24);
			}
		}

		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--origam-chip__overlay---opacity: var(--origam-chip---overlay-opacity-focus, 0.12);
			}
		}

		&--active,
		&[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--origam-chip__overlay---opacity: var(--origam-chip---overlay-opacity-active, 0.12);
			}

			&:hover {
				> #{$this}__overlay {
					--origam-chip__overlay---opacity: var(--origam-chip---overlay-opacity-hover, 0.04);
				}
			}

			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--origam-chip__overlay---opacity: var(--origam-chip---overlay-opacity-focus, 0.12);
				}
			}
		}

		&__underlay {
			position: var(--origam-chip__underlay---position, absolute);
		}

		// Rounded variants — overrides the default 9999px pill.
		// boolean --rounded falls back to radius.sm (4px, a tight chip corner).
		&--rounded {
			--origam-chip---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-x-small {
			--origam-chip---border-radius: var(--origam-radius-xs, 2px);
		}

		&--rounded-small {
			--origam-chip---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-default {
			--origam-chip---border-radius: var(--origam-radius-md, 8px);
		}

		&--rounded-medium {
			--origam-chip---border-radius: var(--origam-radius-lg, 12px);
		}

		&--rounded-large {
			--origam-chip---border-radius: var(--origam-radius-xl, 16px);
		}

		&--rounded-x-large {
			--origam-chip---border-radius: var(--origam-radius-2xl, 24px);
		}

		&--rounded-shaped {
			border-start-start-radius: var(--origam-chip---border-radius-rounded, 16px);
			border-start-end-radius: 0;
			border-end-start-radius: 0;
			border-end-end-radius: var(--origam-chip---border-radius-rounded, 16px);
		}

		&--rounded-shaped-invert {
			border-start-start-radius: 0;
			border-start-end-radius: var(--origam-chip---border-radius-rounded, 16px);
			border-end-start-radius: var(--origam-chip---border-radius-rounded, 16px);
			border-end-end-radius: 0;
		}

		&--border {
			border-width: var(--origam-chip---border-width-outlined, thin);
		}

		&--link {
			cursor: pointer;
		}

		&--link,
		&--filter {
			user-select: none;
		}
	}
</style>

<!--
	Lot migration — `<style>:root{}` block removed.
	The component now consumes the generated tokens from
	`tokens/component/chip.json` (loaded once via the
	consumer's token CSS pipeline).

	Hardcoded values (border-radius, font-sizes, paddings, opacities,
	transitions) are replaced by CSS vars with safe fallbacks.
	Calc-based values that depend on the runtime (density modifier) remain
	as local custom property assignments in the scoped block above.
-->
<style
		lang="scss"
		scoped
>
	.origam-chip {
		// Calc-based density defaults — cannot live in the token JSON because
		// they reference the resolved density value at the component-instance level.
		--origam-chip---density: 0px;
	}
</style>
