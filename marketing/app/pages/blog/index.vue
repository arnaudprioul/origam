<script setup lang="ts">
import { BLOG_POSTS_PER_PAGE } from '~/consts/blog.const'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'

const { t } = useI18nFallback()
const route = useRoute()

const currentPage = computed(() => {
    const p = Number(route.query.page)
    return p > 0 ? p : 1
})

const { listPosts, countPosts } = useBlog()

const [posts, total] = await Promise.all([
    listPosts(currentPage.value, BLOG_POSTS_PER_PAGE),
    countPosts()
])

const totalPages = computed(() => Math.ceil(total / BLOG_POSTS_PER_PAGE))

const prevPage = computed(() => (currentPage.value > 1 ? currentPage.value - 1 : null))
const nextPage = computed(() => (currentPage.value < totalPages.value ? currentPage.value + 1 : null))

useSeoMeta({
    title: t('blog.pageTitle', 'Blog · origam'),
    description: t('blog.pageDescription', 'Releases, philosophy, tutorials.'),
    ogTitle: t('blog.pageTitle', 'Blog · origam'),
    ogDescription: t('blog.pageDescription', 'Releases, philosophy, tutorials.'),
    ogImageAlt: t('blog.meta.ogImageAlt', 'origam Blog'),
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: t('blog.heading', 'Blog'),
    description: t('blog.pageDescription', 'Releases, philosophy, tutorials.'),
    type: 'blog'
})
</script>

<template>
    <section
        class="blog-index"
        data-pagefind-filter="type:page"
    >
        <header class="blog-index__header">
            <h1 class="blog-index__title">{{ t('blog.heading', 'Blog') }}</h1>
            <p class="blog-index__subtitle">{{ t('blog.subtitle', 'Releases, philosophy, tutorials.') }}</p>
        </header>

        <section
            class="blog-index__posts"
            :aria-label="t('blog.postsLabel', 'Blog posts')"
            data-pagefind-ignore
        >
            <article
                v-for="post in posts"
                :key="post._path"
                class="blog-index__post"
            >
                <BlogCard :post="post" />
            </article>
        </section>

        <nav
            v-if="totalPages > 1"
            class="blog-index__pagination"
            :aria-label="t('blog.paginationLabel', 'Blog pagination')"
        >
            <NuxtLink
                v-if="prevPage !== null"
                :to="prevPage === 1 ? '/blog' : `/blog?page=${prevPage}`"
                class="blog-index__pagination-link"
                :aria-label="t('blog.prevPageLabel', 'Previous page')"
            >
                ← {{ t('blog.prevPage', 'Previous') }}
            </NuxtLink>

            <span class="blog-index__pagination-info" aria-current="page">
                {{ t('blog.pageInfo', 'Page {current} of {total}').replace('{current}', String(currentPage)).replace('{total}', String(totalPages)) }}
            </span>

            <NuxtLink
                v-if="nextPage !== null"
                :to="`/blog?page=${nextPage}`"
                class="blog-index__pagination-link"
                :aria-label="t('blog.nextPageLabel', 'Next page')"
            >
                {{ t('blog.nextPage', 'Next') }} →
            </NuxtLink>
        </nav>
    </section>
</template>

<style scoped>
.blog-index {
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block: var(--origam-space-12, 3rem);
}

.blog-index__header {
    margin-block-end: var(--origam-space-10, 2.5rem);
}

.blog-index__title {
    font-size: var(--origam-font-size-4xl, 2.25rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default, currentColor);
    margin: 0 0 var(--origam-space-3, 0.75rem);
    letter-spacing: -0.02em;
}

.blog-index__subtitle {
    font-size: var(--origam-font-size-lg, 1.125rem);
    color: var(--origam-color-text-muted, currentColor);
    margin: 0;
}

.blog-index__posts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
    gap: var(--origam-space-6, 1.5rem);
    margin-block-end: var(--origam-space-12, 3rem);
}

.blog-index__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--origam-space-6, 1.5rem);
}

.blog-index__pagination-link {
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: none;
    padding-inline: var(--origam-space-4, 1rem);
    padding-block: var(--origam-space-2, 0.5rem);
    border-radius: var(--origam-rounded-md, 0.5rem);
    border: 1px solid var(--origam-color-border-default, transparent);
    transition: background-color 0.15s ease;
}

.blog-index__pagination-link:hover,
.blog-index__pagination-link:focus-visible {
    background-color: var(--origam-color-surface-subtle, transparent);
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
}

.blog-index__pagination-info {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
}
</style>
