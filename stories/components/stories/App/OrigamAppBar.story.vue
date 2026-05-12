<template>
    <Story
        auto-props-disabled
        group="components"
        title="App/OrigamAppBar"
    >
        <Variant title="Default">
            <template #default>
                <origam-app-bar
                    :order="0"
                    title="My Application"
                    data-cy="app-bar-default"
                >
                    <template #prepend>
                        <origam-btn :icon="MDI_ICONS.MENU"/>
                    </template>
                    <template #append>
                        <origam-btn :icon="MDI_ICONS.DOTS_VERTICAL"/>
                    </template>
                </origam-app-bar>
            </template>
        </Variant>

        <Variant
            title="Color"
            :init-state="() => ({ color: 'primary', bgColor: 'primary', title: 'My Application' })"
        >
            <template #default="{ state }">
                <origam-app-bar
                    :order="0"
                    v-bind="state"
                    data-cy="app-bar-color"
                >
                    <template #prepend>
                        <origam-btn :icon="MDI_ICONS.MENU"/>
                    </template>
                    <template #append>
                        <origam-btn :icon="MDI_ICONS.DOTS_VERTICAL"/>
                    </template>
                </origam-app-bar>
            </template>
            <template #controls="{ state }">
                <HstText   v-model="state.title"         title="title"/>
                <HstSelect v-model="state.color"         title="color"         :options="intentList"/>
                <HstSelect v-model="state.bgColor"       title="bgColor"       :options="intentList"/>
                <HstSelect v-model="state.hoverColor"    title="hoverColor"    :options="intentList"/>
                <HstSelect v-model="state.hoverBgColor"  title="hoverBgColor"  :options="intentList"/>
                <HstSelect v-model="state.activeColor"   title="activeColor"   :options="intentList"/>
                <HstSelect v-model="state.activeBgColor" title="activeBgColor" :options="intentList"/>
            </template>
        </Variant>

        <Variant title="Density">
            <template #default="{ state }">
                <origam-app-bar
                    :order="0"
                    v-bind="state"
                    data-cy="app-bar-density"
                >
                    <template #prepend>
                        <origam-btn :icon="MDI_ICONS.MENU"/>
                    </template>
                    <template #append>
                        <origam-btn :icon="MDI_ICONS.DOTS_VERTICAL"/>
                    </template>
                </origam-app-bar>
            </template>
            <template #controls="{ state }">
                <HstSelect v-model="state.density" title="density" :options="densityList"/>
            </template>
        </Variant>

        <Variant title="Elevation">
            <template #default="{ state }">
                <origam-app-bar
                    :order="0"
                    v-bind="state"
                    data-cy="app-bar-elevation"
                >
                    <template #prepend>
                        <origam-btn :icon="MDI_ICONS.MENU"/>
                    </template>
                    <template #append>
                        <origam-btn :icon="MDI_ICONS.DOTS_VERTICAL"/>
                    </template>
                </origam-app-bar>
            </template>
            <template #controls="{ state }">
                <HstSelect v-model="state.elevation" title="elevation" :options="elevationList"/>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <origam-app-bar
                    :order="0"
                    v-bind="state"
                    data-cy="app-bar-playground"
                >
                    <template #prepend>
                        <origam-btn :icon="MDI_ICONS.MENU"/>
                    </template>
                    <template #append>
                        <origam-btn :icon="MDI_ICONS.DOTS_VERTICAL"/>
                    </template>
                </origam-app-bar>
            </template>
            <template #controls="{ state }">
                <HstText     v-model="state.title"      title="title"/>
                <HstCheckbox v-model="state.modelValue" title="visible"/>
                <HstCheckbox v-model="state.collapse"   title="collapse"/>
                <HstCheckbox v-model="state.flat"       title="flat"/>
                <HstCheckbox v-model="state.floating"   title="floating"/>
                <HstSelect   v-model="state.density"    title="density"   :options="densityList"/>
                <HstSelect   v-model="state.elevation"  title="elevation" :options="elevationList"/>
                <HstSelect   v-model="state.color"      title="color"     :options="intentList"/>
                <HstSelect   v-model="state.bgColor"    title="bgColor"   :options="intentList"/>
                <HstSelect   v-model="state.rounded"    title="rounded"   :options="roundedList"/>
                <HstCheckbox v-model="state.border"     title="border"/>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamAppBar, OrigamBtn } from '@origam/components'
    import { MDI_ICONS } from '@origam/enums'
    import {
        densityList,
        elevationList,
        intentList,
        roundedList
    } from '@stories/const'
</script>

<docs lang="md">
App Bar sub-component — renders the top application bar.
</docs>
