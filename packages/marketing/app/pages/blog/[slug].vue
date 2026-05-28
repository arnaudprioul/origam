<script setup lang="ts">
import { BLOG_DATE_LOCALE, BLOG_DATE_FORMAT, BLOG_TAG_COLORS, BLOG_GITHUB_EDIT_BASE } from '~/consts/blog.const'
import { SEO_TWITTER_SITE, SEO_TWITTER_HANDLE } from '~/consts/seo.const'
import type { TBlogTag } from '~/types/blog.type'
import { useBlogPostingLd, useBreadcrumbListLd } from '~/composables/useStructuredData'

const { t } = useI18nFallback()
const route = useRoute()
const slug = route.params.slug as string

const { getPost, getRelatedPosts } = useBlog()

const doc = await getPost(slug)

if (!doc) {
    throw createError({ statusCode: 404, statusMessage: t('blog.notFound', 'Article not found') })
}

const relatedPosts = await getRelatedPosts(doc.tags, doc._path)

const formattedDate = computed(() => {
    return new Intl.DateTimeFormat(BLOG_DATE_LOCALE, BLOG_DATE_FORMAT).format(new Date(doc.date))
})

const editUrl = computed(() => `${BLOG_GITHUB_EDIT_BASE}/${slug}.md`)

function tagColor (tag: string): string {
    return BLOG_TAG_COLORS[tag as TBlogTag] ?? 'neutral'
}

const _postSlug = computed(() => {
    const parts = (p: string) => p.split('/').at(-1) ?? ''
    return (post: { _path: string }) => parts(post._path)
})

useSeoMeta({
    title: doc.title,
    description: doc.description,
    ogTitle: doc.title,
    ogDescription: doc.description,
    ogImageAlt: doc.title,
    ogType: 'article',
    articlePublishedTime: doc.date,
    articleAuthor: doc.author,
    articleTag: doc.tags,
    twitterCard: 'summary_large_image',
    twitterSite: SEO_TWITTER_SITE,
    twitterCreator: SEO_TWITTER_HANDLE
})

defineOgImageComponent('OgImageTemplate', {
    title: doc.title,
    description: doc.description,
    type: 'blog'
})

useBlogPostingLd(doc)
useBreadcrumbListLd([
    { name: t('nav.home', 'Home'), url: '/' },
    { name: t('blog.heading', 'Blog'), url: '/blog' },
    { name: doc.title, url: route.fullPath }
])
</script>

<template>
    <section
        class="blog-post"
        data-pagefind-filter="type:blog"
    >
        <nav
            class="blog-post__breadcrumb"
            :aria-label="t('blog.breadcrumbLabel', 'Breadcrumb')"
        >
            <ol class="blog-post__breadcrumb-list" role="list">
                <li class="blog-post__breadcrumb-item">
                    <NuxtLink to="/" class="blog-post__breadcrumb-link">{{ t('nav.home', 'Home') }}</NuxtLink>
                </li>
                <li class="blog-post__breadcrumb-item" aria-hidden="true">›</li>
                <li class="blog-post__breadcrumb-item">
                    <NuxtLink to="/blog" class="blog-post__breadcrumb-link">{{ t('blog.heading', 'Blog') }}</NuxtLink>
                </li>
                <li class="blog-post__breadcrumb-item" aria-hidden="true">›</li>
                <li class="blog-post__breadcrumb-item blog-post__breadcrumb-item--current" aria-current="page">
                    {{ doc.title }}
                </li>
            </ol>
        </nav>

        <article class="blog-post__article">
            <header class="blog-post__header">
                <h1 class="blog-post__title">{{ doc.title }}</h1>

                <div class="blog-post__meta">
                    <time
                        class="blog-post__date"
                        :datetime="doc.date"
                    >{{ formattedDate }}</time>

                    <span class="blog-post__author">{{ doc.author }}</span>

                    <span
                        v-if="doc.readingTime"
                        class="blog-post__reading-time"
                    >
                        {{ t('blog.readingTime', '{n} min read').replace('{n}', String(doc.readingTime)) }}
                    </span>
                </div>

                <ul
                    v-if="doc.tags.length > 0"
                    class="blog-post__tags"
                    role="list"
                    :aria-label="t('blog.tagsLabel', 'Article tags')"
                >
                    <li
                        v-for="tag in doc.tags"
                        :key="tag"
                        class="blog-post__tag"
                    >
                        <OrigamChip
                            :color="tagColor(tag)"
                            size="sm"
                        >{{ tag }}</OrigamChip>
                    </li>
                </ul>
            </header>

            <div class="blog-post__body">
                <ContentRenderer :value="doc" />
            </div>

            <footer class="blog-post__footer">
                <a
                    :href="editUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="blog-post__edit-link"
                    :aria-label="t('blog.editOnGithubLabel', 'Edit this article on GitHub (opens in new tab)')"
                >
                    {{ t('blog.editOnGithub', 'Edit on GitHub') }} ↗
                </a>

                <section
                    v-if="relatedPosts.length > 0"
                    class="blog-post__related"
                    :aria-labelledby="'related-articles-heading'"
                >
                    <h2 id="related-articles-heading" class="blog-post__related-title">
                        {{ t('blog.relatedArticles', 'Related articles') }}
                    </h2>
                    <ul class="blog-post__related-list" role="list">
                        <li
                            v-for="related in relatedPosts"
                            :key="related._path"
                            class="blog-post__related-item"
                        >
                            <BlogCard :post="related" />
                        </li>
                    </ul>
                </section>
            </footer>
        </article>
    </section>
