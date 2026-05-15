// Unit tests for `useCommand` — the singleton registry that backs
// `<OrigamCommandPalette>`.
//
// The composable wraps a process-wide store, so each test must call
// `resetCommandRegistryForTesting()` in `beforeEach` to wipe the
// singleton — otherwise commands leak between specs.

import { beforeEach, describe, expect, it } from 'vitest'

import { resetCommandRegistryForTesting, useCommand } from './command.composable'

describe('useCommand', () => {
    beforeEach(() => {
        resetCommandRegistryForTesting()
    })

    it('register pushes a command and exposes it via commands ref', () => {
        const { register, commands } = useCommand()

        register({
            id: 'cmd-a',
            label: 'Command A',
            perform: () => undefined
        })

        expect(commands.value.length).toBe(1)
        expect(commands.value[0].id).toBe('cmd-a')
    })

    it('register returns an unregister closure that drops the entry', () => {
        const { register, commands } = useCommand()

        const dispose = register({
            id: 'cmd-a',
            label: 'A',
            perform: () => undefined
        })

        dispose()

        expect(commands.value.length).toBe(0)
    })

    it('two registrations with the same id replace each other (no duplicate)', () => {
        const { register, commands } = useCommand()

        register({ id: 'dup', label: 'First', perform: () => undefined })
        register({ id: 'dup', label: 'Second', perform: () => undefined })

        expect(commands.value.length).toBe(1)
        expect(commands.value[0].label).toBe('Second')
    })

    it('unregister with an unknown id is a no-op', () => {
        const { register, unregister, commands } = useCommand()

        register({ id: 'cmd-a', label: 'A', perform: () => undefined })
        unregister('nope')

        expect(commands.value.length).toBe(1)
    })

    it('two callers share the same store', () => {
        const a = useCommand()
        const b = useCommand()

        a.register({ id: 'shared', label: 'X', perform: () => undefined })

        expect(b.commands.value.length).toBe(1)
        expect(b.commands.value[0].id).toBe('shared')
    })

    it('open / close toggles isOpen state across callers', () => {
        const a = useCommand()
        const b = useCommand()

        expect(a.isOpen.value).toBe(false)

        b.open()

        expect(a.isOpen.value).toBe(true)

        a.close()

        expect(b.isOpen.value).toBe(false)
    })
})
