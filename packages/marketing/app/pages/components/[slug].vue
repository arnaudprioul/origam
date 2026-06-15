<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useT } from '~/composables/useT'
import { COMPONENTS_CATALOG } from '~/consts/components-catalog.const'
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

const { t } = useT()
const route = useRoute()

const slug = computed(() => route.params.slug as string)

const catalogEntry = computed(() =>
    COMPONENTS_CATALOG.find(e => e.slug === slug.value)
)

const componentDoc = ref<IComponentDoc | null>(null)
const docLoaded = ref(false)

const parentEntry = computed(() =>
    catalogEntry.value?.parentSlug
        ? COMPONENTS_CATALOG.find(e => e.slug === catalogEntry.value!.parentSlug)
        : null
)

onMounted(async () => {
    if (!catalogEntry.value) {
        docLoaded.value = true
        return
    }
    try {
        const mod = await import(`~/consts/components/${slug.value}.const.ts`)
        const exportKey = Object.keys(mod).find(k => k.endsWith('_DOC'))
        if (exportKey) {
            componentDoc.value = mod[exportKey] as IComponentDoc
        }
    } catch {
        componentDoc.value = null
    }
    docLoaded.value = true
})

const displayDoc = computed(() => componentDoc.value)

const hasProps = computed(() => (displayDoc.value?.props?.length ?? 0) > 0)
const hasEmits = computed(() => (displayDoc.value?.emits?.length ?? 0) > 0)
const hasSlots = computed(() => (displayDoc.value?.slots?.length ?? 0) > 0)
const hasExamples = computed(() => (displayDoc.value?.examples?.length ?? 0) > 0)
const hasFamily = computed(() =>
    (displayDoc.value?.family?.length ?? 0) > 0 ||
    (catalogEntry.value?.family?.length ?? 0) > 0
)
const hasRelated = computed(() => (displayDoc.value?.related?.length ?? 0) > 0)

const familyMembers = computed(() =>
    displayDoc.value?.family ?? catalogEntry.value?.family ?? []
)

const relatedItems = computed(() => displayDoc.value?.related ?? [])

const componentName = computed(() => displayDoc.value?.name ?? catalogEntry.value?.name ?? slug.value)
const componentTag = computed(() => displayDoc.value?.tag ?? `origam-${slug.value}`)
const componentIcon = computed(() => displayDoc.value?.icon ?? catalogEntry.value?.icon ?? 'mdi-puzzle-outline')
const componentCategory = computed(() => displayDoc.value?.category ?? catalogEntry.value?.category ?? '')
const componentDescKey = computed(() => displayDoc.value?.descriptionKey ?? catalogEntry.value?.descriptionKey ?? '')
const componentDescFallback = computed(() => displayDoc.value?.descriptionFallback ?? catalogEntry.value?.descriptionFallback ?? '')

const tocSections = computed(() => {
    const sections = []
    if (hasFamily.value) sections.push({ id: 'section-family', label: t('components.detail.family.title', 'Famille') })
    if (hasProps.value) sections.push({ id: 'section-props', label: t('components.detail.props.title', 'Props') })
    if (hasEmits.value) sections.push({ id: 'section-emits', label: t('components.detail.emits.title', 'Emits') })
    if (hasSlots.value) sections.push({ id: 'section-slots', label: t('components.detail.slots.title', 'Slots') })
    if (hasExamples.value) sections.push({ id: 'section-examples', label: t('components.detail.examples.title', 'Exemples') })
    if (hasRelated.value) sections.push({ id: 'section-related', label: t('components.detail.related.title', 'Éléments liés') })
    return sections
})

const activeSection = ref('')

