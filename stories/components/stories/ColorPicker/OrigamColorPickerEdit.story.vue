<template>
    <Story
        auto-props-disabled
        group="components"
        title="ColorPicker/OrigamColorPickerEdit"
    >
        <Variant title="Default">
            <template #default>
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-edit
                        :color-hsv="defaultColor"
                        data-cy="color-picker-edit-default"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Modes">
            <template #default="{ state }">
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-edit
                        :color-hsv="defaultColor"
                        v-bind="state"
                        data-cy="color-picker-edit-modes"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-select
                    v-model="state.mode"
                    :options="[
                        { value: 'rgb', label: 'RGB' },
                        { value: 'hsl', label: 'HSL' },
                        { value: 'hsv', label: 'HSV' },
                        { value: 'hex', label: 'HEX' }
                    ]"
                    title="Mode"
                />
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <div style="padding: 24px; max-width: 360px; margin: 0 auto;">
                    <origam-color-picker-edit
                        :color-hsv="defaultColor"
                        v-bind="state"
                        data-cy="color-picker-edit-playground"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-checkbox v-model="state.disabled" title="Disabled"/>
                <hst-select
                    v-model="state.mode"
                    :options="[
                        { value: 'rgb', label: 'RGB' },
                        { value: 'hsl', label: 'HSL' },
                        { value: 'hsv', label: 'HSV' },
                        { value: 'hex', label: 'HEX' }
                    ]"
                    title="Mode"
                />
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamColorPickerEdit } from '@origam/components'

    const defaultColor = { h: 210, s: 0.7, v: 0.8, a: 1 }
</script>

<docs lang="md">
ColorPickerEdit sub-component — the numeric input fields for color channel editing.
</docs>
