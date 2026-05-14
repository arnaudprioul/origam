<template>
	<Story
			group="components"
			title="Carousel/OrigamCarouselItem"
	>
		<!-- ── Playground ───────────────────────────────────────────────── -->

		<Variant
				title="Playground"
				:init-state="() => useStoryInitState<{ alt: string; disabled?: boolean; transition: string | boolean | undefined }>({
					alt: 'Playground slide',
					disabled: false,
					transition: undefined,
				})"
		>
			<template #default="{ state }">
				<div style="max-width: 600px; margin: 24px auto; height: 300px;">
					<origam-carousel :model-value="0">
						<origam-carousel-item
								src="https://picsum.photos/seed/epsilon/600/300"
								:alt="state.alt"
								:disabled="state.disabled"
								:transition="state.transition"
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
				<HstText     v-model="state.alt"      title="alt"/>
				<HstCheckbox v-model="state.disabled" title="disabled"/>
				<HstSelect   v-model="state.transition" title="transition" :options="transitionList"/>
			</template>
		</Variant>

		<!-- ── Props ────────────────────────────────────────────────────── -->

		<Variant title="Prop — src (image slide)">
			<!-- Standard image slide rendered from src prop -->
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://picsum.photos/seed/alpha/600/300"
							alt="Sample image"
							data-cy="carousel-item-src"
					/>
					<origam-carousel-item
							src="https://picsum.photos/seed/beta/600/300"
							alt="Sample image 2"
					/>
				</origam-carousel>
			</div>
		</Variant>

		<Variant
				title="Prop — transition"
				:init-state="() => useStoryInitState<{ transition: string | boolean | undefined }>({ transition: undefined })"
		>
			<template #default="{ state }">
				<div style="max-width: 600px; margin: 24px auto; height: 300px;">
					<origam-carousel :model-value="0">
						<origam-carousel-item
								src="https://picsum.photos/seed/gamma/600/300"
								alt="First slide"
								:transition="state.transition"
								data-cy="carousel-item-transition"
						/>
						<origam-carousel-item
								src="https://picsum.photos/seed/delta/600/300"
								alt="Second slide"
								:transition="state.transition"
						/>
					</origam-carousel>
				</div>
			</template>
			<template #controls="{ state }">
				<HstSelect
						v-model="state.transition"
						title="transition"
						:options="transitionList"
				/>
			</template>
		</Variant>

		<Variant title="Prop — disabled">
			<!-- The second item is locked; navigating skips it -->
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://picsum.photos/seed/alpha/600/300"
							alt="Enabled"
							data-cy="carousel-item-disabled-1"
					/>
					<origam-carousel-item
							src="https://picsum.photos/seed/beta/600/300"
							alt="Disabled"
							disabled
							data-cy="carousel-item-disabled-2"
					/>
					<origam-carousel-item
							src="https://picsum.photos/seed/gamma/600/300"
							alt="Enabled again"
							data-cy="carousel-item-disabled-3"
					/>
				</origam-carousel>
			</div>
		</Variant>

		<!-- ── Slots ────────────────────────────────────────────────────── -->

		<Variant title="Slot — content">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://picsum.photos/seed/zeta/600/300"
							alt="Content slot"
							data-cy="carousel-item-slot-content"
					>
						<template #content>
							<div style="position: absolute; bottom: 16px; left: 16px; color: white; text-shadow: 0 1px 3px rgba(0,0,0,.6);">
								<span>Custom slot content</span>
							</div>
						</template>
					</origam-carousel-item>
					<origam-carousel-item src="https://picsum.photos/seed/alpha/600/300" alt="Slide 2"/>
				</origam-carousel>
			</div>
		</Variant>

		<Variant title="Slot — default (custom content)">
			<!-- CarouselItem accepts any default slot content — not just images -->
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item data-cy="carousel-item-slot-default">
						<template #default>
							<div style="background: #1976d2; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: white; gap: 8px;">
								<p style="font-size: 1.5rem; font-weight: 600; margin: 0;">Custom Slot</p>
								<p style="font-size: 0.875rem; margin: 0; opacity: 0.8;">Any content is valid inside a CarouselItem.</p>
							</div>
						</template>
					</origam-carousel-item>
					<origam-carousel-item>
						<div style="background: #388e3c; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">Slide 2</div>
					</origam-carousel-item>
				</origam-carousel>
			</div>
		</Variant>

		<Variant title="Slot — error">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://invalid.example.com/broken.jpg"
							alt="Broken image"
							data-cy="carousel-item-slot-error"
					>
						<template #error>
							<div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--origam-color__surface---overlay);">
								<span>Custom slot content</span>
							</div>
						</template>
					</origam-carousel-item>
					<origam-carousel-item src="https://picsum.photos/seed/alpha/600/300" alt="Slide 2"/>
				</origam-carousel>
			</div>
		</Variant>

		<Variant title="Slot — placeholder">
			<div style="max-width: 600px; margin: 24px auto; height: 300px;">
				<origam-carousel :model-value="0">
					<origam-carousel-item
							src="https://picsum.photos/seed/delta/600/300"
							alt="Placeholder demo"
							data-cy="carousel-item-slot-placeholder"
					>
						<template #placeholder>
							<div style="height: 100%; display: flex; align-items: center; justify-content: center; background: var(--origam-color__surface---overlay);">
								<span>Custom slot content</span>
							</div>
						</template>
					</origam-carousel-item>
					<origam-carousel-item src="https://picsum.photos/seed/alpha/600/300" alt="Slide 2"/>
				</origam-carousel>
			</div>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import type { IOptions } from '@origam/interfaces'

	import { OrigamCarousel, OrigamCarouselItem } from '@origam/components'

	import { useStoryInitState } from '@stories/composables'

	const transitionList: Array<IOptions<string | boolean | undefined>> = [
		{ value: undefined,                        label: '(default)' },
		{ value: false,                            label: 'false (no transition)' },
		{ value: 'origam-fade-transition',         label: 'fade' },
		{ value: 'origam-scale-rotate-transition', label: 'scale-rotate' },
	]
</script>

<docs lang="md" src="@docs/components/Carousel/OrigamCarouselItem.md"/>
