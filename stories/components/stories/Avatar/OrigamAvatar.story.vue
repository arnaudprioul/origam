<template>
	<Story
			group="components"
			title="Avatar/OrigamAvatar"
	>
		<!-- ════════════ BASIC USAGE ════════════ -->
		<Variant title="Basic usage">
			<div class="demo-row">
				<origam-avatar text="AP"/>
				<origam-avatar :icon="MDI_ICONS.ACCOUNT"/>
				<origam-avatar image="https://picsum.photos/seed/origam-avatar-basic/120/120"/>
			</div>
		</Variant>

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<!--
			One variant per interface — `IColorProps` covers `color`,
			`bgColor`, plus the `hover*` / `active*` state variants.
			Hardcoded showcase fixtures below for stable e2e selectors.
		-->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-avatar v-bind="state" text="A" data-cy="avatar-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; gap: 12px;">
						<origam-avatar bg-color="primary" text="P" data-cy="avatar-color-primary"/>
						<origam-avatar bg-color="success" text="S" data-cy="avatar-color-success"/>
						<origam-avatar bg-color="warning" text="W" data-cy="avatar-color-warning"/>
						<origam-avatar bg-color="danger"  text="D" data-cy="avatar-color-danger"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"         title="color"         :options="intentList"/>
				<HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
				<HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
				<HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
				<HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
				<HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ SIZE ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({})"
		>
			<template #default="{ state }">
				<origam-avatar :size="state.size" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ DENSITY ════════════ -->
		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-avatar :density="state.density" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (intent) ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-avatar text="AP" v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ STATUS ════════════ -->
		<Variant
				title="Status"
				:init-state="() => useStoryInitState<{ status?: TStatus }>({ status: 'success' })"
		>
			<template #default="{ state }">
				<origam-avatar :status="state.status" text="OK"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.status" title="status" :options="statusList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: undefined })"
		>
			<template #default="{ state }">
				<origam-avatar :rounded="state.rounded" text="AP"/>
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
				<origam-avatar :elevation="state.elevation" text="AP" bg-color="primary"/>
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
				<origam-avatar :border="state.border" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ HOVER / ACTIVE (forced) ════════════ -->
		<Variant
				title="Hover / Active"
				:init-state="() => useStoryInitState<{ hover?: boolean, active?: boolean }>({})"
		>
			<template #default="{ state }">
				<origam-avatar
						:active="state.active"
						:hover="state.hover"
						text="AP"
						bg-color="primary"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hover"  title="hover (force visual)"/>
				<HstCheckbox v-model="state.active" title="active (force visual)"/>
			</template>
		</Variant>

		<!-- ════════════ TAG ════════════ -->
		<Variant
				title="Tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-avatar :tag="state.tag" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: text ════════════ -->
		<Variant title="Slot — text">
			<origam-avatar text="AP">
				<template #text>
					<span style="font-style: italic;">Custom</span>
				</template>
			</origam-avatar>
		</Variant>

		<!-- ════════════ SLOT: icon ════════════ -->
		<Variant title="Slot — icon">
			<origam-avatar :icon="MDI_ICONS.HEART"/>
		</Variant>

		<!-- ════════════ SLOT: avatar (image) ════════════ -->
		<Variant title="Slot — avatar (image)">
			<origam-avatar image="https://picsum.photos/seed/origam-avatar-slot/120/120"/>
		</Variant>

		<!-- ════════════ EMITS ════════════ -->
		<Variant title="Emit — update:active / update:hover">
			<origam-avatar
					tag="button"
					text="AP"
					bg-color="primary"
					@update:active="logEvent('update:active', $event)"
					@update:hover="logEvent('update:hover', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IAvatarProps>({
					text: 'AP',
					size: 'default',
					density: undefined,
					rounded: undefined,
					border: false,
					elevation: undefined,
					bgColor: 'primary',
					status: undefined
				})"
		>
			<template #default="{ state }">
				<origam-avatar v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.text"      title="text"/>
				<HstSelect   v-model="state.size"      title="size"      :options="sizeList"/>
				<HstSelect   v-model="state.density"   title="density"   :options="densityList"/>
				<HstSelect   v-model="state.rounded"   title="rounded"   :options="roundedList"/>
				<HstCheckbox v-model="state.border"    title="border"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstSelect   v-model="state.status"    title="status"    :options="statusList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAvatar } from '@origam/components'
	import { MDI_ICONS, STATUS } from '@origam/enums'
	import type {
		IAvatarProps,
		IColorProps,
		IDensityProps,
		IOptions,
		IRoundedProps,
		ISizeProps
	} from '@origam/interfaces'
	import type { TStatus } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import {
		densityList,
		elevationList,
		intentList,
		roundedList,
		sizeList,
		tagList
	} from '@stories/const'

	const statusList: Array<IOptions<TStatus>> = [
		{ label: '(none)', value: undefined },
		{ label: 'Success', value: STATUS.SUCCESS },
		{ label: 'Warning', value: STATUS.WARNING },
		{ label: 'Error',   value: STATUS.ERROR },
		{ label: 'Info',    value: STATUS.INFO }
	]
</script>

<style scoped>
	.demo-row {
		display: flex;
		gap: 12px;
		align-items: center;
	}
</style>

<docs lang="md" src="@docs/components/Avatar/OrigamAvatar.md"/>
