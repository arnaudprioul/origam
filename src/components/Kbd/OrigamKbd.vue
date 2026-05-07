<template>
	<kbd
			:class="kbdClasses"
			:style="kbdStyles"
	>
		<template v-if="$slots.default">
			<slot/>
		</template>

		<template v-else-if="props.combination && props.combination.length > 0">
			<template
					v-for="(key, index) in props.combination"
					:key="index"
			>
				<kbd class="origam-kbd__key">{{ key }}</kbd>
				<span
						v-if="index < props.combination.length - 1"
						class="origam-kbd__separator"
						aria-hidden="true"
				>{{ props.separator }}</span>
			</template>
		</template>

		<template v-else>{{ props.text }}</template>
	</kbd>
</template>

<script
		lang="ts"
		setup
>
	import {
		useBorder,
		useBothColor,
		useProps,
		useRounded,
		useSize,
	} from '../../composables'

	import type { IKbdProps } from '../../interfaces'

	import { computed, StyleValue, toRef } from 'vue'

	const _props = withDefaults(defineProps<IKbdProps>(), {
		separator: '+',
		variant: 'outlined',
	})

	const props = _props

	const { filterProps } = useProps<IKbdProps>(props)

	const { sizeClasses, sizeStyles } = useSize(props)
	const { roundedClasses, roundedStyles } = useRounded(props)
	const { borderClasses, borderStyles } = useBorder(props)
	const { colorStyles } = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))

	// CLASSES & STYLES

	const kbdClasses = computed(() => {
		return [
			'origam-kbd',
			{
				[`origam-kbd--variant-${props.variant}`]: props.variant,
				'origam-kbd--combination': props.combination && props.combination.length > 0,
			},
			sizeClasses.value,
			roundedClasses.value,
			borderClasses.value,
			props.class,
		]
	})

	const kbdStyles = computed(() => {
		return [
			sizeStyles.value,
			roundedStyles.value,
			borderStyles.value,
			colorStyles.value,
			props.style,
		] as StyleValue
	})

	// EXPOSE

	defineExpose({ filterProps })
</script>

<style
		lang="scss"
		scoped
