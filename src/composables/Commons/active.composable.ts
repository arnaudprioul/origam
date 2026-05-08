import { computed } from "vue"
import { useVModel } from "../../composables"
import { IActiveProps } from "../../interfaces"

import { getCurrentInstanceName } from "../../utils"

/*********************************************************
 * useActive
 ********************************************************/
export function useActive (props: IActiveProps & Record<string, any>, prop = 'active', name = getCurrentInstanceName()) {
    const isActive = useVModel(props, prop as keyof typeof props)

    const activeClasses = computed(() => {
        const classes: Array<string> = []

        if (isActive.value) {
            classes.push(`${name}--active`)

            if (props.activeClass) {
                classes.push(props.activeClass)
            }
        }

        return classes
    })

    const onActive = () => {
        isActive.value = !isActive.value
    }

    return {
        isActive,
        activeClasses,
        onActive
    }
}
