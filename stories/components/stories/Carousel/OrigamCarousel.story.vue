<template>
	<Story
			group="components"
			title="Carousel/OrigamCarousel"
	>

		<!-- ════════════ BASIC ════════════ -->
		<Variant title="Basic">
			<origam-carousel style="max-width: 600px">
				<origam-carousel-item
						v-for="(slide, i) in slides"
						:key="i"
				>
					<div
							:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
					>
						{{ slide.label }}
					</div>
				</origam-carousel-item>
			</origam-carousel>
		</Variant>

		<!-- ════════════ AUTO-PLAY (cycle) ════════════ -->
		<Variant
				title="Auto-play"
				:init-state="() => useStoryInitState<{ cycle?: boolean; interval?: number }>({ cycle: false, interval: 3000 })"
		>
			<template #default="{ state }">
				<origam-carousel
						:cycle="state.cycle"
						:interval="state.interval"
						style="max-width: 600px"
				>
					<origam-carousel-item
							v-for="(slide, i) in slides"
							:key="i"
					>
						<div
								:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
						>
							{{ slide.label }}
						</div>
					</origam-carousel-item>
				</origam-carousel>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.cycle"    title="cycle"/>
				<HstNumber   v-model="state.interval" title="interval (ms)" :min="500" :max="10000"/>
			</template>
		</Variant>

		<!-- ════════════ DELIMITERS ════════════ -->
		<Variant
				title="Delimiters"
				:init-state="() => useStoryInitState<{
					hideDelimiters?: boolean
					hideDelimiterBackground?: boolean
					progress?: boolean
				}>({ hideDelimiters: false, hideDelimiterBackground: false, progress: false })"
		>
			<template #default="{ state }">
				<origam-carousel
						:hide-delimiters="state.hideDelimiters"
						:hide-delimiter-background="state.hideDelimiterBackground"
						:progress="state.progress"
						style="max-width: 600px"
				>
					<origam-carousel-item
							v-for="(slide, i) in slides"
							:key="i"
					>
						<div
								:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
						>
							{{ slide.label }}
						</div>
					</origam-carousel-item>
				</origam-carousel>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.hideDelimiters"           title="hideDelimiters"/>
				<HstCheckbox v-model="state.hideDelimiterBackground"  title="hideDelimiterBackground"/>
				<HstCheckbox v-model="state.progress"                 title="progress"/>
			</template>
		</Variant>

		<!-- ════════════ HEIGHT ════════════ -->
		<Variant
				title="Height"
				:init-state="() => useStoryInitState<{ height?: number }>({ height: 300 })"
		>
			<template #default="{ state }">
				<origam-carousel :height="state.height" style="max-width: 600px">
					<origam-carousel-item
							v-for="(slide, i) in slides"
							:key="i"
					>
						<div
								:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
						>
							{{ slide.label }}
						</div>
					</origam-carousel-item>
				</origam-carousel>
			</template>
			<template #controls="{ state }">
				<HstNumber v-model="state.height" title="height (px)" :min="100" :max="600"/>
			</template>
		</Variant>

		<!-- ════════════ SLOT: item (custom delimiter) ════════════ -->
		<Variant title="Slot — item (custom delimiter)">
			<origam-carousel style="max-width: 600px">
				<origam-carousel-item
						v-for="(slide, i) in slides"
						:key="i"
				>
					<div
							:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
					>
						{{ slide.label }}
					</div>
				</origam-carousel-item>
				<template #item="{ props, index }">
					<origam-btn v-bind="props" :text="String(index + 1)" size="x-small"/>
				</template>
			</origam-carousel>
		</Variant>

		<!-- ════════════ EMIT: update:modelValue ════════════ -->
		<Variant title="Emit — update:modelValue">
			<origam-carousel
					style="max-width: 600px"
					@update:model-value="logEvent('update:modelValue', $event)"
			>
				<origam-carousel-item
						v-for="(slide, i) in slides"
						:key="i"
				>
					<div
							:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
					>
						{{ slide.label }}
					</div>
				</origam-carousel-item>
			</origam-carousel>
		</Variant>

		<!-- ════════════ PLAYGROUND ════════════ -->
		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{
					cycle?: boolean
					interval?: number
					height?: number
					hideDelimiters?: boolean
					hideDelimiterBackground?: boolean
					progress?: boolean
					showArrows?: boolean
					continuous?: boolean
				}>({
					cycle: false,
					interval: 6000,
					height: 300,
					hideDelimiters: false,
					hideDelimiterBackground: false,
					progress: false,
					showArrows: true,
					continuous: true
				})"
		>
			<template #default="{ state }">
				<origam-carousel
						v-bind="state"
						style="max-width: 600px"
				>
					<origam-carousel-item
							v-for="(slide, i) in slides"
							:key="i"
					>
						<div
								:style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }"
						>
							{{ slide.label }}
						</div>
					</origam-carousel-item>
				</origam-carousel>
			</template>
			<template #controls="{ state }">
				<HstCheckbox v-model="state.cycle"                   title="cycle"/>
				<HstNumber   v-model="state.interval"                title="interval (ms)" :min="500"/>
				<HstNumber   v-model="state.height"                  title="height (px)" :min="100"/>
				<HstCheckbox v-model="state.hideDelimiters"          title="hideDelimiters"/>
				<HstCheckbox v-model="state.hideDelimiterBackground" title="hideDelimiterBackground"/>
				<HstCheckbox v-model="state.progress"                title="progress"/>
				<HstCheckbox v-model="state.showArrows"              title="showArrows"/>
				<HstCheckbox v-model="state.continuous"              title="continuous"/>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { logEvent } from 'histoire/client'

	import { OrigamBtn, OrigamCarousel, OrigamCarouselItem } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const slides = [
		{ label: 'Slide 1', color: '#1976d2' },
		{ label: 'Slide 2', color: '#388e3c' },
		{ label: 'Slide 3', color: '#d32f2f' },
		{ label: 'Slide 4', color: '#f57c00' },
	]
</script>

<docs lang="md" src="@docs/components/Carousel/OrigamCarousel.md"/>
