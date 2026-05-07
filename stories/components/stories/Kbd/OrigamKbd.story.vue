<template>
	<Story
			group="components"
			title="Kbd/OrigamKbd"
	>

		<!-- ════════════ BASIC USAGE ════════════ -->
		<!--
			Single-key + combination side-by-side so the consumer sees
			both modes at a glance. Same rendering shape (key surface)
			is shared between the standalone <kbd> and each child
			<kbd class="origam-kbd__key"> inside a combination.
		-->
		<Variant title="Basic usage">
			<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
				<div style="display: flex; align-items: center; gap: 12px;">
					<span>Single key:</span>
					<origam-kbd text="⌘" data-cy="kbd-basic-single"/>
				</div>
				<div style="display: flex; align-items: center; gap: 12px;">
					<span>Combination:</span>
					<origam-kbd :combination="['Ctrl', 'Shift', 'Z']" data-cy="kbd-basic-combination"/>
				</div>
			</div>
		</Variant>

		<!-- ════════════ SHOWCASE ════════════ -->
		<!--
			Real-world keyboard shortcuts, mirroring the reference
			design the user shared (Save / Search / Undo). Demonstrates
			how Kbd reads in the context it's actually used in: an
			inline help text or tooltip body.
		-->
		<Variant title="Showcase — Keyboard shortcuts">
			<div style="display: flex; flex-direction: column; gap: 12px; padding: 16px; max-width: 480px; font-size: 14px; line-height: 1.6;">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="min-width: 80px;">Save:</span>
					<origam-kbd :combination="['⌘', 'S']" data-cy="kbd-showcase-save"/>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="min-width: 80px;">Search:</span>
					<origam-kbd :combination="['⌘', 'K']" data-cy="kbd-showcase-search"/>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="min-width: 80px;">Undo:</span>
					<origam-kbd :combination="['Ctrl', 'Shift', 'Z']" data-cy="kbd-showcase-undo"/>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="min-width: 80px;">Inline:</span>
					<span>Use <origam-kbd text="color-mix()" variant="filled" data-cy="kbd-showcase-inline"/> for token interpolation.</span>
				</div>
			</div>
		</Variant>

		<!-- ════════════ VARIANT (HstSelect — canonical) ════════════ -->
		<!--
			Avatar / Btn / Card pattern: ONE interactive Variant with an
			HstSelect to switch between `outlined`, `filled`, `tonal`.
			Plus an inline showcase row at the bottom for visual
			comparison between all three values.
		-->
		<Variant
				title="Variant"
				:init-state="() => useStoryInitState<{ variant?: TKbdVariant }>({ variant: 'outlined' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-kbd
							:variant="state.variant"
							:combination="['⌘', 'S']"
							data-cy="kbd-variant-interactive"
					/>
					<div style="border-top: 1px dashed #ccc; padding-top: 12px; display: flex; align-items: center; gap: 16px;">
						<small>Showcase fixtures:</small>
						<origam-kbd :combination="['⌘', 'S']" variant="outlined" data-cy="kbd-variant-outlined"/>
						<origam-kbd :combination="['⌘', 'S']" variant="filled"   data-cy="kbd-variant-filled"/>
						<origam-kbd :combination="['⌘', 'S']" variant="tonal"    data-cy="kbd-variant-tonal"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.variant" title="variant" :options="kbdVariantList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (IColorProps) ════════════ -->
		<!--
			ONE variant per IColorProps interface — 6 controls + 3
			showcase fixtures (color-only / bg-only / combo). Same
			pattern Btn / Pagination / Card use.
		-->
		<Variant
				title="Color"
				:init-state="() => useStoryInitState<IColorProps>({ color: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 24px; padding: 16px;">
					<origam-kbd v-bind="state" :combination="['⌘', 'K']" data-cy="kbd-color"/>

					<div style="border-top: 1px dashed #ccc; padding-top: 16px; display: flex; flex-direction: column; gap: 12px;">
						<small>Showcase fixtures — channel separation:</small>
						<origam-kbd :combination="['⌘', 'K']" color="primary" data-cy="kbd-color-fixture-color-only"/>
						<origam-kbd :combination="['⌘', 'K']" bg-color="success" data-cy="kbd-color-fixture-bg-only"/>
						<origam-kbd
								:combination="['⌘', 'K']"
								color="warning" bg-color="primary"
								hover-color="info" hover-bg-color="info"
								active-color="danger" active-bg-color="danger"
								data-cy="kbd-color-fixture-combo"
						/>
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

		<!-- ════════════ SIZE (HstSelect — canonical) ════════════ -->
		<Variant
				title="Size"
				:init-state="() => useStoryInitState<ISizeProps>({ size: 'default' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px; padding: 16px;">
					<origam-kbd :combination="['⌘', 'S']" :size="state.size" data-cy="kbd-size-interactive"/>
					<div style="border-top: 1px dashed #ccc; padding-top: 12px; display: flex; align-items: center; gap: 16px;">
						<small>All sizes:</small>
						<origam-kbd :combination="['⌘', 'S']" size="x-small" data-cy="kbd-size-xs"/>
						<origam-kbd :combination="['⌘', 'S']" size="small"   data-cy="kbd-size-sm"/>
						<origam-kbd :combination="['⌘', 'S']" size="default" data-cy="kbd-size-md"/>
						<origam-kbd :combination="['⌘', 'S']" size="large"   data-cy="kbd-size-lg"/>
						<origam-kbd :combination="['⌘', 'S']" size="x-large" data-cy="kbd-size-xl"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: 'default' })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
					<origam-kbd :combination="['⌘', 'S']" :rounded="state.rounded" data-cy="kbd-rounded"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ BORDER ════════════ -->
		<Variant
				title="Border"
				:init-state="() => useStoryInitState<IBorderProps>({ border: true })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
					<origam-kbd :combination="['⌘', 'S']" :border="state.border" data-cy="kbd-border"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.border" title="border"/>
			</template>
		</Variant>

		<!-- ════════════ SEPARATOR ════════════ -->
		<Variant
				title="Separator"
				:init-state="() => useStoryInitState<{ separator: string }>({ separator: '+' })"
		>
			<template #default="{ state }">
				<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
					<origam-kbd
							:combination="['Ctrl', 'Shift', 'Z']"
							:separator="state.separator"
							data-cy="kbd-separator"
					/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.separator" title="separator"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT — default ════════════ -->
		<Variant title="Slot — default">
			<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
				<origam-kbd data-cy="kbd-slot-default">
					<origam-icon :icon="MDI_ICONS.APPLE_KEYBOARD_COMMAND" size="x-small"/>
				</origam-kbd>
				<span>Pure icon as child slot.</span>
			</div>
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
				<div style="padding: 16px;">
					<origam-kbd v-bind="state" data-cy="kbd-playground"/>
				</div>
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
	import type {
		IBorderProps,
		IColorProps,
		IKbdProps,
		IOptions,
		IRoundedProps,
		ISizeProps,
	} from '@origam/interfaces'
	import type { TKbdVariant } from '@origam/types'

	import { intentList, roundedList, sizeList } from '@stories/const'
	import { useStoryInitState } from '@stories/composables'

	const kbdVariantList: Array<IOptions<TKbdVariant | undefined>> = [
		{ label: 'outlined', value: 'outlined' },
		{ label: 'filled',   value: 'filled' },
		{ label: 'tonal',    value: 'tonal' },
	]
</script>

<docs lang="md" src="@docs/components/Kbd/OrigamKbd.md"/>
