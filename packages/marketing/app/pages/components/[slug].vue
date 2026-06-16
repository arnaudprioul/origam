<script setup lang="ts">
import { computed, ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useT } from '~/composables/useT'
import { useCopy } from '~/composables/useCopy'
import { COMPONENTS_CATALOG } from '~/consts/components-catalog.const'
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

const { t } = useT()
const route = useRoute()
const { copy: copyText, copied: importCopied } = useCopy()
const { copy: copyPropText } = useCopy()

/* Génère l'attribut Vue prêt à coller pour une prop :
   - booléen → "disabled"  (présence = true)
   - sinon   → ":prop-name="""  (binding avec valeur vide)
*/
const propCopyAttr = (name: string, typeLabel: string): string => {
    const kebab = name.replace(/([A-Z])/g, '-$1').toLowerCase()
    const isBoolean = typeLabel === 'boolean' || typeLabel.startsWith('boolean ')
    return isBoolean ? kebab : `:${kebab}=""`
}

const slug = computed(() => route.params.slug as string)

const catalogEntry = computed(() =>
    COMPONENTS_CATALOG.find(e => e.slug === slug.value)
)

const parentEntry = computed(() =>
    catalogEntry.value?.parentSlug
        ? COMPONENTS_CATALOG.find(e => e.slug === catalogEntry.value!.parentSlug)
        : null
)

/* ── Eager glob — zero flash, zero hydration mismatch ─────────────── */
const allDocs = import.meta.glob('~/consts/components/*.const.ts', { eager: true }) as Record<string, Record<string, unknown> | undefined>

const componentDoc = computed<IComponentDoc | null>(() => {
    const key = Object.keys(allDocs).find(k => k.includes(`/${slug.value}.const`))
    if (!key) return null
    const mod = allDocs[key]
    if (!mod) return null
    const exportKey = Object.keys(mod).find(k => k.endsWith('_DOC'))
    return exportKey ? (mod[exportKey] as IComponentDoc) : null
})

const displayDoc = computed(() => componentDoc.value)

const hasProps    = computed(() => (displayDoc.value?.props?.length ?? 0) > 0)
const hasEmits    = computed(() => (displayDoc.value?.emits?.length ?? 0) > 0)
const hasSlots    = computed(() => (displayDoc.value?.slots?.length ?? 0) > 0)
const hasExamples = computed(() => (displayDoc.value?.examples?.length ?? 0) > 0)
const hasFamily   = computed(() =>
    (displayDoc.value?.family?.length ?? 0) > 0 ||
    (catalogEntry.value?.family?.length ?? 0) > 0
)
const hasRelated    = computed(() => (displayDoc.value?.related?.length ?? 0) > 0)
const hasAnatomy    = computed(() => !!displayDoc.value?.anatomy)
const hasCssVars    = computed(() => (displayDoc.value?.cssVars?.length ?? 0) > 0)
const hasExposed    = computed(() => (displayDoc.value?.exposed?.length ?? 0) > 0)
const hasComposable = computed(() => !!displayDoc.value?.composable)
const hasA11y       = computed(() => !!displayDoc.value?.a11y)
const hasTokens     = computed(() => !!displayDoc.value?.tokens)
const hasPlayground = computed(() => !!displayDoc.value?.playground)
const hasPreview    = computed(() => (displayDoc.value?.previewVariants?.length ?? 0) > 0)

const familyMembers = computed(() =>
    displayDoc.value?.family ?? catalogEntry.value?.family ?? []
)
const relatedItems = computed(() => displayDoc.value?.related ?? [])

const componentName         = computed(() => displayDoc.value?.name ?? catalogEntry.value?.name ?? slug.value)
const componentTag          = computed(() => displayDoc.value?.tag ?? `origam-${slug.value}`)
const componentCategory     = computed(() => displayDoc.value?.category ?? catalogEntry.value?.category ?? '')
const componentDescKey      = computed(() => displayDoc.value?.descriptionKey ?? catalogEntry.value?.descriptionKey ?? '')
const componentDescFallback = computed(() => displayDoc.value?.descriptionFallback ?? catalogEntry.value?.descriptionFallback ?? '')

const importStatement = computed(() => `import { Origam${componentName.value} } from 'origam'`)

const copyImport = () => copyText(importStatement.value)

/* ── ToC ──────────────────────────────────────────────────────────── */
const tocSections = computed(() => {
    const sections: { id: string; label: string }[] = []
    if (hasAnatomy.value)    sections.push({ id: 'section-anatomy',    label: t('components.detail.anatomy.title',    'Anatomy') })
    if (hasProps.value)      sections.push({ id: 'section-props',      label: t('components.detail.props.title',      'Props') })
    if (hasSlots.value)      sections.push({ id: 'section-slots',      label: t('components.detail.slots.title',      'Slots') })
    if (hasEmits.value)      sections.push({ id: 'section-emits',      label: t('components.detail.emits.title',      'Emits') })
    if (hasExposed.value)    sections.push({ id: 'section-exposed',    label: t('components.detail.exposed.title',    'Exposed') })
    if (hasCssVars.value)    sections.push({ id: 'section-css-vars',   label: t('components.detail.css_vars.title',  'CSS variables') })
    if (hasComposable.value) sections.push({ id: 'section-composable', label: t('components.detail.composable.title','Composable') })
    if (hasA11y.value)       sections.push({ id: 'section-a11y',       label: t('components.detail.a11y.title',      'Accessibility') })
    if (hasTokens.value)     sections.push({ id: 'section-tokens',     label: t('components.detail.tokens.title',    'Design tokens') })
    if (hasPlayground.value) sections.push({ id: 'section-playground', label: t('components.detail.playground.title','Playground') })
    if (hasExamples.value)   sections.push({ id: 'section-examples',   label: t('components.detail.examples.title',  'Examples') })
    if (hasFamily.value)     sections.push({ id: 'section-family',     label: t('components.detail.family.title',    'Family') })
    if (hasRelated.value)    sections.push({ id: 'section-related',    label: t('components.detail.related.title',   'Related elements') })
    return sections
})

const activeSection = ref('')

let intersectionObserver: IntersectionObserver | null = null

const initIntersectionObserver = () => {
    if (intersectionObserver) intersectionObserver.disconnect()
    intersectionObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    activeSection.value = entry.target.id
                    break
                }
            }
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    tocSections.value.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) intersectionObserver!.observe(el)
    })
}

const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ── Playground state ─────────────────────────────────────────────── */
const playgroundProps = reactive<Record<string, string | number | boolean>>({})

const initPlayground = () => {
    const controls = displayDoc.value?.playground?.controls ?? []
    controls.forEach(ctrl => {
        playgroundProps[ctrl.prop] = ctrl.defaultValue
    })
}

const generatedCode = computed(() => {
    const tag = componentTag.value
    const doc = displayDoc.value
    if (!doc?.playground) return `<${tag} />`

    const slotContent = doc.playground.defaultSlotContent ?? ''
    const attrs = Object.entries(playgroundProps)
        .filter(([, v]) => v !== '' && v !== false && v !== undefined)
        .map(([k, v]) => {
            const kebab = k.replace(/([A-Z])/g, '-$1').toLowerCase()
            if (typeof v === 'boolean') return v ? kebab : null
            return `${kebab}="${v}"`
        })
        .filter(Boolean)

    const attrsStr = attrs.length ? '\n  ' + attrs.join('\n  ') + '\n' : ''
    if (slotContent) {
        return `<${tag}${attrsStr ? attrsStr : ' '}>\n  ${slotContent}\n</${tag}>`
    }
    return attrs.length
        ? `<${tag}\n  ${attrs.join('\n  ')}\n/>`
        : `<${tag} />`
})

onMounted(() => {
    initPlayground()
    initIntersectionObserver()
})

onUnmounted(() => {
    intersectionObserver?.disconnect()
})

