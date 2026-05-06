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
	.origam-kbd {
		display: inline-flex;
		align-items: center;
		gap: var(--origam-kbd---gap, 4px);

		font-family: var(--origam-kbd---font-family, JetBrains Mono, Fira Code, monospace);
		font-size: var(--origam-kbd---font-size, 0.875em);
		font-weight: var(--origam-kbd---font-weight, 500);
		line-height: 1;
		white-space: nowrap;
		vertical-align: baseline;

		padding-block: var(--origam-kbd---padding-block, 0.125em);
		padding-inline: var(--origam-kbd---padding-inline, 0.4em);

		border-radius: var(--origam-kbd---border-radius, 4px);
		border-width: var(--origam-kbd---border-width, 1px);
		border-style: solid;
		border-color: var(--origam-kbd---border-color, currentColor);

		background-color: var(--origam-kbd---background-color, transparent);
		color: var(--origam-kbd---color, inherit);

		// Default (outlined) variant
		&--variant-outlined {
			--origam-kbd---background-color: var(--origam-kbd--outlined---background-color, transparent);
			--origam-kbd---border-width: var(--origam-kbd--outlined---border-width, 1px);
		}

		// Filled variant — surface background + embossing shadow
		&--variant-filled {
			--origam-kbd---background-color: var(--origam-kbd--filled---background-color, #f5f5f5);
			--origam-kbd---border-width: var(--origam-kbd--filled---border-width, 1px);

			box-shadow: var(--origam-kbd---box-shadow, 0 1px 0 rgba(0, 0, 0, 0.1));
		}

		// Tonal variant — subtle surface, no border
		&--variant-tonal {
			--origam-kbd---background-color: var(--origam-kbd--tonal---background-color, rgba(0, 0, 0, 0.06));
			--origam-kbd---border-width: var(--origam-kbd--tonal---border-width, 0px);
		}

		// Size scale — mirrors font-size rungs from tokens
		&--size-x-small {
			font-size: var(--origam-kbd---font-size-xs, 0.625rem);
		}

		&--size-small {
			font-size: var(--origam-kbd---font-size-sm, 0.75rem);
		}

		&--size-default {
			font-size: var(--origam-kbd---font-size-md, 0.875rem);
		}

		&--size-large {
			font-size: var(--origam-kbd---font-size-lg, 1rem);
		}

		&--size-x-large {
			font-size: var(--origam-kbd---font-size-xl, 1.125rem);
		}

		// Rounded overrides
		&--rounded {
			--origam-kbd---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-x-small {
			--origam-kbd---border-radius: var(--origam-radius-xs, 2px);
		}

		&--rounded-small {
			--origam-kbd---border-radius: var(--origam-radius-sm, 4px);
		}

		&--rounded-default {
			--origam-kbd---border-radius: var(--origam-radius-md, 8px);
		}

		&--rounded-medium {
			--origam-kbd---border-radius: var(--origam-radius-lg, 12px);
		}

		&--rounded-large {
			--origam-kbd---border-radius: var(--origam-radius-xl, 16px);
		}

		&--rounded-x-large {
			--origam-kbd---border-radius: var(--origam-radius-2xl, 24px);
		}

		// Individual key in a combination
		&__key {
			display: inline-block;
			font-family: inherit;
			font-size: inherit;
			font-weight: inherit;
			line-height: 1;
		}

		// Separator between keys ("+", etc.)
		&__separator {
			color: var(--origam-kbd__separator---color, var(--origam-color-text-secondary, rgba(0, 0, 0, 0.55)));
			font-family: inherit;
			font-size: inherit;
			user-select: none;
		}
	}
</style>
