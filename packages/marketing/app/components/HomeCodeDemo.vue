<script setup lang="ts">
/* eslint-disable no-useless-escape -- the backslash inside SFC_SNIPPET
 * is intentional: it escapes the inner script close-tag so Vue's SFC
 * parser doesn't terminate this outer block prematurely. */
const { t } = useI18nFallback()

const SFC_SNIPPET = `<script setup lang="ts">
import { OrigamBtn } from 'origam'

const count = ref(0)
<\/script>

<template>
  <OrigamBtn
    color="primary"
    variant="flat"
    rounded="full"
    prepend-icon="mdi:plus"
    @click="count++"
  >
    Clicked {{ count }} times
  </OrigamBtn>
</template>`

const INSTALL_STEPS = [
    { num: '01', key: 'home.codeDemo.step1', fallback: 'Install the package' },
    { num: '02', key: 'home.codeDemo.step2', fallback: 'Import the Nuxt module' },
    { num: '03', key: 'home.codeDemo.step3', fallback: 'Use any component' }
] as const
</script>

<template>
    <section
        class="home-code-demo"
        aria-labelledby="code-demo-title"
    >
        <div class="home-code-demo__inner">
            <header class="home-code-demo__header">
                <div class="home-code-demo__eyebrow">
                    {{ t('home.codeDemo.eyebrow', 'Get started fast') }}
                </div>
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

            <ol class="home-code-demo__steps" aria-label="Installation steps">
                <li
                    v-for="step in INSTALL_STEPS"
                    :key="step.num"
                    class="home-code-demo__step"
                >
                    <span class="home-code-demo__step-num" aria-hidden="true">{{ step.num }}</span>
                    <span class="home-code-demo__step-text">{{ t(step.key, step.fallback) }}</span>
                </li>
            </ol>

            <div class="home-code-demo__split">
                <figure class="home-code-demo__code-pane">
                    <figcaption class="home-code-demo__code-header">
                        <div class="home-code-demo__code-dots" aria-hidden="true">
                            <span class="home-code-demo__dot home-code-demo__dot--red"></span>
                            <span class="home-code-demo__dot home-code-demo__dot--yellow"></span>
                            <span class="home-code-demo__dot home-code-demo__dot--green"></span>
                        </div>
                        <span class="home-code-demo__code-filename">Counter.vue</span>
                        <OrigamClipboard
                            :text="SFC_SNIPPET"
                            :aria-label="t('codeDemo.copyLabel', 'Copy code snippet')"
                        />
                    </figcaption>
                    <pre class="home-code-demo__pre"><code class="home-code-demo__code language-vue">{{ SFC_SNIPPET }}</code></pre>
                </figure>

                <aside
                    class="home-code-demo__preview-pane"
                    :aria-label="t('codeDemo.previewLabel', 'Live component preview')"
                >
                    <div class="home-code-demo__preview-label" aria-hidden="true">
                        <span class="home-code-demo__preview-dot"></span>
                        {{ t('home.codeDemo.livePreview', 'Live preview') }}
                    </div>

                    <div class="home-code-demo__preview-inner">
                        <HomeLiveCounter />
                    </div>

                    <div class="home-code-demo__playground-cta">
                        <OrigamBtn
                            to="/playground?template=btn"
                            color="primary"
                            variant="outlined"
                            rounded="full"
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
    padding-block: var(--origam-space---20, 5rem);
    padding-inline: var(--origam-space---6, 1.5rem);
    container-type: inline-size;
}

.home-code-demo__inner {
    max-width: 80rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---12, 3rem);
}

.home-code-demo__header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
}