const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId)
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        activeSection.value = sectionId
    }
}

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
            <section
                class="component-hero"
                aria-labelledby="component-title"
            >
                <origam-container class="component-hero__inner">
                    <nav
                        class="component-hero__breadcrumb"
                        :aria-label="t('components.detail.breadcrumb_label', 'Page location')"
                    >
                        <origam-btn
                            href="/components"
                            variant="text"
                            size="small"
                            prepend-icon="mdi-view-grid-outline"
                            class="component-hero__breadcrumb-link"
                            data-cy="component-breadcrumb-catalog"
                        >
                            {{ t('components.detail.breadcrumb_catalog', 'Components') }}
                        </origam-btn>

                        <origam-icon
                            icon="mdi-chevron-right"
                            size="16"
                            class="component-hero__breadcrumb-sep"
                            aria-hidden="true"
                        />

                        <origam-btn
                            v-if="parentEntry"
                            :href="`/components/${parentEntry.slug}`"
                            variant="text"
                            size="small"
                            class="component-hero__breadcrumb-link"
                            :data-cy="`component-breadcrumb-parent-${parentEntry.slug}`"
                        >
                            {{ parentEntry.name }}
                        </origam-btn>

                        <origam-icon
                            v-if="parentEntry"
                            icon="mdi-chevron-right"
                            size="16"
                            class="component-hero__breadcrumb-sep"
                            aria-hidden="true"
                        />

                        <span
                            class="component-hero__breadcrumb-current"
                            aria-current="page"
                        >
                            {{ componentName }}
                        </span>
                    </nav>

                    <div class="component-hero__meta">
                        <origam-avatar
                            :icon="componentIcon"
                            color="primary"
                            rounded="lg"
                            size="56"
                            class="component-hero__avatar"
                            aria-hidden="true"
                        />

                        <div class="component-hero__meta-content">
                            <div class="component-hero__chips">
                                <origam-chip
                                    color="primary"
                                    size="small"
                                    pill
                                    class="component-hero__category-chip"
                                >
                                    {{ componentCategory }}
                                </origam-chip>

                                <origam-chip
                                    v-if="displayDoc?.packageNote"
                                    size="small"
                                    pill
                                    class="component-hero__pkg-chip"
                                >
                                    {{ displayDoc.packageNote }}
                                </origam-chip>
                            </div>

                            <origam-title
                                id="component-title"
                                tag="h1"
                                class="component-hero__title"
                            >
                                {{ componentName }}
                            </origam-title>

                            <origam-code
                                :code="`<${componentTag} />`"
                                lang="vue"
                                compact
                                class="component-hero__tag-code"
                                data-cy="component-hero-tag"
                            />
                        </div>
                    </div>

                    <p class="component-hero__desc">
                        {{ t(componentDescKey, componentDescFallback) }}
                    </p>

                    <nav
                        v-if="displayDoc?.storyUrl || displayDoc?.docUrl"
                        class="component-hero__actions"
                        :aria-label="t('components.detail.external_links_label', 'External resources')"
                    >
                        <origam-btn
                            v-if="displayDoc?.storyUrl"
                            :href="displayDoc.storyUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="tonal"
                            color="primary"
                            size="small"
                            prepend-icon="mdi-play-circle-outline"
                            data-cy="component-story-link"
                        >
                            {{ t('components.detail.story_link', 'View story') }}
                        </origam-btn>

                        <origam-btn
                            v-if="displayDoc?.docUrl"
                            :href="displayDoc.docUrl"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="text"
                            size="small"
                            prepend-icon="mdi-file-document-outline"
                            data-cy="component-doc-link"
                        >
                            {{ t('components.detail.doc_link', 'Full docs') }}
                        </origam-btn>
                    </nav>
                </origam-container>
            </section>

            <origam-container>
                <div class="component-detail__layout">
                    <aside
                        v-if="tocSections.length > 0"
                        class="component-toc"
                        :aria-label="t('components.detail.toc_label', 'Table of contents')"
                        data-cy="component-toc"
                    >
                        <origam-title
                            tag="h2"
                            class="component-toc__title"
                        >
                            {{ t('components.detail.toc_heading', 'On this page') }}
                        </origam-title>

                        <origam-grid
                            tag="ul"
                            columns="1"
                            gap="0"
                            class="component-toc__list"
                        >
                            <origam-grid-item
                                v-for="section in tocSections"
                                :key="section.id"
                                tag="li"
                                class="component-toc__item"
                            >
                                <origam-btn
                                    variant="text"
                                    size="small"
                                    class="component-toc__btn"
                                    :class="{ 'component-toc__btn--active': activeSection === section.id }"
                                    :aria-current="activeSection === section.id ? 'true' : undefined"
                                    @click="scrollToSection(section.id)"
                                >
                                    {{ section.label }}
                                </origam-btn>
                            </origam-grid-item>
                        </origam-grid>
                    </aside>

                    <div class="component-detail__body">
                        <section
                            v-if="hasFamily"
                            id="section-family"
                            class="component-section component-family"
                            aria-labelledby="component-family-title"
                            data-cy="component-family"
                        >
                            <header class="component-section__header">
                                <origam-title
                                    id="component-family-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.family.title', 'Famille') }}
                                </origam-title>

                                <p class="component-section__desc">
                                    {{ t('components.detail.family.desc', 'Ces composants appartiennent au même dossier et fonctionnent ensemble.') }}
                                </p>
                            </header>

                            <origam-grid
                                tag="ul"
                                columns="repeat(auto-fill, minmax(220px, 1fr))"
                                gap="1rem"
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
                            v-if="hasProps"
                            id="section-props"
                            class="component-section component-props"
                            aria-labelledby="component-props-title"
                            data-cy="component-props"
                        >
                            <header class="component-section__header">
                                <origam-title
                                    id="component-props-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.props.title', 'Props') }}
                                </origam-title>

                                <p class="component-section__desc">
                                    {{ t('components.detail.props.desc', 'Toutes les props acceptées par ce composant, avec leur type, valeur par défaut et description.') }}
                                </p>
                            </header>

                            <origam-table
                                border
                                rounded="lg"
                                class="component-props__table"
                                :caption="t('components.detail.props.table_caption', `${componentName} props`)"
                                data-cy="component-props-table"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.props.col_name', 'Nom') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.props.col_type', 'Type') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.props.col_default', 'Défaut') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.props.col_description', 'Description') }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="prop in displayDoc?.props"
                                        :key="prop.name"
                                        class="component-table__row"
                                        :data-cy="`prop-row-${prop.name}`"
                                    >
                                        <td class="component-table__td component-table__td--name">
                                            <origam-code
                                                :code="prop.name"
                                                lang="plaintext"
                                                compact
                                                class="component-table__code"
                                            />

                                            <origam-chip
                                                v-if="prop.required"
                                                size="x-small"
                                                color="danger"
                                                pill
                                                class="component-table__required-badge"
                                            >
                                                {{ t('components.detail.props.required', 'required') }}
                                            </origam-chip>
                                        </td>
                                        <td class="component-table__td component-table__td--type">
                                            <origam-code
                                                :code="prop.type"
                                                lang="typescript"
                                                compact
                                                class="component-table__code"
                                            />
                                        </td>
                                        <td class="component-table__td component-table__td--default">
                                            <origam-code
                                                :code="prop.defaultValue"
                                                lang="plaintext"
                                                compact
                                                class="component-table__code"
                                            />
                                        </td>
                                        <td class="component-table__td component-table__td--desc">
                                            {{ t(prop.descriptionKey, prop.descriptionFallback) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </origam-table>
                        </section>

                        <section
                            v-if="hasEmits"
                            id="section-emits"
                            class="component-section component-emits"
                            aria-labelledby="component-emits-title"
                            data-cy="component-emits"
                        >
                            <header class="component-section__header">
                                <origam-title
                                    id="component-emits-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.emits.title', 'Emits') }}
                                </origam-title>

                                <p class="component-section__desc">
                                    {{ t('components.detail.emits.desc', 'Événements émis par ce composant.') }}
                                </p>
                            </header>

                            <origam-table
                                border
                                rounded="lg"
                                class="component-emits__table"
                                :caption="t('components.detail.emits.table_caption', `${componentName} events`)"
                                data-cy="component-emits-table"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.emits.col_event', 'Événement') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.emits.col_payload', 'Payload') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.emits.col_description', 'Description') }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="emit in displayDoc?.emits"
                                        :key="emit.event"
                                        class="component-table__row"
                                    >
                                        <td class="component-table__td component-table__td--name">
                                            <origam-code
                                                :code="`@${emit.event}`"
                                                lang="plaintext"
                                                compact
                                                class="component-table__code"
                                            />
                                        </td>
                                        <td class="component-table__td component-table__td--type">
                                            <origam-code
                                                :code="emit.payload"
                                                lang="typescript"
                                                compact
                                                class="component-table__code"
                                            />
                                        </td>
                                        <td class="component-table__td component-table__td--desc">
                                            {{ t(emit.descriptionKey, emit.descriptionFallback) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </origam-table>
                        </section>

                        <section
                            v-if="hasSlots"
                            id="section-slots"
                            class="component-section component-slots"
                            aria-labelledby="component-slots-title"
                            data-cy="component-slots"
                        >
                            <header class="component-section__header">
                                <origam-title
                                    id="component-slots-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.slots.title', 'Slots') }}
                                </origam-title>

                                <p class="component-section__desc">
                                    {{ t('components.detail.slots.desc', 'Emplacements de contenu exposés par ce composant.') }}
                                </p>
                            </header>

                            <origam-table
                                border
                                rounded="lg"
                                class="component-slots__table"
                                :caption="t('components.detail.slots.table_caption', `${componentName} slots`)"
                                data-cy="component-slots-table"
                            >
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.slots.col_slot', 'Slot') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.slots.col_slot_props', 'Slot props') }}
                                        </th>
                                        <th
                                            scope="col"
                                            class="component-table__th"
                                        >
                                            {{ t('components.detail.slots.col_description', 'Description') }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="slot in displayDoc?.slots"
                                        :key="slot.slot"
                                        class="component-table__row"
                                    >
                                        <td class="component-table__td component-table__td--name">
                                            <origam-code
                                                :code="slot.slot"
                                                lang="plaintext"
                                                compact
                                                class="component-table__code"
                                            />
                                        </td>
                                        <td class="component-table__td component-table__td--type">
                                            <origam-code
                                                :code="slot.slotProps"
                                                lang="typescript"
                                                compact
                                                class="component-table__code"
                                            />
                                        </td>
                                        <td class="component-table__td component-table__td--desc">
                                            {{ t(slot.descriptionKey, slot.descriptionFallback) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </origam-table>
                        </section>

                        <section
                            v-if="hasExamples"
                            id="section-examples"
                            class="component-section component-examples"
                            aria-labelledby="component-examples-title"
                            data-cy="component-examples"
                        >
                            <header class="component-section__header">
                                <origam-title
                                    id="component-examples-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.examples.title', 'Exemples') }}
                                </origam-title>

                                <p class="component-section__desc">
                                    {{ t('components.detail.examples.desc', 'Extraits de code prêts à coller dans vos templates.') }}
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
                            v-if="hasRelated"
                            id="section-related"
                            class="component-section component-related"
                            aria-labelledby="component-related-title"
                            data-cy="component-related"
                        >
                            <header class="component-section__header">
                                <origam-title
                                    id="component-related-title"
                                    tag="h2"
                                    class="component-section__title"
                                >
                                    {{ t('components.detail.related.title', 'Éléments liés') }}
                                </origam-title>

                                <p class="component-section__desc">
                                    {{ t('components.detail.related.desc', 'Composants et directives d\'un autre dossier qui collaborent avec celui-ci.') }}
                                </p>
                            </header>

                            <origam-grid
                                tag="ul"
                                columns="repeat(auto-fill, minmax(220px, 1fr))"
                                gap="1rem"
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
                                                            {{ item.kind === 'directive' ? t('components.detail.related.kind_directive', 'directive') : t('components.detail.related.kind_component', 'composant') }}
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
                            v-if="!displayDoc && catalogEntry && docLoaded"
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

.component-hero {
    position: relative;
    padding-block: var(--origam-space---12, 3rem) var(--origam-space---10, 2.5rem);
    border-block-end: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    background: var(--origam-color__surface---sunken, #f5f5f5);
}

.component-hero__inner {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---5, 1.25rem);
}

.component-hero__breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--origam-space---1, 0.25rem);
    flex-wrap: wrap;
}

.component-hero__breadcrumb-link {
    --origam-btn---font-size: 0.75rem;
    color: var(--origam-color__text---secondary, #525252);
}

.component-hero__breadcrumb-sep {
    color: var(--origam-color__text---tertiary, #737373);
}

.component-hero__breadcrumb-current {
    font-size: var(--origam-font-size---xs, 0.75rem);
    color: var(--origam-color__text---primary, #0a0a0a);
    font-weight: var(--origam-font__weight---semibold, 600);
}

.component-hero__meta {
    display: flex;
    align-items: flex-start;
    gap: var(--origam-space---4, 1rem);
}

.component-hero__avatar {
    flex-shrink: 0;
    margin-block-start: var(--origam-space---1, 0.25rem);
}

.component-hero__meta-content {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---2, 0.5rem);
    flex: 1;
    min-inline-size: 0;
}

.component-hero__chips {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---2, 0.5rem);
}

.component-hero__title {
    margin: 0;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: var(--origam-font-weight---extrabold, 800);
    letter-spacing: var(--origam-letter-spacing---tight, -0.03em);
    line-height: 1.1;
    color: var(--origam-color__text---ink, #0a0a0a);
    display: block;
}

.component-hero__tag-code {
    display: inline-flex;
    align-self: flex-start;
}

.component-hero__desc {
    margin: 0;
    max-inline-size: 52rem;
    font-size: var(--origam-font-size---lg, 1.125rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
}

.component-hero__actions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space---3, 0.75rem);
}

.component-detail__layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: var(--origam-space---12, 3rem);
    padding-block: var(--origam-space---12, 3rem) var(--origam-space---24, 6rem);
    align-items: start;
}

.component-toc {
    position: sticky;
    top: calc(var(--origam-layout---position-top, 0px) + var(--origam-space---6, 1.5rem));
    padding: var(--origam-space---4, 1rem);
    border: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.08));
    border-radius: var(--origam-radius---lg, 12px);
    background: var(--origam-color__surface---sunken, #f5f5f5);
}

