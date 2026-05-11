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

        <Variant title="Color">
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
                <hst-color
                    v-model:bg-color="state.bgColor"
                    v-model:color="state.color"
                />
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
                <hst-density v-model="state.density"/>
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
                <hst-elevation v-model="state.elevation"/>
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
                <hst-text v-model="state.title" title="Title"/>
                <hst-checkbox v-model="state.modelValue" title="Visible"/>
                <hst-checkbox v-model="state.collapse" title="Collapse"/>
                <hst-checkbox v-model="state.flat" title="Flat"/>
                <hst-checkbox v-model="state.floating" title="Floating"/>
                <hst-density v-model="state.density"/>
                <hst-elevation v-model="state.elevation"/>
                <hst-color v-model:bg-color="state.bgColor" v-model:color="state.color"/>
                <hst-rounded v-model="state.rounded"/>
                <hst-border v-model="state.border"/>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamAppBar, OrigamBtn } from '@origam/components'
    import { MDI_ICONS } from '@origam/enums'
</script>

<docs lang="md">
App Bar sub-component — renders the top application bar.
</docs>
