import { BLOG_POSTS_PER_PAGE } from '~/consts/blog.const'
import type { IBlogPost } from '~/interfaces/blog.interface'

export function useBlog () {
    const isDev = process.dev

    async function listPosts (page = 1, perPage = BLOG_POSTS_PER_PAGE): Promise<IBlogPost[]> {
        const query = queryCollection('blog')
            .where('draft', isDev ? 'in' : '==', isDev ? [true, false] : false)
            .order('date', 'DESC')
            .skip((page - 1) * perPage)
            .limit(perPage)

        return await query.all() as unknown as IBlogPost[]
    }

    async function countPosts (): Promise<number> {
        const query = queryCollection('blog')
            .where('draft', isDev ? 'in' : '==', isDev ? [true, false] : false)

        const posts = await query.all() as unknown as IBlogPost[]
        return posts.length
    }

    async function getPost (slug: string): Promise<IBlogPost | null> {
        const results = await queryCollection('blog')
            .where('slug', '==', slug)
            .first() as unknown as IBlogPost | null

        if (results) return results

        const byPath = await queryCollection('blog')
            .where('_path', 'contains', slug)
            .first() as unknown as IBlogPost | null

        return byPath
    }

    async function getRelatedPosts (tags: string[], excludePath: string, limit = 3): Promise<IBlogPost[]> {
        const all = await queryCollection('blog')
            .where('draft', isDev ? 'in' : '==', isDev ? [true, false] : false)
            .order('date', 'DESC')
            .all() as unknown as IBlogPost[]

        return all
            .filter((p) => p._path !== excludePath)
            .filter((p) => p.tags.some((tag) => tags.includes(tag)))
            .slice(0, limit)
    }

    return { listPosts, countPosts, getPost, getRelatedPosts }
}
