<template>
	<dt
			:class="dataTitleClasses"
			:style="dataTitleStyles"
	>
    <span
		    v-if="hasPrepend"
		    key="prepend"
		    class="origam-data-title__prepend"
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
				class="origam-data-title__content"
				data-no-activator=""
		>
      <slot
		      name="default"
		      v-bind="{text}"
      >
        {{ text }}
      </slot>
    </span>

		<span
				v-if="hasAppend"
				key="append"
				class="origam-data-title__append"
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
	</dt>
</template>

<script
		lang="ts"
		setup
>

	import { OrigamAvatar, OrigamIcon } from "../../components"
	import { useAdjacent, useBothColor, useDensity, useMargin, usePadding, useProps } from "../../composables"

	import type { IDataTitleProps } from "../../interfaces"
	import { computed, shallowRef, StyleValue, toRef } from "vue"

	const props = withDefaults(defineProps<IDataTitleProps>(), {})

	const {filterProps} = useProps<IDataTitleProps>(props)

	const {densityClasses} = useDensity(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isHover = shallowRef(false)

	// `||` (not `??`) to fall back through the Vue-coerced `false` value
	// that an unset TColor prop ends up with — `??` only catches null /
	// undefined and would leak `false` downstream, where `useColor`
	// silently no-ops on falsy backgrounds.
	const hoverColor = computed(() => {
		return props.hoverColor || props.color
	})
	const color = computed(() => {
		return isHover.value ? hoverColor.value : props.color
	})
	const hoverBgColor = computed(() => {
		return props.hoverBgColor || props.color
	})
	const bgColor = computed(() => {
		return isHover.value ? hoverBgColor.value : props.bgColor
	})

	// Phase 3 (Vague D) — class-first companion alongside inline styles.
	const {colorClasses, colorStyles} = useBothColor(bgColor, color)

	// CLASS & STYLES

	const dataTitleStyles = computed(() => {
		return [
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			props.style
		] as StyleValue
	})
	const dataTitleClasses = computed(() => {
		return [
			'origam-data-title',
			colorClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
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

</style>
