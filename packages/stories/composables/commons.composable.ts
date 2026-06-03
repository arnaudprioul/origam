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