/* ── SEO ──────────────────────────────────────────────────────────── */
useSeoMeta({
    title: () => t('components.detail.meta.title', `${componentName.value} · origam components`, { name: componentName.value }),
    description: () => t(componentDescKey.value, componentDescFallback.value),
    ogTitle: () => t('components.detail.meta.title', `${componentName.value} · origam components`, { name: componentName.value }),
    ogDescription: () => t(componentDescKey.value, componentDescFallback.value)
})
</script>

<template>
    <article
        class="component-detail"
        :data-cy="`page-component-${slug}`"
    >
        <div
            v-if="!catalogEntry"
            class="component-detail-not-found"
            data-cy="component-not-found"
        >
            <origam-container class="component-detail-not-found__inner">
                <origam-avatar
                    icon="mdi-help-circle-outline"
                    color="warning"
                    rounded="lg"
                    size="64"
                    aria-hidden="true"
                />

                <origam-title
                    tag="h1"
                    class="component-detail-not-found__title"
                >
                    {{ t('components.detail.not_found.title', 'Component not found') }}
                </origam-title>

                <p class="component-detail-not-found__desc">
                    {{ t('components.detail.not_found.desc', 'No component matches the slug') }}
                    <origam-code
                        :code="slug"
                        lang="plaintext"
                        compact
                        class="component-detail-not-found__slug-code"
                    />
                </p>

                <origam-btn
                    href="/components"
                    prepend-icon="mdi-arrow-left"
                    variant="tonal"
                    color="primary"
                    data-cy="component-not-found-back"
                >
                    {{ t('components.detail.not_found.back', 'Back to catalogue') }}
                </origam-btn>
            </origam-container>
        </div>

        <template v-else>
            <div
                class="component-hero"
                aria-labelledby="component-title"
            >
                <origam-container class="component-hero__container">
                    <nav
                        class="component-hero__breadcrumb"
                        :aria-label="t('components.detail.breadcrumb_label', 'Page location')"
                    >
                        <NuxtLink
                            to="/components"
                            class="component-hero__breadcrumb-link"
                            data-cy="component-breadcrumb-catalog"
                        >
                            {{ t('components.detail.breadcrumb_catalog', 'Components') }}
                        </NuxtLink>

                        <span
                            class="component-hero__breadcrumb-sep"
                            aria-hidden="true"
                        >›</span>

                        <template v-if="parentEntry">
                            <NuxtLink
                                :to="`/components/${parentEntry.slug}`"
                                class="component-hero__breadcrumb-link"
                                :data-cy="`component-breadcrumb-parent-${parentEntry.slug}`"
                            >
                                {{ parentEntry.name }}
                            </NuxtLink>
                            <span
                                class="component-hero__breadcrumb-sep"
                                aria-hidden="true"
                            >›</span>
                        </template>

                        <span
                            class="component-hero__breadcrumb-current"
                            aria-current="page"
                        >
                            {{ componentName }}
                        </span>
                    </nav>

                    <div class="component-hero__identity">
                        <div class="component-hero__title-row">
                            <origam-title
                                id="component-title"
                                tag="h1"
                                class="component-hero__title"
                            >
                                {{ componentName }}
                            </origam-title>

                            <origam-chip
                                color="primary"
                                size="small"
                                variant="outlined"
                                class="component-hero__category-chip"
                            >
                                {{ componentCategory }}
                            </origam-chip>

                            <origam-chip
                                v-if="displayDoc?.packageNote !== 'beta' && displayDoc?.packageNote !== 'experimental'"
                                size="small"
                                color="success"
                                variant="outlined"
                                prepend-icon="mdi-circle"
                                class="component-hero__status-chip"
                            >
                                {{ t('components.detail.hero.stable_label', 'stable') }}
                            </origam-chip>
                        </div>

                        <p class="component-hero__desc">
                            {{ t(componentDescKey, componentDescFallback) }}
                        </p>

                        <div class="component-hero__bottom">
                            <nav
                                class="component-hero__actions"
                                :aria-label="t('components.detail.external_links_label', 'External resources')"
                            >
                                <origam-btn
                                    v-if="displayDoc?.docUrl"
                                    :href="displayDoc.docUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                    size="small"
                                    prepend-icon="mdi-file-document-outline"
                                    data-cy="component-doc-link"
                                >
                                    {{ t('components.detail.hero.docs_label', 'Docs') }}
                                </origam-btn>

                                <origam-btn
                                    v-if="displayDoc?.storyUrl"
                                    :href="displayDoc.storyUrl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="outlined"
                                    size="small"
                                    prepend-icon="mdi-play-circle-outline"
                                    data-cy="component-story-link"
                                >
                                    {{ t('components.detail.hero.story_label', 'Story') }}
                                </origam-btn>

                                <origam-btn
                                    :href="`https://github.com/origam-io/origam/blob/main/packages/ds/src/components/${componentName}/Origam${componentName}.vue`"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variant="text"
                                    size="small"
                                    prepend-icon="mdi-github"
                                    data-cy="component-source-link"
                                >
                                    {{ t('components.detail.hero.source_label', 'Source') }}
                                </origam-btn>
                            </nav>

                            <origam-btn
                                class="component-hero__import"
                                variant="text"
                                size="small"
                                :aria-label="t('components.detail.hero.import_label', 'Copy import statement')"
                                :data-cy="`component-import-btn-${slug}`"
                                @click="copyImport"
                            >
                                <span class="component-hero__import-text">{{ importStatement }}</span>
                                <origam-icon
                                    :icon="importCopied ? 'mdi-check' : 'mdi-content-copy'"
                                    size="14"
                                    aria-hidden="true"
                                />
                            </origam-btn>
                        </div>
                    </div>
                </origam-container>

                <div
                    v-if="hasPreview"
                    class="component-hero__preview"
                >
                    <origam-container class="component-hero__preview-inner">
                        <p class="component-hero__preview-label">
                            {{ t('components.detail.hero.preview_label', 'Preview') }}
                        </p>
                        <div
                            class="component-hero__preview-stage"
                            :aria-label="`${t('components.detail.hero.preview_label', 'Preview')} — ${componentName}`"
                            data-cy="component-preview-stage"
                        >
                            <div
                                v-for="variant in displayDoc?.previewVariants"
                                :key="variant.label"
                                class="component-hero__preview-variant"
                                :data-cy="`preview-variant-${variant.label.replace(/\s+/g, '-')}`"
                            >
                                <ClientOnly>
                                    <component
                                        :is="`origam-${slug}`"
                                        v-bind="variant.props"
                                        :aria-label="variant.ariaLabel"
                                    >
                                        {{ variant.slotContent }}
                                    </component>
                                </ClientOnly>
                                <span class="component-hero__preview-variant-label">{{ variant.label }}</span>
                            </div>
                        </div>
                    </origam-container>
                </div>
            </div>

            <origam-container>
                <div class="component-detail__layout">
                    <aside
                        v-if="tocSections.length > 0"
                        class="component-toc"
                        :aria-label="t('components.detail.toc_label', 'Table of contents')"
                        data-cy="component-toc"
                    >
                        <p class="component-toc__heading">
                            {{ t('components.detail.toc_heading', 'On this page') }}
                        </p>

                        <origam-grid
                            tag="ul"
                            columns="1"
                            gap="1"
                            class="component-toc__list"
                        >
                            <origam-grid-item
                                v-for="section in tocSections"
                                :key="section.id"
                                tag="li"
                                class="component-toc__item"
                                :class="{ 'component-toc__item--active': activeSection === section.id }"
                            >
                                <a
                                    class="component-toc__link"
                                    :href="`#${section.id}`"
                                    :aria-current="activeSection === section.id ? 'true' : undefined"
                                    @click.prevent="scrollToSection(section.id)"
                                >
                                    {{ section.label }}
                                </a>
                            </origam-grid-item>
                        </origam-grid>
                    </aside>

                    <div class="component-detail__body">
                        <section
                            v-if="hasAnatomy"
                            id="section-anatomy"
                            class="component-section component-anatomy"
                            aria-labelledby="component-anatomy-title"
                            data-cy="component-anatomy"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.anatomy.eyebrow', 'Structure') }}
                                </p>
                                <origam-title
                                    id="component-anatomy-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.anatomy.title', 'Anatomy') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.anatomy.desc', 'Visual breakdown of the component internal structure with BEM class call-outs.') }}
                                </p>
                            </header>

                            <template v-if="displayDoc?.anatomy?.svg">
                                <figure class="component-anatomy__figure">
                                    <div class="component-anatomy__svg-wrap">
                                        <svg
                                            :viewBox="displayDoc?.anatomy?.svgViewBox ?? '0 0 700 260'"
                                            xmlns="http://www.w3.org/2000/svg"
                                            role="img"
                                            :aria-labelledby="`anat-title-${slug} anat-desc-${slug}`"
                                            class="component-anatomy__svg"
                                        >
                                            <title :id="`anat-title-${slug}`">{{ displayDoc?.anatomy?.svgTitle ?? `Anatomy of Origam${componentName}` }}</title>
                                            <desc :id="`anat-desc-${slug}`">{{ displayDoc?.anatomy?.svgDesc ?? '' }}</desc>
                                            <g v-html="displayDoc?.anatomy?.svg" />
                                        </svg>
                                    </div>
                                    <figcaption
                                        v-if="displayDoc?.anatomy?.figcaption"
                                        class="component-anatomy__figcaption"
                                        v-html="displayDoc?.anatomy?.figcaption"
                                    />
                                </figure>

                                <dl
                                    v-if="displayDoc?.anatomy?.legend?.length"
                                    class="component-anatomy__legend"
                                    :aria-label="t('components.detail.anatomy.title', 'Anatomy legend')"
                                    data-cy="component-anatomy-table"
                                >
                                    <div
                                        v-for="item in displayDoc?.anatomy?.legend"
                                        :key="item.num"
                                        class="component-anatomy__legend-item"
                                    >
                                        <dt class="component-anatomy__legend-dt">
                                            <i
                                                class="component-anatomy__marker"
                                                :aria-label="String(item.num)"
                                            >{{ item.num }}</i>
                                            <span class="component-anatomy__legend-class">{{ item.cls }}</span>
                                        </dt>
                                        <dd
                                            class="component-anatomy__legend-desc"
                                            v-html="t(item.descriptionKey, item.descriptionFallback)"
                                        />
                                    </div>
                                </dl>
                            </template>
                        </section>

                        <section
                            v-if="hasProps"
                            id="section-props"
                            class="component-section component-props"
                            aria-labelledby="component-props-title"
                            data-cy="component-props"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.props.eyebrow', 'API') }}
                                </p>
                                <origam-title
                                    id="component-props-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.props.title', 'Props') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.props.desc', 'All props accepted by this component, with their type, default value and description.') }}
                                </p>
                            </header>

                            <dl
                                class="prop-list"
                                data-cy="component-props-table"
                            >
                                <div
                                    v-for="prop in displayDoc?.props"
                                    :key="prop.name"
                                    class="prop-list__item"
                                    :data-cy="`prop-row-${prop.name}`"
                                >
                                    <dt class="prop-list__dt">
                                        <origam-btn
                                            variant="text"
                                            size="x-small"
                                            class="prop-list__name-btn"
                                            :aria-label="`Copy ${prop.name} attribute`"
                                            @click="copyPropText(propCopyAttr(prop.name, prop.type.label))"
                                        >
                                            <span class="prop-list__name-mono">{{ prop.name }}</span>
                                            <origam-icon
                                                icon="mdi-content-copy"
                                                size="11"
                                                class="prop-list__copy-icon"
                                                aria-hidden="true"
                                            />
                                        </origam-btn>

                                        <origam-chip
                                            v-if="prop.required"
                                            size="x-small"
                                            color="danger"
                                            pill
                                            class="prop-list__required-badge"
                                        >
                                            {{ t('components.detail.props.required', 'required') }}
                                        </origam-chip>

                                        <NuxtLink
                                            v-if="prop.type.kind !== 'primitive' && prop.type.slug"
                                            :to="`/types/${prop.type.slug}`"
                                            class="prop-list__type-link"
                                        >
                                            <origam-chip
                                                size="x-small"
                                                :color="prop.type.kind === 'enum' ? 'secondary' : 'primary'"
                                                variant="tonal"
                                                class="prop-list__type-chip"
                                            >
                                                {{ prop.type.label }}
                                            </origam-chip>
                                        </NuxtLink>
                                        <origam-chip
                                            v-else
                                            size="x-small"
                                            variant="outlined"
                                            class="prop-list__type-chip prop-list__type-chip--primitive"
                                        >
                                            {{ prop.type.label }}
                                        </origam-chip>

                                        <span
                                            v-if="prop.defaultValue && prop.defaultValue !== 'undefined'"
                                            class="prop-list__default"
                                        >= {{ prop.defaultValue }}</span>
                                    </dt>
                                    <dd class="prop-list__dd">
                                        {{ t(prop.descriptionKey, prop.descriptionFallback) }}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            v-if="hasSlots"
                            id="section-slots"
                            class="component-section component-slots"
                            aria-labelledby="component-slots-title"
                            data-cy="component-slots"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.slots.eyebrow', 'API') }}
                                </p>
                                <origam-title
                                    id="component-slots-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.slots.title', 'Slots') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.slots.desc', 'Content slots exposed by this component.') }}
                                </p>
                            </header>

                            <dl
                                class="prop-list"
                                data-cy="component-slots-table"
                            >
                                <div
                                    v-for="slot in displayDoc?.slots"
                                    :key="slot.slot"
                                    class="prop-list__item"
                                >
                                    <dt class="prop-list__dt">
                                        <span class="prop-list__name-mono">#{{ slot.slot }}</span>

                                        <origam-code
                                            v-if="slot.slotProps && slot.slotProps !== '—'"
                                            :code="slot.slotProps"
                                            lang="typescript"
                                            compact
                                            copyable
                                            class="prop-list__slot-props-code"
                                        />
                                        <span
                                            v-else
                                            class="prop-list__default"
                                        >—</span>
                                    </dt>
                                    <dd class="prop-list__dd">
                                        {{ t(slot.descriptionKey, slot.descriptionFallback) }}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            v-if="hasEmits"
                            id="section-emits"
                            class="component-section component-emits"
                            aria-labelledby="component-emits-title"
                            data-cy="component-emits"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.emits.eyebrow', 'API') }}
                                </p>
                                <origam-title
                                    id="component-emits-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.emits.title', 'Emits') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.emits.desc', 'Events emitted by this component.') }}
                                </p>
                            </header>

                            <dl
                                class="prop-list"
                                data-cy="component-emits-table"
                            >
                                <div
                                    v-for="emit in displayDoc?.emits"
                                    :key="emit.event"
                                    class="prop-list__item"
                                >
                                    <dt class="prop-list__dt">
                                        <span class="prop-list__name-mono">@{{ emit.event }}</span>

                                        <NuxtLink
                                            v-if="emit.payload.kind !== 'primitive' && emit.payload.slug"
                                            :to="`/types/${emit.payload.slug}`"
                                            class="prop-list__type-link"
                                        >
                                            <origam-chip
                                                size="x-small"
                                                color="primary"
                                                variant="tonal"
                                                class="prop-list__type-chip"
                                            >
                                                {{ emit.payload.label }}
                                            </origam-chip>
                                        </NuxtLink>
                                        <origam-chip
                                            v-else
                                            size="x-small"
                                            variant="outlined"
                                            class="prop-list__type-chip prop-list__type-chip--primitive"
                                        >
                                            {{ emit.payload.label }}
                                        </origam-chip>
                                    </dt>
                                    <dd class="prop-list__dd">
                                        {{ t(emit.descriptionKey, emit.descriptionFallback) }}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            v-if="hasExposed"
                            id="section-exposed"
                            class="component-section component-exposed"
                            aria-labelledby="component-exposed-title"
                            data-cy="component-exposed"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.exposed.eyebrow', 'API') }}
                                </p>
                                <origam-title
                                    id="component-exposed-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.exposed.title', 'Exposed members') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.exposed.desc', 'Properties and methods accessible via template ref (defineExpose). Use them for programmatic control.') }}
                                </p>
                            </header>

                            <dl
                                class="prop-list"
                                data-cy="component-exposed-table"
                            >
                                <div
                                    v-for="member in displayDoc?.exposed"
                                    :key="member.name"
                                    class="prop-list__item"
                                >
                                    <dt class="prop-list__dt">
                                        <span class="prop-list__name-mono">{{ member.name }}</span>
                                        <origam-code
                                            :code="member.type"
                                            lang="typescript"
                                            compact
                                            :copyable="false"
                                            class="prop-list__exposed-type-code"
                                        />
                                    </dt>
                                    <dd class="prop-list__dd">
                                        {{ t(member.descriptionKey, member.descriptionFallback) }}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            v-if="hasCssVars"
                            id="section-css-vars"
                            class="component-section component-css-vars"
                            aria-labelledby="component-css-vars-title"
                            data-cy="component-css-vars"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.css_vars.eyebrow', 'Customisation') }}
                                </p>
                                <origam-title
                                    id="component-css-vars-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.css_vars.title', 'CSS variables') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.css_vars.desc', 'CSS custom properties exposed by this component. Override them to customise the component without losing theme compatibility.') }}
                                </p>
                            </header>

                            <dl
                                class="prop-list"
                                data-cy="component-css-vars-table"
                            >
                                <div
                                    v-for="cssVar in displayDoc?.cssVars"
                                    :key="cssVar.name"
                                    class="prop-list__item"
                                >
                                    <dt class="prop-list__dt">
                                        <origam-code
                                            :code="cssVar.name"
                                            lang="css"
                                            compact
                                            copyable
                                            class="prop-list__cssvar-name-code"
                                        />
                                        <span
                                            v-if="cssVar.defaultValue"
                                            class="prop-list__default"
                                        >{{ cssVar.defaultValue }}</span>
                                    </dt>
                                    <dd class="prop-list__dd">
                                        {{ t(cssVar.descriptionKey, cssVar.descriptionFallback) }}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            v-if="hasComposable"
                            id="section-composable"
                            class="component-section component-composable"
                            aria-labelledby="component-composable-title"
                            data-cy="component-composable"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.composable.eyebrow', 'API') }}
                                </p>
                                <origam-title
                                    id="component-composable-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.composable.title', 'Composable') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t(displayDoc?.composable?.descriptionKey ?? '', displayDoc?.composable?.descriptionFallback ?? '') }}
                                </p>
                            </header>

                            <div class="component-composable__body">
                                <origam-title
                                    tag="h3"
                                    class="component-composable__sub-title"
                                >
                                    {{ t('components.detail.composable.signature_label', 'Signature') }}
                                </origam-title>

                                <origam-code
                                    :code="displayDoc?.composable?.signature"
                                    lang="typescript"
                                    copyable
                                    rounded="lg"
                                    class="component-composable__code"
                                />

                                <origam-title
                                    tag="h3"
                                    class="component-composable__sub-title"
                                >
                                    {{ t('components.detail.composable.usage_label', 'Usage') }}
                                </origam-title>

                                <origam-code
                                    :code="displayDoc?.composable?.usageCode"
                                    lang="vue"
                                    copyable
                                    rounded="lg"
                                    class="component-composable__code"
                                />
                            </div>
                        </section>

                        <section
                            v-if="hasA11y"
                            id="section-a11y"
                            class="component-section component-a11y"
                            aria-labelledby="component-a11y-title"
                            data-cy="component-a11y"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.a11y.eyebrow', 'Inclusion') }}
                                </p>
                                <origam-title
                                    id="component-a11y-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.a11y.title', 'Accessibility') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.a11y.desc', 'ARIA roles, keyboard navigation and focus management. Sourced from the real component template.') }}
                                </p>
                            </header>

                            <div class="component-a11y__body">
                                <div
                                    v-if="displayDoc?.a11y?.roles?.length"
                                    class="component-a11y__block"
                                >
                                    <origam-title
                                        tag="h3"
                                        class="component-a11y__sub-title"
                                    >
                                        {{ t('components.detail.a11y.roles_label', 'ARIA roles') }}
                                    </origam-title>

                                    <div class="component-a11y__roles">
                                        <origam-chip
                                            v-for="role in displayDoc?.a11y?.roles"
                                            :key="role"
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            pill
                                            class="component-a11y__role-chip"
                                        >
                                            {{ role }}
                                        </origam-chip>
                                    </div>
                                </div>

                                <div
                                    v-if="displayDoc?.a11y?.keyboard?.length"
                                    class="component-a11y__block"
                                >
                                    <origam-title
                                        tag="h3"
                                        class="component-a11y__sub-title"
                                    >
                                        {{ t('components.detail.a11y.keyboard_label', 'Keyboard interactions') }}
                                    </origam-title>

                                    <origam-table
                                        border
                                        rounded="lg"
                                        class="component-a11y__keyboard-table"
                                        :caption="t('components.detail.a11y.keyboard_label', 'Keyboard interactions')"
                                    >
                                        <thead>
                                            <tr>
                                                <th
                                                    scope="col"
                                                    class="component-table__th"
                                                >
                                                    {{ t('components.detail.a11y.col_key', 'Key') }}
                                                </th>
                                                <th
                                                    scope="col"
                                                    class="component-table__th"
                                                >
                                                    {{ t('components.detail.a11y.col_action', 'Action') }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr
                                                v-for="kb in displayDoc?.a11y?.keyboard"
                                                :key="kb.key"
                                                class="component-table__row"
                                            >
                                                <td class="component-table__td component-table__td--name">
                                                    <origam-kbd class="component-a11y__kbd">
                                                        {{ kb.key }}
                                                    </origam-kbd>
                                                </td>
                                                <td class="component-table__td component-table__td--desc">
                                                    {{ t(kb.actionKey, kb.actionFallback) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </origam-table>
                                </div>

                                <div
                                    v-if="displayDoc?.a11y?.notes?.length"
                                    class="component-a11y__block"
                                >
                                    <origam-title
                                        tag="h3"
                                        class="component-a11y__sub-title"
                                    >
                                        {{ t('components.detail.a11y.notes_label', 'Notes') }}
                                    </origam-title>

                                    <origam-grid
                                        tag="ul"
                                        columns="1"
                                        gap="3"
                                        class="component-a11y__notes"
                                    >
                                        <origam-grid-item
                                            v-for="note in displayDoc?.a11y?.notes"
                                            :key="note.noteKey"
                                            tag="li"
                                            class="component-a11y__note"
                                        >
                                            {{ t(note.noteKey, note.noteFallback) }}
                                        </origam-grid-item>
                                    </origam-grid>
                                </div>
                            </div>
                        </section>

                        <section
                            v-if="hasTokens"
                            id="section-tokens"
                            class="component-section component-tokens"
                            aria-labelledby="component-tokens-title"
                            data-cy="component-tokens"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.tokens.eyebrow', 'Foundation') }}
                                </p>
                                <origam-title
                                    id="component-tokens-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.tokens.title', 'Design tokens') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.tokens.desc', 'DTCG token excerpt from the component token file. Built with Style Dictionary v4.') }}
                                </p>
                            </header>

                            <div class="component-tokens__meta">
                                <div class="component-tokens__meta-row">
                                    <span class="component-tokens__meta-label">{{ t('components.detail.tokens.source_label', 'Source') }}</span>
                                    <origam-code
                                        :code="displayDoc?.tokens?.sourceFile"
                                        lang="plaintext"
                                        compact
                                        class="component-tokens__source-code"
                                    />
                                </div>
                                <div class="component-tokens__meta-row">
                                    <span class="component-tokens__meta-label">{{ t('components.detail.tokens.pipeline_label', 'Pipeline') }}</span>
                                    <span class="component-tokens__pipeline-note">{{ displayDoc?.tokens?.pipelineNote }}</span>
                                </div>
                            </div>

                            <dl
                                class="prop-list"
                                data-cy="component-tokens-table"
                            >
                                <div
                                    v-for="token in displayDoc?.tokens?.excerpt"
                                    :key="token.tokenPath"
                                    class="prop-list__item"
                                >
                                    <dt class="prop-list__dt">
                                        <origam-btn
                                            variant="text"
                                            size="x-small"
                                            class="prop-list__name-btn"
                                            :aria-label="`Copy ${token.tokenPath}`"
                                            @click="copyPropText(token.tokenPath)"
                                        >
                                            <span class="prop-list__name-mono">{{ token.tokenPath }}</span>
                                            <origam-icon
                                                icon="mdi-content-copy"
                                                size="11"
                                                class="prop-list__copy-icon"
                                                aria-hidden="true"
                                            />
                                        </origam-btn>

                                        <origam-chip
                                            size="x-small"
                                            variant="outlined"
                                            class="prop-list__type-chip prop-list__type-chip--primitive"
                                        >
                                            {{ token.type }}
                                        </origam-chip>

                                        <span
                                            v-if="token.value"
                                            class="prop-list__default"
                                        >= {{ token.value }}</span>
                                    </dt>
                                    <dd class="prop-list__dd">
                                        {{ t(token.descriptionKey, token.descriptionFallback) }}
                                    </dd>
                                </div>
                            </dl>
                        </section>

                        <section
                            v-if="hasPlayground"
                            id="section-playground"
                            class="component-section component-playground"
                            aria-labelledby="component-playground-title"
                            data-cy="component-playground"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.playground.eyebrow', 'Interactive') }}
                                </p>
                                <origam-title
                                    id="component-playground-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.playground.title', 'Playground') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.playground.desc', 'Edit props live and see the component update in real time. The generated code snippet updates as you change values.') }}
                                </p>
                            </header>

                            <div class="component-playground__layout">
                                <div
                                    class="component-playground__controls"
                                    :aria-label="t('components.detail.playground.controls_label', 'Controls')"
                                >
                                    <p class="component-playground__controls-heading">
                                        {{ t('components.detail.playground.controls_label', 'Controls') }}
                                    </p>
                                    <div
                                        v-for="ctrl in displayDoc?.playground?.controls"
                                        :key="ctrl.prop"
                                        class="component-playground__control"
                                        :data-cy="`playground-ctrl-${ctrl.prop}`"
                                    >
                                        <origam-select
                                            v-if="ctrl.kind === 'select'"
                                            v-model="playgroundProps[ctrl.prop]"
                                            :label="t(ctrl.labelKey, ctrl.labelFallback)"
                                            :items="ctrl.options?.map(o => ({ title: o.label, value: o.value })) ?? []"
                                            density="compact"
                                            variant="outlined"
                                            hide-details
                                            class="component-playground__select"
                                        />

                                        <div
                                            v-else-if="ctrl.kind === 'switch'"
                                            class="component-playground__switch-row"
                                        >
                                            <span class="component-playground__switch-label">
                                                {{ t(ctrl.labelKey, ctrl.labelFallback) }}
                                            </span>
                                            <origam-switch
                                                v-model="playgroundProps[ctrl.prop]"
                                                :aria-label="t(ctrl.labelKey, ctrl.labelFallback)"
                                                density="compact"
                                                hide-details
                                                class="component-playground__switch"
                                            />
                                        </div>

                                        <origam-text-field
                                            v-else-if="ctrl.kind === 'text'"
                                            v-model="playgroundProps[ctrl.prop]"
                                            :label="t(ctrl.labelKey, ctrl.labelFallback)"
                                            density="compact"
                                            variant="outlined"
                                            hide-details
                                            class="component-playground__text"
                                        />
                                    </div>
                                </div>

                                <div class="component-playground__right">
                                    <div
                                        class="component-playground__preview"
                                        :aria-label="t('components.detail.playground.preview_label', 'Live preview')"
                                        aria-live="polite"
                                        data-cy="playground-preview"
                                    >
                                        <ClientOnly>
                                            <component
                                                :is="`origam-${slug}`"
                                                v-bind="Object.fromEntries(
                                                    Object.entries(playgroundProps).filter(([, v]) => v !== '' && v !== false)
                                                )"
                                                :data-cy="`playground-live-${slug}`"
                                            >
                                                {{ displayDoc?.playground?.defaultSlotContent }}
                                            </component>
                                        </ClientOnly>
                                    </div>

                                    <div class="component-playground__code-block">
                                        <p class="component-playground__code-label">
                                            {{ t('components.detail.playground.code_label', 'Generated code') }}
                                        </p>

                                        <origam-code
                                            :code="generatedCode"
                                            lang="vue"
                                            copyable
                                            rounded="lg"
                                            class="component-playground__generated-code"
                                            data-cy="playground-generated-code"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section
                            v-if="hasExamples"
                            id="section-examples"
                            class="component-section component-examples"
                            aria-labelledby="component-examples-title"
                            data-cy="component-examples"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.examples.eyebrow', 'Usage') }}
                                </p>
                                <origam-title
                                    id="component-examples-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.examples.title', 'Examples') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.examples.desc', 'Ready-to-paste code snippets for your templates.') }}
                                </p>
                            </header>

                            <div class="component-examples__list">
                                <div
                                    v-for="example in displayDoc?.examples"
                                    :key="example.titleFallback"
                                    class="component-examples__item"
                                    :data-cy="`component-example-${example.titleFallback.toLowerCase().replace(/[^a-z0-9]/g, '-')}`"
                                >
                                    <origam-title
                                        tag="h3"
                                        class="component-examples__item-title"
                                    >
                                        {{ t(example.titleKey, example.titleFallback) }}
                                    </origam-title>

                                    <origam-code
                                        :code="example.code"
                                        :lang="example.lang"
                                        copyable
                                        :line-numbers="true"
                                        rounded="lg"
                                        class="component-examples__code"
                                    />
                                </div>
                            </div>
                        </section>

                        <section
                            v-if="hasFamily"
                            id="section-family"
                            class="component-section component-family"
                            aria-labelledby="component-family-title"
                            data-cy="component-family"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.family.eyebrow', 'Ecosystem') }}
                                </p>
                                <origam-title
                                    id="component-family-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.family.title', 'Family') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.family.desc', 'These components belong to the same folder and work together.') }}
                                </p>
                            </header>

                            <origam-grid
                                tag="ul"
                                columns="repeat(auto-fill, minmax(200px, 1fr))"
                                gap="4"
                                class="component-family__grid"
                                data-cy="component-family-grid"
                            >
                                <origam-grid-item
                                    v-for="member in familyMembers"
                                    :key="member.slug"
                                    tag="li"
                                    class="component-family__item"
                                >
                                    <NuxtLink
                                        :to="`/components/${member.slug}`"
                                        class="component-family__link"
                                        :aria-label="`${member.name} — ${t(member.descriptionKey, member.descriptionFallback)}`"
                                        :data-cy="`component-family-card-${member.slug}`"
                                    >
                                        <origam-card
                                            border
                                            rounded="lg"
                                            flat
                                            class="component-family__card"
                                        >
                                            <template #default>
                                                <div class="component-family__card-inner">
                                                    <div class="component-family__card-head">
                                                        <origam-title
                                                            tag="h3"
                                                            class="component-family__card-name"
                                                        >
                                                            {{ member.name }}
                                                        </origam-title>

                                                        <origam-icon
                                                            icon="mdi-arrow-right"
                                                            size="16"
                                                            class="component-family__card-arrow"
                                                            aria-hidden="true"
                                                        />
                                                    </div>

                                                    <p class="component-family__card-desc">
                                                        {{ t(member.descriptionKey, member.descriptionFallback) }}
                                                    </p>
                                                </div>
                                            </template>
                                        </origam-card>
                                    </NuxtLink>
                                </origam-grid-item>
                            </origam-grid>
                        </section>

                        <section
                            v-if="hasRelated"
                            id="section-related"
                            class="component-section component-related"
                            aria-labelledby="component-related-title"
                            data-cy="component-related"
                        >
                            <header class="component-section__header">
                                <p class="component-section__eyebrow">
                                    {{ t('components.detail.related.eyebrow', 'Ecosystem') }}
                                </p>
                                <origam-title
                                    id="component-related-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.related.title', 'Related elements') }}
                                </origam-title>
                                <p class="component-section__desc">
                                    {{ t('components.detail.related.desc', 'Components and directives from different folders that collaborate with this one.') }}
                                </p>
                            </header>

                            <origam-grid
                                tag="ul"
                                columns="repeat(auto-fill, minmax(200px, 1fr))"
                                gap="4"
                                class="component-related__grid"
                                data-cy="component-related-grid"
                            >
                                <origam-grid-item
                                    v-for="item in relatedItems"
                                    :key="item.slug"
                                    tag="li"
                                    class="component-related__item"
                                >
                                    <NuxtLink
                                        :to="item.kind === 'directive' ? `/directives#${item.slug}` : `/components/${item.slug}`"
                                        class="component-related__link"
                                        :aria-label="`${item.name} — ${t(item.descriptionKey, item.descriptionFallback)}`"
                                        :data-cy="`component-related-card-${item.slug}`"
                                    >
                                        <origam-card
                                            border
                                            rounded="lg"
                                            flat
                                            class="component-related__card"
                                        >
                                            <template #default>
                                                <div class="component-related__card-inner">
                                                    <div class="component-related__card-head">
                                                        <origam-chip
                                                            :color="item.kind === 'directive' ? 'secondary' : 'primary'"
                                                            size="x-small"
                                                            pill
                                                            class="component-related__kind-chip"
                                                        >
                                                            {{ item.kind === 'directive' ? t('components.detail.related.kind_directive', 'directive') : t('components.detail.related.kind_component', 'component') }}
                                                        </origam-chip>
                                                    </div>

                                                    <origam-title
                                                        tag="h3"
                                                        class="component-related__card-name"
                                                    >
                                                        {{ item.name }}
                                                    </origam-title>

                                                    <p class="component-related__card-desc">
                                                        {{ t(item.descriptionKey, item.descriptionFallback) }}
                                                    </p>
                                                </div>
                                            </template>
                                        </origam-card>
                                    </NuxtLink>
                                </origam-grid-item>
                            </origam-grid>
                        </section>

                        <section
                            v-if="!displayDoc && catalogEntry"
                            class="component-section component-no-doc"
                            aria-labelledby="component-no-doc-title"
                            data-cy="component-no-doc"
                        >
                            <origam-card
                                border
                                rounded="lg"
                                flat
                                class="component-no-doc__card"
                            >
                                <template #default>
                                    <div class="component-no-doc__inner">
                                        <origam-icon
                                            icon="mdi-book-open-page-variant-outline"
                                            color="primary"
                                            class="component-no-doc__icon"
                                            aria-hidden="true"
                                        />

                                        <origam-title
                                            id="component-no-doc-title"
                                            tag="h2"
                                            class="component-no-doc__title"
                                        >
                                            {{ t('components.detail.no_doc.title', 'Documentation coming soon') }}
                                        </origam-title>

                                        <p class="component-no-doc__desc">
                                            {{ t('components.detail.no_doc.desc', 'The detailed API reference for this component is being written. Check the Histoire stories or VitePress docs in the meantime.') }}
                                        </p>
                                    </div>
                                </template>
                            </origam-card>
                        </section>
                    </div>
                </div>
            </origam-container>
        </template>
    </article>
</template>

<style scoped>
/* ── NOT FOUND ────────────────────────────────────────────── */
.component-detail {
    display: flex;
    flex-direction: column;
    min-block-size: 60vh;
}

.component-detail-not-found__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---6, 1.5rem);
    padding-block: var(--origam-space---24, 6rem);
    text-align: center;
}

