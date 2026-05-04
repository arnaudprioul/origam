<template>
	<origam-overlay
			:id="id"
			ref="origamOverlayRef"
			v-model="isActive"
			:activator="activator"
			:activator-props="activatorProps"
			:class="menuClasses"
			:open-on-click="openOnClick"
			:open-on-context-menu="openOnContextMenu"
			:style="menuStyles"
			:target="target"
			absolute
			role="menu"
			v-bind="{...overlayProps, ...scopeId}"
			@keydown="handleKeydown"
			@click:outside="handleClickOutside"
	>
		<template #activator="{props}">
			<slot
					name="activator"
					v-bind="{props}"
			/>
		</template>

		<template #default>
			<!--
				Wrap slot content in a `.origam-menu__content` BEM child so
				the visual surface (background, border-radius, box-shadow,
				max-height, …) lives on the popup BODY, not on the overlay
				ROOT. Pre-fix the visual rules were attached to
				`.origam-menu` which is bound on the overlay root — same
				element the overlay scoped SCSS positions
				`position: absolute; inset: 0`. The result was a white
				rectangle (with menu's box-shadow) covering the entire
				teleport target whenever the menu opened, masking
				everything below. Same family of bug as the Tooltip
				wrapper-bg fix.
			-->
			<div class="origam-menu__content">
				<slot name="default">
					<origam-list class="origam-menu__list">
						<origam-list-subheader
								v-if="title"
								class="origam-menu__title"
						>{{ title }}
						</origam-list-subheader>
						<origam-list-group class="origam-menu__items">
							<template
									v-for="(item, index) in items"
									:key="index"
							>
								<origam-list-item
										v-if="!hasChilds(item)"
										class="origam-menu__item"
										v-bind="item"
								/>
								<origam-menu
										v-else
										:offset="[8,8]"
										:open-on-context-menu="false"
										open-on-click
										v-bind="{...item, ...overlayProps}"
								>
									<template #activator="{props}">
										<origam-list-item
												:append-icon="MDI_ICONS.CHEVRON_RIGHT"
												class="origam-menu__item"
												v-bind="{...props, ...item}"
										/>
									</template>
								</origam-menu>
							</template>
						</origam-list-group>
					</origam-list>
				</slot>
			</div>
		</template>
	</origam-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, mergeProps, nextTick, provide, ref, shallowRef, StyleValue, watch } from 'vue'
	import {
		OrigamList,
		OrigamListGroup,
		OrigamListItem,
		OrigamListSubheader,
		OrigamOverlay,
		OrigamTranslateScale
	} from '../../components'

	import { useProps, useScopeId, useVModel } from '../../composables'

	import { ORIGAM_MENU_KEY } from '../../consts'

	import { INLINE, KEYBOARD_VALUES, LOCATION_STRATEGIES, MDI_ICONS, SCROLL_STRATEGIES } from '../../enums'

	import type { IItemProps, IMenuProps } from '../../interfaces'

	import type { TOrigamOverlay, TTransitionProps } from '../../types'

	import { focusableChildren, focusChild, forwardRefs, getNextElement, getUid } from '../../utils'

	const props = withDefaults(defineProps<IMenuProps>(), {
		closeDelay: 250,
		closeOnContentClick: true,
		locationStrategy: LOCATION_STRATEGIES.CONNECTED,
		openDelay: 300,
		scrim: false,
		openOnClick: true,
		location: INLINE.RIGHT,
		scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
		offset: 8,
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps
	})

	defineEmits(['update:modelValue', 'contextmenu'])

	const {filterProps} = useProps<IMenuProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()

	const uid = getUid()
	const id = computed(() => props.id || `origam-menu--${uid}`)

	const origamOverlayRef = ref<TOrigamOverlay>()

	const parent = inject(ORIGAM_MENU_KEY, null)
	const openChildren = shallowRef(0)

	provide(ORIGAM_MENU_KEY, {
		register () {
			++openChildren.value
		},
		unregister () {
			--openChildren.value
		},
		closeParents () {
			setTimeout(() => {
				if (!openChildren.value) {
					isActive.value = false
					parent?.closeParents()
				}
			}, 40)
		}
	})

	const handleFocusIn = async (e: FocusEvent) => {
		const before = e.relatedTarget as HTMLElement | null
		const after = e.target as HTMLElement | null

		await nextTick()

		if (
				isActive.value &&
				before !== after &&
				origamOverlayRef.value?.contentEl &&
				// We're the topmost menu
				origamOverlayRef.value?.globalTop &&
				// It isn't the document or the menu body
				![document, origamOverlayRef.value.contentEl].includes(after!) &&
				// It isn't inside the menu body
				!origamOverlayRef.value.contentEl.contains(after)
		) {
			const focusable = focusableChildren(origamOverlayRef.value.contentEl)
			focusable[0]?.focus()
		}
	}

	watch(isActive, (val) => {
		if (val) {
			parent?.register()
			document.addEventListener('focusin', handleFocusIn, {once: true})
		} else {
			parent?.unregister()
			document.removeEventListener('focusin', handleFocusIn)
		}
	})

	const handleClickOutside = () => {
		parent?.closeParents()
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (props.disabled) return

		if (e.key === KEYBOARD_VALUES.TAB) {
			const nextElement = getNextElement(
					focusableChildren(origamOverlayRef.value?.contentEl as Element, false),
					e.shiftKey ? 'prev' : 'next',
					(el: HTMLElement) => el.tabIndex >= 0
			)
			if (!nextElement) {
				isActive.value = false
				origamOverlayRef.value?.activatorEl?.focus()
			}
		}
	}
	const handleActivatorKeydown = (e: KeyboardEvent) => {
		if (props.disabled) return

		const el = origamOverlayRef.value?.contentEl
		const keyDown = [KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP]

		if (el && isActive.value) {
			if (e.key === KEYBOARD_VALUES.DOWN) {
				e.preventDefault()
				focusChild(el, 'next')
			} else if (e.key === KEYBOARD_VALUES.UP) {
				e.preventDefault()
				focusChild(el, 'prev')
			}
		} else if (keyDown.includes(e.key as typeof keyDown[number])) {
			isActive.value = true
			e.preventDefault()
			setTimeout(() => setTimeout(() => handleActivatorKeydown(e)))
		}
	}

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-haspopup': 'menu',
			'aria-expanded': String(isActive.value),
			'aria-owns': id.value,
			onKeydown: handleActivatorKeydown
		}, props.activatorProps)
	})

	const overlayProps = computed(() => {
		return origamOverlayRef.value?.filterProps(props, ['activatorProps', 'id', 'class', 'style', 'role', 'modelValue', 'absolute', 'activator', 'target', 'openOnClick', 'openOnContextMenu'])
	})

	const hasChilds = (item: IItemProps) => {
		return item?.items
	}

	// CLASS & STYLES

	const menuStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const menuClasses = computed(() => {
		return [
			'origam-menu',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({openChildren, filterProps}, origamOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	// `.origam-menu` is bound on the OVERLAY ROOT — the overlay scoped
	// SCSS positions that root `position: absolute; inset: 0` so it
	// spans its teleport target. Keep the root transparent and apply
	// the visual surface (background, shadow, radius, …) on the
	// `__content` BEM child below.
	.origam-menu {
		z-index: var(--origam-menu---z-index, 1000);
		background: transparent;
		box-shadow: none;
	}

	.origam-menu__content {
		background: var(--origam-menu---background, var(--origam-color-surface-raised));
		color: var(--origam-menu---color, var(--origam-color-text-primary));
		border-radius: var(--origam-menu---border-radius, 8px);
		box-shadow: var(--origam-menu---box-shadow);
		max-height: var(--origam-menu---max-height, calc(100vh - 32px));
		// Size to content rather than inheriting the overlay flex layout
		// — without these, the popup body grew to fill its parent.
		display: inline-block;
		width: max-content;

		.origam-menu__list {
			overflow: var(--origam-menu__content---overflow, auto);
			max-width: var(--origam-menu__content---max-width, 320px);
			padding: var(--origam-menu__content---padding, 4px);
		}
	}
</style>
