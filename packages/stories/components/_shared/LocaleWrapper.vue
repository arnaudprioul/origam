<script lang="ts" setup>
import { watch } from 'vue'
import { useLocale } from '@origam/composables'

const props = defineProps<{
    locale?: string
}>()

const { current } = useLocale()

watch(
    () => props.locale,
    (next) => {
        if (next) current.value = next
    },
    { immediate: true }
)
</script>

<template>
    <slot/>
</template>
