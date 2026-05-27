import { MaybeRef } from "vue"

export interface IHotkeyOptions {
    event?: MaybeRef<'keydown' | 'keyup'>
    inputs?: MaybeRef<boolean>
    preventDefault?: MaybeRef<boolean>
    sequenceTimeout?: MaybeRef<number>
}
