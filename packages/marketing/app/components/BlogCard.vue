<script setup lang="ts">
import { BLOG_DATE_LOCALE, BLOG_DATE_FORMAT, BLOG_TAG_COLORS } from '~/consts/blog.const'
import type { IBlogPost } from '~/interfaces/blog.interface'
import type { TBlogTag } from '~/types/blog.type'

const props = defineProps<{
    post: IBlogPost
}>()

const { t } = useI18nFallback()

const formattedDate = computed(() => {
    return new Intl.DateTimeFormat(BLOG_DATE_LOCALE, BLOG_DATE_FORMAT).format(new Date(props.post.date))
})

const postSlug = computed(() => {
    const parts = props.post._path.split('/')
    return parts[parts.length - 1] ?? ''
})

function tagColor (tag: string): string {
    return BLOG_TAG_COLORS[tag as TBlogTag] ?? 'neutral'
}
</script>

<template>
    <article class="blog-card">
        <OrigamCard
            rounded="2xl"
            :elevation="2"
            class="blog-card__inner"
            tag="div"
        >
            <header class="blog-card__header">
                <h2 class="blog-card__title">{{ post.title }}</h2>
                <div class="blog-card__meta">
                    <time
                        class="blog-card__date"
                        :datetime="post.date"
                    >{{ formattedDate }}</time>
                    <span
                        v-if="post.readingTime"
                        class="blog-card__reading-time"
                    >
                        {{ t('blog.readingTime', '{n} min read').replace('{n}', String(post.readingTime)) }}
                    </span>
                </div>
                <ul
                    v-if="post.tags.length > 0"
                    class="blog-card__tags"
                    role="list"
                    :aria-label="t('blog.tagsLabel', 'Article tags')"
                >
                    <li
                        v-for="tag in post.tags"
                        :key="tag"
                        class="blog-card__tag"
                    >
                        <OrigamChip
                            :color="tagColor(tag)"
                            size="small"
                        >{{ tag }}</OrigamChip>
                    </li>
                </ul>
            </header>
            <p class="blog-card__description">{{ post.description }}</p>
            <footer class="blog-card__footer">
                <NuxtLink
                    :to="`/blog/${postSlug}`"
                    class="blog-card__read-link"
                    :aria-label="t('blog.readArticleLabel', 'Read article: {title}').replace('{title}', post.title)"
                >
                    {{ t('blog.readArticle', 'Read article') }} →
                </NuxtLink>
            </footer>
        </OrigamCard>
    </article>
</template>

<style scoped>
.blog-card {
    container-type: inline-size;
}

.blog-card__inner {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-4, 1rem);
    padding: var(--origam-space-6, 1.5rem);
    height: 100%;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-card__inner:hover {
    transform: translateY(-4px);
}

.blog-card__header {
    display: flex;
    flex-direction: column;
    gap: var(--origam-space-2, 0.5rem);
}

.blog-card__title {
    font-size: var(--origam-font-size-xl, 1.25rem);
    font-weight: var(--origam-font-weight-semibold, 600);
    color: var(--origam-color-text-default, currentColor);
    line-height: 1.3;
    margin: 0;
}

.blog-card__meta {
    display: flex;
    align-items: center;
    gap: var(--origam-space-3, 0.75rem);
    flex-wrap: wrap;
}

.blog-card__date {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
}

.blog-card__reading-time {
    font-size: var(--origam-font-size-sm, 0.875rem);
    color: var(--origam-color-text-muted, currentColor);
}

.blog-card__reading-time::before {
    content: '·';
    margin-inline-end: var(--origam-space-3, 0.75rem);
}

.blog-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--origam-space-2, 0.5rem);
    list-style: none;
    margin: 0;
    padding: 0;
}

.blog-card__description {
    font-size: var(--origam-font-size-base, 1rem);
    color: var(--origam-color-text-muted, currentColor);
    line-height: 1.6;
    margin: 0;
    flex: 1;
}

.blog-card__footer {
    margin-block-start: auto;
}

.blog-card__read-link {
    display: inline-flex;
    align-items: center;
    font-size: var(--origam-font-size-sm, 0.875rem);
    font-weight: var(--origam-font-weight-medium, 500);
    color: var(--origam-color-action-primary-bg, currentColor);
    text-decoration: none;
    transition: gap 0.15s ease;
    gap: var(--origam-space-1, 0.25rem);
}

.blog-card__read-link:hover,
.blog-card__read-link:focus-visible {
    text-decoration: underline;
    outline: 2px solid var(--origam-color-action-primary-bg, currentColor);
    outline-offset: 2px;
    border-radius: var(--origam-rounded-sm, 0.25rem);
}
</style>
