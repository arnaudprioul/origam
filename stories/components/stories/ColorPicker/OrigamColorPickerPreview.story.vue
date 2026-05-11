<template>
    <Story
        auto-props-disabled
        group="components"
        title="ColorPicker/OrigamColorPickerPreview"
    >
        <Variant title="Default">
            <template #default>
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-preview
                        :color-hsv="defaultColor"
                        data-cy="color-picker-preview-default"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Hide Alpha">
            <template #default>
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-preview
                        :color-hsv="defaultColor"
                        :hide-alpha="true"
                        data-cy="color-picker-preview-no-alpha"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Disabled">
            <template #default>
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-preview
                        :color-hsv="defaultColor"
                        :disabled="true"
                        data-cy="color-picker-preview-disabled"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-preview
                        :color-hsv="defaultColor"
                        v-bind="state"
                        data-cy="color-picker-preview-playground"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-checkbox v-model="state.disabled" title="Disabled"/>
                <hst-checkbox v-model="state.hideAlpha" title="Hide Alpha"/>
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
    import { OrigamColorPickerPreview } from '@origam/components'

    const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 0.6 }
</script>

<docs lang="md">
ColorPickerPreview sub-component — shows the hue/alpha slider tracks for color preview.
</docs>
