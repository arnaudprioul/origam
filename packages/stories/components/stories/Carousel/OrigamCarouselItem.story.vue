<template>
	<Story
			group="components"
			title="Carousel/OrigamCarouselItem"
	>
		<!-- ════════════════════════ DESIGN ════════════════════════ -->

		<Variant
				title="Design"
				:init-state="() => useStoryInitState<Partial<ICarouselItemProps>>({
					src: 'https://picsum.photos/seed/alpha/600/300',
					alt: 'Design slide',
					cover: true,
					position: 'center',
					gradient: undefined,
					aspectRatio: undefined,
					width: undefined,
					height: undefined,
					rounded: undefined,
					border: undefined,
					color: undefined,
					bgColor: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="max-width: 600px; margin: 24px auto; height: 300px;">
					<origam-carousel :model-value="0">
						<origam-carousel-item
								:src="state.src"
								:alt="state.alt"
								:cover="state.cover"
								:position="state.position"
								:gradient="state.gradient || undefined"
								:aspect-ratio="state.aspectRatio || undefined"
								:width="state.width || undefined"
								:height="state.height || undefined"
								:rounded="state.rounded"
								:border="state.border"
								:color="state.color"
								:bg-color="state.bgColor"
						/>
						<origam-carousel-item
								src="https://picsum.photos/seed/beta/600/300"
								alt="Second slide"
						/>
					</origam-carousel>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Image">
					<HstText     v-model="state.src"      title="Src"/>
					<HstText     v-model="state.alt"      title="Alt"/>
					<HstCheckbox v-model="state.cover"    title="Cover"/>
					<HstText     v-model="state.position" title="Position (CSS)"/>
					<HstText     v-model="state.gradient" title="Gradient"/>
				</StoryGroup>
				<StoryGroup title="Color">
					<HstSelect v-model="state.color"   title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect v-model="state.bgColor" title="Bg Color" :options="COLOR_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Shape">
					<HstSelect v-model="state.rounded" title="Rounded" :options="ROUNDED_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Border">
					<HstSelect v-model="state.border" title="Border" :options="BORDER_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Dimension">
					<HstText v-model="state.width"       title="Width"/>
					<HstText v-model="state.height"      title="Height"/>
					<HstText v-model="state.aspectRatio" title="Aspect Ratio"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ══════════════════════ FONCTIONNEL ══════════════════════ -->

		<Variant
				title="Functional"
				:init-state="() => useStoryInitState<Partial<ICarouselItemProps>>({
					src: 'https://picsum.photos/seed/gamma/600/300',
					alt: 'Functional slide',
					disabled: false,
					eager: false,
					draggable: undefined,
					transition: undefined,
					reverseTransition: undefined,
					value: undefined,
					selectedClass: undefined,
					lazySrc: undefined,
					crossorigin: undefined,
					referrerpolicy: undefined,
					srcset: undefined,
					sizes: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="max-width: 600px; margin: 24px auto; height: 300px;">
					<origam-carousel :model-value="0">
						<origam-carousel-item
								:src="state.src"
								:alt="state.alt"
								:disabled="state.disabled"
								:eager="state.eager"
								:draggable="state.draggable"
								:transition="state.transition"
								:reverse-transition="state.reverseTransition"
								:value="state.value || undefined"
								:selected-class="state.selectedClass || undefined"
								:lazy-src="state.lazySrc || undefined"
								:crossorigin="state.crossorigin"
								:referrerpolicy="state.referrerpolicy"
								:srcset="state.srcset || undefined"
								:sizes="state.sizes || undefined"
						/>
						<origam-carousel-item
								src="https://picsum.photos/seed/delta/600/300"
								alt="Second slide"
						/>
					</origam-carousel>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="States">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
					<HstCheckbox v-model="state.eager"    title="Eager (no lazy)"/>
				</StoryGroup>
				<StoryGroup title="Transition">
					<HstSelect v-model="state.transition"        title="Transition"         :options="TRANSITION_OPTIONS"/>
					<HstSelect v-model="state.reverseTransition" title="Reverse Transition" :options="TRANSITION_OPTIONS"/>
				</StoryGroup>
				<StoryGroup title="Image">
					<HstText v-model="state.lazySrc"  title="Lazy Src"/>
					<HstText v-model="state.srcset"   title="Srcset"/>
					<HstText v-model="state.sizes"    title="Sizes"/>
					<HstSelect v-model="state.crossorigin"   title="Crossorigin"   :options="CROSS_ORIGIN_OPTIONS"/>
					<HstSelect v-model="state.referrerpolicy" title="Referrer Policy" :options="REFERRER_POLICY_OPTIONS"/>
					<HstCheckbox v-model="state.draggable" title="Draggable"/>
				</StoryGroup>
				<StoryGroup title="Group">
					<HstText v-model="state.value"         title="Value (group)"/>
					<HstText v-model="state.selectedClass" title="Selected Class"/>
				</StoryGroup>
			</template>
		</Variant>

		<!-- ════════════════════════ SLOTS ════════════════════════ -->

		<Variant title="Slots - Default">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item>
						<div style="background: #1976d2; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; gap: 8px;">
							<strong>Custom Default Slot</strong>
							<span>Any content is valid inside a CarouselItem.</span>
						</div>
					</origam-carousel-item>
					<origam-carousel-item>
						<div style="background: #388e3c; height: 100%; display: flex; align-items: center; justify-content: center; color: white;">Slide 2</div>
					</origam-carousel-item>
				</origam-carousel>
			</div>
		</Variant>

		<Variant title="Slots - Content">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://picsum.photos/seed/zeta/600/300"
							alt="Content slot demo"
					>
						<template #content>
							<figcaption style="position: absolute; bottom: 16px; left: 16px; color: white; text-shadow: 0 1px 3px rgba(0,0,0,.6); margin: 0;">
								Custom #content slot overlay
							</figcaption>
						</template>
					</origam-carousel-item>
					<origam-carousel-item src="https://picsum.photos/seed/alpha/600/300" alt="Slide 2"/>
				</origam-carousel>
			</div>
		</Variant>

		<Variant title="Slots - Error">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://invalid.example.com/broken.jpg"
							alt="Broken image"
					>
						<template #error>
							<div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--origam-color__surface---overlay);">
								<span>Custom #error slot — image failed to load</span>
							</div>
						</template>
					</origam-carousel-item>
					<origam-carousel-item src="https://picsum.photos/seed/alpha/600/300" alt="Slide 2"/>
				</origam-carousel>
			</div>
		</Variant>

		<Variant title="Slots - Placeholder">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://picsum.photos/seed/delta/600/300"
							alt="Placeholder demo"
					>
						<template #placeholder>
							<div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--origam-color__surface---overlay);">
								<span>Custom #placeholder slot — shown while loading</span>
							</div>
						</template>
					</origam-carousel-item>
					<origam-carousel-item src="https://picsum.photos/seed/alpha/600/300" alt="Slide 2"/>
				</origam-carousel>
			</div>
		</Variant>

		<!-- ══════════════════════ PLAYGROUND ══════════════════════ -->

		<Variant
				title="Default"
				:init-state="() => useStoryInitState<Partial<ICarouselItemProps>>({
					src: 'https://picsum.photos/seed/epsilon/600/300',
					alt: 'Playground slide',
					disabled: false,
					transition: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="max-width: 600px; margin: 24px auto; height: 300px;">
					<origam-carousel :model-value="0">
						<origam-carousel-item
								v-bind="state"
								data-cy="carousel-item-playground"
						/>
						<origam-carousel-item
								src="https://picsum.photos/seed/alpha/600/300"
								alt="Second slide"
						/>
					</origam-carousel>
				</div>
			</template>
			<template #controls="{ state }">
				<StoryGroup title="Content">
					<HstText v-model="state.src" title="Src"/>
					<HstText v-model="state.alt" title="Alt"/>
				</StoryGroup>
				<StoryGroup title="Design">
					<HstSelect   v-model="state.rounded"  title="Rounded"  :options="ROUNDED_OPTIONS"/>
					<HstSelect   v-model="state.border"   title="Border"   :options="BORDER_OPTIONS"/>
					<HstSelect   v-model="state.color"    title="Color"    :options="COLOR_OPTIONS"/>
					<HstSelect   v-model="state.bgColor"  title="Bg Color" :options="COLOR_OPTIONS"/>
					<HstCheckbox v-model="state.cover"    title="Cover"/>
				</StoryGroup>
				<StoryGroup title="Functional">
					<HstCheckbox v-model="state.disabled" title="Disabled"/>
					<HstCheckbox v-model="state.eager"    title="Eager"/>
					<HstSelect   v-model="state.transition" title="Transition" :options="TRANSITION_OPTIONS"/>
				</StoryGroup>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamCarousel, OrigamCarouselItem } from '@origam/components'
	import { CROSS_ORIGIN, REFERRER_POLICY } from '@origam/enums'
	import type { ICarouselItemProps } from '@origam/interfaces'

	import StoryGroup from '@stories/components/_shared/StoryGroup.vue'
	import { useStoryInitState } from '@stories/composables'
	import {
		BORDER_OPTIONS,
		COLOR_OPTIONS,
		ROUNDED_OPTIONS
	} from '@stories/const'

	const TRANSITION_OPTIONS = [
		{ value: undefined,                        label: '(default)' },
		{ value: false,                             label: 'false (no transition)' },
		{ value: 'origam-fade-transition',          label: 'fade' },
		{ value: 'origam-scale-rotate-transition',  label: 'scale-rotate' },
	]

	const CROSS_ORIGIN_OPTIONS = [
		{ value: undefined,                          label: '(none)' },
		{ value: CROSS_ORIGIN.ANONYMOUS,             label: 'anonymous' },
		{ value: CROSS_ORIGIN.USE_CREDENTIALS,       label: 'use-credentials' },
	]

	const REFERRER_POLICY_OPTIONS = [
		{ value: undefined,                                              label: '(none)' },
		{ value: REFERRER_POLICY.NO_REFERRER,                           label: 'no-referrer' },
		{ value: REFERRER_POLICY.NO_REFERRER_WHEN_DOWNGRADE,            label: 'no-referrer-when-downgrade' },
		{ value: REFERRER_POLICY.ORIGIN,                                label: 'origin' },
		{ value: REFERRER_POLICY.ORIGIN_WHEN_CROSS_ORIGIN,              label: 'origin-when-cross-origin' },
		{ value: REFERRER_POLICY.SAME_ORIGIN,                           label: 'same-origin' },
		{ value: REFERRER_POLICY.STRICT_ORIGIN,                         label: 'strict-origin' },
		{ value: REFERRER_POLICY.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,       label: 'strict-origin-when-cross-origin' },
		{ value: REFERRER_POLICY.UNSAFE_URL,                            label: 'unsafe-url' },
	]
</script>

<docs lang="md" src="@docs/components/Carousel/OrigamCarouselItem.md"/>
