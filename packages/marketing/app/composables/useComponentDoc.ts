// removed unused ref import
import type { Ref } from 'vue'
import type { IComponentDoc } from '~/interfaces/component-doc.interface'

export function useComponentDoc(slug: string): {
    doc: Ref<IComponentDoc | null>
    pending: Ref<boolean>
    error: Ref<unknown>
} {
    const { data, pending, error } = useAsyncData<IComponentDoc | null>(
        `component-${slug}`,
        () =>
            $fetch<IComponentDoc>(`/api/components/${slug}`).catch(() => null)
    )

    const doc = computed(() => data.value ?? null) as Ref<IComponentDoc | null>

    return { doc, pending, error }
}
