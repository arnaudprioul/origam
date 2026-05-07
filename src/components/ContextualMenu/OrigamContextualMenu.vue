<template>
	<origam-menu
			ref="origamMenuRef"
			v-model:model-value="modelValue"
			:class="contextualMenuClasses"
			:open-on-click="false"
			:style="contextualMenuStyles"
			activator="cursor"
			open-on-context-menu
			target="cursor"
			v-bind="menuProps"
	>
		<!--
			Forward every consumer slot to the underlying `<origam-menu>`.
			Pre-fix the wrapper was self-closing, so a consumer that wrote
			`<origam-contextual-menu><template #default>…</template></…>`
			had its content silently dropped — `OrigamMenu`'s default slot
			fell back to its own `<origam-list>` rendering of `:items`. Same
			for `#activator`, which the consumer might use to scope the
			right-click trigger to a specific zone instead of the whole
			body (the `activator="cursor"` default resolves to `<body>`).
		-->
		<template
				v-for="(_, name) in $slots"
				#[name]="slotProps"
		>
			<slot
					:name="name"
					v-bind="slotProps || {}"
			/>
		</template>
	</origam-menu>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamMenu, OrigamTranslateScale } from "../../components"
	import { useProps, useVModel } from "../../composables"
	import { INLINE, LOCATION_STRATEGIES, SCROLL_STRATEGIES } from "../../enums"
	import type { IContextualMenuProps } from "../../interfaces"
	import type { TOrigamMenu, TTransitionProps } from "../../types"
	import { forwardRefs } from "../../utils"

	import { computed, ref, StyleValue } from "vue"

	/*********************************************************
	 * Global
	 *
	 * @description
	 * Props, composables and top-level refs.
	 ********************************************************/

	const props = withDefaults(defineProps<IContextualMenuProps>(), {
		target: 'cursor',
		openOnClick: false,
		openOnContextMenu: true,
		activator: 'cursor',
		closeDelay: 250,
		closeOnContentClick: true,
		locationStrategy: LOCATION_STRATEGIES.CONNECTED,
		openDelay: 300,
		scrim: false,
		location: INLINE.RIGHT,
		scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
		offset: 8,
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<IContextualMenuProps>(props)

	const modelValue = useVModel(props, 'modelValue', false)

	const origamMenuRef = ref<TOrigamMenu>()

	/*********************************************************
	 * Props forwarding
	 *
	 * @description
	 * Filtered props passed down to the inner menu component.
	 ********************************************************/

	const menuProps = computed(() => {
		return origamMenuRef.value?.filterProps(props, ['class', 'id', 'style', 'modelValue', 'activator', 'target', 'openOnClick', 'openOnContextualMenu'])
	})

	/*********************************************************
	 * Class & Style
	 *
	 * @description
	 * Root element classes and inline styles.
	 ********************************************************/

	const contextualMenuStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const contextualMenuClasses = computed(() => {
		return [
			'origam-contextual-menu',
			props.class
		]
	})

	/*********************************************************
	 * Expose
	 *
	 * @description
	 * Public API surface exposed to parent components.
	 ********************************************************/

	defineExpose(forwardRefs({filterProps}, origamMenuRef))

</script>

<style
		lang="scss"
		scoped
>

</style>
