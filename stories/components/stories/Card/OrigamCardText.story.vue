<template>
    <Story
        auto-props-disabled
        group="components"
        title="Card/OrigamCardText"
    >
        <Variant title="Default">
            <template #default>
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-text
                        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus!"
                        data-cy="card-text-default"
                    />
                </origam-card>
            </template>
        </Variant>

        <Variant title="Slot Content">
            <template #default>
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-text data-cy="card-text-slot">
                        <p>This is <strong>rich</strong> content rendered via the default slot.</p>
                        <p>It supports any HTML markup.</p>
                    </origam-card-text>
                </origam-card>
            </template>
        </Variant>

        <Variant title="Playground">
            <template #default="{ state }">
                <origam-card style="max-width: 400px; margin: 24px auto;">
                    <origam-card-text
                        v-bind="state"
                        data-cy="card-text-playground"
                    />
                </origam-card>
            </template>
            <template #controls="{ state }">
                <hst-textarea v-model="state.text" title="Text"/>
                <hst-border v-model="state.border"/>
                <hst-rounded v-model="state.rounded"/>
                <hst-padding v-model="state.padding"/>
                <hst-margin v-model="state.margin"/>
            </template>
        </Variant>
    </Story>
</template>

<script lang="ts" setup>
    import { OrigamCard, OrigamCardText } from '@origam/components'
</script>

<docs lang="md">
CardText sub-component — renders the body/content area of a card.
</docs>
