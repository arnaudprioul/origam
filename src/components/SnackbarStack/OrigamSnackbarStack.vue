<template>
	<teleport to="body">
		<component
				:is="tag"
				:id="resolvedDomId"
				ref="rootRef"
				:aria-label="ariaLabel"
				:class="stackClasses"
				:style="stackStyles"
				role="region"
		>
			<transition-group
					:name="transitionName"
					tag="div"
					class="origam-snackbar-stack__items"
			>
				<div
						v-for="item in visibleItems"
						:key="item.id"
						:aria-live="resolveAriaLive(item.intent)"
						:class="itemClassesFor(item)"
						:data-cy="`origam-snackbar-stack-item-${item.id}`"
						aria-atomic="true"
						:role="resolveAriaRole(item.intent)"
				>
					<div class="origam-snackbar-stack__item-content">
						<div
								v-if="resolveIcon(item)"
								class="origam-snackbar-stack__item-prepend"
						>
							<origam-icon
									:icon="resolveIcon(item)!"
									:size="24"
							/>
						</div>

						<div class="origam-snackbar-stack__item-text">
							<div
									v-if="item.title"
									class="origam-snackbar-stack__item-title"
							>
								{{ item.title }}
							</div>
							<div
									v-if="item.message"
									class="origam-snackbar-stack__item-message"
							>
								{{ item.message }}
							</div>
						</div>
					</div>

					<div
							v-if="hasActions(item)"
							class="origam-snackbar-stack__item-actions"
					>
						<button
								v-for="(action, index) in item.actions"
								:key="index"
								:class="actionClassesFor(action)"
								:data-cy="`origam-snackbar-stack-action-${item.id}-${index}`"
								type="button"
								@click="handleActionClick(item, action)"
						>
							{{ action.label }}
						</button>
					</div>

					<button
							v-if="resolveDismissible(item)"
							:aria-label="dismissLabel"
							:data-cy="`origam-snackbar-stack-dismiss-${item.id}`"
							class="origam-snackbar-stack__item-dismiss"
							type="button"
							@click="handleDismissClick(item.id)"
					>
						<origam-icon
								:icon="MDI_ICONS.CLOSE"
								:size="18"
						/>
					</button>
				</div>
			</transition-group>
		</component>
	</teleport>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue } from 'vue'

	import { OrigamIcon } from '../../components'

	import { useProps, useStyle } from '../../composables'
	import { useSnackbarStackInternal } from '../../composables/SnackbarStack/snackbar-stack.composable'

	import {
		SNACKBAR_STACK_DEFAULT_DURATION,
		SNACKBAR_STACK_DEFAULT_ID,
		SNACKBAR_STACK_DEFAULT_MAX,
		SNACKBAR_STACK_DEFAULT_SPACING
	} from '../../consts'

	import { MDI_ICONS } from '../../enums'

	import type {
		ISnackbarStackItem,
		ISnackbarStackItemAction,
		ISnackbarStackProps
	} from '../../interfaces'

	import type { TIcon, TIntent, TSnackbarStackDirection } from '../../types'

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props + filterProps for consumers that re-export the
	 * stack as part of another composite.
	 ********************************************************/
	const props = withDefaults(defineProps<ISnackbarStackProps>(), {
		tag: 'div',
		id: SNACKBAR_STACK_DEFAULT_ID,
		location: 'bottom-right',
		max: SNACKBAR_STACK_DEFAULT_MAX,
		defaultDuration: SNACKBAR_STACK_DEFAULT_DURATION,
		spacing: SNACKBAR_STACK_DEFAULT_SPACING
	})

	const {filterProps} = useProps<ISnackbarStackProps>(props)

	const rootRef = ref<HTMLElement>()

	/*********************************************************
	 * Store wiring
	 *
	 * @description
	 * The component subscribes to the matching stack id via
	 * `useSnackbarStackInternal`. Items are mutated by the
	 * public `useSnackbarStack({ id }).notify / dismiss /
	 * dismissAll` composable — this side only reads them.
	 ********************************************************/
	const {rawItems} = useSnackbarStackInternal(props.id)

	const visibleItems = computed<ReadonlyArray<ISnackbarStackItem>>(() => {
		const items = rawItems.value

		// FIFO trim — visible slice respects the `max` cap. The
		// composable also enforces a max if its `max` option is set,
		// but the component cap is independent: consumers can keep
		// many items in the store while only painting a few.
		const sliced = items.slice(-props.max)

		return effectiveDirection.value === 'bottom-up' ? [...sliced].reverse() : sliced
	})

	/*********************************************************
	 * Direction & ARIA
	 *
	 * @description
	 * `direction` defaults to `top-down` for `top-*` anchors
	 * and `bottom-up` for `bottom-*` anchors so the newest
	 * toast always appears closest to the anchored edge.
	 ********************************************************/
	const effectiveDirection = computed<TSnackbarStackDirection>(() => {
		if (props.direction) return props.direction

		return props.location.startsWith('top') ? 'top-down' : 'bottom-up'
	})

	const ariaLabel = 'Notifications'
	const dismissLabel = 'Dismiss notification'

	const resolveAriaRole = (intent?: TIntent): 'status' | 'alert' => {
		return intent === 'warning' || intent === 'danger' ? 'alert' : 'status'
	}

	const resolveAriaLive = (intent?: TIntent): 'polite' | 'assertive' => {
		return intent === 'warning' || intent === 'danger' ? 'assertive' : 'polite'
	}

	/*********************************************************
	 * Items helpers
	 ********************************************************/
	const INTENT_ICONS: Record<TIntent, TIcon> = {
		primary: MDI_ICONS.INFORMATION,
		secondary: MDI_ICONS.INFORMATION,
		ghost: MDI_ICONS.INFORMATION,
		neutral: MDI_ICONS.INFORMATION,
		success: MDI_ICONS.CHECK_CIRCLE,
		warning: MDI_ICONS.ALERT,
		danger: MDI_ICONS.ALERT_CIRCLE,
		info: MDI_ICONS.INFORMATION
	}

	const resolveIcon = (item: ISnackbarStackItem): TIcon | undefined => {
		if (item.icon) return item.icon
		if (item.intent) return INTENT_ICONS[item.intent]

		return INTENT_ICONS.info
	}

	const resolveDismissible = (item: ISnackbarStackItem): boolean => {
		return item.dismissible !== false
	}

	const hasActions = (item: ISnackbarStackItem): boolean => {
		return Array.isArray(item.actions) && item.actions.length > 0
	}

	/*********************************************************
	 * Event handlers
	 *
	 * @description
	 * `dismiss` is intentionally NOT imported from the public
	 * `useSnackbarStack` here to avoid forming a circular
	 * dependency at module init time. We mutate the raw items
	 * directly through the internal helper.
	 ********************************************************/
	const dismissItem = (itemId: string): void => {
		const index = rawItems.value.findIndex(it => it.id === itemId)

		if (index === -1) return

		const [removed] = rawItems.value.splice(index, 1)

		removed?.onDismiss?.()
	}

	const handleDismissClick = (itemId: string): void => {
		dismissItem(itemId)
	}

	const handleActionClick = (item: ISnackbarStackItem, action: ISnackbarStackItemAction): void => {
		action.handler()

		if (!action.keepOpen) {
			dismissItem(item.id)
		}
	}

	/*********************************************************
	 * Class & Style
	 ********************************************************/
	const transitionName = computed<string>(() => {
		if (props.location.startsWith('top')) return 'origam-snackbar-stack--slide-down'

		return 'origam-snackbar-stack--slide-up'
	})

	const spacingValue = computed<string>(() => {
		if (typeof props.spacing === 'number') return `${props.spacing}px`

		return props.spacing
	})

	const stackStyles = computed<StyleValue>(() => {
		return [
			{
				'--origam-snackbar-stack---gap': spacingValue.value
			},
			props.style
		] as StyleValue
	})

	const stackClasses = computed(() => {
		return [
			'origam-snackbar-stack',
			`origam-snackbar-stack--${props.location}`,
			`origam-snackbar-stack--direction-${effectiveDirection.value}`,
			props.class
		]
	})

	const itemClassesFor = (item: ISnackbarStackItem) => {
		const intent: TIntent = item.intent ?? 'info'

		return [
			'origam-snackbar-stack__item',
			`origam-snackbar-stack__item--intent-${intent}`,
			{
				'origam-snackbar-stack__item--with-actions': hasActions(item),
				'origam-snackbar-stack__item--dismissible': resolveDismissible(item)
			}
		]
	}

	const actionClassesFor = (action: ISnackbarStackItemAction) => {
		const intent: TIntent = action.intent ?? 'primary'

		return [
			'origam-snackbar-stack__item-action',
			`origam-snackbar-stack__item-action--intent-${intent}`
		]
	}

	// The teleport target re-uses the consumer's `id` prop as both the
	// store key AND the DOM id of the rendered region. Doing it once
	// keeps screen-reader announcements addressable from outside.
	const resolvedDomId = computed(() => `origam-snackbar-stack-${props.id}`)

	const {id: styleId, css, load, isLoaded, unload} = useStyle(stackStyles)

	/*********************************************************
	 * Expose
	 ********************************************************/
	defineExpose({
		filterProps,
		visibleItems,
		css,
		id: styleId,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-snackbar-stack {
		$this: &;

		position: fixed;
		z-index: var(--origam-snackbar-stack---z-index, var(--origam-z-index-toast, 1060));
		pointer-events: none;
		max-width: var(--origam-snackbar-stack---max-width, 420px);
		width: max-content;
		display: flex;
		flex-direction: column;

		&__items {
			display: flex;
			flex-direction: column;
			gap: var(--origam-snackbar-stack---gap, 12px);
			width: 100%;
		}

		&--top-left {
			top: var(--origam-snackbar-stack---position-top, 16px);
			left: var(--origam-snackbar-stack---position-left, 16px);
		}

		&--top-right {
			top: var(--origam-snackbar-stack---position-top, 16px);
			right: var(--origam-snackbar-stack---position-right, 16px);
		}

		&--top-center,
		&--top {
			top: var(--origam-snackbar-stack---position-top, 16px);
			left: 50%;
			transform: translateX(-50%);
		}

		&--bottom-left {
			bottom: var(--origam-snackbar-stack---position-bottom, 16px);
			left: var(--origam-snackbar-stack---position-left, 16px);
		}

		&--bottom-right {
			bottom: var(--origam-snackbar-stack---position-bottom, 16px);
			right: var(--origam-snackbar-stack---position-right, 16px);
		}

		&--bottom-center,
		&--bottom {
			bottom: var(--origam-snackbar-stack---position-bottom, 16px);
			left: 50%;
			transform: translateX(-50%);
		}

		&__item {
			pointer-events: auto;
			display: flex;
			align-items: flex-start;
			gap: var(--origam-snackbar-stack__item---gap, 12px);
			min-width: var(--origam-snackbar-stack__item---min-width, 288px);
			max-width: var(--origam-snackbar-stack__item---max-width, 420px);
			padding: var(--origam-snackbar-stack__item---padding, 12px 14px);
			border-radius: var(--origam-snackbar-stack__item---border-radius, 8px);
			border-width: var(--origam-snackbar-stack__item---border-width, 1px);
			border-style: solid;
			background-color: var(--origam-snackbar-stack__item---background-color, var(--origam-color__surface---default, #fff));
			border-color: var(--origam-snackbar-stack__item---border-color, var(--origam-color__border---subtle, rgba(0, 0, 0, 0.12)));
			color: var(--origam-snackbar-stack__item---color, var(--origam-color__text---primary, #1a1a1a));
			box-shadow: var(--origam-snackbar-stack__item---box-shadow, 0 4px 12px rgba(0, 0, 0, 0.12));
			font-size: var(--origam-snackbar-stack__item---font-size, 0.875rem);
			line-height: 1.4;
		}

		&__item-content {
			display: flex;
			align-items: flex-start;
			gap: var(--origam-snackbar-stack__item---content-gap, 10px);
			flex: 1 1 auto;
			min-width: 0;
		}

		&__item-prepend {
			display: flex;
			align-items: center;
			color: var(--origam-snackbar-stack__item---prepend-color, currentColor);
			flex: 0 0 auto;
			line-height: 1;
			padding-top: 1px;
		}

		&__item-text {
			display: flex;
			flex-direction: column;
			gap: var(--origam-snackbar-stack__item---text-gap, 2px);
			flex: 1 1 auto;
			min-width: 0;
		}

		&__item-title {
			font-weight: var(--origam-snackbar-stack__item---title-font-weight, 600);
		}

		&__item-message {
			font-weight: var(--origam-snackbar-stack__item---message-font-weight, 400);
			color: var(--origam-snackbar-stack__item---message-color, currentColor);
			opacity: var(--origam-snackbar-stack__item---message-opacity, 0.85);
		}

		&__item-actions {
			display: flex;
			align-items: center;
			gap: 6px;
			flex: 0 0 auto;
		}

		&__item-action {
			background: transparent;
			border: 0;
			color: var(--origam-snackbar-stack__item---action-color, var(--origam-color__action--primary---fg, #1976d2));
			font: inherit;
			font-weight: 600;
			cursor: pointer;
			padding: 4px 8px;
			border-radius: 4px;

			&:hover {
				background-color: var(--origam-snackbar-stack__item-action--hover---background-color, rgba(0, 0, 0, 0.04));
			}

			&:focus-visible {
				outline: 2px solid currentColor;
				outline-offset: 1px;
			}
		}

		&__item-dismiss {
			background: transparent;
			border: 0;
			color: inherit;
			cursor: pointer;
			padding: 4px;
			margin: -4px -2px -4px 0;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 4px;
			flex: 0 0 auto;

			&:hover {
				background-color: var(--origam-snackbar-stack__item-dismiss--hover---background-color, rgba(0, 0, 0, 0.04));
			}

			&:focus-visible {
				outline: 2px solid currentColor;
				outline-offset: 1px;
			}
		}

		@each $intent in (primary, success, warning, danger, info) {
			&__item--intent-#{$intent} {
				background-color: var(--origam-color__feedback--#{$intent}---bgSubtle, var(--origam-snackbar-stack__item---background-color));
				border-color: var(--origam-color__feedback--#{$intent}---border, var(--origam-snackbar-stack__item---border-color));
				color: var(--origam-color__feedback--#{$intent}---fgSubtle, var(--origam-snackbar-stack__item---color));

				#{$this}__item-prepend {
					color: var(--origam-color__feedback--#{$intent}---border, currentColor);
				}
			}
		}

		&--slide-down-enter-from,
		&--slide-down-leave-to {
			opacity: 0;
			transform: translateY(-12px);
		}

		&--slide-up-enter-from,
		&--slide-up-leave-to {
			opacity: 0;
			transform: translateY(12px);
		}

		&--slide-down-enter-active,
		&--slide-down-leave-active,
		&--slide-up-enter-active,
		&--slide-up-leave-active {
			transition: opacity var(--origam-snackbar-stack---transition-duration, 180ms) ease,
			transform var(--origam-snackbar-stack---transition-duration, 180ms) ease;
		}

		&--slide-down-move,
		&--slide-up-move {
			transition: transform var(--origam-snackbar-stack---transition-duration, 180ms) ease;
		}

		@media (prefers-reduced-motion: reduce) {
			&--slide-down-enter-active,
			&--slide-down-leave-active,
			&--slide-up-enter-active,
			&--slide-up-leave-active {
				transition: opacity 100ms ease;
				transform: none !important;
			}

			&--slide-down-enter-from,
			&--slide-down-leave-to,
			&--slide-up-enter-from,
			&--slide-up-leave-to {
				transform: none;
			}
		}
	}
</style>

<style>
	:root {
		--origam-snackbar-stack---gap: 12px;
		--origam-snackbar-stack---max-width: 420px;
		--origam-snackbar-stack---position-top: 16px;
		--origam-snackbar-stack---position-bottom: 16px;
		--origam-snackbar-stack---position-left: 16px;
		--origam-snackbar-stack---position-right: 16px;
		--origam-snackbar-stack---transition-duration: 180ms;
		--origam-snackbar-stack__item---gap: 12px;
		--origam-snackbar-stack__item---min-width: 288px;
		--origam-snackbar-stack__item---max-width: 420px;
		--origam-snackbar-stack__item---padding: 12px 14px;
		--origam-snackbar-stack__item---border-radius: 8px;
		--origam-snackbar-stack__item---border-width: 1px;
		--origam-snackbar-stack__item---font-size: 0.875rem;
		--origam-snackbar-stack__item---content-gap: 10px;
		--origam-snackbar-stack__item---text-gap: 2px;
		--origam-snackbar-stack__item---title-font-weight: 600;
		--origam-snackbar-stack__item---message-font-weight: 400;
		--origam-snackbar-stack__item---message-opacity: 0.85;
	}
</style>
