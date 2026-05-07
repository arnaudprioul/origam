<template>
	<origam-overlay
			ref="origamOverlayRef"
			v-model="isActive"
			:activator-props="activatorProps"
			:class="dialogClasses"
			:style="dialogStyles"
			v-bind="{...overlayProps, ...scopeId}"
	>
		<!--
			Always forward the activator slot to OrigamOverlay regardless
			of whether the consumer provided one — the inner `<slot>` is a
			no-op when empty. Pre-fix the wrapping template was guarded by
			`v-if="slots.activator"` which (in some Vue 3 slot-resolution
			paths) caused OrigamOverlay to receive an EMPTY activator slot,
			so the merged activator-props (`onClick`, `ref`, …) never
			reached the consumer's button. The dialog never opened on
			click — clicking the activator only fired OrigamBtn's local
			`handleClick`, never `useActivator.handleClick` which is what
			toggles `isActive`. Removing the guard fixes the v-model flow
			while keeping the no-activator case a clean no-op.
		-->
		<template #activator="{props}">
			<slot
					name="activator"
					v-bind="{props}"
			/>
		</template>

		<template #default="{isActive}">
			<slot
					name="default"
					v-bind="{isActive}"
			>
				<!--
					Apply `role="dialog"` + `aria-modal="true"` here on the
					actual dialog body (the card), not on `<origam-overlay>`.
					Pre-fix the dialog template passed these attrs to the
					overlay component which has multiple template roots
					(activator slot + teleport) — Vue couldn't auto-inherit
					them and warned `Extraneous non-props attributes
					(aria-modal, role) were passed to component but could
					not be automatically inherited because component renders
					fragment or text or teleport root nodes`. Moving them
					to `<origam-card>` (single root) silences the warning
					and gives screen readers the correct landmark.
				-->
				<origam-card
						ref="origamCardRef"
						aria-modal="true"
						role="dialog"
						v-bind="cardProps"
				>
					<template
							v-if="slots.loader"
							#loader
					>
						<slot name="loader"/>
					</template>

					<template
							v-if="slots.header"
							#header
					>
						<slot name="header"/>
					</template>

					<template #header-append>
						<slot name="header-append">
							<origam-btn
									:icon="MDI_ICONS.CLOSE"
									:rounded="0"
									bg-color="transparent"
									@click="handleClose"
							/>
						</slot>
					</template>

					<template
							v-if="hasPrepend"
							#header-prepend
					>
						<slot name="header-prepend">
							<origam-icon
									v-if="hasIcon"
									key="prepend-icon"
									:icon="icon"
									:size="28"
							/>
						</slot>
					</template>

					<template
							v-if="slots['header-title']"
							#header-title
					>
						<slot name="header-title"/>
					</template>

					<template
							v-if="slots['header-subtitle']"
							#header-subtitle
					>
						<slot name="header-subtitle"/>
					</template>

					<template
							v-if="slots['header-content']"
							#header-content
					>
						<slot name="header-content"/>
					</template>

					<template
							v-if="slots.asset"
							#asset
					>
						<slot name="asset"/>
					</template>

					<template
							v-if="slots.text"
							#text
					>
						<slot name="text"/>
					</template>

					<template #default>
						<slot name="content"/>
						<div
								ref="endText"
								v-intersect="handleIntersect"
						></div>
					</template>

					<template
							v-if="slots.footer"
							#footer
					>
						<slot name="footer"/>
					</template>
				</origam-card>
			</slot>
		</template>
	</origam-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { computed, mergeProps, nextTick, ref, StyleValue, useSlots, watch } from 'vue'
	import { OrigamBtn, OrigamCard, OrigamIcon, OrigamOverlay, OrigamTranslateScale } from '../../components'
	import { useProps, useScopeId, useSize, useStatus, useVModel } from '../../composables'
	import { IN_BROWSER } from '../../consts'
	import { vIntersect } from '../../directives'
	import { MDI_ICONS } from '../../enums'
	import type { IDialogProps } from '../../interfaces'
	import type { TOrigamCard, TOrigamOverlay, TTransitionProps } from '../../types'
	import { focusableChildren, forwardRefs } from '../../utils'

	const props = withDefaults(defineProps<IDialogProps>(), {
		retainFocus: true,
		origin: 'center center',
		scrollStrategy: 'block',
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps,
		zIndex: 2400,
		// Vue 3's Boolean prop coercion turns `undefined` into `false`,
		// so without an explicit default here Dialog's resolved
		// `props.openOnClick` is `false` even though OrigamOverlay's
		// withDefaults declares `true`. The chain `Dialog → Overlay →
		// useActivator.activatorEvents` then drops `onClick` from the
		// activator merge, the consumer's button receives no click
		// handler, and the dialog never opens. Anchoring the default
		// here lines up the resolved prop with the parent's intent.
		openOnClick: true
	})

	const emits = defineEmits(['update:modelValue', 'isRead', 'click:outside'])

	const {filterProps} = useProps<IDialogProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()
	const slots = useSlots()
	const {icon, statusClasses} = useStatus(props)
	const {sizeClasses} = useSize(props, 'origam-dialog')

	const origamOverlayRef = ref<TOrigamOverlay>()
	const origamCardRef = ref<TOrigamCard>()

	const handleFocusin = (e: FocusEvent) => {
		const before = e.relatedTarget as HTMLElement | null
		const after = e.target as HTMLElement | null

		if (
				before !== after &&
				origamOverlayRef.value?.contentEl &&
				// We're the topmost dialog
				origamOverlayRef.value?.globalTop &&
				// It isn't the document or the dialog body
				![document, origamOverlayRef.value.contentEl].includes(after!) &&
				// It isn't inside the dialog body
				!origamOverlayRef.value.contentEl.contains(after)
		) {
			const focusable = focusableChildren(origamOverlayRef.value.contentEl)

			if (!focusable.length) return

			const firstElement = focusable[0]
			const lastElement = focusable[focusable.length - 1]

			if (before === firstElement) {
				lastElement.focus()
			} else {
				firstElement.focus()
			}
		}
	}

	if (IN_BROWSER) {
		watch(() => isActive.value && props.retainFocus, (val) => {
			if (val) {
				document.addEventListener('focusin', handleFocusin)
			} else {
				document.removeEventListener('focusin', handleFocusin)
			}
		}, {immediate: true})
	}

	watch(isActive, async (val) => {
		await nextTick()
		if (val) {
			origamOverlayRef.value!.contentEl?.focus({preventScroll: true})
		} else {
			origamOverlayRef.value!.activatorEl?.focus({preventScroll: true})
		}
	})

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-haspopup': 'dialog',
			'aria-expanded': String(isActive.value)
		}, props.activatorProps)
	})
	const overlayProps = computed(() => {
		return origamOverlayRef.value?.filterProps(props, ['activatorProps', 'class', 'style', 'modelValue'])
	})
	const cardProps = computed(() => {
		return origamCardRef.value?.filterProps(props)
	})

	const handleClose = () => {
		isActive.value = false
	}
	const handleIntersect = (_isIntersecting: boolean, entries: Array<IntersectionObserverEntry>) => {
		if (entries[entries.length - 1].isIntersecting) {
			emits('isRead', true)
		}
	}

	const hasPrepend = computed(() => {
		return !!(slots['header-prepend'] || icon.value)
	})
	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
	})

	// CLASSES & STYLES

	const dialogStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const dialogClasses = computed(() => {
		return [
			'origam-dialog',
			{
				'origam-dialog--fullscreen': props.fullscreen,
				'origam-dialog--scrollable': props.scrollable
			},
			sizeClasses.value,
			statusClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, origamOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-dialog {
		$this: &;

		align-items: center;
		justify-content: center;
		margin: auto;

		&--size-x-small  { --origam-dialog---width: var(--origam-dialog---width-xs, 320px); }
		&--size-small    { --origam-dialog---width: var(--origam-dialog---width-sm, 400px); }
		&--size-default  { --origam-dialog---width: var(--origam-dialog---width-md, 720px); }
		&--size-large    { --origam-dialog---width: var(--origam-dialog---width-lg, 960px); }
		&--size-x-large  { --origam-dialog---width: var(--origam-dialog---width-xl, 1080px); }

		> :deep(.origam-overlay__content) {
			// Mobile-safety clamps use VIEWPORT units (vw/vh) instead of `%`
			// so the dialog respects its declared size even when it teleports
			// into a constrained parent (Histoire iframe sandbox, portaled
			// container that hasn't reached body root, …). The
			// `calc(100vw - 48px)` math still leaves a 24-px gutter on each
			// side for narrow screens, but a 1080-px xl dialog rendered on a
			// 1600-px viewport no longer clamps to "100% of the iframe
			// parent" (which was 720 px in the Histoire sandbox).
			max-height: var(--origam-dialog---max-height, calc(100vh - 48px));
			width: min(var(--origam-dialog---width, auto), calc(100vw - 48px));
			max-width: var(--origam-dialog---max-width, calc(100vw - 48px));
			margin: 24px;
			border-radius: var(--origam-dialog---border-radius, 12px);
			box-shadow: var(--origam-dialog---box-shadow);

			&,
			> form {
				> .origam-card {
					display: flex;
					flex: 1 1 100%;
					flex-direction: column;
					max-height: 100%;
					max-width: 100%;
					overflow: hidden;

					.origam-card__content {
						display: flex;
						flex: 1 1 100%;
						flex-direction: column;
						max-height: 100%;
						max-width: 100%;
						overflow: auto;
					}
				}
			}
		}

		&--fullscreen {
			--origam-dialog---width: 100vw;
			--origam-dialog---max-width: 100vw;
			--origam-dialog---max-height: 100vh;
			--origam-dialog---border-radius: 0;

			> :deep(.origam-overlay__content) {
				border-radius: var(--origam-dialog---border-radius, 0px);
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
				max-width: var(--origam-dialog---max-width, 100%);
				max-height: var(--origam-dialog---max-height, 100%);
				overflow-y: auto;
				top: 0;
				left: 0;

				&,
				> form {
					> .origam-card,
					> .origam-sheet {
						min-height: 100%;
						min-width: 100%;
						border-radius: var(--origam-dialog__fullscreen---border-radius, 0px);
					}
				}
			}
		}
	}
</style>
