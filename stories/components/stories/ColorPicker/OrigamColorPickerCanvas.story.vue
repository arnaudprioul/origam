<template>
    <Story
        auto-props-disabled
        group="components"
        title="ColorPicker/OrigamColorPickerCanvas"
    >
        <Variant title="Default">
            <template #default>
                <div style="padding: 24px; display: flex; justify-content: center;">
                    <origam-color-picker-canvas
                        :color-hsv="defaultColor"
                        data-cy="color-picker-canvas-default"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Disabled">
            <template #default>
                <div style="padding: 24px; display: flex; justify-content: center;">
                    <origam-color-picker-canvas
                        :color-hsv="defaultColor"
                        :disabled="true"
                        data-cy="color-picker-canvas-disabled"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <div style="padding: 24px; display: flex; justify-content: center;">
                    <origam-color-picker-canvas
                        v-bind="state"
                        :color-hsv="defaultColor"
                        data-cy="color-picker-canvas-playground"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-checkbox v-model="state.disabled" title="Disabled"/>
                <hst-slider v-model="state.dotSize" title="Dot Size" :min="4" :max="20"/>
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
    import { OrigamColorPickerCanvas } from '@origam/components'
    import { HstDimension } from '@stories/components/controls'

    const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 1 }
</script>

<docs lang="md">
ColorPickerCanvas sub-component — the 2-D HSV gradient canvas for hue/saturation picking.
</docs>
