<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSwitchLocalePath } from '#i18n'
import { I18N_LOCALES } from '~/consts/i18n.const'

/*
 * Bouton + OrigamMenu pattern. On expose l'activateur via le slot
 * `#activator` qui reçoit les props ARIA (aria-expanded, aria-haspopup,
 * etc.) et le handler de toggle déjà câblés par OrigamMenu. La liste
 * est rendue par OrigamList + OrigamListItem pour rester homogène avec
 * le reste du DS (focus ring, hover, active, keyboard, etc.).
 *
 * @nuxtjs/i18n@9 — la prop `locale` exposée par vue-i18n donne le code
 * actif ; `useSwitchLocalePath()` produit le path à pousser sur clic.
 */

const { t } = useI18nFallback()
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const FLAGS: Record<string, string> = {
    en: '🇬🇧',
    fr: '🇫🇷'
}

const currentLocale = computed(() =>
    I18N_LOCALES.find((loc) => loc.code === locale.value) ?? I18N_LOCALES[0]
)

const isOpen = ref(false)

function selectLocale (code: string): void {
    const path = switchLocalePath(code)
    isOpen.value = false
    if (path) {
        navigateTo(path)
    }
}
</script>

<template>
    <OrigamMenu
        v-model="isOpen"
        :offset="6"
        location="bottom right"
    >
        <template #activator="{ props: activatorProps }">
            <OrigamBtn
                v-bind="activatorProps"
                variant="outlined"
                rounded="md"
                size="sm"
                append-icon="mdi:chevron-down"
                :aria-label="t('nav.language', 'Choose language')"
            >
                <span class="language-switcher__flag" aria-hidden="true">{{ FLAGS[currentLocale.code] ?? '🌐' }}</span>
                <span class="language-switcher__code">{{ currentLocale.code.toUpperCase() }}</span>
            </OrigamBtn>
        </template>

        <OrigamList
            density="compact"
            min-width="180"
        >
            <OrigamListItem
                v-for="loc in I18N_LOCALES"
                :key="loc.code"
                :active="loc.code === locale"
                :aria-current="loc.code === locale ? 'true' : undefined"
                @click="selectLocale(loc.code)"
            >
                <template #prepend>
                    <span class="language-switcher__flag" aria-hidden="true">{{ FLAGS[loc.code] ?? '🌐' }}</span>
                </template>
                <OrigamListItemTitle>{{ loc.name }}</OrigamListItemTitle>
                <template
                    v-if="loc.code === locale"
                    #append
                >
                    <OrigamIcon icon="mdi:check" />
                </template>
            </OrigamListItem>
        </OrigamList>
    </OrigamMenu>
</template>

<style scoped>
.language-switcher__flag {
    font-size: 1rem;
    line-height: 1;
}

.language-switcher__code {
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.04em;
    font-size: 0.75rem;
}
</style>
