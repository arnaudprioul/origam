<template>
	<origam-input
			:id="id"
			ref="origamInputRef"
			v-model="model"
			:class="checkboxClasses"
			:focused="isFocused"
			:style="checkboxStyles"
			v-bind="{...rootAttrs, ...inputProps}"
	>
		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot
					name="default"
					v-bind="{id,messagesId,isDisabled,isReadonly,isValid}"
			>
				<origam-checkbox-btn
						:id="id"
						ref="origamCheckboxBtnRef"
						v-model="model"
						:aria-describedby="messagesId"
						:disabled="isDisabled"
						:error="!isValid"
						:readonly="isReadonly"
						v-bind="{ ...checkboxBtnProps, ...controlAttrs }"
						@blur="handleBlur"
						@focus="handleFocus"
						@click:label="handleClickLabel"
				>
					<template
							v-if="slots.default"
							#default
					>
						<slot name="default"/>
					</template>

					<template
							v-if="slots.input"
							#input="{props, icon, textColorStyles, backgroundColorStyles, model}"
					>
						<slot
								name="input"
								v-bind="{props, icon, textColorStyles, backgroundColorStyles, model}"
						/>
					</template>

					<template
							v-if="slots.label"
							#label
					>
						<slot name="label"/>
					</template>
				</origam-checkbox-btn>
			</slot>
		</template>
	</origam-input>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCheckboxBtn, OrigamInput } from '../../components'

	import { useFocus, useProps, useVModel } from '../../composables'

	import { DENSITY } from '../../enums'

	import type { ICheckboxEmits, ICheckboxProps, ICheckboxSlots } from '../../interfaces'

	import type { TOrigamCheckboxBtn, TOrigamInput } from "../../types"

	import { filterInputAttrs, getUid } from '../../utils'

	import { computed, ref, StyleValue, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICheckboxProps>(), {
		density: DENSITY.DEFAULT
	})

	const emits = defineEmits<ICheckboxEmits>()

	defineSlots<ICheckboxSlots>()

	const {filterProps} = useProps<ICheckboxProps>(props)

	const origamInputRef = ref<TOrigamInput>()
	const origamCheckboxBtnRef = ref<TOrigamCheckboxBtn>()

	const model = useVModel(props, 'modelValue')
	const {isFocused, onFocus: handleFocus, onBlur: handleBlur} = useFocus(props)
	const attrs = useAttrs()
	const slots = useSlots()

	const uid = getUid()
	const id = computed(() => {
		return props.id || `checkbox-${uid}`
	})

	const handleClickLabel = (e: MouseEvent) => {
		emits('click:label', e)
	}

	const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return origamInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused'])
	})
	const checkboxBtnProps = computed(() => {
		return origamCheckboxBtnRef.value?.filterProps(props, ['class', 'style', 'modelValue', 'id', 'disabled', 'readonly', 'error'])
	})

	// CLASS & STYLES

	const checkboxStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const checkboxClasses = computed(() => {
		return [
			'origam-checkbox',
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
	.origam-checkbox {
		&.origam-input {
			flex: 0 1 auto;
		}

		.origam-selection-control {
			min-height: calc(56px + 2 * var(--origam-input---density));
		}
	}
</style>

<style>
	:root {

	}
</style>
