<script setup lang="ts">
import { computed } from 'vue'
import { useT } from '~/composables/useT'
import { useCopy } from '~/composables/useCopy'
import { CTA_INSTALL_COMMAND, CTA_DOCS_HREF } from '~/consts/cta.const'

const { t } = useT()
const { copied, copy } = useCopy()

const copyLabel = computed(() => copied.value
    ? t('home.cta.copied', 'Copied')
    : t('home.cta.copy', 'Copy')
)

const installCommand = computed(() => t('home.cta.install', CTA_INSTALL_COMMAND))

function handleCopy () {
    copy(installCommand.value)
}
</script>

<template>
    <section
        class="home-cta"
        aria-labelledby="cta-title"
    >
        <OrigamCard
            class="home-cta__card"
            flat
            rounded
        >
            <div class="home-cta__content">
                <h2
                    id="cta-title"
                    class="home-cta__title"
                >
                    {{ t('home.cta.title', 'Ready to ship faster?') }}
                </h2>

                <p class="home-cta__description">
                    {{ t('home.cta.description', 'Spin up your Vue 3 project with origam in 30 seconds.') }}
                </p>

                <div class="home-cta__actions">
                    <OrigamBtn
                        :href="CTA_DOCS_HREF"
                        variant="elevated"
                        color="primary"
                        data-cy="cta-btn-docs"
                    >
                        {{ t('home.cta.ctaDocs', 'Read docs') }}
                    </OrigamBtn>

                    <figure class="home-cta__snippet">
                        <OrigamCode
                            tag="div"
                            :code="installCommand"
                            :copyable="false"
                            class="home-cta__code"
                            data-cy="cta-code-snippet"
                        />

                        <OrigamBtn
                            variant="text"
                            class="home-cta__copy-btn"
                            :aria-label="t('home.cta.copy', 'Copy')"
                            aria-live="polite"
                            data-cy="cta-copy-btn"
                            @click="handleCopy"
                        >
                            {{ copyLabel }}
                        </OrigamBtn>
                    </figure>
                </div>
            </div>
        </OrigamCard>
    </section>
</template>

<style scoped>
.home-cta {
    padding: var(--origam-space---10, 4rem) var(--origam-space---6, 1.5rem);
}

.home-cta__card {
    max-width: var(--home-cta-card-max-width, 56rem);
    margin-inline: auto;
    padding: var(--origam-space---10, 4rem) var(--origam-space---8, 2rem);
    background-color: var(--origam-color__surface---overlay, rgba(0, 0, 0, 0.04));
    text-align: center;
}

.home-cta__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
}

.home-cta__title {
    margin: 0;
    font-size: var(--origam-font-size---3xl, 2rem);
    font-weight: var(--origam-font-weight---bold, 700);
    color: var(--origam-color__text---primary, #0a0a0a);
    line-height: var(--origam-line-height---tight, 1.2);
}

.home-cta__description {
    margin: 0;
    font-size: var(--origam-font-size---lg, 1.125rem);
    color: var(--origam-color__text---secondary, #555);
    max-width: 36rem;
}

.home-cta__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---4, 1rem);
}

.home-cta__snippet {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    margin: 0;
    padding: 0;
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.12));
    border-radius: var(--origam-radius---md, 8px);
    overflow: hidden;
    background-color: var(--origam-color__surface---code, rgba(0, 0, 0, 0.04));
}

.home-cta__code {
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---3, 0.75rem);
    border: none;
    background: transparent;
    font-size: var(--origam-font-size---sm, 0.875rem);
}

.home-cta__copy-btn {
    border-radius: 0;
    flex-shrink: 0;
    border-left: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.12));
    font-size: var(--origam-font-size---sm, 0.875rem);
}
</style>
