<template>
    <Story
        auto-props-disabled
        group="components"
        title="Card/OrigamCardHeader"
    >
        <Variant title="Default">
            <template #default>
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-header
                        title="Card Title"
                        subtitle="Card Subtitle"
                        data-cy="card-header-default"
                    />
                </origam-card>
            </template>
        </Variant>

        <Variant title="With Icons">
            <template #default>
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-header
                        title="Account Settings"
                        subtitle="Manage your profile"
                        :prepend-icon="MDI_ICONS.ACCOUNT"
                        :append-icon="MDI_ICONS.DOTS_VERTICAL"
                        data-cy="card-header-icons"
                    />
                </origam-card>
            </template>
        </Variant>

        <Variant title="Density">
            <template #default="{ state }">
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-header
                        v-bind="state"
                        title="Card Title"
                        subtitle="Card Subtitle"
                        data-cy="card-header-density"
                    />
                </origam-card>
            </template>
            <template #controls="{ state }">
                <hst-density v-model="state.density"/>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-header
                        v-bind="state"
                        data-cy="card-header-playground"
                    />
                </origam-card>
            </template>
            <template #controls="{ state }">
                <hst-text v-model="state.title" title="Title"/>
                <hst-text v-model="state.subtitle" title="Subtitle"/>
                <hst-icon v-model="state.prependIcon" title="Prepend Icon"/>
                <hst-icon v-model="state.appendIcon" title="Append Icon"/>
                <hst-density v-model="state.density"/>
                <hst-border v-model="state.border"/>
                <hst-rounded v-model="state.rounded"/>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamCard, OrigamCardHeader } from '@origam/components'
    import { MDI_ICONS } from '@origam/enums'
    import {
        HstBorder,
        HstDensity,
        HstIcon,
        HstRounded
    } from '@stories/components/controls'
</script>

<docs lang="md">
CardHeader sub-component — renders the title/subtitle row with optional prepend/append icons or avatars.
</docs>
