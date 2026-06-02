<template>
	<Story
			group="components"
			title="DefaultsProvider/OrigamDefaultsProvider"
	>
		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<IDefaultProviderProps>({
					disabled: false,
					scoped: false
				})"
		>
			<template #default="{ state }">
				<origam-defaults-provider
						:defaults="{ 'origam-btn': { color: 'primary', density: 'compact' } }"
						:disabled="state.disabled"
						:scoped="state.scoped"
						:reset="state.reset"
						:root="state.root"
				>
					<div class="story-row">
						<origam-btn text="Button A"/>
						<origam-btn text="Button B" variant="outlined"/>
						<origam-btn text="Button C (explicit)" color="success"/>
					</div>
				</origam-defaults-provider>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Behaviour">
					<HstCheckbox v-model="state.disabled" title="Disabled (pass-through)"/>
					<HstCheckbox v-model="state.scoped"   title="Scoped (no parent inherit)"/>
				</StoryGroup>
				<StoryGroup title="Reset / Root">
					<HstText v-model="state.reset" title="Reset (string | number)"/>
					<HstText v-model="state.root"  title="Root (string | number)"/>
				</StoryGroup>
			</template>
		</Variant>

		<Variant title="Functional - defaults global">
			<origam-defaults-provider :defaults="{ global: { density: 'compact' } }">
				<div class="story-row">
					<origam-btn text="Button A"/>
					<origam-btn text="Button B" color="primary"/>
					<origam-btn text="Button C" variant="outlined"/>
				</div>
			</origam-defaults-provider>
		</Variant>

		<Variant title="Functional - defaults component-level">
			<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'primary', variant: 'flat' } }">
				<div class="story-row">
					<origam-btn text="Inherits primary"/>
					<origam-btn text="Override" color="danger"/>
				</div>
			</origam-defaults-provider>
		</Variant>

		<Variant title="Functional - scoped (no parent inheritance)">
			<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'primary' } }">
				<origam-btn text="Sees primary" style="margin-bottom: 8px; display: block;"/>
				<origam-defaults-provider
						:defaults="{ 'origam-btn': { color: 'danger' } }"
						scoped
				>
					<origam-btn text="Scoped: only danger"/>
				</origam-defaults-provider>
			</origam-defaults-provider>
		</Variant>

		<Variant title="Functional - disabled (pass-through)">
			<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'primary' } }">
				<origam-btn text="Outer default (primary)" style="margin-bottom: 8px; display: block;"/>
				<origam-defaults-provider :defaults="{ 'origam-btn': { color: 'danger' } }" disabled>
					<origam-btn text="Disabled provider — inherits primary from outer"/>
				</origam-defaults-provider>
			</origam-defaults-provider>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<origam-defaults-provider :defaults="{ global: { size: 'small' } }">
				<template #default>
					<origam-btn text="Small from slot"/>
				</template>
			</origam-defaults-provider>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<IDefaultProviderProps & { injectedColor?: string; injectedDensity?: string }>({
					injectedColor: 'primary',
					injectedDensity: undefined,
					disabled: false,
					scoped: false
				})"
		>
			<template #default="{ state }">
				<origam-defaults-provider
						:defaults="{
							'origam-btn': {
								color:   state.injectedColor,
								density: state.injectedDensity
							}
						}"
						:disabled="state.disabled"
						:scoped="state.scoped"
				>
					<div class="story-row">
						<origam-btn text="Button A"/>
						<origam-btn text="Button B" variant="outlined"/>
						<origam-btn text="Button C (explicit)" color="success"/>
					</div>
				</origam-defaults-provider>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Injection">
					<HstSelect v-model="state.injectedColor"   title="Injected color"   :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.injectedDensity" title="Injected density" :options="DENSITY_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
					<HstCheckbox v-model="state.scoped"   title="Scoped"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamDefaultsProvider } from '@origam/components'
	import type { IDefaultProviderProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		COLOR_OPTIONS,
		DENSITY_OPTIONS
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/DefaultsProvider/OrigamDefaultsProvider.md"/>
