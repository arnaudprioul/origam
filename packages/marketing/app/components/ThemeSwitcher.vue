<script setup lang="ts">
import { MARKETING_THEMES } from '~/consts/marketing-themes.const'

interface Props {
    compact?: boolean
}

withDefaults(defineProps<Props>(), {
    compact: false
})

const emit = defineEmits<{
    change: [{ theme: string; mode: string }]
}>()

const { t } = useI18nFallback()
const { track } = useAnalytics()

const themeCookie = useCookie('origam_mkt_theme', { default: () => 'sobre' })
const modeCookie = useCookie<'light' | 'dark'>('origam_mkt_mode', { default: () => 'light' })

const currentTheme = ref(themeCookie.value ?? 'sobre')
const currentMode = ref<'light' | 'dark'>(modeCookie.value ?? 'light')
const isOpen = ref(false)

const head = useHead({
    htmlAttrs: {
        'data-theme': computed(() => currentTheme.value),
        'data-mode': computed(() => currentMode.value)
    }
})

onMounted(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (!modeCookie.value) {
        currentMode.value = prefersDark ? 'dark' : 'light'
    }
})

const isDark = computed({
    get: () => currentMode.value === 'dark',
    set: (value: boolean) => {
        currentMode.value = value ? 'dark' : 'light'
        modeCookie.value = currentMode.value
        track('mode:switch', { theme: currentTheme.value, mode: currentMode.value })
        emit('change', { theme: currentTheme.value, mode: currentMode.value })
    }
})

function applyTheme (themeId: string): void {
    currentTheme.value = themeId
    themeCookie.value = themeId
    isOpen.value = false
    track('theme:switch', { theme: themeId, mode: currentMode.value })
    emit('change', { theme: themeId, mode: currentMode.value })
}

const currentThemeData = computed(() =>
    MARKETING_THEMES.find(th => th.id === currentTheme.value) ?? MARKETING_THEMES[0]
)

const _ = head
</script>

<template>
    <OrigamMenu
        v-model="isOpen"
        location="bottom end"
        :close-on-content-click="false"
        min-width="280"
    >
        <template #activator="{ props: activatorProps }">
            <OrigamBtn
                variant="outlined"
                rounded="md"
                size="sm"
                append-icon="mdi:chevron-down"
                :aria-label="t('themes.switcherLabel', 'Switch theme')"
                v-bind="activatorProps"
            >
                <span
                    class="theme-switcher__swatch"
                    :style="{ background: currentThemeData.swatch }"
                    aria-hidden="true"
                />
                <span class="theme-switcher__label">
                    {{ t('themes.label', 'Theme') }}: <strong>{{ currentThemeData.label }}</strong>
                </span>
            </OrigamBtn>
        </template>

        <div class="theme-switcher__menu-content">
            <div class="theme-switcher__mode-row">
                <span class="theme-switcher__mode-label">{{ t('themes.mode', 'Mode') }}</span>
                <div class="theme-switcher__mode-toggle-row">
                    <OrigamIcon icon="mdi:weather-night" :size="14" aria-hidden="true" />
                    <OrigamSwitch
                        v-model="isDark"
                        color="primary"
                        density="compact"
                        :aria-label="isDark ? t('nav.switchToLight', 'Switch to light mode') : t('nav.switchToDark', 'Switch to dark mode')"
                    />
                    <OrigamIcon icon="mdi:weather-sunny" :size="14" aria-hidden="true" />
                </div>
            </div>

            <OrigamDivider />

            <OrigamList density="compact">
                <OrigamListItem
                    v-for="theme in MARKETING_THEMES"
                    :key="theme.id"
                    :active="theme.id === currentTheme"
                    :title="theme.label"
                    :subtitle="theme.desc"
                    role="option"
                    :aria-selected="theme.id === currentTheme"
                    @click="applyTheme(theme.id)"
                >
                    <template #prepend>
                        <span
                            class="theme-switcher__item-swatch"
                            :style="{ background: theme.swatch }"
                            aria-hidden="true"
                        />
                    </template>
                    <template #append>
                        <OrigamIcon
                            v-if="theme.id === currentTheme"
                            icon="mdi:check"
                            :size="14"
                            aria-hidden="true"
                        />
                    </template>
                </OrigamListItem>
            </OrigamList>
        </div>
    </OrigamMenu>
</template>

<style scoped>
.theme-switcher__swatch {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: var(--origam-radius---sm, 0.25rem);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    flex-shrink: 0;
}

.theme-switcher__label {
    color: var(--origam-color__text---secondary, #525252);
}

.theme-switcher__label strong {
    color: var(--origam-color__text---primary, #171717);
    font-weight: var(--origam-font__weight---semibold, 600);
}

.theme-switcher__menu-content {
    padding: var(--origam-space---2, 0.5rem);
}

.theme-switcher__mode-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px 8px;
}

.theme-switcher__mode-label {
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---secondary, #525252);
    text-transform: uppercase;
    letter-spacing: 0.06em;
}

.theme-switcher__mode-toggle-row {
    display: inline-flex;
    align-items: center;
    gap: 4px;
}

.theme-switcher__item-swatch {
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: var(--origam-radius---sm, 0.25rem);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    flex-shrink: 0;
    overflow: hidden;
    margin-inline-end: var(--origam-space---2, 0.5rem);
}
</style>
