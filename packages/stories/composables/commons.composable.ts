/**
 * Cast a plain object literal into a typed init-state for an Histoire
 * `<Variant :init-state>`. Lets each Variant declare which prop interface
 * its controls drive without duplicating the type at the call site.
 *
 * @example
 *   <Variant :init-state="() => useStoryInitState<IColorProps>({})">
 *     <template #default="{ state }">
 *       <OrigamBtn :color="state.color" />
 *     </template>
 *   </Variant>
 */
export default function useStoryInitState<T> (initState: any): T {
    return initState as T
}

/**
 * Build a hover/active state object (`IHoverState` / `IActiveState`) from the
 * primitive sidebar controls of a "State" Variant. HstSelect must bind
 * PRIMITIVE values (string intents) — object-valued options don't replace
 * cleanly on re-selection in Histoire, so the previous state appeared to
 * stack. Returns `undefined` when nothing is set so the prop stays unset.
 *
 * @example
 *   :hover="toEffectState(state.hoverOn, state.hoverBgColor, state.hoverColor)"
 */
export function toEffectState (on?: boolean, bgColor?: string, color?: string): Record<string, unknown> | undefined {
    if (!on && !bgColor && !color) return undefined

    const state: Record<string, unknown> = {}
    if (on) state.enabled = true
    if (bgColor) state.bgColor = bgColor
    if (color) state.color = color

    return state
}
