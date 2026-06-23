import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PASSWORD_STRENGTH_DOC: IComposableDoc = {
    slug: 'use-password-strength',
    name: 'computeStrength',
    domain: 'PasswordField',
    icon: 'mdi-shield-lock-outline',
    descriptionKey: '',
    descriptionFallback: 'Pure function (no Vue reactivity needed) that scores a password string on a 0-4 scale based on length, digit presence, case diversity, and special characters. Returns a numeric score and a semantic level (weak / fair / good / strong). Used internally by OrigamPasswordField to drive the strength bar colour and label. No third-party dependencies.',
    signature: `function computeStrength(
  value: string | null | undefined
): IPasswordStrength

// IPasswordStrength shape:
// { score: TPasswordStrengthScore; level: TPasswordStrengthLevel }
// TPasswordStrengthScore = 0 | 1 | 2 | 3 | 4
// TPasswordStrengthLevel = 'weak' | 'fair' | 'good' | 'strong'`,
    params: [
        {
            name: 'value',
            type: 'string | null | undefined',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'The password string to evaluate. Null and undefined are treated as empty (score 0, level "weak").',
        },
    ],
    returns: [
        {
            name: 'score',
            type: 'TPasswordStrengthScore (0 | 1 | 2 | 3 | 4)',
            descriptionKey: '',
            descriptionFallback: 'Heuristic score in [0, 4]. Each criterion adds 1 point: length ≥ 8, length ≥ 12, contains digit, mixed case, non-alphanumeric character.',
        },
        {
            name: 'level',
            type: 'TPasswordStrengthLevel ("weak" | "fair" | "good" | "strong")',
            descriptionKey: '',
            descriptionFallback: 'Human-readable level mapped from the score: 0-1 = weak, 2 = fair, 3 = good, 4 = strong.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Reactive strength indicator',
            code: `<script setup lang="ts">
import { computed, ref } from 'vue'
import { computeStrength } from 'origam'

const password = ref('')
const strength = computed(() => computeStrength(password.value))
</script>

<template>
  <origam-password-field v-model="password" label="Password" />
  <p>Score: {{ strength.score }} / 4 — {{ strength.level }}</p>
</template>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Via OrigamPasswordField prop',
            code: `<!-- The strength bar is shown automatically when show-strength is set -->
<origam-password-field
  v-model="password"
  label="Create password"
  show-strength
  :rules="[v => computeStrength(v).score >= 3 || 'Password is too weak']"
/>`,
            lang: 'vue',
        },
    ],
    related: ['use-form', 'use-focus'],
    consumedInterfaces: ['IPasswordStrength'],
}
