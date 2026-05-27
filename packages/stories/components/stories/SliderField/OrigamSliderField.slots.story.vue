<template>
	<Story
			group="components"
			title="SliderField/OrigamSliderField — Slots"
	>
		<Variant title="Slot — append">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-slider-field>
		</Variant>

		<Variant title="Slot — default">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume">
				<span>Custom slot content</span>
			</origam-slider-field>
		</Variant>

		<Variant title="Slot — details">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume">
				<template #details>
					<span>Custom details area</span>
				</template>
			</origam-slider-field>
		</Variant>

		<Variant title="Slot — label">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume">
				<template #label>
					<span>Custom label</span>
				</template>
			</origam-slider-field>
		</Variant>

		<Variant title="Slot — message">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume" :error-messages="['Error message']">
				<template #message="{ message }">
					<span>{{ message }}</span>
				</template>
			</origam-slider-field>
		</Variant>

		<Variant title="Slot — messages">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume" :error-messages="['Error one', 'Error two']">
				<template #messages>
					<span>Custom messages area</span>
				</template>
			</origam-slider-field>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-slider-field v-model="model" :min="0" :max="100" label="Volume">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-slider-field>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamIcon, OrigamSliderField } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'

	const model = ref(50)
</script>
