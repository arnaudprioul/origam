<template>
	<Story
			group="components"
			title="Img/OrigamImg"
	>
		<!-- ════════════ BASIC USAGE ════════════ -->
		<Variant title="Basic usage">
			<origam-img
					:aspect-ratio="16 / 9"
					alt="Demo image"
					src="https://picsum.photos/seed/origam-img-basic/640/360"
					style="width: 320px;"
			/>
		</Variant>

		<!-- ════════════ COVER / CONTAIN ════════════ -->
		<Variant
				title="Cover"
				:init-state="() => useStoryInitState<{ cover?: boolean, position?: string }>({ cover: false })"
		>
			<template #default="{ state }">
				<origam-img
						:aspect-ratio="1"
						:cover="state.cover"
						:position="state.position"
						alt="Cover demo"
						src="https://picsum.photos/seed/origam-img-cover/640/360"
						style="width: 240px;"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.cover" title="cover (object-fit: cover)"/>
				<HstText     v-model="state.position" title="object-position (e.g. 'center top')"/>
			</template>
		</Variant>

		<!-- ════════════ ASPECT RATIO ════════════ -->
		<Variant
				title="Aspect ratio"
				:init-state="() => useStoryInitState<{ aspectRatio?: number }>({ aspectRatio: 16 / 9 })"
		>
			<template #default="{ state }">
				<origam-img
						:aspect-ratio="state.aspectRatio"
						alt="Aspect ratio demo"
						cover
						src="https://picsum.photos/seed/origam-img-ar/640/360"
						style="width: 320px;"
				/>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.aspectRatio" title="aspectRatio (number)" :step="0.1"/>
			</template>
		</Variant>

		<!-- ════════════ LAZY-SRC ════════════ -->
		<Variant title="Lazy src (preload blur)">
			<origam-img
					:aspect-ratio="16 / 9"
					alt="Lazy demo"
					cover
					eager
					lazy-src="https://picsum.photos/seed/origam-img-lazy/40/22"
					src="https://picsum.photos/seed/origam-img-lazy/1600/900"
					style="width: 320px;"
			/>
		</Variant>

		<!-- ════════════ EAGER ════════════ -->
		<Variant
				title="Eager"
				:init-state="() => useStoryInitState<{ eager?: boolean }>({ eager: true })"
		>
			<template #default="{ state }">
				<origam-img
						:aspect-ratio="16 / 9"
						:eager="state.eager"
						alt="Eager demo"
						cover
						src="https://picsum.photos/seed/origam-img-eager/640/360"
						style="width: 320px;"
				/>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.eager" title="eager (skip IntersectionObserver)"/>
			</template>
		</Variant>

		<!-- ════════════ GRADIENT ════════════ -->
		<Variant
				title="Gradient"
				:init-state="() => useStoryInitState<{ gradient?: string }>({
					gradient: 'to bottom, transparent 40%, rgba(0,0,0,0.6) 100%'
				})"
		>
			<template #default="{ state }">
				<origam-img
						:aspect-ratio="16 / 9"
						:gradient="state.gradient"
						alt="Gradient demo"
						cover
						src="https://picsum.photos/seed/origam-img-grad/640/360"
						style="width: 320px;"
				/>
			</template>
			<template #controls="{ state }">
				<HstText v-model="state.gradient" title="gradient (CSS linear-gradient args)"/>
			</template>
		</Variant>

		<!-- ════════════ ROUNDED ════════════ -->
		<Variant
				title="Rounded"
				:init-state="() => useStoryInitState<IRoundedProps>({ rounded: 'default' })"
		>
			<template #default="{ state }">
				<origam-img
						:aspect-ratio="1"
						:rounded="state.rounded"
						alt="Rounded demo"
						cover
						src="https://picsum.photos/seed/origam-img-rounded/640/640"
						style="width: 240px;"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.rounded" title="rounded" :options="roundedList"/>
			</template>
		</Variant>

		<!-- ════════════ COLOR (intent) ════════════ -->
		<Variant
				title="Color (intent)"
				:init-state="() => useStoryInitState<IColorProps>({})"
		>
			<template #default="{ state }">
				<origam-img
						:aspect-ratio="16 / 9"
						alt="Color demo"
						cover
						src="https://picsum.photos/seed/origam-img-color/640/360"
						style="width: 320px;"
						v-bind="state"
				/>
			</template>
			<template #controls="{ state }">
				<HstSelect v-model="state.color"   title="color"   :options="intentList"/>
				<HstSelect v-model="state.bgColor" title="bgColor" :options="intentList"/>
			</template>
		</Variant>

		<!-- ════════════ ERROR (broken src) ════════════ -->
		<Variant title="Error state (broken src)">
			<origam-img
					:aspect-ratio="16 / 9"
					alt="Broken image"
					eager
					src="https://this-host-does-not-exist.invalid/broken.png"
					style="width: 320px; background: var(--origam-color-surface-overlay, #f3f4f6);"
			>
				<template #error>
					<div style="display:flex; align-items:center; justify-content:center;
					            width:100%; height:100%;
					            color: var(--origam-color-feedback-danger-fg, #b91c1c);">
						Failed to load image
					</div>
				</template>
			</origam-img>
		</Variant>

		<!-- ════════════ SLOT: placeholder ════════════ -->
		<Variant title="Slot — placeholder">
			<origam-img
					:aspect-ratio="16 / 9"
					alt="Placeholder demo"
					eager
					src="https://picsum.photos/seed/origam-img-placeholder/1600/900"
					style="width: 320px;"
			>
				<template #placeholder>
					<div style="display:flex; align-items:center; justify-content:center;
					            width:100%; height:100%;
					            color: var(--origam-color-text-secondary, #4b5563);
					            background: var(--origam-color-surface-overlay, #f3f4f6);">
						Loading…
					</div>
				</template>
			</origam-img>
		</Variant>

		<!-- ════════════ SLOT: default (overlay) ════════════ -->
		<Variant title="Slot — default (overlay)">
			<origam-img
					:aspect-ratio="16 / 9"
					alt="Overlay demo"
					cover
					src="https://picsum.photos/seed/origam-img-default/640/360"
					style="width: 320px;"
			>
				<div style="display:flex; align-items:flex-end; height:100%;
				            padding:12px;
				            color: white;
				            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.4));">
					Caption
				</div>
			</origam-img>
		</Variant>

		<!-- ════════════ EMIT: @load ════════════ -->
		<Variant title="Emit — load">
			<origam-img
					:aspect-ratio="16 / 9"
					alt="Load emit demo"
					cover
					eager
					src="https://picsum.photos/seed/origam-img-load-emit/640/360"
					style="width: 320px;"
					@load="logEvent('load', $event)"
					@loadstart="logEvent('loadstart', $event)"
					@error="logEvent('error', $event)"
			/>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<IImgProps & { width?: string }>({
					src: 'https://picsum.photos/seed/origam-img-playground/640/360',
					alt: 'Playground',
					aspectRatio: 16 / 9,
					cover: true,
					eager: true,
					rounded: undefined,
					gradient: undefined
				})"
		>
			<template #default="{ state }">
				<origam-img v-bind="state" style="width: 320px;"/>
			</template>
			<template #controls="{ state }">
				<HstText     v-model="state.src"          title="src"/>
				<HstText     v-model="state.alt"          title="alt"/>
				<HstNumber   v-model="state.aspectRatio"  title="aspectRatio" :step="0.1"/>
				<HstCheckbox v-model="state.cover"        title="cover"/>
				<HstCheckbox v-model="state.eager"        title="eager"/>
				<HstSelect   v-model="state.rounded"      title="rounded" :options="roundedList"/>
				<HstText     v-model="state.gradient"     title="gradient"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamImg } from '@origam/components'
	import type { IColorProps, IImgProps, IRoundedProps } from '@origam/interfaces'

	import { useStoryInitState } from '@stories/composables'
	import { intentList, roundedList } from '@stories/const'
</script>

<docs lang="md" src="@docs/components/Img/OrigamImg.md"/>
