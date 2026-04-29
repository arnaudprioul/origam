import { STATUS_POSITION } from "../../enums"
import type { IAdjacentProps, IStatusProps } from "../../interfaces"
import { getCurrentInstanceName } from '../../utils'
import { computed } from 'vue'

export function useStatus (props: IStatusProps & IAdjacentProps, name = getCurrentInstanceName()) {
    const statusIcon = computed(() => {
        return `$${props.status}`
    })

    // Default position when `statusIconPosition` is unset: PREPEND.
    // The previous logic treated `undefined` as "render at every slot",
    // so passing `status="info"` painted the icon at BOTH the prepend
    // AND the append — a visible duplicate inside `OrigamAlert`. Now
    // omitting the prop yields a single prepend icon, which is the
    // common-case Material/Bootstrap pattern; consumers can opt into
    // 'append' / 'both' / 'replace' explicitly.
    const effectivePosition = computed(() => {
        return props.statusIconPosition ?? `${STATUS_POSITION.PREPEND}`
    })

    const prependIcon = computed(() => {
        if (!props.status || ![`${STATUS_POSITION.PREPEND}`, `${STATUS_POSITION.BOTH}`].includes(effectivePosition.value) || props.prependIcon) return props.prependIcon

        return statusIcon.value
    })
    const appendIcon = computed(() => {
        if (!props.status || ![`${STATUS_POSITION.APPEND}`, `${STATUS_POSITION.BOTH}`].includes(effectivePosition.value) || props.appendIcon) return props.appendIcon

        return statusIcon.value
    })
    const icon = computed(() => {
        if (!props.status || !props.statusIconPosition || props.statusIconPosition !== 'replace' || props.icon) return props.icon

        return statusIcon.value
    })

    const statusClasses = computed(() => {
        const classes: Array<string> = []

        if (props.status) {
            classes.push(`${name}--${props.status}`)
        }

        return classes
    })

    return {icon, appendIcon, prependIcon, statusClasses}
}
