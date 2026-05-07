<template>
	<Story
			group="components"
			title="Avatar/OrigamAvatarGroup"
	>
		<Variant title="Basic usage">
			<origam-avatar-group :items="people"/>
		</Variant>

		<Variant
				title="Direction"
				:init-state="() => useStoryInitState<{ direction?: TDirection }>({ direction: 'horizontal' })"
		>
			<template #default="{ state }">
				<div class="demo-direction">
					<origam-avatar-group :direction="state.direction" :items="people"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.direction" title="direction" :options="directionList"/>
			</template>
		</Variant>

		<Variant
				title="Max"
				:init-state="() => useStoryInitState<{ max?: number }>({ max: 3 })"
		>
			<template #default="{ state }">
				<origam-avatar-group :items="people" :max="state.max"/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.max" title="max" :min="1" :max="10"/>
			</template>
		</Variant>

		<Variant
				title="Expand on hover"
				:init-state="() => useStoryInitState<{ expandOnHover?: boolean }>({ expandOnHover: true })"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:expand-on-hover="state.expandOnHover"
						:items="people"
						:max="3"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.expandOnHover" title="expandOnHover"/>
			</template>
		</Variant>

		<Variant
				title="Expand on click"
				:init-state="() => useStoryInitState<{ expandOnClick?: boolean }>({ expandOnClick: true })"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:expand-on-click="state.expandOnClick"
						:items="people"
						:max="3"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.expandOnClick" title="expandOnClick"/>
			</template>
		</Variant>

		<Variant
				title="Density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-avatar-group :density="state.density" :items="people"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Forwarded props"
				:init-state="() => useStoryInitState<{ size?: TSize, rounded?: boolean, border?: boolean }>({
					size: 'small',
					rounded: false,
					border: true
				})"
		>
			<template #default="{ state }">
				<origam-avatar-group
						:border="state.border"
						:items="people"
						:rounded="state.rounded"
						:size="state.size"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.size"    title="size"    :options="sizeList"/>
				<HstCheckbox v-model="state.rounded" title="rounded"/>
				<HstCheckbox v-model="state.border"  title="border"/>
			</template>
		</Variant>

		<Variant title="Slot — avatar">
			<origam-avatar-group :items="people" :max="4">
				<template #avatar="{ item, index }">
					<origam-avatar
							:bg-color="index % 2 === 0 ? 'primary' : 'secondary'"
							class="origam-avatar-group__item"
							:text="(item as any).text"
					/>
				</template>
			</origam-avatar-group>
		</Variant>

		<Variant title="Slot — rest">
			<origam-avatar-group :items="people" :max="3">
				<template #rest="{ length }">
					<origam-avatar
							class="origam-avatar-group__rest"
							bg-color="info"
							:text="`+${length}`"
					/>
				</template>
			</origam-avatar-group>
		</Variant>

		<Variant title="Emit — update:active / update:hover">
			<origam-avatar-group
					:items="people"
					:max="3"
					expand-on-click
					expand-on-hover
					@update:active="logEvent('update:active', $event)"
					@update:hover="logEvent('update:hover', $event)"
			/>
		</Variant>

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IAvatarGroupProps & { size?: TSize }>({
					items: people,
					max: 4,
					direction: 'horizontal',
					expandOnHover: false,
					expandOnClick: false,
					density: undefined,
					size: 'default'
				})"
		>
			<template #default="{ state }">
				<origam-avatar-group v-bind="state"/>
			</template>
			<template #controls="{ state }">
				<HstNumber   v-model="state.max"           title="max" :min="1" :max="10"/>
				<HstSelect   v-model="state.direction"     title="direction" :options="directionList"/>
				<HstCheckbox v-model="state.expandOnHover" title="expandOnHover"/>
				<HstCheckbox v-model="state.expandOnClick" title="expandOnClick"/>
				<HstSelect   v-model="state.density"       title="density" :options="densityList"/>
				<HstSelect   v-model="state.size"          title="size"    :options="sizeList"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAvatar, OrigamAvatarGroup } from '@origam/components'
	import { DIRECTION } from '@origam/enums'
	import type {
		IAvatarGroupProps,
		IAvatarProps,
		IDensityProps,
		IOptions
	} from '@origam/interfaces'
	import type { TDirection, TSize } from '@origam/types'

	import { useStoryInitState } from '@stories/composables'
	import { densityList, sizeList } from '@stories/const'

	const directionList: Array<IOptions<TDirection>> = [
		{ label: 'Horizontal', value: DIRECTION.HORIZONTAL },
		{ label: 'Vertical',   value: DIRECTION.VERTICAL }
	]

	const people: Array<IAvatarProps> = [
		{ text: 'AP', bgColor: 'primary' },
		{ text: 'JC', bgColor: 'secondary' },
		{ text: 'MS', bgColor: 'success' },
		{ text: 'KL', bgColor: 'warning' },
		{ text: 'RT', bgColor: 'danger' },
		{ text: 'NB', bgColor: 'info' },
		{ text: 'OT', bgColor: 'neutral' }
	]
</script>

<style scoped>
	.demo-direction {
		min-height: 220px;
	}
</style>

<docs lang="md" src="@docs/components/Avatar/OrigamAvatarGroup.md"/>
