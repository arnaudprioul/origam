<template>
	<dl
			:class="dataListClasses"
			:style="dataListStyles"
	>
		<template v-if="slots.default || hasItems">
			<slot
					name="default"
					v-bind="{items}"
			>
				<template
						v-for="(item, index) in items"
						:key="index"
				>
					<slot
							:name="`item-${index}`"
							v-bind="{item, index}"
					>
						<slot
								name="item"
								v-bind="{item, index}"
						>
							<template v-if="item.title">
								<origam-data-title
										:append-avatar="appendAvatar"
										:append-icon="appendIcon"
										:density="density"
										:prepend-avatar="prependAvatar"
										:prepend-icon="prependIcon"
										class="origam-data-list__title"
										v-bind="{...item.title}"
								>
									<template
											v-if="slots['item.title.append'] || slots[`item-${index}.title.append`]"
											#append
									>
										<slot :name="`item-${index}.title.append`">
											<slot name="item.title.append"/>
										</slot>
									</template>

									<template
											v-if="slots['item.title'] || slots[`item-${index}.title`]"
											#default="props"
									>
										<slot
												:name="`item-${index}.title`"
												v-bind="props"
										>
											<slot
													name="item.title"
													v-bind="props"
											/>
										</slot>
									</template>

									<template
											v-if="slots['item.title.prepend'] || slots[`item-${index}.title.prepend`]"
											#prepend
									>
										<slot :name="`item-${index}.title.prepend`">
											<slot name="item.title.prepend"/>
										</slot>
									</template>
								</origam-data-title>
							</template>

							<template v-if="item.text">
								<template
										v-for="(data, i) in item.text"
										:key="i"
								>
									<origam-data-text
											:id="`${i}-data-text`"
											:density="density"
											class="origam-data-list__text"
											v-bind="{...data}"
									>
										<template
												v-if="slots['item.text.append'] || slots[`item-${index}.text.append`]"
												#append
										>
											<slot :name="`item-${index}.text.append`">
												<slot name="item.text.append"/>
											</slot>
										</template>

										<template #default>
											<slot :name="`item-${index}.text`">
												<slot name="item.text"/>
											</slot>
										</template>

										<template
												v-if="slots['item.text.prepend'] || slots[`item-${index}.text.prepend`]"
												#prepend
										>
											<slot :name="`item-${index}.text.prepend`">
												<slot name="item.text.prepend"/>
											</slot>
										</template>
									</origam-data-text>
								</template>
							</template>
						</slot>
					</slot>
				</template>
			</slot>
		</template>
	</dl>
</template>

<script
		lang="ts"
		setup
>
	import { computed, StyleValue, toRef, useSlots } from "vue"
	import { OrigamDataText, OrigamDataTitle } from "../../components"

	import {
		useBorder,
		useBothColor,
		useDensity,
		useElevation,
		useLoader,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from "../../composables"
	import type { IDataListProps } from "../../interfaces"

	import { isEmpty } from "../../utils"

	const props = withDefaults(defineProps<IDataListProps>(), {})

	const {filterProps} = useProps<IDataListProps>(props)

	const slots = useSlots()

	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {loaderClasses} = useLoader(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)

	const hasItems = computed(() => {
		return !isEmpty(props.items)
	})

	const {colorStyles} = useBothColor(toRef(props.bgColor), toRef(props.color))

	// CLASS & STYLES

	const dataListStyles = computed(() => {
		return [
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			colorStyles.value,
			roundedStyles.value,
			props.style
		] as StyleValue
	})
	const dataListClasses = computed(() => {
		return [
			'origam-data-list',
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			loaderClasses.value,
			roundedClasses.value,
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
	.origam-data-list {
		display: var(--origam-data-list---display, block);
		overflow: var(--origam-data-list---overflow, hidden);
		background-color: var(--origam-data-list---background-color, transparent);
		color: var(--origam-data-list---color, inherit);
		border-radius: var(--origam-data-list---border-radius, 0);
		padding: var(--origam-data-list---padding, 0);
		gap: var(--origam-data-list---gap, 0);

		&__title {
			font-size: var(--origam-data-list__title---font-size, 0.75rem);
			font-weight: var(--origam-data-list__title---font-weight, 500);
			color: var(--origam-data-list__title---color, inherit);
			line-height: var(--origam-data-list__title---line-height, 1.5);
			letter-spacing: var(--origam-data-list__title---letter-spacing, 0.009375em);
		}

		&__text {
			font-size: var(--origam-data-list__text---font-size, 0.875rem);
			color: var(--origam-data-list__text---color, inherit);
			line-height: var(--origam-data-list__text---line-height, 1.5);
			letter-spacing: var(--origam-data-list__text---letter-spacing, 0em);
		}
	}
</style>
