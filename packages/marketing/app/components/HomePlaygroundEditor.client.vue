<script setup lang="ts">
/**
 * HomePlaygroundEditor.client.vue
 *
 * Suffixe `.client.vue` = Nuxt 4 auto-client-only : jamais évalué côté SSR.
 *
 * Mini-spec — décision éditeur :
 * Monaco retiré (incompat Vite 7 : dynamic import → 404 hash mismatch,
 * static import → stack overflow au transform Vite). Éditeur = CodeMirror
 * par défaut de @vue/repl (aucun prop `editor` passé au composant Repl).
 * Monaco différé à une iteration ultérieure si Vite résout la compatibilité.
 */
import { Repl, useStore } from '@vue/repl'
import CodeMirrorEditor from '@vue/repl/codemirror-editor'
import '@vue/repl/style.css'
import { PLAYGROUND_SNIPPET } from '~/consts/playground.const'

const store = useStore()
void store.setFiles({ 'App.vue': PLAYGROUND_SNIPPET }, 'App.vue').catch(() => {})
</script>

<template>
    <Repl
        :store="store"
        :editor="CodeMirrorEditor"
        :show-compile-output="false"
        :show-import-map="false"
        :show-ts-config="false"
        :clear-console="false"
        layout="vertical"
        class="home-playground__repl"
        data-cy="playground-repl"
    />
</template>

<style scoped>
.home-playground__repl {
    height: 480px;
    width: 100%;
}
</style>