.component-detail-not-found__title {
    display: block;
    font-size: var(--origam-font-size---section, 2rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__text---primary, #0a0a0a);
    margin: 0;
}

.component-detail-not-found__desc {
    margin: 0;
    font-size: var(--origam-font-size---base, 1rem);
    color: var(--origam-color__text---secondary, #525252);
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    flex-wrap: wrap;
    justify-content: center;
}

.component-detail-not-found__slug-code {
    display: inline-flex;
}

/* ── HERO ──────────────────────────────────────────────────── */
.component-hero {
    position: relative;
    background: var(--origam-color__surface---raised, #ffffff);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    overflow: hidden;
}

.component-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: var(--origam-gradient---hero-grid);
    background-size: 32px 32px;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, transparent 100%);
    pointer-events: none;
}

.component-hero::after {
    content: '';
    position: absolute;
    inset-inline: 0;
    inset-block-start: 0;
    block-size: 200px;
    background: var(--origam-gradient---hero-glow);
    pointer-events: none;
}

.component-hero__container {
    position: relative;
    z-index: 1;
    padding-block: var(--origam-space---5, 1.25rem) var(--origam-space---8, 2rem);
}

/* ── Breadcrumb ── */
.component-hero__breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
    padding-block: var(--origam-space---5, 1.25rem) 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---medium, 500);
    flex-wrap: wrap;
}

