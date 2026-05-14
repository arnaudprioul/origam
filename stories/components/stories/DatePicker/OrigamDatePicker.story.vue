<template>
	<Story
			group="components"
			title="DatePicker/OrigamDatePicker"
	>
		<!--
			Playground — first by convention. All main props wired via
			sidebar controls.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					multiple?: boolean
					range?: boolean
					showWeek?: boolean
					min?: string
					max?: string
				}>({
					multiple: false,
					range: false,
					showWeek: false,
					min: undefined,
					max: undefined
				})"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-date-picker
							v-model="date"
							:multiple="state.multiple"
							:range="state.range"
							:show-week="state.showWeek"
							:min="state.min"
							:max="state.max"
							data-cy="date-picker-playground"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.multiple"  title="multiple"/>
				<HstCheckbox v-model="state.range"     title="range"/>
				<HstCheckbox v-model="state.showWeek"  title="showWeek"/>
				<HstText     v-model="state.min"        title="min (ISO 8601)"/>
				<HstText     v-model="state.max"        title="max (ISO 8601)"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant title="Prop — modelValue (single date)">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="date" data-cy="date-picker-single"/>
			</div>
		</Variant>

		<Variant title="Prop — range">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="dates" range data-cy="date-picker-range"/>
			</div>
		</Variant>

		<Variant title="Prop — multiple">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="dates" multiple data-cy="date-picker-multiple"/>
			</div>
		</Variant>

		<Variant
				title="Prop — min & max (date constraints)"
				:init-state="() => useStoryInitState<{ min?: string; max?: string }>({ min: minDefault, max: maxDefault })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-date-picker
							v-model="date"
							:min="state.min"
							:max="state.max"
							data-cy="date-picker-constraints"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.min" title="min (ISO 8601)"/>
				<HstText v-model="state.max" title="max (ISO 8601)"/>
			</template>
		</Variant>

		<Variant
				title="Prop — showWeek"
				:init-state="() => useStoryInitState<{ showWeek?: boolean }>({ showWeek: true })"
		>
			<template #default="{ state }">
				<div style="padding: 24px; display: flex; justify-content: center;">
					<origam-date-picker v-model="date" :show-week="state.showWeek" data-cy="date-picker-show-week"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.showWeek" title="showWeek"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — default">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="date" data-cy="date-picker-slot-default">
					<span>Custom slot content</span>
				</origam-date-picker>
			</div>
		</Variant>

		<Variant title="Slot — header">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="date" data-cy="date-picker-slot-header">
					<template #header>
						<span style="font-weight: 600; padding: 8px 16px;">Custom header</span>
					</template>
				</origam-date-picker>
			</div>
		</Variant>

		<Variant title="Slot — title">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="date" data-cy="date-picker-slot-title">
					<template #title>
						<strong>Pick a date</strong>
					</template>
				</origam-date-picker>
			</div>
		</Variant>

		<Variant title="Slot — actions">
			<div style="padding: 24px; display: flex; justify-content: center;">
				<origam-date-picker v-model="date" data-cy="date-picker-slot-actions">
					<template #actions>
						<origam-btn color="primary" text="OK" size="small"/>
						<origam-btn text="Cancel" size="small"/>
					</template>
				</origam-date-picker>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<div style="display: flex; justify-content: center;">
						<origam-date-picker
								v-model="date"
								data-cy="date-picker-emit-model-value"
								@update:model-value="(v: unknown) => {
									state.log = [`update:modelValue → ${JSON.stringify(v)}`, ...state.log].slice(0, 6)
								}"
						/>
					</div>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Click a day to see the event fire.
					</p>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — update:month"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<div style="display: flex; justify-content: center;">
						<origam-date-picker
								v-model="date"
								data-cy="date-picker-emit-month"
								@update:month="(v: number) => {
									state.log = [`update:month → ${v}`, ...state.log].slice(0, 6)
								}"
						/>
					</div>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Use the arrow navigation to change month.
					</p>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — update:viewMode"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<div style="display: flex; justify-content: center;">
						<origam-date-picker
								v-model="date"
								data-cy="date-picker-emit-view-mode"
								@update:view-mode="(v: string) => {
									state.log = [`update:viewMode → ${v}`, ...state.log].slice(0, 6)
								}"
						/>
					</div>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Click the year/month heading to toggle view mode.
					</p>
				</div>
			</template>
		</Variant>

		<Variant
				title="Emit — update:year"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="padding: 24px;">
					<div style="display: flex; justify-content: center;">
						<origam-date-picker
								v-model="date"
								data-cy="date-picker-emit-year"
								@update:year="(v: number) => {
									state.log = [`update:year → ${v}`, ...state.log].slice(0, 6)
								}"
						/>
					</div>
					<ul style="font-family: monospace; font-size: 0.8rem; margin-top: 12px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">
						Navigate to a different year using the year toggle.
					</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { ref } from 'vue'

	import { OrigamBtn, OrigamDatePicker } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const date = ref(null)
	const dates = ref([])

	const today = new Date()
	const minDefault = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10)
	const maxDefault = new Date(today.getFullYear(), today.getMonth() + 3, 0).toISOString().slice(0, 10)
</script>

<docs lang="md" src="@docs/components/DatePicker/OrigamDatePicker.md"/>
