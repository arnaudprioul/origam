<template>
	<Story
			group="components"
			title="Badge/OrigamBadge"
	>
		<!-- ════════════ BASIC USAGE ════════════ -->
		<Variant title="Basic usage">
			<div class="demo-host">
				<origam-badge :model-value="true" :content="3">
					<origam-avatar text="AP" bg-color="primary"/>
				</origam-badge>
			</div>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant title="Color">
			<div style="display: flex; gap: 24px; padding: 16px;">
				<origam-badge :model-value="true" :content="1" bg-color="primary" data-cy="badge-color-primary">
					<origam-avatar text="P"/>
				</origam-badge>
				<origam-badge :model-value="true" :content="2" bg-color="success" data-cy="badge-color-success">
					<origam-avatar text="S"/>
				</origam-badge>
				<origam-badge :model-value="true" :content="3" bg-color="warning" data-cy="badge-color-warning">
					<origam-avatar text="W"/>
				</origam-badge>
				<origam-badge :model-value="true" :content="4" bg-color="danger" data-cy="badge-color-danger">
					<origam-avatar text="D"/>
				</origam-badge>
			</div>
		</Variant>

		<!-- ════════════ CONTENT ════════════ -->
		<Variant
				title="Content"
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
				<HstText v-model="state.content" title="content"/>
				<HstNumber v-model="state.max" title="max"/>
			</template>
		</Variant>

		<!-- ════════════ DOT ════════════ -->
		<Variant
				title="Dot"
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

		<!-- ════════════ INLINE ════════════ -->
		<Variant
				title="Inline"
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

		<!-- ════════════ FLOATING ════════════ -->
		<Variant
				title="Floating"
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

		<!-- ════════════ LOCATION ════════════ -->
		<Variant
				title="Location"
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

		<!-- ════════════ STATUS ════════════ -->
		<Variant
				title="Status"
				:init-state="() => useStoryInitState<{ status?: TStatus }>({ status: 'success' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :status="state.status" :model-value="true" :content="1">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.status" title="status" :options="statusList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (intent) ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div class="demo-host">
					<origam-badge :model-value="true" :content="1" v-bind="state">
						<origam-avatar text="AP"/>
					</origam-badge>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ICON ════════════ -->
		<Variant
				title="Icon"
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

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
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

		<!-- ════════════ ELEVATION ════════════ -->
		<Variant
				title="Elevation"
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

		<!-- ════════════ BORDER ════════════ -->
		<Variant
				title="Border"
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
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ TOGGLE (modelValue) ════════════ -->
		<Variant
				title="Model value (toggle)"
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

		<!-- ════════════ SLOT: badge ════════════ -->
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

		<!-- ════════════ EMITS ════════════ -->
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
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
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
				<HstCheckbox v-model="state.border"     title="border"/>
				<HstSelect   v-model="state.status"     title="status"     :options="statusList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAvatar, OrigamBadge } from '@origam/components'
	import { STATUS } from '@origam/enums'
	import type { IBadgeProps, IColorProps, IOptions, IRoundedProps } from '@origam/interfaces'
	import type { TAnchor, TStatus } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { elevationList, iconList, intentList, roundedList } from '@stories/const'

	const statusList: Array<IOptions<TStatus>> = [
		{ label: '(none)', value: undefined },
		{ label: 'Success', value: STATUS.SUCCESS },
		{ label: 'Warning', value: STATUS.WARNING },
		{ label: 'Error',   value: STATUS.ERROR },
		{ label: 'Info',    value: STATUS.INFO }
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
</style>

<docs lang="md" src="@docs/components/Badge/OrigamBadge.md"/>