.component-hero__breadcrumb-link {
    color: var(--origam-color__text---secondary, #525252);
    text-decoration: none;
    transition: color 100ms;
}

.component-hero__breadcrumb-link:hover {
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

.component-hero__breadcrumb-sep {
    color: var(--origam-color__text---tertiary, #737373);
    font-size: 0.625rem;
}

.component-hero__breadcrumb-current {
    color: var(--origam-color__text---primary, #0a0a0a);
    font-weight: var(--origam-font__weight---semibold, 600);
}

/* ── Identity ── */
.component-hero__identity {
    padding-block: var(--origam-space---8, 2rem) var(--origam-space---6, 1.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
}

.component-hero__title-row {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
    flex-wrap: wrap;
}

.component-hero__title {
    margin: 0;
    font-size: clamp(2.25rem, 5vw, 2.75rem);
    font-weight: 800;
    letter-spacing: -0.045em;
    line-height: 1;
    color: var(--origam-color__text---ink, #0a0a0a);
    display: block;
}

.component-hero__category-chip {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: 0.625rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.component-hero__status-chip {
    font-size: var(--origam-font-size---xs, 0.75rem);
}

.component-hero__desc {
    margin: 0;
    max-inline-size: 52ch;
    font-size: var(--origam-font-size---base, 1rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
}

/* ── Bottom row: actions + import ── */
.component-hero__bottom {
    display: flex;
    align-items: center;
    gap: var(--origam-space---4, 1rem);
    flex-wrap: wrap;
}

.component-hero__actions {
    display: flex;
    gap: var(--origam-space---2, 0.5rem);
    flex-wrap: wrap;
}

.component-hero__import {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: var(--origam-font-size---xs, 0.75rem);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    background: var(--origam-color__surface---sunken, #f5f5f5);
    border-radius: var(--origam-radius---btn, 4px);
    white-space: nowrap;
    --origam-btn---font-size: var(--origam-font-size---xs, 0.75rem);
}

.component-hero__import-text {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: var(--origam-font-size---xs, 0.75rem);
    overflow: hidden;
    text-overflow: ellipsis;
    max-inline-size: 40ch;
}

/* ── Preview band ── */
.component-hero__preview {
    position: relative;
    z-index: 1;
    border-block-start: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    background: color-mix(in srgb, var(--origam-color__surface---raised, #fff) 95%, var(--origam-color__surface---default, #f5f5f5));
}

.component-hero__preview-inner {
    padding-block: var(--origam-space---10, 2.5rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---5, 1.25rem);
}

.component-hero__preview-label {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.component-hero__preview-label::before {
    content: '';
    display: inline-block;
    inline-size: 6px;
    block-size: 6px;
    border-radius: 50%;
    background: var(--origam-color__action--primary---bg, #7c3aed);
    box-shadow: 0 0 6px var(--origam-color__action--primary---bg, #7c3aed);
}

.component-hero__preview-stage {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space---4, 1rem);
    padding: var(--origam-space---12, 3rem) var(--origam-space---8, 2rem);
    border-radius: var(--origam-radius---card, 4px);
    border: 1px dashed var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    background: color-mix(in srgb, var(--origam-color__surface---sunken, #f5f5f5) 60%, transparent);
    flex-wrap: wrap;
    row-gap: var(--origam-space---5, 1.25rem);
}

.component-hero__preview-variant {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.component-hero__preview-variant-label {
    font-size: 0.625rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
}

/* ── LAYOUT TOC + BODY ────────────────────────────────────── */
.component-detail__layout {
    display: grid;
    grid-template-columns: 212px 1fr;
    gap: var(--origam-space---12, 3rem);
    padding-block: var(--origam-space---10, 2.5rem) var(--origam-space---20, 5rem);
    align-items: start;
}

/* ── ToC ──────────────────────────────────────────────────── */
.component-toc {
    position: sticky;
    top: calc(var(--origam-layout---position-top, 0px) + var(--origam-space---8, 2rem));
    padding-block-end: var(--origam-space---8, 2rem);
}

.component-toc__heading {
    margin: 0 0 var(--origam-space---3, 0.75rem);
    padding-inline-start: var(--origam-space---3, 0.75rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
}

.component-toc__list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.component-toc__item {
    list-style: none;
}

.component-toc__link {
    display: block;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 400;
    color: var(--origam-color__text---secondary, #525252);
    padding: var(--origam-space---1, 0.25rem) var(--origam-space---3, 0.75rem);
    border-radius: var(--origam-radius---md, 8px);
    border-inline-start: 2px solid transparent;
    text-decoration: none;
    transition: color 100ms, border-color 100ms, background 100ms;
}

.component-toc__link:hover {
    color: var(--origam-color__text---primary, #0a0a0a);
    background: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.08));
}

.component-toc__item--active .component-toc__link {
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    border-inline-start-color: var(--origam-color__action--primary---bg, #7c3aed);
    font-weight: 600;
}

/* ── BODY ─────────────────────────────────────────────────── */
.component-detail__body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---20, 5rem);
    min-inline-size: 0;
}

/* ── SECTION COMMON ───────────────────────────────────────── */
.component-section__header {
    padding-block-end: var(--origam-space---4, 1rem);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    margin-block-end: var(--origam-space---6, 1.5rem);
}

.component-section__eyebrow {
    margin: 0 0 var(--origam-space---1, 0.25rem);
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

.component-section__title {
    display: block;
    font-size: var(--origam-font-size---xl, 1.25rem);
    font-weight: 700;
    color: var(--origam-color__text---ink, #0a0a0a);
    letter-spacing: -0.02em;
    margin: 0 0 var(--origam-space---2, 0.5rem);
}

.component-section__desc {
    margin: var(--origam-space---3, 0.75rem) 0 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: 1.6;
    max-inline-size: 60ch;
}

/* ── TABLES (anatomy + a11y keyboard + tokens — conservés) ── */
.component-tokens__table,
.component-a11y__keyboard-table {
    inline-size: 100%;
    overflow-x: auto;
    display: block;
}

.component-table__th {
    text-align: left;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
    padding-block: var(--origam-space---3, 0.75rem);
    padding-inline: var(--origam-space---4, 1rem);
    white-space: nowrap;
}

.component-table__row {
    vertical-align: top;
}

.component-table__row:hover {
    background: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.04));
}

.component-table__td {
    padding-block: var(--origam-space---3, 0.75rem);
    padding-inline: var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---primary, #0a0a0a);
    vertical-align: top;
    border-block-start: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
}

.component-table__td--name {
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.component-table__td--type { max-inline-size: 20rem; }
.component-table__td--default { white-space: nowrap; }
.component-table__td--desc { color: var(--origam-color__text---secondary, #525252); }

.component-table__code {
    display: inline-flex;
    max-inline-size: 100%;
}

/* ── PROP-LIST — layout de type "property list" (Radix/VueDocs pattern) */
.prop-list {
    margin: 0;
    padding: 0;
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---lg, 8px);
    overflow: hidden;
}

.prop-list__item {
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---4, 1rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---1, 0.25rem);
    transition: background 100ms;
}

.prop-list__item:last-child {
    border-block-end: none;
}

.prop-list__item:hover {
    background: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.03));
}

.prop-list__dt {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
    min-block-size: 1.75rem;
}

.prop-list__name-btn {
    padding: 0;
    gap: var(--origam-space---1, 0.25rem);
    --origam-btn---font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 600;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.prop-list__name-mono {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 600;
    color: var(--origam-color__text---primary, #0a0a0a);
}

.prop-list__copy-icon {
    opacity: 0;
    transition: opacity 100ms;
    color: var(--origam-color__text---tertiary, #737373);
}

.prop-list__item:hover .prop-list__copy-icon {
    opacity: 1;
}

.prop-list__required-badge {
    flex-shrink: 0;
}

.prop-list__type-link {
    text-decoration: none;
    color: inherit;
    display: inline-flex;
}

.prop-list__type-chip {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: 0.65rem;
    max-inline-size: 32ch;
    white-space: normal;
    height: auto;
    padding-block: 1px;
    line-height: 1.3;
}

.prop-list__type-chip--primitive {
    color: var(--origam-color__text---secondary, #525252);
}

.prop-list__default {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: var(--origam-font-size---xs, 0.75rem);
    color: var(--origam-color__text---tertiary, #737373);
    white-space: nowrap;
}

.prop-list__dd {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
    padding-inline-start: 0;
}

.prop-list__slot-props-code,
.prop-list__cssvar-name-code,
.prop-list__exposed-type-code {
    display: inline-flex;
    max-inline-size: 100%;
}

/* ── ANATOMY ──────────────────────────────────────────────── */
.component-anatomy__figure {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
    margin-block-end: var(--origam-space---6, 1.5rem);
}

.component-anatomy__svg-wrap {
    border-radius: var(--origam-radius---card, 4px);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    background: var(--origam-color__surface---sunken, #f5f5f5);
    overflow: hidden;
    padding: var(--origam-space---6, 1.5rem);
}

.component-anatomy__svg {
    inline-size: 100%;
    max-inline-size: 700px;
    display: block;
    margin-inline: auto;
    font-family: var(--origam-font-family---mono, monospace);
}

.component-anatomy__figcaption {
    font-size: var(--origam-font-size---xs, 0.75rem);
    color: var(--origam-color__text---secondary, #525252);
    text-align: center;
    line-height: 1.55;
}

.component-anatomy__figcaption :deep(code) {
    font-size: 0.9em;
    padding: 1px 5px;
    border-radius: var(--origam-radius---sm, 2px);
    background: var(--origam-color__surface---sunken, #f5f5f5);
    border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

/* Legend — property-list style (même rythme que Props/Slots) */
.component-anatomy__legend {
    margin: 0;
    padding: 0;
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---lg, 8px);
    overflow: hidden;
}

.component-anatomy__legend-item {
    padding: var(--origam-space---4, 1rem) var(--origam-space---4, 1rem) var(--origam-space---3, 0.75rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
    transition: background 100ms;
}

.component-anatomy__legend-item:last-child {
    border-block-end: none;
}

.component-anatomy__legend-item:hover {
    background: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.03));
}

.component-anatomy__legend-dt {
    display: flex;
    align-items: center;
    gap: var(--origam-space---3, 0.75rem);
}

.component-anatomy__marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 22px;
    block-size: 22px;
    border-radius: 50%;
    background: var(--origam-color__action--primary---bg, #7c3aed);
    color: var(--origam-color__action--primary---fg, #fff);
    font-family: var(--origam-font-family---mono, monospace);
    font-size: 0.625rem;
    font-weight: 700;
    font-style: normal;
    flex-shrink: 0;
    line-height: 1;
}

.component-anatomy__legend-class {
    font-family: var(--origam-font-family---mono, monospace);
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 600;
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

.component-anatomy__legend-desc {
    margin: 0;
    padding-inline-start: calc(22px + var(--origam-space---3, 0.75rem));
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: 1.6;
}

.component-anatomy__legend-desc :deep(code) {
    font-size: 0.85em;
    padding: 1px 5px;
    border-radius: var(--origam-radius---sm, 2px);
    background: var(--origam-color__action--primary---bgSubtle, rgba(124, 58, 237, 0.08));
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
}

/* ── A11Y ─────────────────────────────────────────────────── */
.component-a11y__body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---8, 2rem);
}

.component-a11y__block {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
}

.component-a11y__sub-title {
    display: block;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
    margin: 0;
}

.component-a11y__roles {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
}

.component-a11y__role-chip {
    font-family: var(--origam-font-family---mono, monospace);
}

.component-a11y__notes {
    padding-inline-start: var(--origam-space---5, 1.25rem);
    margin: 0;
    list-style: disc;
}

.component-a11y__note {
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
}

.component-a11y__kbd {
    font-size: var(--origam-font-size---xs, 0.75rem);
}

/* ── COMPOSABLE ───────────────────────────────────────────── */
.component-composable__body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
}

.component-composable__sub-title {
    display: block;
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
    margin: 0;
}

.component-composable__code {
    inline-size: 100%;
}

/* ── TOKENS ───────────────────────────────────────────────── */
.component-tokens__meta {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
    margin-block-end: var(--origam-space---4, 1rem);
    padding: var(--origam-space---3, 0.75rem) var(--origam-space---4, 1rem);
    border: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
    border-radius: var(--origam-radius---md, 8px);
    background: var(--origam-color__surface---sunken, #f5f5f5);
}

.component-tokens__meta-row {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space---3, 0.75rem);
    flex-wrap: wrap;
}

.component-tokens__meta-label {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
    white-space: nowrap;
    padding-block-start: 0.15rem;
}

.component-tokens__source-code {
    display: inline-flex;
}

.component-tokens__pipeline-note {
    font-size: var(--origam-font-size---xs, 0.75rem);
    color: var(--origam-color__text---secondary, #525252);
    line-height: 1.5;
}

/* ── PLAYGROUND ───────────────────────────────────────────── */
.component-playground__layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---card, 4px);
    overflow: hidden;
    box-shadow: var(--origam-shadow---card-elevated, 0 1px 3px rgba(0, 0, 0, 0.06));
}

.component-playground__controls {
    background: var(--origam-color__surface---sunken, #f5f5f5);
    border-inline-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    padding: var(--origam-space---5, 1.25rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---4, 1rem);
}

.component-playground__controls-heading {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
    padding-block-end: var(--origam-space---3, 0.75rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
}

.component-playground__control {
    display: flex;
    flex-direction: column;
}

.component-playground__switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--origam-space---3, 0.75rem);
    padding-block: var(--origam-space---1, 0.25rem);
}

.component-playground__switch-label {
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 600;
    color: var(--origam-color__text---secondary, #525252);
}

.component-playground__right {
    display: flex;
    flex-direction: column;
    gap: 0;
}

.component-playground__preview {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-block-size: 140px;
    padding: var(--origam-space---8, 2rem);
    background: color-mix(in srgb, var(--origam-color__surface---sunken, #f5f5f5) 50%, transparent);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
}

.component-playground__code-block {
    padding: 0;
}

.component-playground__code-label {
    margin: 0;
    padding: var(--origam-space---2, 0.5rem) var(--origam-space---4, 1rem);
    border-block-end: 1px solid var(--origam-color__border---subtle, rgba(0, 0, 0, 0.04));
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--origam-color__text---tertiary, #737373);
    background: var(--origam-color__surface---sunken, #f5f5f5);
}

.component-playground__generated-code {
    inline-size: 100%;
}

/* ── EXAMPLES ─────────────────────────────────────────────── */
.component-examples__list {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---8, 2rem);
}

.component-examples__item-title {
    display: block;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 700;
    color: var(--origam-color__text---ink, #0a0a0a);
    margin: 0 0 var(--origam-space---3, 0.75rem);
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.component-examples__item-title::before {
    content: '';
    display: inline-block;
    inline-size: 3px;
    block-size: 14px;
    border-radius: 2px;
    background: var(--origam-color__action--primary---bg, #7c3aed);
    flex-shrink: 0;
}

.component-examples__code {
    inline-size: 100%;
}

/* ── FAMILY / RELATED ─────────────────────────────────────── */
.component-family__grid,
.component-related__grid {
    list-style: none;
    padding: 0;
    margin: 0;
}

.component-family__item,
.component-related__item {
    list-style: none;
    display: flex;
    flex-direction: column;
}

.component-family__link,
.component-related__link {
    display: flex;
    flex-direction: column;
    block-size: 100%;
    text-decoration: none;
    color: inherit;
    border-radius: var(--origam-radius---lg, 12px);
}

.component-family__link:hover .component-family__card,
.component-related__link:hover .component-related__card {
    transform: translateY(-2px);
    box-shadow: var(--origam-shadow---card-elevated, 0 4px 12px rgba(0, 0, 0, 0.1));
}

.component-family__link:focus-visible,
.component-related__link:focus-visible {
    outline: 2px solid var(--origam-color__action--primary---bg, #7c3aed);
    outline-offset: 2px;
}

.component-family__card,
.component-related__card {
    block-size: 100%;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    display: flex;
    flex-direction: column;
}

.component-family__card-inner,
.component-related__card-inner {
    padding: var(--origam-space---4, 1rem) var(--origam-space---5, 1.25rem);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
    block-size: 100%;
}

.component-family__card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--origam-space---2, 0.5rem);
}

.component-related__card-head {
    margin-block-end: var(--origam-space---1, 0.25rem);
}

.component-family__card-name {
    display: block;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 700;
    font-family: var(--origam-font-family---mono, monospace);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    margin: 0;
}

.component-related__card-name {
    display: block;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: 700;
    font-family: var(--origam-font-family---mono, monospace);
    color: var(--origam-color__text---primary, #0a0a0a);
    margin: 0;
}

.component-family__card-arrow {
    flex-shrink: 0;
    color: var(--origam-color__text---tertiary, #737373);
}

.component-family__card-desc,
.component-related__card-desc {
    margin: 0;
    font-size: var(--origam-font-size---xs, 0.75rem);
    line-height: 1.5;
    color: var(--origam-color__text---secondary, #525252);
    flex: 1;
}

.component-related__kind-chip {
    align-self: flex-start;
}

/* ── NO DOC ───────────────────────────────────────────────── */
.component-no-doc__card {
    max-inline-size: 48rem;
}

.component-no-doc__inner {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--origam-space---4, 1rem);
    padding: var(--origam-space---6, 1.5rem);
}

.component-no-doc__icon {
    font-size: 2rem;
    color: var(--origam-color__action--primary---bg, #7c3aed);
}

.component-no-doc__title {
    display: block;
    font-size: var(--origam-font-size---lg, 1.125rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__text---primary, #0a0a0a);
    margin: 0;
}

.component-no-doc__desc {
    margin: 0;
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
}

/* ── RESPONSIVE ───────────────────────────────────────────── */
@media (max-width: 1024px) {
    .component-detail__layout {
        grid-template-columns: 1fr;
    }

    .component-toc {
        position: static;
        display: flex;
        align-items: center;
        gap: var(--origam-space---4, 1rem);
        flex-wrap: wrap;
        border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
        padding-block-end: var(--origam-space---4, 1rem);
    }

    .component-toc__heading {
        margin: 0;
        white-space: nowrap;
    }

    .component-toc__list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--origam-space---2, 0.5rem);
    }

    .component-toc__link {
        border-inline-start: none;
        border-block-end: 2px solid transparent;
    }

    .component-toc__item--active .component-toc__link {
        border-inline-start: none;
        border-block-end-color: var(--origam-color__action--primary---bg, #7c3aed);
    }

    .component-playground__layout {
        grid-template-columns: 1fr;
    }

    .component-playground__controls {
        border-inline-end: none;
        border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    }
}

@media (max-width: 768px) {
    .component-hero__preview-stage {
        padding: var(--origam-space---8, 2rem) var(--origam-space---4, 1rem);
    }

    .component-table__td--type {
        max-inline-size: 14rem;
    }

    .component-anatomy__legend :deep(.origam-grid) {
        grid-template-columns: 1fr;
    }

    .component-hero__import-text {
        display: none;
    }
}
</style>
