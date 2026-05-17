<template>
	<Story
			group="components"
			title="Carousel/OrigamCarousel"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Default"
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
						data-cy="carousel-playground"
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

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant
				title="Prop — cycle (auto-play)"
				:init-state="() => useStoryInitState<{ cycle?: boolean; interval?: number }>({ cycle: true, interval: 2000 })"
		>
			<template #default="{ state }">
				<origam-carousel
						:cycle="state.cycle"
						:interval="state.interval"
						style="max-width: 600px"
						data-cy="carousel-cycle"
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

		<Variant
				title="Prop — hideDelimiters & progress"
				:init-state="() => useStoryInitState<{
					hideDelimiters?: boolean
					hideDelimiterBackground?: boolean
					progress?: boolean
				}>({ hideDelimiters: false, hideDelimiterBackground: false, progress: true })"
		>
			<template #default="{ state }">
				<origam-carousel
						:hide-delimiters="state.hideDelimiters"
						:hide-delimiter-background="state.hideDelimiterBackground"
						:progress="state.progress"
						:cycle="true"
						:interval="3000"
						style="max-width: 600px"
						data-cy="carousel-delimiters"
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

		<Variant
				title="Prop — height"
				:init-state="() => useStoryInitState<{ height?: number }>({ height: 300 })"
		>
			<template #default="{ state }">
				<origam-carousel :height="state.height" style="max-width: 600px" data-cy="carousel-height">
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

		<Variant
				title="Prop — multiple (selectedClass / mandatory / continuous)"
				:init-state="() => useStoryInitState<{ continuous?: boolean; showArrows?: boolean }>({ continuous: true, showArrows: true })"
		>
			<template #default="{ state }">
				<origam-carousel
						:continuous="state.continuous"
						:show-arrows="state.showArrows"
						style="max-width: 600px"
						data-cy="carousel-group-options"
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
				<HstCheckbox v-model="state.continuous"  title="continuous"/>
				<HstCheckbox v-model="state.showArrows"  title="showArrows"/>
			</template>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — additional">
			<origam-carousel style="max-width: 600px" data-cy="carousel-slot-additional">
				<origam-carousel-item v-for="(slide, i) in slides" :key="i">
					<div :style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }">
						{{ slide.label }}
					</div>
				</origam-carousel-item>
				<template #additional>
					<span>Custom slot content</span>
				</template>
			</origam-carousel>
		</Variant>

		<Variant title="Slot — arrows">
			<origam-carousel style="max-width: 600px" data-cy="carousel-slot-arrows">
				<origam-carousel-item v-for="(slide, i) in slides" :key="i">
					<div :style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }">
						{{ slide.label }}
					</div>
				</origam-carousel-item>
				<template #arrows>
					<span>Custom slot content</span>
				</template>
			</origam-carousel>
		</Variant>

		<Variant title="Slot — default">
			<origam-carousel style="max-width: 600px" data-cy="carousel-slot-default">
				<span>Custom slot content</span>
			</origam-carousel>
		</Variant>

		<Variant title="Slot — item (custom delimiter)">
			<!-- Replaces the dot-indicator with a custom numbered button per slide -->
			<origam-carousel style="max-width: 600px" data-cy="carousel-slot-item">
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

		<Variant title="Slot — next">
			<origam-carousel style="max-width: 600px" show-arrows data-cy="carousel-slot-next">
				<origam-carousel-item v-for="(slide, i) in slides" :key="i">
					<div :style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }">
						{{ slide.label }}
					</div>
				</origam-carousel-item>
				<template #next>
					<span>Custom slot content</span>
				</template>
			</origam-carousel>
		</Variant>

		<Variant title="Slot — prev">
			<origam-carousel style="max-width: 600px" show-arrows data-cy="carousel-slot-prev">
				<origam-carousel-item v-for="(slide, i) in slides" :key="i">
					<div :style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }">
						{{ slide.label }}
					</div>
				</origam-carousel-item>
				<template #prev>
					<span>Custom slot content</span>
				</template>
			</origam-carousel>
		</Variant>

		<Variant title="Slot — progress">
			<origam-carousel style="max-width: 600px" progress data-cy="carousel-slot-progress">
				<origam-carousel-item v-for="(slide, i) in slides" :key="i">
					<div :style="{ background: slide.color, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: 'white' }">
						{{ slide.label }}
					</div>
				</origam-carousel-item>
				<template #progress>
					<span>Custom slot content</span>
				</template>
			</origam-carousel>
		</Variant>

		<!-- ── Emits ────────────────────────────────────────────────────── -->

		<Variant
				title="Emit — update:modelValue"
				:init-state="() => useStoryInitState<{ log: string[] }>({ log: [] })"
		>
			<template #default="{ state }">
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<origam-carousel
							style="max-width: 600px"
							data-cy="carousel-emit"
							@update:model-value="(v: number) => {
								state.log = [`update:modelValue → ${v}`, ...state.log].slice(0, 6)
							}"
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
					<ul style="font-family: monospace; font-size: 0.8rem; margin: 0; padding-left: 16px;">
						<li v-for="(line, i) in state.log" :key="i">{{ line }}</li>
					</ul>
					<p v-if="state.log.length === 0" style="font-size: 0.8rem; color: var(--origam-color__text---secondary);">Navigate slides to see events.</p>
				</div>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
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
