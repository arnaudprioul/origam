<template>
	<Story
			group="components"
			title="Messages/OrigamMessages"
	>

		<!-- ════════════ DEFAULT (single message) ════════════ -->
		<Variant title="Default">
			<origam-messages
					:messages="['This field is required.']"
					data-cy="messages-default"
			/>
		</Variant>

		<!-- ════════════ MULTIPLE MESSAGES ════════════ -->
		<Variant title="Multiple">
			<origam-messages
					:messages="['Too short.', 'Must contain a number.']"
					data-cy="messages-multiple"
			/>
		</Variant>

		<!-- ════════════ ACTIVE (transition) ════════════ -->
		<Variant
				title="Active"
				:init-state="() => useStoryInitState<{ active: boolean }>({ active: false })"
		>
			<template #default="{ state }">
				<origam-messages
						:active="state.active"
						:messages="['Active = ' + state.active]"
						data-cy="messages-active"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.active" title="active"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<{ color?: string }>({ color: 'danger' })"
		>
			<template #default="{ state }">
				<origam-messages
						:color="state.color"
						:messages="['Invalid value.']"
						data-cy="messages-color"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color" title="color" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-messages
						:density="state.density"
						:messages="['Density message']"
						data-cy="messages-density"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: default (custom render) ════════════ -->
		<Variant title="Slot — default">
			<origam-messages
					:messages="['Custom rendered message']"
					data-cy="messages-slot-default"
			>
				<template #default="{ message }">
					<span class="custom-message" data-cy="messages-slot-custom">{{ message }}</span>
				</template>
			</origam-messages>
		</Variant>

		<!-- ════════════ DYNAMIC (add/remove messages) ════════════ -->
		<Variant title="Dynamic">
			<div class="story-shell" data-cy="messages-dynamic-shell">
				<origam-messages
						active
						:messages="dynamicMessages"
						data-cy="messages-dynamic"
				/>
				<div style="display:flex; gap: 8px;">
					<origam-btn size="small" text="Add" data-cy="messages-dynamic-add" @click="addMessage"/>
					<origam-btn size="small" text="Clear" data-cy="messages-dynamic-clear" @click="dynamicMessages = []"/>
				</div>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IMessagesProps>({
					messages: ['Hint message.'],
					active: true,
					color: undefined,
					density: DENSITY.DEFAULT,
				})"
		>
			<template #default="{ state }">
				<origam-messages v-bind="state" data-cy="messages-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.messages"  title="messages (first)"/>
				<HstCheckbox v-model="state.active"    title="active"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamBtn, OrigamMessages } from '@origam/components'
	import { DENSITY } from '@origam/enums'
	import type { IDensityProps, IMessagesProps } from '@origam/interfaces'

	import { densityList, intentList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const dynamicMessages = ref<Array<string>>(['First message'])
	let counter = 1

	const addMessage = () => {
		counter++
		dynamicMessages.value.push(`Message ${counter}`)
	}
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.custom-message { color: var(--origam-color-feedback-danger-fg, #b00020); font-weight: 600; }
</style>

<docs lang="md" src="@docs/components/Messages/OrigamMessages.md"/>