.component-toc__title {
    display: block;
    font-size: var(--origam-font-size---xs, 0.75rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--origam-color__text---tertiary, #737373);
    margin: 0 0 var(--origam-space---3, 0.75rem);
}

.component-toc__list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.component-toc__item {
    list-style: none;
}

.component-toc__btn {
    inline-size: 100%;
    justify-content: flex-start;
    font-size: var(--origam-font-size---sm, 0.875rem);
    color: var(--origam-color__text---secondary, #525252);
    --origam-btn---density-padding-x: var(--origam-space---2, 0.5rem);
}

.component-toc__btn--active {
    color: var(--origam-color__action--primary---bg, #7c3aed);
    font-weight: var(--origam-font__weight---semibold, 600);
}

.component-detail__body {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---16, 4rem);
    min-inline-size: 0;
}

.component-section__header {
    margin-block-end: var(--origam-space---6, 1.5rem);
}

.component-section__title {
    display: block;
    font-size: var(--origam-font-size---xl, 1.5rem);
    font-weight: var(--origam-font__weight---bold, 700);
    color: var(--origam-color__text---primary, #0a0a0a);
    margin: 0 0 var(--origam-space---2, 0.5rem);
    padding-block-end: var(--origam-space---3, 0.75rem);
    border-block-end: 2px solid var(--origam-color__action--primary---bg, #7c3aed);
}

.component-section__desc {
    margin: var(--origam-space---3, 0.75rem) 0 0;
    font-size: var(--origam-font-size---base, 1rem);
    line-height: 1.65;
    color: var(--origam-color__text---secondary, #525252);
    max-inline-size: 48rem;
}

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
    box-shadow: var(--origam-shadow---md, 0 4px 12px rgba(0, 0, 0, 0.1));
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
    padding: var(--origam-space---4, 1rem);
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
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    font-family: var(--origam-font-family---mono, monospace);
    color: var(--origam-color__action--primary---fgSubtle, #6d28d9);
    margin: 0;
}

.component-related__card-name {
    display: block;
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---semibold, 600);
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
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.55;
    color: var(--origam-color__text---secondary, #525252);
    flex: 1;
}

.component-related__kind-chip {
    align-self: flex-start;
}

.component-props__table,
.component-emits__table,
.component-slots__table {
    inline-size: 100%;
    overflow-x: auto;
    display: block;
}

.component-table__th {
    text-align: left;
    font-size: var(--origam-font-size---sm, 0.875rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
    padding-block: var(--origam-space---3, 0.75rem);
    padding-inline: var(--origam-space---4, 1rem);
    white-space: nowrap;
}

.component-table__row {
    vertical-align: top;
}

.component-table__row:hover {
    background: var(--origam-color__surface---sunken, #f5f5f5);
}

.component-table__td {
    padding-block: var(--origam-space---3, 0.75rem);
    padding-inline: var(--origam-space---4, 1rem);
    font-size: var(--origam-font-size---sm, 0.875rem);
    line-height: 1.6;
    color: var(--origam-color__text---secondary, #525252);
    vertical-align: top;
    border-block-start: 1px solid var(--origam-color__border---default, rgba(0, 0, 0, 0.06));
}

.component-table__td--name {
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: var(--origam-space---2, 0.5rem);
}

.component-table__td--type {
    max-inline-size: 22rem;
}

.component-table__td--default {
    white-space: nowrap;
}

.component-table__code {
    display: inline-flex;
    max-inline-size: 100%;
}

.component-table__required-badge {
    flex-shrink: 0;
}

.component-examples__list {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space---8, 2rem);
}

.component-examples__item-title {
    display: block;
    font-size: var(--origam-font-size---base, 1rem);
    font-weight: var(--origam-font__weight---semibold, 600);
    color: var(--origam-color__text---primary, #0a0a0a);
    margin: 0 0 var(--origam-space---3, 0.75rem);
}

.component-examples__code {
    inline-size: 100%;
}

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
    }

    .component-toc__title {
        margin: 0;
        white-space: nowrap;
    }

    .component-toc__list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--origam-space---2, 0.5rem);
    }

    .component-toc__btn {
        inline-size: auto;
    }
}

@media (max-width: 768px) {
    .component-hero__meta {
        flex-direction: column;
    }

    .component-table__td--type {
        max-inline-size: 14rem;
    }
}
</style>
