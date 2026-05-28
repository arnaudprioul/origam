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

function applyTheme (themeId: string): void {
    currentTheme.value = themeId
    themeCookie.value = themeId
    isOpen.value = false
    track('theme:switch', { theme: themeId, mode: currentMode.value })
    emit('change', { theme: themeId, mode: currentMode.value })
}

function toggleMode (): void {
    currentMode.value = currentMode.value === 'light' ? 'dark' : 'light'
    modeCookie.value = currentMode.value
    track('mode:switch', { theme: currentTheme.value, mode: currentMode.value })
    emit('change', { theme: currentTheme.value, mode: currentMode.value })
}

function toggleDropdown (): void {
    isOpen.value = !isOpen.value
}


const currentThemeData = computed(() =>
    MARKETING_THEMES.find(th => th.id === currentTheme.value) ?? MARKETING_THEMES[0]
)

const dropdownId = 'theme-switcher-dropdown'
const containerRef = ref<HTMLElement | null>(null)

function handleOutsideClick (event: MouseEvent): void {
    if (containerRef.value && !containerRef.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
    document.removeEventListener('click', handleOutsideClick)
})

const _ = head
</script>

<template>
    <div
        ref="containerRef"
        class="theme-switcher"
        :class="{ 'theme-switcher--open': isOpen }"
    >
        <button
            type="button"
            class="theme-switcher__trigger"
            :aria-expanded="isOpen"
            :aria-controls="dropdownId"
            :aria-label="t('themes.switcherLabel', 'Switch theme')"
            @click="toggleDropdown"
        >
            <span
                class="theme-switcher__swatch"
                :style="{ background: currentThemeData.swatch }"
                aria-hidden="true"
            />
            <span class="theme-switcher__label">
                {{ t('themes.label', 'Theme') }}: <strong>{{ currentThemeData.label }}</strong>
            </span>
            <MarketingIcon name="chevron-down" :size="14" aria-hidden="true" />
        </button>

        <div
            :id="dropdownId"
            class="theme-switcher__dropdown"
            role="listbox"
            :aria-label="t('themes.switcherLabel', 'Switch theme')"
            :aria-hidden="!isOpen"
        >
            <div class="theme-switcher__mode-row">
                <span class="theme-switcher__mode-label">{{ t('themes.mode', 'Mode') }}</span>
                <button
                    type="button"
                    class="theme-switcher__mode-toggle"
                    :aria-pressed="currentMode === 'dark'"
                    :aria-label="currentMode === 'light' ? t('nav.switchToDark', 'Switch to dark mode') : t('nav.switchToLight', 'Switch to light mode')"
                    @click="toggleMode"
                >
                    <MarketingIcon
                        :name="currentMode === 'light' ? 'moon' : 'sun'"
                        :size="14"
                        aria-hidden="true"
                    />
                    {{ currentMode === 'light' ? t('themes.dark', 'Dark') : t('themes.light', 'Light') }}
                </button>
            </div>

            <hr class="theme-switcher__divider" aria-hidden="true" />

            <ul role="list" class="theme-switcher__list">
                <li
                    v-for="theme in MARKETING_THEMES"
                    :key="theme.id"
                    role="option"
                    :aria-selected="theme.id === currentTheme"
                >
                    <button
                        type="button"
                        class="theme-switcher__item"
                        :class="{ 'theme-switcher__item--active': theme.id === currentTheme }"
                        @click="applyTheme(theme.id)"
                    >
                        <span
                            class="theme-switcher__item-swatch"
                            :style="{ background: theme.swatch }"
                            aria-hidden="true"
                        />
                        <span class="theme-switcher__item-text">
                            <span class="theme-switcher__item-name">{{ theme.label }}</span>
                            <span class="theme-switcher__item-desc">{{ theme.desc }}</span>
                        </span>
                        <MarketingIcon
                            v-if="theme.id === currentTheme"
                            name="check"
                            :size="14"
                            aria-hidden="true"
                        />
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.theme-switcher {
    position: relative;
}

.theme-switcher__trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    padding: 7px 12px;
    border-radius: var(--origam-radius---md, 0.5rem);
    background: var(--origam-color__surface---raised, #fff);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---primary, #171717);
    cursor: pointer;
    font-family: inherit;
    transition: border-color 0.15s ease;
    white-space: nowrap;
}

.theme-switcher__trigger:hover {
    border-color: var(--origam-color__action--primary---bg, #7c3aed);
}

.theme-switcher__trigger:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
}

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

.theme-switcher__dropdown {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 260px;
    background: var(--origam-color__surface---raised, #fff);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    border-radius: var(--origam-radius---lg, 0.75rem);
    box-shadow: var(--origam-shadow---xl);
    padding: 8px;
    z-index: var(--origam-zIndex---dropdown, 1030);
}

.theme-switcher--open .theme-switcher__dropdown {
    display: block;
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

.theme-switcher__mode-toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-radius: var(--origam-radius---md, 0.5rem);
    background: var(--origam-color__surface---sunken, #fafafa);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---medium, 500);
    color: var(--origam-color__text---primary, #171717);
    cursor: pointer;
    font-family: inherit;
    transition: background-color 0.15s ease;
}

.theme-switcher__mode-toggle:hover {
    background: var(--origam-color__surface---overlay, #f5f5f5);
}

.theme-switcher__mode-toggle:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
}

.theme-switcher__divider {
    margin: 4px 0;
    border: none;
    border-block-start: 1px solid var(--origam-color__border---subtle, #d4d4d4);
}

.theme-switcher__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.theme-switcher__item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 10px;
    border-radius: var(--origam-radius---sm, 0.25rem);
    background: none;
    border: none;
    cursor: pointer;
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--origam-color__text---primary, #171717);
    font-family: inherit;
    text-align: left;
    transition: background-color 0.1s ease;
}

.theme-switcher__item:hover {
    background: var(--origam-color__surface---sunken, #fafafa);
}

.theme-switcher__item--active {
    background: color-mix(in srgb, var(--origam-color__action--primary---bg, #7c3aed) 8%, transparent);
    color: var(--origam-color__action--primary---bg, #7c3aed);
}

.theme-switcher__item:focus-visible {
    outline: 2px solid var(--origam-color__border---focus, #7c3aed);
    outline-offset: 2px;
}

.theme-switcher__item-swatch {
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: var(--origam-radius---sm, 0.25rem);
    border: 1px solid var(--origam-color__border---subtle, #d4d4d4);
    flex-shrink: 0;
    overflow: hidden;
}

.theme-switcher__item-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.theme-switcher__item-name {
    font-weight: var(--origam-font__weight---semibold, 600);
    font-size: var(--origam-font__size---md, 0.875rem);
}

.theme-switcher__item-desc {
    font-size: var(--origam-font__size---sm, 0.75rem);
    color: var(--origam-color__text---secondary, #525252);
    font-weight: var(--origam-font__weight---regular, 400);
}
</style>
