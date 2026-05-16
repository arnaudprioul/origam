<template>
	<Story
			group="components"
			title="SnackbarGroup/OrigamSnackbarGroup"
	>
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					location: TSnackbarGroupLocation
					max: number
					defaultDuration: number
					intent: TIntent
					dismissible: boolean
				}>({
					location: 'bottom-right',
					max: 5,
					defaultDuration: 5000,
					intent: 'info',
					dismissible: true
				})"
		>
			<template #default="{ state }">
				<div class="story-shell" data-cy="snackbar-group-playground">
					<div class="story-row">
						<origam-btn
								text="Notify"
								data-cy="snackbar-group-playground-trigger"
								@click="playgroundNotify(state.intent, state.dismissible)"
						/>
						<origam-btn
								text="Dismiss all"
								data-cy="snackbar-group-playground-dismiss-all"
								@click="playgroundDismissAll"
						/>
					</div>

					<origam-snackbar-group
							id="playground"
							:location="state.location"
							:max="state.max"
							:default-duration="state.defaultDuration"
							data-cy="snackbar-group-playground-host"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.location"
						title="location"
						:options="locationOptions"
				/>
				<HstNumber v-model="state.max"             title="max"/>
				<HstNumber v-model="state.defaultDuration" title="defaultDuration (ms)"/>
				<HstSelect
						v-model="state.intent"
						title="intent"
						:options="intentOptions"
				/>
				<HstCheckbox v-model="state.dismissible" title="dismissible"/>
			</template>
		</Variant>

		<Variant title="Prop — location">
			<div class="story-shell" data-cy="snackbar-group-location">
				<div class="story-row">
					<origam-btn
							v-for="loc in SNACKBAR_GROUP_LOCATIONS"
							:key="loc"
							:text="loc"
							:data-cy="`snackbar-group-location-${loc}`"
							@click="spawnInLocation(loc)"
					/>
				</div>
				<origam-snackbar-group
						v-for="loc in SNACKBAR_GROUP_LOCATIONS"
						:key="`stack-${loc}`"
						:id="`location-${loc}`"
						:location="loc"
						:data-cy="`snackbar-group-location-host-${loc}`"
				/>
			</div>
		</Variant>

		<Variant title="Prop — max">
			<div class="story-shell" data-cy="snackbar-group-max">
				<origam-btn
						text="Burst 10 toasts (max=5)"
						data-cy="snackbar-group-max-burst"
						@click="burstMax"
				/>
				<origam-snackbar-group
						id="max-test"
						:max="5"
						location="bottom-right"
						data-cy="snackbar-group-max-host"
				/>
			</div>
		</Variant>

		<Variant title="Prop — intent">
			<div class="story-shell" data-cy="snackbar-group-intent">
				<div class="story-row">
					<origam-btn text="Success" data-cy="snackbar-group-intent-success" @click="spawnIntent('success')"/>
					<origam-btn text="Warning" data-cy="snackbar-group-intent-warning" @click="spawnIntent('warning')"/>
					<origam-btn text="Danger"  data-cy="snackbar-group-intent-danger"  @click="spawnIntent('danger')"/>
					<origam-btn text="Info"    data-cy="snackbar-group-intent-info"    @click="spawnIntent('info')"/>
				</div>
				<origam-snackbar-group
						id="intent-stack"
						location="bottom-right"
						data-cy="snackbar-group-intent-host"
				/>
			</div>
		</Variant>

		<Variant title="Slot — none (composable-driven)">
			<div class="story-shell" data-cy="snackbar-group-slot-none">
				<div class="story-status">
					This component is composable-driven and does not expose a default
					slot. Each item is created via <code>useSnackbarGroup().notify()</code>
					— configure title, message, intent, icon, actions on the call site.
				</div>
				<origam-btn text="Notify with title + message" data-cy="snackbar-group-slot-trigger" @click="spawnRich"/>
				<origam-snackbar-group
						id="rich"
						location="bottom-right"
						data-cy="snackbar-group-slot-host"
				/>
			</div>
		</Variant>

		<Variant title="Emit — onDismiss">
			<div class="story-shell" data-cy="snackbar-group-emit">
				<div class="story-row">
					<origam-btn text="Notify with onDismiss" data-cy="snackbar-group-emit-trigger" @click="spawnEmit"/>
					<origam-btn text="With Action" data-cy="snackbar-group-emit-action" @click="spawnEmitAction"/>
				</div>
				<div class="story-status" data-cy="snackbar-group-emit-counter">
					Dismissed: <strong>{{ dismissCount }}</strong> — Action clicks: <strong>{{ actionCount }}</strong>
				</div>
				<origam-snackbar-group
						id="emit-stack"
						location="bottom-right"
						data-cy="snackbar-group-emit-host"
				/>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'
	import { ref } from 'vue'

	import { OrigamBtn, OrigamSnackbarGroup } from '@origam/components'

	import { useSnackbarGroup } from '@origam/composables'

	import { SNACKBAR_GROUP_LOCATIONS } from '@origam/consts'

	import type { IOptions } from '@origam/interfaces'

	import type { TIntent, TSnackbarGroupLocation } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'

	const intentOptions: Array<IOptions<TIntent>> = [
		{label: 'primary',   value: 'primary'},
		{label: 'success',   value: 'success'},
		{label: 'warning',   value: 'warning'},
		{label: 'danger',    value: 'danger'},
		{label: 'info',      value: 'info'},
		{label: 'neutral',   value: 'neutral'},
		{label: 'secondary', value: 'secondary'},
		{label: 'ghost',     value: 'ghost'}
	]

	const locationOptions: Array<IOptions<TSnackbarGroupLocation>> = SNACKBAR_GROUP_LOCATIONS.map(loc => ({
		label: loc,
		value: loc
	}))

	const dismissCount = ref<number>(0)
	const actionCount = ref<number>(0)

	const playgroundStack = useSnackbarGroup({id: 'playground'})

	const playgroundNotify = (intent: TIntent, dismissible: boolean) => {
		playgroundStack.notify({
			title: 'Notification',
			message: `An ${intent} toast spawned from the playground.`,
			intent,
			dismissible
		})
	}

	const playgroundDismissAll = () => {
		playgroundStack.dismissAll()
	}

	const spawnInLocation = (loc: TSnackbarGroupLocation) => {
		const stack = useSnackbarGroup({id: `location-${loc}`})
		stack.notify({title: loc, message: `Toast at ${loc}.`, intent: 'info', duration: 3000})
	}

	const maxStack = useSnackbarGroup({id: 'max-test'})

	const burstMax = () => {
		for (let i = 1; i <= 10; i++) {
			maxStack.notify({
				title: `Toast #${i}`,
				message: 'Burst — only the latest 5 stay.',
				duration: 0
			})
		}
	}

	const intentStack = useSnackbarGroup({id: 'intent-stack'})

	const spawnIntent = (intent: TIntent) => {
		intentStack.notify({
			title: intent.charAt(0).toUpperCase() + intent.slice(1),
			message: `${intent} flavoured toast.`,
			intent,
			duration: 4000
		})
	}

	const richStack = useSnackbarGroup({id: 'rich'})

	const spawnRich = () => {
		richStack.notify({
			title: 'Profile saved',
			message: 'Your changes have been applied to your account.',
			intent: 'success',
			duration: 4000
		})
	}

	const emitStack = useSnackbarGroup({id: 'emit-stack'})

	const spawnEmit = () => {
		emitStack.notify({
			title: 'Dismiss me',
			message: 'Click X or wait — the counter increments on dismiss.',
			intent: 'info',
			duration: 3000,
			onDismiss: () => {
				dismissCount.value += 1
				logEvent('onDismiss', dismissCount.value)
			}
		})
	}

	const spawnEmitAction = () => {
		emitStack.notify({
			title: 'Item deleted',
			message: 'A row was removed from your list.',
			intent: 'warning',
			duration: 6000,
			actions: [
				{
					label: 'Undo',
					intent: 'primary',
					handler: () => {
						actionCount.value += 1
						logEvent('action', 'undo')
					}
				}
			],
			onDismiss: () => {
				dismissCount.value += 1
				logEvent('onDismiss', dismissCount.value)
			}
		})
	}
</script>

<style scoped>
	.story-shell {
		display: flex;
		flex-direction: column;
		gap: 16px;
		align-items: stretch;
		padding: 16px;
	}

	.story-row {
		display: flex;
		gap: 12px;
		align-items: center;
		flex-wrap: wrap;
	}

	.story-status {
		font: 0.875rem/1.4 system-ui, sans-serif;
		color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66));
	}
</style>

<docs lang="md" src="@docs/components/SnackbarGroup/OrigamSnackbarGroup.md"/>