</template>

<style scoped>
.blog-post {
    max-width: 68rem;
    margin-inline: auto;
    padding-inline: var(--origam-space-6, 1.5rem);
    padding-block: var(--origam-space-8, 2rem);
}

.blog-post__breadcrumb {
    margin-block-end: var(--origam-space-8, 2rem);
}

.blog-post__breadcrumb-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--origam-space-2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
}

.blog-post__breadcrumb-link {
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: none;
}

.blog-post__breadcrumb-link:hover,
.blog-post__breadcrumb-link:focus-visible {
    text-decoration: underline;
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
    border-radius: var(--origam-rounded-sm, 0.25rem);
}

.blog-post__breadcrumb-item--current {
    color: var(--origam-color-text-default, currentColor);
    font-weight: var(--origam-font-weight-medium, 500);
}

.blog-post__article {
    max-width: 48rem;
    margin-inline: auto;
}

.blog-post__header {
    margin-block-end: var(--origam-space-8, 2rem);
    padding-block-end: var(--origam-space-8, 2rem);
    border-block-end: 1px solid var(--origam-color-border-default, transparent);
}

.blog-post__title {
    font-size: var(--origam-font-size-3xl, 1.875rem);
    font-weight: var(--origam-font-weight-bold, 700);
    color: var(--origam-color-text-default, currentColor);
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0 0 var(--origam-space-4, 1rem);
}

.blog-post__meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--origam-space-3, 0.75rem);
    margin-block-end: var(--origam-space-4, 1rem);
}

.blog-post__date,
.blog-post__author,
.blog-post__reading-time {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
}

.blog-post__author::before,
.blog-post__reading-time::before {
    content: '·';
    margin-inline-end: var(--origam-space-3, 0.75rem);
}

.blog-post__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.blog-post__body {
    color: var(--origam-color-text-default, currentColor);
    line-height: 1.75;
}

.blog-post__body :deep(h2) {
    font-size: var(--origam-font-size-2xl, 1.5rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default, currentColor);
    margin-block: var(--origam-space-8, 2rem) var(--origam-space-4, 1rem);
    letter-spacing: -0.01em;
}

.blog-post__body :deep(h3) {
    font-size: var(--origam-font-size-xl, 1.25rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default, currentColor);
    margin-block: var(--origam-space-6, 1.5rem) var(--origam-space-3, 0.75rem);
}

.blog-post__body :deep(p) {
    margin-block: 0 var(--origam-space-4, 1rem);
    color: var(--origam-color-text-muted, currentColor);
}

.blog-post__body :deep(ul),
.blog-post__body :deep(ol) {
    padding-inline-start: var(--origam-space-6, 1.5rem);
    margin-block: 0 var(--origam-space-4, 1rem);
    color: var(--origam-color-text-muted, currentColor);
}

.blog-post__body :deep(li) {
    margin-block-end: var(--origam-space-2, 0.5rem);
}

.blog-post__body :deep(code) {
    font-family: var(--origam-font-family-mono, monospace);
    font-size: 0.875em;
    background-color: var(--origam-color-surface-subtle, transparent);
    padding-inline: var(--origam-space-1, 0.25rem);
    padding-block: 0.1em;
    border-radius: var(--origam-rounded-sm, 0.25rem);
}

.blog-post__body :deep(pre) {
    background-color: var(--origam-color-surface-subtle, transparent);
    border-radius: var(--origam-rounded-lg, 0.75rem);
    padding: var(--origam-space-6, 1.5rem);
    overflow-x: auto;
    margin-block: 0 var(--origam-space-6, 1.5rem);
    border: 1px solid var(--origam-color-border-default, transparent);
}

.blog-post__body :deep(pre code) {
    background-color: transparent;
    padding: 0;
    border-radius: 0;
}

.blog-post__body :deep(a) {
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: underline;
}

.blog-post__body :deep(a:hover),
.blog-post__body :deep(a:focus-visible) {
    text-decoration: none;
}

.blog-post__body :deep(blockquote) {
    border-inline-start: 4px solid var(--origam-color-action-primary-bg, currentColor);
    padding-inline-start: var(--origam-space-4, 1rem);
    margin-inline: 0;
    color: var(--origam-color-text-muted, currentColor);
    font-style: italic;
}

.blog-post__body :deep(hr) {
    border: none;
    border-block-start: 1px solid var(--origam-color-border-default, transparent);
    margin-block: var(--origam-space-8, 2rem);
}

.blog-post__footer {
    margin-block-start: var(--origam-space-12, 3rem);
    padding-block-start: var(--origam-space-8, 2rem);
    border-block-start: 1px solid var(--origam-color-border-default, transparent);
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-10, 2.5rem);
}

.blog-post__edit-link {
    align-self: flex-start;
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    color: var(--origam-color-text-muted, currentColor);
    text-decoration: none;
    transition: color 0.15s ease;
}

.blog-post__edit-link:hover,
.blog-post__edit-link:focus-visible {
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: underline;
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
    border-radius: var(--origam-rounded-sm, 0.25rem);
}

.blog-post__related-title {
    font-size: var(--origam-font-size-xl, 1.25rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default, currentColor);
    margin: 0 0 var(--origam-space-6, 1.5rem);
}

.blog-post__related-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
    gap: var(--origam-space-4, 1rem);
    list-style: none;
    margin: 0;
    padding: 0;
}
</style>
