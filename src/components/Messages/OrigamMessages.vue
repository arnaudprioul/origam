<template>
	<origam-transition
			:disabled="!isBooted"
			:transition="transition"
	>
		<component
				:is="tag"
				:class="messagesClasses"
				:style="messagesStyles"
				aria-live="polite"
				role="alert"
		>
			<template
					v-for="(message, index) in messages"
					:key="`${index}-${messages}`"
			>
				<div
						:id="`${index}-${toKebabCase(message)}`"
						class="origam-messages__message"
				>
					<slot
							name="default"
							v-bind="{message}"
					>
						<span>{{ message }}</span>
					</slot>
				</div>
			</template>
		</component>
	</origam-transition>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useAttrs, useSlots } from 'vue'
	import { OrigamSlideY, OrigamTransition } from '../../components'

	import {
		useBorder,
		useDefaults,
		useDensity,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSsrBoot,
		useTextColor
	} from '../../composables'

	import { DENSITY } from '../../enums'

	import type { IMessagesEmits, IMessagesProps, IMessagesSlots } from '../../interfaces'
	import type { TTransitionProps } from "../../types"

	import { toKebabCase, wrapInArray } from '../../utils'

	const _props = withDefaults(defineProps<IMessagesProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT,
		transition: () => ({component: OrigamSlideY}) as unknown as TTransitionProps
	})
	const props = useDefaults(_props)

	const emits = defineEmits<IMessagesEmits>()

	defineSlots<IMessagesSlots>()
	const slots = useSlots()

	const attrs = useAttrs()

	const {filterProps} = useProps<IMessagesProps>(props)

	const messages = computed(() => {
		return wrapInArray(props.messages)
	})

	const {textColorStyles} = useTextColor(toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)

	const {isBooted} = useSsrBoot()

	// CLASS & STYLES

	const messagesStyles = computed(() => {
		return [
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			textColorStyles.value,
			props.style
		] as StyleValue
	})
	const messagesClasses = computed(() => {
		return [
			'origam-messages',
			densityClasses.value,
			roundedClasses.value,
			borderClasses.value,
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

<style lang="scss" scoped>
	.origam-messages {
		color: var(--origam-messages---color, currentColor);
		padding: var(--origam-messages---density, 0);
		flex: var(--origam-messages---flex, 1 1 auto);
		font-size: var(--origam-messages---font-size, 12px);
		min-height: var(--origam-messages---min-height, 14px);
		min-width: var(--origam-messages---min-width, 1px);
		opacity: var(--origam-messages---opacity, 0.87);
		position: var(--origam-messages---position, relative);

		&__message {
			line-height: var(--origam-messages__message---line-height, 12px);
			word-break: var(--origam-messages__message---word-break, break-word);
			overflow-wrap: var(--origam-messages__message---overflow-wrap, break-word);
			word-wrap: break-word;
			-webkit-hyphens: auto;
			hyphens: auto;
			transition-duration: var(--origam-messages__message---transition-duration, .15s);
		}
	}
</style>
