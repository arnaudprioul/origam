<template>
    <Story
        auto-props-disabled
        group="components"
        title="Carousel/OrigamCarouselItem"
    >
        <Variant title="Default">
            <template #default>
                <div style="max-width: 600px; margin: 24px auto; height: 300px;">
                    <origam-carousel :model-value="0">
                        <origam-carousel-item
                            src="https://picsum.photos/seed/alpha/600/300"
                            alt="Sample image"
                            data-cy="carousel-item-default"
                        />
                        <origam-carousel-item
                            src="https://picsum.photos/seed/beta/600/300"
                            alt="Sample image 2"
                        />
                    </origam-carousel>
                </div>
            </template>
        </Variant>

        <Variant title="With Transition">
            <template #default="{ state }">
                <div style="max-width: 600px; margin: 24px auto; height: 300px;">
                    <origam-carousel :model-value="0">
                        <origam-carousel-item
                            src="https://picsum.photos/seed/gamma/600/300"
                            alt="First slide"
                            v-bind="state"
                            data-cy="carousel-item-transition"
                        />
                        <origam-carousel-item
                            src="https://picsum.photos/seed/delta/600/300"
                            alt="Second slide"
                        />
                    </origam-carousel>
                </div>
            </template>
            <template #controls="{ state }">
                <hst-select
                    v-model="state.transition"
                    :options="[
                        { value: true, label: 'Default' },
                        { value: 'fade', label: 'Fade' },
                        { value: 'slide-x-transition', label: 'Slide X' },
                        { value: 'slide-y-transition', label: 'Slide Y' }
                    ]"
                    title="Transition"
                />
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <div style="max-width: 600px; margin: 24px auto; height: 300px;">
                    <origam-carousel :model-value="0">
                        <origam-carousel-item
                            src="https://picsum.photos/seed/epsilon/600/300"
                            alt="Playground slide"
                            v-bind="state"
                            data-cy="carousel-item-playground"
                        />
                    </origam-carousel>
                </div>
            </template>
            <template #controls="{ state }">
                <hst-text v-model="state.alt" title="Alt text"/>
                <hst-checkbox v-model="state.disabled" title="Disabled"/>
                <hst-dimension
                    v-model:width="state.width"
                    v-model:height="state.height"
                    use-dimension
                />
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamCarousel, OrigamCarouselItem } from '@origam/components'
    import { HstDimension } from '@stories/components/controls'
</script>

<docs lang="md">
CarouselItem sub-component — a single slide inside an OrigamCarousel.
</docs>
