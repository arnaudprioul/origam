export interface IBlogPost {
    _path: string
    title: string
    description: string
    date: string
    author: string
    tags: string[]
    draft: boolean
    readingTime?: number
    slug?: string
    image?: string
}

export interface IBlogListProps {
    posts: IBlogPost[]
    page?: number
    perPage?: number
}
