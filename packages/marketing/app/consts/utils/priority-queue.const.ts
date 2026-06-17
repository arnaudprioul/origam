import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PRIORITY_QUEUE_UTIL_DOC: IUtilDoc = {
    slug: 'priority-queue',
    name: 'priorityQueue',
    category: 'DataTable',
    icon: 'mdi-sort-numeric-ascending',
    descriptionKey: 'utils.catalog.priority_queue.description',
    descriptionFallback: 'Create a min-heap priority queue for generic items. Elements are inserted in priority order (lower number = higher priority) and the queue exposes enqueue, size, count, and dequeue operations.',
    signature: `function priorityQueue<T>(arr?: T[]): {
  enqueue: (element: T, priority: number) => void
  size: () => number
  count: () => number
  dequeue: () => T | undefined
}`,
    params: [
        {
            name: 'arr',
            type: 'T[]',
            required: false,
            defaultValue: '[]',
            descriptionKey: 'utils.detail.priority_queue.param_arr',
            descriptionFallback: 'Optional seed array of elements. Each element is inserted with priority 0.',
        },
    ],
    returns: {
        type: '{ enqueue, size, count, dequeue }',
        descriptionKey: 'utils.detail.priority_queue.returns',
        descriptionFallback: 'An object with four methods: enqueue (insert with priority), size (total count), count (count of elements sharing the lowest-priority bucket), and dequeue (remove and return the next element).',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.priority_queue.example_basic',
            titleFallback: 'Sort items by priority',
            code: `import { priorityQueue } from 'origam'

const pq = priorityQueue<string>()
pq.enqueue('low', 10)
pq.enqueue('high', 1)
pq.enqueue('medium', 5)

pq.dequeue() // → 'high'
pq.dequeue() // → 'medium'`,
            lang: 'typescript',
        },
    ],
    related: ['build-disabled-predicate', 'convert-to-internal-headers'],
}