>
	// Single-key shape — applied to:
	//   1. The outer `<kbd class="origam-kbd">` when NO combination is in use
	//   2. Each inner `<kbd class="origam-kbd__key">` inside a combination
	// Sharing one mixin keeps the visual identity consistent: a single
	// ⌘ looks the same as one of the keys inside ⌘+S.
	@mixin key-surface {
		display: inline-flex;
		align-items: center;
		justify-content: center;

		font-family: var(--origam-kbd---font-family, JetBrains Mono, Fira Code, monospace);
		font-size: inherit;
		font-weight: var(--origam-kbd---font-weight, 500);
		line-height: 1;
		white-space: nowrap;
		vertical-align: baseline;

		min-width: 1.6em;
		padding-block: var(--origam-kbd---padding-block, 0.2em);
		padding-inline: var(--origam-kbd---padding-inline, 0.5em);

		border-radius: var(--origam-kbd---border-radius, 4px);
		border-width: var(--origam-kbd---border-width, 1px);
		border-style: solid;
		border-color: var(--origam-kbd---border-color, var(--origam-color-border-subtle, #d4d4d4));

		background-color: var(--origam-kbd---background-color, var(--origam-color-surface-raised, #fff));
		color: var(--origam-kbd---color, var(--origam-color-text-primary, #171717));

		// Soft top-highlight + bottom-shadow for the embossed "physical
		// key" feel from the reference design — same trick as the Btn
		// ghost glow but tighter and more keycap-shaped.
		box-shadow: var(
			--origam-kbd---box-shadow,
			0 1px 0 0 color-mix(in srgb, currentColor 12%, transparent),
			inset 0 1px 0 0 color-mix(in srgb, white 50%, transparent)
		);
	}

	.origam-kbd {
		// Single-key default (no `combination` prop) — apply the mixin.
		// When `--combination` modifier is on the wrapper, the outer
		// `<kbd>` is RESET to a transparent shell (see below) and the
		// individual `__key` children carry the visible surface.
		@include key-surface;

		font-size: var(--origam-kbd---font-size, 0.875em);

		gap: var(--origam-kbd---gap, 4px);

		// ── Combination mode: outer <kbd> becomes a transparent
		// inline-flex shell that just spaces the child keys with `gap`.
		// All visible key-cap rendering is delegated to `__key` below.
		&--combination {
			display: inline-flex;
			align-items: center;
			gap: var(--origam-kbd---gap, 4px);

			padding-block: 0;
			padding-inline: 0;
			border-width: 0;
			background-color: transparent;
			box-shadow: none;
			min-width: 0;
		}

		// Inner key surface — same shape as a standalone kbd.
		&__key {
			@include key-surface;
		}

		// ── Variants — applied to the surface (single-key OR each
		// combination key). When `--combination` is on the wrapper the
		// variant modifier still propagates via the `&` selector chain
		// to the inner key.
		&--variant-outlined,
		&--variant-outlined &__key {
			--origam-kbd---background-color: var(--origam-color-surface-raised, #fff);
			--origam-kbd---border-color: var(--origam-color-border-subtle, #d4d4d4);
			--origam-kbd---box-shadow: 0 1px 0 0 color-mix(in srgb, currentColor 12%, transparent),
			                            inset 0 1px 0 0 color-mix(in srgb, white 50%, transparent);
		}

		&--variant-filled,
		&--variant-filled &__key {
			--origam-kbd---background-color: var(--origam-color-surface-overlay, #f5f5f5);
			--origam-kbd---border-color: var(--origam-color-border-subtle, #d4d4d4);
			--origam-kbd---box-shadow: 0 1px 2px 0 color-mix(in srgb, currentColor 18%, transparent),
			                            inset 0 1px 0 0 color-mix(in srgb, white 60%, transparent);
		}

		&--variant-tonal,
		&--variant-tonal &__key {
			--origam-kbd---background-color: color-mix(in srgb, currentColor 8%, transparent);
			--origam-kbd---border-color: transparent;
			--origam-kbd---border-width: 0px;
			--origam-kbd---box-shadow: none;
		}

		// Combination-mode reset overrides (must come AFTER the variant
		// rules so the outer wrapper stays transparent regardless of
		// variant — the inner keys carry the variant surface).
		&--combination#{&}--variant-outlined,
		&--combination#{&}--variant-filled,
		&--combination#{&}--variant-tonal {
			background-color: transparent;
			border-color: transparent;
			border-width: 0;
			box-shadow: none;
		}

		// Size scale — drives `font-size` on the wrapper; everything
		// inside (padding via em, border-radius, key sizing) follows.
		&--size-x-small { font-size: var(--origam-kbd---font-size-xs, 0.625rem); }
		&--size-small   { font-size: var(--origam-kbd---font-size-sm, 0.75rem); }
		&--size-default { font-size: var(--origam-kbd---font-size-md, 0.875rem); }
		&--size-large   { font-size: var(--origam-kbd---font-size-lg, 1rem); }
		&--size-x-large { font-size: var(--origam-kbd---font-size-xl, 1.125rem); }

		// Rounded overrides
		&--rounded         { --origam-kbd---border-radius: var(--origam-radius-sm, 4px); }
		&--rounded-x-small { --origam-kbd---border-radius: var(--origam-radius-xs, 2px); }
		&--rounded-small   { --origam-kbd---border-radius: var(--origam-radius-sm, 4px); }
		&--rounded-default { --origam-kbd---border-radius: var(--origam-radius-md, 8px); }
		&--rounded-medium  { --origam-kbd---border-radius: var(--origam-radius-lg, 12px); }
		&--rounded-large   { --origam-kbd---border-radius: var(--origam-radius-xl, 16px); }
		&--rounded-x-large { --origam-kbd---border-radius: var(--origam-radius-2xl, 24px); }

		// Separator between keys ("+", etc.) — neutral text, NOT a key.
		&__separator {
			color: var(--origam-kbd__separator---color, var(--origam-color-text-secondary, rgba(0, 0, 0, 0.55)));
			font-family: inherit;
			font-size: inherit;
			user-select: none;
		}
	}
</style>
