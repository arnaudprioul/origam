<script setup lang="ts">
const { t } = useI18nFallback()

const SFC_SNIPPET = `<script setup lang="ts">
import { OrigamBtn } from 'origam'

const count = ref(0)
<\/script>

<template>
  <OrigamBtn
    color="primary"
    variant="flat"
    rounded="pill"
    prepend-icon="mdi:plus"
    @click="count++"
  >
    Clicked {{ count }} times
  </OrigamBtn>
</template>`
</script>

<template>
    <section
        class="home-code-demo"
        aria-labelledby="code-demo-title"
    >
        <div class="home-code-demo__inner">
            <header class="home-code-demo__header">
                <h2
                    id="code-demo-title"
                    class="home-code-demo__title"
                >
                    {{ t('codeDemo.heading', 'Quick start') }}
                </h2>
                <p class="home-code-demo__subtitle">
                    {{ t('codeDemo.subtitle', 'Drop origam components into your Vue 3 project in seconds.') }}
                </p>
            </header>

            <div class="home-code-demo__split">
                <figure class="home-code-demo__code-pane">
                    <figcaption class="sr-only">
                        {{ t('codeDemo.snippetCaption', 'Vue SFC usage example') }}
                    </figcaption>
                    <pre class="home-code-demo__pre"><code class="home-code-demo__code language-vue">{{ SFC_SNIPPET }}</code></pre>
                </figure>

                <aside
                    class="home-code-demo__preview-pane"
                    :aria-label="t('codeDemo.previewLabel', 'Live component preview')"
                >
                    <div class="home-code-demo__preview-inner">
                        <HomeLiveCounter />
                    </div>

                    <div class="home-code-demo__playground-cta">
                        <OrigamBtn
                            to="/playground?template=btn"
                            color="primary"
                            variant="outlined"
                            rounded="pill"
                            prepend-icon="mdi:play-circle-outline"
                        >
                            {{ t('codeDemo.openPlayground', 'Open in playground') }}
                        </OrigamBtn>
                    </div>
                </aside>
            </div>
        </div>
    </section>
</template>

<style scoped>
.home-code-demo {
    padding-block: var(--origam-space-20, 5rem);
    padding-inline: var(--origam-space-6, 1.5rem);
    background-color: var(--origam-color-surface-subtle, transparent);
    container-type: inline-size;
}

.home-code-demo__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-12, 3rem);
}

.home-code-demo__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-3, 0.75rem);
}

.home-code-demo__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem);
    font-weight: var(--origam-font-weight-bold, 700);
    letter-spacing: -0.02em;
    color: var(--origam-color-text-default, currentColor);
    margin: 0;
}

.home-code-demo__subtitle {
    font-size: var(--origam-font-size-lg, 1.125rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.home-code-demo__split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--origam-space-6, 1.5rem);
    align-items: stretch;
}

.home-code-demo__code-pane {
    margin: 0;
    border-radius: var(--origam-rounded-2xl, 1rem);
    overflow: hidden;
    background-color: var(--origam-color-surface-code, #1e1e2e);
    border: 1px solid var(--origam-color-border-default, transparent);
}

.home-code-demo__pre {
    margin: 0;
    padding: var(--origam-space-6, 1.5rem);
    overflow-x: auto;
    height: 100%;
    scrollbar-width: thin;
}

.home-code-demo__code {
    font-family: var(--origam-font-family-mono, monospace);
    font-size: var(--origam-font-size-sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color-text-on-dark, #cdd6f4);
    white-space: pre;
}

.home-code-demo__preview-pane {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-4, 1rem);
    justify-content: space-between;
}

.home-code-demo__preview-inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--origam-space-8, 2rem);
    border-radius: var(--origam-rounded-2xl, 1rem);
    border: 1px solid var(--origam-color-border-default, transparent);
    background-color: var(--origam-color-surface-default, transparent);
    min-height: 12rem;
}

.home-code-demo__playground-cta {
    display: flex;
    justify-content: center;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

@container (max-width: 768px) {
    .home-code-demo__split {
        grid-template-columns: 1fr;
    }
}
</style>
