import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        pages: defineCollection({
            source: 'pages/**/*.md',
            type: 'page',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                lastUpdated: z.string()
            })
        }),
        blog: defineCollection({
            source: 'blog/**/*.md',
            type: 'page',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                date: z.string(),
                author: z.string().default('Arnaud Prioul'),
                tags: z.array(z.string()).default([]),
                draft: z.boolean().default(false),
                readingTime: z.number().optional()
            })
        })
    }
})
