<script setup lang="ts">
const { t } = useI18nFallback()

const currentTheme = ref<'light' | 'dark'>('light')

onMounted(() => {
    const stored = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null
    currentTheme.value = stored === 'dark' ? 'dark' : 'light'
})

function toggleTheme (): void {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', currentTheme.value)
}

const label = computed(() =>
    currentTheme.value === 'light'
        ? t('nav.switchToDark', 'Switch to dark theme')
        : t('nav.switchToLight', 'Switch to light theme')
)
</script>

<template>
    <OrigamBtn
        :icon="currentTheme === 'light' ? 'mdi:weather-night' : 'mdi:weather-sunny'"
        variant="text"
        :aria-label="label"
        :aria-pressed="currentTheme === 'dark'"
        class="theme-toggle"
        @click="toggleTheme"
    />
</template>

<style scoped>
.theme-toggle {
    flex-shrink: 0;
}
</style>
