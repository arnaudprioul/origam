<template>
	<Story
			group="components"
			title="Snackbar/OrigamSnackbar"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-default-host">
				<origam-btn text="Show snackbar" data-cy="snackbar-default-trigger" @click="defaultOpen = true"/>
				<origam-snackbar v-model="defaultOpen" text="File saved successfully." data-cy="snackbar-default"/>
			</div>
		</Variant>

		<!-- ════════════ LOCATION ════════════ -->
		<Variant
				title="Location"
				:init-state="() => useStoryInitState<{ location: string }>({ location: 'bottom' })"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-location-host">
					<origam-btn
							text="Show snackbar"
							data-cy="snackbar-location-trigger"
							@click="locationOpen = true"
					/>
					<origam-snackbar
							v-model="locationOpen"
							:location="state.location"
							text="Location snackbar."
							data-cy="snackbar-location"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.location"
						title="location"
						:options="[
							{ label: 'bottom', value: 'bottom' },
							{ label: 'top', value: 'top' },
							{ label: 'top right', value: 'top right' },
							{ label: 'bottom right', value: 'bottom right' },
							{ label: 'bottom left', value: 'bottom left' },
							{ label: 'top left', value: 'top left' }
						]"
				/>
			</template>
		</Variant>

		<!-- ════════════ TIMEOUT ════════════ -->
		<Variant
				title="Timeout"
				:init-state="() => useStoryInitState<{ timeout: number }>({ timeout: 3000 })"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-timeout-host">
					<origam-btn text="Show" data-cy="snackbar-timeout-trigger" @click="timeoutOpen = true"/>
					<origam-snackbar
							v-model="timeoutOpen"
							:timeout="state.timeout"
							text="Auto-dismisses."
							data-cy="snackbar-timeout"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.timeout" title="timeout (ms)"/>
			</template>
		</Variant>

		<!-- ════════════ TIMER ════════════ -->
		<Variant title="Timer bar">
			<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-timer-host">
				<origam-btn text="Show with timer" data-cy="snackbar-timer-trigger" @click="timerOpen = true"/>
				<origam-snackbar v-model="timerOpen" timer text="Watch the countdown bar." data-cy="snackbar-timer"/>
			</div>
		</Variant>

		<!-- ════════════ MULTI-LINE ════════════ -->
		<Variant title="Multi-line">
			<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-multiline-host">
				<origam-btn text="Show multi-line" data-cy="snackbar-multiline-trigger" @click="multilineOpen = true"/>
				<origam-snackbar
						v-model="multilineOpen"
						multi-line
						text="This is a longer snackbar message that wraps onto multiple lines for better readability."
						data-cy="snackbar-multiline"
				/>
			</div>
		</Variant>

		<!-- ════════════ STATUS ════════════ -->
		<Variant
				title="Status"
				:init-state="() => useStoryInitState<{ status?: string }>({ status: 'success' })"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-status-host">
					<origam-btn text="Show status" data-cy="snackbar-status-trigger" @click="statusOpen = true"/>
					<origam-snackbar
							v-model="statusOpen"
							:status="state.status as any"
							text="Status message."
							data-cy="snackbar-status"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.status"
						title="status"
						:options="[
							{ label: '(none)', value: undefined },
							{ label: 'success', value: 'success' },
							{ label: 'warning', value: 'warning' },
							{ label: 'danger', value: 'danger' },
							{ label: 'info', value: 'info' }
						]"
				/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: action ════════════ -->
		<Variant title="Slot — action">
			<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-action-host">
				<origam-btn text="Show with action" data-cy="snackbar-action-trigger" @click="actionOpen = true"/>
				<origam-snackbar v-model="actionOpen" text="Item deleted." data-cy="snackbar-action">
					<template #action="{ isActive }">
						<origam-btn
								text="Undo"
								color="primary"
								data-cy="snackbar-action-btn"
								@click="isActive.value = false"
						/>
					</template>
				</origam-snackbar>
			</div>
		</Variant>

		<!-- ════════════ SLOT: text ════════════ -->
		<Variant title="Slot — text">
			<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-text-host">
				<origam-btn text="Show custom text" data-cy="snackbar-text-trigger" @click="textSlotOpen = true"/>
				<origam-snackbar v-model="textSlotOpen" data-cy="snackbar-text-slot">
					<template #text>
						<strong>Custom</strong> text slot content.
					</template>
				</origam-snackbar>
			</div>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-emit-host">
				<origam-btn text="Show snackbar (watch Events)" data-cy="snackbar-emit-trigger" @click="emitOpen = true"/>
				<origam-snackbar
						v-model="emitOpen"
						text="Watch the Events tab."
						data-cy="snackbar-emit"
						@update:model-value="logEvent('update:modelValue', $event)"
				/>
				<span data-cy="snackbar-emit-state">open={{ emitOpen }}</span>
			</div>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<ISnackbarProps>({
					text: 'Snackbar message',
					timeout: 5000,
					multiLine: false,
					vertical: false,
					timer: false
				})"
		>
			<template #default="{ state }">
				<div style="padding: 16px; position: relative; min-height: 120px;" data-cy="snackbar-playground-host">
					<origam-btn text="Show" data-cy="snackbar-playground-trigger" @click="playgroundOpen = true"/>
					<origam-snackbar v-model="playgroundOpen" v-bind="state" data-cy="snackbar-playground"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"      title="text"/>
				<HstNumber   v-model="state.timeout"   title="timeout (ms)"/>
				<HstCheckbox v-model="state.multiLine" title="multiLine"/>
				<HstCheckbox v-model="state.vertical"  title="vertical"/>
				<HstCheckbox v-model="state.timer"     title="timer"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamBtn, OrigamSnackbar } from '@origam/components'
	import type { ISnackbarProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'

	const defaultOpen = ref(false)
	const locationOpen = ref(false)
	const timeoutOpen = ref(false)
	const timerOpen = ref(false)
	const multilineOpen = ref(false)
	const statusOpen = ref(false)
	const actionOpen = ref(false)
	const textSlotOpen = ref(false)
	const emitOpen = ref(false)
	const playgroundOpen = ref(false)
</script>

<docs lang="md" src="@docs/components/Snackbar/OrigamSnackbar.md"/>
