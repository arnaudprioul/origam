import type { IOptions } from '@origam/interfaces'

export const localeList: Array<IOptions<string>> = [
    { label: '(auto — runtime / <html lang>)', value: undefined },
    { label: 'English (US) — en-US', value: 'en-US' },
    { label: 'English (UK) — en-GB', value: 'en-GB' },
    { label: 'Français — fr-FR', value: 'fr-FR' },
    { label: 'Deutsch — de-DE', value: 'de-DE' },
    { label: 'Español — es-ES', value: 'es-ES' },
    { label: 'Italiano — it-IT', value: 'it-IT' },
    { label: 'Português (BR) — pt-BR', value: 'pt-BR' },
    { label: 'Русский — ru-RU', value: 'ru-RU' },
    { label: '日本語 — ja-JP', value: 'ja-JP' },
    { label: '한국어 — ko-KR', value: 'ko-KR' },
    { label: '中文 (简体) — zh-CN', value: 'zh-CN' },
    { label: 'العربية — ar-EG', value: 'ar-EG' },
]
