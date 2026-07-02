import type { ComputedRef, Ref } from 'vue'

import type { useLink as _useLink } from 'vue-router'

export interface IUseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
    isLink: ComputedRef<boolean>
    isClickable: ComputedRef<boolean>
    href: Ref<string | undefined>
}
