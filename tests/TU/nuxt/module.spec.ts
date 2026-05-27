// Tests for the official `origam/nuxt` module.
// Mocks `@nuxt/kit` so we can assert that the module wires up plugins,
// CSS imports, auto-imports and runtime config according to options.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const addPluginSpy = vi.fn()
const addImportsDirSpy = vi.fn()
const addComponentsDirSpy = vi.fn()
const createResolverSpy = vi.fn((url: string) => ({
    resolve: (p: string) => `${url}::${p}`
}))

vi.mock('@nuxt/kit', () => {
    return {
        defineNuxtModule: (opts: any) => opts,
        addPlugin: addPluginSpy,
        addImportsDir: addImportsDirSpy,
        addComponentsDir: addComponentsDirSpy,
        createResolver: createResolverSpy
    }
})

function makeFakeNuxt () {
    return {
        options: {
            css: [] as string[],
            runtimeConfig: {
                public: {} as Record<string, unknown>
            }
        }
    }
}

async function loadModule () {
    const mod = await import('@origam/nuxt/module')
    return mod.default as {
        meta: { name: string, configKey: string, compatibility: { nuxt: string } }
        defaults: Record<string, unknown>
        setup: (options: any, nuxt: any) => void
    }
}

describe('origam/nuxt module', () => {
    beforeEach(() => {
        addPluginSpy.mockClear()
        addImportsDirSpy.mockClear()
        addComponentsDirSpy.mockClear()
        createResolverSpy.mockClear()
    })

    afterEach(() => {
        vi.resetModules()
    })

    it('exposes the expected meta', async () => {
        const module = await loadModule()
        expect(module.meta.name).toBe('origam-nuxt')
        expect(module.meta.configKey).toBe('origam')
        expect(module.meta.compatibility.nuxt).toMatch(/\^3\.0\.0/)
    })

    it('applies sensible defaults', async () => {
        const module = await loadModule()
        expect(module.defaults).toMatchObject({
            themes: ['light', 'dark'],
            defaultTheme: 'auto',
            cookieName: 'origam-theme',
            autoImport: true,
            includeUtilities: true,
            prefix: 'Origam'
        })
    })

    it('injects the primitive + theme CSS imports and the utilities sheet', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({themes: ['light', 'dark'], includeUtilities: true}, nuxt)

        expect(nuxt.options.css[0]).toBe('origam/tokens/css/primitive')
        expect(nuxt.options.css).toContain('origam/tokens/css/light')
        expect(nuxt.options.css).toContain('origam/tokens/css/dark')
        expect(nuxt.options.css).toContain('origam/tokens/css/utilities')
    })

    it('skips the utilities sheet when includeUtilities is false', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({themes: ['light'], includeUtilities: false}, nuxt)

        expect(nuxt.options.css).not.toContain('origam/tokens/css/utilities')
    })

    it('registers a server and client plugin', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({}, nuxt)

        expect(addPluginSpy).toHaveBeenCalledTimes(2)
        const modes = addPluginSpy.mock.calls.map(c => c[0].mode)
        expect(modes).toContain('server')
        expect(modes).toContain('client')
    })

    it('registers auto-imports when autoImport is true', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({autoImport: true}, nuxt)

        expect(addImportsDirSpy).toHaveBeenCalledTimes(1)
        expect(addComponentsDirSpy).toHaveBeenCalledTimes(1)
    })

    it('skips auto-imports when autoImport is false', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({autoImport: false}, nuxt)

        expect(addImportsDirSpy).not.toHaveBeenCalled()
        expect(addComponentsDirSpy).not.toHaveBeenCalled()
    })

    it('exposes module options on the public runtime config', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({
            themes: ['light', 'dark', 'brand-x'],
            defaultTheme: 'dark',
            cookieName: 'origam-active-theme',
            cookieMaxAge: 12345
        }, nuxt)

        const cfg = nuxt.options.runtimeConfig.public.origam as Record<string, unknown>
        expect(cfg.themes).toEqual(['light', 'dark', 'brand-x'])
        expect(cfg.defaultTheme).toBe('dark')
        expect(cfg.cookieName).toBe('origam-active-theme')
        expect(cfg.cookieMaxAge).toBe(12345)
    })

    it('does not duplicate CSS imports across multiple setups', async () => {
        const module = await loadModule()
        const nuxt = makeFakeNuxt()
        module.setup({themes: ['light']}, nuxt)
        module.setup({themes: ['light']}, nuxt)

        const primitiveCount = nuxt.options.css.filter(c => c === 'origam/tokens/css/primitive').length
        const lightCount = nuxt.options.css.filter(c => c === 'origam/tokens/css/light').length
        expect(primitiveCount).toBe(1)
        expect(lightCount).toBe(1)
    })
})
