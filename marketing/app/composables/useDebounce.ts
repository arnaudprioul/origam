import { ref, watch, type Ref } from 'vue'

export function useDebounce<T>(source: Ref<T>, delay = 200): Ref<T> {
    const debounced = ref<T>(source.value) as Ref<T>
    let timer: ReturnType<typeof setTimeout> | null = null

    watch(source, (value) => {
        if (timer !== null) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            debounced.value = value
            timer = null
        }, delay)
    })

    return debounced
}
