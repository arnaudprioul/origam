/**
 * T4 — HomePlayground
 * Snippet example displayed in the live REPL on first load.
 */

export const PLAYGROUND_SNIPPET = `<script setup>
import { OrigamCard, OrigamBtn } from 'origam'
</script>

<template>
  <OrigamCard
    title="Hello origam"
    subtitle="Live playground — edit me"
    rounded
    border
    style="max-width:360px; margin:auto"
  >
    <template #footer>
      <OrigamBtn color="primary" rounded>
        Get started
      </OrigamBtn>
    </template>
  </OrigamCard>
</template>
`
