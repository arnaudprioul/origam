<template>
    <Story
        auto-props-disabled
        group="components"
        title="ColorPicker/OrigamColorPickerSwatches"
    >
        <Variant title="Default">
            <template #default>
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-swatches
                        :color-hsv="defaultColor"
                        :swatches="defaultSwatches"
                        data-cy="color-picker-swatches-default"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Disabled">
            <template #default>
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-swatches
                        :color-hsv="defaultColor"
                        :swatches="defaultSwatches"
                        :disabled="true"
                        data-cy="color-picker-swatches-disabled"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-swatches
                        :color-hsv="defaultColor"
                        :swatches="defaultSwatches"
                        v-bind="state"
                        data-cy="color-picker-swatches-playground"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-checkbox v-model="state.disabled" title="Disabled"/>
                <hst-dimension
                    v-model:width="state.width"
                    v-model:height="state.height"
                    v-model:max-height="state.maxHeight"
                    use-dimension
                />
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamColorPickerSwatches } from '@origam/components'

    const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 1 }
    const defaultSwatches = [
        ['#F44336', '#E91E63', '#9C27B0'],
        ['#3F51B5', '#2196F3', '#03A9F4'],
        ['#009688', '#4CAF50', '#8BC34A'],
        ['#FFEB3B', '#FF9800', '#FF5722']
    ]
</script>

<docs lang="md">
ColorPickerSwatches sub-component — grid of preset color swatches for quick selection.
</docs>