.home-code-demo__eyebrow {
    display: inline-block;
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--origam-color__feedback--success---fgSubtle, #16a34a);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---3, 0.75rem);
    background-color: color-mix(in srgb, var(--origam-color__feedback--success---bg, #4caf50) 8%, transparent);
    border-radius: var(--origam-radius---full, 9999px);
}

.home-code-demo__title {
    font-size: clamp(1.75rem, 3vw + 0.5rem, 2.75rem);
    font-weight: var(--origam-font__weight---bold, 700);
    letter-spacing: -0.025em;
    color: var(--origam-color__text---primary, #171717);
    margin: 0;
}

.home-code-demo__subtitle {
    font-size: var(--origam-font__size---xl, 1.125rem);
    color: var(--origam-color__text---secondary, #525252);
    margin: 0;
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
}

.home-code-demo__steps {
    display: flex;
    gap: var(--origam-space---8, 2rem);
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
}

.home-code-demo__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    text-align: center;
    max-width: 10rem;
}

.home-code-demo__step-num {
    font-size: var(--origam-font__size---3xl, 1.5rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__action--primary---bg, #7c3aed);
    font-family: var(--origam-font__family---mono, monospace);
    line-height: 1;
}

.home-code-demo__step-text {
    font-size: var(--origam-font__size---md, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    font-weight: var(--origam-font__weight---medium, 500);
}

.home-code-demo__split {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: var(--origam-space---6, 1.5rem);
    align-items: stretch;
}

.home-code-demo__code-pane {
    margin: 0;
    border-radius: var(--origam-radius---2xl, 1.5rem);
    overflow: hidden;
    background-color: var(--origam-color__neutral---900, #171717);
    border: 1px solid var(--origam-color__neutral---700, #404040);
    box-shadow: var(--origam-shadow---xl);
    display: flex;
    flex-direction: column;
}

.home-code-demo__code-header {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    padding: var(--origam-space---4, 1rem) var(--origam-space---5, 1.25rem);
    border-block-end: 1px solid var(--origam-color__neutral---700, #404040);
    background-color: color-mix(in srgb, var(--origam-color__neutral---800, #262626) 60%, transparent);
}

.home-code-demo__code-dots {
    display: flex;
    gap: var(--origam-space---2, 0.5rem);
    flex-shrink: 0;
}

.home-code-demo__dot {
    display: block;
    width: 12px;
    height: 12px;
    border-radius: var(--origam-radius---full, 9999px);
}

.home-code-demo__dot--red {
    background-color: var(--origam-color__feedback--danger---bg, #ef4444);
}

.home-code-demo__dot--yellow {
    background-color: var(--origam-color__feedback--warning---bg, #fb8c00);
}

.home-code-demo__dot--green {
    background-color: var(--origam-color__feedback--success---bg, #4caf50);
}

.home-code-demo__code-filename {
    flex: 1;
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-family: var(--origam-font__family---mono, monospace);
    color: var(--origam-color__neutral---400, #a3a3a3);
    font-weight: var(--origam-font__weight---medium, 500);
}

.home-code-demo__pre {
    margin: 0;
    padding: var(--origam-space---6, 1.5rem);
    overflow-x: auto;
    flex: 1;
    scrollbar-width: thin;
    scrollbar-color: var(--origam-color__neutral---700, #404040) transparent;
}

.home-code-demo__code {
    font-family: var(--origam-font__family---mono, monospace);
    font-size: var(--origam-font__size---md, 0.875rem);
    line-height: var(--origam-font__lineHeight---relaxed, 1.625);
    color: var(--origam-color__neutral---200, #e6e6e6);
    white-space: pre;
    display: block;
}

.home-code-demo__preview-pane {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
}

.home-code-demo__preview-label {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    font-size: var(--origam-font__size---sm, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---secondary, #525252);
    text-transform: uppercase;
    letter-spacing: 0.07em;
}

.home-code-demo__preview-dot {
    display: block;
    width: 8px;
    height: 8px;
    border-radius: var(--origam-radius---full, 9999px);
    background-color: var(--origam-color__feedback--success---bg, #4caf50);
    animation: pulse-preview 2s ease-in-out infinite;
}

.home-code-demo__preview-inner {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--origam-space---8, 2rem);
    border-radius: var(--origam-radius---2xl, 1.5rem);
    border: 2px dashed var(--origam-color__border---subtle, #d4d4d4);
    background-color: var(--origam-color__surface---sunken, #fafafa);
    min-height: 14rem;
    background-image: radial-gradient(
        circle at center,
        var(--origam-color__border---subtle, #d4d4d4) 1px,
        transparent 1px
    );
    background-size: 24px 24px;
}

.home-code-demo__playground-cta {
    display: flex;
    justify-content: center;
}

@keyframes pulse-preview {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
}

@media (prefers-reduced-motion: reduce) {
    .home-code-demo__preview-dot {
        animation: none;
    }
}

@container (max-width: 900px) {
    .home-code-demo__split {
        grid-template-columns: 1fr;
    }

    .home-code-demo__steps {
        flex-direction: column;
        align-items: center;
        gap: var(--origam-space---4, 1rem);
    }

    .home-code-demo__step {
        flex-direction: row;
        text-align: left;
        max-width: none;
    }
}
</style>
