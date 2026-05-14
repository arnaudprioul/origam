<template>
	<Story
			group="components"
			title="Avatar/OrigamAvatar"
	>
		<!--
			Playground — first by convention. Exposes every IAvatarProps knob.
		-->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IAvatarProps>({
					text: 'AP',
					size: 'default',
					density: undefined,
					rounded: undefined,
					border: false,
					elevation: undefined,
					bgColor: 'primary'
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
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
				<HstSelect   v-model="state.elevation" title="elevation" :options="elevationList"/>
				<HstSelect   v-model="state.bgColor"   title="bgColor"   :options="intentList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────── -->

		<Variant
				title="Prop — content (text · image · icon)"
				:init-state="() => useStoryInitState<{ text: string, image: string, icon: string }>({
					text: 'AP',
					image: 'https://i.pravatar.cc/120?img=12',
					icon: MDI_ICONS.ACCOUNT
				})"
		>
			<!--
				The three ways to fill an Avatar — text initials,
				remote image, or icon glyph. The default image is a
				public placeholder from pravatar.cc; the icon defaults
				to mdi-account.
			-->
			<template #default="{ state }">
				<div style="display: flex; gap: 16px; align-items: center;">
					<origam-avatar :text="state.text" bg-color="primary"/>
					<origam-avatar :image="state.image"/>
					<origam-avatar :icon="state.icon" bg-color="primary"/>
				</div>
			</template>
			<template #controls="{ state }">
				<HstText   v-model="state.text"  title="text"/>
				<HstText   v-model="state.image" title="image (URL)"/>
				<HstSelect v-model="state.icon"  title="icon" :options="iconList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — size"
				:init-state="() => useStoryInitState<ISizeProps>({})"
		>
			<template #default="{ state }">
				<origam-avatar :size="state.size" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.size" title="size" :options="sizeList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — color & bgColor"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<origam-avatar v-bind="state" text="A" data-cy="avatar-color"/>
					<div style="display: flex; gap: 12px;">
						<origam-avatar bg-color="primary" text="P"/>
						<origam-avatar bg-color="success" text="S"/>
						<origam-avatar bg-color="warning" text="W"/>
						<origam-avatar bg-color="danger"  text="D"/>
					</div>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — hover"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<!--
					Hover the avatar to see the override applied. The
					base state is primary; the hover controls pick the
					intent that paints the surface + text on hover.
				-->
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<origam-avatar v-bind="state" text="A" data-cy="avatar-hover"/>
					<p style="font: 0.8rem/1.4 system-ui; color: var(--origam-color__text---secondary);">
						Hover the avatar above.
					</p>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state.hover"
							:options="hoverList"
							title="hover"
							@update:model-value="(v) => { if (v && typeof v === 'object') { if (!state.hover || typeof state.hover !== 'object') state.hover = {}; const t = state.hover; for (const k of Object.keys(t)) delete t[k]; Object.assign(t, v) } else { state.hover = v } }"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — active"
				:init-state="() => useStoryInitState<IColorProps>({ bgColor: 'primary' })"
		>
			<template #default="{ state }">
				<!--
					Press and hold to see the active override. The base
					state is primary; the active controls pick the
					intent shown while the avatar is being pressed.
				-->
				<div style="display: flex; flex-direction: column; gap: 16px;">
					<origam-avatar v-bind="state" text="A" data-cy="avatar-active"/>
					<p style="font: 0.8rem/1.4 system-ui; color: var(--origam-color__text---secondary);">
						Press &amp; hold the avatar above.
					</p>
				</div>
			</template>
			<template #controls="{ state }">
							<HstSelect
							:model-value="state.active"
							:options="activeList"
							title="active"
							@update:model-value="(v) => { if (v && typeof v === 'object') { if (!state.active || typeof state.active !== 'object') state.active = {}; const t = state.active; for (const k of Object.keys(t)) delete t[k]; Object.assign(t, v) } else { state.active = v } }"
						/>
</template>
		</Variant>

		<Variant
				title="Prop — rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: undefined })"
		>
			<template #default="{ state }">
				<div style="display: flex; gap: 12px; align-items: center;">
					<origam-avatar :rounded="state.rounded"      text="AP" data-cy="avatar-rounded"/>
					<origam-avatar rounded="shaped"              text="S"  data-cy="avatar-rounded-shaped"/>
					<origam-avatar rounded="shaped-invert"       text="SI" data-cy="avatar-rounded-shaped-invert"/>
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
				<origam-avatar :elevation="state.elevation" text="AP" bg-color="primary"/>
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
				<origam-avatar :border="state.border" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect   v-model="state.border"      title="border"      :options="borderList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — density"
				:init-state="() => useStoryInitState<IDensityProps>({})"
		>
			<template #default="{ state }">
				<origam-avatar :density="state.density" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.density" title="density" :options="densityList"/>
			</template>
		</Variant>

		<Variant
				title="Prop — tag"
				:init-state="() => useStoryInitState<{ tag?: string }>({ tag: 'div' })"
		>
			<template #default="{ state }">
				<origam-avatar :tag="state.tag" text="AP"/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.tag" title="tag" :options="tagList"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────── -->

		<Variant title="Slot — text">
			<origam-avatar text="AP">
				<template #text>
					<span style="font-style: italic;">Custom</span>
				</template>
			</origam-avatar>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────── -->

		<Variant title="Emit — update:active / update:hover">
			<div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
				<origam-avatar
						tag="button"
						text="AP"
						bg-color="primary"
						@update:active="logEvent('update:active', $event)"
						@update:hover="logEvent('update:hover', $event)"
				/>
				<p style="font: 0.8rem/1.4 system-ui; color: var(--origam-color__text---secondary);">Click or hover — watch the Events panel.</p>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamAvatar } from '@origam/components'
	import { MDI_ICONS } from '@origam/enums'
	import type {
		IAvatarProps,
		IColorProps,
		IDensityProps,
		IRoundedProps,
		ISizeProps
	} from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import {
		activeList,
		borderList,
		densityList,
		elevationList,
		hoverList,
		iconList,
		intentList,
		roundedList,
		sizeList,
		tagList
	} from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Avatar/OrigamAvatar.md"/>
