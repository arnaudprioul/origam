<template>
	<Story
			group="components"
			title="Badge/OrigamBadge"
	>
		<!--
			Playground — first by convention. Exposes every IBadgeProps knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IBadgeProps>({
					modelValue: true,
					content: 3,
					dot: false,
					floating: false,
					inline: false,
					location: 'top right',
					bgColor: 'primary',
					rounded: undefined,
					elevation: undefined,
					border: false,
					status: undefined
				})"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge v-bind="state">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.modelValue" title="modelValue"/>
				<HstText     v-model="state.content"    title="content"/>
				<HstCheckbox v-model="state.dot"        title="dot"/>
				<HstCheckbox v-model="state.floating"   title="floating"/>
				<HstCheckbox v-model="state.inline"     title="inline"/>
				<HstSelect   v-model="state.location"   title="location"   :options="locationList"/>
				<HstSelect   v-model="state.bgColor"    title="bgColor"    :options="intentList"/>
				<HstSelect   v-model="state.rounded"    title="rounded"    :options="roundedList"/>
				<HstSelect   v-model="state.elevation"  title="elevation"  :options="elevationList"/>
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.status"     title="status"     :options="statusList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — modelValue"
				:init-state="() => useStoryInitState<{ modelValue?: boolean }>({ modelValue: true })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :model-value="state.modelValue" :content="3" bg-color="primary">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.modelValue" title="modelValue"/>
			</template>
		</Variant>

		<Variant
				title="Prop — content & max"
				:init-state="() => useStoryInitState<{ content?: string | number, max?: number | string }>({
					content: 5,
					max: undefined
				})"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge
							:content="state.content"
							:max="state.max"
							:model-value="true"
					>
						<origam-avatar text="AP" bg-color="primary"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.content" title="content"/>
				<HstNumber v-model="state.max"     title="max"/>
			</template>
		</Variant>

		<Variant
				title="Prop — dot"
				:init-state="() => useStoryInitState<{ dot?: boolean }>({ dot: true })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :dot="state.dot" :model-value="true" :content="1">
						<origam-avatar text="AP" bg-color="primary"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.dot" title="dot"/>
			</template>
		</Variant>

		<Variant
				title="Prop — inline"
				:init-state="() => useStoryInitState<{ inline?: boolean }>({ inline: true })"
		>
			<template #default="{ state }">
				<p>
					Status:
					<origam-badge
							:inline="state.inline"
							:model-value="true"
							content="active"
							bg-color="success"
					/>
				</p>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.inline" title="inline"/>
			</template>
		</Variant>

		<Variant
				title="Prop — floating"
				:init-state="() => useStoryInitState<{ floating?: boolean }>({ floating: true })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :floating="state.floating" :model-value="true" :content="3">
						<origam-avatar text="AP" bg-color="primary"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.floating" title="floating"/>
			</template>
		</Variant>

		<Variant
				title="Prop — location"
				:init-state="() => useStoryInitState<{ location?: string }>({ location: 'top right' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge
							:location="state.location as any"
							:model-value="true"
							:content="3"
					>
						<origam-avatar text="AP" bg-color="primary"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.location" title="location" :options="locationList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 24px; padding: 16px;">
					<origam-badge :model-value="true" :content="1" v-bind="state">
						<origam-avatar text="AP"/>
					</origam-badge>
					<origam-badge :model-value="true" :content="1" bg-color="primary"><origam-avatar text="P"/></origam-badge>
					<origam-badge :model-value="true" :content="2" bg-color="success"><origam-avatar text="S"/></origam-badge>
					<origam-badge :model-value="true" :content="3" bg-color="warning"><origam-avatar text="W"/></origam-badge>
					<origam-badge :model-value="true" :content="4" bg-color="danger"> <origam-avatar text="D"/></origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — status & statusIconPosition"
				:init-state="() => useStoryInitState<{ status?: TStatus, statusIconPosition?: TStatusPosition, content?: string | number }>({
					status: 'success',
					statusIconPosition: 'prepend',
					content: 1
				})"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px;">
					<div class="demo-host">
						<origam-badge
								:status="state.status"
								:status-icon-position="state.statusIconPosition"
								:content="state.content"
								:model-value="true"
						>
							<origam-avatar text="AP"/>
						</origam-badge>
					</div>
					<div style="display: flex; gap: 32px; flex-wrap: wrap;">
						<div class="demo-cell">
							<div class="demo-host">
								<origam-badge status="success" status-icon-position="prepend" :content="1" :model-value="true">
									<origam-avatar text="P"/>
								</origam-badge>
							</div>
							<p class="demo-label">prepend</p>
						</div>
						<div class="demo-cell">
							<div class="demo-host">
								<origam-badge status="warning" status-icon-position="append" :content="1" :model-value="true">
									<origam-avatar text="A"/>
								</origam-badge>
							</div>
							<p class="demo-label">append</p>
						</div>
						<div class="demo-cell">
							<div class="demo-host">
								<origam-badge status="info" status-icon-position="both" :content="1" :model-value="true">
									<origam-avatar text="B"/>
								</origam-badge>
							</div>
							<p class="demo-label">both</p>
						</div>
						<div class="demo-cell">
							<div class="demo-host">
								<origam-badge status="error" status-icon-position="replace" :model-value="true">
									<origam-avatar text="R"/>
								</origam-badge>
							</div>
							<p class="demo-label">replace</p>
						</div>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.status"             title="status"             :options="statusList"/>
				<HstSelect v-model="state.statusIconPosition" title="statusIconPosition" :options="statusIconPositionList"/>
				<HstText   v-model="state.content"            title="content"/>
			</template>
		</Variant>

		<Variant
				title="Prop — icon"
				:init-state="() => useStoryInitState<{ icon?: string }>({ icon: 'mdi:mdi-heart' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :icon="state.icon" :model-value="true" bg-color="danger">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.icon" title="icon" :options="iconList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: 'default' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :rounded="state.rounded" :model-value="true" :content="3" bg-color="primary">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — elevation"
				:init-state="() => useStoryInitState<{ elevation?: number }>({ elevation: 4 })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :elevation="state.elevation" :model-value="true" :content="3" bg-color="primary">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — border"
				:init-state="() => useStoryInitState<{ border?: boolean }>({ border: true })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :border="state.border" :model-value="true" :content="3" bg-color="primary">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — badge">
			<div class="demo-host">
				<origam-badge :model-value="true" bg-color="success">
					<template #badge>
						<span style="font-weight: bold;">!</span>
					</template>
					<origam-avatar text="AP"/>
				</origam-badge>
			</div>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:hover">
			<div class="demo-host">
				<origam-badge
						:model-value="true"
						:content="3"
						bg-color="primary"
						@update:hover="logEvent('update:hover', $event)"
				>
					<origam-avatar text="AP"/>
				</origam-badge>
			</div>
			<p style="font: 0.8rem/1.4 system-ui; color: var(--origam-color-text-secondary);">Hover the badge — watch the Events panel.</p>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAvatar, OrigamBadge } from '@origam/components'
	import { STATUS, STATUS_POSITION } from '@origam/enums'
	import type { IBadgeProps, IColorProps, IOptions, IRoundedProps } from '@origam/interfaces'
	import type { TAnchor, TStatus, TStatusPosition } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		borderList,
		elevationList, iconList, intentList, roundedList
	} from '@stories/const'

	const statusList: Array<IOptions<TStatus>> = [
		{ label: '(none)', value: undefined },
		{ label: 'Success', value: STATUS.SUCCESS },
		{ label: 'Warning', value: STATUS.WARNING },
		{ label: 'Error',   value: STATUS.ERROR },
		{ label: 'Info',    value: STATUS.INFO }
	]

	const statusIconPositionList: Array<IOptions<TStatusPosition>> = [
		{ label: '(none)',  value: undefined },
		{ label: 'prepend', value: STATUS_POSITION.PREPEND },
		{ label: 'append',  value: STATUS_POSITION.APPEND },
		{ label: 'both',    value: STATUS_POSITION.BOTH },
		{ label: 'replace', value: STATUS_POSITION.REPLACE }
	]

	const locationList: Array<IOptions<TAnchor>> = [
		{ label: 'top right',    value: 'top right'    as TAnchor },
		{ label: 'top left',     value: 'top left'     as TAnchor },
		{ label: 'top center',   value: 'top center'   as TAnchor },
		{ label: 'bottom right', value: 'bottom right' as TAnchor },
		{ label: 'bottom left',  value: 'bottom left'  as TAnchor },
		{ label: 'bottom center',value: 'bottom center'as TAnchor }
	]
</script>

<style scoped>
	.demo-host {
		display: inline-flex;
		padding: 16px;
	}

	.demo-cell {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.demo-label {
		font: 0.75rem/1 system-ui;
		color: var(--origam-color-text-secondary);
		margin: 0;
	}
</style>

<docs lang="md" src="@docs/components/Badge/OrigamBadge.md"/>
