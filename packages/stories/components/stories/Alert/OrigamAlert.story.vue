<template>
	<Story
			group="components"
			title="Alert/OrigamAlert"
	>
		<!--
			Playground — first by convention. Exposes every IAlertProps knob
			via sidebar controls so the consumer can explore the full API.
		-->
		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IAlertProps>({
					text: 'Alert message.',
					title: '',
					status: undefined,
					color: undefined,
					density: DENSITY.DEFAULT,
					closable: false,
					prominent: false,
					rounded: undefined,
				})"
		>
			<template #default="{ state }">
				<origam-alert v-bind="state" data-cy="alert-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"      title="text"/>
				<HstText     v-model="state.title"     title="title"/>
				<HstSelect   v-model="state.status"    title="status"    :options="statusList"/>
				<HstSelect   v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstCheckbox v-model="state.closable"  title="closable"/>
				<HstCheckbox v-model="state.prominent" title="prominent"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — status"
				:init-state="() => useStoryInitState<{ status?: TStatus }>({ status: 'info' })"
		>
			<template #default="{ state }">
				<origam-alert
						:status="state.status"
						title="Status alert"
						text="Contextual feedback message."
						data-cy="alert-status"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.status" title="status" :options="statusList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<origam-alert v-bind="state" text="Interactive alert" data-cy="alert-color"/>
					<origam-alert bg-color="primary" text="primary" data-cy="alert-color-primary"/>
					<origam-alert bg-color="success" text="success" data-cy="alert-color-success"/>
					<origam-alert bg-color="warning" text="warning" data-cy="alert-color-warning"/>
					<origam-alert bg-color="danger"  text="danger"  data-cy="alert-color-danger"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — prominent"
				:init-state="() => useStoryInitState<{ prominent: boolean }>({ prominent: true })"
		>
			<template #default="{ state }">
				<origam-alert
						:prominent="state.prominent"
						status="info"
						title="Prominent Alert"
						text="Larger icon layout for important messages."
						data-cy="alert-prominent"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.prominent" title="prominent"/>
			</template>
		</Variant>

		<Variant
				title="Prop — closable"
				:init-state="() => useStoryInitState<{ visible: boolean }>({ visible: true })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-alert
							v-if="state.visible"
							closable
							text="Dismiss this alert."
							data-cy="alert-closable"
							@click:close="state.visible = false"
					/>
					<span class="story-status" data-cy="alert-closable-status">
						visible = <strong>{{ state.visible }}</strong>
					</span>
					<origam-btn size="small" text="Reset" data-cy="alert-closable-reset" @click="state.visible = true"/>
				</div>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({ density: DENSITY.DEFAULT })"
		>
			<template #default="{ state }">
				<origam-alert :density="state.density" text="Density alert" data-cy="alert-density"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — title"
				:init-state="() => useStoryInitState<{ title?: string }>({ title: 'Alert title' })"
		>
			<template #default="{ state }">
				<origam-alert :title="state.title" text="Body text." data-cy="alert-title"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.title" title="title"/>
			</template>
		</Variant>

		<Variant
				title="Prop — text"
				:init-state="() => useStoryInitState<{ text?: string }>({ text: 'Alert body text.' })"
		>
			<template #default="{ state }">
				<origam-alert :text="state.text" data-cy="alert-text"/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.text" title="text"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<{ rounded?: string }>({ rounded: 'lg' })"
		>
			<template #default="{ state }">
				<origam-alert :rounded="state.rounded" text="Rounded alert" data-cy="alert-rounded"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — title">
			<origam-alert text="Body text." data-cy="alert-slot-title">
				<template #title>
					<strong>Custom title via slot</strong>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slot — prepend">
			<origam-alert text="Custom prepend slot." data-cy="alert-slot-prepend">
				<template #prepend>
					<origam-icon :icon="MDI_ICONS.SHIELD_CHECK" data-cy="alert-prepend-icon"/>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slot — append">
			<origam-alert text="Alert with append slot." data-cy="alert-slot-append">
				<template #append>
					<origam-icon :icon="MDI_ICONS.HEART"/>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slot — close">
			<origam-alert closable text="Alert with custom close slot." data-cy="alert-slot-close">
				<template #close>
					<origam-icon :icon="MDI_ICONS.CLOSE_CIRCLE"/>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slot — default">
			<origam-alert data-cy="alert-slot-default">
				<span>Custom slot content</span>
			</origam-alert>
		</Variant>

		<Variant title="Slot — text">
			<origam-alert data-cy="alert-slot-text">
				<template #text>
					<span>Custom slot content</span>
				</template>
			</origam-alert>
		</Variant>

		<Variant title="Slot — wrapper">
			<origam-alert data-cy="alert-slot-wrapper">
				<template #wrapper>
					<div style="padding: 16px; border: 2px dashed var(--origam-color__border---subtle);">
						<span>Custom slot content</span>
					</div>
				</template>
			</origam-alert>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — click:close"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div class="story-shell">
					<origam-alert
							closable
							text="Click the close button — the event is captured below."
							data-cy="alert-emit-close"
							@click:close="(e) => {
								logEvent('click:close', e)
								state.log = [`click:close fired`, ...state.log].slice(0, 5)
							}"
					/>
					<ul class="story-log" data-cy="alert-emit-log">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" class="story-status">Click the close icon.</p>
				</div>
			</template>
		</Variant>

		<Variant title="Emit — update:hover">
			<origam-alert
					text="Hover over this alert."
					data-cy="alert-emit-hover"
					@update:hover="logEvent('update:hover', $event)"
			/>
		</Variant>

		<Variant title="Emit — update:modelValue">
			<origam-alert
					closable
					text="Dismiss this alert to fire update:modelValue."
					data-cy="alert-emit-model-value"
					@update:model-value="logEvent('update:modelValue', $event)"
			/>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAlert, OrigamBtn, OrigamIcon } from '@origam/components'
	import { DENSITY, MDI_ICONS, STATUS } from '@origam/enums'
	import type { IAlertProps, IColorProps, IDensityProps, IOptions } from '@origam/interfaces'
	import type { TStatus } from '@origam/types'

	import { densityList, intentList, roundedList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const statusList: Array<IOptions<TStatus | undefined>> = [
		{ label: '(none)',   value: undefined },
		{ label: 'Success',  value: STATUS.SUCCESS },
		{ label: 'Info',     value: STATUS.INFO },
		{ label: 'Warning',  value: STATUS.WARNING },
		{ label: 'Error',    value: STATUS.ERROR },
	]
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.story-status { font: 0.875rem/1.4 system-ui, sans-serif; color: var(--origam-color__text---secondary, rgba(0, 0, 0, 0.66)); margin: 0; }
	.story-log { font-family: monospace; font-size: 0.8rem; margin: 0; padding-left: 16px; }
</style>

<docs lang="md" src="@docs/components/Alert/OrigamAlert.md"/>
