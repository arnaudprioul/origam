import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { IComponentMeta } from '~/interfaces/component.interface'
import type { TComponentCategory } from '~/types/component-category.type'
import { COMPONENT_LIST } from '~/consts/component-list.const'

export function useComponentList() {
    const components: ComputedRef<ReadonlyArray<IComponentMeta>> = computed(() => COMPONENT_LIST)

    const total: ComputedRef<number> = computed(() => COMPONENT_LIST.length)

    const byCategory: ComputedRef<Record<TComponentCategory, IComponentMeta[]>> = computed(() => {
        const map = {} as Record<TComponentCategory, IComponentMeta[]>

        for (const item of COMPONENT_LIST) {
            if (!map[item.category]) {
                map[item.category] = []
            }
            map[item.category].push(item)
        }

        return map
    })

    function filter(
        category?: TComponentCategory,
        query?: string
    ): ReadonlyArray<IComponentMeta> {
        let result: ReadonlyArray<IComponentMeta> = COMPONENT_LIST

        if (category) {
            result = result.filter((c) => c.category === category)
        }

        if (query && query.trim().length > 0) {
            const needle = query.trim().toLowerCase()
            result = result.filter((c) => c.name.toLowerCase().includes(needle))
        }

        return result
    }

    return { components, byCategory, total, filter }
}
