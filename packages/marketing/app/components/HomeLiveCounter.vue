<script setup lang="ts">
const { t } = useI18nFallback()

const count = ref(0)

function increment (): void {
    count.value++
}
</script>

<template>
    <OrigamBtn
        color="primary"
        variant="flat"
        rounded="full"
        prepend-icon="mdi:plus"
        @click="increment"
    >
        {{ t('codeDemo.clickedTimes', 'Clicked') }} {{ count }} {{ t('codeDemo.times', 'times') }}
    </OrigamBtn>
</template>
