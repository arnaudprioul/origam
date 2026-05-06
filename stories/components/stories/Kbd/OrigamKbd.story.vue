<template>
	<Story
			group="components"
			title="Kbd/OrigamKbd"
	>

		<!-- ════════════ DEFAULT ════════════ -->
		<Variant title="Default">
			<origam-kbd text="⌘" data-cy="kbd-default"/>
		</Variant>

		<!-- ════════════ COMBINATION ════════════ -->
		<Variant title="Combination">
			<div style="display: flex; align-items: center; gap: 8px;">
				<origam-kbd :combination="['Ctrl', 'Shift', 'Z']" data-cy="kbd-combination"/>
			</div>
		</Variant>

		<!-- ════════════ VARIANT ════════════ -->
		<Variant title="Variant">
			<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
				<origam-kbd text="⌘S" variant="outlined" data-cy="kbd-variant-outlined"/>
				<origam-kbd text="⌘S" variant="filled"   data-cy="kbd-variant-filled"/>
				<origam-kbd text="⌘S" variant="tonal"    data-cy="kbd-variant-tonal"/>
			</div>
		</Variant>

		<!-- ════════════ SIZE ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({})"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
					<origam-kbd text="xs"      size="x-small" data-cy="kbd-size-xs"/>
					<origam-kbd text="sm"      size="small"   data-cy="kbd-size-sm"/>
					<origam-kbd text="default" :size="state.size" data-cy="kbd-size-default"/>
					<origam-kbd text="lg"      size="large"   data-cy="kbd-size-lg"/>
					<origam-kbd text="xl"      size="x-large" data-cy="kbd-size-xl"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR ════════════ -->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-kbd v-bind="state" text="Interactive" data-cy="kbd-color"/>

					<div style="display: flex; gap: 12px; padding-top: 12px; border-top: 1px dashed #ccc;">
						<origam-kbd color="primary" text="primary" data-cy="kbd-color-primary"/>
						<origam-kbd color="success" text="success" data-cy="kbd-color-success"/>
						<origam-kbd color="warning" text="warning" data-cy="kbd-color-warning"/>
						<origam-kbd color="danger"  text="danger"  data-cy="kbd-color-danger"/>
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

		<!-- ════════════ SLOT — default ════════════ -->
		<Variant title="Slot — default">
			<origam-kbd data-cy="kbd-slot-default">
				<origam-icon :icon="MDI_ICONS.APPLE_KEYBOARD_COMMAND" size="x-small"/>
			</origam-kbd>
		</Variant>

		<!-- ════════════ SEPARATOR ════════════ -->
		<Variant
				title="Separator"
				:init-state="() => useStoryInitState<{ separator: string }>({ separator: '+' })"
		>
			<template #default="{ state }">
				<origam-kbd
						:combination="['Ctrl', 'Shift', 'Z']"
						:separator="state.separator"
						data-cy="kbd-separator"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.separator" title="separator"/>
			</template>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IKbdProps>({
					text: '⌘',
					variant: 'outlined',
					separator: '+',
				})"
		>
			<template #default="{ state }">
				<origam-kbd v-bind="state" data-cy="kbd-playground"/>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.text"      title="text"/>
				<HstSelect v-model="state.variant"   title="variant"   :options="kbdVariantList"/>
				<HstSelect v-model="state.size"      title="size"      :options="sizeList"/>
				<HstSelect v-model="state.color"     title="color"     :options="intentList"/>
				<HstSelect v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
				<HstText   v-model="state.separator" title="separator"/>
			</template>
		</Variant>

	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamIcon, OrigamKbd } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type { IColorProps, IKbdProps, IOptions, ISizeProps } from '@origam/interfaces'
	import type { TKbdVariant } from '@origam/types'

	import { intentList, sizeList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const kbdVariantList: Array<IOptions<TKbdVariant | undefined>> = [
		{ label: 'outlined', value: 'outlined' },
		{ label: 'filled',   value: 'filled' },
		{ label: 'tonal',    value: 'tonal' },
	]
</script>

<style scoped>
	.story-shell { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
</style>

<docs lang="md" src="@docs/components/Kbd/OrigamKbd.md"/>
