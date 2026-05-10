<template>
    <Story
        auto-props-disabled
        group="components"
        title="Checkbox/OrigamCheckboxBtn"
    >
        <Variant title="Default">
            <template #default>
                <div style="padding: 24px;">
                    <origam-checkbox-btn
                        v-model="checked"
                        label="Accept terms"
                        data-cy="checkbox-btn-default"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Indeterminate">
            <template #default>
                <div style="padding: 24px;">
                    <origam-checkbox-btn
                        :indeterminate="true"
                        label="Partial selection"
                        data-cy="checkbox-btn-indeterminate"
                    />
                </div>
            </template>
        </Variant>

        <Variant title="Color">
            <template #default="{ state }">
                <div style="padding: 24px;">
                    <origam-checkbox-btn
                        v-bind="state"
                        :model-value="true"
                        label="Colored checkbox"
                        data-cy="checkbox-btn-color"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-color v-model:color="state.color" v-model:bg-color="state.bgColor"/>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <div style="padding: 24px;">
                    <origam-checkbox-btn
                        v-bind="state"
                        data-cy="checkbox-btn-playground"
                    />
                </div>
            </template>
            <template #controls="{ state }">
                <hst-text v-model="state.label" title="Label"/>
                <hst-checkbox v-model="state.indeterminate" title="Indeterminate"/>
                <hst-checkbox v-model="state.disabled" title="Disabled"/>
                <hst-checkbox v-model="state.readonly" title="Readonly"/>
                <hst-icon v-model="state.trueIcon" title="True Icon"/>
                <hst-icon v-model="state.falseIcon" title="False Icon"/>
                <hst-color v-model:color="state.color" v-model:bg-color="state.bgColor"/>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamCheckboxBtn } from '@origam/components'
    import { HstColor, HstIcon } from '@stories/components/controls'
    import { ref } from 'vue'

    const checked = ref(false)
</script>

<docs lang="md">
CheckboxBtn sub-component — the raw checkbox control without the surrounding input wrapper.
</docs>
