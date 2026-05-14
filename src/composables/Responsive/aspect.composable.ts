import { computed } from 'vue'

/*********************************************************
 * useAspectRatio
 ********************************************************/
export function useAspectRatio (props: { aspectRatio?: string | number }) {
    const aspectStyles = computed(() => {
        const aspectRatio = []
        let ratio = window.innerWidth / window.innerHeight

        if (props.aspectRatio) {
            ratio = eval(props.aspectRatio as string)
        }

        if (ratio) {
            aspectRatio.push(`padding-block-end: ${String(1 / ratio * 100)}%`)
        }

        return aspectRatio
    })

    return {aspectStyles}
}
